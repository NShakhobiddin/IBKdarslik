/* =========================================================
   widgets.js — interactive explanations (Brilliant-style)
   Legal figures come from window.RULES (data-laws.js)
   ========================================================= */
(function (global) {
  'use strict';
  const R = function () { return global.RULES || {}; };
  const W = global.Widgets = {};

  function card(icon, title, sub, body) {
    return h('div.wg', null,
      h('div.wg-head', null, h('div.tile.sm', { html: IC(icon, 18) }), h('div.grow', null, h('div.t', title), sub ? h('div.s', sub) : null)),
      h('div.wg-body', null, body));
  }
  function seg(options, val, onPick) {
    const el = h('div.seg', { role: 'radiogroup' });
    options.forEach(function (o) {
      el.appendChild(h('button' + (o[0] === val ? '.on' : ''), { role: 'radio', 'aria-checked': String(o[0] === val), onclick: function () { Array.prototype.forEach.call(el.children, function (b) { b.classList.remove('on'); b.setAttribute('aria-checked', 'false'); }); this.classList.add('on'); this.setAttribute('aria-checked', 'true'); TG.sel(); onPick(o[0]); } }, o[1]));
    });
    return el;
  }
  function numField(label, val, suffix, hint, onIn) {
    const inp = h('input.input', { type: 'number', inputmode: 'decimal', min: '0', step: 'any', value: val });
    inp.addEventListener('input', function () { onIn(parseFloat(inp.value) || 0); });
    return h('div.field', null, h('label', label), h('div.input-wrap', null, inp, suffix ? h('span.suffix', suffix) : null), hint ? h('div.hint', hint) : null);
  }
  function result(kind, title, desc) {
    return h('div.wg-result.' + kind, null, h('div.rt', { html: IC(kind === 'ok' ? 'okc' : kind === 'bad' ? 'xc' : kind === 'warn' ? 'alert' : 'info', 18) + ' ' + esc(title) }), desc ? h('div.rd', { html: rich(desc) }) : null);
  }
  const usd = function (n) { return '$' + U.num(n, n % 1 ? 2 : 0); };
  const som = function (n) { return U.num(Math.round(n)) + ' so\'m'; };

  /* ---------- 1. Layers (customs territory / border / control zone) ---------- */
  W.layers = function (o) {
    const info = h('div');
    const svg = raw('<svg viewBox="0 0 340 230" role="img" aria-label="Bojxona hududi, chegarasi va nazorat zonasi sxemasi">' +
      '<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#7c3aed" stroke-width="2" opacity=".55"/></pattern></defs>' +
      '<g class="zl" data-z="hudud">' +
      '<rect x="8" y="8" width="324" height="214" rx="16" fill="#e0f2fe"/>' +
      '<path d="M8 150 C70 132 120 160 180 146 C240 132 290 150 332 140 V206 a16 16 0 0 1 -16 16 H24 a16 16 0 0 1 -16 -16 Z" fill="#bbf7d0"/>' +
      '<path d="M206 176 c18 -14 52 -14 70 0 c-18 14 -52 14 -70 0z" fill="#7dd3fc"/>' +
      '<path d="M40 52 c0 -10 16 -12 20 -4 c4 -10 22 -8 22 4 c8 0 8 12 0 12 h-40 c-8 0 -8 -12 -2 -12z" fill="#fff"/>' +
      '<g transform="translate(232 48) scale(1.3)" fill="none" stroke="#0b1f3a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (global.ICONS.plane || '') + '</g>' +
      '<text x="20" y="34" font-size="12" font-weight="800" fill="#0369a1" font-family="Jakarta, sans-serif">Havo hududi</text>' +
      '<text x="214" y="200" font-size="11" font-weight="800" fill="#075985" font-family="Jakarta, sans-serif">Suv</text>' +
      '<text x="20" y="200" font-size="12" font-weight="800" fill="#166534" font-family="Jakarta, sans-serif">Quruqlik</text></g>' +
      '<g class="zl" data-z="chegara"><rect x="8" y="8" width="324" height="214" rx="16" fill="none" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 7"/>' +
      '<rect x="252" y="84" width="66" height="44" rx="8" fill="#fff7ed" stroke="#ea580c" stroke-width="3" stroke-dasharray="6 5"/>' +
      '<text x="285" y="104" text-anchor="middle" font-size="9" font-weight="800" fill="#c2410c" font-family="Jakarta, sans-serif">Erkin</text><text x="285" y="116" text-anchor="middle" font-size="9" font-weight="800" fill="#c2410c" font-family="Jakarta, sans-serif">zona</text></g>' +
      '<g class="zl" data-z="zona"><rect x="104" y="96" width="120" height="50" rx="10" fill="url(#hatch)" stroke="#7c3aed" stroke-width="3"/>' +
      '<rect x="112" y="104" width="104" height="18" rx="5" fill="#fff"/><text x="164" y="117" text-anchor="middle" font-size="10" font-weight="800" fill="#5b21b6" font-family="Jakarta, sans-serif">Nazorat zonasi</text></g>' +
      '</svg>');
    const groups = svg.querySelectorAll('.zl');
    const texts = o.items || {};
    function pick(z) {
      Array.prototype.forEach.call(groups, function (g) { const on = g.getAttribute('data-z') === z || z === 'all'; g.style.opacity = on ? 1 : .22; });
      info.innerHTML = '';
      const t = texts[z]; if (t) info.appendChild(h('div.wg-result', null, h('div.rt', t.t), h('div.rd', { html: rich(t.d) })));
    }
    const s = seg([['hudud', 'Hudud'], ['chegara', 'Chegara'], ['zona', 'Nazorat zonasi']], 'hudud', pick);
    const el = card('map', o.head || 'Uch tushunchani farqlang', o.sub || 'Tugmalarni bosing — sxemada qatlam ajratib ko\'rsatiladi', [s, h('div.zones', null, svg), info]);
    pick('hudud');
    return el;
  };

  /* ---------- 2. Levels (compare control forms etc.) ---------- */
  W.levels = function (o) {
    const items = o.items || [];
    const box = h('div.stack');
    function show(i) {
      const it = items[i]; box.innerHTML = '';
      const meter = h('div.row', { style: 'gap:6px' }, h('span.small.bold.muted', o.meter || 'Aralashuv darajasi'), h('div.grow'), [1, 2, 3, 4].map(function (k) { return h('i', { style: 'display:block;width:26px;height:10px;border-radius:4px;background:' + (k <= it.lvl ? 'linear-gradient(90deg,var(--c1,#2563eb),var(--c2,#4f46e5))' : 'var(--surface-3)') + ';transition:background .3s' }); }));
      box.appendChild(meter);
      box.appendChild(h('div.wg-result', null, h('div.rt', { html: IC(it.i || 'info', 18) + ' ' + esc(it.n) }), h('div.rd', { html: rich(it.d) })));
      const rows = h('div.form-meter');
      (it.rows || []).forEach(function (r) { rows.appendChild(h('div.fm-row', null, h('span', r[0]), h('b.' + (r[2] || ''), { html: (r[2] === 'y' ? IC('check', 14, 3) : r[2] === 'n' ? IC('x', 14, 3) : '') + esc(r[1]) }))); });
      box.appendChild(rows);
    }
    const s = seg(items.map(function (it, i) { return [i, it.short || it.n]; }), 0, show);
    const el = card(o.icon || 'layers', o.head, o.sub, [s, box]);
    show(0);
    return el;
  };

  /* ---------- 3. Order the steps (tap in correct order) ---------- */
  W.order = function (o) {
    const correct = o.items.slice();
    let next = 0, errors = 0;
    const list = h('div.order-items');
    const status = h('div.score-line', null, h('span', 'Qadam: 0/' + correct.length), h('span', 'Xatolar: 0'));
    const res = h('div');
    function render() {
      list.innerHTML = '';
      U.shuffle(correct.map(function (t, i) { return { t: t, i: i }; })).forEach(function (it) {
        const b = h('button', { onclick: function () {
          if (b.classList.contains('done')) return;
          if (it.i === next) {
            b.classList.add('done'); b.querySelector('.on').textContent = String(next + 1); next++; TG.sel();
            if (next === correct.length) { TG.note('success'); res.innerHTML = ''; res.appendChild(result(errors ? 'warn' : 'ok', errors ? 'Bajarildi, ' + errors + ' ta xato bilan' : 'Ajoyib! Hammasi to\'g\'ri tartibda', o.done || '')); if (!errors) { Store.addXp(10); Store.save(); } }
          } else { errors++; b.classList.remove('err'); void b.offsetWidth; b.classList.add('err'); TG.note('error'); }
          status.children[0].textContent = 'Qadam: ' + next + '/' + correct.length; status.children[1].textContent = 'Xatolar: ' + errors;
        } }, h('span.on', '?'), h('span', { html: rich(it.t) }));
        list.appendChild(b);
      });
    }
    render();
    const again = h('button.btn.sm.secondary', { html: IC('replay', 16) + ' Qaytadan', onclick: function () { next = 0; errors = 0; res.innerHTML = ''; status.children[0].textContent = 'Qadam: 0/' + correct.length; status.children[1].textContent = 'Xatolar: 0'; render(); } });
    return card('listc', o.head || 'To\'g\'ri tartibni tiklang', o.sub || 'Qadamlarni bajarilish ketma-ketligida bosing', [status, list, res, again]);
  };

  /* ---------- 4. Flow (step-through reveal) ---------- */
  W.flow = function (o) {
    let cur = 0;
    const flow = h('div.flow');
    const nodes = o.items.map(function (it, i) {
      const n = h('div.fs', null, h('div.rail', null, h('i', { html: it.i ? IC(it.i, 15, 2.4) : String(i + 1) }), h('s')), h('div.fb', null, it.tag ? h('span.pill.brand', { style: 'margin-bottom:4px' }, it.tag) : null, h('div.t', { html: rich(it.t) }), it.d ? h('div.d', { html: rich(it.d) }) : null));
      flow.appendChild(n); return n;
    });
    const btn = h('button.btn.sm');
    function upd() {
      nodes.forEach(function (n, i) { n.classList.toggle('on', i <= cur); n.classList.toggle('cur', i === cur); n.classList.toggle('off', i > cur); });
      btn.innerHTML = cur < nodes.length - 1 ? 'Keyingi qadam ' + IC('arrow', 16) : IC('replay', 16) + ' Boshidan';
    }
    btn.onclick = function () { if (cur < nodes.length - 1) { cur++; TG.sel(); } else cur = 0; upd(); if (nodes[cur].scrollIntoView) nodes[cur].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
    const all = h('button.btn.sm.ghost', { onclick: function () { cur = nodes.length - 1; upd(); } }, 'Hammasini ko\'rsatish');
    upd();
    return card(o.icon || 'route', o.head, o.sub || 'Har bir qadamni ketma-ket oching', [flow, h('div.row', null, btn, all)]);
  };

  /* ---------- 5. Timeline (dated provisions) ---------- */
  W.timeline = function (o) {
    const today = new Date().toISOString().slice(0, 10);
    const tl = h('div.timeline');
    let nowMarked = false;
    o.items.forEach(function (it) {
      const past = it.iso && it.iso <= today;
      const isNext = !nowMarked && it.iso && it.iso > today; if (isNext) nowMarked = true;
      const b = h('button.tl-item' + (past ? '.past' : ''), { onclick: function () { b.classList.toggle('open'); TG.sel(); } },
        h('div.d', null, it.d, past ? h('span.now', 'kuchga kirgan') : isNext ? h('span.now', { style: 'background:var(--warn)' }, 'navbatdagi') : null),
        h('div.x', { html: rich(it.t) }), it.more ? h('div.more', { html: rich(it.more) }) : null);
      tl.appendChild(b);
    });
    return card(o.icon || 'cal', o.head || 'Muddatlar jadvali', o.sub || 'Sanani bosing — batafsil ochiladi', [tl]);
  };

  /* ---------- 6. Decide (card game: corridor / banned / sorter) ---------- */
  W.decide = function (o) {
    let deck = U.shuffle(o.cards).slice(0, o.n || o.cards.length), i = 0, score = 0;
    const holder = h('div');
    const status = h('div.score-line');
    const btns = h('div.btn-row');
    const fb = h('div');
    function show() {
      fb.innerHTML = ''; holder.innerHTML = ''; btns.innerHTML = '';
      status.innerHTML = ''; status.appendChild(h('span', (i + 1) + ' / ' + deck.length)); status.appendChild(h('span', 'To\'g\'ri: ' + score));
      if (i >= deck.length) return end();
      const c = deck[i];
      holder.appendChild(h('div.swipe-card', null, h('div.em', { html: IC(c.i || o.icon || 'box', 26) }), h('div.nm', { html: rich(c.t) }), c.s ? h('div.small.muted', { html: rich(c.s) }) : null));
      o.choices.forEach(function (ch) {
        btns.appendChild(h('button.btn.sm', { style: 'background:' + ch.c + ';box-shadow:none', html: (ch.i ? IC(ch.i, 16) + ' ' : '') + esc(ch.t), onclick: function () { answer(ch.k); } }));
      });
    }
    function answer(k) {
      const c = deck[i], ok = c.a === k; if (ok) score++;
      TG.note(ok ? 'success' : 'error');
      btns.innerHTML = '';
      const right = o.choices.find(function (x) { return x.k === c.a; });
      fb.appendChild(h('div.feedback.' + (ok ? 'ok' : 'bad'), null, h('div.fh', { html: IC(ok ? 'okc' : 'xc', 18) + (ok ? " To'g'ri!" : " Noto'g'ri — to'g'ri javob: " + esc(right ? right.t : '')) }), c.ex ? h('p', { html: rich(c.ex) }) : null));
      btns.appendChild(h('button.btn.sm', { html: (i < deck.length - 1 ? 'Keyingisi ' : 'Natija ') + IC('arrow', 16), onclick: function () { i++; show(); } }));
    }
    function end() {
      const pct = Math.round(score / deck.length * 100);
      holder.appendChild(h('div.result-hero', null, UI.ring(pct, 96, 9, '<span style="font-size:1.4rem">' + score + '/' + deck.length + '</span>'), h('div.grade', pct >= 80 ? 'Zo\'r natija!' : pct >= 50 ? 'Yomon emas' : 'Yana mashq qiling'), h('div.gsub', o.endNote || '')));
      if (pct >= 80) { Store.addXp(15); Store.save(); }
      btns.appendChild(h('button.btn.sm.secondary', { html: IC('replay', 16) + ' Yana o\'ynash', onclick: function () { deck = U.shuffle(o.cards).slice(0, o.n || o.cards.length); i = 0; score = 0; show(); } }));
    }
    show();
    return card(o.icon || 'target', o.head, o.sub, [status, holder, fb, btns]);
  };

  /* ---------- 7. Wizard (yes/no decision tree) ---------- */
  W.wizard = function (o) {
    const body = h('div.stack');
    const path = [];
    function go(id) {
      const node = o.nodes[id]; body.innerHTML = '';
      if (path.length) body.appendChild(h('div.small.muted', { html: path.map(function (p) { return '<b>' + esc(p[1] ? 'Ha' : "Yo'q") + '</b> — ' + esc(p[0]); }).join('<br>') }));
      if (node.r) {
        body.appendChild(result(node.r, node.t, node.d));
        body.appendChild(h('button.btn.sm.secondary', { html: IC('replay', 16) + ' Boshqa vaziyat', onclick: function () { path.length = 0; go(o.start); } }));
        TG.note(node.r === 'ok' ? 'success' : 'warning');
        return;
      }
      body.appendChild(h('div.check', null, h('div.blk-head', { html: IC('msg', 14) + ' Savol ' + (path.length + 1) }), h('div.q', { html: rich(node.q) }), node.hint ? h('div.small.muted', { style: 'margin:-4px 0 10px', html: rich(node.hint) }) : null,
        h('div.btn-row', null,
          h('button.btn.sm.ok', { html: IC('check', 16) + ' Ha', onclick: function () { path.push([node.q.replace(/\*\*|==/g, ''), true]); go(node.yes); } }),
          h('button.btn.sm.bad', { html: IC('x', 16) + " Yo'q", onclick: function () { path.push([node.q.replace(/\*\*|==/g, ''), false]); go(node.no); } }))));
    }
    go(o.start);
    return card(o.icon || 'msg', o.head, o.sub, [body]);
  };

  /* ---------- 8. Gauges (animated numbers) ---------- */
  W.gauges = function (o) {
    const row = h('div.gauge-row');
    o.items.forEach(function (it) {
      const v = h('span', '0');
      row.appendChild(h('div', null, h('div.gv', null, it.pre || '', v, it.suf || ''), h('div.gl', { html: rich(it.l) })));
      setTimeout(function () { UI.countUp(v, it.v, 1200, it.dec || 0); }, 250);
    });
    return card(o.icon || 'target', o.head, o.sub, [row, o.note ? h('div.small.muted', { html: rich(o.note) }) : null]);
  };

  /* ---------- 9. Import / YBT calculator ---------- */
  W.importCalc = function (o) {
    const rules = R();
    const st = { per: o.per || 'now', val: o.val || 1800, kg: o.kg || 20, alc: false, compare: !!o.compare };
    const out = h('div');
    function calcFor(per) {
      const y = rules.ybt[per];
      const norm = rules.importNormUSD;
      const excess = Math.max(0, st.val - norm);
      const kgEx = st.val > 0 ? st.kg * excess / st.val : 0;
      const byRate = excess * y.rate, byKg = kgEx * y.perKg;
      let pay = Math.max(byRate, byKg); if (st.alc) pay *= 2;
      return { y: y, norm: norm, excess: excess, kgEx: kgEx, byRate: byRate, byKg: byKg, pay: pay };
    }
    function block(per, title) {
      const c = calcFor(per);
      if (c.excess <= 0) return result('ok', title + ': to\'lov yo\'q', 'Tovarlar qiymati ' + usd(st.val) + ' — bojsiz me\'yor (' + usd(c.norm) + ') doirasida. Og\'zaki deklaratsiya, "yashil" yo\'lak.');
      const maxBar = Math.max(c.byRate, c.byKg) || 1;
      const barRow = function (label, v, win) { return h('div', { style: 'margin:6px 0' }, h('div.row-between.small', null, h('span', label), h('b', usd(v))), UI.bar(v / maxBar * 100, win ? '#10b981' : '#94a3b8', win ? '#059669' : '#cbd5e1')); };
      return h('div.wg-result', null,
        h('div.rt', title),
        h('div.calc-line', null, h('span', 'Me\'yordan ortiq qism'), h('b', usd(st.val) + ' − ' + usd(c.norm) + ' = ' + usd(c.excess))),
        h('div.calc-line', null, h('span', 'Ortiqcha qism og\'irligi*'), h('b', U.num(c.kgEx, 1) + ' kg')),
        barRow(Math.round(c.y.rate * 100) + '% × ' + usd(c.excess), c.byRate, c.byRate >= c.byKg),
        barRow(usd(c.y.perKg) + ' × ' + U.num(c.kgEx, 1) + ' kg', c.byKg, c.byKg > c.byRate),
        st.alc ? h('div.calc-line', null, h('span', 'Alkogol/tamaki — ikki baravar'), h('b', '× 2')) : null,
        h('div.row-between', { style: 'margin-top:8px' }, h('span.bold', 'Yagona bojxona to\'lovi'), h('span.calc-total', usd(c.pay))));
    }
    function upd() {
      out.innerHTML = '';
      if (st.compare) { out.appendChild(h('div.stack', null, block('now', 'Hozirgi tartib (' + Math.round(rules.ybt.now.rate * 100) + '%, ' + usd(rules.ybt.now.perKg) + '/kg)'), block('y2027', '2027-yil 1-yanvardan (' + Math.round(rules.ybt.y2027.rate * 100) + '%, ' + usd(rules.ybt.y2027.perKg) + '/kg)'))); const a = calcFor('now').pay, b = calcFor('y2027').pay; if (a > b) out.appendChild(result('ok', 'Tejash: ' + usd(a - b), 'PF-174 farmoni 8-bandiga ko\'ra yo\'lovchi shu holatda ' + Math.round((1 - b / a) * 100) + '% kam to\'laydi.')); }
      else out.appendChild(block(st.per, st.per === 'now' ? 'Hozirgi tartib' : '2027-yil 1-yanvardan'));
    }
    const perSeg = seg([['now', 'Hozir'], ['y2027', '2027-yildan'], ['cmp', 'Solishtirish']], st.compare ? 'cmp' : st.per, function (v) { if (v === 'cmp') st.compare = true; else { st.compare = false; st.per = v; } upd(); });
    const alcRow = h('button.row-between', { style: 'width:100%;padding:4px 2px;text-align:left', onclick: function () { st.alc = !st.alc; sw.classList.toggle('on', st.alc); upd(); } }, h('span.small.bold', 'Ortiqcha qism alkogol yoki tamaki mahsulotlari'), (function () { return null; })());
    const sw = h('span.switch'); alcRow.appendChild(sw);
    const body = [
      perSeg,
      numField('Tovarlarning umumiy qiymati', st.val, 'USD', 'Havo transportida bojsiz me\'yor: ' + usd(rules.importNormUSD), function (v) { st.val = v; upd(); }),
      numField('Umumiy og\'irligi', st.kg, 'kg', null, function (v) { st.kg = v; upd(); }),
      alcRow, out,
      h('div.tiny.faint', '* O\'quv modeli: ortiqcha qism og\'irligi qiymatga mutanosib olinadi. Amalda xodim me\'yordan ortgan aniq tovarlarning qiymati va og\'irligi bo\'yicha hisoblaydi. To\'lov ikki usulda hisoblanib, kattasi olinadi.')
    ];
    upd();
    return card('calc', o.head || 'Yagona bojxona to\'lovi kalkulyatori', o.sub || 'Jismoniy shaxslar, notijorat maqsad, havo transporti', body);
  };

  /* ---------- 10. Allowance checker (alcohol, cigarettes, phones) ---------- */
  W.allowance = function (o) {
    const rules = R().items || [];
    const out = h('div.stack');
    const vals = {};
    const fields = rules.map(function (r) {
      vals[r.k] = 0;
      return numField(r.t, '', r.u, 'Me\'yor: ' + r.max + ' ' + r.u + (r.note ? ' · ' + r.note : ''), function (v) { vals[r.k] = v; upd(); });
    });
    function upd() {
      out.innerHTML = '';
      const over = rules.filter(function (r) { return vals[r.k] > r.max; });
      if (!rules.some(function (r) { return vals[r.k] > 0; })) return;
      if (!over.length) out.appendChild(result('ok', 'Me\'yor doirasida', 'Ushbu tovarlar bo\'yicha cheklangan me\'yorlar oshmagan.'));
      else out.appendChild(result('warn', 'Me\'yor oshgan', over.map(function (r) { return '**' + r.t + '**: ' + vals[r.k] + ' ' + r.u + ' (me\'yor ' + r.max + ')'; }).join('\n') + '\nOrtiqcha miqdor yozma deklaratsiya qilinadi va bojxona to\'lovlari undiriladi.'));
    }
    return card('listc', o.head || 'Alohida me\'yorlarni tekshiring', o.sub || 'Yo\'lovchi olib kelgan miqdorni kiriting', fields.concat([out]));
  };

  /* ---------- 11. Storage fee calculator ---------- */
  W.storageCalc = function (o) {
    const rules = R().storage;
    const st = { kg: 150, days: 8, per: false, bhm: Store.d.set.bhm || R().bhm };
    const out = h('div');
    function upd() {
      out.innerHTML = '';
      const units = Math.max(1, Math.ceil(st.kg / 100));
      const d = Math.max(0, Math.floor(st.days));
      let total = 0; const lines = [];
      if (st.per) { const f = st.bhm * rules.perishable * units * d; total = f; lines.push(['1–' + d + '-kunlar: ' + Math.round(rules.perishable * 100) + '% × ' + units + ' birlik × ' + d + ' kun', f]); }
      else {
        rules.tiers.forEach(function (t) { const from = t.from, to = t.to || Infinity; const n = Math.max(0, Math.min(d, to) - from + 1); if (n > 0) { const f = st.bhm * t.p * units * n; total += f; lines.push([from + '–' + (t.to ? t.to : '…') + '-kunlar: ' + Math.round(t.p * 100) + '% × ' + units + ' × ' + n + ' kun', f]); } });
      }
      const limit = st.per ? rules.maxPerishable : rules.maxDays;
      const r = h('div.wg-result' + (d > limit ? '.warn' : ''), null,
        h('div.rt', 'Saqlash to\'lovi'),
        h('div.calc-line', null, h('span', 'Hisob birligi (har 100 kg gacha)'), h('b', units + ' birlik')),
        lines.map(function (l) { return h('div.calc-line', null, h('span', l[0]), h('b', som(l[1]))); }),
        h('div.row-between', { style: 'margin-top:8px' }, h('span.bold', 'Jami'), h('span.calc-total', som(total))),
        d > limit ? h('div.rd', { style: 'margin-top:6px', html: rich('**Diqqat:** vaqtincha saqlash muddati ' + limit + ' kundan oshmasligi kerak (' + (st.per ? 'tez buziladigan tovar' : 'oddiy tovar va hujjatlar') + ').') }) : null);
      out.appendChild(r);
    }
    const body = [
      seg([[false, 'Oddiy tovar'], [true, 'Tez buziladigan']], false, function (v) { st.per = v; upd(); }),
      numField('Og\'irligi', st.kg, 'kg', null, function (v) { st.kg = v; upd(); }),
      numField('Saqlash kunlari', st.days, 'kun', null, function (v) { st.days = v; upd(); }),
      numField('BHM (bazaviy hisoblash miqdori)', st.bhm, 'so\'m', R().bhmNote || '', function (v) { st.bhm = v; Store.d.set.bhm = v; Store.save(); upd(); }),
      out];
    upd();
    return card('store', o.head || 'Vaqtincha saqlash to\'lovi', o.sub || 'Har kun uchun, har 100 kg gacha', body);
  };

  /* ---------- 12. Currency checker ---------- */
  W.currency = function (o) {
    const rules = R().cash;
    const st = { dir: 'out', cur: 'USD', amt: 5000, rate: rules.defaultRates.USD };
    const out = h('div');
    const rateField = numField('1 birlik kursi (Markaziy bank)', st.rate, 'so\'m', 'Taxminiy qiymat — joriy MB kursini kiriting', function (v) { st.rate = v; upd(); });
    function upd() {
      out.innerHTML = '';
      const uzs = st.cur === 'UZS' ? st.amt : st.amt * st.rate;
      rateField.style.display = st.cur === 'UZS' ? 'none' : '';
      const eq = h('div.calc-line', null, h('span', 'So\'mdagi ekvivalenti'), h('b', som(uzs)));
      let res;
      if (st.dir === 'in') res = rules.checkIn(uzs);
      else res = rules.checkOut(uzs);
      out.appendChild(h('div.stack', null, h('div.card.flat.tight', null, eq), result(res.r, res.t, res.d)));
    }
    const body = [
      seg([['in', 'Olib kirish'], ['out', 'Olib chiqish']], st.dir, function (v) { st.dir = v; upd(); }),
      seg([['USD', 'USD'], ['EUR', 'EUR'], ['RUB', 'RUB'], ['UZS', 'So\'m']], st.cur, function (v) { st.cur = v; if (v !== 'UZS') { st.rate = rules.defaultRates[v]; rateField.querySelector('input').value = st.rate; } upd(); }),
      numField('Naqd pul miqdori', st.amt, '', null, function (v) { st.amt = v; upd(); }),
      rateField, out];
    upd();
    return card('cash', o.head || 'Naqd valyuta: deklaratsiya kerakmi?', o.sub || 'Jismoniy shaxs, aeroport', body);
  };

  /* ---------- 13. Jewellery export checker ---------- */
  W.jewelry = function (o) {
    const rules = R().jewelry;
    const st = { ag: 120, au: 40 };
    const out = h('div');
    function upd() {
      out.innerHTML = '';
      const okAg = st.ag <= rules.silver, okAu = st.au <= rules.gold;
      if (okAg && okAu) out.appendChild(result('ok', 'Deklaratsiyasiz olib chiqish mumkin', 'Kumush ' + st.ag + ' g (me\'yor ' + rules.silver + ' g), oltin ' + st.au + ' g (me\'yor ' + rules.gold + ' g).'));
      else out.appendChild(result('warn', 'Yozma deklaratsiya kerak', (!okAg ? 'Kumush ' + st.ag + ' g > ' + rules.silver + ' g. ' : '') + (!okAu ? 'Oltin va boshqa qimmatbaho metallar ' + st.au + ' g > ' + rules.gold + ' g. ' : '') + 'Me\'yordan oshgan zargarlik buyumlari YBD asosida olib chiqiladi.'));
    }
    const body = [
      numField('Kumush zargarlik buyumlari', st.ag, 'g', null, function (v) { st.ag = v; upd(); }),
      numField('Oltin (va boshqa qimmatbaho metall) buyumlari', st.au, 'g', null, function (v) { st.au = v; upd(); }),
      out, h('div.tiny.faint', { html: rich(rules.note || '') })];
    upd();
    return card('gem', o.head || 'Zargarlik buyumlarini olib chiqish', o.sub || 'Tayyor buyumlar, bir yo\'lovchi', body);
  };

  /* ---------- 14. Auto-clearance checker (PF-174, p.7) ---------- */
  W.checklist = function (o) {
    const flags = o.items.map(function () { return false; });
    const out = h('div');
    const list = h('div.stack');
    o.items.forEach(function (it, i) {
      const sw = h('span.switch');
      list.appendChild(h('button.row-between.card.flat.tight', { style: 'width:100%;text-align:left', onclick: function () { flags[i] = !flags[i]; sw.classList.toggle('on', flags[i]); TG.sel(); upd(); } }, h('span.small', { style: 'line-height:1.45', html: rich(it) }), sw));
    });
    function upd() {
      out.innerHTML = '';
      const all = flags.every(Boolean), n = flags.filter(Boolean).length;
      out.appendChild(all ? result('ok', o.yes.t, o.yes.d) : result('warn', o.no.t + ' (' + n + '/' + flags.length + ')', o.no.d));
    }
    upd();
    return card(o.icon || 'listc', o.head, o.sub, [list, out]);
  };

  /* ---------- tool wrappers (data from GAMES in data-modules.js) ---------- */
  W.corridor = function (o) { return W.decide(Object.assign({}, (global.GAMES || {}).corridor, o)); };
  W.banned = function (o) { return W.decide(Object.assign({}, (global.GAMES || {}).banned, o)); };
  W.sorter = function (o) { return W.decide(Object.assign({}, (global.GAMES || {}).sorter, o)); };
  W.ybdWizard = function (o) { return W.wizard(Object.assign({}, (global.GAMES || {}).ybd, o)); };
})(window);
