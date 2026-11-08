/* Menudo Kanteo — asistente de ayuda (abajo a la derecha): preguntas frecuentes guiadas.
   Sin servidor ni IA: respuestas fijas CA/ES con enlaces a cada apartado del portal. */
(function () {
  "use strict";
  if (window.__mkAyuda) return; window.__mkAyuda = 1;
  var D = document, reduce = matchMedia("(prefers-reduced-motion: reduce)");
  function es() { return window.MKL ? !!window.MKL.es : D.documentElement.lang !== "ca"; }
  function t(ca, esp) { return es() ? esp : ca; }
  var Q = [
    { q: ["Per on començo a estudiar?", "¿Por dónde empiezo a estudiar?"],
      a: ["Tria l’assignatura: cada una té teoria, fórmules, exercicis resolts i la PAU. Si dubtes, comença per Matemàtiques II i fes els exercicis amb la solució tapada.", "Elige la asignatura: cada una tiene teoría, fórmulas, ejercicios resueltos y la PAU. Si dudas, empieza por Matemáticas II y haz los ejercicios con la solución tapada."],
      l: [["mates.html", "Matemàtiques II", "Matemáticas II"], ["fisica.html", "Física II", "Física II"], ["filosofia.html", "Història de la Filosofia", "Historia de la Filosofía"]] },
    { q: ["On són els exàmens de la PAU?", "¿Dónde están los exámenes de la PAU?"],
      a: ["A «Problemes PAU» hi ha les sèries de Matemàtiques (2022–2026), Física i Filosofia, amb solució pas a pas. Pots veure-les per any o «per temes».", "En «Problemas PAU» están las series de Matemáticas (2022–2026), Física y Filosofía, con solución paso a paso. Puedes verlas por año o «por temas»."],
      l: [["problemes.html", "Problemes PAU", "Problemas PAU"]] },
    { q: ["Com descarrego els PDF?", "¿Cómo descargo los PDF?"],
      a: ["Cada sèrie d’examen té un botó de PDF per descarregar l’enunciat original. A Matemàtiques també trobaràs el resum en blocs.", "Cada serie de examen tiene un botón de PDF para descargar el enunciado original. En Matemáticas también encontrarás el resumen en bloques."],
      l: [["problemes.html", "Anar als exàmens", "Ir a los exámenes"]] },
    { q: ["Com busco un tema o una fórmula?", "¿Cómo busco un tema o una fórmula?"],
      a: ["Prem Ctrl + K (⌘ + K al Mac) o la lupa de dalt: cerca a tot el portal i et porta directament al lloc.", "Pulsa Ctrl + K (⌘ + K en Mac) o la lupa de arriba: busca en todo el portal y te lleva directamente al sitio."],
      l: [] },
    { q: ["Puc calcular alguna cosa ràpid?", "¿Puedo calcular algo rápido?"],
      a: ["Sí: la calculadora científica és al portal i funciona sense connexió.", "Sí: la calculadora científica está en el portal y funciona sin conexión."],
      l: [["calculadora.html", "Calculadora", "Calculadora"]] },
    { q: ["Funciona sense connexió?", "¿Funciona sin conexión?"],
      a: ["Sí. Instal·la el portal com a aplicació des del menú del navegador i podràs estudiar sense internet. La primera vegada cal obrir-lo amb connexió.", "Sí. Instala el portal como aplicación desde el menú del navegador y podrás estudiar sin internet. La primera vez hay que abrirlo con conexión."],
      l: [] },
    { q: ["Es guarda el meu progrés?", "¿Se guarda mi progreso?"],
      a: ["Sí, al teu dispositiu: les tasques fetes, les sèries, la ratxa i les lectures. No hi ha compte ni servidor, així que si esborres les dades del navegador, es perden.", "Sí, en tu dispositivo: las tareas hechas, las series, la racha y las lecturas. No hay cuenta ni servidor, así que si borras los datos del navegador, se pierden."],
      l: [] },
    { q: ["Com canvio l’idioma o el tema?", "¿Cómo cambio el idioma o el tema?"],
      a: ["A dalt a la dreta: el globus canvia entre català i castellà, i l’engranatge té el mode clar/fosc i altres ajustos.", "Arriba a la derecha: el globo cambia entre catalán y castellano, y el engranaje tiene el modo claro/oscuro y otros ajustes."],
      l: [] },
    { q: ["Què hi ha a la Revista?", "¿Qué hay en la Revista?"],
      a: ["Una lectura nova cada dia: biografies, descobriments i idees de matemàtiques, física i filosofia, amb la connexió amb la PAU.", "Una lectura nueva cada día: biografías, descubrimientos e ideas de matemáticas, física y filosofía, con la conexión con la PAU."],
      l: [["revista.html", "Obrir la Revista", "Abrir la Revista"]] },
    { q: ["He trobat un error", "He encontrado un error"],
      a: ["Gràcies per avisar! A «Preguntes freqüents» i «Sobre el projecte» hi ha com contactar amb nosaltres.", "¡Gracias por avisar! En «Preguntas frecuentes» y «Sobre el proyecto» está cómo contactar con nosotros."],
      l: [["preguntes.html", "Preguntes freqüents", "Preguntas frecuentes"], ["sobre.html", "Sobre el projecte", "Sobre el proyecto"]] }
  ];
  var css = ".ay-fab{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:58;width:52px;height:52px;border:0;border-radius:50%;padding:0;display:grid;place-items:center;cursor:pointer;background:var(--rk,#be123c);color:#fff;box-shadow:0 8px 24px -6px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.12) inset;transition:transform .45s cubic-bezier(.3,1.4,.5,1),opacity .25s;-webkit-tap-highlight-color:transparent}" +
    ".ay-fab:active{transform:scale(.92)}.ay-fab:focus-visible{outline:3px solid var(--fg,#111);outline-offset:3px}.ay-fab svg{width:24px;height:24px;transition:transform .4s cubic-bezier(.3,1.4,.5,1)}.ay-fab[aria-expanded=true] svg{transform:rotate(90deg) scale(.9)}" +
    ".ay-p{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(var(--ay-b,16px) + 64px);z-index:59;width:min(360px,calc(100vw - 32px));max-height:min(70vh,520px);display:flex;flex-direction:column;border-radius:22px;background:var(--bg,#fff);color:var(--fg,#111);border:1px solid var(--line,rgba(0,0,0,.12));box-shadow:0 30px 70px -20px rgba(0,0,0,.45);transform-origin:100% 100%;opacity:0;transform:translateY(12px) scale(.92);pointer-events:none;visibility:hidden;transition:opacity .22s,transform .45s cubic-bezier(.3,1.3,.5,1),visibility 0s .45s;overflow:hidden}" +
    ".ay-p.on{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .22s,transform .45s cubic-bezier(.3,1.3,.5,1),visibility 0s}" +
    ".ay-h{display:flex;align-items:center;gap:10px;padding:16px 16px 12px}.ay-h b{flex:1;font:800 17px/1.2 var(--disp,system-ui,sans-serif);letter-spacing:-.02em}.ay-x,.ay-bk{border:0;background:var(--soft,rgba(0,0,0,.06));color:inherit;width:32px;height:32px;border-radius:50%;cursor:pointer;font:600 16px/1 system-ui;display:grid;place-items:center;padding:0}.ay-x:focus-visible,.ay-bk:focus-visible,.ay-i:focus-visible,.ay-a a:focus-visible{outline:3px solid var(--rk,#be123c);outline-offset:2px}" +
    ".ay-b{overflow:auto;overscroll-behavior:contain;padding:0 12px 14px}.ay-hi{margin:0 4px 10px;color:var(--muted,#666);font:400 14px/1.45 var(--sans,system-ui,sans-serif)}" +
    ".ay-i{display:block;width:100%;text-align:left;margin:0 0 6px;padding:12px 14px;border:0;border-radius:14px;background:var(--soft,rgba(0,0,0,.05));color:inherit;font:600 14.5px/1.3 var(--sans,system-ui,sans-serif);cursor:pointer;transition:transform .3s cubic-bezier(.3,1.4,.5,1)}.ay-i:active{transform:scale(.98)}" +
    ".ay-a{padding:4px 6px 0;font:400 15px/1.55 var(--sans,system-ui,sans-serif)}.ay-a h3{margin:0 0 8px;font:700 15.5px/1.3 var(--disp,system-ui,sans-serif)}.ay-a p{margin:0 0 12px}.ay-a a{display:inline-block;margin:0 6px 6px 0;padding:9px 14px;border-radius:999px;background:var(--rk,#be123c);color:#fff;text-decoration:none;font:600 13.5px/1 var(--sans,system-ui,sans-serif)}" +
    "@media(prefers-reduced-motion:reduce){.ay-p,.ay-p.on{transition:opacity .15s,visibility 0s}.ay-p{transform:none}.ay-fab,.ay-fab svg,.ay-i{transition:none}}@media print{.ay-fab,.ay-p{display:none}}";
  var fab, panel, body, title, back, open = false, view = -1, last;
  function place() { var h = 0; [".mkb", ".mk-tabs"].forEach(function (q) { var e = D.querySelector(q); if (!e) return; var cs = getComputedStyle(e); if (cs.display === "none" || cs.position !== "fixed") return; var r = e.getBoundingClientRect(); if (r.height && r.top > innerHeight / 2) h = Math.max(h, innerHeight - r.top + 4); }); var v = 16 + h; fab.style.bottom = h ? v + "px" : "max(16px,env(safe-area-inset-bottom,0px))"; panel.style.setProperty("--ay-b", h ? v + "px" : "16px"); }
  function list() {
    view = -1; back.hidden = true; title.textContent = t("Ajuda ràpida", "Ayuda rápida");
    var h = '<p class="ay-hi">' + t("Hola! Què vols saber?", "¡Hola! ¿Qué quieres saber?") + "</p>";
    Q.forEach(function (x, i) { h += '<button type="button" class="ay-i" data-i="' + i + '">' + (es() ? x.q[1] : x.q[0]) + "</button>"; });
    body.innerHTML = h; body.scrollTop = 0;
  }
  function show(i) {
    var x = Q[i]; view = i; back.hidden = false; title.textContent = t("Ajuda ràpida", "Ayuda rápida");
    var h = '<div class="ay-a"><h3>' + (es() ? x.q[1] : x.q[0]) + "</h3><p>" + (es() ? x.a[1] : x.a[0]) + "</p>";
    x.l.forEach(function (l) { h += '<a href="' + l[0] + '">' + (es() ? l[2] : l[1]) + " →</a>"; });
    body.innerHTML = h + "</div>"; body.scrollTop = 0;
    var f = body.querySelector("a"); (f || back).focus({ preventScroll: true });
  }
  function toggle(on) {
    open = on == null ? !open : on; place();
    if (open) { list(); panel.classList.add("on"); panel.removeAttribute("inert"); last = D.activeElement; setTimeout(function () { var f = body.querySelector(".ay-i"); f && f.focus({ preventScroll: true }); }, 60); }
    else { panel.classList.remove("on"); panel.setAttribute("inert", ""); if (D.activeElement && panel.contains(D.activeElement)) fab.focus({ preventScroll: true }); }
    fab.setAttribute("aria-expanded", String(open)); fab.setAttribute("aria-label", t(open ? "Tanca l’ajuda" : "Obre l’ajuda", open ? "Cierra la ayuda" : "Abre la ayuda"));
  }
  function init() {
    var st = D.createElement("style"); st.textContent = css; D.head.appendChild(st);
    fab = D.createElement("button"); fab.type = "button"; fab.className = "ay-fab"; fab.setAttribute("aria-haspopup", "dialog"); fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-label", t("Obre l’ajuda", "Abre la ayuda"));
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.6 9.6a2.4 2.4 0 1 1 3.4 2.2c-.6.3-1 .8-1 1.5M12 16.5h.01"/></svg>';
    panel = D.createElement("div"); panel.className = "ay-p"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-modal", "false"); panel.setAttribute("aria-label", t("Ajuda ràpida", "Ayuda rápida")); panel.setAttribute("inert", "");
    panel.innerHTML = '<div class="ay-h"><button type="button" class="ay-bk" hidden aria-label="Volver">←</button><b></b><button type="button" class="ay-x" aria-label="Cerrar">✕</button></div><div class="ay-b" aria-live="polite"></div>';
    D.body.appendChild(panel); D.body.appendChild(fab);
    body = panel.querySelector(".ay-b"); title = panel.querySelector("b"); back = panel.querySelector(".ay-bk");
    panel.querySelector(".ay-x").addEventListener("click", function () { toggle(false); });
    back.addEventListener("click", function () { list(); var f = body.querySelector(".ay-i"); f && f.focus({ preventScroll: true }); });
    body.addEventListener("click", function (e) { var b = e.target.closest(".ay-i"); if (b) show(+b.getAttribute("data-i")); });
    fab.addEventListener("click", function () { toggle(); });
    D.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) { e.preventDefault(); toggle(false); } });
    D.addEventListener("pointerdown", function (e) { if (open && !panel.contains(e.target) && !fab.contains(e.target)) toggle(false); });
    addEventListener("resize", place); place();
    setTimeout(place, 800);
  }
  if (D.body) init(); else D.addEventListener("DOMContentLoaded", init);
})();
