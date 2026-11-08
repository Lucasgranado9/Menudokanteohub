/* Menudo Kanteo — vídeo de presentación (80 s). Tarjeta en la portada y en «Sobre el proyecto», acceso desde el engranaje y reproductor flotante.
   El vídeo no se descarga hasta que se pulsa reproducir. */
(function () {
  "use strict";
  if (window.mkDemo) return;
  var SRC = "video/menudo-kanteo-demo.mp4", POSTER = "img/demo-poster.webp";
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 5.4v13.2a1 1 0 0 0 1.5.86l10.6-6.6a1 1 0 0 0 0-1.72L9.7 4.54a1 1 0 0 0-1.5.86z" fill="currentColor"/></svg>';

  function css() {
    if (document.getElementById("mkdm-css")) return;
    var s = document.createElement("style"); s.id = "mkdm-css";
    s.textContent =
      ".mkdm{position:relative;display:block;width:100%;padding:0;border:0;cursor:pointer;aspect-ratio:16/9;border-radius:32px;overflow:hidden;color:#fff;text-align:left;background:#e9e4ef var(--mkdm-p) center/cover no-repeat;box-shadow:0 30px 70px -34px rgba(60,30,90,.5),0 0 0 .5px rgba(0,0,0,.08);isolation:isolate;-webkit-tap-highlight-color:transparent;font-family:var(--sans,-apple-system,system-ui,sans-serif);transition:transform .7s cubic-bezier(.3,1.25,.5,1),box-shadow .5s}" +
      ".mkdm:before{content:'';position:absolute;inset:0;background:var(--mkdm-p) center/cover no-repeat;transition:transform 1.1s cubic-bezier(.2,.8,.2,1);z-index:-2}" +
      ".mkdm:after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(20,10,30,0) 45%,rgba(20,10,30,.42) 100%)}" +
      ".mkdm:hover{transform:translateY(-3px);box-shadow:0 44px 90px -34px rgba(60,30,90,.6),0 0 0 .5px rgba(0,0,0,.08)}.mkdm:hover:before{transform:scale(1.035)}.mkdm:active{transform:scale(.985);transition-duration:.15s}" +
      ".mkdm:focus-visible{outline:3px solid #0a84ff;outline-offset:3px}" +
      ".mkdm-pl{position:absolute;left:50%;top:50%;width:clamp(64px,11vw,96px);aspect-ratio:1;margin:calc(clamp(64px,11vw,96px)/-2) 0 0 calc(clamp(64px,11vw,96px)/-2);border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.34);-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);box-shadow:0 14px 40px -10px rgba(0,0,0,.4),inset 0 0 0 .5px rgba(255,255,255,.55),inset 0 1px 0 rgba(255,255,255,.5);transition:transform .6s cubic-bezier(.3,1.5,.5,1)}" +
      ".mkdm-pl svg{width:38%;height:38%;margin-left:6%;filter:drop-shadow(0 1px 2px rgba(0,0,0,.25))}.mkdm:hover .mkdm-pl{transform:scale(1.1)}.mkdm:active .mkdm-pl{transform:scale(.94)}" +
      ".mkdm-pl:before{content:'';position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 0 rgba(255,255,255,.55);animation:mkdm-pulse 2.8s ease-out infinite}@keyframes mkdm-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.5)}70%,100%{box-shadow:0 0 0 26px rgba(255,255,255,0)}}" +
      ".mkdm-cap{position:absolute;left:clamp(14px,2.4vw,26px);right:clamp(14px,2.4vw,26px);bottom:clamp(14px,2.4vw,26px);display:flex;align-items:flex-end;justify-content:space-between;gap:12px}" +
      ".mkdm-tx{display:flex;flex-direction:column;gap:4px;min-width:0;padding:clamp(10px,1.6vw,16px) clamp(14px,2vw,20px);border-radius:clamp(16px,2.4vw,24px);background:rgba(24,16,36,.92);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);box-shadow:inset 0 0 0 .5px rgba(255,255,255,.25)}.mkdm-k{font:700 11.5px/1 var(--mono,ui-monospace,monospace);letter-spacing:.12em;text-transform:uppercase;opacity:.9}" +
      ".mkdm-t{font:800 clamp(20px,3vw,32px)/1.05 var(--disp,var(--sans,inherit));letter-spacing:-.035em;text-wrap:balance}" +
      ".mkdm-d{flex:none;padding:8px 14px;border-radius:999px;font:650 13px/1 var(--sans,inherit);background:rgba(24,16,36,.92);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:inset 0 0 0 .5px rgba(255,255,255,.25)}" +
      ".mkdm-sec{padding-block:clamp(8px,2vw,22px)}.mkdm-sec .wrap{max-width:var(--mkdm-w,860px)}" +
      /* reproductor */
      ".mkdp-ov{position:fixed;inset:0;z-index:2147483100;background:rgba(10,8,16,.55);-webkit-backdrop-filter:blur(26px) saturate(150%);backdrop-filter:blur(26px) saturate(150%);opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}.mkdp-ov.on{opacity:1;visibility:visible;transition:opacity .4s}" +
      ".mkdp{position:fixed;z-index:2147483101;left:50%;top:50%;width:min(1120px,calc(100vw - 24px));aspect-ratio:16/9;max-height:calc(100dvh - 24px);border-radius:clamp(18px,3vw,32px);overflow:hidden;background:#0d0b12;box-shadow:0 60px 120px -30px rgba(0,0,0,.7),0 0 0 .5px rgba(255,255,255,.18);transform:translate(-50%,-50%) scale(.86);opacity:0;visibility:hidden;transition:transform .55s cubic-bezier(.32,.72,0,1),opacity .3s,visibility 0s .55s}" +
      ".mkdp.on{transform:translate(-50%,-50%);opacity:1;visibility:visible;transition:transform .7s cubic-bezier(.3,1.2,.5,1),opacity .3s}" +
      ".mkdp video{display:block;width:100%;height:100%;object-fit:contain;background:#0d0b12}" +
      ".mkdp-x{position:absolute;top:12px;right:12px;z-index:2;width:38px;height:38px;border:0;border-radius:50%;cursor:pointer;color:#fff;font:400 22px/1 var(--sans,system-ui);background:rgba(30,26,40,.55);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:inset 0 0 0 .5px rgba(255,255,255,.3);transition:transform .35s cubic-bezier(.3,1.5,.5,1),opacity .3s;opacity:.0}.mkdp:hover .mkdp-x,.mkdp:focus-within .mkdp-x,.mkdp.tch .mkdp-x{opacity:1}.mkdp-x:active{transform:scale(.9)}.mkdp-x:focus-visible{outline:3px solid #0a84ff;outline-offset:2px;opacity:1}" +
      "@media(hover:none){.mkdp-x{opacity:1}}" +
      "@media(max-width:600px){.mkdm-pl{top:36%}}" +
      "@media(prefers-reduced-motion:reduce){.mkdm,.mkdm:before,.mkdm-pl,.mkdp,.mkdp.on{transition:opacity .2s,visibility 0s!important}.mkdp,.mkdp.on{transform:translate(-50%,-50%)!important}.mkdm-pl:before{animation:none}.mkdm:hover{transform:none}}" +
      "@media(prefers-reduced-transparency:reduce){.mkdp-ov{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(10,8,16,.85)}.mkdm-pl,.mkdm-d,.mkdm-tx,.mkdp-x{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(30,26,40,.7)}}" +
      "@media(prefers-contrast:more){.mkdm-d,.mkdm-tx{background:#111}.mkdm-pl{background:#fff;color:#111}}@media print{.mkdm-sec,.mkdp,.mkdp-ov{display:none}}";
    document.head.appendChild(s);
  }

  /* ---------- reproductor ---------- */
  var ov, box, vid, last, built = false, closing = 0;
  function build() {
    if (built) return; built = true; css();
    ov = document.createElement("div"); ov.className = "mkdp-ov";
    box = document.createElement("div"); box.className = "mkdp"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", t("Vídeo de presentación de Menudo Kanteo", "Vídeo de presentació de Menudo Kanteo")); box.setAttribute("inert", "");
    box.innerHTML = '<button type="button" class="mkdp-x" aria-label="' + t("Cerrar", "Tanca") + '">×</button><video playsinline controls preload="none" poster="' + POSTER + '"></video>';
    document.body.appendChild(ov); document.body.appendChild(box);
    vid = box.querySelector("video");
    ov.addEventListener("click", function () { toggle(false); });
    box.querySelector(".mkdp-x").addEventListener("click", function () { toggle(false); });
    box.addEventListener("pointerdown", function (e) { if (e.pointerType === "touch") box.classList.add("tch"); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("on")) { e.preventDefault(); toggle(false); } });
  }
  function toggle(open, from) {
    build();
    if (open) {
      last = from || document.activeElement; clearTimeout(closing);
      if (!vid.getAttribute("src")) vid.src = SRC;
      ov.classList.add("on"); box.removeAttribute("inert"); box.getBoundingClientRect(); box.classList.add("on");
      document.documentElement.style.overflow = "hidden";
      var p = vid.play(); if (p && p.catch) p.catch(function () { });
      box.querySelector(".mkdp-x").focus({ preventScroll: true });
    } else {
      vid.pause(); ov.classList.remove("on"); box.classList.remove("on"); box.setAttribute("inert", "");
      document.documentElement.style.overflow = "";
      closing = setTimeout(function () { try { vid.currentTime = 0; } catch (x) { } }, 600);
      last && last.focus && document.contains(last) && last.focus({ preventScroll: true });
    }
  }

  /* ---------- tarjeta ---------- */
  function card() {
    css();
    var sec = document.createElement("section"); sec.className = "gut mkdm-sec"; sec.setAttribute("data-mkdm", "");
    sec.innerHTML = '<div class="wrap"><button type="button" class="mkdm" style="--mkdm-p:url(' + POSTER + ')" aria-label="' + t("Ver el vídeo de presentación, 80 segundos", "Veure el vídeo de presentació, 80 segons") + '">' +
      '<span class="mkdm-pl">' + PLAY + '</span><span class="mkdm-cap"><span class="mkdm-tx"><span class="mkdm-k">' + t("Presentación", "Presentació") + '</span><span class="mkdm-t">' + t("Descúbrelo en 80 segundos", "Descobreix-lo en 80 segons") + '</span></span><span class="mkdm-d">1:20</span></span></button></div>';
    var b = sec.querySelector(".mkdm");
    b.addEventListener("click", function () { toggle(true, b); });
    b.addEventListener("pointerenter", function () { if (!vid || !vid.getAttribute("src")) { var l = document.createElement("link"); l.rel = "prefetch"; l.as = "image"; l.href = POSTER; document.head.appendChild(l); } }, { once: true });
    return sec;
  }
  function place() {
    if (document.querySelector("[data-mkdm]")) return true;
    var v = document.getElementById("view"); if (!v) return false;
    var hero = v.querySelector(":scope > .hero");
    if (hero) { hero.insertAdjacentElement("afterend", card()); return true; }
    var pg = v.classList.contains("kn-pg") && v.querySelector(":scope > .nvp");
    if (pg) { var c = card(); c.querySelector(".wrap").style.setProperty("--mkdm-w", "900px"); pg.insertAdjacentElement("afterend", c); return true; }
    return false;
  }
  function init() {
    if (!/(^|\/)(index\.html)?$|sobre\.html/.test(location.pathname)) return;
    var mo = new MutationObserver(function () { if (!document.querySelector("[data-mkdm]")) place(); });
    var v = document.getElementById("view"); if (!v) return;
    place(); mo.observe(v, { childList: true });
  }
  window.mkDemo = { open: function (from) { toggle(true, from); }, close: function () { toggle(false); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
