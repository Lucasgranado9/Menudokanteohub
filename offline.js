/* Aviso de conexión · Menudo Kanteo
   Muestra una cápsula discreta cuando se pierde la conexión y cuando vuelve. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, el, hideT, wasOff = false;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  var CSS = ".mkoff{position:fixed;z-index:390;left:50%;bottom:max(16px,env(safe-area-inset-bottom,0px));max-width:calc(100vw - 32px);display:flex;align-items:center;gap:10px;padding:10px 16px 10px 12px;border-radius:999px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 82%,transparent);-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);box-shadow:0 12px 34px -10px #0000005c;font:600 13px/1.3 system-ui,-apple-system,'IBM Plex Sans',sans-serif;transform:translate(-50%,160%);opacity:0;transition:transform .6s cubic-bezier(.2,1.2,.3,1),opacity .3s}" +
    ".mkoff.on{transform:translate(-50%,0);opacity:1}.mkoff i{flex:none;width:10px;height:10px;border-radius:50%;background:#ff9f0a;box-shadow:0 0 0 4px #ff9f0a33}.mkoff.ok i{background:#30d158;box-shadow:0 0 0 4px #30d15833}" +
    ".mkoff small{display:block;font-weight:500;color:var(--muted,#6c6a6a);font-size:12px}" +
    "@media(max-width:640px){.mkoff{bottom:calc(84px + env(safe-area-inset-bottom,0px))}}" +
    "@media(prefers-reduced-motion:reduce){.mkoff{transition:opacity .2s}.mkoff{transform:translate(-50%,0)}}" +
    "@media(prefers-reduced-transparency:reduce){.mkoff{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}" +
    "@media(prefers-contrast:more){.mkoff{border:2px solid var(--fg,#111)}}@media print{.mkoff{display:none!important}}";
  function ensure() {
    if (el) return el;
    var s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s);
    el = document.createElement("div"); el.className = "mkoff"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
    document.body.appendChild(el); return el;
  }
  function show(ok) {
    clearTimeout(hideT);
    var e = ensure(), E = es();
    e.classList.toggle("ok", ok);
    e.innerHTML = "<i aria-hidden='true'></i><span>" + (ok ? (E ? "De nuevo en línea" : "De nou en línia") : (E ? "Sin conexión" : "Sense connexió") + "<small>" + (E ? "Lo que ya abriste sigue disponible." : "El que ja has obert continua disponible.") + "</small>") + "</span>";
    e.getBoundingClientRect();
    e.classList.add("on");
    if (ok) hideT = setTimeout(hide, 2600);
  }
  function hide() { el && el.classList.remove("on"); }
  addEventListener("offline", function () { wasOff = true; show(false); });
  addEventListener("online", function () { if (wasOff) show(true); wasOff = false; });
  if (navigator.onLine === false) { wasOff = true; if (document.readyState === "loading") addEventListener("DOMContentLoaded", function () { show(false); }); else show(false); }
})();

/* Comprobación de versión nueva · el navegador solo mira si hay service worker nuevo de vez en cuando; aquí lo pedimos
   al abrir, al volver a la app y cada 30 min con ella abierta. El aviso «Hi ha una versió nova» ya lo muestra el portal. */
(function () {
  "use strict";
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  function chk() { navigator.serviceWorker.getRegistration().then(function (r) { if (r && r.update) r.update().catch(function () { }); }).catch(function () { }); }
  addEventListener("load", function () { setTimeout(chk, 1500); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) chk(); });
  addEventListener("online", chk);
  setInterval(function () { if (!document.hidden) chk(); }, 30 * 60 * 1000);
})();
