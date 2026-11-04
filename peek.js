/* Vista previa al mantener pulsado · Menudo Kanteo
   Mantén pulsado (o clic largo) un enlace del portal: aparece una tarjeta con un resumen
   y las opciones «Abrir» y «Guardar en favoritos», sin salir de donde estás. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  var CSS = ".mkv-ov{position:fixed;inset:0;z-index:2147482000;background:rgba(0,0,0,.28);opacity:0;transition:opacity .25s;-webkit-tap-highlight-color:transparent}.mkv-ov.on{opacity:1}" +
    ".mkv{position:fixed;z-index:2147482001;left:50%;width:min(360px,calc(100vw - 28px));transform:translate(-50%,0) scale(.92);opacity:0;transform-origin:var(--ox,50%) var(--oy,50%);background:color-mix(in srgb,var(--bg,#fff) 82%,transparent);-webkit-backdrop-filter:blur(28px) saturate(180%);backdrop-filter:blur(28px) saturate(180%);color:var(--fg,#111);border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.32);padding:16px 16px 12px;font:15px/1.4 -apple-system,system-ui,sans-serif;transition:transform .5s cubic-bezier(.2,1.2,.3,1),opacity .2s}" +
    ".mkv.on{transform:translate(-50%,0) scale(1);opacity:1}.mkv small{display:block;font-size:12px;letter-spacing:.02em;opacity:.65;margin-bottom:2px}.mkv h3{margin:0 0 6px;font-size:18px;line-height:1.2;letter-spacing:-.01em}" +
    ".mkv p{margin:0 0 12px;font-size:14px;opacity:.85;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.mkv-b{display:flex;gap:8px}" +
    ".mkv-b button{flex:1;min-height:44px;border-radius:12px;border:1px solid color-mix(in srgb,currentColor 16%,transparent);background:transparent;color:inherit;font:600 15px/1 inherit;cursor:pointer;transition:transform .15s}.mkv-b button:active{transform:scale(.96)}.mkv-b .go{background:var(--ac,#0a66ff);border-color:transparent;color:#fff}.mkv-b button:focus-visible{outline:3px solid var(--ac,#0a66ff);outline-offset:2px}" +
    "a.mkv-src{transform:scale(.97);transition:transform .35s cubic-bezier(.2,1.2,.3,1)}" +
    "@media(prefers-reduced-motion:reduce){.mkv{transition:opacity .15s;transform:translate(-50%,0)!important}a.mkv-src{transform:none}}@media(prefers-reduced-transparency:reduce){.mkv{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){.mkv{background:var(--bg,#fff);border-color:currentColor}}";
  var st = document.createElement("style"); st.textContent = CSS;
  var tit = null, full = null, loading = {};
  function get(f) { return loading[f] || (loading[f] = fetch(f).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })); }
  function lang(n) { return es() && n === "buscador.json" ? "buscador.es.json" : n; }
  var ov = null, card = null, src = null, timer = 0, sx = 0, sy = 0, hold = false, supClick = false;

  function internal(a) {
    if (!a || !a.getAttribute) return null; var h = a.getAttribute("href"); if (!h || /^(#|mailto:|tel:|javascript:)/i.test(h) || a.target === "_blank" || a.hasAttribute("download")) return null;
    var u; try { u = new URL(h, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin || !/\.html$/.test(u.pathname)) return null;
    var f = u.pathname.split("/").pop(); return { file: f, rel: f + u.search + u.hash, hash: u.hash };
  }
  function info(x) {
    return Promise.all([get(lang("buscador-titols.json")), get(lang("buscador.json"))]).then(function (r) {
      var T = r[0] || [], F = r[1] || [], e = null, i;
      if (!x.hash) { for (i = 0; i < T.length; i++) if (T[i][2] === x.file) { e = [T[i][0], T[i][1], x.file, ""]; break; } if (e) return e; }
      for (i = 0; i < F.length; i++) if (F[i][2] === x.rel) { e = F[i]; break; }
      if (!e && x.hash) for (i = 0; i < F.length; i++) if (F[i][2] === x.file + x.hash) { e = F[i]; break; }
      if (!e) for (i = 0; i < T.length; i++) if (T[i][2] === x.file) { e = T[i]; break; }
      if (!e) for (i = 0; i < F.length; i++) if (F[i][2].split("#")[0] === x.file) { e = [F[i][1].split(" · ")[0], F[i][1], x.file, ""]; break; }
      if (e && !e[3]) { for (i = 0; i < F.length; i++) if (F[i][2].split("#")[0] === x.file && F[i][3]) { e = [e[0], e[1], e[2], F[i][3]]; break; } }
      return e;
    });
  }
  function close() {
    if (!card) return; var c = card, o = ov; card = ov = null; c.classList.remove("on"); o.classList.remove("on");
    if (src) { src.classList.remove("mkv-src"); src = null; }
    setTimeout(function () { c.remove(); o.remove(); }, 260);
  }
  function show(a, x, px, py) {
    info(x).then(function (e) {
      if (!hold) return; var own = (a.textContent || "").replace(/\s+/g, " ").trim(), title = e ? e[0] : own.slice(0, 60) || x.file, label = e ? e[1] : "", text = e && e[3] ? e[3].replace(/\s+/g, " ").slice(0, 260) : (own.length > title.length + 20 ? own.slice(0, 260) : "");
      close(); ov = document.createElement("div"); ov.className = "mkv-ov"; card = document.createElement("div"); card.className = "mkv"; card.setAttribute("role", "dialog"); card.setAttribute("aria-label", t("Vista previa", "Vista prèvia") + ": " + title);
      var fav = window.mkFav && window.mkFav.has(x.rel);
      card.innerHTML = (label ? "<small></small>" : "") + "<h3></h3>" + (text ? "<p></p>" : "") + '<div class="mkv-b"><button type="button" class="fv" aria-pressed="' + !!fav + '"></button><button type="button" class="go"></button></div>';
      if (label) card.querySelector("small").textContent = label; card.querySelector("h3").textContent = title; if (text) card.querySelector("p").textContent = text;
      var fb = card.querySelector(".fv"), gb = card.querySelector(".go");
      function lbl() { fb.textContent = (window.mkFav && window.mkFav.has(x.rel) ? "★ " : "☆ ") + t("Favoritos", "Favorits"); }
      lbl(); gb.textContent = t("Abrir", "Obrir");
      fb.onclick = function () { if (window.mkFav) { var on = window.mkFav.toggle(x.rel, title, label, "page"); fb.setAttribute("aria-pressed", String(on)); window.mkFx && window.mkFx.fb(on ? "fav" : "unfav"); lbl(); } };
      gb.onclick = function () { close(); location.href = a.href; };
      ov.onclick = close; document.body.appendChild(ov); document.body.appendChild(card);
      var h = card.offsetHeight, top = Math.max(12, Math.min(innerHeight - h - 12, py > innerHeight / 2 ? py - h - 24 : py + 28));
      card.style.top = top + "px"; card.style.setProperty("--ox", (px / innerWidth * 100) + "%"); card.style.setProperty("--oy", (py - top) + "px");
      src = a; if (!reduce) a.classList.add("mkv-src");
      requestAnimationFrame(function () { ov.classList.add("on"); card.classList.add("on"); }); gb.focus({ preventScroll: true });
      window.mkFx && window.mkFx.fb("open"); supClick = true; setTimeout(function () { supClick = false; }, 700);
    });
  }
  function cancel() { clearTimeout(timer); timer = 0; }
  function boot() {
    document.head.appendChild(st);
    document.addEventListener("pointerdown", function (e) {
      cancel(); hold = false; if (e.button > 0 || card) return;
      var a = e.target.closest && e.target.closest("a"), x = internal(a); if (!x || a.closest(".mk-mg,.mkp-sh,.mk-so,.mkc")) return;
      sx = e.clientX; sy = e.clientY;
      timer = setTimeout(function () { hold = true; show(a, x, sx, sy); }, e.pointerType === "mouse" ? 650 : 480);
    }, true);
    document.addEventListener("pointermove", function (e) { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 9) cancel(); }, true);
    ["pointerup", "pointercancel", "scroll"].forEach(function (n) { document.addEventListener(n, function () { cancel(); }, true); });
    document.addEventListener("click", function (e) { if (supClick && e.target.closest && e.target.closest("a")) { e.preventDefault(); e.stopPropagation(); supClick = false; } }, true);
    document.addEventListener("contextmenu", function (e) { var a = e.target.closest && e.target.closest("a"); if (a && internal(a) && (hold || card || timer)) e.preventDefault(); }, true);
    document.addEventListener("keydown", function (e) { if (card && e.key === "Escape") { e.stopPropagation(); close(); } }, true);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
