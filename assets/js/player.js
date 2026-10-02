/* =========================================================
   player.js — whiteboard "video" engine (pen-drawn lessons)
   A scene is a list of timed drawables; playback is a pure
   function of time, so pause / seek / speed are exact.
   ========================================================= */
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const W = 400, H = 300;
  const INK = '#1f2937';
  const COL = { ink: INK, blue: '#2563eb', red: '#dc2626', green: '#059669', orange: '#ea580c', purple: '#7c3aed', teal: '#0d9488', amber: '#d97706', navy: '#0b1f3a', gray: '#64748b', pink: '#db2777', sky: '#0284c7' };

  function S(tag, attrs) { const el = document.createElementNS(NS, tag); if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]); return el; }
  const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  const easeOut = function (p) { return 1 - Math.pow(1 - p, 3); };
  const easeInOut = function (p) { return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };

  /* -------- text measurement (canvas) -------- */
  const mctx = document.createElement('canvas').getContext('2d');
  function fontStr(size, f, wt) { return (wt || 700) + ' ' + size + 'px ' + (f === 'ui' ? 'Jakarta, sans-serif' : 'Caveat, cursive'); }
  function tw(text, size, f, wt) { mctx.font = fontStr(size, f, wt); return mctx.measureText(text).width; }
  function wrap(text, maxW, size, f, wt) {
    const words = String(text).split(/\s+/); const lines = []; let cur = '';
    words.forEach(function (w) { const test = cur ? cur + ' ' + w : w; if (tw(test, size, f, wt) > maxW && cur) { lines.push(cur); cur = w; } else cur = test; });
    if (cur) lines.push(cur);
    return lines;
  }
  function textDur(t) { return clamp(String(t).length * 38, 450, 2400); }

  /* -------- icon paths reuse core ICONS -------- */
  function iconEls(name) {
    const src = (global.ICONS || {})[name] || '';
    const g = S('g'); g.innerHTML = src; return g;
  }

  /* =========================================================
     Scene templates — return { els, cap }
     ========================================================= */
  function Seq(t0) { this.t = t0 || 200; }
  Seq.prototype.add = function (el, du, gap) { el.at = this.t; el.du = du; this.t += du + (gap == null ? 120 : gap); return el; };
  Seq.prototype.wait = function (ms) { this.t += ms; };

  function heading(seq, els, text, color, opts) {
    opts = opts || {};
    const size = opts.size || 30, x = opts.x == null ? 22 : opts.x, y = opts.y || 40;
    const lines = wrap(text, opts.maxW || 356, size);
    lines.forEach(function (ln, i) { els.push(seq.add({ k: 'text', x: x, y: y + i * size * 1.02, t: ln, s: size, c: color || INK, a: opts.a || 'start' }, textDur(ln), 60)); });
    const lastY = y + (lines.length - 1) * size * 1.02;
    const wLast = Math.min(tw(lines[lines.length - 1], size), 356);
    const ux = opts.a === 'middle' ? x - wLast / 2 : x;
    els.push(seq.add({ k: 'path', d: 'M' + ux + ' ' + (lastY + 9) + ' q ' + (wLast / 2) + ' 6 ' + wLast + ' -2', c: opts.under || '#f59e0b', w: 4, op: .85 }, 450, 150));
    return lastY + 20;
  }

  const T = {
    title: function (o) {
      const seq = new Seq(250), els = [], c = o.color || COL.blue;
      els.push(seq.add({ k: 'path', d: circ(200, 100, 50), c: c, w: 4 }, 900, 0));
      els.push(seq.add({ k: 'icon', n: o.icon || 'shield', x: 200 - 30, y: 70, s: 60, c: c, w: 2 }, 1100, 150));
      const lines = wrap(o.title, 350, 32);
      let y = 192;
      lines.forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y, t: ln, s: 32, c: INK, a: 'middle' }, textDur(ln), 60)); y += 33; });
      const wl = Math.min(tw(lines[lines.length - 1], 32), 340);
      els.push(seq.add({ k: 'path', d: 'M' + (200 - wl / 2) + ' ' + (y - 22) + ' q ' + wl / 2 + ' 8 ' + wl + ' -3', c: '#f59e0b', w: 5, op: .85 }, 500, 120));
      if (o.sub) wrap(o.sub, 340, 21).forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y + 6, t: ln, s: 21, c: COL.gray, a: 'middle' }, textDur(ln), 40)); y += 22; });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    list: function (o) {
      const seq = new Seq(200), els = [], c = o.color || COL.blue;
      let y = heading(seq, els, o.head, INK) + 18;
      const n = o.items.length;
      const avail = H - y - 8;
      const size = o.size || (n > 4 ? 19 : 21);
      o.items.forEach(function (it) {
        const lines = wrap(it.t, 300, size).slice(0, 2);
        const rowH = Math.max(34, lines.length * size * 1.05 + 10);
        const cy = y + rowH / 2 - 4;
        const ic = it.c || c;
        if (it.i) {
          els.push(seq.add({ k: 'path', d: circ(38, cy, 15), c: ic, w: 2.5, fill: ic, fo: .12 }, 380, 0));
          els.push(seq.add({ k: 'icon', n: it.i, x: 38 - 10, y: cy - 10, s: 20, c: ic, w: 2.2 }, 450, 60));
        } else {
          els.push(seq.add({ k: 'path', d: 'M30 ' + cy + ' l6 6 l12 -12', c: ic, w: 3.5 }, 350, 60));
        }
        const ty = cy - (lines.length - 1) * size * .52 + size * .33;
        lines.forEach(function (ln, j) { els.push(seq.add({ k: 'text', x: 64, y: ty + j * size * 1.05, t: ln, s: size, c: it.tc || INK }, textDur(ln), 40)); });
        if (it.hl) els.push(seq.add({ k: 'hl', x: 60, y: ty - size * .8, w: Math.min(tw(lines[0], size) + 8, 320), h: size * 1.05, c: it.hl }, 400, 60));
        y += Math.min(rowH + 6, avail / n + 4);
      });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    flow: function (o) {
      const seq = new Seq(200), els = [], c = o.color || COL.blue;
      let y = heading(seq, els, o.head, INK) + 14;
      const n = o.steps.length;
      const gap = Math.min(56, (H - y - 10) / n);
      const size = o.size || (n > 4 ? 19 : 21);
      o.steps.forEach(function (st, i) {
        const cy = y + gap / 2;
        els.push(seq.add({ k: 'path', d: circ(40, cy, 15), c: c, w: 3, fill: c, fo: .9 }, 420, 0));
        els.push(seq.add({ k: 'text', x: 40, y: cy + 7, t: String(i + 1), s: 20, c: '#fff', a: 'middle', f: 'ui', wt: 800 }, 250, 60));
        const lines = wrap(st, 296, size).slice(0, 2);
        const ty = cy - (lines.length - 1) * size * .5 + size * .32;
        lines.forEach(function (ln, j) { els.push(seq.add({ k: 'text', x: 68, y: ty + j * size * 1.02, t: ln, s: size, c: INK }, textDur(ln), 40)); });
        if (i < n - 1) els.push(seq.add({ k: 'path', d: 'M40 ' + (cy + 17) + ' L40 ' + (cy + gap - 17) + ' M34 ' + (cy + gap - 23) + ' L40 ' + (cy + gap - 17) + ' L46 ' + (cy + gap - 23), c: COL.gray, w: 2.5 }, 300, 80));
        y += gap;
      });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    compare: function (o) {
      const seq = new Seq(200), els = [], a = o.a, b = o.b;
      const y0 = heading(seq, els, o.head, INK) + 12;
      const bh = H - y0 - 12;
      [[a, 14], [b, 206]].forEach(function (pair, idx) {
        const s = pair[0], x = pair[1], col = s.c || (idx ? COL.red : COL.green);
        els.push(seq.add({ k: 'path', d: rrect(x, y0, 180, bh, 14), c: col, w: 3, fill: col, fo: .07 }, 700, 60));
        if (s.i) els.push(seq.add({ k: 'icon', n: s.i, x: x + 12, y: y0 + 10, s: 24, c: col, w: 2.2 }, 450, 40));
        els.push(seq.add({ k: 'text', x: x + (s.i ? 42 : 14), y: y0 + 30, t: s.t, s: 24, c: col }, textDur(s.t), 80));
        let yy = y0 + 58;
        (s.items || []).forEach(function (it) {
          const lines = wrap(it, 138, 18).slice(0, 3);
          els.push(seq.add({ k: 'path', d: 'M' + (x + 14) + ' ' + (yy - 5) + ' l5 0', c: col, w: 4 }, 120, 20));
          lines.forEach(function (ln, j) { els.push(seq.add({ k: 'text', x: x + 26, y: yy + j * 18, t: ln, s: 18, c: INK }, textDur(ln), 30)); });
          yy += lines.length * 18 + 8;
        });
      });
      if (o.vs !== false) {
        els.push(seq.add({ k: 'pop', x: 200, y: y0 + bh / 2, r: 15, c: COL.navy, t: o.vs || 'VS' }, 350, 0));
      }
      return { els: els, cap: o.cap, hold: o.hold };
    },

    big: function (o) {
      const seq = new Seq(200), els = [], c = o.color || COL.blue;
      heading(seq, els, o.head, INK);
      const size = o.vsize || (String(o.value).length > 7 ? 56 : 72);
      els.push(seq.add({ k: 'text', x: 200, y: 160, t: o.value, s: size, c: c, a: 'middle' }, 900, 100));
      const wv = Math.min(tw(o.value, size) + 50, 380);
      els.push(seq.add({ k: 'path', d: ellipse(200, 145, wv / 2, size * .62), c: COL.orange, w: 3, op: .9 }, 800, 120));
      let y = 230;
      if (o.label) wrap(o.label, 360, 22).forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y, t: ln, s: 22, c: INK, a: 'middle' }, textDur(ln), 40)); y += 23; });
      if (o.note) wrap(o.note, 360, 18).forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y + 4, t: ln, s: 18, c: COL.gray, a: 'middle' }, textDur(ln), 40)); y += 19; });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    formula: function (o) {
      const seq = new Seq(200), els = [];
      let y = heading(seq, els, o.head, INK) + 34;
      o.lines.forEach(function (ln) {
        const size = ln.s || 26;
        const lines = wrap(ln.t, 350, size);
        lines.forEach(function (l2) {
          if (ln.box) els.push(seq.add({ k: 'path', d: rrect(16, y - size * .95, 368, size * 1.4, 10), c: ln.c || COL.blue, w: 3, fill: ln.c || COL.blue, fo: .08 }, 600, 40));
          els.push(seq.add({ k: 'text', x: ln.a === 'middle' ? 200 : 26, y: y, t: l2, s: size, c: ln.c || INK, a: ln.a || 'start' }, textDur(l2), 80));
          if (ln.hl) els.push(seq.add({ k: 'hl', x: 22, y: y - size * .85, w: Math.min(tw(l2, size) + 10, 360), h: size * 1.1, c: ln.hl }, 450, 60));
          y += size * 1.25;
        });
        y += ln.gap || 6;
      });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    timeline: function (o) {
      const seq = new Seq(200), els = [], c = o.color || COL.blue;
      let y = heading(seq, els, o.head, INK) + 16;
      const n = o.items.length;
      const step = Math.min(54, (H - y - 6) / n);
      els.push(seq.add({ k: 'path', d: 'M34 ' + (y + 4) + ' L34 ' + (y + step * (n - 1) + 8), c: c, w: 3, op: .6 }, 700, 60));
      o.items.forEach(function (it) {
        els.push(seq.add({ k: 'pop', x: 34, y: y + 6, r: 7, c: c }, 250, 40));
        els.push(seq.add({ k: 'text', x: 52, y: y + 12, t: it.d, s: 21, c: c }, textDur(it.d), 40));
        const dw = tw(it.d, 21) + 60;
        const lines = wrap(it.t, 356 - dw, 19).slice(0, 2);
        lines.forEach(function (ln, j) { els.push(seq.add({ k: 'text', x: dw, y: y + 12 + j * 18, t: ln, s: 19, c: INK }, textDur(ln), 30)); });
        y += step;
      });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    warn: function (o) {
      const seq = new Seq(200), els = [], c = o.color || COL.red;
      els.push(seq.add({ k: 'path', d: rrect(16, 20, 368, 260, 18), c: c, w: 4, fill: c, fo: .06 }, 900, 60));
      els.push(seq.add({ k: 'icon', n: o.icon || 'alert', x: 172, y: 36, s: 56, c: c, w: 2.2 }, 900, 100));
      let y = 128;
      wrap(o.head, 340, 28).forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y, t: ln, s: 28, c: c, a: 'middle' }, textDur(ln), 60)); y += 29; });
      y += 6;
      wrap(o.text, 330, 21).slice(0, 5).forEach(function (ln) { els.push(seq.add({ k: 'text', x: 200, y: y, t: ln, s: 21, c: INK, a: 'middle' }, textDur(ln), 40)); y += 23; });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    grid: function (o) {
      const seq = new Seq(200), els = [];
      const y0 = heading(seq, els, o.head, INK) + 10;
      const n = o.items.length, cols = n > 4 ? 3 : 2, rows = Math.ceil(n / cols);
      const cw = (368 - (cols - 1) * 10) / cols, ch = Math.min(96, (H - y0 - 10 - (rows - 1) * 10) / rows);
      o.items.forEach(function (it, i) {
        const cx = 16 + (i % cols) * (cw + 10), cy = y0 + Math.floor(i / cols) * (ch + 10), col = it.c || o.color || COL.blue;
        els.push(seq.add({ k: 'path', d: rrect(cx, cy, cw, ch, 12), c: col, w: 2.5, fill: col, fo: .07 }, 450, 0));
        els.push(seq.add({ k: 'icon', n: it.i || 'check', x: cx + cw / 2 - 13, y: cy + 8, s: 26, c: col, w: 2.2 }, 400, 40));
        let fsz = cw > 150 ? 20 : 17;
        const longest = String(it.t).split(/\s+/).reduce(function (a, w) { return tw(w, fsz) > tw(a, fsz) ? w : a; }, '');
        if (tw(longest, fsz) > cw - 10) fsz = Math.max(12, Math.floor(fsz * (cw - 10) / tw(longest, fsz)));
        wrap(it.t, cw - 12, fsz).slice(0, 3).forEach(function (ln, j) { els.push(seq.add({ k: 'text', x: cx + cw / 2, y: cy + 52 + j * (fsz - 1), t: ln, s: fsz, c: INK, a: 'middle' }, textDur(ln), 20)); });
      });
      return { els: els, cap: o.cap, hold: o.hold };
    },

    custom: function (o) { return { els: o.els, cap: o.cap, hold: o.hold }; }
  };

  /* shape helpers -> path data */
  function circ(cx, cy, r) { return 'M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0'; }
  function ellipse(cx, cy, rx, ry) { return 'M' + (cx - rx) + ' ' + cy + ' a' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0 a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0'; }
  function rrect(x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); return 'M' + (x + r) + ' ' + y + ' H' + (x + w - r) + ' Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' V' + (y + h - r) + ' Q' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' H' + (x + r) + ' Q' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' V' + (y + r) + ' Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' Z'; }
  function arrow(x1, y1, x2, y2, head) { head = head || 9; const a = Math.atan2(y2 - y1, x2 - x1); const p1 = [x2 - head * Math.cos(a - .5), y2 - head * Math.sin(a - .5)], p2 = [x2 - head * Math.cos(a + .5), y2 - head * Math.sin(a + .5)]; return 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' L' + x2 + ' ' + y2 + ' L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1); }

  /* =========================================================
     Player
     ========================================================= */
  let fontsReady = null;
  function loadFonts() {
    if (fontsReady) return fontsReady;
    fontsReady = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load('700 24px Caveat'), document.fonts.load('800 20px Jakarta')]).catch(function () {}) : Promise.resolve();
    return fontsReady;
  }

  let uzVoice = null;
  function findVoice() {
    if (!('speechSynthesis' in global)) return null;
    const vs = global.speechSynthesis.getVoices() || [];
    uzVoice = vs.find(function (v) { return /^uz/i.test(v.lang); }) || null;
    return uzVoice;
  }
  if ('speechSynthesis' in global) { findVoice(); try { global.speechSynthesis.onvoiceschanged = findVoice; } catch (e) {} }

  function sceneList(video) {
    const raw = typeof video.build === 'function' ? video.build() : (video.scenes || []);
    return raw.map(function (s) {
      let end = 0; s.els.forEach(function (e) { end = Math.max(end, (e.at || 0) + (e.du || 0)); });
      return { s: s, dur: end + (s.hold || 1600) };
    });
  }
  function duration(video) { return sceneList(video).reduce(function (a, s) { return a + s.dur; }, 0); }

  function Player(video, opts) {
    this.v = video; this.o = opts || {};
    this.scenes = []; this.total = 1; this.ready = false;
    this.t = 0; this.playing = false; this.speed = 1; this.cur = -1; this.raf = 0; this.speechDone = true;
    this.cc = Store.d.set.cc !== 0; this.voice = !!Store.d.set.voice && !!uzVoice;
    this.pen = { x: W - 40, y: H - 30 };
    this.build();
  }

  Player.prototype.build = function () {
    const self = this;
    const stage = h('div.vp-stage');
    const svg = S('svg', { class: 'board', viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet' });
    this.layer = S('g'); this.defs = S('defs');
    svg.appendChild(this.defs); svg.appendChild(this.layer);
    this.penEl = this.makePen(); svg.appendChild(this.penEl);
    stage.appendChild(svg);
    this.cap = h('div.vp-cap', { 'aria-live': 'polite' });
    this.cover = h('div.vp-cover', null,
      h('button.big-play', { 'aria-label': "Videoni boshlash", html: IC('play', 30, 2.4), onclick: function () { self.play(); } }),
      h('div.vt', this.v.title),
      this.coverDur = h('div.vd', { html: IC('video', 14) + ' qalamda chizilgan videodars' }));
    stage.appendChild(this.cover);
    stage.addEventListener('click', function (e) { if (e.target.closest('.vp-cover')) return; self.toggle(); });

    // control bar
    this.btnPlay = h('button.icon-btn', { 'aria-label': 'Ijro / pauza', html: IC('play', 18), onclick: function () { self.toggle(); } });
    this.track = h('div.vp-track', { role: 'slider', 'aria-label': 'Video vaqti' });
    this.segs = [];
    this.time = h('div.vp-time', '0:00');
    this.btnCC = h('button.icon-btn' + (this.cc ? '.on' : ''), { 'aria-label': 'Subtitrlar', html: IC('cc', 18), onclick: function () { self.cc = !self.cc; Store.d.set.cc = self.cc ? 1 : 0; Store.save(); this.classList.toggle('on', self.cc); self.updateCap(); } });
    this.btnSpeed = h('button.icon-btn.vp-speed', { 'aria-label': 'Tezlik', onclick: function () { const sp = [1, 1.25, 1.5, .75]; self.speed = sp[(sp.indexOf(self.speed) + 1) % sp.length]; this.textContent = self.speed + '×'; } }, '1×');
    const bar = h('div.vp-bar', null, this.btnPlay, this.track, this.time, this.btnSpeed, this.btnCC);
    if (uzVoice) {
      this.btnVoice = h('button.icon-btn' + (this.voice ? '.on' : ''), { 'aria-label': 'Ovozli tushuntirish', html: IC(this.voice ? 'vol' : 'volx', 18), onclick: function () { self.voice = !self.voice; Store.d.set.voice = self.voice ? 1 : 0; Store.save(); this.classList.toggle('on', self.voice); this.innerHTML = IC(self.voice ? 'vol' : 'volx', 18); if (!self.voice) self.stopSpeech(); } });
      bar.appendChild(this.btnVoice);
    }
    this.btnFs = h('button.icon-btn', { 'aria-label': "To'liq ekran", html: IC('max', 18), onclick: function () { self.fullscreen(); } });
    bar.appendChild(this.btnFs);
    this.el = h('div.vp', null, stage, this.cap, bar);

    // seeking
    let dragging = false;
    function seekAt(e) { const r = self.track.getBoundingClientRect(); const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left; self.seek(clamp(x / r.width, 0, 1) * self.total); }
    this.track.addEventListener('pointerdown', function (e) { dragging = true; try { self.track.setPointerCapture(e.pointerId); } catch (er) {} seekAt(e); });
    this.track.addEventListener('pointermove', function (e) { if (dragging) seekAt(e); });
    this.track.addEventListener('pointerup', function () { dragging = false; });

    loadFonts().then(function () {
      self.scenes = sceneList(self.v);
      self.total = self.scenes.reduce(function (a, s) { return a + s.dur; }, 0) || 1;
      self.segs = self.scenes.map(function (sc) { const i = h('i', { vars: { '--w': sc.dur } }, h('b')); self.track.appendChild(i); return i; });
      self.coverDur.innerHTML = IC('video', 14) + ' ' + U.mmss(self.total) + ' · ' + self.scenes.length + ' sahna · qalamda chizilgan';
      self.time.textContent = '0:00 / ' + U.mmss(self.total);
      self.ready = true;
      // poster = a clean board: nothing is written until the pen writes it
      self.enterScene(0); self.render(0, true); self.penEl.style.opacity = 0;
      self.cap.innerHTML = '<span class="vp-cap-hint">Subtitrlar shu yerda chiqadi</span>';
      if (self.wantPlay) self.play();
    });
  };

  Player.prototype.makePen = function () {
    const g = S('g', { class: 'pen' });
    g.innerHTML = '<ellipse cx="6" cy="10" rx="16" ry="4" fill="rgba(0,0,0,.12)"/>' +
      '<g transform="rotate(-55)"><path class="pen-tip" d="M0 0 L9 -3.6 L9 3.6 Z" fill="#1f2937"/>' +
      '<rect x="9" y="-5" width="11" height="10" rx="1.5" fill="#cbd5e1"/>' +
      '<rect x="20" y="-6.5" width="46" height="13" rx="4" fill="#2563eb"/>' +
      '<rect x="24" y="-6.5" width="6" height="13" fill="#1d4ed8"/>' +
      '<rect x="64" y="-6.5" width="9" height="13" rx="3" fill="#1e3a8a"/></g>';
    g.style.transition = 'opacity .3s';
    return g;
  };

  Player.prototype.enterScene = function (i) {
    this.cur = i;
    while (this.layer.firstChild) this.layer.removeChild(this.layer.firstChild);
    while (this.defs.firstChild) this.defs.removeChild(this.defs.firstChild);
    const self = this;
    this.items = this.scenes[i].s.els.map(function (e, idx) { return self.makeItem(e, idx); });
    this.layer.style.animation = 'none'; void this.layer.getBoundingClientRect(); this.layer.style.animation = 'fadeIn .35s ease both';
    this.capList = Array.isArray(this.scenes[i].s.cap) ? this.scenes[i].s.cap : [[0, this.scenes[i].s.cap || '']];
    this.capIdx = -1;
    if (this.playing && this.voice) this.speak(this.capList.map(function (c) { return c[1]; }).join(' '));
  };

  Player.prototype.makeItem = function (e, idx) {
    const it = { e: e, at: e.at || 0, du: Math.max(1, e.du || 1) };
    const layer = this.layer;
    if (e.k === 'path') {
      const p = S('path', { d: e.d, fill: e.fill || 'none', 'fill-opacity': 0, stroke: e.c || INK, 'stroke-width': e.w || 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: e.op == null ? 1 : e.op });
      if (e.dash) p.setAttribute('stroke-dasharray', e.dash);
      layer.appendChild(p);
      it.el = p; it.len = p.getTotalLength ? p.getTotalLength() : 100; it.kind = 'path';
    } else if (e.k === 'icon') {
      const s = (e.s || 40) / 24;
      const g = S('g', { transform: 'translate(' + e.x + ' ' + e.y + ') scale(' + s + ')', fill: 'none', stroke: e.c || INK, 'stroke-width': (e.w || 2), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      const src = iconEls(e.n); while (src.firstChild) g.appendChild(src.firstChild);
      layer.appendChild(g);
      // convert primitives to measured parts
      it.parts = []; let total = 0;
      Array.prototype.forEach.call(g.children, function (c) { let L = 20; try { L = c.getTotalLength(); } catch (er) {} if (!L || !isFinite(L)) L = 20; it.parts.push({ el: c, len: L, from: total }); total += L; });
      it.total = total || 1; it.kind = 'icon'; it.g = g; it.scale = s;
    } else if (e.k === 'text') {
      // Every character is its own <tspan> that starts fully transparent and is
      // inked only when the pen reaches it. (A clip-path reveal is not repainted
      // reliably by iOS WebKit, so text there showed up before it was written.)
      const size = e.s || 22;
      const str = String(e.t).replace(/\s+/g, ' ').trim();
      const t = S('text', { x: e.x, y: e.y, fill: e.c || INK, 'font-size': size, 'text-anchor': e.a || 'start', 'font-family': e.f === 'ui' ? 'Jakarta, sans-serif' : 'Caveat, cursive', 'font-weight': e.wt || 700 });
      const chars = Array.from(str);
      const spans = chars.map(function (ch) { const sp = S('tspan', { 'fill-opacity': 0 }); sp.textContent = ch; t.appendChild(sp); return sp; });
      layer.appendChild(t);
      const estW = tw(str, size, e.f, e.wt);
      const estX = e.a === 'middle' ? e.x - estW / 2 : (e.a === 'end' ? e.x - estW : e.x);
      let bb = null; try { bb = t.getBBox(); } catch (er) {}
      if (!bb || !(bb.width > 0)) bb = { x: estX, y: e.y - size * .8, width: estW, height: size };
      // per-character start / end x so the pen tip sits exactly on the letter being written
      const x0 = [], x1 = [];
      try {
        let u = 0;
        for (let i = 0; i < chars.length; i++) {
          const a = t.getStartPositionOfChar(u).x, b = t.getEndPositionOfChar(u + chars[i].length - 1).x;
          if (!isFinite(a) || !isFinite(b)) throw 0;
          x0.push(a); x1.push(b); u += chars[i].length;
        }
        if (chars.length && x1[x1.length - 1] - x0[0] <= 0) throw 0;
      } catch (er) {
        x0.length = 0; x1.length = 0;
        for (let i = 0; i < chars.length; i++) { x0.push(bb.x + bb.width * i / chars.length); x1.push(bb.x + bb.width * (i + 1) / chars.length); }
      }
      it.el = t; it.chars = spans; it.ops = spans.map(function () { return 0; }); it.x0 = x0; it.x1 = x1; it.bb = bb; it.kind = 'text';
    } else if (e.k === 'hl') {
      const r = S('rect', { x: e.x, y: e.y, width: 0, height: e.h, rx: 4, fill: e.c || '#fde047', opacity: .45 });
      r.style.mixBlendMode = 'multiply';
      layer.insertBefore(r, layer.firstChild);
      it.el = r; it.kind = 'hl';
    } else if (e.k === 'pop') {
      const g = S('g', { transform: 'translate(' + e.x + ' ' + e.y + ') scale(0)' });
      g.appendChild(S('circle', { r: e.r || 12, fill: e.c || COL.blue }));
      if (e.t) { const tt = S('text', { 'text-anchor': 'middle', y: (e.r || 12) * .38, fill: '#fff', 'font-size': (e.r || 12) * .95, 'font-family': 'Jakarta, sans-serif', 'font-weight': 800 }); tt.textContent = e.t; g.appendChild(tt); }
      layer.appendChild(g); it.el = g; it.kind = 'pop';
    }
    return it;
  };

  Player.prototype.render = function (lt, noPen) {
    let tip = null;
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i], e = it.e;
      const p = clamp((lt - it.at) / it.du, 0, 1);
      if (it.kind === 'path') {
        const L = it.len;
        it.el.style.visibility = p <= 0 ? 'hidden' : 'visible';
        if (!e.dash) { it.el.style.strokeDasharray = L + ' ' + (L + 2); it.el.style.strokeDashoffset = L * (1 - easeInOut(p)); }
        else it.el.style.opacity = (e.op == null ? 1 : e.op) * p;
        if (e.fill) it.el.setAttribute('fill-opacity', (e.fo == null ? .15 : e.fo) * clamp((p - .6) / .4, 0, 1));
        if (p > 0 && p < 1) { try { const pt = it.el.getPointAtLength(L * easeInOut(p)); tip = { x: pt.x, y: pt.y, c: e.c }; } catch (er) {} }
      } else if (it.kind === 'icon') {
        const done = it.total * easeInOut(p);
        let tp = null;
        it.parts.forEach(function (pt) {
          const q = clamp((done - pt.from) / pt.len, 0, 1);
          pt.el.style.visibility = q <= 0 ? 'hidden' : 'visible';
          pt.el.style.strokeDasharray = pt.len + ' ' + (pt.len + 2);
          pt.el.style.strokeDashoffset = pt.len * (1 - q);
          if (q > 0 && q < 1 && pt.el.getPointAtLength) { try { const k = pt.el.getPointAtLength(pt.len * q); tp = { x: e.x + k.x * it.scale, y: e.y + k.y * it.scale }; } catch (er) {} }
        });
        if (tp && p < 1) tip = { x: tp.x, y: tp.y, c: e.c };
      } else if (it.kind === 'text') {
        const n = it.chars.length, prog = p * n;
        for (let j = 0; j < n; j++) {
          const op = Math.round(clamp((prog - j) * 1.6, 0, 1) * 20) / 20;
          if (op !== it.ops[j]) { it.ops[j] = op; it.chars[j].setAttribute('fill-opacity', op); }
        }
        if (n && p > 0 && p < 1) {
          const j = Math.min(n - 1, Math.floor(prog)), f = prog - j;
          tip = { x: it.x0[j] + (it.x1[j] - it.x0[j]) * f, y: it.bb.y + it.bb.height * (.55 + .18 * Math.sin(p * 40)), c: e.c };
        }
      } else if (it.kind === 'hl') {
        it.el.setAttribute('width', (e.w || 100) * easeOut(p));
        if (p > 0 && p < 1) tip = { x: e.x + (e.w || 100) * easeOut(p), y: e.y + e.h * .6, c: '#ca8a04' };
      } else if (it.kind === 'pop') {
        const s = p <= 0 ? 0 : (p < 1 ? 1 + Math.sin(p * Math.PI) * .25 * (1 - p) + (easeOut(p) - 1) : 1);
        it.el.setAttribute('transform', 'translate(' + e.x + ' ' + e.y + ') scale(' + Math.max(0, s) + ')');
      }
    }
    if (noPen) return;
    // pen follows the active tip, otherwise rests in the corner
    const target = tip || { x: W - 34, y: H - 22 };
    const k = tip ? .55 : .12;
    this.pen.x += (target.x - this.pen.x) * k; this.pen.y += (target.y - this.pen.y) * k;
    this.penEl.setAttribute('transform', 'translate(' + this.pen.x.toFixed(1) + ' ' + this.pen.y.toFixed(1) + ')');
    this.penEl.style.opacity = 1;
    if (tip && tip.c) { const t = this.penEl.querySelector('.pen-tip'); if (t) t.setAttribute('fill', tip.c); }
  };

  Player.prototype.locate = function (t) {
    let acc = 0;
    for (let i = 0; i < this.scenes.length; i++) { if (t < acc + this.scenes[i].dur) return { i: i, lt: t - acc, start: acc }; acc += this.scenes[i].dur; }
    const last = this.scenes.length - 1; return { i: last, lt: this.scenes[last].dur, start: acc - this.scenes[last].dur };
  };

  Player.prototype.updateCap = function (lt) {
    this.cap.style.display = this.cc ? '' : 'none';
    if (!this.cc) return;
    if (lt == null) lt = this.locate(this.t).lt;
    let idx = 0; for (let i = 0; i < this.capList.length; i++) if (lt >= this.capList[i][0]) idx = i;
    if (idx !== this.capIdx || !this.cap.textContent) { this.capIdx = idx; this.cap.textContent = this.capList[idx] ? this.capList[idx][1] : ''; }
  };

  Player.prototype.ui = function () {
    const loc = this.locate(this.t);
    let acc = 0; const self = this;
    this.segs.forEach(function (s, i) { const d = self.scenes[i].dur; const f = clamp((self.t - acc) / d, 0, 1); s.firstChild.style.width = (f * 100) + '%'; acc += d; });
    this.time.textContent = U.mmss(this.t) + ' / ' + U.mmss(this.total);
    this.btnPlay.innerHTML = IC(this.playing ? 'pause' : 'play', 18);
    return loc;
  };

  Player.prototype.loop = function (now) {
    const self = this;
    if (!document.body.contains(this.el)) { this.destroy(); return; }
    const dt = Math.min(64, now - (this.last || now)); this.last = now;
    if (this.playing) {
      const loc0 = this.locate(this.t);
      const sceneEnd = loc0.start + this.scenes[loc0.i].dur;
      let nt = this.t + dt * this.speed;
      // hold at the end of a scene until narration finishes
      if (this.voice && !this.speechDone && nt >= sceneEnd - 1) nt = sceneEnd - 1;
      this.t = nt;
      if (this.t >= this.total) { this.t = this.total; this.finish(); }
    }
    const loc = this.ui();
    if (loc.i !== this.cur) this.enterScene(loc.i);
    this.render(loc.lt);
    this.updateCap(loc.lt);
    this.raf = requestAnimationFrame(function (t) { self.loop(t); });
  };

  Player.prototype.play = function () {
    const self = this;
    if (!this.ready) { this.wantPlay = true; return; }
    if (this.t >= this.total) this.t = 0;
    if (this.t === 0) { this.enterScene(0); this.render(0, true); }
    this.cover.style.display = 'none';
    const endOv = this.el.querySelector('.vp-end'); if (endOv) endOv.remove();
    this.playing = true; this.last = 0;
    if (this.voice) { const loc = this.locate(this.t); if (loc.lt < 400) this.speak(this.capList ? this.capList.map(function (c) { return c[1]; }).join(' ') : ''); }
    if (!this.raf) this.raf = requestAnimationFrame(function (t) { self.loop(t); });
    if (global.speechSynthesis && this.voice) try { global.speechSynthesis.resume(); } catch (e) {}
    TG.hap('light');
    if (this.o.onStart) this.o.onStart();
  };
  Player.prototype.pause = function () { this.playing = false; if (global.speechSynthesis && this.voice) try { global.speechSynthesis.pause(); } catch (e) {} this.ui(); };
  Player.prototype.toggle = function () { this.playing ? this.pause() : this.play(); };
  Player.prototype.seek = function (t) {
    if (!this.ready) return;
    this.t = clamp(t, 0, this.total - 1); this.stopSpeech();
    this.cover.style.display = 'none';
    const loc = this.ui(); if (loc.i !== this.cur) this.enterScene(loc.i); this.render(loc.lt); this.updateCap(loc.lt);
    const self = this; if (!this.raf) this.raf = requestAnimationFrame(function (tt) { self.loop(tt); });
  };
  Player.prototype.finish = function () {
    this.playing = false; this.stopSpeech();
    const self = this;
    if (this.el.querySelector('.vp-end')) return;
    const ov = h('div.vp-cover.vp-end', null,
      h('div.vt', { html: IC('okc', 22) + ' Videodars tugadi' }),
      h('div.btn-row', { style: 'gap:10px;margin-top:6px' },
        h('button.btn.sm.white', { onclick: function (e) { e.stopPropagation(); self.seek(0); self.play(); }, html: IC('replay', 16) + ' Qayta' }),
        this.o.onEnd ? h('button.btn.sm', { onclick: function (e) { e.stopPropagation(); self.exitFs(); self.o.onEnd(); }, html: 'Davom etish ' + IC('arrow', 16) }) : null));
    this.el.querySelector('.vp-stage').appendChild(ov);
    if (this.v.id) { Store.d.vids[this.v.id] = 1; Store.addXp(15); Store.save(); }
    TG.note('success');
  };
  Player.prototype.speak = function (text) {
    if (!this.voice || !uzVoice || !text) { this.speechDone = true; return; }
    const self = this;
    try {
      global.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.voice = uzVoice; u.lang = uzVoice.lang; u.rate = this.speed;
      this.speechDone = false;
      u.onend = u.onerror = function () { self.speechDone = true; };
      global.speechSynthesis.speak(u);
    } catch (e) { this.speechDone = true; }
  };
  Player.prototype.stopSpeech = function () { this.speechDone = true; try { if (global.speechSynthesis) global.speechSynthesis.cancel(); } catch (e) {} };
  Player.prototype.fullscreen = function () {
    const on = !this.el.classList.contains('fs');
    if (on) { this.ph = h('div', { style: 'height:' + this.el.offsetHeight + 'px' }); this.el.parentNode.insertBefore(this.ph, this.el); document.getElementById('app').appendChild(this.el); }
    else this.exitFs();
    this.el.classList.toggle('fs', on);
    this.btnFs.innerHTML = IC(on ? 'min' : 'max', 18);
  };
  Player.prototype.exitFs = function () {
    if (!this.el.classList.contains('fs')) return;
    this.el.classList.remove('fs'); this.btnFs.innerHTML = IC('max', 18);
    if (this.ph && this.ph.parentNode) { this.ph.parentNode.insertBefore(this.el, this.ph); this.ph.remove(); }
  };
  Player.prototype.destroy = function () { this.playing = false; cancelAnimationFrame(this.raf); this.raf = 0; this.stopSpeech(); if (this.el.classList.contains('fs')) this.el.remove(); };

  global.Board = { Player: Player, duration: duration, T: T, COL: COL, circ: circ, ellipse: ellipse, rrect: rrect, arrow: arrow, wrap: wrap, tw: tw, W: W, H: H };
})(window);
