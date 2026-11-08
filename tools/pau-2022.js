/* PAU 2022 · Matemàtiques II · sèries 2 i 5 (ordinària) i 3 (extraordinària). Sis qüestions, se'n responen quatre.
 * Enunciats oficials (català); traducció al castellà i solucions pròpies. */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  an: T('Anàlisi', 'Análisis'), al: T('Àlgebra', 'Álgebra'), ge: T('Geometria', 'Geometría'),
  ma: T('Matrius', 'Matrices'), op: T('Optimització', 'Optimización'), pa: T('Anàlisi · Integral', 'Análisis · Integral'),
};
const F = tex => html(D(tex));
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>');
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const img = (f, w, h, ca, es) => ({ ca: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + ca + '"></figure>', es: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + es + '"></figure>' });
const S = (ca, es) => T(ca, es);

/* ───────────────────────── SÈRIE 2 (ordinària) ───────────────────────── */
const s2 = {
  id: 2, pdf: 'pdf/pau/pau-2022-mates-serie2.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.pa,
      intro: p('Sigui ' + M("f'(x)=3x^2-12x") + ' la derivada d\u2019una funció ' + M('f(x)') + '.', 'Sea ' + M("f'(x)=3x^2-12x") + ' la derivada de una función ' + M('f(x)') + '.'),
      parts: [
        { n: '1.1', pts: 0.75, q: S('Si sabem que ' + M('f(x)') + ' talla l\u2019eix de les abscisses en ' + M('x=1') + ', calculeu l\u2019expressió de la funció ' + M('f(x)') + '.', 'Si sabemos que ' + M('f(x)') + ' corta el eje de abscisas en ' + M('x=1') + ', calcule la expresión de la función ' + M('f(x)') + '.'),
          sol: [
            p('Integrem la derivada:', 'Integramos la derivada:'),
            F(r`f(x)=\int(3x^2-12x)\,dx=x^3-6x^2+C`),
            p('Que talli l\u2019eix en ' + M('x=1') + ' vol dir ' + M('f(1)=0') + ': ' + M('1-6+C=0') + ', d\u2019on ' + M('C=5') + '.', 'Que corte el eje en ' + M('x=1') + ' significa ' + M('f(1)=0') + ': ' + M('1-6+C=0') + ', de donde ' + M('C=5') + '.'),
            AN(r`f(x)=x^3-6x^2+5`),
          ] },
        { n: '1.2', pts: 0.75, q: S('Calculeu l\u2019abscissa del punt d\u2019inflexió de ' + M('f(x)') + ' i estudieu la concavitat de la funció.', 'Calcule la abscisa del punto de inflexión de ' + M('f(x)') + ' y estudie la concavidad de la función.'),
          sol: [
            p('La derivada segona és ' + M("f''(x)=6x-12") + ', que s\u2019anul·la a ' + M('x=2') + ' i hi canvia de signe (' + M("f'''(2)=6\\neq0") + '), per tant hi ha inflexió.', 'La derivada segunda es ' + M("f''(x)=6x-12") + ', que se anula en ' + M('x=2') + ' y cambia de signo (' + M("f'''(2)=6\\neq0") + '), luego hay inflexión.'),
            ul(S(M("f''<0") + ' si ' + M('x<2') + ': la gràfica és còncava cap avall (∩).', M("f''<0") + ' si ' + M('x<2') + ': la gráfica es cóncava hacia abajo (∩).'),
              S(M("f''>0") + ' si ' + M('x>2') + ': la gràfica és còncava cap amunt (∪).', M("f''>0") + ' si ' + M('x>2') + ': la gráfica es cóncava hacia arriba (∪).')),
            ans('<b>Inflexió a ' + M('x=2') + '</b>, al punt ' + M('(2,-11)') + '.', '<b>Inflexión en ' + M('x=2') + '</b>, en el punto ' + M('(2,-11)') + '.'),
            fig(plot({ xr: [-1.3, 6.3], yr: [-30, 22], tickx: [1, 2, 4, 6], ticky: [5], curves: [{ f: x => x ** 3 - 6 * x * x + 5, dom: [-1.3, 6.3], k: 0 }], vlines: [2],
              points: [[2, -11], [1, 0]], labels: [[2.2, -14, '(2, −11)']], alt: 'Gràfica de f(x) = x³ − 6x² + 5 amb el punt d\u2019inflexió a x = 2' })),
          ] },
        { n: '1.3', pts: 1, q: S('Sabem que l\u2019àrea del recinte limitat per la corba ' + M("y=f''(x)") + ', l\u2019eix de les abscisses i les rectes ' + M('x=0') + ' i ' + M('x=a') + ', amb ' + M('a>2') + ', és ' + M('15\\,u^2') + '. Calculeu el valor de ' + M('a') + '.', 'Sabemos que el área del recinto limitado por la curva ' + M("y=f''(x)") + ', el eje de abscisas y las rectas ' + M('x=0') + ' y ' + M('x=a') + ', con ' + M('a>2') + ', es ' + M('15\\,u^2') + '. Calcule el valor de ' + M('a') + '.'),
          sol: [
            p('La recta ' + M("y=f''(x)=6x-12") + ' talla l\u2019eix en ' + M('x=2') + ', dins de ' + M('[0,a]') + '; cal separar l\u2019àrea en dos trams (per sota i per sobre de l\u2019eix):', 'La recta ' + M("y=f''(x)=6x-12") + ' corta el eje en ' + M('x=2') + ', dentro de ' + M('[0,a]') + '; hay que separar el área en dos tramos (por debajo y por encima del eje):'),
            F(r`\int_0^2(12-6x)\,dx=\big[12x-3x^2\big]_0^2=12`),
            F(r`\int_2^a(6x-12)\,dx=\big[3x^2-12x\big]_2^a=3a^2-12a+12=3(a-2)^2`),
            p('Imposem que la suma sigui ' + M('15') + ':', 'Imponemos que la suma sea ' + M('15') + ':'),
            F(r`12+3(a-2)^2=15\ \Longrightarrow\ (a-2)^2=1\ \Longrightarrow\ a=3\ \ (a>2)`),
            AN(r`a=3`),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent, que depèn del paràmetre real ' + M('a') + ':', 'Considere el sistema de ecuaciones lineales siguiente, que depende del parámetro real ' + M('a') + ':') ,
        F(r`\begin{cases}ax+2y+3z=2\\2x+ay+z=a\\x+y+4z=1\end{cases}`)),
      parts: [
        { n: '2.1', pts: 1.5, q: S('Discutiu el sistema per als diferents valors del paràmetre ' + M('a') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('a') + '.'),
          sol: [
            p('Calculem el determinant de la matriu de coeficients:', 'Calculamos el determinante de la matriz de coeficientes:'),
            F(r`|A|=\begin{vmatrix}a&2&3\\2&a&1\\1&1&4\end{vmatrix}=4a^2-4a-8=4(a-2)(a+1)`),
            ul(S('Si ' + M('a\\neq2') + ' i ' + M('a\\neq-1') + ': ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=3') + ' ⇒ <b>sistema compatible determinat</b>.', 'Si ' + M('a\\neq2') + ' y ' + M('a\\neq-1') + ': ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=3') + ' ⇒ <b>sistema compatible determinado</b>.'),
              S('Si ' + M('a=2') + ': les files de ' + M('A') + ' són ' + M('(2,2,3),(2,2,1),(1,1,4)') + ', amb ' + M('\\text{rang}\\,A=2') + ' (el menor ' + M('\\begin{vmatrix}2&3\\\\2&1\\end{vmatrix}=-4\\neq0') + '). Amb la columna de termes independents, el determinant de les columnes ' + M('x,z,b') + ' és ' + M('0') + ', així que ' + M('\\text{rang}\\,A^*=2') + ': <b>compatible indeterminat</b> (1 grau de llibertat).', 'Si ' + M('a=2') + ': las filas de ' + M('A') + ' son ' + M('(2,2,3),(2,2,1),(1,1,4)') + ', con ' + M('\\text{rang}\\,A=2') + ' (el menor ' + M('\\begin{vmatrix}2&3\\\\2&1\\end{vmatrix}=-4\\neq0') + '). Con la columna de términos independientes, el determinante de las columnas ' + M('x,z,b') + ' es ' + M('0') + ', así que ' + M('\\text{rang}\\,A^*=2') + ': <b>compatible indeterminado</b> (1 grado de libertad).'),
              S('Si ' + M('a=-1') + ': la primera equació més la segona dóna ' + M('x+y+4z=1') + ', que és la tercera. Hi ha dues equacions independents: ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=2') + ' ⇒ <b>compatible indeterminat</b>.', 'Si ' + M('a=-1') + ': la primera ecuación más la segunda da ' + M('x+y+4z=1') + ', que es la tercera. Hay dos ecuaciones independientes: ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=2') + ' ⇒ <b>compatible indeterminado</b>.')),
            ans('Mai és incompatible: compatible determinat si ' + M('a\\neq2,-1') + ' i compatible indeterminat si ' + M('a=2') + ' o ' + M('a=-1') + '.', 'Nunca es incompatible: compatible determinado si ' + M('a\\neq2,-1') + ' y compatible indeterminado si ' + M('a=2') + ' o ' + M('a=-1') + '.'),
          ] },
        { n: '2.2', pts: 1, q: S('Resoleu, si és possible, el sistema per al cas ' + M('a=2') + '.', 'Resuelva, si es posible, el sistema para el caso ' + M('a=2') + '.'),
          sol: [
            p('Amb ' + M('a=2') + ' el sistema és:', 'Con ' + M('a=2') + ' el sistema es:'),
            F(r`\begin{cases}2x+2y+3z=2\\2x+2y+z=2\\x+y+4z=1\end{cases}`),
            p('Restant les dues primeres: ' + M('2z=0') + ', és a dir ' + M('z=0') + '. Aleshores les tres equacions es redueixen a ' + M('x+y=1') + '.', 'Restando las dos primeras: ' + M('2z=0') + ', es decir ' + M('z=0') + '. Entonces las tres ecuaciones se reducen a ' + M('x+y=1') + '.'),
            AN(r`(x,y,z)=(t,\,1-t,\,0),\quad t\in\mathbb R`),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ge,
      intro: J(p('Sigui la recta ' + M('r') + ' definida per l\u2019expressió següent:', 'Sea la recta ' + M('r') + ' definida por la expresión siguiente:'),
        F(r`r:\ \begin{cases}x=2+\lambda\\y=-1+3\lambda\\z=3+\lambda\end{cases}`)),
      parts: [
        { n: '3.1', pts: 1.25, q: S('Determineu la posició relativa de la recta ' + M('r') + ' respecte al pla ' + M('\\pi:\\ x-2y+4z-4=0') + '. Si és paral·lela, calculeu la distància de ' + M('r') + ' a ' + M('\\pi') + ', i si és secant, calculeu el punt de tall.', 'Determine la posición relativa de la recta ' + M('r') + ' respecto al plano ' + M('\\pi:\\ x-2y+4z-4=0') + '. Si es paralela, calcule la distancia de ' + M('r') + ' a ' + M('\\pi') + ', y si es secante, calcule el punto de corte.'),
          sol: [
            p('Direcció de ' + M('r') + ': ' + M('\\vec d=(1,3,1)') + '; normal del pla: ' + M('\\vec n=(1,-2,4)') + '. El producte escalar és ' + M('\\vec d\\cdot\\vec n=1-6+4=-1\\neq0') + ', per tant la recta <b>talla el pla</b> (és secant).', 'Dirección de ' + M('r') + ': ' + M('\\vec d=(1,3,1)') + '; normal del plano: ' + M('\\vec n=(1,-2,4)') + '. El producto escalar es ' + M('\\vec d\\cdot\\vec n=1-6+4=-1\\neq0') + ', luego la recta <b>corta al plano</b> (es secante).'),
            p('Substituïm els punts de ' + M('r') + ' a l\u2019equació del pla:', 'Sustituimos los puntos de ' + M('r') + ' en la ecuación del plano:'),
            F(r`(2+\lambda)-2(-1+3\lambda)+4(3+\lambda)-4=12-\lambda=0\ \Longrightarrow\ \lambda=12`),
            AN(r`P=(14,\,35,\,15)`),
            p('Comprovació: ' + M('14-70+60-4=0') + '.', 'Comprobación: ' + M('14-70+60-4=0') + '.'),
          ] },
        { n: '3.2', pts: 1.25, q: S('Calculeu l\u2019equació de la recta ' + M('s') + ' perpendicular al pla ' + M('\\pi') + ' i que talla la recta ' + M('r') + ' en un punt ' + M('P') + ', la primera coordenada del qual és 5 vegades més gran que la segona.', 'Calcule la ecuación de la recta ' + M('s') + ' perpendicular al plano ' + M('\\pi') + ' y que corta a la recta ' + M('r') + ' en un punto ' + M('P') + ', cuya primera coordenada es 5 veces mayor que la segunda.'),
          sol: [
            p('El punt ' + M('P') + ' és de ' + M('r') + ', amb ' + M('x=5y') + ':', 'El punto ' + M('P') + ' es de ' + M('r') + ', con ' + M('x=5y') + ':'),
            F(r`2+\lambda=5(-1+3\lambda)\ \Longrightarrow\ 7=14\lambda\ \Longrightarrow\ \lambda=\tfrac12\ \Longrightarrow\ P=\big(\tfrac52,\tfrac12,\tfrac72\big)`),
            p('La recta ' + M('s') + ' passa per ' + M('P') + ' i té la direcció de la normal del pla, ' + M('(1,-2,4)') + ':', 'La recta ' + M('s') + ' pasa por ' + M('P') + ' y tiene la dirección de la normal del plano, ' + M('(1,-2,4)') + ':'),
            AN(r`s:\ \begin{cases}x=\tfrac52+t\\y=\tfrac12-2t\\z=\tfrac72+4t\end{cases}\qquad\Big(\dfrac{x-5/2}{1}=\dfrac{y-1/2}{-2}=\dfrac{z-7/2}{4}\Big)`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pa,
      parts: [
        { n: '4.1', pts: 1, q: S('Trobeu una funció polinòmica ' + M('y=g(x)') + ' de grau 3 tal que talli l\u2019eix de les ordenades en el punt ' + M('(0,5)') + ', que la recta tangent a ' + M('y=g(x)') + ' en el punt d\u2019abscissa ' + M('x=1') + ' sigui horitzontal i que ' + M("g''(x)=2x+1") + '.', 'Encuentre una función polinómica ' + M('y=g(x)') + ' de grado 3 tal que corte el eje de ordenadas en el punto ' + M('(0,5)') + ', que la recta tangente a ' + M('y=g(x)') + ' en el punto de abscisa ' + M('x=1') + ' sea horizontal y que ' + M("g''(x)=2x+1") + '.'),
          sol: [
            p('Integrem dues vegades. Primer ' + M("g'(x)=x^2+x+C") + '. Tangent horitzontal a ' + M('x=1') + ': ' + M("g'(1)=2+C=0") + ', d\u2019on ' + M('C=-2') + '.', 'Integramos dos veces. Primero ' + M("g'(x)=x^2+x+C") + '. Tangente horizontal en ' + M('x=1') + ': ' + M("g'(1)=2+C=0") + ', de donde ' + M('C=-2') + '.'),
            F(r`g(x)=\int\big(x^2+x-2\big)\,dx=\dfrac{x^3}3+\dfrac{x^2}2-2x+K`),
            p('Passa per ' + M('(0,5)') + ': ' + M('K=5') + '.', 'Pasa por ' + M('(0,5)') + ': ' + M('K=5') + '.'),
            AN(r`g(x)=\dfrac{x^3}{3}+\dfrac{x^2}{2}-2x+5`),
          ] },
        { n: '4.2', pts: 1.5, q: S('Comproveu que la funció ' + M('f(x)=-x^3+6x^2-16') + ' té una arrel a ' + M('x=2') + ' i que és estrictament creixent a l\u2019interval ' + M('(0,4)') + '. Utilitzeu aquesta informació per a calcular l\u2019àrea determinada per la funció ' + M('f(x)') + ', l\u2019eix de les abscisses i les rectes ' + M('x=0') + ' i ' + M('x=4') + '.', 'Compruebe que la función ' + M('f(x)=-x^3+6x^2-16') + ' tiene una raíz en ' + M('x=2') + ' y que es estrictamente creciente en el intervalo ' + M('(0,4)') + '. Utilice esta información para calcular el área determinada por la función ' + M('f(x)') + ', el eje de abscisas y las rectas ' + M('x=0') + ' y ' + M('x=4') + '.'),
          sol: [
            p('Arrel: ' + M('f(2)=-8+24-16=0') + '. Creixement: ' + M("f'(x)=-3x^2+12x=3x(4-x)") + ', que és positiva a ' + M('(0,4)') + ' ⇒ ' + M('f') + ' estrictament creixent.', 'Raíz: ' + M('f(2)=-8+24-16=0') + '. Crecimiento: ' + M("f'(x)=-3x^2+12x=3x(4-x)") + ', que es positiva en ' + M('(0,4)') + ' ⇒ ' + M('f') + ' estrictamente creciente.'),
            p('Com que creix i s\u2019anul·la a ' + M('x=2') + ', val ' + M('f<0') + ' a ' + M('(0,2)') + ' i ' + M('f>0') + ' a ' + M('(2,4)') + ': l\u2019àrea són dos trams.', 'Como crece y se anula en ' + M('x=2') + ', es ' + M('f<0') + ' en ' + M('(0,2)') + ' y ' + M('f>0') + ' en ' + M('(2,4)') + ': el área son dos tramos.'),
            F(r`F(x)=-\dfrac{x^4}{4}+2x^3-16x\quad\Rightarrow\quad F(0)=0,\ F(2)=-20,\ F(4)=0`),
            F(r`A=\Big|\int_0^2f\Big|+\int_2^4f=|F(2)-F(0)|+\big(F(4)-F(2)\big)=20+20`),
            AN(r`A=40\ \text{u}^2`),
            fig(plot({ xr: [-0.6, 4.6], yr: [-18, 18], tickx: [2, 4], ticky: [-16], curves: [{ f: x => -(x ** 3) + 6 * x * x - 16, dom: [-0.5, 4.5], k: 0 }],
              fill: { f: x => -(x ** 3) + 6 * x * x - 16, a: 0, b: 4 }, points: [[2, 0], [0, -16]], labels: [[0.3, -9, 'A = 20'], [3, 4, 'A = 20']], alt: 'Gràfica de f amb les dues regions de 20 u² cadascuna entre x = 0 i x = 4' })),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ma,
      intro: p('Sigui la matriu ' + M(r`X=\begin{pmatrix}a&1&0\\0&b&1\\0&0&c\end{pmatrix}`) + ', que depèn dels paràmetres ' + M('a') + ', ' + M('b') + ' i ' + M('c') + '.', 'Sea la matriz ' + M(r`X=\begin{pmatrix}a&1&0\\0&b&1\\0&0&c\end{pmatrix}`) + ', que depende de los parámetros ' + M('a') + ', ' + M('b') + ' y ' + M('c') + '.'),
      parts: [
        { n: '5.1', pts: 1.5, q: S('Calculeu les matrius ' + M('X') + ' tals que ' + M(r`X^2=\begin{pmatrix}1&0&1\\0&1&0\\0&0&1\end{pmatrix}`) + '.', 'Calcule las matrices ' + M('X') + ' tales que ' + M(r`X^2=\begin{pmatrix}1&0&1\\0&1&0\\0&0&1\end{pmatrix}`) + '.'),
          sol: [
            p('Calculem el quadrat:', 'Calculamos el cuadrado:'),
            F(r`X^2=\begin{pmatrix}a^2&a+b&1\\0&b^2&b+c\\0&0&c^2\end{pmatrix}=\begin{pmatrix}1&0&1\\0&1&0\\0&0&1\end{pmatrix}`),
            p('Igualant entrades: ' + M('a^2=b^2=c^2=1') + ', ' + M('a+b=0') + ' i ' + M('b+c=0') + '. Per tant ' + M('b=-a') + ' i ' + M('c=a') + ', amb ' + M('a=\\pm1') + '. Hi ha dues solucions:', 'Igualando entradas: ' + M('a^2=b^2=c^2=1') + ', ' + M('a+b=0') + ' y ' + M('b+c=0') + '. Por tanto ' + M('b=-a') + ' y ' + M('c=a') + ', con ' + M('a=\\pm1') + '. Hay dos soluciones:'),
            AN(r`X=\begin{pmatrix}1&1&0\\0&-1&1\\0&0&1\end{pmatrix}\quad\text{o}\quad X=\begin{pmatrix}-1&1&0\\0&1&1\\0&0&-1\end{pmatrix}`),
          ] },
        { n: '5.2', pts: 1, q: S('Determineu els valors de ' + M('a') + ', ' + M('b') + ' i ' + M('c') + ' perquè la matriu inversa de ' + M('X') + ' sigui ' + M(r`X^{-1}=\begin{pmatrix}\frac12&-\frac12&-\frac12\\0&1&1\\0&0&-1\end{pmatrix}`) + '.', 'Determine los valores de ' + M('a') + ', ' + M('b') + ' y ' + M('c') + ' para que la matriz inversa de ' + M('X') + ' sea ' + M(r`X^{-1}=\begin{pmatrix}\frac12&-\frac12&-\frac12\\0&1&1\\0&0&-1\end{pmatrix}`) + '.'),
          sol: [
            p('La inversa d\u2019una matriu triangular superior és triangular superior i té com a diagonal els inversos de la diagonal: ' + M('1/a=\\tfrac12') + ', ' + M('1/b=1') + ', ' + M('1/c=-1') + '. Per tant ' + M('a=2') + ', ' + M('b=1') + ', ' + M('c=-1') + '.', 'La inversa de una matriz triangular superior es triangular superior y tiene por diagonal los inversos de la diagonal: ' + M('1/a=\\tfrac12') + ', ' + M('1/b=1') + ', ' + M('1/c=-1') + '. Por tanto ' + M('a=2') + ', ' + M('b=1') + ', ' + M('c=-1') + '.'),
            p('Comprovem-ho amb ' + M(r`X=\begin{pmatrix}2&1&0\\0&1&1\\0&0&-1\end{pmatrix}`) + ', calculant les entrades fora de la diagonal:', 'Lo comprobamos con ' + M(r`X=\begin{pmatrix}2&1&0\\0&1&1\\0&0&-1\end{pmatrix}`) + ', calculando las entradas fuera de la diagonal:'),
            ul(S(M('(X^{-1})_{12}=-\\dfrac{1}{2\\cdot1}=-\\tfrac12') + ' ✓', M('(X^{-1})_{12}=-\\dfrac{1}{2\\cdot1}=-\\tfrac12') + ' ✓'),
              S(M('(X^{-1})_{23}=-\\dfrac{1}{1\\cdot(-1)}=1') + ' ✓', M('(X^{-1})_{23}=-\\dfrac{1}{1\\cdot(-1)}=1') + ' ✓'),
              S(M('(X^{-1})_{13}=\\dfrac{1\\cdot1-0}{2\\cdot1\\cdot(-1)}=-\\tfrac12') + ' ✓', M('(X^{-1})_{13}=\\dfrac{1\\cdot1-0}{2\\cdot1\\cdot(-1)}=-\\tfrac12') + ' ✓')),
            AN(r`a=2,\quad b=1,\quad c=-1`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.op,
      intro: J(p('Al pati d\u2019una escola es vol crear una àrea de joc de ' + M('30\\,\\text{m}^2') + ' per als més petits en forma de trapezi rectangle, de manera que la base més gran mesuri el doble que la base més petita, tal com mostra la figura, i que el costat oblic respecte a les bases (' + M('D') + ') sigui tan curt com sigui possible.', 'En el patio de una escuela se quiere crear un área de juego de ' + M('30\\,\\text{m}^2') + ' para los más pequeños con forma de trapecio rectángulo, de manera que la base mayor mida el doble que la base menor, tal como muestra la figura, y que el lado oblicuo respecto a las bases (' + M('D') + ') sea lo más corto posible.'),
        fig('<svg class="pp" viewBox="0 0 300 150" role="img" aria-label="Trapezi rectangle amb base petita x, base gran 2x, alçada h i costat oblic D"><path class="c1" d="M30,25H120L210,115H30Z"/><text class="lb" x="75" y="17" text-anchor="middle">x</text><text class="lb" x="120" y="132" text-anchor="middle">2x</text><text class="lb" x="16" y="73">h</text><text class="lb" x="176" y="62">D</text></svg>')),
      parts: [
        { n: '6.1', pts: 1, q: S('Justifiqueu que se satisfan les relacions següents: ' + M(r`h=\dfrac{20}{x}`) + ' i ' + M(r`D(x)=\sqrt{\dfrac{400}{x^2}+x^2}`) + '.', 'Justifique que se satisfacen las relaciones siguientes: ' + M(r`h=\dfrac{20}{x}`) + ' y ' + M(r`D(x)=\sqrt{\dfrac{400}{x^2}+x^2}`) + '.'),
          sol: [
            p('<b>Àrea.</b> Les bases fan ' + M('x') + ' i ' + M('2x') + ' i l\u2019alçada ' + M('h') + ':', '<b>Área.</b> Las bases miden ' + M('x') + ' y ' + M('2x') + ' y la altura ' + M('h') + ':'),
            F(r`\dfrac{(x+2x)\,h}{2}=30\ \Longrightarrow\ \dfrac{3xh}{2}=30\ \Longrightarrow\ h=\dfrac{20}{x}`),
            p('<b>Costat oblic.</b> És la hipotenusa d\u2019un triangle rectangle de catets ' + M('h') + ' i ' + M('2x-x=x') + ':', '<b>Lado oblicuo.</b> Es la hipotenusa de un triángulo rectángulo de catetos ' + M('h') + ' y ' + M('2x-x=x') + ':'),
            F(r`D=\sqrt{x^2+h^2}=\sqrt{x^2+\dfrac{400}{x^2}}`),
          ] },
        { n: '6.2', pts: 1.5, q: S('Trobeu les dimensions del trapezi per a les quals la longitud del costat ' + M('D') + ' és mínima.', 'Encuentre las dimensiones del trapecio para las cuales la longitud del lado ' + M('D') + ' es mínima.'),
          sol: [
            p('' + M('D') + ' és mínima quan ho és ' + M('D^2') + ' (l\u2019arrel és creixent). Prenem ' + M('g(x)=x^2+\\dfrac{400}{x^2}') + ', amb ' + M('x>0') + ':', M('D') + ' es mínima cuando lo es ' + M('D^2') + ' (la raíz es creciente). Tomamos ' + M('g(x)=x^2+\\dfrac{400}{x^2}') + ', con ' + M('x>0') + ':'),
            F(r`g'(x)=2x-\dfrac{800}{x^3}=0\ \Longrightarrow\ x^4=400\ \Longrightarrow\ x=\sqrt{20}=2\sqrt5`),
            p('És un mínim: ' + M("g''(x)=2+\\dfrac{2400}{x^4}>0") + '. Aleshores ' + M('h=\\dfrac{20}{2\\sqrt5}=2\\sqrt5') + ' i ' + M('D^2=20+20=40') + '.', 'Es un mínimo: ' + M("g''(x)=2+\\dfrac{2400}{x^4}>0") + '. Entonces ' + M('h=\\dfrac{20}{2\\sqrt5}=2\\sqrt5') + ' y ' + M('D^2=20+20=40') + '.'),
            ans('Base petita ' + M('2\\sqrt5\\approx4{,}47\\ \\text{m}') + ', base gran ' + M('4\\sqrt5\\approx8{,}94\\ \\text{m}') + ', alçada ' + M('2\\sqrt5\\approx4{,}47\\ \\text{m}') + ' i costat oblic mínim ' + M('D=2\\sqrt{10}\\approx6{,}32\\ \\text{m}') + '.', 'Base menor ' + M('2\\sqrt5\\approx4{,}47\\ \\text{m}') + ', base mayor ' + M('4\\sqrt5\\approx8{,}94\\ \\text{m}') + ', altura ' + M('2\\sqrt5\\approx4{,}47\\ \\text{m}') + ' y lado oblicuo mínimo ' + M('D=2\\sqrt{10}\\approx6{,}32\\ \\text{m}') + '.'),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 (ordinària) ───────────────────────── */
const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2022-mates-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.ma,
      intro: p('Siguin les matrius ' + M(r`C=\begin{pmatrix}-1&1\\-1&0\end{pmatrix}`) + ' i ' + M(r`A=\begin{pmatrix}2&0\\3&-1\end{pmatrix}`) + '.', 'Sean las matrices ' + M(r`C=\begin{pmatrix}-1&1\\-1&0\end{pmatrix}`) + ' y ' + M(r`A=\begin{pmatrix}2&0\\3&-1\end{pmatrix}`) + '.'),
      parts: [
        { n: '1.1', pts: 1.5, q: S('Comproveu que ' + M('C^3=I_2') + ', en què ' + M('I_2') + ' és la matriu identitat d\u2019ordre 2, i deduïu que la matriu ' + M('C') + ' és invertible i que ' + M('C^{-1}=C^2') + '. Calculeu ' + M('C^{2022}') + '.', 'Compruebe que ' + M('C^3=I_2') + ', en que ' + M('I_2') + ' es la matriz identidad de orden 2, y deduzca que la matriz ' + M('C') + ' es invertible y que ' + M('C^{-1}=C^2') + '. Calcule ' + M('C^{2022}') + '.'),
          sol: [
            F(r`C^2=\begin{pmatrix}-1&1\\-1&0\end{pmatrix}\begin{pmatrix}-1&1\\-1&0\end{pmatrix}=\begin{pmatrix}0&-1\\1&-1\end{pmatrix}`),
            F(r`C^3=C^2\cdot C=\begin{pmatrix}0&-1\\1&-1\end{pmatrix}\begin{pmatrix}-1&1\\-1&0\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}=I_2`),
            p('Com que ' + M('C\\cdot C^2=C^2\\cdot C=I_2') + ', existeix una matriu que multiplicada per ' + M('C') + ' dóna la identitat: ' + M('C') + ' és invertible i ' + M('C^{-1}=C^2') + '.', 'Como ' + M('C\\cdot C^2=C^2\\cdot C=I_2') + ', existe una matriz que multiplicada por ' + M('C') + ' da la identidad: ' + M('C') + ' es invertible y ' + M('C^{-1}=C^2') + '.'),
            p('Les potències es repeteixen amb període 3. Com que ' + M('2022=3\\cdot674') + ':', 'Las potencias se repiten con periodo 3. Como ' + M('2022=3\\cdot674') + ':'),
            AN(r`C^{2022}=(C^3)^{674}=I_2`),
          ] },
        { n: '1.2', pts: 1, q: S('Resoleu l\u2019equació matricial ' + M('C\\cdot X=A-2I_2') + '.', 'Resuelva la ecuación matricial ' + M('C\\cdot X=A-2I_2') + '.'),
          sol: [
            p('Multipliquem per ' + M('C^{-1}=C^2') + ' per l\u2019esquerra: ' + M('X=C^2(A-2I_2)') + '. Amb ' + M(r`A-2I_2=\begin{pmatrix}0&0\\3&-3\end{pmatrix}`) + ':', 'Multiplicamos por ' + M('C^{-1}=C^2') + ' por la izquierda: ' + M('X=C^2(A-2I_2)') + '. Con ' + M(r`A-2I_2=\begin{pmatrix}0&0\\3&-3\end{pmatrix}`) + ':'),
            F(r`X=\begin{pmatrix}0&-1\\1&-1\end{pmatrix}\begin{pmatrix}0&0\\3&-3\end{pmatrix}=\begin{pmatrix}-3&3\\-3&3\end{pmatrix}`),
            AN(r`X=\begin{pmatrix}-3&3\\-3&3\end{pmatrix}`),
            p('Comprovació: ' + M(r`C\cdot X=\begin{pmatrix}-1&1\\-1&0\end{pmatrix}\begin{pmatrix}-3&3\\-3&3\end{pmatrix}=\begin{pmatrix}0&0\\3&-3\end{pmatrix}`) + '.', 'Comprobación: ' + M(r`C\cdot X=\begin{pmatrix}-1&1\\-1&0\end{pmatrix}\begin{pmatrix}-3&3\\-3&3\end{pmatrix}=\begin{pmatrix}0&0\\3&-3\end{pmatrix}`) + '.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.pa,
      intro: p('Considereu la funció ' + M('f(x)=x^3') + ' i sigui ' + M('a') + ' un nombre real estrictament positiu.', 'Considere la función ' + M('f(x)=x^3') + ' y sea ' + M('a') + ' un número real estrictamente positivo.'),
      parts: [
        { n: '2.1', pts: 1.25, q: S('Calculeu l\u2019equació de la recta ' + M('t') + ' tangent a la gràfica de la funció ' + M('f') + ' en el punt d\u2019abscissa ' + M('x=a') + '. Trobeu el punt de tall de la recta ' + M('t') + ' amb l\u2019eix de les abscisses (en funció de ' + M('a') + ').', 'Calcule la ecuación de la recta ' + M('t') + ' tangente a la gráfica de la función ' + M('f') + ' en el punto de abscisa ' + M('x=a') + '. Encuentre el punto de corte de la recta ' + M('t') + ' con el eje de abscisas (en función de ' + M('a') + ').'),
          sol: [
            F(r`f(a)=a^3,\qquad f'(x)=3x^2\ \Rightarrow\ f'(a)=3a^2`),
            AN(r`t:\ y-a^3=3a^2(x-a)\ \Longleftrightarrow\ y=3a^2x-2a^3`),
            p('Amb ' + M('y=0') + ': ' + M('3a^2x=2a^3') + ', és a dir:', 'Con ' + M('y=0') + ': ' + M('3a^2x=2a^3') + ', es decir:'),
            AN(r`\Big(\dfrac{2a}{3},\,0\Big)`),
          ] },
        { n: '2.2', pts: 1.25, q: S('Feu un esbós de la gràfica de la funció ' + M('f') + ' i la recta ' + M('t') + '. Calculeu el valor de ' + M('a') + ' perquè l\u2019àrea en el primer quadrant limitada per la funció ' + M('f') + ', la recta ' + M('t') + ' i l\u2019eix de les abscisses sigui ' + M('108\\,u^2') + '.', 'Haga un esbozo de la gráfica de la función ' + M('f') + ' y la recta ' + M('t') + '. Calcule el valor de ' + M('a') + ' para que el área en el primer cuadrante limitada por la función ' + M('f') + ', la recta ' + M('t') + ' y el eje de abscisas sea ' + M('108\\,u^2') + '.'),
          sol: [
            p('Per a ' + M('x>0') + ' la funció és convexa, així que la corba queda per sobre de la tangent. L\u2019àrea que demanen és la de sota la corba de ' + M('0') + ' a ' + M('a') + ' menys el triangle que fa la tangent amb l\u2019eix:', 'Para ' + M('x>0') + ' la función es convexa, así que la curva queda por encima de la tangente. El área pedida es la de bajo la curva de ' + M('0') + ' a ' + M('a') + ' menos el triángulo que forma la tangente con el eje:'),
            F(r`\int_0^ax^3\,dx=\dfrac{a^4}{4},\qquad A_\triangle=\tfrac12\Big(a-\tfrac{2a}3\Big)a^3=\dfrac{a^4}{6}`),
            F(r`A=\dfrac{a^4}{4}-\dfrac{a^4}{6}=\dfrac{a^4}{12}=108\ \Longrightarrow\ a^4=1296\ \Longrightarrow\ a=6`),
            AN(r`a=6`),
            fig(plot({ xr: [-0.5, 7], yr: [-30, 260], tickx: [4, 6], ticky: [], curves: [{ f: x => x ** 3, dom: [0, 6.3], k: 0 }, { f: x => 108 * x - 432, dom: [3.5, 6.3], k: 1 }],
              fill: { f: x => x ** 3, g: x => Math.max(0, 108 * x - 432), a: 0, b: 6 }, points: [[6, 216], [4, 0]], labels: [[0.3, 190, 'f(x) = x³'], [4.2, 60, 't'], [1.2, 40, 'A = 108']], alt: 'Gràfica de x³ amb la tangent a x = 6 i la regió de 108 u² limitada amb l\u2019eix' })),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals, en què ' + M('m') + ' és un paràmetre real:', 'Considere el sistema de ecuaciones lineales, en que ' + M('m') + ' es un parámetro real:'),
        F(r`\begin{cases}2x-y+3z=0\\my+(3-m)z=-6\\2x-y+mz=6\end{cases}`)),
      parts: [
        { n: '3.1', pts: 1.25, q: S('Discutiu el sistema per als diferents valors del paràmetre ' + M('m') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('m') + '.'),
          sol: [
            F(r`|A|=\begin{vmatrix}2&-1&3\\0&m&3-m\\2&-1&m\end{vmatrix}=2m^2-6m=2m(m-3)`),
            ul(S('Si ' + M('m\\neq0') + ' i ' + M('m\\neq3') + ': ' + M('|A|\\neq0') + ' ⇒ <b>compatible determinat</b>.', 'Si ' + M('m\\neq0') + ' y ' + M('m\\neq3') + ': ' + M('|A|\\neq0') + ' ⇒ <b>compatible determinado</b>.'),
              S('Si ' + M('m=0') + ': la tercera equació menys la primera dóna ' + M('-3z=6') + ', que és la segona multiplicada per ' + M('-1') + '. Queden dues equacions independents: ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=2') + ' ⇒ <b>compatible indeterminat</b>.', 'Si ' + M('m=0') + ': la tercera ecuación menos la primera da ' + M('-3z=6') + ', que es la segunda multiplicada por ' + M('-1') + '. Quedan dos ecuaciones independientes: ' + M('\\text{rang}\\,A=\\text{rang}\\,A^*=2') + ' ⇒ <b>compatible indeterminado</b>.'),
              S('Si ' + M('m=3') + ': la primera i la tercera tenen el mateix membre esquerre ' + M('2x-y+3z') + ' però termes independents diferents (' + M('0\\neq6') + ') ⇒ <b>incompatible</b>.', 'Si ' + M('m=3') + ': la primera y la tercera tienen el mismo miembro izquierdo ' + M('2x-y+3z') + ' pero términos independientes distintos (' + M('0\\neq6') + ') ⇒ <b>incompatible</b>.')),
          ] },
        { n: '3.2', pts: 1.25, q: S('Resoleu el sistema, si és possible, quan ' + M('m=0') + ' i quan ' + M('m=3') + '. En cada cas, doneu la posició relativa dels tres plans a ' + M('\\mathbb R^3') + '.', 'Resuelva el sistema, si es posible, cuando ' + M('m=0') + ' y cuando ' + M('m=3') + '. En cada caso, dé la posición relativa de los tres planos en ' + M('\\mathbb R^3') + '.'),
          sol: [
            p('<b>Cas ' + M('m=0') + '.</b> De la segona, ' + M('3z=-6') + ' ⇒ ' + M('z=-2') + '. A la primera: ' + M('2x-y-6=0') + ' ⇒ ' + M('y=2x-6') + '.', '<b>Caso ' + M('m=0') + '.</b> De la segunda, ' + M('3z=-6') + ' ⇒ ' + M('z=-2') + '. En la primera: ' + M('2x-y-6=0') + ' ⇒ ' + M('y=2x-6') + '.'),
            AN(r`(x,y,z)=(t,\ 2t-6,\ -2),\quad t\in\mathbb R`),
            p('Els tres plans tenen normals ' + M('(2,-1,3)') + ', ' + M('(0,0,3)') + ' i ' + M('(2,-1,0)') + ' (no proporcionals) i comparteixen tota una recta: <b>es tallen els tres en una mateixa recta</b>.', 'Los tres planos tienen normales ' + M('(2,-1,3)') + ', ' + M('(0,0,3)') + ' y ' + M('(2,-1,0)') + ' (no proporcionales) y comparten toda una recta: <b>se cortan los tres en una misma recta</b>.'),
            p('<b>Cas ' + M('m=3') + '.</b> El sistema és incompatible: no té solució. El primer i el tercer pla són <b>paral·lels i diferents</b> (mateixa normal ' + M('(2,-1,3)') + ', termes independents ' + M('0') + ' i ' + M('6') + '), i el segon, ' + M('y=-2') + ', els talla tots dos.', '<b>Caso ' + M('m=3') + '.</b> El sistema es incompatible: no tiene solución. El primer y el tercer plano son <b>paralelos y distintos</b> (misma normal ' + M('(2,-1,3)') + ', términos independientes ' + M('0') + ' y ' + M('6') + '), y el segundo, ' + M('y=-2') + ', los corta a ambos.'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op,
      intro: p('A ' + M('\\mathbb R^2') + ', considereu els triangles rectangles que tenen els vèrtexs en els punts ' + M('O=(0,0)') + ', ' + M('A=(x,0)') + ' i ' + M('B=(0,y)') + ', amb ' + M('x>0') + ' i ' + M('y>0') + ', i en què la suma dels catets és 10.', 'En ' + M('\\mathbb R^2') + ', considere los triángulos rectángulos que tienen los vértices en los puntos ' + M('O=(0,0)') + ', ' + M('A=(x,0)') + ' y ' + M('B=(0,y)') + ', con ' + M('x>0') + ' e ' + M('y>0') + ', y en que la suma de los catetos es 10.'),
      parts: [
        { n: '4.1', pts: 1.25, q: S('Expresseu l\u2019àrea del triangle ' + M('AOB') + ' en funció de ' + M('x') + '. Per a quin valor de ' + M('x') + ' l\u2019àrea del triangle ' + M('AOB') + ' és la més gran possible? Quin valor té aquesta àrea màxima?', 'Exprese el área del triángulo ' + M('AOB') + ' en función de ' + M('x') + '. ¿Para qué valor de ' + M('x') + ' el área del triángulo ' + M('AOB') + ' es la mayor posible? ¿Qué valor tiene esta área máxima?'),
          sol: [
            p('De ' + M('x+y=10') + ' surt ' + M('y=10-x') + ', amb ' + M('0<x<10') + '. L\u2019àrea és la meitat del producte dels catets:', 'De ' + M('x+y=10') + ' sale ' + M('y=10-x') + ', con ' + M('0<x<10') + '. El área es la mitad del producto de los catetos:'),
            F(r`S(x)=\dfrac{x(10-x)}2=5x-\dfrac{x^2}{2}`),
            F(r`S'(x)=5-x=0\ \Rightarrow\ x=5,\qquad S''(x)=-1<0\ \Rightarrow\ S_{\max}`),
            AN(r`x=5,\qquad S_{\max}=S(5)=\dfrac{25}{2}=12{,}5\ \text{u}^2`),
          ] },
        { n: '4.2', pts: 1.25, q: S('Expresseu la hipotenusa del triangle ' + M('AOB') + ' en funció de ' + M('x') + '. Per a quin valor de ' + M('x') + ' la hipotenusa del triangle ' + M('AOB') + ' és la més petita possible? Quin és aquest valor mínim?', 'Exprese la hipotenusa del triángulo ' + M('AOB') + ' en función de ' + M('x') + '. ¿Para qué valor de ' + M('x') + ' la hipotenusa del triángulo ' + M('AOB') + ' es la más pequeña posible? ¿Cuál es este valor mínimo?'),
          sol: [
            F(r`h(x)=\sqrt{x^2+(10-x)^2}=\sqrt{2x^2-20x+100}`),
            p('Com que l\u2019arrel és creixent, ' + M('h') + ' és mínima quan ho és ' + M('2x^2-20x+100') + '. La derivada és ' + M('4x-20') + ', que s\u2019anul·la a ' + M('x=5') + ' i canvia de negativa a positiva: és un mínim.', 'Como la raíz es creciente, ' + M('h') + ' es mínima cuando lo es ' + M('2x^2-20x+100') + '. Su derivada es ' + M('4x-20') + ', que se anula en ' + M('x=5') + ' y pasa de negativa a positiva: es un mínimo.'),
            AN(r`x=5,\qquad h_{\min}=\sqrt{25+25}=5\sqrt2\approx7{,}07`),
            p('Curiosament, el triangle d\u2019àrea màxima i el de hipotenusa mínima coincideixen: el triangle isòsceles ' + M('x=y=5') + '.', 'Curiosamente, el triángulo de área máxima y el de hipotenusa mínima coinciden: el triángulo isósceles ' + M('x=y=5') + '.'),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ge,
      intro: p('Siguin els punts ' + M('A=(0,0,1)') + ', ' + M('B=(1,1,1)') + ', ' + M('C=(-1,-1,1)') + ' i ' + M('D=(1,0,1)') + '.', 'Sean los puntos ' + M('A=(0,0,1)') + ', ' + M('B=(1,1,1)') + ', ' + M('C=(-1,-1,1)') + ' y ' + M('D=(1,0,1)') + '.'),
      parts: [
        { n: '5.1', pts: 1.25, q: S('Comproveu que tres d\u2019aquests punts estan alineats. Determineu quins són els tres punts i calculeu l\u2019equació contínua i l\u2019equació paramètrica de la recta que defineixen.', 'Compruebe que tres de estos puntos están alineados. Determine cuáles son los tres puntos y calcule la ecuación continua y la ecuación paramétrica de la recta que definen.'),
          sol: [
            p('Prenem ' + M('A') + ' com a origen: ' + M('\\overrightarrow{AB}=(1,1,0)') + ' i ' + M('\\overrightarrow{AC}=(-1,-1,0)=-\\overrightarrow{AB}') + '. Són proporcionals, així que ' + M('A,B,C') + ' estan alineats. (' + M('\\overrightarrow{AD}=(1,0,0)') + ' no és proporcional a ' + M('(1,1,0)') + ', per tant ' + M('D') + ' queda fora de la recta.)', 'Tomamos ' + M('A') + ' como origen: ' + M('\\overrightarrow{AB}=(1,1,0)') + ' y ' + M('\\overrightarrow{AC}=(-1,-1,0)=-\\overrightarrow{AB}') + '. Son proporcionales, así que ' + M('A,B,C') + ' están alineados. (' + M('\\overrightarrow{AD}=(1,0,0)') + ' no es proporcional a ' + M('(1,1,0)') + ', luego ' + M('D') + ' queda fuera de la recta.)'),
            p('Recta per ' + M('A') + ' amb direcció ' + M('(1,1,0)') + ':', 'Recta por ' + M('A') + ' con dirección ' + M('(1,1,0)') + ':'),
            AN(r`\dfrac{x}{1}=\dfrac{y}{1}=\dfrac{z-1}{0}\ \Longleftrightarrow\ x=y,\ z=1`),
            AN(r`\begin{cases}x=\lambda\\y=\lambda\\z=1\end{cases}\quad\lambda\in\mathbb R`),
          ] },
        { n: '5.2', pts: 1.25, q: S('Calculeu l\u2019equació general o cartesiana del pla que determinen els quatre punts.', 'Calcule la ecuación general o cartesiana del plano que determinan los cuatro puntos.'),
          sol: [
            p('Els quatre punts tenen coordenada ' + M('z=1') + '. Comprovem que el pla és aquest amb dos vectors independents ' + M('\\overrightarrow{AB}=(1,1,0)') + ' i ' + M('\\overrightarrow{AD}=(1,0,0)') + ':', 'Los cuatro puntos tienen coordenada ' + M('z=1') + '. Comprobamos que el plano es este con dos vectores independientes ' + M('\\overrightarrow{AB}=(1,1,0)') + ' y ' + M('\\overrightarrow{AD}=(1,0,0)') + ':'),
            F(r`\begin{vmatrix}x&y&z-1\\1&1&0\\1&0&0\end{vmatrix}=-(z-1)=0`),
            AN(r`\pi:\ z-1=0\quad(z=1)`),
            p('És el pla horitzontal a alçada 1, així que ' + M('A,B,C,D') + ' són coplanaris.', 'Es el plano horizontal a altura 1, así que ' + M('A,B,C,D') + ' son coplanarios.'),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.an,
      intro: J(p('La columna de l\u2019esquerra de la taula següent mostra l\u2019esquema d\u2019un programa informàtic que s\u2019ha elaborat per a trobar solucions aproximades d\u2019una equació ' + M('f(x)=0') + ' en un interval ' + M('(a,b)') + ', sabent que ' + M('f(a)\\cdot f(b)<0') + '. La columna de la dreta recull un exemple de funcionament del programa en què es pot veure com actuaria per trobar una solució de l\u2019equació ' + M('x+\\ln(x)=0') + ' entre els valors ' + M('a=0{,}5') + ' i ' + M('b=2') + '.', 'La columna de la izquierda de la tabla siguiente muestra el esquema de un programa informático que se ha elaborado para encontrar soluciones aproximadas de una ecuación ' + M('f(x)=0') + ' en un intervalo ' + M('(a,b)') + ', sabiendo que ' + M('f(a)\\cdot f(b)<0') + '. La columna de la derecha recoge un ejemplo de funcionamiento del programa en el que se puede ver cómo actuaría para encontrar una solución de la ecuación ' + M('x+\\ln(x)=0') + ' entre los valores ' + M('a=0{,}5') + ' y ' + M('b=2') + '.'),
        { ca: '<div class="ptw"><table class="pt-tab pt-lt"><thead><tr><th>Esquema del programa</th><th>Exemple</th></tr></thead><tbody>'
        + '<tr><td>1. Escriure «Introduïu un valor <i>a</i>»</td><td>L\u2019usuari introdueix <i>a</i> = 0,5</td></tr>'
        + '<tr><td>2. Escriure «Introduïu un valor <i>b</i>»</td><td>L\u2019usuari introdueix <i>b</i> = 2</td></tr>'
        + '<tr><td>3. Escriure «Introduïu una funció <i>f</i>(<i>x</i>)»</td><td>L\u2019usuari introdueix <i>f</i>(<i>x</i>) = <i>x</i> + ln(<i>x</i>)</td></tr>'
        + '<tr><td>4. Calcular <i>c</i> = (<i>a</i> + <i>b</i>)/2</td><td>El programa calcula la mitjana entre <i>a</i> i <i>b</i> i li assigna el nom <i>c</i> = (0,5 + 2)/2 = 1,25</td></tr>'
        + '<tr><td>5. Si <i>f</i>(<i>a</i>)·<i>f</i>(<i>c</i>) &lt; 0, aleshores reassignar <i>b</i> = <i>c</i>; en cas contrari, reassignar <i>a</i> = <i>c</i></td><td>El programa comprova que <i>f</i>(0,5)·<i>f</i>(1,25) &lt; 0; per tant, reassigna <i>b</i> = 1,25</td></tr>'
        + '<tr><td>6. Repetir els passos 4 i 5 tants cops com faci falta fins que <i>f</i>(<i>a</i>) − <i>f</i>(<i>b</i>) &lt; 0,00000001</td><td>El programa repeteix la comprovació, canviant cada vegada <i>a</i> o <i>b</i>: inici (0,5 ; 2) · iteració 1 (0,5 ; 1,25) · it. 2 (0,5 ; 0,875) · it. 3 (0,5 ; 0,6875) · it. 4 (0,5 ; 0,59375) · it. 5 (0,546875 ; 0,59375) · it. 6 (0,546875 ; 0,5703125) · it. 7 (0,55859375 ; 0,5703125) · […]</td></tr>'
        + '<tr><td>7. Quan <i>f</i>(<i>a</i>) − <i>f</i>(<i>b</i>) &lt; 0,00000001, escriure «La solució de l\u2019equació és <i>c</i>» i aturar el programa</td><td>Després d\u2019unes 30 iteracions, el programa escriu «La solució de l\u2019equació és 0,56714329»</td></tr>'
        + '</tbody></table></div>',
        es: '<div class="ptw"><table class="pt-tab pt-lt"><thead><tr><th>Esquema del programa</th><th>Ejemplo</th></tr></thead><tbody>'
        + '<tr><td>1. Escribir «Introduzca un valor <i>a</i>»</td><td>El usuario introduce <i>a</i> = 0,5</td></tr>'
        + '<tr><td>2. Escribir «Introduzca un valor <i>b</i>»</td><td>El usuario introduce <i>b</i> = 2</td></tr>'
        + '<tr><td>3. Escribir «Introduzca una función <i>f</i>(<i>x</i>)»</td><td>El usuario introduce <i>f</i>(<i>x</i>) = <i>x</i> + ln(<i>x</i>)</td></tr>'
        + '<tr><td>4. Calcular <i>c</i> = (<i>a</i> + <i>b</i>)/2</td><td>El programa calcula la media entre <i>a</i> y <i>b</i> y le asigna el nombre <i>c</i> = (0,5 + 2)/2 = 1,25</td></tr>'
        + '<tr><td>5. Si <i>f</i>(<i>a</i>)·<i>f</i>(<i>c</i>) &lt; 0, entonces reasignar <i>b</i> = <i>c</i>; en caso contrario, reasignar <i>a</i> = <i>c</i></td><td>El programa comprueba que <i>f</i>(0,5)·<i>f</i>(1,25) &lt; 0; por tanto, reasigna <i>b</i> = 1,25</td></tr>'
        + '<tr><td>6. Repetir los pasos 4 y 5 tantas veces como haga falta hasta que <i>f</i>(<i>a</i>) − <i>f</i>(<i>b</i>) &lt; 0,00000001</td><td>El programa repite la comprobación, cambiando cada vez <i>a</i> o <i>b</i>: inicio (0,5 ; 2) · iteración 1 (0,5 ; 1,25) · it. 2 (0,5 ; 0,875) · it. 3 (0,5 ; 0,6875) · it. 4 (0,5 ; 0,59375) · it. 5 (0,546875 ; 0,59375) · it. 6 (0,546875 ; 0,5703125) · it. 7 (0,55859375 ; 0,5703125) · […]</td></tr>'
        + '<tr><td>7. Cuando <i>f</i>(<i>a</i>) − <i>f</i>(<i>b</i>) &lt; 0,00000001, escribir «La solución de la ecuación es <i>c</i>» y detener el programa</td><td>Tras unas 30 iteraciones, el programa escribe «La solución de la ecuación es 0,56714329»</td></tr>'
        + '</tbody></table></div>' }),
      parts: [
        { n: '6.1', pts: 1.25, q: S('Expliqueu per què aquest programa és capaç de trobar una solució aproximada de l\u2019equació ' + M('x+\\ln(x)=0') + ' entre els valors ' + M('a=0{,}5') + ' i ' + M('b=2') + '.', 'Explique por qué este programa es capaz de encontrar una solución aproximada de la ecuación ' + M('x+\\ln(x)=0') + ' entre los valores ' + M('a=0{,}5') + ' y ' + M('b=2') + '.'),
          sol: [
            p('<b>Hi ha solució.</b> ' + M('f(x)=x+\\ln x') + ' és contínua a ' + M('[0{,}5;\\,2]') + ' i canvia de signe: ' + M('f(0{,}5)=0{,}5+\\ln0{,}5\\approx-0{,}19<0') + ' i ' + M('f(2)=2+\\ln2\\approx2{,}69>0') + '. Pel teorema de Bolzano hi ha almenys una arrel dins de l\u2019interval (i només una, perquè ' + M("f'(x)=1+\\tfrac1x>0") + ').', '<b>Hay solución.</b> ' + M('f(x)=x+\\ln x') + ' es continua en ' + M('[0{,}5;\\,2]') + ' y cambia de signo: ' + M('f(0{,}5)=0{,}5+\\ln0{,}5\\approx-0{,}19<0') + ' y ' + M('f(2)=2+\\ln2\\approx2{,}69>0') + '. Por el teorema de Bolzano hay al menos una raíz dentro del intervalo (y solo una, porque ' + M("f'(x)=1+\\tfrac1x>0") + ').'),
            p('<b>El programa la acorrala.</b> Cada passada calcula el punt mitjà ' + M('c') + ' i, amb la comprovació del pas 5, es queda amb la meitat de l\u2019interval on ' + M('f') + ' continua canviant de signe. Així l\u2019arrel sempre queda dins ' + M('(a,b)') + ' (Bolzano de nou) i l\u2019amplada de l\u2019interval es redueix a la meitat a cada iteració: després de ' + M('n') + ' passos és ' + M('\\dfrac{1{,}5}{2^n}') + ', que tendeix a ' + M('0') + '.', '<b>El programa la acorrala.</b> Cada pasada calcula el punto medio ' + M('c') + ' y, con la comprobación del paso 5, se queda con la mitad del intervalo donde ' + M('f') + ' sigue cambiando de signo. Así la raíz siempre queda dentro de ' + M('(a,b)') + ' (Bolzano otra vez) y la anchura del intervalo se reduce a la mitad en cada iteración: tras ' + M('n') + ' pasos es ' + M('\\dfrac{1{,}5}{2^n}') + ', que tiende a ' + M('0') + '.'),
            p('Quan l\u2019interval és prou petit, ' + M('f(a)') + ' i ' + M('f(b)') + ' són gairebé iguals i el programa s\u2019atura; ' + M('c') + ' és una aproximació de l\u2019arrel. Es tracta del <b>mètode de la bisecció</b>: amb uns 30 passos s\u2019arriba a ' + M('0{,}56714329') + '.', 'Cuando el intervalo es lo bastante pequeño, ' + M('f(a)') + ' y ' + M('f(b)') + ' son casi iguales y el programa se detiene; ' + M('c') + ' es una aproximación de la raíz. Es el <b>método de la bisección</b>: con unos 30 pasos se llega a ' + M('0{,}56714329') + '.'),
          ] },
        { n: '6.2', pts: 1.25, q: S('Volem aplicar aquest programa per a trobar les tres arrels de ' + M('f(x)=x^3-3x^2+1') + ' amb valors de ' + M('a') + ' i ' + M('b') + ' diferents. Trobeu justificadament entre quins valors ' + M('a') + ' i ' + M('b') + ', per a cada arrel, hem d\u2019aplicar el programa per a trobar aproximacions de cadascuna de les tres arrels de la funció.', 'Queremos aplicar este programa para encontrar las tres raíces de ' + M('f(x)=x^3-3x^2+1') + ' con valores de ' + M('a') + ' y ' + M('b') + ' diferentes. Encuentre justificadamente entre qué valores ' + M('a') + ' y ' + M('b') + ', para cada raíz, debemos aplicar el programa para encontrar aproximaciones de cada una de las tres raíces de la función.'),
          sol: [
            p('Cal intervals on ' + M('f') + ' (polinomi, contínua) canviï de signe. Fem una taula de valors:', 'Hacen falta intervalos donde ' + M('f') + ' (polinomio, continua) cambie de signo. Hacemos una tabla de valores:'),
            F(r`\begin{array}{c|ccccc}x&-1&0&1&2&3\\\hline f(x)&-3&1&-1&-3&1\end{array}`),
            ul(S('<b>Arrel 1:</b> ' + M('f(-1)=-3<0') + ' i ' + M('f(0)=1>0') + ' ⇒ ' + M('a=-1,\\ b=0') + ' (arrel ≈ ' + M('-0{,}532') + ').', '<b>Raíz 1:</b> ' + M('f(-1)=-3<0') + ' y ' + M('f(0)=1>0') + ' ⇒ ' + M('a=-1,\\ b=0') + ' (raíz ≈ ' + M('-0{,}532') + ').'),
              S('<b>Arrel 2:</b> ' + M('f(0)=1>0') + ' i ' + M('f(1)=-1<0') + ' ⇒ ' + M('a=0,\\ b=1') + ' (arrel ≈ ' + M('0{,}653') + ').', '<b>Raíz 2:</b> ' + M('f(0)=1>0') + ' y ' + M('f(1)=-1<0') + ' ⇒ ' + M('a=0,\\ b=1') + ' (raíz ≈ ' + M('0{,}653') + ').'),
              S('<b>Arrel 3:</b> ' + M('f(2)=-3<0') + ' i ' + M('f(3)=1>0') + ' ⇒ ' + M('a=2,\\ b=3') + ' (arrel ≈ ' + M('2{,}879') + ').', '<b>Raíz 3:</b> ' + M('f(2)=-3<0') + ' y ' + M('f(3)=1>0') + ' ⇒ ' + M('a=2,\\ b=3') + ' (raíz ≈ ' + M('2{,}879') + ').')),
            p('En cada un d\u2019aquests tres intervals disjunts, ' + M('f(a)\\cdot f(b)<0') + ' i, per Bolzano, hi ha una arrel. Com que un polinomi de grau 3 en té com a màxim tres, n\u2019hi ha exactament una a cada interval, i les tres queden localitzades.', 'En cada uno de estos tres intervalos disjuntos, ' + M('f(a)\\cdot f(b)<0') + ' y, por Bolzano, hay una raíz. Como un polinomio de grado 3 tiene como máximo tres, hay exactamente una en cada intervalo, y las tres quedan localizadas.'),
            AN(r`(a,b)=(-1,0),\ (0,1),\ (2,3)`),
            fig(plot({ xr: [-1.3, 3.3], yr: [-4, 3], tickx: [-1, 1, 2, 3], ticky: [1], curves: [{ f: x => x ** 3 - 3 * x * x + 1, dom: [-1.3, 3.3], k: 0 }],
              points: [[-0.532, 0], [0.653, 0], [2.879, 0]], alt: 'Gràfica de x³ − 3x² + 1 amb les tres arrels a prop de −0,53; 0,65 i 2,88' })),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 3 (extraordinària) ───────────────────────── */
const s3 = {
  id: 3, pdf: 'pdf/pau/pau-2022-mates-serie3.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.ge,
      intro: p('El pal central que sosté la lona de la carpa d\u2019un circ se situa perpendicularment sobre el pla d\u2019un terra l\u2019equació del qual és ' + M('\\pi:\\ x-z=6') + '. Sabem que la cúpula de la carpa (el punt més alt per on passa el pal) és al punt de coordenades ' + M('P=(30,1,0)') + '.', 'El palo central que sostiene la lona de la carpa de un circo se sitúa perpendicularmente sobre el plano de un suelo cuya ecuación es ' + M('\\pi:\\ x-z=6') + '. Sabemos que la cúpula de la carpa (el punto más alto por donde pasa el palo) está en el punto de coordenadas ' + M('P=(30,1,0)') + '.'),
      parts: [
        { n: '1.1', pts: 1, q: S('Calculeu l\u2019equació paramètrica de la recta que conté el pal.', 'Calcule la ecuación paramétrica de la recta que contiene el palo.'),
          sol: [
            p('El pal és perpendicular al pla ' + M('\\pi') + ', així que la seva direcció és la normal del pla, ' + M('\\vec n=(1,0,-1)') + '. Passa per ' + M('P=(30,1,0)') + ':', 'El palo es perpendicular al plano ' + M('\\pi') + ', así que su dirección es la normal del plano, ' + M('\\vec n=(1,0,-1)') + '. Pasa por ' + M('P=(30,1,0)') + ':'),
            AN(r`\begin{cases}x=30+\lambda\\y=1\\z=-\lambda\end{cases}\quad\lambda\in\mathbb R`),
          ] },
        { n: '1.2', pts: 1.5, q: S('Calculeu les coordenades del punt de contacte del pal amb el terra, i la longitud del pal.', 'Calcule las coordenadas del punto de contacto del palo con el suelo, y la longitud del palo.'),
          sol: [
            p('El punt de contacte és la intersecció de la recta amb el pla ' + M('x-z=6') + ':', 'El punto de contacto es la intersección de la recta con el plano ' + M('x-z=6') + ':'),
            F(r`(30+\lambda)-(-\lambda)=6\ \Longrightarrow\ 30+2\lambda=6\ \Longrightarrow\ \lambda=-12`),
            AN(r`Q=(18,\,1,\,12)`),
            p('La longitud del pal és la distància de ' + M('P') + ' al pla (o, equivalentment, ' + M('|PQ|') + '):', 'La longitud del palo es la distancia de ' + M('P') + ' al plano (o, equivalentemente, ' + M('|PQ|') + '):'),
            F(r`d(P,\pi)=\dfrac{|30-0-6|}{\sqrt{1^2+0^2+(-1)^2}}=\dfrac{24}{\sqrt2}=12\sqrt2`),
            AN(r`\text{longitud}=12\sqrt2\approx16{,}97\ \text{u}`),
            p('Comprovació: ' + M('\\overrightarrow{PQ}=(-12,0,12)') + ', de mòdul ' + M('12\\sqrt2') + '.', 'Comprobación: ' + M('\\overrightarrow{PQ}=(-12,0,12)') + ', de módulo ' + M('12\\sqrt2') + '.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M(r`f(x)=\dfrac{9}{x^2+x-2}`) + '.', 'Considere la función ' + M(r`f(x)=\dfrac{9}{x^2+x-2}`) + '.'),
      parts: [
        { n: '2.1', pts: 1.25, q: S('Determineu el domini, les possibles asímptotes, els extrems relatius i els intervals de creixement i decreixement de la funció.', 'Determine el dominio, las posibles asíntotas, los extremos relativos y los intervalos de crecimiento y decrecimiento de la función.'),
          sol: [
            p('<b>Domini.</b> ' + M('x^2+x-2=(x+2)(x-1)') + ' s\u2019anul·la a ' + M('x=-2') + ' i ' + M('x=1') + ':', '<b>Dominio.</b> ' + M('x^2+x-2=(x+2)(x-1)') + ' se anula en ' + M('x=-2') + ' y ' + M('x=1') + ':'),
            AN(r`\text{Dom}\,f=\mathbb R\setminus\{-2,\,1\}`),
            p('<b>Asímptotes.</b> Verticals a ' + M('x=-2') + ' i ' + M('x=1') + ' (el numerador no s\u2019hi anul·la i el denominador sí). Horitzontal: ' + M('\\lim_{x\\to\\pm\\infty}f(x)=0') + ', així que ' + M('y=0') + ' (a les dues bandes). No hi ha obliqües.', '<b>Asíntotas.</b> Verticales en ' + M('x=-2') + ' y ' + M('x=1') + ' (el numerador no se anula ahí y el denominador sí). Horizontal: ' + M('\\lim_{x\\to\\pm\\infty}f(x)=0') + ', así que ' + M('y=0') + ' (en ambos lados). No hay oblicuas.'),
            p('<b>Monotonia i extrems.</b>', '<b>Monotonía y extremos.</b>'),
            F(r`f'(x)=\dfrac{-9(2x+1)}{(x^2+x-2)^2}=0\ \Longrightarrow\ x=-\tfrac12`),
            p('El denominador al quadrat és positiu, així que el signe el decideix ' + M('-(2x+1)') + ': ' + M("f'>0") + ' si ' + M('x<-\\tfrac12') + ' i ' + M("f'<0") + ' si ' + M('x>-\\tfrac12') + '. Per tant:', 'El denominador al cuadrado es positivo, así que el signo lo decide ' + M('-(2x+1)') + ': ' + M("f'>0") + ' si ' + M('x<-\\tfrac12') + ' y ' + M("f'<0") + ' si ' + M('x>-\\tfrac12') + '. Por tanto:'),
            ul(S('<b>Creixent</b> a ' + M('(-\\infty,-2)') + ' i ' + M('(-2,-\\tfrac12)') + '.', '<b>Creciente</b> en ' + M('(-\\infty,-2)') + ' y ' + M('(-2,-\\tfrac12)') + '.'),
              S('<b>Decreixent</b> a ' + M('(-\\tfrac12,1)') + ' i ' + M('(1,+\\infty)') + '.', '<b>Decreciente</b> en ' + M('(-\\tfrac12,1)') + ' y ' + M('(1,+\\infty)') + '.')),
            ans('<b>Màxim relatiu</b> a ' + M(r`\big(-\tfrac12,\,-4\big)`) + ', ja que ' + M(r`f(-\tfrac12)=\tfrac{9}{-9/4}=-4`) + '.', '<b>Máximo relativo</b> en ' + M(r`\big(-\tfrac12,\,-4\big)`) + ', ya que ' + M(r`f(-\tfrac12)=\tfrac{9}{-9/4}=-4`) + '.'),
          ] },
        { n: '2.2', pts: 1.25, q: S('Calculeu l\u2019equació general de la recta tangent a la funció ' + M('f(x)') + ' en el punt d\u2019abscissa ' + M('x=4') + '. Representeu en un mateix gràfic la funció ' + M('f(x)') + ' i la recta tangent.', 'Calcule la ecuación general de la recta tangente a la función ' + M('f(x)') + ' en el punto de abscisa ' + M('x=4') + '. Represente en un mismo gráfico la función ' + M('f(x)') + ' y la recta tangente.'),
          sol: [
            F(r`f(4)=\dfrac{9}{18}=\tfrac12,\qquad f'(4)=\dfrac{-9\cdot9}{18^2}=-\tfrac14`),
            F(r`y-\tfrac12=-\tfrac14(x-4)\ \Longleftrightarrow\ y=-\tfrac x4+\tfrac32`),
            AN(r`x+4y-6=0`),
            fig(plot({ xr: [-6, 7], yr: [-7, 5], tickx: [-2, 1, 4], ticky: [-4], curves: [{ f: x => 9 / (x * x + x - 2), dom: [-6, 7], k: 0 }, { f: x => -x / 4 + 1.5, dom: [-2, 7], k: 1 }],
              vlines: [-2, 1], hlines: [], points: [[-0.5, -4], [4, 0.5]], labels: [[-0.3, -4.7, '(−½, −4)'], [4.3, 1.4, 'x = 4']], alt: 'Gràfica de 9/(x² + x − 2) amb les asímptotes x = −2 i x = 1, el màxim relatiu i la tangent a x = 4' })),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ma,
      intro: p('Considereu la matriu ' + M(r`A=\begin{pmatrix}1&a&3\\2a&5&3a\\7&4a&9\end{pmatrix}`) + ', que depèn del paràmetre ' + M('a') + '.', 'Considere la matriz ' + M(r`A=\begin{pmatrix}1&a&3\\2a&5&3a\\7&4a&9\end{pmatrix}`) + ', que depende del parámetro ' + M('a') + '.'),
      parts: [
        { n: '3.1', pts: 1.25, q: S('Calculeu el rang de la matriu ' + M('A') + ' per als diferents valors del paràmetre ' + M('a') + '.', 'Calcule el rango de la matriz ' + M('A') + ' para los diferentes valores del parámetro ' + M('a') + '.'),
          sol: [
            F(r`|A|=1(45-12a^2)-a(18a-21a)+3(8a^2-35)=15a^2-60=15(a-2)(a+2)`),
            ul(S('Si ' + M('a\\neq\\pm2') + ': ' + M('|A|\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=3') + '.', 'Si ' + M('a\\neq\\pm2') + ': ' + M('|A|\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=3') + '.'),
              S('Si ' + M('a=2') + ': ' + M(r`A=\begin{pmatrix}1&2&3\\4&5&6\\7&8&9\end{pmatrix}`) + ', i el menor ' + M('\\begin{vmatrix}1&2\\\\4&5\\end{vmatrix}=-3\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=2') + '.', 'Si ' + M('a=2') + ': ' + M(r`A=\begin{pmatrix}1&2&3\\4&5&6\\7&8&9\end{pmatrix}`) + ', y el menor ' + M('\\begin{vmatrix}1&2\\\\4&5\\end{vmatrix}=-3\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=2') + '.'),
              S('Si ' + M('a=-2') + ': el menor ' + M('\\begin{vmatrix}1&-2\\\\-4&5\\end{vmatrix}=-3\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=2') + '.', 'Si ' + M('a=-2') + ': el menor ' + M('\\begin{vmatrix}1&-2\\\\-4&5\\end{vmatrix}=-3\\neq0') + ' ⇒ ' + M('\\text{rang}\\,A=2') + '.')),
            ans('Rang ' + M('3') + ' si ' + M('a\\neq\\pm2') + ' i rang ' + M('2') + ' si ' + M('a=2') + ' o ' + M('a=-2') + '.', 'Rango ' + M('3') + ' si ' + M('a\\neq\\pm2') + ' y rango ' + M('2') + ' si ' + M('a=2') + ' o ' + M('a=-2') + '.'),
          ] },
        { n: '3.2', pts: 1.25, q: S('Si ' + M(r`X=\begin{pmatrix}x\\y\\z\end{pmatrix}`) + ', resoleu l\u2019equació matricial següent: ' + M(r`\begin{pmatrix}1&2&3\\4&5&6\\7&8&9\end{pmatrix}\cdot X=\begin{pmatrix}0\\0\\0\end{pmatrix}`) + '.', 'Si ' + M(r`X=\begin{pmatrix}x\\y\\z\end{pmatrix}`) + ', resuelva la ecuación matricial siguiente: ' + M(r`\begin{pmatrix}1&2&3\\4&5&6\\7&8&9\end{pmatrix}\cdot X=\begin{pmatrix}0\\0\\0\end{pmatrix}`) + '.'),
          sol: [
            p('És la matriu de l\u2019apartat anterior amb ' + M('a=2') + ', de rang 2: el sistema homogeni és compatible indeterminat amb un grau de llibertat. Amb les dues primeres equacions:', 'Es la matriz del apartado anterior con ' + M('a=2') + ', de rango 2: el sistema homogéneo es compatible indeterminado con un grado de libertad. Con las dos primeras ecuaciones:'),
            F(r`\begin{cases}x+2y+3z=0\\4x+5y+6z=0\end{cases}\ \Rightarrow\ (E_2-4E_1):\ -3y-6z=0\ \Rightarrow\ y=-2z`),
            p('I de la primera, ' + M('x=-2y-3z=4z-3z=z') + '. La tercera equació és combinació de les altres dues (' + M('E_3=2E_2-E_1') + ').', 'Y de la primera, ' + M('x=-2y-3z=4z-3z=z') + '. La tercera ecuación es combinación de las otras dos (' + M('E_3=2E_2-E_1') + ').'),
            AN(r`(x,y,z)=(t,\,-2t,\,t),\quad t\in\mathbb R`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pa,
      parts: [
        { n: '4.1', pts: 1.25, q: S('Considereu la funció ' + M(r`f(x)=\begin{cases}\ln(x),&x\in(0,e)\\ax+b,&x\in[e,4)\end{cases}`) + ', on ' + M('a') + ' i ' + M('b') + ' són nombres reals. Trobeu el valor de ' + M('a') + ' i de ' + M('b') + ' per tal que la funció sigui contínua i derivable a l\u2019interval ' + M('(0,4)') + '.', 'Considere la función ' + M(r`f(x)=\begin{cases}\ln(x),&x\in(0,e)\\ax+b,&x\in[e,4)\end{cases}`) + ', donde ' + M('a') + ' y ' + M('b') + ' son números reales. Encuentre el valor de ' + M('a') + ' y de ' + M('b') + ' para que la función sea continua y derivable en el intervalo ' + M('(0,4)') + '.'),
          sol: [
            p('Cada tros és continu i derivable al seu interval; només cal ajustar el punt d\u2019unió ' + M('x=e') + '.', 'Cada tramo es continuo y derivable en su intervalo; solo hay que ajustar el punto de unión ' + M('x=e') + '.'),
            ul(S('<b>Continuïtat:</b> ' + M('\\ln e=ae+b') + ' ⇒ ' + M('ae+b=1') + '.', '<b>Continuidad:</b> ' + M('\\ln e=ae+b') + ' ⇒ ' + M('ae+b=1') + '.'),
              S('<b>Derivabilitat:</b> les derivades laterals coincideixen: ' + M("(\\ln x)'\\big|_{x=e}=\\tfrac1e=a") + '.', '<b>Derivabilidad:</b> las derivadas laterales coinciden: ' + M("(\\ln x)'\\big|_{x=e}=\\tfrac1e=a") + '.')),
            p('Amb ' + M('a=\\tfrac1e') + ': ' + M('1+b=1') + ', d\u2019on ' + M('b=0') + '.', 'Con ' + M('a=\\tfrac1e') + ': ' + M('1+b=1') + ', de donde ' + M('b=0') + '.'),
            AN(r`a=\dfrac1e,\qquad b=0`),
            p('És a dir, el segon tros és la recta tangent a ' + M('\\ln x') + ' en ' + M('x=e') + ', que passa per l\u2019origen.', 'Es decir, el segundo tramo es la recta tangente a ' + M('\\ln x') + ' en ' + M('x=e') + ', que pasa por el origen.'),
          ] },
        { n: '4.2', pts: 1.25, q: S('Calculeu la funció ' + M('g(x)') + ' que satisfà ' + M(r`g'(x)=\dfrac{x^3}{9x^4+1}`) + ' i que passa pel punt ' + M('(0,-1)') + '.', 'Calcule la función ' + M('g(x)') + ' que satisface ' + M(r`g'(x)=\dfrac{x^3}{9x^4+1}`) + ' y que pasa por el punto ' + M('(0,-1)') + '.'),
          sol: [
            p('La derivada del denominador és ' + M('36x^3') + ', així que el numerador és proporcional (' + M('x^3=\\tfrac1{36}\\cdot36x^3') + '): és una integral logarítmica.', 'La derivada del denominador es ' + M('36x^3') + ', así que el numerador es proporcional (' + M('x^3=\\tfrac1{36}\\cdot36x^3') + '): es una integral logarítmica.'),
            F(r`g(x)=\dfrac1{36}\int\dfrac{36x^3}{9x^4+1}\,dx=\dfrac1{36}\ln\big(9x^4+1\big)+C`),
            p('Amb ' + M('g(0)=-1') + ': ' + M('\\tfrac1{36}\\ln1+C=-1') + ', d\u2019on ' + M('C=-1') + '.', 'Con ' + M('g(0)=-1') + ': ' + M('\\tfrac1{36}\\ln1+C=-1') + ', de donde ' + M('C=-1') + '.'),
            AN(r`g(x)=\dfrac{\ln(9x^4+1)}{36}-1`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ma,
      intro: p('Sigui la matriu ' + M(r`A=\begin{pmatrix}a&a&0\\2&a+1&a-1\\2a+1&0&-a-3\end{pmatrix}`) + ', en què ' + M('a') + ' és un paràmetre real.', 'Sea la matriz ' + M(r`A=\begin{pmatrix}a&a&0\\2&a+1&a-1\\2a+1&0&-a-3\end{pmatrix}`) + ', en que ' + M('a') + ' es un parámetro real.'),
      parts: [
        { n: '5.1', pts: 1.25, q: S('Calculeu els valors del paràmetre ' + M('a') + ' per als quals la matriu ' + M('A') + ' és invertible.', 'Calcule los valores del parámetro ' + M('a') + ' para los cuales la matriz ' + M('A') + ' es invertible.'),
          sol: [
            p('És invertible si i només si ' + M('|A|\\neq0') + '. Desenvolupem per la primera fila:', 'Es invertible si y solo si ' + M('|A|\\neq0') + '. Desarrollamos por la primera fila:'),
            F(r`|A|=a\big[(a+1)(-a-3)\big]-a\big[2(-a-3)-(a-1)(2a+1)\big]=a^3-3a^2+2a=a(a-1)(a-2)`),
            ans('' + M('A') + ' és invertible per a tot ' + M('a\\neq0,\\ 1,\\ 2') + '.', M('A') + ' es invertible para todo ' + M('a\\neq0,\\ 1,\\ 2') + '.'),
          ] },
        { n: '5.2', pts: 1.25, q: S('Per al cas ' + M('a=3') + ', resoleu l\u2019equació ' + M('A\\cdot X=B-3I') + ', en què ' + M(r`B=\begin{pmatrix}4&0&0\\0&4&0\\0&0&4\end{pmatrix}`) + '.', 'Para el caso ' + M('a=3') + ', resuelva la ecuación ' + M('A\\cdot X=B-3I') + ', en que ' + M(r`B=\begin{pmatrix}4&0&0\\0&4&0\\0&0&4\end{pmatrix}`) + '.'),
          sol: [
            p('Amb ' + M('a=3') + ' ' + M('|A|=3\\cdot2\\cdot1=6\\neq0') + ', i ' + M('B-3I=4I-3I=I') + '. L\u2019equació és ' + M('A\\cdot X=I') + ', així que ' + M('X=A^{-1}') + '. Amb ' + M(r`A=\begin{pmatrix}3&3&0\\2&4&2\\7&0&-6\end{pmatrix}`) + ', la matriu adjunta transposada és:', 'Con ' + M('a=3') + ' ' + M('|A|=3\\cdot2\\cdot1=6\\neq0') + ', y ' + M('B-3I=4I-3I=I') + '. La ecuación es ' + M('A\\cdot X=I') + ', así que ' + M('X=A^{-1}') + '. Con ' + M(r`A=\begin{pmatrix}3&3&0\\2&4&2\\7&0&-6\end{pmatrix}`) + ', la matriz adjunta traspuesta es:'),
            F(r`\text{Adj}(A)^t=\begin{pmatrix}-24&18&6\\26&-18&-6\\-28&21&6\end{pmatrix}`),
            AN(r`X=A^{-1}=\dfrac16\begin{pmatrix}-24&18&6\\26&-18&-6\\-28&21&6\end{pmatrix}=\begin{pmatrix}-4&3&1\\\tfrac{13}{3}&-3&-1\\-\tfrac{14}{3}&\tfrac72&1\end{pmatrix}`),
            p('Comprovació de la primera fila: ' + M('3\\cdot(-4)+3\\cdot\\tfrac{13}3=-12+13=1') + ', ' + M('3\\cdot3+3\\cdot(-3)=0') + ', ' + M('3\\cdot1+3\\cdot(-1)=0') + '.', 'Comprobación de la primera fila: ' + M('3\\cdot(-4)+3\\cdot\\tfrac{13}3=-12+13=1') + ', ' + M('3\\cdot3+3\\cdot(-3)=0') + ', ' + M('3\\cdot1+3\\cdot(-1)=0') + '.'),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.op,
      intro: J(p('La imatge següent mostra dues parets perpendiculars d\u2019una sala representades en uns eixos de coordenades, de manera que una paret és al pla ' + M('y=0') + ' i l\u2019altra és al pla ' + M('x=0') + '.', 'La imagen siguiente muestra dos paredes perpendiculares de una sala representadas en unos ejes de coordenadas, de manera que una pared está en el plano ' + M('y=0') + ' y la otra en el plano ' + M('x=0') + '.'),
        J(img('2022-s3-e6', 1100, 517, 'Dues parets perpendiculars en uns eixos de coordenades amb els punts A i B i el cable que passa per C', 'Dos paredes perpendiculares en unos ejes de coordenadas con los puntos A y B y el cable que pasa por C'),
        p('En el punt ' + M('A=(2,0,2)') + ' hi volem penjar un altaveu que ha d\u2019estar connectat a un equip de so, el qual està situat a l\u2019altra paret, en el punt ' + M('B=(0,2,1)') + '. La connexió entre ' + M('A') + ' i ' + M('B') + ' la farem mitjançant un cable que passi pel punt ' + M('C=(0,0,h)') + ', situat a la recta vertical d\u2019intersecció de les dues parets. Com que la qualitat del so depèn, entre altres factors, de la longitud del cable que uneix els dos aparells, volem fer una instal·lació amb el mínim de cable possible.',
          'En el punto ' + M('A=(2,0,2)') + ' queremos colgar un altavoz que tiene que estar conectado a un equipo de sonido, el cual está situado en la otra pared, en el punto ' + M('B=(0,2,1)') + '. La conexión entre ' + M('A') + ' y ' + M('B') + ' la haremos mediante un cable que pase por el punto ' + M('C=(0,0,h)') + ', situado en la recta vertical de intersección de las dos paredes. Como la calidad del sonido depende, entre otros factores, de la longitud del cable que une los dos aparatos, queremos hacer una instalación con el mínimo de cable posible.'))),
      parts: [
        { n: '6.1', pts: 0.75, q: S('Comproveu que la longitud total del cable necessari, en funció de l\u2019alçada ' + M('h') + ' per on ha de passar el cable a l\u2019eix vertical ' + M('OZ') + ', ve donada per l\u2019expressió ' + M(r`L(h)=\sqrt{h^2-4h+8}+\sqrt{h^2-2h+5}`) + '.', 'Compruebe que la longitud total del cable necesario, en función de la altura ' + M('h') + ' por donde debe pasar el cable en el eje vertical ' + M('OZ') + ', viene dada por la expresión ' + M(r`L(h)=\sqrt{h^2-4h+8}+\sqrt{h^2-2h+5}`) + '.'),
          sol: [
            p('El cable fa dos trams, ' + M('AC') + ' i ' + M('CB') + ', amb ' + M('C=(0,0,h)') + ':', 'El cable tiene dos tramos, ' + M('AC') + ' y ' + M('CB') + ', con ' + M('C=(0,0,h)') + ':'),
            F(r`\overrightarrow{AC}=(-2,0,h-2)\Rightarrow|AC|=\sqrt{4+(h-2)^2}=\sqrt{h^2-4h+8}`),
            F(r`\overrightarrow{CB}=(0,2,1-h)\Rightarrow|CB|=\sqrt{4+(1-h)^2}=\sqrt{h^2-2h+5}`),
            p('Sumant els dos trams s\u2019obté ' + M('L(h)') + '.', 'Sumando los dos tramos se obtiene ' + M('L(h)') + '.'),
          ] },
        { n: '6.2', pts: 1.75, q: S('Calculeu les coordenades del punt ' + M('C') + ' per on ha de passar el cable per tal que la longitud del cable sigui mínima. Calculeu aquesta longitud mínima del cable.', 'Calcule las coordenadas del punto ' + M('C') + ' por donde debe pasar el cable para que la longitud del cable sea mínima. Calcule esta longitud mínima del cable.'),
          sol: [
            p('Derivem ' + M('L(h)') + ' i igualem a zero:', 'Derivamos ' + M('L(h)') + ' e igualamos a cero:'),
            F(r`L'(h)=\dfrac{h-2}{\sqrt{(h-2)^2+4}}+\dfrac{h-1}{\sqrt{(h-1)^2+4}}=0`),
            p('Cada fracció és la funció ' + M('u\\mapsto\\dfrac{u}{\\sqrt{u^2+4}}') + ', que és senar i estrictament creixent. L\u2019equació és ' + M('\\varphi(h-2)=-\\varphi(h-1)=\\varphi(1-h)') + ', i com que ' + M('\\varphi') + ' és injectiva: ' + M('h-2=1-h') + ', és a dir ' + M('h=\\tfrac32') + '.', 'Cada fracción es la función ' + M('u\\mapsto\\dfrac{u}{\\sqrt{u^2+4}}') + ', que es impar y estrictamente creciente. La ecuación es ' + M('\\varphi(h-2)=-\\varphi(h-1)=\\varphi(1-h)') + ', y como ' + M('\\varphi') + ' es inyectiva: ' + M('h-2=1-h') + ', es decir ' + M('h=\\tfrac32') + '.'),
            p('Com que ' + M("L'") + ' és negativa a l\u2019esquerra de ' + M('\\tfrac32') + ' i positiva a la dreta (suma de dues funcions creixents que s\u2019anul·la allà), és un <b>mínim</b>.', 'Como ' + M("L'") + ' es negativa a la izquierda de ' + M('\\tfrac32') + ' y positiva a la derecha (suma de dos funciones crecientes que se anula ahí), es un <b>mínimo</b>.'),
            F(r`L\big(\tfrac32\big)=\sqrt{\tfrac94-6+8}+\sqrt{\tfrac94-3+5}=\sqrt{\tfrac{17}4}+\sqrt{\tfrac{17}4}=\sqrt{17}`),
            AN(r`C=\big(0,\,0,\,\tfrac32\big),\qquad L_{\min}=\sqrt{17}\approx4{,}12\ \text{u}`),
            p('<i>Comprovació geomètrica:</i> al semiplà format per l\u2019eix ' + M('OZ') + ' i les distàncies perpendiculars, ' + M('A') + ' és a ' + M('(2,\\,2)') + ' i ' + M('B') + ' a ' + M('(-2,\\,1)') + ' (en eix vertical ' + M('z') + ' i horitzontal la distància a l\u2019eix). Desplegant les dues parets, el cable més curt és el segment recte ' + M('AB') + ', que talla l\u2019eix a ' + M('h=\\tfrac32') + ' i fa ' + M('\\sqrt{4^2+1^2}=\\sqrt{17}') + '.', '<i>Comprobación geométrica:</i> en el semiplano formado por el eje ' + M('OZ') + ' y las distancias perpendiculares, ' + M('A') + ' está en ' + M('(2,\\,2)') + ' y ' + M('B') + ' en ' + M('(-2,\\,1)') + ' (eje vertical ' + M('z') + ' y horizontal la distancia al eje). Desplegando las dos paredes, el cable más corto es el segmento recto ' + M('AB') + ', que corta el eje en ' + M('h=\\tfrac32') + ' y mide ' + M('\\sqrt{4^2+1^2}=\\sqrt{17}') + '.'),
          ] },
      ] },
  ],
};

module.exports = {
  year: { y: 2022, title: T('PAU 2022', 'PAU 2022'), series: [s2, s5, s3] },
};
