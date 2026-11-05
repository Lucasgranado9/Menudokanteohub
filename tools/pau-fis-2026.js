/* PAU 2026 · Física · sèries 1 i 5 (ordinària) i 2 (extraordinària). Quatre exercicis; en alguns s'tria l'opció A o B.
 * Enunciats oficials (català); traducció al castellà i solucions pròpies. Dibuixos en SVG. */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  g: T('Camps gravitatoris', 'Campos gravitatorios'), e: T('Camps electromagnètics', 'Campos electromagnéticos'),
  o: T('Vibracions i ones', 'Vibraciones y ondas'), n: T('Física relativista, quàntica, nuclear', 'Física relativista, cuántica, nuclear'),
};
const F = tex => html(D(tex));
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>');
const DAT = (ca, es) => p('<b>Dades:</b> ' + ca, '<b>Datos:</b> ' + es);
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const figL = fn => ({ ca: '<figure class="pfig">' + fn('ca') + '</figure>', es: '<figure class="pfig">' + fn('es') + '</figure>' });
const img = (f, w, h, ca, es) => ({ ca: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + ca + '"></figure>', es: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + es + '"></figure>' });

/* ───── petits dibuixos SVG (classes del tema: ln, vc, vh, pl, fe, eq, bod, sun, pt, lb) ───── */
const f1 = v => +(+v).toFixed(1);
const SV = (w, h, alt, body) => `<svg class="pp" viewBox="0 0 ${w} ${h}" role="img" aria-label="${alt}">${body}</svg>`;
const LN = (x1, y1, x2, y2, c = 'ln') => `<path class="${c}" d="M${f1(x1)},${f1(y1)}L${f1(x2)},${f1(y2)}"/>`;
const AR = (x1, y1, x2, y2, c = 'vc') => {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 9, hx = x2 - s * Math.cos(a), hy = y2 - s * Math.sin(a), px = -Math.sin(a) * 3.8, py = Math.cos(a) * 3.8;
  return `<path class="${c}" d="M${f1(x1)},${f1(y1)}L${f1(hx)},${f1(hy)}"/><path class="${c} vh" d="M${f1(x2)},${f1(y2)}L${f1(hx + px)},${f1(hy + py)}L${f1(hx - px)},${f1(hy - py)}Z"/>`;
};
const TX = (x, y, t, a = 'middle') => `<text class="lb" x="${f1(x)}" y="${f1(y)}" text-anchor="${a}">${t}</text>`;
const DOT = (x, y, rr = 3.6, c = 'pt') => `<circle class="${c}" cx="${f1(x)}" cy="${f1(y)}" r="${rr}"/>`;
const RECT = (x, y, w, h, c = 'pl') => `<rect class="${c}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}"/>`;
const PATH = (d, c = 'ln') => `<path class="${c}" d="${d}"/>`;
const L2 = (lang, ca, es) => lang === 'ca' ? ca : es;
const u = s => `\\text{${s}}`;
const GC = M('G=6{,}67\\cdot10^{-11}\\ \\text{N m}^2\\,\\text{kg}^{-2}');
const MTc = M('M_T=5{,}98\\cdot10^{24}\\ \\text{kg}'), RTc = M('R_T=6\\,370\\ \\text{km}');
const ECON = M('|e|=1{,}602\\cdot10^{-19}\\ \\text{C}'), MEC = M('m_e=9{,}11\\cdot10^{-31}\\ \\text{kg}'), CC = M('c=3{,}00\\cdot10^{8}\\ \\text{m s}^{-1}'), HC = M('h=6{,}63\\cdot10^{-34}\\ \\text{J s}');

const part = (n, q, sol, pts = 1.25) => ({ n, pts, q, sol });

/* ───────────────────────── SÈRIE 1 (ordinària) ───────────────────────── */
const orbitHalley = lang => {
  const cx = 170, cy = 100, a = 130, b = 62, c = Math.sqrt(a * a - b * b), sx = cx + c;
  let d = ''; for (let i = 0; i <= 120; i++) { const th = i / 120 * 2 * Math.PI; d += (i ? 'L' : 'M') + f1(cx + a * Math.cos(th)) + ',' + f1(cy + b * Math.sin(th)); }
  return SV(360, 200, L2(lang, 'Òrbita el·líptica del cometa Halley amb el Sol en un focus, el periheli i l’afeli', 'Órbita elíptica del cometa Halley con el Sol en un foco, el perihelio y el afelio'),
    PATH(d + 'Z', 'c2') + LN(cx - a, cy, cx + a, cy, 'dsh') + DOT(sx, cy, 7, 'sun') + DOT(cx + a, cy, 3.6) + DOT(cx - a, cy, 3.6) +
    AR(cx + a, cy, cx + a, cy - 38) + AR(cx - a, cy, cx - a, cy + 14) +
    TX(sx - 2, cy + 24, L2(lang, 'Sol', 'Sol')) + TX(cx + a + 6, cy + 16, L2(lang, 'periheli', 'perihelio'), 'start') + TX(cx - a - 6, cy - 10, L2(lang, 'afeli', 'afelio'), 'end') +
    TX(cx + a + 6, cy - 40, 'v<tspan dy="3" font-size="9">P</tspan>', 'start') + TX(cx - a + 8, cy + 26, 'v<tspan dy="3" font-size="9">A</tspan>', 'start') +
    TX(cx + 40, cy + 72, 'r<tspan dy="3" font-size="9">P</tspan>' + ' ' + L2(lang, '(petit)', '(pequeño)'), 'middle'));
};
const tubeX = lang => {
  const xs = 70, xe = 290, y0 = 28, y1 = 142;
  let lines = ''; [46, 68, 90, 112, 134].forEach(y => lines += AR(xe - 10, y, xs + 16, y, 'vc2'));
  return SV(360, 190, L2(lang, 'Camp elèctric entre les plaques (cap al càtode) i força elèctrica sobre l’electró (cap a l’ànode)', 'Campo eléctrico entre las placas (hacia el cátodo) y fuerza eléctrica sobre el electrón (hacia el ánodo)'),
    RECT(xs - 8, y0, 8, y1 - y0) + RECT(xe, y0, 8, y1 - y0) + lines +
    DOT(180, 90, 6, 'pt') + `<path class="ln" d="M175,90h10"/>` + AR(186, 90, 238, 90) +
    TX(xs - 4, y0 - 8, L2(lang, 'Càtode (−)', 'Cátodo (−)')) + TX(xe + 4, y0 - 8, L2(lang, 'Ànode (+)', 'Ánodo (+)')) +
    TX(180, 78, 'e⁻') + TX(244, 94, 'F', 'start') + TX(210, 40, 'E') + TX(180, 176, L2(lang, 'F té sentit contrari a E (càrrega negativa)', 'F tiene sentido contrario a E (carga negativa)')));
};

const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2026-fisica-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g, choose: true, opts: [
      { k: 'A',
        intro: J(p('A finals de l’any 2025, la Generalitat de Catalunya va llançar a l’espai un nanosatèl·lit que descriu una òrbita circular al voltant de la Terra a una altura aproximada de 500 km per sobre de la superfície terrestre.',
                   'A finales del año 2025, la Generalitat de Cataluña lanzó al espacio un nanosatélite que describe una órbita circular alrededor de la Tierra a una altura aproximada de 500 km sobre la superficie terrestre.'),
                 DAT(GC + '; ' + MTc + '; ' + RTc + '.', GC + '; ' + MTc + '; ' + RTc + '.')),
        parts: [
          part('1.1', T('A partir de la llei de la gravitació universal, deduïu l’expressió del període orbital en funció del radi orbital i de la massa de la Terra, i calculeu el període orbital del nanosatèl·lit.',
                        'A partir de la ley de la gravitación universal, deduzca la expresión del periodo orbital en función del radio orbital y de la masa de la Tierra, y calcule el periodo orbital del nanosatélite.'),
            [
              p('Sobre el satèl·lit només actua l’atracció gravitatòria de la Terra, que fa de força centrípeta en un moviment circular uniforme:', 'Sobre el satélite solo actúa la atracción gravitatoria de la Tierra, que hace de fuerza centrípeta en un movimiento circular uniforme:'),
              F(r`G\dfrac{M_T\,m}{r^2}=m\dfrac{v^2}{r}\ \Rightarrow\ v=\sqrt{\dfrac{G\,M_T}{r}}`),
              p('Amb ' + M(r`T=\dfrac{2\pi r}{v}`) + ':', 'Con ' + M(r`T=\dfrac{2\pi r}{v}`) + ':'),
              F(r`T=2\pi r\sqrt{\dfrac{r}{G M_T}}=2\pi\sqrt{\dfrac{r^3}{G M_T}}`),
              p('El radi orbital és ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+5{,}0\cdot10^{5}=6{,}87\cdot10^{6}\ \text{m}`) + ':', 'El radio orbital es ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+5{,}0\cdot10^{5}=6{,}87\cdot10^{6}\ \text{m}`) + ':'),
              F(r`T=2\pi\sqrt{\dfrac{(6{,}87\cdot10^{6})^3}{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}}}`),
              ans('Període: <b>' + M(r`T=5{,}66\cdot10^{3}\ \text{s}`) + '</b> (uns 94 minuts).', 'Periodo: <b>' + M(r`T=5{,}66\cdot10^{3}\ \text{s}`) + '</b> (unos 94 minutos).'),
            ]),
          part('1.2', T('Sabent que la massa del nanosatèl·lit és d’11,1 kg, calculeu l’increment d’energia potencial gravitatòria del satèl·lit en passar de la superfície terrestre a l’òrbita. Calculeu també l’energia mecànica del satèl·lit a l’òrbita. Es tracta d’una òrbita tancada? Justifiqueu la resposta.',
                        'Sabiendo que la masa del nanosatélite es de 11,1 kg, calcule el incremento de energía potencial gravitatoria del satélite al pasar de la superficie terrestre a la órbita. Calcule también la energía mecánica del satélite en la órbita. ¿Se trata de una órbita cerrada? Justifique la respuesta.'),
            [
              F(r`\Delta U=U(r)-U(R_T)=-G M_T m\Big(\dfrac1r-\dfrac1{R_T}\Big)=G M_T m\Big(\dfrac1{R_T}-\dfrac1r\Big)`),
              F(r`\Delta U=6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}\cdot11{,}1\Big(\dfrac1{6{,}37\cdot10^{6}}-\dfrac1{6{,}87\cdot10^{6}}\Big)=5{,}06\cdot10^{7}\ \text{J}`),
              p('Per a l’energia mecànica: ' + M(r`v=\sqrt{GM_T/r}=7{,}62\cdot10^{3}\ \text{m/s}`) + ', de manera que:', 'Para la energía mecánica: ' + M(r`v=\sqrt{GM_T/r}=7{,}62\cdot10^{3}\ \text{m/s}`) + ', de modo que:'),
              F(r`E_c=\tfrac12 m v^2=3{,}22\cdot10^{8}\ \text{J},\qquad U=-\dfrac{G M_T m}{r}=-6{,}44\cdot10^{8}\ \text{J}`),
              F(r`E_m=E_c+U=-\dfrac{G M_T m}{2r}=-3{,}22\cdot10^{8}\ \text{J}`),
              ans('<b>' + M(r`\Delta U=5{,}06\cdot10^{7}\ \text{J}`) + '</b> i <b>' + M(r`E_m=-3{,}22\cdot10^{8}\ \text{J}`) + '</b>. Com que ' + M('E_m<0') + ', el satèl·lit està lligat a la Terra: l’òrbita és <b>tancada</b> (aquí, una circumferència).',
                  '<b>' + M(r`\Delta U=5{,}06\cdot10^{7}\ \text{J}`) + '</b> y <b>' + M(r`E_m=-3{,}22\cdot10^{8}\ \text{J}`) + '</b>. Como ' + M('E_m<0') + ', el satélite está ligado a la Tierra: la órbita es <b>cerrada</b> (aquí, una circunferencia).'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('Edmond Halley (1656-1742) va estudiar els registres històrics d’observacions de cometes dels segles XVI i XVII, i va concloure que diverses d’aquestes observacions corresponien al mateix objecte. Es tractava d’un cometa periòdic gran i brillant que orbitava al voltant del Sol i que havia estat observat per darrera vegada l’any 1682. Actualment aquest cometa és conegut com el cometa Halley.',
                   'Edmond Halley (1656-1742) estudió los registros históricos de observaciones de cometas de los siglos XVI y XVII, y concluyó que varias de esas observaciones correspondían al mismo objeto. Se trataba de un cometa periódico grande y brillante que orbitaba alrededor del Sol y que había sido observado por última vez en el año 1682. Actualmente este cometa es conocido como el cometa Halley.'),
                 DAT(GC + '; ' + M(r`M_S=1{,}99\cdot10^{30}\ \text{kg}`) + '; ' + M(r`r_P=0{,}575\ \text{ua}`) + ' (periheli); ' + M(r`r_A=35{,}3\ \text{ua}`) + ' (afeli); ' + M(r`v_A=896\ \text{m s}^{-1}`) + '; ' + M(r`1\ \text{ua}=1{,}50\cdot10^{11}\ \text{m}`) + '.',
                     GC + '; ' + M(r`M_S=1{,}99\cdot10^{30}\ \text{kg}`) + '; ' + M(r`r_P=0{,}575\ \text{ua}`) + ' (perihelio); ' + M(r`r_A=35{,}3\ \text{ua}`) + ' (afelio); ' + M(r`v_A=896\ \text{m s}^{-1}`) + '; ' + M(r`1\ \text{ua}=1{,}50\cdot10^{11}\ \text{m}`) + '.')),
        parts: [
          part('1.1', T('Feu un dibuix esquemàtic de l’òrbita el·líptica del cometa Halley, indicant-ne el periheli i l’afeli. Calculeu el semieix major de l’el·lipse i el període orbital del cometa. Raoneu si Edmond Halley va poder observar el cometa que porta el seu nom més d’una vegada.',
                        'Haga un dibujo esquemático de la órbita elíptica del cometa Halley, indicando su perihelio y su afelio. Calcule el semieje mayor de la elipse y el periodo orbital del cometa. Razone si Edmond Halley pudo observar el cometa que lleva su nombre más de una vez.'),
            [
              figL(orbitHalley),
              p('El Sol ocupa un dels focus; el periheli és el punt més proper al Sol i l’afeli el més allunyat, tots dos sobre l’eix major. El semieix major és la mitjana de les dues distàncies:', 'El Sol ocupa uno de los focos; el perihelio es el punto más cercano al Sol y el afelio el más alejado, ambos sobre el eje mayor. El semieje mayor es la media de las dos distancias:'),
              F(r`a=\dfrac{r_P+r_A}{2}=\dfrac{0{,}575+35{,}3}{2}=17{,}94\ \text{ua}=2{,}69\cdot10^{12}\ \text{m}`),
              p('Tercera llei de Kepler: ' + M(r`T^2=\dfrac{4\pi^2}{G M_S}\,a^3`) + ':', 'Tercera ley de Kepler: ' + M(r`T^2=\dfrac{4\pi^2}{G M_S}\,a^3`) + ':'),
              F(r`T=\sqrt{\dfrac{4\pi^2}{6{,}67\cdot10^{-11}\cdot1{,}99\cdot10^{30}}\,(2{,}69\cdot10^{12})^3}=2{,}41\cdot10^{9}\ \text{s}\approx76{,}0\ \text{anys}`),
              p('(Amb unitats astronòmiques i anys, ' + M(r`T^2=a^3`) + ' ⇒ ' + M(r`T=17{,}94^{3/2}=76{,}0`) + ' anys.)', '(Con unidades astronómicas y años, ' + M(r`T^2=a^3`) + ' ⇒ ' + M(r`T=17{,}94^{3/2}=76{,}0`) + ' años.)'),
              ans('Semieix major <b>' + M(r`a=17{,}94\ \text{ua}=2{,}69\cdot10^{12}\ \text{m}`) + '</b>; període <b>76 anys</b>. Halley va néixer el 1656 i va veure el cometa el 1682; el següent retorn va ser el 1758 (1682 + 76), setze anys després de la seva mort (1742). <b>Només el va poder veure una vegada.</b>',
                  'Semieje mayor <b>' + M(r`a=17{,}94\ \text{ua}=2{,}69\cdot10^{12}\ \text{m}`) + '</b>; periodo <b>76 años</b>. Halley nació en 1656 y vio el cometa en 1682; el siguiente regreso fue en 1758 (1682 + 76), dieciséis años después de su muerte (1742). <b>Solo pudo verlo una vez.</b>'),
            ]),
          part('1.2', T('Raoneu en quin punt de l’òrbita el cometa assoleix la velocitat màxima. A partir de les dades que es faciliten, calculeu la velocitat del cometa Halley quan passa pel periheli de l’òrbita, indicant clarament els principis físics que heu emprat.',
                        'Razone en qué punto de la órbita el cometa alcanza la velocidad máxima. A partir de los datos que se facilitan, calcule la velocidad del cometa Halley cuando pasa por el perihelio de la órbita, indicando claramente los principios físicos que ha empleado.'),
            [
              p('<b>Velocitat màxima: al periheli.</b> L’energia mecànica es conserva (força central conservativa): ' + M(r`E_m=\tfrac12 m v^2-\dfrac{G M_S m}{r}`) + ' és constant, de manera que ' + M('v') + ' és màxima quan ' + M('r') + ' és mínim. (Equivalent: segons la 2a llei de Kepler, l’àrea escombrada per unitat de temps és constant, i prop del Sol cal recórrer més arc.)',
                '<b>Velocidad máxima: en el perihelio.</b> La energía mecánica se conserva (fuerza central conservativa): ' + M(r`E_m=\tfrac12 m v^2-\dfrac{G M_S m}{r}`) + ' es constante, de modo que ' + M('v') + ' es máxima cuando ' + M('r') + ' es mínimo. (Equivalente: según la 2.ª ley de Kepler, el área barrida por unidad de tiempo es constante, y cerca del Sol hay que recorrer más arco.)'),
              p('<b>Moment angular.</b> La força gravitatòria és central, així que ' + M(r`\vec L=m\,\vec r\times\vec v`) + ' es conserva. Al periheli i a l’afeli ' + M(r`\vec r`) + ' i ' + M(r`\vec v`) + ' són perpendiculars (' + M(r`L=m\,r\,v`) + '):', '<b>Momento angular.</b> La fuerza gravitatoria es central, así que ' + M(r`\vec L=m\,\vec r\times\vec v`) + ' se conserva. En el perihelio y en el afelio ' + M(r`\vec r`) + ' y ' + M(r`\vec v`) + ' son perpendiculares (' + M(r`L=m\,r\,v`) + '):'),
              F(r`r_P v_P=r_A v_A\ \Rightarrow\ v_P=v_A\dfrac{r_A}{r_P}=896\cdot\dfrac{35{,}3}{0{,}575}`),
              AN(r`v_P=5{,}5\cdot10^{4}\ \text{m/s}`),
              p('Comprovació amb la conservació de l’energia: ' + M(r`v_P=\sqrt{v_A^2+2GM_S\big(\tfrac1{r_P}-\tfrac1{r_A}\big)}=5{,}5\cdot10^{4}\ \text{m/s}`) + '.', 'Comprobación con la conservación de la energía: ' + M(r`v_P=\sqrt{v_A^2+2GM_S\big(\tfrac1{r_P}-\tfrac1{r_A}\big)}=5{,}5\cdot10^{4}\ \text{m/s}`) + '.'),
            ]),
        ] },
    ] },

    { n: 2, pts: 2.5, topic: TOP.e,
      intro: J(p('Els raigs X es generen mitjançant un tub on s’ha fet el buit i que conté dues plaques de tungstè. La placa negativa (càtode) s’escalfa i emet electrons, els quals són accelerats cap a la placa positiva (ànode). En xocar contra aquesta altra placa, els electrons s’aturen bruscament i es generen els raigs X.',
                 'Los rayos X se generan mediante un tubo en el que se ha hecho el vacío y que contiene dos placas de tungsteno. La placa negativa (cátodo) se calienta y emite electrones, que son acelerados hacia la placa positiva (ánodo). Al chocar contra esta otra placa, los electrones se detienen bruscamente y se generan los rayos X.'),
               img('fis26-s1-e2', 992, 705, 'Tub de raigs X: càtode a l’esquerra, ànode a la dreta, electró amb velocitat v i fotó emès', 'Tubo de rayos X: cátodo a la izquierda, ánodo a la derecha, electrón con velocidad v y fotón emitido'),
               DAT(ECON + '; ' + MEC + '; ' + CC + '; ' + HC + '.', ECON + '; ' + MEC + '; ' + CC + '; ' + HC + '.'),
               p('<i>Nota: negligiu els efectes del camp magnètic terrestre i els efectes relativistes.</i>', '<i>Nota: desprecie los efectos del campo magnético terrestre y los efectos relativistas.</i>')),
      parts: [
        part('2.1', T('La diferència de potencial entre dues plaques d’un tub de raigs X és de 70,0 kV i la separació entre elles és de 2,00 cm. Calculeu el mòdul del camp elèctric (suposeu que és constant i uniforme entre les plaques) i, tot seguit, el mòdul de la força elèctrica que experimenta un electró dins del tub. A la figura adjunta, representeu el camp elèctric entre plaques i la força elèctrica que actua sobre l’electró.',
                      'La diferencia de potencial entre dos placas de un tubo de rayos X es de 70,0 kV y la separación entre ellas es de 2,00 cm. Calcule el módulo del campo eléctrico (suponga que es constante y uniforme entre las placas) y, a continuación, el módulo de la fuerza eléctrica que experimenta un electrón dentro del tubo. En la figura adjunta, represente el campo eléctrico entre placas y la fuerza eléctrica que actúa sobre el electrón.'),
          [
            F(r`E=\dfrac{\Delta V}{d}=\dfrac{70\,000}{0{,}0200}=3{,}50\cdot10^{6}\ \text{V/m}`),
            F(r`F=|e|\,E=1{,}602\cdot10^{-19}\cdot3{,}50\cdot10^{6}=5{,}61\cdot10^{-13}\ \text{N}`),
            p('El camp elèctric va de la placa positiva a la negativa (línies equidistants i paral·leles, perquè el camp és uniforme): <b>cap al càtode</b>. L’electró té càrrega negativa, així que la força té sentit contrari al camp: <b>cap a l’ànode</b>.', 'El campo eléctrico va de la placa positiva a la negativa (líneas equidistantes y paralelas, porque el campo es uniforme): <b>hacia el cátodo</b>. El electrón tiene carga negativa, así que la fuerza tiene sentido contrario al campo: <b>hacia el ánodo</b>.'),
            figL(tubeX),
            ans('<b>' + M(r`E=3{,}50\cdot10^{6}\ \text{V/m}`) + '</b> i <b>' + M(r`F=5{,}61\cdot10^{-13}\ \text{N}`) + '</b>.', '<b>' + M(r`E=3{,}50\cdot10^{6}\ \text{V/m}`) + '</b> y <b>' + M(r`F=5{,}61\cdot10^{-13}\ \text{N}`) + '</b>.'),
          ]),
        part('2.2', T('Determineu l’energia cinètica i la velocitat d’un electró quan arriba a l’ànode, suposant que parteix del repòs des del càtode. A continuació, sabent que en el xoc amb l’ànode l’electró perd part de la seva energia, que es transforma en un fotó de raigs X amb una longitud d’ona d’1,00 nm, calculeu l’energia d’aquest fotó i la nova velocitat de l’electró després de l’emissió.',
                      'Determine la energía cinética y la velocidad de un electrón cuando llega al ánodo, suponiendo que parte del reposo desde el cátodo. A continuación, sabiendo que en el choque con el ánodo el electrón pierde parte de su energía, que se transforma en un fotón de rayos X con una longitud de onda de 1,00 nm, calcule la energía de este fotón y la nueva velocidad del electrón después de la emisión.'),
          [
            p('El treball del camp és igual a la variació d’energia cinètica:', 'El trabajo del campo es igual a la variación de energía cinética:'),
            F(r`E_c=W=|e|\,\Delta V=1{,}602\cdot10^{-19}\cdot7{,}00\cdot10^{4}=1{,}12\cdot10^{-14}\ \text{J}`),
            F(r`v=\sqrt{\dfrac{2E_c}{m_e}}=\sqrt{\dfrac{2\cdot1{,}121\cdot10^{-14}}{9{,}11\cdot10^{-31}}}=1{,}57\cdot10^{8}\ \text{m/s}`),
            p('(Per forces: ' + M(r`a=F/m_e=6{,}15\cdot10^{17}\ \text{m/s}^2`) + ' i ' + M(r`v=\sqrt{2ad}`) + ', mateix resultat.)', '(Por fuerzas: ' + M(r`a=F/m_e=6{,}15\cdot10^{17}\ \text{m/s}^2`) + ' y ' + M(r`v=\sqrt{2ad}`) + ', mismo resultado.)'),
            p('Energia del fotó i conservació de l’energia en el xoc:', 'Energía del fotón y conservación de la energía en el choque:'),
            F(r`E_f=\dfrac{h c}{\lambda}=\dfrac{6{,}63\cdot10^{-34}\cdot3{,}00\cdot10^{8}}{1{,}00\cdot10^{-9}}=1{,}99\cdot10^{-16}\ \text{J}`),
            F(r`E_c'=E_c-E_f=1{,}121\cdot10^{-14}-1{,}99\cdot10^{-16}=1{,}10\cdot10^{-14}\ \text{J}\ \Rightarrow\ v'=\sqrt{\dfrac{2E_c'}{m_e}}=1{,}56\cdot10^{8}\ \text{m/s}`),
            ans('<b>' + M(r`E_c=1{,}12\cdot10^{-14}\ \text{J}`) + '</b>, <b>' + M(r`v=1{,}57\cdot10^{8}\ \text{m/s}`) + '</b>; fotó <b>' + M(r`E_f=1{,}99\cdot10^{-16}\ \text{J}`) + '</b>; després del xoc <b>' + M(r`v'=1{,}56\cdot10^{8}\ \text{m/s}`) + '</b>.',
                '<b>' + M(r`E_c=1{,}12\cdot10^{-14}\ \text{J}`) + '</b>, <b>' + M(r`v=1{,}57\cdot10^{8}\ \text{m/s}`) + '</b>; fotón <b>' + M(r`E_f=1{,}99\cdot10^{-16}\ \text{J}`) + '</b>; tras el choque <b>' + M(r`v'=1{,}56\cdot10^{8}\ \text{m/s}`) + '</b>.'),
          ]),
      ] },

    { n: 3, pts: 2.5, topic: TOP.o,
      intro: J(p('Un telèfon mòbil conté un motor vibrador que genera un moviment harmònic simple (al llarg de l’eix ' + M('y') + ') al xassís del dispositiu quan es reben trucades o notificacions. Suposem que aquest moviment té una amplitud de 2,00 mm i una freqüència de 150 Hz.',
                 'Un teléfono móvil contiene un motor vibrador que genera un movimiento armónico simple (a lo largo del eje ' + M('y') + ') en el chasis del dispositivo cuando se reciben llamadas o notificaciones. Supongamos que este movimiento tiene una amplitud de 2,00 mm y una frecuencia de 150 Hz.'),
               DAT(M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '. <i>Assumiu que el front d’ona és esfèric.</i>', M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '. <i>Asuma que el frente de onda es esférico.</i>')),
      parts: [
        part('3.1', T('Escriviu l’equació de moviment del telèfon si considerem que inicialment es troba a la posició d’equilibri ' + M('y=0') + ' m. Quan es col·loca el telèfon damunt d’una superfície metàl·lica rígida, les vibracions es transmeten al material i generen ones mecàniques transversals que es propaguen a 3 200 m s⁻¹. Calculeu la longitud d’ona de l’ona mecànica que es propaga per la superfície i escriviu l’equació de l’ona corresponent, suposant que la propagació es produeix en el sentit positiu de l’eix ' + M('x') + ', que inicialment es troba en la posició d’equilibri ' + M('y=0') + ' m, i que l’amplitud de l’ona és de 2,00 mm.',
                      'Escriba la ecuación de movimiento del teléfono si consideramos que inicialmente se encuentra en la posición de equilibrio ' + M('y=0') + ' m. Cuando se coloca el teléfono encima de una superficie metálica rígida, las vibraciones se transmiten al material y generan ondas mecánicas transversales que se propagan a 3 200 m s⁻¹. Calcule la longitud de onda de la onda mecánica que se propaga por la superficie y escriba la ecuación de la onda correspondiente, suponiendo que la propagación se produce en el sentido positivo del eje ' + M('x') + ', que inicialmente se encuentra en la posición de equilibrio ' + M('y=0') + ' m, y que la amplitud de la onda es de 2,00 mm.'),
          [
            p('Moviment harmònic simple ' + M(r`y(t)=A\sin(\omega t+\varphi_0)`) + ' amb ' + M(r`\omega=2\pi f=300\pi\ \text{rad/s}\approx942\ \text{rad/s}`) + '. Com que ' + M('y(0)=0') + ' ⇒ ' + M(r`\sin\varphi_0=0`) + ' ⇒ ' + M(r`\varphi_0=0`) + ' (també val ' + M(r`\pi`) + ', perquè no es dona el sentit de la velocitat inicial):',
              'Movimiento armónico simple ' + M(r`y(t)=A\sin(\omega t+\varphi_0)`) + ' con ' + M(r`\omega=2\pi f=300\pi\ \text{rad/s}\approx942\ \text{rad/s}`) + '. Como ' + M('y(0)=0') + ' ⇒ ' + M(r`\sin\varphi_0=0`) + ' ⇒ ' + M(r`\varphi_0=0`) + ' (también vale ' + M(r`\pi`) + ', porque no se da el sentido de la velocidad inicial):'),
            F(r`y(t)=2{,}00\cdot10^{-3}\,\sin(300\pi\,t)\qquad(y\text{ en m, }t\text{ en s})`),
            p('Longitud d’ona i nombre d’ona:', 'Longitud de onda y número de onda:'),
            F(r`\lambda=\dfrac vf=\dfrac{3\,200}{150}=21{,}3\ \text{m},\qquad k=\dfrac{2\pi}{\lambda}=0{,}294\ \text{m}^{-1}`),
            p('Ona que es propaga cap a ' + M('+x') + ' amb ' + M('y(0,0)=0') + ' (fase inicial nul·la):', 'Onda que se propaga hacia ' + M('+x') + ' con ' + M('y(0,0)=0') + ' (fase inicial nula):'),
            AN(r`y(x,t)=2{,}00\cdot10^{-3}\,\sin(0{,}294\,x-300\pi\,t)\quad(\text{SI})`),
          ]),
        part('3.2', T('Suposant que el telèfon emet una potència acústica d’1,00 mW durant la vibració i que el so es propaga per l’aire de manera isòtropa (uniformement en totes direccions), calculeu el nivell d’intensitat sonora que percebrà una persona situada a 3,00 m del telèfon.',
                      'Suponiendo que el teléfono emite una potencia acústica de 1,00 mW durante la vibración y que el sonido se propaga por el aire de manera isótropa (uniformemente en todas direcciones), calcule el nivel de intensidad sonora que percibirá una persona situada a 3,00 m del teléfono.'),
          [
            p('El front d’ona és una esfera de radi ' + M('r') + ', així que la intensitat és la potència repartida per la superfície esfèrica:', 'El frente de onda es una esfera de radio ' + M('r') + ', así que la intensidad es la potencia repartida por la superficie esférica:'),
            F(r`I=\dfrac{P}{4\pi r^2}=\dfrac{1{,}00\cdot10^{-3}}{4\pi\cdot3{,}00^2}=8{,}84\cdot10^{-6}\ \text{W/m}^2`),
            F(r`\beta=10\log\dfrac{I}{I_0}=10\log\dfrac{8{,}84\cdot10^{-6}}{10^{-12}}`),
            AN(r`\beta=69{,}5\ \text{dB}`),
          ]),
      ] },

    { n: 4, pts: 2.5, topic: TOP.n, choose: true, opts: [
      { k: 'A',
        intro: J(p('Enguany fa 40 anys de l’accident nuclear més greu de la història. La central nuclear de Txernòbil va alliberar una gran quantitat de materials radioactius a l’atmosfera. En particular, cesi-137 (' + M(r`{}^{137}_{55}\text{Cs}`) + '), que en desintegrar-se mitjançant una emissió ' + M(r`\beta^-`) + ' genera un nucli de bari. Aquest isòtop té una vida mitjana llarga (30,17 anys) i, per tant, representa un perill durant dècades.',
                   'Este año se cumplen 40 años del accidente nuclear más grave de la historia. La central nuclear de Chernóbil liberó una gran cantidad de materiales radiactivos a la atmósfera. En particular, cesio-137 (' + M(r`{}^{137}_{55}\text{Cs}`) + '), que al desintegrarse mediante una emisión ' + M(r`\beta^-`) + ' genera un núcleo de bario. Este isótopo tiene una vida media larga (30,17 años) y, por tanto, representa un peligro durante décadas.')),
        parts: [
          part('4.1', T('Escriviu la reacció de desintegració del cesi-137. Calculeu quin percentatge de la quantitat inicial de cesi-137 queda avui, 40 anys després de l’accident.',
                        'Escriba la reacción de desintegración del cesio-137. Calcule qué porcentaje de la cantidad inicial de cesio-137 queda hoy, 40 años después del accidente.'),
            [
              p('Una emissió ' + M(r`\beta^-`) + ' conserva el nombre màssic i la càrrega, i emet un electró i un antineutrí (conservació del nombre leptònic): el nucli passa de ' + M('Z=55') + ' a ' + M('Z=56') + ' (bari).', 'Una emisión ' + M(r`\beta^-`) + ' conserva el número másico y la carga, y emite un electrón y un antineutrino (conservación del número leptónico): el núcleo pasa de ' + M('Z=55') + ' a ' + M('Z=56') + ' (bario).'),
              F(r`{}^{137}_{55}\text{Cs}\ \longrightarrow\ {}^{137}_{56}\text{Ba}+{}^{\ \,0}_{-1}e+\bar\nu_e`),
              p('Prenem 30,17 anys com a <b>període de semidesintegració</b> (és el valor habitual per al cesi-137): ' + M(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{\ln2}{30{,}17}=0{,}0230\ \text{anys}^{-1}`) + '.', 'Tomamos 30,17 años como <b>periodo de semidesintegración</b> (es el valor habitual para el cesio-137): ' + M(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{\ln2}{30{,}17}=0{,}0230\ \text{años}^{-1}`) + '.'),
              F(r`\dfrac{N}{N_0}=e^{-\lambda t}=e^{-0{,}0230\cdot40}=0{,}399`),
              ans('<b>Queda un 39,9 %</b> del cesi-137 inicial. (Si 30,17 anys s’interpreta com a <i>vida mitjana</i> ' + M(r`\tau`) + ', ' + M(r`\lambda=1/\tau`) + ' i queda ' + M(r`e^{-40/30{,}17}=26{,}6\,\%`) + '; el plantejament és el mateix.)',
                  '<b>Queda un 39,9 %</b> del cesio-137 inicial. (Si 30,17 años se interpreta como <i>vida media</i> ' + M(r`\tau`) + ', ' + M(r`\lambda=1/\tau`) + ' y queda ' + M(r`e^{-40/30{,}17}=26{,}6\,\%`) + '; el planteamiento es el mismo.)'),
            ]),
          part('4.2', T('En una zona a uns 10,0 km de la central es va detectar una concentració inicial de ' + M(r`6{,}00\cdot10^{5}\ \text{Bq m}^{-2}`) + ' de cesi-137, immediatament després de l’accident. Segons alguns estudis, es considera segur tornar a habitar una zona afectada quan la concentració estigui per sota de ' + M(r`3{,}70\cdot10^{4}\ \text{Bq m}^{-2}`) + '. Quin any podrà tornar-se a habitar aquesta zona si només considerem la desintegració natural del cesi-137?',
                        'En una zona a unos 10,0 km de la central se detectó una concentración inicial de ' + M(r`6{,}00\cdot10^{5}\ \text{Bq m}^{-2}`) + ' de cesio-137, inmediatamente después del accidente. Según algunos estudios, se considera seguro volver a habitar una zona afectada cuando la concentración esté por debajo de ' + M(r`3{,}70\cdot10^{4}\ \text{Bq m}^{-2}`) + '. ¿Qué año podrá volver a habitarse esta zona si solo consideramos la desintegración natural del cesio-137?'),
            [
              p('L’activitat (per m²) decau com ' + M(r`A=A_0e^{-\lambda t}`) + ', d’on:', 'La actividad (por m²) decae como ' + M(r`A=A_0e^{-\lambda t}`) + ', de donde:'),
              F(r`t=\dfrac1\lambda\ln\dfrac{A_0}{A}=\dfrac{1}{0{,}0230}\ln\dfrac{6{,}00\cdot10^{5}}{3{,}70\cdot10^{4}}=\dfrac{2{,}786}{0{,}0230}\approx121\ \text{anys}`),
              ans('Han de passar uns <b>121 anys</b> des de l’accident (1986): la zona podrà tornar-se a habitar cap al <b>2107</b>. (Amb vida mitjana ' + M(r`\tau=30{,}17`) + ' anys seria ' + M(r`t=84`) + ' anys, cap al 2070.)',
                  'Han de pasar unos <b>121 años</b> desde el accidente (1986): la zona podrá volver a habitarse hacia el <b>2107</b>. (Con vida media ' + M(r`\tau=30{,}17`) + ' años sería ' + M(r`t=84`) + ' años, hacia 2070.)'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('En un experiment d’efecte fotoelèctric, fem incidir una llum monocromàtica sobre el càtode d’una cèl·lula fotoelèctrica. Quan s’il·lumina el càtode amb llum blava de longitud d’ona 460 nm, s’observa un corrent fotoelèctric. Aplicant una diferència de potencial de com a mínim 0,50 V entre càtode i ànode, el corrent desapareix completament.',
                   'En un experimento de efecto fotoeléctrico, hacemos incidir una luz monocromática sobre el cátodo de una célula fotoeléctrica. Cuando se ilumina el cátodo con luz azul de longitud de onda 460 nm, se observa una corriente fotoeléctrica. Aplicando una diferencia de potencial de como mínimo 0,50 V entre cátodo y ánodo, la corriente desaparece completamente.'),
                 DAT(ECON + '; ' + MEC + '; ' + CC + '; ' + HC + '.', ECON + '; ' + MEC + '; ' + CC + '; ' + HC + '.')),
        parts: [
          part('4.1', T('Calculeu l’energia mínima necessària per a arrencar un electró del càtode (funció de treball) i la velocitat màxima amb què surten els electrons emesos quan no s’aplica cap diferència de potencial.',
                        'Calcule la energía mínima necesaria para arrancar un electrón del cátodo (función de trabajo) y la velocidad máxima con que salen los electrones emitidos cuando no se aplica ninguna diferencia de potencial.'),
            [
              p('Energia del fotó incident:', 'Energía del fotón incidente:'),
              F(r`E_f=\dfrac{hc}{\lambda}=\dfrac{6{,}63\cdot10^{-34}\cdot3{,}00\cdot10^{8}}{460\cdot10^{-9}}=4{,}32\cdot10^{-19}\ \text{J}=2{,}70\ \text{eV}`),
              p('El potencial de frenada (0,50 V) anul·la els electrons més ràpids: ' + M(r`E_{c,\max}=|e|V_f`) + '. Amb l’equació d’Einstein ' + M(r`E_f=W+E_{c,\max}`) + ':', 'El potencial de frenado (0,50 V) anula los electrones más rápidos: ' + M(r`E_{c,\max}=|e|V_f`) + '. Con la ecuación de Einstein ' + M(r`E_f=W+E_{c,\max}`) + ':'),
              F(r`W=E_f-|e|V_f=4{,}32\cdot10^{-19}-0{,}50\cdot1{,}602\cdot10^{-19}=3{,}52\cdot10^{-19}\ \text{J}=2{,}20\ \text{eV}`),
              F(r`E_{c,\max}=|e|V_f=8{,}01\cdot10^{-20}\ \text{J}\ \Rightarrow\ v_{\max}=\sqrt{\dfrac{2E_{c,\max}}{m_e}}=\sqrt{\dfrac{2\cdot8{,}01\cdot10^{-20}}{9{,}11\cdot10^{-31}}}`),
              ans('Funció de treball <b>' + M(r`W=3{,}52\cdot10^{-19}\ \text{J}\ (2{,}20\ \text{eV})`) + '</b>; velocitat màxima <b>' + M(r`v_{\max}=4{,}19\cdot10^{5}\ \text{m/s}`) + '</b>.',
                  'Función de trabajo <b>' + M(r`W=3{,}52\cdot10^{-19}\ \text{J}\ (2{,}20\ \text{eV})`) + '</b>; velocidad máxima <b>' + M(r`v_{\max}=4{,}19\cdot10^{5}\ \text{m/s}`) + '</b>.'),
            ]),
          part('4.2', T('Determineu quina diferència de potencial caldria aplicar per a anul·lar el corrent fotoelèctric si primer el càtode s’il·lumina amb llum verda de longitud d’ona 520 nm, i després amb llum vermella de longitud d’ona 650 nm. Justifiqueu els resultats obtinguts.',
                        'Determine qué diferencia de potencial habría que aplicar para anular la corriente fotoeléctrica si primero el cátodo se ilumina con luz verde de longitud de onda 520 nm, y después con luz roja de longitud de onda 650 nm. Justifique los resultados obtenidos.'),
            [
              p('El potencial de frenada és ' + M(r`V_f=\dfrac{E_f-W}{|e|}`) + ', sempre que ' + M(r`E_f>W`) + '.', 'El potencial de frenado es ' + M(r`V_f=\dfrac{E_f-W}{|e|}`) + ', siempre que ' + M(r`E_f>W`) + '.'),
              p('<b>Llum verda (520 nm):</b> ' + M(r`E_f=\dfrac{hc}{\lambda}=3{,}83\cdot10^{-19}\ \text{J}=2{,}39\ \text{eV}>W`), '<b>Luz verde (520 nm):</b> ' + M(r`E_f=\dfrac{hc}{\lambda}=3{,}83\cdot10^{-19}\ \text{J}=2{,}39\ \text{eV}>W`)),
              F(r`V_f=\dfrac{3{,}83\cdot10^{-19}-3{,}52\cdot10^{-19}}{1{,}602\cdot10^{-19}}=0{,}19\ \text{V}`),
              p('<b>Llum vermella (650 nm):</b> ' + M(r`E_f=3{,}06\cdot10^{-19}\ \text{J}=1{,}91\ \text{eV}<W`) + '.', '<b>Luz roja (650 nm):</b> ' + M(r`E_f=3{,}06\cdot10^{-19}\ \text{J}=1{,}91\ \text{eV}<W`) + '.'),
              ans('Verda: <b>' + M('V_f=0{,}19\\ \\text{V}') + '</b>. Vermella: els fotons no tenen prou energia per arrencar electrons (la longitud d’ona llindar és ' + M(r`\lambda_0=hc/W=565\ \text{nm}`) + ' i 650 nm és més gran), <b>no hi ha efecte fotoelèctric</b> i no cal aplicar cap tensió, per molt intensa que sigui la llum.',
                  'Verde: <b>' + M('V_f=0{,}19\\ \\text{V}') + '</b>. Roja: los fotones no tienen energía suficiente para arrancar electrones (la longitud de onda umbral es ' + M(r`\lambda_0=hc/W=565\ \text{nm}`) + ' y 650 nm es mayor), <b>no hay efecto fotoeléctrico</b> y no hace falta aplicar ninguna tensión, por intensa que sea la luz.'),
            ]),
        ] },
    ] },
  ],
};

/* ───────────────────────── SÈRIE 2 (extraordinària) ───────────────────────── */
const HD = (x1, y1, x2, y2, c) => { const a = Math.atan2(y2 - y1, x2 - x1), s = 8, hx = x2 - s * Math.cos(a), hy = y2 - s * Math.sin(a), px = -Math.sin(a) * 3.4, py = Math.cos(a) * 3.4; return `<path class="${c}" d="M${f1(x2)},${f1(y2)}L${f1(hx + px)},${f1(hy + py)}L${f1(hx - px)},${f1(hy - py)}Z"/>`; };
/* línies de camp i equipotencials de dues càrregues negatives (qA = −2 µC a l'origen, qB = −4 µC a x = 1 m) */
const fieldAB = lang => {
  const w = 400, h = 320, X0 = -0.9, X1 = 1.9, Y0 = -1.1, Y1 = 1.1, k = 8.99e9, QA = -2e-6, QB = -4e-6;
  const sc = (w - 20) / (X1 - X0), X = x => 10 + (x - X0) * sc, Y = y => h / 2 - y * sc;
  const E = (x, y) => { let ex = 0, ey = 0; [[0, QA], [1, QB]].forEach(([cx, q]) => { const dx = x - cx, dy = y, d3 = Math.pow(dx * dx + dy * dy, 1.5); ex += k * q * dx / d3; ey += k * q * dy / d3; }); return [ex, ey]; };
  const V = (x, y) => k * (QA / Math.hypot(x, y) + QB / Math.hypot(x - 1, y));
  let s = '';
  const nx = 112, ny = 88, dx = (X1 - X0) / nx, dy = (Y1 - Y0) / ny, vals = [];
  for (let j = 0; j <= ny; j++) { vals.push([]); for (let i = 0; i <= nx; i++) vals[j].push(V(X0 + i * dx, Y0 + j * dy)); }
  const levels = [-40e3, -55e3, -75e3, -105e3, -160e3, -280e3];
  let eq = '';
  levels.forEach(L => {
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]], v = c.map(([a, b]) => vals[b][a] - L), pts = [];
      for (let e = 0; e < 4; e++) { const a = v[e], b = v[(e + 1) % 4]; if ((a < 0) !== (b < 0)) { const t = a / (a - b), [x1, y1] = c[e], [x2, y2] = c[(e + 1) % 4]; pts.push([X0 + (x1 + (x2 - x1) * t) * dx, Y0 + (y1 + (y2 - y1) * t) * dy]); } }
      if (pts.length === 2) eq += `M${f1(X(pts[0][0]))},${f1(Y(pts[0][1]))}L${f1(X(pts[1][0]))},${f1(Y(pts[1][1]))}`;
    }
  });
  s += PATH(eq, 'eq');
  let fl = '', arrows = '';
  const trace = (cx, ang) => {
    let x = cx + 0.04 * Math.cos(ang), y = 0.04 * Math.sin(ang), pts = [[x, y]];
    for (let n = 0; n < 900; n++) {
      const st = 0.012, d = ([a, b]) => { const m = Math.hypot(a, b); return [-a / m, -b / m]; };
      const [a1, b1] = d(E(x, y)), [a2, b2] = d(E(x + a1 * st / 2, y + b1 * st / 2));
      x += a2 * st; y += b2 * st; pts.push([x, y]);
      if (x < X0 || x > X1 || y < Y0 || y > Y1 || Math.hypot(x, y) < 0.03 || Math.hypot(x - 1, y) < 0.03) break;
    }
    return pts;
  };
  const addLine = pts => {
    fl += 'M' + pts.map(([x, y]) => f1(X(x)) + ',' + f1(Y(y))).join('L');
    const i = Math.max(3, Math.floor(pts.length * 0.4)), [xa, ya] = pts[i - 3], [xb, yb] = pts[i];
    arrows += HD(X(xb), Y(yb), X(xa), Y(ya), 'fh');
  };
  for (let n = 0; n < 6; n++) addLine(trace(0, (n * 60 + 30) * Math.PI / 180));
  for (let n = 0; n < 12; n++) addLine(trace(1, (n * 30 + 15) * Math.PI / 180));
  s += PATH(fl, 'fe') + arrows;
  s += DOT(X(0), Y(0), 7, 'sun') + DOT(X(1), Y(0), 7, 'sun');
  s += TX(X(0), Y(0) - 12, 'qA') + TX(X(1), Y(0) - 12, 'qB');
  s += TX(10, 14, L2(lang, 'Línies de camp (contínues) i equipotencials (discontínues)', 'Líneas de campo (continuas) y equipotenciales (discontinuas)'), 'start');
  return SV(w, h, L2(lang, 'Línies de camp i superfícies equipotencials de dues càrregues negatives, qB doble de qA', 'Líneas de campo y superficies equipotenciales de dos cargas negativas, qB doble de qA'), s);
};

const emfGraph = fig(plot({ w: 380, h: 220, xr: [-0.9, 9.6], yr: [-0.5, 3.4], tickx: [2, 4, 6, 8], ticky: [2.5],
  curves: [{ f: () => 2.5, dom: [0, 2], k: 0 }, { f: () => 0, dom: [2, 6], k: 0 }, { f: () => 2.5, dom: [6, 8], k: 0 }, { f: () => 0, dom: [8, 9], k: 0 }],
  vlines: [2, 6, 8], points: [[0, 2.5], [2, 2.5], [6, 2.5], [8, 2.5]], labels: [[0.15, 3.2, '|ε| (10⁻⁵ V)'], [9.4, -0.38, 't (s)', 'end']],
  alt: 'Valor absolut de la fem induïda: 2,5·10⁻⁵ V entre 0 i 2 s, nul entre 2 i 6 s, 2,5·10⁻⁵ V entre 6 i 8 s i nul després' }));

const pointsLine = lang => {
  const x0 = 30, x1 = 350, y = 52, sx = x => x0 + x * (x1 - x0) / 10;
  let s = LN(x0, y, x1, y) + DOT(x0, y, 8, 'sun') + DOT(x1, y, 8, 'sun') + TX(x0, y - 16, L2(lang, 'Elefant 1', 'Elefante 1')) + TX(x1, y - 16, L2(lang, 'Elefant 2', 'Elefante 2'));
  [1.8125, 3.9375, 6.0625, 8.1875].forEach(v => { s += DOT(sx(v), y, 4.5) + TX(sx(v), y + 20, (+v.toFixed(2) + '').replace('.', ',') + ' m'); });
  s += TX((x0 + x1) / 2, 98, L2(lang, 'Punts sense so (mesurats des de l’elefant 1)', 'Puntos sin sonido (medidos desde el elefante 1)'));
  return SV(380, 110, L2(lang, 'Quatre punts de silenci entre els dos elefants', 'Cuatro puntos de silencio entre los dos elefantes'), s);
};

const lensDiagram = lang => {
  const ox = 190, oy = 100, e = 8.0;
  const X = c => ox + c * e, Y = c => oy - c * e;
  let s = LN(10, oy, 370, oy, 'ax') + `<path class="c2" d="M${ox},${oy - 52}v104M${ox - 5},${oy - 44}l5,-8l5,8M${ox - 5},${oy + 44}l5,8l5,-8"/>`;
  s += AR(X(-20), Y(0), X(-20), Y(3), 'vc2') + AR(X(20), Y(0), X(20), Y(-3), 'vc2');
  s += LN(X(-20), Y(3), X(0), Y(3), 'c1') + LN(X(0), Y(3), X(26), Y(3 - 0.3 * 26), 'c1');
  s += LN(X(-20), Y(3), X(20), Y(-3), 'c1');
  s += LN(X(-20), Y(3), X(0), Y(-3), 'c1') + LN(X(0), Y(-3), X(26), Y(-3), 'c1');
  [-20, -10, 10, 20].forEach(c => { s += DOT(X(c), Y(0), 2.6, 'pt2'); });
  s += TX(X(-10), Y(0) + 15, 'F') + TX(X(10), Y(0) + 15, 'F′') + TX(X(-20), Y(0) + 15, '2F') + TX(X(20), Y(0) + 15, '2F′');
  s += TX(X(-20) - 6, Y(3) - 6, L2(lang, 'objecte', 'objeto'), 'end') + TX(X(20) + 8, Y(-3) + 4, L2(lang, 'imatge', 'imagen'), 'start');
  s += AR(X(-10), 150, X(-20), 150, 'vc2') + AR(X(-10), 150, X(0), 150, 'vc2') + TX(X(-10), 168, 's = −20 cm') + AR(X(10), 150, X(0), 150, 'vc2') + AR(X(10), 150, X(20), 150, 'vc2') + TX(X(10), 168, 's′ = 20 cm');
  s += TX(X(0) + 8, Y(0) - 52, L2(lang, 'lent convergent', 'lente convergente'), 'start');
  return SV(412, 180, L2(lang, 'Diagrama de rajos d’una lent convergent amb l’objecte a 2F: imatge real, invertida i de la mateixa mida a 2F′', 'Diagrama de rayos de una lente convergente con el objeto en 2F: imagen real, invertida y del mismo tamaño en 2F′'), s);
};

const s2 = {
  id: 2, pdf: 'pdf/pau/pau-2026-fisica-serie2.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g,
      intro: J(p('Starlink és una constel·lació de satèl·lits que ofereix serveis d’Internet de banda ampla utilitzant òrbites terrestres baixes per a fer més ràpida la comunicació. Cada satèl·lit té una massa de 227 kg i descriu una òrbita circular a una altura de 550 km per sobre de la superfície terrestre.',
                 'Starlink es una constelación de satélites que ofrece servicios de Internet de banda ancha utilizando órbitas terrestres bajas para hacer más rápida la comunicación. Cada satélite tiene una masa de 227 kg y describe una órbita circular a una altura de 550 km sobre la superficie terrestre.'),
               DAT(GC + '; ' + MTc + '; ' + RTc + '.', GC + '; ' + MTc + '; ' + RTc + '.')),
      parts: [
        part('1.1', T('A partir de la llei de gravitació universal, deduïu l’expressió de la velocitat orbital en funció del radi orbital i de la massa de la Terra. A continuació, calculeu la velocitat orbital dels satèl·lits a l’altura de 550 km i determineu quantes voltes completes a la Terra descriu cada satèl·lit en un dia.',
                      'A partir de la ley de gravitación universal, deduzca la expresión de la velocidad orbital en función del radio orbital y de la masa de la Tierra. A continuación, calcule la velocidad orbital de los satélites a la altura de 550 km y determine cuántas vueltas completas a la Tierra describe cada satélite en un día.'),
          [
            p('La força gravitatòria és la força centrípeta:', 'La fuerza gravitatoria es la fuerza centrípeta:'),
            F(r`G\dfrac{M_T m}{r^2}=m\dfrac{v^2}{r}\ \Rightarrow\ v=\sqrt{\dfrac{G M_T}{r}}`),
            p('Amb ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+5{,}50\cdot10^{5}=6{,}92\cdot10^{6}\ \text{m}`) + ':', 'Con ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+5{,}50\cdot10^{5}=6{,}92\cdot10^{6}\ \text{m}`) + ':'),
            F(r`v=\sqrt{\dfrac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}}{6{,}92\cdot10^{6}}}=7{,}59\cdot10^{3}\ \text{m/s}`),
            F(r`T=\dfrac{2\pi r}{v}=\dfrac{2\pi\cdot6{,}92\cdot10^{6}}{7{,}59\cdot10^{3}}=5{,}73\cdot10^{3}\ \text{s},\qquad n=\dfrac{86\,400}{5{,}73\cdot10^{3}}=15{,}1`),
            ans('<b>' + M(r`v=7{,}59\cdot10^{3}\ \text{m/s}`) + '</b>; cada satèl·lit fa <b>15 voltes completes</b> al dia (15,1).', '<b>' + M(r`v=7{,}59\cdot10^{3}\ \text{m/s}`) + '</b>; cada satélite da <b>15 vueltas completas</b> al día (15,1).'),
          ]),
        part('1.2', T('Per a evitar possibles col·lisions amb altres objectes, cada satèl·lit disposa d’un sistema de maniobra que, en detectar un risc, redueix l’altura de l’òrbita. En una d’aquestes maniobres, un satèl·lit baixa gradualment fins a una altura de 530 km. Deduïu l’expressió de l’energia mecànica en funció del radi orbital, la massa de la Terra i la massa del satèl·lit. A continuació, calculeu l’energia mecànica del satèl·lit en aquesta nova òrbita i justifiqueu per què l’energia mecànica orbital ha de ser negativa.',
                      'Para evitar posibles colisiones con otros objetos, cada satélite dispone de un sistema de maniobra que, al detectar un riesgo, reduce la altura de la órbita. En una de estas maniobras, un satélite baja gradualmente hasta una altura de 530 km. Deduzca la expresión de la energía mecánica en función del radio orbital, la masa de la Tierra y la masa del satélite. A continuación, calcule la energía mecánica del satélite en esta nueva órbita y justifique por qué la energía mecánica orbital tiene que ser negativa.'),
          [
            F(r`E_m=E_c+U=\tfrac12 m v^2-\dfrac{G M_T m}{r}=\tfrac12\dfrac{G M_T m}{r}-\dfrac{G M_T m}{r}=-\dfrac{G M_T m}{2r}`),
            p('Nou radi: ' + M(r`r=6{,}37\cdot10^{6}+5{,}30\cdot10^{5}=6{,}90\cdot10^{6}\ \text{m}`) + ':', 'Nuevo radio: ' + M(r`r=6{,}37\cdot10^{6}+5{,}30\cdot10^{5}=6{,}90\cdot10^{6}\ \text{m}`) + ':'),
            F(r`E_m=-\dfrac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}\cdot227}{2\cdot6{,}90\cdot10^{6}}=-6{,}56\cdot10^{9}\ \text{J}`),
            ans('<b>' + M(r`E_m=-6{,}56\cdot10^{9}\ \text{J}`) + '</b>. Ha de ser negativa perquè el satèl·lit està <b>lligat</b> a la Terra: l’energia potencial (negativa) supera l’energia cinètica. Si fos ' + M(r`E_m\ge0`) + ', el satèl·lit podria escapar a l’infinit i no tindria òrbita tancada.',
                '<b>' + M(r`E_m=-6{,}56\cdot10^{9}\ \text{J}`) + '</b>. Tiene que ser negativa porque el satélite está <b>ligado</b> a la Tierra: la energía potencial (negativa) supera a la energía cinética. Si fuese ' + M(r`E_m\ge0`) + ', el satélite podría escapar al infinito y no tendría órbita cerrada.'),
          ]),
      ] },

    { n: 2, pts: 2.5, topic: TOP.e, choose: true, opts: [
      { k: 'A',
        intro: J(p('Una càrrega puntual ' + M(r`q_A=-2{,}00\ \mu\text{C}`) + ' se situa a l’origen de coordenades, i una càrrega puntual ' + M(r`q_B=-4{,}00\ \mu\text{C}`) + ' se situa a la posició ' + M('x=1{,}00') + ' m i ' + M('y=0{,}00') + ' m.',
                   'Una carga puntual ' + M(r`q_A=-2{,}00\ \mu\text{C}`) + ' se sitúa en el origen de coordenadas, y una carga puntual ' + M(r`q_B=-4{,}00\ \mu\text{C}`) + ' se sitúa en la posición ' + M('x=1{,}00') + ' m e ' + M('y=0{,}00') + ' m.'),
                 DAT(M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.', M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.')),
        parts: [
          part('2.1', T('Representeu les dues càrregues a la quadrícula (pla ' + M('xy') + '). Dibuixeu-hi també qualitativament (de manera aproximada) les línies del camp elèctric i les línies equipotencials generades per aquest sistema de dues càrregues.',
                        'Represente las dos cargas en la cuadrícula (plano ' + M('xy') + '). Dibuje también cualitativamente (de manera aproximada) las líneas del campo eléctrico y las líneas equipotenciales generadas por este sistema de dos cargas.'),
            [
              p('Les dues càrregues són negatives: les <b>línies de camp</b> arriben des de l’infinit i <b>acaben</b> a cada càrrega (a ' + M('q_B') + ', amb el doble de càrrega, n’hi arriben el doble). Entre les dues càrregues hi ha un punt de camp nul. Les <b>equipotencials</b> són perpendiculars a les línies de camp: prop de cada càrrega són circumferències, i lluny s’uneixen en corbes que envolten les dues; són més properes entre elles a prop de les càrregues.',
                'Las dos cargas son negativas: las <b>líneas de campo</b> llegan desde el infinito y <b>terminan</b> en cada carga (en ' + M('q_B') + ', con el doble de carga, llegan el doble). Entre las dos cargas hay un punto de campo nulo. Las <b>equipotenciales</b> son perpendiculares a las líneas de campo: cerca de cada carga son circunferencias, y lejos se unen en curvas que rodean a las dos; están más próximas entre sí cerca de las cargas.'),
              figL(fieldAB),
            ]),
          part('2.2', T('En quin punt de l’eix ' + M('x') + ' s’ha de situar una tercera càrrega, ' + M(r`q_C=-8{,}00\ \mu\text{C}`) + ', perquè la força elèctrica total sobre ' + M('q_C') + ' sigui nul·la? Calculeu el treball que fa el camp elèctric quan la càrrega ' + M('q_C') + ' es mou de la posició inicial que heu calculat fins a un punt equidistant de ' + M('q_A') + ' i ' + M('q_B') + ' situat a l’eix ' + M('x') + '. Interpreteu el signe del resultat obtingut.',
                        '¿En qué punto del eje ' + M('x') + ' hay que situar una tercera carga, ' + M(r`q_C=-8{,}00\ \mu\text{C}`) + ', para que la fuerza eléctrica total sobre ' + M('q_C') + ' sea nula? Calcule el trabajo que hace el campo eléctrico cuando la carga ' + M('q_C') + ' se mueve desde la posición inicial que ha calculado hasta un punto equidistante de ' + M('q_A') + ' y ' + M('q_B') + ' situado en el eje ' + M('x') + '. Interprete el signo del resultado obtenido.'),
            [
              p('Les dues forces sobre ' + M('q_C') + ' són repulsives; només es poden compensar <b>entre</b> les dues càrregues, a una distància ' + M('x') + ' de ' + M('q_A') + ':', 'Las dos fuerzas sobre ' + M('q_C') + ' son repulsivas; solo pueden compensarse <b>entre</b> las dos cargas, a una distancia ' + M('x') + ' de ' + M('q_A') + ':'),
              F(r`k\dfrac{|q_A||q_C|}{x^2}=k\dfrac{|q_B||q_C|}{(1-x)^2}\ \Rightarrow\ \dfrac{2}{x^2}=\dfrac{4}{(1-x)^2}\ \Rightarrow\ (1-x)^2=2x^2\ \Rightarrow\ x^2+2x-1=0`),
              p('La solució vàlida (positiva) és ' + M(r`x=\sqrt2-1=0{,}414\ \text{m}`) + ' (la força no depèn del valor de ' + M('q_C') + ').', 'La solución válida (positiva) es ' + M(r`x=\sqrt2-1=0{,}414\ \text{m}`) + ' (la fuerza no depende del valor de ' + M('q_C') + ').'),
              p('El punt equidistant de ' + M('q_A') + ' i ' + M('q_B') + ' és ' + M('x_f=0{,}500') + ' m. El treball del camp és ' + M(r`W=-\Delta U=-q_C\,(V_f-V_i)`) + ', amb ' + M(r`V=k\Big(\dfrac{q_A}{r_A}+\dfrac{q_B}{r_B}\Big)`) + ':', 'El punto equidistante de ' + M('q_A') + ' y ' + M('q_B') + ' es ' + M('x_f=0{,}500') + ' m. El trabajo del campo es ' + M(r`W=-\Delta U=-q_C\,(V_f-V_i)`) + ', con ' + M(r`V=k\Big(\dfrac{q_A}{r_A}+\dfrac{q_B}{r_B}\Big)`) + ':'),
              F(r`V_i=8{,}99\cdot10^{9}\Big(\dfrac{-2\cdot10^{-6}}{0{,}414}+\dfrac{-4\cdot10^{-6}}{0{,}586}\Big)=-1{,}048\cdot10^{5}\ \text{V}`),
              F(r`V_f=8{,}99\cdot10^{9}\Big(\dfrac{-2\cdot10^{-6}}{0{,}500}+\dfrac{-4\cdot10^{-6}}{0{,}500}\Big)=-1{,}079\cdot10^{5}\ \text{V}`),
              F(r`W=-(-8{,}00\cdot10^{-6})\,(-1{,}079\cdot10^{5}+1{,}048\cdot10^{5})=-2{,}47\cdot10^{-2}\ \text{J}`),
              ans('Equilibri a <b>' + M(r`x=0{,}414\ \text{m}`) + '</b> i treball <b>' + M(r`W=-2{,}47\cdot10^{-2}\ \text{J}`) + '</b>. El signe negatiu indica que el camp elèctric <b>s’oposa</b> al desplaçament: cal una força externa que faci un treball positiu de ' + M(r`2{,}47\cdot10^{-2}\ \text{J}`) + ' (l’energia potencial de la càrrega augmenta).',
                  'Equilibrio en <b>' + M(r`x=0{,}414\ \text{m}`) + '</b> y trabajo <b>' + M(r`W=-2{,}47\cdot10^{-2}\ \text{J}`) + '</b>. El signo negativo indica que el campo eléctrico <b>se opone</b> al desplazamiento: hace falta una fuerza externa que haga un trabajo positivo de ' + M(r`2{,}47\cdot10^{-2}\ \text{J}`) + ' (la energía potencial de la carga aumenta).'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('Una espira quadrada de 10,0 cm de costat es desplaça a una velocitat constant de 5,00 cm s⁻¹ i entra en una regió on hi ha un camp magnètic uniforme, perpendicular al pla del paper i dirigit cap endins. El mòdul del camp magnètic és de 5,00 mT. L’amplària de la regió amb camp magnètic és de 30,0 cm. Es pren com a instant inicial ' + M('t=0') + ' s, el moment en què l’espira comença a entrar a la regió amb camp magnètic.',
                   'Una espira cuadrada de 10,0 cm de lado se desplaza a una velocidad constante de 5,00 cm s⁻¹ y entra en una región donde hay un campo magnético uniforme, perpendicular al plano del papel y dirigido hacia dentro. El módulo del campo magnético es de 5,00 mT. La anchura de la región con campo magnético es de 30,0 cm. Se toma como instante inicial ' + M('t=0') + ' s, el momento en que la espira empieza a entrar en la región con campo magnético.'),
                 img('fis26-s2-e2b', 815, 719, 'Espira quadrada que entra en una regió de 30 cm amb camp magnètic cap endins', 'Espira cuadrada que entra en una región de 30 cm con campo magnético hacia dentro')),
        parts: [
          part('2.1', T('Calculeu el valor absolut del flux magnètic que travessa l’espira en els instants ' + M('t=1{,}00') + ' s, ' + M('t=5{,}00') + ' s i ' + M('t=7{,}00') + ' s.',
                        'Calcule el valor absoluto del flujo magnético que atraviesa la espira en los instantes ' + M('t=1{,}00') + ' s, ' + M('t=5{,}00') + ' s y ' + M('t=7{,}00') + ' s.'),
            [
              p('El camp és perpendicular a l’espira: ' + M(r`|\Phi|=B\,S_{\text{dins}}`) + ', on ' + M(r`S_{\text{dins}}`) + ' és l’àrea de l’espira dins la regió amb camp. El front de l’espira avança ' + M('x=vt') + ' i l’espira té 10 cm de costat.', 'El campo es perpendicular a la espira: ' + M(r`|\Phi|=B\,S_{\text{dentro}}`) + ', donde ' + M(r`S_{\text{dentro}}`) + ' es el área de la espira dentro de la región con campo. El frente de la espira avanza ' + M('x=vt') + ' y la espira tiene 10 cm de lado.'),
              ul(T(M('t=1\\ \\text{s}') + ': ' + M('x=5\\ \\text{cm}') + ' ⇒ ' + M(r`S=10\times5=50\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=5{,}00\cdot10^{-3}\cdot50\cdot10^{-4}=2{,}5\cdot10^{-5}\ \text{Wb}`) + '.', M('t=1\\ \\text{s}') + ': ' + M('x=5\\ \\text{cm}') + ' ⇒ ' + M(r`S=10\times5=50\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=5{,}00\cdot10^{-3}\cdot50\cdot10^{-4}=2{,}5\cdot10^{-5}\ \text{Wb}`) + '.'),
                T(M('t=5\\ \\text{s}') + ': ' + M('x=25\\ \\text{cm}') + ': l’espira és <b>tota dins</b> ⇒ ' + M(r`S=100\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=5{,}0\cdot10^{-5}\ \text{Wb}`) + '.', M('t=5\\ \\text{s}') + ': ' + M('x=25\\ \\text{cm}') + ': la espira está <b>toda dentro</b> ⇒ ' + M(r`S=100\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=5{,}0\cdot10^{-5}\ \text{Wb}`) + '.'),
                T(M('t=7\\ \\text{s}') + ': ' + M('x=35\\ \\text{cm}') + ': el front ja ha sortit de la regió (30 cm) i només 5 cm de l’espira hi són encara ⇒ ' + M(r`S=50\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=2{,}5\cdot10^{-5}\ \text{Wb}`) + '.', M('t=7\\ \\text{s}') + ': ' + M('x=35\\ \\text{cm}') + ': el frente ya ha salido de la región (30 cm) y solo 5 cm de la espira están aún dentro ⇒ ' + M(r`S=50\ \text{cm}^2`) + ' ⇒ ' + M(r`|\Phi|=2{,}5\cdot10^{-5}\ \text{Wb}`) + '.')),
              ans('<b>' + M(r`2{,}5\cdot10^{-5}\ \text{Wb}`) + '</b> (1 s), <b>' + M(r`5{,}0\cdot10^{-5}\ \text{Wb}`) + '</b> (5 s), <b>' + M(r`2{,}5\cdot10^{-5}\ \text{Wb}`) + '</b> (7 s).', '<b>' + M(r`2{,}5\cdot10^{-5}\ \text{Wb}`) + '</b> (1 s), <b>' + M(r`5{,}0\cdot10^{-5}\ \text{Wb}`) + '</b> (5 s), <b>' + M(r`2{,}5\cdot10^{-5}\ \text{Wb}`) + '</b> (7 s).'),
            ]),
          part('2.2', T('Representeu a la quadrícula de sota el valor absolut de la força electromotriu induïda en funció del temps durant els primers 9,00 s. Justifiqueu el sentit del corrent induït en els diferents intervals en què es genera la força electromotriu.',
                        'Represente en la cuadrícula de abajo el valor absoluto de la fuerza electromotriz inducida en función del tiempo durante los primeros 9,00 s. Justifique el sentido de la corriente inducida en los diferentes intervalos en que se genera la fuerza electromotriz.'),
            [
              p('Llei de Faraday: ' + M(r`|\varepsilon|=\Big|\dfrac{d\Phi}{dt}\Big|`) + ': només hi ha fem quan el flux varia.', 'Ley de Faraday: ' + M(r`|\varepsilon|=\Big|\dfrac{d\Phi}{dt}\Big|`) + ': solo hay fem cuando el flujo varía.'),
              ul(T('<b>0 – 2 s</b> (entra): ' + M(r`|\Phi|=B\,l\,v\,t`) + ' ⇒ ' + M(r`|\varepsilon|=B\,l\,v=5{,}00\cdot10^{-3}\cdot0{,}100\cdot0{,}0500=2{,}5\cdot10^{-5}\ \text{V}`) + '.', '<b>0 – 2 s</b> (entra): ' + M(r`|\Phi|=B\,l\,v\,t`) + ' ⇒ ' + M(r`|\varepsilon|=B\,l\,v=5{,}00\cdot10^{-3}\cdot0{,}100\cdot0{,}0500=2{,}5\cdot10^{-5}\ \text{V}`) + '.'),
                T('<b>2 – 6 s</b>: l’espira és tota dins el camp, flux constant ⇒ ' + M(r`\varepsilon=0`) + '.', '<b>2 – 6 s</b>: la espira está toda dentro del campo, flujo constante ⇒ ' + M(r`\varepsilon=0`) + '.'),
                T('<b>6 – 8 s</b> (surt): el flux disminueix al mateix ritme ⇒ ' + M(r`|\varepsilon|=2{,}5\cdot10^{-5}\ \text{V}`) + '.', '<b>6 – 8 s</b> (sale): el flujo disminuye al mismo ritmo ⇒ ' + M(r`|\varepsilon|=2{,}5\cdot10^{-5}\ \text{V}`) + '.'),
                T('<b>8 – 9 s</b>: l’espira és fora, flux nul ⇒ ' + M(r`\varepsilon=0`) + '.', '<b>8 – 9 s</b>: la espira está fuera, flujo nulo ⇒ ' + M(r`\varepsilon=0`) + '.')),
              emfGraph,
              p('<b>Sentit del corrent (llei de Lenz):</b> el corrent induït s’oposa a la variació de flux. Quan <b>entra</b> (0–2 s) el flux cap endins augmenta ⇒ el camp induït és cap enfora ⇒ corrent en sentit <b>antihorari</b>. Quan <b>surt</b> (6–8 s) el flux cap endins disminueix ⇒ el camp induït és cap endins ⇒ corrent en sentit <b>horari</b>.',
                '<b>Sentido de la corriente (ley de Lenz):</b> la corriente inducida se opone a la variación de flujo. Cuando <b>entra</b> (0–2 s) el flujo hacia dentro aumenta ⇒ el campo inducido es hacia fuera ⇒ corriente en sentido <b>antihorario</b>. Cuando <b>sale</b> (6–8 s) el flujo hacia dentro disminuye ⇒ el campo inducido es hacia dentro ⇒ corriente en sentido <b>horario</b>.'),
            ]),
        ] },
    ] },

    { n: 3, pts: 2.5, topic: TOP.o, choose: true, opts: [
      { k: 'A',
        intro: J(p('Un elefant es troba en un parc nacional i, en un moment determinat, és observat per dos investigadors amagats en arbres amb l’objectiu de fer un estudi científic.',
                   'Un elefante se encuentra en un parque nacional y, en un momento determinado, es observado por dos investigadores escondidos en árboles con el objetivo de hacer un estudio científico.'),
                 img('fis26-s2-e3a', 738, 505, 'Dos observadors als arbres, a 15,0 m i 20,0 m de l’elefant; el primer a 5,00 m d’altura', 'Dos observadores en los árboles, a 15,0 m y 20,0 m del elefante; el primero a 5,00 m de altura'),
                 DAT(M(r`v_{so}=340\ \text{m s}^{-1}`) + '; ' + M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '. <i>Assumiu que el front d’ona és esfèric.</i>', M(r`v_{sonido}=340\ \text{m s}^{-1}`) + '; ' + M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '. <i>Asuma que el frente de onda es esférico.</i>')),
        parts: [
          part('3.1', T('L’elefant bramula i l’observador 1 percep un nivell d’intensitat sonora de 65,0 dB. Aquest observador es troba a una distància horitzontal de 15,0 m de l’elefant i està situat a una altura de 5,00 m sobre el terra. Un segon observador percep el so amb un nivell d’intensitat de 62,0 dB i es troba a una distància horitzontal de 20,0 m de l’elefant. Determineu a quina altura està situat el segon observador.',
                        'El elefante barrita y el observador 1 percibe un nivel de intensidad sonora de 65,0 dB. Este observador se encuentra a una distancia horizontal de 15,0 m del elefante y está situado a una altura de 5,00 m sobre el suelo. Un segundo observador percibe el sonido con un nivel de intensidad de 62,0 dB y se encuentra a una distancia horizontal de 20,0 m del elefante. Determine a qué altura está situado el segundo observador.'),
            [
              p('El so es propaga en un front esfèric: ' + M(r`I=\dfrac{P}{4\pi r^2}`) + ', així que ' + M(r`I_1/I_2=(r_2/r_1)^2`) + '. La diferència de nivells és:', 'El sonido se propaga en un frente esférico: ' + M(r`I=\dfrac{P}{4\pi r^2}`) + ', así que ' + M(r`I_1/I_2=(r_2/r_1)^2`) + '. La diferencia de niveles es:'),
              F(r`\beta_1-\beta_2=10\log\dfrac{I_1}{I_2}=20\log\dfrac{r_2}{r_1}\ \Rightarrow\ r_2=r_1\,10^{(\beta_1-\beta_2)/20}`),
              p('Distància de l’observador 1 (hipotenusa): ' + M(r`r_1=\sqrt{15{,}0^2+5{,}00^2}=15{,}8\ \text{m}`) + '. Llavors:', 'Distancia del observador 1 (hipotenusa): ' + M(r`r_1=\sqrt{15{,}0^2+5{,}00^2}=15{,}8\ \text{m}`) + '. Entonces:'),
              F(r`r_2=15{,}8\cdot10^{3{,}0/20}=15{,}8\cdot1{,}41=22{,}3\ \text{m}`),
              F(r`r_2^2=20{,}0^2+h_2^2\ \Rightarrow\ h_2=\sqrt{22{,}3^2-20{,}0^2}`),
              AN(r`h_2=9{,}94\ \text{m}`),
            ]),
          part('3.2', T('En una altra observació es detecten dos elefants separats 10,0 m sobre el pla. Suposant que tots dos emeten un so coherent a una freqüència de 80,0 Hz, i amb la mateixa amplitud i en fase, determineu en quins punts de la línia recta que uneix els dos elefants no es percep cap so.',
                        'En otra observación se detectan dos elefantes separados 10,0 m sobre el plano. Suponiendo que ambos emiten un sonido coherente a una frecuencia de 80,0 Hz, y con la misma amplitud y en fase, determine en qué puntos de la línea recta que une a los dos elefantes no se percibe ningún sonido.'),
            [
              p('Longitud d’ona: ' + M(r`\lambda=\dfrac vf=\dfrac{340}{80{,}0}=4{,}25\ \text{m}`) + '. Silenci = interferència destructiva: la diferència de camins és un nombre imparell de mitges longituds d’ona. Per a un punt entre els dos elefants, a ' + M('x_1') + ' i ' + M('x_2') + ' d’ells, ' + M('x_1+x_2=10{,}0\\ \\text{m}') + ':',
                'Longitud de onda: ' + M(r`\lambda=\dfrac vf=\dfrac{340}{80{,}0}=4{,}25\ \text{m}`) + '. Silencio = interferencia destructiva: la diferencia de caminos es un número impar de medias longitudes de onda. Para un punto entre los dos elefantes, a ' + M('x_1') + ' y ' + M('x_2') + ' de ellos, ' + M('x_1+x_2=10{,}0\\ \\text{m}') + ':'),
              F(r`|x_1-x_2|=\Big(n+\dfrac12\Big)\lambda\ ,\qquad n=0,1,2,\dots\ \Rightarrow\ x_1=5{,}00\pm\dfrac{(2n+1)\lambda}{4}`),
              ul(T(M('n=0') + ': ' + M('|x_1-x_2|=2{,}125\\ \\text{m}') + ' ⇒ ' + M('x_1=3{,}94\\ \\text{m}') + ' i ' + M('6{,}06\\ \\text{m}') + '.', M('n=0') + ': ' + M('|x_1-x_2|=2{,}125\\ \\text{m}') + ' ⇒ ' + M('x_1=3{,}94\\ \\text{m}') + ' y ' + M('6{,}06\\ \\text{m}') + '.'),
                T(M('n=1') + ': ' + M('|x_1-x_2|=6{,}375\\ \\text{m}') + ' ⇒ ' + M('x_1=1{,}81\\ \\text{m}') + ' i ' + M('8{,}19\\ \\text{m}') + '.', M('n=1') + ': ' + M('|x_1-x_2|=6{,}375\\ \\text{m}') + ' ⇒ ' + M('x_1=1{,}81\\ \\text{m}') + ' y ' + M('8{,}19\\ \\text{m}') + '.'),
                T(M('n\\ge2') + ': ' + M('|x_1-x_2|\\ge10{,}6\\ \\text{m}>10\\ \\text{m}') + ': surt fora del segment, no val.', M('n\\ge2') + ': ' + M('|x_1-x_2|\\ge10{,}6\\ \\text{m}>10\\ \\text{m}') + ': sale fuera del segmento, no vale.')),
              figL(pointsLine),
              ans('No es percep so a <b>1,81 m, 3,94 m, 6,06 m i 8,19 m</b> d’un dels elefants (4 punts simètrics respecte del centre).', 'No se percibe sonido a <b>1,81 m, 3,94 m, 6,06 m y 8,19 m</b> de uno de los elefantes (4 puntos simétricos respecto del centro).'),
            ]),
        ] },
      { k: 'B',
        intro: p('S’utilitza la lent d’un escàner per a capturar la imatge d’un full situat a 20,0 cm de la lent. La imatge que es forma en el sensor de l’escàner està invertida i té la mateixa mida que l’objecte.',
                 'Se utiliza la lente de un escáner para capturar la imagen de una hoja situada a 20,0 cm de la lente. La imagen que se forma en el sensor del escáner está invertida y tiene el mismo tamaño que el objeto.'),
        parts: [
          part('3.1', T('A quina distància de la lent s’ha de col·locar el sensor perquè es formi una imatge nítida? Calculeu la distància focal imatge de la lent i indiqueu si es tracta d’una lent convergent o divergent.',
                        '¿A qué distancia de la lente hay que colocar el sensor para que se forme una imagen nítida? Calcule la distancia focal imagen de la lente e indique si se trata de una lente convergente o divergente.'),
            [
              p('Criteri de signes DIN: ' + M('s=-20{,}0\\ \\text{cm}') + ' (objecte a l’esquerra). Augment lateral:', 'Criterio de signos DIN: ' + M('s=-20{,}0\\ \\text{cm}') + ' (objeto a la izquierda). Aumento lateral:'),
              F(r`\beta=\dfrac{y'}{y}=\dfrac{s'}{s}=-1\ \Rightarrow\ s'=-s=+20{,}0\ \text{cm}`),
              p('Equació de les lents primes:', 'Ecuación de las lentes delgadas:'),
              F(r`\dfrac1{f'}=\dfrac1{s'}-\dfrac1s=\dfrac1{20{,}0}+\dfrac1{20{,}0}=\dfrac1{10{,}0}\ \Rightarrow\ f'=+10{,}0\ \text{cm}`),
              ans('Sensor a <b>20,0 cm</b> de la lent (a l’altre costat); <b>' + M(r`f'=10{,}0\ \text{cm}`) + '</b>. ' + M(r`f'>0`) + ': la lent és <b>convergent</b>.', 'Sensor a <b>20,0 cm</b> de la lente (al otro lado); <b>' + M(r`f'=10{,}0\ \text{cm}`) + '</b>. ' + M(r`f'>0`) + ': la lente es <b>convergente</b>.'),
            ]),
          part('3.2', T('Dibuixeu el diagrama de rajos corresponent en la quadrícula de sota indicant clarament totes les distàncies representades i utilitzades a l’apartat anterior.',
                        'Dibuje el diagrama de rayos correspondiente en la cuadrícula de abajo indicando claramente todas las distancias representadas y utilizadas en el apartado anterior.'),
            [
              p('Amb ' + M(r`f'=10`) + ' cm, l’objecte és a ' + M('2F') + ' (a 20 cm) i la imatge, real i invertida, es forma a ' + M('2F\'') + '. N’hi ha prou amb dos dels tres rajos: el paral·lel a l’eix (surt cap a ' + M('F\'') + '), el que passa pel centre (no es desvia) i el que passa per ' + M('F') + ' (surt paral·lel a l’eix).',
                'Con ' + M(r`f'=10`) + ' cm, el objeto está en ' + M('2F') + ' (a 20 cm) y la imagen, real e invertida, se forma en ' + M('2F\'') + '. Bastan dos de los tres rayos: el paralelo al eje (sale hacia ' + M('F\'') + '), el que pasa por el centro (no se desvía) y el que pasa por ' + M('F') + ' (sale paralelo al eje).'),
              figL(lensDiagram),
            ]),
        ] },
    ] },

    { n: 4, pts: 2.5, topic: TOP.n,
      intro: J(p('El radó és un gas noble radioactiu que es produeix de manera natural al subsòl com a resultat de la cadena de desintegració de l’urani. El radó es pot acumular en espais tancats com ara soterranis. La inhalació de concentracions superiors a 300 Bq m⁻³ d’aquest gas durant períodes prolongats incrementa significativament el risc de patir càncer de pulmó.',
                 'El radón es un gas noble radiactivo que se produce de manera natural en el subsuelo como resultado de la cadena de desintegración del uranio. El radón puede acumularse en espacios cerrados como sótanos. La inhalación de concentraciones superiores a 300 Bq m⁻³ de este gas durante periodos prolongados incrementa significativamente el riesgo de padecer cáncer de pulmón.'),
               img('fis26-s2-e4', 1100, 792, 'Cadena de desintegració de l’urani-238 fins al radó-222 amb els períodes de semidesintegració', 'Cadena de desintegración del uranio-238 hasta el radón-222 con los periodos de semidesintegración'),
               DAT(M(r`N_A=6{,}022\cdot10^{23}`) + '; ' + M(r`m({}^{222}_{86}\text{Rn})=222\ \text{g mol}^{-1}`) + '; ' + M(r`T_{1/2}({}^{222}_{86}\text{Rn})=3{,}82\ \text{dies}`) + '.', M(r`N_A=6{,}022\cdot10^{23}`) + '; ' + M(r`m({}^{222}_{86}\text{Rn})=222\ \text{g mol}^{-1}`) + '; ' + M(r`T_{1/2}({}^{222}_{86}\text{Rn})=3{,}82\ \text{días}`) + '.')),
      parts: [
        part('4.1', T('Observeu la figura i escriviu les principals desintegracions que constitueixen la cadena de desintegració de l’urani fins a la formació del radó. En cada cas, indiqueu de quin tipus de reacció es tracta.',
                      'Observe la figura y escriba las principales desintegraciones que constituyen la cadena de desintegración del uranio hasta la formación del radón. En cada caso, indique de qué tipo de reacción se trata.'),
          [
            p('A cada pas es conserven el nombre màssic ' + M('A') + ' i la càrrega ' + M('Z') + '. Una desintegració ' + M(r`\alpha`) + ' (emet ' + M(r`{}^4_2\text{He}`) + ') fa baixar ' + M('A') + ' en 4 i ' + M('Z') + ' en 2; una ' + M(r`\beta^-`) + ' (electró + antineutrí) manté ' + M('A') + ' i puja ' + M('Z') + ' en 1:', 'En cada paso se conservan el número másico ' + M('A') + ' y la carga ' + M('Z') + '. Una desintegración ' + M(r`\alpha`) + ' (emite ' + M(r`{}^4_2\text{He}`) + ') hace bajar ' + M('A') + ' en 4 y ' + M('Z') + ' en 2; una ' + M(r`\beta^-`) + ' (electrón + antineutrino) mantiene ' + M('A') + ' y sube ' + M('Z') + ' en 1:'),
            F(r`\begin{aligned}{}^{238}_{92}\text{U}&\to{}^{234}_{90}\text{Th}+{}^{4}_{2}\text{He}&&(\alpha)\\{}^{234}_{90}\text{Th}&\to{}^{234}_{91}\text{Pa}+{}^{\ \,0}_{-1}e+\bar\nu_e&&(\beta^-)\\{}^{234}_{91}\text{Pa}&\to{}^{234}_{92}\text{U}+{}^{\ \,0}_{-1}e+\bar\nu_e&&(\beta^-)\\{}^{234}_{92}\text{U}&\to{}^{230}_{90}\text{Th}+{}^{4}_{2}\text{He}&&(\alpha)\\{}^{230}_{90}\text{Th}&\to{}^{226}_{88}\text{Ra}+{}^{4}_{2}\text{He}&&(\alpha)\\{}^{226}_{88}\text{Ra}&\to{}^{222}_{86}\text{Rn}+{}^{4}_{2}\text{He}&&(\alpha)\end{aligned}`),
            ans('<b>Quatre desintegracions ' + M(r`\alpha`) + ' i dues ' + M(r`\beta^-`) + '</b> (' + M(r`{}^{238}_{92}\text{U}`) + ' → ' + M(r`{}^{222}_{86}\text{Rn}`) + ': ' + M('A') + ' baixa 16 = 4·4; ' + M('Z') + ' baixa ' + M('4\\cdot2-2=6') + ').', '<b>Cuatro desintegraciones ' + M(r`\alpha`) + ' y dos ' + M(r`\beta^-`) + '</b> (' + M(r`{}^{238}_{92}\text{U}`) + ' → ' + M(r`{}^{222}_{86}\text{Rn}`) + ': ' + M('A') + ' baja 16 = 4·4; ' + M('Z') + ' baja ' + M('4\\cdot2-2=6') + ').'),
          ]),
        part('4.2', T('Es prenen mesures de la massa i l’activitat del radó en una habitació tancada de 18 m³ de volum. Si es mesura una massa de 0,80 pg de radó, a quina activitat correspon? Aquest valor està per sobre o per sota del llindar d’activitat per unitat de volum indicat a l’enunciat? Si inicialment es mesura una activitat per unitat de volum de 230 Bq m⁻³ i l’habitació queda perfectament aïllada, quina activitat per unitat de volum hi haurà al cap de 15 dies?',
                      'Se toman medidas de la masa y la actividad del radón en una habitación cerrada de 18 m³ de volumen. Si se mide una masa de 0,80 pg de radón, ¿a qué actividad corresponde? ¿Este valor está por encima o por debajo del umbral de actividad por unidad de volumen indicado en el enunciado? Si inicialmente se mide una actividad por unidad de volumen de 230 Bq m⁻³ y la habitación queda perfectamente aislada, ¿qué actividad por unidad de volumen habrá al cabo de 15 días?'),
          [
            p('<b>Nombre de nuclis</b> (' + M(r`0{,}80\ \text{pg}=8{,}0\cdot10^{-13}\ \text{g}`) + ') i <b>constant de desintegració</b>:', '<b>Número de núcleos</b> (' + M(r`0{,}80\ \text{pg}=8{,}0\cdot10^{-13}\ \text{g}`) + ') y <b>constante de desintegración</b>:'),
            F(r`N=\dfrac{m}{M}N_A=\dfrac{8{,}0\cdot10^{-13}}{222}\cdot6{,}022\cdot10^{23}=2{,}17\cdot10^{9}\ \text{nuclis}`),
            F(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{\ln2}{3{,}82\cdot86\,400}=2{,}10\cdot10^{-6}\ \text{s}^{-1}`),
            F(r`A=\lambda N=2{,}10\cdot10^{-6}\cdot2{,}17\cdot10^{9}=4{,}56\cdot10^{3}\ \text{Bq}\ \Rightarrow\ \dfrac AV=\dfrac{4{,}56\cdot10^{3}}{18}=253\ \text{Bq/m}^3`),
            p('És <b>per sota</b> del llindar de 300 Bq m⁻³, però no gaire lluny (un 84 %).', 'Está <b>por debajo</b> del umbral de 300 Bq m⁻³, aunque no muy lejos (un 84 %).'),
            p('Aïllada l’habitació, només decau el radó: ' + M(r`a=a_0\,2^{-t/T_{1/2}}`) + ':', 'Con la habitación aislada, solo decae el radón: ' + M(r`a=a_0\,2^{-t/T_{1/2}}`) + ':'),
            F(r`a=230\cdot2^{-15/3{,}82}=230\cdot0{,}0658=15{,}1\ \text{Bq/m}^3`),
            ans('<b>' + M(r`A=4{,}56\cdot10^{3}\ \text{Bq}`) + '</b> (253 Bq/m³, per sota del llindar) i, al cap de 15 dies, <b>' + M(r`15{,}1\ \text{Bq/m}^3`) + '</b>.', '<b>' + M(r`A=4{,}56\cdot10^{3}\ \text{Bq}`) + '</b> (253 Bq/m³, por debajo del umbral) y, al cabo de 15 días, <b>' + M(r`15{,}1\ \text{Bq/m}^3`) + '</b>.'),
          ]),
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 (ordinària) ───────────────────────── */
const marsHera = lang => {
  const mx = 78, my = 100, R = 44, hx = 318;
  return SV(380, 200, L2(lang, 'Mart i la nau Hera: la força gravitatòria apunta cap al centre de Mart', 'Marte y la nave Hera: la fuerza gravitatoria apunta hacia el centro de Marte'),
    `<circle class="bod" cx="${mx}" cy="${my}" r="${R}"/>` + DOT(mx, my, 2.6, 'pt2') + LN(mx, my, mx + R, my, 'dsh') +
    DOT(hx, my, 5, 'pt') + AR(hx - 6, my, hx - 96, my) + LN(mx + R, my + 44, hx, my + 44, 'ln') + LN(mx + R, my + 38, mx + R, my + 50) + LN(hx, my + 38, hx, my + 50) +
    TX(mx, my - 54, L2(lang, 'Mart', 'Marte')) + TX(hx, my - 14, 'Hera') + TX(hx - 56, my - 10, 'F') +
    TX((mx + R + hx) / 2, my + 62, 'h = 5 000 km') + TX(mx + R / 2, my - 6, 'R') + TX((mx + hx) / 2 + 20, my + 24, 'r = R + h', 'middle'));
};
const selector = lang => {
  const x0 = 40, x1 = 330, yt = 34, yb = 146, ym = 90;
  let dots = ''; for (let i = 0; i < 6; i++) { const x = 70 + i * 48; [62, 118].forEach(y => { dots += `<circle class="ln" cx="${x}" cy="${y}" r="5"/>` + DOT(x, y, 1.6, 'pt2'); }); }
  return SV(380, 200, L2(lang, 'Forces sobre l’ió Cl⁺ al selector de velocitats: elèctrica cap amunt i magnètica cap avall', 'Fuerzas sobre el ion Cl⁺ en el selector de velocidades: eléctrica hacia arriba y magnética hacia abajo'),
    RECT(x0, yt - 8, x1 - x0, 8) + RECT(x0, yb, x1 - x0, 8) + TX(x0 + 8, yt - 14, '− − − − − − − −', 'start') + TX(x0 + 8, yb + 24, '+ + + + + + + +', 'start') + dots +
    DOT(150, ym, 7, 'sun') + TX(150, ym + 4, '+', 'middle').replace('class="lb"', 'class="lb wh"') +
    AR(158, ym, 215, ym, 'vc2') + TX(222, ym + 4, 'v', 'start') + AR(150, ym - 10, 150, ym - 50) + TX(160, ym - 40, 'F<tspan dy="3" font-size="9">E</tspan>', 'start') + AR(150, ym + 10, 150, ym + 50) + TX(160, ym + 52, 'F<tspan dy="3" font-size="9">B</tspan>', 'start') +
    TX(56, 106, 'B<tspan dy="3" font-size="9">1</tspan> (⊙)', 'start') + TX(350, 30, 'E ↑', 'end'));
};
const standing = lang => {
  const w = 380, h = 140, x0 = 30, x1 = 350, y0 = 70, amp = 38, per = (x1 - x0) / 4;
  let up = '', dn = ''; for (let i = 0; i <= 200; i++) { const x = x0 + (x1 - x0) * i / 200, yy = amp * Math.abs(Math.sin(Math.PI * (x - x0) / per)); up += (i ? 'L' : 'M') + f1(x) + ',' + f1(y0 - yy); dn += (i ? 'L' : 'M') + f1(x) + ',' + f1(y0 + yy); }
  let s = LN(x0, y0, x1, y0, 'ax') + PATH(up, 'c1') + PATH(dn, 'c1');
  for (let i = 0; i <= 4; i++) { s += DOT(x0 + i * per, y0, 4, 'pt2') + TX(x0 + i * per, y0 + 54, 'N' + (i + 1)); }
  for (let i = 0; i < 4; i++) s += TX(x0 + (i + 0.5) * per, y0 - amp - 6, 'V' + (i + 1));
  s += TX(x0, 18, '0', 'middle') + TX(x1, 18, '36,0 cm', 'middle');
  return SV(w, h + 10, L2(lang, 'Ona estacionària amb 5 nodes (N) i 4 ventres (V): quart harmònic', 'Onda estacionaria con 5 nodos (N) y 4 vientres (V): cuarto armónico'), s);
};
const shmGraph = fig(plot({ w: 380, h: 220, xr: [-0.4, 3.1], yr: [-6.4, 6.9], tickx: [0.7, 1.4, 2.1, 2.8], ticky: [-5, 5],
  curves: [{ f: t => 5 * Math.cos(2 * Math.PI * t / 2.8), dom: [0, 2.8] }], points: [[0, 5], [0.7, 0], [1.4, -5], [2.1, 0], [2.8, 5]],
  labels: [[0.1, 6.4, 'x (10⁻⁴ m)'], [3.05, -1.2, 't (10⁻³ s)', 'end']], alt: 'Un període de x(t) = 5·10⁻⁴ cos(2240 t): màxim a t = 0, zero a 0,7 ms, mínim a 1,4 ms, zero a 2,1 ms i màxim a 2,8 ms' }));

const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2026-fisica-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g, choose: true, opts: [
      { k: 'A',
        intro: J(p('La nau espacial Hera (' + M(r`m_H=1\,130\ \text{kg}`) + ') ha d’arribar a un sistema d’asteroides per a recollir-ne informació. Per aconseguir-ho, el 2025 va passar a prop de Mart i en va aprofitar la gravetat per a accelerar.',
                   'La nave espacial Hera (' + M(r`m_H=1\,130\ \text{kg}`) + ') tiene que llegar a un sistema de asteroides para recoger información sobre él. Para conseguirlo, en 2025 pasó cerca de Marte y aprovechó su gravedad para acelerar.'),
                 DAT(GC + '; ' + M(r`M_M=6{,}42\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=3{,}39\cdot10^{3}\ \text{km}`) + '; ' + M(r`a_{ST}=1{,}50\cdot10^{8}\ \text{km}`) + ' (semieix Sol-Terra). Tercera llei de Kepler: ' + M(r`T^2/a^3=\text{constant}`) + '.',
                     GC + '; ' + M(r`M_M=6{,}42\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=3{,}39\cdot10^{3}\ \text{km}`) + '; ' + M(r`a_{ST}=1{,}50\cdot10^{8}\ \text{km}`) + ' (semieje Sol-Tierra). Tercera ley de Kepler: ' + M(r`T^2/a^3=\text{constante}`) + '.')),
        parts: [
          part('1.1', T('En un punt de la trajectòria, Hera va passar a una distància de 5 000 km de la superfície de Mart. Calculeu en aquest punt la intensitat del camp gravitatori generat per Mart i la força gravitatòria exercida per Mart sobre Hera. Feu un esquema que representi Mart i Hera, i dibuixeu la força que Mart exerceix sobre Hera.',
                        'En un punto de la trayectoria, Hera pasó a una distancia de 5 000 km de la superficie de Marte. Calcule en este punto la intensidad del campo gravitatorio generado por Marte y la fuerza gravitatoria ejercida por Marte sobre Hera. Haga un esquema que represente a Marte y a Hera, y dibuje la fuerza que Marte ejerce sobre Hera.'),
            [
              p('La distància al centre de Mart és ' + M(r`r=R_M+h=3{,}39\cdot10^{6}+5{,}000\cdot10^{6}=8{,}39\cdot10^{6}\ \text{m}`) + ':', 'La distancia al centro de Marte es ' + M(r`r=R_M+h=3{,}39\cdot10^{6}+5{,}000\cdot10^{6}=8{,}39\cdot10^{6}\ \text{m}`) + ':'),
              F(r`g=\dfrac{G M_M}{r^2}=\dfrac{6{,}67\cdot10^{-11}\cdot6{,}42\cdot10^{23}}{(8{,}39\cdot10^{6})^2}=0{,}608\ \text{N/kg}`),
              F(r`F=m_H\,g=1\,130\cdot0{,}608=6{,}87\cdot10^{2}\ \text{N}`),
              p('La força és atractiva: té la direcció de la recta que uneix Hera amb el centre de Mart i apunta cap a Mart.', 'La fuerza es atractiva: tiene la dirección de la recta que une a Hera con el centro de Marte y apunta hacia Marte.'),
              figL(marsHera),
              ans('<b>' + M(r`g=0{,}608\ \text{m/s}^2`) + '</b> (N/kg) i <b>' + M(r`F=687\ \text{N}`) + '</b>, dirigida cap a Mart.', '<b>' + M(r`g=0{,}608\ \text{m/s}^2`) + '</b> (N/kg) y <b>' + M(r`F=687\ \text{N}`) + '</b>, dirigida hacia Marte.'),
            ]),
          part('1.2', T('Hera descriu una trajectòria el·líptica al voltant del Sol amb un període de 2 anys i 274 dies. Sabent que el període de l’òrbita de la Terra al voltant del Sol és de 365 dies, calculeu el semieix major de l’òrbita el·líptica d’Hera. Sabent que el periheli de l’òrbita d’Hera es troba a ' + M(r`1{,}49\cdot10^{8}`) + ' km, a quina distància del Sol es troba l’afeli? Calculeu el quocient entre la velocitat d’Hera al periheli i a l’afeli.',
                        'Hera describe una trayectoria elíptica alrededor del Sol con un periodo de 2 años y 274 días. Sabiendo que el periodo de la órbita de la Tierra alrededor del Sol es de 365 días, calcule el semieje mayor de la órbita elíptica de Hera. Sabiendo que el perihelio de la órbita de Hera se encuentra a ' + M(r`1{,}49\cdot10^{8}`) + ' km, ¿a qué distancia del Sol se encuentra el afelio? Calcule el cociente entre la velocidad de Hera en el perihelio y en el afelio.'),
            [
              p('Període d’Hera: ' + M(r`T_H=2\cdot365+274=1\,004\ \text{dies}`) + '. Tercera llei de Kepler (la mateixa constant per a la Terra i per a Hera, que orbiten el mateix Sol):', 'Periodo de Hera: ' + M(r`T_H=2\cdot365+274=1\,004\ \text{días}`) + '. Tercera ley de Kepler (la misma constante para la Tierra y para Hera, que orbitan el mismo Sol):'),
              F(r`\dfrac{T_H^2}{a_H^3}=\dfrac{T_T^2}{a_T^3}\ \Rightarrow\ a_H=a_T\Big(\dfrac{T_H}{T_T}\Big)^{2/3}=1{,}50\cdot10^{8}\Big(\dfrac{1\,004}{365}\Big)^{2/3}=2{,}94\cdot10^{8}\ \text{km}`),
              p('El semieix és la mitjana de periheli i afeli: ' + M(r`a=\dfrac{r_p+r_a}{2}`) + '.', 'El semieje es la media de perihelio y afelio: ' + M(r`a=\dfrac{r_p+r_a}{2}`) + '.'),
              F(r`r_a=2a_H-r_p=2\cdot2{,}94\cdot10^{8}-1{,}49\cdot10^{8}=4{,}40\cdot10^{8}\ \text{km}`),
              p('El moment angular es conserva i al periheli i a l’afeli ' + M(r`\vec r\perp\vec v`) + ': ' + M(r`r_p v_p=r_a v_a`) + '.', 'El momento angular se conserva y en el perihelio y en el afelio ' + M(r`\vec r\perp\vec v`) + ': ' + M(r`r_p v_p=r_a v_a`) + '.'),
              F(r`\dfrac{v_p}{v_a}=\dfrac{r_a}{r_p}=\dfrac{4{,}40\cdot10^{8}}{1{,}49\cdot10^{8}}=2{,}95`),
              ans('<b>' + M(r`a_H=2{,}94\cdot10^{8}\ \text{km}`) + '</b>; afeli a <b>' + M(r`4{,}40\cdot10^{8}\ \text{km}`) + '</b> del Sol; ' + M(r`v_p/v_a=\mathbf{2{,}95}`) + ' (al periheli va gairebé tres vegades més de pressa).',
                  '<b>' + M(r`a_H=2{,}94\cdot10^{8}\ \text{km}`) + '</b>; afelio a <b>' + M(r`4{,}40\cdot10^{8}\ \text{km}`) + '</b> del Sol; ' + M(r`v_p/v_a=\mathbf{2{,}95}`) + ' (en el perihelio va casi tres veces más deprisa).'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('La sonda Mars Global Surveyor de la NASA es va llançar l’any 1996 i va acabar la missió l’any 2006. Aquesta missió va permetre elaborar un primer mapa de la superfície de Mart. La seva òrbita al voltant de Mart era estacionària, és a dir, era una òrbita circular amb un període igual a la duració d’un dia marcià.',
                   'La sonda Mars Global Surveyor de la NASA se lanzó en 1996 y terminó la misión en 2006. Esta misión permitió elaborar un primer mapa de la superficie de Marte. Su órbita alrededor de Marte era estacionaria, es decir, era una órbita circular con un periodo igual a la duración de un día marciano.'),
                 DAT(GC + '; ' + M(r`M_M=6{,}42\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=3{,}39\cdot10^{3}\ \text{km}`) + '; dia marcià: 24 h 37 min.', GC + '; ' + M(r`M_M=6{,}42\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=3{,}39\cdot10^{3}\ \text{km}`) + '; día marciano: 24 h 37 min.')),
        parts: [
          part('1.1', T('Determineu l’altura a què es trobava la sonda per sobre de la superfície de Mart. Quina és la intensitat del camp gravitatori creat per Mart a aquesta altura?',
                        'Determine la altura a la que se encontraba la sonda sobre la superficie de Marte. ¿Cuál es la intensidad del campo gravitatorio creado por Marte a esta altura?'),
            [
              p('Període: ' + M(r`T=24\ \text{h}\ 37\ \text{min}=88\,620\ \text{s}`) + '. La força gravitatòria és la centrípeta:', 'Periodo: ' + M(r`T=24\ \text{h}\ 37\ \text{min}=88\,620\ \text{s}`) + '. La fuerza gravitatoria es la centrípeta:'),
              F(r`G\dfrac{M_M m}{r^2}=m\Big(\dfrac{2\pi}{T}\Big)^2 r\ \Rightarrow\ r=\sqrt[3]{\dfrac{G M_M T^2}{4\pi^2}}=\sqrt[3]{\dfrac{6{,}67\cdot10^{-11}\cdot6{,}42\cdot10^{23}\cdot88\,620^2}{4\pi^2}}=2{,}04\cdot10^{7}\ \text{m}`),
              F(r`h=r-R_M=2{,}04\cdot10^{7}-3{,}39\cdot10^{6}=1{,}70\cdot10^{7}\ \text{m}`),
              F(r`g=\dfrac{G M_M}{r^2}=\dfrac{6{,}67\cdot10^{-11}\cdot6{,}42\cdot10^{23}}{(2{,}04\cdot10^{7})^2}=0{,}103\ \text{N/kg}`),
              ans('Altura <b>' + M(r`h=1{,}70\cdot10^{7}\ \text{m}`) + '</b> (uns 17 000 km); <b>' + M(r`g=0{,}103\ \text{m/s}^2`) + '</b>.', 'Altura <b>' + M(r`h=1{,}70\cdot10^{7}\ \text{m}`) + '</b> (unos 17 000 km); <b>' + M(r`g=0{,}103\ \text{m/s}^2`) + '</b>.'),
            ]),
          part('1.2', T('Una segona sonda, la Mars Reconnaissance Orbiter, està ampliant l’estudi de la superfície de Mart des del 2006. Aquesta sonda segueix una òrbita el·líptica al voltant del planeta a una altura sobre la superfície de Mart de 255 km al periastre i de 320 km a l’apoastre. Determineu el semieix de l’òrbita ' + M(r`a=\dfrac{r_a+r_p}{2}`) + ' i el període de la sonda. Tenint en compte que l’energia mecànica d’una òrbita el·líptica és ' + M(r`E_m=-G\dfrac{M\cdot m}{2a}`) + ' i que la massa de la sonda és de 1 187 kg, trobeu la velocitat al periastre i el mòdul del seu moment angular.',
                        'Una segunda sonda, la Mars Reconnaissance Orbiter, está ampliando el estudio de la superficie de Marte desde 2006. Esta sonda sigue una órbita elíptica alrededor del planeta a una altura sobre la superficie de Marte de 255 km en el periastro y de 320 km en el apoastro. Determine el semieje de la órbita ' + M(r`a=\dfrac{r_a+r_p}{2}`) + ' y el periodo de la sonda. Teniendo en cuenta que la energía mecánica de una órbita elíptica es ' + M(r`E_m=-G\dfrac{M\cdot m}{2a}`) + ' y que la masa de la sonda es de 1 187 kg, halle la velocidad en el periastro y el módulo de su momento angular.'),
            [
              F(r`r_p=3{,}39\cdot10^{6}+2{,}55\cdot10^{5}=3{,}645\cdot10^{6}\ \text{m},\qquad r_a=3{,}39\cdot10^{6}+3{,}20\cdot10^{5}=3{,}710\cdot10^{6}\ \text{m}`),
              F(r`a=\dfrac{r_a+r_p}{2}=3{,}68\cdot10^{6}\ \text{m}`),
              F(r`T=2\pi\sqrt{\dfrac{a^3}{G M_M}}=2\pi\sqrt{\dfrac{(3{,}68\cdot10^{6})^3}{6{,}67\cdot10^{-11}\cdot6{,}42\cdot10^{23}}}=6{,}78\cdot10^{3}\ \text{s}`),
              p('Conservació de l’energia mecànica al periastre:', 'Conservación de la energía mecánica en el periastro:'),
              F(r`\tfrac12 m v_p^2-\dfrac{G M_M m}{r_p}=-\dfrac{G M_M m}{2a}\ \Rightarrow\ v_p=\sqrt{G M_M\Big(\dfrac{2}{r_p}-\dfrac1a\Big)}=3{,}44\cdot10^{3}\ \text{m/s}`),
              p('Al periastre ' + M(r`\vec r\perp\vec v`) + ' i el moment angular és ' + M(r`L=m\,r_p v_p`) + ':', 'En el periastro ' + M(r`\vec r\perp\vec v`) + ' y el momento angular es ' + M(r`L=m\,r_p v_p`) + ':'),
              F(r`L=1\,187\cdot3{,}645\cdot10^{6}\cdot3{,}44\cdot10^{3}=1{,}49\cdot10^{13}\ \text{kg m}^2/\text{s}`),
              ans('<b>' + M(r`a=3{,}68\cdot10^{6}\ \text{m}`) + '</b>, <b>' + M(r`T=6{,}78\cdot10^{3}\ \text{s}`) + '</b> (1 h 53 min), <b>' + M(r`v_p=3{,}44\cdot10^{3}\ \text{m/s}`) + '</b>, <b>' + M(r`L=1{,}49\cdot10^{13}\ \text{kg m}^2/\text{s}`) + '</b>.',
                  '<b>' + M(r`a=3{,}68\cdot10^{6}\ \text{m}`) + '</b>, <b>' + M(r`T=6{,}78\cdot10^{3}\ \text{s}`) + '</b> (1 h 53 min), <b>' + M(r`v_p=3{,}44\cdot10^{3}\ \text{m/s}`) + '</b>, <b>' + M(r`L=1{,}49\cdot10^{13}\ \text{kg m}^2/\text{s}`) + '</b>.'),
            ]),
        ] },
    ] },

    { n: 2, pts: 2.5, topic: TOP.e,
      intro: J(p('La figura mostra l’esquema d’un espectròmetre de masses. Hi tenim un ió de clor (' + M(r`\text{Cl}^+`) + ') que surt de la font d’ions cap al selector de velocitats. En el selector de velocitats hi ha un camp elèctric generat per les plaques carregades i un camp magnètic extern ' + M(r`\vec B_1`) + ', en sentit cap enfora del paper.',
                 'La figura muestra el esquema de un espectrómetro de masas. Tenemos un ion de cloro (' + M(r`\text{Cl}^+`) + ') que sale de la fuente de iones hacia el selector de velocidades. En el selector de velocidades hay un campo eléctrico generado por las placas cargadas y un campo magnético externo ' + M(r`\vec B_1`) + ', en sentido hacia fuera del papel.'),
               img('fis26-s5-e2', 893, 694, 'Espectròmetre de masses: selector de velocitats amb B1 i semicercle d’amplada d dins B2', 'Espectrómetro de masas: selector de velocidades con B1 y semicircunferencia de diámetro d dentro de B2'),
               DAT(ECON + '; massa de l’ió ' + M(r`\text{Cl}^+`) + ': ' + M(r`5{,}81\cdot10^{-26}\ \text{kg}`) + '.', ECON + '; masa del ion ' + M(r`\text{Cl}^+`) + ': ' + M(r`5{,}81\cdot10^{-26}\ \text{kg}`) + '.')),
      parts: [
        part('2.1', T('Volem que els ions surtin del selector de velocitats a una velocitat de ' + M(r`4{,}00\cdot10^{4}\ \text{m s}^{-1}`) + '. Dibuixeu el diagrama de les forces que actuen sobre l’ió ' + M(r`\text{Cl}^+`) + ' dins el selector de velocitats. Si el voltatge aplicat a les plaques, que estan separades a una distància de 20,0 mm, és de 500 V, quin valor ha de tenir el mòdul del camp magnètic ' + M('B_1') + ' perquè els ions surtin a la velocitat desitjada?',
                      'Queremos que los iones salgan del selector de velocidades a una velocidad de ' + M(r`4{,}00\cdot10^{4}\ \text{m s}^{-1}`) + '. Dibuje el diagrama de las fuerzas que actúan sobre el ion ' + M(r`\text{Cl}^+`) + ' dentro del selector de velocidades. Si el voltaje aplicado a las placas, que están separadas a una distancia de 20,0 mm, es de 500 V, ¿qué valor debe tener el módulo del campo magnético ' + M('B_1') + ' para que los iones salgan a la velocidad deseada?'),
          [
            p('Sobre l’ió (càrrega positiva) actuen dues forces: l’<b>elèctrica</b> ' + M(r`\vec F_E=q\vec E`) + ', en el sentit del camp (cap a la placa negativa, a dalt), i la <b>magnètica</b> ' + M(r`\vec F_B=q\,\vec v\times\vec B_1`) + ': amb ' + M(r`\vec v`) + ' cap a la dreta i ' + M(r`\vec B_1`) + ' cap enfora, ' + M(r`\vec v\times\vec B_1`) + ' apunta cap avall. Han de ser iguals i oposades perquè l’ió no es desviï.',
              'Sobre el ion (carga positiva) actúan dos fuerzas: la <b>eléctrica</b> ' + M(r`\vec F_E=q\vec E`) + ', en el sentido del campo (hacia la placa negativa, arriba), y la <b>magnética</b> ' + M(r`\vec F_B=q\,\vec v\times\vec B_1`) + ': con ' + M(r`\vec v`) + ' hacia la derecha y ' + M(r`\vec B_1`) + ' hacia fuera, ' + M(r`\vec v\times\vec B_1`) + ' apunta hacia abajo. Tienen que ser iguales y opuestas para que el ion no se desvíe.'),
            figL(selector),
            F(r`E=\dfrac{\Delta V}{d}=\dfrac{500}{0{,}0200}=2{,}50\cdot10^{4}\ \text{V/m}`),
            F(r`qE=qvB_1\ \Rightarrow\ B_1=\dfrac{E}{v}=\dfrac{2{,}50\cdot10^{4}}{4{,}00\cdot10^{4}}`),
            AN(r`B_1=0{,}625\ \text{T}`),
          ]),
        part('2.2', T('Posteriorment, els ions entren per una escletxa en una zona on només hi ha un camp magnètic ' + M(r`B_2`) + ', de mòdul 0,30 T, en sentit enfora del paper. A quina distància ' + M('d') + ' de l’escletxa impactarà l’ió ' + M(r`\text{Cl}^+`) + '? Calculeu també quin serà l’increment de l’energia cinètica de l’ió des que surt del selector de velocitats fins que impacta a la placa.',
                      'Posteriormente, los iones entran por una rendija en una zona donde solo hay un campo magnético ' + M(r`B_2`) + ', de módulo 0,30 T, en sentido hacia fuera del papel. ¿A qué distancia ' + M('d') + ' de la rendija impactará el ion ' + M(r`\text{Cl}^+`) + '? Calcule también cuál será el incremento de la energía cinética del ion desde que sale del selector de velocidades hasta que impacta en la placa.'),
          [
            p('La força magnètica és perpendicular a la velocitat i de mòdul constant: fa de força centrípeta i l’ió descriu una <b>semicircumferència</b> (moviment circular uniforme):', 'La fuerza magnética es perpendicular a la velocidad y de módulo constante: hace de fuerza centrípeta y el ion describe una <b>semicircunferencia</b> (movimiento circular uniforme):'),
            F(r`qvB_2=m\dfrac{v^2}{R}\ \Rightarrow\ R=\dfrac{m v}{qB_2}=\dfrac{5{,}81\cdot10^{-26}\cdot4{,}00\cdot10^{4}}{1{,}602\cdot10^{-19}\cdot0{,}30}=4{,}84\cdot10^{-2}\ \text{m}`),
            F(r`d=2R=9{,}67\cdot10^{-2}\ \text{m}`),
            p('Com que ' + M(r`\vec F\perp\vec v`) + ' en tot moment, la força magnètica <b>no fa treball</b>: el mòdul de la velocitat no canvia.', 'Como ' + M(r`\vec F\perp\vec v`) + ' en todo momento, la fuerza magnética <b>no hace trabajo</b>: el módulo de la velocidad no cambia.'),
            ans('Impacta a <b>' + M(r`d=9{,}67\cdot10^{-2}\ \text{m}`) + '</b> (≈ 9,7 cm) de l’escletxa i <b>' + M(r`\Delta E_c=0`) + '</b>.', 'Impacta a <b>' + M(r`d=9{,}67\cdot10^{-2}\ \text{m}`) + '</b> (≈ 9,7 cm) de la rendija y <b>' + M(r`\Delta E_c=0`) + '</b>.'),
          ]),
      ] },

    { n: 3, pts: 2.5, topic: TOP.o, choose: true, opts: [
      { k: 'A',
        intro: J(p('Un raspall de dents elèctric es pot fer servir com un oscil·lador harmònic per a generar ones estacionàries en una corda. L’eix oscil·lador del raspall vibra amb una freqüència de 357 Hz. Si lliguem una corda elàstica a l’eix oscil·lador, engeguem el raspall i anem deixant anar corda i jugant amb la tensió que fem amb la mà, anirem observant diferents harmònics.',
                   'Un cepillo de dientes eléctrico se puede usar como un oscilador armónico para generar ondas estacionarias en una cuerda. El eje oscilador del cepillo vibra con una frecuencia de 357 Hz. Si atamos una cuerda elástica al eje oscilador, ponemos en marcha el cepillo y vamos soltando cuerda y jugando con la tensión que hacemos con la mano, iremos observando diferentes armónicos.'),
                 img('fis26-s5-e3a', 1100, 636, 'Corda elàstica lligada a l’eix d’un raspall de dents elèctric amb una ona estacionària', 'Cuerda elástica atada al eje de un cepillo de dientes eléctrico con una onda estacionaria')),
        parts: [
          part('3.1', T('Quin harmònic hi ha representat a la imatge de dalt? Per a l’harmònic representat, calculeu la longitud d’ona i la velocitat de propagació. Indiqueu en quina posició es troben els nodes i els ventres si la separació entre el primer i l’últim node és de 36,0 cm.',
                        '¿Qué armónico hay representado en la imagen de arriba? Para el armónico representado, calcule la longitud de onda y la velocidad de propagación. Indique en qué posición se encuentran los nodos y los vientres si la separación entre el primer y el último nodo es de 36,0 cm.'),
            [
              p('A la imatge es compten <b>5 nodes i 4 ventres</b>: hi caben 4 «fusos» (mitges longituds d’ona), és a dir, és el <b>quart harmònic</b> (' + M('n=4') + ').', 'En la imagen se cuentan <b>5 nodos y 4 vientres</b>: caben 4 «husos» (medias longitudes de onda), es decir, es el <b>cuarto armónico</b> (' + M('n=4') + ').'),
              p('Entre el primer i l’últim node hi ha 4 mitges longituds d’ona (' + M('2\\lambda') + '):', 'Entre el primer y el último nodo hay 4 medias longitudes de onda (' + M('2\\lambda') + '):'),
              F(r`2\lambda=0{,}360\ \text{m}\ \Rightarrow\ \lambda=0{,}180\ \text{m},\qquad v=\lambda f=0{,}180\cdot357=64{,}3\ \text{m/s}`),
              p('Els nodes estan separats ' + M(r`\lambda/2=0{,}090\ \text{m}`) + ' i cada ventre és a mig camí entre dos nodes (comptant des del primer node):', 'Los nodos están separados ' + M(r`\lambda/2=0{,}090\ \text{m}`) + ' y cada vientre está a medio camino entre dos nodos (contando desde el primer nodo):'),
              ul(T('Nodes: ' + M(r`x=0;\ 0{,}090;\ 0{,}180;\ 0{,}270;\ 0{,}360\ \text{m}`) + '.', 'Nodos: ' + M(r`x=0;\ 0{,}090;\ 0{,}180;\ 0{,}270;\ 0{,}360\ \text{m}`) + '.'),
                T('Ventres: ' + M(r`x=0{,}045;\ 0{,}135;\ 0{,}225;\ 0{,}315\ \text{m}`) + '.', 'Vientres: ' + M(r`x=0{,}045;\ 0{,}135;\ 0{,}225;\ 0{,}315\ \text{m}`) + '.')),
              figL(standing),
              ans('<b>Quart harmònic</b>; <b>' + M(r`\lambda=0{,}180\ \text{m}`) + '</b>; <b>' + M(r`v=64{,}3\ \text{m/s}`) + '</b>.', '<b>Cuarto armónico</b>; <b>' + M(r`\lambda=0{,}180\ \text{m}`) + '</b>; <b>' + M(r`v=64{,}3\ \text{m/s}`) + '</b>.'),
            ]),
          part('3.2', T('L’eix del raspall de dents oscil·la lateralment amb un moviment harmònic simple. Tenint en compte que l’amplitud del moviment és de 0,50 mm i el moviment comença quan l’eix metàl·lic es troba en el punt de màxim desplaçament, escriviu l’equació de la posició de l’eix metàl·lic del raspall de dents. Representeu gràficament a la quadrícula de sota un període complet del moviment.',
                        'El eje del cepillo de dientes oscila lateralmente con un movimiento armónico simple. Teniendo en cuenta que la amplitud del movimiento es de 0,50 mm y el movimiento comienza cuando el eje metálico se encuentra en el punto de máximo desplazamiento, escriba la ecuación de la posición del eje metálico del cepillo de dientes. Represente gráficamente en la cuadrícula de abajo un periodo completo del movimiento.'),
            [
              p(M(r`\omega=2\pi f=2\pi\cdot357=714\pi\approx2\,240\ \text{rad/s}`) + ', ' + M(r`A=5{,}0\cdot10^{-4}\ \text{m}`) + '. Si en ' + M('t=0') + ' és a la posició màxima, ' + M('x(0)=A') + ', el més senzill és un cosinus:', M(r`\omega=2\pi f=2\pi\cdot357=714\pi\approx2\,240\ \text{rad/s}`) + ', ' + M(r`A=5{,}0\cdot10^{-4}\ \text{m}`) + '. Si en ' + M('t=0') + ' está en la posición máxima, ' + M('x(0)=A') + ', lo más sencillo es un coseno:'),
              F(r`x(t)=5{,}0\cdot10^{-4}\cos(2\,240\,t)\ \ \text{(m)}\qquad\Big[=5{,}0\cdot10^{-4}\sin\big(2\,240\,t+\tfrac\pi2\big)\Big]`),
              p('Període: ' + M(r`T=\dfrac1f=\dfrac1{357}=2{,}80\cdot10^{-3}\ \text{s}`) + ' (màxim a 0, zero a ' + M('T/4') + ', mínim a ' + M('T/2') + ', zero a ' + M('3T/4') + ' i màxim a ' + M('T') + '):', 'Periodo: ' + M(r`T=\dfrac1f=\dfrac1{357}=2{,}80\cdot10^{-3}\ \text{s}`) + ' (máximo en 0, cero en ' + M('T/4') + ', mínimo en ' + M('T/2') + ', cero en ' + M('3T/4') + ' y máximo en ' + M('T') + '):'),
              shmGraph,
            ]),
        ] },
      { k: 'B',
        intro: J(p('La fibra òptica ens permet disposar de comunicació per Internet d’alta velocitat a casa. La fibra òptica consisteix en un filament flexible de secció circular a través del qual es transmeten polsos de llum, que es transmeten a còpia de reflectir-se a les parets internes del filament. Un raig de llum, de longitud d’ona en el buit ' + M(r`\lambda_0=650\ \text{nm}`) + ', incideix des de l’aire sobre l’extrem d’una fibra òptica i forma un angle ' + M(r`\varphi`) + ' amb l’eix de la fibra (vegeu la figura). L’índex de refracció dins la fibra és ' + M(r`n_1=1{,}48`) + '.',
                   'La fibra óptica nos permite disponer de comunicación por Internet de alta velocidad en casa. La fibra óptica consiste en un filamento flexible de sección circular a través del cual se transmiten pulsos de luz, que se transmiten a base de reflejarse en las paredes internas del filamento. Un rayo de luz, de longitud de onda en el vacío ' + M(r`\lambda_0=650\ \text{nm}`) + ', incide desde el aire sobre el extremo de una fibra óptica y forma un ángulo ' + M(r`\varphi`) + ' con el eje de la fibra (véase la figura). El índice de refracción dentro de la fibra es ' + M(r`n_1=1{,}48`) + '.'),
                 img('fis26-s5-e3b', 992, 422, 'Raig que entra a la fibra amb angle φ, es refracta i arriba al punt P de la interfície amb el revestiment (n2) amb angle θL', 'Rayo que entra en la fibra con ángulo φ, se refracta y llega al punto P de la interfaz con el revestimiento (n2) con ángulo θL'),
                 DAT(CC + '; ' + M(r`n_{aire}=1{,}00`) + '.', CC + '; ' + M(r`n_{aire}=1{,}00`) + '.')),
        parts: [
          part('3.1', T('Quina és la freqüència de la llum incident? Calculeu la velocitat de propagació de la llum dins de la fibra òptica. Calculeu també la longitud d’ona de la llum dins la fibra òptica.',
                        '¿Cuál es la frecuencia de la luz incidente? Calcule la velocidad de propagación de la luz dentro de la fibra óptica. Calcule también la longitud de onda de la luz dentro de la fibra óptica.'),
            [
              p('La freqüència no canvia en canviar de medi; es calcula amb la velocitat de la llum i la longitud d’ona al buit:', 'La frecuencia no cambia al cambiar de medio; se calcula con la velocidad de la luz y la longitud de onda en el vacío:'),
              F(r`f=\dfrac{c}{\lambda_0}=\dfrac{3{,}00\cdot10^{8}}{650\cdot10^{-9}}=4{,}62\cdot10^{14}\ \text{Hz}`),
              F(r`v=\dfrac{c}{n_1}=\dfrac{3{,}00\cdot10^{8}}{1{,}48}=2{,}03\cdot10^{8}\ \text{m/s}`),
              F(r`\lambda=\dfrac{v}{f}=\dfrac{\lambda_0}{n_1}=\dfrac{650}{1{,}48}=439\ \text{nm}`),
            ]),
          part('3.2', T('La fibra està recoberta d’un material que té un índex de refracció ' + M(r`n_2=1{,}44`) + '. Calculeu quin valor ha de tenir l’angle límit ' + M(r`\theta_L`) + ' perquè es produeixi una reflexió total interna al punt ' + M('P') + '. Quin és el valor de l’angle ' + M(r`\varphi`) + ' en aquest cas?',
                        'La fibra está recubierta de un material que tiene un índice de refracción ' + M(r`n_2=1{,}44`) + '. Calcule qué valor debe tener el ángulo límite ' + M(r`\theta_L`) + ' para que se produzca una reflexión total interna en el punto ' + M('P') + '. ¿Cuál es el valor del ángulo ' + M(r`\varphi`) + ' en este caso?'),
            [
              p('Angle límit (refracció a 90° a la interfície nucli–revestiment, angle respecte de la normal):', 'Ángulo límite (refracción a 90° en la interfaz núcleo–revestimiento, ángulo respecto de la normal):'),
              F(r`n_1\sin\theta_L=n_2\sin90^\circ\ \Rightarrow\ \theta_L=\arcsin\dfrac{n_2}{n_1}=\arcsin\dfrac{1{,}44}{1{,}48}=76{,}6^\circ`),
              p('A l’entrada, el raig es refracta amb un angle ' + M(r`\varphi'`) + ' respecte de l’eix; com que la normal a la interfície és perpendicular a l’eix, ' + M(r`\varphi'=90^\circ-\theta_L=13{,}4^\circ`) + '. Llei de Snell a l’entrada:', 'En la entrada, el rayo se refracta con un ángulo ' + M(r`\varphi'`) + ' respecto del eje; como la normal a la interfaz es perpendicular al eje, ' + M(r`\varphi'=90^\circ-\theta_L=13{,}4^\circ`) + '. Ley de Snell en la entrada:'),
              F(r`n_{aire}\sin\varphi=n_1\sin\varphi'\ \Rightarrow\ \sin\varphi=1{,}48\cdot\sin13{,}4^\circ=0{,}342\ \Rightarrow\ \varphi=20{,}0^\circ`),
              ans('<b>' + M(r`\theta_L=76{,}6^\circ`) + '</b>; per tenir reflexió total cal ' + M(r`\theta\ge\theta_L`) + ', és a dir, <b>' + M(r`\varphi\le20{,}0^\circ`) + '</b> (angle màxim d’entrada).', '<b>' + M(r`\theta_L=76{,}6^\circ`) + '</b>; para tener reflexión total hace falta ' + M(r`\theta\ge\theta_L`) + ', es decir, <b>' + M(r`\varphi\le20{,}0^\circ`) + '</b> (ángulo máximo de entrada).'),
            ]),
        ] },
    ] },

    { n: 4, pts: 2.5, topic: TOP.n,
      intro: J(p('Un dels accidents nuclears més importants dels darrers temps va ser el de Fukushima, l’11 de març de 2011. Les mesures de l’activitat radioactiva que es van fer al cap de cinc anys van mostrar que un tanc de ' + M(r`8{,}60\cdot10^{5}\ \text{m}^3`) + ' d’aigua contaminada amb triti radioactiu produïa una activitat de 760 TBq.',
                 'Uno de los accidentes nucleares más importantes de los últimos tiempos fue el de Fukushima, el 11 de marzo de 2011. Las medidas de la actividad radiactiva que se hicieron al cabo de cinco años mostraron que un tanque de ' + M(r`8{,}60\cdot10^{5}\ \text{m}^3`) + ' de agua contaminada con tritio radiactivo producía una actividad de 760 TBq.'),
               DAT('període de semidesintegració del triti: 4 500 dies.', 'periodo de semidesintegración del tritio: 4 500 días.')),
      parts: [
        part('4.1', T('Escriviu la reacció de desintegració del triti radioactiu, ' + M(r`{}^3_1\text{H}`) + ', si un dels productes de la reacció és heli-3, ' + M(r`{}^3_2\text{He}`) + '. Completeu la reacció nuclear amb totes les partícules que intervenen en el procés. Justifiqueu de quin tipus de decaïment radioactiu es tracta.',
                      'Escriba la reacción de desintegración del tritio radiactivo, ' + M(r`{}^3_1\text{H}`) + ', si uno de los productos de la reacción es helio-3, ' + M(r`{}^3_2\text{He}`) + '. Complete la reacción nuclear con todas las partículas que intervienen en el proceso. Justifique de qué tipo de decaimiento radiactivo se trata.'),
          [
            p('Es conserven el nombre màssic i la càrrega: ' + M(r`3=3+A`) + ' ⇒ ' + M('A=0') + '; ' + M(r`1=2+Z`) + ' ⇒ ' + M('Z=-1') + '. La partícula és un <b>electró</b>; per conservar el nombre leptònic, s’emet també un <b>antineutrí electrònic</b>.', 'Se conservan el número másico y la carga: ' + M(r`3=3+A`) + ' ⇒ ' + M('A=0') + '; ' + M(r`1=2+Z`) + ' ⇒ ' + M('Z=-1') + '. La partícula es un <b>electrón</b>; para conservar el número leptónico, se emite también un <b>antineutrino electrónico</b>.'),
            F(r`{}^{3}_{1}\text{H}\ \longrightarrow\ {}^{3}_{2}\text{He}+{}^{\ \,0}_{-1}e+\bar\nu_e`),
            ans('És una desintegració <b>' + M(r`\beta^-`) + '</b>: un neutró del nucli es converteix en protó emetent un electró i un antineutrí (el nombre atòmic puja d’1 i el màssic no canvia).', 'Es una desintegración <b>' + M(r`\beta^-`) + '</b>: un neutrón del núcleo se convierte en protón emitiendo un electrón y un antineutrino (el número atómico sube en 1 y el másico no cambia).'),
          ]),
        part('4.2', T('Determineu la constant de desintegració d’aquesta reacció. Quina era l’activitat original del tanc en el moment de l’accident? Si l’OMS recomana que l’activitat per triti per cada litre d’aigua no hauria de superar els ' + M(r`10^{7}\ \text{Bq m}^{-3}`) + ', quants anys des del dia de l’accident han de passar perquè l’aigua d’aquest tanc sigui segura? El Japó va proposar desfer-se d’aquesta aigua abocant-la en petites quantitats a l’oceà Pacífic. Expliqueu si aquesta proposta és raonable o bé implica un risc ambiental.',
                      'Determine la constante de desintegración de esta reacción. ¿Cuál era la actividad original del tanque en el momento del accidente? Si la OMS recomienda que la actividad por tritio por cada litro de agua no debería superar los ' + M(r`10^{7}\ \text{Bq m}^{-3}`) + ', ¿cuántos años desde el día del accidente tienen que pasar para que el agua de este tanque sea segura? Japón propuso deshacerse de esta agua vertiéndola en pequeñas cantidades en el océano Pacífico. Explique si esta propuesta es razonable o bien implica un riesgo ambiental.'),
          [
            F(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{\ln2}{4\,500\cdot86\,400}=1{,}78\cdot10^{-9}\ \text{s}^{-1}\ (=1{,}54\cdot10^{-4}\ \text{dies}^{-1})`),
            p('Activitat inicial: han passat ' + M(r`t=5\ \text{anys}=1{,}58\cdot10^{8}\ \text{s}`) + ' i ' + M(r`A=A_0e^{-\lambda t}`) + ':', 'Actividad inicial: han pasado ' + M(r`t=5\ \text{años}=1{,}58\cdot10^{8}\ \text{s}`) + ' y ' + M(r`A=A_0e^{-\lambda t}`) + ':'),
            F(r`A_0=A\,e^{\lambda t}=7{,}60\cdot10^{14}\,e^{1{,}78\cdot10^{-9}\cdot1{,}58\cdot10^{8}}=1{,}01\cdot10^{15}\ \text{Bq}`),
            p('Activitat màxima admissible al tanc: ' + M(r`A_{seg}=10^{7}\cdot8{,}60\cdot10^{5}=8{,}60\cdot10^{12}\ \text{Bq}`) + ':', 'Actividad máxima admisible en el tanque: ' + M(r`A_{seg}=10^{7}\cdot8{,}60\cdot10^{5}=8{,}60\cdot10^{12}\ \text{Bq}`) + ':'),
            F(r`t=\dfrac1\lambda\ln\dfrac{A_0}{A_{seg}}=\dfrac{1}{1{,}78\cdot10^{-9}}\ln\dfrac{1{,}01\cdot10^{15}}{8{,}60\cdot10^{12}}=2{,}67\cdot10^{9}\ \text{s}\approx84{,}7\ \text{anys}`),
            p('<b>Valoració de l’abocament:</b> no té una resposta única; cal que l’argument sigui coherent. En contra: en el moment de l’abocament l’activitat per unitat de volum és unes 100 vegades el valor recomanat (' + M(r`\sim10^{9}\ \text{Bq/m}^3`) + '), i segons la dispersió i els corrents poden aparèixer concentracions locals elevades que afectin el plàncton i la fauna marina, a més de la preocupació dels països veïns. A favor: l’oceà és una massa d’aigua enorme que dilueix el triti, i es faria en petites quantitats al llarg del temps.',
              '<b>Valoración del vertido:</b> no tiene una respuesta única; hace falta que el argumento sea coherente. En contra: en el momento del vertido la actividad por unidad de volumen es unas 100 veces el valor recomendado (' + M(r`\sim10^{9}\ \text{Bq/m}^3`) + '), y según la dispersión y las corrientes pueden aparecer concentraciones locales elevadas que afecten al plancton y a la fauna marina, además de la preocupación de los países vecinos. A favor: el océano es una masa de agua enorme que diluye el tritio, y se haría en pequeñas cantidades a lo largo del tiempo.'),
            ans('<b>' + M(r`\lambda=1{,}78\cdot10^{-9}\ \text{s}^{-1}`) + '</b>; <b>' + M(r`A_0=1{,}01\cdot10^{15}\ \text{Bq}`) + '</b>; l’aigua serà segura al cap d’uns <b>85 anys des de l’accident</b> (cap al 2096).', '<b>' + M(r`\lambda=1{,}78\cdot10^{-9}\ \text{s}^{-1}`) + '</b>; <b>' + M(r`A_0=1{,}01\cdot10^{15}\ \text{Bq}`) + '</b>; el agua será segura al cabo de unos <b>85 años desde el accidente</b> (hacia 2096).'),
          ]),
      ] },
  ],
};

module.exports = { years: [{ y: 2026, title: T('PAU 2026', 'PAU 2026'), series: [s1, s2, s5] }] };
