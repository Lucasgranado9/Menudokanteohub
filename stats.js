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
  var CSS2 = ".mkm-hero{flex:none;display:flex;align-items:center;gap:14px;padding:6px 8px 2px}.mkm-av{flex:none;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;overflow:hidden;color:#fff;font:800 24px/1 var(--disp,inherit);background:linear-gradient(160deg,#ff5d73,var(--red,#c8102e));box-shadow:0 8px 20px -8px var(--red,#c8102e)}.mkm-av img{width:100%;height:100%;object-fit:cover}.mkm-hero b{display:block;font:700 19px/1.2 var(--disp,inherit);letter-spacing:-.02em}.mkm-hero small{display:block;color:var(--muted,#6c6a6a);font-size:13px;margin-top:2px;overflow:hidden;text-overflow:ellipsis}" +
    ".mkm-tabs{flex:none;position:relative;display:flex;gap:2px;padding:3px;margin:2px 4px 0;border-radius:15px;background:color-mix(in srgb,var(--fg,#111) 7%,transparent);overflow-x:auto;scrollbar-width:none}.mkm-tabs::-webkit-scrollbar{display:none}.mkm-th{position:absolute;top:3px;bottom:3px;left:0;border-radius:12px;background:var(--bg,#fff);box-shadow:0 2px 8px rgba(0,0,0,.14);transition:transform .45s cubic-bezier(.3,1.25,.4,1),width .45s cubic-bezier(.3,1.25,.4,1);pointer-events:none}" +
    ".mkm-tabs button{position:relative;flex:1 0 auto;min-height:44px;padding:0 13px;border:0;border-radius:12px;background:none;color:var(--muted,#6c6a6a);font:650 14px/1 var(--sans,system-ui);cursor:pointer;white-space:nowrap;transition:color .25s}.mkm-tabs button[aria-selected=true]{color:var(--fg,#111)}.mkm-tabs button:focus-visible{outline:2px solid var(--accent,#0a60d6);outline-offset:1px}" +
    ".mkm-pn{display:flex;flex-direction:column;gap:14px;animation:mkmIn .5s cubic-bezier(.2,1,.3,1)}@keyframes mkmIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}" +
    ".mkm-lock{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:18px 10px 6px}.mkm-lock i{width:72px;height:72px;border-radius:22px;display:grid;place-items:center;color:#fff;background:linear-gradient(160deg,#ff5d73,var(--red,#c8102e));box-shadow:0 14px 30px -12px var(--red,#c8102e)}.mkm-lock i svg{width:34px;height:34px}.mkm-lock h3{margin:6px 0 0;font:800 26px/1.1 var(--disp,inherit);letter-spacing:-.035em;color:var(--fg,#111)}.mkm-lock p{margin:0;max-width:34ch;color:var(--muted,#6c6a6a);font-size:15px;line-height:1.45}" +
    ".mkm-cta{appearance:none;border:0;width:100%;min-height:54px;border-radius:17px;color:#fff;font:700 16.5px/1 var(--sans,system-ui);background:linear-gradient(180deg,#ee3a55,var(--red,#c8102e));box-shadow:0 10px 24px -10px var(--red,#c8102e);cursor:pointer;transition:transform .3s cubic-bezier(.3,1.4,.5,1)}.mkm-cta:active{transform:scale(.97)}.mkm-cta:focus-visible{outline:3px solid var(--accent,#0a60d6);outline-offset:2px}" +
    ".mkm-ft{list-style:none;margin:0;padding:6px;border-radius:22px;background:color-mix(in srgb,var(--fg,#111) 5.5%,transparent);display:flex;flex-direction:column}.mkm-ft li{display:flex;align-items:center;gap:12px;min-height:54px;padding:6px 10px}.mkm-ft li+li{border-top:1px solid color-mix(in srgb,var(--fg,#111) 8%,transparent)}.mkm-ft i{flex:none;width:34px;height:34px;border-radius:11px;display:grid;place-items:center;color:#fff;background:var(--c)}.mkm-ft i svg{width:19px;height:19px}.mkm-ft b{display:block;font-size:15px;letter-spacing:-.01em}.mkm-ft small{display:block;color:var(--muted,#6c6a6a);font-size:12.5px}" +
    ".mkm-wk{display:flex;flex-direction:column;gap:12px}.mkm-wh{display:flex;align-items:baseline;justify-content:space-between;gap:10px}.mkm-wh b{font:800 34px/1 var(--disp,inherit);letter-spacing:-.04em;font-variant-numeric:tabular-nums}.mkm-dl{font:700 13px/1 var(--sans,system-ui);padding:6px 10px;border-radius:99px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent)}.mkm-dl.up{color:#1a7f37;background:color-mix(in srgb,#30d158 18%,transparent)}.mkm-dl.dn{color:#c4271c;background:color-mix(in srgb,#ff453a 14%,transparent)}" +
    ".mkm-bars{display:flex;align-items:flex-end;gap:8px;height:96px}.mkm-bars div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:100%}.mkm-bars i{display:block;width:100%;max-width:32px;min-height:4px;border-radius:9px;background:color-mix(in srgb,var(--red,#c8102e) 70%,transparent);transform-origin:bottom;animation:mkmBar .7s cubic-bezier(.2,1,.3,1) both}.mkm-bars .t i{background:var(--red,#c8102e)}.mkm-bars .f i{background:color-mix(in srgb,var(--fg,#111) 12%,transparent)}.mkm-bars span{font-size:11.5px;color:var(--muted,#6c6a6a)}@keyframes mkmBar{from{transform:scaleY(.05)}}" +
    ".mkm-row{display:flex;align-items:center;gap:12px;width:100%;min-height:62px;padding:8px 12px;border:0;border-radius:18px;background:color-mix(in srgb,var(--fg,#111) 5.5%,transparent);color:inherit;text-align:left;font:inherit;cursor:pointer;transition:transform .3s cubic-bezier(.3,1.4,.5,1)}.mkm-row:active{transform:scale(.98)}.mkm-row i{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:var(--c,var(--red,#c8102e))}.mkm-row i svg{width:21px;height:21px}.mkm-row span{flex:1;min-width:0}.mkm-row b{display:block;font-size:15.5px;letter-spacing:-.01em}.mkm-row small{display:block;color:var(--muted,#6c6a6a);font-size:13px}.mkm-row em{color:var(--muted,#6c6a6a);font-style:normal;font-size:20px}" +
    ".mkm-chips{display:flex;gap:8px;flex-wrap:wrap}.mkm-chips button{min-height:44px;padding:0 15px;border-radius:99px;border:1px solid color-mix(in srgb,var(--fg,#111) 15%,transparent);background:none;color:inherit;font:650 14px/1 var(--sans,system-ui);cursor:pointer}.mkm-chips button[aria-pressed=true]{border-color:transparent;background:var(--fg,#111);color:var(--bg,#fff)}" +
    ".mkm-it{display:flex;align-items:center;gap:8px;min-height:56px}.mkm-it a{flex:1;min-width:0;color:inherit;text-decoration:none;border-radius:10px}.mkm-it b{display:block;font-size:14.5px;font-weight:650;letter-spacing:-.01em}.mkm-it small{display:block;color:var(--muted,#6c6a6a);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkm-x{appearance:none;flex:none;width:44px;height:44px;border:0;border-radius:50%;background:none;color:var(--muted,#6c6a6a);font-size:20px;cursor:pointer}.mkm-x:hover{background:color-mix(in srgb,var(--fg,#111) 8%,transparent)}" +
    ".mkm-ta{width:100%;min-height:84px;padding:12px 14px;border-radius:16px;border:1px solid color-mix(in srgb,var(--fg,#111) 15%,transparent);background:var(--bg,#fff);color:inherit;font:15px/1.4 var(--sans,system-ui);resize:vertical;box-sizing:border-box}.mkm-ta:focus-visible{outline:2px solid var(--accent,#0a60d6);outline-offset:1px}.mkm-chip{display:inline-block;padding:3px 9px;border-radius:99px;font:700 11.5px/1.3 var(--sans,system-ui);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);color:var(--muted,#6c6a6a)}.mkm-chip.d{background:color-mix(in srgb,var(--red,#c8102e) 14%,transparent);color:var(--red,#c8102e)}" +
    "@media(prefers-reduced-motion:reduce){.mkm-th,.mkm-pn,.mkm-bars i,.mkm-cta,.mkm-row{animation:none;transition:none}}";
  function addCss() { if (document.getElementById("mks-css")) return; var st = document.createElement("style"); st.id = "mks-css"; st.textContent = CSS + CSS2; document.head.appendChild(st); }

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
    return '<div class="mks-c"><div class="mks-bs"><button type="button" class="mks-b p" data-ex>' + t("Exportar copia", "Exportar còpia") + '</button><button type="button" class="mks-b" data-cp>' + t("Copiar código", "Copiar codi") + '</button><button type="button" class="mks-b" data-lk>' + t("Enlace para otro dispositivo", "Enllaç per a un altre dispositiu") + '</button><label class="mks-b" style="position:relative">' + t("Importar archivo", "Importar fitxer") + '<input type="file" accept="application/json,.json" id="mks-file" class="mks-sr" tabindex="-1" aria-hidden="true"></label><button type="button" class="mks-b" data-pa>' + t("Pegar código", "Enganxar codi") + '</button></div><div id="mks-imp"></div><p class="mks-n" style="margin:0">' + t("Incluye racha, favoritos, problemas hechos, repasos, tiempo y ajustes. Se guarda solo en este navegador: usa la copia para cambiar de móvil o por si borras los datos.", "Inclou ratxa, favorits, problemes fets, repassos, temps i ajustos. Es desa només en aquest navegador: fes servir la còpia per canviar de mòbil o per si esborres les dades.") + "</p></div>";
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
    bd.addEventListener("click", onClick); bd.addEventListener("change", onChange); bd.addEventListener("keydown", onTabKey);
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
  /* ---------- Mi cuenta: estadísticas, fallados, favoritos, estudio y cuenta en una pantalla ---------- */
  function pro() { try { return !!LS.getItem("mk-acct"); } catch (e) { return false; } }
  var SV = { lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>', chart: '<path d="M5 20V10M12 20V4M19 20v-7"/>', flag: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>', star: '<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8-4.2-4.1 5.8-.8z"/>', target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>', clock: '<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9.5 3h5"/>', note: '<path d="M6 4h9l3 3v13H6z"/><path d="M9 12h6M9 16h4"/>', rp: '<path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 0 1-3 3H4"/>', user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.9-3.600 4-5.500 7.500-5.500s6.600 1.900 7.500 5.500"/>' };
  function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + SV[n] + "</svg>"; }
  var TABS = [["res", "Resumen", "Resum"], ["fallos", "Fallados", "Fallats"], ["fav", "Favoritos", "Favorits"], ["est", "Estudio", "Estudi"], ["cuenta", "Cuenta", "Compte"]];
  var TABMAP = { res: "res", plan: "res", fallos: "fallos", fav: "fav", est: "est", notes: "est", cuenta: "cuenta" };
  var curTab = "res", lockFor = "", favF = "all";
  function acct() { try { return window.mkAcct && window.mkAcct.user ? window.mkAcct.user() : null; } catch (e) { return null; } }
  function heroHTML(P) {
    var u = acct(), nm = u ? (u.displayName || u.email || u.phoneNumber || "") : "", av = u && u.photoURL ? '<img src="' + esc(u.photoURL) + '" alt="" referrerpolicy="no-referrer">' : esc((nm || "?").trim().charAt(0).toUpperCase());
    return '<div class="mkm-hero"><span class="mkm-av" aria-hidden="true">' + (P ? av : ic("user")) + "</span><div><b>" + esc(P ? (u && u.displayName) || t("Tu cuenta", "El teu compte") : t("Sin cuenta", "Sense compte")) + "</b><small>" + esc(P ? (u && (u.email || u.phoneNumber)) || "" : t("Entra para desbloquear todo", "Entra per desbloquejar-ho tot")) + "</small></div></div>";
  }
  function tabsHTML() {
    return '<div class="mkm-tabs" role="tablist" aria-label="' + t("Secciones de Mi cuenta", "Seccions d’El meu compte") + '"><span class="mkm-th" aria-hidden="true"></span>' + TABS.map(function (x) { var on = x[0] === curTab; return '<button type="button" role="tab" id="mkm-t-' + x[0] + '" data-tab="' + x[0] + '" aria-selected="' + on + '" aria-controls="mkm-pn" tabindex="' + (on ? 0 : -1) + '">' + t(x[1], x[2]) + "</button>"; }).join("") + "</div>";
  }
  function placeThumb() { var tb = bd.querySelector(".mkm-tabs"), b = tb && tb.querySelector("[aria-selected=true]"), th = tb && tb.querySelector(".mkm-th"); if (!b || !th || !b.offsetWidth) return; th.style.width = b.offsetWidth + "px"; th.style.transform = "translateX(" + b.offsetLeft + "px)"; try { b.scrollIntoView({ inline: "center", block: "nearest" }); } catch (e) { } }
  function lockedHTML() {
    var why = { fav: t("Los favoritos son parte de Mi cuenta.", "Els favorits són part d’El meu compte."), fallos: t("Los fallados y su repaso son parte de Mi cuenta.", "Els fallats i el seu repàs són part d’El meu compte.") }[lockFor] || t("Entra para guardar tu progreso y desbloquear las herramientas de estudio.", "Entra per desar el teu progrés i desbloquejar les eines d’estudi.");
    var F = [["chart", "#30d158", t("Estadísticas y informe semanal", "Estadístiques i informe setmanal"), t("Racha, horas, progreso y tendencia", "Ratxa, hores, progrés i tendència")], ["flag", "#ff453a", t("Problemas fallados", "Problemes fallats"), t("Repaso espaciado de lo que te cuesta", "Repàs espaiat del que et costa")], ["star", "#ff9f0a", t("Favoritos y marcadores", "Favorits i marcadors"), t("Páginas y problemas a un toque", "Pàgines i problemes a un toc")], ["target", "#ff375f", t("Objetivo semanal y logros", "Objectiu setmanal i assoliments"), t("Metas con anillo de progreso", "Metes amb anell de progrés")], ["clock", "#0a84ff", t("Modo examen", "Mode examen"), t("Simulacros PAU con reloj y nota", "Simulacres PAU amb rellotge i nota")], ["note", "#bf5af2", t("Notas", "Notes"), t("Apunta trucos y dudas", "Apunta trucs i dubtes")]];
    return '<div class="mkm-lock"><i>' + ic("lock") + "</i><h3>" + t("Mi cuenta", "El meu compte") + "</h3><p>" + why + '</p></div><button type="button" class="mkm-cta" data-acc>' + t("Entrar o crear cuenta", "Entra o crea un compte") + '</button><ul class="mkm-ft">' + F.map(function (f) { return '<li style="--c:' + f[1] + '"><i>' + ic(f[0]) + "</i><span><b>" + f[2] + "</b><small>" + f[3] + "</small></span></li>"; }).join("") + '</ul><p class="mks-n">' + t("Es gratis. Tu progreso se sincroniza entre dispositivos.", "És gratuït. El teu progrés se sincronitza entre dispositius.") + '</p><div class="mks-c"><details' + (lockFor === "cuenta" ? " open" : "") + '><summary>' + t("Copia de seguridad (gratis)", "Còpia de seguretat (gratuïta)") + "</summary>" + dataHTML() + "</details></div>";
  }
  /* informe semanal */
  function secs(o) { var n = 0; if (o) Object.keys(o).forEach(function (k) { n += o[k] | 0; }); return n; }
  function weekReport() {
    var tm = g("mk-time", {}), now = new Date(); now.setHours(0, 0, 0, 0); var mon = new Date(now); mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
    var cur = [], ct = 0, pt = 0, i; for (i = 0; i < 7; i++) { var d = new Date(mon); d.setDate(mon.getDate() + i); var sc = secs(tm[iso(d)]); cur.push({ d: d, s: sc, f: d > now }); ct += sc; var pd = new Date(d); pd.setDate(d.getDate() - 7); pt += secs(tm[iso(pd)]); }
    var hs = g("mk-exm", []).filter(function (x) { return x.t >= mon.getTime(); }), avg = hs.length ? hs.reduce(function (a, x) { return a + (+x.n || 0); }, 0) / hs.length : null;
    return { cur: cur, ct: ct, pt: pt, today: Math.round((now - mon) / DAY), exams: hs.length, avg: avg };
  }
  function weekHTML(D) {
    var R = weekReport(), mx = Math.max.apply(null, R.cur.map(function (x) { return x.s; }).concat([60])), dl = "";
    if (R.pt > 0 || R.ct > 0) { var pc = R.pt ? Math.round((R.ct - R.pt) / R.pt * 100) : null; dl = pc === null ? "" : '<span class="mkm-dl ' + (pc >= 0 ? "up" : "dn") + '">' + (pc >= 0 ? "▲ " : "▼ ") + Math.abs(pc) + " % " + t("vs. semana pasada", "vs. setmana passada") + "</span>"; }
    var dn = ["L", "M", "X", "J", "V", "S", "D"], bars = R.cur.map(function (x, i) { return '<div class="' + (i === R.today ? "t" : x.f ? "f" : "") + '"><i style="height:' + Math.max(4, Math.round(x.s / mx * 100)) + '%" title="' + durS(x.s) + '"></i><span>' + dn[i] + "</span></div>"; }).join("");
    var go = null; try { go = window.mkEstudio && window.mkEstudio.info().goal; } catch (e) { }
    var extra = []; if (go) extra.push("<b>" + go.p + "/" + go.n + "</b> " + t("del objetivo semanal", "de l’objectiu setmanal")); if (R.exams) extra.push("<b>" + R.exams + "</b> " + (R.exams === 1 ? t("simulacro", "simulacre") : t("simulacros", "simulacres")) + (R.avg != null ? " · " + t("media ", "mitjana ") + String(Math.round(R.avg * 100) / 100).replace(".", ",") : ""));
    return "<h3>" + t("Informe semanal", "Informe setmanal") + '</h3><div class="mks-c mkm-wk"><div class="mkm-wh"><b>' + durS(R.ct) + "</b>" + dl + '</div><div class="mkm-bars" role="img" aria-label="' + t("Tiempo de estudio por día de esta semana", "Temps d’estudi per dia d’aquesta setmana") + '">' + bars + "</div>" + (extra.length ? '<p class="mks-n" style="margin:0">' + extra.join(" · ") + "</p>" : "") + "</div>";
  }
  function resHTML(D) {
    return '<div class="mks-tl">' + tile(D.streak, t("días de racha", "dies de ratxa"), "#ff9f0a") + tile(durS(D.wk), t("esta semana", "aquesta setmana"), "#0a84ff", true) + tile(D.done, t("de ", "de ") + TOTAL + t(" problemas", " problemes"), "#30d158") + "</div>" + weekHTML(D) +
      '<div class="mks-c" id="mkm-ach"></div>' +
      "<h3>" + t("Cuenta atrás de la PAU", "Compte enrere de la PAU") + "</h3>" + pauHTML(D) +
      "<h3>" + t("Plan de estudio", "Pla d’estudi") + '</h3><div class="mks-c" id="mks-plan"><p class="mks-n" style="margin:0">' + t("Preparando tu plan…", "Preparant el teu pla…") + "</p></div>" +
      "<h3>" + t("Recordatorios", "Recordatoris") + '</h3><div class="mks-c" id="mks-rem"></div>' +
      "<h3>" + t("Progreso por materia", "Progrés per matèria") + "</h3>" + subjectCard("m", D) + subjectCard("f", D) +
      "<h3>" + t("Puntos débiles", "Punts febles") + '</h3><p class="mks-n">' + t("Los temas con menos problemas hechos.", "Els temes amb menys problemes fets.") + "</p>" + weakHTML(D) +
      "<h3>" + t("Tiempo de estudio", "Temps d’estudi") + "</h3>" + timeHTML(D);
  }
  /* fallados */
  var SN = { m: ["Matemáticas II", "Matemàtiques II"], f: ["Física II", "Física II"], h: ["Historia de la Filosofía", "Història de la Filosofia"] };
  function failList() {
    var r = g("mk-pmr", {}), out = []; Object.keys(r).forEach(function (id) { var m = /^([fh]?)(\d{4})-(\d+)\|(.+)$/.exec(id); if (!m) return; var due = (r[id].t || 0) + IV[Math.min(r[id].n | 0, IV.length - 1)] * DAY; out.push({ id: id, k: m[1] || "m", y: m[2], sid: m[3], u: m[4], due: due, isDue: Date.now() >= due, n: r[id].n | 0 }); });
    out.sort(function (a, b) { return a.due - b.due; }); return out;
  }
  function failHTML(D) {
    var L = failList(), due = L.filter(function (x) { return x.isDue; }).length;
    if (!L.length) return '<div class="mks-c"><p class="mks-n" style="margin:0">' + t("Aún no tienes apartados fallados. En los problemas PAU, toca «Me falló» y volverán aquí con repaso espaciado (1, 3, 7, 14 y 30 días).", "Encara no tens apartats fallats. Als problemes PAU, toca «M’ha fallat» i tornaran aquí amb repàs espaiat (1, 3, 7, 14 i 30 dies).") + '</p><a class="mks-b" style="text-align:center;display:flex;align-items:center;justify-content:center;text-decoration:none" href="problemes.html#pau">' + t("Ir a los problemas PAU", "Ves als problemes PAU") + "</a></div>" + "<h3>" + t("Apuntes para repasar", "Apunts per repassar") + "</h3>" + dueHTML(D);
    var rows = L.map(function (x) {
      var d = Math.ceil((x.due - Date.now()) / DAY), ch = x.isDue ? '<span class="mkm-chip d">' + t("hoy", "avui") + "</span>" : '<span class="mkm-chip">' + (d <= 1 ? t("mañana", "demà") : t("en ", "d’aquí a ") + d + t(" días", " dies")) + "</span>";
      return '<div class="mkm-it"><a class="mks-lk" href="problemes.html#pau" data-pmgo="' + esc(x.k + "|" + x.id) + '"><b>' + esc(t(SN[x.k][0], SN[x.k][1])) + " · PAU " + x.y + "</b><small>" + t("Serie ", "Sèrie ") + x.sid + " · " + t("Apartado ", "Apartat ") + esc(x.u.replace(/^([A-Z])\|/, "$1 · ")) + "</small></a>" + ch + '<button type="button" class="mkm-x" data-rmf="' + esc(x.id) + '" aria-label="' + t("Quitar de fallados", "Treu de fallats") + ": " + esc(x.u) + '">×</button></div>';
    }).join("");
    return '<button type="button" class="mkm-row" data-est="rev" style="--c:#ff453a"><i>' + ic("rp") + "</i><span><b>" + t("Repaso por fallos", "Repàs per errors") + "</b><small>" + (due ? due + t(" para repasar hoy", " per repassar avui") : t("Al día · practica igualmente", "Al dia · practica igualment")) + "</small></span><em aria-hidden=\"true\">›</em></button>" +
      "<h3>" + L.length + " " + (L.length === 1 ? t("apartado fallado", "apartat fallat") : t("apartados fallados", "apartats fallats")) + '</h3><div class="mks-c">' + rows + "</div><h3>" + t("Apuntes para repasar", "Apunts per repassar") + "</h3>" + dueHTML(D);
  }
  /* favoritos */
  function favHTML() {
    var all = window.mkFav ? window.mkFav.list() : [], kd = function (x) { return x.k || (/[?&]p=/.test(x.u) ? "prob" : "page"); };
    var cnt = { all: all.length, page: 0, prob: 0, mark: 0 }; all.forEach(function (x) { cnt[kd(x)] = (cnt[kd(x)] | 0) + 1; });
    var chips = [["all", t("Todos", "Tots")], ["page", t("Páginas", "Pàgines")], ["prob", t("Problemas", "Problemes")], ["mark", t("Marcadores", "Marcadors")]].map(function (c) { return '<button type="button" data-favf="' + c[0] + '" aria-pressed="' + (favF === c[0]) + '">' + c[1] + (cnt[c[0]] ? " " + cnt[c[0]] : "") + "</button>"; }).join("");
    var L = all.filter(function (x) { return favF === "all" || kd(x) === favF; });
    var list = L.length ? '<div class="mks-c">' + L.map(function (x) { var u = window.MKL_url ? window.MKL_url(x.u) : x.u; return '<div class="mkm-it"><a href="' + esc(u) + '"><b>' + esc(x.t) + "</b><small>" + esc(x.s || x.u.split(/[?#]/)[0]) + '</small></a><button type="button" class="mkm-x" data-rmfav="' + esc(x.u) + '" aria-label="' + t("Quitar de favoritos", "Treu dels favorits") + ": " + esc(x.t) + '">×</button></div>'; }).join("") + "</div>" : '<div class="mks-c"><p class="mks-n" style="margin:0">' + t("Aún no tienes nada aquí. Toca ★ en una página o un problema, o deja un marcador para volver justo donde lo dejaste.", "Encara no tens res aquí. Toca ★ en una pàgina o un problema, o deixa un marcador per tornar just on ho vas deixar.") + "</p></div>";
    return '<div class="mkm-chips" role="group" aria-label="' + t("Filtrar favoritos", "Filtra favorits") + '">' + chips + "</div>" + list + '<button type="button" class="mkm-row" data-favm style="--c:#ff9f0a"><i>' + ic("star") + "</i><span><b>" + t("Gestionar favoritos", "Gestiona els favorits") + "</b><small>" + t("Buscar, fijar y ordenar", "Cerca, fixa i ordena") + "</small></span><em aria-hidden=\"true\">›</em></button>";
  }
  /* notas */
  function notes() { var a = g("mk-notes", []); return Array.isArray(a) ? a.filter(function (x) { return x && x.id && typeof x.t === "string"; }) : []; }
  function addNote(txt, where) {
    txt = String(txt || "").trim().slice(0, 600); if (!txt) return null;
    var a = notes(), n = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), t: txt, d: Date.now(), w: where || ((document.querySelector("h1:not(.sr-only)") || {}).textContent || document.title || "").trim().slice(0, 50), u: (location.pathname.split("/").pop() || "index.html") + (/^#(pau)?$/.test(location.hash) ? "" : location.hash) };
    a.unshift(n); s("mk-notes", a.slice(0, 200)); return n;
  }
  function delNote(id) { s("mk-notes", notes().filter(function (x) { return x.id !== id; })); }
  function estHTML() {
    var I = {}; try { I = window.mkEstudio ? window.mkEstudio.info() : {}; } catch (e) { }
    var go = I.goal, rows = [["goal", "target", "#ff375f", t("Objetivo semanal", "Objectiu setmanal"), go ? go.p + "/" + go.n + t(" problemas esta semana", " problemes aquesta setmana") : t("Fija cuántos problemas harás por semana", "Fixa quants problemes faràs per setmana")], ["rev", "rp", "#ff453a", t("Repaso por fallos", "Repàs per errors"), I.due ? I.due + t(" para repasar hoy", " per repassar avui") : t("Sesión con lo que te cuesta", "Sessió amb el que et costa")], ["exm", "clock", "#0a84ff", t("Modo examen", "Mode examen"), I.run ? t("Examen en curso", "Examen en curs") : t("Simulacro PAU con reloj y nota", "Simulacre PAU amb rellotge i nota")]];
    var ns = notes();
    return rows.map(function (r) { return '<button type="button" class="mkm-row" data-est="' + r[0] + '" style="--c:' + r[2] + '"><i>' + ic(r[1]) + "</i><span><b>" + r[3] + "</b><small>" + r[4] + '</small></span><em aria-hidden="true">›</em></button>'; }).join("") +
      "<h3>" + t("Notas", "Notes") + '</h3><div class="mks-c"><label class="mks-sr" for="mkm-nt">' + t("Nueva nota", "Nova nota") + '</label><textarea class="mkm-ta" id="mkm-nt" maxlength="600" placeholder="' + t("Un truco, una duda, algo que repasar…", "Un truc, un dubte, alguna cosa per repassar…") + '"></textarea><button type="button" class="mks-b p" data-note-add>' + t("Guardar nota", "Desa la nota") + "</button>" +
      (ns.length ? ns.slice(0, 30).map(function (n) { return '<div class="mkm-it"><a href="' + esc(n.u || "index.html") + '"><b style="font-weight:600;white-space:normal">' + esc(n.t) + "</b><small>" + esc(n.w || "") + (n.w ? " · " : "") + new Date(n.d).toLocaleDateString(es() ? "es-ES" : "ca-ES", { day: "numeric", month: "short" }) + '</small></a><button type="button" class="mkm-x" data-note-del="' + esc(n.id) + '" aria-label="' + t("Borrar nota", "Esborra la nota") + '">×</button></div>'; }).join("") : '<p class="mks-n" style="margin:0">' + t("Tus notas aparecen aquí y se sincronizan con la cuenta.", "Les teves notes apareixen aquí i se sincronitzen amb el compte.") + "</p>") + "</div>";
  }
  function cuentaHTML() {
    var u = acct();
    return '<div class="mks-c"><div class="mks-rr"><div style="flex:1;min-width:0"><b>' + esc((u && (u.displayName || u.email || u.phoneNumber)) || t("Tu cuenta", "El teu compte")) + "</b><small>" + t("Sesión iniciada · progreso sincronizado", "Sessió iniciada · progrés sincronitzat") + '</small></div></div><button type="button" class="mks-b" data-acc>' + t("Métodos de acceso y sesión", "Mètodes d’accés i sessió") + '</button><button type="button" class="mks-b" data-accx>' + t("Descargar mis datos", "Descarrega les meves dades") + "</button></div>" +
      "<h3>" + t("Copia de seguridad", "Còpia de seguretat") + "</h3>" + dataHTML();
  }
  function panel(D) { return curTab === "fallos" ? failHTML(D) : curTab === "fav" ? favHTML() : curTab === "est" ? estHTML() : curTab === "cuenta" ? cuentaHTML() : resHTML(D); }
  function after() {
    if (curTab === "res") { countUp(); loadPlan(); loadRem(); var a = bd.querySelector("#mkm-ach"); if (a && window.mkAch) window.mkAch.mount(a); }
    var tb = bd.querySelector(".mkm-tabs"); if (tb) { placeThumb(); }
  }
  function render() {
    var D = data(), P = pro(); ttl.textContent = t("Mi cuenta", "El meu compte");
    bd.innerHTML = heroHTML(P) + (P ? tabsHTML() + '<div class="mkm-pn" id="mkm-pn" role="tabpanel" aria-labelledby="mkm-t-' + curTab + '">' + panel(D) + "</div>" : lockedHTML());
    if (P) after();
    else { var cta = bd.querySelector(".mkm-cta"); void cta; }
  }
  function setTab(k, keepFocus) {
    curTab = k; var y0 = bd.scrollTop; render(); bd.scrollTop = Math.min(y0, (bd.querySelector(".mkm-tabs") || { offsetTop: 0 }).offsetTop);
    if (keepFocus) { var b = bd.querySelector('[role=tab][aria-selected=true]'); b && b.focus({ preventScroll: true }); }
    say(t(TABS.filter(function (x) { return x[0] === k; })[0][1], TABS.filter(function (x) { return x[0] === k; })[0][2]));
  }
  function later(f) { close(); setTimeout(f, 260); }
  function myClick(e) {
    var b = e.target.closest("[data-tab],[data-est],[data-rmf],[data-rmfav],[data-favf],[data-favm],[data-note-add],[data-note-del],[data-acc],[data-accx]"); if (!b) return false;
    if (b.hasAttribute("data-tab")) { setTab(b.getAttribute("data-tab"), true); return true; }
    if (b.hasAttribute("data-est")) { var k = b.getAttribute("data-est"); later(function () { window.mkEstudio && window.mkEstudio.open(k); }); return true; }
    if (b.hasAttribute("data-acc")) { later(function () { window.mkAcct && window.mkAcct.open(); }); return true; }
    if (b.hasAttribute("data-accx")) { if (window.mkAcct && window.mkAcct.exportData) window.mkAcct.exportData(); else doExport(); return true; }
    if (b.hasAttribute("data-favm")) { later(function () { window.mkFav && window.mkFav.manage(); }); return true; }
    if (b.hasAttribute("data-favf")) { favF = b.getAttribute("data-favf"); var y = bd.scrollTop; render(); bd.scrollTop = y; var f = bd.querySelector('[data-favf="' + favF + '"]'); f && f.focus({ preventScroll: true }); return true; }
    if (b.hasAttribute("data-rmfav")) { var u = b.getAttribute("data-rmfav"); window.mkFav && window.mkFav.toggle(u); var y2 = bd.scrollTop; render(); bd.scrollTop = y2; say(t("Quitado de favoritos", "Tret dels favorits")); return true; }
    if (b.hasAttribute("data-rmf")) { var r = g("mk-pmr", {}); delete r[b.getAttribute("data-rmf")]; s("mk-pmr", r); var y3 = bd.scrollTop; render(); bd.scrollTop = y3; say(t("Quitado de fallados", "Tret de fallats")); return true; }
    if (b.hasAttribute("data-note-add")) { var ta = bd.querySelector("#mkm-nt"); if (ta && addNote(ta.value)) { var y4 = bd.scrollTop; render(); bd.scrollTop = y4; say(t("Nota guardada", "Nota desada")); fb("done"); var n2 = bd.querySelector("#mkm-nt"); n2 && n2.focus({ preventScroll: true }); } else if (ta) ta.focus(); return true; }
    if (b.hasAttribute("data-note-del")) { delNote(b.getAttribute("data-note-del")); var y5 = bd.scrollTop; render(); bd.scrollTop = y5; say(t("Nota borrada", "Nota esborrada")); return true; }
    return false;
  }
  function onTabKey(e) {
    var tb = e.target.closest && e.target.closest("[role=tab]"); if (!tb || (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End")) return;
    e.preventDefault(); var ks = TABS.map(function (x) { return x[0]; }), i = ks.indexOf(tb.getAttribute("data-tab"));
    i = e.key === "Home" ? 0 : e.key === "End" ? ks.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + ks.length) % ks.length; setTab(ks[i], true);
  }
  function loadRem() {
    var el = bd.querySelector("#mks-rem"); if (!el) return;
    function go() { window.mkRem && window.mkRem.mount(el); }
    if (window.mkRem) return go();
    var sc = document.createElement("script"); sc.src = "recordar.js"; sc.onload = go; sc.onerror = function () { el.innerHTML = '<p class="mks-n" style="margin:0">' + t("Necesita conexión la primera vez.", "Necessita connexió la primera vegada.") + "</p>"; }; document.head.appendChild(sc);
  }
  function loadPlan() {
    var el = bd.querySelector("#mks-plan"); if (!el) return;
    function go() { window.mkPlan && window.mkPlan.mount(el); }
    if (window.mkPlan) return go();
    var sc = document.createElement("script"); sc.src = "plan.js"; sc.onload = go; sc.onerror = function () { el.innerHTML = '<p class="mks-n" style="margin:0">' + t("El plan necesita conexión la primera vez.", "El pla necessita connexió la primera vegada.") + "</p>"; }; document.head.appendChild(sc);
  }
  function pauDueHTML() {
    var r = g("mk-pmr", {}), n = 0, now = Date.now(), first = null;
    Object.keys(r).forEach(function (id) { var e = r[id], d = (e.t || 0) + IV[Math.min(e.n | 0, IV.length - 1)] * DAY; if (now >= d) { n++; if (!first) first = id; } });
    if (!n) return "";
    var m = /^([fh]?)(\d{4})-(\d+)\|/.exec(first || "");
    return '<div class="mks-c"><div class="mks-rr"><a class="mks-lk" href="problemes.html#pau" data-pmgo="' + esc((m && m[1] || "m") + "|" + first) + '"><b>' + n + t(" apartados de problemas PAU que te fallaron", " apartats de problemes PAU que t’han fallat") + "</b><small>" + t("Toca repasarlos hoy", "Toca repassar-los avui") + "</small></a></div></div>";
  }
  function countUp() {
    [].forEach.call(bd.querySelectorAll("[data-n]"), function (n) {
      var v = +n.getAttribute("data-n"); if (reduce || v < 2) { n.textContent = v; return; }
      var t0 = performance.now(); n.textContent = "0"; (function step(now) { var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3); n.textContent = Math.round(v * e); if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }
  function open(sec) {
    ensure(); if (isOpen) return; isOpen = true; last = document.activeElement; curTab = (sec && TABMAP[sec]) || "res"; lockFor = sec || ""; render();
    ov.setAttribute("aria-hidden", "false"); ov.getBoundingClientRect(); ov.classList.add("on"); fb("open"); bd.scrollTop = 0;
    setTimeout(function () { ttl.focus({ preventScroll: true }); if (sec === "plan") { var pl = bd.querySelector("#mks-plan"); pl && pl.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" }); } }, 80);
  }
  function close() { if (!isOpen) return; isOpen = false; ov.classList.remove("on"); ov.setAttribute("aria-hidden", "true"); last && last.focus && last.focus({ preventScroll: true }); }

  /* ---------- acciones ---------- */
  function onClick(e) {
    if (myClick(e)) return;
    var a0 = e.target.closest("a[data-pmgo]");
    if (a0) { var q = a0.getAttribute("data-pmgo").split("|"); try { sessionStorage.setItem("mk-pm-go", JSON.stringify({ s: q[0], rv: q.slice(1).join("|") })); } catch (x) {} close(); if (/problemes\.html$/.test(location.pathname)) { e.preventDefault(); if (location.hash === "#pau") location.reload(); else location.hash = "#pau"; } return; }
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-rv")) { var pid = b.getAttribute("data-rv"), rv = g("mk-rv", {}), r = rv[pid] || { n: 0 }; rv[pid] = { n: (r.n | 0) + 1, t: Date.now() }; s("mk-rv", rv); fb("done"); say(t("Repaso guardado", "Repàs desat")); var y = bd.scrollTop; render(); bd.scrollTop = y; }
    else if (b.hasAttribute("data-pau-x")) { try { LS.removeItem("mk-pau"); } catch (x) {} var y2 = bd.scrollTop; render(); bd.scrollTop = y2; say(t("Fecha quitada", "Data treta")); }
    else if (b.hasAttribute("data-ex")) doExport();
    else if (b.hasAttribute("data-cp")) doCopy();
    else if (b.hasAttribute("data-lk")) doLink();
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
    s("mk-bk", String(Date.now())); flush(); return { app: "menudo-kanteo", v: 1, t: new Date().toISOString(), data: out };
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
  /* ---------- sincronizar por enlace: los datos viajan comprimidos en el # (nunca llegan a un servidor) ---------- */
  function b64u(buf) { var b = new Uint8Array(buf), x = ""; for (var i = 0; i < b.length; i += 8192) x += String.fromCharCode.apply(null, b.subarray(i, i + 8192)); return btoa(x).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function unb64u(x) { x = x.replace(/-/g, "+").replace(/_/g, "/"); while (x.length % 4) x += "="; var b = atob(x), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function pipe(data, Ctor, mode) { var st = new Ctor(mode), w = st.writable.getWriter(); w.write(data).catch(function () { }); w.close().catch(function () { }); return new Response(st.readable).arrayBuffer(); }
  function pack(text) {
    var raw = new TextEncoder().encode(text);
    if (window.CompressionStream) return pipe(raw, CompressionStream, "deflate-raw").then(function (b) { return "1." + b64u(b); });
    return Promise.resolve("0." + b64u(raw));
  }
  function unpack(p) {
    var k = p.slice(0, 2), u = unb64u(p.slice(2));
    if (k === "0.") return Promise.resolve(new TextDecoder().decode(u));
    if (k === "1." && window.DecompressionStream) return pipe(u, DecompressionStream, "deflate-raw").then(function (b) { return new TextDecoder().decode(b); });
    return Promise.reject(new Error("fmt"));
  }
  function doLink() {
    pack(JSON.stringify(snapshot())).then(function (p) {
      var url = new URL("index.html", location.href).href.split("#")[0] + "#mk-sync=" + p;
      if (url.length > 60000) { imp(msg(t("Tus datos son demasiados para un enlace. Usa «Exportar copia».", "Les teves dades són massa per a un enllaç. Fes servir «Exportar còpia»."), true)); return; }
      function manual() { imp('<label class="mks-n" for="mks-ta" style="margin:0">' + t("Copia este enlace y ábrelo en el otro dispositivo:", "Copia aquest enllaç i obre’l a l’altre dispositiu:") + '</label><textarea class="mks-in mks-ta" id="mks-ta" readonly></textarea>'); var ta = bd.querySelector("#mks-ta"); if (ta) { ta.value = url; ta.focus(); ta.select(); } }
      function copied() { fb("done"); say(t("Enlace copiado", "Enllaç copiat")); imp(msg(t("Enlace copiado. Envíatelo (WhatsApp, correo…) y ábrelo en el otro dispositivo. Contiene tus datos: no lo compartas con nadie más.", "Enllaç copiat. Envia’t-lo (WhatsApp, correu…) i obre’l a l’altre dispositiu. Conté les teves dades: no el comparteixis amb ningú més."))); }
      if (navigator.share && /iPhone|iPad|Android/i.test(navigator.userAgent)) navigator.share({ url: url, title: "Menudo Kanteo" }).then(function () { say(t("Enlace compartido", "Enllaç compartit")); }, function (e) { if (e && e.name !== "AbortError") manual(); });
      else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(copied, manual); else manual();
    }, function () { imp(msg(t("No se pudo crear el enlace.", "No s’ha pogut crear l’enllaç."), true)); });
  }
  function syncIn() {
    var m = /^#mk-sync=([01]\.[A-Za-z0-9_-]+)$/.exec(location.hash); if (!m) return;
    var p = m[1]; try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    unpack(p).then(function (text) { open("cuenta"); setTimeout(function () { var n = bd && bd.querySelector("#mks-imp"); if (n) { n.scrollIntoView({ block: "center" }); } prepare(text); }, 150); },
      function () { open("cuenta"); setTimeout(function () { imp(msg(t("El enlace no es válido o está incompleto.", "L’enllaç no és vàlid o està incomplet."), true)); }, 150); });
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", syncIn); else syncIn();
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
    if (k === "mk-ach") { Object.keys(b).forEach(function (i) { if (!a[i] || b[i] < a[i]) a[i] = b[i]; }); return JSON.stringify(a); }
    if (k === "mk-pm") { Object.keys(b).forEach(function (key) { a[key] = Object.assign({}, b[key], a[key] || {}); }); return JSON.stringify(a); }
    if (k === "mk-rvf") return JSON.stringify(Object.assign({}, b, a));
    if (k === "mk-pmr") { Object.keys(b).forEach(function (id) { if (!a[id] || (b[id].t | 0) > (a[id].t | 0)) a[id] = b[id]; }); return JSON.stringify(a); }
    if (k === "mk-notes" && Array.isArray(a) && Array.isArray(b)) { var ids = {}; a.forEach(function (x) { ids[x.id] = 1; }); return JSON.stringify(a.concat(b.filter(function (x) { return x && x.id && !ids[x.id]; })).sort(function (p, q) { return q.d - p.d; }).slice(0, 200)); }
    if (k === "mk-goal") return (b.u | 0) > (a.u | 0) ? JSON.stringify(b) : cur;
    if (k === "mk-goalh") return JSON.stringify(Object.assign({}, b, a));
    if (k === "mk-rvs") return String(Math.max(+a || 0, +b || 0));
    if (k === "mk-exm" && Array.isArray(a) && Array.isArray(b)) { var ts = {}; a.forEach(function (x) { ts[x.t] = 1; }); return JSON.stringify(a.concat(b.filter(function (x) { return x && !ts[x.t]; })).sort(function (p, q) { return p.t - q.t; }).slice(-60)); }
    if (k === "mk-rv") { Object.keys(b).forEach(function (p) { if (!a[p] || (b[p].n | 0) > (a[p].n | 0)) a[p] = b[p]; }); return JSON.stringify(a); }
    if (k === "mk-streak") { var nw = (b.d || "") > (a.d || "") ? b : a, o = Object.assign({}, nw); o.h = Array.from(new Set((a.h || []).concat(b.h || []))).sort().slice(-400); o.b = Math.max(a.b | 0, b.b | 0); o.m = Math.max(a.m | 0, b.m | 0); return JSON.stringify(o); }
    return cur;
  }
  /* API para la sincronización con la cuenta (cuenta.js): fusiona un conjunto de claves sin recargar. Devuelve true si cambió algo. */
  window.mkSync = { merge: function (inc) {
    var ch = false;
    try { Object.keys(inc || {}).forEach(function (k) { var v = inc[k]; if (!KEYRE.test(k) || typeof v !== "string" || v.length > 1e6) return; var cur = LS.getItem(k); if (cur == null) { LS.setItem(k, v); ch = true; } else { var m = mergeKey(k, cur, v); if (m !== cur) { LS.setItem(k, m); ch = true; } } }); } catch (e) {}
    return ch;
  } };
  function applyImport(mode) {
    if (!pending) return; var inc = pending, n = 0;
    try {
      if (mode === "replace") { var rm = []; for (var i = 0; i < LS.length; i++) if (KEYRE.test(LS.key(i))) rm.push(LS.key(i)); rm.forEach(function (k) { LS.removeItem(k); }); Object.keys(inc).forEach(function (k) { LS.setItem(k, inc[k]); n++; }); }
      else Object.keys(inc).forEach(function (k) { var cur = LS.getItem(k); if (cur == null) LS.setItem(k, inc[k]); else { var m = mergeKey(k, cur, inc[k]); if (m !== cur) LS.setItem(k, m); } n++; });
    } catch (e) { imp(msg(t("No se pudo guardar (¿sin espacio?).", "No s’ha pogut desar (sense espai?)."), true)); return; }
    pending = null; fb("done"); say(t("Copia importada. Recargando…", "Còpia importada. Recarregant…")); imp(msg(t("Hecho. Recargando…", "Fet. Recarregant…"))); setTimeout(function () { location.reload(); }, 900);
  }

  /* ---------- aviso de copia de seguridad: cada 3 semanas, solo si hay progreso que perder ---------- */
  function bkInit() {
    var DAYS = 21, now = Date.now();
    function n(k) { var v = g(k, {}); return Array.isArray(v) ? v.length : Object.keys(v || {}).length; }
    if (n("mk-done") + n("mk-pm") + n("mk-fav") + n("mk-rv") + n("mk-pmr") < 5) return;
    var since = +LS.getItem("mk-since") || 0; if (!since) { s("mk-since", String(now)); since = now; }
    var base = Math.max(+LS.getItem("mk-bk") || 0, since);
    if (now - base < DAYS * 864e5 || now < (+LS.getItem("mk-bkz") || 0)) return;
    try { if (sessionStorage.getItem("mk-bks")) return; } catch (e) {}
    var days = Math.floor((now - base) / 864e5), box;
    var st = document.createElement("style");
    st.textContent = ".mkbk{position:fixed;z-index:2147483000;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));width:min(440px,calc(100vw - 32px));box-sizing:border-box;display:grid;gap:10px;padding:16px 18px;border-radius:24px;background:color-mix(in srgb,var(--bg,#fff) 78%,transparent);-webkit-backdrop-filter:blur(24px) saturate(180%);backdrop-filter:blur(24px) saturate(180%);color:var(--fg,#111);box-shadow:0 18px 50px -14px #0006,inset 0 0 0 1px color-mix(in srgb,var(--fg,#111) 10%,transparent);transform:translate(-50%,24px) scale(.96);opacity:0;transition:transform .55s cubic-bezier(.3,1.35,.5,1),opacity .3s}.mkbk.on{transform:translate(-50%,0);opacity:1}.mkbk p{margin:0;font:500 14.5px/1.45 var(--sans,system-ui,sans-serif)}.mkbk b{font-weight:700}.mkbk div{display:flex;gap:8px;flex-wrap:wrap}.mkbk button{min-height:44px;padding:0 18px;border:0;border-radius:999px;font:600 14.5px var(--sans,system-ui,sans-serif);cursor:pointer;background:var(--soft,#eee);color:var(--fg,#111);transition:transform .4s cubic-bezier(.3,1.4,.5,1)}.mkbk button:active{transform:scale(.95)}.mkbk button.p{background:var(--fg,#111);color:var(--bg,#fff)}.mkbk button:focus-visible{outline:3px solid #0a84ff;outline-offset:2px}@media(min-width:861px){.mkbk{left:24px;bottom:24px;transform:translate(0,24px) scale(.96)}.mkbk.on{transform:none}}@media(prefers-reduced-motion:reduce){.mkbk{transition:opacity .2s;transform:translate(-50%,0)}@media(min-width:861px){.mkbk{transform:none}}}@media(prefers-reduced-transparency:reduce){.mkbk{-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--bg,#fff)}}@media(prefers-contrast:more){.mkbk{background:var(--bg,#fff);outline:2px solid var(--fg,#111)}}";
    function close(snooze) { if (!box) return; if (snooze) s("mk-bkz", String(Date.now() + 7 * 864e5)); box.classList.remove("on"); var b = box; box = null; setTimeout(function () { b.remove(); st.remove(); }, 400); }
    function show() {
      if (document.querySelector(".mks-ov[aria-hidden=false],.rv-rd:not([hidden])")) return setTimeout(show, 8000);
      try { sessionStorage.setItem("mk-bks", "1"); } catch (e) {}
      document.head.appendChild(st);
      box = document.createElement("div"); box.className = "mkbk"; box.setAttribute("role", "status");
      box.innerHTML = "<p><b>" + esc(t("Haz una copia de tus datos", "Fes una còpia de les teves dades")) + "</b><br>" + esc(days >= 365 ? t("Aún no has guardado ninguna copia.", "Encara no has desat cap còpia.") : t("Han pasado " + days + " días desde la última copia. Tu progreso solo vive en este navegador.", "Han passat " + days + " dies des de l’última còpia. El teu progrés només viu en aquest navegador.")) + '</p><div><button type="button" class="p" data-a="x">' + esc(t("Descargar copia", "Descarrega la còpia")) + '</button><button type="button" data-a="l">' + esc(t("Más tarde", "Més tard")) + "</button></div>";
      box.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; if (b.getAttribute("data-a") === "x") { doExport(); close(false); } else close(true); });
      document.body.appendChild(box); requestAnimationFrame(function () { requestAnimationFrame(function () { box && box.classList.add("on"); }); });
    }
    setTimeout(show, 7000);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", bkInit); else bkInit();

  try { if (LS.getItem("mk-rem")) { var rs = document.createElement("script"); rs.src = "recordar.js"; rs.defer = true; document.head.appendChild(rs); } } catch (e) {}
  window.mkStats = { open: open, close: close, export: doExport, data: data, cat: CAT, notes: { list: notes, add: addNote, del: delNote }, week: weekReport };
  if (/[?&]stats=1/.test(location.search)) { var go = function () { setTimeout(open, 400); }; if (document.readyState === "loading") addEventListener("DOMContentLoaded", go); else go(); }
})();
