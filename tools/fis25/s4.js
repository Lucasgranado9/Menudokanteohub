/* PAU 2025 · Física · sèrie 4 (juliol, versió TEI) */
const L = require('./lib');
const { M, T, p, ans, ul, html, J, r, TOP, F, AN, DAT, fig, figL, img, SV, LN, AR, TX, DOT, RECT, PATH, L2, GC, ECON, MEC, CC, HC, part, TAB } = L;

const cables = lang => SV(360, 170, L2(lang, 'Vista des de dalt: el camp del cable 1 sobre el cable 2 apunta cap a dalt i la força sobre el cable 2 cap al cable 1', 'Vista desde arriba: el campo del cable 1 sobre el cable 2 apunta hacia arriba y la fuerza sobre el cable 2 hacia el cable 1'),
  `<circle class="fe" cx="100" cy="95" r="14"/>` + DOT(100, 95, 3.2, 'fh') + `<circle class="fe" cx="260" cy="95" r="14"/>` + DOT(260, 95, 3.2, 'fh') +
  AR(260, 78, 260, 28) + AR(244, 95, 160, 95, 'vc2') + LN(100, 128, 260, 128, 'dsh') + AR(180, 128, 100, 128, 'vc2') + AR(180, 128, 260, 128, 'vc2') +
  TX(100, 130 + 14, L2(lang, 'cable 1 (I ⊙)', 'cable 1 (I ⊙)')) + TX(260, 130 + 14, L2(lang, 'cable 2 (I ⊙)', 'cable 2 (I ⊙)')) + TX(180, 122, 'd = 0,30 m') +
  TX(272, 38, 'B', 'start') + TX(200, 88, 'F', 'middle'));

const lens2 = lang => {
  const cy = 90, lx = 90, so = 38, sp = 200, f = 31.94, ho = 20, k = ho / f;
  const ox = lx - so, ix = lx + sp, hi = ho * (sp - f) / f;
  const farX = 330, yPar = cy - ho + k * (farX - lx), yCen = cy + (ho / so) * (farX - lx);
  return SV(340, 190, L2(lang, 'Diagrama de rajos: objecte a 3,80 cm de la lent i imatge real, invertida i ampliada a 20,0 cm (escala horitzontal comprimida)', 'Diagrama de rayos: objeto a 3,80 cm de la lente e imagen real, invertida y ampliada a 20,0 cm (escala horizontal comprimida)'),
    LN(8, cy, 332, cy, 'dsh') + LN(lx, 14, lx, 176, 'ln') + AR(lx, 22, lx, 14) + AR(lx, 168, lx, 176) +
    AR(ox, cy, ox, cy - ho, 'vc2') +
    LN(ox, cy - ho, lx, cy - ho, 'vc2') + LN(lx, cy - ho, farX, yPar, 'vc2') + LN(ox, cy - ho, farX, yCen, 'vc2') +
    AR(ix, cy, ix, cy + hi, 'vc') + DOT(lx + f, cy, 2.6, 'fh') + DOT(lx - f, cy, 2.6, 'fh') +
    TX(lx + f, cy + 16, "F'") + TX(lx - f, cy + 16, 'F') + TX(ox - 6, cy + 30, L2(lang, 'objecte', 'objeto'), 'end') + TX(ix + 6, cy + hi * 0.55, L2(lang, 'imatge', 'imagen'), 'start') + TX(lx + 12, 30, L2(lang, 'lent', 'lente'), 'start'));
};

const s4 = {
  id: 4, pdf: 'pdf/pau/pau-2025-fisica-serie4.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g, choose: true, opts: [
      { k: 'A',
        intro: J(DAT(GC + '; ' + M(r`M_S=1{,}99\cdot10^{30}\ \text{kg}`) + '; ' + M(r`R_{ST}=1{,}496\cdot10^{8}\ \text{km}`) + ' (distància mitjana Sol-Terra); ' + M(r`R_P=1{,}475\cdot10^{8}\ \text{km}`) + ' (periheli); ' + M(r`R_A=1{,}526\cdot10^{8}\ \text{km}`) + ' (afeli).',
                     GC + '; ' + M(r`M_S=1{,}99\cdot10^{30}\ \text{kg}`) + '; ' + M(r`R_{ST}=1{,}496\cdot10^{8}\ \text{km}`) + ' (distancia media Sol-Tierra); ' + M(r`R_P=1{,}475\cdot10^{8}\ \text{km}`) + ' (perihelio); ' + M(r`R_A=1{,}526\cdot10^{8}\ \text{km}`) + ' (afelio).')),
        parts: [
          part('1.1', T('Considerant l’òrbita de la Terra al voltant del Sol com una circumferència de radi <i>R</i><sub>ST</sub>, deduïu l’expressió de la velocitat orbital de la Terra al voltant del Sol i calculeu aquesta velocitat. Deduïu l’expressió de la velocitat que hauria de tenir la Terra per allunyar-se indefinidament del Sol i calculeu aquesta velocitat.',
                        'Considerando la órbita de la Tierra alrededor del Sol como una circunferencia de radio <i>R</i><sub>ST</sub>, deduzca la expresión de la velocidad orbital de la Tierra alrededor del Sol y calcule esta velocidad. Deduzca la expresión de la velocidad que debería tener la Tierra para alejarse indefinidamente del Sol y calcule esta velocidad.'),
            [
              p('La força gravitatòria del Sol és la centrípeta:', 'La fuerza gravitatoria del Sol es la centrípeta:'),
              F(r`G\dfrac{M_S m}{R_{ST}^2}=m\dfrac{v^2}{R_{ST}}\ \Rightarrow\ v=\sqrt{\dfrac{GM_S}{R_{ST}}}=\sqrt{\dfrac{6{,}67\cdot10^{-11}\cdot1{,}99\cdot10^{30}}{1{,}496\cdot10^{11}}}=2{,}98\cdot10^{4}\ \text{m/s}`),
              p('Per escapar, l’energia mecànica ha de ser com a mínim zero (arriba a l’infinit amb ' + M('v=0') + '):', 'Para escapar, la energía mecánica debe ser como mínimo cero (llega al infinito con ' + M('v=0') + '):'),
              F(r`\tfrac12 m v_e^2-\dfrac{GM_Sm}{R_{ST}}=0\ \Rightarrow\ v_e=\sqrt{\dfrac{2GM_S}{R_{ST}}}=\sqrt2\,v=4{,}21\cdot10^{4}\ \text{m/s}`),
              ans('<b>' + M(r`v=29{,}8\ \text{km/s}`) + '</b> i <b>' + M(r`v_e=42{,}1\ \text{km/s}`) + '</b>.', '<b>' + M(r`v=29{,}8\ \text{km/s}`) + '</b> y <b>' + M(r`v_e=42{,}1\ \text{km/s}`) + '</b>.'),
            ]),
          part('1.2', T('Ara considereu que l’òrbita de la Terra al voltant del Sol és el·líptica. Aplicant la conservació del moment angular, determineu quantes vegades és més gran la velocitat de la Terra al periheli que a l’afeli. A partir de la segona llei de Kepler, justifiqueu que la velocitat al periheli és més gran que a l’afeli.',
                        'Ahora considere que la órbita de la Tierra alrededor del Sol es elíptica. Aplicando la conservación del momento angular, determine cuántas veces mayor es la velocidad de la Tierra en el perihelio que en el afelio. A partir de la segunda ley de Kepler, justifique que la velocidad en el perihelio es mayor que en el afelio.'),
            [
              p('La força és central, així que ' + M(r`\vec L=m\,\vec r\times\vec v`) + ' es conserva. Al periheli i a l’afeli ' + M(r`\vec r\perp\vec v`) + ':', 'La fuerza es central, así que ' + M(r`\vec L=m\,\vec r\times\vec v`) + ' se conserva. En el perihelio y en el afelio ' + M(r`\vec r\perp\vec v`) + ':'),
              F(r`R_Pv_P=R_Av_A\ \Rightarrow\ \dfrac{v_P}{v_A}=\dfrac{R_A}{R_P}=\dfrac{1{,}526}{1{,}475}=1{,}035`),
              p('<b>Segona llei de Kepler:</b> el radi vector escombra àrees iguals en temps iguals, ' + M(r`\dfrac{dA}{dt}=\tfrac12 r\,v_\perp=\text{cte}`) + '. Al periheli ' + M('r') + ' és mínim, de manera que ' + M('v') + ' ha de ser màxima per mantenir la mateixa àrea per unitat de temps; a l’afeli, al contrari.', '<b>Segunda ley de Kepler:</b> el radio vector barre áreas iguales en tiempos iguales, ' + M(r`\dfrac{dA}{dt}=\tfrac12 r\,v_\perp=\text{cte}`) + '. En el perihelio ' + M('r') + ' es mínimo, de modo que ' + M('v') + ' debe ser máxima para mantener la misma área por unidad de tiempo; en el afelio, al contrario.'),
              ans('La velocitat al periheli és <b>1,035 vegades</b> la de l’afeli (un 3,5 % més gran).', 'La velocidad en el perihelio es <b>1,035 veces</b> la del afelio (un 3,5 % mayor).'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('Al voltant de l’estrella Tau Ceti orbiten dos planetes que estarien a la zona habitable i que, per tant, podrien contenir aigua líquida. Un d’aquests planetes es coneix com a Tau Ceti e.',
                   'Alrededor de la estrella Tau Ceti orbitan dos planetas que estarían en la zona habitable y que, por lo tanto, podrían contener agua líquida. Uno de estos planetas se conoce como Tau Ceti e.'),
                 DAT(GC + '; ' + M(r`M_{T}=1{,}56\cdot10^{30}\ \text{kg}`) + ' (estrella); radi de l’òrbita de Tau Ceti e: ' + M(r`8{,}05\cdot10^{10}\ \text{m}`) + '; ' + M(r`M_{Te}=2{,}26\cdot10^{25}\ \text{kg}`) + '; ' + M(r`R_{Te}=1{,}15\cdot10^{7}\ \text{m}`) + '.',
                     GC + '; ' + M(r`M_{T}=1{,}56\cdot10^{30}\ \text{kg}`) + ' (estrella); radio de la órbita de Tau Ceti e: ' + M(r`8{,}05\cdot10^{10}\ \text{m}`) + '; ' + M(r`M_{Te}=2{,}26\cdot10^{25}\ \text{kg}`) + '; ' + M(r`R_{Te}=1{,}15\cdot10^{7}\ \text{m}`) + '.')),
        parts: [
          part('1.1', T('Suposant una òrbita circular i a partir de la llei de la gravitació universal de Newton, deduïu l’expressió del període orbital d’un planeta al voltant d’una estrella en funció de la massa de l’estrella i del radi orbital. Quants dies dura un any del planeta Tau Ceti e?',
                        'Suponiendo una órbita circular y a partir de la ley de la gravitación universal de Newton, deduzca la expresión del periodo orbital de un planeta alrededor de una estrella en función de la masa de la estrella y del radio orbital. ¿Cuántos días dura un año del planeta Tau Ceti e?'),
            [
              F(r`G\dfrac{M m}{r^2}=m\dfrac{v^2}{r},\ \ v=\dfrac{2\pi r}{T}\ \Rightarrow\ T=2\pi\sqrt{\dfrac{r^3}{G M}}`),
              F(r`T=2\pi\sqrt{\dfrac{(8{,}05\cdot10^{10})^3}{6{,}67\cdot10^{-11}\cdot1{,}56\cdot10^{30}}}=1{,}41\cdot10^{7}\ \text{s}\approx163\ \text{d}`),
              ans('Un any de Tau Ceti e dura <b>uns 163 dies</b>.', 'Un año de Tau Ceti e dura <b>unos 163 días</b>.'),
            ]),
          part('1.2', T('A partir de la llei de la gravitació universal de Newton, deduïu l’expressió de la intensitat del camp gravitatori a la superfície d’un planeta en funció de la massa del planeta i del seu radi. Quina és l’acceleració de la gravetat a la superfície de Tau Ceti e?',
                        'A partir de la ley de la gravitación universal de Newton, deduzca la expresión de la intensidad del campo gravitatorio en la superficie de un planeta en función de la masa del planeta y de su radio. ¿Cuál es la aceleración de la gravedad en la superficie de Tau Ceti e?'),
            [
              p('La força sobre una massa <i>m</i> a la superfície és ' + M(r`F=G\dfrac{Mm}{R^2}`) + ' i el camp és la força per unitat de massa:', 'La fuerza sobre una masa <i>m</i> en la superficie es ' + M(r`F=G\dfrac{Mm}{R^2}`) + ' y el campo es la fuerza por unidad de masa:'),
              F(r`g=\dfrac{F}{m}=\dfrac{GM}{R^2}=\dfrac{6{,}67\cdot10^{-11}\cdot2{,}26\cdot10^{25}}{(1{,}15\cdot10^{7})^2}=11{,}4\ \text{m/s}^2`),
              ans('<b>' + M(r`g=11{,}4\ \text{m/s}^2`) + '</b> (uns 1,16 cops la gravetat terrestre).', '<b>' + M(r`g=11{,}4\ \text{m/s}^2`) + '</b> (unas 1,16 veces la gravedad terrestre).'),
            ]),
        ] },
    ] },

    { n: 2, pts: 2.5, topic: TOP.e,
      intro: J(p('Dos cables estan separats per 0,30 metres, tal com es mostra a la figura de la dreta.', 'Dos cables están separados por 0,30 metros, tal y como se muestra en la figura de la derecha.'),
               img('fis25-s4-e2a', 489, 553, 'Dos cables verticals paral·lels separats 0,3 m, amb corrents I1 i I2 cap amunt (eix z)', 'Dos cables verticales paralelos separados 0,3 m, con corrientes I1 e I2 hacia arriba (eje z)'),
               img('fis25-s4-e2b', 1018, 482, 'Un cable amb corrent cap amunt i una espira rectangular que s’allunya cap a la dreta (figura 1) o es desplaça cap amunt (figura 2)', 'Un cable con corriente hacia arriba y una espira rectangular que se aleja hacia la derecha (figura 1) o se desplaza hacia arriba (figura 2)'),
               DAT('el mòdul del camp magnètic creat per un fil infinit és ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '.', 'el módulo del campo magnético creado por un hilo infinito es ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '.'),
               p('<i>Nota: menyspreeu els efectes del camp magnètic terrestre.</i>', '<i>Nota: desprecie los efectos del campo magnético terrestre.</i>')),
      parts: [
        part('2.1', T('Si se suposa que per aquests cables circula la mateixa intensitat d’1,50 kA i en el mateix sentit, quin camp magnètic generarà el cable 1 a la distància on es troba el cable 2? Quina força per unitat de longitud rebrà el cable 2? Feu un esquema dels dos cables indicant el sentit del camp magnètic i de la força que rep el cable 2.',
                      'Si se supone que por estos cables circula la misma intensidad de 1,50 kA y en el mismo sentido, ¿qué campo magnético generará el cable 1 a la distancia donde se encuentra el cable 2? ¿Qué fuerza por unidad de longitud recibirá el cable 2? Realice un esquema de los dos cables indicando el sentido del campo magnético y de la fuerza que recibe el cable 2.'),
          [
            F(r`B_1=\dfrac{\mu_0I}{2\pi d}=\dfrac{4\pi\cdot10^{-7}\cdot1{,}50\cdot10^{3}}{2\pi\cdot0{,}30}=1{,}00\cdot10^{-3}\ \text{T}`),
            F(r`\dfrac{F}{\ell}=I_2\,B_1=1{,}50\cdot10^{3}\cdot1{,}00\cdot10^{-3}=1{,}50\ \text{N/m}`),
            p('Amb el corrent cap a ' + M('+z') + ', el camp del cable 1 sobre el cable 2 (a la dreta, a ' + M('+y') + ') apunta cap a ' + M('-x') + ' (regla de la mà dreta). Aleshores ' + M(r`\vec F=I\,\vec\ell\times\vec B`) + ' apunta cap a ' + M('-y') + ': <b>cap al cable 1</b>, és a dir, els cables <b>s’atrauen</b> (corrents del mateix sentit). L’esquema, vist des de dalt (' + M('x') + ' cap avall, ' + M('y') + ' cap a la dreta):', 'Con la corriente hacia ' + M('+z') + ', el campo del cable 1 sobre el cable 2 (a la derecha, en ' + M('+y') + ') apunta hacia ' + M('-x') + ' (regla de la mano derecha). Entonces ' + M(r`\vec F=I\,\vec\ell\times\vec B`) + ' apunta hacia ' + M('-y') + ': <b>hacia el cable 1</b>, es decir, los cables <b>se atraen</b> (corrientes del mismo sentido). El esquema, visto desde arriba (' + M('x') + ' hacia abajo, ' + M('y') + ' hacia la derecha):'),
            figL(cables),
            ans('<b>' + M(r`B=1{,}00\ \text{mT}`) + '</b> i <b>' + M(r`F/\ell=1{,}50\ \text{N/m}`) + '</b> (atractiva).', '<b>' + M(r`B=1{,}00\ \text{mT}`) + '</b> y <b>' + M(r`F/\ell=1{,}50\ \text{N/m}`) + '</b> (atractiva).'),
          ]),
        part('2.2', T('Si ens fixem en un sol cable, i tenim una espira rectangular conductora a una certa distància d’aquest i l’anem allunyant tal com s’indica a la figura 1, apareixerà un corrent induït a l’espira? Hi haurà un corrent induït si l’espira es desplaça cap amunt, tal com es mostra a la figura 2? En els casos on es generi un corrent induït, indiqueu el sentit del corrent. Justifiqueu totes les respostes.',
                      'Si nos fijamos en un solo cable, y tenemos una espira rectangular conductora a una cierta distancia de este y la vamos alejando tal y como se indica en la figura 1, ¿aparecerá una corriente inducida en la espira? ¿Habrá una corriente inducida si la espira se desplaza hacia arriba, tal y como se muestra en la figura 2? En los casos donde se genere una corriente inducida, indique el sentido de la corriente. Justifique todas las respuestas.'),
          [
            p('A la dreta d’un fil amb corrent cap amunt, el camp és <b>entrant al paper</b> (regla de la mà dreta) i disminueix amb la distància: ' + M(r`B=\dfrac{\mu_0I}{2\pi r}`) + '.', 'A la derecha de un hilo con corriente hacia arriba, el campo es <b>entrante en el papel</b> (regla de la mano derecha) y disminuye con la distancia: ' + M(r`B=\dfrac{\mu_0I}{2\pi r}`) + '.'),
            p('<b>Figura 1 (s’allunya):</b> el flux entrant a través de l’espira <b>disminueix</b>. Per la llei de Lenz el corrent induït s’hi oposa creant un camp també entrant dins l’espira: corrent en sentit <b>horari</b>. Sí que hi ha corrent induït.', '<b>Figura 1 (se aleja):</b> el flujo entrante a través de la espira <b>disminuye</b>. Por la ley de Lenz la corriente inducida se opone creando un campo también entrante dentro de la espira: corriente en sentido <b>horario</b>. Sí hay corriente inducida.'),
            p('<b>Figura 2 (puja en paral·lel al fil):</b> cada punt de l’espira continua a la mateixa distància del fil, així que ' + M('B') + ' i l’àrea no canvien: el flux és constant, ' + M(r`\varepsilon=-d\Phi/dt=0`) + ', i <b>no hi ha corrent induït</b>.', '<b>Figura 2 (sube en paralelo al hilo):</b> cada punto de la espira sigue a la misma distancia del hilo, así que ' + M('B') + ' y el área no cambian: el flujo es constante, ' + M(r`\varepsilon=-d\Phi/dt=0`) + ', y <b>no hay corriente inducida</b>.'),
          ]),
      ] },

    { n: 3, pts: 2.5, topic: TOP.o,
      intro: p('Avui al cinema es projecta una pel·lícula antiga amb el format de super-8, en què els fotogrames tenen una altura de 4,00 mm. El projector té una única lent i es pot variar la posició de la pel·lícula per focalitzar la imatge a la pantalla. La pantalla és a 16,0 m de la lent del projector i té 2,00 m d’altura.',
               'Hoy en el cine se proyecta una película antigua con el formato de super-8, en la que los fotogramas tienen una altura de 4,00 mm. El proyector tiene una única lente y se puede variar la posición de la película para focalizar la imagen en la pantalla. La pantalla está a 16,0 m de la lente del proyector y tiene 2,00 m de altura.'),
      parts: [
        part('3.1', T('Si se sap que el projector inverteix la imatge, a quina distància de la lent s’ha de posar la pel·lícula perquè la imatge projectada encaixi exactament a la pantalla? Calculeu la potència que ha de tenir la lent del projector per obtenir una imatge enfocada.',
                      'Si se sabe que el proyector invierte la imagen, ¿a qué distancia de la lente se tiene que poner la película para que la imagen proyectada encaje exactamente en la pantalla? Calcule la potencia que debe tener la lente del proyector para que se obtenga una imagen enfocada.'),
          [
            p('Augment lateral (imatge invertida, ' + M(r`y'<0`) + '):', 'Aumento lateral (imagen invertida, ' + M(r`y'<0`) + '):'),
            F(r`\dfrac{y'}{y}=\dfrac{s'}{s}\ \Rightarrow\ \dfrac{-2{,}00}{4{,}00\cdot10^{-3}}=\dfrac{16{,}0}{s}\ \Rightarrow\ s=-3{,}20\cdot10^{-2}\ \text{m}`),
            p('La pel·lícula és a <b>3,20 cm</b> davant la lent. Equació de les lents primes (normes DIN, ' + M(r`s'=+16{,}0`) + ' m):', 'La película está a <b>3,20 cm</b> delante de la lente. Ecuación de las lentes delgadas (normas DIN, ' + M(r`s'=+16{,}0`) + ' m):'),
            F(r`P=\dfrac1{f'}=\dfrac1{s'}-\dfrac1s=\dfrac1{16{,}0}+\dfrac1{0{,}0320}=31{,}3\ \text{D}\quad(f'=3{,}19\ \text{cm})`),
            ans('<b>' + M(r`s=-3{,}20\ \text{cm}`) + '</b> i <b>' + M(r`P=31{,}3\ \text{D}`) + '</b> (lent convergent).', '<b>' + M(r`s=-3{,}20\ \text{cm}`) + '</b> y <b>' + M(r`P=31{,}3\ \text{D}`) + '</b> (lente convergente).'),
          ]),
        part('3.2', T('Abans de projectar la pel·lícula, l’operador de cabina la vol visionar en una pantalla situada a 20,0 cm de la lent. Quina distància ha d’haver-hi entre la lent i la pel·lícula perquè la pel·lícula quedi enfocada a la pantalla? Feu el diagrama de rajos corresponent a la quadrícula de baix.',
                      'Antes de proyectar la película, el operador de cabina la quiere visionar en una pantalla situada a 20,0 cm de la lente. ¿Qué distancia debe haber entre la lente y la película para que la película quede enfocada en la pantalla? Realice el correspondiente diagrama de rayos en la cuadrícula de abajo.'),
          [
            F(r`\dfrac1s=\dfrac1{s'}-P=\dfrac1{0{,}200}-31{,}3=-26{,}3\ \text{m}^{-1}\ \Rightarrow\ s=-3{,}80\cdot10^{-2}\ \text{m}`),
            p('La imatge és real i invertida, amb augment ' + M(r`\dfrac{s'}{s}=-5{,}26`) + ' (fotograma de 21,1 mm). Diagrama (escala horitzontal comprimida; el raig paral·lel passa pel focus imatge i el central no es desvia):', 'La imagen es real e invertida, con aumento ' + M(r`\dfrac{s'}{s}=-5{,}26`) + ' (fotograma de 21,1 mm). Diagrama (escala horizontal comprimida; el rayo paralelo pasa por el foco imagen y el central no se desvía):'),
            figL(lens2),
            ans('<b>' + M(r`s=-3{,}80\ \text{cm}`) + '</b>: la pel·lícula a 3,80 cm de la lent.', '<b>' + M(r`s=-3{,}80\ \text{cm}`) + '</b>: la película a 3,80 cm de la lente.'),
          ]),
      ] },

    { n: 4, pts: 2.5, topic: TOP.n, choose: true, opts: [
      { k: 'A',
        intro: J(p('El potassi (Z = 19) constitueix el 0,36 % de la nostra massa corporal i el 0,012 % del potassi és potassi 40. L’isòtop potassi 40 és radioactiu, té una massa molar de 40,0 g/mol i un període de semidesintegració d’1,30·10<sup>9</sup> anys.',
                   'El potasio (Z = 19) constituye el 0,36 % de nuestra masa corporal y el 0,012 % del potasio es potasio 40. El isótopo potasio 40 es radiactivo, tiene una masa molar de 40,0 g/mol y un periodo de semidesintegración de 1,30·10<sup>9</sup> años.'),
                 DAT('nombre d’Avogadro ' + M(r`N_A=6{,}022\cdot10^{23}`) + '.', 'número de Avogadro ' + M(r`N_A=6{,}022\cdot10^{23}`) + '.')),
        parts: [
          part('4.1', T('Calculeu el nombre de nuclis del potassi 40. Calculeu també l’activitat del potassi 40 en una persona de 80 kg.',
                        'Calcule el número de núcleos del potasio 40. Calcule también la actividad del potasio 40 en una persona de 80 kg.'),
            [
              F(r`m_K=0{,}36\,\%\cdot80\ \text{kg}=288\ \text{g},\qquad m_{40}=0{,}012\,\%\cdot288=3{,}46\cdot10^{-2}\ \text{g}`),
              F(r`N=\dfrac{3{,}46\cdot10^{-2}}{40{,}0}\cdot6{,}022\cdot10^{23}=5{,}20\cdot10^{20}`),
              F(r`\lambda=\dfrac{\ln2}{T_{1/2}}=\dfrac{0{,}693}{1{,}30\cdot10^{9}\cdot3{,}156\cdot10^{7}\ \text{s}}=1{,}69\cdot10^{-17}\ \text{s}^{-1}`),
              F(r`A=\lambda N=1{,}69\cdot10^{-17}\cdot5{,}20\cdot10^{20}=8{,}79\cdot10^{3}\ \text{Bq}`),
              ans('<b>' + M(r`N=5{,}20\cdot10^{20}`) + '</b> nuclis i <b>' + M(r`A\approx8{,}8\ \text{kBq}`) + '</b>.', '<b>' + M(r`N=5{,}20\cdot10^{20}`) + '</b> núcleos y <b>' + M(r`A\approx8{,}8\ \text{kBq}`) + '</b>.'),
            ]),
          part('4.2', T('El 89 % del potassi 40 es desintegra en calci (Z = 20). Escriviu l’equació de la desintegració del potassi 40 en calci, incloent-hi totes les partícules que hi intervenen. De quin tipus de desintegració es tracta?',
                        'El 89 % del potasio 40 se desintegra en calcio (Z = 20). Escriba la ecuación de la desintegración del potasio 40 en calcio, incluyendo todas las partículas que intervienen. ¿De qué tipo de desintegración se trata?'),
            [
              F(r`{}^{40}_{19}\text{K}\ \longrightarrow\ {}^{40}_{20}\text{Ca}+{}^{\ 0}_{-1}e+\bar\nu_e`),
              ans('Es conserven el nombre màssic (40) i la càrrega (19 = 20 − 1). És una <b>desintegració β<sup>−</sup></b>: un neutró es converteix en protó i s’emeten un electró i un antineutrí.', 'Se conservan el número másico (40) y la carga (19 = 20 − 1). Es una <b>desintegración β<sup>−</sup></b>: un neutrón se convierte en protón y se emiten un electrón y un antineutrino.'),
            ]),
        ] },
      { k: 'B',
        intro: J(p('En un experiment d’efecte fotoelèctric, es fa incidir una llum monocromàtica sobre diferents superfícies metàl·liques. Els valors de les funcions de treball dels metalls utilitzats es recullen en la taula següent.',
                   'En un experimento de efecto fotoeléctrico, se hace incidir una luz monocromática sobre diferentes superficies metálicas. Los valores de las funciones de trabajo de los metales utilizados se recogen en la siguiente tabla.'),
                 TAB([['Metall / Metal', 'Cs', 'Na', 'K', 'Ca', 'Al'], [{ th: 'Φ (eV)' }, '2,14', '2,75', '2,30', '2,87', '4,28']]),
                 DAT(ECON + '; ' + MEC + '; ' + CC + '; ' + M(r`1\ \text{eV}=1{,}602\cdot10^{-19}\ \text{J}`) + '; ' + HC + '. Massa relativista: ' + M(r`m=\dfrac{m_0}{\sqrt{1-v^2/c^2}}`) + '.', ECON + '; ' + MEC + '; ' + CC + '; ' + M(r`1\ \text{eV}=1{,}602\cdot10^{-19}\ \text{J}`) + '; ' + HC + '. Masa relativista: ' + M(r`m=\dfrac{m_0}{\sqrt{1-v^2/c^2}}`) + '.')),
        parts: [
          part('4.1', T('La llum utilitzada té una longitud d’ona λ = 514 nm. Justifiqueu en quins metalls de la taula anterior es produirà l’efecte fotoelèctric. Expliqueu què és el potencial de frenada i com es relaciona amb l’energia cinètica dels electrons. Calculeu el potencial de frenada per a cadascun dels metalls en què hi ha efecte fotoelèctric.',
                        'La luz utilizada tiene una longitud de onda λ = 514 nm. Justifique en qué metales de la tabla anterior se producirá el efecto fotoeléctrico. Explique qué es el potencial de frenado y cómo se relaciona con la energía cinética de los electrones. Calcule el potencial de frenado para cada uno de los metales en los que hay efecto fotoeléctrico.'),
            [
              F(r`E_f=\dfrac{hc}{\lambda}=\dfrac{6{,}63\cdot10^{-34}\cdot3{,}00\cdot10^{8}}{514\cdot10^{-9}}=3{,}87\cdot10^{-19}\ \text{J}=2{,}42\ \text{eV}`),
              p('Hi ha efecte fotoelèctric si ' + M(r`E_f>\Phi`) + ': <b>cesi (2,14 eV) i potassi (2,30 eV)</b>. No en el sodi (2,75), el calci (2,87) ni l’alumini (4,28).', 'Hay efecto fotoeléctrico si ' + M(r`E_f>\Phi`) + ': <b>cesio (2,14 eV) y potasio (2,30 eV)</b>. No en el sodio (2,75), el calcio (2,87) ni el aluminio (4,28).'),
              p('El <b>potencial de frenada</b> ' + M('V_f') + ' és la diferència de potencial que cal aplicar per aturar els electrons emesos més ràpids: ' + M(r`e\,V_f=E_{c,\max}=E_f-\Phi`) + '.', 'El <b>potencial de frenado</b> ' + M('V_f') + ' es la diferencia de potencial que hay que aplicar para detener a los electrones emitidos más rápidos: ' + M(r`e\,V_f=E_{c,\max}=E_f-\Phi`) + '.'),
              F(r`V_f(\text{Cs})=2{,}42-2{,}14=0{,}28\ \text{V},\qquad V_f(\text{K})=2{,}42-2{,}30=0{,}12\ \text{V}`),
            ]),
          part('4.2', T('Es realitza l’experiment de l’efecte fotoelèctric amb una superfície de cesi i una llum de longitud d’ona λ = 300 nm. Calculeu quina serà la velocitat màxima dels electrons emesos. Calculeu també quina seria la massa relativista d’aquests electrons. A partir d’aquests resultats, justifiqueu si cal tenir en compte el comportament relativista en aquest cas.',
                        'Se realiza el experimento del efecto fotoeléctrico con una superficie de cesio y una luz de longitud de onda λ = 300 nm. Calcule cuál será la velocidad máxima de los electrones emitidos. Calcule también cuál sería la masa relativista de estos electrones. A partir de estos resultados, justifique si hay que tener en cuenta el comportamiento relativista en este caso.'),
            [
              F(r`E_f=\dfrac{hc}{\lambda}=6{,}63\cdot10^{-19}\ \text{J},\quad\Phi=2{,}14\cdot1{,}602\cdot10^{-19}=3{,}43\cdot10^{-19}\ \text{J}`),
              F(r`E_{c}=E_f-\Phi=3{,}20\cdot10^{-19}\ \text{J}\ \Rightarrow\ v=\sqrt{\dfrac{2E_c}{m_e}}=8{,}38\cdot10^{5}\ \text{m/s}`),
              F(r`\dfrac vc=2{,}79\cdot10^{-3},\qquad m=\dfrac{m_e}{\sqrt{1-(v/c)^2}}=9{,}110\,04\cdot10^{-31}\ \text{kg}`),
              ans('<b>' + M(r`v=8{,}38\cdot10^{5}\ \text{m/s}`) + '</b>; ' + M(r`m\approx m_e`) + ' (varia un 0,0004 %). Com que ' + M(r`v\ll c`) + ' (0,28 % de ' + M('c') + '), <b>no cal tenir en compte la relativitat</b>: n’hi ha prou amb la mecànica clàssica.', '<b>' + M(r`v=8{,}38\cdot10^{5}\ \text{m/s}`) + '</b>; ' + M(r`m\approx m_e`) + ' (varía un 0,0004 %). Como ' + M(r`v\ll c`) + ' (0,28 % de ' + M('c') + '), <b>no hace falta tener en cuenta la relatividad</b>: basta con la mecánica clásica.'),
            ]),
        ] },
    ] },
  ],
};
module.exports = s4;
