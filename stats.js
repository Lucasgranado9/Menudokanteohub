/* Menudo Kanteo — Estadísticas, repaso espaciado, cuenta atrás de la PAU y copia de datos.
   Todo se queda en este navegador (localStorage): «mk-time» (tiempo de estudio), «mk-rv» (repasos),
   «mk-pau» (fecha del examen). Lee «mk-done», «mk-streak» y «mk-fav». */
(function () {
  "use strict";
  var LS; try { LS = window.localStorage; LS.getItem("mk-x"); } catch (e) { LS = null; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function g(k, d) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function s(k, v) { try { LS.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch (e) {} }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function iso(d) { var m = d.getMonth() + 1, x = d.getDate(); return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (x < 10 ? "0" : "") + x; }
  function fb(n) { try { window.mkFx && window.mkFx.fb(n); } catch (e) {} }
  if (!LS) { window.mkStats = { open: function () {} }; return; }

  /* ---------- catálogo de problemas: [materia, tema, nº de problemas, es, ca] ---------- */
  var CAT = [["m",1,8,"Derivadas","Derivades"],["m",2,8,"Funciones continuas y derivables","Funcions contínues i derivables"],["m",3,9,"Aplicaciones de la derivada","Aplicacions de la derivada"],["m",4,9,"Primitivas","Primitives"],["m",5,8,"La integral","La integral"],["m",6,8,"Vectores en el espacio","Vectors a l’espai"],["m",7,8,"Matrices y determinantes","Matrius i determinants"],["m",8,9,"Sistemas de ecuaciones lineales","Sistemes d’equacions lineals"],["m",9,8,"Ecuaciones de rectas y planos","Equacions de rectes i plans"],["m",10,8,"Posición relativa de rectas y planos","Posició relativa de rectes i plans"],["m",11,9,"Distancias y ángulos","Distàncies i angles"],["m",12,9,"Probabilidad","Probabilitat"],["f",1,8,"Campo Gravitatorio","Camp Gravitatori"],["f",2,8,"Campo Eléctrico","Camp Elèctric"],["f",3,8,"Campo Magnético","Camp Magnètic"],["f",4,8,"Inducción Electromagnética","Inducció Electromagnètica"],["f",5,8,"Oscilaciones y Ondas","Oscil·lacions i Ones"],["f",6,9,"El Sonido y los Fenómenos Ondulatorios","El So i els Fenòmens Ondulatoris"],["f",7,8,"Ondas Electromagnéticas y la Luz","Ones Electromagnètiques i la Llum"],["f",8,10,"Óptica Geométrica","Òptica Geomètrica"],["f",9,10,"Física Cuántica","Física Quàntica"],["f",10,9,"Teoría de la Relatividad","Teoria de la Relativitat"],["f",11,10,"Física Nuclear y de Partículas","Física Nuclear i de Partícules"]];
  var TOTAL = CAT.reduce(function (a, c) { return a + c[2]; }, 0);
  var AREA = { mates: ["#ff375f", "Matemáticas", "Matemàtiques"], fisica: ["#0a84ff", "Física", "Física"], filosofia: ["#ff9f0a", "Filosofía", "Filosofia"], problemes: ["#bf5af2", "Problemas PAU", "Problemes PAU"], museu: ["#30d158", "Museo interactivo", "Museu interactiu"], altres: ["#8e8e93", "Resto del portal", "Resta del portal"] };
  function areaOf() {
    var b = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "");
    if (AREA[b] && b !== "altres") return b;
    if (/^(museu|sistema-solar|taula-periodica|celules|fourier)$/.test(b)) return "museu";
    return "altres";
  }

  /* ---------- tiempo de estudio: solo cuenta con la pestaña visible y con actividad reciente ---------- */
  var acc = 0, lastIn = Date.now(), area = areaOf();
  ["pointerdown", "keydown", "scroll", "touchstart", "wheel"].forEach(function (e) { addEventListener(e, function () { lastIn = Date.now(); }, { passive: true, capture: true }); });
  function flush() {
    if (acc < 1) return;
    var all = g("mk-time", {}), d = iso(new Date()); all[d] = all[d] || {}; all[d][area] = (all[d][area] | 0) + acc; acc = 0;
    var ks = Object.keys(all).sort(); while (ks.length > 120) delete all[ks.shift()];
    s("mk-time", all);
  }
  setInterval(function () { if (document.visibilityState === "visible" && Date.now() - lastIn < 60000) acc += 5; }, 5000);
  setInterval(flush, 30000);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flush(); });
  addEventListener("pagehide", flush);

  /* ---------- lectura de datos ---------- */
  var DAY = 864e5, IV = [1, 3, 7, 14, 30];
  function startToday() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function topicOf(pid) { var m = /^([mf])(\d+)\.(\d+)$/.exec(pid); return m ? { s: m[1], t: +m[2], n: +m[3] } : null; }
  function name(c) { return es() ? c[3] : c[4]; }
  function data() {
    var done = g("mk-done", {}), rv = g("mk-rv", {}), now = Date.now(), st0 = startToday();
    var per = {}, sub = { m: 0, f: 0 }, today = 0, due = [];
    Object.keys(done).forEach(function (pid) {
      var p = topicOf(pid); if (!p) return; per[p.s + p.t] = (per[p.s + p.t] | 0) + 1; sub[p.s]++;
      var ts = +done[pid]; if (ts > 1e11) {
        if (ts >= st0) today++;
        var r = rv[pid] || { n: 0, t: ts }, k = Math.min(r.n | 0, IV.length - 1), at = (r.t || ts) + IV[k] * DAY;
        if ((r.n | 0) < IV.length + 1 && now >= at) due.push({ pid: pid, p: p, late: Math.floor((now - at) / DAY), n: r.n | 0 });
      }
    });
    due.sort(function (a, b) { return b.late - a.late || a.pid.localeCompare(b.pid, "en", { numeric: true }); });
    var tm = g("mk-time", {}), days = [], tot = {}, wk = 0;
    for (var i = 6; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i); var k = iso(d), o = tm[k] || {}, sum = 0;
      Object.keys(o).forEach(function (a) { sum += o[a]; tot[a] = (tot[a] | 0) + o[a]; });
      days.push({ d: d, k: k, s: sum }); wk += sum;
    }
    var sk = g("mk-streak", {}), yest = iso(new Date(Date.now() - DAY));
    return { per: per, sub: sub, done: Object.keys(done).length, today: today, due: due, days: days, tot: tot, wk: wk, streak: (sk.d === iso(new Date()) || sk.d === yest) ? (sk.n | 0) : 0, best: sk.b | 0, favs: (g("mk-fav", [])).length, pau: (function () { try { var v = LS.getItem("mk-pau") || ""; return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ""; } catch (e) { return ""; } })(), sub0: { m: CAT.filter(function (c) { return c[0] === "m"; }), f: CAT.filter(function (c) { return c[0] === "f"; }) } };
  }
  function dur(sec) { var m = Math.round(sec / 60); if (m < 1) return sec > 0 ? "<1 min" : "0 min"; if (m < 60) return m + " min"; var h = Math.floor(m / 60), r = m % 60; return h + " h" + (r ? " " + r + " min" : ""); }
  function durS(sec) { var m = Math.round(sec / 60); if (m < 60) return m + " min"; var h = Math.floor(m / 60), r = m % 60; return h + (es() ? " h" : " h") + (r ? " " + r : ""); }
  function daysLeft(iso0) { var p = iso0.split("-"); if (p.length < 3) return null; var e = new Date(+p[0], p[1] - 1, +p[2]).getTime(), n = new Date(); n.setHours(0, 0, 0, 0); return Math.round((e - n.getTime()) / DAY); }

  /* ---------- estilos ---------- */
  var CSS = ".mks-ov{position:fixed;inset:0;z-index:415;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) 16px max(16px,env(safe-area-inset-bottom,0px));background:#0000;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);visibility:hidden;transition:background .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s,visibility 0s .5s}.mks-ov.on{background:#00000059;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);visibility:visible;transition-delay:0s}" +
    ".mks-sh{width:min(520px,100%);max-height:min(88vh,760px);display:flex;flex-direction:column;border-radius:28px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 92%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 40px 90px -30px #000000a6,0 1px 0 #ffffff40 inset;font:500 15px/1.4 var(--sans,system-ui,sans-serif);transform:translateY(28px) scale(.94);opacity:0;transition:transform .6s cubic-bezier(.2,1.15,.3,1),opacity .3s;overflow:hidden}.mks-ov.on .mks-sh{transform:none;opacity:1}" +
    ".mks-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 20px 6px 24px}.mks-hd h2{margin:0;font:800 28px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.035em}.mks-x{appearance:none;border:0;width:44px;height:44px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);font:400 22px/1 var(--sans,system-ui);flex:none;transition:transform .25s cubic-bezier(.2,1.25,.3,1)}.mks-x:active{transform:scale(.9)}" +
    ".mks-bd{overflow:auto;padding:4px 16px 22px;display:flex;flex-direction:column;gap:14px;overscroll-behavior:contain}" +
    ".mks-bd h3{margin:8px 8px -4px;font:700 13px/1.2 var(--sans,system-ui);letter-spacing:.02em;text-transform:none;color:var(--muted,#6c6a6a)}.mks-bd h3+p.mks-n{margin:-6px 8px 0}" +
    ".mks-n{margin:0 8px;color:var(--muted,#6c6a6a);font-size:13px;line-height:1.4}" +
    ".mks-tl{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.mks-t{border-radius:20px;padding:14px 12px 12px;background:color-mix(in srgb,var(--fg,#111) 5.5%,transparent);display:flex;flex-direction:column;gap:2px;min-width:0}.mks-t b{font:800 28px/1.05 var(--disp,var(--sans,inherit));letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:var(--c,var(--fg,#111))}.mks-t small{font-size:12.5px;color:var(--muted,#6c6a6a);line-height:1.25}" +
    ".mks-c{border-radius:22px;padding:16px;background:color-mix(in srgb,var(--fg,#111) 5.5%,transparent);display:flex;flex-direction:column;gap:12px}.mks-row{display:flex;align-items:center;gap:14px}.mks-row>div{min-width:0;flex:1}.mks-row strong{display:block;font-size:17px;font-weight:700;letter-spacing:-.015em}.mks-row span.mks-s{display:block;color:var(--muted,#6c6a6a);font-size:13.5px}" +
    ".mks-rg{width:64px;height:64px;flex:none;position:relative}.mks-rg svg{width:100%;height:100%;transform:rotate(-90deg)}.mks-rg circle{fill:none;stroke-width:8;stroke-linecap:round}.mks-rg .bg{stroke:color-mix(in srgb,var(--fg,#111) 10%,transparent)}.mks-rg .fg{stroke:var(--c);stroke-dasharray:var(--len);stroke-dashoffset:var(--len);transition:stroke-dashoffset 1.1s cubic-bezier(.2,1.1,.3,1) .15s}.mks-ov.on .mks-rg .fg{stroke-dashoffset:calc(var(--len) * (1 - var(--p)))}.mks-rg em{position:absolute;inset:0;display:grid;place-items:center;font:700 14px/1 var(--sans,system-ui);font-style:normal;font-variant-numeric:tabular-nums}" +
    ".mks-bar{height:8px;border-radius:99px;background:color-mix(in srgb,var(--fg,#111) 10%,transparent);overflow:hidden}.mks-bar i{display:block;height:100%;width:100%;border-radius:99px;background:var(--c);transform-origin:left;transform:scaleX(0);transition:transform .9s cubic-bezier(.2,1.1,.3,1) .2s}.mks-ov.on .mks-bar i{transform:scaleX(var(--p))}" +
    ".mks-tp{display:flex;flex-direction:column;gap:12px;margin:0;padding:0;list-style:none}.mks-tp li{display:grid;gap:5px}.mks-tp .l{display:flex;justify-content:space-between;gap:10px;font-size:14px}.mks-tp .l span:last-child{color:var(--muted,#6c6a6a);font-variant-numeric:tabular-nums;flex:none}" +
    ".mks-c details>summary{list-style:none;cursor:pointer;min-height:44px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:650;font-size:14.5px;color:var(--acc-ink,var(--accent,#0a60d6));border-radius:12px}.mks-c details>summary::-webkit-details-marker{display:none}.mks-c details>summary::after{content:'›';font-size:20px;transition:transform .3s cubic-bezier(.2,1.2,.3,1)}.mks-c details[open]>summary::after{transform:rotate(90deg)}.mks-c details .mks-tp{padding-top:6px}" +
    ".mks-ch{display:flex;align-items:flex-end;gap:8px;height:104px}.mks-ch div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:100%}.mks-ch i{display:block;width:100%;max-width:34px;min-height:4px;border-radius:9px 9px 5px 5px;background:color-mix(in srgb,var(--fg,#111) 16%,transparent);height:calc(var(--h) * 78px);transform-origin:bottom;transform:scaleY(.05);transition:transform .8s cubic-bezier(.2,1.2,.3,1) calc(.1s + var(--i) * .05s)}.mks-ov.on .mks-ch i{transform:none}.mks-ch .now i{background:var(--c)}.mks-ch small{font-size:11.5px;color:var(--muted,#6c6a6a)}.mks-ch .now small{color:var(--fg,#111);font-weight:700}" +
    ".mks-lg{display:flex;flex-wrap:wrap;gap:6px 14px;margin:0;padding:0;list-style:none;font-size:13px}.mks-lg li{display:flex;align-items:center;gap:6px}.mks-lg li:before{content:'';width:9px;height:9px;border-radius:50%;background:var(--c)}.mks-lg span{color:var(--muted,#6c6a6a)}" +
    ".mks-b{appearance:none;border:0;cursor:pointer;font:650 15px/1 var(--sans,system-ui);min-height:44px;padding:0 18px;border-radius:14px;color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);transition:transform .25s cubic-bezier(.2,1.25,.3,1),background .2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px}.mks-b:hover{background:color-mix(in srgb,var(--fg,#111) 14%,transparent)}.mks-b:active{transform:scale(.96)}.mks-b.p{background:var(--acc-ink,var(--accent,#0a60d6));color:#fff}.mks-b.p:hover{filter:brightness(1.08)}.mks-b.w{color:#c4271c}.mks-bs{display:flex;flex-wrap:wrap;gap:8px}" +
    ".mks-in{font:inherit;min-height:44px;padding:0 12px;border-radius:12px;border:1px solid color-mix(in srgb,var(--fg,#111) 18%,transparent);background:var(--bg,#fff);color:var(--fg,#111);color-scheme:light dark}.mks-in:focus-visible,.mks-b:focus-visible,.mks-x:focus-visible,.mks-c summary:focus-visible,.mks-lk:focus-visible{outline:3px solid color-mix(in srgb,var(--acc-ink,#0a60d6) 70%,transparent);outline-offset:2px}" +
    ".mks-big{font:800 40px/1 var(--disp,var(--sans,inherit));letter-spacing:-.04em;font-variant-numeric:tabular-nums}.mks-pl{display:flex;align-items:center;gap:14px}.mks-pl .mks-rg{width:56px;height:56px}" +
    ".mks-rr{display:flex;align-items:center;gap:10px;min-height:48px}.mks-rr a.mks-lk{flex:1;min-width:0;color:inherit;text-decoration:none;display:block;border-radius:10px}.mks-rr b{display:block;font-weight:650;font-size:14.5px}.mks-rr small{color:var(--muted,#6c6a6a);font-size:12.5px}.mks-ok{appearance:none;border:0;width:44px;height:44px;border-radius:50%;cursor:pointer;background:color-mix(in srgb,#30d158 22%,transparent);color:#0a7a2c;font:700 18px/1 system-ui;flex:none;transition:transform .3s cubic-bezier(.2,1.25,.3,1)}.mks-ok:active{transform:scale(.88)}.mks-ok:focus-visible{outline:3px solid #30d158;outline-offset:2px}" +
    ".mks-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.mks-ta{width:100%;min-height:90px;font:12px/1.4 ui-monospace,monospace;resize:vertical;padding:10px;box-sizing:border-box}" +
    "@media(prefers-color-scheme:dark){.mks-ok{color:#5be07f}.mks-b.w{color:#ff6b5e}}:root[data-theme=dark] .mks-ok{color:#5be07f}:root[data-theme=dark] .mks-b.w{color:#ff6b5e}:root[data-theme=light] .mks-ok{color:#0a7a2c}:root[data-theme=light] .mks-b.w{color:#c4271c}" +
    "@media(max-width:640px){.mks-ov{align-items:flex-end;padding-inline:0;padding-bottom:0}.mks-sh{border-radius:28px 28px 0 0;width:100%;max-height:92vh;padding-bottom:env(safe-area-inset-bottom,0px)}.mks-t b{font-size:24px}}" +
    "@media(prefers-reduced-motion:reduce){.mks-sh,.mks-ov{transition:opacity .2s;transform:none}.mks-rg .fg,.mks-bar i,.mks-ch i{transition:none}.mks-ch i{transform:none}}" +
    "@media(prefers-reduced-transparency:reduce){.mks-sh{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}.mks-ov.on{-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){.mks-sh{border:2px solid var(--fg,#111)}.mks-c,.mks-t{border:1px solid var(--fg,#111)}}@media print{.mks-ov{display:none!important}}";
  function addCss() { if (document.getElementById("mks-css")) return; var st = document.createElement("style"); st.id = "mks-css"; st.textContent = CSS; document.head.appendChild(st); }

  /* ---------- piezas de interfaz ---------- */
  function ring(p, c, label) { var len = 2 * Math.PI * 26; return '<div class="mks-rg" style="--c:' + c + ";--p:" + p.toFixed(3) + ";--len:" + len.toFixed(1) + '" aria-hidden="true"><svg viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="26"/><circle class="fg" cx="32" cy="32" r="26"/></svg><em>' + Math.round(p * 100) + "%</em></div>"; }
  function bar(p, c, label) { return '<div class="mks-bar" role="progressbar" aria-label="' + esc(label) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(p * 100) + '" style="--c:' + c + ";--p:" + p.toFixed(3) + '"><i></i></div>'; }
  function tile(v, label, c, raw) { return '<div class="mks-t" style="--c:' + c + '"><b' + (raw ? "" : ' data-n="' + v + '"') + ">" + (raw ? esc(v) : v) + "</b><small>" + esc(label) + "</small></div>"; }
  function subjectCard(key, D) {
    var rows = D.sub0[key], color = key === "m" ? AREA.mates[0] : AREA.fisica[0], total = rows.reduce(function (a, c) { return a + c[2]; }, 0), done = D.sub[key], p = total ? done / total : 0;
    var ttl = key === "m" ? t("Matemáticas II", "Matemàtiques II") : t("Física", "Física");
    var list = rows.map(function (c) { var d = Math.min(D.per[c[0] + c[1]] | 0, c[2]), q = d / c[2], nm = name(c); return "<li><div class=\"l\"><span>" + c[1] + ". " + esc(nm) + "</span><span>" + d + "/" + c[2] + "</span></div>" + bar(q, color, nm + ": " + d + t(" de ", " de ") + c[2]) + "</li>"; }).join("");
    return '<div class="mks-c"><div class="mks-row">' + ring(p, color) + "<div><strong>" + ttl + '</strong><span class="mks-s">' + done + t(" de ", " de ") + total + t(" problemas hechos", " problemes fets") + "</span></div></div><details><summary>" + t("Ver los temas", "Veure els temes") + '</summary><ul class="mks-tp">' + list + "</ul></details></div>";
  }
  function weak(D) {
    var L = CAT.map(function (c, i) { var d = Math.min(D.per[c[0] + c[1]] | 0, c[2]); return { c: c, d: d, p: d / c[2], i: i }; }).filter(function (x) { return x.p < 1; });
    L.sort(function (a, b) { return a.p - b.p || a.i - b.i; });
    return L.slice(0, 3);
  }
  function firstUndone(c) { var done = g("mk-done", {}); for (var i = 1; i <= c[2]; i++) if (!done[c[0] + c[1] + "." + i]) return c[0] + c[1] + "." + i; return null; }
  function weakHTML(D) {
    var W = weak(D); if (!W.length) return '<p class="mks-n">' + t("¡Has hecho todos los problemas! Repasa los que toquen abajo.", "Has fet tots els problemes! Repassa els que toquin a sota.") + "</p>";
    return '<div class="mks-c">' + W.map(function (x) {
      var pid = firstUndone(x.c), color = x.c[0] === "m" ? AREA.mates[0] : AREA.fisica[0], nm = (x.c[0] === "m" ? "M" : "F") + x.c[1] + " · " + name(x.c);
      return '<div class="mks-rr"><a class="mks-lk" href="problemes.html' + (pid ? "?p=" + pid : "") + '"><b>' + esc(nm) + "</b><small>" + x.d + "/" + x.c[2] + t(" hechos · siguiente: problema ", " fets · següent: problema ") + (pid ? pid.split(".")[1] : "") + "</small></a>" + '<div style="width:64px">' + bar(x.p, color, nm) + "</div></div>";
    }).join("") + "</div>";
  }
  function dueHTML(D) {
    if (!D.due.length) return '<p class="mks-n">' + (D.done ? t("Hoy no te toca repasar nada. Te avisaré aquí cuando pasen 1, 3, 7, 14 y 30 días de cada problema hecho.", "Avui no toca repassar res. T’ho diré aquí quan passin 1, 3, 7, 14 i 30 dies de cada problema fet.") : t("Marca problemas como hechos y aquí te diré cuándo repasarlos (a 1, 3, 7, 14 y 30 días).", "Marca problemes com a fets i aquí et diré quan repassar-los (a 1, 3, 7, 14 i 30 dies).")) + "</p>";
    var more = D.due.length - 5;
    return '<div class="mks-c">' + D.due.slice(0, 5).map(function (x) {
      var c = CAT.filter(function (y) { return y[0] === x.p.s && y[1] === x.p.t; })[0], nm = (x.p.s === "m" ? "M" : "F") + x.p.t + " · " + t("Problema ", "Problema ") + x.p.n;
      return '<div class="mks-rr"><a class="mks-lk" href="problemes.html?p=' + x.pid + '"><b>' + esc(nm) + "</b><small>" + esc(c ? name(c) : "") + (x.late > 0 ? " · " + t("con ", "amb ") + x.late + (x.late === 1 ? t(" día de retraso", " dia de retard") : t(" días de retraso", " dies de retard")) : " · " + t("toca hoy", "toca avui")) + '</small></a><button type="button" class="mks-ok" data-rv="' + x.pid + '" aria-label="' + esc(t("Marcar como repasado: ", "Marca com a repassat: ") + nm) + '">✓</button></div>';
    }).join("") + (more > 0 ? '<p class="mks-n" style="margin:0">+ ' + more + t(" más pendientes", " més pendents") + "</p>" : "") + "</div>";
  }
  function pauHTML(D) {
    var left = D.pau ? daysLeft(D.pau) : null, rem = Math.max(0, TOTAL - D.done);
    if (left == null) return '<div class="mks-c"><div><strong style="font-size:17px">' + t("Cuenta atrás de la PAU", "Compte enrere de la PAU") + '</strong><p class="mks-n" style="margin:4px 0 0">' + t("Elige la fecha de tu examen y te diré cuántos problemas hacer cada día.", "Tria la data del teu examen i et diré quants problemes fer cada dia.") + '</p></div><label class="mks-bs" style="align-items:center"><span class="mks-n" style="margin:0">' + t("Fecha del examen", "Data de l’examen") + '</span><input class="mks-in" type="date" id="mks-pau" min="' + iso(new Date()) + '"></label></div>';
    var big, plan, p = 0, perDay = 0;
    if (left < 0) { big = t("Ya pasó", "Ja ha passat"); plan = t("Cambia la fecha cuando tengas la siguiente.", "Canvia la data quan tinguis la propera."); }
    else {
      big = left === 0 ? t("Hoy", "Avui") : left + (left === 1 ? t(" día", " dia") : t(" días", " dies"));
      if (!rem) plan = t("Has hecho todos los problemas. Dedica el tiempo al repaso.", "Has fet tots els problemes. Dedica el temps al repàs.");
      else { perDay = Math.ceil(rem / Math.max(1, left)); p = Math.min(1, D.today / perDay); plan = t("Te quedan ", "Et queden ") + rem + t(" problemas: unos ", " problemes: uns ") + perDay + t(" al día. Hoy llevas ", " al dia. Avui en portes ") + D.today + "."; }
    }
    return '<div class="mks-c"><div class="mks-pl">' + (perDay ? ring(p, "#ff9f0a") : "") + '<div style="flex:1;min-width:0"><div class="mks-big">' + esc(big) + '</div><p class="mks-n" style="margin:6px 0 0">' + esc(plan) + '</p></div></div><div class="mks-bs"><label class="mks-b" style="position:relative">' + t("Cambiar fecha", "Canviar data") + '<input class="mks-in" type="date" id="mks-pau" value="' + esc(D.pau) + '" style="position:absolute;inset:0;opacity:0;width:100%;cursor:pointer" aria-label="' + esc(t("Fecha del examen", "Data de l’examen")) + '"></label><button type="button" class="mks-b" data-pau-x>' + t("Quitar", "Treure") + "</button></div></div>";
  }
  function timeHTML(D) {
    var mx = Math.max.apply(null, D.days.map(function (d) { return d.s; }).concat([60])), L = es() ? ["D", "L", "M", "X", "J", "V", "S"] : ["DG", "DL", "DM", "DX", "DJ", "DV", "DS"];
    var lab = D.days.map(function (d) { return L[d.d.getDay()] + ": " + dur(d.s); }).join(", ");
    var cols = D.days.map(function (d, i) { return '<div class="' + (i === 6 ? "now" : "") + '"><i style="--h:' + (d.s / mx).toFixed(3) + ";--i:" + i + '"></i><small>' + L[d.d.getDay()] + "</small></div>"; }).join("");
    var tot = Object.keys(D.tot).filter(function (a) { return D.tot[a] > 0 && AREA[a]; }).sort(function (a, b) { return D.tot[b] - D.tot[a]; });
    var lg = tot.map(function (a) { return '<li style="--c:' + AREA[a][0] + '">' + esc(es() ? AREA[a][1] : AREA[a][2]) + " <span>" + dur(D.tot[a]) + "</span></li>"; }).join("");
    return '<div class="mks-c" style="--c:#0a84ff"><div class="mks-row"><div><strong>' + dur(D.wk) + '</strong><span class="mks-s">' + t("en los últimos 7 días", "en els últims 7 dies") + '</span></div></div><div class="mks-ch" role="img" aria-label="' + esc(t("Tiempo de estudio, últimos 7 días. ", "Temps d’estudi, últims 7 dies. ") + lab) + '" style="--c:#0a84ff">' + cols + "</div>" + (lg ? '<ul class="mks-lg">' + lg + "</ul>" : '<p class="mks-n" style="margin:0">' + t("Cuenta el tiempo con el portal abierto y activo. Aún no hay datos.", "Compta el temps amb el portal obert i actiu. Encara no hi ha dades.") + "</p>") + "</div>";
  }
  function dataHTML() {
    return '<div class="mks-c"><div class="mks-bs"><button type="button" class="mks-b p" data-ex>' + t("Exportar copia", "Exportar còpia") + '</button><button type="button" class="mks-b" data-cp>' + t("Copiar código", "Copiar codi") + '</button><label class="mks-b" style="position:relative">' + t("Importar archivo", "Importar fitxer") + '<input type="file" accept="application/json,.json" id="mks-file" class="mks-sr" tabindex="-1" aria-hidden="true"></label><button type="button" class="mks-b" data-pa>' + t("Pegar código", "Enganxar codi") + '</button></div><div id="mks-imp"></div><p class="mks-n" style="margin:0">' + t("Incluye racha, favoritos, problemas hechos, repasos, tiempo y ajustes. Se guarda solo en este navegador: usa la copia para cambiar de móvil o por si borras los datos.", "Inclou ratxa, favorits, problemes fets, repassos, temps i ajustos. Es desa només en aquest navegador: fes servir la còpia per canviar de mòbil o per si esborres les dades.") + "</p></div>";
  }

  /* ---------- hoja ---------- */
  var ov, sh, bd, ttl, live, last, isOpen = false;
  function ensure() {
    if (ov) return; addCss();
    ov = document.createElement("div"); ov.className = "mks-ov"; ov.setAttribute("aria-hidden", "true");
    sh = document.createElement("div"); sh.className = "mks-sh"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true"); sh.setAttribute("aria-labelledby", "mks-t");
    var hd = document.createElement("div"); hd.className = "mks-hd"; ttl = document.createElement("h2"); ttl.id = "mks-t"; ttl.tabIndex = -1; ttl.style.outline = "0";
    var x = document.createElement("button"); x.type = "button"; x.className = "mks-x"; x.textContent = "×"; x.addEventListener("click", close);
    hd.appendChild(ttl); hd.appendChild(x); bd = document.createElement("div"); bd.className = "mks-bd";
    live = document.createElement("div"); live.className = "mks-sr"; live.setAttribute("role", "status"); live.setAttribute("aria-live", "polite");
    sh.appendChild(hd); sh.appendChild(bd); sh.appendChild(live); ov.appendChild(sh); document.body.appendChild(ov);
    ov.addEventListener("pointerdown", function (e) { if (e.target === ov) close(); });
    bd.addEventListener("click", onClick); bd.addEventListener("change", onChange);
    addEventListener("keydown", function (e) {
      if (!isOpen) return;
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "Tab") {
        var f = [].slice.call(sh.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]):not([tabindex='-1']),summary,textarea")).filter(function (n) { return n.getClientRects().length; });
        if (!f.length) return; var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === a || !sh.contains(document.activeElement))) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
  }
  function say(m) { if (live) { live.textContent = ""; setTimeout(function () { live.textContent = m; }, 30); } }
  function render() {
    var D = data(); ttl.textContent = t("Estadísticas", "Estadístiques");
    bd.innerHTML =
      '<div class="mks-tl">' + tile(D.streak, t("días de racha", "dies de ratxa"), "#ff9f0a") + tile(durS(D.wk), t("esta semana", "aquesta setmana"), "#0a84ff", true) + tile(D.done, t("de ", "de ") + TOTAL + t(" problemas", " problemes"), "#30d158") + "</div>" +
      "<h3>" + t("Cuenta atrás de la PAU", "Compte enrere de la PAU") + "</h3>" + pauHTML(D) +
      "<h3>" + t("Para repasar hoy", "Per repassar avui") + "</h3>" + dueHTML(D) +
      "<h3>" + t("Progreso por materia", "Progrés per matèria") + "</h3>" + subjectCard("m", D) + subjectCard("f", D) +
      "<h3>" + t("Puntos débiles", "Punts febles") + '</h3><p class="mks-n">' + t("Los temas con menos problemas hechos.", "Els temes amb menys problemes fets.") + "</p>" + weakHTML(D) +
      "<h3>" + t("Tiempo de estudio", "Temps d’estudi") + "</h3>" + timeHTML(D) +
      "<h3>" + t("Tus datos", "Les teves dades") + "</h3>" + dataHTML();
    countUp();
  }
  function countUp() {
    [].forEach.call(bd.querySelectorAll("[data-n]"), function (n) {
      var v = +n.getAttribute("data-n"); if (reduce || v < 2) { n.textContent = v; return; }
      var t0 = performance.now(); n.textContent = "0"; (function step(now) { var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3); n.textContent = Math.round(v * e); if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }
  function open() {
    ensure(); if (isOpen) return; isOpen = true; last = document.activeElement; render();
    ov.setAttribute("aria-hidden", "false"); ov.getBoundingClientRect(); ov.classList.add("on"); fb("open"); bd.scrollTop = 0;
    setTimeout(function () { ttl.focus({ preventScroll: true }); }, 80);
  }
  function close() { if (!isOpen) return; isOpen = false; ov.classList.remove("on"); ov.setAttribute("aria-hidden", "true"); last && last.focus && last.focus({ preventScroll: true }); }

  /* ---------- acciones ---------- */
  function onClick(e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-rv")) { var pid = b.getAttribute("data-rv"), rv = g("mk-rv", {}), r = rv[pid] || { n: 0 }; rv[pid] = { n: (r.n | 0) + 1, t: Date.now() }; s("mk-rv", rv); fb("done"); say(t("Repaso guardado", "Repàs desat")); var y = bd.scrollTop; render(); bd.scrollTop = y; }
    else if (b.hasAttribute("data-pau-x")) { try { LS.removeItem("mk-pau"); } catch (x) {} var y2 = bd.scrollTop; render(); bd.scrollTop = y2; say(t("Fecha quitada", "Data treta")); }
    else if (b.hasAttribute("data-ex")) doExport();
    else if (b.hasAttribute("data-cp")) doCopy();
    else if (b.hasAttribute("data-pa")) showPaste();
    else if (b.hasAttribute("data-do")) applyImport(b.getAttribute("data-do"));
    else if (b.hasAttribute("data-no")) { pending = null; imp(""); }
    else if (b.hasAttribute("data-go")) { var ta = bd.querySelector("#mks-ta"); if (ta) prepare(ta.value); }
  }
  function onChange(e) {
    var i = e.target;
    if (i.id === "mks-pau") { if (i.value) { s("mk-pau", i.value); var y = bd.scrollTop; render(); bd.scrollTop = y; say(t("Fecha guardada", "Data desada")); fb("done"); } }
    else if (i.id === "mks-file") { var f = i.files && i.files[0]; if (!f) return; if (f.size > 3e6) { imp(msg(t("El archivo es demasiado grande.", "El fitxer és massa gran."), true)); return; } var r = new FileReader(); r.onload = function () { prepare(String(r.result)); }; r.onerror = function () { imp(msg(t("No se pudo leer el archivo.", "No s’ha pogut llegir el fitxer."), true)); }; r.readAsText(f); i.value = ""; }
  }
  function msg(m, bad) { return '<p class="mks-n" style="margin:0;' + (bad ? "color:#c4271c" : "") + '" role="' + (bad ? "alert" : "status") + '">' + esc(m) + "</p>"; }
  function imp(h) { var n = bd.querySelector("#mks-imp"); if (n) n.innerHTML = h; }

  /* ---------- exportar / importar ---------- */
  var KEYRE = /^mk[a-z0-9_-]*$/i;
  function snapshot() {
    var out = {}; try { for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (KEYRE.test(k)) out[k] = LS.getItem(k); } } catch (e) {}
    flush(); return { app: "menudo-kanteo", v: 1, t: new Date().toISOString(), data: out };
  }
  function doExport() {
    var snap = snapshot(), text = JSON.stringify(snap), fn = "menudo-kanteo-" + iso(new Date()) + ".json";
    try {
      var file = new File([text], fn, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [file] }) && /iPhone|iPad|Android/i.test(navigator.userAgent)) { navigator.share({ files: [file], title: "Menudo Kanteo" }).then(function () { say(t("Copia compartida", "Còpia compartida")); }).catch(function () {}); return; }
    } catch (e) {}
    try { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = fn; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800); fb("done"); say(t("Copia descargada: ", "Còpia descarregada: ") + fn); imp(msg(t("Copia descargada: ", "Còpia descarregada: ") + fn)); }
    catch (e) { imp(msg(t("No se pudo descargar. Usa «Copiar código».", "No s’ha pogut descarregar. Fes servir «Copiar codi»."), true)); }
  }
  function doCopy() {
    var text = JSON.stringify(snapshot());
    function ok() { fb("done"); say(t("Código copiado", "Codi copiat")); imp(msg(t("Código copiado. Pégalo en «Pegar código» en el otro dispositivo.", "Codi copiat. Enganxa’l a «Enganxar codi» a l’altre dispositiu."))); }
    function manual() { imp('<label class="mks-n" for="mks-ta" style="margin:0">' + t("Copia este código:", "Copia aquest codi:") + '</label><textarea class="mks-in mks-ta" id="mks-ta" readonly></textarea>'); var ta = bd.querySelector("#mks-ta"); ta.value = text; ta.focus(); ta.select(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, manual); else manual();
  }
  function showPaste() { imp('<label class="mks-n" for="mks-ta" style="margin:0">' + t("Pega aquí el código:", "Enganxa aquí el codi:") + '</label><textarea class="mks-in mks-ta" id="mks-ta"></textarea><div class="mks-bs"><button type="button" class="mks-b p" data-go>' + t("Continuar", "Continuar") + "</button></div>"); var ta = bd.querySelector("#mks-ta"); ta && ta.focus(); }
  var pending = null;
  function prepare(text) {
    var o; try { o = JSON.parse(text); } catch (e) { imp(msg(t("El archivo no es válido.", "El fitxer no és vàlid."), true)); return; }
    if (!o || o.app !== "menudo-kanteo" || !o.data || typeof o.data !== "object") { imp(msg(t("Este archivo no es una copia de Menudo Kanteo.", "Aquest fitxer no és una còpia de Menudo Kanteo."), true)); return; }
    var clean = {}, size = 0, n = 0;
    Object.keys(o.data).forEach(function (k) { var v = o.data[k]; if (!KEYRE.test(k) || typeof v !== "string" || v.length > 1e6) return; size += v.length; if (size > 3e6) return; clean[k] = v; n++; });
    if (!n) { imp(msg(t("La copia está vacía.", "La còpia és buida."), true)); return; }
    var dn = 0, fv = 0; try { dn = Object.keys(JSON.parse(clean["mk-done"] || "{}")).length; fv = JSON.parse(clean["mk-fav"] || "[]").length; } catch (e) {}
    pending = clean;
    imp('<p class="mks-n" style="margin:0" role="status">' + esc(t("Copia de ", "Còpia de ") + (o.t ? o.t.slice(0, 10) : "?") + ": " + dn + t(" problemas hechos, ", " problemes fets, ") + fv + t(" favoritos, ", " favorits, ") + n + t(" datos en total.", " dades en total.")) + '</p><div class="mks-bs"><button type="button" class="mks-b p" data-do="merge">' + t("Combinar con lo actual", "Combinar amb l’actual") + '</button><button type="button" class="mks-b w" data-do="replace">' + t("Reemplazar todo", "Reemplaçar tot") + '</button><button type="button" class="mks-b" data-no>' + t("Cancelar", "Cancel·lar") + "</button></div>");
  }
  function parse(v) { try { return JSON.parse(v); } catch (e) { return undefined; } }
  function mergeKey(k, cur, inc) {
    var a = parse(cur), b = parse(inc); if (a === undefined || b === undefined) return cur;
    if (k === "mk-done") return JSON.stringify(Object.assign({}, b, a));
    if (k === "mk-fav" && Array.isArray(a) && Array.isArray(b)) { var seen = {}; a.forEach(function (x) { seen[x.u] = 1; }); return JSON.stringify(a.concat(b.filter(function (x) { return x && !seen[x.u]; }))); }
    if (k === "mk-time") { Object.keys(b).forEach(function (d) { a[d] = a[d] || {}; Object.keys(b[d]).forEach(function (ar) { a[d][ar] = Math.max(a[d][ar] | 0, b[d][ar] | 0); }); }); return JSON.stringify(a); }
    if (k === "mk-rv") { Object.keys(b).forEach(function (p) { if (!a[p] || (b[p].n | 0) > (a[p].n | 0)) a[p] = b[p]; }); return JSON.stringify(a); }
    if (k === "mk-streak") { var nw = (b.d || "") > (a.d || "") ? b : a, o = Object.assign({}, nw); o.h = Array.from(new Set((a.h || []).concat(b.h || []))).sort().slice(-400); o.b = Math.max(a.b | 0, b.b | 0); o.m = Math.max(a.m | 0, b.m | 0); return JSON.stringify(o); }
    return cur;
  }
  function applyImport(mode) {
    if (!pending) return; var inc = pending, n = 0;
    try {
      if (mode === "replace") { var rm = []; for (var i = 0; i < LS.length; i++) if (KEYRE.test(LS.key(i))) rm.push(LS.key(i)); rm.forEach(function (k) { LS.removeItem(k); }); Object.keys(inc).forEach(function (k) { LS.setItem(k, inc[k]); n++; }); }
      else Object.keys(inc).forEach(function (k) { var cur = LS.getItem(k); if (cur == null) LS.setItem(k, inc[k]); else { var m = mergeKey(k, cur, inc[k]); if (m !== cur) LS.setItem(k, m); } n++; });
    } catch (e) { imp(msg(t("No se pudo guardar (¿sin espacio?).", "No s’ha pogut desar (sense espai?)."), true)); return; }
    pending = null; fb("done"); say(t("Copia importada. Recargando…", "Còpia importada. Recarregant…")); imp(msg(t("Hecho. Recargando…", "Fet. Recarregant…"))); setTimeout(function () { location.reload(); }, 900);
  }

  window.mkStats = { open: open, close: close, export: doExport, data: data };
  if (/[?&]stats=1/.test(location.search)) { var go = function () { setTimeout(open, 400); }; if (document.readyState === "loading") addEventListener("DOMContentLoaded", go); else go(); }
})();
