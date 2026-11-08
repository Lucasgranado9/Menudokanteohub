/* Barra inferior del móvil · Menudo Kanteo
   Cuatro apartados: Materias · Problemas · Favoritos · Más.
   «Materias» despliega las tres asignaturas; «Más» abre una hoja con el museo interactivo, herramientas y ajustes.
   Solo en pantallas estrechas (≤640 px). Animación de muelle, interrumpible; respeta reducir movimiento y transparencia. */
(function () {
  "use strict";
  var mq = matchMedia("(max-width: 640px)"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  function es() { return window.MKL ? !!window.MKL.es : root.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function base() { return location.pathname.split("/").pop() || "index.html"; }
  function fb(n) { try { window.mkFx && window.mkFx.fb(n); } catch (e) {} }
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + "</svg>"; }
  var IC = {
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
    mat: svg('<path d="M4 5.5C4 4.7 4.7 4 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>'),
    pro: svg('<path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20"/><path d="M3.8 6.4l1.2 1.2 2.2-2.4M3.8 11.9l1.2 1.2 2.2-2.4M3.8 17.4l1.2 1.2 2.2-2.4"/>'),
    pau: svg('<path d="M7 3.5h7.5L19 8v12a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 7 20z"/><path d="M14.5 3.5V8H19M9.8 13.2l1.5 1.5 3-3.2M9.8 17.6h4.4"/>'),
    fav: svg('<path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>'),
    mas: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/></svg>',
    museu: svg('<path d="M3 9.5L12 4l9 5.5M5.5 10v7.5M10 10v7.5M14 10v7.5M18.5 10v7.5M3 20h18"/>'),
    sol: svg('<circle cx="12" cy="12" r="2.8"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-25 12 12)"/>'),
    tp: svg('<rect x="3.5" y="4" width="5" height="5" rx="1"/><rect x="9.5" y="4" width="5" height="5" rx="1"/><rect x="15.5" y="4" width="5" height="5" rx="1"/><rect x="3.5" y="10" width="5" height="5" rx="1"/><rect x="9.5" y="10" width="5" height="5" rx="1"/><rect x="3.5" y="16" width="5" height="4" rx="1"/>'),
    cel: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/>'),
    fou: svg('<path d="M2.5 12c1.8-7 3.7-7 5.5 0s3.7 7 5.5 0 3.7-7 5.5 0"/>'),
    calc: svg('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h1.5M12 12h1.5M15.5 12h0M8.5 16h1.5M12 16h1.5M15.5 16h0"/>'),
    srch: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.8-3.8"/>'),
    rev: svg('<rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    bell: svg('<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    shr: svg('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2.5v2.5H14zM19.5 14v2M14 19.5h2M18 18h2.5v2.5H18z"/>'),
    help: svg('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.8M12 17.3h0"/>'),
    set: svg('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
    glo: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18-3-3.3-3-14.7 0-18"/>')
  };
  var COURSES = [
    { h: "mates.html", c: "#c8102e", t: ["Matemáticas II", "Matemàtiques II"], s: ["Análisis, álgebra y geometría", "Anàlisi, àlgebra i geometria"], k: "∑" },
    { h: "fisica.html", c: "#6a1fc2", t: ["Física II", "Física II"], s: ["Campos, ondas y física moderna", "Camps, ones i física moderna"], k: "ψ" },
    { h: "filosofia.html", c: "#a67c00", t: ["Historia de la Filosofía", "Història de la Filosofia"], s: ["De Platón a Nussbaum", "De Plató a Nussbaum"], k: "φ" }
  ];
  var CUR = { "mates.html": "mat", "fisica.html": "mat", "filosofia.html": "mat", "problemes.html": "pro", "index.html": "" };
  function curKey() { var b = base(); return b in CUR ? CUR[b] : "mas"; }

  var CSS = ".mkb{display:none}" +
    "@media(max-width:640px){html.mkb-on .mk-tabs{display:none!important}html.mkb-on .mkb{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));position:fixed;left:50%;bottom:calc(8px + env(safe-area-inset-bottom,0px));width:min(calc(100vw - 20px),440px);transform:translateX(-50%);z-index:55;padding:5px;border-radius:28px;background:color-mix(in srgb,var(--bg,#fff) 82%,transparent);-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 11%,transparent);box-shadow:0 12px 32px -10px rgba(0,0,0,.3),0 1px 0 rgba(255,255,255,.5) inset}}" +
    ".mkb-i{position:absolute;z-index:0;top:5px;bottom:5px;left:0;border-radius:23px;background:color-mix(in srgb,var(--fg,#111) 9%,transparent);width:var(--w,25%);transform:translateX(var(--x,0));opacity:0;transition:transform .55s cubic-bezier(.2,1.25,.3,1),width .4s cubic-bezier(.2,1.1,.3,1),opacity .25s}.mkb-i.on{opacity:1}" +
    ".mkb-t{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;min-height:52px;padding:8px 2px 6px;border:0;border-radius:23px;background:none;color:var(--muted,#6c6a6a);font:600 10.5px/1.15 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif;letter-spacing:.005em;text-decoration:none;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:color .25s,transform .4s cubic-bezier(.2,1.3,.3,1)}" +
    ".mkb-t svg{width:23px;height:23px}.mkb-t span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkb-t:active{transform:scale(.9);transition-duration:.08s}.mkb-t[aria-current=true]{color:var(--acc-ink,var(--fg,#111))}.mkb-t:focus-visible{outline:3px solid var(--fg,#111);outline-offset:-3px}" +
    ".mkb-pop,.mkb-sh,.mkb-ov{display:none}" +
    ".mkb-ov{position:fixed;inset:0;z-index:2147482040;background:rgba(0,0,0,.34);opacity:0;transition:opacity .3s}.mkb-ov.on{opacity:1}.mkb-ov.o{display:block}" +
    ".mkb-pop.o{display:block;position:fixed;z-index:2147482050;width:min(320px,calc(100vw - 24px));padding:6px;border-radius:24px;background:color-mix(in srgb,var(--bg,#fff) 86%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 11%,transparent);box-shadow:0 22px 60px -12px rgba(0,0,0,.4);color:var(--fg,#111);transform-origin:var(--ox,50%) 100%;transform:scale(.55) translateY(16px);opacity:0;transition:transform .5s cubic-bezier(.2,1.2,.3,1),opacity .2s}.mkb-pop.on{transform:none;opacity:1}" +
    ".mkb-pop.on .mkb-r{animation:mkb-in .42s cubic-bezier(.2,1.1,.3,1) both;animation-delay:calc(var(--i,0)*45ms + 60ms)}@keyframes mkb-in{from{opacity:0;transform:translateY(8px)}}.mkb-r{display:flex;align-items:center;gap:12px;min-height:56px;padding:8px 10px;border-radius:18px;border:0;background:none;width:100%;text-align:left;color:inherit;text-decoration:none;font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:background .2s,transform .3s cubic-bezier(.2,1.3,.3,1)}.mkb-r:active{transform:scale(.97);background:color-mix(in srgb,var(--fg,#111) 8%,transparent)}.mkb-r:focus-visible{outline:3px solid var(--fg,#111);outline-offset:-3px}" +
    ".mkb-r i{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:var(--c,#0a60d6);font:700 18px/1 Georgia,'Times New Roman',serif;font-style:normal}.mkb-r i svg{width:21px;height:21px}.mkb-r span{display:flex;flex-direction:column;min-width:0;flex:1}.mkb-r b{font:600 15.5px/1.25 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif;letter-spacing:-.012em}.mkb-r small{font:400 13px/1.3 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif;color:var(--muted,#6c6a6a)}.mkb-r em{font-style:normal;color:var(--muted,#6c6a6a);font-size:20px;line-height:1}.mkb-r[aria-current=page] em{color:var(--acc-ink,var(--fg,#111));font-size:0}.mkb-r[aria-current=page] em:before{content:'✓';font-size:17px;font-weight:700}.mkb-r[aria-current=page]{background:color-mix(in srgb,var(--fg,#111) 7%,transparent)}" +
    ".mkb-sh.o{display:flex;flex-direction:column;position:fixed;left:0;right:0;bottom:0;z-index:2147482050;max-height:min(86dvh,720px);margin-inline:auto;width:min(100%,560px);border-radius:30px 30px 0 0;background:color-mix(in srgb,var(--bg,#fff) 94%,transparent);-webkit-backdrop-filter:blur(34px) saturate(180%);backdrop-filter:blur(34px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 10%,transparent);border-bottom:0;box-shadow:0 -20px 60px -14px rgba(0,0,0,.4);color:var(--fg,#111);transform:translateY(calc(100% + var(--dy,0px)));transition:transform .55s cubic-bezier(.2,1.05,.3,1);will-change:transform}.mkb-sh.on{transform:translateY(var(--dy,0px))}.mkb-sh.dr{transition:none}" +
    ".mkb-gr{flex:none;touch-action:none;cursor:grab;padding:8px 20px 4px}.mkb-gr:before{content:'';display:block;width:38px;height:5px;border-radius:3px;margin:0 auto 10px;background:color-mix(in srgb,var(--fg,#111) 22%,transparent)}.mkb-gr h2{margin:0;font:700 22px/1.2 -apple-system,BlinkMacSystemFont,'SF Pro Display',var(--sans,system-ui),sans-serif;letter-spacing:-.022em}" +
    ".mkb-bd{overflow:auto;overscroll-behavior:contain;padding:2px 10px calc(18px + env(safe-area-inset-bottom,0px));-webkit-overflow-scrolling:touch}.mkb-bd h3{margin:14px 10px 4px;font:600 12.5px/1.2 -apple-system,BlinkMacSystemFont,var(--sans,system-ui),sans-serif;letter-spacing:.02em;text-transform:none;color:var(--muted,#6c6a6a)}.mkb-gp{border-radius:20px;background:color-mix(in srgb,var(--fg,#111) 5%,transparent);padding:3px}" +
    "html.mk-read .mkb,html.mk-fso .mkb,html.mk-fc .mkb{display:none!important}@media print{.mkb,.mkb-pop,.mkb-sh,.mkb-ov{display:none!important}}" +
    "@media(prefers-reduced-motion:reduce){.mkb-i,.mkb-t,.mkb-r{transition:none}.mkb-pop.on .mkb-r{animation:none}.mkb-pop.o{transform:none;transition:opacity .15s}.mkb-sh.o{transition:opacity .2s;transform:none;opacity:0}.mkb-sh.on{opacity:1}}" +
    "@media(prefers-reduced-transparency:reduce){html.mkb-on .mkb,.mkb-pop.o,.mkb-sh.o{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){html.mkb-on .mkb,.mkb-pop.o,.mkb-sh.o{background:var(--bg,#fff);border-color:currentColor}.mkb-t{color:var(--fg,#111)}}";

  var bar, ind, tabs = {}, ov, pop, sh, openKey = "", last = null, sheetBody;
  function setInd(key) {
    var tb = key && tabs[key]; if (!tb) { ind.classList.remove("on"); return; }
    ind.style.setProperty("--x", tb.offsetLeft + "px"); ind.style.setProperty("--w", tb.offsetWidth + "px"); ind.classList.add("on");
  }
  function sync() {
    var k = openKey || curKey();
    Object.keys(tabs).forEach(function (x) { if (x === k && k) tabs[x].setAttribute("aria-current", "true"); else tabs[x].removeAttribute("aria-current"); });
    setInd(k);
  }
  function closeAll(restore) {
    var was = openKey; openKey = "";
    [pop, sh, ov].forEach(function (n) { n.classList.remove("on"); });
    setTimeout(function () { if (!openKey) [pop, sh, ov].forEach(function (n) { n.classList.remove("o"); }); }, reduce ? 120 : 420);
    Object.keys(tabs).forEach(function (x) { tabs[x].setAttribute("aria-expanded", "false"); });
    sync(); if (restore !== false && was && last && last.focus) try { last.focus({ preventScroll: true }); } catch (e) {}
  }
  function showOv() { ov.classList.add("o"); requestAnimationFrame(function () { ov.classList.add("on"); }); }

  function courseRows() {
    return COURSES.map(function (c, i) {
      var cur = base() === c.h;
      return '<a class="mkb-r" role="menuitem" href="' + c.h + '" style="--i:' + i + '"' + (cur ? ' aria-current="page"' : "") + '><i style="--c:' + c.c + '" aria-hidden="true">' + c.k + "</i><span><b>" + t(c.t[0], c.t[1]) + "</b><small>" + t(c.s[0], c.s[1]) + '</small></span><em aria-hidden="true">›</em></a>';
    }).join("");
  }
  function probRows() {
    var onP = base() === "problemes.html", pau = onP && location.hash === "#pau";
    function r(h, ic, c, ti, su, cur, i) { return '<a class="mkb-r" role="menuitem" href="' + h + '" style="--i:' + i + '"' + (cur ? ' aria-current="page"' : "") + '><i style="--c:' + c + '" aria-hidden="true">' + ic + "</i><span><b>" + ti + "</b><small>" + su + '</small></span><em aria-hidden="true">›</em></a>'; }
    return r("problemes.html", IC.pro, "#0a84ff", t("Colección de problemas", "Col·lecció de problemes"), t("Por tema, con solución", "Per tema, amb solució"), onP && !pau, 0) +
      r("problemes.html#pau", IC.pau, "#ff375f", t("Problemas PAU", "Problemes PAU"), t("Exámenes oficiales por año y serie", "Exàmens oficials per any i sèrie"), pau, 1);
  }
  function openPop(key) {
    key = key || "mat"; pop.setAttribute("aria-label", key === "pro" ? t("Problemas", "Problemes") : t("Materias", "Matèries"));
    pop.innerHTML = key === "pro" ? probRows() : courseRows(); var b = tabs[key], r = b.getBoundingClientRect(), br = bar.getBoundingClientRect();
    pop.classList.add("o"); var w = pop.offsetWidth, x = Math.max(12, Math.min(innerWidth - 12 - w, r.left + r.width / 2 - w / 2));
    pop.style.left = x + "px"; pop.style.bottom = (innerHeight - br.top + 10) + "px"; pop.style.setProperty("--ox", (r.left + r.width / 2 - x) + "px");
    openKey = key; b.setAttribute("aria-expanded", "true"); showOv(); sync();
    requestAnimationFrame(function () { pop.classList.add("on"); }); var f = pop.querySelector("[aria-current]") || pop.querySelector("a"); f && f.focus({ preventScroll: true });
  }
  function row(ic, c, title, sub, attrs) { return '<a class="mkb-r" ' + attrs + '><i style="--c:' + c + '" aria-hidden="true">' + ic + "</i><span><b>" + title + "</b>" + (sub ? "<small>" + sub + "</small>" : "") + '</span><em aria-hidden="true">›</em></a>'; }
  function sheetHTML() {
    var b = base(), cur = function (f) { return b === f ? ' aria-current="page"' : ""; };
    function lk(f, ic, c, ti, su) { return row(ic, c, ti, su, 'href="' + f + '"' + cur(f)); }
    function ac(a, ic, c, ti, su) { return row(ic, c, ti, su, 'href="#" data-a="' + a + '" role="button"'); }
    return "<h3>" + t("Museo interactivo", "Museu interactiu") + '</h3><div class="mkb-gp">' +
      lk("museu.html", IC.museu, "#5e5ce6", t("Todo el museo", "Tot el museu"), t("Laboratorios y simulaciones", "Laboratoris i simulacions")) +
      lk("sistema-solar.html", IC.sol, "#ff9f0a", t("Sistema solar", "Sistema solar"), t("Órbitas y planetas en 3D", "Òrbites i planetes en 3D")) +
      lk("taula-periodica.html", IC.tp, "#30b0c7", t("Tabla periódica", "Taula periòdica"), t("Los 118 elementos", "Els 118 elements")) +
      lk("celules.html", IC.cel, "#30d158", t("Células", "Cèl·lules"), t("Por dentro, en 3D", "Per dins, en 3D")) +
      lk("fourier.html", IC.fou, "#bf5af2", t("Fourier", "Fourier"), t("Ondas y series", "Ones i sèries")) + "</div>" +
      "<h3>" + t("Herramientas", "Eines") + '</h3><div class="mkb-gp">' +
      lk("calculadora.html", IC.calc, "#ff375f", t("Calculadora de nota", "Calculadora de nota"), t("Tu nota de acceso a la universidad", "La teva nota d’accés a la universitat")) +
      ac("search", IC.srch, "#0a84ff", t("Buscar y acciones", "Cerca i accions"), t("Temas, favoritos y atajos", "Temes, favorits i dreceres")) + "</div>" +
      "<h3>" + t("El portal", "El portal") + '</h3><div class="mkb-gp">' +
      lk("revista.html", IC.rev, "#ff375f", t("Revista", "Revista"), t("Artículos y curiosidades", "Articles i curiositats")) +
      lk("novetats.html", IC.bell, "#0a84ff", t("Novedades y avisos", "Novetats i avisos"), t("Lo último del portal", "Lo darrer del portal")) +
      ac("stats", IC.chart, "#30d158", t("Estadísticas", "Estadístiques"), t("Progreso, repaso y copia de datos", "Progrés, repàs i còpia de dades")) +
      ac("share", IC.shr, "#ff375f", t("Compartir con QR", "Comparteix amb QR"), t("Un código para abrir el portal", "Un codi per obrir el portal")) +
      ac("help", IC.help, "#30b0c7", t("Ayuda y soporte", "Ajuda i suport"), t("Preguntas, el proyecto y contacto", "Preguntes, el projecte i contacte")) + "</div>" +
      "<h3>" + t("Ajustes", "Ajustos") + '</h3><div class="mkb-gp">' +
      ac("settings", IC.set, "#8e8e93", t("Configuración", "Configuració"), t("Tema, texto, racha y sonidos", "Tema, text, ratxa i sons")) +
      ac("lang", IC.glo, "#5e5ce6", t("Idioma", "Idioma"), es() ? "Castellano → Català" : "Català → Castellano") + "</div>";
  }
  function openSheet() {
    sheetBody.innerHTML = sheetHTML(); sh.style.setProperty("--dy", "0px"); sh.classList.add("o"); sh.classList.remove("dr");
    openKey = "mas"; tabs.mas.setAttribute("aria-expanded", "true"); showOv(); sync();
    requestAnimationFrame(function () { requestAnimationFrame(function () { sh.classList.add("on"); }); });
    sheetBody.scrollTop = 0; var f = sh.querySelector(".mkb-r"); f && f.focus({ preventScroll: true });
  }
  function loadShare() {
    if (window.mkShare) return window.mkShare.open();
    var sc = document.createElement("script"); sc.src = "share.js"; sc.onload = function () { window.mkShare && window.mkShare.open(); }; document.head.appendChild(sc);
  }
  window.mkLoadShare = loadShare;
  function act(a) {
    closeAll(false);
    setTimeout(function () {
      if (a === "search") { window.mkCmd ? window.mkCmd.open("") : window.mkSearch && window.mkSearch.open(""); }
      else if (a === "stats") { window.mkStats && window.mkStats.open(); }
      else if (a === "share") { loadShare(); }
      else if (a === "help") { window.mkFav && window.mkFav.open("help"); }
      else if (a === "settings") { var g = document.querySelector(".mk-gear"); g && g.click(); }
      else if (a === "lang") { window.MKL && window.MKL.set(es() ? "ca" : "es"); }
    }, reduce ? 80 : 260);
  }
  function drag() {
    var g = sh.querySelector(".mkb-gr"), y0 = 0, t0 = 0, dy = 0, vy = 0, on = false, ly = 0, lt = 0;
    g.addEventListener("pointerdown", function (e) { on = true; y0 = ly = e.clientY; t0 = lt = performance.now(); dy = 0; vy = 0; sh.classList.add("dr"); g.setPointerCapture(e.pointerId); });
    g.addEventListener("pointermove", function (e) {
      if (!on) return; var d = e.clientY - y0, now = performance.now();
      dy = d < 0 ? -Math.sqrt(-d) * 2 : d; /* resistencia hacia arriba */
      if (now - lt > 0) vy = (e.clientY - ly) / (now - lt); ly = e.clientY; lt = now; sh.style.setProperty("--dy", dy + "px");
    });
    function end() {
      if (!on) return; on = false; sh.classList.remove("dr");
      var proj = dy + vy * 220; /* proyección con la velocidad del dedo */
      if (proj > sh.offsetHeight * .35 || vy > .6) { closeAll(); setTimeout(function () { sh.style.setProperty("--dy", "0px"); }, 500); } else sh.style.setProperty("--dy", "0px");
    }
    g.addEventListener("pointerup", end); g.addEventListener("pointercancel", end);
  }
  function build() {
    if (document.querySelector(".mkb")) return;
    var st = el("style"); st.textContent = CSS; document.head.appendChild(st);
    bar = el("nav", "mkb"); bar.setAttribute("aria-label", t("Navegación principal", "Navegació principal"));
    ind = el("i", "mkb-i"); ind.setAttribute("aria-hidden", "true"); bar.appendChild(ind);
    var defs = [["mat", "button", t("Materias", "Matèries")], ["pro", "button", t("Problemas", "Problemes")], ["fav", "button", t("Favoritos", "Favorits")], ["mas", "button", t("Más", "Més")]];
    defs.forEach(function (d) {
      var n = el(d[1], "mkb-t", IC[d[0]] + "<span>" + d[2] + "</span>"); if (d[1] === "button") n.type = "button"; else n.href = "problemes.html";
      if (d[0] === "mat" || d[0] === "pro") { n.setAttribute("aria-haspopup", "menu"); n.setAttribute("aria-expanded", "false"); }
      if (d[0] === "mas") { n.setAttribute("aria-haspopup", "dialog"); n.setAttribute("aria-expanded", "false"); }
      tabs[d[0]] = n; bar.appendChild(n);
    });
    ov = el("div", "mkb-ov"); pop = el("div", "mkb-pop"); pop.setAttribute("role", "menu"); pop.setAttribute("aria-label", t("Materias", "Matèries"));
    sh = el("div", "mkb-sh"); sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true"); sh.setAttribute("aria-label", t("Más", "Més"));
    sh.innerHTML = '<div class="mkb-gr"><h2>' + t("Más", "Més") + '</h2></div><div class="mkb-bd"></div>'; sheetBody = sh.querySelector(".mkb-bd");
    document.body.appendChild(bar); document.body.appendChild(ov); document.body.appendChild(pop); document.body.appendChild(sh);
    root.classList.add("mkb-on", "mk-hastabs");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".mkb-t"); if (!b) return; last = b; fb("tap");
      if (b === tabs.mat || b === tabs.pro) { e.preventDefault(); var k = b === tabs.pro ? "pro" : "mat"; openKey === k ? closeAll() : (closeAll(false), openPop(k)); }
      else if (b === tabs.mas) { e.preventDefault(); openKey === "mas" ? closeAll() : (closeAll(false), openSheet()); }
      else if (b === tabs.fav) { e.preventDefault(); closeAll(false); window.mkFav && window.mkFav.open("fav"); tabs.fav.setAttribute("aria-current", "true"); setInd("fav"); var n = 0, iv = setInterval(function () { if (!document.querySelector(".mkp-ov.on") || ++n > 600) { clearInterval(iv); sync(); } }, 250); }
      else closeAll(false);
    });
    ov.addEventListener("click", function () { closeAll(); });
    sh.addEventListener("click", function (e) { var a = e.target.closest("[data-a]"); if (a) { e.preventDefault(); act(a.getAttribute("data-a")); } else if (e.target.closest("a[href]")) closeAll(false); });
    pop.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]"); if (!a) return;
      var h = a.getAttribute("href");
      if (base() === "problemes.html" && /^problemes\.html(#pau)?$/.test(h)) { /* misma página: cambia de vista sin recargar */
        e.preventDefault(); try { history.replaceState(null, "", h === "problemes.html" ? location.pathname + location.search : "#pau"); window.dispatchEvent(new HashChangeEvent("hashchange")); } catch (x) { location.href = h; }
        closeAll(false); try { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); } catch (x2) {} return;
      }
      closeAll(false);
    });
    pop.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return; e.preventDefault();
      var l = [].slice.call(pop.querySelectorAll("a")), i = l.indexOf(document.activeElement); i = e.key === "ArrowDown" ? (i + 1) % l.length : (i - 1 + l.length) % l.length; l[i].focus();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || openKey !== "mas") return;
      var f = [].slice.call(sh.querySelectorAll("a[href],button:not([disabled])")).filter(function (n) { return n.getClientRects().length; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === a || !sh.contains(document.activeElement))) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && (document.activeElement === z || !sh.contains(document.activeElement))) { e.preventDefault(); a.focus(); }
    }, true);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && openKey) { e.stopPropagation(); closeAll(); } }, true);
    drag(); addEventListener("resize", function () { if (openKey) closeAll(false); sync(); });
    window.mkTabs = { open: function (k) { k === "mas" ? openSheet() : (k === "mat" || k === "pro") && openPop(k); }, close: closeAll };
    sync(); setTimeout(sync, 400); if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  }
  function boot() { build(); }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
