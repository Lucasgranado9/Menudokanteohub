/* Perfil · Menudo Kanteo
   Tras crear la cuenta, unas preguntas definen qué bachillerato haces; la web enseña las asignaturas de ese itinerario.
   · Pasos: modalidad → qué te ves estudiando (según la modalidad) → curso → qué quieres reforzar.
   · Guarda «mk-perfil» (se sincroniza con la cuenta). Sin sesión, o con «ver todas», se muestra todo.
   · API: window.mkPerfil { get, open, subjects, showAll, apply }. Lo carga cuenta.js. */
(function () {
  "use strict";
  if (window.mkPerfil) return;
  var KEY = "mk-perfil", SKIP = "mk-pf-sk";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)");
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { } return null; }
  function pro() { return !!ls("mk-acct"); }
  function hap(n) { try { window.mkFx && window.mkFx.hap(n); } catch (e) { } }

  /* ---------- catálogo ---------- */
  function svg(p, w) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; }
  var IC = {
    cs: svg('<path d="M3 12h4l2.5-6 4 12 2.5-6H21"/>'),
    te: svg('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/>'),
    so: svg('<circle cx="9" cy="8.5" r="3.2"/><path d="M3.2 19.5c.5-3.4 2.9-5.2 5.8-5.2s5.3 1.8 5.8 5.2"/><path d="M16 5.6a3.1 3.1 0 0 1 0 5.8M17.6 14.6c2 .6 3.2 2.2 3.5 4.4"/>'),
    hu: svg('<path d="M4 5.5C6.8 4.3 9.6 4.3 12 6c2.4-1.7 5.2-1.7 8-.5v13c-2.8-1.2-5.6-1.2-8 .5-2.4-1.7-5.2-1.7-8-.5z"/><path d="M12 6v13"/>'),
    star: svg('<path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>'),
    book: svg('<path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>'),
    pen: svg('<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/>'),
    cap: svg('<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.8v4c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4"/>'),
    grid: svg('<rect x="4" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.8"/>'),
    chk: svg('<path d="M5 12.8l4.3 4.2L19 7.2"/>', 2.6),
    back: svg('<path d="M14.5 5.5L8 12l6.5 6.5"/>', 2.4)
  };
  var BACH = {
    cs: { c: "#ff375f", n: ["Científico-sanitario", "Científic-sanitari"], s: ["Medicina, Biología, Química, Enfermería…", "Medicina, Biologia, Química, Infermeria…"], i: "cs" },
    te: { c: "#0a84ff", n: ["Tecnológico", "Tecnològic"], s: ["Ingeniería, Informática, Arquitectura…", "Enginyeria, Informàtica, Arquitectura…"], i: "te" },
    so: { c: "#ff9f0a", n: ["Ciencias sociales", "Ciències socials"], s: ["Economía, Derecho, Psicología, Educación…", "Economia, Dret, Psicologia, Educació…"], i: "so" },
    hu: { c: "#bf5af2", n: ["Humanidades", "Humanitats"], s: ["Historia, Filosofía, Lenguas, Periodismo…", "Història, Filosofia, Llengües, Periodisme…"], i: "hu" }
  };
  var ORDER = ["cs", "te", "so", "hu"];
  var CAR = {
    cs: [["med", "Medicina u Odontología", "Medicina o Odontologia"], ["enf", "Enfermería, Fisioterapia o Farmacia", "Infermeria, Fisioteràpia o Farmàcia"], ["bio", "Biología, Química o Biotecnología", "Biologia, Química o Biotecnologia"], ["otr", "Otra cosa o aún no lo sé", "Una altra cosa o encara no ho sé"]],
    te: [["ing", "Ingeniería", "Enginyeria"], ["inf", "Informática o ciencia de datos", "Informàtica o ciència de dades"], ["arq", "Arquitectura o diseño", "Arquitectura o disseny"], ["otr", "Otra cosa o aún no lo sé", "Una altra cosa o encara no ho sé"]],
    so: [["eco", "Economía o ADE", "Economia o ADE"], ["der", "Derecho o Ciencias políticas", "Dret o Ciències polítiques"], ["psi", "Psicología, Educación o Trabajo social", "Psicologia, Educació o Treball social"], ["otr", "Otra cosa o aún no lo sé", "Una altra cosa o encara no ho sé"]],
    hu: [["his", "Historia, Filosofía o Humanidades", "Història, Filosofia o Humanitats"], ["len", "Lenguas, Traducción o Letras", "Llengües, Traducció o Lletres"], ["com", "Periodismo o Comunicación", "Periodisme o Comunicació"], ["otr", "Otra cosa o aún no lo sé", "Una altra cosa o encara no ho sé"]]
  };
  var CUR = [["1", "1.º de Bachillerato", "1r de Batxillerat", "Vas preparando el camino", "Vas preparant el camí"], ["2", "2.º de Bachillerato", "2n de Batxillerat", "La PAU es este año", "La PAU és enguany"], ["x", "Ya terminé", "Ja he acabat", "Repito PAU o mejoro nota", "Repeteixo PAU o millore nota"]];
  var FOC = [["teo", "Teoría y apuntes", "Teoria i apunts", "Entender bien cada tema", "Entendre bé cada tema"], ["pra", "Problemas y práctica", "Problemes i pràctica", "Resolver, equivocarme y repasar", "Resoldre, equivocar-me i repassar"], ["pau", "Exámenes PAU", "Exàmens PAU", "Entrenar con el formato real", "Entrenar amb el format real"], ["all", "Un poco de todo", "Una mica de tot", "Sin prioridades", "Sense prioritats"]];
  /* asignaturas: h = página, k = símbolo, b = modalidades a las que se dirigen (la filosofía es común) */
  var SUBJ = [
    { id: "mates", h: "mates.html", c: "#c8102e", k: "∑", n: ["Matemáticas II", "Matemàtiques II"], b: ["cs", "te"] },
    { id: "fisica", h: "fisica.html", c: "#6a1fc2", k: "ψ", n: ["Física II", "Física II"], b: ["cs", "te"] },
    { id: "filosofia", h: "filosofia.html", c: "#a67c00", k: "φ", n: ["Historia de la Filosofía", "Història de la Filosofia"], b: ["cs", "te", "so", "hu"] }
  ];
  var HOME = { mates: ".sc-ma", fisica: ".sc-ph", filosofia: ".sc-fi" };

  /* ---------- datos ---------- */
  function get() { try { var o = JSON.parse(ls(KEY) || "null"); return o && o.b && BACH[o.b] ? o : null; } catch (e) { return null; } }
  function put(o) { o.v = 1; o.u = Date.now(); ls(KEY, JSON.stringify(o)); apply(); try { document.dispatchEvent(new CustomEvent("mk-perfil", { detail: o })); } catch (e) { } }
  function subjects(o) { o = o || get(); return !o || o.all ? SUBJ.slice() : SUBJ.filter(function (s) { return s.b.indexOf(o.b) >= 0; }); }
  function label(o) { o = o || get(); if (!o) return ""; var c = (CAR[o.b] || []).filter(function (x) { return x[0] === o.c; })[0]; return t(BACH[o.b].n[0], BACH[o.b].n[1]) + (c && c[0] !== "otr" ? " · " + t(c[1], c[2]) : ""); }
  function showAll(v) { var o = get(); if (!o) return; if (v === undefined) return !!o.all; o.all = v ? 1 : 0; put(o); }

  /* ---------- filtrado de la web ---------- */
  var sty = el("style"); sty.id = "mk-pf-css"; document.head.appendChild(sty);
  function apply() {
    var o = pro() ? get() : null, keep = o && !o.all ? subjects(o) : SUBJ, hide = SUBJ.filter(function (s) { return keep.indexOf(s) < 0; }), css = "";
    hide.forEach(function (s) {
      var a = 'a[href="' + s.h + '"]';
      css += HOME[s.id] + ",.mk-mgc1 li:has(" + a + "),.ft-cols " + a + ",.mkb-r" + a.slice(1) + "{display:none!important}";
    });
    sty.textContent = css;
    document.documentElement.setAttribute("data-mk-perfil", o ? (o.all ? "all" : o.b) : "");
  }

  /* ---------- hoja de preguntas ---------- */
  var CSS =
    ".mkpf{position:fixed;inset:0;z-index:470;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:#0a080800;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);transition:background .45s,backdrop-filter .45s,-webkit-backdrop-filter .45s}" +
    ".mkpf.on{background:#0a08088f;-webkit-backdrop-filter:blur(16px) saturate(140%);backdrop-filter:blur(16px) saturate(140%)}" +
    ".mkpf-sh{position:relative;width:min(560px,100%);max-height:min(760px,calc(100dvh - 32px));display:flex;flex-direction:column;border-radius:34px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 90%,transparent);-webkit-backdrop-filter:blur(40px) saturate(190%);backdrop-filter:blur(40px) saturate(190%);box-shadow:0 0 0 1px color-mix(in srgb,var(--fg,#111) 8%,transparent),0 40px 120px -20px #000000a8,0 1px 0 #ffffff40 inset;overflow:hidden;opacity:0;transform:translateY(34px) scale(.96);transition:transform .6s cubic-bezier(.2,1.1,.3,1),opacity .35s}" +
    ".mkpf.on .mkpf-sh{opacity:1;transform:none}.mkpf.out .mkpf-sh{opacity:0;transform:translateY(24px) scale(.97);transition-duration:.3s}" +
    ".mkpf-top{display:flex;align-items:center;gap:12px;padding:20px 22px 0;min-height:56px}" +
    ".mkpf-bk,.mkpf-sk{appearance:none;border:0;background:none;color:inherit;font:600 15px/1 var(--sans,system-ui);cursor:pointer;min-width:44px;min-height:44px;border-radius:14px;display:grid;place-items:center;transition:opacity .2s,transform .2s;-webkit-tap-highlight-color:transparent}" +
    ".mkpf-bk{margin-left:-10px;width:44px}.mkpf-bk svg{width:22px;height:22px}.mkpf-bk[hidden]{display:grid;visibility:hidden}.mkpf-sk{color:var(--muted,#6c6a6a);padding:0 8px;margin-right:-8px}.mkpf-sk[hidden]{display:none}.mkpf-bk:active,.mkpf-sk:active{transform:scale(.92)}" +
    ".mkpf-bk:focus-visible,.mkpf-sk:focus-visible,.mkpf-o:focus-visible,.mkpf-go:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}" +
    ".mkpf-pg{flex:1;display:flex;gap:6px}.mkpf-pg i{flex:1;height:5px;border-radius:9px;background:color-mix(in srgb,var(--fg,#111) 12%,transparent);overflow:hidden;position:relative}.mkpf-pg i:after{content:'';position:absolute;inset:0;border-radius:inherit;background:var(--red,#c8102e);transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.2,1,.3,1)}.mkpf-pg i.d:after{transform:none}" +
    ".mkpf-bd{position:relative;flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:18px 22px 24px}" +
    ".mkpf-st{display:flex;flex-direction:column;gap:0;will-change:transform,opacity}" +
    ".mkpf-k{margin:6px 0 10px;font:700 12.5px/1 var(--sans,system-ui);letter-spacing:.14em;text-transform:uppercase;color:var(--red,#c8102e)}" +
    ".mkpf-h{margin:0 0 8px;font:800 clamp(30px,7vw,38px)/1.04 var(--disp,var(--sans,system-ui));letter-spacing:-.035em;text-wrap:balance}" +
    ".mkpf-p{margin:0 0 20px;font:400 16.5px/1.4 var(--sans,system-ui);color:var(--muted,#6c6a6a);text-wrap:pretty}" +
    ".mkpf-l{display:flex;flex-direction:column;gap:10px}" +
    ".mkpf-o{appearance:none;width:100%;text-align:left;display:flex;align-items:center;gap:14px;min-height:68px;padding:12px 16px 12px 12px;border-radius:22px;border:1.5px solid color-mix(in srgb,var(--fg,#111) 10%,transparent);background:color-mix(in srgb,var(--fg,#111) 4%,transparent);color:inherit;cursor:pointer;font:inherit;transition:transform .5s cubic-bezier(.2,1.4,.3,1),background .25s,border-color .25s,box-shadow .35s;-webkit-tap-highlight-color:transparent}" +
    ".mkpf-o:active{transform:scale(.975);transition-duration:.08s}" +
    "@media(hover:hover){.mkpf-o:hover{background:color-mix(in srgb,var(--fg,#111) 7%,transparent)}}" +
    ".mkpf-o i{flex:none;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:#fff;background:var(--c,#8e8e93);font:700 18px/1 var(--sans,system-ui);font-style:normal;box-shadow:0 8px 18px -10px var(--c,#000)}.mkpf-o i svg{width:23px;height:23px}" +
    ".mkpf-o span{flex:1;min-width:0}.mkpf-o b{display:block;font:650 17px/1.2 var(--sans,system-ui);letter-spacing:-.012em}.mkpf-o small{display:block;margin-top:3px;font:400 13.5px/1.3 var(--sans,system-ui);color:var(--muted,#6c6a6a)}" +
    ".mkpf-o em{flex:none;width:24px;height:24px;border-radius:50%;border:1.8px solid color-mix(in srgb,var(--fg,#111) 22%,transparent);display:grid;place-items:center;color:#fff;transition:background .25s,border-color .25s,transform .5s cubic-bezier(.2,1.6,.3,1)}.mkpf-o em svg{width:15px;height:15px;opacity:0;transform:scale(.4);transition:opacity .2s,transform .5s cubic-bezier(.2,1.6,.3,1)}" +
    ".mkpf-o[aria-checked=true]{border-color:var(--c,var(--red,#c8102e));background:color-mix(in srgb,var(--c,var(--red,#c8102e)) 9%,transparent);box-shadow:0 0 0 4px color-mix(in srgb,var(--c,var(--red,#c8102e)) 16%,transparent)}.mkpf-o[aria-checked=true] em{background:var(--c,var(--red,#c8102e));border-color:transparent;transform:scale(1.08)}.mkpf-o[aria-checked=true] em svg{opacity:1;transform:none}" +
    ".mkpf-ok{width:84px;height:84px;border-radius:28px;display:grid;place-items:center;color:#fff;margin:6px 0 18px;background:linear-gradient(180deg,#34d058,#1a9e3a);box-shadow:0 22px 40px -18px #1a9e3a}.mkpf-ok svg{width:46px;height:46px}.mkpf-ok path{stroke-dasharray:30;stroke-dashoffset:30;animation:mkpfd .7s .35s cubic-bezier(.2,.8,.2,1) forwards}@keyframes mkpfd{to{stroke-dashoffset:0}}" +
    ".mkpf-tg{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}.mkpf-tg span{padding:7px 13px;border-radius:999px;font:600 13.5px/1 var(--sans,system-ui);background:color-mix(in srgb,var(--fg,#111) 8%,transparent)}" +
    ".mkpf-sj{display:flex;flex-direction:column;gap:8px;margin:0 0 14px}.mkpf-sj div{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:18px;background:color-mix(in srgb,var(--fg,#111) 5%,transparent);font:600 16px/1.2 var(--sans,system-ui)}.mkpf-sj i{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;color:#fff;background:var(--c);font:700 17px/1 var(--sans,system-ui);font-style:normal}" +
    ".mkpf-nt{margin:0 0 18px;font:400 14px/1.4 var(--sans,system-ui);color:var(--muted,#6c6a6a)}" +
    ".mkpf-go{appearance:none;border:0;width:100%;min-height:56px;border-radius:19px;color:#fff;font:700 17px/1 var(--sans,system-ui);cursor:pointer;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));box-shadow:0 1px 0 #ffffff55 inset,0 14px 28px -14px var(--red,#c8102e);transition:transform .5s cubic-bezier(.2,1.4,.3,1)}.mkpf-go:active{transform:scale(.97);transition-duration:.08s}" +
    "@media(max-width:640px){.mkpf{align-items:flex-end;padding-bottom:max(10px,env(safe-area-inset-bottom,0px))}.mkpf-sh{border-radius:30px;max-height:calc(100dvh - 20px)}}" +
    "@media(prefers-reduced-motion:reduce){.mkpf,.mkpf-sh,.mkpf-o,.mkpf-go,.mkpf-pg i:after{transition:opacity .2s}.mkpf-sh{transform:none}.mkpf-ok path{animation:none;stroke-dashoffset:0}}" +
    "@media(prefers-reduced-transparency:reduce){.mkpf-sh{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}.mkpf.on{-webkit-backdrop-filter:none;backdrop-filter:none;background:#0a0808d9}}" +
    "@media(prefers-contrast:more){.mkpf-o{border-color:var(--fg,#111)}}";
  var cs = el("style"); cs.textContent = CSS; document.head.appendChild(cs);

  var ov = null, sh, bd, pg, bk, sk, stage, ans, opener, steps;
  function build(ansIn) {
    ans = Object.assign({}, ansIn || {});
    steps = ["b", "c", "y", "o", "end"];
  }
  function stepDef(id) {
    var b = ans.b;
    if (id === "b") return { k: t("Tu perfil", "El teu perfil"), h: t("¿Qué bachillerato haces?", "Quin batxillerat fas?"), p: t("Así te enseñamos primero lo que necesitas.", "Així et mostrem primer el que necessites."), o: ORDER.map(function (k) { return [k, t(BACH[k].n[0], BACH[k].n[1]), t(BACH[k].s[0], BACH[k].s[1]), BACH[k].c, IC[BACH[k].i]]; }) };
    if (id === "c") return { k: t("Tu futuro", "El teu futur"), h: t("¿Qué te ves estudiando?", "Què et veus estudiant?"), p: t("Sin compromiso: solo para ajustar el portal a ti.", "Sense compromís: només per ajustar el portal a tu."), o: (CAR[b] || []).map(function (x, i) { return [x[0], t(x[1], x[2]), "", BACH[b].c, [IC[BACH[b].i], IC.cap, IC.book, IC.star][i]]; }) };
    if (id === "y") return { k: t("Tu curso", "El teu curs"), h: t("¿En qué curso estás?", "En quin curs estàs?"), p: t("Para saber cuánta prisa tiene la PAU.", "Per saber quanta pressa té la PAU."), o: CUR.map(function (x, i) { return [x[0], t(x[1], x[2]), t(x[3], x[4]), ["#30d158", "#ff9f0a", "#5e5ce6"][i], ["1", "2", "↺"][i]]; }) };
    if (id === "o") return { k: t("Tu forma de estudiar", "La teva forma d’estudiar"), h: t("¿Qué quieres reforzar?", "Què vols reforçar?"), p: t("Puedes cambiarlo cuando quieras en Mi cuenta.", "Ho pots canviar quan vulguis a El meu compte."), o: FOC.map(function (x, i) { return [x[0], t(x[1], x[2]), t(x[3], x[4]), ["#0a84ff", "#ff375f", "#ff9f0a", "#8e8e93"][i], [IC.book, IC.pen, IC.cap, IC.grid][i]]; }) };
  }
  function dots(i) { pg.innerHTML = ""; for (var n = 0; n < 4; n++) { var d = el("i"); if (n <= i) d.className = "d"; pg.appendChild(d); } }
  function render(i, dir) {
    var id = steps[i], st;
    if (id === "end") st = endView(); else st = optionView(id, i);
    st.className = "mkpf-st"; if (stage && dir && !reduce.matches) {
      var old = stage; old.style.position = "absolute"; old.style.left = "22px"; old.style.right = "22px"; old.style.top = "18px";
      old.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateX(" + (-dir * 36) + "px)" }], { duration: 260, easing: "cubic-bezier(.32,.72,0,1)", fill: "forwards" }).onfinish = function () { old.remove(); };
      st.animate([{ opacity: 0, transform: "translateX(" + (dir * 44) + "px)" }, { opacity: 1, transform: "none" }], { duration: 520, easing: "cubic-bezier(.2,1,.3,1)" });
    } else if (stage) stage.remove();
    bd.appendChild(st); stage = st; bd.scrollTop = 0; cur = i;
    dots(i); bk.hidden = i === 0 || i === 4; sk.hidden = i === 4; sk.textContent = t("Más tarde", "Més tard");
    var f = st.querySelector("[aria-checked=true]") || st.querySelector(".mkpf-o,.mkpf-go"); f && setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) { } }, 60);
  }
  var cur = 0, busy = false;
  function optionView(id, i) {
    var d = stepDef(id), st = el("div"), key = id;
    st.innerHTML = '<p class="mkpf-k">' + d.k + '</p><h2 class="mkpf-h" id="mkpf-t">' + d.h + '</h2><p class="mkpf-p">' + d.p + "</p>";
    var l = el("div", "mkpf-l"); l.setAttribute("role", "radiogroup"); l.setAttribute("aria-labelledby", "mkpf-t");
    d.o.forEach(function (o, n) {
      var b = el("button", "mkpf-o"); b.type = "button"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", String(ans[key] === o[0])); b.style.setProperty("--c", o[3]);
      b.innerHTML = "<i>" + (o[4] || "") + "</i><span><b>" + o[1] + "</b>" + (o[2] ? "<small>" + o[2] + "</small>" : "") + "</span><em>" + IC.chk + "</em>";
      b.addEventListener("pointerdown", function () { hap(4); });
      b.addEventListener("click", function () { choose(key, o[0], l, b, i); });
      if (!reduce.matches) b.animate([{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 520, delay: 70 + n * 55, easing: "cubic-bezier(.2,1,.3,1)", fill: "backwards" });
      l.appendChild(b);
    });
    st.appendChild(l); return st;
  }
  function choose(key, val, list, btn, i) {
    if (busy) return; busy = true; hap(8);
    if (key === "b" && ans.b !== val) delete ans.c;
    ans[key] = val; [].forEach.call(list.children, function (x) { x.setAttribute("aria-checked", String(x === btn)); });
    setTimeout(function () { busy = false; render(i + 1, 1); }, reduce.matches ? 120 : 380);
  }
  function endView() {
    var st = el("div"), o = Object.assign({}, ans), subs = subjects({ b: o.b }), tags = [t(BACH[o.b].n[0], BACH[o.b].n[1])];
    var c = (CAR[o.b] || []).filter(function (x) { return x[0] === o.c; })[0]; if (c && c[0] !== "otr") tags.push(t(c[1], c[2]));
    var y = CUR.filter(function (x) { return x[0] === o.y; })[0]; if (y) tags.push(t(y[1], y[2]));
    var f = FOC.filter(function (x) { return x[0] === o.o; })[0]; if (f && f[0] !== "all") tags.push(t(f[1], f[2]));
    st.innerHTML = '<div class="mkpf-ok">' + IC.chk + '</div><h2 class="mkpf-h" id="mkpf-t">' + t("Todo listo", "Tot a punt") + '</h2><p class="mkpf-p">' + t("Este es tu portal a partir de ahora.", "Aquest és el teu portal a partir d’ara.") + "</p>" +
      '<div class="mkpf-tg">' + tags.map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>" +
      '<div class="mkpf-sj">' + subs.map(function (s) { return '<div style="--c:' + s.c + '"><i>' + s.k + "</i>" + t(s.n[0], s.n[1]) + "</div>"; }).join("") + "</div>" +
      '<p class="mkpf-nt">' + (subs.length < 3 ? t("Iremos añadiendo más asignaturas de tu bachillerato. Puedes verlas todas o cambiar tu perfil en Mi cuenta.", "Anirem afegint més assignatures del teu batxillerat. Les pots veure totes o canviar el perfil a El meu compte.") : t("Puedes cambiar tu perfil en Mi cuenta cuando quieras.", "Pots canviar el perfil a El meu compte quan vulguis.")) + "</p>";
    var go = el("button", "mkpf-go", t("Empezar", "Començar")); go.type = "button"; go.addEventListener("click", function () { finish(); }); st.appendChild(go);
    var keep = get(); var save = Object.assign({}, keep && keep.all ? { all: 1 } : {}, o); put(save); hap(12); ls(SKIP, null);
    return st;
  }
  function open(o) {
    if (ov) return; opener = document.activeElement;
    build(o !== undefined ? o : get());
    ov = el("div", "mkpf"); ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "mkpf-t");
    sh = el("div", "mkpf-sh"); var top = el("div", "mkpf-top");
    bk = el("button", "mkpf-bk", IC.back); bk.type = "button"; bk.setAttribute("aria-label", t("Atrás", "Enrere")); pg = el("div", "mkpf-pg"); pg.setAttribute("aria-hidden", "true");
    sk = el("button", "mkpf-sk"); sk.type = "button"; top.appendChild(bk); top.appendChild(pg); top.appendChild(sk);
    bd = el("div", "mkpf-bd"); sh.appendChild(top); sh.appendChild(bd); ov.appendChild(sh); document.body.appendChild(ov);
    bk.addEventListener("click", function () { if (cur > 0) render(cur - 1, -1); });
    sk.addEventListener("click", function () { skip(); });
    ov.addEventListener("pointerdown", function (e) { if (e.target === ov) skip(); });
    document.addEventListener("keydown", onKey, true);
    stage = null; busy = false; render(0, 0);
    requestAnimationFrame(function () { requestAnimationFrame(function () { ov && ov.classList.add("on"); }); });
    document.documentElement.style.overflow = "hidden";
  }
  function onKey(e) {
    if (!ov) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); skip(); return; }
    if (e.key === "Tab") {
      var f = [].filter.call(sh.querySelectorAll("button"), function (b) { return !b.hidden && b.offsetParent !== null && getComputedStyle(b).visibility !== "hidden"; }); if (!f.length) return;
      var a = document.activeElement, i = f.indexOf(a);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
    if (/^Arrow(Down|Up)$/.test(e.key) && document.activeElement && document.activeElement.getAttribute("role") === "radio") {
      e.preventDefault(); var l = [].slice.call(document.activeElement.parentNode.children), j = l.indexOf(document.activeElement) + (e.key === "ArrowDown" ? 1 : -1); l[(j + l.length) % l.length].focus();
    }
  }
  function close() {
    if (!ov) return; var o = ov; ov = null; document.removeEventListener("keydown", onKey, true); document.documentElement.style.overflow = "";
    o.classList.add("out"); o.classList.remove("on"); setTimeout(function () { o.remove(); }, reduce.matches ? 60 : 340);
    try { opener && opener.focus && opener.focus({ preventScroll: true }); } catch (e) { }
  }
  function skip() { if (cur < 4 && !get()) { var n = (+ls(SKIP) || 0) + 1; ls(SKIP, String(n)); } close(); }
  function finish() { close(); }

  /* ---------- cuándo preguntar ---------- */
  var asked = false, tm = 0;
  function maybe() {
    if (asked || ov || !pro() || get() || (+ls(SKIP) || 0) >= 2) return; asked = true;
    clearTimeout(tm); tm = setTimeout(function () { if (pro() && !get() && !ov && !document.querySelector(".mkac-ov.on")) open(); }, 900);
  }
  function arm() {
    /* con sesión pero sin perfil: espera a que termine la primera sincronización por si ya existe en otro dispositivo */
    if (!pro() || get()) { apply(); return; }
    var done = false, to = setTimeout(go, 5000); function go() { if (done) return; done = true; clearTimeout(to); document.removeEventListener("mk-sync", on); apply(); maybe(); }
    function on(e) { if (e.detail && e.detail.status === "ok") go(); } document.addEventListener("mk-sync", on);
  }
  document.addEventListener("mk-auth", function () { asked = false; setTimeout(arm, 400); });
  document.addEventListener("mk-sync", function () { apply(); });
  addEventListener("storage", function (e) { if (e.key === KEY || e.key === "mk-acct") apply(); });
  window.mkPerfil = { get: get, open: open, subjects: subjects, showAll: showAll, apply: apply, label: label, bach: BACH };
  apply();
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", function () { apply(); arm(); }); else arm();
})();
