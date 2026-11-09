/* PAU 2024 · Física · sèrie 1 (juliol). Set problemes, se'n responen quatre. */
const L = require('../fis25/lib');
const { M, T, p, ans, ul, html, J, r, TOP, F, AN, DAT, fig, figL, img, SV, LN, AR, TX, DOT, RECT, PATH, L2, GC, ECON, MEC, HC, part, plot } = L;

const earth = lang => {
  const cx = 110, cy = 100, R = 58; let a = '';
  for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4, x = cx + (R + 38) * Math.cos(t), y = cy + (R + 38) * Math.sin(t), x2 = cx + (R + 6) * Math.cos(t), y2 = cy + (R + 6) * Math.sin(t); a += AR(x, y, x2, y2); }
  return SV(360, 210, L2(lang, 'Terra amb el camp elèctric dirigit cap al centre, perpendicular a la superfície; a la dreta, les forces sobre la gota', 'Tierra con el campo eléctrico dirigido hacia el centro, perpendicular a la superficie; a la derecha, las fuerzas sobre la gota'),
    `<circle class="bod" cx="${cx}" cy="${cy}" r="${R}"/>` + a + TX(cx, cy + 4, L2(lang, 'Terra (−)', 'Tierra (−)')) + TX(cx + R + 44, cy - R - 24, 'E', 'start') +
    DOT(285, 100, 8, 'pt2') + AR(285, 90, 285, 40) + AR(285, 110, 285, 160) + TX(295, 56, 'F<tspan dy="3" font-size="9">e</tspan>', 'start') + TX(295, 150, 'P', 'start') + TX(270, 104, 'q = −e', 'end'));
};
const rod = lang => SV(360, 220, L2(lang, 'Parallels: corrent cap amunt a la barra, electrons cap avall i línies de camp circulars antihoràries vistes des de dalt', 'Pararrayos: corriente hacia arriba en la barra, electrones hacia abajo y líneas de campo circulares antihorarias vistas desde arriba'),
  RECT(60, 20, 8, 180, 'pl') + AR(90, 170, 90, 120, 'vc2') + AR(46, 60, 46, 110) + TX(100, 150, L2(lang, 'electrons', 'electrones'), 'start') + TX(40, 56, 'I', 'end') +
  `<ellipse class="eq" cx="64" cy="150" rx="40" ry="12"/><ellipse class="eq" cx="64" cy="150" rx="76" ry="22"/><ellipse class="eq" cx="64" cy="150" rx="116" ry="32"/>` +
  AR(170, 160, 175, 160.3, 'vc') + TX(250, 120, L2(lang, 'línies de B (vistes des de dalt: antihoràries)', 'líneas de B (vistas desde arriba: antihorarias)'), 'middle'));

const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2024-fisica-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g,
      lead: p('<i>Cal respondre a QUATRE dels set problemes següents (cadascun val 2,5 punts).</i>', '<i>Hay que responder a CUATRO de los siete problemas siguientes (cada uno vale 2,5 puntos).</i>'),
      intro: J(p('BepiColombo és una missió espacial que té com a objectiu l’exploració de Mercuri. La missió va ser llançada el 2018 i arribarà el 2025. Un cop allà, posarà en òrbita dos satèl·lits al voltant del planeta. Un dels satèl·lits és el <i>Mercury Planetary Orbiter</i> (MPO), construït per l’Agència Espacial Europea, que orbitarà al voltant de Mercuri amb un radi orbital mitjà de 3 360 km.',
                 'BepiColombo es una misión espacial que tiene por objetivo la exploración de Mercurio. La misión fue lanzada en 2018, y llegará en 2025. Una vez allá, pondrá en órbita dos satélites alrededor del planeta. Uno de los satélites es el <i>Mercury Planetary Orbiter</i> (MPO), construido por la Agencia Espacial Europea, que orbitará alrededor de Mercurio con un radio orbital medio de 3 360 km.'),
               DAT(GC + '; ' + M(r`M_M=3{,}285\cdot10^{23}\ \text{kg}`) + '; any terrestre = 365,25 dies.', GC + '; ' + M(r`M_M=3{,}285\cdot10^{23}\ \text{kg}`) + '; año terrestre = 365,25 días.')),
      parts: [
        part('1.1', T('Considereu un satèl·lit que fa una òrbita circular al voltant de Mercuri. Deduïu l’expressió de la velocitat orbital del satèl·lit en funció del radi orbital i la massa de Mercuri (indiqueu clarament en quins principis o lleis físiques us basau per fer-ne la deducció). Amb aquesta expressió, calculeu la velocitat orbital del satèl·lit MPO mentre orbita al voltant de Mercuri. Calculeu quantes voltes haurà donat al planeta al cap d’un any terrestre.',
                      'Considere un satélite que realiza una órbita circular alrededor de Mercurio. Deduzca la expresión de la velocidad orbital del satélite en función del radio orbital y la masa de Mercurio (indique claramente en qué principios o leyes físicas se basa para hacer su deducción). Con esta expresión, calcule la velocidad orbital del satélite MPO mientras orbita alrededor de Mercurio. Calcule cuántas vueltas habrá dado al planeta al cabo de un año terrestre.'),
          [
            p('Es basa en la <b>llei de la gravitació universal</b> (força d’atracció) i en la <b>segona llei de Newton</b> aplicada a un moviment circular uniforme (la força gravitatòria és la centrípeta):', 'Se basa en la <b>ley de la gravitación universal</b> (fuerza de atracción) y en la <b>segunda ley de Newton</b> aplicada a un movimiento circular uniforme (la fuerza gravitatoria es la centrípeta):'),
            F(r`G\dfrac{M_M\,m}{r^2}=m\dfrac{v^2}{r}\ \Rightarrow\ v=\sqrt{\dfrac{G\,M_M}{r}}`),
            F(r`v=\sqrt{\dfrac{6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}}{3{,}36\cdot10^{6}}}=2{,}55\cdot10^{3}\ \text{m/s}`),
            F(r`T=\dfrac{2\pi r}{v}=\dfrac{2\pi\cdot3{,}36\cdot10^{6}}{2{,}55\cdot10^{3}}=8{,}27\cdot10^{3}\ \text{s},\qquad N=\dfrac{365{,}25\cdot86\,400}{8\,267}=3{,}82\cdot10^{3}\ \text{voltes}`),
            ans('<b>' + M(r`v=2{,}55\ \text{km/s}`) + '</b> i unes <b>3 820 voltes</b> en un any terrestre.', '<b>' + M(r`v=2{,}55\ \text{km/s}`) + '</b> y unas <b>3 820 vueltas</b> en un año terrestre.'),
          ]),
        part('1.2', T('A partir de l’expressió general de l’energia mecànica, obteniu l’equació d’aquesta per al cas particular d’un satèl·lit en òrbita circular (cal que l’equació final estigui expressada només en funció de <i>G</i>, el radi orbital i les masses del satèl·lit i del planeta). Un cop que el satèl·lit MPO estigui orbitant Mercuri, encara tindrà combustible per poder fer maniobres. Considereu que el combustible disponible pot proporcionar una energia de 4,5·10<sup>9</sup> J. Determineu el valor màxim que podria tenir la massa de l’MPO perquè amb l’energia disponible pogués escapar del camp gravitatori de Mercuri.',
                      'A partir de la expresión general de la energía mecánica, obtenga la ecuación de esta para el caso particular de un satélite en órbita circular (es necesario que la ecuación final solo esté expresada en función de <i>G</i>, el radio orbital y las masas del satélite y del planeta). Una vez que el satélite MPO esté orbitando Mercurio, todavía tendrá combustible para poder hacer maniobras. Considere que el combustible disponible puede proporcionar una energía de 4,5·10<sup>9</sup> J. Determine el valor máximo que podría tener la masa del MPO para que con la energía disponible pudiera escapar del campo gravitatorio de Mercurio.'),
          [
            p('Energia mecànica general: ' + M(r`E_m=\tfrac12 mv^2-\dfrac{GM_Mm}{r}`) + '. En òrbita circular ' + M(r`mv^2=\dfrac{GM_Mm}{r}`) + ', de manera que:', 'Energía mecánica general: ' + M(r`E_m=\tfrac12 mv^2-\dfrac{GM_Mm}{r}`) + '. En órbita circular ' + M(r`mv^2=\dfrac{GM_Mm}{r}`) + ', de modo que:'),
            F(r`E_m=\dfrac{GM_Mm}{2r}-\dfrac{GM_Mm}{r}=-\dfrac{G\,M_M\,m}{2\,r}`),
            p('Per escapar cal ' + M(r`E_m+E_{comb}\ge0`) + ' (energia mecànica final nul·la com a mínim):', 'Para escapar hace falta ' + M(r`E_m+E_{comb}\ge0`) + ' (energía mecánica final nula como mínimo):'),
            F(r`\dfrac{GM_Mm}{2r}\le E_{comb}\ \Rightarrow\ m\le\dfrac{2\,r\,E_{comb}}{GM_M}=\dfrac{2\cdot3{,}36\cdot10^{6}\cdot4{,}5\cdot10^{9}}{6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}}=1{,}38\cdot10^{3}\ \text{kg}`),
            ans('Massa màxima de l’MPO: <b>' + M(r`1{,}38\cdot10^{3}\ \text{kg}`) + '</b>.', 'Masa máxima del MPO: <b>' + M(r`1{,}38\cdot10^{3}\ \text{kg}`) + '</b>.'),
          ]),
      ] },

    { n: 2, pts: 2.5, topic: TOP.o,
      intro: p('Al laboratori dissenyem un experiment amb dues masses que realitzen moviments independents. La primera massa és de 0,5 kg i penja d’un moll vertical. La segona massa està subjecta a un disc vertical que gira a una velocitat angular de 6,41 rad/s i el centre d’aquesta massa és a una distància de 19 cm del centre del disc. Totes dues masses s’il·luminen lateralment i s’observa que les seves ombres segueixen exactament el mateix moviment harmònic simple. Per aconseguir-ho, deixem anar des de baix la massa del moll just en <i>t</i> = 0 s, moment en què la massa del disc també passa pel punt més baix de la rotació.',
               'En el laboratorio diseñamos un experimento con dos masas que realizan movimientos independientes. La primera masa es de 0,5 kg y cuelga de un muelle vertical. La segunda masa se encuentra sujeta a un disco vertical que gira a una velocidad angular de 6,41 rad/s y el centro de esta masa está a una distancia de 19 cm del centro del disco. Ambas masas se iluminan lateralmente y se observa que sus sombras siguen exactamente el mismo movimiento armónico simple. Para conseguirlo, soltamos desde abajo la masa del muelle justo en <i>t</i> = 0 s, momento en que la masa del disco también pasa por el punto más bajo de la rotación.'),
      parts: [
        part('2.1', T('Escriviu l’equació de la posició vertical de les ombres respecte al temps. Trobeu la constant elàstica del moll i l’energia mecànica del moviment harmònic simple.',
                      'Escriba la ecuación de la posición vertical de las sombras respecto al tiempo. Encuentre la constante elástica del muelle y la energía mecánica del movimiento armónico simple.'),
          [
            p('L’ombra de la massa del disc fa un MHS d’amplitud igual al radi de gir, ' + M('A=0{,}19\\ \\text{m}') + ', i pulsació ' + M(r`\omega=6{,}41\ \text{rad/s}`) + '. A ' + M('t=0') + ' és al punt més baix (origen a l’equilibri, eix cap amunt):', 'La sombra de la masa del disco hace un MAS de amplitud igual al radio de giro, ' + M('A=0{,}19\\ \\text{m}') + ', y pulsación ' + M(r`\omega=6{,}41\ \text{rad/s}`) + '. En ' + M('t=0') + ' está en el punto más bajo (origen en el equilibrio, eje hacia arriba):'),
            F(r`y(t)=-0{,}19\cos(6{,}41\,t)\ \ (\text{m})\ \ \Longleftrightarrow\ \ y=0{,}19\sin\!\big(6{,}41\,t-\tfrac\pi2\big)`),
            p('La massa del moll fa el mateix MHS, així que ' + M(r`\omega=\sqrt{k/m}`) + ':', 'La masa del muelle hace el mismo MAS, así que ' + M(r`\omega=\sqrt{k/m}`) + ':'),
            F(r`k=m\,\omega^2=0{,}5\cdot6{,}41^2=20{,}5\ \text{N/m},\qquad E_m=\tfrac12 kA^2=\tfrac12\cdot20{,}5\cdot0{,}19^2=0{,}371\ \text{J}`),
          ]),
        part('2.2', T('Calculeu l’equació de la velocitat i l’energia cinètica respecte al temps de la massa que penja del moll. Representeu a la quadrícula adjunta l’energia mecànica, l’energia potencial i l’energia cinètica en funció de la posició vertical per a la massa que penja del moll.',
                      'Calcule la ecuación de la velocidad y la energía cinética respecto al tiempo de la masa que cuelga del muelle. Represente en la cuadrícula adjunta la energía mecánica, la energía potencial y la energía cinética en función de la posición vertical para la masa que cuelga del muelle.'),
          [
            F(r`v(t)=\dfrac{dy}{dt}=0{,}19\cdot6{,}41\,\sin(6{,}41\,t)=1{,}22\,\sin(6{,}41\,t)\ \ (\text{m/s})`),
            F(r`E_c(t)=\tfrac12 m v^2=\tfrac12\cdot0{,}5\cdot1{,}22^2\sin^2(6{,}41\,t)=0{,}371\,\sin^2(6{,}41\,t)\ \ (\text{J})`),
            p('En funció de la posició (zero d’energia potencial a l’equilibri): ' + M(r`E_m=0{,}371\ \text{J}`) + ' constant, ' + M(r`E_p=\tfrac12 ky^2=10{,}3\,y^2`) + ' (paràbola) i ' + M(r`E_c=E_m-E_p`) + ' (paràbola invertida):', 'En función de la posición (cero de energía potencial en el equilibrio): ' + M(r`E_m=0{,}371\ \text{J}`) + ' constante, ' + M(r`E_p=\tfrac12 ky^2=10{,}3\,y^2`) + ' (parábola) y ' + M(r`E_c=E_m-E_p`) + ' (parábola invertida):'),
            fig(plot({ w: 350, h: 240, xr: [-0.22, 0.22], yr: [0, 0.42], tickx: [-0.19, -0.1, 0.1, 0.19], ticky: [0.1, 0.2, 0.3], hlines: [0.3708],
              curves: [{ f: y => 0.5 * 20.544 * y * y, dom: [-0.19, 0.19], k: 0 }, { f: y => 0.3708 - 0.5 * 20.544 * y * y, dom: [-0.19, 0.19], k: 1 }],
              labels: [[0.0, 0.395, 'Em = 0,371 J', 'middle'], [0.12, 0.1, 'Ep'], [-0.02, 0.2, 'Ec', 'end'], [0.215, 0.012, 'y (m)', 'end']],
              alt: 'Energia mecànica constant i paràboles de l’energia potencial i cinètica en funció de la posició' })),
          ]),
      ] },

    { n: 3, pts: 2.5, topic: TOP.e,
      intro: J(p('La superfície de la Terra és principalment aigua que conté ions en dissolució i que li fan adquirir una càrrega neta negativa. Es pot considerar que la Terra té un camp elèctric en punts pròxims a la seva superfície amb un mòdul constant de 150 N/C.',
                 'La superficie de la Tierra es principalmente agua que contiene iones en disolución y que le hacen adquirir una carga neta negativa. Se puede considerar que la Tierra tiene un campo eléctrico en puntos próximos a su superficie con un módulo constante de 150 N/C.'),
               DAT(M(r`R_T=6{,}37\cdot10^{6}\ \text{m}`) + '; ' + M(r`\rho_{aigua}=10^{3}\ \text{kg/m}^3`) + '; ' + M(r`m_e=9{,}11\cdot10^{-31}\ \text{kg}`) + '; ' + ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '; ' + M(r`g=9{,}81\ \text{m/s}^2`) + '.',
                   M(r`R_T=6{,}37\cdot10^{6}\ \text{m}`) + '; ' + M(r`\rho_{agua}=10^{3}\ \text{kg/m}^3`) + '; ' + M(r`m_e=9{,}11\cdot10^{-31}\ \text{kg}`) + '; ' + ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '; ' + M(r`g=9{,}81\ \text{m/s}^2`) + '.')),
      parts: [
        part('3.1', T('Dibuixeu l’esfera terrestre i representeu el camp elèctric al voltant de la superfície. Calculeu el valor de la càrrega total que produeix aquest camp elèctric. Per a això, considereu que el camp elèctric creat per una superfície esfèrica carregada uniformement és igual al generat per tota la càrrega situada al centre de l’esfera.',
                      'Dibuje la esfera terrestre y represente el campo eléctrico alrededor de la superficie. Calcule el valor de la carga total que produce este campo eléctrico. Para ello, considere que el campo eléctrico creado por una superficie esférica cargada uniformemente es igual al generado por toda la carga situada en el centro de la esfera.'),
          [
            p('La càrrega és negativa, així que el camp és <b>radial i dirigit cap al centre</b> de la Terra (a la figura, flechas cap a dins).', 'La carga es negativa, así que el campo es <b>radial y dirigido hacia el centro</b> de la Tierra (en la figura, flechas hacia dentro).'),
            figL(earth),
            F(r`|E|=\dfrac{k\,|Q|}{R_T^2}\ \Rightarrow\ |Q|=\dfrac{E\,R_T^2}{k}=\dfrac{150\cdot(6{,}37\cdot10^{6})^2}{8{,}99\cdot10^{9}}=6{,}77\cdot10^{5}\ \text{C}`),
            ans('<b>' + M(r`Q=-6{,}77\cdot10^{5}\ \text{C}`) + '</b>.', '<b>' + M(r`Q=-6{,}77\cdot10^{5}\ \text{C}`) + '</b>.'),
          ]),
        part('3.2', T('Calculeu el mòdul de la força elèctrica que produirà el camp elèctric sobre un electró lliure situat a prop de la superfície de la Terra. Calculeu la massa que ha de tenir una gota esfèrica d’aigua amb una càrrega extra d’un sol electró perquè el seu pes es compensi amb la força elèctrica. Elaboreu un esquema on es mostrin les forces que actuen sobre la gota. Calculeu el diàmetre d’aquesta gota d’aigua.',
                      'Calcule el módulo de la fuerza eléctrica que producirá el campo eléctrico sobre un electrón libre situado cerca de la superficie de la Tierra. Calcule la masa que debe tener una gota esférica de agua con una carga extra de un solo electrón para que su peso se compense con la fuerza eléctrica. Elabore un esquema donde se muestren las fuerzas que actúan sobre la gota. Calcule el diámetro de esta gota de agua.'),
          [
            F(r`F=|e|\,E=1{,}602\cdot10^{-19}\cdot150=2{,}40\cdot10^{-17}\ \text{N}`),
            p('Com que l’electró és negatiu, la força és contrària al camp: <b>cap amunt</b>, allunyant-lo de la Terra. Per a la gota: ' + M(r`m\,g=|e|\,E`) + ' (l’esquema anterior mostra el pes cap avall i la força elèctrica cap amunt):', 'Como el electrón es negativo, la fuerza es contraria al campo: <b>hacia arriba</b>, alejándolo de la Tierra. Para la gota: ' + M(r`m\,g=|e|\,E`) + ' (el esquema anterior muestra el peso hacia abajo y la fuerza eléctrica hacia arriba):'),
            F(r`m=\dfrac{|e|E}{g}=\dfrac{2{,}40\cdot10^{-17}}{9{,}81}=2{,}45\cdot10^{-18}\ \text{kg}`),
            F(r`V=\dfrac{m}{\rho}=2{,}45\cdot10^{-21}\ \text{m}^3,\qquad r=\sqrt[3]{\dfrac{3V}{4\pi}}=8{,}36\cdot10^{-8}\ \text{m}\ \Rightarrow\ d=2r=1{,}67\cdot10^{-7}\ \text{m}`),
            ans('<b>' + M(r`F=2{,}40\cdot10^{-17}\ \text{N}`) + '</b>; <b>' + M(r`m=2{,}45\cdot10^{-18}\ \text{kg}`) + '</b>; <b>' + M(r`d\approx0{,}17\ \mu\text{m}`) + '</b>.', '<b>' + M(r`F=2{,}40\cdot10^{-17}\ \text{N}`) + '</b>; <b>' + M(r`m=2{,}45\cdot10^{-18}\ \text{kg}`) + '</b>; <b>' + M(r`d\approx0{,}17\ \mu\text{m}`) + '</b>.'),
          ]),
      ] },

    { n: 4, pts: 2.5, topic: TOP.e,
      intro: J(p('Un parallamps és una barra metàl·lica vertical que atrau i dirigeix grans descàrregues de corrent cap al terra. La gran majoria de llamps núvol-terra són negatius, és a dir, són transferències de càrrega negativa del núvol cap al terra. En el moment de la descàrrega es crea un camp magnètic al voltant del parallamps que podem equiparar al creat per un fil de corrent infinit. El corrent màxim que pot assumir un parallamps és d’uns 100 kA.',
                 'Un pararrayos es una barra metálica vertical que atrae y dirige grandes descargas de corriente hacia el suelo. La gran mayoría de rayos nube-tierra son negativos, es decir, son transferencias de carga negativa de la nube hacia el suelo. En el momento de la descarga se crea un campo magnético alrededor del pararrayos que podemos equiparar al creado por un hilo de corriente infinita. La corriente máxima que puede asumir un pararrayos es de unos 100 kA.'),
               DAT('el mòdul del camp magnètic creat per un fil infinit és ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '; ' + ECON + '.', 'el módulo del campo magnético creado por un hilo infinito es ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '; ' + ECON + '.')),
      parts: [
        part('4.1', T('Calculeu el camp magnètic màxim que pot crear el parallamps a una distància de 10 cm. Feu un dibuix esquemàtic del parallamps indicant el sentit del moviment dels electrons, la intensitat de corrent i tres línies de camp magnètic. Justifiqueu el sentit de les línies de camp.',
                      'Calcule el campo magnético máximo que puede crear el pararrayos a una distancia de 10 cm. Realice un dibujo esquemático del pararrayos indicando el sentido del movimiento de los electrones, la intensidad de corriente y tres líneas de campo magnético. Justifique el sentido de las líneas de campo.'),
          [
            F(r`B=\dfrac{\mu_0I}{2\pi r}=\dfrac{4\pi\cdot10^{-7}\cdot10^{5}}{2\pi\cdot0{,}10}=0{,}200\ \text{T}`),
            p('Els electrons baixen (del núvol al terra); el <b>sentit convencional del corrent</b> és el contrari: <b>cap amunt</b>. Per la regla de la mà dreta (polze cap al corrent) les línies de camp són <b>circumferències concèntriques</b> al voltant de la barra, en sentit <b>antihorari</b> vistes des de dalt.', 'Los electrones bajan (de la nube al suelo); el <b>sentido convencional de la corriente</b> es el contrario: <b>hacia arriba</b>. Por la regla de la mano derecha (pulgar hacia la corriente) las líneas de campo son <b>circunferencias concéntricas</b> alrededor de la barra, en sentido <b>antihorario</b> vistas desde arriba.'),
            figL(rod),
            AN(r`B=0{,}200\ \text{T}`),
          ]),
        part('4.2', T('Representeu gràficament, a la quadrícula de baix, el mòdul d’aquest camp magnètic màxim en funció de la distància <i>r</i> al parallamps en l’interval 10 cm ≤ <i>r</i> ≤ 50 cm. Suposem que hi ha un electró que en el moment de la descàrrega es troba a 10 cm del parallamps i amb una velocitat de 10<sup>3</sup> m/s paral·lela al parallamps i cap al terra. Calculeu el mòdul de la força que crea el camp magnètic sobre l’electró i justifiqueu quina és la seva direcció i el seu sentit.',
                      'Represente gráficamente, en la cuadrícula de abajo, el módulo de este campo magnético máximo en función de la distancia <i>r</i> al pararrayos en el siguiente intervalo: 10 cm ≤ <i>r</i> ≤ 50 cm. Supongamos que hay un electrón que en el momento de la descarga se encuentra a 10 cm del pararrayos y con una velocidad de 10<sup>3</sup> m/s paralela al pararrayos y hacia el suelo. Calcule el módulo de la fuerza que crea el campo magnético sobre el electrón y justifique cuál es su dirección y su sentido.'),
          [
            p(M(r`B(r)=\dfrac{\mu_0I}{2\pi r}=\dfrac{0{,}020}{r}`) + ' (T, amb ' + M('r') + ' en m): una hipèrbola decreixent.', M(r`B(r)=\dfrac{\mu_0I}{2\pi r}=\dfrac{0{,}020}{r}`) + ' (T, con ' + M('r') + ' en m): una hipérbola decreciente.'),
            fig(plot({ w: 350, h: 230, xr: [0, 0.55], yr: [0, 0.23], tickx: [0.1, 0.2, 0.3, 0.4, 0.5], ticky: [0.05, 0.1, 0.15, 0.2], curves: [{ f: x => 0.02 / x, dom: [0.1, 0.5], k: 1 }],
              points: [[0.1, 0.2], [0.2, 0.1], [0.3, 0.0667], [0.4, 0.05], [0.5, 0.04]], labels: [[0.54, 0.012, 'r (m)', 'end'], [0.06, 0.22, 'B (T)']],
              alt: 'Camp magnètic en funció de la distància, de 0,20 T a 10 cm fins a 0,040 T a 50 cm' })),
            F(r`F=|e|\,v\,B=1{,}602\cdot10^{-19}\cdot10^{3}\cdot0{,}200=3{,}20\cdot10^{-17}\ \text{N}`),
            p('Direcció i sentit: ' + M(r`\vec F=q\,\vec v\times\vec B`) + ' amb ' + M('q<0') + '. Prenent l’electró a l’est del parallamps, ' + M(r`\vec B`) + ' apunta cap al nord (horitzontal) i ' + M(r`\vec v`) + ' cap avall; ' + M(r`\vec v\times\vec B`) + ' va cap a l’est i, per ser negativa la càrrega, ' + M(r`\vec F`) + ' va <b>cap a l’oest: horitzontal, perpendicular a ' + M(r`\vec v`) + ' i a ' + M(r`\vec B`) + ', i dirigida cap al parallamps</b> (l’electró baixant equival a un corrent cap amunt, paral·lel al del parallamps, i els dos s’atrauen).',
              'Dirección y sentido: ' + M(r`\vec F=q\,\vec v\times\vec B`) + ' con ' + M('q<0') + '. Tomando el electrón al este del pararrayos, ' + M(r`\vec B`) + ' apunta hacia el norte (horizontal) y ' + M(r`\vec v`) + ' hacia abajo; ' + M(r`\vec v\times\vec B`) + ' va hacia el este y, por ser negativa la carga, ' + M(r`\vec F`) + ' va <b>hacia el oeste: horizontal, perpendicular a ' + M(r`\vec v`) + ' y a ' + M(r`\vec B`) + ', y dirigida hacia el pararrayos</b> (el electrón bajando equivale a una corriente hacia arriba, paralela a la del pararrayos, y las dos se atraen).'),
          ]),
      ] },

    { n: 5, pts: 2.5, topic: TOP.o,
      intro: J(p('L’Ainhoa està intrigada per saber a quina altura exploten els coets llançats a la revetlla de Sant Joan. Per poder-ho determinar se situa a una distància de 50 metres del punt on es llancen els coets i registra, amb un sonòmetre, un nivell d’intensitat sonora de 100 decibels en l’explosió d’un coet que no ha enlairat.',
                 'Ainhoa está intrigada por saber a qué altura explotan los cohetes lanzados en la verbena de San Juan. Para poder determinarlo se sitúa a una distancia de 50 metros del punto donde se lanzan los cohetes y registra, con un sonómetro, un nivel de intensidad sonora de 100 decibelios en la explosión de un cohete que no ha despegado.'),
               p('<i>Nota: considereu que les ones sonores es propaguen en les tres dimensions de l’espai i la seva energia es distribueix en superfícies esfèriques.</i>', '<i>Nota: considere que las ondas sonoras se propagan en las tres dimensiones del espacio y su energía se distribuye en superficies esféricas.</i>'),
               DAT(M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '; velocitat del so a l’aire: 340 m/s; superfície esfèrica: ' + M(r`4\pi r^2`) + '.', M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '; velocidad del sonido en el aire: 340 m/s; superficie esférica: ' + M(r`4\pi r^2`) + '.')),
      parts: [
        part('5.1', T('Quina potència sonora emet el coet en el moment de l’explosió? Si l’explosió ha durat 0,03 s, quina energia sonora s’ha alliberat?',
                      '¿Qué potencia sonora emite el cohete en el momento de la explosión? Si la explosión ha durado 0,03 s, ¿qué energía sonora se ha liberado?'),
          [
            F(r`\beta=10\log\dfrac{I}{I_0}\ \Rightarrow\ I=I_0\,10^{\beta/10}=10^{-12}\cdot10^{10}=1{,}0\cdot10^{-2}\ \text{W/m}^2`),
            F(r`P=I\cdot4\pi r^2=10^{-2}\cdot4\pi\cdot50^2=314\ \text{W},\qquad E=P\,t=314\cdot0{,}03=9{,}42\ \text{J}`),
            ans('<b>' + M(r`P=314\ \text{W}`) + '</b> i <b>' + M(r`E=9{,}4\ \text{J}`) + '</b>.', '<b>' + M(r`P=314\ \text{W}`) + '</b> y <b>' + M(r`E=9{,}4\ \text{J}`) + '</b>.'),
          ]),
        part('5.2', T('Des de la mateixa distància al punt de llançament, registra 90 decibels d’intensitat sonora en el cas d’un coet igual a l’anterior que ha enlairat verticalment i ha explotat a una certa altura. Calculeu a quina altura ha explotat el coet. Si dos coets idèntics a l’anterior exploten simultàniament a la mateixa altura que abans, quin nivell d’intensitat sonora percebrà l’Ainhoa, si està situada a la mateixa posició d’abans?',
                      'Desde la misma distancia al punto de lanzamiento, registra 90 decibelios de intensidad sonora en el caso de un cohete igual al anterior que ha despegado verticalmente y ha explotado a cierta altura. Calcule a qué altura ha explotado el cohete. Si dos cohetes idénticos al anterior explotan simultáneamente a la misma altura que antes, ¿qué nivel de intensidad sonora percibirá Ainhoa, si está situada en la misma posición de antes?'),
          [
            p('Ara ' + M(r`I'=10^{-12}\cdot10^{9}=10^{-3}\ \text{W/m}^2`) + '. La distància <i>d</i> a l’explosió surt de ' + M(r`I'=\dfrac{P}{4\pi d^2}`) + ':', 'Ahora ' + M(r`I'=10^{-12}\cdot10^{9}=10^{-3}\ \text{W/m}^2`) + '. La distancia <i>d</i> a la explosión sale de ' + M(r`I'=\dfrac{P}{4\pi d^2}`) + ':'),
            F(r`d=\sqrt{\dfrac{P}{4\pi I'}}=\sqrt{\dfrac{314}{4\pi\cdot10^{-3}}}=158\ \text{m}`),
            p('Aquesta distància és la hipotenusa d’un triangle de catet horitzontal 50 m:', 'Esta distancia es la hipotenusa de un triángulo de cateto horizontal 50 m:'),
            F(r`h=\sqrt{d^2-50^2}=\sqrt{25\,000-2\,500}=150\ \text{m}`),
            p('Amb dos coets la intensitat es dobla (les potències se sumen): ' + M(r`\beta=10\log\dfrac{2\cdot10^{-3}}{10^{-12}}=90+10\log2=93{,}0\ \text{dB}`) + '.', 'Con dos cohetes la intensidad se duplica (las potencias se suman): ' + M(r`\beta=10\log\dfrac{2\cdot10^{-3}}{10^{-12}}=90+10\log2=93{,}0\ \text{dB}`) + '.'),
            ans('<b>' + M(r`h=150\ \text{m}`) + '</b> i <b>93,0 dB</b>.', '<b>' + M(r`h=150\ \text{m}`) + '</b> y <b>93,0 dB</b>.'),
          ]),
      ] },

    { n: 6, pts: 2.5, topic: TOP.n,
      intro: J(p('El poloni (Z = 84) va ser descobert el 1898 per Marie Sklodowska-Curie i Pierre Curie. L’isòtop de poloni amb un temps de semidesintegració més llarg és el Po-210, que el té de 138 dies. Es desintegra per emissió d’una partícula alfa i origina un isòtop estable de plom (Pb).',
                 'El polonio (Z = 84) fue descubierto en 1898 por Marie Sklodowska-Curie y Pierre Curie. El isótopo de polonio con un tiempo de semidesintegración más largo es el Po-210, que lo tiene de 138 días. Se desintegra por emisión de una partícula alfa y origina un isótopo estable de plomo (Pb).'),
               img('fis24-s1-p6', 536, 173, 'Un electró a 0,6·10⁻¹⁰ m a l’esquerra de la partícula alfa i un altre a 0,6·10⁻¹⁰ m a la dreta', 'Un electrón a 0,6·10⁻¹⁰ m a la izquierda de la partícula alfa y otro a 0,6·10⁻¹⁰ m a la derecha'),
               DAT(ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.', ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.')),
      parts: [
        part('6.1', T('Escriviu la desintegració del Po-210. Si l’activitat inicial per unitat de massa del Po-210 és d’1,66·10<sup>14</sup> Bq/g, quina serà l’activitat de 5 mg d’aquest element al cap d’una setmana?',
                      'Escriba la desintegración del Po-210. Si la actividad inicial por unidad de masa del Po-210 es de 1,66·10<sup>14</sup> Bq/g, ¿cuál será la actividad de 5 mg de este elemento al cabo de una semana?'),
          [
            F(r`{}^{210}_{84}\text{Po}\ \longrightarrow\ {}^{206}_{82}\text{Pb}+{}^{4}_{2}\text{He}`),
            p('Activitat inicial de 5 mg: ' + M(r`A_0=1{,}66\cdot10^{14}\cdot5\cdot10^{-3}=8{,}3\cdot10^{11}\ \text{Bq}`) + '. Al cap de 7 dies:', 'Actividad inicial de 5 mg: ' + M(r`A_0=1{,}66\cdot10^{14}\cdot5\cdot10^{-3}=8{,}3\cdot10^{11}\ \text{Bq}`) + '. Al cabo de 7 días:'),
            F(r`A=A_0\,2^{-t/T_{1/2}}=8{,}3\cdot10^{11}\cdot2^{-7/138}=8{,}01\cdot10^{11}\ \text{Bq}`),
          ]),
        part('6.2', T('Els nuclis d’heli que es produeixen en les desintegracions alfa no triguen a captar dos electrons. Suposem que es forma un àtom d’heli en dos passos ben diferenciats. Primerament, es transporta des d’una gran distància un primer electró a 0,6·10<sup>−10</sup> m de la partícula alfa i s’hi manté. Posteriorment, un segon electró es porta a l’altre costat de la partícula alfa a 0,6·10<sup>−10</sup> m. La configuració final es mostra a la figura. Calculeu el treball realitzat pel camp elèctric en cadascun dels dos passos. Quina és l’energia potencial electroestàtica de la configuració final?',
                      'Los núcleos de helio que se producen en las desintegraciones alfa no tardan en captar dos electrones. Supongamos que se forma un átomo de helio en dos pasos bien diferenciados. Primeramente, se transporta desde una gran distancia un primer electrón a 0,6·10<sup>−10</sup> m de la partícula alfa y se mantiene allí. Posteriormente, un segundo electrón se lleva al otro lado de la partícula alfa a 0,6·10<sup>−10</sup> m. La configuración final se muestra en la figura. Calcule el trabajo realizado por el campo eléctrico en cada uno de los dos pasos. ¿Cuál es la energía potencial electroestática de la configuración final?'),
          [
            p('La partícula alfa té càrrega ' + M('+2e') + '. El treball del camp conservatiu és ' + M(r`W=-\Delta U`) + ', amb ' + M(r`U=k\dfrac{q_1q_2}{r}`) + ' i ' + M(r`k e^2=2{,}31\cdot10^{-28}\ \text{J m}`) + '.', 'La partícula alfa tiene carga ' + M('+2e') + '. El trabajo del campo conservativo es ' + M(r`W=-\Delta U`) + ', con ' + M(r`U=k\dfrac{q_1q_2}{r}`) + ' y ' + M(r`k e^2=2{,}31\cdot10^{-28}\ \text{J m}`) + '.'),
            p('<b>Pas 1</b> (electró 1 des de l’infinit, ' + M(r`U_i=0`) + '):', '<b>Paso 1</b> (electrón 1 desde el infinito, ' + M(r`U_i=0`) + '):'),
            F(r`U_1=-\dfrac{k\,(2e)\,e}{r}=-\dfrac{2\cdot2{,}31\cdot10^{-28}}{0{,}6\cdot10^{-10}}=-7{,}69\cdot10^{-18}\ \text{J}\ \Rightarrow\ W_1=-(U_1-0)=+7{,}69\cdot10^{-18}\ \text{J}`),
            p('<b>Pas 2</b> (electró 2 des de l’infinit): interacciona amb la partícula alfa (atracció) i amb l’electró 1, a ' + M(r`1{,}2\cdot10^{-10}\ \text{m}`) + ' (repulsió):', '<b>Paso 2</b> (electrón 2 desde el infinito): interacciona con la partícula alfa (atracción) y con el electrón 1, a ' + M(r`1{,}2\cdot10^{-10}\ \text{m}`) + ' (repulsión):'),
            F(r`\Delta U_2=-\dfrac{2ke^2}{0{,}6\cdot10^{-10}}+\dfrac{ke^2}{1{,}2\cdot10^{-10}}=-7{,}69\cdot10^{-18}+1{,}92\cdot10^{-18}=-5{,}77\cdot10^{-18}\ \text{J}\ \Rightarrow\ W_2=+5{,}77\cdot10^{-18}\ \text{J}`),
            F(r`U_{final}=U_1+\Delta U_2=-1{,}35\cdot10^{-17}\ \text{J}\ (\approx-84\ \text{eV})`),
            ans('<b>' + M(r`W_1=7{,}69\cdot10^{-18}\ \text{J}`) + '</b>, <b>' + M(r`W_2=5{,}77\cdot10^{-18}\ \text{J}`) + '</b>; <b>' + M(r`U=-1{,}35\cdot10^{-17}\ \text{J}`) + '</b>.', '<b>' + M(r`W_1=7{,}69\cdot10^{-18}\ \text{J}`) + '</b>, <b>' + M(r`W_2=5{,}77\cdot10^{-18}\ \text{J}`) + '</b>; <b>' + M(r`U=-1{,}35\cdot10^{-17}\ \text{J}`) + '</b>.'),
          ]),
      ] },

    { n: 7, pts: 2.5, topic: TOP.n,
      intro: J(p('Observem que en una mostra metàl·lica apareix l’efecte fotoelèctric quan l’il·luminem amb llum monocromàtica de longituds d’ona menors o iguals a 650 nm.',
                 'Observamos que en una muestra metálica aparece el efecto fotoeléctrico cuando la iluminamos con luz monocromática de longitudes de onda menores o iguales a 650 nm.'),
               DAT(M(r`c=3{,}00\cdot10^{8}\ \text{m s}^{-1}`) + '; ' + ECON + '; ' + MEC + '; ' + M(r`h=6{,}626\cdot10^{-34}\ \text{J s}`) + '.', M(r`c=3{,}00\cdot10^{8}\ \text{m s}^{-1}`) + '; ' + ECON + '; ' + MEC + '; ' + M(r`h=6{,}626\cdot10^{-34}\ \text{J s}`) + '.')),
      parts: [
        part('7.1', T('Calculeu el treball d’extracció del metall. Determineu el potencial de frenada si il·luminem el metall amb llum de 300 nm.',
                      'Calcule el trabajo de extracción del metal. Determine el potencial de frenado si iluminamos el metal con luz de 300 nm.'),
          [
            p('650 nm és la longitud d’ona llindar (energia del fotó = treball d’extracció):', '650 nm es la longitud de onda umbral (energía del fotón = trabajo de extracción):'),
            F(r`\Phi=\dfrac{hc}{\lambda_0}=\dfrac{6{,}626\cdot10^{-34}\cdot3{,}00\cdot10^{8}}{650\cdot10^{-9}}=3{,}06\cdot10^{-19}\ \text{J}=1{,}91\ \text{eV}`),
            F(r`e\,V_f=\dfrac{hc}{\lambda}-\Phi=\dfrac{6{,}626\cdot10^{-34}\cdot3{,}00\cdot10^{8}}{300\cdot10^{-9}}-3{,}06\cdot10^{-19}=3{,}57\cdot10^{-19}\ \text{J}\ \Rightarrow\ V_f=2{,}23\ \text{V}`),
            ans('<b>' + M(r`\Phi=3{,}06\cdot10^{-19}\ \text{J}`) + '</b> (1,91 eV); <b>' + M(r`V_f=2{,}23\ \text{V}`) + '</b>.', '<b>' + M(r`\Phi=3{,}06\cdot10^{-19}\ \text{J}`) + '</b> (1,91 eV); <b>' + M(r`V_f=2{,}23\ \text{V}`) + '</b>.'),
          ]),
        part('7.2', T('Trobeu l’expressió de la velocitat dels electrons en funció de la longitud d’ona incident per a aquest metall. Calculeu la velocitat dels electrons per a una longitud d’ona incident de 500 nm i la longitud d’ona de De Broglie associada a aquests electrons.',
                      'Encuentre la expresión de la velocidad de los electrones en función de la longitud de onda incidente para este metal. Calcule la velocidad de los electrones para una longitud de onda incidente de 500 nm y la longitud de onda de De Broglie asociada a estos electrones.'),
          [
            F(r`\tfrac12m_ev^2=\dfrac{hc}{\lambda}-\Phi\ \Rightarrow\ v(\lambda)=\sqrt{\dfrac{2}{m_e}\Big(\dfrac{hc}{\lambda}-\dfrac{hc}{\lambda_0}\Big)}=\sqrt{\dfrac{2hc}{m_e}\Big(\dfrac1\lambda-\dfrac1{\lambda_0}\Big)}`),
            F(r`v(500\ \text{nm})=\sqrt{\dfrac{2\cdot(3{,}976-3{,}058)\cdot10^{-19}}{9{,}11\cdot10^{-31}}}=4{,}49\cdot10^{5}\ \text{m/s}`),
            F(r`\lambda_{dB}=\dfrac{h}{m_ev}=\dfrac{6{,}626\cdot10^{-34}}{9{,}11\cdot10^{-31}\cdot4{,}49\cdot10^{5}}=1{,}62\cdot10^{-9}\ \text{m}`),
            ans('<b>' + M(r`v=4{,}49\cdot10^{5}\ \text{m/s}`) + '</b> i <b>' + M(r`\lambda_{dB}=1{,}62\ \text{nm}`) + '</b>.', '<b>' + M(r`v=4{,}49\cdot10^{5}\ \text{m/s}`) + '</b> y <b>' + M(r`\lambda_{dB}=1{,}62\ \text{nm}`) + '</b>.'),
          ]),
      ] },
  ],
};
module.exports = s1;
