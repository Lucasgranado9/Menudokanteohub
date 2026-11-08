/* Scroll narrativo · Menudo Kanteo (solo portada)
   Las tres escenas (Mates, Física, Filosofía) se apilan como tarjetas pegajosas: cada escena nueva sube y
   cubre a la anterior, que se aleja y se oscurece, y su ilustración entra con un pequeño paralaje. Un indicador
   de capítulo muestra dónde estás. Con «reducir movimiento» no hay desplazamientos ni escalas: solo el
   oscurecimiento y el indicador, que no marean pero siguen mostrando el avance. */
(function () {
  "use strict";
  var mq = matchMedia("(max-width: 860px)"), shortMq = matchMedia("(max-height: 600px)"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  var CSS = "@media(max-width:860px) and (min-height:601px){" +
    ".nar{margin-top:32px}" +
    ".nar .sc{top:0;align-items:flex-start}" +
    ".nar .sc-in{padding-block:calc(76px + env(safe-area-inset-top,0px)) calc(104px + env(safe-area-inset-bottom,0px))}" +
    ".nar .sc-g{gap:clamp(12px,2.6svh,22px);align-content:start}" +
    ".nar .sc-v{order:-1;max-height:none;width:auto;height:clamp(170px,33svh,290px);aspect-ratio:1/1;max-width:100%;margin-inline:auto}" +
    ".nar .sc-h{font-size:clamp(34px,10.6vw,46px);margin-top:10px}" +
    ".nar .sc-p{font-size:clamp(16px,4.5vw,19px);margin-top:12px;max-width:32ch}" +
    ".nar .sc-a{margin-top:clamp(14px,2.6svh,22px)}" +
    ".nar .sc-k{font-size:12px}" +
    "}" +
    "@media(min-height:601px){" +
    ".nar .sc{position:sticky;top:0;min-height:100svh;border-radius:34px 34px 0 0;transform-origin:50% 0;will-change:transform;transform:scale(calc(1 - var(--cv,0)*.06)) translateY(calc(var(--cv,0)*-10px))}" +
    ".nar .sc:after{content:'';position:absolute;inset:0;border-radius:inherit;background:#000;opacity:calc(var(--cv,0)*.46);pointer-events:none}" +
    ".nar .sc-v{will-change:transform;transform:translate3d(0,calc((1 - var(--ep,1))*64px),0) scale(calc(.88 + .12*var(--ep,1)));opacity:calc(.25 + .75*var(--ep,1))}" +
    ".nar .sc-k,.nar .sc-h,.nar .sc-p,.nar .sc-a{will-change:transform,opacity;transform:translate3d(0,calc((1 - var(--ep,1))*22px),0);opacity:calc(.1 + .9*var(--ep,1))}" +
    ".nar .sc-h{transform:translate3d(0,calc((1 - var(--ep,1))*34px),0)}" +
    "}" +
    ".mkn-cp{position:fixed;z-index:25;right:max(6px,env(safe-area-inset-right,0px));top:50%;transform:translate(14px,-50%);opacity:0;pointer-events:none;display:none;flex-direction:column;align-items:center;gap:6px;padding:8px 4px;border-radius:999px;background:color-mix(in srgb,#000 28%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);transition:transform .55s cubic-bezier(.2,1.2,.3,1),opacity .3s}" +
    "@media(min-height:601px){.mkn-cp{display:flex}}" +
    ".mkn-cp.on{transform:translate(0,-50%);opacity:1}.mkn-cp b{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.mkn-sg{display:flex;flex-direction:column;gap:6px}.mkn-sg i{position:relative;overflow:hidden;width:4px;height:6px;border-radius:2px;background:#ffffff59;transition:height .45s cubic-bezier(.2,1.25,.3,1)}.mkn-sg i.cur{height:26px}.mkn-sg i:after{content:'';position:absolute;inset:0;border-radius:inherit;background:#fff;transform-origin:50% 0;transform:scaleY(var(--f,0))}.mkn-sg i.done:after{transform:scaleY(1)}" +
    "@media(prefers-reduced-motion:reduce){.mkn-cp,.mkn-sg i{transition:opacity .2s}.nar .sc,.nar .sc-v,.nar .sc-k,.nar .sc-h,.nar .sc-p,.nar .sc-a{transform:none!important;opacity:1!important;will-change:auto}.nar .sc:after{opacity:calc(var(--cv,0)*.34)}}" +
    "@media(prefers-reduced-transparency:reduce){.mkn-cp{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media print{.mkn-cp{display:none!important}}";
  var st = document.createElement("style"); st.textContent = CSS;
  function addCss() { document.head.appendChild(st); }

  var nar = null, sc = [], cp = null, seg = [], lab = null, raf = 0, names = [];
  function bind() {
    var n = document.querySelector(".nar");
    if (!n || n === nar) return !!n;
    nar = n; sc = [].slice.call(n.querySelectorAll(".sc"));
    names = sc.map(function (s) { var k = s.querySelector(".sc-k"); return k ? k.textContent.trim() : ""; });
    if (cp && cp.parentNode) cp.parentNode.removeChild(cp);
    cp = document.createElement("div"); cp.className = "mkn-cp"; cp.setAttribute("aria-hidden", "true");
    cp.innerHTML = '<span class="mkn-sg">' + sc.map(function () { return "<i></i>"; }).join("") + "</span><b></b>";
    document.body.appendChild(cp); seg = [].slice.call(cp.querySelectorAll("i")); lab = cp.querySelector("b");
    update(); return true;
  }
  function update() {
    raf = 0; if (!nar || !nar.isConnected) { bind(); if (!nar) return; }
    var vh = innerHeight, on = !shortMq.matches;
    if (!on) { cp.classList.remove("on"); sc.forEach(function (s) { s.style.removeProperty("--cv"); s.style.removeProperty("--ep"); }); return; }
    var nr = nar.getBoundingClientRect(), inside = nr.top < vh * .55 && nr.bottom > vh * .62, cur = 0, frac = 0;
    sc.forEach(function (s, i) {
      var nx = sc[i + 1], cv = 0;
      if (nx) cv = ease(Math.max(0, Math.min(1, (vh - nx.getBoundingClientRect().top) / vh)));
      s.style.setProperty("--cv", cv.toFixed(3));
      if (!reduce) s.style.setProperty("--ep", ease(Math.max(0, Math.min(1, (vh - s.getBoundingClientRect().top) / (vh * .85)))).toFixed(3));
      var r = s.getBoundingClientRect(); if (r.top < vh * .5) { cur = i; frac = nx ? cv : Math.max(0, Math.min(1, 1 - (nr.bottom - vh) / vh)); }
    });
    seg.forEach(function (i, k) { i.classList.toggle("cur", k === cur); i.classList.toggle("done", k < cur); i.style.setProperty("--f", k === cur ? Math.max(.08, frac).toFixed(3) : (k < cur ? 1 : 0)); });
    lab.textContent = names[cur] || "";
    cp.classList.toggle("on", inside);
  }
  function ease(x) { return x * x * (3 - 2 * x); }
  function tick() { if (!raf) raf = requestAnimationFrame(update); }
  function boot() {
    addCss();
    var w = 0; (function find() { if (bind() || ++w > 40) return; setTimeout(find, 150); })();
    addEventListener("scroll", tick, { passive: true }); addEventListener("resize", tick);
    var v = document.getElementById("view"); if (v) new MutationObserver(function () { bind(); tick(); }).observe(v, { childList: true });
    mq.addEventListener && mq.addEventListener("change", tick);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
