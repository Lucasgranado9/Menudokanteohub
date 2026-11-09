/* Menudo Kanteo — Logros. Se calculan a partir de lo que ya guarda el portal (racha, problemas, repasos, tiempo…)
   y se recuerdan en «mk-ach» ({ id: fecha }). Muestra un aviso discreto cuando consigues uno nuevo. */
(function () {
  "use strict";
  var LS; try { LS = window.localStorage; LS.getItem("mk-x"); } catch (e) { return; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function g(k, d) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var IC = {
    flame: '<path d="M12 3c1 3.500 4.500 5 4.500 9.500a4.500 4.500 0 0 1-9 0c0-2 1-3.200 2-4.200.2 1.200.9 2 1.800 2.200C11 8.200 11.200 5.500 12 3z"/>',
    check: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.500 20h7"/>',
    repeat: '<path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 0 1-3 3H4"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.500V12l3 2"/>',
    star: '<path d="M12 3.500l2.600 5.300 5.800.8-4.200 4.100 1 5.800L12 16.800 6.800 19.500l1-5.800L3.600 9.600l5.800-.8L12 3.500z"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.500"/>',
    save: '<path d="M12 4v11"/><path d="M7.500 10.500L12 15l4.500-4.500"/><path d="M5 19h14"/>'
  };
  /* id, icono, color, [es, ca], [desc es, desc ca] */
  var DEF = [
    ["s3", "flame", "#ff9f0a", ["Chispa", "Espurna"], ["3 días seguidos", "3 dies seguits"]],
    ["s7", "flame", "#ff9500", ["Semana en llamas", "Setmana en flames"], ["7 días seguidos", "7 dies seguits"]],
    ["s14", "flame", "#ff6a00", ["Quincena", "Quinzena"], ["14 días seguidos", "14 dies seguits"]],
    ["s30", "flame", "#ff453a", ["Un mes entero", "Un mes sencer"], ["30 días seguidos", "30 dies seguits"]],
    ["s60", "flame", "#ff375f", ["Imparable", "Imparable"], ["60 días seguidos", "60 dies seguits"]],
    ["s100", "flame", "#bf5af2", ["Centenario", "Centenari"], ["100 días seguidos", "100 dies seguits"]],
    ["p1", "check", "#30d158", ["Primer paso", "Primer pas"], ["Marca tu primer problema", "Marca el teu primer problema"]],
    ["p10", "check", "#30d158", ["Calentando", "Escalfant"], ["10 problemas hechos", "10 problemes fets"]],
    ["p50", "check", "#28cd41", ["Con ritmo", "Amb ritme"], ["50 problemas hechos", "50 problemes fets"]],
    ["p100", "check", "#0a84ff", ["Cien problemas", "Cent problemes"], ["100 problemas hechos", "100 problemes fets"]],
    ["pall", "trophy", "#ffd60a", ["Colección completa", "Col·lecció completa"], ["Todos los problemas hechos", "Tots els problemes fets"]],
    ["tt", "trophy", "#5e5ce6", ["Tema dominado", "Tema dominat"], ["Completa un tema entero", "Completa un tema sencer"]],
    ["r1", "repeat", "#64d2ff", ["Repasador", "Repassador"], ["Haz tu primer repaso", "Fes el teu primer repàs"]],
    ["r10", "repeat", "#0a84ff", ["Memoria de hierro", "Memòria de ferro"], ["10 repasos hechos", "10 repassos fets"]],
    ["h1", "clock", "#30b0c7", ["Primera hora", "Primera hora"], ["1 hora de estudio", "1 hora d’estudi"]],
    ["h10", "clock", "#5e5ce6", ["Diez horas", "Deu hores"], ["10 horas de estudio", "10 hores d’estudi"]],
    ["f1", "star", "#ff9f0a", ["Marcapáginas", "Marcapàgines"], ["Guarda tu primer favorito", "Desa el teu primer favorit"]],
    ["pau", "cal", "#ff375f", ["Objetivo fijado", "Objectiu fixat"], ["Elige la fecha de tu PAU", "Tria la data de la teva PAU"]],
    ["bk", "save", "#8e8e93", ["A salvo", "A recer"], ["Exporta una copia de tus datos", "Exporta una còpia de les teves dades"]],
    /* exclusivos de la cuenta (6.º campo = 1): solo cuentan con la sesión iniciada */
    ["gw1", "target", "#ff375f", ["Objetivo cumplido", "Objectiu assolit"], ["Cumple tu objetivo semanal", "Assoleix el teu objectiu setmanal"], 1],
    ["gw4", "target", "#bf5af2", ["Mes constante", "Mes constant"], ["Cumple 4 semanas el objetivo", "Assoleix 4 setmanes l’objectiu"], 1],
    ["rs10", "repeat", "#30d158", ["Cazafallos", "Caçaerrors"], ["10 apartados repasados en «Repaso por fallos»", "10 apartats repassats a «Repàs per errors»"], 1],
    ["ex1", "clock", "#64d2ff", ["Primer simulacro", "Primer simulacre"], ["Termina un examen en Modo examen", "Acaba un examen al Mode examen"], 1],
    ["nt5", "trophy", "#30b0c7", ["Aprobado", "Aprovat"], ["Nota de 5 o más en un simulacro", "Nota de 5 o més en un simulacre"], 1],
    ["nt7", "trophy", "#0a84ff", ["Notable", "Notable"], ["Nota de 7 o más en un simulacro", "Nota de 7 o més en un simulacre"], 1],
    ["nt9", "trophy", "#ffd60a", ["Sobresaliente", "Excel·lent"], ["Nota de 9 o más en un simulacro", "Nota de 9 o més en un simulacre"], 1]
  ];

  function stats() {
    var sk = g("mk-streak", {}), done = g("mk-done", {}), rv = g("mk-rv", {}), tm = g("mk-time", {}), cat = (window.mkStats && window.mkStats.cat) || null;
    var nd = Object.keys(done).length, per = {}, sub = { m: 0, f: 0 };
    Object.keys(done).forEach(function (k) { var m = /^([mf])(\d+)\./.exec(k); if (m) { per[m[1] + m[2]] = (per[m[1] + m[2]] | 0) + 1; } });
    var topic = 0; if (cat) cat.forEach(function (c) { if ((per[c[0] + c[1]] | 0) >= c[2]) topic = 1; });
    var secs = 0; Object.keys(tm).forEach(function (d) { Object.keys(tm[d]).forEach(function (a) { secs += tm[d][a] | 0; }); });
    var rv0 = 0; Object.keys(rv).forEach(function (p) { rv0 += rv[p].n | 0; });
    var ex = g("mk-exm", []), exb = ex.reduce(function (m, x) { return Math.max(m, +x.n || 0); }, 0), gw = Object.keys(g("mk-goalh", {})).length, rs = g("mk-rvs", 0) | 0;
    return { gw: gw, rs: rs, ex: ex.length, exb: exb, streak: Math.max(sk.b | 0, sk.n | 0), nd: nd, total: cat ? cat.reduce(function (a, c) { return a + c[2]; }, 0) : 197, topic: topic, secs: secs, rv: rv0, fav: (g("mk-fav", [])).length, pau: !!LS.getItem("mk-pau"), bk: !!LS.getItem("mk-bk") };
  }
  function prog(id, S) {
    var m = /^([a-z]+)(\d*)$/.exec(id), k = m[1], n = +m[2];
    if (k === "s") return [S.streak, n]; if (k === "p") return [S.nd, n]; if (k === "pall") return [S.nd, S.total];
    if (k === "tt") return [S.topic, 1]; if (k === "r") return [S.rv, n]; if (k === "h") return [Math.floor(S.secs / 360) / 10, n];
    if (k === "gw") return [S.gw, n]; if (k === "rs") return [S.rs, n]; if (k === "ex") return [S.ex, n]; if (k === "nt") return [S.exb, n];
    if (k === "f") return [S.fav, 1]; if (k === "pau") return [S.pau ? 1 : 0, 1]; if (k === "bk") return [S.bk ? 1 : 0, 1];
    return [0, 1];
  }
  function all() {
    var S = stats(), got = g("mk-ach", {});
    var acc = false; try { acc = !!LS.getItem("mk-acct"); } catch (e) { }
    return DEF.map(function (d) { var p = prog(d[0], S); if (d[5] && !acc) p = [0, p[1]]; return { id: d[0], ic: d[1], c: d[2], n: t(d[3][0], d[3][1]), d: (d[5] && !acc) ? t("Solo con cuenta", "Només amb compte") : t(d[4][0], d[4][1]), v: Math.min(p[0], p[1]), max: p[1], ok: p[0] >= p[1], ts: got[d[0]] || 0 }; });
  }

  /* ---------- aviso de logro nuevo ---------- */
  var CSS = ".mka-t{position:fixed;left:50%;top:max(12px,env(safe-area-inset-top,0px));z-index:440;display:flex;align-items:center;gap:12px;max-width:min(380px,calc(100vw - 24px));padding:10px 18px 10px 10px;border-radius:22px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 84%,transparent);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 22px 50px -18px #00000080,0 1px 0 #ffffff40 inset;font:500 14px/1.3 var(--sans,system-ui,sans-serif);transform:translate(-50%,-140%) scale(.9);opacity:0;transition:transform .7s cubic-bezier(.2,1.25,.3,1),opacity .3s;pointer-events:none}.mka-t.on{transform:translate(-50%,0) scale(1);opacity:1;pointer-events:auto}" +
    ".mka-t b{display:block;font-weight:700;font-size:15px;letter-spacing:-.01em}.mka-t small{display:block;color:var(--muted,#6c6a6a);font-size:12.5px}.mka-t .mka-m{flex:none}" +
    ".mka-m{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 30% 25%,color-mix(in srgb,var(--c) 70%,#fff),var(--c) 62%,color-mix(in srgb,var(--c) 70%,#000));box-shadow:0 6px 14px -6px var(--c),0 1px 0 #ffffff80 inset,0 -2px 4px #00000030 inset}.mka-m svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px 1px #00000040)}" +
    ".mka-t.on .mka-m{animation:mkaPop .9s cubic-bezier(.2,1.4,.3,1) .1s both}@keyframes mkaPop{0%{transform:scale(.4) rotate(-20deg)}60%{transform:scale(1.18) rotate(6deg)}100%{transform:none}}" +
    "@media(prefers-reduced-motion:reduce){.mka-t{transition:opacity .2s;transform:translate(-50%,0)}.mka-t.on .mka-m{animation:none}}@media(prefers-reduced-transparency:reduce){.mka-t{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media print{.mka-t{display:none!important}}";
  function medal(a, locked) { return '<span class="mka-m" style="--c:' + a.c + (locked ? ";filter:grayscale(1);opacity:.45" : "") + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[a.ic] + "</svg></span>"; }
  function css() { if (document.getElementById("mka-css")) return; var s = document.createElement("style"); s.id = "mka-css"; s.textContent = CSS; document.head.appendChild(s); }
  var tq = [], busy = false;
  function toast(a) { tq.push(a); next(); }
  function next() {
    if (busy || !tq.length) return; busy = true; css(); var a = tq.shift();
    var d = document.createElement("div"); d.className = "mka-t"; d.setAttribute("role", "status"); d.setAttribute("aria-live", "polite");
    d.innerHTML = medal(a) + "<div><small>" + t("Nuevo logro", "Nou assoliment") + "</small><b>" + esc(a.n) + "</b><small>" + esc(a.d) + "</small></div>";
    document.body.appendChild(d); d.getBoundingClientRect(); d.classList.add("on"); try { window.mkFx && window.mkFx.fb("done"); } catch (e) {}
    setTimeout(function () { d.classList.remove("on"); setTimeout(function () { d.remove(); busy = false; next(); }, 600); }, 4800);
  }
  function check(quiet) {
    var got = g("mk-ach", null), first = got === null; got = got || {}; var ch = false;
    all().forEach(function (a) { if (a.ok && !got[a.id]) { got[a.id] = Date.now(); ch = true; if (!first && !quiet) toast(a); } });
    if (ch || first) try { LS.setItem("mk-ach", JSON.stringify(got)); } catch (e) {}
  }
  var tmr = 0; function soon() { clearTimeout(tmr); tmr = setTimeout(function () { check(); }, 500); }

  /* ---------- sección para el panel de racha ---------- */
  function sectionHTML() {
    var L = all(), n = L.filter(function (a) { return a.ok; }).length;
    return '<div class="mka-hd"><strong>' + t("Logros", "Assoliments") + "</strong><span>" + n + "/" + L.length + '</span></div><ul class="mka-gr">' + L.map(function (a) {
      var pr = a.ok ? "" : ' <span class="mka-p">' + (a.max > 1 ? (a.max < 10 && a.v % 1 ? a.v : Math.floor(a.v)) + "/" + a.max : "") + "</span>";
      return '<li class="' + (a.ok ? "ok" : "lk") + '" aria-label="' + esc(a.n + ". " + a.d + ". " + (a.ok ? t("Conseguido", "Aconseguit") : t("Por conseguir", "Per aconseguir"))) + '">' + medal(a, !a.ok) + "<b>" + esc(a.n) + "</b><small>" + esc(a.d) + pr + "</small></li>";
    }).join("") + "</ul>";
  }
  var SCSS = ".mka-hd{display:flex;justify-content:space-between;align-items:baseline;padding:2px 2px 0}.mka-hd strong{font-size:15px;letter-spacing:-.01em}.mka-hd span{font-size:13px;color:var(--muted,#6c6a6a);font-variant-numeric:tabular-nums}" +
    ".mka-gr{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px 8px}.mka-gr li{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:6px 2px;min-width:0}.mka-gr .mka-m{margin-bottom:2px}.mka-gr b{font-size:12.5px;font-weight:650;line-height:1.2;letter-spacing:-.005em}.mka-gr small{font-size:11.5px;line-height:1.25;color:var(--muted,#6c6a6a)}.mka-gr .lk b{color:var(--muted,#6c6a6a)}.mka-p{display:block;font-variant-numeric:tabular-nums;font-weight:600}" +
    "@media(max-width:360px){.mka-gr{grid-template-columns:repeat(2,minmax(0,1fr))}}";
  function mount(box) {
    if (!box) return; css(); if (!document.getElementById("mka-css2")) { var s = document.createElement("style"); s.id = "mka-css2"; s.textContent = SCSS; document.head.appendChild(s); }
    box.innerHTML = sectionHTML();
  }

  window.mkAch = { all: all, check: check, mount: mount, count: function () { var L = all(); return [L.filter(function (a) { return a.ok; }).length, L.length]; } };
  function boot() {
    setTimeout(function () { check(); }, 1800);
    addEventListener("click", soon, true); addEventListener("storage", soon); document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") soon(); });
    setInterval(function () { if (document.visibilityState === "visible") check(); }, 20000);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
