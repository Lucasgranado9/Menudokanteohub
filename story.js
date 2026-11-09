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

  /* Ilustraciones rotatorias: cada visita arranca con una variante distinta y, mientras la escena está a la vista,
     se van relevando con un fundido suave. Con «reducir movimiento» solo cambia por visita (sin ciclos). */
  var ROT_CSS = ".nar .sc-v svg{transition:opacity .45s ease}.nar .sc-v svg.ro{opacity:0}.nar .sc-v img{transition:filter .45s ease}.nar .sc-v img.ro{filter:opacity(0) blur(8px)}" +
    "@media(prefers-reduced-motion:reduce){.nar .sc-v svg,.nar .sc-v img{transition:none}}";
  var MV = [
    { a: "M20 300 C 90 40, 160 40, 210 190 S 320 360, 380 110", b: "M20 140 C 80 150, 140 250, 200 250 S 320 120, 380 120", g: ["∫", "f′(x)", "Σ", "π"] },
    { a: "M20 330 Q 200 -50 380 330", b: "M20 110 Q 200 410 380 110", g: ["lim", "dx", "∞", "Δ"] },
    { a: "M20 200 C 70 60, 130 60, 200 200 S 330 340, 380 200", b: "M20 330 C 140 330, 260 70, 380 70", g: ["sen x", "∫", "eˣ", "√"] },
    { a: "M20 340 C 120 340, 140 60, 200 60 S 280 340, 380 340", b: "M20 340 L380 60", g: ["σ", "P(x)", "μ", "Σ"] }
  ];
  var FV = [
    { r: -16, s: "#ffd23f", p: ["#7dd3fc", "#fda4af"] },
    { r: 22, s: "#fb923c", p: ["#86efac", "#fde68a"] },
    { r: -42, s: "#f0abfc", p: ["#fcd34d", "#67e8f9"] },
    { r: 58, s: "#fde047", p: ["#fca5a5", "#a5b4fc"] }
  ];
  var FILO = ["platon", "descartes", "kant", "hume", "nietzsche", "nussbaum", "locke", "mill"];
  function visitN() { var n = 0; try { n = (parseInt(localStorage.getItem("mk-nr"), 10) || 0) + 1; localStorage.setItem("mk-nr", String(n)); } catch (e) { n = Math.floor(Math.random() * 8); } return n; }
  function applyM(v, m) {
    var svg = v.querySelector("svg"), p = svg.querySelector("#scp-m"); if (!p) return;
    p.setAttribute("d", m.a);
    var dsh = svg.querySelector('path[stroke-dasharray="3 8"]'); if (dsh) dsh.setAttribute("d", m.b);
    var tx = svg.querySelectorAll("g[fill=currentColor] text"); [].forEach.call(tx, function (t, i) { if (m.g[i]) t.textContent = m.g[i]; });
    if (p.getTotalLength) { var L = p.getTotalLength(); v.style.setProperty("--dl", L + "px"); p.style.setProperty("--dl", L + "px"); }
    var am = svg.querySelector("animateMotion"); try { am && am.beginElement && am.beginElement(); } catch (e) {}
  }
  function applyF(v, f) {
    var svg = v.querySelector("svg"), g = svg.querySelector("g[transform]"); if (!g) return;
    g.setAttribute("transform", "rotate(" + f.r + " 200 200)");
    var ss = svg.querySelectorAll("#scg-f stop"); [].forEach.call(ss, function (s) { s.setAttribute("stop-color", f.s); });
    var sun = svg.querySelector('circle[r="22"]'); if (sun) sun.setAttribute("fill", f.s);
    var pl = [svg.querySelector('circle[r="9"]'), svg.querySelector('circle[r="6"]')]; pl.forEach(function (c, i) { if (c) c.setAttribute("fill", f.p[i]); });
  }
  function rot(n, scenes) {
    if (n.__rot) return; n.__rot = 1;
    var st = document.createElement("style"); st.textContent = ROT_CSS; document.head.appendChild(st);
    var N = visitN(), vm = scenes[0] && scenes[0].querySelector(".sc-v"), vf = scenes[1] && scenes[1].querySelector(".sc-v"), vp = scenes[2] && scenes[2].querySelector(".sc-v");
    var im = N % MV.length, ifz = (N + 1) % FV.length;
    if (vm) applyM(vm, MV[im]); if (vf) applyF(vf, FV[ifz]);
    var imgs = vp ? [].slice.call(vp.querySelectorAll("img")) : [], cur = [];
    if (imgs.length) {
      var off = (N * 2) % FILO.length; cur = imgs.map(function (_, i) { return FILO[(off + i) % FILO.length]; });
      imgs.forEach(function (im2, i) { im2.src = "filo/" + cur[i] + "_t.jpg"; });
    }
    if (reduce) return;
    function swap(el, fn) { el.classList.add("ro"); setTimeout(function () { fn(); requestAnimationFrame(function () { el.classList.remove("ro"); }); }, 470); }
    function vis(el) { var r = el.getBoundingClientRect(), h = innerHeight; return r.bottom > h * .1 && r.top < h * .9; }
    var k = 0;
    setInterval(function () {
      if (document.hidden || !document.body.contains(n)) return;
      k++;
      if (vm && vis(vm) && k % 2 === 0) { im = (im + 1) % MV.length; var sv = vm.querySelector("svg"); swap(sv, function () { applyM(vm, MV[im]); }); }
      if (vf && vis(vf) && k % 3 === 0) { ifz = (ifz + 1) % FV.length; var sf = vf.querySelector("svg"); swap(sf, function () { applyF(vf, FV[ifz]); }); }
      if (vp && vis(vp) && imgs.length) {
        var i = Math.floor(Math.random() * imgs.length), free = FILO.filter(function (x) { return cur.indexOf(x) < 0; });
        if (!free.length) return;
        var nx = free[Math.floor(Math.random() * free.length)], pre = new Image();
        pre.onload = function () { swap(imgs[i], function () { cur[i] = nx; imgs[i].src = pre.src; }); };
        pre.src = "filo/" + nx + "_t.jpg";
      }
    }, 3600);
  }

  var nar = null, sc = [], cp = null, seg = [], lab = null, raf = 0, names = [];
  function bind() {
    var n = document.querySelector(".nar");
    if (!n || n === nar) return !!n;
    nar = n; sc = [].slice.call(n.querySelectorAll(".sc"));
    try { rot(n, sc); } catch (e) {}
    /* teclado: si el foco entra en una escena que otra tapa (escenas apiladas), la traemos arriba para que se vea */
    n.addEventListener("focusin", function (ev) {
      var s = ev.target.closest && ev.target.closest(".sc"), i = sc.indexOf(s); if (i < 0) return;
      var r = ev.target.getBoundingClientRect(), top = document.elementFromPoint(Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1), Math.min(Math.max(r.top + Math.min(r.height / 2, 12), 1), innerHeight - 1));
      if (top && (top === ev.target || ev.target.contains(top) || top.contains(ev.target))) return;
      var y = n.getBoundingClientRect().top + scrollY; for (var k = 0; k < i; k++) y += sc[k].offsetHeight;
      scrollTo(0, y);
    });
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
