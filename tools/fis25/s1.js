/* PAU 2025 · Física · sèrie 1 (juliol) */
const L = require('./lib');
const { M, T, p, ans, ul, html, J, r, TOP, F, AN, DAT, fig, figL, img, SV, LN, AR, TX, DOT, RECT, PATH, L2, GC, MTc, ECON, MEC, part, RT6, plot } = L;

const millikan = lang => {
  const x0 = 50, x1 = 310, yt = 36, yb = 150, cx = 180, cy = 93;
  let E = ''; [90, 130, 230, 270].forEach(x => E += AR(x, yt + 14, x, yb - 14, 'vc2'));
  return SV(360, 190, L2(lang, 'Experiment de Millikan: gota d’oli en equilibri entre dues plaques, amb el pes cap avall, la força elèctrica cap amunt i el camp cap avall', 'Experimento de Millikan: gota de aceite en equilibrio entre dos placas, con el peso hacia abajo, la fuerza eléctrica hacia arriba y el campo hacia abajo'),
    RECT(x0, yt - 8, x1 - x0, 8) + RECT(x0, yb, x1 - x0, 8) + E + DOT(cx, cy, 7, 'pt2') +
    AR(cx, cy - 8, cx, cy - 46) + AR(cx, cy + 8, cx, cy + 46) +
    TX(cx + 12, cy - 30, 'F<tspan dy="3" font-size="9">e</tspan>', 'start') + TX(cx + 12, cy + 40, 'P', 'start') + TX(106, 96, 'E', 'start') + AR(x1 + 14, yt, x1 + 14, yb, 'vc2') + AR(x1 + 14, yb, x1 + 14, yt, 'vc2') +
    TX(x0 - 6, yt, '+', 'end') + TX(x0 - 6, yb + 8, '−', 'end') + TX(cx - 12, cy + 3, 'q<0', 'end') + TX(x1 + 22, 98, 'd', 'start'));
};
const loopBar = lang => {
  const xl = 90, xr = 250, yb = 150, ybar = 60;
  let dots = ''; for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) dots += DOT(70 + i * 50, 30 + j * 40, 2.2, 'pt2');
  return SV(360, 190, L2(lang, 'Circuit en U amb la barra mòbil: la força magnètica sobre la barra és cap amunt, oposada al moviment', 'Circuito en U con la barra móvil: la fuerza magnética sobre la barra es hacia arriba, opuesta al movimiento'),
    dots + PATH(`M${xl},20V${yb}H${xr}V20`, 'ln') + LN(xl - 14, ybar, xr + 14, ybar, 'ln') +
    AR(170, ybar + 40, 170, ybar + 80, 'vc2') + AR(210, ybar - 6, 210, ybar - 36) +
    TX(180, ybar + 94, 'v', 'start') + TX(222, ybar - 22, 'F', 'start') + TX(xl + 4, 140, 'I ↺', 'start') + TX(xr + 14, 176, L2(lang, 'B cap a fora ⊙', 'B hacia fuera ⊙'), 'end'));
};
const rays = lang => {
  const tc = Math.asin(1 / 1.58), x0 = 190, yc = 40, yf = 150, L1 = (yf - yc) * Math.tan(tc), xr = x0 + L1;
  return SV(360, 200, L2(lang, 'Raig que surt de la moneda i arriba a la cara frontal amb l’angle límit: incident, reflectit i refractat rasant', 'Rayo que sale de la moneda y llega a la cara frontal con el ángulo límite: incidente, reflejado y refractado rasante'),
    RECT(40, yc, 300, yf - yc, 'pl') + LN(x0, yc, x0, yf, 'dsh') + DOT(x0, yc + 2, 5, 'pt2') +
    LN(x0, yc, xr, yf, 'ln') + LN(xr, yf, xr + (yf - yc) * Math.tan(tc), yc, 'ln') + AR(xr, yf, xr + 62, yf, 'vc') +
    LN(xr, yf - 34, xr, yf + 20, 'dsh') +
    TX(x0 - 8, yc - 6, L2(lang, 'moneda', 'moneda'), 'end') + TX(x0 + 8, yf - 20, 'θ', 'start') + TX(xr + 66, yf - 6, L2(lang, 'refractat 90°', 'refractado 90°'), 'start') +
    TX((x0 + xr) / 2 - 24, 88, L2(lang, 'incident', 'incidente'), 'end') + TX(xr + 42, 96, L2(lang, 'reflectit', 'reflejado'), 'start') + TX(xr + 4, yf + 34, 'd', 'start') + AR(x0, yf + 16, xr, yf + 16, 'vc2'));
};
const wave = (lang, modes, openClosed) => {
  const w = 300, x0 = 30, y0 = 36, A = 22, rows = modes.length; let s = '';
  modes.forEach((m, i) => {
    const cy = y0 + i * 62; let d = '', d2 = '';
    for (let k = 0; k <= 120; k++) { const x = k / 120, y = openClosed ? Math.cos(m * Math.PI * x / 2) : Math.cos(m * Math.PI * x); d += (k ? 'L' : 'M') + (x0 + w * x).toFixed(1) + ',' + (cy - A * y).toFixed(1); d2 += (k ? 'L' : 'M') + (x0 + w * x).toFixed(1) + ',' + (cy + A * y).toFixed(1); }
    s += LN(x0, cy, x0 + w, cy, 'dsh') + PATH(d, 'c2') + PATH(d2, 'c2') + LN(x0, cy - A - 6, x0, cy + A + 6, 'ln');
    s += LN(x0 + w, cy - A - 6, x0 + w, cy + A + 6, openClosed ? 'ln' : 'dsh');
    if (!openClosed) s += LN(x0, cy - A - 6, x0, cy + A + 6, 'dsh');
  });
  return SV(360, rows * 62 + 10, L2(lang, 'Ones estacionàries al tub', 'Ondas estacionarias en el tubo'), s);
};

const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2025-fisica-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g,
      intro: J(p('La brossa espacial deixada per satèl·lits antics i els seus coets llançadors s’està convertint en un perill per a altres satèl·lits. Al novembre del 2023, durant unes tasques de reparació, dos astronautes es van deixar una caixa d’eines a l’exterior de l’Estació Espacial Internacional (ISS).',
                 'La basura espacial dejada por satélites antiguos y sus cohetes lanzadores se está convirtiendo en un peligro para otros satélites. En noviembre de 2023, durante unas tareas de reparación, dos astronautas se dejaron una caja de herramientas en el exterior de la Estación Espacial Internacional (EEI).'),
               DAT(GC + '; ' + MTc + '; ' + RT6 + '; ' + M(r`M_{\text{ISS}}=430\cdot10^{3}\ \text{kg}`) + '.', GC + '; ' + MTc + '; ' + RT6 + '; ' + M(r`M_{\text{EEI}}=430\cdot10^{3}\ \text{kg}`) + '.')),
      parts: [
        part('1.1', T('A partir de la llei de la gravitació universal, deduïu l’expressió de la velocitat orbital en funció del radi orbital. Calculeu la velocitat de la caixa d’eines en òrbita a 400 km per sobre de la superfície terrestre i el nombre de voltes que farà la caixa cada dia al voltant de la Terra.',
                      'A partir de la ley de gravitación universal, deduzca la expresión de la velocidad orbital en función del radio orbital. Calcule la velocidad de la caja de herramientas en órbita a 400 km por encima de la superficie terrestre y el número de vueltas que dará la caja cada día alrededor de la Tierra.'),
          [
            p('L’atracció gravitatòria fa de força centrípeta en l’òrbita circular:', 'La atracción gravitatoria hace de fuerza centrípeta en la órbita circular:'),
            F(r`G\dfrac{M_T\,m}{r^2}=m\dfrac{v^2}{r}\ \Rightarrow\ v=\sqrt{\dfrac{G\,M_T}{r}}`),
            p('El radi orbital és ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+4{,}00\cdot10^{5}=6{,}77\cdot10^{6}\ \text{m}`) + ':', 'El radio orbital es ' + M(r`r=R_T+h=6{,}37\cdot10^{6}+4{,}00\cdot10^{5}=6{,}77\cdot10^{6}\ \text{m}`) + ':'),
            F(r`v=\sqrt{\dfrac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}}{6{,}77\cdot10^{6}}}=7{,}68\cdot10^{3}\ \text{m/s}`),
            p('El període i les voltes per dia:', 'El periodo y las vueltas por día:'),
            F(r`T=\dfrac{2\pi r}{v}=\dfrac{2\pi\cdot6{,}77\cdot10^{6}}{7{,}68\cdot10^{3}}=5{,}54\cdot10^{3}\ \text{s}\ (92{,}4\ \text{min}),\qquad N=\dfrac{86\,400}{5\,540}=15{,}6`),
            ans('<b>' + M(r`v=7{,}68\ \text{km/s}`) + '</b> i unes <b>15,6 voltes al dia</b>.', '<b>' + M(r`v=7{,}68\ \text{km/s}`) + '</b> y unas <b>15,6 vueltas al día</b>.'),
          ]),
        part('1.2', T('El final de l’ISS està planificat per al 2031. De manera gradual i controlada s’abaixarà la seva òrbita fins als 280 km d’altura per sobre de la superfície terrestre. Calculeu l’energia mecànica de l’ISS en aquesta òrbita i justifiqueu-ne el signe. L’última tripulació abandonarà l’estació i, posteriorment, l’estació caurà des d’aquesta altura enmig de l’oceà Pacífic. Calculeu amb quina energia cinètica impactarà l’estació contra l’aigua, sense tenir en compte els efectes de l’atmosfera terrestre.',
                      'El fin de la EEI está planificado para el año 2031. De forma gradual y controlada se bajará su órbita hasta los 280 km de altura por encima de la superficie terrestre. Calcule la energía mecánica de la EEI en esta órbita y justifique su signo. La última tripulación abandonará la estación y, posteriormente, la estación caerá desde esta altura en medio del océano Pacífico. Calcule con qué energía cinética impactará la estación contra el agua, sin tener en cuenta los efectos de la atmósfera terrestre.'),
          [
            p('Ara ' + M(r`r=6{,}37\cdot10^{6}+2{,}80\cdot10^{5}=6{,}65\cdot10^{6}\ \text{m}`) + '. En una òrbita circular ' + M(r`E_c=\tfrac12 mv^2=\dfrac{GM_Tm}{2r}`) + ' i ' + M(r`U=-\dfrac{GM_Tm}{r}`) + ':', 'Ahora ' + M(r`r=6{,}37\cdot10^{6}+2{,}80\cdot10^{5}=6{,}65\cdot10^{6}\ \text{m}`) + '. En una órbita circular ' + M(r`E_c=\tfrac12 mv^2=\dfrac{GM_Tm}{2r}`) + ' y ' + M(r`U=-\dfrac{GM_Tm}{r}`) + ':'),
            F(r`E_m=E_c+U=-\dfrac{GM_Tm}{2r}=-\dfrac{6{,}67\cdot10^{-11}\cdot5{,}98\cdot10^{24}\cdot4{,}30\cdot10^{5}}{2\cdot6{,}65\cdot10^{6}}=-1{,}29\cdot10^{13}\ \text{J}`),
            p('<b>Signe negatiu:</b> l’estació està lligada a la Terra (no té prou energia per escapar-ne); l’òrbita és tancada.', '<b>Signo negativo:</b> la estación está ligada a la Tierra (no tiene energía suficiente para escapar); la órbita es cerrada.'),
            p('En la caiguda, sense atmosfera, l’energia mecànica es conserva: ' + M(r`E_m=E_c'+U(R_T)`) + ', amb ' + M(r`U(R_T)=-\dfrac{GM_Tm}{R_T}=-2{,}69\cdot10^{13}\ \text{J}`) + ':', 'En la caída, sin atmósfera, la energía mecánica se conserva: ' + M(r`E_m=E_c'+U(R_T)`) + ', con ' + M(r`U(R_T)=-\dfrac{GM_Tm}{R_T}=-2{,}69\cdot10^{13}\ \text{J}`) + ':'),
            F(r`E_c'=E_m-U(R_T)=-1{,}29\cdot10^{13}+2{,}69\cdot10^{13}=1{,}40\cdot10^{13}\ \text{J}`),
            ans('<b>' + M(r`E_m=-1{,}29\cdot10^{13}\ \text{J}`) + '</b> i <b>' + M(r`E_c'=1{,}40\cdot10^{13}\ \text{J}`) + '</b>. (Si es deixés caure des del repòs a aquesta altura, seria ' + M(r`GM_Tm(1/R_T-1/r)=1{,}13\cdot10^{12}\ \text{J}`) + '.)', '<b>' + M(r`E_m=-1{,}29\cdot10^{13}\ \text{J}`) + '</b> y <b>' + M(r`E_c'=1{,}40\cdot10^{13}\ \text{J}`) + '</b>. (Si se dejara caer desde el reposo a esta altura, sería ' + M(r`GM_Tm(1/R_T-1/r)=1{,}13\cdot10^{12}\ \text{J}`) + '.)'),
          ]),
      ] },

    { n: 2, pts: 2.5, topic: TOP.e, choose: true, opts: [
      { k: 'A',
        intro: J(p('L’experiment de Millikan va permetre determinar la càrrega de l’electró. El muntatge d’aquest experiment consta de dues plaques metàl·liques horitzontals, una sobre l’altra, separades verticalment per una distància <i>d</i> i connectades a una font de potencial elèctric regulable. A l’espai que hi ha entre les plaques s’introdueixen algunes gotetes d’oli carregades negativament. L’experiment consisteix a crear un camp elèctric entre les plaques i aconseguir una posició d’equilibri de les gotetes d’oli contrarestant-ne el pes.',
                   'El experimento de Millikan permitió determinar la carga del electrón. El montaje de este experimento consta de dos placas metálicas horizontales, una sobre la otra, separadas verticalmente por una distancia <i>d</i> y conectadas a una fuente de potencial eléctrico regulable. En el espacio que hay entre las placas se introducen algunas gotitas de aceite cargadas negativamente. El experimento consiste en crear un campo eléctrico entre las placas y conseguir una posición de equilibrio de las gotitas de aceite contrarrestando su peso.'),
                 DAT(ECON + '; ' + MEC + '; ' + M(r`g=9{,}8\ \text{m s}^{-2}`) + '. Volum d’una esfera: ' + M(r`\tfrac43\pi r^3`) + '.', ECON + '; ' + MEC + '; ' + M(r`g=9{,}8\ \text{m s}^{-2}`) + '. Volumen de una esfera: ' + M(r`\tfrac43\pi r^3`) + '.')),
        parts: [
          part('2.1', T('Feu un esquema del dispositiu emprat per Millikan, dibuixant-hi les forces que actuen sobre una gota d’oli esfèrica. Indiqueu i raoneu el signe de la càrrega que tindrà cada placa i la direcció i el sentit del camp elèctric que generen. Suposant que les plaques es connecten a un potencial elèctric de 2,00 kV i que la distància entre plaques és <i>d</i> = 2,00 cm, calculeu el camp elèctric creat entre plaques i dibuixeu-lo en el mateix esquema.',
                        'Realice un esquema del dispositivo empleado por Millikan, dibujando las fuerzas que actúan sobre una gota de aceite esférica. Indique y razone el signo de la carga que tendrá cada placa y la dirección y el sentido del campo eléctrico generado por ellas. Suponiendo que las placas se conectan a un potencial eléctrico de 2,00 kV y que la distancia entre placas es <i>d</i> = 2,00 cm, calcule el campo eléctrico creado entre placas y dibújelo en el mismo esquema.'),
            [
              p('Sobre la gota actuen el <b>pes</b> (cap avall) i la <b>força elèctrica</b>, que per estar en equilibri ha de ser <b>cap amunt</b>. Com que la càrrega és negativa, la força té sentit contrari al camp: el camp va <b>cap avall</b>, o sigui de la placa de dalt (<b>positiva</b>) a la de baix (<b>negativa</b>). El camp és vertical i uniforme.',
                'Sobre la gota actúan el <b>peso</b> (hacia abajo) y la <b>fuerza eléctrica</b>, que por estar en equilibrio debe ser <b>hacia arriba</b>. Como la carga es negativa, la fuerza tiene sentido contrario al campo: el campo va <b>hacia abajo</b>, es decir, de la placa superior (<b>positiva</b>) a la inferior (<b>negativa</b>). El campo es vertical y uniforme.'),
              figL(millikan),
              F(r`E=\dfrac{\Delta V}{d}=\dfrac{2{,}00\cdot10^{3}}{2{,}00\cdot10^{-2}}=1{,}00\cdot10^{5}\ \text{V/m}`),
              ans('<b>' + M(r`E=1{,}00\cdot10^{5}\ \text{V/m}`) + '</b>, vertical i cap avall.', '<b>' + M(r`E=1{,}00\cdot10^{5}\ \text{V/m}`) + '</b>, vertical y hacia abajo.'),
            ]),
          part('2.2', T('Tenint en compte que la densitat de l’oli és de 923 kg m<sup>−3</sup> i que el radi d’una gota és d’1,08 μm, calculeu la càrrega d’una gota que es troba en equilibri. Quants electrons calen per generar aquesta càrrega? Què s’observaria si il·luminéssim la gota amb raigs ultraviolats i aquesta perdés un electró? Justifiqueu la resposta.',
                        'Teniendo en cuenta que la densidad del aceite es de 923 kg m<sup>−3</sup> y que el radio de una gota es de 1,08 μm, calcule la carga de una gota que se encuentra en equilibrio. ¿Cuántos electrones son necesarios para generar esta carga? ¿Qué se observaría si ilumináramos la gota con rayos ultravioletas y esta perdiera un electrón? Justifique la respuesta.'),
            [
              F(r`m=\rho\,\tfrac43\pi r^3=923\cdot\tfrac43\pi(1{,}08\cdot10^{-6})^3=4{,}87\cdot10^{-15}\ \text{kg}`),
              p('Equilibri: ' + M('qE=mg') + ':', 'Equilibrio: ' + M('qE=mg') + ':'),
              F(r`|q|=\dfrac{mg}{E}=\dfrac{4{,}87\cdot10^{-15}\cdot9{,}8}{1{,}00\cdot10^{5}}=4{,}77\cdot10^{-19}\ \text{C},\qquad n=\dfrac{|q|}{|e|}=\dfrac{4{,}77\cdot10^{-19}}{1{,}602\cdot10^{-19}}\approx3`),
              p('<b>Si perd un electró</b> la càrrega passa de ' + M('-3e') + ' a ' + M('-2e') + ' (' + M(r`3{,}20\cdot10^{-19}\ \text{C}`) + '), i la força elèctrica baixa a ' + M(r`F_e=2eE=3{,}20\cdot10^{-14}\ \text{N}`) + ', menor que el pes ' + M(r`mg=4{,}77\cdot10^{-14}\ \text{N}`) + '. Hi ha una força neta cap avall (' + M(r`1{,}57\cdot10^{-14}\ \text{N}`) + '): la gota <b>deixa d’estar en equilibri i cau</b> accelerant cap avall, amb ' + M(r`a\approx3{,}2\ \text{m/s}^2`) + '.',
                '<b>Si pierde un electrón</b> la carga pasa de ' + M('-3e') + ' a ' + M('-2e') + ' (' + M(r`3{,}20\cdot10^{-19}\ \text{C}`) + '), y la fuerza eléctrica baja a ' + M(r`F_e=2eE=3{,}20\cdot10^{-14}\ \text{N}`) + ', menor que el peso ' + M(r`mg=4{,}77\cdot10^{-14}\ \text{N}`) + '. Hay una fuerza neta hacia abajo (' + M(r`1{,}57\cdot10^{-14}\ \text{N}`) + '): la gota <b>deja de estar en equilibrio y cae</b> acelerando hacia abajo, con ' + M(r`a\approx3{,}2\ \text{m/s}^2`) + '.'),
              ans('<b>' + M(r`q=-4{,}77\cdot10^{-19}\ \text{C}`) + '</b>, és a dir, <b>3 electrons</b> en excés.', '<b>' + M(r`q=-4{,}77\cdot10^{-19}\ \text{C}`) + '</b>, es decir, <b>3 electrones</b> en exceso.'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('Formem un circuit amb un cable metàl·lic en forma de U i en tanquem la part superior amb una barra metàl·lica que es pot lliscar lliurement, tal com mostra la figura. L’amplada de la U és de 0,25 m, i inicialment l’altura del circuit és de 0,30 m. A continuació, desplacem la barra cap avall a una velocitat constant de 5,00 m s<sup>−1</sup>. Aquest circuit es troba situat en una regió de l’espai on hi ha un camp magnètic de mòdul <i>B</i> = 2,00 T, perpendicular al pla que forma el circuit i amb sentit cap enfora del paper.',
                   'Formamos un circuito con un cable metálico en forma de U y cerramos la parte superior con una barra metálica que se puede deslizar libremente, tal como muestra la figura. La anchura de la U es de 0,25 m, e inicialmente la altura del circuito es de 0,30 m. A continuación, desplazamos la barra hacia abajo a una velocidad constante de 5,00 m s<sup>−1</sup>. Este circuito se encuentra situado en una región del espacio donde hay un campo magnético de módulo <i>B</i> = 2,00 T, perpendicular al plano que forma el circuito y con sentido hacia afuera del papel.'),
                 img('fis25-s1-e2b', 500, 594, 'Circuit en U amb una barra superior que baixa, camp magnètic cap enfora, amplada 0,25 m i altura 0,30 m', 'Circuito en U con una barra superior que baja, campo magnético hacia fuera, anchura 0,25 m y altura 0,30 m')),
        parts: [
          part('2.1', T('Calculeu l’expressió del flux magnètic del circuit en funció del temps i la força electromotriu induïda al circuit. Indiqueu el sentit de circulació del corrent induït i justifiqueu la resposta.',
                        'Calcule la expresión del flujo magnético del circuito en función del tiempo y la fuerza electromotriz inducida al circuito. Indique el sentido de circulación de la corriente inducida y justifique la respuesta.'),
            [
              p('L’altura del circuit disminueix: ' + M(r`h(t)=0{,}30-5{,}00\,t`) + '. El camp és perpendicular al pla, així que ' + M(r`\Phi=B\,S`) + ':', 'La altura del circuito disminuye: ' + M(r`h(t)=0{,}30-5{,}00\,t`) + '. El campo es perpendicular al plano, así que ' + M(r`\Phi=B\,S`) + ':'),
              F(r`\Phi(t)=B\cdot0{,}25\cdot(0{,}30-5{,}00\,t)=0{,}150-2{,}50\,t\ \ (\text{Wb})`),
              F(r`\varepsilon=-\dfrac{d\Phi}{dt}=+2{,}50\ \text{V}`),
              p('<b>Sentit (llei de Lenz):</b> el flux cap enfora <b>disminueix</b>, així que el corrent induït crea un camp que el reforça: cap enfora dins del circuit. Això correspon a un corrent en sentit <b>antihorari</b>.', '<b>Sentido (ley de Lenz):</b> el flujo hacia fuera <b>disminuye</b>, así que la corriente inducida crea un campo que lo refuerza: hacia fuera dentro del circuito. Eso corresponde a una corriente en sentido <b>antihorario</b>.'),
              AN(r`\Phi=0{,}150-2{,}50\,t\ \text{Wb};\quad\varepsilon=2{,}50\ \text{V}`),
            ]),
          part('2.2', T('Suposem que la barra presenta una resistència de 50,0 Ω i la resta del circuit no en presenta cap. Calculeu la intensitat elèctrica que circularà pel circuit. Calculeu la força magnètica que actua sobre la barra i representeu-la a la figura.',
                        'Supongamos que la barra presenta una resistencia de 50,0 Ω y el resto del circuito no presenta resistencia alguna. Calcule la intensidad eléctrica que circulará por el circuito. Calcule la fuerza magnética que actúa sobre la barra y represéntela en la figura.'),
            [
              F(r`I=\dfrac{\varepsilon}{R}=\dfrac{2{,}50}{50{,}0}=5{,}00\cdot10^{-2}\ \text{A}`),
              F(r`F=I\,L\,B=5{,}00\cdot10^{-2}\cdot0{,}25\cdot2{,}00=2{,}50\cdot10^{-2}\ \text{N}`),
              p('Amb el corrent antihorari, a la barra superior va cap a l’esquerra; ' + M(r`\vec F=I\,\vec L\times\vec B`) + ' apunta <b>cap amunt</b>: s’oposa al moviment (llei de Lenz).', 'Con la corriente antihoraria, en la barra superior va hacia la izquierda; ' + M(r`\vec F=I\,\vec L\times\vec B`) + ' apunta <b>hacia arriba</b>: se opone al movimiento (ley de Lenz).'),
              figL(loopBar),
              ans('<b>' + M(r`I=50{,}0\ \text{mA}`) + '</b> i <b>' + M(r`F=2{,}50\cdot10^{-2}\ \text{N}`) + '</b> cap amunt.', '<b>' + M(r`I=50{,}0\ \text{mA}`) + '</b> y <b>' + M(r`F=2{,}50\cdot10^{-2}\ \text{N}`) + '</b> hacia arriba.'),
            ]),
        ] },
    ] },

    { n: 3, pts: 2.5, topic: TOP.o, choose: true, opts: [
      { k: 'A',
        intro: J(p('En una exposició d’art hi ha una obra que consisteix en una moneda situada a l’interior d’un bloc massís de policarbonat transparent, just al centre de la cara posterior, tal com indica la figura. El bloc té forma d’ortoedre (de caixa de sabates) i un índex de refracció d’1,58. Una persona està observant l’obra des del punt mitjà de la cara oposada i arriba una segona persona i se situa a la dreta de la primera. Per a sorpresa seva, no veu la moneda de l’interior del bloc.',
                   'En una exposición de arte hay una obra que consiste en una moneda situada en el interior de un bloque macizo de policarbonato transparente, justo en el centro de la cara posterior, tal como indica la figura. El bloque tiene forma de ortoedro (de caja de zapatos) y un índice de refracción de 1,58. Una persona está observando la obra desde el punto medio de la cara opuesta y llega una segunda persona y se sitúa a la derecha de la primera. Para su sorpresa, no ve la moneda del interior del bloque.'),
                 img('fis25-s1-e3a', 577, 500, 'Bloc de policarbonat de 2 m de gruix i 4 m d’amplada amb la moneda al centre de la cara posterior i dues persones a la cara frontal', 'Bloque de policarbonato de 2 m de grosor y 4 m de anchura con la moneda en el centro de la cara posterior y dos personas en la cara frontal'),
                 DAT('índex de refracció de l’aire = 1.', 'índice de refracción del aire = 1.')),
        parts: [
          part('3.1', T('A partir de la llei de Snell, deduïu l’expressió de l’angle límit (o angle crític) en funció dels índexs de refracció dels dos medis. Calculeu l’angle límit amb les dades del problema. Justifiqueu si es podria donar aquest fenomen en el cas d’invertir-se els medis.',
                        'A partir de la ley de Snell, deduzca la expresión del ángulo límite (o ángulo crítico) en función de los índices de refracción de los dos medios. Calcule el ángulo límite con los datos del problema. Justifique si podría darse este fenómeno en el caso de invertirse los medios.'),
            [
              p('Llei de Snell: ' + M(r`n_1\sin\theta_1=n_2\sin\theta_2`) + '. L’angle límit és l’angle d’incidència ' + M(r`\theta_c`) + ' per al qual el raig refractat surt rasant (' + M(r`\theta_2=90^\circ`) + '), i només existeix si ' + M('n_1>n_2') + ':', 'Ley de Snell: ' + M(r`n_1\sin\theta_1=n_2\sin\theta_2`) + '. El ángulo límite es el ángulo de incidencia ' + M(r`\theta_c`) + ' para el que el rayo refractado sale rasante (' + M(r`\theta_2=90^\circ`) + '), y solo existe si ' + M('n_1>n_2') + ':'),
              F(r`n_1\sin\theta_c=n_2\sin90^\circ\ \Rightarrow\ \sin\theta_c=\dfrac{n_2}{n_1}`),
              F(r`\theta_c=\arcsin\dfrac{1}{1{,}58}=39{,}3^\circ`),
              p('<b>Medis invertits:</b> si la llum anés de l’aire (' + M('n=1') + ') al policarbonat (' + M('n=1{,}58') + '), caldria ' + M(r`\sin\theta=1{,}58>1`) + ', impossible. No hi ha angle límit i <b>no es pot produir reflexió total</b>: sempre hi ha raig refractat.', '<b>Medios invertidos:</b> si la luz fuera del aire (' + M('n=1') + ') al policarbonato (' + M('n=1{,}58') + '), haría falta ' + M(r`\sin\theta=1{,}58>1`) + ', imposible. No hay ángulo límite y <b>no puede producirse reflexión total</b>: siempre hay rayo refractado.'),
              AN(r`\theta_c=39{,}3^\circ`),
            ]),
          part('3.2', T('A quina distància màxima, <i>d</i>, s’hauria de col·locar la segona persona respecte de la primera per veure la moneda? Considereu un raig de llum que surt de la moneda i arriba a la interfície policarbonat-aire amb aquest angle límit i dibuixeu un esquema dels rajos incident, reflectit i refractat per a aquest cas.',
                        '¿A qué distancia máxima, <i>d</i>, debería colocarse la segunda persona respecto a la primera para ver la moneda? Considere un rayo de luz que sale de la moneda y llega a la interfaz de policarbonato-aire con este ángulo límite y dibuje un esquema de los rayos incidente, reflejado y refractado para este caso.'),
            [
              p('Només surten a l’aire els rajos que arriben a la cara frontal amb ' + M(r`\theta<\theta_c`) + '. El raig límit forma ' + M(r`\theta_c`) + ' amb la normal; amb el gruix ' + M(r`e=2{,}00\ \text{m}`) + ':', 'Solo salen al aire los rayos que llegan a la cara frontal con ' + M(r`\theta<\theta_c`) + '. El rayo límite forma ' + M(r`\theta_c`) + ' con la normal; con el grosor ' + M(r`e=2{,}00\ \text{m}`) + ':'),
              F(r`d_{\max}=e\,\tan\theta_c=2{,}00\cdot\tan39{,}3^\circ=1{,}63\ \text{m}`),
              figL(rays),
              p('Més lluny, l’angle d’incidència supera ' + M(r`\theta_c`) + ': hi ha reflexió total i la moneda no es veu (com li passa a la segona persona).', 'Más lejos, el ángulo de incidencia supera ' + M(r`\theta_c`) + ': hay reflexión total y la moneda no se ve (como le pasa a la segunda persona).'),
              AN(r`d_{\max}=1{,}63\ \text{m}`),
            ]),
        ] },
      { k: 'B',
        intro: J(p('Una flauta travessera és un tub metàl·lic obert pels dos extrems que té una longitud de 67,0 cm. El seu so abasta un extens interval de freqüències i és un instrument molt comú en orquestres.',
                   'Una flauta travesera es un tubo metálico abierto por los dos extremos que tiene una longitud de 67,0 cm. Su sonido abarca un extenso intervalo de frecuencias y es un instrumento muy común en orquestas.'),
                 DAT('velocitat del so a l’aire = ' + M(r`343\ \text{m s}^{-1}`) + '.', 'velocidad del sonido en el aire = ' + M(r`343\ \text{m s}^{-1}`) + '.')),
        parts: [
          part('3.1', T('Per tocar la nota més greu, el flautista ha de tapar amb els dits tots els forats laterals del tub. Calculeu les freqüències del primer i el tercer harmònics d’una flauta travessera en aquest cas. Dibuixeu aquests dos harmònics i calculeu per a cadascun la posició dels nodes i dels ventres respecte a un extrem de la flauta.',
                        'Para tocar la nota más grave, el flautista tiene que tapar con los dedos todos los agujeros laterales del tubo. Calcule las frecuencias del primer y el tercer armónicos de una flauta travesera en este caso. Dibuje estos dos armónicos y calcule para cada uno la posición de los nodos y los vientres respecto de un extremo de la flauta.'),
            [
              p('Tub obert per tots dos extrems: ventres de desplaçament a les extremitats, ' + M(r`L=n\dfrac{\lambda_n}{2}`) + ' i ' + M(r`f_n=\dfrac{n\,v}{2L}`) + ':', 'Tubo abierto por ambos extremos: vientres de desplazamiento en los extremos, ' + M(r`L=n\dfrac{\lambda_n}{2}`) + ' y ' + M(r`f_n=\dfrac{n\,v}{2L}`) + ':'),
              F(r`f_1=\dfrac{343}{2\cdot0{,}670}=256\ \text{Hz},\qquad f_3=3f_1=768\ \text{Hz}`),
              figL(lang => wave(lang, [1, 3], false)),
              ul(T('<b>1r harmònic</b> (' + M(r`\lambda=2L=1{,}34\ \text{m}`) + '): ventres a ' + M(r`x=0`) + ' i ' + M(r`x=0{,}670\ \text{m}`) + '; node a ' + M(r`x=0{,}335\ \text{m}`) + '.', '<b>1.º armónico</b> (' + M(r`\lambda=2L=1{,}34\ \text{m}`) + '): vientres en ' + M(r`x=0`) + ' y ' + M(r`x=0{,}670\ \text{m}`) + '; nodo en ' + M(r`x=0{,}335\ \text{m}`) + '.'),
                 T('<b>3r harmònic</b> (' + M(r`\lambda=2L/3=0{,}447\ \text{m}`) + '): ventres a ' + M(r`0;\ 0{,}223;\ 0{,}447;\ 0{,}670\ \text{m}`) + '; nodes a ' + M(r`0{,}112;\ 0{,}335;\ 0{,}558\ \text{m}`) + '.', '<b>3.er armónico</b> (' + M(r`\lambda=2L/3=0{,}447\ \text{m}`) + '): vientres en ' + M(r`0;\ 0{,}223;\ 0{,}447;\ 0{,}670\ \text{m}`) + '; nodos en ' + M(r`0{,}112;\ 0{,}335;\ 0{,}558\ \text{m}`) + '.')),
            ]),
          part('3.2', T('Tapem un dels extrems de la flauta de manera que aquesta es comporta com un tub amb un extrem obert i un de tancat. Dibuixeu l’ona estacionària corresponent al primer i al segon modes de vibració possibles i indiqueu-ne els nodes i els ventres. Calculeu la longitud d’ona i la freqüència d’aquests dos modes de vibració.',
                        'Tapamos uno de los extremos de la flauta de manera que esta se comporta como un tubo con un extremo abierto y uno cerrado. Dibuje la onda estacionaria correspondiente al primer y el segundo modos de vibración posibles e indique sus nodos y vientres. Calcule la longitud de onda y la frecuencia de estos dos modos de vibración.'),
            [
              p('A l’extrem tancat hi ha un <b>node</b> i a l’obert un <b>ventre</b>: ' + M(r`L=(2n-1)\dfrac{\lambda}{4}`) + ', amb ' + M(r`n=1,2`) + ' (només harmònics imparells).', 'En el extremo cerrado hay un <b>nodo</b> y en el abierto un <b>vientre</b>: ' + M(r`L=(2n-1)\dfrac{\lambda}{4}`) + ', con ' + M(r`n=1,2`) + ' (solo armónicos impares).'),
              F(r`\lambda_1=4L=2{,}68\ \text{m},\ f_1=\dfrac{v}{\lambda_1}=128\ \text{Hz}\qquad\lambda_2=\dfrac{4L}{3}=0{,}893\ \text{m},\ f_2=\dfrac{v}{\lambda_2}=384\ \text{Hz}`),
              figL(lang => wave(lang, [1, 3], true)),
              ul(T('<b>1r mode:</b> ventre a l’extrem obert, node a l’extrem tancat (' + M(r`x=0{,}670\ \text{m}`) + ').', '<b>1.er modo:</b> vientre en el extremo abierto, nodo en el extremo cerrado (' + M(r`x=0{,}670\ \text{m}`) + ').'),
                 T('<b>2n mode:</b> comptant des de l’extrem obert, ventres a ' + M(r`0;\ 0{,}447\ \text{m}`) + ' i nodes a ' + M(r`0{,}223;\ 0{,}670\ \text{m}`) + ' (extrem tancat).', '<b>2.º modo:</b> contando desde el extremo abierto, vientres en ' + M(r`0;\ 0{,}447\ \text{m}`) + ' y nodos en ' + M(r`0{,}223;\ 0{,}670\ \text{m}`) + ' (extremo cerrado).')),
              ans('<b>' + M(r`\lambda=2{,}68\ \text{m},\ f=128\ \text{Hz}`) + '</b> i <b>' + M(r`\lambda=0{,}893\ \text{m},\ f=384\ \text{Hz}`) + '</b>.', '<b>' + M(r`\lambda=2{,}68\ \text{m},\ f=128\ \text{Hz}`) + '</b> y <b>' + M(r`\lambda=0{,}893\ \text{m},\ f=384\ \text{Hz}`) + '</b>.'),
            ]),
        ] },
    ] },

    { n: 4, pts: 2.5, topic: TOP.n,
      intro: J(p('L’isòtop de sodi ' + M(r`{}^{24}_{11}\text{Na}`) + ' té un excés de neutrons i se sap que és un emissor beta.', 'El isótopo de sodio ' + M(r`{}^{24}_{11}\text{Na}`) + ' tiene un exceso de neutrones y se sabe que es un emisor beta.'),
               DAT('F (Z = 9), Ne (10), Na (11), Mg (12), Al (13).', 'F (Z = 9), Ne (10), Na (11), Mg (12), Al (13).')),
      parts: [
        part('4.1', T('Raoneu si el sodi 24 serà una font d’emissió d’electrons o de positrons. Escriviu la reacció de la desintegració beta del ' + M(r`{}^{24}_{11}\text{Na}`) + ' sense oblidar els neutrins o els antineutrins. Quin és l’altre nucleu resultant?',
                      'Razone si el sodio 24 será una fuente de emisión de electrones o de positrones. Escriba la reacción de la desintegración beta del ' + M(r`{}^{24}_{11}\text{Na}`) + ' sin olvidar los neutrinos o antineutrinos. ¿Cuál es el otro núcleo resultante?'),
          [
            p('Amb un excés de neutrons el nucli s’estabilitza convertint un neutró en protó: ' + M(r`n\to p+e^-+\bar\nu_e`) + '. És una <b>desintegració β<sup>−</sup></b>: emet <b>electrons</b> (i antineutrins). El nombre atòmic augmenta en 1 i el màssic es conserva:', 'Con demasiados neutrones el núcleo se estabiliza convirtiendo un neutrón en protón: ' + M(r`n\to p+e^-+\bar\nu_e`) + '. Es una <b>desintegración β<sup>−</sup></b>: emite <b>electrones</b> (y antineutrinos). El número atómico aumenta en 1 y el másico se conserva:'),
            F(r`{}^{24}_{11}\text{Na}\ \longrightarrow\ {}^{24}_{12}\text{Mg}+{}^{\ 0}_{-1}e+\bar\nu_e`),
            ans('L’altre nucleu és el <b>magnesi 24</b> (' + M(r`{}^{24}_{12}\text{Mg}`) + ', Z = 12).', 'El otro núcleo es el <b>magnesio 24</b> (' + M(r`{}^{24}_{12}\text{Mg}`) + ', Z = 12).'),
          ]),
        part('4.2', T('L’isòtop de sodi 24 té un període de semidesintegració de 15,0 h. Una solució salina amb àtoms de sodi 24 té una activitat inicial de 580 kBq. Aquesta solució s’injecta en un pacient i es dissol per tota la sang. Trobeu l’activitat de la solució injectada al cap de 10,0 h. Si al cap d’aquest temps en 1,00 mL de sang hi ha una activitat de 60,0 Bq, quin és el volum de sang del pacient?',
                      'El isótopo de sodio 24 tiene un periodo de semidesintegración de 15,0 h. Una solución salina con átomos de sodio 24 tiene una actividad inicial de 580 kBq. Esta solución se inyecta a un paciente y se disuelve por toda su sangre. Encuentre la actividad de la solución inyectada al cabo de 10,0 h. Si al cabo de este tiempo en 1,00 mL de sangre hay una actividad de 60,0 Bq, ¿cuál es el volumen de sangre del paciente?'),
          [
            F(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{0{,}693}{15{,}0}=4{,}62\cdot10^{-2}\ \text{h}^{-1}`),
            F(r`A=A_0\,e^{-\lambda t}=580\cdot e^{-0{,}0462\cdot10{,}0}=365\ \text{kBq}`),
            p('Tota l’activitat és a la sang, repartida de manera homogènia: ' + M(r`60{,}0\ \text{Bq/mL}`) + ':', 'Toda la actividad está en la sangre, repartida de forma homogénea: ' + M(r`60{,}0\ \text{Bq/mL}`) + ':'),
            F(r`V=\dfrac{365\cdot10^{3}\ \text{Bq}}{60{,}0\ \text{Bq/mL}}=6{,}09\cdot10^{3}\ \text{mL}`),
            ans('<b>' + M(r`A=365\ \text{kBq}`) + '</b> i <b>' + M(r`V\approx6{,}09\ \text{L}`) + '</b> de sang.', '<b>' + M(r`A=365\ \text{kBq}`) + '</b> y <b>' + M(r`V\approx6{,}09\ \text{L}`) + '</b> de sangre.'),
          ]),
      ] },
  ],
};
module.exports = s1;
