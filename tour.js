/* Recorrido de primera visita · Menudo Kanteo
   Cuatro paradas con foco sobre los controles clave (buscar, asistente, compartir, ajustes). Se muestra una sola vez
   (localStorage «mk-tour»), se puede saltar con Esc y se relanza desde Ajustes o con ?tour. */
(function () {
  "use strict";
  var LS = null; try { LS = window.localStorage; LS.getItem("mk-tour"); } catch (e) {}
  var q = /[?&]tour\b/.test(location.search), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  var ST = [
    { s: ".mk-sb", h: ["Busca lo que quieras", "Cerca el que vulguis"], p: ["Un tema, un problema PAU, un año o una fórmula: salta directo al apartado.", "Un tema, un problema PAU, un any o una fórmula: salta directe a l’apartat."] },
    { s: ".ay-fab", h: ["Tu asistente", "El teu assistent"], p: ["Pregúntale dudas, pídele que calcule o que te recomiende qué estudiar hoy.", "Pregunta-li dubtes, demana-li que calculi o que et recomani què estudiar avui."] },
    { s: ".mk-qr", h: ["Compártelo", "Comparteix-ho"], p: ["Un QR y un enlace para pasárselo a tus compañeros en un toque.", "Un QR i un enllaç per passar-lo als companys d’un toc."] },
    { s: ".mk-gear", h: ["Ajustes y sin conexión", "Ajustos i sense connexió"], p: ["Instala la app, descarga las asignaturas para estudiar sin internet y mira la presentación.", "Instal·la l’app, descarrega les assignatures per estudiar sense internet i mira la presentació."] }
  ];
  var CSS = ".mkt-rg{position:fixed;z-index:430;border-radius:16px;pointer-events:none;box-shadow:0 0 0 9999px rgba(8,6,14,.55),0 0 0 2px rgba(255,255,255,.9);transition:left .45s cubic-bezier(.2,1,.3,1),top .45s cubic-bezier(.2,1,.3,1),width .45s cubic-bezier(.2,1,.3,1),height .45s cubic-bezier(.2,1,.3,1),opacity .3s}" +
    ".mkt-cd{position:fixed;z-index:431;width:min(320px,calc(100vw - 24px));padding:18px 18px 14px;border-radius:24px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 90%,transparent);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 24px 60px -16px #000a;font-family:system-ui,-apple-system,'IBM Plex Sans',sans-serif;opacity:0;transform:translateY(8px) scale(.97);transition:opacity .3s,transform .5s cubic-bezier(.2,1.1,.3,1),left .45s cubic-bezier(.2,1,.3,1),top .45s cubic-bezier(.2,1,.3,1)}" +
    ".mkt-cd.on{opacity:1;transform:none}.mkt-cd b{display:block;font-size:17px;letter-spacing:-.015em;margin-bottom:5px}.mkt-cd p{margin:0 0 14px;font-size:14px;line-height:1.45;color:var(--muted,#6c6a6a)}" +
    ".mkt-ft{display:flex;align-items:center;gap:8px}.mkt-dt{display:flex;gap:5px;flex:1}.mkt-dt i{width:6px;height:6px;border-radius:50%;background:color-mix(in srgb,var(--fg,#111) 20%,transparent);transition:background .3s,width .3s}.mkt-dt i.on{width:18px;border-radius:3px;background:var(--red,#c8102e)}" +
    ".mkt-cd button{appearance:none;border:0;font:600 14px system-ui,-apple-system,sans-serif;cursor:pointer;border-radius:999px;min-height:40px;padding:0 16px}.mkt-nx{background:var(--fg,#111);color:var(--bg,#fff)}.mkt-sk{background:none;color:var(--muted,#6c6a6a)}.mkt-cd button:focus-visible{outline:2px solid var(--red,#c8102e);outline-offset:2px}" +
    "@media(prefers-reduced-motion:reduce){.mkt-rg,.mkt-cd{transition:opacity .2s}.mkt-cd{transform:none}}@media(prefers-reduced-transparency:reduce){.mkt-cd{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}";
  var rg, cd, i = 0, steps = [], prevFocus = null, open = false;
  function visible(e) { if (!e) return false; var r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < innerHeight; }
  function done() {
    open = false; try { LS && LS.setItem("mk-tour", "1"); } catch (e) {}
    removeEventListener("keydown", key, true); removeEventListener("resize", place);
    [rg, cd].forEach(function (n) { if (n) { n.style.opacity = 0; setTimeout(function () { n.remove(); }, 320); } });
    prevFocus && prevFocus.focus && prevFocus.focus();
  }
  function key(e) { if (e.key === "Escape") { e.preventDefault(); done(); } }
  function place() {
    var s = steps[i], el = document.querySelector(s.s); if (!el) return;
    var r = el.getBoundingClientRect(), pad = 6;
    rg.style.left = r.left - pad + "px"; rg.style.top = r.top - pad + "px"; rg.style.width = r.width + pad * 2 + "px"; rg.style.height = r.height + pad * 2 + "px";
    var w = Math.min(320, innerWidth - 24), h = cd.offsetHeight || 150, x = Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2));
    var y = r.bottom + 16; if (y + h > innerHeight - 12) y = Math.max(12, r.top - h - 16);
    cd.style.left = x + "px"; cd.style.top = y + "px";
  }
  function show() {
    var s = steps[i], last = i === steps.length - 1;
    cd.classList.remove("on");
    setTimeout(function () {
      cd.innerHTML = "<b>" + t(s.h[0], s.h[1]) + "</b><p>" + t(s.p[0], s.p[1]) + '</p><div class="mkt-ft"><span class="mkt-dt" aria-hidden="true">' +
        steps.map(function (_, k) { return "<i" + (k === i ? ' class="on"' : "") + "></i>"; }).join("") + '</span><button type="button" class="mkt-sk">' + t("Saltar", "Saltar") + '</button><button type="button" class="mkt-nx">' + (last ? t("Entendido", "Entesos") : t("Siguiente", "Següent")) + "</button></div>";
      cd.querySelector(".mkt-sk").style.display = last ? "none" : "";
      cd.querySelector(".mkt-sk").onclick = done;
      var nx = cd.querySelector(".mkt-nx"); nx.onclick = function () { if (last) done(); else { i++; show(); } };
      place(); cd.classList.add("on"); nx.focus({ preventScroll: true });
    }, reduce || i === 0 ? 0 : 160);
    var el = document.querySelector(s.s); if (el) { rg.style.opacity = 1; place(); }
  }
  function start() {
    if (open) return; steps = ST.filter(function (s) { return visible(document.querySelector(s.s)); });
    if (steps.length < 2) return;
    open = true; i = 0; prevFocus = document.activeElement;
    var st = document.createElement("style"); st.textContent = CSS; st.id = "mkt-css"; if (!document.getElementById("mkt-css")) document.head.appendChild(st);
    rg = document.createElement("div"); rg.className = "mkt-rg"; rg.setAttribute("aria-hidden", "true"); rg.style.opacity = 0;
    cd = document.createElement("div"); cd.className = "mkt-cd"; cd.setAttribute("role", "dialog"); cd.setAttribute("aria-label", t("Recorrido de bienvenida", "Recorregut de benvinguda")); cd.setAttribute("aria-live", "polite");
    document.body.appendChild(rg); document.body.appendChild(cd);
    addEventListener("keydown", key, true); addEventListener("resize", place);
    show();
  }
  window.mkTour = { start: function () { scrollTo(0, 0); setTimeout(start, 60); } };
  function auto() {
    if (!q) { if (!LS || LS.getItem("mk-tour") || navigator.webdriver) return; if (document.querySelector(".mk-wl,.mk-gp,dialog[open]")) return; }
    setTimeout(function () { if (document.querySelector(".mk-wl")) return; window.mkTour.start(); }, q ? 1200 : 4500);
  }
  if (document.readyState === "complete") auto(); else addEventListener("load", auto);
})();
