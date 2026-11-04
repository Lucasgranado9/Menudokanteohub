/* Estados vacíos, de carga y de error · Menudo Kanteo
   Unifica los avisos de «no se pudo cargar» y «nada que mostrar» en una tarjeta clara con icono,
   explicación y una acción (Reintentar / Quitar filtros). Detecta si estás sin conexión. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + "</svg>"; }
  var IC = {
    err: svg('<path d="M12 3.5l9 16H3z"/><path d="M12 10v4.2M12 17.2h0"/>'),
    off: svg('<path d="M3 3l18 18"/><path d="M8.5 8.8A9 9 0 0 0 3 11.4M16 5.9a14 14 0 0 1 5 2.6M5.8 14.4a9 9 0 0 1 3.6-2M12.5 11.1a9 9 0 0 1 5.3 2.3M9 17.7a4.5 4.5 0 0 1 6 0M12 21h0"/>'),
    emp: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.8-3.8M8.5 11h5"/>')
  };
  var CSS = ".mk-st{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;max-width:420px;margin:48px auto;padding:30px 24px;border-radius:26px;background:color-mix(in srgb,var(--fg,#111) 4%,var(--bg,#fff));border:1px solid color-mix(in srgb,var(--fg,#111) 9%,transparent);color:var(--fg,#111);animation:mkstIn .55s cubic-bezier(.2,1.2,.3,1) both}" +
    ".mk-st i{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;margin-bottom:8px;color:var(--st,#c0392b);background:color-mix(in srgb,var(--st,#c0392b) 13%,transparent);font-style:normal}.mk-st i svg{width:28px;height:28px}" +
    ".mk-st[data-k=off]{--st:#6c6a6a}.mk-st[data-k=emp]{--st:#0a60d6}" +
    ".mk-st b{font:650 18px/1.25 -apple-system,BlinkMacSystemFont,'SF Pro Display',var(--sans,system-ui),sans-serif;letter-spacing:-.015em}.mk-st p{margin:0;max-width:34ch;color:var(--muted,#6c6a6a);font:400 15px/1.45 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif}" +
    ".mk-st .mk-sa{margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.mk-st button{appearance:none;border:0;min-height:44px;padding:0 22px;border-radius:999px;font:650 15px/1 -apple-system,BlinkMacSystemFont,var(--sans,system-ui),sans-serif;cursor:pointer;color:#fff;background:#0a60d6;transition:transform .3s cubic-bezier(.2,1.3,.3,1)}.mk-st button.s{color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent)}.mk-st button:active{transform:scale(.95)}.mk-st button:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}" +
    "@keyframes mkstIn{from{opacity:0;transform:translateY(10px) scale(.97)}}@media(prefers-reduced-motion:reduce){.mk-st{animation:none}}@media(prefers-contrast:more){.mk-st{border-color:currentColor}}" +
    ".mk-ff~.cl-g{display:none!important}" +
    /* esqueletos: brillo suave y accesibles */
    ".cl-sk{animation-duration:1.4s}@media(prefers-reduced-motion:reduce){.cl-sk{animation:none}}";
  var st = document.createElement("style"); st.textContent = CSS;

  function card(kind, title, text, actions) {
    var d = document.createElement("div"); d.className = "mk-st"; d.setAttribute("data-k", kind); d.setAttribute("data-mkst", "1"); d.setAttribute("role", kind === "emp" ? "status" : "alert");
    d.innerHTML = "<i>" + IC[kind] + "</i><b></b><p></p>" + (actions && actions.length ? '<div class="mk-sa"></div>' : "");
    d.querySelector("b").textContent = title; d.querySelector("p").textContent = text;
    (actions || []).forEach(function (a) { var b = document.createElement("button"); b.type = "button"; if (a.s) b.className = "s"; b.textContent = a.l; b.addEventListener("click", a.f); d.querySelector(".mk-sa").appendChild(b); });
    return d;
  }
  function errCard() {
    var off = navigator.onLine === false;
    return card(off ? "off" : "err", off ? t("Sin conexión", "Sense connexió") : t("No se ha podido cargar", "No s’ha pogut carregar"),
      off ? t("Los apuntes que ya has abierto siguen disponibles sin conexión. Este todavía no se ha descargado.", "Els apunts que ja has obert continuen disponibles sense connexió. Aquest encara no s’ha descarregat.") : t("Comprueba tu conexión e inténtalo de nuevo.", "Comprova la teva connexió i torna-ho a provar."),
      [{ l: t("Reintentar", "Reintenta"), f: function () { location.reload(); } }, { l: t("Ir a la portada", "Anar a la portada"), s: 1, f: function () { location.href = "index.html"; } }]);
  }
  function resetFilters() {
    [].forEach.call(document.querySelectorAll('[role=radiogroup]'), function (g) {
      if (g.closest(".pau-ex,.pau-sw")) return; var f = g.querySelector("button"); if (f && f.getAttribute("aria-checked") !== "true") f.click();
    });
    var all = document.querySelector(".cl-chips button, .cl-tm button"); all && all.click();
  }
  function upgrade() {
    /* 1) error de apuntes (mates / física): el botón «torna-ho a provar» que recarga */
    [].forEach.call(document.querySelectorAll('#view button[onclick*="reload"]'), function (b) {
      var box = b.parentElement; if (!box || box.getAttribute("data-mkst")) return;
      var host = box.parentElement; box.setAttribute("data-mkst", "1");
      if (host && host.children.length === 1) { var c = errCard(); host.replaceChild(c, box); } else box.replaceWith(errCard());
    });
    /* 2) problemas: error de carga y «nada que mostrar» */
    [].forEach.call(document.querySelectorAll("p.cl-em:not([data-mkst])"), function (p) {
      p.setAttribute("data-mkst", "1"); var txt = p.textContent;
      if (/cargar|carregar/i.test(txt)) { var e = errCard(); p.replaceWith(e); }
      else { var d = card("emp", t("Nada que mostrar", "Res per mostrar"), t("Ningún problema coincide con los filtros elegidos.", "Cap problema coincideix amb els filtres triats."), [{ l: t("Quitar filtros", "Treu els filtres"), f: resetFilters }]); p.replaceWith(d); }
    });
  }
  /* filtros «Pendientes» / «Hechos» sin resultados: se ocultan con CSS, así que lo detectamos aquí */
  function filterEmpty() {
    var v = document.getElementById("view"); if (!v) return; var f = v.getAttribute("data-f"), cur = v.querySelector(".mk-ff");
    var loaded = v.querySelector(".prob") && !v.querySelector(".cl-sk");
    var none = loaded && (f === "todo" || f === "done") && ![].some.call(v.querySelectorAll(".prob"), function (p) { return p.offsetParent !== null; });
    if (!none) { if (cur) cur.remove(); return; }
    if (cur && cur.getAttribute("data-f") === f) return; if (cur) cur.remove();
    var d = card("emp", f === "done" ? t("Aún no has marcado ninguno", "Encara no n’has marcat cap") : t("¡No te queda ninguno pendiente!", "No te’n queda cap de pendent!"),
      f === "done" ? t("Marca un problema como hecho y aparecerá aquí.", "Marca un problema com a fet i apareixerà aquí.") : t("Has marcado todos los problemas como hechos. Puedes repasarlos cuando quieras.", "Has marcat tots els problemes com a fets. Pots repassar-los quan vulguis."), [{ l: t("Ver todos", "Veure’ls tots"), f: resetFilters }]);
    d.classList.add("mk-ff"); d.setAttribute("data-f", f); var g = v.querySelector(".cl-g"); if (g && g.parentNode) g.parentNode.insertBefore(d, g); else v.appendChild(d);
  }
  function boot() {
    document.head.appendChild(st); upgrade(); filterEmpty();
    var q = 0; new MutationObserver(function () { if (!q) q = requestAnimationFrame(function () { q = 0; upgrade(); filterEmpty(); }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-f"] });
    addEventListener("online", function () { var m = document.querySelector('.mk-st[data-k=off]'); if (m) location.reload(); });
  }
  window.mkState = { card: card, error: errCard };
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
