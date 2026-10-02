/* =========================================================
   fx.js — Markaziy bank (cbu.uz) valyuta kurslari
   Pochtachi loyihasidagi tartib:
   - bitta so'rovda barcha valyutalar keladi (Rate / Nominal);
   - 6 soatda bir marta (yoki ilovaga qaytilganda) yangilanadi;
   - olinmasa oxirgi saqlangan jadval ("oflayn") ishlatiladi,
     u ham bo'lmasa RULES.cash.defaultRates dagi taxminiy kurs.
   ========================================================= */
(function (global) {
  'use strict';
  const CBU_URL = 'https://cbu.uz/uz/arkhiv-kursov-valyut/json/';
  const KEY = 'ibk-fx-v1';
  const MAX_AGE = 6 * 3600 * 1000;
  const subs = [];

  function num(v) { const n = parseFloat(v); return isFinite(n) ? n : 0; }
  function parse(rows) {
    const out = { rates: {}, diff: {}, names: {}, date: '' };
    (Array.isArray(rows) ? rows : [rows]).forEach(function (r) {
      const c = String((r && r.Ccy) || '').toUpperCase();
      const v = num(r && r.Rate), nom = num(r && r.Nominal) || 1;
      if (!c || !(v > 0)) return;
      out.rates[c] = v / nom;
      out.diff[c] = num(r.Diff) / nom;
      if (r.CcyNm_UZ) out.names[c] = String(r.CcyNm_UZ);
      if (c === 'USD') out.date = String(r.Date || '');
    });
    return out;
  }

  const FX = global.FX = {
    rates: {}, diff: {}, names: {}, date: '', at: 0,
    live: false,     // rates came from cbu.uz (now or from the saved copy)
    loading: false,
    failed: false,   // the last request did not succeed

    init: function () {
      try {
        const c = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (c && c.rates && c.rates.USD > 0) { this.rates = c.rates; this.diff = c.diff || {}; this.names = c.names || {}; this.date = c.date || ''; this.at = c.at || 0; this.live = true; }
      } catch (e) {}
      const self = this;
      if (this.stale()) this.refresh();
      document.addEventListener('visibilitychange', function () { if (!document.hidden && self.stale() && !self.loading) self.refresh(); });
    },
    stale: function () { return !this.at || Date.now() - this.at > MAX_AGE; },
    fallback: function (c) { return (((global.RULES || {}).cash || {}).defaultRates || {})[c] || 0; },
    /** so'm for 1 unit of currency c */
    rate: function (c) { return c === 'UZS' ? 1 : (this.rates[c] || this.fallback(c)); },
    isLive: function (c) { return c === 'UZS' || this.rates[c] > 0; },
    codes: function () {
      const all = Object.keys(this.rates).length ? Object.keys(this.rates) : Object.keys(((global.RULES || {}).cash || {}).defaultRates || {});
      return all.slice().sort();
    },
    name: function (c) { return this.names[c] || ''; },

    on: function (fn) { subs.push(fn); return function () { const i = subs.indexOf(fn); if (i >= 0) subs.splice(i, 1); }; },
    /** call fn on every update while el stays on screen */
    watch: function (el, fn) {
      const off = this.on(function () {
        if (!el.isConnected) { if (el._fxSeen) off(); return; }
        el._fxSeen = true; fn();
      });
    },
    emit: function () { subs.slice().forEach(function (f) { try { f(FX); } catch (e) { console.error(e); } }); },

    refresh: function (manual) {
      if (this.loading) return this._p;
      const self = this;
      this.loading = true; this.emit();
      const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      const timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
      this._p = fetch(CBU_URL, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (j) {
          const p = parse(j);
          if (!(p.rates.USD > 0)) throw new Error('USD kursi yo\'q');
          self.rates = p.rates; self.diff = p.diff; self.names = p.names; self.date = p.date; self.at = Date.now(); self.live = true;
          try { localStorage.setItem(KEY, JSON.stringify({ rates: self.rates, diff: self.diff, names: self.names, date: self.date, at: self.at })); } catch (e) {}
          return true;
        })
        .catch(function () { return false; })
        .then(function (ok) {
          clearTimeout(timer);
          self.loading = false; self.failed = !ok;
          self.emit();
          if (manual && global.UI) UI.toast(ok ? 'Kurs yangilandi: 1 USD = ' + U.num(Math.round(self.rates.USD)) + ' so\'m' : 'Markaziy bank kursini olib bo\'lmadi' + (self.live ? ' — oxirgi saqlangan kurs ishlatilmoqda' : ''));
          return ok;
        });
      return this._p;
    },

    /** one-line status: 'ok' | 'off' | 'load' */
    status: function () {
      if (this.loading && !this.live) return { k: 'load', t: 'Markaziy bank kursi yuklanmoqda…' };
      if (this.loading) return { k: 'load', t: 'Yangilanmoqda… · MB kursi ' + this.date };
      if (this.live && !this.failed) return { k: 'ok', t: 'Markaziy bank kursi · ' + this.date };
      if (this.live) return { k: 'off', t: 'Oxirgi saqlangan MB kursi · ' + this.date + ' (oflayn)' };
      return { k: 'off', t: 'Taxminiy kurs — Markaziy bank bilan aloqa yo\'q' };
    },
    badge: function () {
      const dot = h('i.fx-dot'), txt = h('span.fx-t');
      const btn = h('button.fx-rf', { type: 'button', 'aria-label': 'Kursni yangilash', html: IC('refresh', 14), onclick: function (e) { e.stopPropagation(); FX.refresh(true); } });
      const el = h('div.fx-status', { 'aria-live': 'polite' }, dot, txt, btn);
      function draw() { const s = FX.status(); el.className = 'fx-status ' + s.k; txt.textContent = s.t; btn.disabled = FX.loading; }
      this.watch(el, draw); draw();
      return el;
    }
  };
})(window);
