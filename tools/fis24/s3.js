/* PAU 2024 · Física · sèrie 3 (setembre). Set problemes, se'n responen quatre. */
const L = require('../fis25/lib');
const { M, T, p, ans, ul, html, J, r, TOP, F, AN, DAT, fig, figL, img, SV, LN, AR, TX, DOT, RECT, PATH, L2, GC, ECON, MEC, HC, part, plot } = L;

const orbit = lang => SV(360, 220, L2(lang, 'Estrella al centre, planeta en òrbita circular i vector d’acceleració normal cap a l’estrella', 'Estrella en el centro, planeta en órbita circular y vector de aceleración normal hacia la estrella'),
  `<circle class="ln" cx="180" cy="110" r="80" fill="none" stroke-dasharray="4 4"/>` + `<circle class="sun" cx="180" cy="110" r="14"/>` + DOT(260, 110, 7, 'pt2') +
  AR(252, 110, 206, 110, 'vc') + LN(180, 110, 260, 110, 'dsh') + TX(180, 140, L2(lang, 'estrella', 'estrella')) + TX(268, 100, L2(lang, 'planeta', 'planeta'), 'start') +
  TX(228, 100, 'a<tspan dy="3" font-size="9">n</tspan>', 'middle') + TX(220, 126, 'r', 'middle'));

const stick = lang => SV(360, 230, L2(lang, 'Varita i objecte carregats amb el mateix signe: pes cap avall i repulsió elèctrica cap amunt', 'Varita y objeto cargados con el mismo signo: peso hacia abajo y repulsión eléctrica hacia arriba'),
  RECT(160, 170, 40, 40) + DOT(180, 160, 6, 'pt2') + TX(180, 148, 'q<0', 'middle') + DOT(180, 60, 9, 'pt2') + TX(196, 56, 'q<0', 'start') +
  AR(180, 48, 180, 14, 'vc') + AR(180, 72, 180, 112, 'vc2') + TX(190, 22, 'F<tspan dy="3" font-size="9">e</tspan>', 'start') + TX(190, 108, 'P', 'start') +
  LN(180, 60, 180, 160, 'dsh') + TX(120, 112, 'r', 'middle') + TX(180, 224, L2(lang, 'varita', 'varita'), 'middle'));

const lens = lang => {
  // escala 1,6 px/cm; eix a y=110; lent a x=120
  return SV(420, 230, L2(lang, 'Diagrama de raigs: objecte a 25 cm de la lent (f = 20 cm); imatge real, invertida i de 40 cm a 100 cm', 'Diagrama de rayos: objeto a 25 cm de la lente (f = 20 cm); imagen real, invertida y de 40 cm a 100 cm'),
    LN(10, 110, 410, 110) + `<path class="eq" d="M120,40 L120,180"/>` + `<path class="eq" d="M114,50 L120,40 L126,50 M114,170 L120,180 L126,170"/>` +
    AR(80, 110, 80, 94, 'vc') + AR(280, 110, 280, 174, 'vc') +
    LN(80, 94, 120, 94, 'vc2') + LN(120, 94, 280, 174, 'vc2') + LN(80, 94, 280, 174, 'vc') +
    DOT(88, 110, 3, 'pt') + DOT(152, 110, 3, 'pt') + TX(88, 126, 'F', 'middle') + TX(152, 126, 'F′', 'middle') +
    TX(80, 84, L2(lang, 'objecte', 'objeto'), 'middle') + TX(290, 186, L2(lang, 'imatge', 'imagen'), 'start') + TX(120, 34, L2(lang, 'lent', 'lente'), 'middle'));
};

const s3 = {
  id: 3, pdf: 'pdf/pau/pau-2024-fisica-serie3.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.g,
      lead: p('<i>Cal respondre a QUATRE dels set problemes següents (cadascun val 2,5 punts).</i>', '<i>Hay que responder a CUATRO de los siete problemas siguientes (cada uno vale 2,5 puntos).</i>'),
      intro: J(p('Els sistemes planetaris tendeixen a formar-se en ressonància. Això vol dir que, quan un planeta completa <i>n</i> òrbites, el planeta veí en completa <i>m</i>, on <i>n</i> i <i>m</i> són nombres enters. El novembre del 2023, la revista <i>Nature</i> va publicar el descobriment de sis planetes que orbitaven en ressonància l’estrella HD110067.',
                 'Los sistemas planetarios tienden a formarse en resonancia. Esto significa que, cuando un planeta completa <i>n</i> órbitas, el planeta vecino completa <i>m</i>, donde <i>n</i> y <i>m</i> son números enteros. En noviembre de 2023, la revista <i>Nature</i> publicaba el descubrimiento de seis planetas orbitando en resonancia la estrella HD110067.'),
               DAT(GC + '; ' + M(r`M_T=5{,}98\cdot10^{24}\ \text{kg}`) + '; ' + M(r`M_S=1{,}98\cdot10^{30}\ \text{kg}`) + '.', GC + '; ' + M(r`M_T=5{,}98\cdot10^{24}\ \text{kg}`) + '; ' + M(r`M_S=1{,}98\cdot10^{30}\ \text{kg}`) + '.')),
      parts: [
        part('a', T('Suposem que aquesta estrella té la massa del Sol i que els planetes tenen òrbites circulars. El sisè planeta, el més exterior, té un període de 54,7 dies. Calculeu la distància entre el planeta i l’estrella. Representeu l’estrella i el planeta, dibuixeu el vector d’acceleració normal i calculeu-ne el mòdul.',
                    'Supongamos que esta estrella tiene la masa del Sol y que los planetas tienen órbitas circulares. El sexto planeta, el más exterior, tiene un período de 54,7 días. Calcule la distancia entre el planeta y la estrella. Represente la estrella y el planeta, dibuje el vector de aceleración normal y calcule su módulo.'),
          [
            p('La gravetat és la força centrípeta: ' + M(r`G\dfrac{Mm}{r^2}=m\dfrac{4\pi^2}{T^2}r`) + '. Amb ' + M(r`T=54{,}7\cdot86\,400=4{,}73\cdot10^{6}\ \text{s}`) + ':', 'La gravedad es la fuerza centrípeta: ' + M(r`G\dfrac{Mm}{r^2}=m\dfrac{4\pi^2}{T^2}r`) + '. Con ' + M(r`T=54{,}7\cdot86\,400=4{,}73\cdot10^{6}\ \text{s}`) + ':'),
            F(r`r_6=\sqrt[3]{\dfrac{GMT^2}{4\pi^2}}=\sqrt[3]{\dfrac{6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}\cdot(4{,}73\cdot10^{6})^2}{4\pi^2}}=4{,}21\cdot10^{10}\ \text{m}`),
            figL(orbit),
            p('L’acceleració normal apunta cap a l’estrella (centre de l’òrbita):', 'La aceleración normal apunta hacia la estrella (centro de la órbita):'),
            F(r`a_n=\dfrac{GM}{r_6^2}=\dfrac{6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}}{(4{,}21\cdot10^{10})^2}=7{,}44\cdot10^{-2}\ \text{m/s}^2`),
          ]),
        part('b', T('El cinquè planeta completa 4 òrbites en el mateix temps que el sisè en completa 3 (relació 4:3). Calculeu el radi de l’òrbita del cinquè planeta i l’energia mecànica d’aquest suposant que la seva massa és 2,5 vegades la terrestre.',
                    'El quinto planeta completa 4 órbitas en el mismo tiempo que el sexto planeta completa 3 (relación 4:3). Calcule el radio de la órbita del quinto planeta y la energía mecánica de este suponiendo que su masa es 2,5 veces la terrestre.'),
          [
            p('En el mateix temps ' + M(r`4T_5=3T_6`) + ', així que ' + M(r`T_5=\tfrac34T_6`) + '. Per la tercera llei de Kepler ' + M(r`r^3\propto T^2`) + ':', 'En el mismo tiempo ' + M(r`4T_5=3T_6`) + ', así que ' + M(r`T_5=\tfrac34T_6`) + '. Por la tercera ley de Kepler ' + M(r`r^3\propto T^2`) + ':'),
            F(r`r_5=r_6\Big(\dfrac{T_5}{T_6}\Big)^{2/3}=4{,}21\cdot10^{10}\cdot0{,}75^{2/3}=3{,}48\cdot10^{10}\ \text{m}`),
            p('En una òrbita circular ' + M(r`E_m=-\dfrac{GMm}{2r}`) + ' amb ' + M(r`m=2{,}5\cdot5{,}98\cdot10^{24}=1{,}50\cdot10^{25}\ \text{kg}`) + ':', 'En una órbita circular ' + M(r`E_m=-\dfrac{GMm}{2r}`) + ' con ' + M(r`m=2{,}5\cdot5{,}98\cdot10^{24}=1{,}50\cdot10^{25}\ \text{kg}`) + ':'),
            F(r`E_m=-\dfrac{6{,}67\cdot10^{-11}\cdot1{,}98\cdot10^{30}\cdot1{,}50\cdot10^{25}}{2\cdot3{,}48\cdot10^{10}}=-2{,}84\cdot10^{34}\ \text{J}`),
          ]),
      ] },

    { n: 2, pts: 2.5, topic: TOP.o,
      intro: J(p('Dos altaveus estan separats entre ells una distància 2<i>d</i> i emeten un senyal harmònic i en fase. El so es produeix amb un generador de senyals que es pot ajustar entre els 200 i els 400 Hz. La persona A està situada a <i>d</i><sub>1</sub> = 5,00 m de l’altaveu 1 i a <i>d</i><sub>2</sub> = 8,68 m de l’altaveu 2. Una segona persona B està situada a <i>d</i>′<sub>1</sub> = 8,14 m de l’altaveu 1 i a <i>d</i>′<sub>2</sub> = 4,00 m de l’altaveu 2.',
                 'Dos altavoces están separados entre sí una distancia 2<i>d</i> y emiten una señal armónica y en fase. El sonido se produce con un generador de señales que se puede ajustar entre los 200 y los 400 Hz. La persona A está situada a <i>d</i><sub>1</sub> = 5,00 m del altavoz 1 y a <i>d</i><sub>2</sub> = 8,68 m del altavoz 2. Una segunda persona B está situada a <i>d</i>′<sub>1</sub> = 8,14 m del altavoz 1 y a <i>d</i>′<sub>2</sub> = 4,00 m del altavoz 2.'),
               img('fis24-s3-p2', 625, 308, 'Dos altaveus separats 2d i les persones A i B a les distàncies indicades', 'Dos altavoces separados 2d y las personas A y B a las distancias indicadas'),
               DAT(M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '; velocitat del so a l’aire: 340 m/s; superfície esfèrica: ' + M(r`4\pi r^2`) + '.', M(r`I_0=10^{-12}\ \text{W m}^{-2}`) + '; velocidad del sonido en el aire: 340 m/s; superficie esférica: ' + M(r`4\pi r^2`) + '.'),
               p('<i>Nota: considereu que les ones sonores es propaguen en les tres dimensions de l’espai i que la seva energia es distribueix en superfícies esfèriques.</i>', '<i>Nota: considere que las ondas sonoras se propagan en las tres dimensiones del espacio y que su energía se distribuye en superficies esféricas.</i>')),
      parts: [
        part('a', T('Calculeu totes les freqüències que es poden triar al generador perquè la persona A senti els senyals amb una intensitat màxima. Quina freqüència de les anteriors s’ha de triar perquè la persona A senti el senyal amb intensitat màxima i la persona B no el pugui sentir (és a dir, el senti amb intensitat mínima)?',
                    'Calcule todas las frecuencias que se pueden escoger en el generador para que la persona A oiga las señales con una intensidad máxima. ¿Qué frecuencia de las anteriores se debe escoger para que la persona A oiga la señal con intensidad máxima y la persona B no la pueda oír (es decir, la oiga con intensidad mínima)?'),
          [
            p('<b>Persona A.</b> Màxim (interferència constructiva) si la diferència de camins és un nombre enter de longituds d’ona:', '<b>Persona A.</b> Máximo (interferencia constructiva) si la diferencia de caminos es un número entero de longitudes de onda:'),
            F(r`\Delta r_A=8{,}68-5{,}00=3{,}68\ \text{m}=n\lambda=n\dfrac{v}{f}\ \Rightarrow\ f=n\dfrac{340}{3{,}68}=n\cdot92{,}4\ \text{Hz}`),
            p('Dins de 200–400 Hz: ' + M('n=3') + ' → <b>277 Hz</b> i ' + M('n=4') + ' → <b>370 Hz</b> (amb ' + M('n=2') + ' en surten 185 Hz, fora de l’interval).', 'Dentro de 200–400 Hz: ' + M('n=3') + ' → <b>277 Hz</b> y ' + M('n=4') + ' → <b>370 Hz</b> (con ' + M('n=2') + ' salen 185 Hz, fuera del intervalo).'),
            p('<b>Persona B.</b> Mínim (interferència destructiva) si la diferència de camins és un nombre imparell de mitges longituds d’ona:', '<b>Persona B.</b> Mínimo (interferencia destructiva) si la diferencia de caminos es un número impar de semilongitudes de onda:'),
            F(r`\Delta r_B=8{,}14-4{,}00=4{,}14\ \text{m}=(2m+1)\dfrac{\lambda}{2}\ \Rightarrow\ f=(2m+1)\dfrac{340}{2\cdot4{,}14}=(2m+1)\cdot41{,}06\ \text{Hz}`),
            p('Per a 277 Hz: ' + M(r`277{,}2/41{,}06=6{,}75`) + ' (no és un enter imparell). Per a 370 Hz: ' + M(r`369{,}6/41{,}06=9{,}00`) + ', i 9 és imparell.', 'Para 277 Hz: ' + M(r`277{,}2/41{,}06=6{,}75`) + ' (no es un entero impar). Para 370 Hz: ' + M(r`369{,}6/41{,}06=9{,}00`) + ', y 9 es impar.'),
            ans('Freqüències per a A: <b>277 Hz i 370 Hz</b>. Cal triar <b>370 Hz</b>: A hi sent un màxim i B un mínim.', 'Frecuencias para A: <b>277 Hz y 370 Hz</b>. Hay que elegir <b>370 Hz</b>: A oye un máximo y B un mínimo.'),
          ]),
        part('b', T('Ara s’emet música pels dos altaveus amb una potència de ' + M(r`2{,}36\cdot10^{-3}\ \text{W}`) + ' cadascun. Calculeu la intensitat sonora generada per cada altaveu a la posició de la persona A. Determineu el nivell d’intensitat sonora que percep aquesta persona.',
                    'Ahora se emite música por los dos altavoces con una potencia de ' + M(r`2{,}36\cdot10^{-3}\ \text{W}`) + ' cada uno. Calcule la intensidad sonora generada por cada altavoz en la posición de la persona A. Determine el nivel de intensidad sonora que percibe esta persona.'),
          [
            F(r`I_1=\dfrac{P}{4\pi d_1^2}=\dfrac{2{,}36\cdot10^{-3}}{4\pi\cdot5{,}00^2}=7{,}51\cdot10^{-6}\ \text{W/m}^2`),
            F(r`I_2=\dfrac{P}{4\pi d_2^2}=\dfrac{2{,}36\cdot10^{-3}}{4\pi\cdot8{,}68^2}=2{,}49\cdot10^{-6}\ \text{W/m}^2`),
            p('La música no és un senyal d’una sola freqüència coherent, així que no hi ha interferència estable i les intensitats se sumen:', 'La música no es una señal de una sola frecuencia coherente, así que no hay interferencia estable y las intensidades se suman:'),
            F(r`I=I_1+I_2=1{,}00\cdot10^{-5}\ \text{W/m}^2\quad\Rightarrow\quad \beta=10\log\dfrac{I}{I_0}=10\log\dfrac{1{,}00\cdot10^{-5}}{10^{-12}}=70{,}0\ \text{dB}`),
            AN(r`\beta=70{,}0\ \text{dB}`),
          ]),
      ] },

    { n: 3, pts: 2.5, topic: TOP.e,
      intro: J(p('El Fun-Fly-Stick és un enginyós generador d’electricitat estàtica que funciona amb piles i que permet fer levitar objectes metàl·lics lleugers. Quan es prem el botó es genera una càrrega estàtica negativa a la vareta. Tocant l’objecte amb la vareta, part d’aquesta càrrega es transfereix a l’objecte de manera que tots dos queden carregats i l’objecte levita per sobre de la vareta. (En fer els càlculs, considereu la vareta i l’objecte metàl·lic com si fossin càrregues puntuals).',
                 'El Fun-Fly-Stick es un ingenioso generador de electricidad estática que funciona con pilas y que permite hacer levitar objetos metálicos ligeros. Cuando se aprieta el botón se genera una carga estática negativa en la varita. Tocando el objeto con la varita, parte de esta carga se transfiere al objeto de forma que ambos quedan cargados y el objeto levita por encima de la varita. (Al realizar los cálculos, considere la varita y el objeto metálico como si fueran cargas puntuales).'),
               DAT(M(r`g=9{,}8\ \text{m/s}^2`) + '; ' + M(r`|e|=1{,}602\cdot10^{-19}\ \text{C}`) + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.', M(r`g=9{,}8\ \text{m/s}^2`) + '; ' + M(r`|e|=1{,}602\cdot10^{-19}\ \text{C}`) + '; ' + M(r`k=\dfrac{1}{4\pi\varepsilon_0}=8{,}99\cdot10^{9}\ \text{N m}^2\text{C}^{-2}`) + '.')),
      parts: [
        part('a', T('Suposem que, després de tocar l’objecte, la vareta i l’objecte tenen la mateixa càrrega. Feu un dibuix de la situació de la vareta i l’objecte metàl·lic levitant i dibuixeu les forces sobre l’objecte. Calculeu quina és la càrrega electrostàtica de l’objecte metàl·lic si té una massa de 10 g i es troba a una distància de 55 cm de la vareta.',
                    'Supongamos que, después de tocar el objeto, la varita y el objeto tienen la misma carga. Realice un dibujo de la situación de la varita y el objeto metálico levitante y dibuje las fuerzas sobre el objeto. Calcule cuál es la carga electrostática del objeto metálico si este tiene una masa de 10 g y se encuentra a una distancia de 55 cm de la varita.'),
          [
            figL(stick),
            p('Sobre l’objecte actuen el <b>pes</b> (cap avall) i la <b>repulsió elèctrica</b> de la vareta (cap amunt, perquè les dues càrregues són negatives). Si levita en equilibri, es compensen:', 'Sobre el objeto actúan el <b>peso</b> (hacia abajo) y la <b>repulsión eléctrica</b> de la varita (hacia arriba, porque las dos cargas son negativas). Si levita en equilibrio, se compensan:'),
            F(r`k\dfrac{q^2}{r^2}=mg\ \Rightarrow\ |q|=r\sqrt{\dfrac{mg}{k}}=0{,}55\sqrt{\dfrac{0{,}010\cdot9{,}8}{8{,}99\cdot10^{9}}}=1{,}82\cdot10^{-6}\ \text{C}`),
            ans('La càrrega de l’objecte és negativa: <b>' + M(r`q=-1{,}82\ \mu\text{C}`) + '</b>.', 'La carga del objeto es negativa: <b>' + M(r`q=-1{,}82\ \mu\text{C}`) + '</b>.'),
          ]),
        part('b', T('Considereu ara una altra situació, en què tant la vareta com l’objecte metàl·lic estan carregats amb una càrrega ' + M(r`q=-2\ \mu\text{C}`) + ' i separats una distància de 60 cm. Calculeu el mòdul del camp elèctric al punt central de la línia que els uneix i el potencial elèctric en aquest punt. Determineu quin és el treball que haurà de fer una força externa per portar un electró des de l’infinit fins a aquest punt central.',
                    'Considere ahora otra situación, en la que tanto la varita como el objeto metálico están cargados con una carga ' + M(r`q=-2\ \mu\text{C}`) + ' y separados a una distancia de 60 cm. Calcule el módulo del campo eléctrico en el punto central de la línea que los une y el potencial eléctrico en este punto. Determine cuál es el trabajo que tendrá que hacer una fuerza externa para llevar un electrón desde el infinito hasta este punto central.'),
          [
            p('Al punt mig (a 0,30 m de cada càrrega) els dos camps tenen el mateix mòdul i sentits oposats:', 'En el punto medio (a 0,30 m de cada carga) los dos campos tienen el mismo módulo y sentidos opuestos:'),
            F(r`E=E_1-E_2=0`),
            F(r`V=2k\dfrac{q}{r}=2\cdot8{,}99\cdot10^{9}\cdot\dfrac{-2\cdot10^{-6}}{0{,}30}=-1{,}20\cdot10^{5}\ \text{V}`),
            p('Treball de la força externa = variació d’energia potencial (' + M(r`V_\infty=0`) + ') amb ' + M(r`q_e=-1{,}602\cdot10^{-19}\ \text{C}`) + ':', 'Trabajo de la fuerza externa = variación de energía potencial (' + M(r`V_\infty=0`) + ') con ' + M(r`q_e=-1{,}602\cdot10^{-19}\ \text{C}`) + ':'),
            F(r`W_{ext}=q_e\,(V-V_\infty)=(-1{,}602\cdot10^{-19})(-1{,}20\cdot10^{5})=+1{,}92\cdot10^{-14}\ \text{J}`),
            ans('És positiu: cal fer treball <b>contra</b> la repulsió de les dues càrregues negatives.', 'Es positivo: hay que hacer trabajo <b>contra</b> la repulsión de las dos cargas negativas.'),
          ]),
      ] },

    { n: 4, pts: 2.5, topic: TOP.e,
      intro: J(p('L’experiment d’Oersted, realitzat el 1820 (figura 1), consisteix en un fil conductor paral·lel a la component horitzontal del camp magnètic terrestre pel qual passa un corrent elèctric i una agulla magnètica just a sobre o a sota del fil. Oersted va observar que l’orientació de l’agulla canviava si el fil connectat estava situat sobre l’agulla o a sota. A la figura 2 no sabem si el fil conductor està situat per sobre o per sota de la brúixola.',
                 'El experimento de Oersted realizado en 1820 (figura 1) consiste en un hilo conductor paralelo a la componente horizontal del campo magnético terrestre por donde pasa una corriente eléctrica y una aguja magnética justo encima o debajo del hilo. Oersted observó que la orientación de la aguja cambiaba si el hilo conectado estaba situado sobre la aguja o debajo de ella. En la figura 2 no sabemos si el hilo conductor está situado por encima o por debajo de la brújula.'),
               img('fis24-s3-p4', 632, 371, 'Figura 2: a) circuit obert, agulla apuntant al nord; b) circuit tancat, agulla desviada cap a l’est', 'Figura 2: a) circuito abierto, aguja apuntando al norte; b) circuito cerrado, aguja desviada hacia el este'),
               DAT('el camp d’un fil infinit amb corrent ' + M('I') + ' a distància ' + M('r') + ' és ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '.', 'el campo de un hilo infinito con corriente ' + M('I') + ' a distancia ' + M('r') + ' es ' + M(r`B=\dfrac{\mu_0 I}{2\pi r}`) + '; ' + M(r`\mu_0=4\pi\cdot10^{-7}\ \text{T m A}^{-1}`) + '.')),
      parts: [
        part('a', T('Representeu sobre l’agulla de la brúixola del dibuix b de la figura 2 els vectors del camp magnètic terrestre (' + M(r`\vec B_{Terra}`) + ') i del camp magnètic generat pel fil (' + M(r`\vec B_{I}`) + '). Argumenteu si la brúixola del dibuix b de la figura 2 està situada sobre el fil conductor o a sota d’ell en aquest cas.',
                    'Represente sobre la aguja de la brújula del dibujo b de la figura 2 los vectores del campo magnético terrestre (' + M(r`\vec B_{Tierra}`) + ') y del campo magnético generado por el hilo (' + M(r`\vec B_{hilo}`) + '). Argumente si la brújula del dibujo b de la figura 2 está situada sobre el hilo conductor o debajo de él en este caso.'),
          [
            p('El camp terrestre horitzontal ' + M(r`\vec B_{T}`) + ' apunta al <b>nord</b> (és la posició de l’agulla amb el circuit obert, dibuix a). El fil és paral·lel a aquest camp i el corrent va cap al nord. Al dibuix b l’agulla es desvia <b>cap a l’est</b>, així que el camp del fil ' + M(r`\vec B_{I}`) + ' ha de ser perpendicular al terrestre i apuntar <b>a l’est</b>; l’agulla s’orienta segons la suma ' + M(r`\vec B_T+\vec B_{I}`) + ' (nord-est).',
              'El campo terrestre horizontal ' + M(r`\vec B_{T}`) + ' apunta al <b>norte</b> (es la posición de la aguja con el circuito abierto, dibujo a). El hilo es paralelo a este campo y la corriente va hacia el norte. En el dibujo b la aguja se desvía <b>hacia el este</b>, así que el campo del hilo ' + M(r`\vec B_{hilo}`) + ' debe ser perpendicular al terrestre y apuntar <b>al este</b>; la aguja se orienta según la suma ' + M(r`\vec B_T+\vec B_{hilo}`) + ' (noreste).'),
            p('<b>Posició del fil:</b> amb el corrent cap al nord i la regla de la mà dreta (polze cap al nord, dits girant al voltant del fil), <b>a sobre del fil</b> el camp apunta a l’est i a sota apunta a l’oest. Com que a la brúixola el camp del fil és cap a l’est, la brúixola és <b>sobre</b> el fil (el fil passa per sota seu).',
              '<b>Posición del hilo:</b> con la corriente hacia el norte y la regla de la mano derecha (pulgar hacia el norte, dedos girando alrededor del hilo), <b>por encima del hilo</b> el campo apunta al este y por debajo al oeste. Como en la brújula el campo del hilo es hacia el este, la brújula está <b>encima</b> del hilo (el hilo pasa por debajo de ella).'),
          ]),
        part('b', T('En aquest muntatge experimental, la separació entre la brúixola i el fil és de 10 cm. S’observa que l’agulla de la brúixola forma un angle de 45° amb la direcció del corrent elèctric quan circulen 20 A pel fil conductor. Calculeu la component horitzontal del camp magnètic terrestre (' + M(r`B_{Terra}`) + ').',
                    'En este montaje experimental, la separación entre la brújula y el hilo es de 10 cm. Se observa que la aguja de la brújula forma un ángulo de 45° con la dirección de la corriente eléctrica cuando circulan 20 A por el hilo conductor. Calcule la componente horizontal del campo magnético terrestre (' + M(r`B_{Tierra}`) + ').'),
          [
            F(r`B_{I}=\dfrac{\mu_0I}{2\pi r}=\dfrac{4\pi\cdot10^{-7}\cdot20}{2\pi\cdot0{,}10}=4{,}0\cdot10^{-5}\ \text{T}`),
            p('L’agulla s’orienta segons la resultant; amb 45° respecte al nord:', 'La aguja se orienta según la resultante; con 45° respecto al norte:'),
            F(r`\tan45^\circ=\dfrac{B_{I}}{B_{T}}=1\ \Rightarrow\ B_T=B_{I}=4{,}0\cdot10^{-5}\ \text{T}`),
          ]),
      ] },

    { n: 5, pts: 2.5, topic: TOP.o,
      intro: p('Un ull hipermètrop no és capaç d’enfocar objectes propers a la retina, sinó que els enfoca darrere seu, i per això els veu borrosos. L’Anna no és capaç d’enfocar bé els objectes que són més a prop de 70 cm i necessita unes ulleres amb lents convergents per llegir.', 'Un ojo hipermétrope no es capaz de enfocar objetos cercanos a la retina, sino que los enfoca detrás de ella, y por eso los ve borrosos. Anna no es capaz de enfocar bien los objetos que están más cerca de 70 cm y necesita unas gafas con lentes convergentes para leer.'),
      parts: [
        part('a', T('L’Anna normalment situa el llibre a 35 cm i la imatge creada per la lent ha d’estar a 70 cm perquè la pugui enfocar correctament. Calculeu la distància focal de la lent correctora i la seva potència.',
                    'Anna normalmente sitúa el libro a 35 cm y la imagen creada por la lente debe estar a 70 cm para que la pueda enfocar correctamente. Calcule la distancia focal de la lente correctora y su potencia.'),
          [
            p('La imatge és <b>virtual</b> i és al mateix costat que l’objecte (convenció DIN): ' + M(r`s=-0{,}35\ \text{m}`) + ', ' + M(r`s'=-0{,}70\ \text{m}`) + '.', 'La imagen es <b>virtual</b> y está del mismo lado que el objeto (convención DIN): ' + M(r`s=-0{,}35\ \text{m}`) + ', ' + M(r`s'=-0{,}70\ \text{m}`) + '.'),
            F(r`\dfrac{1}{s'}-\dfrac{1}{s}=\dfrac{1}{f'}\ \Rightarrow\ \dfrac{1}{f'}=\dfrac{1}{-0{,}70}-\dfrac{1}{-0{,}35}=1{,}43\ \text{m}^{-1}`),
            F(r`f'=0{,}70\ \text{m}=70\ \text{cm},\qquad P=\dfrac{1}{f'}=+1{,}43\ \text{D}`),
            ans('Lent convergent de <b>70 cm</b> de focal i <b>+1,43 D</b>.', 'Lente convergente de <b>70 cm</b> de focal y <b>+1,43 D</b>.'),
          ]),
        part('b', T('Calculeu on es formarà la imatge d’un objecte de 10 cm d’altura situat a 25 cm davant d’una lent convergent de 20 cm de distància focal. Calculeu també la mida de la imatge i digueu-ne les característiques (més gran o més petita, real o virtual, dreta o invertida). Dibuixeu el diagrama de raigs amb la lent, l’objecte i la imatge.',
                    'Calcule dónde se formará la imagen de un objeto de 10 cm de altura situado a 25 cm delante de una lente convergente de 20 cm de distancia focal. Calcule, también, el tamaño de la imagen y diga las características de esta (mayor o menor, real o virtual, derecha o invertida). Dibuje el diagrama de rayos con la lente, el objeto y la imagen.'),
          [
            F(r`\dfrac{1}{s'}=\dfrac{1}{f'}+\dfrac{1}{s}=\dfrac{1}{20}-\dfrac{1}{25}=\dfrac{1}{100}\ \text{cm}^{-1}\ \Rightarrow\ s'=+100\ \text{cm}`),
            F(r`m=\dfrac{y'}{y}=\dfrac{s'}{s}=\dfrac{100}{-25}=-4\ \Rightarrow\ y'=-4\cdot10=-40\ \text{cm}`),
            figL(lens),
            ans('La imatge es forma a <b>100 cm</b> darrere de la lent, fa <b>40 cm</b> d’altura i és <b>real, invertida i més gran</b>.', 'La imagen se forma a <b>100 cm</b> detrás de la lente, mide <b>40 cm</b> de altura y es <b>real, invertida y mayor</b>.'),
          ]),
      ] },

    { n: 6, pts: 2.5, topic: TOP.n,
      intro: J(p('Al jaciment neolític de la Draga (Banyoles) s’utilitza el mètode del carboni 14 (<sup>14</sup>C) per a la datació de restes. El <sup>14</sup>C és un isòtop radioactiu que es produeix a l’atmosfera de manera continuada quan neutrons provinents dels raigs còsmics xoquen amb els nuclis de nitrogen (<sup>14</sup>N). Els éssers vius l’incorporem a l’organisme mentre interactuem amb l’atmosfera, però, a partir del moment de la mort, el <sup>14</sup>C comença a desintegrar-se novament en <sup>14</sup>N, amb un període de semidesintegració de 5 730 anys. La datació d’una mostra d’os d’animal del sector D de la Draga és de 6 010 anys.',
                 'En el yacimiento neolítico de La Draga (Banyoles) se utiliza el método del carbono 14 (<sup>14</sup>C) para la datación de restos. El <sup>14</sup>C es un isótopo radiactivo que se produce en la atmósfera de forma continuada cuando neutrones provenientes de los rayos cósmicos chocan con los núcleos de nitrógeno (<sup>14</sup>N). Los seres vivos lo incorporamos al organismo mientras interactuamos con la atmósfera, pero, a partir del momento de la muerte, el <sup>14</sup>C empieza a desintegrarse nuevamente en <sup>14</sup>N, con un período de semidesintegración de 5 730 años. La datación de una muestra de hueso de animal del sector D de La Draga es de 6 010 años.'),
               DAT('Z(C) = 6; Z(N) = 7.', 'Z(C) = 6; Z(N) = 7.')),
      parts: [
        part('a', T('Escriviu la reacció nuclear que correspon al decaïment del <sup>14</sup>C a <sup>14</sup>N, incloent-hi els antineutrins. Justifiqueu de quin tipus de reacció nuclear es tracta. A partir de l’equació de la desintegració, determineu la relació entre la constant de desintegració λ i el període de semidesintegració.',
                    'Escriba la reacción nuclear que corresponde al decaimiento del <sup>14</sup>C a <sup>14</sup>N, incluyendo los antineutrinos. Justifique de qué tipo de reacción nuclear se trata. A partir de la ecuación de la desintegración, determine la relación entre la constante de desintegración λ y el período de semidesintegración.'),
          [
            F(r`{}^{14}_{\ 6}\text{C}\ \longrightarrow\ {}^{14}_{\ 7}\text{N}+{}^{\ 0}_{-1}e+\bar\nu_e`),
            p('Es conserven el nombre màssic (14) i la càrrega (6 = 7 − 1): és una <b>desintegració β<sup>−</sup></b> (un neutró del nucli es converteix en protó i s’emeten un electró i un antineutrí).', 'Se conservan el número másico (14) y la carga (6 = 7 − 1): es una <b>desintegración β<sup>−</sup></b> (un neutrón del núcleo se convierte en protón y se emiten un electrón y un antineutrino).'),
            p('De ' + M(r`N=N_0e^{-\lambda t}`) + ', quan ' + M(r`t=T_{1/2}`) + ' queda la meitat: ' + M(r`\tfrac12=e^{-\lambda T_{1/2}}`) + ', i prenent logaritmes:', 'De ' + M(r`N=N_0e^{-\lambda t}`) + ', cuando ' + M(r`t=T_{1/2}`) + ' queda la mitad: ' + M(r`\tfrac12=e^{-\lambda T_{1/2}}`) + ', y tomando logaritmos:'),
            F(r`\lambda=\dfrac{\ln2}{T_{1/2}}`),
          ]),
        part('b', T('Calculeu la constant de desintegració λ del <sup>14</sup>C. Determineu quin percentatge de <sup>14</sup>C encara roman a la mostra d’os del sector D respecte al <sup>14</sup>C que hi havia quan l’organisme era viu. Calculeu l’activitat de l’os en el moment de morir l’animal si actualment l’activitat de l’os és de 3,63 Bq.',
                    'Calcule la constante de desintegración λ del <sup>14</sup>C. Determine qué porcentaje de <sup>14</sup>C aún permanece en la muestra de hueso del sector D respecto al <sup>14</sup>C que había cuando el organismo estaba vivo. Calcule la actividad del hueso en el momento de morir el animal si actualmente la actividad del hueso es de 3,63 Bq.'),
          [
            F(r`\lambda=\dfrac{\ln2}{5\,730}=1{,}21\cdot10^{-4}\ \text{yr}^{-1}=3{,}83\cdot10^{-12}\ \text{s}^{-1}`),
            F(r`\dfrac{N}{N_0}=e^{-\lambda t}=e^{-1{,}21\cdot10^{-4}\cdot6\,010}=0{,}483\ \Rightarrow\ 48{,}3\,\%`),
            p('L’activitat és proporcional al nombre de nuclis, ' + M(r`A=A_0e^{-\lambda t}`) + ':', 'La actividad es proporcional al número de núcleos, ' + M(r`A=A_0e^{-\lambda t}`) + ':'),
            F(r`A_0=\dfrac{A}{e^{-\lambda t}}=\dfrac{3{,}63}{0{,}483}=7{,}51\ \text{Bq}`),
          ]),
      ] },

    { n: 7, pts: 2.5, topic: TOP.o,
      intro: p('Una massa de 100 g s’fa oscil·lar penjada d’un moll. S’observa que fa 40 oscil·lacions en un minut i que la diferència entre la posició més alta i la més baixa és de 15 cm.'.replace('s’fa', 'es fa'), 'Una masa de 100 g se hace oscilar colgada de un muelle. Se observa que realiza 40 oscilaciones en un minuto y que la diferencia entre la posición más alta y la más baja es de 15 cm.'),
      parts: [
        part('a', T('Determineu el període, la constant del moll i l’equació del moviment si es comença a comptar el moviment quan passa per la posició més baixa. Representeu en la graella la força elàstica durant dos períodes sencers.',
                    'Determine el período, la constante del muelle y la ecuación del movimiento si se empieza a contar el movimiento cuando pasa por la posición más baja. Represente en la cuadrícula la fuerza elástica durante dos períodos enteros.'),
          [
            F(r`f=\dfrac{40}{60}=0{,}667\ \text{Hz},\qquad T=\dfrac1f=1{,}50\ \text{s},\qquad \omega=\dfrac{2\pi}{T}=4{,}19\ \text{rad/s}`),
            p('L’amplitud és la meitat de la diferència entre les posicions extremes: ' + M(r`A=7{,}5\ \text{cm}=0{,}075\ \text{m}`) + '.', 'La amplitud es la mitad de la diferencia entre las posiciones extremas: ' + M(r`A=7{,}5\ \text{cm}=0{,}075\ \text{m}`) + '.'),
            F(r`k=m\omega^2=0{,}100\cdot4{,}19^2=1{,}76\ \text{N/m}`),
            p('Prenent ' + M('y') + ' positiva cap amunt i comptant des de la posició més baixa (' + M('y=-A') + ' a ' + M('t=0') + '):', 'Tomando ' + M('y') + ' positiva hacia arriba y contando desde la posición más baja (' + M('y=-A') + ' en ' + M('t=0') + '):'),
            F(r`y(t)=-0{,}075\cos(4{,}19\,t)\ \text{(m)}`),
            p('Força elàstica ' + M(r`F_{el}=-ky=kA\cos(\omega t)=0{,}132\cos(4{,}19\,t)`) + ' N: màxima (cap amunt) a ' + M('t=0') + ', zero a 0,375 s, mínima a 0,75 s, etc.', 'Fuerza elástica ' + M(r`F_{el}=-ky=kA\cos(\omega t)=0{,}132\cos(4{,}19\,t)`) + ' N: máxima (hacia arriba) en ' + M('t=0') + ', cero en 0,375 s, mínima en 0,75 s, etc.'),
            fig(plot({ w: 350, h: 200, xr: [0, 3.2], yr: [-0.17, 0.17], tickx: [0.75, 1.5, 2.25, 3], ticky: [-0.132, 0.132], curves: [{ f: t => 0.1316 * Math.cos(4.18879 * t), dom: [0, 3], k: 1 }], labels: [[3.2, 0.02, 't (s)', 'end'], [0.1, 0.16, 'F (N)']], alt: 'Força elàstica en funció del temps durant dos períodes' })),
          ]),
        part('b', T('Calculeu l’energia mecànica de l’oscil·lador harmònic i trobeu l’expressió de l’energia cinètica en funció de la posició de la massa. Calculeu el mòdul de la velocitat quan la massa és 3 cm per sobre de la posició d’equilibri.',
                    'Calcule la energía mecánica del oscilador armónico y encuentre la expresión de la energía cinética en función de la posición de la masa. Calcule el módulo de la velocidad cuando la masa está 3 cm por encima de la posición de equilibrio.'),
          [
            F(r`E_m=\tfrac12kA^2=\tfrac12\cdot1{,}76\cdot0{,}075^2=4{,}94\cdot10^{-3}\ \text{J}`),
            F(r`E_c=E_m-E_p=\tfrac12k\,(A^2-y^2)`),
            F(r`v=\sqrt{\dfrac{k}{m}(A^2-y^2)}=\omega\sqrt{A^2-y^2}=4{,}19\sqrt{0{,}075^2-0{,}03^2}=0{,}288\ \text{m/s}`),
          ]),
      ] },
  ],
};
module.exports = s3;
