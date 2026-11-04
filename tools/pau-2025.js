/* PAU 2025 · Matemàtiques II · sèries 1, 3 i 4 (enunciats oficials, solucions pròpies). */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  an: T('Anàlisi', 'Análisis'), al: T('Àlgebra', 'Álgebra'),
  pr: T('Probabilitat i anàlisi', 'Probabilidad y análisis'),
  op: T('Optimització · Geometria', 'Optimización · Geometría'),
  ig: T('Integral · Geometria', 'Integral · Geometría'),
  ge: T('Anàlisi · Geometria', 'Análisis · Geometría'),
  po: T('Probabilitat · Optimització', 'Probabilidad · Optimización'),
};
const F = tex => html(D(tex));                                   // fórmula destacada comuna
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>'); // resposta només amb fórmula
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const img = (f, w, h, ca, es) => ({ ca: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + ca + '"></figure>', es: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + es + '"></figure>' });

/* ───────────────────────── SÈRIE 1 ───────────────────────── */
const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2025-mates-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M(r`f(x)=\dfrac{x^2-2x}{x-1}`) + '.', 'Considere la función ' + M(r`f(x)=\dfrac{x^2-2x}{x-1}`) + '.'),
      parts: [
        { n: '1.1', pts: 1,
          q: T('Determineu els punts de tall de la corba ' + M('y=f(x)') + ' amb els eixos de coordenades i les equacions de les seves possibles asímptotes verticals, horitzontals i obliqües.',
               'Determine los cortes de la curva ' + M('y=f(x)') + ' con los ejes de coordenadas, y las ecuaciones de sus posibles asíntotas verticales, horizontales y oblicuas.'),
          sol: [
            ul(T('<b>Eix OY:</b> ' + M('f(0)=0') + ' ⇒ punt ' + M('(0,0)') + '.', '<b>Eje OY:</b> ' + M('f(0)=0') + ' ⇒ punto ' + M('(0,0)') + '.'),
              T('<b>Eix OX:</b> ' + M('x^2-2x=x(x-2)=0') + ' ⇒ ' + M('(0,0)') + ' i ' + M('(2,0)') + '.', '<b>Eje OX:</b> ' + M('x^2-2x=x(x-2)=0') + ' ⇒ ' + M('(0,0)') + ' y ' + M('(2,0)') + '.')),
            p('<b>Vertical:</b> el denominador s\u2019anul·la a ' + M('x=1') + ' i el numerador hi val ' + M('-1\\neq0') + ', per tant ' + M(r`\lim_{x\to1^\pm}f(x)=\mp\infty`) + ' i <b>' + M('x=1') + '</b> és asímptota vertical.',
              '<b>Vertical:</b> el denominador se anula en ' + M('x=1') + ' y el numerador vale ' + M('-1\\neq0') + ', luego ' + M(r`\lim_{x\to1^\pm}f(x)=\mp\infty`) + ' y <b>' + M('x=1') + '</b> es asíntota vertical.'),
            p('<b>Horitzontal:</b> el grau del numerador (2) supera el del denominador (1), així que ' + M(r`\lim_{x\to\pm\infty}f(x)=\pm\infty`) + ': no n\u2019hi ha.',
              '<b>Horizontal:</b> el grado del numerador (2) supera al del denominador (1), así que ' + M(r`\lim_{x\to\pm\infty}f(x)=\pm\infty`) + ': no hay.'),
            p('<b>Obliqua:</b> dividint, ' + M(r`f(x)=x-1-\dfrac{1}{x-1}`) + ', i el darrer terme tendeix a 0. Per tant <b>' + M('y=x-1') + '</b>.',
              '<b>Oblicua:</b> dividiendo, ' + M(r`f(x)=x-1-\dfrac{1}{x-1}`) + ', y el último término tiende a 0. Por tanto <b>' + M('y=x-1') + '</b>.'),
            fig(plot({ xr: [-3, 5], yr: [-6, 6], tickx: [-2, 2, 4], ticky: [-4, 4], vlines: [1],
              curves: [{ f: x => (x * x - 2 * x) / (x - 1), dom: [-3, 0.97], k: 0 }, { f: x => (x * x - 2 * x) / (x - 1), dom: [1.03, 5], k: 0 }, { f: x => x - 1, k: 1 }],
              points: [[0, 0], [2, 0]], labels: [[1.15, -4.9, 'x = 1'], [3.5, 3.9, 'y = x − 1']],
              alt: 'Gràfica de f amb l\u2019asímptota vertical x = 1 i l\u2019obliqua y = x − 1' })),
          ] },
        { n: '1.2', pts: 1,
          q: T('Calculeu les equacions de les rectes tangents a la corba ' + M('y=f(x)') + ' en els punts ' + M('x=0') + ' i ' + M('x=2') + '. Aquestes dues rectes són paral·leles? Justifiqueu la resposta.',
               'Calcule las ecuaciones de las rectas tangentes a la curva ' + M('y=f(x)') + ' en los puntos ' + M('x=0') + ' y ' + M('x=2') + '. ¿Estas dos rectas son paralelas? Justifique la respuesta.'),
          sol: [
            p('Derivem: ' + M(r`f'(x)=1+\dfrac{1}{(x-1)^2}=\dfrac{x^2-2x+2}{(x-1)^2}`) + '.', 'Derivamos: ' + M(r`f'(x)=1+\dfrac{1}{(x-1)^2}=\dfrac{x^2-2x+2}{(x-1)^2}`) + '.'),
            F(r`f(0)=0,\ f'(0)=2\qquad f(2)=0,\ f'(2)=2`),
            ul(T('Tangent a ' + M('x=0') + ': ' + M('y=2x') + '.', 'Tangente en ' + M('x=0') + ': ' + M('y=2x') + '.'),
              T('Tangent a ' + M('x=2') + ': ' + M('y=2(x-2)=2x-4') + '.', 'Tangente en ' + M('x=2') + ': ' + M('y=2(x-2)=2x-4') + '.')),
            ans('Tenen el mateix pendent (' + M('2') + ') i ordenades a l\u2019origen diferents (' + M('0') + ' i ' + M('-4') + '): <b>són paral·leles</b> (i no coincideixen).',
                'Tienen la misma pendiente (' + M('2') + ') y ordenadas en el origen distintas (' + M('0') + ' y ' + M('-4') + '): <b>son paralelas</b> (y no coinciden).'),
          ] },
        { n: '1.3', pts: 0.5,
          q: T('Hi ha algun punt on la recta tangent a ' + M('f(x)') + ' tingui pendent 1? En cas afirmatiu, trobeu-lo.', '¿Hay algún punto donde la recta tangente a ' + M('f(x)') + ' tenga pendiente 1? En caso afirmativo, encuéntrelo.'),
          sol: [
            p('Cal ' + M(r`f'(x)=1+\dfrac{1}{(x-1)^2}=1`) + ', és a dir ' + M(r`\dfrac{1}{(x-1)^2}=0`) + ', que no té solució (una fracció amb numerador 1 mai és 0).',
              'Hace falta ' + M(r`f'(x)=1+\dfrac{1}{(x-1)^2}=1`) + ', es decir ' + M(r`\dfrac{1}{(x-1)^2}=0`) + ', que no tiene solución (una fracción con numerador 1 nunca es 0).'),
            ans('<b>No</b>: com que ' + M(r`f'(x)>1`) + ' per a tot ' + M(r`x\neq1`) + ', la tangent mai té pendent 1.', '<b>No</b>: como ' + M(r`f'(x)>1`) + ' para todo ' + M(r`x\neq1`) + ', la tangente nunca tiene pendiente 1.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent:', 'Considere el siguiente sistema de ecuaciones lineales:'),
        html(D(r`\left\{\begin{aligned}y-z&=p+3\\p^2x-z&=5\\x-y&=3\end{aligned}\right.`))),
      parts: [
        { n: '2.1', pts: 1.25, q: T('Discutiu el sistema per als diferents valors del paràmetre ' + M('p') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('p') + '.'),
          sol: [
            p('Determinant de la matriu de coeficients (variables ' + M('x,y,z') + '):', 'Determinante de la matriz de coeficientes (variables ' + M('x,y,z') + '):'),
            F(r`\begin{vmatrix}0&1&-1\\p^2&0&-1\\1&-1&0\end{vmatrix}=p^2-1`),
            ul(T('<b>' + M(r`p\neq\pm1`) + '</b>: determinant ≠ 0 ⇒ rang 3 ⇒ <b>sistema compatible determinat</b>.', '<b>' + M(r`p\neq\pm1`) + '</b>: determinante ≠ 0 ⇒ rango 3 ⇒ <b>sistema compatible determinado</b>.'),
              T('<b>' + M('p=1') + '</b>: ' + M('y-z=4') + ' i ' + M('x-y=3') + ' sumades donen ' + M('x-z=7') + ', però la 2a equació diu ' + M('x-z=5') + ' ⇒ <b>incompatible</b>.', '<b>' + M('p=1') + '</b>: ' + M('y-z=4') + ' y ' + M('x-y=3') + ' sumadas dan ' + M('x-z=7') + ', pero la 2.ª ecuación dice ' + M('x-z=5') + ' ⇒ <b>incompatible</b>.'),
              T('<b>' + M('p=-1') + '</b>: ' + M('y-z=2') + ' i ' + M('x-y=3') + ' donen ' + M('x-z=5') + ', que és justament la 2a equació ⇒ rang 2 = rang ampliada < 3 ⇒ <b>compatible indeterminat</b> (1 paràmetre).', '<b>' + M('p=-1') + '</b>: ' + M('y-z=2') + ' y ' + M('x-y=3') + ' dan ' + M('x-z=5') + ', que es justo la 2.ª ecuación ⇒ rango 2 = rango ampliada < 3 ⇒ <b>compatible indeterminado</b> (1 parámetro).')),
          ] },
        { n: '2.2', pts: 0.5, q: T('Resoleu el sistema per al cas ' + M('p=-1') + '.', 'Resuelva el sistema para el caso ' + M('p=-1') + '.'),
          sol: [
            p('Amb ' + M('y=\\lambda') + ': de ' + M('x-y=3') + ' surt ' + M('x=\\lambda+3') + ' i de ' + M('y-z=2') + ' surt ' + M('z=\\lambda-2') + '.', 'Con ' + M('y=\\lambda') + ': de ' + M('x-y=3') + ' sale ' + M('x=\\lambda+3') + ' y de ' + M('y-z=2') + ' sale ' + M('z=\\lambda-2') + '.'),
            ans('<b>' + M(r`(x,y,z)=(\lambda+3,\ \lambda,\ \lambda-2),\ \lambda\in\mathbb R`) + '</b>', '<b>' + M(r`(x,y,z)=(\lambda+3,\ \lambda,\ \lambda-2),\ \lambda\in\mathbb R`) + '</b>'),
          ] },
        { n: '2.3', pts: 0.75, q: T('Per al cas ' + M('p=-1') + ', hi ha alguna solució que compleixi, a més, ' + M('xy=10') + '? En cas afirmatiu, indiqueu-ne quantes i trobeu-les totes.', 'Para el caso ' + M('p=-1') + ', ¿existe alguna solución que cumpla, además, ' + M('xy=10') + '? En caso afirmativo, indique cuántas y encuéntrelas todas.'),
          sol: [
            p('Substituïm: ' + M(r`(\lambda+3)\lambda=10`) + ' ⇒ ' + M(r`\lambda^2+3\lambda-10=0`) + ' ⇒ ' + M(r`\lambda=2`) + ' o ' + M(r`\lambda=-5`) + '.', 'Sustituimos: ' + M(r`(\lambda+3)\lambda=10`) + ' ⇒ ' + M(r`\lambda^2+3\lambda-10=0`) + ' ⇒ ' + M(r`\lambda=2`) + ' o ' + M(r`\lambda=-5`) + '.'),
            ans('<b>Sí, dues solucions</b>: ' + M('(5,2,0)') + ' i ' + M('(-2,-5,-7)') + '. (Comprovació: ' + M('5\\cdot2=10') + ' i ' + M('(-2)(-5)=10') + '.)', '<b>Sí, dos soluciones</b>: ' + M('(5,2,0)') + ' y ' + M('(-2,-5,-7)') + '. (Comprobación: ' + M('5\\cdot2=10') + ' y ' + M('(-2)(-5)=10') + '.)'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.po,
      intro: p('Una empresa produeix dos tipus de peces, de ferro i d\u2019acer. El 60 % de la producció total correspon a les peces de ferro, i la resta són d\u2019acer. Sabem que el 95 % de les peces de ferro produïdes no tenen cap defecte, mentre que el 3 % de les peces d\u2019acer són defectuoses.',
               'Una empresa produce dos tipos de piezas, de hierro y de acero. El 60 % de la producción total corresponde a las piezas de hierro, y el resto son de acero. Sabemos que el 95 % de las piezas de hierro producidas no tienen ningún defecto, mientras que el 3 % de las piezas de acero son defectuosas.'),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Si es pren una peça a l\u2019atzar, quina és la probabilitat que sigui defectuosa?', 'Si se coge una pieza al azar, ¿cuál es la probabilidad de que sea defectuosa?'),
          sol: [
            p('Teorema de la probabilitat total, amb ' + M('P(\\text{ferro})=0{,}6') + ', ' + M('P(\\text{acer})=0{,}4') + ', ' + M('P(D\\mid\\text{ferro})=0{,}05') + ' i ' + M('P(D\\mid\\text{acer})=0{,}03') + ':', 'Teorema de la probabilidad total, con ' + M('P(\\text{hierro})=0{,}6') + ', ' + M('P(\\text{acero})=0{,}4') + ', ' + M('P(D\\mid\\text{hierro})=0{,}05') + ' y ' + M('P(D\\mid\\text{acero})=0{,}03') + ':'),
            F(r`P(D)=0{,}6\cdot0{,}05+0{,}4\cdot0{,}03=0{,}03+0{,}012`),
            AN(r`P(D)=0{,}042=4{,}2\,\%`),
          ] },
        { n: '3.2', pts: 0.75, q: T('L\u2019empresa aviat diversificarà la producció i també començarà a produir peces de titani, que es vendran en paquets de 5. Si la probabilitat que una peça de titani sigui defectuosa és un valor desconegut ' + M('p') + ', i cada peça és defectuosa independentment de les altres, comproveu que l\u2019expressió que ens dóna la probabilitat que en un paquet de 5 peces n\u2019hi hagi exactament 4 de defectuoses (en funció de ' + M('p') + ') és ' + M('f(p)=5(p^4-p^5)') + '.',
          'La empresa pronto diversificará la producción y empezará a producir también piezas de titanio, que se venderán en paquetes de 5. Si la probabilidad de que una pieza de titanio sea defectuosa es un valor desconocido ' + M('p') + ', y cada pieza es defectuosa independientemente de las demás, compruebe que la expresión que nos da la probabilidad de que en un paquete de 5 piezas haya exactamente 4 defectuosas (en función de ' + M('p') + ') es ' + M('f(p)=5(p^4-p^5)') + '.'),
          sol: [
            p('El nombre de peces defectuoses segueix una binomial ' + M('B(5,p)') + ':', 'El número de piezas defectuosas sigue una binomial ' + M('B(5,p)') + ':'),
            F(r`P(X=4)=\binom54p^4(1-p)^1=5p^4(1-p)=5(p^4-p^5)=f(p)\ \checkmark`),
          ] },
        { n: '3.3', pts: 1, q: T('Considereu la funció ' + M('f(p)') + ' de l\u2019apartat anterior. Determineu el valor màxim que pren ' + M('f(p)') + ' quan ' + M('p\\ge0') + '.', 'Considere la función ' + M('f(p)') + ' del apartado anterior. Determine el valor máximo que toma ' + M('f(p)') + ' cuando ' + M('p\\ge0') + '.'),
          sol: [
            F(r`f'(p)=5(4p^3-5p^4)=5p^3(4-5p)=0\ \Rightarrow\ p=0\ \text{o}\ p=\tfrac45`),
            p('Signe de ' + M(r`f'`) + ': positiu a ' + M('(0,\\tfrac45)') + ' i negatiu a ' + M('(\\tfrac45,\\infty)') + ', per tant ' + M(r`f`) + ' creix i després decreix: a ' + M(r`p=\tfrac45`) + ' hi ha el màxim absolut (a ' + M('p=0') + ' hi ha ' + M('f=0') + ', i per a ' + M('p>1') + ' la funció és negativa).',
              'Signo de ' + M(r`f'`) + ': positivo en ' + M('(0,\\tfrac45)') + ' y negativo en ' + M('(\\tfrac45,\\infty)') + ', luego ' + M(r`f`) + ' crece y después decrece: en ' + M(r`p=\tfrac45`) + ' está el máximo absoluto (en ' + M('p=0') + ' vale ' + M('f=0') + ', y para ' + M('p>1') + ' la función es negativa).'),
            fig(plot({ xr: [-0.1, 1.15], yr: [-0.08, 0.5], tickx: [0.5], ticky: [0.2, 0.4], hlines: [256 / 625], curves: [{ f: x => 5 * (x ** 4 - x ** 5), dom: [0, 1.15] }],
              points: [[0.8, 256 / 625]], labels: [[0.2, 0.455, 'màx (0,8 ; 0,41)']], alt: 'Gràfica de f(p) amb el màxim a p = 0,8' })),
            F(r`f\!\left(\tfrac45\right)=5\Big(\tfrac{256}{625}-\tfrac{1024}{3125}\Big)=\tfrac{5\cdot256}{3125}`),
            AN(r`f_{\max}=\dfrac{256}{625}\approx0{,}41`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.ig, choose: true,
      opts: [
        { k: 'A',
          intro: J(p('El veler major d\u2019un veler té forma semiparabòlica i està delimitat per les gràfiques de ' + M('f(x)=-x^2+25') + ', ' + M('y=0') + ' i ' + M('x=0') + ', tal com s\u2019indica a la figura següent:',
                     'La vela mayor de un velero tiene forma semiparabólica y está delimitada por las gráficas de ' + M('f(x)=-x^2+25') + ', ' + M('y=0') + ' y ' + M('x=0') + ', según se indica en la siguiente figura:'),
            img('2025-s1-e4a', 900, 939, 'Vela semiparabòlica: regió superior i regió inferior separades per y = 9', 'Vela semiparabólica: región superior y región inferior separadas por y = 9'),
            p('La vela té dues parts separades per la recta ' + M('y=9') + '. Per a la seva construcció s\u2019usa un teixit de niló a la part superior, que costa 50 €/u², i un teixit de polièster a la part inferior, que costa 70 €/u². Calculeu el cost total del material necessari per a la construcció d\u2019aquesta vela.',
              'La vela tiene dos partes separadas por la recta ' + M('y=9') + '. Para su construcción se usa un tejido de nailon en la parte superior, que cuesta 50 €/u², y un tejido de poliéster en la parte inferior, que cuesta 70 €/u². Calcule el coste total del material necesario para la construcción de esta vela.')),
          parts: [
            { n: '4.1', pts: 2.5, q: T('Calculeu el cost total del material.', 'Calcule el coste total del material.'),
              sol: [
                p('La recta ' + M('y=9') + ' talla la paràbola on ' + M('-x^2+25=9') + ', és a dir a ' + M('x=4') + '. La regió superior va de ' + M('y=9') + ' fins a la corba, per a ' + M('0\\le x\\le4') + ':', 'La recta ' + M('y=9') + ' corta la parábola donde ' + M('-x^2+25=9') + ', es decir en ' + M('x=4') + '. La región superior va de ' + M('y=9') + ' hasta la curva, para ' + M('0\\le x\\le4') + ':'),
                fig(plot({ xr: [-0.6, 5.8], yr: [-1.5, 27], tickx: [4, 5], ticky: [9, 25], hlines: [9], curves: [{ f: x => 25 - x * x, dom: [0, 5] }],
                  fill: { f: x => 25 - x * x, g: () => 9, a: 0, b: 4 }, points: [[4, 9]], labels: [[0.35, 17, 'superior · 50 €/u²'], [1.3, 4.5, 'inferior · 70 €/u²']], alt: 'Paràbola y = 25 − x² amb la recta y = 9; regió superior ombrejada' })),
                F(r`A_{sup}=\int_0^4(25-x^2-9)\,dx=\Big[16x-\tfrac{x^3}{3}\Big]_0^4=64-\tfrac{64}{3}=\tfrac{128}{3}`),
                p('L\u2019àrea total és ' + M(r`\int_0^5(25-x^2)\,dx=125-\tfrac{125}{3}=\tfrac{250}{3}`) + ', així que ' + M(r`A_{inf}=\tfrac{250}{3}-\tfrac{128}{3}=\tfrac{122}{3}`) + '.', 'El área total es ' + M(r`\int_0^5(25-x^2)\,dx=125-\tfrac{125}{3}=\tfrac{250}{3}`) + ', así que ' + M(r`A_{inf}=\tfrac{250}{3}-\tfrac{128}{3}=\tfrac{122}{3}`) + '.'),
                F(r`50\cdot\tfrac{128}{3}+70\cdot\tfrac{122}{3}=\tfrac{6400+8540}{3}=\tfrac{14940}{3}`),
                ans('<b>Cost total</b> = ' + M('4980') + ' €', '<b>Coste total</b> = ' + M('4980') + ' €'),
              ] },
          ] },
        { k: 'B',
          intro: p('Considereu el pla ' + M(r`\pi`) + ' d\u2019equació ' + M('x+y=0') + '.', 'Considere el plano ' + M(r`\pi`) + ' de ecuación ' + M('x+y=0') + '.'),
          parts: [
            { n: '4.1', pts: 1, q: T('Calculeu l\u2019equació del pla ' + M(r`\pi'`) + ' que és perpendicular a ' + M(r`\pi`) + ' i conté els punts ' + M('P=(1,-1,2)') + ' i ' + M('Q=(3,-3,6)') + '.', 'Calcule la ecuación del plano ' + M(r`\pi'`) + ' que es perpendicular a ' + M(r`\pi`) + ' y contiene los puntos ' + M('P=(1,-1,2)') + ' y ' + M('Q=(3,-3,6)') + '.'),
              sol: [
                p('El pla ' + M(r`\pi'`) + ' conté la direcció ' + M(r`\overrightarrow{PQ}=(2,-2,4)\parallel(1,-1,2)`) + ' i, en ser perpendicular a ' + M(r`\pi`) + ', també el vector normal d\u2019aquest, ' + M(r`\vec n=(1,1,0)`) + '. El seu normal és el producte vectorial:',
                  'El plano ' + M(r`\pi'`) + ' contiene la dirección ' + M(r`\overrightarrow{PQ}=(2,-2,4)\parallel(1,-1,2)`) + ' y, al ser perpendicular a ' + M(r`\pi`) + ', también el vector normal de este, ' + M(r`\vec n=(1,1,0)`) + '. Su normal es el producto vectorial:'),
                F(r`(1,-1,2)\times(1,1,0)=(-2,2,2)\parallel(-1,1,1)`),
                p('Així ' + M('-x+y+z=d') + ', i amb ' + M('P') + ': ' + M('d=-1-1+2=0') + '. (Comprovació amb ' + M('Q') + ': ' + M('-3-3+6=0') + '.)', 'Así ' + M('-x+y+z=d') + ', y con ' + M('P') + ': ' + M('d=-1-1+2=0') + '. (Comprobación con ' + M('Q') + ': ' + M('-3-3+6=0') + '.)'),
                AN(r`\pi':\ x-y-z=0`),
              ] },
            { n: '4.2', pts: 1.5, q: T('Calculeu l\u2019equació paramètrica de la recta continguda a ' + M(r`\pi'`) + ' i que conté els punts de ' + M(r`\pi'`) + ' a la mateixa distància de ' + M('P') + ' que de ' + M('Q') + '.', 'Calcule la ecuación paramétrica de la recta contenida en ' + M(r`\pi'`) + ' y que contiene los puntos de ' + M(r`\pi'`) + ' a la misma distancia de ' + M('P') + ' que de ' + M('Q') + '.'),
              sol: [
                p('Els punts equidistants de ' + M('P') + ' i ' + M('Q') + ' formen el pla mediador: passa pel punt mitjà ' + M('M=(2,-2,4)') + ' i té normal ' + M(r`\overrightarrow{PQ}\parallel(1,-1,2)`) + ':', 'Los puntos equidistantes de ' + M('P') + ' y ' + M('Q') + ' forman el plano mediador: pasa por el punto medio ' + M('M=(2,-2,4)') + ' y tiene normal ' + M(r`\overrightarrow{PQ}\parallel(1,-1,2)`) + ':'),
                F(r`x-y+2z=2+2+8=12`),
                p('La recta buscada és la intersecció d\u2019aquest pla amb ' + M(r`\pi'`) + '. Restant ' + M('x-y-z=0') + ' de ' + M('x-y+2z=12') + ' surt ' + M('3z=12') + ', és a dir ' + M('z=4') + ' i ' + M('x-y=4') + '. Amb ' + M('y=t') + ':', 'La recta buscada es la intersección de este plano con ' + M(r`\pi'`) + '. Restando ' + M('x-y-z=0') + ' de ' + M('x-y+2z=12') + ' sale ' + M('3z=12') + ', es decir ' + M('z=4') + ' y ' + M('x-y=4') + '. Con ' + M('y=t') + ':'),
                AN(r`(x,y,z)=(4+t,\ t,\ 4),\ t\in\mathbb R`),
                p('Comprovació: ' + M('(4,0,4)') + ' és de ' + M(r`\pi'`) + ' (' + M('4-0-4=0') + ') i ' + M('d(\\cdot,P)^2=9+1+4=14=1+9+4=d(\\cdot,Q)^2') + '.', 'Comprobación: ' + M('(4,0,4)') + ' es de ' + M(r`\pi'`) + ' (' + M('4-0-4=0') + ') y ' + M('d(\\cdot,P)^2=9+1+4=14=1+9+4=d(\\cdot,Q)^2') + '.'),
              ] },
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 3 ───────────────────────── */
const s3 = {
  id: 3, pdf: 'pdf/pau/pau-2025-mates-serie3.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.op,
      intro: J(p('Una família vol comprar un terreny per construir una casa envoltada de penya-segats amb vistes al mar. En aquella zona de la costa, els penya-segats segueixen les rectes ' + M('y=0') + ' i ' + M('y=3x') + '. A més, la família vol que el terreny sigui triangular i que el tercer costat del triangle passi pel punt ' + M('P=(1,1)') + ', tal com es pot veure a la figura.',
                 'Una familia quiere comprar un terreno para construir una casa rodeada de acantilados con vistas al mar. En aquella zona de la costa, los acantilados siguen las rectas ' + M('y=0') + ' e ' + M('y=3x') + '. Además, la familia quiere que el terreno sea triangular y que el tercer lado del triángulo pase por el punto ' + M('P=(1,1)') + ', tal como puede verse en la figura.'),
        img('2025-s3-e1', 930, 948, 'Terreny triangular limitat per y = 0, y = 3x i una recta r que passa per P = (1, 1)', 'Terreno triangular limitado por y = 0, y = 3x y una recta r que pasa por P = (1, 1)')),
      parts: [
        { n: '1.1', pts: 1, q: T('Plantegeu l\u2019equació de la recta ' + M('r') + ' que defineix el tercer costat del triangle en funció del seu pendent ' + M('m') + ', i comproveu que l\u2019àrea del terreny ve donada per ' + M(r`A(m)=\dfrac32\cdot\dfrac{m^2-2m+1}{m^2-3m}`) + '.',
                                  'Plantee la ecuación de la recta ' + M('r') + ' que define el tercer lado del triángulo en función de su pendiente ' + M('m') + ', y compruebe que el área del terreno viene dada por ' + M(r`A(m)=\dfrac32\cdot\dfrac{m^2-2m+1}{m^2-3m}`) + '.'),
          sol: [
            p('La recta per ' + M('P=(1,1)') + ' de pendent ' + M('m') + ' és ' + M('r:\\ y-1=m(x-1)') + '. Els vèrtexs són l\u2019origen ' + M('O') + ' i els talls de ' + M('r') + ' amb els dos penya-segats:', 'La recta por ' + M('P=(1,1)') + ' de pendiente ' + M('m') + ' es ' + M('r:\\ y-1=m(x-1)') + '. Los vértices son el origen ' + M('O') + ' y los cortes de ' + M('r') + ' con los dos acantilados:'),
            ul(T('Amb ' + M('y=0') + ': ' + M(r`x=\dfrac{m-1}{m}`) + ', vèrtex ' + M(r`A=\Big(\dfrac{m-1}{m},0\Big)`) + '.', 'Con ' + M('y=0') + ': ' + M(r`x=\dfrac{m-1}{m}`) + ', vértice ' + M(r`A=\Big(\dfrac{m-1}{m},0\Big)`) + '.'),
              T('Amb ' + M('y=3x') + ': ' + M('3x-1=m(x-1)') + ' ⇒ ' + M(r`x=\dfrac{m-1}{m-3}`) + ', vèrtex ' + M(r`B=\Big(\dfrac{m-1}{m-3},\dfrac{3(m-1)}{m-3}\Big)`) + '.', 'Con ' + M('y=3x') + ': ' + M('3x-1=m(x-1)') + ' ⇒ ' + M(r`x=\dfrac{m-1}{m-3}`) + ', vértice ' + M(r`B=\Big(\dfrac{m-1}{m-3},\dfrac{3(m-1)}{m-3}\Big)`) + '.')),
            p('Prenent com a base el costat sobre l\u2019eix OX i com a alçada l\u2019ordenada de ' + M('B') + ':', 'Tomando como base el lado sobre el eje OX y como altura la ordenada de ' + M('B') + ':'),
            F(r`A(m)=\tfrac12\cdot\dfrac{m-1}{m}\cdot\dfrac{3(m-1)}{m-3}=\dfrac32\cdot\dfrac{(m-1)^2}{m(m-3)}=\dfrac32\cdot\dfrac{m^2-2m+1}{m^2-3m}\ \checkmark`),
          ] },
        { n: '1.2', pts: 1.5, q: T('Calculeu el valor de ' + M('m') + ' que fa que l\u2019àrea d\u2019aquest terreny (i, per tant, el seu preu) sigui mínima. Quin és el valor d\u2019aquesta àrea?', 'Calcule el valor de ' + M('m') + ' que hace que el área de este terreno (y, por tanto, su precio) sea mínima. ¿Cuál es el valor de esta área?'),
          sol: [
            p('Derivem ' + M(r`g(m)=\dfrac{(m-1)^2}{m^2-3m}`) + ':', 'Derivamos ' + M(r`g(m)=\dfrac{(m-1)^2}{m^2-3m}`) + ':'),
            F(r`g'(m)=\dfrac{2(m-1)(m^2-3m)-(m-1)^2(2m-3)}{(m^2-3m)^2}=\dfrac{(m-1)(-m-3)}{(m^2-3m)^2}`),
            p('Els punts crítics són ' + M('m=-3') + ' i ' + M('m=1') + '; aquest darrer dóna àrea 0 (la recta passaria per l\u2019origen) i no serveix. Al terreny de la figura ' + M('m<0') + ': ' + M(r`g'<0`) + ' si ' + M('m<-3') + ' i ' + M(r`g'>0`) + ' si ' + M('-3<m<0') + ', per tant a ' + M('m=-3') + ' hi ha un <b>mínim</b>.',
              'Los puntos críticos son ' + M('m=-3') + ' y ' + M('m=1') + '; este último da área 0 (la recta pasaría por el origen) y no sirve. En el terreno de la figura ' + M('m<0') + ': ' + M(r`g'<0`) + ' si ' + M('m<-3') + ' y ' + M(r`g'>0`) + ' si ' + M('-3<m<0') + ', por tanto en ' + M('m=-3') + ' hay un <b>mínimo</b>.'),
            fig(plot({ xr: [-0.3, 2.1], yr: [-0.4, 3.2], tickx: [1, 2], ticky: [1, 2, 3],
              curves: [{ f: x => 3 * x, dom: [0, 1.1], k: 0 }, { f: x => -3 * x + 4, dom: [0.4, 1.45], k: 1 }],
              fill: { f: x => x <= 2 / 3 ? 3 * x : -3 * x + 4, g: () => 0, a: 0, b: 4 / 3 }, points: [[1, 1], [4 / 3, 0], [2 / 3, 2]],
              labels: [[1.08, 1.12, 'P'], [1.5, 0.35, 'r (m = −3)'], [0.2, 1.8, 'y = 3x']], alt: 'Triangle mínim amb la recta r de pendent −3 per P' })),
            F(r`A(-3)=\dfrac32\cdot\dfrac{16}{18}=\dfrac43`),
            AN(r`m=-3,\qquad A_{\min}=\dfrac43\ \text{u}^2\approx1{,}33\ \text{u}^2`),
            p('Comprovació: ' + M('r:\\ y=-3x+4') + ' talla l\u2019eix OX a ' + M(r`(\tfrac43,0)`) + ' i ' + M('y=3x') + ' a ' + M('(\\tfrac23,2)') + '; àrea ' + M(r`\tfrac12\cdot\tfrac43\cdot2=\tfrac43`) + '.', 'Comprobación: ' + M('r:\\ y=-3x+4') + ' corta el eje OX en ' + M(r`(\tfrac43,0)`) + ' e ' + M('y=3x') + ' en ' + M('(\\tfrac23,2)') + '; área ' + M(r`\tfrac12\cdot\tfrac43\cdot2=\tfrac43`) + '.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions següent:', 'Considere el siguiente sistema de ecuaciones lineales:'),
        html(D(r`\left\{\begin{aligned}x+3y+z&=5\\mx+2z&=0\\my-z&=m\end{aligned}\right.`))),
      parts: [
        { n: '2.1', pts: 1.25, q: T('Discutiu el sistema per als diferents valors del paràmetre ' + M('m') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('m') + '.'),
          sol: [
            F(r`\begin{vmatrix}1&3&1\\m&0&2\\0&m&-1\end{vmatrix}=-2m+3m+m^2=m(m+1)`),
            ul(T('<b>' + M(r`m\neq0,-1`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`m\neq0,-1`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('m=0') + '</b>: ' + M('x+3y+z=5') + ', ' + M('2z=0') + ', ' + M('-z=0') + ' ⇒ ' + M('z=0') + ' i ' + M('x+3y=5') + '; rang 2 = rang ampliada ⇒ <b>compatible indeterminat</b>.', '<b>' + M('m=0') + '</b>: ' + M('x+3y+z=5') + ', ' + M('2z=0') + ', ' + M('-z=0') + ' ⇒ ' + M('z=0') + ' y ' + M('x+3y=5') + '; rango 2 = rango ampliada ⇒ <b>compatible indeterminado</b>.'),
              T('<b>' + M('m=-1') + '</b>: de ' + M('-x+2z=0') + ' i ' + M('-y-z=-1') + ' surt ' + M('x=2z') + ', ' + M('y=1-z') + '; a la 1a: ' + M('2z+3-3z+z=3\\neq5') + ' ⇒ <b>incompatible</b>.', '<b>' + M('m=-1') + '</b>: de ' + M('-x+2z=0') + ' y ' + M('-y-z=-1') + ' sale ' + M('x=2z') + ', ' + M('y=1-z') + '; en la 1.ª: ' + M('2z+3-3z+z=3\\neq5') + ' ⇒ <b>incompatible</b>.')),
          ] },
        { n: '2.2', pts: 0.5, q: T('Resoleu el sistema per a ' + M('m=1') + '.', 'Resuelva el sistema para ' + M('m=1') + '.'),
          sol: [
            p('Queda ' + M('x+3y+z=5') + ', ' + M('x+2z=0') + ', ' + M('y-z=1') + '. De les dues darreres, ' + M('x=-2z') + ' i ' + M('y=1+z') + '; a la 1a: ' + M('-2z+3+3z+z=5') + ' ⇒ ' + M('z=1') + '.', 'Queda ' + M('x+3y+z=5') + ', ' + M('x+2z=0') + ', ' + M('y-z=1') + '. De las dos últimas, ' + M('x=-2z') + ' e ' + M('y=1+z') + '; en la 1.ª: ' + M('-2z+3+3z+z=5') + ' ⇒ ' + M('z=1') + '.'),
            AN(r`(x,y,z)=(-2,\ 2,\ 1)`),
          ] },
        { n: '2.3', pts: 0.75, q: T('Resoleu el sistema quan tingui infinites solucions.', 'Resuelva el sistema cuando este tenga infinitas soluciones.'),
          sol: [
            p('Només per a ' + M('m=0') + ': ' + M('z=0') + ' i ' + M('x=5-3y') + '. Amb ' + M('y=\\lambda') + ':', 'Solo para ' + M('m=0') + ': ' + M('z=0') + ' y ' + M('x=5-3y') + '. Con ' + M('y=\\lambda') + ':'),
            AN(r`(x,y,z)=(5-3\lambda,\ \lambda,\ 0),\ \lambda\in\mathbb R`),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pr,
      intro: p('La lesió per sesamoïditis (inflamació de l\u2019os sesamoide del peu) és relativament habitual entre la població que practica esports d\u2019impacte. En una població d\u2019esportistes, el 45 % practiquen esports d\u2019impacte. Entre ells, un 10 % pateixen lesions per sesamoïditis, mentre que entre els que no en practiquen només un 3 % presenten aquesta lesió. Escollim un esportista a l\u2019atzar.',
               'La lesión por sesamoiditis (inflamación del hueso sesamoide del pie) es relativamente habitual entre la población que practica deportes de impacto. En una población de deportistas, el 45 % practican deportes de impacto. Entre ellos, un 10 % padecen lesiones por sesamoiditis, mientras que entre los que no practican deportes de impacto solamente un 3 % presentan esta lesión. Escogemos a un deportista al azar.'),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Quina és la probabilitat que pateixi sesamoïditis?', '¿Cuál es la probabilidad de que padezca sesamoiditis?'),
          sol: [
            F(r`P(S)=0{,}45\cdot0{,}10+0{,}55\cdot0{,}03=0{,}045+0{,}0165`),
            AN(r`P(S)=0{,}0615=6{,}15\,\%`),
          ] },
        { n: '3.2', pts: 0.75, q: T('Si l\u2019esportista escollit té una lesió per sesamoïditis, quina és la probabilitat que practiqui esports d\u2019impacte?', 'Si el deportista escogido tiene una lesión por sesamoiditis, ¿cuál es la probabilidad de que practique deportes de impacto?'),
          sol: [
            p('Teorema de Bayes:', 'Teorema de Bayes:'),
            F(r`P(I\mid S)=\dfrac{P(I)\,P(S\mid I)}{P(S)}=\dfrac{0{,}045}{0{,}0615}=\dfrac{30}{41}`),
            AN(r`P(I\mid S)\approx0{,}732=73{,}2\,\%`),
          ] },
        { n: '3.3', pts: 1,
          q: T('Una empresa de calçat esportiu ha creat una sabatilla amb amortiment. Els beneficis (en milers d\u2019euros) segueixen una funció ' + M('f(x)=ax^3+bx^2+cx') + ', on ' + M('x') + ' són els anys des que va sortir a la venda. Calculeu ' + M('a,b,c') + ' sabent que el primer any es va assolir el màxim de beneficis, de 8 000 euros, i que el segon any hi va haver un punt d\u2019inflexió.',
               'Una empresa de calzado deportivo ha creado una zapatilla con amortiguación. Los beneficios (en miles de euros) siguen una función ' + M('f(x)=ax^3+bx^2+cx') + ', donde ' + M('x') + ' son los años transcurridos desde que salió a la venta. Calcule ' + M('a,b,c') + ' sabiendo que el primer año se alcanzó el máximo de beneficios, por valor de 8 000 euros, y que en el segundo año hubo un punto de inflexión.'),
          sol: [
            p('Condicions (unitats en milers d\u2019euros): màxim a ' + M('x=1') + ' ⇒ ' + M("f'(1)=0") + ' i ' + M('f(1)=8') + '; inflexió a ' + M('x=2') + ' ⇒ ' + M("f''(2)=0") + '. Amb ' + M("f'(x)=3ax^2+2bx+c") + ' i ' + M("f''(x)=6ax+2b") + ':',
              'Condiciones (unidades en miles de euros): máximo en ' + M('x=1') + ' ⇒ ' + M("f'(1)=0") + ' y ' + M('f(1)=8') + '; inflexión en ' + M('x=2') + ' ⇒ ' + M("f''(2)=0") + '. Con ' + M("f'(x)=3ax^2+2bx+c") + ' y ' + M("f''(x)=6ax+2b") + ':'),
            F(r`12a+2b=0\Rightarrow b=-6a\qquad 3a+2b+c=0\Rightarrow c=9a\qquad a+b+c=4a=8`),
            AN(r`a=2,\quad b=-12,\quad c=18`),
            fig(plot({ xr: [-0.4, 4.2], yr: [-1.5, 10], tickx: [1, 2, 3], ticky: [4, 8], curves: [{ f: x => 2 * x ** 3 - 12 * x ** 2 + 18 * x, dom: [-0.3, 4] }],
              points: [[1, 8], [2, 4]], labels: [[1.12, 9, 'màx (1, 8)'], [2.15, 4.9, 'inflexió (2, 4)']], alt: 'Gràfica de f(x) = 2x³ − 12x² + 18x amb el màxim a x = 1 i la inflexió a x = 2' })),
            p('Comprovació: ' + M("f''(1)=12-24<0") + ' (màxim, efectivament) i ' + M('f(2)=16-48+36=4') + '.', 'Comprobación: ' + M("f''(1)=12-24<0") + ' (máximo, efectivamente) y ' + M('f(2)=16-48+36=4') + '.'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.ge, choose: true,
      opts: [
        { k: 'A',
          intro: J(p('Un vidrier està reparant un dels vitralls de la Sagrada Família, la forma del qual és la de la part ombrejada de la figura. Ha comprovat que Gaudí el va dissenyar de manera que un dels costats segueix la funció ' + M('y=3\\sin(x/4)') + ' i un altre segueix la funció ' + M('y=3\\cos(x/4)') + ', on ' + M('x') + ' i ' + M('y') + ' estan expressades en metres.',
                     'Un vidriero está reparando uno de los vitrales de la Sagrada Familia, cuya forma es la de la parte sombreada de la figura adjunta. Se ha dado cuenta de que Gaudí lo diseñó de modo que uno de los lados sigue la función ' + M('y=3\\sin(x/4)') + ' y otro sigue la función ' + M('y=3\\cos(x/4)') + ', donde ' + M('x') + ' e ' + M('y') + ' están expresadas en metros.'),
            img('2025-s3-e4a', 690, 654, 'Vitrall limitat per dues corbes amb els punts A, B i C', 'Vitral limitado por dos curvas con los puntos A, B y C')),
          parts: [
            { n: '4.1', pts: 1, q: T('Raoneu a quina funció correspon cada gràfica i calculeu les coordenades dels punts ' + M('B') + ' i ' + M('C') + ' assenyalats a la figura (tenint en compte que ' + M('A') + ' és l\u2019origen de coordenades).', 'Razone a qué función corresponde cada gráfica y calcule las coordenadas de los puntos ' + M('B') + ' y ' + M('C') + ' señalados en la figura (teniendo en cuenta que ' + M('A') + ' es el origen de coordenadas).'),
              sol: [
                p('<b>Quina és quina:</b> la corba que passa per l\u2019origen ' + M('A') + ' i creix és ' + M(r`y=3\sin\tfrac x4`) + ' (' + M('\\sin0=0') + '); la que comença a l\u2019eix OY i baixa és ' + M(r`y=3\cos\tfrac x4`) + ' (' + M('\\cos0=1') + ').', '<b>Cuál es cuál:</b> la curva que pasa por el origen ' + M('A') + ' y crece es ' + M(r`y=3\sin\tfrac x4`) + ' (' + M('\\sin0=0') + '); la que empieza en el eje OY y baja es ' + M(r`y=3\cos\tfrac x4`) + ' (' + M('\\cos0=1') + ').'),
                p(M('B') + ' és el tall del cosinus amb l\u2019eix OY: ' + M('B=(0,3)') + '. ' + M('C') + ' és on es tallen: ' + M(r`\sin\tfrac x4=\cos\tfrac x4`) + ' ⇒ ' + M(r`\tan\tfrac x4=1`) + ' ⇒ ' + M(r`\tfrac x4=\tfrac\pi4`) + ' ⇒ ' + M(r`x=\pi`) + ' (la primera intersecció amb ' + M('x>0') + ').',
                  M('B') + ' es el corte del coseno con el eje OY: ' + M('B=(0,3)') + '. ' + M('C') + ' es donde se cortan: ' + M(r`\sin\tfrac x4=\cos\tfrac x4`) + ' ⇒ ' + M(r`\tan\tfrac x4=1`) + ' ⇒ ' + M(r`\tfrac x4=\tfrac\pi4`) + ' ⇒ ' + M(r`x=\pi`) + ' (la primera intersección con ' + M('x>0') + ').'),
                AN(r`B=(0,3),\qquad C=\Big(\pi,\ \tfrac{3\sqrt2}{2}\Big)\approx(3{,}14;\ 2{,}12)`),
              ] },
            { n: '4.2', pts: 1.5, q: T('Calculeu el preu del vitrall sabent que costa 750 €/m².', 'Calcule el precio del vitral sabiendo que cuesta 750 €/m².'),
              sol: [
                p('El vitrall està entre el cosinus (a dalt) i el sinus (a baix), des de ' + M('x=0') + ' fins a ' + M('x=\\pi') + ':', 'El vitral está entre el coseno (arriba) y el seno (abajo), desde ' + M('x=0') + ' hasta ' + M('x=\\pi') + ':'),
                fig(plot({ xr: [-0.6, 7], yr: [-0.6, 3.6], ticky: [3], curves: [{ f: x => 3 * Math.cos(x / 4), dom: [0, 6.5], k: 0 }, { f: x => 3 * Math.sin(x / 4), dom: [0, 6.5], k: 1 }],
                  fill: { f: x => 3 * Math.cos(x / 4), g: x => 3 * Math.sin(x / 4), a: 0, b: Math.PI }, points: [[0, 0], [0, 3], [Math.PI, 3 * Math.SQRT1_2]],
                  labels: [[0.15, -0.3, 'A'], [0.15, 3.25, 'B'], [3.25, 2.5, 'C'], [Math.PI, -0.3, 'π', 'middle']], alt: 'Vitrall ombrejat entre y = 3 cos(x/4) i y = 3 sin(x/4) de x = 0 a x = π' })),
                F(r`A=\int_0^\pi\Big(3\cos\tfrac x4-3\sin\tfrac x4\Big)dx=\Big[12\sin\tfrac x4+12\cos\tfrac x4\Big]_0^\pi`),
                F(r`=12\Big(\tfrac{\sqrt2}{2}+\tfrac{\sqrt2}{2}\Big)-12\,(0+1)=12(\sqrt2-1)\approx4{,}97\ \text{m}^2`),
                ans('<b>Preu</b> = ' + M(r`750\cdot12(\sqrt2-1)=9000(\sqrt2-1)\approx3\,728`) + ' €', '<b>Precio</b> = ' + M(r`750\cdot12(\sqrt2-1)=9000(\sqrt2-1)\approx3\,728`) + ' €'),
              ] },
          ] },
        { k: 'B',
          intro: p('Considereu el pla ' + M(r`\pi:\ 2x-y+z=5`) + ' i el punt ' + M('P=(0,1,3)') + '.', 'Considere el plano ' + M(r`\pi:\ 2x-y+z=5`) + ' y el punto ' + M('P=(0,1,3)') + '.'),
          parts: [
            { n: '4.1', pts: 0.5, q: T('Comproveu que la distància del punt ' + M('P') + ' al pla ' + M(r`\pi`) + ' és ' + M(r`\tfrac{\sqrt6}{2}`) + '.', 'Compruebe que la distancia del punto ' + M('P') + ' al plano ' + M(r`\pi`) + ' es ' + M(r`\tfrac{\sqrt6}{2}`) + '.'),
              sol: [
                F(r`d(P,\pi)=\dfrac{|2\cdot0-1+3-5|}{\sqrt{4+1+1}}=\dfrac{3}{\sqrt6}=\dfrac{3\sqrt6}{6}=\dfrac{\sqrt6}{2}\ \checkmark`),
              ] },
            { n: '4.2', pts: 0.75, q: T('Calculeu l\u2019equació general d\u2019un pla ' + M(r`\pi_1`) + ' paral·lel a ' + M(r`\pi`) + ' i que passi pel punt ' + M('P') + '. Quina és la distància entre ' + M(r`\pi_1`) + ' i ' + M(r`\pi`) + '?', 'Calcule la ecuación general de un plano ' + M(r`\pi_1`) + ' paralelo a ' + M(r`\pi`) + ' y que pase por el punto ' + M('P') + '. ¿Cuál es la distancia entre ' + M(r`\pi_1`) + ' y ' + M(r`\pi`) + '?'),
              sol: [
                p('Els plans paral·lels tenen el mateix normal: ' + M('2x-y+z=D') + '. Amb ' + M('P') + ': ' + M('D=0-1+3=2') + '.', 'Los planos paralelos tienen la misma normal: ' + M('2x-y+z=D') + '. Con ' + M('P') + ': ' + M('D=0-1+3=2') + '.'),
                AN(r`\pi_1:\ 2x-y+z-2=0`),
                p('La distància entre plans paral·lels és la d\u2019un punt de ' + M(r`\pi_1`) + ' a ' + M(r`\pi`) + ', és a dir la de ' + M('P') + ':', 'La distancia entre planos paralelos es la de un punto de ' + M(r`\pi_1`) + ' a ' + M(r`\pi`) + ', es decir la de ' + M('P') + ':'),
                AN(r`d(\pi_1,\pi)=\dfrac{\sqrt6}{2}\approx1{,}22`),
              ] },
            { n: '4.3', pts: 1.25, q: T('Calculeu l\u2019equació general d\u2019un segon pla ' + M(r`\pi_2`) + ', diferent de ' + M(r`\pi_1`) + ', paral·lel a ' + M(r`\pi`) + ' i que sigui a una distància ' + M(r`\tfrac{\sqrt6}{2}`) + ' de ' + M(r`\pi`) + '.', 'Calcule la ecuación general de un segundo plano ' + M(r`\pi_2`) + ', diferente de ' + M(r`\pi_1`) + ', paralelo a ' + M(r`\pi`) + ' y que esté a una distancia ' + M(r`\tfrac{\sqrt6}{2}`) + ' de ' + M(r`\pi`) + '.'),
              sol: [
                p('Un pla ' + M('2x-y+z=D') + ' és a distància ' + M(r`\tfrac{|D-5|}{\sqrt6}`) + ' de ' + M(r`\pi`) + '. Cal ' + M(r`\tfrac{|D-5|}{\sqrt6}=\tfrac{\sqrt6}{2}`) + ', és a dir ' + M('|D-5|=3') + ' ⇒ ' + M('D=2') + ' o ' + M('D=8') + '. El primer és ' + M(r`\pi_1`) + ', així que el segon és el de ' + M('D=8') + ' (simètric de ' + M(r`\pi_1`) + ' respecte de ' + M(r`\pi`) + ', a l\u2019altre costat).',
                  'Un plano ' + M('2x-y+z=D') + ' está a distancia ' + M(r`\tfrac{|D-5|}{\sqrt6}`) + ' de ' + M(r`\pi`) + '. Hace falta ' + M(r`\tfrac{|D-5|}{\sqrt6}=\tfrac{\sqrt6}{2}`) + ', es decir ' + M('|D-5|=3') + ' ⇒ ' + M('D=2') + ' o ' + M('D=8') + '. El primero es ' + M(r`\pi_1`) + ', así que el segundo es el de ' + M('D=8') + ' (simétrico de ' + M(r`\pi_1`) + ' respecto de ' + M(r`\pi`) + ', al otro lado).'),
                AN(r`\pi_2:\ 2x-y+z-8=0`),
              ] },
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 4 ───────────────────────── */
const s4 = {
  id: 4, pdf: 'pdf/pau/pau-2025-mates-serie4.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M(r`f(x)=+\sqrt{1+x^3}`) + '.', 'Considere la función ' + M(r`f(x)=+\sqrt{1+x^3}`) + '.'),
      parts: [
        { n: '1.1', pts: 0.5, q: T('Indiqueu el domini d\u2019aquesta funció i els punts de tall de la corba ' + M('y=f(x)') + ' amb els eixos de coordenades.', 'Indique el dominio de esta función y los cortes de la curva ' + M('y=f(x)') + ' con los ejes de coordenadas.'),
          sol: [
            p('<b>Domini:</b> ' + M('1+x^3\\ge0') + ' ⇒ ' + M('x\\ge-1') + ', és a dir ' + M('[-1,+\\infty)') + '.', '<b>Dominio:</b> ' + M('1+x^3\\ge0') + ' ⇒ ' + M('x\\ge-1') + ', es decir ' + M('[-1,+\\infty)') + '.'),
            ul(T('<b>Eix OY:</b> ' + M('f(0)=1') + ' ⇒ ' + M('(0,1)') + '.', '<b>Eje OY:</b> ' + M('f(0)=1') + ' ⇒ ' + M('(0,1)') + '.'),
              T('<b>Eix OX:</b> ' + M('\\sqrt{1+x^3}=0') + ' ⇒ ' + M('x=-1') + ' ⇒ ' + M('(-1,0)') + '.', '<b>Eje OX:</b> ' + M('\\sqrt{1+x^3}=0') + ' ⇒ ' + M('x=-1') + ' ⇒ ' + M('(-1,0)') + '.')),
          ] },
        { n: '1.2', pts: 1, q: T('Resoleu l\u2019equació ' + M("f'(x)=0") + ' i estudieu les zones de creixement i decreixement de la funció, així com els màxims i mínims locals.', 'Resuelva la ecuación ' + M("f'(x)=0") + ' y estudie las zonas de crecimiento y decrecimiento de la función, así como sus máximos y mínimos locales.'),
          sol: [
            F(r`f'(x)=\dfrac{3x^2}{2\sqrt{1+x^3}}\qquad(x>-1)`),
            p(M("f'(x)=0") + ' ⇒ ' + M('x=0') + '. Però el numerador ' + M('3x^2\\ge0') + ' i l\u2019arrel és positiva: ' + M("f'(x)>0") + ' per a tot ' + M('x>-1') + ', ' + M('x\\ne0') + '. El signe no canvia a ' + M('x=0') + '.',
              M("f'(x)=0") + ' ⇒ ' + M('x=0') + '. Pero el numerador ' + M('3x^2\\ge0') + ' y la raíz es positiva: ' + M("f'(x)>0") + ' para todo ' + M('x>-1') + ', ' + M('x\\ne0') + '. El signo no cambia en ' + M('x=0') + '.'),
            ans('<b>Creixent</b> a tot ' + M('(-1,+\\infty)') + '. <b>No hi ha extrems locals</b> (a ' + M('x=0') + ' la tangent és horitzontal però no és ni màxim ni mínim). Només a l\u2019extrem ' + M('x=-1') + ' hi ha el mínim absolut ' + M('f(-1)=0') + '.',
                '<b>Creciente</b> en todo ' + M('(-1,+\\infty)') + '. <b>No hay extremos locales</b> (en ' + M('x=0') + ' la tangente es horizontal pero no es ni máximo ni mínimo). Solo en el extremo ' + M('x=-1') + ' está el mínimo absoluto ' + M('f(-1)=0') + '.'),
          ] },
        { n: '1.3', pts: 1, q: T('Trobeu quin ha de ser el valor de ' + M('a') + ' perquè el punt ' + M('(a,3)') + ' pertanyi a la gràfica de la funció i calculeu l\u2019equació de la recta tangent a la corba en aquest punt.', 'Encuentre cuál debe ser el valor de ' + M('a') + ' para que el punto ' + M('(a,3)') + ' pertenezca a la gráfica de la función y calcule la ecuación de la recta tangente a la curva en este punto.'),
          sol: [
            p(M(r`\sqrt{1+a^3}=3`) + ' ⇒ ' + M('1+a^3=9') + ' ⇒ ' + M('a^3=8') + ' ⇒ <b>' + M('a=2') + '</b>.', M(r`\sqrt{1+a^3}=3`) + ' ⇒ ' + M('1+a^3=9') + ' ⇒ ' + M('a^3=8') + ' ⇒ <b>' + M('a=2') + '</b>.'),
            F(r`f'(2)=\dfrac{3\cdot4}{2\cdot3}=2`),
            fig(plot({ xr: [-1.5, 3.2], yr: [-1.2, 5.6], tickx: [-1, 1, 2, 3], ticky: [1, 3], curves: [{ f: x => Math.sqrt(1 + x ** 3), dom: [-1, 3.2], k: 0 }, { f: x => 2 * x - 1, dom: [0.4, 3.2], k: 1 }],
              points: [[-1, 0], [0, 1], [2, 3]], labels: [[2.1, 2.2, '(2, 3)', 'start'], [0.15, 4.7, 'y = 2x − 1']], alt: 'Gràfica de f(x) = √(1 + x³) amb la tangent y = 2x − 1 al punt (2, 3)' })),
            AN(r`y-3=2(x-2)\ \Longleftrightarrow\ y=2x-1`),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions', 'Considere el sistema de ecuaciones'),
        html(D(r`\left\{\begin{aligned}x+3y+az&=1\\-2x-6y+2z&=2a\\ax+3y+z&=3\end{aligned}\right.`)),
        p('on ' + M('a') + ' és un paràmetre real, i siguin ' + M(r`\pi_1`) + ' el pla determinat per la primera equació, ' + M(r`\pi_2`) + ' el determinat per la segona i ' + M(r`\pi_3`) + ' el determinat per la tercera.', 'donde ' + M('a') + ' es un parámetro real, y sean ' + M(r`\pi_1`) + ' el plano determinado por la primera ecuación, ' + M(r`\pi_2`) + ' el determinado por la segunda, y ' + M(r`\pi_3`) + ' el determinado por la tercera.')),
      parts: [
        { n: '2.1', pts: 1, q: T('Discutiu el sistema en funció del valor de ' + M('a') + '.', 'Discuta el sistema en función del valor de ' + M('a') + '.'),
          sol: [
            F(r`\begin{vmatrix}1&3&a\\-2&-6&2\\a&3&1\end{vmatrix}=-12+6+6a-6a+6a^2=6(a^2-1)`),
            ul(T('<b>' + M(r`a\neq\pm1`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`a\neq\pm1`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('a=1') + '</b>: la 1a i la 3a equacions són ' + M('x+3y+z=1') + ' i ' + M('x+3y+z=3') + ' ⇒ <b>incompatible</b>.', '<b>' + M('a=1') + '</b>: la 1.ª y la 3.ª ecuaciones son ' + M('x+3y+z=1') + ' y ' + M('x+3y+z=3') + ' ⇒ <b>incompatible</b>.'),
              T('<b>' + M('a=-1') + '</b>: la 2a (' + M('-2x-6y+2z=-2') + ') és ' + M('-2') + ' vegades la 1a (' + M('x+3y-z=1') + '); la 3a (' + M('-x+3y+z=3') + ') no és proporcional ⇒ rang 2 = rang ampliada ⇒ <b>compatible indeterminat</b>.',
                '<b>' + M('a=-1') + '</b>: la 2.ª (' + M('-2x-6y+2z=-2') + ') es ' + M('-2') + ' veces la 1.ª (' + M('x+3y-z=1') + '); la 3.ª (' + M('-x+3y+z=3') + ') no es proporcional ⇒ rango 2 = rango ampliada ⇒ <b>compatible indeterminado</b>.')),
          ] },
        { n: '2.2', pts: 0.75, q: T('Descriviu la posició relativa dels tres plans ' + M(r`\pi_1`) + ', ' + M(r`\pi_2`) + ' i ' + M(r`\pi_3`) + ' en funció del valor de ' + M('a') + '.', 'Describa la posición relativa de los tres planos ' + M(r`\pi_1`) + ', ' + M(r`\pi_2`) + ' y ' + M(r`\pi_3`) + ' en función del valor de ' + M('a') + '.'),
          sol: [
            ul(T('<b>' + M(r`a\neq\pm1`) + '</b>: els tres plans es tallen en <b>un únic punt</b>.', '<b>' + M(r`a\neq\pm1`) + '</b>: los tres planos se cortan en <b>un único punto</b>.'),
              T('<b>' + M('a=1') + '</b>: ' + M(r`\pi_1`) + ' i ' + M(r`\pi_3`) + ' són <b>paral·lels i diferents</b> (mateix normal ' + M('(1,3,1)') + ', termes independents 1 i 3); ' + M(r`\pi_2`) + ', de normal ' + M('(-1,-3,1)') + ', els talla tots dos.', '<b>' + M('a=1') + '</b>: ' + M(r`\pi_1`) + ' y ' + M(r`\pi_3`) + ' son <b>paralelos y distintos</b> (misma normal ' + M('(1,3,1)') + ', términos independientes 1 y 3); ' + M(r`\pi_2`) + ', de normal ' + M('(-1,-3,1)') + ', corta a los dos.'),
              T('<b>' + M('a=-1') + '</b>: ' + M(r`\pi_1`) + ' i ' + M(r`\pi_2`) + ' són el <b>mateix pla</b> (coincidents) i ' + M(r`\pi_3`) + ' el talla en una recta.', '<b>' + M('a=-1') + '</b>: ' + M(r`\pi_1`) + ' y ' + M(r`\pi_2`) + ' son el <b>mismo plano</b> (coincidentes) y ' + M(r`\pi_3`) + ' lo corta en una recta.')),
          ] },
        { n: '2.3', pts: 0.75, q: T('En algun cas la intersecció dels tres plans és una recta? En cas afirmatiu, digueu per a quin valor del paràmetre, i doneu un vector director i un punt d\u2019aquesta recta.', '¿En algún caso la intersección de los tres planos es una recta? En caso afirmativo, diga para qué valor del parámetro, y dé un vector director y un punto de esta recta.'),
          sol: [
            p('Sí, per a ' + M('a=-1') + ' (si ' + M(r`\pi_1=\pi_2`) + ', la intersecció és ' + M(r`\pi_1\cap\pi_3`) + '). Sumant ' + M('x+3y-z=1') + ' i ' + M('-x+3y+z=3') + ': ' + M('6y=4') + ' ⇒ ' + M(r`y=\tfrac23`) + ', i després ' + M('z=x+1') + '.',
              'Sí, para ' + M('a=-1') + ' (si ' + M(r`\pi_1=\pi_2`) + ', la intersección es ' + M(r`\pi_1\cap\pi_3`) + '). Sumando ' + M('x+3y-z=1') + ' y ' + M('-x+3y+z=3') + ': ' + M('6y=4') + ' ⇒ ' + M(r`y=\tfrac23`) + ', y luego ' + M('z=x+1') + '.'),
            AN(r`a=-1:\quad (x,y,z)=\big(0,\tfrac23,1\big)+t(1,0,1)`),
            p('Vector director ' + M(r`\vec v=(1,0,1)`) + ' i punt ' + M(r`\big(0,\tfrac23,1\big)`) + ' (comprovació: ' + M('0+2-1=1') + ' i ' + M('0+2+1=3') + ').', 'Vector director ' + M(r`\vec v=(1,0,1)`) + ' y punto ' + M(r`\big(0,\tfrac23,1\big)`) + ' (comprobación: ' + M('0+2-1=1') + ' y ' + M('0+2+1=3') + ').'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pr,
      intro: p('Un usuari d\u2019Internet ha estimat que el 25 % dels correus electrònics que rep són correu brossa, mentre que els altres no ho són. Per facilitar la classificació del correu, s\u2019ha instal·lat un filtre que envia a la carpeta de correu brossa el 95 % dels missatges que efectivament ho són. Malauradament, aquest filtre deixa a la safata d\u2019entrada només el 90 % dels missatges bons (i la resta els envia a la carpeta de correu brossa).',
               'Un usuario de Internet ha estimado que el 25 % de los correos electrónicos que recibe son correo basura, mientras los demás no lo son. Para facilitar la clasificación del correo, se ha instalado un filtro que envía a la carpeta de correo basura el 95 % de los mensajes que efectivamente lo son. Desgraciadamente, este filtro deja en la bandeja de entrada solo el 90 % de los mensajes buenos (y el resto los envía a la carpeta de correo basura).'),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Quina és la probabilitat que un missatge sigui enviat pel filtre a la carpeta de correu brossa?', '¿Cuál es la probabilidad de que un mensaje sea enviado por el filtro a la carpeta de correo basura?'),
          sol: [
            p('Sigui ' + M('B') + ' «és brossa» i ' + M('C') + ' «va a la carpeta»: ' + M('P(B)=0{,}25') + ', ' + M('P(C\\mid B)=0{,}95') + ', ' + M('P(C\\mid\\overline B)=0{,}10') + '.', 'Sea ' + M('B') + ' «es basura» y ' + M('C') + ' «va a la carpeta»: ' + M('P(B)=0{,}25') + ', ' + M('P(C\\mid B)=0{,}95') + ', ' + M('P(C\\mid\\overline B)=0{,}10') + '.'),
            F(r`P(C)=0{,}25\cdot0{,}95+0{,}75\cdot0{,}10=0{,}2375+0{,}075`),
            AN(r`P(C)=0{,}3125=31{,}25\,\%`),
          ] },
        { n: '3.2', pts: 0.75, q: T('Un dia, l\u2019usuari obre la carpeta de correu brossa. Quin percentatge de missatges que no són correu brossa hi trobarà?', 'Un día, el usuario abre la carpeta de correo basura. ¿Qué porcentaje de mensajes que no son correo basura encontrará?'),
          sol: [
            p('Es demana ' + M(r`P(\overline B\mid C)`) + ' (Bayes):', 'Se pide ' + M(r`P(\overline B\mid C)`) + ' (Bayes):'),
            F(r`P(\overline B\mid C)=\dfrac{0{,}75\cdot0{,}10}{0{,}3125}=\dfrac{0{,}075}{0{,}3125}=0{,}24`),
            AN(r`24\,\%`),
          ] },
        { n: '3.3', pts: 1, q: T('En un servidor de correu electrònic determinat, la probabilitat de rebre com a mínim dos correus en menys de ' + M('t') + ' minuts ve donada per ' + M(r`F(t)=\int_0^tAe^{-0{,}5x}\,dx`) + ', on ' + M('A') + ' és una constant real. Sabent que la probabilitat de rebre com a mínim dos correus en menys de dos minuts és ' + M('1-e^{-1}') + ', trobeu el valor d\u2019' + M('A') + '.',
                                  'En un servidor de correo electrónico determinado, la probabilidad de recibir como mínimo dos correos en menos de ' + M('t') + ' minutos viene dada por la función ' + M(r`F(t)=\int_0^tAe^{-0{,}5x}\,dx`) + ', donde ' + M('A') + ' es una constante real. Sabiendo que la probabilidad de recibir como mínimo dos correos en menos de dos minutos es ' + M('1-e^{-1}') + ', encuentre el valor de ' + M('A') + '.'),
          sol: [
            F(r`F(t)=A\Big[-2e^{-0{,}5x}\Big]_0^t=2A\big(1-e^{-0{,}5t}\big)`),
            p('Imposem ' + M(r`F(2)=2A(1-e^{-1})=1-e^{-1}`) + ', i simplifiquem ' + M('1-e^{-1}\\ne0') + ':', 'Imponemos ' + M(r`F(2)=2A(1-e^{-1})=1-e^{-1}`) + ', y simplificamos ' + M('1-e^{-1}\\ne0') + ':'),
            AN(r`A=\dfrac12`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op, choose: true,
      opts: [
        { k: 'A',
          intro: J(p('El dissenyador d\u2019una casa de perfums ha decidit que l\u2019ampolla del proper perfum serà de vidre i tindrà la forma d\u2019un cilindre amb una mitja esfera a la part superior, tal com es pot veure a la figura següent. El perfum estarà contingut a la part cilíndrica, que té una capacitat de 100 cm³. L\u2019enginyer vol minimitzar el cost total del vidre usat i, per tant, que la superfície total de l\u2019ampolla sigui mínima.',
                     'El diseñador de una casa de perfumes ha decidido que la botella del próximo perfume será de cristal y tendrá la forma de un cilindro con una media esfera en la parte superior, tal como se puede ver en la siguiente figura. El perfume estará contenido en la parte cilíndrica, la cual tiene una capacidad de 100 cm³. El ingeniero se propone minimizar el coste total del cristal usado y, por tanto, quiere que la superficie total de la botella sea mínima.'),
            img('2025-s4-e4a', 648, 675, 'Ampolla: cilindre de radi r i alçada h amb una mitja esfera a sobre', 'Botella: cilindro de radio r y altura h con una media esfera encima'),
            p('<i>Nota: la superfície d\u2019una esfera és ' + M(r`4\pi r^2`) + ', on ' + M('r') + ' és el radi.</i>', '<i>Nota: la superficie de una esfera es ' + M(r`4\pi r^2`) + ', donde ' + M('r') + ' es el radio.</i>')),
          parts: [
            { n: '4.1', pts: 1, q: T('Comproveu que la superfície total de l\u2019ampolla ve donada per la fórmula ' + M(r`S(r)=3\pi r^2+\dfrac{200}{r}`) + '.', 'Compruebe que la superficie total de la botella de perfume viene dada por la fórmula ' + M(r`S(r)=3\pi r^2+\dfrac{200}{r}`) + '.'),
              sol: [
                p('El volum del cilindre és ' + M(r`\pi r^2h=100`) + ', així que ' + M(r`h=\dfrac{100}{\pi r^2}`) + '. La superfície de vidre és la base, el lateral i la mitja esfera (el cercle de junció no és vidre):', 'El volumen del cilindro es ' + M(r`\pi r^2h=100`) + ', así que ' + M(r`h=\dfrac{100}{\pi r^2}`) + '. La superficie de cristal es la base, el lateral y la media esfera (el círculo de unión no es cristal):'),
                F(r`S=\underbrace{\pi r^2}_{\text{base}}+\underbrace{2\pi rh}_{\text{lateral}}+\underbrace{2\pi r^2}_{\text{semiesfera}}=3\pi r^2+2\pi r\cdot\dfrac{100}{\pi r^2}=3\pi r^2+\dfrac{200}{r}\ \checkmark`),
              ] },
            { n: '4.2', pts: 1.5, q: T('Quines dimensions ha de tenir l\u2019ampolla perquè la seva superfície total sigui mínima? Quina és la superfície total de l\u2019ampolla en aquest cas?', '¿Qué dimensiones debe tener la botella de perfume para que su superficie total sea mínima? ¿Cuál es la superficie total de la botella en este caso?'),
              sol: [
                F(r`S'(r)=6\pi r-\dfrac{200}{r^2}=0\ \Rightarrow\ r^3=\dfrac{100}{3\pi}\ \Rightarrow\ r=\sqrt[3]{\dfrac{100}{3\pi}}\approx2{,}197\ \text{cm}`),
                p('És un mínim: ' + M(r`S''(r)=6\pi+\dfrac{400}{r^3}>0`) + ' (i ' + M('S\\to\\infty') + ' quan ' + M('r\\to0') + ' i quan ' + M('r\\to\\infty') + '). L\u2019alçada és:', 'Es un mínimo: ' + M(r`S''(r)=6\pi+\dfrac{400}{r^3}>0`) + ' (y ' + M('S\\to\\infty') + ' cuando ' + M('r\\to0') + ' y cuando ' + M('r\\to\\infty') + '). La altura es:'),
                F(r`h=\dfrac{100}{\pi r^2}\approx6{,}593\ \text{cm}\ (=3r)`),
                fig(plot({ xr: [0.5, 5], yr: [0, 300], tickx: [1, 2, 3, 4], ticky: [100, 200], curves: [{ f: x => 3 * Math.PI * x * x + 200 / x, dom: [0.55, 5] }],
                  points: [[2.197, 136.52]], labels: [[2.45, 128, 'mín (2,20 ; 136,5)']], alt: 'Gràfica de S(r) amb el mínim a r = 2,20 cm' })),
                p('Amb ' + M(r`6\pi r=200/r^2`) + ' resulta ' + M(r`S=3\pi r^2+\tfrac{200}{r}=9\pi r^2`) + ':', 'Con ' + M(r`6\pi r=200/r^2`) + ' resulta ' + M(r`S=3\pi r^2+\tfrac{200}{r}=9\pi r^2`) + ':'),
                AN(r`r\approx2{,}20\ \text{cm},\quad h\approx6{,}59\ \text{cm},\quad S_{\min}\approx136{,}5\ \text{cm}^2`),
              ] },
          ] },
        { k: 'B',
          intro: p('Considereu les matrius ' + M(r`A=\begin{pmatrix}a&0\\1&a^2\end{pmatrix}`) + ', on ' + M('a') + ' és un paràmetre real, i ' + M(r`B=\begin{pmatrix}2&0\\1&4\end{pmatrix}`) + '.', 'Considere las matrices ' + M(r`A=\begin{pmatrix}a&0\\1&a^2\end{pmatrix}`) + ', donde ' + M('a') + ' es un parámetro real, y ' + M(r`B=\begin{pmatrix}2&0\\1&4\end{pmatrix}`) + '.'),
          parts: [
            { n: '4.1', pts: 0.75, q: T('Trobeu els valors d\u2019' + M('a') + ' per als quals les matrius ' + M('A') + ' i ' + M('B') + ' commuten (dues matrius commuten si ' + M('AB=BA') + ').', 'Encuentre los valores de ' + M('a') + ' para los cuales las matrices ' + M('A') + ' y ' + M('B') + ' conmutan (dos matrices conmutan si ' + M('AB=BA') + ').'),
              sol: [
                F(r`AB=\begin{pmatrix}2a&0\\2+a^2&4a^2\end{pmatrix}\qquad BA=\begin{pmatrix}2a&0\\a+4&4a^2\end{pmatrix}`),
                p('Només difereix l\u2019element (2,1): ' + M('2+a^2=a+4') + ' ⇒ ' + M('a^2-a-2=0') + '.', 'Solo difiere el elemento (2,1): ' + M('2+a^2=a+4') + ' ⇒ ' + M('a^2-a-2=0') + '.'),
                AN(r`a=2\ \text{ o }\ a=-1`),
              ] },
            { n: '4.2', pts: 0.75, q: T('Trobeu els valors d\u2019' + M('a') + ' per als quals la matriu ' + M('A') + ' és invertible.', 'Encuentre los valores de ' + M('a') + ' para los cuales la matriz ' + M('A') + ' es invertible.'),
              sol: [
                F(r`|A|=a\cdot a^2-0\cdot1=a^3`),
                ans('<b>' + M('A') + ' és invertible ⇔ ' + M('a\\neq0') + '</b>', '<b>' + M('A') + ' es invertible ⇔ ' + M('a\\neq0') + '</b>'),
              ] },
            { n: '4.3', pts: 1, q: T('Trobeu els valors d\u2019' + M('a') + ' per als quals ' + M('A^{-1}=A') + '.', 'Encuentre los valores de ' + M('a') + ' para los cuales ' + M('A^{-1}=A') + '.'),
              sol: [
                p('Cal que ' + M('A') + ' sigui invertible (' + M('a\\neq0') + ') i que ' + M('A^2=I') + ':', 'Hace falta que ' + M('A') + ' sea invertible (' + M('a\\neq0') + ') y que ' + M('A^2=I') + ':'),
                F(r`A^2=\begin{pmatrix}a^2&0\\a+a^2&a^4\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}\Rightarrow\ a^2=1,\ a+a^2=0,\ a^4=1`),
                p('De ' + M('a^2=1') + ': ' + M('a=\\pm1') + '; ' + M('a+a^2=0') + ' ho compleix només ' + M('a=-1') + ' (' + M('-1+1=0') + ').', 'De ' + M('a^2=1') + ': ' + M('a=\\pm1') + '; ' + M('a+a^2=0') + ' lo cumple solo ' + M('a=-1') + ' (' + M('-1+1=0') + ').'),
                AN(r`a=-1`),
              ] },
          ] },
      ] },
  ],
};

module.exports = {
  year: {
    y: 2025,
    title: T('PAU 2025', 'PAU 2025'),
    series: [s1, s3, s4],
  },
};
