/* PAU 2025 · Física · sèrie 3 (setembre/local) */
const L = require('./lib');
const { M, T, p, ans, ul, html, J, r, TOP, F, AN, DAT, fig, figL, img, SV, LN, AR, TX, DOT, RECT, PATH, L2, GC, ECON, MEC, HC, part, TAB, plot } = L;

const pool = lang => {
  const ex = 40, ey = 30, wy = 100, by = 190, x1 = ex + 2.5 * Math.tan(40 * Math.PI / 180) * 40, t2 = Math.asin(Math.sin(40 * Math.PI / 180) / 1.33), x2 = x1 + 2 * Math.tan(t2) * 40;
  return SV(360, 215, L2(lang, 'Raig des dels ulls d’Alaitz fins a l’objecte del fons: es refracta a la superfície de l’aigua', 'Rayo desde los ojos de Alaitz hasta el objeto del fondo: se refracta en la superficie del agua'),
    RECT(ex, wy, 300, by - wy, 'pl') + LN(ex, ey - 10, ex, by + 4, 'dsh') + LN(ex - 20, ey + 56, ex + 6, ey + 56, 'ln') +
    DOT(ex, ey, 5, 'pt2') + LN(ex, ey, x1, wy, 'ln') + LN(x1, wy, x2, by, 'ln') + LN(x1, wy - 40, x1, wy + 40, 'dsh') + DOT(x2, by - 3, 4, 'pt') +
    TX(ex + 12, ey + 28, '40°', 'start') + TX(x1 + 8, wy + 36, '28,9°', 'start') + TX(x2 + 8, by - 6, L2(lang, 'objecte', 'objeto'), 'start') +
    LN(ex, by + 14, x2, by + 14, 'dsh') + TX((ex + x2) / 2, by + 28, 'x', 'middle') + TX(ex - 4, ey - 12, L2(lang, 'ulls', 'ojos'), 'end') + TX(x1 + 6, wy - 6, L2(lang, 'aire', 'aire'), 'start'));
};
const bohrNote = '';

const s3 = {
  id: 3, pdf: 'pdf/pau/pau-2025-fisica-serie3.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g,
      intro: J(p('La nau <i>BepiColombo</i>, de 2 700 kg de massa, sobrevola Mercuri per estudiar el planeta.', 'La nave <i>BepiColombo</i>, de 2 700 kg de masa, sobrevuela Mercurio para estudiar el planeta.'),
               DAT(GC + '; ' + M(r`M_M=3{,}285\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=2{,}44\cdot10^{3}\ \text{km}`) + '.', GC + '; ' + M(r`M_M=3{,}285\cdot10^{23}\ \text{kg}`) + '; ' + M(r`R_M=2{,}44\cdot10^{3}\ \text{km}`) + '.')),
      parts: [
        part('1.1', T('Completeu la taula següent calculant la distància respecte al centre de Mercuri per als dos punts indicats. En el punt més pròxim d’un altre apropament a Mercuri, la intensitat del camp gravitatori és de 3,23 m s<sup>−2</sup>. Calculeu a quants quilòmetres de la superfície de Mercuri ha arribat la <i>BepiColombo</i>.' +
                        '<table class="pt-tab"><tr><th></th><th>Distància al centre de Mercuri (m)</th><th>Energia potencial (J)</th></tr><tr><th>Punt 1</th><td>?</td><td>−1,89·10<sup>10</sup></td></tr><tr><th>Punt 2</th><td>?</td><td>−1,35·10<sup>10</sup></td></tr></table>',
                      'Complete la siguiente tabla calculando la distancia respecto al centro de Mercurio para los dos puntos indicados. En el punto más próximo de otro acercamiento a Mercurio, la intensidad del campo gravitatorio es de 3,23 m s<sup>−2</sup>. Calcule a cuántos kilómetros de la superficie de Mercurio ha llegado la <i>BepiColombo</i>.' +
                        '<table class="pt-tab"><tr><th></th><th>Distancia al centro de Mercurio (m)</th><th>Energía potencial (J)</th></tr><tr><th>Punto 1</th><td>?</td><td>−1,89·10<sup>10</sup></td></tr><tr><th>Punto 2</th><td>?</td><td>−1,35·10<sup>10</sup></td></tr></table>'),
          [
            p('De ' + M(r`U=-\dfrac{GM_Mm}{r}`) + ' s’obté ' + M(r`r=\dfrac{GM_Mm}{|U|}`) + ', amb ' + M(r`GM_Mm=6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}\cdot2\,700=5{,}92\cdot10^{16}\ \text{J m}`) + ':', 'De ' + M(r`U=-\dfrac{GM_Mm}{r}`) + ' se obtiene ' + M(r`r=\dfrac{GM_Mm}{|U|}`) + ', con ' + M(r`GM_Mm=6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}\cdot2\,700=5{,}92\cdot10^{16}\ \text{J m}`) + ':'),
            F(r`r_1=\dfrac{5{,}92\cdot10^{16}}{1{,}89\cdot10^{10}}=3{,}13\cdot10^{6}\ \text{m},\qquad r_2=\dfrac{5{,}92\cdot10^{16}}{1{,}35\cdot10^{10}}=4{,}38\cdot10^{6}\ \text{m}`),
            p('Per a l’altre apropament, ' + M(r`g=\dfrac{GM_M}{r^2}`) + ':', 'Para el otro acercamiento, ' + M(r`g=\dfrac{GM_M}{r^2}`) + ':'),
            F(r`r=\sqrt{\dfrac{GM_M}{g}}=\sqrt{\dfrac{6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}}{3{,}23}}=2{,}60\cdot10^{6}\ \text{m}`),
            F(r`h=r-R_M=2{,}60\cdot10^{6}-2{,}44\cdot10^{6}=1{,}6\cdot10^{5}\ \text{m}`),
            ans('<b>' + M(r`r_1=3{,}13\cdot10^{6}\ \text{m}`) + '</b>, <b>' + M(r`r_2=4{,}38\cdot10^{6}\ \text{m}`) + '</b>; la nau ha arribat a uns <b>165 km</b> de la superfície.', '<b>' + M(r`r_1=3{,}13\cdot10^{6}\ \text{m}`) + '</b>, <b>' + M(r`r_2=4{,}38\cdot10^{6}\ \text{m}`) + '</b>; la nave ha llegado a unos <b>165 km</b> de la superficie.'),
          ]),
        part('1.2', T('Una part de la nau <i>BepiColombo</i>, anomenada <i>Mio</i>, està previst que se separi del conjunt i orbiti al voltant de Mercuri seguint una òrbita el·líptica, en què el punt més pròxim a Mercuri (punt <i>P</i>) se situa a 590 km de la superfície del planeta i el punt més llunyà a Mercuri (punt <i>A</i>) se situa a una distància d’11 600 km sobre la superfície del planeta. La velocitat orbital de <i>Mio</i> serà de 2,64·10<sup>3</sup> m s<sup>−1</sup> al punt <i>A</i>. Utilitzant el principi de conservació del moment angular, calculeu quin serà el mòdul de la velocitat de <i>Mio</i> al punt <i>P</i>. Justifiqueu si l’acceleració normal variarà al llarg de l’òrbita. En cas afirmatiu, indiqueu en quin punt tindrà el valor màxim.',
                      'Una parte de la nave <i>BepiColombo</i>, llamada <i>Mio</i>, está previsto que se separe del conjunto y orbite alrededor de Mercurio siguiendo una órbita elíptica, en la que el punto más próximo a Mercurio (punto <i>P</i>) se encuentra a 590 km de la superficie del planeta y el punto más lejano a Mercurio (punto <i>A</i>) se encuentra a una distancia de 11 600 km sobre la superficie del planeta. La velocidad orbital de <i>Mio</i> será de 2,64·10<sup>3</sup> m s<sup>−1</sup> en el punto <i>A</i>. Utilizando el principio de conservación del momento angular, calcule cuál será el módulo de la velocidad de <i>Mio</i> en el punto <i>P</i>. Justifique si la aceleración normal variará a lo largo de la órbita. En caso afirmativo, indique en qué punto tendrá el valor máximo.'),
          [
            F(r`r_P=2{,}44\cdot10^{6}+5{,}9\cdot10^{5}=3{,}03\cdot10^{6}\ \text{m},\qquad r_A=2{,}44\cdot10^{6}+1{,}16\cdot10^{7}=1{,}404\cdot10^{7}\ \text{m}`),
            p('La força és central: ' + M(r`L`) + ' es conserva i a <i>P</i> i <i>A</i> ' + M(r`\vec r\perp\vec v`) + ':', 'La fuerza es central: ' + M(r`L`) + ' se conserva y en <i>P</i> y <i>A</i> ' + M(r`\vec r\perp\vec v`) + ':'),
            F(r`r_Pv_P=r_Av_A\ \Rightarrow\ v_P=v_A\dfrac{r_A}{r_P}=2{,}64\cdot10^{3}\cdot\dfrac{1{,}404\cdot10^{7}}{3{,}03\cdot10^{6}}=1{,}22\cdot10^{4}\ \text{m/s}`),
            p('<b>Acceleració normal.</b> L’única força és la gravitatòria, ' + M(r`g=\dfrac{GM_M}{r^2}`) + ', dirigida cap a Mercuri. Només a <i>P</i> i <i>A</i> és perpendicular a la velocitat (tota ella és normal); en la resta de punts una part és tangencial. Com que ' + M('r') + ' i l’angle entre ' + M(r`\vec g`) + ' i ' + M(r`\vec v`) + ' canvien, <b>l’acceleració normal varia</b>. És <b>màxima al periheli <i>P</i></b>, on ' + M('r') + ' és mínim i tota ' + M('g') + ' és normal:', '<b>Aceleración normal.</b> La única fuerza es la gravitatoria, ' + M(r`g=\dfrac{GM_M}{r^2}`) + ', dirigida hacia Mercurio. Solo en <i>P</i> y <i>A</i> es perpendicular a la velocidad (toda ella es normal); en el resto de puntos una parte es tangencial. Como ' + M('r') + ' y el ángulo entre ' + M(r`\vec g`) + ' y ' + M(r`\vec v`) + ' cambian, <b>la aceleración normal varía</b>. Es <b>máxima en el periapsis <i>P</i></b>, donde ' + M('r') + ' es mínimo y toda ' + M('g') + ' es normal:'),
            F(r`a_{n,\max}=\dfrac{GM_M}{r_P^2}=\dfrac{6{,}67\cdot10^{-11}\cdot3{,}285\cdot10^{23}}{(3{,}03\cdot10^{6})^2}=2{,}39\ \text{m/s}^2\qquad(\text{a }A:\ 0{,}111\ \text{m/s}^2)`),
            ans('<b>' + M(r`v_P=1{,}22\cdot10^{4}\ \text{m/s}`) + '</b>; l’acceleració normal és màxima al punt <b>P</b>.', '<b>' + M(r`v_P=1{,}22\cdot10^{4}\ \text{m/s}`) + '</b>; la aceleración normal es máxima en el punto <b>P</b>.'),
          ]),
      ] },

    { n: 2, pts: 2.5, topic: TOP.e, choose: true, opts: [
      { k: 'A',
        intro: J(p('Una vareta metàl·lica es desplaça a una velocitat constant de 3,00 m s<sup>−1</sup> sobre un conductor en forma de U dins d’un camp magnètic uniforme <i>B</i> = 0,40 T, perpendicular al pla i en el sentit indicat a les figures. En l’instant inicial, la vareta es troba a una distància de 3,00 cm de la part esquerra del conductor.',
                   'Una varilla metálica se desplaza a una velocidad constante de 3,00 m s<sup>−1</sup> sobre un conductor en forma de U dentro de un campo magnético uniforme <i>B</i> = 0,40 T, perpendicular al plano y en el sentido indicado en las figuras. En el instante inicial, la varilla se encuentra a una distancia de 3,00 cm de la parte izquierda del conductor.'),
                 img('fis25-s3-e2a', 880, 436, 'Conductor en U d’altura 4 cm amb la vareta a 3 cm de l’esquerra i camp magnètic cap enfora (figura 1); en la figura 2 el corrent induït circula en sentit horari', 'Conductor en U de altura 4 cm con la varilla a 3 cm de la izquierda y campo magnético hacia fuera (figura 1); en la figura 2 la corriente inducida circula en sentido horario')),
        parts: [
          part('2.1', T('Calculeu el flux magnètic a través del circuit tancat per la vareta en l’instant inicial indicat a la figura 1. En el moment en què la vareta es posa en moviment, apareix un corrent induït en el sentit indicat a la figura 2. Justifiqueu quin és el sentit de moviment de la vareta, a l’esquerra o a la dreta, i dibuixeu el vector de velocitat sobre la figura de la vareta en moviment. Determineu la FEM induïda mentre la vareta es mou a 3,00 m s<sup>−1</sup>.',
                        'Calcule el flujo magnético a través del circuito cerrado por la varilla en el instante inicial indicado en la figura 1. En el momento en que la varilla se pone en movimiento, aparece una corriente inducida en el sentido indicado en la figura 2. Justifique cuál es el sentido de movimiento de la varilla, a la izquierda o a la derecha, y dibuje el vector de velocidad sobre la figura de la varilla en movimiento. Determine la FEM inducida mientras la varilla se mueve a 3,00 m s<sup>−1</sup>.'),
            [
              F(r`\Phi_0=B\,S=0{,}40\cdot(0{,}030\cdot0{,}040)=4{,}8\cdot10^{-4}\ \text{Wb}`),
              p('A la figura 2 el corrent circula en sentit <b>horari</b>, que dins del circuit crea un camp <b>entrant</b>. Per la llei de Lenz, el corrent induït s’oposa a la variació del flux: si el camp induït és entrant, el flux extern (cap enfora) <b>augmenta</b>, o sigui que l’àrea creix i la vareta es mou <b>cap a la dreta</b>. Comprovació: ' + M(r`\vec F=q\,\vec v\times\vec B`) + ' amb ' + M(r`\vec v=+\hat x`) + ' i ' + M(r`\vec B=+\hat z`) + ' dóna força cap a ' + M('-y') + ' (avall) sobre les càrregues positives, en acord amb la fletxa del corrent a la vareta. Cal dibuixar ' + M(r`\vec v`) + ' <b>horitzontal cap a la dreta</b>.',
                'En la figura 2 la corriente circula en sentido <b>horario</b>, que dentro del circuito crea un campo <b>entrante</b>. Por la ley de Lenz, la corriente inducida se opone a la variación del flujo: si el campo inducido es entrante, el flujo externo (hacia fuera) <b>aumenta</b>, es decir, el área crece y la varilla se mueve <b>hacia la derecha</b>. Comprobación: ' + M(r`\vec F=q\,\vec v\times\vec B`) + ' con ' + M(r`\vec v=+\hat x`) + ' y ' + M(r`\vec B=+\hat z`) + ' da fuerza hacia ' + M('-y') + ' (abajo) sobre las cargas positivas, de acuerdo con la flecha de la corriente en la varilla. Hay que dibujar ' + M(r`\vec v`) + ' <b>horizontal hacia la derecha</b>.'),
              F(r`\varepsilon=B\,\ell\,v=0{,}40\cdot0{,}040\cdot3{,}00=4{,}8\cdot10^{-2}\ \text{V}`),
              ans('<b>' + M(r`\Phi_0=4{,}8\cdot10^{-4}\ \text{Wb}`) + '</b>; la vareta es mou cap a la <b>dreta</b>; <b>' + M(r`\varepsilon=48\ \text{mV}`) + '</b>.', '<b>' + M(r`\Phi_0=4{,}8\cdot10^{-4}\ \text{Wb}`) + '</b>; la varilla se mueve hacia la <b>derecha</b>; <b>' + M(r`\varepsilon=48\ \text{mV}`) + '</b>.'),
            ]),
          part('2.2', T('Considereu la situació il·lustrada a la figura 2, en què la intensitat induïda és de 6,00 mA. Justifiqueu si en aquestes condicions apareixerà alguna força magnètica sobre la vareta. En cas afirmatiu, calculeu el mòdul de la força magnètica sobre la vareta i dibuixeu-la.',
                        'Considere la situación ilustrada en la figura 2, en la que la intensidad inducida es de 6,00 mA. Justifique si en estas condiciones aparecerá alguna fuerza magnética sobre la varilla. En caso afirmativo, calcule el módulo de la fuerza magnética sobre la varilla y dibújela.'),
            [
              p('Sí: un conductor amb corrent dins d’un camp magnètic rep una força ' + M(r`\vec F=I\,\vec\ell\times\vec B`) + '. Amb el corrent cap avall (' + M('-y') + ') i ' + M(r`\vec B=+\hat z`) + ', ' + M(r`(-\hat y)\times\hat z=-\hat x`) + ': la força va <b>cap a l’esquerra</b>, <b>oposada al moviment</b> (llei de Lenz; cal una força externa per mantenir la velocitat constant).', 'Sí: un conductor con corriente dentro de un campo magnético recibe una fuerza ' + M(r`\vec F=I\,\vec\ell\times\vec B`) + '. Con la corriente hacia abajo (' + M('-y') + ') y ' + M(r`\vec B=+\hat z`) + ', ' + M(r`(-\hat y)\times\hat z=-\hat x`) + ': la fuerza va <b>hacia la izquierda</b>, <b>opuesta al movimiento</b> (ley de Lenz; hace falta una fuerza externa para mantener la velocidad constante).'),
              F(r`F=I\,\ell\,B=6{,}00\cdot10^{-3}\cdot0{,}040\cdot0{,}40=9{,}6\cdot10^{-5}\ \text{N}`),
              ans('<b>' + M(r`F=9{,}6\cdot10^{-5}\ \text{N}`) + '</b>, cap a l’esquerra.', '<b>' + M(r`F=9{,}6\cdot10^{-5}\ \text{N}`) + '</b>, hacia la izquierda.'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('El model de l’àtom d’hidrogen de Bohr suposa que l’electró descriu una òrbita circular al voltant del protó i que el moment angular de l’òrbita és un múltiple enter de la constant de Planck, ' + M(r`L=n\dfrac{h}{2\pi}`) + ', on <i>n</i> és un nombre natural.',
                   'El modelo del átomo de hidrógeno de Bohr supone que el electrón describe una órbita circular alrededor del protón y que el momento angular de la órbita es un múltiplo entero de la constante de Planck, ' + M(r`L=n\dfrac{h}{2\pi}`) + ', donde <i>n</i> es un número natural.'),
                 DAT(ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '; ' + M(r`m=9{,}11\cdot10^{-31}\ \text{kg}`) + '; ' + HC + '.', ECON + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '; ' + M(r`m=9{,}11\cdot10^{-31}\ \text{kg}`) + '; ' + HC + '.')),
        parts: [
          part('2.1', T('Demostreu que el moment angular s’expressa com ' + M(r`L=e\sqrt{k\cdot m\cdot r}`) + ', on <i>e</i> és la càrrega de l’electró, <i>k</i> és la constant de Coulomb, <i>m</i> és la massa de l’electró i <i>r</i> és el radi de l’òrbita. Trobeu l’expressió del radi de l’òrbita de l’electró en funció de <i>h</i>, <i>n</i>, <i>k</i>, <i>m</i> i <i>e</i>. Calculeu el radi per a <i>n</i> = 1.',
                        'Demuestre que el momento angular se expresa como ' + M(r`L=e\sqrt{k\cdot m\cdot r}`) + ', donde <i>e</i> es la carga del electrón, <i>k</i> es la constante de Coulomb, <i>m</i> es la masa del electrón y <i>r</i> es el radio de la órbita. Encuentre la expresión del radio de la órbita del electrón en función de <i>h</i>, <i>n</i>, <i>k</i>, <i>m</i> y <i>e</i>. Calcule el radio para <i>n</i> = 1.'),
            [
              p('La força de Coulomb és la centrípeta:', 'La fuerza de Coulomb es la centrípeta:'),
              F(r`k\dfrac{e^2}{r^2}=m\dfrac{v^2}{r}\ \Rightarrow\ v=e\sqrt{\dfrac{k}{m\,r}}`),
              F(r`L=m\,v\,r=m\,r\,e\sqrt{\dfrac{k}{m\,r}}=e\sqrt{k\,m\,r}\ \ \square`),
              p('Igualant amb la condició de Bohr ' + M(r`L=n\dfrac{h}{2\pi}`) + ':', 'Igualando con la condición de Bohr ' + M(r`L=n\dfrac{h}{2\pi}`) + ':'),
              F(r`e\sqrt{k\,m\,r}=\dfrac{nh}{2\pi}\ \Rightarrow\ r=\dfrac{n^2h^2}{4\pi^2\,k\,m\,e^2}`),
              F(r`r_1=\dfrac{(6{,}63\cdot10^{-34})^2}{4\pi^2\cdot8{,}99\cdot10^{9}\cdot9{,}11\cdot10^{-31}\cdot(1{,}602\cdot10^{-19})^2}=5{,}30\cdot10^{-11}\ \text{m}`),
              ans('<b>' + M(r`r_1=5{,}30\cdot10^{-11}\ \text{m}=53{,}0\ \text{pm}`) + '</b> (radi de Bohr).', '<b>' + M(r`r_1=5{,}30\cdot10^{-11}\ \text{m}=53{,}0\ \text{pm}`) + '</b> (radio de Bohr).'),
            ]),
          part('2.2', T('Suposant que el radi de l’òrbita per a <i>n</i> = 1 és 53 pm, calculeu les energies cinètica, potencial i mecànica clàssiques de l’electró.',
                        'Suponiendo que el radio de la órbita para <i>n</i> = 1 es 53 pm, calcule las energías cinética, potencial y mecánica clásicas del electrón.'),
            [
              F(r`E_c=\tfrac12mv^2=\dfrac{k e^2}{2r}=\dfrac{8{,}99\cdot10^{9}\cdot(1{,}602\cdot10^{-19})^2}{2\cdot53\cdot10^{-12}}=2{,}18\cdot10^{-18}\ \text{J}`),
              F(r`U=-\dfrac{ke^2}{r}=-4{,}35\cdot10^{-18}\ \text{J},\qquad E_m=E_c+U=-2{,}18\cdot10^{-18}\ \text{J}`),
              ans('<b>' + M(r`E_c=2{,}18\cdot10^{-18}\ \text{J}`) + '</b> (13,6 eV), <b>' + M(r`U=-4{,}35\cdot10^{-18}\ \text{J}`) + '</b>, <b>' + M(r`E_m=-2{,}18\cdot10^{-18}\ \text{J}`) + '</b> (−13,6 eV).', '<b>' + M(r`E_c=2{,}18\cdot10^{-18}\ \text{J}`) + '</b> (13,6 eV), <b>' + M(r`U=-4{,}35\cdot10^{-18}\ \text{J}`) + '</b>, <b>' + M(r`E_m=-2{,}18\cdot10^{-18}\ \text{J}`) + '</b> (−13,6 eV).'),
            ]),
        ] },
    ] },

    { n: 3, pts: 2.5, topic: TOP.o, choose: true, opts: [
      { k: 'A',
        intro: J(p('Al taller de l’institut es dissenya un pèndol amb un suport i un pes que penja d’un fil de longitud <i>L</i> i de massa menyspreable. Quan es prenen mesures del període <i>T</i> d’aquest pèndol en funció de la longitud del fil, s’obtenen les dades següents:',
                   'En el taller del instituto se diseña un péndulo con un soporte y un peso que cuelga de un hilo de longitud <i>L</i> y de masa despreciable. Cuando se toman medidas del periodo <i>T</i> de este péndulo en función de la longitud del hilo, se obtienen los siguientes datos:'),
                 TAB([['L (m)', '0,20', '0,30', '0,50', '0,80', '1,20'], [{ th: 'T (s)' }, '0,90', '1,08', '1,43', '1,75', '2,20'], [{ th: 'T² (s²)' }, '', '', '', '', '']]),
                 DAT('el pèndol descriu un moviment harmònic simple de període ' + M(r`T=2\pi\sqrt{L/g}`) + '.', 'el péndulo describe un movimiento armónico simple de periodo ' + M(r`T=2\pi\sqrt{L/g}`) + '.')),
        parts: [
          part('3.1', T('Ompliu la tercera fila de la taula anterior amb els valors del període al quadrat. Representeu <i>T</i><sup>2</sup>(<i>L</i>) a la quadrícula de baix i justifiqueu per què els punts estan alineats. Calculeu el pendent d’aquest gràfic. A partir del resultat, calculeu també la intensitat del camp gravitatori.',
                        'Rellene la tercera fila de la tabla anterior con los valores del periodo al cuadrado. Represente <i>T</i><sup>2</sup>(<i>L</i>) en la cuadrícula de abajo y justifique por qué los puntos están alineados. Calcule la pendiente de este gráfico. A partir del resultado, calcule también la intensidad del campo gravitatorio.'),
            [
              TAB([['L (m)', '0,20', '0,30', '0,50', '0,80', '1,20'], [{ th: 'T (s)' }, '0,90', '1,08', '1,43', '1,75', '2,20'], [{ th: 'T² (s²)' }, '0,81', '1,17', '2,04', '3,06', '4,84']]),
              fig(plot({ w: 340, h: 240, xr: [0, 1.3], yr: [0, 5.2], tickx: [0.5, 1], ticky: [1, 2, 3, 4, 5], curves: [{ f: x => 4.03 * x, k: 1 }],
                points: [[0.2, 0.81], [0.3, 1.1664], [0.5, 2.0449], [0.8, 3.0625], [1.2, 4.84]], labels: [[1.0, 0.45, 'L (m)'], [0.06, 4.9, 'T² (s²)']],
                alt: 'Punts (L, T²) alineats sobre una recta que passa per l’origen' })),
              p('Elevant al quadrat ' + M(r`T=2\pi\sqrt{L/g}`) + ' s’obté una relació <b>lineal</b> (recta per l’origen):', 'Elevando al cuadrado ' + M(r`T=2\pi\sqrt{L/g}`) + ' se obtiene una relación <b>lineal</b> (recta por el origen):'),
              F(r`T^2=\dfrac{4\pi^2}{g}\,L\quad\Rightarrow\quad m=\dfrac{4\pi^2}{g}`),
              F(r`m=\dfrac{4{,}84-0{,}81}{1{,}20-0{,}20}=4{,}03\ \text{s}^2/\text{m}\ \Rightarrow\ g=\dfrac{4\pi^2}{m}=\dfrac{39{,}5}{4{,}03}=9{,}8\ \text{m/s}^2`),
              ans('Pendent <b>' + M(r`4{,}03\ \text{s}^2/\text{m}`) + '</b>; <b>' + M(r`g\approx9{,}8\ \text{N/kg}`) + '</b>.', 'Pendiente <b>' + M(r`4{,}03\ \text{s}^2/\text{m}`) + '</b>; <b>' + M(r`g\approx9{,}8\ \text{N/kg}`) + '</b>.'),
            ]),
          part('3.2', T('Es deixa caure el pèndol d’1,50 kg de massa des d’un angle de 30° respecte de la vertical i es considera menyspreable el fregament amb l’aire. Tenint en compte que la longitud del pèndol és d’1,00 m, calculeu les energies potencial i cinètica màximes i l’energia mecànica del pèndol, així com la velocitat màxima que assolirà. Trieu com a referència d’energia potencial zero la posició d’equilibri.',
                        'Se deja caer el péndulo de 1,50 kg de masa desde un ángulo de 30° respecto a la vertical y se considera despreciable el rozamiento con el aire. Teniendo en cuenta que la longitud del péndulo es de 1,00 m, calcule las energías potencial y cinética máximas y la energía mecánica del péndulo, así como la velocidad máxima que alcanzará. Elija como referencia de energía potencial cero la posición de equilibrio.'),
            [
              F(r`h=L(1-\cos30^\circ)=1{,}00\,(1-0{,}866)=0{,}134\ \text{m}`),
              F(r`E_{p,\max}=m\,g\,h=1{,}50\cdot9{,}8\cdot0{,}134=1{,}97\ \text{J}`),
              p('Sense fregament l’energia mecànica es conserva: l’energia potencial màxima (a l’extrem) es converteix en cinètica màxima (a l’equilibri), i ' + M(r`E_m=1{,}97\ \text{J}`) + ':', 'Sin rozamiento la energía mecánica se conserva: la energía potencial máxima (en el extremo) se convierte en cinética máxima (en el equilibrio), y ' + M(r`E_m=1{,}97\ \text{J}`) + ':'),
              F(r`E_{c,\max}=E_{p,\max}=1{,}97\ \text{J}\ \Rightarrow\ v_{\max}=\sqrt{\dfrac{2E_c}{m}}=\sqrt{2gh}=1{,}62\ \text{m/s}`),
              ans('<b>' + M(r`E_{p,\max}=E_{c,\max}=E_m=1{,}97\ \text{J}`) + '</b> i <b>' + M(r`v_{\max}=1{,}62\ \text{m/s}`) + '</b>.', '<b>' + M(r`E_{p,\max}=E_{c,\max}=E_m=1{,}97\ \text{J}`) + '</b> y <b>' + M(r`v_{\max}=1{,}62\ \text{m/s}`) + '</b>.'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('L’Alaitz és a sobre d’un trampolí situat just sobre la vora de la piscina i està a punt de llançar-s’hi. En aquest moment observa un objecte al fons de la piscina amb un angle de 40,0° respecte de la vertical. L’altura del trampolí és de 0,90 metres respecte de la superfície de l’aigua, la fondària de la piscina és de 2,00 metres i els ulls de l’Alaitz es troben a 1,60 metres respecte del trampolí.',
                   'Alaitz está encima de un trampolín situado justo sobre el borde de la piscina y está a punto de lanzarse. En este momento observa un objeto en el fondo de la piscina con un ángulo de 40,0° respecto a la vertical. La altura del trampolín es de 0,90 metros respecto a la superficie del agua, la profundidad de la piscina es de 2,00 metros y los ojos de Alaitz se encuentran a 1,60 metros respecto al trampolín.'),
                 img('fis25-s3-e3b', 554, 534, 'Alaitz al trampolí (ulls a 1,6 m del trampolí, trampolí a 0,9 m de l’aigua), piscina de 2 m de fondària i objecte al fons a una distància x de la vora', 'Alaitz en el trampolín (ojos a 1,6 m del trampolín, trampolín a 0,9 m del agua), piscina de 2 m de profundidad y objeto en el fondo a una distancia x del borde'),
                 DAT(M(r`c=3{,}00\cdot10^{8}\ \text{m s}^{-1}`) + '; ' + M(r`n_{aire}=1{,}00`) + '; ' + M(r`n_{aigua}=1{,}33`) + '.', M(r`c=3{,}00\cdot10^{8}\ \text{m s}^{-1}`) + '; ' + M(r`n_{aire}=1{,}00`) + '; ' + M(r`n_{agua}=1{,}33`) + '.')),
        parts: [
          part('3.1', T('Calculeu a quina distància <i>x</i> es troba l’objecte respecte de la vora de la piscina.', 'Calcule a qué distancia <i>x</i> se encuentra el objeto respecto al borde de la piscina.'),
            [
              p('Els ulls són a ' + M(r`1{,}60+0{,}90=2{,}50\ \text{m}`) + ' sobre l’aigua i just a la vertical de la vora. El raig fa 40,0° amb la vertical a l’aire i toca l’aigua a:', 'Los ojos están a ' + M(r`1{,}60+0{,}90=2{,}50\ \text{m}`) + ' sobre el agua y justo en la vertical del borde. El rayo forma 40,0° con la vertical en el aire y toca el agua a:'),
              F(r`x_1=2{,}50\tan40{,}0^\circ=2{,}10\ \text{m}`),
              p('Refracció (Snell): ' + M(r`\sin40{,}0^\circ=1{,}33\,\sin\theta_2`) + ':', 'Refracción (Snell): ' + M(r`\sin40{,}0^\circ=1{,}33\,\sin\theta_2`) + ':'),
              F(r`\theta_2=\arcsin\dfrac{\sin40{,}0^\circ}{1{,}33}=28{,}9^\circ,\qquad x_2=2{,}00\tan28{,}9^\circ=1{,}10\ \text{m}`),
              figL(pool),
              ans('<b>' + M(r`x=x_1+x_2=3{,}20\ \text{m}`) + '</b>.', '<b>' + M(r`x=x_1+x_2=3{,}20\ \text{m}`) + '</b>.'),
            ]),
          part('3.2', T('L’objecte submergit és un punter làser encès i dirigit cap amunt amb una certa inclinació. A partir de quin angle d’inclinació respecte de la vertical el raig del làser no sortirà de la piscina? A quina velocitat es propagarà el feix làser dins de la piscina? Sabent que la llum que emet el làser té una longitud d’ona de 632,8 nm a l’aire, quina és la freqüència i la longitud d’ona del feix làser dins de la piscina?',
                        'El objeto sumergido es un puntero láser encendido y dirigido hacia arriba con una cierta inclinación. ¿A partir de qué ángulo de inclinación respecto a la vertical el rayo del láser no saldrá de la piscina? ¿A qué velocidad se propagará el haz láser dentro de la piscina? Sabiendo que la luz que emite el láser tiene una longitud de onda de 632,8 nm en el aire, ¿cuál es la frecuencia y la longitud de onda del haz láser dentro de la piscina?'),
            [
              p('El raig no surt si hi ha <b>reflexió total</b> a la superfície aigua-aire, és a dir, si l’angle d’incidència supera l’angle límit:', 'El rayo no sale si hay <b>reflexión total</b> en la superficie agua-aire, es decir, si el ángulo de incidencia supera el ángulo límite:'),
              F(r`\sin\theta_c=\dfrac{n_{aire}}{n_{aigua}}=\dfrac1{1{,}33}\ \Rightarrow\ \theta_c=48{,}8^\circ`),
              F(r`v=\dfrac{c}{n}=\dfrac{3{,}00\cdot10^{8}}{1{,}33}=2{,}26\cdot10^{8}\ \text{m/s}`),
              p('La freqüència <b>no canvia</b> en canviar de medi (la fixa la font):', 'La frecuencia <b>no cambia</b> al cambiar de medio (la fija la fuente):'),
              F(r`f=\dfrac{c}{\lambda_0}=\dfrac{3{,}00\cdot10^{8}}{632{,}8\cdot10^{-9}}=4{,}74\cdot10^{14}\ \text{Hz},\qquad\lambda=\dfrac{v}{f}=\dfrac{\lambda_0}{n}=476\ \text{nm}`),
              ans('Angle ≥ <b>48,8°</b>; <b>' + M(r`v=2{,}26\cdot10^{8}\ \text{m/s}`) + '</b>; <b>' + M(r`f=4{,}74\cdot10^{14}\ \text{Hz}`) + '</b>; <b>' + M(r`\lambda=476\ \text{nm}`) + '</b>.', 'Ángulo ≥ <b>48,8°</b>; <b>' + M(r`v=2{,}26\cdot10^{8}\ \text{m/s}`) + '</b>; <b>' + M(r`f=4{,}74\cdot10^{14}\ \text{Hz}`) + '</b>; <b>' + M(r`\lambda=476\ \text{nm}`) + '</b>.'),
            ]),
        ] },
    ] },

    { n: 4, pts: 2.5, topic: TOP.n,
      intro: J(p('L’isòtop de iode 131 (Z = 53) s’utilitza en radioteràpia per tractar determinades malalties de la tiroide, especialment l’hipertiroïdisme i el càncer de tiroide. Aquest isòtop es desintegra i dóna lloc al xenó 131 estable (Z = 54).',
                 'El isótopo de yodo 131 (Z = 53) se utiliza en radioterapia para tratar determinadas enfermedades de la tiroides, especialmente el hipertiroidismo y el cáncer de tiroides. Este isótopo se desintegra y da lugar al xenón 131 estable (Z = 54).'),
               DAT('nombre d’Avogadro ' + M(r`N_A=6{,}022\cdot10^{23}`) + '; ' + M(r`m(^{131}\text{I})=131\ \text{g/mol}`) + '; període de semidesintegració del iode 131: 8,02 dies.', 'número de Avogadro ' + M(r`N_A=6{,}022\cdot10^{23}`) + '; ' + M(r`m(^{131}\text{I})=131\ \text{g/mol}`) + '; periodo de semidesintegración del yodo 131: 8,02 días.')),
      parts: [
        part('4.1', T('Escriviu la reacció de desintegració d’aquest isòtop. Completeu la reacció nuclear amb totes les partícules que intervenen en la reacció i justifiqueu la resposta. De quin tipus de desintegració es tracta?',
                      'Escriba la reacción de desintegración de este isótopo. Complete la reacción nuclear con todas las partículas que intervienen en la reacción y justifique la respuesta. ¿De qué tipo de desintegración se trata?'),
          [
            F(r`{}^{131}_{53}\text{I}\ \longrightarrow\ {}^{131}_{54}\text{Xe}+{}^{\ 0}_{-1}e+\bar\nu_e`),
            ans('El nombre màssic es conserva (131) i la càrrega també (53 = 54 − 1): Z augmenta en 1, així que un neutró es converteix en protó i s’emeten un electró i un antineutrí. És una <b>desintegració β<sup>−</sup></b>.', 'El número másico se conserva (131) y la carga también (53 = 54 − 1): Z aumenta en 1, así que un neutrón se convierte en protón y se emiten un electrón y un antineutrino. Es una <b>desintegración β<sup>−</sup></b>.'),
          ]),
        part('4.2', T('Si a un pacient se li subministra una pastilla de I-131 amb una activitat de 40,0·10<sup>6</sup> Bq, quina massa de iode 131 conté aquesta pastilla? Quina activitat tindrà l’I-131 al cap d’una setmana? Representeu a la quadrícula de baix l’evolució de l’activitat durant aquesta setmana en funció del temps en dies. La corba ha de tenir com a mínim tres punts calculats.',
                      'Si a un paciente se le suministra una pastilla de I-131 con una actividad de 40,0·10<sup>6</sup> Bq, ¿qué masa de yodo 131 contiene esta pastilla? ¿Qué actividad tendrá el I-131 al cabo de una semana? Represente en la cuadrícula de abajo la evolución de la actividad durante esta semana en función del tiempo en días. La curva debe tener como mínimo tres puntos calculados.'),
          [
            F(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{0{,}693}{8{,}02\cdot86\,400}=1{,}00\cdot10^{-6}\ \text{s}^{-1}`),
            F(r`N=\dfrac{A_0}{\lambda}=\dfrac{40{,}0\cdot10^{6}}{1{,}00\cdot10^{-6}}=4{,}00\cdot10^{13},\qquad m=\dfrac{N}{N_A}\cdot131=8{,}70\cdot10^{-9}\ \text{g}`),
            F(r`A(7\ \text{d})=A_0\,2^{-t/T_{1/2}}=40{,}0\cdot2^{-7/8{,}02}=21{,}8\ \text{MBq}`),
            TAB([['t (d)', '0', '2', '4', '6', '7'], [{ th: 'A (MBq)' }, '40,0', '33,7', '28,3', '23,8', '21,8']]),
            fig(plot({ w: 340, h: 230, xr: [0, 7.6], yr: [0, 44], tickx: [1, 2, 3, 4, 5, 6, 7], ticky: [10, 20, 30, 40], curves: [{ f: t => 40 * Math.pow(2, -t / 8.02), k: 1 }],
              points: [[0, 40], [2, 33.65], [4, 28.31], [6, 23.81], [7, 21.84]], labels: [[7.4, 5, 't (d)', 'end'], [0.3, 43, 'A (MBq)']],
              alt: 'Activitat de l’I-131 en funció del temps durant una setmana, des de 40 MBq fins a 21,8 MBq' })),
            ans('<b>' + M(r`m=8{,}70\cdot10^{-9}\ \text{g}`) + '</b> (8,7 ng) i <b>' + M(r`A=21{,}8\ \text{MBq}`) + '</b> al cap d’una setmana.', '<b>' + M(r`m=8{,}70\cdot10^{-9}\ \text{g}`) + '</b> (8,7 ng) y <b>' + M(r`A=21{,}8\ \text{MBq}`) + '</b> al cabo de una semana.'),
          ]),
      ] },
  ],
};
module.exports = s3;
