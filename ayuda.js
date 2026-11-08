/* Menudo Kanteo — botón del asistente (abajo a la derecha). El chat (ayuda-chat.js) se descarga al abrirlo. */
(function () {
  "use strict";
  if (window.__mkAyuda) return; window.__mkAyuda = 1;
  var D = document;
  function es() { return window.MKL ? !!window.MKL.es : D.documentElement.lang !== "ca"; }
  function t(ca, esp) { return es() ? esp : ca; }
  var css = "@property --ay-a{syntax:'<angle>';inherits:false;initial-value:0deg}" +
    ".ay-fab{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:58;width:54px;height:54px;border:0;border-radius:50%;padding:0;display:grid;place-items:center;cursor:pointer;isolation:isolate;color:var(--fg,#111);background:conic-gradient(from var(--ay-a),#ff7a59,#ffc15a,#5ee0b0,#5aa9ff,#a56bff,#ff62c8,#ff7a59);animation:ay-spin 7s linear infinite;box-shadow:0 10px 26px -8px rgba(0,0,0,.4);transition:transform .5s cubic-bezier(.3,1.4,.5,1);-webkit-tap-highlight-color:transparent}" +
    ".ay-fab:before{content:'';position:absolute;inset:2.5px;border-radius:50%;z-index:-1;background:color-mix(in srgb,var(--bg,#fff) 82%,transparent);-webkit-backdrop-filter:blur(14px) saturate(180%);backdrop-filter:blur(14px) saturate(180%)}" +
    ".ay-fab:after{content:'';position:absolute;inset:-5px;border-radius:50%;z-index:-2;background:inherit;filter:blur(12px);opacity:.38}" +
    "@keyframes ay-spin{to{--ay-a:360deg}}.ay-fab:hover{transform:scale(1.06)}.ay-fab:active{transform:scale(.92)}.ay-fab:focus-visible{outline:3px solid var(--fg,#111);outline-offset:4px}.ay-fab svg{width:25px;height:25px;transition:transform .5s cubic-bezier(.3,1.4,.5,1)}.ay-fab[aria-expanded=true] svg{transform:scale(.86) rotate(45deg)}" +
    "@media(prefers-reduced-motion:reduce){.ay-fab,.ay-fab svg{transition:none}.ay-fab{animation:none}}@media print{.ay-fab{display:none}}";
  var fab, loading = 0, queue = [];
  function place() { var h = 0; [".mkb", ".mk-tabs", ".mk-ix"].forEach(function (q) { var e = D.querySelector(q); if (!e) return; var cs = getComputedStyle(e); if (cs.display === "none" || cs.position !== "fixed") return; var r = e.getBoundingClientRect(); if (r.height && r.top > innerHeight / 2) h = Math.max(h, innerHeight - r.top + (q === ".mk-ix" ? 12 : 4)); }); var v = 16 + h; fab.style.bottom = h ? v + "px" : "max(16px,env(safe-area-inset-bottom,0px))"; D.documentElement.style.setProperty("--ay-b", h ? v + "px" : "16px"); }
  function ensure(cb) {
    if (window.__mkAyChat) return cb();
    queue.push(cb); if (loading) return; loading = 1;
    var s = D.createElement("script"); s.src = "ayuda-chat.js"; s.onload = function () { loading = 0; var q = queue; queue = []; q.forEach(function (f) { f(); }); };
    s.onerror = function () { loading = 0; queue = []; }; D.head.appendChild(s);
  }
  function init() {
    var st = D.createElement("style"); st.textContent = css; D.head.appendChild(st);
    fab = D.createElement("button"); fab.type = "button"; fab.className = "ay-fab"; fab.setAttribute("aria-haspopup", "dialog"); fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-label", t("Obre l’assistent", "Abre el asistente"));
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.5 4.2c.45 3.9 2.2 5.65 6.1 6.1-3.9.45-5.65 2.2-6.1 6.1-.45-3.9-2.2-5.65-6.1-6.1 3.9-.45 5.65-2.2 6.1-6.1z"/><path d="M18.2 12.8c.22 1.9 1.1 2.78 3 3-1.9.22-2.78 1.1-3 3-.22-1.9-1.1-2.78-3-3 1.9-.22 2.78-1.1 3-3z" opacity=".9"/><path d="M18.6 2.6c.14 1.2.7 1.76 1.9 1.9-1.2.14-1.76.7-1.9 1.9-.14-1.2-.7-1.76-1.9-1.9 1.2-.14 1.76-.7 1.9-1.9z" opacity=".75"/></svg>';
    D.body.appendChild(fab);
    function warm() { ensure(function () { }); }
    ["pointerenter", "focus", "touchstart"].forEach(function (n) { fab.addEventListener(n, warm, { once: true, passive: true }); });
    fab.addEventListener("click", function () { ensure(function () { window.__mkAyChat.toggle(); }); });
    var raf = 0, sched = function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; place(); }); };
    addEventListener("resize", sched); addEventListener("scroll", sched, { passive: true });
    new MutationObserver(sched).observe(D.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class"] });
    place(); setTimeout(place, 800);
    window.__mkAy = { fab: fab, place: place };
    if (/[?&#]ayuda\b/.test(location.search + location.hash)) fab.click();
  }
  if (D.body) init(); else D.addEventListener("DOMContentLoaded", init);
})();
