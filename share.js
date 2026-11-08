/* Menudo Kanteo — compartir el portal con un código QR. Se descarga solo al abrirlo.
   Generador de QR propio (modo byte, corrección H, versiones 1–10) y dibujo en SVG con los colores del portal. */
(function () {
  "use strict";
  if (window.mkShare) return;
  var URL_SITE = "https://lucasgranado9.github.io/Menudokanteohub/";
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- QR ---------- */
  var ECW = { L: [7, 10, 15, 20, 26, 18, 20, 24, 30, 18], M: [10, 16, 26, 18, 24, 16, 18, 22, 22, 26], Q: [13, 22, 18, 26, 18, 24, 18, 22, 20, 24], H: [17, 28, 22, 16, 22, 28, 26, 26, 24, 28] };
  var NBK = { L: [1, 1, 1, 1, 1, 2, 2, 2, 2, 4], M: [1, 1, 1, 2, 2, 4, 4, 4, 5, 5], Q: [1, 1, 2, 2, 4, 4, 6, 6, 8, 8], H: [1, 1, 2, 4, 4, 4, 5, 6, 8, 8] };
  var FMT = { L: 1, M: 0, Q: 3, H: 2 };
  function raw(v) { var r = (16 * v + 128) * v + 64; if (v >= 2) { var a = Math.floor(v / 7) + 2; r -= (25 * a - 10) * a - 55; if (v >= 7) r -= 36; } return r; }
  function mul(a, b) { var r = 0; for (var i = 7; i >= 0; i--) { r = (r << 1) ^ ((r >>> 7) * 0x11D); r ^= ((b >>> i) & 1) * a; } return r & 255; }
  function rs(data, d) {
    var g = []; for (var i = 0; i < d - 1; i++) g.push(0); g.push(1); var root = 1;
    for (i = 0; i < d; i++) { for (var j = 0; j < g.length; j++) { g[j] = mul(g[j], root); if (j + 1 < g.length) g[j] ^= g[j + 1]; } root = mul(root, 2); }
    var r = g.map(function () { return 0; });
    data.forEach(function (b) { var f = b ^ r.shift(); r.push(0); g.forEach(function (c, k) { r[k] ^= mul(c, f); }); });
    return r;
  }
  function make(text, lvl) {
    var bytes = Array.from(new TextEncoder().encode(text)), v, cap;
    for (v = 1; v <= 10; v++) { cap = Math.floor(raw(v) / 8) - ECW[lvl][v - 1] * NBK[lvl][v - 1]; if (bytes.length + 2 + (v > 9 ? 1 : 0) <= cap) break; }
    if (v > 10) throw new Error("long");
    var bits = []; function put(x, n) { for (var i = n - 1; i >= 0; i--) bits.push((x >>> i) & 1); }
    put(4, 4); put(bytes.length, v > 9 ? 16 : 8); bytes.forEach(function (b) { put(b, 8); });
    put(0, Math.min(4, cap * 8 - bits.length)); while (bits.length % 8) bits.push(0);
    var data = []; for (var i = 0; i < bits.length; i += 8) { var x = 0; for (var k = 0; k < 8; k++) x = x << 1 | bits[i + k]; data.push(x); }
    for (var pad = 0xEC; data.length < cap; pad ^= 0xEC ^ 0x11) data.push(pad);
    var nb = NBK[lvl][v - 1], el = ECW[lvl][v - 1], rc = Math.floor(raw(v) / 8), ns = nb - rc % nb, sl = Math.floor(rc / nb), blocks = [], p = 0;
    for (i = 0; i < nb; i++) { var d = data.slice(p, p + sl - el + (i < ns ? 0 : 1)); p += d.length; var e = rs(d, el); if (i < ns) d.push(0); blocks.push(d.concat(e)); }
    var out = []; for (i = 0; i < blocks[0].length; i++) blocks.forEach(function (b, j) { if (i !== sl - el || j >= ns) out.push(b[i]); });
    var n = v * 4 + 17, M = [], F = []; for (i = 0; i < n; i++) { M.push(new Array(n).fill(0)); F.push(new Array(n).fill(false)); }
    function set(x, y, b) { M[y][x] = b ? 1 : 0; F[y][x] = true; }
    for (i = 0; i < n; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    function finder(cx, cy) { for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var x = cx + dx, y = cy + dy; if (x < 0 || y < 0 || x >= n || y >= n) continue; var m = Math.max(Math.abs(dx), Math.abs(dy)); set(x, y, m !== 2 && m !== 4); } }
    finder(3, 3); finder(n - 4, 3); finder(3, n - 4);
    if (v > 1) { var na = Math.floor(v / 7) + 2, st = v === 32 ? 26 : Math.ceil((v * 4 + 4) / (na * 2 - 2)) * 2, ps = [6]; for (var q = n - 7; ps.length < na; q -= st) ps.splice(1, 0, q);
      ps.forEach(function (a, ia) { ps.forEach(function (b, ib) { if ((ia === 0 && ib === 0) || (ia === 0 && ib === na - 1) || (ia === na - 1 && ib === 0)) return; for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) set(a + dx, b + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }); }); }
    function fmt(mask, draw) {
      var dd = FMT[lvl] << 3 | mask, r = dd; for (var i = 0; i < 10; i++) r = r << 1 ^ (r >>> 9) * 0x537; var b = (dd << 10 | r) ^ 0x5412; function g(i) { return (b >>> i) & 1; }
      for (i = 0; i <= 5; i++) draw(8, i, g(i)); draw(8, 7, g(6)); draw(8, 8, g(7)); draw(7, 8, g(8)); for (i = 9; i < 15; i++) draw(14 - i, 8, g(i));
      for (i = 0; i < 8; i++) draw(n - 1 - i, 8, g(i)); for (i = 8; i < 15; i++) draw(8, n - 15 + i, g(i)); draw(8, n - 8, 1);
    }
    fmt(0, set);
    if (v >= 7) { var rm = v; for (i = 0; i < 12; i++) rm = rm << 1 ^ (rm >>> 11) * 0x1F25; var vb = v << 12 | rm; for (i = 0; i < 18; i++) { var bt = (vb >>> i) & 1, a = n - 11 + i % 3, b2 = Math.floor(i / 3); set(a, b2, bt); set(b2, a, bt); } }
    var idx = 0; for (var right = n - 1; right >= 1; right -= 2) { if (right === 6) right = 5; for (var vert = 0; vert < n; vert++) for (var j = 0; j < 2; j++) { var x = right - j, y = ((right + 1) & 2) === 0 ? n - 1 - vert : vert; if (!F[y][x] && idx < out.length * 8) { M[y][x] = (out[idx >>> 3] >>> (7 - (idx & 7))) & 1; idx++; } } }
    var MF = [function (x, y) { return (x + y) % 2 === 0; }, function (x, y) { return y % 2 === 0; }, function (x) { return x % 3 === 0; }, function (x, y) { return (x + y) % 3 === 0; }, function (x, y) { return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; }, function (x, y) { return x * y % 2 + x * y % 3 === 0; }, function (x, y) { return (x * y % 2 + x * y % 3) % 2 === 0; }, function (x, y) { return ((x + y) % 2 + x * y % 3) % 2 === 0; }];
    function pen(G) {
      var s = 0, i, j; function runs(get) { for (i = 0; i < n; i++) { var run = 1, line = ""; for (j = 0; j < n; j++) { var c = get(i, j); line += c; if (j && c === get(i, j - 1)) { run++; if (run === 5) s += 3; else if (run > 5) s++; } else run = 1; } s += (line.match(/10111010000|00001011101/g) || []).length * 40; } }
      runs(function (a, b) { return G[a][b]; }); runs(function (a, b) { return G[b][a]; });
      for (i = 0; i < n - 1; i++) for (j = 0; j < n - 1; j++) { var c = G[i][j]; if (c === G[i][j + 1] && c === G[i + 1][j] && c === G[i + 1][j + 1]) s += 3; }
      var dk = 0; G.forEach(function (r) { r.forEach(function (c) { dk += c; }); }); s += Math.floor(Math.abs(dk * 20 - n * n * 10) / (n * n)) * 10; return s;
    }
    var best = null, bm = 0, bp = 1e9;
    for (var m = 0; m < 8; m++) { var G = M.map(function (r, y) { return r.map(function (c, x) { return !F[y][x] && MF[m](x, y) ? c ^ 1 : c; }); }); fmt(m, function (x, y, b) { G[y][x] = b ? 1 : 0; }); var pe = pen(G); if (pe < bp) { bp = pe; best = G; bm = m; } }
    return { n: n, m: best, F: F };
  }

  /* ---------- dibujo ---------- */
  function svg(q, id) {
    var n = q.n, pad = 3, S = n + pad * 2, c0 = n / 2, o = [], mid = Math.round(n * .16) | 1, a = Math.floor(c0 - mid / 2);
    function inFinder(x, y) { return (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8); }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      if (!q.m[y][x] || inFinder(x, y)) continue;
      if (x >= a - 1 && x <= a + mid && y >= a - 1 && y <= a + mid) continue;
      o.push('<rect x="' + (x + pad + .05) + '" y="' + (y + pad + .05) + '" width=".9" height=".9" rx=".38"/>');
    }
    function eye(x, y) { var X = x + pad, Y = y + pad; return '<rect x="' + (X + .5) + '" y="' + (Y + .5) + '" width="6" height="6" rx="1.1" fill="none" stroke-width="1"/><rect x="' + (X + 2) + '" y="' + (Y + 2) + '" width="3" height="3" rx=".6"/>'; }
    var ctr = pad + a - .4, sz = mid + .8;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + S + " " + S + '" width="' + (S * 12) + '" height="' + (S * 12) + '" role="img" aria-label="' + t("Código QR para abrir Menudo Kanteo", "Codi QR per obrir Menudo Kanteo") + '"><defs><linearGradient id="g' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + S + '" y2="' + S + '"><stop offset="0" stop-color="#d4143a"/><stop offset=".55" stop-color="#b3239a"/><stop offset="1" stop-color="#5b2fd6"/></linearGradient></defs><rect width="' + S + '" height="' + S + '" fill="#fff"/><g fill="url(#g' + id + ')" stroke="url(#g' + id + ')">' + '<g stroke="none">' + o.join("") + "</g>" + eye(0, 0) + eye(n - 7, 0) + eye(0, n - 7) + '<g stroke="none"><rect x="' + ctr + '" y="' + ctr + '" width="' + sz + '" height="' + sz + '" rx="' + (sz * .3) + '"/></g></g><text x="' + (c0 + pad) + '" y="' + (c0 + pad + sz * .17) + '" text-anchor="middle" font-family="-apple-system,system-ui,Segoe UI,Roboto,sans-serif" font-weight="800" font-size="' + (sz * .46) + '" fill="#fff" letter-spacing="-.03em">MK</text></svg>';
  }

  /* ---------- hoja ---------- */
  var sh, ov, last, qsvg, openF = false;
  function css() {
    if (document.getElementById("mksh-css")) return;
    var s = document.createElement("style"); s.id = "mksh-css";
    s.textContent = ".mksh-ov{position:fixed;inset:0;z-index:2147483100;background:rgba(0,0,0,.38);opacity:0;visibility:hidden;transition:opacity .35s,visibility 0s .35s;-webkit-tap-highlight-color:transparent}.mksh-ov.on{opacity:1;visibility:visible;transition:opacity .35s}" +
      ".mksh{position:fixed;z-index:2147483101;left:50%;bottom:max(10px,env(safe-area-inset-bottom,0px));width:min(430px,calc(100vw - 20px));max-height:calc(100dvh - 24px);overflow:auto;overscroll-behavior:contain;box-sizing:border-box;padding:10px 20px 22px;border-radius:34px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 80%,transparent);-webkit-backdrop-filter:blur(34px) saturate(190%);backdrop-filter:blur(34px) saturate(190%);box-shadow:0 40px 90px -24px rgba(0,0,0,.55),inset 0 0 0 .5px color-mix(in srgb,var(--fg,#111) 14%,transparent),inset 0 1px 0 rgba(255,255,255,.35);transform:translate(-50%,calc(100% + 40px));visibility:hidden;transition:transform .6s cubic-bezier(.32,.72,0,1),visibility 0s .6s;font-family:var(--sans,-apple-system,system-ui,sans-serif);text-align:center}" +
      ".mksh.on{transform:translate(-50%,var(--dy,0px));visibility:visible;transition:transform .6s cubic-bezier(.3,1.18,.5,1)}.mksh.dr{transition:none}" +
      ".mksh-gr{display:block;width:44px;height:26px;margin:0 auto;border:0;background:transparent;cursor:grab;touch-action:none}.mksh-gr:before{content:'';display:block;width:38px;height:5px;margin:10px auto 0;border-radius:3px;background:color-mix(in srgb,var(--fg,#111) 28%,transparent)}" +
      ".mksh h2{margin:6px 0 4px;font:800 24px/1.1 var(--disp,inherit);letter-spacing:-.03em}.mksh p{margin:0 auto;max-width:30ch;font-size:15px;line-height:1.4;color:var(--muted,#6c6a6a)}" +
      ".mksh-q{position:relative;margin:18px auto 14px;width:min(264px,70vw);aspect-ratio:1;padding:14px;box-sizing:border-box;border-radius:30px;background:#fff;box-shadow:0 18px 40px -18px rgba(0,0,0,.45),0 0 0 .5px rgba(0,0,0,.08);transform:scale(.86) rotate(-3deg);opacity:0;transition:transform .8s cubic-bezier(.3,1.35,.5,1) .12s,opacity .35s .12s}.mksh.on .mksh-q{transform:none;opacity:1}.mksh-q svg{display:block;width:100%;height:100%;border-radius:12px}" +
      ".mksh-u{display:inline-block;margin:0 0 16px;padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);font:600 13px var(--mono,ui-monospace,monospace);color:var(--fg,#111);overflow-wrap:anywhere}" +
      ".mksh-b{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mksh-b button{min-height:50px;padding:0 16px;border:0;border-radius:16px;font:650 16px var(--sans,inherit);color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);cursor:pointer;transition:transform .45s cubic-bezier(.3,1.5,.5,1),background .2s}.mksh-b button:active{transform:scale(.95)}.mksh-b button.p{grid-column:1/-1;color:#fff;background:linear-gradient(135deg,#d4143a,#7c3aed)}.mksh-b button:focus-visible{outline:3px solid #0a84ff;outline-offset:2px}" +
      ".mksh-n{min-height:20px;margin:12px 0 0!important;font-size:13.5px!important;max-width:none!important}" +
      "@media(min-width:700px){.mksh{bottom:auto;top:50%;transform:translate(-50%,-44%) scale(.94);opacity:0;transition:transform .5s cubic-bezier(.3,1.25,.5,1),opacity .25s,visibility 0s .5s}.mksh.on{transform:translate(-50%,-50%);opacity:1;transition:transform .55s cubic-bezier(.3,1.25,.5,1),opacity .25s}.mksh-gr{display:none}}" +
      "@media(prefers-reduced-motion:reduce){.mksh,.mksh.on,.mksh-q{transition:opacity .2s,visibility 0s!important;transform:translate(-50%,0)!important}.mksh-q{transform:none!important}@media(min-width:700px){.mksh,.mksh.on{transform:translate(-50%,-50%)!important}}}" +
      "@media(prefers-reduced-transparency:reduce){.mksh{-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--bg,#fff)}}@media(prefers-contrast:more){.mksh{background:var(--bg,#fff);outline:2px solid var(--fg,#111)}.mksh-b button{box-shadow:inset 0 0 0 1.5px var(--fg,#111)}}@media print{.mksh,.mksh-ov{display:none}}";
    document.head.appendChild(s);
  }
  function note(m) { var n = sh.querySelector(".mksh-n"); n.textContent = ""; setTimeout(function () { n.textContent = m; }, 30); }
  function png() {
    return new Promise(function (res, rej) {
      var img = new Image(), u = URL.createObjectURL(new Blob([qsvg], { type: "image/svg+xml" }));
      img.onload = function () { var c = document.createElement("canvas"), S = 1024; c.width = c.height = S; var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, S, S); x.drawImage(img, 0, 0, S, S); URL.revokeObjectURL(u); c.toBlob(function (b) { b ? res(b) : rej(); }, "image/png"); };
      img.onerror = rej; img.src = u;
    });
  }
  function build() {
    css(); var q = make(URL_SITE, "H"); qsvg = svg(q, "q");
    ov = document.createElement("div"); ov.className = "mksh-ov";
    sh = document.createElement("div"); sh.className = "mksh"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true"); sh.setAttribute("aria-labelledby", "mksh-t"); sh.setAttribute("inert", "");
    sh.innerHTML = '<button type="button" class="mksh-gr" aria-label="' + t("Cerrar", "Tanca") + '"></button><h2 id="mksh-t">' + t("Comparte Menudo Kanteo", "Comparteix Menudo Kanteo") + "</h2><p>" + t("Escanéalo con la cámara para abrir el portal de Mates, Física y Filosofía.", "Escaneja’l amb la càmera per obrir el portal de Mates, Física i Filosofia.") + '</p><div class="mksh-q">' + qsvg + '</div><span class="mksh-u" translate="no">lucasgranado9.github.io/Menudokanteohub</span>' +
      '<div class="mksh-b"><button type="button" class="p" data-s="share">' + t("Compartir", "Comparteix") + '</button><button type="button" data-s="copy">' + t("Copiar enlace", "Copia l’enllaç") + '</button><button type="button" data-s="img">' + t("Guardar imagen", "Desa la imatge") + '</button></div><p class="mksh-n" role="status"></p>';
    document.body.appendChild(ov); document.body.appendChild(sh);
    ov.addEventListener("click", function () { toggle(false); });
    sh.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return; var a = b.getAttribute("data-s");
      if (b.classList.contains("mksh-gr")) return toggle(false);
      if (a === "share") { if (navigator.share) navigator.share({ title: "Menudo Kanteo", text: t("Estudia Mates, Física y Filosofía con Menudo Kanteo", "Estudia Mates, Física i Filosofia amb Menudo Kanteo"), url: URL_SITE }).catch(function () { }); else copy(); }
      else if (a === "copy") copy();
      else if (a === "img") png().then(function (bl) { var f = new File([bl], "menudo-kanteo-qr.png", { type: "image/png" }); if (navigator.canShare && navigator.canShare({ files: [f] }) && /iPhone|iPad|Android/i.test(navigator.userAgent)) navigator.share({ files: [f], title: "Menudo Kanteo" }).catch(function () { }); else { var u = URL.createObjectURL(bl), l = document.createElement("a"); l.href = u; l.download = f.name; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); note(t("Imagen guardada", "Imatge desada")); } }, function () { note(t("No se pudo crear la imagen", "No s’ha pogut crear la imatge")); });
    });
    function copy() { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(URL_SITE).then(function () { note(t("Enlace copiado", "Enllaç copiat")); }, function () { note(URL_SITE); }); else note(URL_SITE); }
    addEventListener("keydown", function (e) {
      if (!openF) return; if (e.key === "Escape") { e.preventDefault(); toggle(false); }
      else if (e.key === "Tab") { var f = [].slice.call(sh.querySelectorAll("button")).filter(function (x) { return x.offsetParent !== null; }), i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    });
    /* arrastrar hacia abajo para cerrar: sigue al dedo, resiste y proyecta con la velocidad */
    var y0 = 0, dy = 0, hist = [], on = false;
    sh.addEventListener("pointerdown", function (e) { if (innerWidth >= 700 || e.target.closest(".mksh-b") || (sh.scrollTop > 0)) return; on = true; y0 = e.clientY; dy = 0; hist = [[performance.now(), e.clientY]]; sh.classList.add("dr"); try { sh.setPointerCapture(e.pointerId); } catch (x) { } });
    sh.addEventListener("pointermove", function (e) { if (!on) return; dy = e.clientY - y0; hist.push([performance.now(), e.clientY]); if (hist.length > 6) hist.shift(); var m = dy < 0 ? -(Math.abs(dy) * 60) / (60 + Math.abs(dy) * .55) * .55 : dy; sh.style.setProperty("--dy", m + "px"); });
    function end() { if (!on) return; on = false; sh.classList.remove("dr"); var a = hist[0], z = hist[hist.length - 1], v = z[0] > a[0] ? (z[1] - a[1]) / (z[0] - a[0]) * 1000 : 0, proj = dy + v / 1000 * .998 / (1 - .998); if (proj > 160 || dy > 120) toggle(false); else sh.style.setProperty("--dy", "0px"); }
    sh.addEventListener("pointerup", end); sh.addEventListener("pointercancel", end);
  }
  function toggle(on) {
    if (!sh) build(); openF = on == null ? !openF : on;
    if (openF) { last = document.activeElement; sh.style.setProperty("--dy", "0px"); sh.removeAttribute("inert"); ov.classList.add("on"); requestAnimationFrame(function () { requestAnimationFrame(function () { sh.classList.add("on"); }); }); setTimeout(function () { var p = sh.querySelector(".p"); p && p.focus({ preventScroll: true }); }, 120); }
    else { sh.classList.remove("on"); ov.classList.remove("on"); sh.setAttribute("inert", ""); sh.querySelector(".mksh-n").textContent = ""; last && last.focus && document.contains(last) && last.focus({ preventScroll: true }); }
  }
  window.mkShare = { open: function () { toggle(true); }, close: function () { toggle(false); }, make: make };
})();
