/* Menudo Kanteo — asistente (chat). Se descarga al abrir el botón de ayuda.js.
   Sin servidor ni IA externa: entiende preguntas libres con reglas + búsqueda difusa sobre
   el índice del portal (buscador.json), los exámenes PAU y tus datos locales (progreso). CA/ES. */
(function () {
  "use strict";
  if (window.__mkAyChat) return;
  var D = document, RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : D.documentElement.lang !== "ca"; }
  function t(ca, esp) { return es() ? esp : ca; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { } return null; }
  function jg(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function nm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘']/g, " "); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  var FILL = " busca buscar buscame cerca cercar cerco busco encuentra encontrar dame dime muestrame muestra mostrar necesito necessito algun alguna algunos algunas info informacion informacio ";
  var STOP = " de la el los las un una unos unas y o en con por para que como donde cual cuales quiero quieres puedo puede hay mi mis me te se es son del al lo le les a e per amb els i com on quin quina vull puc pot hi meu meva em et ha he hem sobre acerca algo sobre sus su hacer fer dime dis dir tengo tinc mas més muy molt ya ja si no es ser estar esta este esto aixo eso ese esa ver veure ".replace(/ +/g, " ");
  function tk(s) { return nm(s).split(/[^a-z0-9]+/).filter(function (w) { return w && (w.length > 1 || /\d/.test(w)) && STOP.indexOf(" " + w + " ") < 0; }); }
  function same(q, h) {
    if (q === h) return true; if (/^\d+$/.test(q) || q.length < 4 || h.length < 4) return false;
    var n = 0, m = Math.min(q.length, h.length); while (n < m && q.charCodeAt(n) === h.charCodeAt(n)) n++;
    return n >= 4 && n >= m - 2;
  }
  function stemT(w) { return w.length > 6 ? w.replace(/(es|s)$/, "") : w.length > 4 ? w.replace(/s$/, "") : w; }
  function jf(u) { return fetch(u).then(function (r) { if (!r.ok) throw 0; return r.json(); }); }

  /* ───────── preguntas frecuentes (CA, ES) ───────── */
  var L = function (h, ca, es_) { return [h, ca, es_]; };
  var FAQ = [
    { k: "empezar empiezo estudiar comenzar comencar començar principio plan donde por", q: ["Per on començo a estudiar?", "¿Por dónde empiezo a estudiar?"],
      a: ["Tria l’assignatura: cada una té apunts per apartats, fórmules, problemes resolts i la PAU. Si dubtes, comença per Matemàtiques II i fes els problemes amb la solució tapada. Pregunta’m «què estudio avui» i t’ho proposo segons el teu progrés.", "Elige la asignatura: cada una tiene apuntes por apartados, fórmulas, problemas resueltos y la PAU. Si dudas, empieza por Matemáticas II y haz los problemas con la solución tapada. Pregúntame «qué estudio hoy» y te lo propongo según tu progreso."],
      l: [L("mates.html", "Matemàtiques II", "Matemáticas II"), L("fisica.html", "Física II", "Física II"), L("filosofia.html", "Història de la Filosofia", "Historia de la Filosofía")] },
    { k: "pau examenes examens problemas problemes selectividad selectivitat series sèries anys años", q: ["On són els exàmens de la PAU?", "¿Dónde están los exámenes de la PAU?"],
      a: ["A «Problemes PAU» tens les sèries de Matemàtiques II (2021–2026), de Física II i d’Història de la Filosofia, amb solució pas a pas. Les pots veure per any o per temes, i també cercar-les.", "En «Problemas PAU» tienes las series de Matemáticas II (2021–2026), de Física II y de Historia de la Filosofía, con solución paso a paso. Puedes verlas por año o por temas, y también buscarlas."],
      l: [L("problemes.html#pau", "Problemes PAU", "Problemas PAU")] },
    { k: "buscar busca buscador problema filtrar filtro tema integral matriz hechos pendientes cercar cerca fets pendents", q: ["Com cerco un problema de la PAU?", "¿Cómo busco un problema de la PAU?"],
      a: ["Obre «Problemes PAU», tria l’assignatura i escriu una paraula al cercador («integral», «matriu», «2023»). També pots filtrar per any i per fets o pendents. Escriu-me «problemes d’integrals» i te’ls cerco jo.", "Abre «Problemas PAU», elige la asignatura y escribe una palabra en el buscador («integral», «matriz», «2023»). También puedes filtrar por año y por hechos o pendientes. Escríbeme «problemas de integrales» y te los busco yo."],
      l: [L("problemes.html#pau", "Anar als problemes", "Ir a los problemas")] },
    { k: "pdf descargar descarregar descargo imprimir apuntes temario apunts temari enunciado", q: ["Com descarrego els PDF?", "¿Cómo descargo los PDF?"],
      a: ["Cada sèrie d’examen té un botó de PDF amb l’enunciat original. A l’engranatge, «Descarrega el temari» baixa els apunts en PDF de les tres assignatures.", "Cada serie de examen tiene un botón de PDF con el enunciado original. En el engranaje, «Descarga el temario» baja los apuntes en PDF de las tres asignaturas."], l: [L("problemes.html#pau", "Anar als exàmens", "Ir a los exámenes")] },
    { k: "buscar busca cercar buscador atajo ctrl tecla formula fórmula tema paleta lupa", q: ["Com cerco un tema o una fórmula?", "¿Cómo busco un tema o una fórmula?"],
      a: ["Prem Ctrl + K (⌘ + K al Mac), la tecla «/» o la lupa de dalt: cerca a tot el portal, entén sinònims i petites errades, i et porta directament al lloc. O escriu aquí el que busques.", "Pulsa Ctrl + K (⌘ + K en Mac), la tecla «/» o la lupa de arriba: busca en todo el portal, entiende sinónimos y pequeños errores, y te lleva directamente al sitio. O escribe aquí lo que buscas."], d: ["palette:", "Obrir el cercador", "Abrir el buscador"], l: [] },
    { k: "calculadora nota acceso admision admissio calcular pau media mitjana", q: ["Com calculo la meva nota?", "¿Cómo calculo mi nota?"],
      a: ["La calculadora de nota calcula la teva nota d’accés i d’admissió (PAU a Catalunya) i la que necessites a la fase d’accés. I si vols fer un càlcul ràpid, escriu-lo aquí: «2^10 + 3».", "La calculadora de nota calcula tu nota de acceso y de admisión (PAU en Cataluña) y la que necesitas en la fase de acceso. Y si quieres un cálculo rápido, escríbelo aquí: «2^10 + 3»."], l: [L("calculadora.html", "Calculadora de nota", "Calculadora de nota")] },
    { k: "offline conexion connexio internet instalar app movil mobil pwa wifi sin", q: ["Funciona sense connexió?", "¿Funciona sin conexión?"],
      a: ["Sí. Mentre navegues, el portal es desa al dispositiu i funciona sense internet; la primera vegada cal obrir-lo amb connexió. També el pots instal·lar al mòbil des del menú del navegador («Afegeix a la pantalla d’inici»).", "Sí. Mientras navegas, el portal se guarda en el dispositivo y funciona sin internet; la primera vez hay que abrirlo con conexión. También puedes instalarlo en el móvil desde el menú del navegador («Añadir a la pantalla de inicio»)."], l: [] },
    { k: "progreso progres guardar guarda datos dades cuenta compte borrar perder perdre hecho fet marcar", q: ["Es guarda el meu progrés?", "¿Se guarda mi progreso?"],
      a: ["Sí, només al teu navegador: els apartats i problemes que marques com a fets, la ratxa i les lectures. No hi ha compte ni servidor, així que si canvies de dispositiu o esborres les dades, es perden. Per això pots exportar una còpia.", "Sí, solo en tu navegador: los apartados y problemas que marcas como hechos, la racha y las lecturas. No hay cuenta ni servidor, así que si cambias de dispositivo o borras los datos, se pierden. Por eso puedes exportar una copia."], d: ["stats", "Veure el meu progrés", "Ver mi progreso"], l: [] },
    { k: "estadisticas estadistiques racha ratxa repaso repas tiempo temps semana setmana", q: ["On veig les meves estadístiques i la ratxa?", "¿Dónde veo mis estadísticas y la racha?"],
      a: ["A «Estadístiques»: la ratxa de dies, el temps d’estudi, els apartats fets i els que et toca repassar. S’obre des de la paleta (Ctrl + K) o des de l’engranatge.", "En «Estadísticas»: la racha de días, el tiempo de estudio, los apartados hechos y los que te toca repasar. Se abre desde la paleta (Ctrl + K) o desde el engranaje."], d: ["stats", "Obrir estadístiques", "Abrir estadísticas"], l: [] },
    { k: "exportar importar copia backup seguridad respaldo datos dades guardar mover dispositivo", q: ["Com faig una còpia de les meves dades?", "¿Cómo hago una copia de mis datos?"],
      a: ["Obre Estadístiques i toca «Exportar còpia»: es descarrega un fitxer. Per recuperar-lo en un altre dispositiu o després d’esborrar dades, l’importes des del mateix lloc.", "Abre Estadísticas y pulsa «Exportar copia»: se descarga un archivo. Para recuperarlo en otro dispositivo o tras borrar datos, lo importas desde el mismo sitio."], d: ["stats", "Obrir estadístiques", "Abrir estadísticas"], l: [] },
    { k: "idioma lengua llengua catala català castellano español tema oscuro fosc claro clar modo mode cambiar canviar", q: ["Com canvio l’idioma o el tema?", "¿Cómo cambio el idioma o el tema?"],
      a: ["Al globus de dalt canvies entre català i castellà, i a l’engranatge hi ha el mode clar/fosc. També m’ho pots demanar: «mode fosc», «en castellà».", "En el globo de arriba cambias entre catalán y castellano, y en el engranaje está el modo claro/oscuro. También me lo puedes pedir: «modo oscuro», «en catalán»."], l: [] },
    { k: "accesibilidad accessibilitat letra lletra tamaño mida contraste dislexia daltonismo movimiento clase texto grande", q: ["Hi ha opcions d’accessibilitat?", "¿Hay opciones de accesibilidad?"],
      a: ["A l’engranatge: mida de la lletra, contrast, tipografia per a dislèxia, filtre per a daltonisme, reduir el moviment i el «Mode classe» (text més gran i sense distraccions).", "En el engranaje: tamaño de letra, contraste, tipografía para dislexia, filtro para daltonismo, reducir el movimiento y el «Modo clase» (texto más grande y sin distracciones)."], l: [] },
    { k: "revista lectura leer llegir diaria diari biografia descubrimiento historia", q: ["Què hi ha a la Revista?", "¿Qué hay en la Revista?"],
      a: ["Lectures de ciència i pensament: biografies, descobriments i idees de matemàtiques, física i filosofia, amb la connexió amb la PAU. Es llegeix en dues columnes, com un diari.", "Lecturas de ciencia y pensamiento: biografías, descubrimientos e ideas de matemáticas, física y filosofía, con la conexión con la PAU. Se lee en dos columnas, como un periódico."], l: [L("revista.html", "Obrir la Revista", "Abrir la Revista")] },
    { k: "favoritos favorits marcador marcadores guardar pagina página estrella", q: ["Com guardo favorits i marcadors?", "¿Cómo guardo favoritos y marcadores?"],
      a: ["Des de la paleta (Ctrl + K) tens «Desar aquesta pàgina als favorits» i «Desar un marcador aquí». Després els trobes a «Favorits».", "Desde la paleta (Ctrl + K) tienes «Guardar esta página en favoritos» y «Guardar un marcador aquí». Luego los encuentras en «Favoritos»."], d: ["fav", "Desar aquesta pàgina", "Guardar esta página"], l: [] },
    { k: "cronometro cronometro examen simulacro tiempo temps simular mode 90 minutos temporizador", q: ["Com simulo un examen?", "¿Cómo simulo un examen?"],
      a: ["A «Problemes PAU» hi ha el «Mode examen»: un cronòmetre de 90, 60 o 30 minuts. Fes una sèrie sencera sense mirar la solució i, quan acabi el temps, corregeix-te.", "En «Problemas PAU» está el «Modo examen»: un cronómetro de 90, 60 o 30 minutos. Haz una serie entera sin mirar la solución y, cuando acabe el tiempo, corrígete."], l: [L("problemes.html#pau", "Anar al mode examen", "Ir al modo examen")] },
    { k: "atajos dreceres teclado teclat shortcuts teclas", q: ["Quines dreceres de teclat hi ha?", "¿Qué atajos de teclado hay?"],
      a: ["Ctrl + K (⌘ + K) obre la paleta de comandes; «/» el cercador. Pots veure la llista completa amb el botó de sota.", "Ctrl + K (⌘ + K) abre la paleta de comandos; «/» el buscador. Puedes ver la lista completa con el botón de abajo."], d: ["kb", "Veure totes les dreceres", "Ver todos los atajos"], l: [] },
    { k: "sonido so sonidos vibracion vibracio haptica silencio", q: ["Puc activar o desactivar els sons?", "¿Puedo activar o desactivar los sonidos?"],
      a: ["Sí: els sons i la vibració són opcionals. Pots canviar-los des de la paleta (Ctrl + K) o amb els botons d’aquí sota.", "Sí: los sonidos y la vibración son opcionales. Puedes cambiarlos desde la paleta (Ctrl + K) o con los botones de aquí abajo."], d2: [["snd:on", "Activar", "Activar"], ["snd:off", "Desactivar", "Desactivar"]], l: [] },
    { k: "asignaturas assignatures matematicas fisica filosofia contenido contingut temario temari laboratorios experimentos 3d", q: ["Quines assignatures i continguts hi ha?", "¿Qué asignaturas y contenidos hay?"],
      a: ["<b>Matemàtiques II</b>: quatre blocs (anàlisi, àlgebra, geometria a l’espai i probabilitat), laboratoris interactius, problemes resolts i formulari. <b>Física II</b>: 11 temes amb experiments 3D dins de cada explicació. <b>Història de la Filosofia</b>: vuit autors, de Plató a Nussbaum, amb cronologia, comparativa, glossari i tests.", "<b>Matemáticas II</b>: cuatro bloques (análisis, álgebra, geometría en el espacio y probabilidad), laboratorios interactivos, problemas resueltos y formulario. <b>Física II</b>: 11 temas con experimentos 3D dentro de cada explicación. <b>Historia de la Filosofía</b>: ocho autores, de Platón a Nussbaum, con cronología, comparativa, glosario y tests."],
      l: [L("mates.html", "Matemàtiques II", "Matemáticas II"), L("fisica.html", "Física II", "Física II"), L("filosofia.html", "Història de la Filosofia", "Historia de la Filosofía")] },
    { k: "museo museu laboratorio laboratori sistema solar tabla periodica taula celulas cèl·lules fourier simulador interactivo planetas elementos", q: ["Quines eines interactives hi ha?", "¿Qué herramientas interactivas hay?"],
      a: ["Al museu: sistema solar en 3D, taula periòdica de 118 elements, cèl·lules en 3D i laboratori de Fourier, a més dels laboratoris de cada assignatura.", "En el museo: sistema solar en 3D, tabla periódica de 118 elementos, células en 3D y laboratorio de Fourier, además de los laboratorios de cada asignatura."],
      l: [L("museu.html", "Museu interactiu", "Museo interactivo"), L("sistema-solar.html", "Sistema solar", "Sistema solar"), L("taula-periodica.html", "Taula periòdica", "Tabla periódica"), L("celules.html", "Cèl·lules 3D", "Células 3D"), L("fourier.html", "Fourier", "Fourier")] },
    { k: "privacidad privacitat cookies galletas datos personales rastreo analitica anuncios publicidad", q: ["Quines dades recull el portal?", "¿Qué datos recoge el portal?"],
      a: ["Cap. No hi ha registre, ni galetes de seguiment, ni publicitat, ni analítica. El que es desa (progrés, idioma, aparença) es queda només al teu navegador.", "Ninguno. No hay registro, ni cookies de seguimiento, ni publicidad, ni analítica. Lo que se guarda (progreso, idioma, apariencia) se queda solo en tu navegador."], l: [L("privacitat.html", "Privacitat", "Privacidad")] },
    { k: "gratis gratuito gratuït precio preu coste cost pagar suscripcion cuenta registro licencia llicencia usar clase", q: ["És gratuït? Puc fer-lo servir a classe?", "¿Es gratis? ¿Puedo usarlo en clase?"],
      a: ["Sí, és gratuït, sense comptes ni publicitat. Els apunts tenen llicència CC BY-NC-SA 4.0: pots usar-los i compartir-los sense ànim de lucre citant Menudo Kanteo. A l’engranatge hi ha el «Mode classe» per projectar.", "Sí, es gratuito, sin cuentas ni publicidad. Los apuntes tienen licencia CC BY-NC-SA 4.0: puedes usarlos y compartirlos sin ánimo de lucro citando Menudo Kanteo. En el engranaje hay un «Modo clase» para proyectar."], l: [L("sobre.html", "Sobre el projecte", "Sobre el proyecto")] },
    { k: "oficial soluciones solucions errores errors fiable correctas criterios", q: ["Les solucions són oficials?", "¿Las soluciones son oficiales?"],
      a: ["No. Són problemes d’estil PAU resolts pel projecte per ajudar-te a practicar; poden tenir errades i no substitueixen els criteris oficials ni el professorat. Si en trobes una, avisa’ns.", "No. Son problemas de estilo PAU resueltos por el proyecto para ayudarte a practicar; pueden tener errores y no sustituyen los criterios oficiales ni al profesorado. Si encuentras uno, avísanos."], l: [] },
    { k: "error errada fallo bug problema reportar contacto contacte correo email mail github incidencia", q: ["He trobat una errada", "He encontrado un error"],
      a: ["Gràcies per avisar! Escriu a menudokanteo@outlook.com o obre una incidència a GitHub des de «Reporta un error», al peu de pàgina. Es corregeix tan aviat com es pot.", "¡Gracias por avisar! Escribe a menudokanteo@outlook.com o abre una incidencia en GitHub desde «Reporta un error», al pie de página. Se corrige tan pronto como se puede."], l: [L("preguntes.html", "Preguntes freqüents", "Preguntas frecuentes")] },
    { k: "quien autor creador sobre proyecto projecte barcelona hace hizo", q: ["Qui fa Menudo Kanteo?", "¿Quién hace Menudo Kanteo?"],
      a: ["És un projecte educatiu personal, gratuït i sense ànim de lucre, fet a Barcelona, per preparar la PAU a Catalunya en tres assignatures.", "Es un proyecto educativo personal, gratuito y sin ánimo de lucro, hecho en Barcelona, para preparar la PAU en Cataluña en tres asignaturas."], l: [L("sobre.html", "Sobre el projecte", "Sobre el proyecto"), L("novetats.html", "Novetats", "Novedades")] },
    { k: "consejos consells estudiar metodo mètode tecnica tècnica repasar repassar memorizar nervios examen truco", q: ["Consells per preparar la PAU", "Consejos para preparar la PAU"],
      a: ["1) Fes els problemes amb la solució tapada i només després compara. 2) Repassa en intervals: mira què et toca a Estadístiques. 3) Simula un examen amb el cronòmetre. 4) Tria els problemes pendents per tema, no per any. 5) Dorm bé la nit abans.", "1) Haz los problemas con la solución tapada y solo después compara. 2) Repasa a intervalos: mira qué te toca en Estadísticas. 3) Simula un examen con el cronómetro. 4) Elige los problemas pendientes por tema, no por año. 5) Duerme bien la noche antes."], l: [L("problemes.html#pau", "Problemes PAU", "Problemas PAU")] }
  ];
  FAQ.forEach(function (f) { f.kt = tk(f.k); f.qt = tk(f.q[0] + " " + f.q[1]); });

  /* ───────── utilidades de acciones ───────── */
  function go(u) { location.href = u; }
  function theme(m) {
    var h = D.documentElement, dk = h.getAttribute("data-theme") === "dark" || (!h.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var n = m === "toggle" ? (dk ? "light" : "dark") : m; h.setAttribute("data-theme", n); ls("mk-theme", n); return n;
  }
  function handoff(s, q, open) { try { sessionStorage.setItem("mk-pm-go", JSON.stringify({ s: s, q: q, open: open ? 1 : 0 })); } catch (e) { } }
  function toPau(s, q, open) {
    handoff(s, q, open);
    var here = /problemes\.html$/.test(location.pathname);
    if (here) { if (location.hash === "#pau") location.reload(); else location.hash = "#pau"; } else go("problemes.html#pau");
  }
  function doAct(a) {
    var p = a.split(":"), k = p[0], v = p.slice(1).join(":");
    if (k === "theme") { var n = theme(v); say(n === "dark" ? t("Fet: mode fosc activat.", "Hecho: modo oscuro activado.") : t("Fet: mode clar activat.", "Hecho: modo claro activado.")); }
    else if (k === "lang") { say(t("Canviant l’idioma…", "Cambiando el idioma…")); setTimeout(function () { window.MKL && window.MKL.set(v); }, 250); }
    else if (k === "stats") { close(); setTimeout(function () { window.mkStats && window.mkStats.open(); }, 120); }
    else if (k === "palette") { close(); setTimeout(function () { window.mkCmd && window.mkCmd.open(v); }, 120); }
    else if (k === "fav") { window.mkFav && window.mkFav.page(); say(t("Pàgina desada als favorits.", "Página guardada en favoritos.")); }
    else if (k === "kb") { close(); setTimeout(function () { window.mkKb && window.mkKb.open(); }, 120); }
    else if (k === "snd") { ls("mk-snd", v === "on" ? "1" : "0"); say(v === "on" ? t("Sons i vibració activats.", "Sonidos y vibración activados.") : t("Sons i vibració desactivats.", "Sonidos y vibración desactivados.")); }
    else if (k === "pau") { var o = JSON.parse(v); close(); setTimeout(function () { toPau(o.s, o.q, o.o); }, 120); }
    else if (k === "go") { go(v); }
  }
  function btn(a, label, cls) { return '<button type="button" class="ay-l' + (cls ? " " + cls : "") + '" data-do="' + esc(a) + '">' + esc(label) + "</button>"; }
  function lnk(href, label) { return '<a class="ay-l" href="' + esc(href) + '">' + esc(label) + " →</a>"; }

  /* ───────── calculadora (analizador seguro, sin eval) ───────── */
  function calc(src) {
    var s = nm(src).replace(/^\s*(calcula|calcular|calcul|cuanto es|cuanto son|quant es|quant son|resultado de|resultat de|=)\s*/, "").replace(/[?=\s]+$/, "");
    if (!/\d/.test(s) || !/[-+*/^%x×÷·()]|sqrt|raiz|arrel|sin|cos|tan|ln|log|pi\b/.test(s)) return null;
    if (/^\d{1,2}[\/.]\d{1,2}[\/.]\d{2,4}$/.test(s)) return null;
    s = s.replace(/(\d),(\d)/g, "$1.$2").replace(/×|·/g, "*").replace(/÷/g, "/").replace(/(\d)\s*x\s*(?=[\d(])/g, "$1*");
    var T = [], re = /\s*(\d+(?:\.\d+)?(?:e[+-]?\d+)?|[a-z]+|[-+*/^%()°])/g, m, pos = 0;
    while ((m = re.exec(s))) { if (m.index !== pos) return null; T.push(m[1]); pos = re.lastIndex; }
    if (pos !== s.replace(/\s+$/, "").length || !T.length) return null;
    var i = 0, F = { sqrt: Math.sqrt, raiz: Math.sqrt, arrel: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, ln: Math.log, log: Math.log10, abs: Math.abs }, C = { pi: Math.PI, e: Math.E };
    function pk() { return T[i]; }
    function ex() { var v = tm(); while (pk() === "+" || pk() === "-") { var o = T[i++], r = tm(); v = o === "+" ? v + r : v - r; } return v; }
    function tm() { var v = un(); for (;;) { var p = pk(); if (p === "*" || p === "/") { i++; var r = un(); v = p === "*" ? v * r : v / r; } else if (p && (/^\d/.test(p) || p === "(" || (C[p] !== undefined) || (F[p] && T[i + 1]))) { v *= un(); } else break; } return v; }
    function un() { if (pk() === "-") { i++; return -un(); } if (pk() === "+") { i++; return un(); } return pw(); }
    function pw() { var b = pf(); if (pk() === "^") { i++; return Math.pow(b, un()); } return b; }
    function pf() { var v = pr(); while (pk() === "%" || pk() === "°") { v = T[i++] === "%" ? v / 100 : v * Math.PI / 180; } return v; }
    function pr() {
      var p = T[i++]; if (p === undefined) throw 0;
      if (/^\d/.test(p)) return parseFloat(p);
      if (p === "(") { var v = ex(); if (T[i++] !== ")") throw 0; return v; }
      if (C[p] !== undefined) return C[p];
      if (F[p]) { var a = pk() === "(" ? (i++, (function () { var v = ex(); if (T[i++] !== ")") throw 0; return v; })()) : pf(); return F[p](a); }
      throw 0;
    }
    try { var r = ex(); if (i !== T.length) return null; return r; } catch (e) { return null; }
  }
  function numFmt(x) {
    if (!isFinite(x)) return t("no definit", "no definido");
    var a = Math.abs(x); if (a !== 0 && (a >= 1e15 || a < 1e-9)) return x.toExponential(6).replace(".", ",");
    return parseFloat(x.toPrecision(12)).toLocaleString(es() ? "es-ES" : "ca-ES", { maximumFractionDigits: 10, useGrouping: false });
  }

  /* ───────── índice del portal ───────── */
  var IX = null;
  function trl(s) { return es() && window.MKL && window.MKL.tr ? window.MKL.tr(s) : s; }
  function loadIx() {
    if (IX) return IX;
    IX = Promise.all([jf("buscador-titols.json").catch(function () { return []; }), jf(es() ? "buscador.es.json" : "buscador.json").catch(function () { return []; })]).then(function (r) {
      var by = {}, A = [];
      function add(e, body) {
        var o = by[e[2]]; if (!o) { o = by[e[2]] = { t: e[0], c: e[1], u: e[2], x: "", nt: nm(e[0]), nc: nm(e[1]), nx: "" }; A.push(o); }
        if (body && e[3]) { o.x = e[3]; o.nx = nm(e[3]); }
      }
      (r[0] || []).forEach(function (e) { add(e, false); }); (r[1] || []).forEach(function (e) { add(e, true); });
      return A;
    });
    return IX;
  }
  var SYN = { matrices: "matriz", matrius: "matriu", derivadas: "derivada", limites: "limite", ecuaciones: "ecuacion", logaritmos: "logaritmo", planos: "plano", rectas: "recta" };
  function searchIx(A, qs) {
    var terms = qs.map(function (w) { var s = SYN[w] || w; return stemT(s); });
    var out = [];
    A.forEach(function (e) {
      var sc = 0, hit = 0;
      for (var i = 0; i < terms.length; i++) {
        var w = terms[i], s = 0;
        if (e.nt.indexOf(w) >= 0) s = e.nt.split(/[^a-z0-9]+/).indexOf(w) >= 0 ? 8 : 6;
        else if (e.nc.indexOf(w) >= 0) s = 3;
        else { var p = e.nx.indexOf(w); if (p >= 0) { s = 1 + (e.nx.indexOf(w, p + 1) >= 0 ? 1 : 0); } }
        if (s) { hit++; sc += s; }
      }
      if (hit === terms.length) out.push({ e: e, s: sc + (hit > 1 ? 3 : 0) });
      else if (terms.length > 2 && hit >= terms.length - 1) out.push({ e: e, s: sc - 4 });
    });
    out.sort(function (a, b) { return b.s - a.s; });
    return out;
  }
  function snippet(e, qs) {
    var x = e.x || "", nx = e.nx || "", p = -1;
    for (var i = 0; i < qs.length && p < 0; i++) p = nx.indexOf(stemT(SYN[qs[i]] || qs[i]));
    if (p < 0) return esc((x || e.c || "").slice(0, 110));
    var a = Math.max(0, p - 40), b = Math.min(x.length, p + 90), s = x.slice(a, b).replace(/\s+/g, " ");
    s = (a > 0 ? "… " : "") + esc(s) + (b < x.length ? " …" : "");
    qs.forEach(function (w) { var st = stemT(SYN[w] || w); if (st.length < 3) return; var re = new RegExp("(" + st.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\w*)", "ig"); s = s.replace(re, "<mark>$1</mark>"); });
    return s;
  }
  function cards(res, qs, n) {
    return '<div class="ay-cs2">' + res.slice(0, n).map(function (r) {
      var e = r.e; return '<a class="ay-c" href="' + esc(e.u) + '"><b>' + esc(trl(e.t)) + "</b><small>" + esc(trl(e.c)) + "</small><span>" + snippet(e, qs) + "</span></a>";
    }).join("") + "</div>";
  }

  /* ───────── problemas PAU ───────── */
  var PAU = {};
  function pauLoad(s) {
    var sfx = es() ? ".es.json" : ".json", key = s + sfx; if (PAU[key]) return PAU[key];
    return PAU[key] = Promise.all([jf("data/" + s + "-pau" + sfx), jf("data/" + s + "-pau-q" + sfx).catch(function () { return {}; })]).then(function (r) {
      var idx = r[0], qd = r[1], u = [], th = {}; (idx.th || []).forEach(function (x) { th[x.id] = x.t; });
      idx.years.forEach(function (y) { y.series.forEach(function (se) {
        var qw = se.ex.length > 4 ? t("cuestió", "cuestión") : t("exercici", "ejercicio");
        se.ex.forEach(function (e) {
          var split = e.opts && e.opts.some(function (o) { return o.tags; });
          (split ? e.opts : [e]).forEach(function (x) {
            var k = y.y + "-" + se.id + "-" + e.n + (split ? "-" + x.k : ""), tags = (x.tags || e.tags || []).map(function (i) { return th[i] || i; }), ttl = x.ttl || e.ttl || "";
            u.push({ y: y.y, s: se.id, n: e.n, k: split ? x.k : "", ttl: ttl, th: tags, qw: qw, h: tk(y.y + " serie " + se.id + " " + qw + " " + e.n + " " + ttl + " " + tags.join(" ")), b: tk(qd[k] || "") });
          });
        });
      }); });
      return u;
    }).catch(function () { delete PAU[key]; return []; });
  }
  function pauScore(u, qs) {
    var sc = 0;
    for (var i = 0; i < qs.length; i++) {
      var w = qs[i], hit = 0;
      if (/^\d{4}$/.test(w)) { if (String(u.y) === w) hit = 4; }
      else { for (var a = 0; a < u.h.length && hit < 3; a++) if (same(w, u.h[a])) hit = 3; for (var b = 0; b < u.b.length && !hit; b++) if (same(w, u.b[b])) hit = 1; }
      if (!hit) return 0; sc += hit;
    }
    return sc;
  }
  function pauSearch(s, qs, strict) {
    return pauLoad(s).then(function (U) {
      var eff = qs.filter(function (w) { return U.some(function (u) { return pauScore(u, [w]) > 0; }); });
      if (strict ? eff.length < qs.length : qs.length && !eff.length) return [];
      var r = []; U.forEach(function (u) { var sc = eff.length ? pauScore(u, eff) : 1; if (sc) r.push({ u: u, sc: sc }); });
      r.sort(function (a, b) { return b.sc - a.sc || b.u.y - a.u.y || a.u.s - b.u.s || a.u.n - b.u.n; }); return r;
    });
  }
  function pauCards(s, res, qs) {
    return '<div class="ay-cs2">' + res.slice(0, 3).map(function (r) {
      var u = r.u, lab = "PAU " + u.y + " · " + t("Sèrie ", "Serie ") + u.s + " · " + u.qw.charAt(0).toUpperCase() + u.qw.slice(1) + " " + u.n + (u.k ? " " + u.k : "");
      var q = u.y + " " + t("sèrie", "serie") + " " + u.s + " " + u.qw + " " + u.n;
      return '<button type="button" class="ay-c" data-do="' + esc("pau:" + JSON.stringify({ s: s, q: q, o: 1 })) + '"><b>' + esc(lab) + "</b><small>" + esc(u.th.join(" · ")) + "</small><span>" + esc(u.ttl.replace(/⋯/g, "…").replace(/(…\s*[,y]?\s*){2,}/g, "… ")) + "</span></button>";
    }).join("") + "</div>";
  }
  var PGEN = tk("pau examen examens problema problemes problemas serie series sèrie sèries ejercicio ejercicios exercici exercicis cuestion cuestiones questio qüestió selectividad selectivitat matematicas matematiques mates fisica filosofia filo historia");
  function subjOf(n) { return /\b(fisica|fis)\b/.test(n) ? "f" : /\b(filosofia|filo|historia)\b/.test(n) ? "h" : "m"; }
  function subjName(s) { return s === "f" ? t("Física II", "Física II") : s === "h" ? t("Història de la Filosofia", "Historia de la Filosofía") : t("Matemàtiques II", "Matemáticas II"); }

  /* ───────── progreso y recomendaciones ───────── */
  function pauDone() { var d = jg("mk-pm", {}), n = 0; Object.keys(d).forEach(function (k) { if (d[k] && typeof d[k] === "object") n += Object.keys(d[k]).length; }); return n; }
  function progress() {
    var S = window.mkStats && window.mkStats.data ? (function () { try { return window.mkStats.data(); } catch (e) { return null; } })() : null;
    var pd = pauDone(), h = "";
    if (!S && !pd) return { h: "<p>" + t("Encara no tinc res del teu progrés: marca apartats i problemes com a fets i el veuràs aquí.", "Todavía no tengo nada de tu progreso: marca apartados y problemas como hechos y lo verás aquí.") + "</p>", b: btn("stats", t("Obrir estadístiques", "Abrir estadísticas")) };
    var parts = [];
    if (S) {
      parts.push("<b>" + S.done + "</b> " + t("apartats fets", "apartados hechos") + (S.today ? " (" + S.today + " " + t("avui", "hoy") + ")" : ""));
      parts.push(t("ratxa de ", "racha de ") + "<b>" + S.streak + "</b> " + (S.streak === 1 ? t("dia", "día") : t("dies", "días")));
      if (S.wk) parts.push("<b>" + Math.round(S.wk / 60) + "</b> min " + t("d’estudi aquesta setmana", "de estudio esta semana"));
    }
    if (pd) parts.push("<b>" + pd + "</b> " + t("parts de problemes PAU resoltes", "partes de problemas PAU resueltas"));
    h = "<p>" + t("Fins ara: ", "Hasta ahora: ") + parts.join(" · ") + ".</p>";
    if (S && S.due && S.due.length) h += "<p>" + t("Et toca repassar ", "Te toca repasar ") + "<b>" + S.due.length + "</b> " + (S.due.length === 1 ? t("apartat", "apartado") : t("apartats", "apartados")) + ".</p>";
    return { h: h, b: btn("stats", t("Obrir estadístiques", "Abrir estadísticas")) };
  }
  function recommend() {
    var S = null; try { S = window.mkStats && window.mkStats.data(); } catch (e) { }
    var h = "<p>" + t("Això et proposo avui:", "Esto te propongo hoy:") + "</p><ol class=\"ay-ol\">", b = "", n = 0;
    if (S && S.due && S.due.length) { n++; h += "<li>" + t("Repassa ", "Repasa ") + "<b>" + S.due.length + "</b> " + t("apartats que et toquen (repàs espaiat).", "apartados que te tocan (repaso espaciado).") + "</li>"; b += btn("stats", t("Veure el repàs", "Ver el repaso")); }
    var last = null; try { last = window.mkFav && window.mkFav.last && window.mkFav.last()[0]; } catch (e) { }
    if (last && last.u) { n++; h += "<li>" + t("Continua llegint: ", "Sigue leyendo: ") + "<b>" + esc(trl(last.t || "")) + "</b>.</li>"; b += lnk(last.u, t("Continuar", "Continuar")); }
    return pauLoad("m").then(function (U) {
      var d = jg("mk-pm", {}), pend = U.filter(function (u) { var sd = d[u.y + "-" + u.s] || d[(u.y + "-" + u.s)] || {}; return !Object.keys(sd).length; });
      if (pend.length) { var day = Math.floor(Date.now() / 864e5), u = pend[day % pend.length]; n++; h += "<li>" + t("Un problema PAU pendent: ", "Un problema PAU pendiente: ") + "<b>PAU " + u.y + " · " + t("Sèrie ", "Serie ") + u.s + " · " + u.qw + " " + u.n + "</b> (" + esc(u.th.join(", ")) + ").</li>"; b += btn("pau:" + JSON.stringify({ s: "m", q: u.y + " " + t("sèrie", "serie") + " " + u.s + " " + u.qw + " " + u.n, o: 1 }), t("Fer-lo ara", "Hacerlo ahora")); }
      if (!n) { h = "<p>" + t("Comença per un apartat de Matemàtiques II i fes després un problema de la PAU amb la solució tapada.", "Empieza por un apartado de Matemáticas II y haz después un problema de la PAU con la solución tapada.") + "</p>"; b = lnk("mates.html", t("Matemàtiques II", "Matemáticas II")); }
      else h += "</ol>";
      return { h: h, b: b };
    });
  }

  /* ───────── cerebro ───────── */
  var QUEST = /^(como|com |donde|on |puedo|puc |se puede|es posible|que es|que ha|cual|cuales|por que|why|how|quien|hay |existe|tienes|teniu)/;
  function faqBest(qs) {
    var best = null, sc = 0;
    FAQ.forEach(function (f) {
      var s = 0;
      qs.forEach(function (w) { var a = 0; for (var i = 0; i < f.kt.length && a < 2; i++) if (same(w, f.kt[i])) a = 2; if (!a) for (var j = 0; j < f.qt.length && a < 1.5; j++) if (same(w, f.qt[j])) a = 1.5; if (f.qt.indexOf(w) >= 0) a += 0.5; s += a; });
      s = s / (qs.length * 2.5); if (qs.length === 1) s *= 0.8; if (s > sc) { sc = s; best = f; }
    });
    return { f: best, s: sc };
  }
  function faqHTML(f) {
    var h = "<p>" + (es() ? f.a[1] : f.a[0]) + "</p>", b = "";
    if (f.d) b += btn(f.d[0], es() ? f.d[2] : f.d[1]); if (f.d2) f.d2.forEach(function (x) { b += btn(x[0], es() ? x[2] : x[1]); });
    f.l.forEach(function (l) { b += lnk(l[0], es() ? l[2] : l[1]); });
    return h + (b ? '<div class="ay-bt">' + b + "</div>" : "");
  }
  function pageName() { return (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, ""); }
  function ctxChips() {
    var p = pageName(), base = [t("Què estudio avui?", "¿Qué estudio hoy?"), t("El meu progrés", "Mi progreso")], pg = {
      mates: [t("Problemes PAU d’integrals", "Problemas PAU de integrales"), t("Cerca «derivades»", "Busca «derivadas»")],
      fisica: [t("Problemes PAU de Física", "Problemas PAU de Física"), t("Cerca «camp elèctric»", "Busca «campo eléctrico»")],
      filosofia: [t("Cerca «Plató»", "Busca «Platón»"), t("Problemes PAU de Filosofia", "Problemas PAU de Filosofía")],
      problemes: [t("Com cerco un problema?", "¿Cómo busco un problema?"), t("Com simulo un examen?", "¿Cómo simulo un examen?")],
      revista: [t("Què hi ha a la Revista?", "¿Qué hay en la Revista?"), t("Cerca «Newton»", "Busca «Newton»")],
      calculadora: [t("Com calculo la meva nota?", "¿Cómo calculo mi nota?"), "2^10 + 3"]
    };
    return (pg[p] || [t("Per on començo?", "¿Por dónde empiezo?"), t("On són els exàmens?", "¿Dónde están los exámenes?")]).concat(base).slice(0, 4);
  }

  function resolve(raw) {
    var q = raw.replace(/\s+/g, " ").trim(), n = nm(q), qs0 = tk(q), qs = qs0.filter(function (w) { return FILL.indexOf(" " + w + " ") < 0; }); if (!qs.length) qs = qs0;
    var wrap = function (h, b, f) { return Promise.resolve({ h: h + (b ? '<div class="ay-bt">' + b + "</div>" : ""), f: f }); };
    if (/^(hola|buenas|buenos dias|buen dia|bon dia|bona tarda|bona nit|hey|ei|hello|hi|salut)\b/.test(n) && n.length < 30) return wrap("<p>" + t("Hola! En què et puc ajudar?", "¡Hola! ¿En qué te puedo ayudar?") + "</p>", "", ctxChips());
    if (/^(gracias|gracies|moltes gracies|thanks|genial|perfecto|perfecte|vale|ok|molt be|muy bien)\b/.test(n) && n.length < 40) return wrap("<p>" + t("De res! Si necessites res més, aquí em tens.", "¡De nada! Si necesitas algo más, aquí estoy.") + "</p>", "", ctxChips());
    var c = calc(q); if (c !== null) return wrap('<p class="ay-big">' + numFmt(c) + "</p><p class=\"ay-sm\">" + t("Els angles de sin, cos i tan van en radians (o escriu 30° per a graus).", "Los ángulos de sin, cos y tan van en radianes (o escribe 30° para grados).") + "</p>", "", [t("Calculadora de nota", "Calculadora de nota")]);
    var ask = QUEST.test(n);
    var wants = /\b(pon|pone|ponme|activa|cambia|cambiame|canvia|posa|passa|pasa|quiero|vull|prefiero|prefereixo)\b/.test(n) || n.split(" ").length <= 3;
    if (/\b(oscuro|oscura|fosc|fosca|dark|noche|nit)\b/.test(n) && !ask && wants) { var d = theme("dark"); return wrap("<p>" + t("Fet: mode fosc activat.", "Hecho: modo oscuro activado.") + "</p>", btn("theme:light", t("Tornar al mode clar", "Volver al modo claro")), ctxChips()); }
    if (/\b(claro|clara|clar|clara|light|dia)\b/.test(n) && /\b(modo|mode|tema)\b/.test(n) && !ask) { theme("light"); return wrap("<p>" + t("Fet: mode clar activat.", "Hecho: modo claro activado.") + "</p>", btn("theme:dark", t("Tornar al mode fosc", "Volver al modo oscuro")), ctxChips()); }
    if (/\b(cambia|canvia)\b.*\btema\b/.test(n) && !ask) { var m = theme("toggle"); return wrap("<p>" + (m === "dark" ? t("Fet: mode fosc activat.", "Hecho: modo oscuro activado.") : t("Fet: mode clar activat.", "Hecho: modo claro activado.")) + "</p>", "", ctxChips()); }
    if (/\b(castellano|espanol|spanish|castella)\b/.test(n) && !ask && wants) { if (es()) return wrap("<p>" + t("Ja estàs en castellà.", "Ya estás en castellano.") + "</p>", "", ctxChips()); setTimeout(function () { window.MKL && window.MKL.set("es"); }, 500); return wrap("<p>Cambiando a castellano…</p>", "", []); }
    if (/\b(catalan|catala|catalá)\b/.test(n) && !ask && wants) { if (!es()) return wrap("<p>Ja estàs en català.</p>", "", ctxChips()); setTimeout(function () { window.MKL && window.MKL.set("ca"); }, 500); return wrap("<p>Canviant a català…</p>", "", []); }
    if (/(mi progreso|el meu progres|mis estadisticas|les meves estadistiques|cuanto llevo|quant porto|como voy|com vaig|mi racha|la meva ratxa|^progreso$|^progres$|^racha$|^ratxa$)/.test(n)) { var p = progress(); return wrap(p.h, p.b, [t("Què estudio avui?", "¿Qué estudio hoy?"), t("Com faig una còpia de les meves dades?", "¿Cómo hago una copia de mis datos?")]); }
    if (/(seguir leyendo|continuar llegint|continuar|continua|donde lo deje|on ho vaig deixar|ultima pagina)/.test(n) && !ask) { var last = null; try { last = window.mkFav && window.mkFav.last()[0]; } catch (e) { } if (last && last.u) return wrap("<p>" + t("Ho vas deixar a: ", "Lo dejaste en: ") + "<b>" + esc(trl(last.t || "")) + "</b></p>", lnk(last.u, t("Continuar", "Continuar")), ctxChips()); return wrap("<p>" + t("Encara no tinc cap lectura teva. Tria una assignatura i comença.", "Todavía no tengo ninguna lectura tuya. Elige una asignatura y empieza.") + "</p>", lnk("mates.html", "Matemàtiques II") + lnk("fisica.html", "Física II"), ctxChips()); }
    if (/(que (estudio|hago|toca|repaso)|recomiend|recomana|sugier|suggereix|que estudiar|que puc estudiar|que estudio|que faig avui|que hago hoy|propon|proposa)/.test(n)) return recommend().then(function (r) { return { h: r.h + (r.b ? '<div class="ay-bt">' + r.b + "</div>" : ""), f: [t("El meu progrés", "Mi progreso"), t("Consells per preparar la PAU", "Consejos para preparar la PAU")] }; });

    /* PAU: examen/problemas + año/tema */
    var yr = qs.filter(function (w) { return /^20(1\d|2\d)$/.test(w); }), pauWords = qs.filter(function (w) { return PGEN.indexOf(w) >= 0; }), rest = qs.filter(function (w) { return PGEN.indexOf(w) < 0; });
    var pauIntent = (!ask && /\b(pau|examen|examenes|examens|problema|problemas|problemes|selectividad|selectivitat|serie|series|ejercicio|exercici)\b/.test(n) && (rest.length || yr.length)) || (yr.length && qs.length <= 3 && !ask);
    if (pauIntent) {
      var sj = subjOf(n);
      return pauSearch(sj, rest, false).then(function (res) {
        if (!res.length) return { h: "<p>" + t("No he trobat problemes de la PAU de ", "No he encontrado problemas de la PAU de ") + subjName(sj) + t(" amb aquests termes. Prova amb una sola paraula («integral», «matriu») o un any.", " con esos términos. Prueba con una sola palabra («integral», «matriz») o un año.") + "</p>", f: ctxChips() };
        var qq = rest.join(" "), tot = res.length;
        return { h: "<p>" + t("He trobat ", "He encontrado ") + "<b>" + tot + "</b> " + (tot === 1 ? t("problema", "problema") : t("problemes", "problemas")) + " " + t("a ", "en ") + subjName(sj) + (qq ? " " + t("per a", "para") + " «" + esc(qq) + "»" : "") + ":</p>" + pauCards(sj, res, rest) + '<div class="ay-bt">' + btn("pau:" + JSON.stringify({ s: sj, q: qq }), t("Veure tots (", "Ver todos (") + tot + ")") + "</div>", f: [t("Com simulo un examen?", "¿Cómo simulo un examen?")] };
      });
    }

    var fb = faqBest(qs0);
    if (fb.f && fb.s >= 0.55) return wrap(faqHTML(fb.f), "", ctxChips().slice(0, 3));

    /* búsqueda en el contenido + problemas PAU relacionados */
    if (!qs.length) return wrap("<p>" + t("Escriu una pregunta o una paraula i la busco per tot el portal.", "Escribe una pregunta o una palabra y la busco por todo el portal.") + "</p>", "", ctxChips());
    return Promise.all([loadIx(), pauSearch(subjOf(n), qs, true).catch(function () { return []; })]).then(function (r) {
      var res = searchIx(r[0], qs), pr = r[1], sj = subjOf(n), h = "", b = "";
      if (res.length) {
        h += "<p>" + t("Això és el que he trobat per a ", "Esto es lo que he encontrado para ") + "«" + esc(qs.join(" ")) + "»:</p>" + cards(res, qs, 4);
        if (res.length > 4) b += btn("palette:" + qs.join(" "), t("Veure tots (", "Ver todos (") + res.length + ")");
      }
      if (pr.length) { if (!res.length) h += "<p>" + t("No he trobat apunts, però sí problemes de la PAU:", "No he encontrado apuntes, pero sí problemas de la PAU:") + "</p>" + pauCards(sj, pr, qs); b += btn("pau:" + JSON.stringify({ s: sj, q: qs.join(" ") }), pr.length + " " + t("problemes PAU", "problemas PAU")); }
      if (!res.length && !pr.length) {
        if (fb.f && fb.s >= 0.3) return { h: "<p>" + t("No ho he trobat al contingut, però potser et serveix això:", "No lo he encontrado en el contenido, pero quizá te sirva esto:") + "</p>" + faqHTML(fb.f), f: ctxChips().slice(0, 3) };
        return { h: "<p>" + t("No he trobat res per a «", "No he encontrado nada para «") + esc(q) + t("». Prova amb una altra paraula, més curta o sense accents.", "». Prueba con otra palabra, más corta o sin tildes.") + "</p>" + '<div class="ay-bt">' + btn("palette:" + qs.join(" "), t("Obrir el cercador", "Abrir el buscador")) + lnk("preguntes.html", t("Preguntes freqüents", "Preguntas frecuentes")) + "</div>", f: ctxChips() };
      }
      return { h: h + (b ? '<div class="ay-bt">' + b + "</div>" : ""), f: [t("Què estudio avui?", "¿Qué estudio hoy?")] };
    }).catch(function () { return { h: "<p>" + t("Ara mateix no puc cercar. Prova el cercador del portal (Ctrl + K).", "Ahora mismo no puedo buscar. Prueba el buscador del portal (Ctrl + K).") + "</p>", f: [] }; });
  }

  /* ───────── interfaz ───────── */
  var css = ".ay-p{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(var(--ay-b,16px) + 66px);z-index:59;width:min(396px,calc(100vw - 32px));height:min(600px,calc(100dvh - var(--ay-b,16px) - 96px));min-height:300px;display:flex;flex-direction:column;border-radius:26px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 86%,transparent);-webkit-backdrop-filter:blur(28px) saturate(180%);backdrop-filter:blur(28px) saturate(180%);border:1px solid var(--line,rgba(0,0,0,.12));box-shadow:0 36px 80px -24px rgba(0,0,0,.5),0 0 0 .5px rgba(0,0,0,.05);transform-origin:100% 100%;opacity:0;transform:translateY(14px) scale(.9);pointer-events:none;visibility:hidden;transition:opacity .2s,transform .5s cubic-bezier(.3,1.25,.5,1),visibility 0s .5s;overflow:hidden}" +
    ".ay-p.on{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .2s,transform .5s cubic-bezier(.3,1.25,.5,1),visibility 0s}" +
    ".ay-h{display:flex;align-items:center;gap:8px;padding:14px 14px 10px 18px}.ay-t{flex:1;min-width:0}.ay-t b{display:block;font:800 17px/1.15 var(--disp,system-ui,sans-serif);letter-spacing:-.02em}.ay-t small{display:block;margin-top:2px;color:var(--muted,#666);font:500 12.5px/1.2 var(--sans,system-ui,sans-serif)}" +
    ".ay-ib{border:0;background:var(--soft,rgba(0,0,0,.06));color:inherit;width:34px;height:34px;border-radius:50%;cursor:pointer;display:grid;place-items:center;padding:0;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}.ay-ib:active{transform:scale(.88)}.ay-ib svg{width:16px;height:16px}.ay-ib:focus-visible,.ay-l:focus-visible,.ay-c:focus-visible,.ay-ch:focus-visible,.ay-s:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}" +
    ".ay-lg{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:6px 14px 10px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}.ay-lg:focus-visible{outline:0}" +
    ".ay-m{max-width:92%;padding:10px 14px;border-radius:19px;font:400 15px/1.5 var(--sans,system-ui,sans-serif);overflow-wrap:anywhere;animation:ay-in .45s cubic-bezier(.3,1.3,.5,1) both}.ay-m p{margin:0 0 8px}.ay-m p:last-child{margin-bottom:0}.ay-m b{font-weight:700}" +
    ".ay-m.u{align-self:flex-end;background:var(--rk,#be123c);color:#fff;border-bottom-right-radius:7px}.ay-m.b{align-self:flex-start;background:var(--soft,rgba(0,0,0,.06));border-bottom-left-radius:7px}.ay-m.b.w{max-width:100%;width:100%}" +
    "@keyframes ay-in{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}" +
    ".ay-big{font:800 30px/1.1 var(--disp,system-ui,sans-serif)!important;letter-spacing:-.03em;margin:2px 0 6px!important}.ay-sm{font-size:12.5px!important;color:var(--muted,#666)}.ay-ol{margin:0 0 6px;padding-left:20px}.ay-ol li{margin:0 0 5px}" +
    ".ay-bt{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.ay-l{display:inline-flex;align-items:center;min-height:36px;padding:0 14px;border:0;border-radius:999px;background:var(--rk,#be123c);color:#fff;text-decoration:none;font:600 13.5px/1 var(--sans,system-ui,sans-serif);cursor:pointer;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}.ay-l:active{transform:scale(.94)}button.ay-l:not(.p){background:var(--fg,#111);color:var(--bg,#fff)}" +
    ".ay-cs2{display:grid;gap:6px;margin:4px 0 2px}.ay-c{display:block;width:100%;text-align:left;padding:10px 12px;border:0;border-radius:14px;background:var(--bg,#fff);color:inherit;text-decoration:none;font:inherit;cursor:pointer;box-shadow:inset 0 0 0 1px var(--line,rgba(0,0,0,.1));transition:transform .35s cubic-bezier(.3,1.4,.5,1),box-shadow .2s}.ay-c:hover{box-shadow:inset 0 0 0 1.5px var(--rk,#be123c)}.ay-c:active{transform:scale(.985)}" +
    ".ay-c b{display:block;font:700 14px/1.3 var(--sans,system-ui,sans-serif)}.ay-c small{display:block;margin:1px 0 3px;color:color-mix(in srgb,var(--rk,#be123c) 62%,var(--fg,#111));font:600 11.5px/1.3 var(--sans,system-ui,sans-serif);letter-spacing:.01em}.ay-c span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--muted,#555);font:400 13px/1.4 var(--sans,system-ui,sans-serif)}.ay-c mark{background:color-mix(in srgb,var(--rk,#be123c) 22%,transparent);color:inherit;border-radius:3px;padding:0 1px}" +
    ".ay-ty{align-self:flex-start;display:flex;gap:4px;padding:13px 15px;border-radius:19px;border-bottom-left-radius:7px;background:var(--soft,rgba(0,0,0,.06))}.ay-ty i{width:7px;height:7px;border-radius:50%;background:var(--muted,#777);animation:ay-d 1s infinite ease-in-out}.ay-ty i:nth-child(2){animation-delay:.15s}.ay-ty i:nth-child(3){animation-delay:.3s}@keyframes ay-d{0%,60%,100%{transform:none;opacity:.45}30%{transform:translateY(-4px);opacity:1}}" +
    ".ay-cs[hidden]{display:none}.ay-cs{display:flex;gap:6px;overflow-x:auto;padding:4px 14px 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}.ay-cs::-webkit-scrollbar{display:none}.ay-ch{flex:none;min-height:34px;padding:0 13px;border:0;border-radius:999px;background:var(--soft,rgba(0,0,0,.06));color:inherit;font:600 13px/1 var(--sans,system-ui,sans-serif);cursor:pointer;white-space:nowrap;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}.ay-ch:active{transform:scale(.94)}" +
    ".ay-f{display:flex;gap:8px;align-items:center;padding:6px 12px calc(12px + env(safe-area-inset-bottom,0px) * 0);border-top:1px solid var(--line,rgba(0,0,0,.08))}.ay-in{flex:1;min-width:0;height:44px;border:0;border-radius:999px;padding:0 16px;background:var(--soft,rgba(0,0,0,.06));color:inherit;font:500 16px var(--sans,system-ui,sans-serif);outline:0;transition:box-shadow .25s}.ay-in:focus{box-shadow:0 0 0 2px var(--rk,#be123c)}.ay-in::placeholder{color:var(--muted,#777)}" +
    ".ay-s{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:var(--rk,#be123c);color:#fff;display:grid;place-items:center;cursor:pointer;padding:0;transition:transform .35s cubic-bezier(.3,1.4,.5,1),opacity .2s}.ay-s:disabled{opacity:.35;cursor:default}.ay-s:active:not(:disabled){transform:scale(.9)}.ay-s svg{width:19px;height:19px}" +
    "@media(max-width:480px){.ay-p{width:calc(100vw - 24px);right:max(12px,env(safe-area-inset-right,0px));border-radius:24px}}" +
    "@media(prefers-reduced-motion:reduce){.ay-p,.ay-p.on{transition:opacity .15s,visibility 0s}.ay-p{transform:none}.ay-m{animation:none}.ay-ty i{animation:none}.ay-ib,.ay-l,.ay-c,.ay-ch,.ay-s{transition:none}.ay-lg{scroll-behavior:auto}}" +
    "@media(prefers-reduced-transparency:reduce){.ay-p{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){.ay-p{border:2px solid var(--fg,#111)}.ay-c{box-shadow:inset 0 0 0 1.5px var(--fg,#111)}}@media print{.ay-p{display:none}}";
  var panel, lg, cs, inp, sbtn, open = false, last, log = [], typingEl = null, ready = false;
  var SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  function fab() { return window.__mkAy && window.__mkAy.fab; }
  function persist() { try { sessionStorage.setItem("mk-ay-log", JSON.stringify(log.slice(-24))); } catch (e) { } }
  function add(r, h, keep) {
    var d = D.createElement("div"); d.className = "ay-m " + r; if (r === "b" && /ay-cs2/.test(h)) d.className += " w"; d.innerHTML = h; if (keep === false) d.style.animation = "none";
    lg.appendChild(d); lg.scrollTop = lg.scrollHeight; if (keep !== false) { log.push({ r: r, h: h }); persist(); } return d;
  }
  function say(h) { add("b", "<p>" + h + "</p>"); }
  function chips(list) {
    cs.innerHTML = (list || []).map(function (c) { return '<button type="button" class="ay-ch">' + esc(c) + "</button>"; }).join(""); cs.hidden = !list || !list.length;
  }
  function typing(on) {
    if (on && !typingEl) { typingEl = D.createElement("div"); typingEl.className = "ay-ty"; typingEl.setAttribute("aria-hidden", "true"); typingEl.innerHTML = "<i></i><i></i><i></i>"; lg.appendChild(typingEl); lg.scrollTop = lg.scrollHeight; }
    else if (!on && typingEl) { typingEl.remove(); typingEl = null; }
  }
  function greet() {
    add("b", "<p>" + t("Hola! Sóc l’assistent de Menudo Kanteo. Puc cercar als apunts i als problemes de la PAU, calcular, canviar el tema o l’idioma i ensenyar-te el teu progrés.", "¡Hola! Soy el asistente de Menudo Kanteo. Puedo buscar en los apuntes y en los problemas de la PAU, calcular, cambiar el tema o el idioma y enseñarte tu progreso.") + "</p><p>" + t("Què necessites?", "¿Qué necesitas?") + "</p>");
    chips(ctxChips());
  }
  var busy = false;
  function ask(raw) {
    var q = String(raw || "").trim().slice(0, 200); if (!q || busy) return; busy = true; inp.value = ""; sbtn.disabled = true;
    add("u", esc(q)); chips([]); typing(true);
    var t0 = Date.now(), out;
    try { out = resolve(q); } catch (e) { out = Promise.resolve({ h: "<p>" + t("Ups, alguna cosa ha fallat. Torna-ho a provar.", "Ups, algo ha fallado. Inténtalo de nuevo.") + "</p>", f: ctxChips() }); }
    out.then(function (r) {
      var wait = RM ? 0 : Math.max(0, 380 - (Date.now() - t0));
      setTimeout(function () { typing(false); add("b", r.h); chips(r.f); busy = false; sbtn.disabled = !inp.value.trim(); }, wait);
    }).catch(function () { typing(false); busy = false; add("b", "<p>" + t("Ups, alguna cosa ha fallat.", "Ups, algo ha fallado.") + "</p>"); });
  }
  function reset() { log = []; persist(); lg.innerHTML = ""; typing(false); busy = false; greet(); inp.focus({ preventScroll: true }); }
  function build() {
    var st = D.createElement("style"); st.textContent = css; D.head.appendChild(st);
    panel = D.createElement("div"); panel.className = "ay-p"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-modal", "false"); panel.setAttribute("aria-label", t("Assistent", "Asistente")); panel.setAttribute("inert", "");
    panel.innerHTML = '<div class="ay-h"><div class="ay-t"><b>' + t("Assistent", "Asistente") + "</b><small>" + t("Cerca, càlcul i ajuda del portal", "Búsqueda, cálculo y ayuda del portal") + '</small></div>' +
      '<button type="button" class="ay-ib" data-a="reset" aria-label="' + t("Nova conversa", "Nueva conversación") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>' +
      '<button type="button" class="ay-ib" data-a="close" aria-label="' + t("Tanca l’assistent", "Cierra el asistente") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="ay-lg" role="log" aria-live="polite" aria-relevant="additions" tabindex="-1"></div><div class="ay-cs" role="group" aria-label="' + t("Suggeriments", "Sugerencias") + '"></div>' +
      '<form class="ay-f" autocomplete="off"><input class="ay-in" type="text" maxlength="200" enterkeyhint="send" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="' + esc(t("Pregunta, cerca o calcula…", "Pregunta, busca o calcula…")) + '" aria-label="' + esc(t("Escriu la teva pregunta", "Escribe tu pregunta")) + '"><button type="submit" class="ay-s" aria-label="' + t("Envia", "Envía") + '" disabled>' + SEND + "</button></form>";
    D.body.appendChild(panel);
    lg = panel.querySelector(".ay-lg"); cs = panel.querySelector(".ay-cs"); inp = panel.querySelector(".ay-in"); sbtn = panel.querySelector(".ay-s");
    panel.querySelector('[data-a="close"]').addEventListener("click", function () { toggle(false); });
    panel.querySelector('[data-a="reset"]').addEventListener("click", reset);
    inp.addEventListener("input", function () { sbtn.disabled = busy || !inp.value.trim(); });
    panel.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); ask(inp.value); });
    cs.addEventListener("click", function (e) { var b = e.target.closest(".ay-ch"); if (b) ask(b.textContent); });
    lg.addEventListener("click", function (e) { var b = e.target.closest("[data-do]"); if (b) { e.preventDefault(); doAct(b.getAttribute("data-do")); } });
    D.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) { e.preventDefault(); toggle(false); } });
    D.addEventListener("pointerdown", function (e) { var f = fab(); if (open && !panel.contains(e.target) && !(f && f.contains(e.target))) toggle(false); });
    var saved = []; try { saved = JSON.parse(sessionStorage.getItem("mk-ay-log")) || []; } catch (e) { }
    if (saved.length) { saved.forEach(function (m) { add(m.r, m.h, false); log.push(m); }); chips(ctxChips()); } else greet();
    ready = true;
  }
  function toggle(on) {
    if (!ready) build();
    open = on == null ? !open : on; var f = fab(); if (window.__mkAy) window.__mkAy.place();
    if (open) { panel.classList.add("on"); panel.removeAttribute("inert"); last = D.activeElement; lg.scrollTop = lg.scrollHeight; setTimeout(function () { inp.focus({ preventScroll: true }); }, 80); }
    else { panel.classList.remove("on"); panel.setAttribute("inert", ""); if (f && D.activeElement && panel.contains(D.activeElement)) f.focus({ preventScroll: true }); }
    if (f) { f.setAttribute("aria-expanded", String(open)); f.setAttribute("aria-label", open ? t("Tanca l’assistent", "Cierra el asistente") : t("Obre l’assistent", "Abre el asistente")); }
  }
  function close() { toggle(false); }
  window.__mkAyChat = { toggle: toggle, ask: function (q) { toggle(true); ask(q); }, calc: calc, resolve: resolve };
})();
