/* Modo concentración · Menudo Kanteo (Problemes PAU)
   Junto al cronómetro: oculta cabecera, menús y adornos y deja solo el examen y los problemas.
   Salir: botón «Salir» o tecla Esc. */
(function () {
  "use strict";
  var root = document.documentElement, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : root.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  var CSS = ".pau-fcw{margin-top:12px;display:flex}.pau-fc{appearance:none;border:1px solid var(--line,rgba(0,0,0,.14));background:transparent;color:var(--fg);font:600 14px/1 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif;letter-spacing:-.01em;min-height:40px;padding:0 16px 0 12px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;cursor:pointer;transition:transform .3s cubic-bezier(.2,1.25,.3,1),background .2s}.pau-fc:hover{background:color-mix(in srgb,var(--fg) 7%,transparent)}.pau-fc:active{transform:scale(.96)}.pau-fc:focus-visible{outline:3px solid var(--fg);outline-offset:2px}.pau-fc[aria-pressed=true]{background:var(--fg);color:var(--bg)}.pau-fc svg{width:18px;height:18px}" +
    "html.mk-fc .hdr,html.mk-fc .mk-tabs,html.mk-fc .mk-dk,html.mk-fc .mk-ix,html.mk-fc .mk-ixp,html.mk-fc footer,html.mk-fc .mk-pb,html.mk-fc .pau-tp,html.mk-fc .pau-sw,html.mk-fc .cl-h,html.mk-fc .mk-inst,html.mk-fc .mk-upd,html.mk-fc .mk-rx,html.mk-fc nav.ft-legal{display:none!important}" +
    "html.mk-fc body{padding-top:0!important}html.mk-fc .pau-ex{position:sticky;top:12px;z-index:30;margin-top:12px;-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);background:color-mix(in srgb,var(--bg) 78%,transparent);box-shadow:0 12px 40px rgba(0,0,0,.14);animation:mkfcin .5s cubic-bezier(.2,1.2,.3,1) both}html.mk-fc .pau-ex .pau-rw{width:96px;height:96px}html.mk-fc .pau-ex .pau-tm{font-size:24px}html.mk-fc .pau-ex .pau-d,html.mk-fc .pau-ex .pau-nt{display:none}html.mk-fc .pau-ex{padding:14px 20px;gap:18px;border-radius:26px}" +
    "@keyframes mkfcin{from{opacity:.4;transform:translateY(-10px) scale(.97)}}" +
    "@media(prefers-reduced-motion:reduce){html.mk-fc .pau-ex{animation:none}}@media(prefers-reduced-transparency:reduce){html.mk-fc .pau-ex{-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--bg)}}" +
    "@media(max-width:640px){html.mk-fc .pau-ex{grid-template-columns:auto 1fr;text-align:left;justify-items:start}}";
  var st = document.createElement("style"); st.textContent = CSS; var btn = null, on = false;
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  function label() { btn.innerHTML = ICON + "<span>" + (on ? t("Salir de concentración", "Surt de concentració") : t("Modo concentración", "Mode concentració")) + "</span>"; btn.setAttribute("aria-pressed", String(on)); }
  function set(v) {
    on = v; root.classList.toggle("mk-fc", on); label();
    if (window.mkFx) window.mkFx.fb("open");
    var live = document.querySelector(".pau-sr"); if (live) live.textContent = on ? t("Modo concentración activado.", "Mode concentració activat.") : t("Modo concentración desactivado.", "Mode concentració desactivat.");
    if (on) scrollTo({ top: Math.max(0, (document.querySelector(".pau-ex") || root).getBoundingClientRect().top + scrollY - 12), behavior: reduce ? "auto" : "smooth" });
  }
  function mount() {
    var eb = document.querySelector(".pau-ei .pau-eb"); if (!eb || document.querySelector(".pau-fc")) return !!eb;
    var w = document.createElement("div"); w.className = "pau-fcw"; btn = document.createElement("button"); btn.type = "button"; btn.className = "pau-fc"; label();
    btn.addEventListener("click", function () { set(!on); }); w.appendChild(btn); eb.parentNode.insertBefore(w, eb.nextSibling); return true;
  }
  function boot() {
    document.head.appendChild(st);
    if (!mount()) { var mo = new MutationObserver(function () { if (mount()) mo.disconnect(); }); mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 10000); }
    document.addEventListener("keydown", function (e) { if (on && e.key === "Escape" && !document.querySelector(".mkk,.mkv,.mkp-sh")) set(false); });
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
