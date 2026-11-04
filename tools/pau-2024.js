/* PAU 2024 · Matemàtiques II · sèries 1, 3 i 5 (sis qüestions, se'n responen quatre; enunciats oficials, solucions pròpies). */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  an: T('Anàlisi', 'Análisis'), al: T('Àlgebra', 'Álgebra'), ig: T('Integral · Geometria', 'Integral · Geometría'),
  pr: T('Probabilitat', 'Probabilidad'), op: T('Optimització', 'Optimización'), ge: T('Geometria', 'Geometría'),
  ma: T('Matrius', 'Matrices'), pa: T('Anàlisi · Integral', 'Análisis · Integral'),
};
const F = tex => html(D(tex));
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>');
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const img = (f, w, h, ca, es) => ({ ca: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + ca + '"></figure>', es: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + es + '"></figure>' });
const pc = (ca, es) => p(ca, es);

/* ───────────────────────── SÈRIE 1 ───────────────────────── */
const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2024-mates-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M(r`f(x)=2\,\dfrac{\ln x}{x}`) + ', definida per a ' + M('x>0') + '.', 'Considere la función ' + M(r`f(x)=2\,\dfrac{\ln x}{x}`) + ', definida para ' + M('x>0') + '.'),
      parts: [
        { n: '1.1', pts: 1, q: T('Estudieu-ne els màxims i els mínims, i les zones de creixement i de decreixement.', 'Estudie sus máximos y sus mínimos, y sus zonas de crecimiento y de decrecimiento.'),
          sol: [
            F(r`f'(x)=2\,\dfrac{\frac1x\cdot x-\ln x\cdot1}{x^2}=\dfrac{2(1-\ln x)}{x^2}`),
            p(M("f'(x)=0") + ' ⇒ ' + M('\\ln x=1') + ' ⇒ ' + M('x=e') + '. Com que ' + M('x^2>0') + ', el signe de ' + M("f'") + ' és el de ' + M('1-\\ln x') + ': positiu si ' + M('x<e') + ' i negatiu si ' + M('x>e') + '.', M("f'(x)=0") + ' ⇒ ' + M('\\ln x=1') + ' ⇒ ' + M('x=e') + '. Como ' + M('x^2>0') + ', el signo de ' + M("f'") + ' es el de ' + M('1-\\ln x') + ': positivo si ' + M('x<e') + ' y negativo si ' + M('x>e') + '.'),
            ans('<b>Creixent</b> a ' + M('(0,e)') + ' i <b>decreixent</b> a ' + M('(e,+\\infty)') + '. Hi ha un <b>màxim</b> a ' + M(r`\big(e,\ \tfrac2e\big)`) + ' i no hi ha mínims.', '<b>Creciente</b> en ' + M('(0,e)') + ' y <b>decreciente</b> en ' + M('(e,+\\infty)') + '. Hay un <b>máximo</b> en ' + M(r`\big(e,\ \tfrac2e\big)`) + ' y no hay mínimos.'),
          ] },
        { n: '1.2', pts: 1, q: T('Aquesta funció té asímptotes? Feu un esbós de la seva gràfica.', '¿Esta función tiene asíntotas? Haga un esbozo de su gráfica.'),
          sol: [
            ul(T('<b>Vertical:</b> ' + M(r`\lim_{x\to0^+}2\dfrac{\ln x}{x}=\dfrac{-\infty}{0^+}=-\infty`) + ' ⇒ <b>' + M('x=0') + '</b>.', '<b>Vertical:</b> ' + M(r`\lim_{x\to0^+}2\dfrac{\ln x}{x}=\dfrac{-\infty}{0^+}=-\infty`) + ' ⇒ <b>' + M('x=0') + '</b>.'),
              T('<b>Horitzontal:</b> ' + M(r`\lim_{x\to+\infty}2\dfrac{\ln x}{x}=0`) + ' (el logaritme creix més a poc a poc que ' + M('x') + ') ⇒ <b>' + M('y=0') + '</b>.', '<b>Horizontal:</b> ' + M(r`\lim_{x\to+\infty}2\dfrac{\ln x}{x}=0`) + ' (el logaritmo crece más despacio que ' + M('x') + ') ⇒ <b>' + M('y=0') + '</b>.'),
              T('<b>Obliqua:</b> cap (ja en té d\u2019horitzontal).', '<b>Oblicua:</b> ninguna (ya tiene horizontal).')),
            p('Talla l\u2019eix OX a ' + M('x=1') + ' (' + M('\\ln1=0') + '), és negativa a ' + M('(0,1)') + ' i positiva a ' + M('(1,\\infty)') + ', amb màxim a ' + M('x=e') + ':', 'Corta el eje OX en ' + M('x=1') + ' (' + M('\\ln1=0') + '), es negativa en ' + M('(0,1)') + ' y positiva en ' + M('(1,\\infty)') + ', con máximo en ' + M('x=e') + ':'),
            fig(plot({ xr: [-0.6, 9], yr: [-3.2, 1.4], tickx: [1, 3, 5, 7], ticky: [-2, 1], curves: [{ f: x => 2 * Math.log(x) / x, dom: [0.06, 9], k: 0 }],
              points: [[1, 0], [Math.E, 2 / Math.E]], labels: [[3.1, 1.15, 'màx (e, 2/e)']], alt: 'Gràfica de f(x) = 2 ln x / x amb l\u2019asímptota vertical x = 0, l\u2019horitzontal y = 0 i el màxim a x = e' })),
          ] },
        { n: '1.3', pts: 0.5, q: T('Calculeu l\u2019equació de la recta tangent a la gràfica de ' + M('y=f(x)') + ' en el punt d\u2019abscissa ' + M('x=1') + '.', 'Calcule la ecuación de la recta tangente a la gráfica de ' + M('y=f(x)') + ' en el punto de abscisa ' + M('x=1') + '.'),
          sol: [
            F(r`f(1)=0,\qquad f'(1)=\dfrac{2(1-0)}{1}=2`),
            AN(r`y=2(x-1)=2x-2`),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions següent:', 'Considere el siguiente sistema de ecuaciones:'),
        html(D(r`\left\{\begin{aligned}4x+2y-z&=4\\x-y+kz&=3\\3x+3y&=1\end{aligned}\right.`)),
        p('on ' + M('k') + ' és un paràmetre real.', 'donde ' + M('k') + ' es un parámetro real.')),
      parts: [
        { n: '2.1', pts: 1, q: T('Discutiu el sistema per als diferents valors del paràmetre ' + M('k') + ', i resoleu-lo per a ' + M('k=0') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('k') + ', y resuélvalo para ' + M('k=0') + '.'),
          sol: [
            F(r`\begin{vmatrix}4&2&-1\\1&-1&k\\3&3&0\end{vmatrix}=-12k+6k-6=-6(k+1)`),
            ul(T('<b>' + M(r`k\neq-1`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`k\neq-1`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('k=-1') + '</b>: restant la 2a de la 1a s\u2019obté ' + M('3x+3y=1') + ', que és la 3a equació ⇒ rang 2 = rang ampliada ⇒ <b>compatible indeterminat</b>.', '<b>' + M('k=-1') + '</b>: restando la 2.ª de la 1.ª se obtiene ' + M('3x+3y=1') + ', que es la 3.ª ecuación ⇒ rango 2 = rango ampliada ⇒ <b>compatible indeterminado</b>.')),
            p('Per a ' + M('k=0') + ': de ' + M('x-y=3') + ' i ' + M('x+y=\\tfrac13') + ' surt ' + M('x=\\tfrac53') + ', ' + M('y=-\\tfrac43') + ', i de la 1a, ' + M('z=4x+2y-4=0') + '.', 'Para ' + M('k=0') + ': de ' + M('x-y=3') + ' y ' + M('x+y=\\tfrac13') + ' sale ' + M('x=\\tfrac53') + ', ' + M('y=-\\tfrac43') + ', y de la 1.ª, ' + M('z=4x+2y-4=0') + '.'),
            AN(r`(x,y,z)=\Big(\tfrac53,\ -\tfrac43,\ 0\Big)`),
          ] },
        { n: '2.2', pts: 0.75, q: T('Resoleu el sistema per a ' + M('k=-1') + '.', 'Resuelva el sistema para ' + M('k=-1') + '.'),
          sol: [
            p('Queda ' + M('3x+3y=1') + ' (una sola equació independient de les altres dues amb ' + M('x-y-z=3') + '). Amb ' + M('x=\\lambda') + ': ' + M(r`y=\tfrac13-\lambda`) + ' i ' + M(r`z=x-y-3=2\lambda-\tfrac{10}{3}`) + '.', 'Queda ' + M('3x+3y=1') + ' (independiente de la otra ecuación con ' + M('x-y-z=3') + '). Con ' + M('x=\\lambda') + ': ' + M(r`y=\tfrac13-\lambda`) + ' y ' + M(r`z=x-y-3=2\lambda-\tfrac{10}{3}`) + '.'),
            AN(r`(x,y,z)=\Big(\lambda,\ \tfrac13-\lambda,\ 2\lambda-\tfrac{10}{3}\Big),\ \lambda\in\mathbb R`),
            p('Comprovació a la 1a: ' + M(r`4\lambda+\tfrac23-2\lambda-2\lambda+\tfrac{10}{3}=4`) + '.', 'Comprobación en la 1.ª: ' + M(r`4\lambda+\tfrac23-2\lambda-2\lambda+\tfrac{10}{3}=4`) + '.'),
          ] },
        { n: '2.3', pts: 0.75, q: T('Per a ' + M('k=-1') + ', modifiqueu la tercera equació de manera que el sistema resulti incompatible. Justifiqueu la resposta.', 'Para ' + M('k=-1') + ', modifique la tercera ecuación de manera que el sistema resulte incompatible. Justifique la respuesta.'),
          sol: [
            p('Amb ' + M('k=-1') + ', la 1a menys la 2a dóna ' + M('3x+3y=1') + ' per força. Si la tercera diu ' + M('3x+3y=c') + ' amb ' + M(r`c\neq1`) + ', les tres equacions són contradictòries.', 'Con ' + M('k=-1') + ', la 1.ª menos la 2.ª da ' + M('3x+3y=1') + ' por fuerza. Si la tercera dice ' + M('3x+3y=c') + ' con ' + M(r`c\neq1`) + ', las tres ecuaciones son contradictorias.'),
            ans('Per exemple, <b>' + M('3x+3y=2') + '</b>: tindríem ' + M('3x+3y=1') + ' i ' + M('3x+3y=2') + ' alhora ⇒ <b>incompatible</b>.', 'Por ejemplo, <b>' + M('3x+3y=2') + '</b>: tendríamos ' + M('3x+3y=1') + ' y ' + M('3x+3y=2') + ' a la vez ⇒ <b>incompatible</b>.'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ig,
      intro: J(p('En Joan troba entre els papers del seu avi un esbós com el de la figura adjunta, on es descriu un terreny de regadiu que ha deixat en herència al seu pare.',
                 'Joan encuentra entre los papeles de su abuelo un esbozo como el de la figura adjunta, donde se describe un terreno de regadío que ha dejado en herencia a su padre.'),
        img('2024-s1-e3', 1470, 855, 'Terreny: corba amb els punts P, Q i R', 'Terreno: curva con los puntos P, Q y R'),
        p('La corba de la gràfica és ' + M('y=f(x)') + ', amb ' + M('f(x)=-x^3+7x^2-6x+5') + '.', 'La curva de la gráfica es ' + M('y=f(x)') + ', con ' + M('f(x)=-x^3+7x^2-6x+5') + '.')),
      parts: [
        { n: '3.1', pts: 1.25, q: T('A partir de l\u2019expressió de ' + M('f(x)') + ', calculeu les coordenades dels punts ' + M('P') + ', ' + M('Q') + ' i ' + M('R') + ' indicats a la figura. Calculeu també l\u2019equació de la recta ' + M('PR') + '.', 'A partir de la expresión de ' + M('f(x)') + ', calcule las coordenadas de los puntos ' + M('P') + ', ' + M('Q') + ' y ' + M('R') + ' indicados en la figura. Calcule también la ecuación de la recta ' + M('PR') + '.'),
          sol: [
            p('La recta horitzontal de la figura passa per ' + M('(0,5)') + ' (' + M('f(0)=5') + '), és a dir és ' + M('y=5') + '. Els punts ' + M('P') + ' i ' + M('Q') + ' són els altres talls amb la corba:', 'La recta horizontal de la figura pasa por ' + M('(0,5)') + ' (' + M('f(0)=5') + '), es decir es ' + M('y=5') + '. Los puntos ' + M('P') + ' y ' + M('Q') + ' son los otros cortes con la curva:'),
            F(r`-x^3+7x^2-6x+5=5\ \Rightarrow\ -x(x^2-7x+6)=-x(x-1)(x-6)=0\ \Rightarrow\ x=0,\ 1,\ 6`),
            p(M('P=(1,5)') + ' i ' + M('Q=(6,5)') + '. El punt ' + M('R') + ' és a sota de ' + M('Q') + ' sobre l\u2019eix OX: ' + M('R=(6,0)') + '.', M('P=(1,5)') + ' y ' + M('Q=(6,5)') + '. El punto ' + M('R') + ' está bajo ' + M('Q') + ' sobre el eje OX: ' + M('R=(6,0)') + '.'),
            F(r`m_{PR}=\dfrac{0-5}{6-1}=-1\ \Rightarrow\ y-5=-(x-1)`),
            AN(r`P=(1,5),\ Q=(6,5),\ R=(6,0);\qquad PR:\ y=-x+6`),
          ] },
        { n: '3.2', pts: 1.25, q: T('Calculeu la superfície del terreny.', 'Calcule la superficie del terreno.'),
          sol: [
            p('El terreny és entre la corba (a dalt) i la recta ' + M('PR') + ' (a baix), de ' + M('x=1') + ' a ' + M('x=6') + ':', 'El terreno está entre la curva (arriba) y la recta ' + M('PR') + ' (abajo), de ' + M('x=1') + ' a ' + M('x=6') + ':'),
            fig(plot({ xr: [-0.6, 7.2], yr: [-2, 32], tickx: [1, 6], ticky: [5, 25], hlines: [5], curves: [{ f: x => -(x ** 3) + 7 * x * x - 6 * x + 5, dom: [-0.6, 6.4], k: 0 }, { f: x => 6 - x, dom: [1, 6], k: 1 }],
              fill: { f: x => -(x ** 3) + 7 * x * x - 6 * x + 5, g: x => 6 - x, a: 1, b: 6 }, points: [[1, 5], [6, 5], [6, 0]], labels: [[0.5, 6.5, 'P'], [6.1, 6.5, 'Q'], [6.1, -1.4, 'R']], alt: 'Corba i recta PR amb el terreny ombrejat entre x = 1 i x = 6' })),
            F(r`A=\int_1^6\big(-x^3+7x^2-6x+5-(6-x)\big)dx=\int_1^6\big(-x^3+7x^2-5x-1\big)dx`),
            F(r`=\Big[-\tfrac{x^4}{4}+\tfrac{7x^3}{3}-\tfrac{5x^2}{2}-x\Big]_1^6=84-\Big(-\tfrac{17}{12}\Big)`),
            AN(r`A=\dfrac{1025}{12}\approx85{,}42\ \text{u}^2`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pr,
      intro: J(p('L\u2019Andreu posa les nou boles que es mostren a continuació dins una bossa.', 'Andreu pone las nueve bolas que se muestran a continuación dentro de una bolsa.'),
        img('2024-s1-e4', 1530, 177, 'Nou boles amb les lletres B, A, Y, E, S, F, A, N, S', 'Nueve bolas con las letras B, A, Y, E, S, F, A, N, S')),
      parts: [
        { n: '4.1', pts: 0.5, q: T('Treu de la bossa dues boles a l\u2019atzar, una darrere l\u2019altra i sense reemplaçament. Calculeu la probabilitat que la primera bola sigui una A o una E.', 'Saca de la bolsa dos bolas al azar, una después de otra y sin reemplazo. Calcule la probabilidad de que la primera bola sea una A o una E.'),
          sol: [
            p('Hi ha 9 boles: dues A, una E (i dues S, una B, una Y, una F, una N). Casos favorables: ' + M('2+1=3') + '.', 'Hay 9 bolas: dos A, una E (y dos S, una B, una Y, una F, una N). Casos favorables: ' + M('2+1=3') + '.'),
            AN(r`P=\dfrac39=\dfrac13`),
          ] },
        { n: '4.2', pts: 0.75, q: T('Calculeu la probabilitat que les dues boles siguin diferents.', 'Calcule la probabilidad de que las dos bolas sean diferentes.'),
          sol: [
            p('Pel complementari: les dues són iguals si són ' + M('AA') + ' o ' + M('SS') + ' (les úniques lletres repetides):', 'Por el complementario: las dos son iguales si son ' + M('AA') + ' o ' + M('SS') + ' (las únicas letras repetidas):'),
            F(r`P(\text{iguals})=\dfrac29\cdot\dfrac18+\dfrac29\cdot\dfrac18=\dfrac{4}{72}=\dfrac1{18}`),
            AN(r`P(\text{diferents})=1-\dfrac1{18}=\dfrac{17}{18}\approx0{,}944`),
          ] },
        { n: '4.3', pts: 0.5, q: T('L\u2019Andreu torna a posar totes les boles a la bossa i en treu cinc a l\u2019atzar, una darrere l\u2019altra, però ara amb reemplaçament. Calculeu la probabilitat que no hagi tret cap A.', 'Andreu vuelve a poner todas las bolas en la bolsa y saca cinco al azar, una detrás de otra, pero ahora con reemplazo. Calcule la probabilidad de que no haya sacado ninguna A.'),
          sol: [
            p('A cada extracció, ' + M(r`P(\text{no A})=\tfrac79`) + ', i són independents:', 'En cada extracción, ' + M(r`P(\text{no A})=\tfrac79`) + ', y son independientes:'),
            AN(r`P=\Big(\dfrac79\Big)^5=\dfrac{16807}{59049}\approx0{,}285`),
          ] },
        { n: '4.4', pts: 0.75, q: T('Calculeu la probabilitat que hagi tret almenys dues A.', 'Calcule la probabilidad de que haya sacado al menos dos A.'),
          sol: [
            p('El nombre d\u2019A segueix una binomial ' + M(r`B(5,\tfrac29)`) + '. Pel complementari, traiem els casos de 0 i d\u20191 A:', 'El número de A sigue una binomial ' + M(r`B(5,\tfrac29)`) + '. Por el complementario, quitamos los casos de 0 y de 1 A:'),
            F(r`P(X\ge2)=1-\Big(\tfrac79\Big)^5-5\cdot\tfrac29\Big(\tfrac79\Big)^4=1-\tfrac{16807}{59049}-\tfrac{24010}{59049}`),
            AN(r`P(X\ge2)=\dfrac{18232}{59049}\approx0{,}309`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.op,
      intro: J(p('Es vol construir un petit cobert de fusta de 6 m³ de volum, en forma de prisma rectangular, adossat a la paret lateral d\u2019una casa, per guardar-hi llenya. Només cal construir, doncs, el sostre i tres parets (la paret del fons del cobert és la de la casa a la qual està adossat). A més, es vol que el cobert mesuri el triple d\u2019amplada que de profunditat. Cada metre quadrat de paret té un cost de construcció de 30 € i el sostre costa 50 € per metre quadrat. Un cop construït el cobert, afegir-hi una porta té un cost fix de 35 €.',
                 'Se quiere construir un pequeño cobertizo de madera de 6 m³ de volumen, en forma de prisma rectangular, adosado a la pared lateral de una casa, para guardar leña. Solo hay que construir, por tanto, el techo y tres paredes (la pared del fondo del cobertizo es la de la casa a la que está adosado). Además, se quiere que el cobertizo mida el triple de anchura que de profundidad. Cada metro cuadrado de pared tiene un coste de construcción de 30 € y el techo cuesta 50 € por metro cuadrado. Una vez construido el cobertizo, añadir una puerta tiene un coste fijo de 35 €.'),
        img('2024-s1-e5', 735, 480, 'Cobert adossat a la paret d\u2019una casa', 'Cobertizo adosado a la pared de una casa')),
      parts: [
        { n: '5.1', pts: 1.25, q: T('Comproveu que el cost de construcció del cobert ve donat per la funció ' + M(r`C(x)=\dfrac{300}{x}+150x^2+35`) + ', on ' + M('x') + ' és la profunditat del cobert en metres.', 'Compruebe que el coste de construcción del cobertizo viene dado por la función ' + M(r`C(x)=\dfrac{300}{x}+150x^2+35`) + ', donde ' + M('x') + ' es la profundidad del cobertizo en metros.'),
          sol: [
            p('Profunditat ' + M('x') + ', amplada ' + M('3x') + ' i alçada ' + M('h') + ': ' + M('x\\cdot3x\\cdot h=6') + ' ⇒ ' + M(r`h=\dfrac{2}{x^2}`) + '.', 'Profundidad ' + M('x') + ', anchura ' + M('3x') + ' y altura ' + M('h') + ': ' + M('x\\cdot3x\\cdot h=6') + ' ⇒ ' + M(r`h=\dfrac{2}{x^2}`) + '.'),
            ul(T('<b>Parets</b> (dues laterals i la frontal): ' + M(r`2\cdot xh+3x\cdot h=5xh=5x\cdot\dfrac2{x^2}=\dfrac{10}{x}`) + ' m², a 30 €: ' + M(r`\dfrac{300}{x}`) + '.', '<b>Paredes</b> (dos laterales y la frontal): ' + M(r`2\cdot xh+3x\cdot h=5xh=5x\cdot\dfrac2{x^2}=\dfrac{10}{x}`) + ' m², a 30 €: ' + M(r`\dfrac{300}{x}`) + '.'),
              T('<b>Sostre:</b> ' + M('x\\cdot3x=3x^2') + ' m², a 50 €: ' + M('150x^2') + '.', '<b>Techo:</b> ' + M('x\\cdot3x=3x^2') + ' m², a 50 €: ' + M('150x^2') + '.'),
              T('<b>Porta:</b> 35 € fixos.', '<b>Puerta:</b> 35 € fijos.')),
            F(r`C(x)=\dfrac{300}{x}+150x^2+35\ \checkmark`),
          ] },
        { n: '5.2', pts: 1.25, q: T('Calculeu quines han de ser les dimensions del cobert perquè el cost de construcció sigui mínim i justifiqueu la resposta. Quin és aquest cost?', 'Calcule cuáles han de ser las dimensiones del cobertizo para que el coste de construcción sea mínimo y justifique la respuesta. ¿Cuál es este coste?'),
          sol: [
            F(r`C'(x)=-\dfrac{300}{x^2}+300x=\dfrac{300(x^3-1)}{x^2}=0\ \Rightarrow\ x=1`),
            p('Mínim: ' + M(r`C'<0`) + ' si ' + M('x<1') + ' i ' + M(r`C'>0`) + ' si ' + M('x>1') + ' (també ' + M(r`C''(1)=600+300>0`) + ').', 'Mínimo: ' + M(r`C'<0`) + ' si ' + M('x<1') + ' y ' + M(r`C'>0`) + ' si ' + M('x>1') + ' (también ' + M(r`C''(1)=600+300>0`) + ').'),
            fig(plot({ xr: [-0.45, 3], yr: [200, 900], tickx: [1, 2, 3], ticky: [485, 800], curves: [{ f: x => 300 / x + 150 * x * x + 35, dom: [0.36, 3] }],
              points: [[1, 485]], labels: [[1.15, 440, 'mín (1, 485)']], alt: 'Gràfica de C(x) amb el mínim a x = 1' })),
            ans('Profunditat <b>1 m</b>, amplada <b>3 m</b>, alçada ' + M('h=\\tfrac{2}{1}=') + ' <b>2 m</b>. Cost mínim: ' + M('C(1)=300+150+35=') + ' <b>485 €</b>.', 'Profundidad <b>1 m</b>, anchura <b>3 m</b>, altura ' + M('h=\\tfrac{2}{1}=') + ' <b>2 m</b>. Coste mínimo: ' + M('C(1)=300+150+35=') + ' <b>485 €</b>.'),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.ge,
      intro: p('Considereu els punts ' + M('A=(1,2,3)') + ' i ' + M('B=(-3,-2,3)') + '.', 'Considere los puntos ' + M('A=(1,2,3)') + ' y ' + M('B=(-3,-2,3)') + '.'),
      parts: [
        { n: '6.1', pts: 1, q: T('Calculeu l\u2019equació del pla ' + M(r`\pi`) + ' que és perpendicular a la recta ' + M('AB') + ' i que passa pel punt mitjà entre ' + M('A') + ' i ' + M('B') + '. Justifiqueu que aquest pla està format, precisament, pels punts ' + M('P=(x,y,z)') + ' que són a igual distància d\u2019' + M('A') + ' que de ' + M('B') + ', és a dir, ' + M('d(P,A)=d(P,B)') + '.',
                              'Calcule la ecuación del plano ' + M(r`\pi`) + ' que es perpendicular a la recta ' + M('AB') + ' y que pasa por el punto medio entre ' + M('A') + ' y ' + M('B') + '. Justifique que este plano está formado, precisamente, por los puntos ' + M('P=(x,y,z)') + ' que están a igual distancia de ' + M('A') + ' que de ' + M('B') + ', es decir, ' + M('d(P,A)=d(P,B)') + '.'),
          sol: [
            p(M(r`\overrightarrow{AB}=(-4,-4,0)\parallel(1,1,0)`) + ' és el normal i el punt mitjà és ' + M('M=(-1,0,3)') + ':', M(r`\overrightarrow{AB}=(-4,-4,0)\parallel(1,1,0)`) + ' es el normal y el punto medio es ' + M('M=(-1,0,3)') + ':'),
            AN(r`\pi:\ (x+1)+y=0\iff x+y+1=0`),
            p('<b>Justificació:</b> ' + M('d(P,A)=d(P,B)') + ' equival a ' + M('d(P,A)^2=d(P,B)^2') + ':', '<b>Justificación:</b> ' + M('d(P,A)=d(P,B)') + ' equivale a ' + M('d(P,A)^2=d(P,B)^2') + ':'),
            F(r`(x-1)^2+(y-2)^2+(z-3)^2=(x+3)^2+(y+2)^2+(z-3)^2\ \Rightarrow\ -8x-8y-8=0\ \Rightarrow\ x+y+1=0`),
            p('És el mateix pla (és el pla mediador del segment ' + M('AB') + ').', 'Es el mismo plano (es el plano mediador del segmento ' + M('AB') + ').'),
          ] },
        { n: '6.2', pts: 0.75, q: T('Calculeu les distàncies d\u2019' + M('A') + ' i de ' + M('B') + ' al pla ' + M(r`\pi`) + ' i comproveu que són iguals. És casualitat? Raoneu la resposta.', 'Calcule las distancias de ' + M('A') + ' y de ' + M('B') + ' al plano ' + M(r`\pi`) + ' y compruebe que son iguales. ¿Es casualidad? Razone la respuesta.'),
          sol: [
            F(r`d(A,\pi)=\dfrac{|1+2+1|}{\sqrt2}=\dfrac4{\sqrt2}=2\sqrt2\qquad d(B,\pi)=\dfrac{|-3-2+1|}{\sqrt2}=2\sqrt2`),
            ans('<b>No és casualitat:</b> ' + M(r`\pi`) + ' és perpendicular a ' + M('AB') + ' i passa pel seu punt mitjà ' + M('M') + ', així que la distància de cada extrem al pla és ' + M(r`\tfrac12|AB|=2\sqrt2`) + ' (i ' + M(r`|AB|=4\sqrt2`) + ').', '<b>No es casualidad:</b> ' + M(r`\pi`) + ' es perpendicular a ' + M('AB') + ' y pasa por su punto medio ' + M('M') + ', así que la distancia de cada extremo al plano es ' + M(r`\tfrac12|AB|=2\sqrt2`) + ' (y ' + M(r`|AB|=4\sqrt2`) + ').'),
          ] },
        { n: '6.3', pts: 0.75, q: T('Sigui ' + M('C=(-7,6,3)') + '. El triangle ' + M('ABC') + ' és isòsceles? Calculeu-ne l\u2019àrea.', 'Sea ' + M('C=(-7,6,3)') + '. ¿El triángulo ' + M('ABC') + ' es isósceles? Calcule su área.'),
          sol: [
            F(r`|CA|=|(8,-4,0)|=\sqrt{80}\qquad |CB|=|(4,-8,0)|=\sqrt{80}\qquad |AB|=\sqrt{32}`),
            p('Sí és isòsceles (' + M('|CA|=|CB|') + '). De fet ' + M('C') + ' compleix ' + M('-7+6+1=0') + ', és a dir ' + M('C\\in\\pi') + '. L\u2019àrea amb el producte vectorial:', 'Sí es isósceles (' + M('|CA|=|CB|') + '). De hecho ' + M('C') + ' cumple ' + M('-7+6+1=0') + ', es decir ' + M('C\\in\\pi') + '. El área con el producto vectorial:'),
            F(r`\overrightarrow{AB}\times\overrightarrow{AC}=(-4,-4,0)\times(-8,4,0)=(0,0,-48)\ \Rightarrow\ A=\tfrac12\cdot48`),
            AN(r`A=24\ \text{u}^2`),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 3 ───────────────────────── */
const s3 = {
  id: 3, pdf: 'pdf/pau/pau-2024-mates-serie3.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció polinòmica ' + M('f(x)=3x^{13}+5x^3+2') + '.', 'Considere la función polinómica ' + M('f(x)=3x^{13}+5x^3+2') + '.'),
      parts: [
        { n: '1.1', pts: 1.25, q: T('Justifiqueu que la seva gràfica talla l\u2019eix d\u2019abscisses en un punt de l\u2019interval ' + M('[-2,0]') + '. Doneu un interval de longitud 0,5 on es trobi aquest punt de tall.', 'Justifique que su gráfica corta el eje de abscisas en un punto del intervalo ' + M('[-2,0]') + '. Dé un intervalo de longitud 0,5 donde se encuentre este punto de corte.'),
          sol: [
            p(M('f') + ' és un polinomi, per tant contínua. Com que ' + M('f(-2)=3\\cdot(-2)^{13}+5\\cdot(-8)+2=-24576-38<0') + ' i ' + M('f(0)=2>0') + ', pel teorema de Bolzano hi ha almenys un ' + M('c\\in(-2,0)') + ' amb ' + M('f(c)=0') + '.',
              M('f') + ' es un polinomio, por tanto continua. Como ' + M('f(-2)=3\\cdot(-2)^{13}+5\\cdot(-8)+2=-24576-38<0') + ' y ' + M('f(0)=2>0') + ', por el teorema de Bolzano hay al menos un ' + M('c\\in(-2,0)') + ' con ' + M('f(c)=0') + '.'),
            p('Per afinar-ho: ' + M('f(-1)=-3-5+2=-6<0') + ' i ' + M('f(-0{,}5)\\approx-0{,}0004-0{,}625+2\\approx1{,}37>0') + '.', 'Para afinar: ' + M('f(-1)=-3-5+2=-6<0') + ' y ' + M('f(-0{,}5)\\approx-0{,}0004-0{,}625+2\\approx1{,}37>0') + '.'),
            AN(r`c\in[-1,\,-0{,}5]`),
          ] },
        { n: '1.2', pts: 1.25, q: T('Estudieu les zones de creixement i de decreixement, i els màxims i els mínims de ' + M('y=f(x)') + '. Quants punts de tall té exactament la gràfica d\u2019aquesta funció amb l\u2019eix d\u2019abscisses? Justifiqueu la resposta.', 'Estudie las zonas de crecimiento y de decrecimiento, y los máximos y los mínimos de ' + M('y=f(x)') + '. ¿Cuántos puntos de corte tiene exactamente la gráfica de esta función con el eje de abscisas? Justifique su respuesta.'),
          sol: [
            F(r`f'(x)=39x^{12}+15x^2=3x^2\,(13x^{10}+5)\ \ge\ 0`),
            p(M("f'(x)=0") + ' només si ' + M('x=0') + ', i a banda i banda ' + M("f'>0") + ': el signe no canvia.', M("f'(x)=0") + ' solo si ' + M('x=0') + ', y a ambos lados ' + M("f'>0") + ': el signo no cambia.'),
            fig(plot({ xr: [-1.3, 0.9], yr: [-8, 8], tickx: [-1, -0.5, 0.5], ticky: [-5, 5], curves: [{ f: x => 3 * x ** 13 + 5 * x ** 3 + 2, dom: [-1.3, 0.9], k: 0 }],
              points: [[-0.73, 0], [0, 2]], labels: [[-1.2, 1.1, 'tall ≈ −0,73']], alt: 'Gràfica de f creixent amb un únic tall amb l\u2019eix OX' })),
            ans('<b>Estrictament creixent</b> a tot ' + M('\\mathbb R') + ' (a ' + M('x=0') + ' la tangent és horitzontal però no és extrem): <b>no hi ha màxims ni mínims</b>. Com que és monòtona, talla l\u2019eix OX <b>exactament en 1 punt</b> (el de l\u2019apartat anterior).',
                '<b>Estrictamente creciente</b> en todo ' + M('\\mathbb R') + ' (en ' + M('x=0') + ' la tangente es horizontal pero no es extremo): <b>no hay máximos ni mínimos</b>. Al ser monótona, corta el eje OX <b>exactamente en 1 punto</b> (el del apartado anterior).'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions següent, on ' + M('m') + ' és un paràmetre real:', 'Considere el siguiente sistema de ecuaciones, donde ' + M('m') + ' es un parámetro real:'),
        html(D(r`\left\{\begin{aligned}x-3y+mz&=-2\\x+my+2z&=3\\x+y+2z&=m\end{aligned}\right.`))),
      parts: [
        { n: '2.1', pts: 1.25, q: T('Discutiu el sistema segons el valor del paràmetre ' + M('m') + '.', 'Discuta el sistema según el valor del parámetro ' + M('m') + '.'),
          sol: [
            F(r`\begin{vmatrix}1&-3&m\\1&m&2\\1&1&2\end{vmatrix}=-m^2+3m-2=-(m-1)(m-2)`),
            ul(T('<b>' + M(r`m\neq1,2`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`m\neq1,2`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('m=1') + '</b>: la 2a i la 3a equacions són ' + M('x+y+2z=3') + ' i ' + M('x+y+2z=1') + ' ⇒ <b>incompatible</b>.', '<b>' + M('m=1') + '</b>: la 2.ª y la 3.ª ecuaciones son ' + M('x+y+2z=3') + ' y ' + M('x+y+2z=1') + ' ⇒ <b>incompatible</b>.'),
              T('<b>' + M('m=2') + '</b>: restant la 3a de la 2a surt ' + M('y=1') + '; llavors ' + M('x+2z=1') + ' i la 1a (' + M('x-3+2z=-2') + ') dóna el mateix ⇒ rang 2 = rang ampliada ⇒ <b>compatible indeterminat</b>.', '<b>' + M('m=2') + '</b>: restando la 3.ª de la 2.ª sale ' + M('y=1') + '; entonces ' + M('x+2z=1') + ' y la 1.ª (' + M('x-3+2z=-2') + ') da lo mismo ⇒ rango 2 = rango ampliada ⇒ <b>compatible indeterminado</b>.')),
          ] },
        { n: '2.2', pts: 0.5, q: T('Trobeu la solució del sistema per a ' + M('m=0') + '.', 'Encuentre la solución del sistema para ' + M('m=0') + '.'),
          sol: [
            p('Queda ' + M('x-3y=-2') + ', ' + M('x+2z=3') + ', ' + M('x+y+2z=0') + '. Substituint ' + M('x+2z=3') + ' a la 3a: ' + M('y=-3') + '; llavors ' + M('x=-2+3y=-11') + ' i ' + M('z=\\tfrac{3-x}{2}=7') + '.', 'Queda ' + M('x-3y=-2') + ', ' + M('x+2z=3') + ', ' + M('x+y+2z=0') + '. Sustituyendo ' + M('x+2z=3') + ' en la 3.ª: ' + M('y=-3') + '; entonces ' + M('x=-2+3y=-11') + ' y ' + M('z=\\tfrac{3-x}{2}=7') + '.'),
            AN(r`(x,y,z)=(-11,\ -3,\ 7)`),
          ] },
        { n: '2.3', pts: 0.75, q: T('Per a ' + M('m=2') + ', doneu una solució ' + M('(x,y,z)') + ' del sistema que, a més, compleixi ' + M('x=5y') + '.', 'Para ' + M('m=2') + ', dé una solución ' + M('(x,y,z)') + ' del sistema que, además, cumpla ' + M('x=5y') + '.'),
          sol: [
            p('Per a ' + M('m=2') + ': ' + M('y=1') + ' i ' + M('x+2z=1') + '. Si ' + M('x=5y=5') + ', llavors ' + M('2z=1-5') + ' ⇒ ' + M('z=-2') + '.', 'Para ' + M('m=2') + ': ' + M('y=1') + ' y ' + M('x+2z=1') + '. Si ' + M('x=5y=5') + ', entonces ' + M('2z=1-5') + ' ⇒ ' + M('z=-2') + '.'),
            AN(r`(x,y,z)=(5,\ 1,\ -2)`),
            p('Comprovació: ' + M('5-3-4=-2') + ', ' + M('5+2-4=3') + ', ' + M('5+1-4=2') + '.', 'Comprobación: ' + M('5-3-4=-2') + ', ' + M('5+2-4=3') + ', ' + M('5+1-4=2') + '.'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ig,
      intro: J(p('La classe de l\u2019Èlia ha dissenyat el logotip següent per pintar-lo a la paret de l\u2019institut:', 'La clase de Èlia ha diseñado el siguiente logotipo para pintarlo en la pared del instituto:'),
        img('2024-s3-e3', 900, 735, 'Logotip: zona puntejada i zona ratllada amb els punts A, B, C i D', 'Logotipo: zona punteada y zona rayada con los puntos A, B, C y D'),
        p('La corba que passa pel punt ' + M('A') + ' és ' + M('y=f(x)') + ', amb ' + M('f(x)=x^3-4x^2+4x') + ', i la que passa pels punts ' + M('B') + ', ' + M('C=(3,3)') + ' i ' + M('D') + ' és ' + M('y=g(x)') + ', amb ' + M(r`g(x)=-\Big(\dfrac{x-1}{2}\Big)^2+4`) + '.',
          'La curva que pasa por el punto ' + M('A') + ' es ' + M('y=f(x)') + ', con ' + M('f(x)=x^3-4x^2+4x') + ', y la que pasa por los puntos ' + M('B') + ', ' + M('C=(3,3)') + ' y ' + M('D') + ' es ' + M('y=g(x)') + ', con ' + M(r`g(x)=-\Big(\dfrac{x-1}{2}\Big)^2+4`) + '.')),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Calculeu les coordenades dels punts ' + M('A') + ', ' + M('B') + ' i ' + M('D') + '.', 'Calcule las coordenadas de los puntos ' + M('A') + ', ' + M('B') + ' y ' + M('D') + '.'),
          sol: [
            ul(T('<b>' + M('A') + '</b> (tall de ' + M('f') + ' amb l\u2019eix OX, a part de l\u2019origen): ' + M('x(x-2)^2=0') + ' ⇒ ' + M('x=2') + ' ⇒ ' + M('A=(2,0)') + '.', '<b>' + M('A') + '</b> (corte de ' + M('f') + ' con el eje OX, aparte del origen): ' + M('x(x-2)^2=0') + ' ⇒ ' + M('x=2') + ' ⇒ ' + M('A=(2,0)') + '.'),
              T('<b>' + M('B') + '</b> (tall de ' + M('g') + ' amb l\u2019eix OY): ' + M(r`g(0)=4-\tfrac14=\tfrac{15}4`) + ' ⇒ ' + M(r`B=(0,\tfrac{15}{4})`) + '.', '<b>' + M('B') + '</b> (corte de ' + M('g') + ' con el eje OY): ' + M(r`g(0)=4-\tfrac14=\tfrac{15}4`) + ' ⇒ ' + M(r`B=(0,\tfrac{15}{4})`) + '.'),
              T('<b>' + M('D') + '</b> (tall de ' + M('g') + ' amb l\u2019eix OX, ' + M('x>0') + '): ' + M('(x-1)^2=16') + ' ⇒ ' + M('x=5') + ' ⇒ ' + M('D=(5,0)') + '.', '<b>' + M('D') + '</b> (corte de ' + M('g') + ' con el eje OX, ' + M('x>0') + '): ' + M('(x-1)^2=16') + ' ⇒ ' + M('x=5') + ' ⇒ ' + M('D=(5,0)') + '.')),
            p('Comprovació de ' + M('C') + ': ' + M('f(3)=3\\cdot1=3') + ' i ' + M('g(3)=4-1=3') + '.', 'Comprobación de ' + M('C') + ': ' + M('f(3)=3\\cdot1=3') + ' y ' + M('g(3)=4-1=3') + '.'),
          ] },
        { n: '3.2', pts: 1.25, q: T('Calculeu l\u2019àrea de la zona puntejada.', 'Calcule el área de la zona punteada.'),
          sol: [
            p('La zona puntejada és entre ' + M('g') + ' (a dalt) i ' + M('f') + ' (a baix), de ' + M('x=0') + ' a ' + M('x=3') + ':', 'La zona punteada está entre ' + M('g') + ' (arriba) y ' + M('f') + ' (abajo), de ' + M('x=0') + ' a ' + M('x=3') + ':'),
            fig(plot({ xr: [-0.5, 5.6], yr: [-0.7, 4.8], tickx: [2, 3, 5], ticky: [3], curves: [{ f: x => 4 - ((x - 1) / 2) ** 2, dom: [0, 5], k: 0 }, { f: x => x ** 3 - 4 * x * x + 4 * x, dom: [0, 3.15], k: 1 }],
              fill: { f: x => 4 - ((x - 1) / 2) ** 2, g: x => x ** 3 - 4 * x * x + 4 * x, a: 0, b: 3 }, points: [[2, 0], [0, 3.75], [3, 3], [5, 0]], labels: [[0.15, -0.5, 'O'], [2, -0.5, 'A', 'middle'], [0.15, 4.4, 'B'], [3.1, 3.4, 'C'], [5, -0.5, 'D', 'middle']], alt: 'Logotip: zona puntejada entre g i f de x = 0 a x = 3' })),
            F(r`\int_0^3 g\,dx=\Big[4x-\tfrac{(x-1)^3}{12}\Big]_0^3=12-\tfrac{8+1}{12}=\tfrac{45}{4}`),
            F(r`\int_0^3 f\,dx=\Big[\tfrac{x^4}{4}-\tfrac{4x^3}{3}+2x^2\Big]_0^3=\tfrac{81}{4}-36+18=\tfrac94`),
            AN(r`A_{\text{punt.}}=\dfrac{45}{4}-\dfrac94=9\ \text{m}^2`),
          ] },
        { n: '3.3', pts: 0.5, q: T('Els alumnes volen pintar la part puntejada de color blau i la part ratllada de color vermell. Sabent que l\u2019àrea total del logotip és ' + M(r`\tfrac{175}{12}`) + ' m², de quin color necessitaran més pintura?', 'Los alumnos quieren pintar la parte punteada de color azul y la parte rayada de color rojo. Sabiendo que el área total del logotipo es ' + M(r`\tfrac{175}{12}`) + ' m², ¿de qué color necesitarán más pintura?'),
          sol: [
            F(r`A_{\text{ratllada}}=\dfrac{175}{12}-9=\dfrac{67}{12}\approx5{,}58\ \text{m}^2<9\ \text{m}^2`),
            ans('Necessitaran més pintura <b>blava</b> (9 m² enfront de 5,58 m² de vermella).', 'Necesitarán más pintura <b>azul</b> (9 m² frente a 5,58 m² de roja).'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pr,
      intro: p('S\u2019estima que el 20 % dels habitants d\u2019una regió pateixen algun tipus d\u2019arrítmia. Per diagnosticar-la, existeix la possibilitat de col·locar al pacient un monitor Holter, que detecta l\u2019arrítmia en un 95 % dels casos de persones que la pateixen, però que també dóna falsos positius, per motius elèctrics, en persones que no pateixen arrítmies en un 0,5 % dels casos.',
               'Se estima que el 20 % de los habitantes de una región padecen algún tipo de arritmia. Para diagnosticarla, existe la posibilidad de colocar al paciente un monitor Holter, que detecta la arritmia en un 95 % de los casos de personas que la padecen, pero que también da falsos positivos, por motivos eléctricos, en personas que no padecen arritmias en un 0,5 % de los casos.'),
      parts: [
        { n: '4.1', pts: 0.75, q: T('Si s\u2019escullen 4 persones a l\u2019atzar, quina és la probabilitat que almenys una pateixi arrítmies?', 'Si se escogen 4 personas al azar, ¿cuál es la probabilidad de que al menos una de ellas padezca arritmias?'),
          sol: [
            p('Pel complementari (ninguna en té; ' + M('P(\\text{no})=0{,}8') + ', independents):', 'Por el complementario (ninguna la tiene; ' + M('P(\\text{no})=0{,}8') + ', independientes):'),
            AN(r`P=1-0{,}8^4=1-0{,}4096=0{,}5904`),
          ] },
        { n: '4.2', pts: 0.75, q: T('Quina és la probabilitat que una persona escollida a l\u2019atzar obtingui un diagnòstic positiu d\u2019arrítmia?', '¿Cuál es la probabilidad de que una persona escogida al azar obtenga un diagnóstico positivo de arritmia?'),
          sol: [
            p('Sigui ' + M('A') + ' «té arrítmia» i ' + M('+') + ' «positiu»: ' + M('P(A)=0{,}2') + ', ' + M('P(+\\mid A)=0{,}95') + ', ' + M('P(+\\mid\\overline A)=0{,}005') + '.', 'Sea ' + M('A') + ' «tiene arritmia» y ' + M('+') + ' «positivo»: ' + M('P(A)=0{,}2') + ', ' + M('P(+\\mid A)=0{,}95') + ', ' + M('P(+\\mid\\overline A)=0{,}005') + '.'),
            F(r`P(+)=0{,}2\cdot0{,}95+0{,}8\cdot0{,}005=0{,}19+0{,}004`),
            AN(r`P(+)=0{,}194`),
          ] },
        { n: '4.3', pts: 1, q: T('Si una persona obté un diagnòstic negatiu a la prova del Holter, quina és la probabilitat que realment pateixi arrítmies?', 'Si una persona obtiene un diagnóstico negativo en la prueba del Holter, ¿cuál es la probabilidad de que realmente padezca arritmias?'),
          sol: [
            p('Bayes: ' + M('P(-)=1-0{,}194=0{,}806') + ' i ' + M('P(-\\mid A)=0{,}05') + ':', 'Bayes: ' + M('P(-)=1-0{,}194=0{,}806') + ' y ' + M('P(-\\mid A)=0{,}05') + ':'),
            F(r`P(A\mid-)=\dfrac{0{,}2\cdot0{,}05}{0{,}806}=\dfrac{0{,}01}{0{,}806}`),
            AN(r`P(A\mid-)\approx0{,}0124=1{,}24\,\%`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.op,
      intro: p('Per a cada punt ' + M('(x,y)') + ' de la corba ' + M('y=e^{-2x}') + ', amb ' + M('x>0') + ' i ' + M('y>0') + ', considereu el rectangle amb vèrtexs als punts ' + M('(0,0)') + ', ' + M('(x,0)') + ', ' + M('(0,y)') + ' i ' + M('(x,y)') + '.', 'Para cada punto ' + M('(x,y)') + ' de la curva ' + M('y=e^{-2x}') + ', con ' + M('x>0') + ' e ' + M('y>0') + ', considere el rectángulo con vértices en los puntos ' + M('(0,0)') + ', ' + M('(x,0)') + ', ' + M('(0,y)') + ' y ' + M('(x,y)') + '.'),
      parts: [
        { n: '5.1', pts: 1.5, q: T('Comproveu que, d\u2019entre tots aquests rectangles, el que té ' + M(r`x=\tfrac12`) + ' és el d\u2019àrea màxima. Quin és el valor d\u2019aquesta àrea?', 'Compruebe que, de entre todos estos rectángulos, el que tiene ' + M(r`x=\tfrac12`) + ' es el de área máxima. ¿Cuál es el valor de esta área?'),
          sol: [
            p('Base ' + M('x') + ' i alçada ' + M('y=e^{-2x}') + ': ' + M('A(x)=xe^{-2x}') + ' amb ' + M('x>0') + '.', 'Base ' + M('x') + ' y altura ' + M('y=e^{-2x}') + ': ' + M('A(x)=xe^{-2x}') + ' con ' + M('x>0') + '.'),
            F(r`A'(x)=e^{-2x}-2xe^{-2x}=e^{-2x}(1-2x)=0\ \Rightarrow\ x=\tfrac12`),
            p(M("A'>0") + ' si ' + M(r`x<\tfrac12`) + ' i ' + M("A'<0") + ' si ' + M(r`x>\tfrac12`) + ': és un <b>màxim</b>.', M("A'>0") + ' si ' + M(r`x<\tfrac12`) + ' y ' + M("A'<0") + ' si ' + M(r`x>\tfrac12`) + ': es un <b>máximo</b>.'),
            fig(plot({ xr: [-0.2, 3], yr: [-0.05, 0.32], tickx: [0.5, 1, 2], ticky: [0.1, 0.2], curves: [{ f: x => x * Math.exp(-2 * x), dom: [0, 3] }],
              points: [[0.5, 0.5 * Math.exp(-1)]], labels: [[0.7, 0.215, 'màx (1/2 , 1/2e)']], alt: 'Gràfica de A(x) = x e^(−2x) amb el màxim a x = 1/2' })),
            AN(r`A\big(\tfrac12\big)=\tfrac12e^{-1}=\dfrac1{2e}\approx0{,}184\ \text{u}^2`),
          ] },
        { n: '5.2', pts: 1, q: T('Calculeu l\u2019equació de la recta tangent a la funció ' + M('y=e^{-2x}') + ' en el punt d\u2019abscissa ' + M('x=0') + ', i el seu punt de tall amb l\u2019eix d\u2019abscisses.', 'Calcule la ecuación de la recta tangente a la función ' + M('y=e^{-2x}') + ' en el punto de abscisa ' + M('x=0') + ', y su punto de corte con el eje de abscisas.'),
          sol: [
            F(r`y(0)=1,\qquad y'=-2e^{-2x}\ \Rightarrow\ y'(0)=-2`),
            p('Tangent: ' + M('y-1=-2x') + ', és a dir ' + M('y=1-2x') + '. Talla l\u2019eix OX quan ' + M('1-2x=0') + '.', 'Tangente: ' + M('y-1=-2x') + ', es decir ' + M('y=1-2x') + '. Corta el eje OX cuando ' + M('1-2x=0') + '.'),
            AN(r`y=1-2x;\qquad \text{tall: }\Big(\tfrac12,\ 0\Big)`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.ge,
      intro: p('Considereu el punt ' + M('P=(1,3,0)') + ' i el pla ' + M(r`\pi`) + ' d\u2019equació ' + M('x+2y-2z=-7') + '.', 'Considere el punto ' + M('P=(1,3,0)') + ' y el plano ' + M(r`\pi`) + ' de ecuación ' + M('x+2y-2z=-7') + '.'),
      parts: [
        { n: '6.1', pts: 1, q: T('Sigui ' + M('r') + ' la recta que és perpendicular a ' + M(r`\pi`) + ' i passa per ' + M('P') + '. Calculeu el punt d\u2019intersecció de ' + M(r`\pi`) + ' amb ' + M('r') + '.', 'Sea ' + M('r') + ' la recta que es perpendicular a ' + M(r`\pi`) + ' y pasa por ' + M('P') + '. Calcule el punto de intersección de ' + M(r`\pi`) + ' con ' + M('r') + '.'),
          sol: [
            p('Direcció de ' + M('r') + ': el normal ' + M(r`(1,2,-2)`) + '. Per tant ' + M('r:\\ (1+t,\\ 3+2t,\\ -2t)') + '. Substituïm al pla:', 'Dirección de ' + M('r') + ': el normal ' + M(r`(1,2,-2)`) + '. Por tanto ' + M('r:\\ (1+t,\\ 3+2t,\\ -2t)') + '. Sustituimos en el plano:'),
            F(r`(1+t)+2(3+2t)-2(-2t)=-7\ \Rightarrow\ 9t+7=-7\ \Rightarrow\ t=-\tfrac{14}{9}`),
            AN(r`\Big(-\tfrac59,\ -\tfrac19,\ \tfrac{28}{9}\Big)`),
          ] },
        { n: '6.2', pts: 0.5, q: T('Calculeu la distància ' + M('d') + ' del punt ' + M('P') + ' al pla ' + M(r`\pi`) + '.', 'Calcule la distancia ' + M('d') + ' del punto ' + M('P') + ' al plano ' + M(r`\pi`) + '.'),
          sol: [
            F(r`d=\dfrac{|1+6-0+7|}{\sqrt{1+4+4}}=\dfrac{14}{3}`),
            p('(Coincideix amb la distància de ' + M('P') + ' al punt d\u2019intersecció: ' + M(r`\tfrac{14}{9}\cdot|(1,2,-2)|=\tfrac{14}9\cdot3`) + '.)', '(Coincide con la distancia de ' + M('P') + ' al punto de intersección: ' + M(r`\tfrac{14}{9}\cdot|(1,2,-2)|=\tfrac{14}9\cdot3`) + '.)'),
            AN(r`d=\dfrac{14}{3}\approx4{,}67`),
          ] },
        { n: '6.3', pts: 1, q: T('Calculeu l\u2019equació d\u2019un altre pla ' + M(r`\pi'`) + ' que sigui paral·lel a ' + M(r`\pi`) + ' i que també estigui a distància ' + M('d') + ' de ' + M('P') + '.', 'Calcule la ecuación de otro plano ' + M(r`\pi'`) + ' que sea paralelo a ' + M(r`\pi`) + ' y que también esté a distancia ' + M('d') + ' de ' + M('P') + '.'),
          sol: [
            p('Un pla paral·lel és ' + M('x+2y-2z=D') + '; la seva distància a ' + M('P') + ' és ' + M(r`\tfrac{|7-D|}{3}`) + '. Cal ' + M(r`\tfrac{|7-D|}{3}=\tfrac{14}{3}`) + ' ⇒ ' + M('|7-D|=14') + ' ⇒ ' + M('D=-7') + ' (és ' + M(r`\pi`) + ') o ' + M('D=21') + '.', 'Un plano paralelo es ' + M('x+2y-2z=D') + '; su distancia a ' + M('P') + ' es ' + M(r`\tfrac{|7-D|}{3}`) + '. Hace falta ' + M(r`\tfrac{|7-D|}{3}=\tfrac{14}{3}`) + ' ⇒ ' + M('|7-D|=14') + ' ⇒ ' + M('D=-7') + ' (es ' + M(r`\pi`) + ') o ' + M('D=21') + '.'),
            AN(r`\pi':\ x+2y-2z=21`),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 ───────────────────────── */
const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2024-mates-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M('f(x)=-2+10(x-1)\\ln x') + ', definida per a ' + M('x>0') + '.', 'Considere la función ' + M('f(x)=-2+10(x-1)\\ln x') + ', definida para ' + M('x>0') + '.'),
      parts: [
        { n: '1.1', pts: 0.75, q: T('Comproveu que ' + M('f(x)') + ' té una arrel a l\u2019interval ' + M('[1;1{,}5]') + ' i busqueu un interval d\u2019una dècima de longitud que també contingui aquesta mateixa arrel.', 'Compruebe que ' + M('f(x)') + ' tiene una raíz en el intervalo ' + M('[1;1{,}5]') + ' y busque un intervalo de una décima de longitud que también contenga esta misma raíz.'),
          sol: [
            p(M('f') + ' és contínua a ' + M('[1;1{,}5]') + ': ' + M('f(1)=-2<0') + ' i ' + M(r`f(1{,}5)=-2+5\ln1{,}5\approx0{,}027>0`) + '. Pel teorema de Bolzano hi ha una arrel.', M('f') + ' es continua en ' + M('[1;1{,}5]') + ': ' + M('f(1)=-2<0') + ' y ' + M(r`f(1{,}5)=-2+5\ln1{,}5\approx0{,}027>0`) + '. Por el teorema de Bolzano hay una raíz.'),
            p('Per tenir longitud 0,1: ' + M(r`f(1{,}4)=-2+4\ln1{,}4\approx-0{,}654<0`) + ' i ' + M('f(1{,}5)>0') + '.', 'Para longitud 0,1: ' + M(r`f(1{,}4)=-2+4\ln1{,}4\approx-0{,}654<0`) + ' y ' + M('f(1{,}5)>0') + '.'),
            AN(r`\text{arrel}\in[1{,}4;\ 1{,}5]\quad(\approx1{,}496)`),
          ] },
        { n: '1.2', pts: 1, q: T('Sense calcular els punts crítics, justifiqueu que ' + M('f(x)') + ' és decreixent a l\u2019interval ' + M('(0,1)') + ' i creixent a ' + M('(1,+\\infty)') + '. Quins màxims i mínims té aquesta funció?', 'Sin calcular los puntos críticos, justifique que ' + M('f(x)') + ' es decreciente en el intervalo ' + M('(0,1)') + ' y creciente en ' + M('(1,+\\infty)') + '. ¿Qué máximos y mínimos tiene esta función?'),
          sol: [
            F(r`f'(x)=10\Big(\ln x+\dfrac{x-1}{x}\Big)`),
            ul(T('Si ' + M('0<x<1') + ': ' + M('\\ln x<0') + ' i ' + M('\\tfrac{x-1}{x}<0') + ' ⇒ ' + M("f'<0") + ': <b>decreixent</b>.', 'Si ' + M('0<x<1') + ': ' + M('\\ln x<0') + ' y ' + M('\\tfrac{x-1}{x}<0') + ' ⇒ ' + M("f'<0") + ': <b>decreciente</b>.'),
              T('Si ' + M('x>1') + ': ' + M('\\ln x>0') + ' i ' + M('\\tfrac{x-1}{x}>0') + ' ⇒ ' + M("f'>0") + ': <b>creixent</b>.', 'Si ' + M('x>1') + ': ' + M('\\ln x>0') + ' y ' + M('\\tfrac{x-1}{x}>0') + ' ⇒ ' + M("f'>0") + ': <b>creciente</b>.')),
            ans('Decreix fins a ' + M('x=1') + ' i creix després: hi ha un <b>mínim</b> (absolut) a ' + M('(1,\\,-2)') + ' i <b>cap màxim</b>.', 'Decrece hasta ' + M('x=1') + ' y crece después: hay un <b>mínimo</b> (absoluto) en ' + M('(1,\\,-2)') + ' y <b>ningún máximo</b>.'),
          ] },
        { n: '1.3', pts: 0.75, q: T('Calculeu ' + M(r`\lim_{x\to0^+}f(x)`) + ' i ' + M(r`\lim_{x\to+\infty}f(x)`) + ', i feu un esbós de la gràfica d\u2019aquesta funció.', 'Calcule ' + M(r`\lim_{x\to0^+}f(x)`) + ' y ' + M(r`\lim_{x\to+\infty}f(x)`) + ', y haga un esbozo de la gráfica de esta función.'),
          sol: [
            F(r`\lim_{x\to0^+}f(x)=-2+10\cdot(-1)\cdot(-\infty)=+\infty\qquad\lim_{x\to+\infty}f(x)=+\infty\cdot+\infty=+\infty`),
            p('A més ' + M('x=0') + ' és asímptota vertical. La gràfica baixa fins al mínim ' + M('(1,-2)') + ' i després puja; talla l\u2019eix OX a ' + M('x\\approx0{,}60') + ' i a ' + M('x\\approx1{,}50') + ':', 'Además ' + M('x=0') + ' es asíntota vertical. La gráfica baja hasta el mínimo ' + M('(1,-2)') + ' y después sube; corta el eje OX en ' + M('x\\approx0{,}60') + ' y en ' + M('x\\approx1{,}50') + ':'),
            fig(plot({ xr: [-0.2, 2.5], yr: [-3.5, 12], tickx: [1, 2], ticky: [-2, 5, 10], curves: [{ f: x => -2 + 10 * (x - 1) * Math.log(x), dom: [0.04, 2.5], k: 0 }],
              points: [[1, -2], [0.6037, 0], [1.4963, 0]], labels: [[1.1, -2.9, 'mín (1, −2)']], alt: 'Gràfica de f amb el mínim (1, −2), dues arrels i l\u2019asímptota vertical x = 0' })),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.ma,
      intro: p('Considereu les matrius ' + M(r`P=\begin{pmatrix}2&1&-1\\2&1&0\\1&0&1\end{pmatrix},\ Q=\begin{pmatrix}2&2&2\\2&2&2\\2&2&2\end{pmatrix}\ \text{i}\ R=\begin{pmatrix}1&2&3\\1&1&1\\3&2&1\end{pmatrix}`) + '.',
               'Considere las matrices ' + M(r`P=\begin{pmatrix}2&1&-1\\2&1&0\\1&0&1\end{pmatrix},\ Q=\begin{pmatrix}2&2&2\\2&2&2\\2&2&2\end{pmatrix}\ \text{y}\ R=\begin{pmatrix}1&2&3\\1&1&1\\3&2&1\end{pmatrix}`) + '.'),
      parts: [
        { n: '2.1', pts: 1.25, q: T('Decidiu si la matriu ' + M('P') + ' és invertible i, en cas de ser-ho, calculeu-ne la inversa. Expliqueu detalladament el procediment seguit.', 'Decida si la matriz ' + M('P') + ' es invertible y, en caso de serlo, calcule su inversa. Explique detalladamente el procedimiento seguido.'),
          sol: [
            F(r`|P|=2(1\cdot1-0)-1(2\cdot1-0\cdot1)+(-1)(2\cdot0-1\cdot1)=2-2+1=1\neq0`),
            p('<b>És invertible.</b> Calculem ' + M('P^{-1}') + ' per Gauss-Jordan sobre ' + M('(P\\mid I)') + ' (o amb l\u2019adjunta transposada, dividida pel determinant, que val 1):', '<b>Es invertible.</b> Calculamos ' + M('P^{-1}') + ' por Gauss-Jordan sobre ' + M('(P\\mid I)') + ' (o con la adjunta traspuesta, dividida por el determinante, que vale 1):'),
            F(r`P^{-1}=\dfrac{1}{|P|}\big(\operatorname{Adj}P\big)^{t}=\begin{pmatrix}1&-1&1\\-2&3&-2\\-1&1&0\end{pmatrix}`),
            p('Comprovació (fila 1 de ' + M('P^{-1}') + ' per les columnes de ' + M('P') + '): ' + M('2-2+1=1') + ', ' + M('1-1+0=0') + ', ' + M('-1+0+1=0') + '; la resta de files i columnes surt igual que ' + M('PP^{-1}=I') + '.', 'Comprobación (fila 1 de ' + M('P^{-1}') + ' por las columnas de ' + M('P') + '): ' + M('2-2+1=1') + ', ' + M('1-1+0=0') + ', ' + M('-1+0+1=0') + '; el resto de filas y columnas sale igual que ' + M('PP^{-1}=I') + '.'),
          ] },
        { n: '2.2', pts: 1.25, q: T('Calculeu una matriu ' + M('X') + ' de 3 files i 3 columnes que compleixi ' + M('PX+Q=2R') + '.', 'Calcule una matriz ' + M('X') + ' de 3 filas y 3 columnas que cumpla ' + M('PX+Q=2R') + '.'),
          sol: [
            p('Aïllem: ' + M('PX=2R-Q') + ' ⇒ ' + M('X=P^{-1}(2R-Q)') + '. Primer:', 'Despejamos: ' + M('PX=2R-Q') + ' ⇒ ' + M('X=P^{-1}(2R-Q)') + '. Primero:'),
            F(r`2R-Q=\begin{pmatrix}0&2&4\\0&0&0\\4&2&0\end{pmatrix}`),
            F(r`X=\begin{pmatrix}1&-1&1\\-2&3&-2\\-1&1&0\end{pmatrix}\begin{pmatrix}0&2&4\\0&0&0\\4&2&0\end{pmatrix}=\begin{pmatrix}4&4&4\\-8&-8&-8\\0&-2&-4\end{pmatrix}`),
            p('Comprovació de la 1a fila: ' + M('(2,1,-1)\\cdot(4,-8,0)=0') + ' i ' + M('0+2=2') + ' dóna ' + M('2R-Q') + ' (0, 2, 4) ✓.', 'Comprobación de la 1.ª fila: ' + M('(2,1,-1)\\cdot(4,-8,0)=0') + ' y ' + M('0+2=2') + ' da ' + M('2R-Q') + ' (0, 2, 4) ✓.'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pa,
      intro: p('Considereu les paràboles ' + M('y=f_a(x)') + ', amb ' + M('f_a(x)=ax^2+2x+5-a') + ', on ' + M('a') + ' és un paràmetre real.', 'Considere las parábolas ' + M('y=f_a(x)') + ', con ' + M('f_a(x)=ax^2+2x+5-a') + ', donde ' + M('a') + ' es un parámetro real.'),
      parts: [
        { n: '3.1', pts: 1, q: T('Determineu el valor del paràmetre ' + M('a') + ' per al qual la recta tangent a ' + M('y=f_a(x)') + ' en el punt d\u2019abscissa ' + M('x=1') + ' passa pel punt ' + M('(2,13)') + '.', 'Determine el valor del parámetro ' + M('a') + ' para el que la recta tangente a ' + M('y=f_a(x)') + ' en el punto de abscisa ' + M('x=1') + ' pasa por el punto ' + M('(2,13)') + '.'),
          sol: [
            F(r`f_a(1)=a+2+5-a=7,\qquad f_a'(x)=2ax+2\ \Rightarrow\ f_a'(1)=2a+2`),
            p('Tangent: ' + M('y-7=(2a+2)(x-1)') + '. Passant per ' + M('(2,13)') + ': ' + M('6=2a+2') + '.', 'Tangente: ' + M('y-7=(2a+2)(x-1)') + '. Pasando por ' + M('(2,13)') + ': ' + M('6=2a+2') + '.'),
            AN(r`a=2`),
          ] },
        { n: '3.2', pts: 0.5, q: T('Calculeu els punts de tall de les paràboles ' + M('y=f_1(x)') + ' i ' + M('y=f_3(x)') + '.', 'Calcule los puntos de corte de las parábolas ' + M('y=f_1(x)') + ' e ' + M('y=f_3(x)') + '.'),
          sol: [
            p(M('f_1=x^2+2x+4') + ' i ' + M('f_3=3x^2+2x+2') + '. Igualant: ' + M('2x^2=2') + ' ⇒ ' + M('x=\\pm1') + '.', M('f_1=x^2+2x+4') + ' y ' + M('f_3=3x^2+2x+2') + '. Igualando: ' + M('2x^2=2') + ' ⇒ ' + M('x=\\pm1') + '.'),
            AN(r`(-1,\ 3)\ \text{ i }\ (1,\ 7)`),
          ] },
        { n: '3.3', pts: 1, q: T('Calculeu l\u2019àrea de la regió situada entre les dues paràboles ' + M('y=f_1(x)') + ' i ' + M('y=f_3(x)') + '.', 'Calcule el área de la región situada entre las dos parábolas ' + M('y=f_1(x)') + ' e ' + M('y=f_3(x)') + '.'),
          sol: [
            p('A ' + M('[-1,1]') + ' és ' + M('f_1-f_3=2-2x^2\\ge0') + ', així que ' + M('f_1') + ' és a sobre:', 'En ' + M('[-1,1]') + ' es ' + M('f_1-f_3=2-2x^2\\ge0') + ', así que ' + M('f_1') + ' está encima:'),
            fig(plot({ xr: [-2, 2], yr: [-0.5, 19], tickx: [-1, 1], ticky: [5, 10, 15], curves: [{ f: x => x * x + 2 * x + 4, dom: [-2, 2], k: 0 }, { f: x => 3 * x * x + 2 * x + 2, dom: [-2, 2], k: 1 }],
              fill: { f: x => x * x + 2 * x + 4, g: x => 3 * x * x + 2 * x + 2, a: -1, b: 1 }, points: [[-1, 3], [1, 7]], labels: [[-1.9, 8.5, 'f₁'], [1.35, 14.5, 'f₃']], alt: 'Paràboles f1 i f3 amb la regió ombrejada entre x = −1 i x = 1' })),
            F(r`A=\int_{-1}^{1}(2-2x^2)\,dx=\Big[2x-\tfrac{2x^3}{3}\Big]_{-1}^{1}=2\Big(2-\tfrac23\Big)`),
            AN(r`A=\dfrac83\ \text{u}^2\approx2{,}67\ \text{u}^2`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pr,
      intro: p('La Rut fa servir el mètode següent per fer els problemes de matemàtiques: tira un dau equilibrat i, si el resultat és com a màxim 4, pensa i resol el problema ella mateixa; si el resultat és 5 o 6, busca la solució del problema per Internet i la copia. Quan és ella qui ha pensat la solució, la resposta és correcta en el 75 % dels casos; quan copia la solució d\u2019Internet, la resposta és correcta només en el 40 % dels casos.',
               'Rut usa el siguiente método para hacer los problemas de matemáticas: tira un dado equilibrado y, si el resultado es como máximo 4, piensa y resuelve el problema ella misma; si el resultado es 5 o 6, busca la solución del problema por Internet y la copia. Cuando es ella quien ha pensado la solución, la respuesta es correcta en el 75 % de los casos; cuando copia la solución de Internet, la respuesta es correcta solamente en el 40 % de los casos.'),
      parts: [
        { n: '4.1', pts: 0.75, q: T('Quina és la probabilitat que la solució d\u2019un problema respost seguint aquest mètode sigui correcta?', '¿Cuál es la probabilidad de que la solución de un problema respondido siguiendo este método sea correcta?'),
          sol: [
            p('Sigui ' + M('R') + ' «ho resol ella» (' + M(r`P(R)=\tfrac46=\tfrac23`) + ') i ' + M('C') + ' «correcta»:', 'Sea ' + M('R') + ' «lo resuelve ella» (' + M(r`P(R)=\tfrac46=\tfrac23`) + ') y ' + M('C') + ' «correcta»:'),
            F(r`P(C)=\tfrac23\cdot0{,}75+\tfrac13\cdot0{,}40=0{,}5+0{,}1\overline3`),
            AN(r`P(C)=\dfrac{19}{30}\approx0{,}633`),
          ] },
        { n: '4.2', pts: 0.75, q: T('Quina és la probabilitat que un problema hagi estat resolt per la Rut si se sap que la solució és correcta?', '¿Cuál es la probabilidad de que un problema haya sido resuelto por Rut si se sabe que la solución es correcta?'),
          sol: [
            F(r`P(R\mid C)=\dfrac{P(R)\,P(C\mid R)}{P(C)}=\dfrac{0{,}5}{19/30}=\dfrac{15}{19}`),
            AN(r`P(R\mid C)\approx0{,}789=78{,}9\,\%`),
          ] },
        { n: '4.3', pts: 1, q: T('Demà la Rut ha de lliurar 5 problemes de matemàtiques. Quina és la probabilitat que almenys 4 siguin correctes?', 'Mañana Rut tiene que entregar 5 problemas de matemáticas. ¿Cuál es la probabilidad de que al menos 4 sean correctos?'),
          sol: [
            p('Binomial ' + M(r`B(5,\ p=\tfrac{19}{30})`) + ' amb ' + M(r`q=\tfrac{11}{30}`) + ':', 'Binomial ' + M(r`B(5,\ p=\tfrac{19}{30})`) + ' con ' + M(r`q=\tfrac{11}{30}`) + ':'),
            F(r`P(X\ge4)=5p^4q+p^5=5\Big(\tfrac{19}{30}\Big)^4\tfrac{11}{30}+\Big(\tfrac{19}{30}\Big)^5`),
            AN(r`P(X\ge4)\approx0{,}397`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.op,
      intro: J(p('En Carles vol construir un decorat per a l\u2019obra de teatre de final de curs en forma d\u2019un rectangle i dos semicercles, tal com es mostra a la figura següent:', 'Carles quiere construir un decorado para la obra de teatro de final de curso en forma de un rectángulo y dos semicírculos, tal como se muestra en la siguiente figura:'),
        img('2024-s5-e5', 780, 630, 'Decorat: rectangle amb un semicercle de radi x a dalt i un de radi y a la dreta', 'Decorado: rectángulo con un semicírculo de radio x arriba y otro de radio y a la derecha')),
      parts: [
        { n: '5.1', pts: 1, q: T('Determineu el perímetre i l\u2019àrea del decorat que cal construir en funció de ' + M('x') + ' i de ' + M('y') + '.', 'Determine el perímetro y el área del decorado a construir en función de ' + M('x') + ' y de ' + M('y') + '.'),
          sol: [
            p('Segons la figura, ' + M('x') + ' i ' + M('y') + ' són els radis dels semicercles: el rectangle fa ' + M('2x') + ' d\u2019ample (diàmetre del semicercle superior) per ' + M('2y') + ' d\u2019alt (diàmetre del de la dreta).', 'Según la figura, ' + M('x') + ' e ' + M('y') + ' son los radios de los semicírculos: el rectángulo mide ' + M('2x') + ' de ancho (diámetro del semicírculo superior) por ' + M('2y') + ' de alto (diámetro del de la derecha).'),
            ul(T('<b>Perímetre:</b> costat esquerre ' + M('2y') + ' + base ' + M('2x') + ' + dos arcs ' + M('\\pi x') + ' i ' + M('\\pi y') + '.', '<b>Perímetro:</b> lado izquierdo ' + M('2y') + ' + base ' + M('2x') + ' + dos arcos ' + M('\\pi x') + ' y ' + M('\\pi y') + '.'),
              T('<b>Àrea:</b> rectangle ' + M('2x\\cdot2y') + ' + dos semicercles ' + M(r`\tfrac{\pi x^2}{2}`) + ' i ' + M(r`\tfrac{\pi y^2}{2}`) + '.', '<b>Área:</b> rectángulo ' + M('2x\\cdot2y') + ' + dos semicírculos ' + M(r`\tfrac{\pi x^2}{2}`) + ' y ' + M(r`\tfrac{\pi y^2}{2}`) + '.')),
            AN(r`P=2x+2y+\pi(x+y)=(2+\pi)(x+y),\qquad A=4xy+\dfrac{\pi}{2}(x^2+y^2)`),
          ] },
        { n: '5.2', pts: 1.5, q: T('Per revestir el perímetre del decorat, en Carles té material per cobrir fins a 10 m. Si el vol gastar tot, quines seran les mesures del decorat d\u2019àrea màxima que podrà construir? Quin és el valor d\u2019aquesta àrea?', 'Para revestir el perímetro del decorado, Carles tiene material para cubrir hasta 10 m. Si lo quiere gastar todo, ¿cuáles serán las medidas del decorado de área máxima que podrá construir? ¿Cuál es el valor de esta área?'),
          sol: [
            p('Restricció: ' + M('(2+\\pi)(x+y)=10') + ' ⇒ ' + M(r`x+y=s=\dfrac{10}{2+\pi}`) + '. Com que ' + M('x^2+y^2=s^2-2xy') + ', l\u2019àrea queda:', 'Restricción: ' + M('(2+\\pi)(x+y)=10') + ' ⇒ ' + M(r`x+y=s=\dfrac{10}{2+\pi}`) + '. Como ' + M('x^2+y^2=s^2-2xy') + ', el área queda:'),
            F(r`A=4xy+\tfrac\pi2(s^2-2xy)=(4-\pi)\,xy+\tfrac\pi2s^2`),
            p('Com que ' + M('4-\\pi>0') + ', l\u2019àrea és màxima quan ' + M('xy') + ' ho és, i amb ' + M('x+y=s') + ' fix això passa per a ' + M('x=y=\\tfrac s2') + ' (equivalentment, amb ' + M('y=s-x') + ': ' + M("A'(x)=0") + ' dóna ' + M('x=\\tfrac s2') + ' i ' + M("A''<0") + ').', 'Como ' + M('4-\\pi>0') + ', el área es máxima cuando ' + M('xy') + ' lo es, y con ' + M('x+y=s') + ' fijo eso ocurre para ' + M('x=y=\\tfrac s2') + ' (equivalentemente, con ' + M('y=s-x') + ': ' + M("A'(x)=0") + ' da ' + M('x=\\tfrac s2') + ' y ' + M("A''<0") + ').'),
            F(r`x=y=\dfrac{5}{2+\pi}\approx0{,}972\ \text{m}\qquad A=\dfrac{4+\pi}{4}\,s^2=\dfrac{25(4+\pi)}{(2+\pi)^2}`),
            AN(r`x=y\approx0{,}97\ \text{m},\qquad A_{\max}\approx6{,}75\ \text{m}^2`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.ge,
      intro: p('Considereu les rectes ' + M(r`r:\ \dfrac{x-5}{4}=\dfrac{y-4}{3}=\dfrac{z-3}{-1}`) + ' i ' + M(r`s:\ \begin{cases}x=4+2k\\y=3+k\\z=-1\end{cases}`) + '.',
               'Considere las rectas ' + M(r`r:\ \dfrac{x-5}{4}=\dfrac{y-4}{3}=\dfrac{z-3}{-1}`) + ' y ' + M(r`s:\ \begin{cases}x=4+2k\\y=3+k\\z=-1\end{cases}`) + '.'),
      parts: [
        { n: '6.1', pts: 1.25, q: T('Quina és la seva posició relativa? Calculeu l\u2019equació implícita d\u2019un pla ' + M(r`\pi`) + ' que sigui paral·lel a les dues rectes i que passi per l\u2019origen de coordenades.', '¿Cuál es su posición relativa? Calcule la ecuación implícita de un plano ' + M(r`\pi`) + ' que sea paralelo a las dos rectas y que pase por el origen de coordenadas.'),
          sol: [
            p('Direccions: ' + M(r`\vec u=(4,3,-1)`) + ' i ' + M(r`\vec v=(2,1,0)`) + ': no són proporcionals ⇒ no són paral·leles. Punts: ' + M('(5,4,3)\\in r') + ' i ' + M('(4,3,-1)\\in s') + '. Si es tallessin: ' + M('3-\\alpha=-1') + ' ⇒ ' + M('\\alpha=4') + ', però llavors ' + M('5+16=4+2k') + ' dóna ' + M('k=8{,}5') + ' i ' + M('4+12=3+k') + ' dóna ' + M('k=13') + ': contradicció.',
              'Direcciones: ' + M(r`\vec u=(4,3,-1)`) + ' y ' + M(r`\vec v=(2,1,0)`) + ': no son proporcionales ⇒ no son paralelas. Puntos: ' + M('(5,4,3)\\in r') + ' y ' + M('(4,3,-1)\\in s') + '. Si se cortaran: ' + M('3-\\alpha=-1') + ' ⇒ ' + M('\\alpha=4') + ', pero entonces ' + M('5+16=4+2k') + ' da ' + M('k=8{,}5') + ' y ' + M('4+12=3+k') + ' da ' + M('k=13') + ': contradicción.'),
            ans('Les rectes <b>s\u2019encreuen</b> (ni paral·leles ni secants).', 'Las rectas <b>se cruzan</b> (ni paralelas ni secantes).'),
            p('El normal del pla és ' + M(r`\vec u\times\vec v`) + ':', 'El normal del plano es ' + M(r`\vec u\times\vec v`) + ':'),
            F(r`(4,3,-1)\times(2,1,0)=(1,\,-2,\,-2)`),
            AN(r`\pi:\ x-2y-2z=0`),
          ] },
        { n: '6.2', pts: 1.25, q: T('Calculeu l\u2019equació de la recta ' + M('t') + ' que talla les dues rectes ' + M('r') + ' i ' + M('s') + ' perpendicularment.', 'Calcule la ecuación de la recta ' + M('t') + ' que corta las dos rectas ' + M('r') + ' y ' + M('s') + ' perpendicularmente.'),
          sol: [
            p('La perpendicular comuna té la direcció ' + M(r`\vec u\times\vec v=(1,-2,-2)`) + '. Busquem ' + M('R=(5+4\\alpha,\\,4+3\\alpha,\\,3-\\alpha)\\in r') + ' i ' + M('S=(4+2k,\\,3+k,\\,-1)\\in s') + ' amb ' + M(r`\overrightarrow{RS}=\lambda(1,-2,-2)`) + ':',
              'La perpendicular común tiene la dirección ' + M(r`\vec u\times\vec v=(1,-2,-2)`) + '. Buscamos ' + M('R=(5+4\\alpha,\\,4+3\\alpha,\\,3-\\alpha)\\in r') + ' y ' + M('S=(4+2k,\\,3+k,\\,-1)\\in s') + ' con ' + M(r`\overrightarrow{RS}=\lambda(1,-2,-2)`) + ':'),
            F(r`\begin{cases}-1+2k-4\alpha=\lambda\\-1+k-3\alpha=-2\lambda\\-4+\alpha=-2\lambda\end{cases}\ \Rightarrow\ \alpha=2,\ k=5,\ \lambda=1`),
            p('Així ' + M('R=(13,10,1)') + ' i ' + M('S=(14,8,-1)') + ', amb ' + M(r`\overrightarrow{RS}=(1,-2,-2)`) + ' ✓.', 'Así ' + M('R=(13,10,1)') + ' y ' + M('S=(14,8,-1)') + ', con ' + M(r`\overrightarrow{RS}=(1,-2,-2)`) + ' ✓.'),
            AN(r`t:\ (x,y,z)=(13,10,1)+\mu\,(1,-2,-2),\ \mu\in\mathbb R`),
          ] },
      ] },
  ],
};

module.exports = {
  year: { y: 2024, title: T('PAU 2024', 'PAU 2024'), series: [s1, s3, s5] },
};
