/* Racha de días estudiados · Menudo Kanteo
   Guarda solo en este navegador (localStorage «mk-streak»). La primera entrada no muestra nada. */
(function () {
  "use strict";
  var LS, K = "mk-streak", st, first, prevN = 0, rewarded = false, changed = false;
  try { LS = window.localStorage; LS.getItem(K); } catch (e) { return; }
  function iso(d) { var m = d.getMonth() + 1, x = d.getDate(); return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (x < 10 ? "0" : "") + x; }
  var now = new Date(), today = iso(now), yd = new Date(now); yd.setDate(yd.getDate() - 1);
  var yest = iso(yd), raw = null;
  try { raw = JSON.parse(LS.getItem(K)); } catch (e) { raw = null; }
  if (!raw || typeof raw !== "object") raw = null;
  first = !raw;
  st = raw || { n: 0, b: 0, h: [], m: 0, d: "" };
  st.h = Array.isArray(st.h) ? st.h : [];
  prevN = st.n | 0;
  if (st.d !== today) {
    st.n = st.d === yest ? (st.n | 0) + 1 : 1;
    st.d = today; changed = true;
    st.b = Math.max(st.b | 0, st.n);
    st.h = st.h.concat(today).slice(-60);
    if (st.n % 6 === 0) { st.m = (st.m | 0) + 1; rewarded = true; }
  }
  try { LS.setItem(K, JSON.stringify(st)); } catch (e) {}

  var q = /[?&]racha\b/.test(location.search);
  if (first && !q) return;                       // primera entrada: ya sale la bienvenida
  if (navigator.webdriver && !q) return;         // pruebas automáticas
  try { if (!q && sessionStorage.getItem("mkst")) return; sessionStorage.setItem("mkst", "1"); } catch (e) {}
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function plural(n, s, p) { return n + " " + (n === 1 ? s : p); }

  var CSS = ".mkst{position:fixed;z-index:400;left:50%;top:max(10px,env(safe-area-inset-top,0px));width:112px;max-width:calc(100vw - 24px);transform:translate(-50%,-150%);opacity:0;border-radius:30px;padding:8px 14px 8px 10px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 80%,transparent);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);box-shadow:0 14px 40px -12px #0000005c,0 1px 0 #ffffff40 inset;font:500 13px/1.3 system-ui,-apple-system,'IBM Plex Sans',sans-serif;touch-action:none;user-select:none;-webkit-user-select:none;transition:width .62s cubic-bezier(.2,1.2,.3,1),border-radius .5s cubic-bezier(.2,1.1,.3,1),transform .6s cubic-bezier(.2,1.15,.3,1),opacity .35s}" +
    ".mkst.in{transform:translate(-50%,0);opacity:1}.mkst.ex{width:min(348px,calc(100vw - 24px));border-radius:26px}.mkst.dr{transition:none}" +
    ".mkst-p{display:flex;align-items:center;gap:10px;min-height:40px}.mkst-f{flex:none;width:30px;height:30px;transform-origin:50% 90%}.mkst:not(.reduce) .mkst-f{animation:mkfl 2.4s ease-in-out infinite}@keyframes mkfl{50%{transform:scale(1.05,.95) rotate(-1.5deg)}}" +
    ".mkst-n{font:800 24px/1 system-ui,-apple-system,sans-serif;letter-spacing:-.03em;font-variant-numeric:tabular-nums;min-width:.6em}" +
    ".mkst-t{display:flex;flex-direction:column;gap:2px;min-width:0;opacity:0;transform:translateX(-6px);transition:opacity .35s,transform .5s cubic-bezier(.2,1.1,.3,1);flex:1}.mkst.ex .mkst-t{opacity:1;transform:none;transition-delay:.12s}" +
    ".mkst-t strong{font-size:14px;font-weight:700;letter-spacing:-.005em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mkst-t span{color:var(--muted,#6c6a6a);font-size:12px;letter-spacing:.005em}" +
    ".mkst-x{flex:none;width:30px;height:30px;border:0;border-radius:50%;background:color-mix(in srgb,var(--fg,#111) 9%,transparent);color:inherit;font-size:17px;line-height:1;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .3s}.mkst.ex .mkst-x{opacity:1;pointer-events:auto}" +
    ".mkst-w{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-height:0;opacity:0;overflow:hidden;transition:max-height .55s cubic-bezier(.2,1.1,.3,1),opacity .35s,margin .4s}.mkst.ex .mkst-w{max-height:64px;opacity:1;margin-top:8px;transition-delay:.08s}" +
    ".mkst-w i{display:flex;flex-direction:column;align-items:center;gap:4px;font-style:normal;font-size:10.5px;font-weight:600;color:var(--muted,#6c6a6a);text-transform:uppercase}.mkst-w i b{width:22px;height:22px;border-radius:50%;background:color-mix(in srgb,var(--fg,#111) 10%,transparent);display:grid;place-items:center;transition:transform .5s cubic-bezier(.2,1.4,.3,1),background .3s}" +
    ".mkst-w i.on b{background:linear-gradient(160deg,#ffb340,#ff6a1a);color:#fff;transform:scale(1.06)}.mkst-w i.on b:after{content:'';width:9px;height:5px;border:2px solid #fff;border-top:0;border-right:0;transform:rotate(-45deg) translate(1px,-1px)}.mkst-w i.td b{box-shadow:0 0 0 2px var(--bg,#fff),0 0 0 3.5px #ff8a1f}" +
    ".mkst-m{display:inline-flex;align-items:center;gap:4px;margin-left:6px;font-weight:700;font-size:11.5px;color:#a96500}.mkst-m svg{width:13px;height:13px}" +
    ".mkst-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
    ".mk-rw{position:fixed;inset:0;z-index:410;display:grid;place-items:center;padding:16px;background:#00000066;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);opacity:0;transition:opacity .4s}.mk-rw.on{opacity:1}" +
    ".mk-rwc{position:relative;width:min(380px,100%);padding:30px 24px 22px;border-radius:30px;text-align:center;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 90%,transparent);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 30px 80px -20px #000a;transform:translateY(24px) scale(.94);transition:transform .7s cubic-bezier(.2,1.25,.3,1)}.mk-rw.on .mk-rwc{transform:none}" +
    ".mk-rwm{width:148px;height:148px;margin:0 auto 14px;perspective:700px}.mk-rwm svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 14px 18px #8a550055);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .25s ease-out}.mk-rw.on:not(.reduce) .mk-rwm svg{animation:mkpopm .9s cubic-bezier(.2,1.4,.3,1) both}@keyframes mkpopm{0%{transform:scale(.3) rotate(-25deg);opacity:0}100%{opacity:1}}" +
    ".mk-rwc h2{margin:0;font:800 26px/1.1 system-ui,-apple-system,sans-serif;letter-spacing:-.03em}.mk-rwc p{margin:10px 0 0;color:var(--muted,#6c6a6a);font-size:14.5px;line-height:1.5}" +
    ".mk-rwc .mk-rwn{margin-top:14px;display:inline-block;padding:5px 12px;border-radius:999px;background:#ffb34026;color:#9a5a00;font-weight:700;font-size:13px}" +
    ".mk-rwb{display:block;width:100%;margin-top:18px;border:0;border-radius:16px;padding:14px;font:700 16px/1 system-ui,-apple-system,sans-serif;background:linear-gradient(180deg,#ff9f0a,#ff6a1a);color:#fff;cursor:pointer;transition:transform .2s cubic-bezier(.2,1.2,.3,1)}.mk-rwb:active{transform:scale(.97)}" +
    ".mkst button:focus-visible,.mk-rwb:focus-visible{outline:3px solid #0a84ff;outline-offset:2px}" +
    ".mk-cf{position:absolute;inset:0;pointer-events:none;overflow:hidden}.mk-cf i{position:absolute;left:50%;top:42%;width:8px;height:14px;border-radius:2px;opacity:0;animation:mkcf 1.9s cubic-bezier(.15,.7,.3,1) forwards}@keyframes mkcf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--r))}}" +
    "@media(prefers-reduced-motion:reduce){.mkst,.mkst *,.mk-rw,.mk-rwc,.mk-rwm svg{transition:opacity .2s!important;animation:none!important}.mkst{transform:translate(-50%,0)}.mkst.ex{width:min(348px,calc(100vw - 24px))}.mk-rwc{transform:none}}" +
    "@media(prefers-reduced-transparency:reduce){.mkst,.mk-rwc{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}.mk-rw{background:#000b;-webkit-backdrop-filter:none;backdrop-filter:none}}" +
    "@media(prefers-contrast:more){.mkst,.mk-rwc{border:2px solid var(--fg,#111)}}@media print{.mkst,.mk-rw{display:none!important}}";

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var FLAME = function (gold) {
    var id = "mkf" + (gold ? "g" : "o");
    return '<svg class="mkst-f" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><defs><linearGradient id="' + id + '" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="' + (gold ? "#ff9f0a" : "#ff453a") + '"/><stop offset="1" stop-color="' + (gold ? "#ffe066" : "#ffb340") + '"/></linearGradient></defs><path fill="url(#' + id + ')" d="M16.6 2.2c.4 3.6-1.4 5.7-3.3 8-2 2.4-4.6 5-4.6 9.3A7.3 7.3 0 0 0 16 27a7.3 7.3 0 0 0 7.3-7.5c0-2.6-1.2-4.6-2.4-6-.3 1.6-1 2.6-2 3 .6-3.8-.2-8.2-2.3-14.3z"/><path fill="#fff" fill-opacity=".55" d="M16 27a4 4 0 0 1-4-4.1c0-2 1.4-3.2 2.4-4.6.5-.8.8-1.7.8-2.8 1.3 1.3 2.2 2.8 2.9 4 .8 1.5 1.1 2.4.4 4.1A3.7 3.7 0 0 1 16 27z"/></svg>';
  };
  var MEDAL = function (n) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><linearGradient id="mkmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".45" stop-color="#ffc83d"/><stop offset="1" stop-color="#d68a00"/></linearGradient><linearGradient id="mkmr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a4d"/><stop offset="1" stop-color="#d1262b"/></linearGradient><linearGradient id="mksh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="mkcl"><circle cx="60" cy="68" r="40"/></clipPath></defs><path d="M34 6h20l12 32-18 8z" fill="url(#mkmr)"/><path d="M86 6H66L54 38l18 8z" fill="#ff8a7a"/><circle cx="60" cy="68" r="44" fill="#b87400"/><circle cx="60" cy="68" r="40" fill="url(#mkmg)"/><circle cx="60" cy="68" r="32" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M60 46c.5 4-1.6 6.3-3.6 8.8-2.2 2.6-5 5.4-5 10.2A8 8 0 0 0 60 73.4 8 8 0 0 0 68.1 65c0-2.9-1.3-5-2.6-6.6-.3 1.7-1.1 2.8-2.2 3.3.7-4.2-.2-9-2.6-15.7z" fill="#fff" fill-opacity=".92" transform="translate(0,-2)"/><text x="60" y="95" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="800" font-size="19" fill="#8a5200">' + n + '</text><g clip-path="url(#mkcl)"><rect x="-60" y="20" width="40" height="110" fill="url(#mksh)" transform="rotate(20 60 68)"><animate attributeName="x" values="-60;150" dur="2.6s" begin="0.8s;4s" repeatCount="indefinite"/></rect></g></svg>';
  };

  var card, timer, shown = false, hold = false;
  function build() {
    var s = el("style"); s.textContent = CSS; document.head.appendChild(s);
    var n = st.n, gold = n >= 6, plain = es();
    var title = n === 1 ? t("Empiezas una racha", "Comences una ratxa") : t("Racha de " + n + " días", "Ratxa de " + n + " dies");
    var sub;
    if (rewarded) sub = t("¡Insignia desbloqueada!", "Insígnia desbloquejada!");
    else if (!changed) sub = t("Hoy ya cuenta. Mañana, " + (n + 1) + ".", "Avui ja compta. Demà, " + (n + 1) + ".");
    else if (n === 1 && prevN > 1) sub = t("Vuelves a empezar. Tu mejor: " + plural(st.b, "día", "días") + ".", "Tornes a començar. La teva millor: " + plural(st.b, "dia", "dies") + ".");
    else { var left = 6 - (n % 6); sub = t("Te faltan " + plural(left, "día", "días") + " para la insignia.", "Et falten " + plural(left, "dia", "dies") + " per a la insígnia."); }
    card = el("div", "mkst" + (reduce ? " reduce" : ""));
    card.setAttribute("role", "status");
    card.setAttribute("aria-live", "polite");
    var set = {}, i; st.h.forEach(function (d) { set[d] = 1; });
    var dots = "";
    for (i = 6; i >= 0; i--) {
      var d = new Date(now); d.setDate(d.getDate() - i);
      var k = iso(d), lab = d.toLocaleDateString(es() ? "es" : "ca", { weekday: "narrow" });
      dots += '<i class="' + (set[k] ? "on" : "") + (i === 0 ? " td" : "") + '"><b></b><span aria-hidden="true">' + lab + "</span></i>";
    }
    var medals = st.m ? '<span class="mkst-m" title="' + t("Insignias", "Insígnies") + '">' + MEDAL(6).replace(/<svg /, '<svg width="13" height="13" ').replace(/id="mk/g, 'id="mkq').replace(/#mk/g, "#mkq") + st.m + "</span>" : "";
    card.innerHTML = '<div class="mkst-p">' + FLAME(gold) + '<div class="mkst-n" aria-hidden="true">' + (reduce ? n : Math.max(0, n - 1)) + '</div><div class="mkst-t"><strong>' + title + medals + "</strong><span>" + sub + '</span></div><button type="button" class="mkst-x" aria-label="' + t("Cerrar", "Tanca") + '">×</button></div><div class="mkst-w" aria-hidden="true">' + dots + '</div><span class="mkst-sr">' + title + ". " + sub + "</span>";
    document.body.appendChild(card);
    card.querySelector(".mkst-x").addEventListener("click", function (e) { e.stopPropagation(); close(); });
    card.addEventListener("click", function () { if (!card.classList.contains("dr")) card.classList.toggle("ex"); schedule(); });
    card.addEventListener("pointerenter", function () { hold = true; });
    card.addEventListener("pointerleave", function () { hold = false; schedule(); });
    card.addEventListener("focusin", function () { hold = true; });
    card.addEventListener("focusout", function () { hold = false; schedule(); });
    drag(card);
    addEventListener("keydown", function esc(e) { if (e.key === "Escape" && card && card.isConnected) { close(); removeEventListener("keydown", esc); } });
  }
  function count(to) {
    var out = card.querySelector(".mkst-n"), from = Math.max(0, to - 1), t0 = performance.now(), D = 800;
    function f(now) { var p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 4); out.textContent = Math.round(from + (to - from) * e); if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  function schedule() {
    clearTimeout(timer);
    if (!card || !card.isConnected) return;
    timer = setTimeout(function () { if (hold) return schedule(); close(); }, 5200);
  }
  function close() {
    if (!card) return;
    clearTimeout(timer);
    card.classList.remove("ex", "in");
    var c = card; card = null;
    setTimeout(function () { c.remove(); }, 700);
  }
  function drag(c) {
    var y0 = 0, dy = 0, id = null, hist = [];
    c.addEventListener("pointerdown", function (e) { if (e.target.closest(".mkst-x")) return; id = e.pointerId; y0 = e.clientY; dy = 0; hist = [[e.clientY, e.timeStamp]]; });
    c.addEventListener("pointermove", function (e) {
      if (e.pointerId !== id) return;
      var d = e.clientY - y0;
      if (Math.abs(d) < 6 && !c.classList.contains("dr")) return;
      c.classList.add("dr"); try { c.setPointerCapture(id); } catch (x) {}
      dy = d > 0 ? d * 0.55 / (1 + d / 120) : d; // arriba 1:1, abajo con resistencia
      c.style.transform = "translate(-50%," + dy + "px)";
      hist.push([e.clientY, e.timeStamp]); if (hist.length > 5) hist.shift();
    });
    function end(e) {
      if (e.pointerId !== id) return; id = null;
      if (!c.classList.contains("dr")) return;
      var a = hist[0], b = hist[hist.length - 1], v = b[1] > a[1] ? (b[0] - a[0]) / (b[1] - a[1]) : 0; // px/ms
      var proj = dy + v * 220; // proyección: adónde iría con su inercia
      c.classList.remove("dr");
      c.style.transform = "";
      if (dy < -26 || proj < -70) close(); else schedule();
      setTimeout(function () { c.classList.remove("dr"); }, 0);
    }
    c.addEventListener("pointerup", end); c.addEventListener("pointercancel", end);
  }

  function reward() {
    var n = st.m, ov = el("div", "mk-rw" + (reduce ? " reduce" : ""));
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "mk-rwh");
    ov.innerHTML = '<div class="mk-rwc"><div class="mk-rwm">' + MEDAL(st.n) + '</div><h2 id="mk-rwh">' + t("¡" + st.n + " días seguidos!", st.n + " dies seguits!") + "</h2><p>" + t("Has desbloqueado la insignia «Constancia». Estudiar un poco cada día es lo que más sube la nota.", "Has desbloquejat la insígnia «Constància». Estudiar una mica cada dia és el que més puja la nota.") + '</p><span class="mk-rwn">' + t(plural(n, "insignia conseguida", "insignias conseguidas"), plural(n, "insígnia aconseguida", "insígnies aconseguides")) + '</span><button type="button" class="mk-rwb">' + t("Genial", "Genial") + '</button><div class="mk-cf"></div></div>';
    document.body.appendChild(ov);
    var prev = document.activeElement, btn = ov.querySelector(".mk-rwb");
    function done() { ov.classList.remove("on"); removeEventListener("keydown", key); setTimeout(function () { ov.remove(); prev && prev.focus && prev.focus({ preventScroll: true }); }, 400); }
    function key(e) { if (e.key === "Escape" || (e.key === "Tab")) { e.preventDefault(); if (e.key === "Escape") done(); else btn.focus(); } }
    btn.addEventListener("click", done);
    ov.addEventListener("click", function (e) { if (e.target === ov) done(); });
    addEventListener("keydown", key);
    var m = ov.querySelector(".mk-rwm svg");
    ov.addEventListener("pointermove", function (e) { if (reduce) return; var r = m.getBoundingClientRect(), x = (e.clientX - r.left - r.width / 2) / 260, y = (e.clientY - r.top - r.height / 2) / 260; m.style.setProperty("--ry", Math.max(-18, Math.min(18, x * 20)) + "deg"); m.style.setProperty("--rx", Math.max(-18, Math.min(18, -y * 20)) + "deg"); });
    requestAnimationFrame(function () { ov.classList.add("on"); btn.focus({ preventScroll: true }); });
    window.mkSnd && window.mkSnd("ok");
    if (!reduce) {
      var cf = ov.querySelector(".mk-cf"), cols = ["#ff453a", "#ff9f0a", "#ffd60a", "#32d74b", "#0a84ff", "#bf5af2"], j;
      for (j = 0; j < 34; j++) {
        var p = el("i"), a = Math.random() * Math.PI - Math.PI * 1.0, sp = 140 + Math.random() * 190;
        p.style.background = cols[j % cols.length];
        p.style.setProperty("--x", (Math.cos(a) * sp).toFixed(0) + "px");
        p.style.setProperty("--y", (Math.sin(a) * sp * 0.8 + 160 + Math.random() * 140).toFixed(0) + "px");
        p.style.setProperty("--r", (Math.random() * 720 - 360).toFixed(0) + "deg");
        p.style.animationDelay = (Math.random() * 0.18).toFixed(2) + "s";
        cf.appendChild(p);
      }
    }
  }

  function show() {
    if (shown) return; shown = true;
    if (document.querySelector(".mk-wl")) return;  // bienvenida abierta: no se pisa
    build();
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      card.classList.add("in");
      if (!reduce) count(st.n);
      setTimeout(function () { card && card.classList.add("ex"); }, reduce ? 0 : 750);
      schedule();
      if (rewarded) setTimeout(function () { close(); setTimeout(reward, 350); }, reduce ? 900 : 2300);
    }); });
  }
  window.mkStreak = { data: st, show: function () { shown = false; show(); } };
  function go() { setTimeout(show, 700); }
  if (document.readyState === "complete") go(); else addEventListener("load", go);
})();
