/* Problemes PAU · Matemàtiques II i Física II (problemes.html#pau): any → sèries → examen amb solució a demanda.
 * Dades: data/<m|f>-pau[.es].json (índex) i data/<m|f>-pau-<any>-<sèrie>[.es].json. Progrés a localStorage (mk-pm). */
(function () {
  'use strict';
  var E = !!(window.MKL && MKL.es), t = function (es, ca) { return E ? es : ca; };
  var SFX = E ? '.es.json' : '.json', LK = 'mk-pm';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cache = {}, box = null, back = null, idx = null, S = 'm', idxs = {}, st = { ex: 1, opt: {} };

  function o(x) { return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function pts(n) { return String(n).replace('.', ','); }
  function get(url) {
    return cache[url] || (cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(url); return r.json(); }).catch(function (e) { delete cache[url]; throw e; }));
  }
  function store() { try { return JSON.parse(localStorage.getItem(LK)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(LK, JSON.stringify(s)); } catch (e) { } }
  function isDone(key, n) { var s = store(); return !!(s[key] && s[key][n]); }
  function setDone(key, n, on) { var s = store(); s[key] = s[key] || {}; if (on) s[key][n] = 1; else delete s[key][n]; save(s); }

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    chk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };

  function seriesName(s) { return t('Serie ', 'Sèrie ') + s.id; }
  function keyOf(y, id) { return (S === 'm' ? '' : S) + y + '-' + id; }
  function subj() { return S === 'f' ? 'Física II' : S === 'h' ? t('Historia de la Filosofía', 'Història de la Filosofia') : t('Matemáticas II', 'Matemàtiques II'); }
  function dat(sfx) { return 'data/' + S + '-pau' + sfx; }
  function placeThumb(seg) {
    var b = seg.querySelector('[aria-selected="true"]'), th = seg.querySelector('.pm-th');
    if (!b || !th || !b.offsetWidth) return;
    th.style.width = b.offsetWidth + 'px'; th.style.transform = 'translateX(' + b.offsetLeft + 'px)';
  }
  function head(inner) {
    return '<div class="pau-in" style="--h:352">' + inner + '</div>';
  }

  /* ───────── vista 1: años (series completas) o temas ───────── */
  function loadMode() { try { return localStorage.getItem('mk-pm-mode') === 't' ? 't' : 's'; } catch (e) { return 's'; } }
  function saveMode(m) { try { localStorage.setItem('mk-pm-mode', m); } catch (e) { } }
  function yearsGrid() {
    var h = '<div class="pm-pau-grid">';
    idx.years.forEach(function (y, i) {
      var chips = y.series.map(function (s) { return '<span class="pm-chip">' + seriesName(s) + '</span>'; }).join('');
      h += '<button type="button" class="pm-pau-card pm-pin" style="--i:' + i + ';text-align:left;border:0;font:inherit;cursor:pointer" data-act="year" data-yy="' + y.y + '">' +
        '<span class="pm-kk">PAU</span><span class="pm-big">' + y.y + '</span>' +
        '<div class="pm-chips">' + chips + '</div>' +
        '<p>' + y.series.length + ' ' + t('series completas del examen oficial, con solución paso a paso.', 'sèries completes de l’examen oficial, amb solució pas a pas.') + '</p>' +
        '<span class="pm-go"><b>' + t('Elegir serie', 'Tria una sèrie') + ' ' + ICON.arrow + '</b></span></button>';
    });
    return h + '</div>';
  }

  /* temas: cada ejercicio (o cada opción, si tiene tema propio) es una tarjeta; puede estar en varios temas */
  function units() {
    var u = [];
    idx.years.forEach(function (y) {
      y.series.forEach(function (se) {
        var qw = se.ex.length > 4 ? t('Cuestión', 'Qüestió') : t('Ejercicio', 'Exercici');
        se.ex.forEach(function (e) {
          var split = e.opts && e.opts.some(function (o) { return o.tags; });
          (split ? e.opts : [e]).forEach(function (x) {
            u.push({ y: y.y, s: se.id, n: e.n, k: split ? x.k : '', pts: e.pts, tags: x.tags || e.tags || [], ttl: x.ttl || e.ttl || '', alts: split ? [x.ids] : (e.opts ? e.opts.map(function (o) { return o.ids; }) : [e.ids]), qw: qw, se: se });
          });
        });
      });
    });
    return u;
  }
  function prog(u) {
    var sd = store()[keyOf(u.y, u.s)] || {}, best = { d: 0, n: u.alts[0].length };
    u.alts.forEach(function (ids) { var d = ids.filter(function (id) { return sd[id]; }).length; if (d > best.d) best = { d: d, n: ids.length }; });
    return best;
  }
  function themeLabel(id) { var r = idx.th.filter(function (x) { return x.id === id; })[0]; return r ? r.t : id; }
  function topicCard(u, i) {
    var p = prog(u), done = p.d >= p.n && p.n > 0, tg = u.tags.map(function (id) { return '<span class="pm-chip">' + o(themeLabel(id)) + '</span>'; }).join('');
    return '<button type="button" class="pm-tc pm-pin' + (done ? ' pm-tdn' : '') + '" style="--i:' + Math.min(i, 9) + '" data-act="tp" data-yy="' + u.y + '" data-s="' + u.s + '" data-n="' + u.n + '" data-k="' + u.k + '">' +
      '<span class="pm-tc-k">PAU ' + u.y + ' · ' + seriesName({ id: u.s }) + ' · ' + u.qw + ' ' + u.n + (u.k ? ' · ' + t('Opción ', 'Opció ') + u.k : '') + '</span>' +
      '<span class="pm-tc-t">' + o(u.ttl) + '</span>' +
      '<span class="pm-tc-f"><span class="pm-chips">' + tg + '</span>' +
      '<span class="pm-tc-m"><span>' + pts(u.pts) + ' ' + t('pts', 'pts') + '</span><span class="pm-tc-r" title="' + p.d + ' / ' + p.n + '" aria-label="' + p.d + ' / ' + p.n + ' ' + t('hechos', 'fets') + '">' + (done ? ICON.chk : '<b>' + p.d + '/' + p.n + '</b>') + '</span></span></span></button>';
  }
  function topicList() {
    var all = units(), th = st.th || 'all', h = '', i = 0;
    var ids = th === 'all' ? idx.th.map(function (x) { return x.id; }) : [th];
    ids.forEach(function (id) {
      var us = all.filter(function (u) { return u.tags.indexOf(id) >= 0; }); if (!us.length) return;
      if (th === 'all') h += '<h3 class="pm-tg">' + o(themeLabel(id)) + '<small>' + us.length + '</small></h3>';
      h += '<div class="pm-tl">' + us.map(function (u) { return topicCard(u, i++); }).join('') + '</div>';
    });
    return h;
  }
  function topicsHTML() {
    var all = units(), th = st.th || 'all';
    function cnt(id) { return id === 'all' ? all.length : all.filter(function (u) { return u.tags.indexOf(id) >= 0; }).length; }
    var tabs = [{ id: 'all', t: t('Todos', 'Tots') }].concat(idx.th);
    var h = '<div class="pm-pau-bar pm-fb"><div class="wrap pm-wrap"><div class="pm-seg pm-fl" role="tablist" aria-label="' + t('Tema', 'Tema') + '"><i class="pm-th" aria-hidden="true"></i>' +
      tabs.map(function (x) { return '<button type="button" role="tab" data-act="th" data-th="' + x.id + '" aria-selected="' + (x.id === th) + '" tabindex="' + (x.id === th ? 0 : -1) + '">' + o(x.t) + ' <em>' + cnt(x.id) + '</em></button>'; }).join('') +
      '</div></div></div><div id="pm-tl-w" aria-live="polite">' + topicList() + '</div>';
    return h;
  }
  function fillMode() {
    var c = box.querySelector('#pm-mc'); if (!c) return;
    c.innerHTML = st.mode === 't' ? topicsHTML() : yearsGrid();
    [].forEach.call(box.querySelectorAll('.pm-md [data-act="mode"]'), function (b) { var on = b.getAttribute('data-m') === st.mode; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    thumbs();
  }
  function years(restore) {
    st.mode = st.mode || loadMode();
    var h = '<button type="button" class="pau-back" data-act="home">‹ ' + t('Todas las asignaturas', 'Totes les assignatures') + '</button>' +
      '<h2 class="pau-h">' + subj() + '<small>PAU · ' + t('Problemas', 'Problemes') + '</small></h2>' +
      '<div class="pm-pau"><div class="pm-md"><div class="pm-seg pm-lg" role="tablist" aria-label="' + t('Cómo ver los problemas', 'Com veure els problemes') + '"><i class="pm-th" aria-hidden="true"></i>' +
      '<button type="button" role="tab" data-act="mode" data-m="s" aria-selected="false">' + t('Series completas', 'Sèries completes') + '</button>' +
      '<button type="button" role="tab" data-act="mode" data-m="t" aria-selected="false">' + t('Por temas', 'Per temes') + '</button></div></div>' +
      '<div id="pm-mc"></div></div>';
    box.innerHTML = head(h);
    fillMode();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(thumbs);
    if (restore && st.sy != null) { var y = st.sy; st.sy = null; scrollTo(0, y); } else focusTop();
  }

  /* ───────── vista 2: series ───────── */
  function seriesView(yv) {
    var y = idx.years.filter(function (x) { return x.y === yv; })[0]; if (!y) return years();
    var h = '<button type="button" class="pau-back" data-act="years">‹ ' + t('Años', 'Anys') + '</button>' +
      '<h2 class="pau-h">PAU ' + y.y + '<small>' + subj() + t(' · elige una serie', ' · tria una sèrie') + '</small></h2>' +
      '<div class="pm-pau"><p class="pm-pau-note">' + (S === 'h' ? t('Cada serie tiene tres ejercicios obligatorios (6 + 2 + 2 puntos); en el primero y en el tercero eliges la opción A o la B. Redacta tu respuesta en papel y luego compárala con la respuesta modelo, que es una propuesta posible, no la única válida.', 'Cada sèrie té tres exercicis obligatoris (6 + 2 + 2 punts); en el primer i en el tercer tries l’opció A o la B. Redacta la teva resposta en paper i després compara-la amb la resposta model, que és una proposta possible, no l’única vàlida.') : S === 'f' ? t('Cada serie tiene cuatro ejercicios de 2,5 puntos, todos obligatorios; en los que ofrecen dos opciones eliges la A o la B. Intenta resolverlos en papel y luego muestra la solución de cada apartado.', 'Cada sèrie té quatre exercicis de 2,5 punts, tots obligatoris; en els que ofereixen dues opcions tries l’A o la B. Intenta resoldre’ls en paper i després mostra la solució de cada apartat.') : y.series.some(function (s) { return s.ex.length > 4; }) ? t('Cada serie tiene seis cuestiones de 2,5 puntos y hay que responder a cuatro. Intenta resolverlas en papel y luego muestra la solución de cada apartado.', 'Cada sèrie té sis qüestions de 2,5 punts i cal respondre’n quatre. Intenta resoldre-les en paper i després mostra la solució de cada apartat.') : t('Cada serie tiene cuatro ejercicios de 2,5 puntos; en el cuarto se elige la opción A o B. Intenta resolverlo en papel y luego muestra la solución de cada apartado.', 'Cada sèrie té quatre exercicis de 2,5 punts; al quart cal triar l’opció A o B. Intenta resoldre’l en paper i després mostra la solució de cada apartat.')) + '</p><div class="pm-pau-grid">';
    y.series.forEach(function (s, i) {
      var k = keyOf(y.y, s.id), d = Object.keys(store()[k] || {}).length;
      var topics = []; s.ex.forEach(function (e) { if (topics.indexOf(e.topic) < 0) topics.push(e.topic); });
      var pc = Math.min(100, Math.round(d / s.np * 100));
      h += '<article class="pm-pau-card pm-pin" style="--i:' + i + '">' +
        '<span class="pm-kk">PAU ' + y.y + '</span><h2>' + seriesName(s) + '</h2>' +
        '<div class="pm-chips">' + topics.map(function (x) { return '<span class="pm-chip">' + o(x) + '</span>'; }).join('') + '</div>' +
        '<div><div class="pm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pc + '" aria-label="' + t('Progreso', 'Progrés') + '"><i style="--v:' + pc + '%"></i></div>' +
        '<div class="pm-pm"><span>' + d + ' / ' + s.np + ' ' + t('apartados', 'apartats') + '</span><span>10 ' + t('puntos', 'punts') + '</span></div></div>' +
        '<div class="pm-go"><button type="button" class="pm-pau-btn pm-pri" data-act="open" data-yy="' + y.y + '" data-s="' + s.id + '">' + (d ? t('Continuar', 'Continua') : t('Hacer la serie', 'Fes la sèrie')) + ' ' + ICON.arrow + '</button>' +
        '<a class="pm-pau-btn pm-gh pm-dl" href="' + o(s.pdf) + '" download>' + ICON.pdf + ' PDF</a></div></article>';
    });
    box.innerHTML = head(h + '</div></div>');
    focusTop();
  }

  /* ───────── vista 3: examen ───────── */
  function counted(ex) {
    if (ex.parts) return ex.parts.map(function (p) { return p.n; });
    var k = st.opt[ex.n] || ex.opts[0].k, op = ex.opts.filter(function (x) { return x.k === k; })[0];
    return op.parts.map(function (p) { return k + '|' + p.n; });
  }
  function part(key, p, k) {
    var u = k ? k + '|' + p.n : p.n, d = isDone(key, u), id = 'pm-s-' + u.replace(/[^\w]/g, '-');
    return '<section class="pm-ap' + (d ? ' pm-done' : '') + '" data-n="' + u + '"><div class="pm-ap-h"><span class="pm-ap-n">' + p.n + '</span><span class="pm-ap-p">' + pts(p.pts) + ' ' + (p.pts === 1 ? t('punto', 'punt') : t('puntos', 'punts')) + '</span></div>' +
      '<div class="pm-ap-q">' + p.q + '</div>' +
      '<div class="pm-ap-act"><button type="button" class="pm-pau-btn" data-act="sol" aria-expanded="false" aria-controls="' + id + '">' + ICON.eye + ' <span>' + t('Mostrar la solución', 'Mostra la solució') + '</span></button>' +
      '<button type="button" class="pm-chk" data-act="done" aria-pressed="' + d + '"><span class="pm-ring">' + ICON.chk + '</span>' + t('Hecho', 'Fet') + '</button></div>' +
      '<div class="pm-rv" id="' + id + '" data-open="false"><div class="pm-rvi"><div class="pm-sol"><span class="pm-kk">' + t('Solución', 'Solució') + ' · ' + p.n + '</span>' + p.sol + '</div></div></div></section>';
  }
  function QW() { return st.exam && st.exam.ex.length > 4 ? t('Cuestión', 'Qüestió') : t('Ejercicio', 'Exercici'); }
  function panel(key, ex, active) {
    var h = '<div class="pm-pau-pn" role="tabpanel" id="pm-p' + ex.n + '" aria-labelledby="pm-t' + ex.n + '"' + (active ? '' : ' hidden') + '>' +
      '<div class="pm-pau-ex"><div class="pm-ex-h"><h2>' + QW() + ' ' + ex.n + '</h2><span class="pm-tp">' + o(ex.topic) + '</span><span class="pm-pt">' + pts(ex.pts) + ' ' + t('puntos', 'punts') + '</span></div>';
    if (ex.lead) h += '<div class="pm-pau-i">' + ex.lead + '</div>';
    if (ex.intro) h += '<div class="pm-pau-i">' + ex.intro + '</div>';
    if (ex.parts) h += ex.parts.map(function (p) { return part(key, p); }).join('');
    else {
      var sel = st.opt[ex.n] || ex.opts[0].k;
      h += '<div class="pm-pau-opt"><span class="pm-lb2">' + t('Elige una opción', 'Tria una opció') + '</span><div class="pm-seg pm-sm" role="tablist" aria-label="' + t('Opción', 'Opció') + '"><i class="pm-th" aria-hidden="true"></i>' +
        ex.opts.map(function (op) { return '<button type="button" role="tab" data-act="opt" data-ex="' + ex.n + '" data-k="' + op.k + '" aria-selected="' + (op.k === sel) + '" tabindex="' + (op.k === sel ? 0 : -1) + '">' + t('Opción ', 'Opció ') + op.k + '</button>'; }).join('') + '</div></div>';
      ex.opts.forEach(function (op) {
        h += '<div class="pm-opn" data-k="' + op.k + '"' + (op.k === sel ? '' : ' hidden') + '>' + (op.intro ? '<div class="pm-pau-i">' + op.intro + '</div>' : '') + op.parts.map(function (p) { return part(key, p, op.k); }).join('') + '</div>';
      });
    }
    return h + '</div></div>';
  }
  function stats(key) {
    var done = 0, tot = 0, s = store()[key] || {};
    st.exam.ex.forEach(function (e) { counted(e).forEach(function (n) { tot++; if (s[n]) done++; }); });
    return { done: done, tot: tot };
  }
  function refresh(key) {
    var s = store()[key] || {}, a = stats(key);
    var el = box.querySelector('.pm-st'); if (el) el.textContent = a.done + ' / ' + a.tot + ' ' + t('hechos', 'fets');
    st.exam.ex.forEach(function (e) {
      var tb = box.querySelector('#pm-t' + e.n); if (!tb) return;
      var all = counted(e).every(function (n) { return s[n]; });
      tb.classList.toggle('pm-dn', all);
    });
  }
  function exam(yv, id) {
    var y = idx.years.filter(function (x) { return x.y === yv; })[0], si = y && y.series.filter(function (s) { return s.id === id; })[0]; if (!si) return years();
    box.innerHTML = head('<div class="pm-pau"><p class="pm-pau-note" role="status">' + t('Cargando…', 'Carregant…') + '</p></div>');
    get(dat('-' + yv + '-' + id + SFX)).then(function (d) {
      var key = keyOf(yv, id); st.exam = d; st.key = key; st.y = yv; st.id = id; st.ex = st.ex || 1;
      if (!d.ex.some(function (e) { return e.n === st.ex; })) st.ex = 1;
      var fromT = st.from === 't';
      var h = '<button type="button" class="pau-back" data-act="' + (fromT ? 'back-t' : 'series') + '" data-yy="' + yv + '">‹ ' + (fromT ? t('Por temas', 'Per temes') : 'PAU ' + yv) + '</button>' +
        '<h2 class="pau-h">' + seriesName(si) + '<small>PAU ' + yv + ' · ' + subj() + '</small></h2>' +
        '<div class="pm-pau">' + (d.ex.length > 4 ? '<p class="pm-pau-note">' + t('Responde a cuatro de las seis cuestiones (cada una vale 2,5 puntos).', 'Respon a quatre de les sis qüestions (cadascuna val 2,5 punts).') + '</p>' : '') + '<div class="pm-pau-tools" style="margin:0 0 14px"><a class="pm-pau-btn pm-gh" href="' + o(si.pdf) + '" download>' + ICON.pdf + ' ' + t('Descargar el examen (PDF)', 'Descarrega l’examen (PDF)') + '</a></div>' +
        '<div class="pm-pau-bar"><div class="wrap pm-wrap"><div class="pm-seg" role="tablist" aria-label="' + t('Ejercicios', 'Exercicis') + '"><i class="pm-th" aria-hidden="true"></i>' +
        d.ex.map(function (e) { return '<button type="button" role="tab" id="pm-t' + e.n + '" data-act="tab" data-n="' + e.n + '" aria-selected="' + (e.n === st.ex) + '" aria-controls="pm-p' + e.n + '" tabindex="' + (e.n === st.ex ? 0 : -1) + '">' + QW() + ' ' + e.n + '<i class="pm-ok" aria-hidden="true"></i></button>'; }).join('') +
        '</div><span class="pm-st" role="status" aria-live="polite"></span></div></div>' +
        '<div id="pm-panels">' + d.ex.map(function (e) { return panel(key, e, e.n === st.ex); }).join('') + '</div>' +
        '<div class="pm-pau-ft"><button type="button" class="pm-pau-btn pm-gh" data-act="prev">‹ ' + t('Anterior', 'Anterior') + '</button><div class="pm-nx"><button type="button" class="pm-pau-btn pm-pri" data-act="next">' + t('Siguiente', 'Següent') + ' ' + ICON.arrow + '</button></div></div></div>';
      box.innerHTML = head(h);
      refresh(key); thumbs(); nav();
      focusTop();
    }).catch(function () {
      box.innerHTML = head('<button type="button" class="pau-back" data-act="series" data-yy="' + yv + '">‹ PAU ' + yv + '</button><div class="pm-pau"><p class="pm-pau-note" role="alert">' + t('No se ha podido cargar la serie. Revisa la conexión e inténtalo de nuevo.', 'No s’ha pogut carregar la sèrie. Revisa la connexió i torna-ho a provar.') + '</p></div>');
    });
  }
  function thumbs() { [].forEach.call(box.querySelectorAll('.pm-seg'), function (s) { s.querySelector('.pm-th') && placeThumb(s); }); }
  function nav() {
    var n = st.exam.ex.length, pv = box.querySelector('[data-act="prev"]'), nx = box.querySelector('[data-act="next"]');
    if (pv) pv.hidden = st.ex <= 1;
    if (nx) nx.hidden = st.ex >= n;
  }
  function focusTop() { var h = box.querySelector('.pau-h'); if (h) h.scrollIntoView({ block: 'start', behavior: RM ? 'auto' : 'smooth' }); }

  function selectEx(n, scroll) {
    st.ex = n;
    [].forEach.call(box.querySelectorAll('[data-act="tab"]'), function (b) { var on = +b.getAttribute('data-n') === n; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    [].forEach.call(box.querySelectorAll('.pm-pau-pn'), function (p) { p.hidden = p.id !== 'pm-p' + n; });
    thumbs(); nav();
    var seg = box.querySelector('.pm-pau-bar .pm-seg'); var act = seg && seg.querySelector('[aria-selected="true"]');
    if (act && seg.scrollWidth > seg.clientWidth) seg.scrollTo({ left: act.offsetLeft - 16, behavior: RM ? 'auto' : 'smooth' });
    if (scroll) { var p = box.querySelector('#pm-p' + n); if (p) p.scrollIntoView({ block: 'start', behavior: RM ? 'auto' : 'smooth' }); }
  }
  function selectOpt(exn, k) {
    st.opt[exn] = k;
    var p = box.querySelector('#pm-p' + exn);
    [].forEach.call(p.querySelectorAll('[data-act="opt"]'), function (b) { var on = b.getAttribute('data-k') === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    [].forEach.call(p.querySelectorAll('.pm-opn'), function (d) { d.hidden = d.getAttribute('data-k') !== k; });
    thumbs(); refresh(st.key);
  }

  function onClick(e) {
    var b = e.target.closest('[data-act]'); if (!b || !box.contains(b)) return;
    var a = b.getAttribute('data-act');
    if (a === 'home') back();
    else if (a === 'years') { st.from = null; years(); }
    else if (a === 'back-t') { st.from = null; years(true); }
    else if (a === 'mode') { var m = b.getAttribute('data-m'); if (m !== st.mode) { st.mode = m; saveMode(m); fillMode(); } }
    else if (a === 'th') {
      var th = b.getAttribute('data-th'); if (th !== st.th) {
        st.th = th; var tabs = box.querySelectorAll('.pm-fl [data-act="th"]');
        [].forEach.call(tabs, function (x) { var on = x === b; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
        box.querySelector('#pm-tl-w').innerHTML = topicList(); thumbs();
        var sg = b.parentNode; if (sg.scrollWidth > sg.clientWidth) sg.scrollTo({ left: b.offsetLeft - 16, behavior: RM ? 'auto' : 'smooth' });
      }
    }
    else if (a === 'tp') {
      st.sy = window.pageYOffset; st.from = 't'; st.ex = +b.getAttribute('data-n'); var kk = b.getAttribute('data-k'); if (kk) st.opt[st.ex] = kk;
      exam(+b.getAttribute('data-yy'), +b.getAttribute('data-s'));
    }
    else if (a === 'year') seriesView(+b.getAttribute('data-yy'));
    else if (a === 'series') seriesView(+b.getAttribute('data-yy'));
    else if (a === 'open') { st.ex = 1; st.from = null; exam(+b.getAttribute('data-yy'), +b.getAttribute('data-s')); }
    else if (a === 'tab') selectEx(+b.getAttribute('data-n'), true);
    else if (a === 'prev') selectEx(st.ex - 1, true);
    else if (a === 'next') selectEx(st.ex + 1, true);
    else if (a === 'opt') selectOpt(+b.getAttribute('data-ex'), b.getAttribute('data-k'));
    else if (a === 'sol') {
      var s = b.closest('.pm-ap'), rv = s.querySelector('.pm-rv'), open = rv.getAttribute('data-open') !== 'true';
      rv.setAttribute('data-open', open); b.setAttribute('aria-expanded', open);
      b.querySelector('span').textContent = open ? t('Ocultar la solución', 'Amaga la solució') : t('Mostrar la solución', 'Mostra la solució');
    } else if (a === 'done') {
      var sec = b.closest('.pm-ap'), on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on); sec.classList.toggle('pm-done', on);
      setDone(st.key, sec.getAttribute('data-n'), on); refresh(st.key);
    }
  }
  function onKey(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var seg = e.target.closest && e.target.closest('.pm-seg'); if (!seg) return;
    var bs = [].slice.call(seg.querySelectorAll('[role="tab"]')), i = bs.indexOf(document.activeElement); if (i < 0) return;
    e.preventDefault();
    var n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length]; n.focus(); n.click();
  }

  window.PM = {
    mount: function (el, opts) {
      if (box !== el) { box = el; box.addEventListener('click', onClick); box.addEventListener('keydown', onKey); addEventListener('resize', thumbs); }
      back = opts.back; var ns = opts.s || 'm'; if (ns !== S) { S = ns; st = { ex: 1, opt: {} }; }
      var go = function () { years(); };
      (idxs[S + SFX] ? Promise.resolve(idx = idxs[S + SFX]) : get(dat(SFX)).then(function (j) { return idx = idxs[S + SFX] = j; })).then(go).catch(function () {
        box.innerHTML = head('<button type="button" class="pau-back" data-act="home">‹ ' + t('Todas las asignaturas', 'Totes les assignatures') + '</button><div class="pm-pau"><p class="pm-pau-note" role="alert">' + t('No se han podido cargar los exámenes.', 'No s’han pogut carregar els exàmens.') + '</p></div>');
      });
    },
    count: function (s) { return get('data/' + (s || 'm') + '-pau' + SFX).then(function (j) { return j.years.reduce(function (a, y) { return a + y.series.reduce(function (b, s) { return b + s.np; }, 0); }, 0); }).catch(function () { return 0; }); }
  };
})();
