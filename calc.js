/* Calculadora de nota · mejora visual (Menudo Kanteo)
   Añade deslizadores sincronizados con cada campo, una tarjeta de resultado con anillo y barras que
   se mueve con muelle, y una cápsula fija en móvil. El cálculo y el texto accesible siguen siendo los
   del script original de la página (#res y #tres); esto solo lo acompaña. Guarda tus notas en este navegador. */
(function () {
  "use strict";
  var form = document.getElementById("calc"), res = document.getElementById("res");
  if (!form || !res) return;
  var E = !!(window.MKL && MKL.es), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, LS = null, K = "mk-calc";
  try { LS = window.localStorage; LS.getItem(K); } catch (e) { LS = null; }
  function t(es, ca) { return E ? es : ca; }
  function $(id) { return document.getElementById(id); }
  function num(id) { var n = $(id); if (!n) return NaN; var s = (n.value || "").trim().replace(",", "."); if (s === "") return NaN; var x = Number(s); return isFinite(x) ? x : NaN; }
  function rd(x) { return Math.round(x * 1e3 + 1e-9) / 1e3; }
  function fmt(x, d) { return (isNaN(x) ? 0 : x).toFixed(d == null ? 2 : d).replace(".", ","); }
  function col(x) { return x < 5 ? "#ff453a" : x < 7 ? "#ff9f0a" : "#30d158"; }

  var CSS = ".lgw{max-width:1080px!important}.cg{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,380px);gap:clamp(20px,3vw,40px);align-items:start}.cg-l{min-width:0}.cg-r{position:sticky;top:84px}" +
    "@media(max-width:860px){.cg{grid-template-columns:minmax(0,1fr)}.cg-r{position:static;order:2}}" +
    ".calc .row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 14px;align-items:center}.calc .row.two{grid-template-columns:minmax(0,1fr) auto auto}.calc .row>.cs{grid-column:1/-1}" +
    ".calc input.cs,input.cs{border:0!important;background:transparent!important;box-shadow:none!important;padding:0!important;-webkit-appearance:none;appearance:none;display:block;min-height:28px;width:100%;height:28px;margin:0;background:transparent;cursor:pointer;touch-action:pan-y;--v:0%;--c:#0a60d6}.cs:focus-visible{outline:3px solid var(--fg,#111);outline-offset:3px;border-radius:14px}" +
    ".cs::-webkit-slider-runnable-track{height:8px;border-radius:4px;background:linear-gradient(90deg,var(--c) var(--v),color-mix(in srgb,var(--fg,#111) 12%,transparent) var(--v))}.cs::-moz-range-track{height:8px;border-radius:4px;background:color-mix(in srgb,var(--fg,#111) 12%,transparent)}.cs::-moz-range-progress{height:8px;border-radius:4px;background:var(--c)}" +
    ".cs::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;margin-top:-10px;border-radius:50%;background:#fff;border:0;box-shadow:0 0 0 .5px #0003,0 3px 8px -1px #0000004d,0 1px 2px #0003;transition:transform .25s cubic-bezier(.2,1.4,.3,1)}.cs::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:#fff;border:0;box-shadow:0 0 0 .5px #0003,0 3px 8px -1px #0000004d}.cs:active::-webkit-slider-thumb{transform:scale(1.14)}" +
    ".cr{position:relative;border-radius:32px;padding:clamp(20px,3vw,28px);color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 5%,var(--bg,#fff));border:1px solid var(--line,#0002);box-shadow:0 1px 0 #ffffff40 inset,0 30px 60px -40px #00000066;display:grid;gap:18px;justify-items:center;text-align:center;overflow:hidden}.cr:before{content:'';position:absolute;inset:-40% -20% auto;height:90%;background:radial-gradient(closest-side,color-mix(in srgb,var(--cc,#0a60d6) 22%,transparent),transparent);pointer-events:none;transition:background .6s}" +
    ".cr>*{position:relative}.cr-ring{position:relative;width:min(220px,64vw);aspect-ratio:1}.cr-ring svg{width:100%;height:100%;transform:rotate(-90deg)}.cr-ring circle{fill:none;stroke-width:12}.cr-ring .t{stroke:color-mix(in srgb,var(--fg,#111) 11%,transparent)}.cr-ring .f{stroke:var(--cc,#0a60d6);stroke-linecap:round;transition:stroke .5s}.cr-ring .k{stroke:var(--fg,#111);stroke-width:3;opacity:.55}" +
    ".cr-n{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.cr-n b{font:800 clamp(44px,12vw,56px)/1 var(--disp,system-ui);letter-spacing:-.04em;font-variant-numeric:tabular-nums}.cr-n small{margin-top:6px;font:700 11px var(--mono,monospace);letter-spacing:.09em;text-transform:uppercase;color:var(--muted,#6c6a6a)}" +
    ".cr-chip{display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;font:700 13.5px var(--sans,system-ui);background:color-mix(in srgb,var(--cc,#0a60d6) 18%,transparent);color:var(--fg,#111)}.cr-chip:before{content:'';width:9px;height:9px;border-radius:50%;background:var(--cc,#0a60d6)}" +
    ".cr-bars{width:100%;display:grid;gap:14px;text-align:left}.cr-b{display:grid;gap:6px}.cr-b div{display:flex;justify-content:space-between;align-items:baseline;font:600 13.5px var(--sans,system-ui)}.cr-b div span{color:var(--muted,#6c6a6a)}.cr-b div b{font-variant-numeric:tabular-nums;font-size:15px}.cr-tr{position:relative;height:10px;border-radius:5px;background:color-mix(in srgb,var(--fg,#111) 11%,transparent);overflow:visible}.cr-tr i{display:block;height:100%;border-radius:5px;background:var(--bc,#0a60d6);width:0;transition:background .5s}.cr-tr u{position:absolute;top:-3px;bottom:-3px;width:2px;border-radius:1px;background:var(--fg,#111);opacity:.5}" +
    ".cr-m{margin:0;font-size:14px;line-height:1.45;color:var(--muted,#6c6a6a);max-width:34ch}.cr.em .cr-bars,.cr.em .cr-chip{display:none}" +
    "#res.cr-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
    ".ct-p{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 10px}.ct-p button{appearance:none;border:1px solid var(--line,#0003);background:transparent;color:var(--fg,#111);font:600 13.5px var(--sans,system-ui);padding:8px 14px;border-radius:999px;min-height:36px;cursor:pointer;transition:transform .3s cubic-bezier(.2,1.25,.3,1),background .2s}.ct-p button:active{transform:scale(.95)}.ct-p button[aria-pressed=true]{background:var(--fg,#111);color:var(--bg,#fff);border-color:transparent}" +
    ".ct-n{display:flex;align-items:baseline;gap:10px;margin:6px 0 2px}.ct-n b{font:800 clamp(34px,8vw,44px)/1 var(--disp,system-ui);letter-spacing:-.03em;font-variant-numeric:tabular-nums}.ct-n span{color:var(--muted,#6c6a6a);font-size:14px}" +
    ".cq{position:fixed;z-index:26;left:50%;bottom:calc(76px + env(safe-area-inset-bottom,0px));transform:translate(-50%,40px) scale(.92);opacity:0;pointer-events:none;display:none;align-items:center;gap:14px;padding:9px 18px 9px 10px;border-radius:999px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 80%,transparent);-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);box-shadow:0 12px 34px -12px #00000070;font:600 13px/1.1 var(--sans,system-ui);transition:transform .55s cubic-bezier(.2,1.2,.3,1),opacity .3s;cursor:pointer;appearance:none}" +
    ".cq.on{transform:translate(-50%,0);opacity:1;pointer-events:auto}.cq i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font:800 12px var(--disp,system-ui);font-style:normal;color:#fff;background:var(--cc,#0a60d6);font-variant-numeric:tabular-nums}.cq span{display:flex;flex-direction:column;gap:3px;text-align:left}.cq small{color:var(--muted,#6c6a6a);font-weight:500;font-size:11.5px}.cq b{font-variant-numeric:tabular-nums}" +
    "@media(max-width:860px){.cq{display:flex}}" +
    "@media(prefers-reduced-motion:reduce){.cq,.cs::-webkit-slider-thumb,.ct-p button{transition:none}}@media(prefers-reduced-transparency:reduce){.cq{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){.cr,.cq{border:2px solid var(--fg,#111)}}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  /* ---- deslizadores ---- */
  function slider(id, min, max, step, tag) {
    var inp = $(id); if (!inp || inp.parentNode.querySelector(".cs")) return;
    var rg = document.createElement("input"); rg.type = "range"; rg.className = "cs"; rg.min = min; rg.max = max; rg.step = step;
    var lab = document.querySelector('label[for="' + id + '"]'); rg.setAttribute("aria-label", (lab ? lab.textContent : id) + " · " + t("deslizador", "lliscador")); rg.tabIndex = 0;
    function paint() { var v = parseFloat(rg.value), p = (v - min) / (max - min) * 100; rg.style.setProperty("--v", p + "%"); rg.style.setProperty("--c", tag === "t" ? "#0a60d6" : col(v)); }
    function fromInput() { var x = num(id); rg.value = isNaN(x) ? (tag === "t" ? 7 : (tag === "v" ? 7 : 5)) : Math.max(min, Math.min(max, x)); paint(); rg.style.opacity = isNaN(x) ? ".45" : "1"; }
    rg.addEventListener("input", function () { inp.value = fmt(parseFloat(rg.value), 1); rg.style.opacity = "1"; paint(); inp.dispatchEvent(new Event("input", { bubbles: true })); });
    inp.addEventListener("input", fromInput);
    inp.parentNode.appendChild(rg); fromInput();
  }
  ["nmb", "e_cat", "e_cast", "e_est", "e_hist", "e_mod"].forEach(function (id) { slider(id, 0, 10, .1, "e"); });
  ["v1", "v2", "v3"].forEach(function (id) { slider(id, 0, 10, .1, "v"); });

  /* ---- maqueta en dos columnas ---- */
  var lgw = form.parentNode, grid = document.createElement("div"); grid.className = "cg";
  var L = document.createElement("div"); L.className = "cg-l"; var R = document.createElement("div"); R.className = "cg-r";
  lgw.insertBefore(grid, form); grid.appendChild(L); grid.appendChild(R); L.appendChild(form);
  var h2 = [].slice.call(lgw.children).filter(function (n) { return n.tagName === "H2"; })[0], tgtBox = h2 && h2.nextElementSibling;
  if (h2 && tgtBox && tgtBox.classList.contains("calc")) { L.appendChild(h2); L.appendChild(tgtBox); }

  /* ---- tarjeta de resultado ---- */
  var C = 2 * Math.PI * 88;
  var card = document.createElement("aside"); card.className = "cr em"; card.setAttribute("aria-hidden", "true");
  card.innerHTML = '<div class="cr-ring"><svg viewBox="0 0 200 200" focusable="false"><circle class="t" cx="100" cy="100" r="88"/><circle class="f" cx="100" cy="100" r="88" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + C.toFixed(2) + '"/><line class="k" x1="100" y1="2" x2="100" y2="18" transform="rotate(180 100 100)"/></svg><div class="cr-n"><b>–</b><small>' + t("nota de acceso", "nota d’accés") + '</small></div></div>' +
    '<span class="cr-chip"></span><div class="cr-bars"><div class="cr-b"><div><span>' + t("Fase de acceso", "Fase d’accés") + '</span><b class="u">–</b></div><div class="cr-tr"><i class="bu"></i><u style="left:40%"></u></div></div><div class="cr-b"><div><span>' + t("Nota de admisión", "Nota d’admissió") + ' <small>/ 14</small></span><b class="a">–</b></div><div class="cr-tr"><i class="ba"></i></div></div></div><p class="cr-m"></p>';
  R.appendChild(card); R.appendChild(res); res.classList.add("cr-sr");
  var fR = card.querySelector(".f"), nB = card.querySelector(".cr-n b"), chip = card.querySelector(".cr-chip"), msg = card.querySelector(".cr-m"), uB = card.querySelector(".u"), aB = card.querySelector(".a"), bu = card.querySelector(".bu"), ba = card.querySelector(".ba");
  var cap = document.createElement("button"); cap.type = "button"; cap.className = "cq"; cap.setAttribute("aria-label", t("Ver el resultado completo", "Veure el resultat complet"));
  cap.innerHTML = '<i>–</i><span><small>' + t("Nota de acceso", "Nota d’accés") + "</small><b>–</b></span>"; document.body.appendChild(cap);
  cap.addEventListener("click", function () { card.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); });
  var inView = false; function updCap() { cap.classList.toggle("on", !inView && cap.dataset.has === "1"); }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { inView = en[0].isIntersecting; updCap(); }, { threshold: .2 }).observe(card);

  /* ---- número con muelle ---- */
  var cur = { n: 0, ring: 0, u: 0, a: 0 }, tg = { n: 0, ring: 0, u: 0, a: 0 }, vel = { n: 0, ring: 0, u: 0, a: 0 }, raf = 0, last = 0;
  function step(ts) {
    var dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; var moving = false;
    ["n", "ring", "u", "a"].forEach(function (k) {
      if (reduce) { cur[k] = tg[k]; vel[k] = 0; return; }
      var f = 120 * (tg[k] - cur[k]) - 17 * vel[k]; vel[k] += f * dt; cur[k] += vel[k] * dt;
      if (Math.abs(tg[k] - cur[k]) > .0008 || Math.abs(vel[k]) > .002) moving = true; else { cur[k] = tg[k]; vel[k] = 0; }
    });
    draw(); raf = moving ? requestAnimationFrame(step) : 0;
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } }
  var shown = { has: false, c: "#0a60d6" };
  function draw() {
    nB.textContent = shown.has ? fmt(cur.n) : "–";
    fR.style.strokeDashoffset = (C * (1 - Math.max(0, Math.min(1, cur.ring)))).toFixed(2);
    uB.textContent = isNaN(tg.u) || !shown.u ? "–" : fmt(cur.u); aB.textContent = shown.a ? fmt(cur.a) : "–";
    bu.style.width = Math.max(0, Math.min(100, cur.u / 10 * 100)) + "%"; ba.style.width = Math.max(0, Math.min(100, cur.a / 14 * 100)) + "%";
    cap.querySelector("i").textContent = shown.has ? fmt(cur.n, 1) : "–"; cap.querySelector("b").textContent = shown.has ? fmt(cur.n) + (shown.a ? "  ·  " + fmt(cur.a) : "") : "–";
  }
  function compute() {
    var nmb = num("nmb"), ex = [].map.call(document.querySelectorAll(".ex"), function (n) { return num(n.id); }), ok = ex.every(function (x) { return !isNaN(x) && x >= 0 && x <= 10; });
    var u = ok ? rd(ex.reduce(function (a, b) { return a + b; }, 0) / 5) : NaN, okN = !isNaN(nmb) && nmb >= 0 && nmb <= 10, m = okN && ok ? rd(.6 * nmb + .4 * u) : NaN, pass = !isNaN(m) && u >= 4 && m >= 5;
    var f = [], any = false; for (var i = 1; i <= 3; i++) { var g = num("v" + i), w = parseFloat($("w" + i).value); if (!isNaN(g)) any = true; if (!isNaN(g) && g >= 5 && g <= 10 && w > 0) f.push(g * w); }
    f.sort(function (a, b) { return b - a; }); var M = !isNaN(m) ? rd(m + (f[0] || 0) + (f[1] || 0)) : NaN;
    var c = isNaN(m) ? "#0a60d6" : (pass ? (m >= 7 ? "#30d158" : "#ff9f0a") : "#ff453a");
    card.style.setProperty("--cc", c); card.style.setProperty("--bc", c); cap.style.setProperty("--cc", c);
    card.querySelector(".bu").style.setProperty("--bc", ok ? (u >= 4 ? "#30d158" : "#ff453a") : "#0a60d6"); card.querySelector(".ba").style.setProperty("--bc", c);
    shown = { has: !isNaN(m), u: ok, a: !isNaN(M) && (any || f.length > 0), c: c };
    tg.n = isNaN(m) ? 0 : m; tg.ring = isNaN(m) ? 0 : m / 10; tg.u = ok ? u : 0; tg.a = !isNaN(M) ? M : 0;
    card.classList.toggle("em", isNaN(m) && !ok); cap.dataset.has = isNaN(m) ? "0" : "1"; updCap();
    if (isNaN(m) && ok) uB.textContent = fmt(u);
    chip.textContent = isNaN(m) ? "" : pass ? t("Acceso aprobado", "Accés aprovat") : t("Acceso no aprobado", "Accés no aprovat");
    var txt = (res.querySelector(".msg") || {}).textContent || (res.querySelector(".hint") || {}).textContent || ""; msg.textContent = isNaN(m) && !ok ? t("Mueve los deslizadores o escribe tus notas y verás el resultado aquí.", "Mou els lliscadors o escriu les teves notes i veuràs el resultat aquí.") : txt;
    kick();
    if (LS) { var o = {}; [].forEach.call(form.querySelectorAll("input:not(.cs),select"), function (n) { if (n.id) o[n.id] = n.value; }); var tt = $("tgt"); if (tt) o.tgt = tt.value; try { LS.setItem(K, JSON.stringify(o)); } catch (e) {} }
  }
  /* ---- objetivo ---- */
  var tgt = $("tgt");
  if (tgt) {
    slider("tgt", 5, 10, .1, "t");
    var chips = document.createElement("div"); chips.className = "ct-p"; chips.setAttribute("role", "group"); chips.setAttribute("aria-label", t("Objetivos rápidos", "Objectius ràpids"));
    chips.innerHTML = [[5, "Aprobar", "Aprovar"], [7, "Notable", "Notable"], [9, "Excelente", "Excel·lent"], [10, "Matrícula", "Matrícula"]].map(function (a) { return '<button type="button" data-v="' + a[0] + '" aria-pressed="false">' + a[0] + " · " + t(a[1], a[2]) + "</button>"; }).join("");
    tgt.parentNode.parentNode.insertBefore(chips, $("tres"));
    var big = document.createElement("div"); big.className = "ct-n"; big.setAttribute("aria-hidden", "true"); big.innerHTML = "<b>–</b><span></span>"; tgt.parentNode.parentNode.insertBefore(big, $("tres"));
    chips.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; tgt.value = fmt(+b.getAttribute("data-v"), 1); tgt.dispatchEvent(new Event("input", { bubbles: true })); });
    var needs = function () {
      var n = num("nmb"), s = num("tgt"), b = big.querySelector("b"), sp = big.querySelector("span");
      [].forEach.call(chips.children, function (c) { c.setAttribute("aria-pressed", String(!isNaN(s) && Math.abs(+c.getAttribute("data-v") - s) < .05)); });
      if (isNaN(n) || isNaN(s) || s < 5 || s > 10) { b.textContent = "–"; sp.textContent = t("en la fase de acceso", "a la fase d’accés"); return; }
      var x = (s - .6 * n) / .4; if (x > 10) { b.textContent = ">10"; sp.textContent = t("no se llega con este expediente", "no s’hi arriba amb aquest expedient"); } else { b.textContent = fmt(Math.max(x, 4)); sp.textContent = t("de media en la fase de acceso", "de mitjana a la fase d’accés"); }
    };
    tgt.addEventListener("input", needs); $("nmb").addEventListener("input", needs); needs();
  }
  /* ---- restaurar y escuchar ---- */
  if (LS) {
    try {
      var sv = JSON.parse(LS.getItem(K) || "null");
      if (sv && typeof sv === "object") { Object.keys(sv).forEach(function (id) { var n = $(id); if (n && (n.tagName === "INPUT" || n.tagName === "SELECT") && typeof sv[id] === "string") n.value = sv[id]; }); [].forEach.call(document.querySelectorAll(".cs"), function () {}); }
    } catch (e) {}
  }
  var kk = function () { setTimeout(compute, 0); };
  form.addEventListener("input", kk); form.addEventListener("change", kk); if (tgt) tgt.addEventListener("input", kk);
  /* tras restaurar, que el script original recalcule y los deslizadores se sincronicen */
  [].forEach.call(document.querySelectorAll("input:not(.cs)"), function (n) { if (n.value) n.dispatchEvent(new Event("input", { bubbles: true })); });
  compute(); draw();
})();
