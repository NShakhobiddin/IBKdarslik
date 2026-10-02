/* =========================================================
   app.js — screens, router, intro, lessons, quizzes, exam
   ========================================================= */
(function (global) {
  'use strict';
  const MODS = function () { return global.MODULES || []; };
  const modById = function (id) { return MODS().find(function (m) { return m.id === id; }); };
  const QS = function () { return global.QUESTIONS || []; };
  const ROOTS = ['', 'learn', 'tools', 'exam'];
  const EXAM_N = 25, EXAM_MIN = 30;

  const App = global.App = {
    path: null, depth: 0, screen: null, guard: null,

    init: function () {
      Store.load();
      TG.init();
      if (global.FX) FX.init();
      this.applySettings();
      const self = this;
      TG.onBack = function () { self.handleBack(); };
      global.addEventListener('popstate', function (e) { self.onPop(e); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') self.handleBack(); });
      document.getElementById('app').addEventListener('click', function (e) {
        const ref = e.target.closest('[data-ref]'); if (ref) { e.preventDefault(); e.stopPropagation(); openLaw(ref.getAttribute('data-ref')); return; }
        const go = e.target.closest('[data-go]'); if (go) { e.preventDefault(); self.go(go.getAttribute('data-go')); }
      });
      if (global.matchMedia) { try { global.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { self.applySettings(); }); } catch (e) {} }
      if (TG.in) { try { TG.w.onEvent('themeChanged', function () { self.applySettings(); }); } catch (e) {} }

      // initial route (Telegram passes its launch data in the hash — ignore it)
      let start = '';
      const hsh = location.hash || '';
      if (hsh.indexOf('#/') === 0 && hsh.indexOf('tgWebApp') < 0) start = decodeURIComponent(hsh.slice(2));
      const sp = TG.startParam();
      if (sp) { if (sp.indexOf('m_') === 0 && modById(sp.slice(2))) start = 'm/' + sp.slice(2); else if (sp === 'exam') start = 'exam'; }
      if (start && !this.routeOk(start)) start = '';
      history.replaceState({ p: '', d: 0 }, '', '#/');
      if (start) { history.pushState({ p: start, d: 1 }, '', '#/' + start); this.depth = 1; }
      this.render(start, 'fade');
      Store.sync(function (changed) { if (changed) { self.applySettings(); self.render(self.path, 'fade'); } });
      if (!Store.d.intro) Intro.show();
      Store.touchDay(); Store.save();
    },

    routeOk: function (p) { const s = p.split('/')[0]; return ['', 'learn', 'tools', 'exam', 'm', 'l', 'q', 't', 'v', 'videos', 'search', 'glossary', 'laws', 'settings', 'review'].indexOf(s) >= 0; },

    applySettings: function () {
      const s = Store.d.set, root = document.documentElement;
      let theme = s.theme;
      if (theme === 'auto') theme = TG.scheme() || ((global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-motion', s.motion || 'auto');
      root.style.setProperty('--fs', s.fs || 1);
      this.colors();
    },
    colors: function () {
      const cs = getComputedStyle(document.documentElement);
      const bg = cs.getPropertyValue('--bg').trim() || '#f2f4f8';
      const navy = cs.getPropertyValue('--navy').trim() || '#0b1f3a';
      const surf = cs.getPropertyValue('--surface').trim() || '#ffffff';
      const heroScreen = this.path === '' || /^m\//.test(this.path || '');
      TG.colors(heroScreen ? navy : bg, bg, surf);
    },

    go: function (p, opt) {
      opt = opt || {};
      if (p === this.path && !opt.force) return;
      if (this.guard && !opt.force) { const self = this; this.guard(function () { self.guard = null; self.go(p, Object.assign({}, opt, { force: true })); }); return; }
      if (ROOTS.indexOf(p) >= 0 && ROOTS.indexOf(this.path) >= 0) opt.replace = true;
      if (opt.replace) history.replaceState({ p: p, d: this.depth }, '', '#/' + p);
      else { this.depth++; history.pushState({ p: p, d: this.depth }, '', '#/' + p); }
      TG.hap('light');
      this.render(p, opt.dir || (opt.replace ? 'fade' : 'push'));
    },
    handleBack: function () {
      if (UI.overlays.length) { UI.overlays[UI.overlays.length - 1](); return; }
      if (Intro.open) { Intro.close(); return; }
      if (ROOTS.indexOf(this.path) >= 0 && this.path !== '') { this.go('', { replace: true, dir: 'back' }); return; }
      if (this.path === '') return;
      const self = this;
      if (this.guard) { this.guard(function () { self.guard = null; self.handleBack(); }); return; }
      if (this.depth > 0) history.back();
      else this.go(parentOf(this.path), { replace: true, dir: 'back', force: true });
    },
    onPop: function (e) {
      const st = e.state || { p: '', d: 0 };
      if (this.guard) {
        const self = this, target = st;
        history.pushState({ p: this.path, d: this.depth }, '', '#/' + this.path);
        this.guard(function () { self.guard = null; self.depth = target.d; history.replaceState(target, '', '#/' + target.p); self.render(target.p, 'back'); });
        return;
      }
      const dir = st.d < this.depth ? 'back' : 'push';
      this.depth = st.d || 0;
      this.render(st.p || '', dir);
    },
    syncBack: function () { TG.back(UI.overlays.length > 0 || ROOTS.indexOf(this.path) < 0); },
    // jump straight to the home screen from anywhere (e.g. mid-lesson).
    // Rewinds the history stack so "back" on home doesn't reopen the lesson.
    home: function (note) {
      if (this.path === '') return;
      const self = this;
      if (this.guard) { this.guard(function () { self.guard = null; self.home(note); }); return; }
      UI.overlays.slice().forEach(function (c) { c(); });
      if (this.depth > 0) {
        history.go(-this.depth);
        setTimeout(function () { if (self.path !== '') { self.depth = 0; self.go('', { replace: true, dir: 'back', force: true }); } }, 450);
      } else this.go('', { replace: true, dir: 'back', force: true });
      if (note) setTimeout(function () { UI.toast(note); }, 250);
    },

    render: function (p, dir) {
      const app = document.getElementById('app');
      const boot = app.querySelector('.boot'); if (boot) boot.remove();
      const prev = this.screen;
      if (prev && prev._scrollKey) scrollMem[prev._scrollKey] = (prev.querySelector('.scroll') || {}).scrollTop || 0;
      this.path = p; this.guard = null;
      let built;
      try { built = route(p); } catch (err) { console.error(err); built = Screens.error(err); }
      const el = built.el || built;
      el.classList.add('screen');
      if (built.tabs) { el.classList.add('with-tabs'); el.appendChild(tabbar(p)); }
      el._scrollKey = p;
      el.classList.add(dir === 'back' ? 'enter-back' : dir === 'fade' ? 'enter-fade' : 'enter');
      app.appendChild(el);
      if (dir === 'back' && scrollMem[p]) { const sc = el.querySelector('.scroll'); if (sc) sc.scrollTop = scrollMem[p]; }
      if (prev) { prev.classList.add('leave'); setTimeout(function () { prev.remove(); }, 170); }
      this.screen = el;
      UI.overlays.slice().forEach(function (c) { c(); });
      this.syncBack(); this.colors();
      if (built.after) setTimeout(built.after, 30);
    }
  };
  const scrollMem = {};

  function parentOf(p) {
    const a = p.split('/');
    switch (a[0]) {
      case 'm': return 'learn';
      case 'l': case 'q': return 'm/' + a[1];
      case 't': case 'glossary': case 'laws': case 'videos': return 'tools';
      case 'v': return 'videos';
      case 'exam': return a[1] ? 'exam' : '';
      default: return '';
    }
  }

  function route(p) {
    const a = p.split('/');
    switch (a[0]) {
      case '': return Screens.home();
      case 'learn': return Screens.learn();
      case 'm': return Screens.module(a[1]);
      case 'l': return Screens.lesson(a[1], parseInt(a[2] || '0', 10));
      case 'q': return Screens.quiz(a[1]);
      case 'tools': return Screens.tools();
      case 't': return Screens.tool(a[1]);
      case 'videos': return Screens.videos();
      case 'v': return Screens.video(a[1]);
      case 'exam': return a[1] === 'run' ? Screens.examRun() : a[1] === 'r' ? Screens.examResult(parseInt(a[2] || '0', 10)) : Screens.exam();
      case 'search': return Screens.search();
      case 'glossary': return Screens.glossary();
      case 'laws': return Screens.laws();
      case 'settings': return Screens.settings();
      case 'review': return Screens.review();
      default: return Screens.home();
    }
  }

  function tabbar(p) {
    const wrongN = Object.keys(Store.d.wrong || {}).length;
    const tabs = [['', 'home', 'Asosiy'], ['learn', 'book', 'Darslar'], ['tools', 'wrench', 'Vositalar'], ['exam', 'award', 'Test']];
    return h('nav.tabbar', { 'aria-label': 'Asosiy menyu' }, tabs.map(function (t) {
      const on = p === t[0];
      return h('button.tab' + (on ? '.active' : ''), { 'aria-current': on ? 'page' : null, onclick: function () { App.go(t[0]); } },
        h('span.ti', { html: IC(t[1], 22, on ? 2.4 : 2) }), t[2],
        t[0] === '' && wrongN > 0 ? null : null);
    }));
  }

  function topbar(title, sub, opts) {
    opts = opts || {};
    return h('header.topbar', null,
      opts.noBack ? null : h('button.icon-btn.tg-hide', { 'aria-label': 'Orqaga', html: IC('left', 20), onclick: function () { App.handleBack(); } }),
      h('div.grow', null, sub ? h('div.sub', sub) : null, h('h1', title)),
      opts.right || null,
      opts.home ? homeBtn(opts.home === true ? null : opts.home) : null);
  }
  function homeBtn(note, cls) {
    return h('button.icon-btn' + (cls || ''), { 'aria-label': 'Bosh sahifaga qaytish', title: 'Bosh sahifa', html: IC('home', 20), onclick: function () { App.home(note); } });
  }
  const SAVED_NOTE = 'Joyingiz saqlandi — "Davom etish" bilan qaytasiz';

  /* ---------------- progress helpers ---------------- */
  function modPct(m) {
    const st = Store.d.mods[m.id]; if (!st) return 0;
    const seen = (st.s || []).length / Math.max(1, m.steps.length);
    const q = st.q >= 0 ? st.q / 100 : 0;
    return Math.round((seen * .7 + q * .3) * 100);
  }
  function overallPct() { const ms = MODS(); if (!ms.length) return 0; return Math.round(ms.reduce(function (a, m) { return a + modPct(m); }, 0) / ms.length); }
  function mastery(q) { if (q == null || q < 0) return { t: 'Boshlanmagan', c: 'pill' }; if (q >= 100) return { t: 'Mukammal', c: 'pill ok' }; if (q >= 70) return { t: 'Yaxshi', c: 'pill brand' }; return { t: 'Takrorlash kerak', c: 'pill warn' }; }
  function grade(score) {
    if (score >= 86) return { n: 5, t: "A'lo", c: 'ok', e: "Ajoyib natija!" };
    if (score >= 71) return { n: 4, t: 'Yaxshi', c: 'brand', e: 'Yaxshi natija!' };
    if (score >= 56) return { n: 3, t: 'Qoniqarli', c: 'warn', e: "O'tdingiz, lekin takrorlash foydali." };
    return { n: 2, t: 'Qoniqarsiz', c: 'bad', e: 'Mavzularni qayta o\'qib, yana urinib ko\'ring.' };
  }
  App.grade = grade;
  function lastPlace() {
    let best = null;
    MODS().forEach(function (m) { const st = Store.d.mods[m.id]; if (st && st.t && (!best || st.t > best.t)) best = { m: m, st: st, t: st.t }; });
    return best;
  }

  function modStyle(m) { return { '--c1': m.c1, '--c2': m.c2 }; }

  /* =========================================================
     Screens
     ========================================================= */
  const Screens = {};

  Screens.error = function (err) {
    return h('div', null, topbar('Xatolik'), h('div.scroll', null, h('div.pad', null, h('div.empty', null, h('div.ei', { html: IC('alert', 28) }), h('b', 'Sahifani ochib bo\'lmadi'), h('p.small', String(err && err.message || err)), h('button.btn', { onclick: function () { App.go('', { replace: true }); } }, 'Bosh sahifa')))));
  };

  /* ---------- Home ---------- */
  function greetWord() {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 11) return 'Xayrli tong';
    if (hr >= 11 && hr < 17) return 'Xayrli kun';
    if (hr >= 17 && hr < 23) return 'Xayrli kech';
    return 'Assalomu alaykum';
  }
  // given name for the greeting: Telegram first name, the name typed in the intro,
  // or the "Familiya Ism" saved for the certificate (second word = ism)
  function givenName() {
    const u = TG.user(); if (u && u.first_name) return u.first_name;
    if (Store.d.first) return Store.d.first;
    const parts = String(Store.d.name || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return parts[0] || '';
    const sur = /(ov|ova|ev|eva|yev|yeva|zoda|zade|ovich|ovna)$/i;
    if (sur.test(parts[0]) && !sur.test(parts[1])) return parts[1];
    if (sur.test(parts[1]) && !sur.test(parts[0])) return parts[0];
    return parts[1];
  }
  function fullName() {
    const u = TG.user();
    return Store.d.name || (u ? [u.first_name, u.last_name].filter(Boolean).join(' ') : '') || Store.d.first || '';
  }

  Screens.home = function () {
    const first = givenName(), name = fullName();
    const pct = overallPct();
    const ms = MODS();
    const doneN = ms.filter(function (m) { return modPct(m) >= 100 || (Store.d.mods[m.id] && Store.d.mods[m.id].done); }).length;
    const streak = Store.streak();
    const wrongN = Object.keys(Store.d.wrong || {}).length;
    const lp = lastPlace();
    const ex = Store.d.exam || [];
    const fresh = !lp && !(Store.d.xp > 0) && !ex.length;
    const totalSteps = ms.reduce(function (a, m) { return a + m.steps.length; }, 0);
    const nVid = Object.keys(global.VIDEOS || {}).length;

    const hello = h('div.hello', null,
      h('div.avatar', name ? U.initials(name) : raw(IC('shield', 22))),
      h('div.grow', null, h('div.eyebrow', 'Toshkent-AERO IBK'), h('h2', greetWord() + (first ? ', ' + first : '') + '!')),
      h('button.icon-btn.on-dark', { 'aria-label': 'Sozlamalar', html: IC('settings', 20), onclick: function () { App.go('settings'); } }));
    const search = h('button.searchbox', { onclick: function () { App.go('search'); } }, raw(IC('search', 18)), 'Qoida, modda yoki atamani qidiring…');
    let hero;
    if (fresh) {
      const fact = function (ic, n, label) { return h('div.fact', null, h('span.fi', { html: IC(ic, 16) }), h('b', String(n)), h('span', label)); };
      hero = h('div.hero.on-navy', null, hello,
        h('p.hero-lead', 'Bojxona qoidalarini oddiy tilda, misollar va videodarslar bilan qadamma-qadam o\'rganing.'),
        h('div.facts', null,
          fact('layers', ms.length, 'modul'),
          fact('listc', totalSteps, 'dars'),
          fact('video', nVid, 'videodars'),
          fact('award', EXAM_N, 'savollik test')),
        search);
    } else {
      const xpEl = h('b', '0');
      const lead = pct >= 100 ? 'Kurs to\'liq o\'zlashtirildi. Yakuniy testda kuchingizni sinang!'
        : pct > 0 ? 'Kursning ' + pct + '% qismi o\'zlashtirildi. Davom etamiz!'
        : 'Yaxshi boshlanish! Bugun yana bir qadam qo\'yamiz.';
      hero = h('div.hero.on-navy', null, hello,
        h('p.hero-lead', lead),
        h('div.stats', null,
          UI.ring(pct, 64, 7, '<span style="font-size:1.05rem" aria-label="O\'zlashtirildi ' + pct + '%">' + pct + '%</span>', '#5eead4', '#60a5fa'),
          h('div.stat-grid', null,
            h('div.stat', null, h('b', doneN + '/' + ms.length), h('span', 'modul')),
            h('div.stat', null, xpEl, h('span', 'XP ball')),
            h('div.stat', null, h('b', null, String(streak), streak > 0 ? h('i.flame', { html: IC('flame', 14) }) : null), h('span', 'kun ketma-ket')))),
        search);
      setTimeout(function () { UI.countUp(xpEl, Store.d.xp || 0, 900); }, 200);
    }

    const body = h('div.pad.stack-lg.reveal');
    let k = 0;
    const add = function (el) { el.style.setProperty('--i', k++); body.appendChild(el); return el; };

    if (fresh) {
      // 1) one obvious first action
      const m0 = ms[0];
      if (m0) {
        const meta = function (ic, t) { return h('span.sc-chip', { html: IC(ic, 13) + ' ' + t }); };
        add(h('div', null, h('div.section-label', 'Shu yerdan boshlang'),
          h('div.start-card', { vars: modStyle(m0) },
            h('div.sc-top', null,
              h('div.tile.lg', { html: IC(m0.icon, 26) }),
              h('div.grow', null, h('div.sc-k', '1-modul'), h('div.sc-t', m0.title))),
            h('p.sc-d', m0.short),
            h('div.sc-meta', null,
              meta('listc', m0.steps.length + ' qadam'),
              m0.mins ? meta('clock', '≈ ' + m0.mins + ' daqiqa') : null,
              m0.video ? meta('video', 'videodars') : null),
            h('button.btn.block.sc-go', { onclick: function () { App.go('l/' + m0.id + '/0'); }, html: IC('play', 18) + ' Birinchi darsni boshlash' }))));
      }
      // 2) how the course works
      const steps = [
        ['book', '#14b8a6', '#0ea5e9', 'O\'qing va tomosha qiling', 'Har qadam oddiy tilda: hayotiy misol, "Eslab qoling" va qalamda chizilgan videodars.'],
        ['target', '#f59e0b', '#ea580c', 'Mashq qiling', 'Har darsdan keyin savol, modul oxirida mashq testi. Xatolar "Takrorlash" bo\'limiga yig\'iladi.'],
        ['award', '#e11d48', '#7c3aed', 'Yakuniy testni topshiring', EXAM_N + ' savol, ' + EXAM_MIN + ' daqiqa, 100 ball. 56 va undan yuqori ball — o\'tdi. Natijangiz bilan o\'quv sertifikati olasiz.']
      ];
      add(h('div', null, h('div.section-label', 'Qanday o\'qiladi?'),
        h('div.card.roadmap', null, steps.map(function (s, i) {
          return h('div.rm-step', null,
            h('div.rm-dot', { vars: { '--c1': s[1], '--c2': s[2] } }, h('span', { html: IC(s[0], 18) }), h('i', String(i + 1))),
            h('div.grow', null, h('b', s[3]), h('p', s[4])));
        }))));
    } else if (lp) {
      const m = lp.m, idx = Math.min(lp.st.last || 0, m.steps.length - 1), mp = modPct(m);
      add(h('div', null, h('div.section-label', 'Davom eting'),
        h('div.start-card', { vars: modStyle(m) },
          h('button.sc-top', { style: 'width:100%;text-align:left', onclick: function () { App.go('m/' + m.id); } },
            h('div.tile.lg', { html: IC(m.icon, 26) }),
            h('div.grow', null, h('div.sc-k', m.n ? m.n + '-modul · ' + mp + '%' : 'Maxsus bo\'lim · ' + mp + '%'), h('div.sc-t', m.title)),
            raw(IC('right', 20))),
          UI.bar(mp, m.c1, m.c2),
          h('div.sc-next', null, h('span.small.muted.bold', (idx + 1) + '/' + m.steps.length + '-qadam'), h('div.bold', m.steps[idx].t)),
          h('button.btn.block.sc-go', { onclick: function () { App.go('l/' + m.id + '/' + idx); }, html: IC('play', 18) + ' Davom etish' }))));
    } else {
      const m0 = ms[0];
      if (m0) add(h('button.card.continue-card', { style: 'width:100%;text-align:left', vars: modStyle(m0), onclick: function () { App.go('m/' + m0.id); } },
        h('div.tile.lg', { html: IC('rocket', 26) }),
        h('div.grow', null, h('div.card-title', 'O\'qishni boshlang'), h('div.small.muted', '1-moduldan boshlash tavsiya etiladi: asosiy tushunchalar va nazorat shakllari.')),
        raw(IC('right', 20))));
    }
    // mistakes to review
    if (!fresh && wrongN > 0) {
      add(h('button.card.continue-card.review-card', { style: 'width:100%;text-align:left', onclick: function () { App.go('review'); } },
        h('div.tile', { vars: { '--c1': '#f59e0b', '--c2': '#ea580c' }, html: IC('refresh', 22) }),
        h('div.grow', null, h('div.card-title', wrongN + ' ta savolni takrorlang'), h('div.small.muted', 'Xato qilingan savollar — 2 daqiqalik mashq.')),
        raw(IC('right', 20))));
    }
    // PF-174 feature
    const pf = modById('pf174');
    if (pf) add(h('button.feature', { onclick: function () { App.go('m/pf174'); } },
      h('span.pill.new', { html: IC('sparkles', 12) + ' Yangi farmon' }),
      h('h3', 'PF-174: "Yangi O\'zbekiston bojxonasi — 2030"'),
      h('p', 'Prezidentning 2026-yil 27-avgustdagi farmoni qadamma-qadam: nima o\'zgaradi, qachondan va kimga taalluqli. Bo\'lim oxirida test bor.'),
      h('div.row', { style: 'margin-top:12px;gap:8px' }, h('span.pill.on-dark', { html: IC('video', 12) + ' Videodars' }), h('span.pill.on-dark', { html: IC('listc', 12) + ' ' + pf.steps.length + ' qadam' }), h('span.pill.on-dark', { html: IC('award', 12) + ' 100 ballik test' }))));
    // quick tools
    add(h('div', null, h('div.section-label', 'Tezkor vositalar'),
      h('div.quick', null,
        quickBtn('video', 'Video-darslar', '#ef4444', '#f97316', function () { App.go('videos'); }),
        quickBtn('calc', 'Kalkulyator', '#10b981', '#0d9488', function () { App.go('t/import'); }),
        quickBtn('book', 'Lug\'at', '#8b5cf6', '#6366f1', function () { App.go('glossary'); }),
        quickBtn('scale', 'Qonunlar', '#0ea5e9', '#2563eb', function () { App.go('laws'); }),
        quickBtn('refresh', 'Takrorlash', '#f59e0b', '#ea580c', function () { App.go('review'); }, wrongN),
        quickBtn('award', 'Yakuniy test', '#e11d48', '#be123c', function () { App.go('exam'); }))));
    // modules preview
    const box = h('div.list');
    ms.slice(0, 4).forEach(function (m) { box.appendChild(modRow(m)); });
    add(h('div', null, h('div.section-label', null, 'Modullar', h('button', { onclick: function () { App.go('learn'); } }, 'Barchasi (' + ms.length + ') →')), box));
    // last exam
    if (ex.length) {
      const last = ex[ex.length - 1], g = grade(last.s);
      add(h('div', null, h('div.section-label', 'Oxirgi yakuniy test'),
        h('button.card.continue-card', { style: 'width:100%;text-align:left', onclick: function () { App.go('exam/r/' + (ex.length - 1)); } },
          UI.ring(last.s, 54, 6, '<span style="font-size:.95rem">' + last.s + '</span>', '#34d399', '#2563eb'),
          h('div.grow', null, h('div.card-title', g.t + ' (' + g.n + ')'), h('div.small.muted', U.dateUz(last.d) + ' · ' + last.r + '/' + EXAM_N + ' to\'g\'ri')),
          raw(IC('right', 20)))));
    }
    add(h('div.credit', null, h('b', 'Toshkent-AERO IBK · O\'quv qo\'llanmasi'), h('span', 'by SHAKHOBIDDIN NORMAMATOV')));
    return { el: h('div', null, h('div.scroll', null, hero, body)), tabs: true };
  };

  function quickBtn(ic, label, c1, c2, fn, badge) {
    return h('button', { onclick: fn }, h('div.tile.sm', { vars: { '--c1': c1, '--c2': c2 }, html: IC(ic, 18) }), label, badge ? h('span.badge', String(badge)) : null);
  }
  function modRow(m) {
    const pct = modPct(m);
    return h('button.list-row', { vars: modStyle(m), onclick: function () { App.go('m/' + m.id); } },
      h('div.tile.sm', { html: IC(m.icon, 18) }),
      h('div.grow', null, h('div.t', m.title), h('div.s', m.short)),
      pct > 0 ? h('span.pill' + (pct >= 100 ? '.ok' : '.brand'), pct + '%') : null,
      h('span.chev', { html: IC('right', 18) }));
  }

  /* ---------- Learn (course path) ---------- */
  Screens.learn = function () {
    const ms = MODS();
    let currentSet = false;
    const path = h('div.path');
    ms.forEach(function (m, i) {
      const pct = modPct(m), st = Store.d.mods[m.id];
      const isCur = !currentSet && pct < 100; if (isCur) currentSet = true;
      path.appendChild(h('button.node' + (isCur ? '.current' : ''), { vars: modStyle(m), style: '--i:' + i, onclick: function () { App.go('m/' + m.id); } },
        h('div.bubble', { html: IC(m.icon, 24) }, pct >= 100 ? h('span.done', { html: IC('check', 12, 3) }) : h('span.num', m.n ? String(m.n) : '★')),
        h('div.ncard', null,
          m.isNew ? h('span.pill.new', { style: 'margin-bottom:6px' }, 'Yangi') : null,
          h('div.t', m.title), h('div.s', m.short),
          h('div.meta', null, h('span', { html: IC('clock', 12) + ' ~' + m.mins + ' daq' }), UI.bar(pct, m.c1, m.c2), h('span', pct + '%')),
          st && st.q >= 0 ? h('div', { style: 'margin-top:6px' }, h('span.' + mastery(st.q).c.replace(' ', '.'), 'Mashq: ' + st.q + '/100')) : null)));
    });
    path.appendChild(h('button.node', { vars: { '--c1': '#e11d48', '--c2': '#9f1239' }, onclick: function () { App.go('exam'); } },
      h('div.bubble', { html: IC('award', 24) }),
      h('div.ncard', null, h('div.t', 'Yakuniy test'), h('div.s', EXAM_N + ' savol · ' + EXAM_MIN + ' daqiqa · 100 ball'))));
    path.classList.add('reveal');
    return { el: h('div', null, topbar("O'quv yo'li", ms.length + ' ta modul', { noBack: true }), h('div.scroll', null, h('div.pad', null, path))), tabs: true };
  };

  /* ---------- Module overview ---------- */
  Screens.module = function (id) {
    const m = modById(id); if (!m) return Screens.error('Modul topilmadi');
    const st = Store.d.mods[m.id] || { s: [], q: -1 };
    const pct = modPct(m);
    const started = (st.s || []).length > 0;
    const hero = h('div.hero.colored.on-navy', { vars: modStyle(m) },
      h('div.row', null, h('button.icon-btn.on-dark.tg-hide', { 'aria-label': 'Orqaga', html: IC('left', 20), onclick: function () { App.handleBack(); } }), h('div.grow'), m.isNew ? h('span.pill.on-dark', 'Yangi') : null, homeBtn(null, '.on-dark')),
      h('div.row', { style: 'margin-top:14px;align-items:flex-start;gap:14px' },
        h('div.grow', null, h('div.eyebrow', m.n ? m.n + '-modul' : 'Maxsus bo\'lim'), h('h2', m.title), h('p', m.short)),
        UI.ring(pct, 68, 7, '<span style="font-size:1rem">' + pct + '%</span>', '#ffffff', '#e0f2fe')),
      h('div.mod-meta', null,
        h('span.pill.on-dark', { html: IC('listc', 12) + ' ' + m.steps.length + ' qadam' }),
        h('span.pill.on-dark', { html: IC('clock', 12) + ' ~' + m.mins + ' daqiqa' }),
        m.video ? h('span.pill.on-dark', { html: IC('video', 12) + ' Videodars' }) : null,
        h('span.pill.on-dark', { html: IC('award', 12) + ' ' + QS().filter(function (q) { return q.m === m.id; }).length + ' ta savol' })));
    const body = h('div.pad.stack-lg.reveal');
    const startIdx = started ? Math.min(st.last || 0, m.steps.length - 1) : 0;
    body.appendChild(h('div.stack', { style: '--i:0' },
      h('button.btn.block', { vars: modStyle(m), style: 'background:linear-gradient(135deg,var(--c1),var(--c2))', onclick: function () { App.go('l/' + m.id + '/' + startIdx); }, html: IC(started ? 'play' : 'rocket', 18) + (started ? ' Davom etish (' + (startIdx + 1) + '-qadam)' : ' Darsni boshlash') }),
      h('div.btn-row', null,
        m.video ? h('button.btn.secondary', { onclick: function () { App.go('v/' + m.video); }, html: IC('video', 18) + ' Videodars' }) : null,
        h('button.btn.secondary', { onclick: function () { App.go('q/' + m.id); }, html: IC('target', 18) + ' ' + (m.id === 'pf174' ? 'Bo\'lim testi' : 'Mashq testi') }))));
    if (st.q >= 0) body.appendChild(h('div.card.flat.row', { style: '--i:1' }, h('div.tile.soft', { vars: modStyle(m), html: IC('award', 20) }), h('div.grow', null, h('div.bold', 'Eng yaxshi natija: ' + st.q + '/100'), h('div.small.muted', 'Urinishlar: ' + (st.qn || 0))), h('span.' + mastery(st.q).c.replace(' ', '.'), mastery(st.q).t)));
    const toc = h('div.list.toc');
    m.steps.forEach(function (s, i) {
      const seen = (st.s || []).indexOf(i) >= 0;
      toc.appendChild(h('button.list-row' + (seen ? '.seen' : ''), { onclick: function () { App.go('l/' + m.id + '/' + i); } },
        h('div.idx', { html: seen ? IC('check', 15, 3) : String(i + 1) }),
        h('div.grow', null, h('div.t', s.t), s.k ? h('div.s', s.k) : null),
        s.video ? h('span.pill.bad', { html: IC('video', 11) + ' video' }) : (s.b || []).some(function (b) { return b.widget; }) ? h('span.pill.brand', { html: IC('hand', 11) + ' interaktiv' }) : null,
        h('span.chev', { html: IC('right', 16) })));
    });
    body.appendChild(h('div', { style: '--i:2' }, h('div.section-label', 'Dars rejasi'), toc));
    if (m.refs && m.refs.length) body.appendChild(h('div', { style: '--i:3' }, h('div.section-label', 'Asosiy huquqiy hujjatlar'), h('div.card.flat', null, h('div.refs', { html: m.refs.map(function (r) { return rich('{ref:' + r + '}'); }).join(' ') }), h('p.small.muted', { style: 'margin:10px 0 0' }, 'Chipni bosing — hujjatning qisqa izohi va lex.uz havolasi ochiladi.'))));
    return { el: h('div', null, h('div.scroll', null, hero, body)) };
  };

  /* ---------- Lesson (step-by-step) ---------- */
  Screens.lesson = function (id, idx) {
    const m = modById(id); if (!m) return Screens.error('Modul topilmadi');
    idx = U.clamp(idx || 0, 0, m.steps.length - 1);
    const step = m.steps[idx];
    const st = Store.mod(m.id);
    if (st.s.indexOf(idx) < 0) { st.s.push(idx); Store.addXp(5); }
    st.last = idx; st.t = Date.now();
    if (st.s.length >= m.steps.length) st.done = 1;
    Store.save();

    const seg = h('div.segbar', { vars: modStyle(m) }, m.steps.map(function (_, i) { return h('i' + (i <= idx ? '.on' : '')); }));
    const top = h('header.topbar.lesson-top', null,
      h('button.icon-btn', { 'aria-label': 'Darsni yopish', html: IC('x', 20), onclick: function () { App.go('m/' + m.id, { replace: true, dir: 'back' }); } }),
      seg, h('div.small.bold.muted.nowrap', (idx + 1) + '/' + m.steps.length),
      homeBtn(SAVED_NOTE));
    const content = h('div.pad.stack-lg', { vars: modStyle(m) },
      h('div', null, h('div.step-kicker', { html: IC(step.i || m.icon, 14) + ' ' + esc(step.k || (m.n ? m.n + '-modul' : 'PF-174')) }), h('h2.step-title', step.t)));
    if (step.video) content.appendChild(videoBlock(step.video, function () { next(); }));
    renderBlocks(step.b || [], content, m);
    const scroll = h('div.scroll', null, content);
    const isLast = idx === m.steps.length - 1;
    function next() { if (isLast) App.go('q/' + m.id, { replace: true }); else App.go('l/' + m.id + '/' + (idx + 1), { replace: true }); }
    const foot = h('div.lesson-foot', null,
      h('button.btn.secondary', { 'aria-label': 'Oldingi qadam', disabled: idx === 0 ? true : null, html: IC('left', 20), onclick: function () { App.go('l/' + m.id + '/' + (idx - 1), { replace: true, dir: 'back' }); } }),
      h('button.btn', { vars: modStyle(m), style: 'background:linear-gradient(135deg,var(--c1),var(--c2))', html: isLast ? (IC('target', 18) + ' ' + (m.id === 'pf174' ? 'Bo\'lim testiga o\'tish' : 'Mashq testiga o\'tish')) : ('Davom etish ' + IC('arrow', 18)), onclick: next }));
    const el = h('div', null, top, scroll, foot);
    el.addEventListener('keydown', function (e) { if (e.target.closest('input,textarea')) return; if (e.key === 'ArrowRight') next(); });
    return { el: el };
  };

  function videoBlock(vid, onEnd) {
    const v = (global.VIDEOS || {})[vid];
    if (!v) return h('div.card', 'Video topilmadi');
    const p = new Board.Player(v, { onEnd: onEnd });
    return p.el;
  }

  /* ---------- content blocks ---------- */
  function renderBlocks(blocks, into, m) {
    blocks.forEach(function (b, i) {
      const el = block(b, m);
      if (el) { el.classList.add('blk'); el.style.setProperty('--i', i); into.appendChild(el); }
    });
  }
  App.renderBlocks = renderBlocks;

  function headEl(icon, text) { return h('div.blk-head', { html: IC(icon, 14) + ' ' + esc(text) }); }

  function block(b, m) {
    if (b.lead) return h('p.lead', { html: rich(b.lead) });
    if (b.p) return h('p.p', { html: rich(b.p) });
    if (b.plain) return h('div.blk-plain', null, headEl('bulb', b.head || 'Oddiy tilda'), h('p.p', { html: rich(b.plain) }));
    if (b.tip) return h('div.blk-tip', null, headEl('star', b.head || 'Eslab qoling'), h('p', { html: rich(b.tip) }));
    if (b.ex) return h('div.blk-ex', null, headEl('user', b.head || 'Hayotiy misol'), h('p', { html: rich(b.ex) }));
    if (b.warn) return h('div.blk-warn', null, headEl('alert', b.head || 'Diqqat'), h('p', { html: rich(b.warn) }));
    if (b.ok) return h('div.blk-ok', null, headEl('okc', b.head || 'Ruxsat etiladi'), h('p', { html: rich(b.ok) }));
    if (b.verify) return h('div.blk-verify', null, headEl('info', b.head || 'Tekshirish tavsiya etiladi'), h('p', { html: rich(b.verify) }));
    if (b.list) {
      const ul = h('ul.blk-list' + (b.style ? '.' + b.style : ''));
      b.list.forEach(function (it, j) {
        const ic = b.i === 'num' ? String(j + 1) : null;
        ul.appendChild(h('li', null, h('span.li-ic', ic ? ic : { html: IC(b.i || (b.style === 'bad' ? 'ban' : 'check'), 15, 2.4) }), h('span', { html: rich(it) })));
      });
      return b.head ? h('div', null, h('div.section-label', { style: 'margin:0 2px 8px' }, b.head), ul) : ul;
    }
    if (b.grid) return h('div', null, b.head ? h('div.section-label', { style: 'margin:0 2px 8px' }, b.head) : null, h('div.blk-grid', null, b.grid.map(function (g) {
      return h('div.gi', null, g.i ? h('div.tile.sm.soft', { html: IC(g.i, 18) }) : null, g.v ? h('div.gv', g.v) : null, h('div.gt', { html: rich(g.t) }), g.s ? h('div.gs', { html: rich(g.s) }) : null);
    })));
    if (b.kv) return h('div.blk-kv', null, b.head ? h('div.kv-h', b.head) : null, b.kv.map(function (r) { return h('div.kv', null, h('span', { html: rich(r[0]) }), h('b', { html: rich(r[1]) })); }));
    if (b.num) return h('div.blk-num', null, h('div.v', b.num.v), h('div.l', { html: rich(b.num.l) }));
    if (b.steps) return h('div.card.flat', null, b.head ? h('div.section-label', { style: 'margin:0 0 12px' }, b.head) : null, h('div.blk-steps', null, b.steps.map(function (s, j) { return h('div.st', null, h('div.sn', String(s.n || j + 1)), h('div.sb', null, h('div.t', { html: rich(s.t) }), s.d ? h('div.d', { html: rich(s.d) }) : null)); })));
    if (b.cmp) return h('div.blk-compare', null, ['a', 'b'].map(function (k) { const c = b.cmp[k]; return h('div.col.' + k, null, h('h4', { html: IC(c.i || (k === 'a' ? 'okc' : 'xc'), 16) + ' ' + esc(c.t) }), h('ul', null, c.items.map(function (x) { return h('li', { html: rich(x) }); }))); }));
    if (b.law) {
      const L = (global.LAWS || {})[b.law.ref] || {};
      return h('details.blk-law', null, h('summary', { html: IC('scale', 16) + ' ' + esc(b.law.t || ('Qonun matni: ' + (L.t || b.law.ref))) + '<span class="chev">' + IC('down', 16) + '</span>' }), h('div.law-body', { html: rich(b.law.q) }));
    }
    if (b.table) {
      const t = h('table.blk-table');
      t.appendChild(h('thead', null, h('tr', null, b.table.h.map(function (c) { return h('th', c); }))));
      t.appendChild(h('tbody', null, b.table.r.map(function (r) { return h('tr', null, r.map(function (c) { const cls = /^✓/.test(c) ? 'ok' : /^✗/.test(c) ? 'bad' : null; return h('td', { class: cls, html: rich(c) }); })); })));
      return h('div.tbl-wrap', null, t);
    }
    if (b.refs) return h('div.refs', { html: b.refs.map(function (r) { return rich('{ref:' + r + '}'); }).join(' ') });
    if (b.widget) { const w = (global.Widgets || {})[b.widget]; return w ? w(b.o || {}, m) : h('div.card', 'Vidjet: ' + b.widget); }
    if (b.check) return inlineCheck(b.check, m);
    if (b.video) return videoBlock(b.video);
    return null;
  }

  function inlineCheck(c, m) {
    let answered = false;
    const box = h('div.check');
    const opts = h('div.opts');
    const fb = h('div');
    c.o.forEach(function (o, i) {
      opts.appendChild(h('button.opt', { onclick: function () {
        if (answered) return; answered = true;
        const ok = i === c.a;
        this.classList.add(ok ? 'right' : 'wrong');
        if (!ok) opts.children[c.a].classList.add('right');
        Array.prototype.forEach.call(opts.children, function (b, j) { if (j !== i && j !== c.a) b.classList.add('dim'); b.setAttribute('disabled', ''); });
        TG.note(ok ? 'success' : 'error');
        if (ok) Store.addXp(5); Store.save();
        fb.appendChild(h('div.feedback.' + (ok ? 'ok' : 'bad'), null, h('div.fh', { html: IC(ok ? 'okc' : 'xc', 18) + (ok ? " To'g'ri!" : " Noto'g'ri") }), c.ex ? h('p', { html: rich(c.ex) }) : null));
      } }, h('span.ol', 'ABCD'[i]), h('span', { html: rich(o) })));
    });
    box.appendChild(headEl('target', 'O\'zingizni tekshiring'));
    box.appendChild(h('div.q', { html: rich(c.q) }));
    box.appendChild(opts); box.appendChild(fb);
    return box;
  }

  /* ---------- Law sheet ---------- */
  function openLaw(id) {
    const L = (global.LAWS || {})[id];
    if (!L) { UI.toast('Hujjat ma\'lumoti topilmadi'); return; }
    const body = h('div.stack', null,
      h('div.row', null, h('div.tile.soft', { vars: { '--c1': '#4338ca' }, html: IC('scale', 20) }), h('div.grow', null, h('div.small.bold.muted', L.n), h('div.bold', L.a || L.t))),
      L.s ? h('div.blk-plain', { vars: { '--c1': '#4338ca' } }, headEl('bulb', 'Qisqacha, oddiy tilda'), h('p.p', { html: rich(L.s) })) : null,
      L.q ? h('details.blk-law', { open: true }, h('summary', { html: IC('doc', 16) + ' Hujjat matnidan<span class="chev">' + IC('down', 16) + '</span>' }), h('div.law-body', { html: rich(L.q) })) : null,
      L.note ? h('div.blk-warn', null, headEl('info', 'Izoh'), h('p', { html: rich(L.note) })) : null,
      L.u ? h('button.btn.secondary.block', { onclick: function () { TG.open(L.u); }, html: IC('ext', 18) + ' Rasmiy matnni lex.uz\'da ochish' }) : null,
      h('p.tiny.faint', { style: 'margin:0' }, 'Qo\'llanma o\'quv maqsadida tayyorlangan. Amaliyotda har doim hujjatning amaldagi rasmiy tahririga tayaning.'));
    UI.sheet({ title: L.t, body: body });
  }
  App.openLaw = openLaw;

  /* ---------- Module quiz (practice / section test) ---------- */
  function pickModuleQs(id) {
    const all = U.shuffle(QS().filter(function (q) { return q.m === id; }));
    const n = id === 'pf174' ? 20 : 10;
    return all.slice(0, n);
  }
  function shuffledQ(q) {
    const order = U.shuffle(q.o.map(function (_, i) { return i; }));
    return { q: q, order: order, a: order.indexOf(q.a) };
  }

  Screens.quiz = function (id, preset) {
    const m = id === '_review' ? { id: '_review', title: 'Takrorlash', c1: '#f59e0b', c2: '#ea580c', icon: 'refresh' } : modById(id);
    if (!m) return Screens.error('Modul topilmadi');
    const list = (preset || pickModuleQs(id)).map(shuffledQ);
    if (!list.length) return { el: h('div', null, topbar(m.title, 'Test'), h('div.scroll', null, h('div.pad', null, h('div.empty', null, h('div.ei', { html: IC('target', 28) }), h('b', 'Hozircha savollar yo\'q'))))) };
    let i = 0, picked = -1, checked = false, right = 0; const wrongs = [];
    const seg = h('div.segbar', { vars: modStyle(m) });
    list.forEach(function () { seg.appendChild(h('i')); });
    const top = h('header.topbar.lesson-top', null,
      h('button.icon-btn', { 'aria-label': 'Testni yopish', html: IC('x', 20), onclick: function () { App.handleBack(); } }), seg,
      h('div.small.bold.muted.nowrap', { id: 'qcount' }, ''),
      homeBtn());
    const content = h('div.pad.stack', { vars: modStyle(m) });
    const scroll = h('div.scroll', null, content);
    const btn = h('button.btn', { vars: modStyle(m), style: 'background:linear-gradient(135deg,var(--c1),var(--c2))', disabled: true });
    const foot = h('div.lesson-foot', null, btn);
    const el = h('div', null, top, scroll, foot);

    function show() {
      picked = -1; checked = false;
      const it = list[i];
      top.querySelector('#qcount').textContent = (i + 1) + '/' + list.length;
      Array.prototype.forEach.call(seg.children, function (s, j) { s.className = j < i ? 'on' : ''; });
      content.innerHTML = '';
      content.appendChild(h('div', null, h('div.qnum', (m.id === 'pf174' ? 'Bo\'lim testi' : m.id === '_review' ? 'Takrorlash' : 'Mashq testi') + ' · ' + (i + 1) + '-savol'), h('div.qtext', { html: rich(it.q.q) })));
      const opts = h('div.opts');
      it.order.forEach(function (oi, k) {
        opts.appendChild(h('button.opt', { onclick: function () {
          if (checked) return; picked = k; TG.sel();
          Array.prototype.forEach.call(opts.children, function (b, j) { b.classList.toggle('sel', j === k); });
          btn.disabled = false;
        } }, h('span.ol', 'ABCD'[k]), h('span', { html: rich(it.q.o[oi]) })));
      });
      content.appendChild(opts);
      btn.disabled = true; btn.innerHTML = 'Tekshirish';
      btn.onclick = check;
      scroll.scrollTop = 0;
    }
    function check() {
      if (picked < 0) return;
      checked = true;
      const it = list[i], ok = picked === it.a, opts = content.querySelector('.opts');
      Array.prototype.forEach.call(opts.children, function (b, j) { b.classList.remove('sel'); b.setAttribute('disabled', ''); if (j === it.a) b.classList.add('right'); else if (j === picked) b.classList.add('wrong'); else b.classList.add('dim'); });
      if (ok) { right++; if (Store.d.wrong[it.q.id]) { Store.d.wrong[it.q.id]--; if (Store.d.wrong[it.q.id] <= 0) delete Store.d.wrong[it.q.id]; } Store.addXp(10); }
      else { wrongs.push(it); Store.d.wrong[it.q.id] = 2; }
      Store.save();
      TG.note(ok ? 'success' : 'error');
      content.appendChild(h('div.feedback.' + (ok ? 'ok' : 'bad'), null,
        h('div.fh', { html: IC(ok ? 'okc' : 'xc', 18) + (ok ? " To'g'ri!" : " Noto'g'ri. To'g'ri javob: " + 'ABCD'[it.a]) }),
        h('p', { html: rich(it.q.ex || '') + (it.q.ref ? ' ' + rich('{ref:' + it.q.ref + '}') : '') })));
      setTimeout(function () { scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' }); }, 50);
      btn.innerHTML = i < list.length - 1 ? 'Keyingi savol ' + IC('arrow', 18) : 'Natijani ko\'rish ' + IC('award', 18);
      btn.onclick = function () { if (i < list.length - 1) { i++; show(); } else finish(); };
    }
    function finish() {
      const score = Math.round(right / list.length * 100);
      if (m.id !== '_review') { const st = Store.mod(m.id); st.q = Math.max(st.q, score); st.qn = (st.qn || 0) + 1; st.t = Date.now(); }
      Store.save();
      if (score >= 71) { UI.confetti(); TG.note('success'); }
      const g = grade(score);
      Array.prototype.forEach.call(seg.children, function (s) { s.className = 'on'; });
      top.querySelector('#qcount').textContent = '';
      content.innerHTML = '';
      content.appendChild(h('div.result-hero', null,
        UI.ring(score, 132, 11, '<span style="font-size:2.1rem">' + score + '</span><span class="small muted">/ 100 ball</span>', m.c1, m.c2),
        h('div.grade', g.t + ' · ' + g.n), h('div.gsub', right + ' / ' + list.length + ' to\'g\'ri javob. ' + g.e)));
      if (wrongs.length) {
        content.appendChild(h('div.section-label', 'Xatolar ustida ishlash'));
        wrongs.forEach(function (it) { content.appendChild(reviewItem(it.q, null)); });
      }
      const nextM = m.id !== '_review' ? MODS()[MODS().indexOf(m) + 1] : null;
      foot.innerHTML = '';
      foot.appendChild(h('button.btn.secondary', { 'aria-label': 'Qayta urinish', html: IC('replay', 20), onclick: function () { App.render(App.path, 'fade'); } }));
      foot.appendChild(nextM ? h('button.btn', { html: 'Keyingi modul ' + IC('arrow', 18), onclick: function () { App.go('m/' + nextM.id, { replace: true }); } })
        : h('button.btn', { html: 'Yakuniy testga ' + IC('award', 18), onclick: function () { App.go('exam', { replace: true }); } }));
      scroll.scrollTop = 0;
    }
    show();
    return { el: el };
  };

  Screens.review = function () {
    const ids = Object.keys(Store.d.wrong || {});
    if (!ids.length) {
      return { el: h('div', null, topbar('Takrorlash', 'Xatolar ustida ishlash'), h('div.scroll', null, h('div.pad', null, h('div.empty', null, h('div.ei', { html: IC('okc', 28) }), h('b', 'Takrorlash uchun savol yo\'q'), h('p.small', 'Mashq testlarida xato qilgan savollaringiz shu yerga tushadi va to\'g\'ri javob bermaguningizcha qaytib keladi.'), h('button.btn', { onclick: function () { App.go('learn'); } }, 'Darslarga o\'tish'))))) };
    }
    const qs = U.shuffle(QS().filter(function (q) { return ids.indexOf(q.id) >= 0; })).slice(0, 10);
    return Screens.quiz('_review', qs);
  };

  function reviewItem(q, userIdx) {
    return h('div.review-item', null,
      h('div.rq', { html: rich(q.q) }),
      userIdx != null && userIdx !== q.a ? h('div.ra.bad', { html: IC('xc', 16) + '<span>Sizning javobingiz: ' + (userIdx < 0 ? '<i>javob berilmagan</i>' : rich(q.o[userIdx])) + '</span>' }) : null,
      h('div.ra.ok', { html: IC('okc', 16) + '<span>To\'g\'ri javob: ' + rich(q.o[q.a]) + '</span>' }),
      q.ex ? h('div.rx', { html: rich(q.ex) + (q.ref ? ' ' + rich('{ref:' + q.ref + '}') : '') }) : null);
  }

  /* ---------- Final exam ---------- */
  function buildExam() {
    const ms = MODS();
    const per = {}; ms.forEach(function (m) { per[m.id] = U.shuffle(QS().filter(function (q) { return q.m === m.id; })); });
    const picked = [];
    ms.forEach(function (m) { picked.push.apply(picked, per[m.id].splice(0, 2)); });
    let pool = []; ms.forEach(function (m) { pool = pool.concat(per[m.id]); });
    pool = U.shuffle(pool);
    while (picked.length < EXAM_N && pool.length) picked.push(pool.pop());
    return U.shuffle(picked).slice(0, EXAM_N).map(function (q) { return { id: q.id, o: U.shuffle(q.o.map(function (_, i) { return i; })), u: -1, f: 0 }; });
  }

  Screens.exam = function () {
    const run = Store.d.run;
    const u = TG.user();
    const nameIn = h('input.input', { id: 'exname', placeholder: 'Familiya Ism', value: Store.d.name || (u ? [u.last_name, u.first_name].filter(Boolean).join(' ') : ''), autocomplete: 'name' });
    const body = h('div.pad.stack-lg.reveal');
    body.appendChild(h('div.card', { style: '--i:0' },
      h('div.row', null, h('div.tile.lg', { vars: { '--c1': '#e11d48', '--c2': '#7c3aed' }, html: IC('award', 28) }), h('div.grow', null, h('div.card-title', 'Yakuniy test'), h('div.small.muted', 'Barcha modullar, shu jumladan PF-174 bo\'yicha'))),
      h('div.blk-grid', { style: 'margin-top:14px' },
        h('div.gi', null, h('div.gv', String(EXAM_N)), h('div.gs', 'savol (bankdan tasodifiy)')),
        h('div.gi', null, h('div.gv', EXAM_MIN + ' daq'), h('div.gs', 'vaqt chegarasi')),
        h('div.gi', null, h('div.gv', '4 ball'), h('div.gs', 'har bir to\'g\'ri javob')),
        h('div.gi', null, h('div.gv', '100'), h('div.gs', 'maksimal ball')))));
    body.appendChild(h('div.card.flat', { style: '--i:1' }, h('div.section-label', { style: 'margin:0 0 10px' }, 'Baholash shkalasi'),
      h('div.blk-kv', null,
        h('div.kv', null, h('span', "86–100 ball"), h('b', { style: 'color:var(--ok)' }, "A'lo (5)")),
        h('div.kv', null, h('span', '71–85 ball'), h('b', { style: 'color:var(--brand)' }, 'Yaxshi (4)')),
        h('div.kv', null, h('span', '56–70 ball'), h('b', { style: 'color:var(--warn)' }, 'Qoniqarli (3)')),
        h('div.kv', null, h('span', '0–55 ball'), h('b', { style: 'color:var(--bad)' }, 'Qoniqarsiz (2)')))));
    body.appendChild(h('div.card.flat.stack', { style: '--i:2' },
      h('ul.blk-list', null,
        h('li', null, h('span.li-ic', { html: IC('info', 15) }), h('span', 'Test davomida javoblar ko\'rsatilmaydi — natija oxirida, har bir savol izohi bilan.')),
        h('li', null, h('span.li-ic', { html: IC('flag', 15) }), h('span', 'Savolni "bayroqcha" bilan belgilab, keyin qaytishingiz mumkin.')),
        h('li', null, h('span.li-ic', { html: IC('timer', 15) }), h('span', 'Vaqt tugasa test avtomatik yakunlanadi. Ilova yopilsa ham taymer davom etadi.'))),
      h('div.field', null, h('label', { for: 'exname' }, 'Sertifikat uchun F.I.Sh.'), nameIn, h('div.hint', 'Natija varaqasida ko\'rsatiladi.'))));
    const startBtn = h('button.btn.block', { html: IC('play', 18) + ' Testni boshlash', onclick: function () {
      Store.d.name = nameIn.value.trim();
      Store.d.run = { s: Date.now(), q: buildExam(), i: 0 };
      Store.save(); App.go('exam/run');
    } });
    body.appendChild(h('div.stack', { style: '--i:3' },
      run ? h('button.btn.block.ok', { html: IC('play', 18) + ' Boshlangan testni davom ettirish', onclick: function () { App.go('exam/run'); } }) : null,
      startBtn));
    const ex = Store.d.exam || [];
    if (ex.length) {
      const list = h('div.list');
      ex.slice().reverse().forEach(function (r, ri) {
        const idx = ex.length - 1 - ri, g = grade(r.s);
        list.appendChild(h('button.list-row', { onclick: function () { App.go('exam/r/' + idx); } },
          h('div.tile.sm.soft', { vars: { '--c1': g.c === 'ok' ? '#059669' : g.c === 'bad' ? '#dc2626' : '#2563eb' } }, String(r.s)),
          h('div.grow', null, h('div.t', g.t + ' (' + g.n + ') · ' + r.s + ' ball'), h('div.s', U.dateUz(r.d) + ' · ' + r.r + '/' + EXAM_N + ' to\'g\'ri')),
          h('span.chev', { html: IC('right', 16) })));
      });
      body.appendChild(h('div', { style: '--i:4' }, h('div.section-label', 'Urinishlar tarixi'), list));
    }
    return { el: h('div', null, topbar('Yakuniy test', '100 ballik baholash', { noBack: true }), h('div.scroll', null, body)), tabs: true };
  };

  Screens.examRun = function () {
    const run = Store.d.run;
    if (!run) return Screens.exam();
    const qmap = {}; QS().forEach(function (q) { qmap[q.id] = q; });
    run.q = run.q.filter(function (x) { return qmap[x.id]; });
    const limit = EXAM_MIN * 60 * 1000;
    let i = U.clamp(run.i || 0, 0, run.q.length - 1);
    const timer = h('div.timer', { html: IC('timer', 16) + '<span>30:00</span>' });
    const counter = h('div.grow', null, h('div.sub', 'Yakuniy test'), h('h1', ''));
    const gridBtn = h('button.icon-btn', { 'aria-label': 'Savollar ro\'yxati', html: IC('grid', 20), onclick: openNav });
    const top = h('header.topbar', null, h('button.icon-btn', { 'aria-label': 'Testni to\'xtatish', html: IC('x', 20), onclick: function () { App.handleBack(); } }), counter, timer, gridBtn);
    const content = h('div.pad.stack');
    const scroll = h('div.scroll', null, content);
    const prevB = h('button.btn.secondary', { 'aria-label': 'Oldingi savol', html: IC('left', 20), onclick: function () { if (i > 0) { i--; show(); } } });
    const flagB = h('button.btn.secondary', { 'aria-label': 'Belgilash', html: IC('flag', 20), onclick: function () { run.q[i].f = run.q[i].f ? 0 : 1; save(); show(); TG.sel(); } });
    const nextB = h('button.btn');
    const foot = h('div.lesson-foot', null, prevB, flagB, nextB);
    const el = h('div', null, top, scroll, foot);
    let tick = 0;

    function save() { run.i = i; Store.d.run = run; try { localStorage.setItem('ibk-qollanma-v2', JSON.stringify(Store.d)); } catch (e) {} }
    function left() { return limit - (Date.now() - run.s); }
    function updTimer() {
      if (!document.body.contains(el)) { clearInterval(tick); return; }
      const l = left();
      timer.querySelector('span').textContent = U.mmss(l);
      timer.classList.toggle('low', l < 5 * 60 * 1000);
      if (l <= 0) { clearInterval(tick); submit(true); }
    }
    function show() {
      const x = run.q[i], q = qmap[x.id];
      counter.querySelector('h1').textContent = (i + 1) + '-savol / ' + run.q.length;
      content.innerHTML = '';
      content.appendChild(h('div', null, h('div.qnum', x.f ? '⚑ Belgilangan' : 'Bitta to\'g\'ri javobni tanlang'), h('div.qtext', { html: rich(q.q) })));
      const opts = h('div.opts');
      x.o.forEach(function (oi, k) {
        opts.appendChild(h('button.opt' + (x.u === k ? '.sel' : ''), { onclick: function () { x.u = k; save(); TG.sel(); Array.prototype.forEach.call(opts.children, function (b, j) { b.classList.toggle('sel', j === k); }); } },
          h('span.ol', 'ABCD'[k]), h('span', { html: rich(q.o[oi]) })));
      });
      content.appendChild(opts);
      prevB.disabled = i === 0;
      flagB.classList.toggle('soft', !!x.f);
      const last = i === run.q.length - 1;
      nextB.innerHTML = last ? IC('check', 18) + ' Yakunlash' : 'Keyingi ' + IC('arrow', 18);
      nextB.className = 'btn' + (last ? ' ok' : '');
      nextB.onclick = function () { if (last) confirmSubmit(); else { i++; show(); } };
      scroll.scrollTop = 0; save();
    }
    function openNav() {
      const grid = h('div.navgrid');
      run.q.forEach(function (x, k) { grid.appendChild(h('button' + (x.u >= 0 ? '.ans' : '') + (k === i ? '.cur' : '') + (x.f ? '.flag' : ''), { onclick: function () { i = k; show(); close(); } }, String(k + 1))); });
      const answered = run.q.filter(function (x) { return x.u >= 0; }).length;
      const close = UI.sheet({ title: 'Savollar', body: h('div.stack', null, h('div.small.muted', 'Javob berilgan: ' + answered + ' / ' + run.q.length + ' · ⚑ belgilanganlar sariq nuqta bilan'), grid, h('button.btn.ok.block', { onclick: function () { close(); confirmSubmit(); }, html: IC('check', 18) + ' Testni yakunlash' })) });
    }
    function confirmSubmit() {
      const un = run.q.filter(function (x) { return x.u < 0; }).length;
      const close = UI.sheet({ title: un ? un + ' ta savolga javob berilmagan' : 'Testni yakunlaysizmi?', body: h('div.stack', null,
        h('p.p', un ? 'Javob berilmagan savollar 0 ball hisoblanadi. Qaytib javob berishingiz mumkin.' : 'Yakunlangandan so\'ng javoblarni o\'zgartirib bo\'lmaydi.'),
        h('div.btn-row', null, h('button.btn.secondary', { onclick: function () { close(); } }, 'Qaytish'), h('button.btn.ok', { onclick: function () { close(); submit(false); } }, 'Yakunlash'))) });
    }
    function submit(auto) {
      clearInterval(tick);
      let r = 0; const per = {};
      const items = run.q.map(function (x) {
        const q = qmap[x.id]; const ui = x.u >= 0 ? x.o[x.u] : -1; const ok = ui === q.a; if (ok) r++;
        per[q.m] = per[q.m] || [0, 0]; per[q.m][1]++; if (ok) per[q.m][0]++;
        if (!ok) Store.d.wrong[q.id] = 2;
        return [q.id, ui];
      });
      const score = Math.round(r / run.q.length * 100);
      const rec = { d: Date.now(), s: score, r: r, n: Store.d.name || '', m: per, a: items, t: Math.min(limit, Date.now() - run.s), id: U.uid() };
      Store.d.exam = (Store.d.exam || []).concat([rec]).slice(-5);
      Store.d.run = null; Store.addXp(score); Store.save();
      TG.guard(false);
      if (auto) UI.toast('Vaqt tugadi — test yakunlandi');
      App.guard = null;
      App.go('exam/r/' + (Store.d.exam.length - 1), { replace: true, force: true });
    }

    TG.guard(true);
    const res = { el: el, after: function () {
      App.guard = function (proceed) {
        const close = UI.sheet({ title: 'Testni to\'xtatasizmi?', body: h('div.stack', null, h('p.p', 'Javoblaringiz saqlanadi, taymer esa davom etadi. Keyinroq "Davom ettirish" orqali qaytishingiz mumkin.'), h('div.btn-row', null, h('button.btn.secondary', { onclick: function () { close(); } }, 'Davom etish'), h('button.btn.bad', { onclick: function () { close(); TG.guard(false); proceed(); } }, 'Chiqish'))) });
      };
    } };
    show(); updTimer(); tick = setInterval(updTimer, 1000);
    return res;
  };

  Screens.examResult = function (idx) {
    const ex = Store.d.exam || []; const r = ex[idx];
    if (!r) return Screens.exam();
    const qmap = {}; QS().forEach(function (q) { qmap[q.id] = q; });
    const g = grade(r.s);
    if (idx === ex.length - 1 && Date.now() - r.d < 4000 && r.s >= 71) setTimeout(UI.confetti, 400);
    const body = h('div.pad.stack-lg');
    body.appendChild(h('div.card.result-hero', null,
      UI.ring(r.s, 150, 12, '<span style="font-size:2.4rem">' + r.s + '</span><span class="small muted">/ 100 ball</span>', g.n >= 4 ? '#34d399' : g.n === 3 ? '#fbbf24' : '#f87171', '#2563eb'),
      h('div.grade', { style: 'color:var(--' + (g.c === 'brand' ? 'brand' : g.c) + ')' }, g.t + ' — ' + g.n + ' baho'),
      h('div.gsub', r.r + ' / ' + EXAM_N + ' to\'g\'ri · ' + U.mmss(r.t) + ' daqiqa · ' + U.dateUz(r.d)),
      h('p.p', { style: 'margin-top:8px' }, g.e)));
    body.appendChild(h('div.btn-row', null,
      h('button.btn.secondary', { html: IC('award', 18) + ' Sertifikat', onclick: function () { certificate(r); } }),
      h('button.btn.secondary', { html: IC('share', 18) + ' Ulashish', onclick: function () { TG.share('Bojxona qo\'llanmasi (Toshkent-AERO IBK) yakuniy testida ' + r.s + ' ball to\'pladim — ' + g.t + ' (' + g.n + ')!'); } })));
    // per module
    const mb = h('div.card.flat.stack');
    MODS().forEach(function (m) {
      const p = r.m[m.id]; if (!p) return;
      const pct = Math.round(p[0] / p[1] * 100);
      mb.appendChild(h('div.mbar', null, h('div.row-between', null, h('span', m.title), h('span.muted', p[0] + '/' + p[1])), UI.bar(pct, pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444')));
    });
    body.appendChild(h('div', null, h('div.section-label', 'Modullar kesimida'), mb));
    const weak = MODS().filter(function (m) { const p = r.m[m.id]; return p && p[0] / p[1] < .5; });
    if (weak.length) body.appendChild(h('div.blk-ex', null, headEl('bulb', 'Tavsiya'), h('p', null, 'Quyidagi modullarni qayta o\'qib chiqing: ', weak.map(function (m, k) { return h('a', { href: '#/m/' + m.id, 'data-go': 'm/' + m.id, style: 'font-weight:800' }, (k ? ', ' : '') + m.title); }))));
    // review
    const rev = h('div.stack');
    (r.a || []).forEach(function (a, k) { const q = qmap[a[0]]; if (!q) return; const item = reviewItem(q, a[1]); item.insertBefore(h('div.qnum', { style: 'margin-bottom:4px;color:' + (a[1] === q.a ? 'var(--ok)' : 'var(--bad)') }, (k + 1) + '-savol · ' + (a[1] === q.a ? '+4 ball' : '0 ball')), item.firstChild); rev.appendChild(item); });
    body.appendChild(h('div', null, h('div.section-label', 'Javoblar tahlili'), rev));
    body.appendChild(h('button.btn.block', { html: IC('replay', 18) + ' Qayta topshirish', onclick: function () { App.go('exam', { replace: true }); } }));
    return { el: h('div', null, topbar('Natija', 'Yakuniy test'), h('div.scroll', null, body)) };
  };

  function certificate(r) {
    const g = grade(r.s);
    const W = 1200, H = 860, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    const bgG = c.createLinearGradient(0, 0, W, H); bgG.addColorStop(0, '#0b1f3a'); bgG.addColorStop(1, '#164a7c');
    c.fillStyle = bgG; c.fillRect(0, 0, W, H);
    c.fillStyle = '#fffdf7'; roundRect(c, 36, 36, W - 72, H - 72, 28); c.fill();
    c.strokeStyle = '#c9a54a'; c.lineWidth = 4; roundRect(c, 58, 58, W - 116, H - 116, 20); c.stroke();
    c.textAlign = 'center';
    c.fillStyle = '#0b1f3a'; c.font = '800 26px Jakarta, sans-serif'; c.fillText('TOSHKENT-AERO IXTISOSLASHTIRILGAN BOJXONA KOMPLEKSI', W / 2, 140);
    c.fillStyle = '#c9a54a'; c.font = '800 64px Jakarta, sans-serif'; c.fillText('SERTIFIKAT', W / 2, 230);
    c.fillStyle = '#475569'; c.font = '600 26px Jakarta, sans-serif'; c.fillText('"Bojxona xodimi qo\'llanmasi" o\'quv kursi bo\'yicha yakuniy test', W / 2, 285);
    c.fillStyle = '#0f172a'; c.font = '700 64px Caveat, cursive'; c.fillText(r.n || 'Tinglovchi', W / 2, 390);
    c.strokeStyle = '#cbd5e1'; c.lineWidth = 2; c.beginPath(); c.moveTo(300, 410); c.lineTo(W - 300, 410); c.stroke();
    c.fillStyle = '#334155'; c.font = '600 28px Jakarta, sans-serif'; c.fillText('yakuniy testdan 100 balldan', W / 2, 470);
    c.fillStyle = '#2563eb'; c.font = '800 96px Jakarta, sans-serif'; c.fillText(String(r.s), W / 2, 580);
    c.fillStyle = '#0f172a'; c.font = '800 34px Jakarta, sans-serif'; c.fillText('ball to\'pladi — ' + g.t + ' (' + g.n + ')', W / 2, 640);
    c.fillStyle = '#64748b'; c.font = '600 22px Jakarta, sans-serif'; c.fillText(U.dateUz(r.d) + '   ·   ' + r.r + '/' + EXAM_N + ' to\'g\'ri javob   ·   ID: ' + (r.id || ''), W / 2, 700);
    c.fillStyle = '#94a3b8'; c.font = '600 18px Jakarta, sans-serif'; c.fillText('Kurs muallifi: Shakhobiddin Normamatov  ·  O\'quv sertifikati, rasmiy hujjat hisoblanmaydi', W / 2, 770);
    const url = cv.toDataURL('image/png');
    const img = h('img.cert-img', { src: url, alt: 'Sertifikat' });
    const dl = h('a.btn.block', { href: url, download: 'sertifikat-' + r.s + '.png', html: IC('download', 18) + ' Rasmni yuklab olish' });
    UI.sheet({ title: 'O\'quv sertifikati', body: h('div.stack', null, img, TG.in ? h('p.small.muted', { style: 'margin:0' }, 'Telegram ichida saqlash uchun rasmni bosib turing yoki skrinshot oling.') : dl) });
  }
  function roundRect(c, x, y, w, h2, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h2, r); c.arcTo(x + w, y + h2, x, y + h2, r); c.arcTo(x, y + h2, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

  /* ---------- Tools ---------- */
  const TOOLS = [
    { id: 'import', t: 'Import kalkulyatori', s: 'Bojsiz me\'yor va yagona bojxona to\'lovi (hozir va 2027-yildan)', i: 'calc', c1: '#10b981', c2: '#0d9488' },
    { id: 'storage', t: 'Saqlash to\'lovi', s: 'Vaqtincha saqlash narxini kunlar va og\'irlik bo\'yicha hisoblash', i: 'store', c1: '#d946ef', c2: '#9333ea' },
    { id: 'currency', t: 'Naqd valyuta', s: 'Olib kirish/chiqish: deklaratsiya kerakmi?', i: 'cash', c1: '#22c55e', c2: '#059669' },
    { id: 'jewelry', t: 'Zargarlik buyumlari', s: 'Oltin va kumushni olib chiqish me\'yori', i: 'gem', c1: '#f59e0b', c2: '#d97706' },
    { id: 'ybd', t: 'YBD kerakmi?', s: 'Bir necha savolda aniqlang', i: 'file', c1: '#f97316', c2: '#ea580c' },
    { id: 'corridor', t: 'Qaysi yo\'lak?', s: 'Yashil yoki qizil — vaziyatli o\'yin', i: 'route', c1: '#0ea5e9', c2: '#2563eb' },
    { id: 'banned', t: 'Taqiq / ruxsat', s: 'Olib kirish mumkinmi? — kartochkalar o\'yini', i: 'ban', c1: '#ef4444', c2: '#be123c' },
    { id: 'sorter', t: 'Shaxsiy yoki tijorat?', s: 'Tovarlarni to\'g\'ri toifaga ajrating', i: 'brief', c1: '#6366f1', c2: '#7c3aed' }
  ];
  App.TOOLS = TOOLS;

  /* live Central Bank rates (assets/js/fx.js) */
  function fxCard() {
    const grid = h('div.fx-grid');
    function draw() {
      grid.innerHTML = '';
      ['USD', 'EUR', 'RUB'].forEach(function (c) {
        const v = FX.rate(c), d = FX.isLive(c) ? (FX.diff[c] || 0) : 0;
        grid.appendChild(h('button.fx-cell', { type: 'button', 'aria-label': '1 ' + c + ' = ' + U.num(v, 2) + ' so\'m', onclick: function () { App.go('t/currency'); } },
          h('span.fx-c', c),
          h('b', U.num(v, 2)),
          d ? h('span.fx-d.' + (d > 0 ? 'up' : 'down'), (d > 0 ? '▲ +' : '▼ ') + U.num(d, 2)) : h('span.fx-d', 'so\'m')));
      });
    }
    const el = h('div.card.fx-card', null,
      h('div.fx-head', null, h('div.tile.sm', { vars: { '--c1': '#22c55e', '--c2': '#059669' }, html: IC('coins', 18) }), h('div.grow', null, h('div.t', 'Valyuta kurslari'), h('div.s', 'Markaziy bank · 1 birlik uchun so\'m'))),
      grid, FX.badge());
    FX.watch(el, draw); draw();
    return el;
  }

  Screens.tools = function () {
    const body = h('div.pad.stack-lg.reveal');
    body.appendChild(h('div', { style: '--i:0' }, fxCard()));
    const list = h('div.list');
    TOOLS.forEach(function (t) { list.appendChild(h('button.list-row', { vars: { '--c1': t.c1, '--c2': t.c2 }, onclick: function () { App.go('t/' + t.id); } }, h('div.tile.sm', { html: IC(t.i, 18) }), h('div.grow', null, h('div.t', t.t), h('div.s', t.s)), h('span.chev', { html: IC('right', 16) }))); });
    body.appendChild(h('div', { style: '--i:1' }, h('div.section-label', 'Kalkulyator va mashqlar'), list));
    const list2 = h('div.list');
    [['videos', 'video', 'Videodarslar', 'Qalamda chizilgan tushuntirishlar', '#ef4444', '#f97316'], ['laws', 'scale', 'Qonunlar kutubxonasi', 'Hujjatlar va moddalar — oddiy tilda', '#0ea5e9', '#2563eb'], ['glossary', 'book', 'Atamalar lug\'ati', 'YBD, YBT, XBT, BHM va boshqalar', '#8b5cf6', '#6366f1'], ['review', 'refresh', 'Takrorlash', 'Xato qilingan savollar', '#f59e0b', '#ea580c'], ['search', 'search', 'Qidiruv', 'Butun qo\'llanma bo\'ylab', '#64748b', '#334155']].forEach(function (x) {
      list2.appendChild(h('button.list-row', { vars: { '--c1': x[4], '--c2': x[5] }, onclick: function () { App.go(x[0]); } }, h('div.tile.sm', { html: IC(x[1], 18) }), h('div.grow', null, h('div.t', x[2]), h('div.s', x[3])), h('span.chev', { html: IC('right', 16) })));
    });
    body.appendChild(h('div', { style: '--i:2' }, h('div.section-label', 'Ma\'lumotnoma'), list2));
    return { el: h('div', null, topbar('Vositalar', 'Amaliy yordamchilar', { noBack: true, right: h('button.icon-btn', { 'aria-label': 'Sozlamalar', html: IC('settings', 20), onclick: function () { App.go('settings'); } }) }), h('div.scroll', null, body)), tabs: true };
  };

  Screens.tool = function (id) {
    const t = TOOLS.find(function (x) { return x.id === id; });
    if (!t) return Screens.tools();
    const w = (global.Widgets || {})[{ import: 'importCalc', storage: 'storageCalc', currency: 'currency', jewelry: 'jewelry', ybd: 'ybdWizard', corridor: 'corridor', banned: 'banned', sorter: 'sorter' }[id]];
    const body = h('div.pad.stack-lg', { vars: { '--c1': t.c1, '--c2': t.c2 } }, w ? w({ full: true }) : h('div.card', 'Vosita topilmadi'));
    return { el: h('div', null, topbar(t.t, 'Vosita'), h('div.scroll', null, body)) };
  };

  /* ---------- Videos ---------- */
  Screens.videos = function () {
    const body = h('div.pad.stack.reveal');
    let k = 0;
    MODS().forEach(function (m) {
      if (!m.video || !(global.VIDEOS || {})[m.video]) return;
      const v = global.VIDEOS[m.video]; const seen = Store.d.vids[m.video];
      const dur = Board.duration(v), nScenes = v.build().length;
      body.appendChild(h('button.card.continue-card', { style: 'width:100%;text-align:left;--i:' + (k++), vars: modStyle(m), onclick: function () { App.go('v/' + m.video); } },
        h('div.tile.lg', { html: IC('play', 24) }),
        h('div.grow', null, h('div.small.bold.muted', m.n ? m.n + '-modul' : 'PF-174'), h('div.card-title', v.title), h('div.small.muted', { html: IC('clock', 12) + ' ' + U.mmss(dur) + ' · ' + nScenes + ' sahna' + (seen ? ' · <b style="color:var(--ok)">ko\'rilgan ✓</b>' : '') })),
        raw(IC('right', 20))));
    });
    return { el: h('div', null, topbar('Videodarslar', 'Qalamda chizilgan tushuntirishlar'), h('div.scroll', null, body)) };
  };
  Screens.video = function (vid) {
    const v = (global.VIDEOS || {})[vid]; if (!v) return Screens.videos();
    const m = MODS().find(function (x) { return x.video === vid; });
    const body = h('div.pad.stack-lg', null,
      videoBlock(vid, m ? function () { App.go('l/' + m.id + '/' + Math.min(1, m.steps.length - 1)); } : null),
      h('div.card.flat', null, h('div.blk-head', { html: IC('info', 14) + ' Qanday ko\'rish kerak' }), h('p.p', 'Ekranga bosib pauza qiling, pastdagi chiziq bo\'yicha istalgan sahnaga o\'ting. "CC" — subtitrlar, "1×" — tezlik, burchakdagi tugma — to\'liq ekran.')),
      m ? h('button.btn.block.secondary', { vars: modStyle(m), onclick: function () { App.go('m/' + m.id); }, html: IC('book', 18) + ' "' + esc(m.title) + '" moduliga o\'tish' }) : null);
    return { el: h('div', null, topbar(v.title, 'Videodars', { home: true }), h('div.scroll', null, body)) };
  };

  /* ---------- Search ---------- */
  function buildIndex() {
    const idx = [];
    MODS().forEach(function (m) {
      idx.push({ t: m.title, s: m.short, k: 'Modul', go: 'm/' + m.id, txt: m.title + ' ' + m.short + ' ' + (m.kw || ''), ic: m.icon });
      m.steps.forEach(function (s, i) {
        const txt = [s.t, s.k].concat((s.b || []).map(function (b) { return JSON.stringify(b); })).join(' ').replace(/\{ref:[^}]+\}/g, ' ').replace(/[*=]{2}/g, '');
        idx.push({ t: s.t, s: m.title + ' · ' + (i + 1) + '-qadam', k: 'Dars', go: 'l/' + m.id + '/' + i, txt: txt, ic: s.i || m.icon });
      });
    });
    Object.keys(global.LAWS || {}).forEach(function (id) { const L = global.LAWS[id]; idx.push({ t: L.t, s: L.a || L.n, k: 'Hujjat', ref: id, txt: [L.t, L.n, L.a, L.s].join(' '), ic: 'scale' }); });
    (global.GLOSSARY || []).forEach(function (g) { idx.push({ t: g[0], s: g[1], k: 'Atama', go: 'glossary', txt: g[0] + ' ' + g[1], ic: 'book' }); });
    TOOLS.forEach(function (t) { idx.push({ t: t.t, s: t.s, k: 'Vosita', go: 't/' + t.id, txt: t.t + ' ' + t.s, ic: t.i }); });
    return idx;
  }
  let INDEX = null;
  Screens.search = function () {
    if (!INDEX) INDEX = buildIndex();
    const input = h('input', { type: 'search', placeholder: 'Masalan: shaxsiy ko\'rik, 1000 dollar, YBD', 'aria-label': 'Qidiruv', enterkeyhint: 'search' });
    const results = h('div.stack');
    const sugg = ['shaxsiy ko\'rik', '1000', 'YBD', 'valyuta', 'dron', 'xolis', '3 soat', 'PF-174', 'yagona bojxona to\'lovi', 'masofaviy'];
    function run() {
      const q = U.norm(input.value); results.innerHTML = '';
      if (q.length < 2) {
        results.appendChild(h('div.section-label', 'Tez-tez qidiriladi'));
        results.appendChild(h('div.refs', null, sugg.map(function (s) { return h('button.pill.brand', { style: 'padding:8px 12px;font-size:.82rem', onclick: function () { input.value = s; run(); } }, s); })));
        return;
      }
      const terms = q.split(' ');
      const hits = INDEX.filter(function (it) { const t = U.norm(it.txt); return terms.every(function (w) { return t.indexOf(w) >= 0; }); }).slice(0, 40);
      if (!hits.length) { results.appendChild(h('div.empty', null, h('div.ei', { html: IC('search', 28) }), h('b', 'Hech narsa topilmadi'), h('p.small', 'Boshqa so\'z bilan izlab ko\'ring.'))); return; }
      const list = h('div.list');
      hits.forEach(function (it) {
        const mark = function (s) { let o = esc(s); terms.forEach(function (w) { if (w.length < 2) return; const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'); o = o.replace(re, '<em>$1</em>'); }); return o; };
        list.appendChild(h('button.list-row.hit', { onclick: function () { if (it.ref) openLaw(it.ref); else App.go(it.go); } },
          h('div.tile.sm.soft', { html: IC(it.ic || 'search', 18) }),
          h('div.grow', null, h('div.t', { html: mark(it.t) }), h('div.s', { html: '<b>' + it.k + '</b> · ' + mark(String(it.s || '').slice(0, 120)) })),
          h('span.chev', { html: IC('right', 16) })));
      });
      results.appendChild(h('div.small.muted', hits.length + ' ta natija'));
      results.appendChild(list);
    }
    input.addEventListener('input', U.debounce(run, 120));
    const top = h('header.topbar', null, h('button.icon-btn.tg-hide', { 'aria-label': 'Orqaga', html: IC('left', 20), onclick: function () { App.handleBack(); } }), h('label.search-input', null, raw(IC('search', 18)), input));
    run();
    return { el: h('div', null, top, h('div.scroll', null, h('div.pad', null, results))), after: function () { input.focus(); } };
  };

  /* ---------- Glossary ---------- */
  Screens.glossary = function () {
    const items = (global.GLOSSARY || []).slice().sort(function (a, b) { return a[0].localeCompare(b[0], 'uz'); });
    const input = h('input', { type: 'search', placeholder: 'Atamani qidiring', 'aria-label': 'Atamani qidiring' });
    const list = h('div.list');
    function run() { const q = U.norm(input.value); list.innerHTML = ''; items.filter(function (g) { return !q || U.norm(g[0] + ' ' + g[1]).indexOf(q) >= 0; }).forEach(function (g) { list.appendChild(h('div.gl-item', null, h('b', g[0]), h('span', { html: rich(g[1]) }))); }); }
    input.addEventListener('input', run); run();
    return { el: h('div', null, topbar('Atamalar lug\'ati', items.length + ' ta atama'), h('div.scroll', null, h('div.pad.stack', null, h('label.search-input', null, raw(IC('search', 18)), input), list))) };
  };

  /* ---------- Laws library ---------- */
  Screens.laws = function () {
    const L = global.LAWS || {};
    const groups = {};
    Object.keys(L).forEach(function (id) { const g = L[id].g || 'Boshqa hujjatlar'; (groups[g] = groups[g] || []).push(id); });
    const body = h('div.pad.stack-lg');
    body.appendChild(h('div.blk-plain', null, headEl('bulb', 'Qanday foydalanish kerak'), h('p.p', 'Har bir hujjatni bosing: avval oddiy tildagi qisqa izoh, keyin hujjatdan parcha va rasmiy matnga havola chiqadi.')));
    Object.keys(groups).forEach(function (g) {
      const list = h('div.list');
      groups[g].forEach(function (id) { const x = L[id]; list.appendChild(h('button.list-row', { onclick: function () { openLaw(id); } }, h('div.tile.sm.soft', { vars: { '--c1': '#4338ca' }, html: IC('scale', 18) }), h('div.grow', null, h('div.t', x.t), h('div.s', x.a || x.n)), h('span.chev', { html: IC('right', 16) }))); });
      body.appendChild(h('div', null, h('div.section-label', g), list));
    });
    return { el: h('div', null, topbar('Qonunlar kutubxonasi', Object.keys(L).length + ' ta havola'), h('div.scroll', null, body)) };
  };

  /* ---------- Settings ---------- */
  Screens.settings = function () {
    const s = Store.d.set;
    function seg(options, val, onPick) {
      const el = h('div.seg', { role: 'radiogroup' });
      options.forEach(function (o) { el.appendChild(h('button' + (String(o[0]) === String(val) ? '.on' : ''), { role: 'radio', 'aria-checked': String(String(o[0]) === String(val)), onclick: function () { Array.prototype.forEach.call(el.children, function (b) { b.classList.remove('on'); b.setAttribute('aria-checked', 'false'); }); this.classList.add('on'); this.setAttribute('aria-checked', 'true'); onPick(o[0]); } }, o[1])); });
      return el;
    }
    const body = h('div.pad.stack-lg');
    body.appendChild(h('div.card.stack', null,
      h('div.field', null, h('label', 'Mavzu'), seg([['auto', 'Avto'], ['light', 'Yorug\''], ['dark', 'Tungi']], s.theme, function (v) { s.theme = v; Store.save(); App.applySettings(); })),
      h('div.field', null, h('label', 'Matn o\'lchami'), seg([[0.92, 'Kichik'], [1, 'O\'rta'], [1.1, 'Katta'], [1.2, 'Juda katta']], s.fs, function (v) { s.fs = v; Store.save(); App.applySettings(); })),
      h('div.field', null, h('label', 'Animatsiyalar'), seg([['auto', 'Avto'], ['full', 'To\'liq'], ['reduce', 'Kamaytirilgan']], s.motion, function (v) { s.motion = v; Store.save(); App.applySettings(); }))));
    const name = h('input.input', { value: Store.d.name || '', placeholder: 'Familiya Ism' });
    name.addEventListener('change', function () { Store.d.name = name.value.trim(); Store.save(); UI.toast('Saqlandi'); });
    body.appendChild(h('div.card.stack', null, h('div.field', null, h('label', 'F.I.Sh. (sertifikat uchun)'), name)));
    const list = h('div.list');
    list.appendChild(h('button.list-row', { onclick: function () { Intro.show(); } }, h('div.tile.sm.soft', { html: IC('sparkles', 18) }), h('div.grow', null, h('div.t', 'Kirish taqdimotini qayta ko\'rish')), h('span.chev', { html: IC('right', 16) })));
    list.appendChild(h('button.list-row', { onclick: function () {
      const close = UI.sheet({ title: 'Progressni tozalash', body: h('div.stack', null, h('p.p', 'Barcha o\'qilgan qadamlar, test natijalari va XP o\'chiriladi. Bu amalni ortga qaytarib bo\'lmaydi.'), h('div.btn-row', null, h('button.btn.secondary', { onclick: function () { close(); } }, 'Bekor qilish'), h('button.btn.bad', { onclick: function () { Store.reset(); close(); UI.toast('Progress tozalandi'); App.go('', { replace: true, force: true }); } }, 'Tozalash'))) });
    } }, h('div.tile.sm.soft', { vars: { '--c1': '#dc2626' }, html: IC('trash', 18) }), h('div.grow', null, h('div.t', 'Progressni tozalash'), h('div.s', 'O\'qish va test natijalarini nolga qaytarish')), h('span.chev', { html: IC('right', 16) })));
    body.appendChild(list);
    body.appendChild(h('div.card.flat.stack', null,
      h('div.row', null, h('div.tile', { html: IC('shield', 22) }), h('div.grow', null, h('div.bold', 'Bojxona xodimi qo\'llanmasi'), h('div.small.muted', 'Toshkent-AERO IBK · versiya 2.0 · ' + (TG.in ? 'Telegram Mini App rejimi' : 'Brauzer rejimi')))),
      h('p.small.muted', { style: 'margin:0' }, 'Muallif: Shakhobiddin Normamatov. Qo\'llanma o\'quv maqsadida tayyorlangan; me\'yorlar o\'zgarishi mumkin — amaliyotda lex.uz\'dagi amaldagi tahrirga tayaning. Progress qurilmada va Telegram bulutida saqlanadi.')));
    return { el: h('div', null, topbar('Sozlamalar', 'Shaxsiy'), h('div.scroll', null, body)) };
  };

  /* =========================================================
     Intro / onboarding
     ========================================================= */
  const Intro = {
    open: false,
    slides: [
      { t: 'Xush kelibsiz!', d: 'Toshkent-AERO IBK bojxona xodimlari uchun interaktiv qo\'llanma. 10 ta modul — nazorat shakllaridan yangi PF-174 farmonigacha.', art: 'book' },
      { t: 'Qalamda chizilgan videodarslar', d: 'Murakkab qoidalar doskada qadamma-qadam chizib tushuntiriladi. Pauza qiling, qayta ko\'ring, subtitrlarni yoqing.', art: 'board' },
      { t: 'Interaktiv mashqlar', d: 'Kalkulyatorlar, vaziyatli o\'yinlar va har bir darsdan keyin darhol tekshiriladigan savollar.', art: 'hand' },
      { t: 'Yakuniy test — 100 ball', d: '25 savol, 30 daqiqa. Natija modullar kesimida tahlil qilinadi va o\'quv sertifikati beriladi.', art: 'award' }
    ],
    show: function () {
      const self = this; this.open = true; App.syncBack && App.syncBack();
      const app = document.getElementById('app');
      // splash
      const sp = h('div.splash', null, raw(this.art('emblem')), h('div.t1', 'Bojxona xodimi qo\'llanmasi'), h('div.t2', 'Toshkent-AERO IBK'));
      app.appendChild(sp);
      const reduce = document.documentElement.getAttribute('data-motion') === 'reduce' || (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches && Store.d.set.motion !== 'full');
      setTimeout(function () { sp.classList.add('out'); setTimeout(function () { sp.remove(); }, 450); if (self.open) self.slidesUI(); }, reduce ? 400 : 2300);
    },
    slidesUI: function () {
      const self = this; let i = 0;
      const stage = h('div.intro-stage');
      const dots = h('div.dots', null, this.slides.map(function () { return h('i'); }));
      const btn = h('button.btn.white.block');
      const wrap = h('div.intro', { role: 'dialog', 'aria-label': 'Kirish' },
        raw('<svg class="stars" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">' + Array.from({ length: 40 }, function (_, k) { return '<circle cx="' + ((k * 97) % 400) + '" cy="' + ((k * 173) % 800) + '" r="' + (k % 3 ? 1 : 1.6) + '" fill="#fff" opacity="' + (.2 + (k % 5) / 10) + '"/>'; }).join('') + '</svg>'),
        h('div.intro-top', null, h('button', { onclick: function () { self.close(); } }, 'O\'tkazib yuborish')),
        stage, h('div.intro-foot', null, dots, btn));
      document.getElementById('app').appendChild(wrap);
      this.el = wrap;
      function show() {
        const s = self.slides[i];
        stage.innerHTML = '';
        stage.appendChild(h('div.intro-art', { html: self.art(s.art) }));
        stage.appendChild(h('h2', s.t)); stage.appendChild(h('p', s.d));
        // last slide: optional name for a personal greeting (Telegram already gives one)
        const u = TG.user();
        const askName = i === self.slides.length - 1 && !(u && u.first_name);
        stage.classList.toggle('has-field', askName);
        if (askName) {
          const keep = self.nameIn ? self.nameIn.value : (Store.d.first || '');
          self.nameIn = h('input.intro-name', { type: 'text', placeholder: 'Ismingiz (ixtiyoriy)', maxlength: 40, autocomplete: 'given-name', enterkeyhint: 'done', 'aria-label': 'Ismingiz' });
          self.nameIn.value = keep;
          self.nameIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') self.close(); });
          stage.appendChild(h('label.intro-field', null, h('span', 'Sizga qanday murojaat qilaylik?'), self.nameIn));
        }
        Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); });
        btn.innerHTML = i < self.slides.length - 1 ? 'Keyingi ' + IC('arrow', 18) : IC('rocket', 18) + ' Boshlash';
        TG.hap('light');
      }
      btn.onclick = function () { if (i < self.slides.length - 1) { i++; show(); } else self.close(); };
      let x0 = null;
      stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener('touchend', function (e) { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (dx < -50 && i < self.slides.length - 1) { i++; show(); } else if (dx > 50 && i > 0) { i--; show(); } });
      show();
    },
    close: function () {
      if (!this.open) return;
      this.open = false; Store.d.intro = 1;
      if (this.nameIn) { const v = this.nameIn.value.trim().replace(/\s+/g, ' ').slice(0, 40); if (v) Store.d.first = v; this.nameIn = null; }
      Store.save();
      if (this.el) { const el = this.el; el.style.animation = 'fadeOut .3s both'; setTimeout(function () { el.remove(); }, 300); this.el = null; }
      const sp = document.querySelector('.splash'); if (sp) sp.remove();
      // the home screen was built under the intro: rebuild it so the greeting is
      // personal and its entrance animation plays now that it is visible
      if (App.path === '') App.render('', 'fade');
      App.syncBack();
    },
    art: function (k) {
      const D = function (d, c, w, delay, dur) { return '<path class="d" pathLength="1" d="' + d + '" stroke="' + c + '" stroke-width="' + (w || 3) + '" style="stroke-dasharray:1;stroke-dashoffset:1;animation:draw ' + (dur || 1) + 's ' + (delay || 0) + 's cubic-bezier(.65,0,.35,1) forwards"/>'; };
      const F = function (d, c, delay) { return '<path d="' + d + '" fill="' + c + '" style="opacity:0;animation:fadeIn .6s ' + delay + 's forwards"/>'; };
      if (k === 'emblem') return '<svg viewBox="0 0 120 120">' +
        F('M60 8 L100 22 V58 C100 84 82 102 60 112 C38 102 20 84 20 58 V22 Z', 'rgba(96,165,250,.14)', 1.1) +
        D('M60 8 L100 22 V58 C100 84 82 102 60 112 C38 102 20 84 20 58 V22 Z', '#93c5fd', 3.5, 0, 1.1) +
        D('M40 72 h40', '#5eead4', 3, .9, .5) +
        D('M44 64 l8 -2 l-6 -14 l4 -2 l12 10 l14 -6 c3 -1 6 0 6 3 c0 2 -2 3 -4 4 l-26 10 c-3 1 -6 1 -8 -3 z', '#ffffff', 3, .6, 1.1) +
        '</svg>';
      if (k === 'book') return '<svg viewBox="0 0 200 200">' +
        F('M100 30 L160 52 V104 C160 140 134 164 100 176 C66 164 40 140 40 104 V52 Z', 'rgba(94,234,212,.08)', .8) +
        D('M100 30 L160 52 V104 C160 140 134 164 100 176 C66 164 40 140 40 104 V52 Z', '#5eead4', 3, 0, 1.2) +
        D('M64 92 C80 86 92 88 100 96 C108 88 120 86 136 92 V132 C120 126 108 128 100 136 C92 128 80 126 64 132 Z', '#ffffff', 3, .6, 1.2) +
        D('M100 96 V136', '#ffffff', 3, 1.4, .4) + D('M74 102 h16 M74 112 h16 M110 102 h16 M110 112 h16', '#93c5fd', 2.5, 1.6, .6) + '</svg>';
      if (k === 'board') return '<svg viewBox="0 0 200 200">' +
        F('M28 40 h144 a8 8 0 0 1 8 8 v92 a8 8 0 0 1 -8 8 h-144 a8 8 0 0 1 -8 -8 v-92 a8 8 0 0 1 8 -8 z', 'rgba(255,255,255,.95)', .3) +
        D('M28 40 h144 a8 8 0 0 1 8 8 v92 a8 8 0 0 1 -8 8 h-144 a8 8 0 0 1 -8 -8 v-92 a8 8 0 0 1 8 -8 z', '#93c5fd', 3, 0, 1) +
        D('M44 76 c10 -16 22 -16 30 0 s20 16 30 0', '#2563eb', 3.5, .8, 1) + D('M44 104 h70', '#1f2937', 3, 1.5, .6) + D('M44 120 h50', '#1f2937', 3, 1.9, .5) +
        D('M130 82 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0', '#dc2626', 3, 1.2, .8) + D('M140 82 l6 6 l12 -12', '#059669', 3.5, 2, .5) +
        D('M90 150 l-12 22 M110 150 l12 22', '#93c5fd', 3, .4, .5) +
        '<g style="animation:floaty 2.4s ease-in-out infinite"><path d="M150 132 l26 -26 l8 8 l-26 26 l-11 3 z" fill="#2563eb" stroke="#fff" stroke-width="2"/></g></svg>';
      if (k === 'hand') return '<svg viewBox="0 0 200 200">' +
        D('M62 28 h76 a10 10 0 0 1 10 10 v124 a10 10 0 0 1 -10 10 h-76 a10 10 0 0 1 -10 -10 v-124 a10 10 0 0 1 10 -10 z', '#93c5fd', 3, 0, 1) +
        D('M68 60 h64', 'rgba(255,255,255,.35)', 6, .6, .5) + F('M68 57 h40 v6 h-40 z', '#5eead4', 1.1) +
        D('M68 84 h64', 'rgba(255,255,255,.35)', 6, .7, .5) + F('M68 81 h22 v6 h-22 z', '#fbbf24', 1.2) +
        D('M74 112 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0', '#34d399', 3, .9, .6) + D('M79 112 l3 3 l6 -6', '#34d399', 3, 1.4, .4) +
        D('M106 112 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0', '#f87171', 3, 1, .6) + D('M112 106 l8 12 M120 106 l-8 12', '#f87171', 3, 1.5, .4) +
        D('M78 142 h44', '#ffffff', 4, 1.3, .5) +
        '</svg>';
      if (k === 'award') return '<svg viewBox="0 0 200 200">' +
        D('M76 120 l-14 52 l20 -10 l12 18 l10 -46', '#93c5fd', 3, .9, .7) + D('M124 120 l14 52 l-20 -10 l-12 18 l-10 -46', '#93c5fd', 3, 1, .7) +
        F('M100 30 a46 46 0 1 0 0.1 0 z', 'rgba(251,191,36,.18)', .8) +
        D('M54 76 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0', '#fbbf24', 4, 0, 1.2) +
        D('M66 76 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0', '#fde68a', 2, .4, 1) +
        '<text x="100" y="88" text-anchor="middle" font-family="Jakarta, sans-serif" font-weight="800" font-size="30" fill="#fff" style="opacity:0;animation:fadeIn .5s 1.2s forwards">100</text></svg>';
      return '';
    }
  };
  App.Intro = Intro;

  /* boot */
  function boot() { try { App.init(); } catch (e) { console.error(e); document.getElementById('app').innerHTML = '<div style="padding:24px;font-family:sans-serif">Xatolik: ' + esc(e.message) + '</div>'; } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
