/* PAU 2021 · Matemàtiques II · sèries 2 i 5 (ordinària) i 1 (extraordinària). Sis qüestions, se'n responen quatre.
 * Enunciats oficials (català); traducció al castellà i solucions pròpies. */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  an: T('Anàlisi', 'Análisis'), al: T('Àlgebra', 'Álgebra'), ge: T('Geometria', 'Geometría'),
  ma: T('Matrius', 'Matrices'), op: T('Optimització', 'Optimización'), pa: T('Anàlisi · Integral', 'Análisis · Integral'),
};
const F = tex => html(D(tex));
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>');
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const S = (ca, es) => T(ca, es);

/* ───────────────────────── SÈRIE 2 (ordinària) ───────────────────────── */
const s2 = {
  id: 2, pdf: 'pdf/pau/pau-2021-mates-serie2.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.op,
      intro: p('Considereu la paràbola ' + M('y=4-x^2') + ' i un valor ' + M('a>0') + '.', 'Considere la parábola ' + M('y=4-x^2') + ' y un valor ' + M('a>0') + '.'),
      parts: [
        { n: '1.1', pts: 1.25, q: S('Comproveu que l\u2019equació de la recta tangent a la gràfica de la paràbola en el punt d\u2019abscissa ' + M('x=a') + ' és ' + M('y=-2ax+a^2+4') + ' i calculeu els punts de tall d\u2019aquesta recta tangent amb els eixos de coordenades.', 'Compruebe que la ecuación de la recta tangente a la gráfica de la parábola en el punto de abscisa ' + M('x=a') + ' es ' + M('y=-2ax+a^2+4') + ' y calcule los puntos de corte de esta recta tangente con los ejes de coordenadas.'),
          sol: [
            p('Si ' + M('f(x)=4-x^2') + ', llavors ' + M("f'(x)=-2x") + ', ' + M('f(a)=4-a^2') + ' i ' + M("f'(a)=-2a") + '. La tangent és:', 'Si ' + M('f(x)=4-x^2') + ', entonces ' + M("f'(x)=-2x") + ', ' + M('f(a)=4-a^2') + ' y ' + M("f'(a)=-2a") + '. La tangente es:'),
            F(r`y-(4-a^2)=-2a(x-a)\ \Longrightarrow\ y=-2ax+2a^2+4-a^2=-2ax+a^2+4`),
            p('Talls amb els eixos:', 'Cortes con los ejes:'),
            ul(S('Amb l\u2019eix ' + M('OY') + ' (' + M('x=0') + '): ' + M('y=a^2+4') + '.', 'Con el eje ' + M('OY') + ' (' + M('x=0') + '): ' + M('y=a^2+4') + '.'),
              S('Amb l\u2019eix ' + M('OX') + ' (' + M('y=0') + '): ' + M('x=\\dfrac{a^2+4}{2a}') + '.', 'Con el eje ' + M('OX') + ' (' + M('y=0') + '): ' + M('x=\\dfrac{a^2+4}{2a}') + '.')),
            AN(r`\left(0,\,a^2+4\right)\ ;\ \left(\dfrac{a^2+4}{2a},\,0\right)`),
          ] },
        { n: '1.2', pts: 1.25, q: S('Calculeu el valor de ' + M('a>0') + ' perquè l\u2019àrea del triangle determinat per aquesta recta tangent i els eixos de coordenades sigui mínima.', 'Calcule el valor de ' + M('a>0') + ' para que el área del triángulo determinado por esta recta tangente y los ejes de coordenadas sea mínima.'),
          sol: [
            p('El triangle és rectangle amb catets ' + M('\\dfrac{a^2+4}{2a}') + ' i ' + M('a^2+4') + ':', 'El triángulo es rectángulo con catetos ' + M('\\dfrac{a^2+4}{2a}') + ' y ' + M('a^2+4') + ':'),
            F(r`A(a)=\dfrac12\cdot\dfrac{a^2+4}{2a}\cdot(a^2+4)=\dfrac{(a^2+4)^2}{4a}`),
            p('Derivem:', 'Derivamos:'),
            F(r`A'(a)=\dfrac{2(a^2+4)\cdot2a\cdot4a-(a^2+4)^2\cdot4}{16a^2}=\dfrac{(a^2+4)(12a^2-16)}{16a^2}`),
            p(M("A'(a)=0") + ' ⇒ ' + M('12a^2=16') + ' ⇒ ' + M('a=\\dfrac{2}{\\sqrt3}=\\dfrac{2\\sqrt3}{3}') + ' (' + M('a>0') + '). Hi ha un mínim: ' + M("A'") + ' és negativa abans i positiva després d\u2019aquest valor.', M("A'(a)=0") + ' ⇒ ' + M('12a^2=16') + ' ⇒ ' + M('a=\\dfrac{2}{\\sqrt3}=\\dfrac{2\\sqrt3}{3}') + ' (' + M('a>0') + '). Hay un mínimo: ' + M("A'") + ' es negativa antes y positiva después de este valor.'),
            AN(r`a=\dfrac{2\sqrt3}{3}\approx1{,}15\qquad A_{\min}=\dfrac{32\sqrt3}{9}\ u^2\approx6{,}16\ u^2`),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent, que depèn del paràmetre real ' + M('p') + ':', 'Considere el sistema de ecuaciones lineales siguiente, que depende del parámetro real ' + M('p') + ':'),
        F(r`\begin{cases}px+y+z=2\\2x+py+p^2z=1\\2x+y+z=2\end{cases}`)),
      parts: [
        { n: '2.1', pts: 1.5, q: S('Discutiu el sistema per als diferents valors del paràmetre ' + M('p') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('p') + '.'),
          sol: [
            p('Determinant de la matriu de coeficients:', 'Determinante de la matriz de coeficientes:'),
            F(r`|A|=\begin{vmatrix}p&1&1\\2&p&p^2\\2&1&1\end{vmatrix}=-p^3+3p^2-2p=-p(p-1)(p-2)`),
            ul(S('Si ' + M('p\\neq0,1,2') + ': ' + M('|A|\\neq0') + ' ⇒ <b>compatible determinat</b>.', 'Si ' + M('p\\neq0,1,2') + ': ' + M('|A|\\neq0') + ' ⇒ <b>compatible determinado</b>.'),
              S('Si ' + M('p=0') + ': la tercera fila és la suma de les dues primeres a ' + M('A') + ' (' + M('\\operatorname{rg}\\,A=2') + '), però no als termes independents (' + M('2+1\\neq2') + ' ⇒ ' + M('\\operatorname{rg}\\,A^*=3') + '): <b>incompatible</b>.', 'Si ' + M('p=0') + ': la tercera fila es la suma de las dos primeras en ' + M('A') + ' (' + M('\\operatorname{rg}\\,A=2') + '), pero no en los términos independientes (' + M('2+1\\neq2') + ' ⇒ ' + M('\\operatorname{rg}\\,A^*=3') + '): <b>incompatible</b>.'),
              S('Si ' + M('p=1') + ': la segona i la tercera equació són ' + M('2x+y+z=1') + ' i ' + M('2x+y+z=2') + ', contradictòries: <b>incompatible</b> (' + M('\\operatorname{rg}\\,A=2,\\ \\operatorname{rg}\\,A^*=3') + ').', 'Si ' + M('p=1') + ': la segunda y la tercera ecuación son ' + M('2x+y+z=1') + ' y ' + M('2x+y+z=2') + ', contradictorias: <b>incompatible</b> (' + M('\\operatorname{rg}\\,A=2,\\ \\operatorname{rg}\\,A^*=3') + ').'),
              S('Si ' + M('p=2') + ': la primera i la tercera equació coincideixen i la segona no és proporcional: ' + M('\\operatorname{rg}\\,A=\\operatorname{rg}\\,A^*=2<3') + ' ⇒ <b>compatible indeterminat</b>.', 'Si ' + M('p=2') + ': la primera y la tercera ecuación coinciden y la segunda no es proporcional: ' + M('\\operatorname{rg}\\,A=\\operatorname{rg}\\,A^*=2<3') + ' ⇒ <b>compatible indeterminado</b>.')),
          ] },
        { n: '2.2', pts: 1, q: S('Resoleu, si és possible, el sistema per al cas ' + M('p=2') + '.', 'Resuelva, si es posible, el sistema para el caso ' + M('p=2') + '.'),
          sol: [
            p('Amb ' + M('p=2') + ' i eliminant l\u2019equació repetida:', 'Con ' + M('p=2') + ' y eliminando la ecuación repetida:'),
            F(r`\begin{cases}2x+y+z=2\\2x+2y+4z=1\end{cases}`),
            p('Restant: ' + M('y+3z=-1') + ', d\u2019on ' + M('y=-1-3z') + '. Substituint a la primera: ' + M('2x=2-y-z=3+2z') + '.', 'Restando: ' + M('y+3z=-1') + ', de donde ' + M('y=-1-3z') + '. Sustituyendo en la primera: ' + M('2x=2-y-z=3+2z') + '.'),
            AN(r`(x,y,z)=\left(\tfrac32+t,\ -1-3t,\ t\right),\quad t\in\mathbb R`),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ge,
      intro: J(p('Considereu el punt ' + M('P=(-1,3,1)') + ', el pla ' + M('\\pi:\\ x=y') + ' i la recta:', 'Considere el punto ' + M('P=(-1,3,1)') + ', el plano ' + M('\\pi:\\ x=y') + ' y la recta:'),
        F(r`r:\ \dfrac{x-1}{2}=\dfrac y3=z-2`)),
      parts: [
        { n: '3.1', pts: 1.25, q: S('Trobeu les coordenades del punt ' + M("P'") + ' simètric a ' + M('P') + ' respecte al pla ' + M('\\pi') + '.', 'Halle las coordenadas del punto ' + M("P'") + ' simétrico a ' + M('P') + ' respecto al plano ' + M('\\pi') + '.'),
          sol: [
            p('El pla és ' + M('x-y=0') + ', de vector normal ' + M('\\vec n=(1,-1,0)') + '. La recta per ' + M('P') + ' perpendicular al pla és ' + M('(-1+t,\\ 3-t,\\ 1)') + '.', 'El plano es ' + M('x-y=0') + ', de vector normal ' + M('\\vec n=(1,-1,0)') + '. La recta por ' + M('P') + ' perpendicular al plano es ' + M('(-1+t,\\ 3-t,\\ 1)') + '.'),
            p('Projecció de ' + M('P') + ' sobre el pla: ' + M('-1+t=3-t') + ' ⇒ ' + M('t=2') + ', és a dir ' + M('Q=(1,1,1)') + '. Aquest punt és el punt mitjà de ' + M('P') + ' i ' + M("P'") + ':', 'Proyección de ' + M('P') + ' sobre el plano: ' + M('-1+t=3-t') + ' ⇒ ' + M('t=2') + ', es decir ' + M('Q=(1,1,1)') + '. Este punto es el punto medio de ' + M('P') + ' y ' + M("P'") + ':'),
            F(r`P'=2Q-P=(2,2,2)-(-1,3,1)`),
            AN(r`P'=(3,-1,1)`),
          ] },
        { n: '3.2', pts: 1.25, q: S('De tots els plans que contenen la recta ' + M('r') + ', trobeu l\u2019equació cartesiana del que és perpendicular al pla ' + M('\\pi') + '.', 'De todos los planos que contienen la recta ' + M('r') + ', halle la ecuación cartesiana del que es perpendicular al plano ' + M('\\pi') + '.'),
          sol: [
            p('La recta ' + M('r') + ' passa per ' + M('A=(1,0,2)') + ' amb direcció ' + M('\\vec d=(2,3,1)') + '. El pla buscat conté ' + M('\\vec d') + ' i, per ser perpendicular a ' + M('\\pi') + ', també ' + M('\\vec n=(1,-1,0)') + '. El seu vector normal és:', 'La recta ' + M('r') + ' pasa por ' + M('A=(1,0,2)') + ' con dirección ' + M('\\vec d=(2,3,1)') + '. El plano buscado contiene ' + M('\\vec d') + ' y, por ser perpendicular a ' + M('\\pi') + ', también ' + M('\\vec n=(1,-1,0)') + '. Su vector normal es:'),
            F(r`\vec d\times\vec n=\begin{vmatrix}\vec i&\vec j&\vec k\\2&3&1\\1&-1&0\end{vmatrix}=(1,\,1,\,-5)`),
            p('Equació del pla per ' + M('A') + ':', 'Ecuación del plano por ' + M('A') + ':'),
            F(r`(x-1)+y-5(z-2)=0`),
            AN(r`x+y-5z+9=0`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pa,
      intro: p('Sigui la funció ' + M('f(x)=\\dfrac{\\ln x}{x}') + ' definida en el domini ' + M('x>0') + ', en què ' + M('\\ln') + ' és el logaritme neperià.', 'Sea la función ' + M('f(x)=\\dfrac{\\ln x}{x}') + ' definida en el dominio ' + M('x>0') + ', en la que ' + M('\\ln') + ' es el logaritmo neperiano.'),
      parts: [
        { n: '4.1', pts: 1, q: S('Trobeu les coordenades d\u2019un punt de la corba ' + M('y=f(x)') + ' en el qual la recta tangent a la corba sigui horitzontal i analitzeu si la funció té un extrem relatiu en aquest punt.', 'Halle las coordenadas de un punto de la curva ' + M('y=f(x)') + ' en el que la recta tangente a la curva sea horizontal y analice si la función tiene un extremo relativo en ese punto.'),
          sol: [
            F(r`f'(x)=\dfrac{\frac1x\cdot x-\ln x}{x^2}=\dfrac{1-\ln x}{x^2}`),
            p('Tangent horitzontal: ' + M("f'(x)=0") + ' ⇒ ' + M('\\ln x=1') + ' ⇒ ' + M('x=e') + ', i ' + M('f(e)=\\dfrac1e') + '.', 'Tangente horizontal: ' + M("f'(x)=0") + ' ⇒ ' + M('\\ln x=1') + ' ⇒ ' + M('x=e') + ', y ' + M('f(e)=\\dfrac1e') + '.'),
            p('El signe de ' + M("f'") + ' és positiu per a ' + M('x<e') + ' i negatiu per a ' + M('x>e') + ': la funció creix i després decreix.', 'El signo de ' + M("f'") + ' es positivo para ' + M('x<e') + ' y negativo para ' + M('x>e') + ': la función crece y después decrece.'),
            ans('<b>Màxim relatiu</b> al punt ' + M('\\left(e,\\dfrac1e\\right)') + '.', '<b>Máximo relativo</b> en el punto ' + M('\\left(e,\\dfrac1e\\right)') + '.'),
          ] },
        { n: '4.2', pts: 0.5, q: S('Determineu si la funció ' + M('f(x)') + ' té alguna asímptota horitzontal.', 'Determine si la función ' + M('f(x)') + ' tiene alguna asíntota horizontal.'),
          sol: [
            F(r`\lim_{x\to+\infty}\dfrac{\ln x}{x}=0`),
            p('(el logaritme creix més lentament que qualsevol potència de ' + M('x') + ').', '(el logaritmo crece más lentamente que cualquier potencia de ' + M('x') + ').'),
            ans('Sí: <b>asímptota horitzontal ' + M('y=0') + '</b> (a ' + M('+\\infty') + ').', 'Sí: <b>asíntota horizontal ' + M('y=0') + '</b> (en ' + M('+\\infty') + ').'),
          ] },
        { n: '4.3', pts: 1, q: S('Calculeu l\u2019àrea de la regió delimitada per la corba ' + M('y=f(x)') + ' i les rectes ' + M('x=1') + ' i ' + M('x=e') + '. Feu un dibuix aproximat de la gràfica de la funció en el domini ' + M('0<x<5') + ', en què quedi representada l\u2019àrea que heu calculat.', 'Calcule el área de la región delimitada por la curva ' + M('y=f(x)') + ' y las rectas ' + M('x=1') + ' y ' + M('x=e') + '. Haga un dibujo aproximado de la gráfica de la función en el dominio ' + M('0<x<5') + ', en el que quede representada el área que ha calculado.'),
          sol: [
            p('Entre ' + M('1') + ' i ' + M('e') + ' la funció és positiva (' + M('\\ln x\\geq0') + '). Primitiva: ' + M('\\int\\dfrac{\\ln x}{x}dx=\\dfrac{(\\ln x)^2}{2}') + '.', 'Entre ' + M('1') + ' y ' + M('e') + ' la función es positiva (' + M('\\ln x\\geq0') + '). Primitiva: ' + M('\\int\\dfrac{\\ln x}{x}dx=\\dfrac{(\\ln x)^2}{2}') + '.'),
            F(r`A=\int_1^e\dfrac{\ln x}{x}\,dx=\left[\dfrac{(\ln x)^2}{2}\right]_1^e=\dfrac12-0`),
            AN(r`A=\dfrac12\ u^2`),
            fig(plot({ xr: [0, 5.2], yr: [-1.2, 0.7], tickx: [1, 2, 3, 4, 5], ticky: [], curves: [{ f: x => Math.log(x) / x, dom: [0.2, 5.2], k: 0 }],
              fill: { f: x => Math.log(x) / x, a: 1, b: Math.E }, points: [[1, 0], [Math.E, 1 / Math.E]], labels: [[2.9, 0.5, '(e, 1/e)'], [1.55, 0.1, 'A']], alt: 'Gràfica de f(x) = ln x / x amb l\u2019àrea entre x = 1 i x = e' })),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ma,
      parts: [
        { n: '5.1', pts: 1.25, q: S('Donada la matriu ' + M('A=\\begin{pmatrix}0&0&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}') + ', resoleu l\u2019equació matricial ' + M('A^2X=A-3I') + ', en què ' + M('I') + ' és la matriu identitat.', 'Dada la matriz ' + M('A=\\begin{pmatrix}0&0&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}') + ', resuelva la ecuación matricial ' + M('A^2X=A-3I') + ', en la que ' + M('I') + ' es la matriz identidad.'),
          sol: [
            p('Calculem ' + M('A^2') + ' i observem que ' + M('A^3=I') + ' (' + M('A') + ' és una permutació de les files):', 'Calculamos ' + M('A^2') + ' y observamos que ' + M('A^3=I') + ' (' + M('A') + ' es una permutación de las filas):'),
            F(r`A^2=\begin{pmatrix}0&1&0\\0&0&1\\1&0&0\end{pmatrix},\qquad A^2\cdot A=I\ \Longrightarrow\ (A^2)^{-1}=A`),
            p('Aïllem ' + M('X') + ':', 'Despejamos ' + M('X') + ':'),
            F(r`X=(A^2)^{-1}(A-3I)=A(A-3I)=A^2-3A`),
            AN(r`X=\begin{pmatrix}0&1&-3\\-3&0&1\\1&-3&0\end{pmatrix}`),
          ] },
        { n: '5.2', pts: 1.25, q: S('Una matriu quadrada ' + M('M') + ' satisfà que ' + M('M^3-3M^2+3M-I=0') + ', en què ' + M('I') + ' és la matriu identitat. Justifiqueu que ' + M('M') + ' és invertible i expresseu la inversa de ' + M('M') + ' en funció de les matrius ' + M('M') + ' i ' + M('I') + '.', 'Una matriz cuadrada ' + M('M') + ' satisface que ' + M('M^3-3M^2+3M-I=0') + ', en la que ' + M('I') + ' es la matriz identidad. Justifique que ' + M('M') + ' es invertible y exprese la inversa de ' + M('M') + ' en función de las matrices ' + M('M') + ' e ' + M('I') + '.'),
          sol: [
            p('Passem ' + M('I') + ' a l\u2019altre membre i traiem factor comú ' + M('M') + ':', 'Pasamos ' + M('I') + ' al otro miembro y sacamos factor común ' + M('M') + ':'),
            F(r`M^3-3M^2+3M=I\ \Longrightarrow\ M\,(M^2-3M+3I)=I`),
            p('Com que ' + M('M') + ' i ' + M('M^2-3M+3I') + ' commuten (són polinomis de ' + M('M') + '), també ' + M('(M^2-3M+3I)\\,M=I') + '. Existeix una matriu que multiplicada per ' + M('M') + ' dóna ' + M('I') + ': ' + M('M') + ' és invertible.', 'Como ' + M('M') + ' y ' + M('M^2-3M+3I') + ' conmutan (son polinomios de ' + M('M') + '), también ' + M('(M^2-3M+3I)\\,M=I') + '. Existe una matriz que multiplicada por ' + M('M') + ' da ' + M('I') + ': ' + M('M') + ' es invertible.'),
            AN(r`M^{-1}=M^2-3M+3I`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M('f(x)=e^{x-1}-x-1') + '.', 'Considere la función ' + M('f(x)=e^{x-1}-x-1') + '.'),
      parts: [
        { n: '6.1', pts: 1.25, q: S('Estudieu-ne la continuïtat, els extrems relatius i els intervals de creixement i decreixement.', 'Estudie su continuidad, los extremos relativos y los intervalos de crecimiento y decrecimiento.'),
          sol: [
            p('La funció és suma de l\u2019exponencial i d\u2019un polinomi: és <b>contínua (i derivable) a tot ℝ</b>.', 'La función es suma de la exponencial y de un polinomio: es <b>continua (y derivable) en todo ℝ</b>.'),
            F(r`f'(x)=e^{x-1}-1=0\ \Longrightarrow\ e^{x-1}=1\ \Longrightarrow\ x=1`),
            ul(S(M("f'<0") + ' si ' + M('x<1') + ': <b>decreixent</b> a ' + M('(-\\infty,1)') + '.', M("f'<0") + ' si ' + M('x<1') + ': <b>decreciente</b> en ' + M('(-\\infty,1)') + '.'),
              S(M("f'>0") + ' si ' + M('x>1') + ': <b>creixent</b> a ' + M('(1,+\\infty)') + '.', M("f'>0") + ' si ' + M('x>1') + ': <b>creciente</b> en ' + M('(1,+\\infty)') + '.')),
            ans('<b>Mínim relatiu</b> (i absolut) al punt ' + M('(1,-1)') + '.', '<b>Mínimo relativo</b> (y absoluto) en el punto ' + M('(1,-1)') + '.'),
          ] },
        { n: '6.2', pts: 1.25, q: S('Demostreu que l\u2019equació ' + M('f(x)=0') + ' té exactament dues solucions entre ' + M('x=-1') + ' i ' + M('x=3') + '.', 'Demuestre que la ecuación ' + M('f(x)=0') + ' tiene exactamente dos soluciones entre ' + M('x=-1') + ' y ' + M('x=3') + '.'),
          sol: [
            p('Valors als extrems i al mínim:', 'Valores en los extremos y en el mínimo:'),
            F(r`f(-1)=e^{-2}>0,\qquad f(1)=-1<0,\qquad f(3)=e^2-4>0`),
            ul(S('A ' + M('[-1,1]') + ' ' + M('f') + ' és contínua, estrictament decreixent i canvia de signe: pel teorema de Bolzano hi ha <b>una única</b> arrel.', 'En ' + M('[-1,1]') + ' ' + M('f') + ' es continua, estrictamente decreciente y cambia de signo: por el teorema de Bolzano hay <b>una única</b> raíz.'),
              S('A ' + M('[1,3]') + ' és contínua, estrictament creixent i canvia de signe: <b>una única</b> arrel.', 'En ' + M('[1,3]') + ' es continua, estrictamente creciente y cambia de signo: <b>una única</b> raíz.')),
            ans('En total, <b>exactament dues solucions</b> a ' + M('(-1,3)') + '.', 'En total, <b>exactamente dos soluciones</b> en ' + M('(-1,3)') + '.'),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 (ordinària) ───────────────────────── */
const logSvg = '<svg class="pp" viewBox="0 0 220 170" role="img" aria-label="Secció circular del tronc amb un rectangle inscrit de base x i altura y; la diagonal és el diàmetre d"><circle class="c3" cx="110" cy="85" r="68"/><rect class="c1" x="68" y="38.5" width="84" height="93" fill="none"/><path class="dsh" d="M68,131.5L152,38.5"/><text class="lb" x="104" y="92" text-anchor="end">d</text><text class="lb" x="110" y="146" text-anchor="middle">x</text><text class="lb" x="160" y="88">y</text></svg>';
const prismSvg = '<svg class="pp" viewBox="0 0 240 180" role="img" aria-label="Tres plans que es tallen dos a dos en rectes paral·leles: prisma triangular"><polygon class="fl" points="60,140 180,140 120,40"/><path class="c1" d="M30,140H210"/><path class="c2" d="M102,10L192,160"/><path class="c3" d="M138,10L48,160" stroke-width="2.2"/><text class="lb" x="214" y="144">π₁</text><text class="lb" x="84" y="14">π₂</text><text class="lb" x="144" y="14">π₃</text></svg>';

const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2021-mates-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.ma,
      intro: p('Considereu les matrius ' + M('A=\\begin{pmatrix}2&1\\\\-3&4\\end{pmatrix}') + ', ' + M('B=\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}') + ' i ' + M('C=\\begin{pmatrix}5&1\\\\0&7\\end{pmatrix}') + '.', 'Considere las matrices ' + M('A=\\begin{pmatrix}2&1\\\\-3&4\\end{pmatrix}') + ', ' + M('B=\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}') + ' y ' + M('C=\\begin{pmatrix}5&1\\\\0&7\\end{pmatrix}') + '.'),
      parts: [
        { n: '1.1', pts: 1.25, q: S('Raoneu que la matriu ' + M('B') + ' és invertible i després calculeu ' + M('B^{-1}') + '.', 'Razone que la matriz ' + M('B') + ' es invertible y después calcule ' + M('B^{-1}') + '.'),
          sol: [
            p(M('|B|=1\\cdot0-1\\cdot1=-1\\neq0') + ': <b>' + M('B') + ' és invertible</b>.', M('|B|=1\\cdot0-1\\cdot1=-1\\neq0') + ': <b>' + M('B') + ' es invertible</b>.'),
            F(r`B^{-1}=\dfrac1{|B|}\,\operatorname{Adj}(B)^t=\dfrac1{-1}\begin{pmatrix}0&-1\\-1&1\end{pmatrix}`),
            AN(r`B^{-1}=\begin{pmatrix}0&1\\1&-1\end{pmatrix}`),
          ] },
        { n: '1.2', pts: 1.25, q: S('Calculeu la matriu ' + M('X') + ' que satisfà la igualtat ' + M('A+B\\cdot X=C\\cdot A') + '.', 'Calcule la matriz ' + M('X') + ' que satisface la igualdad ' + M('A+B\\cdot X=C\\cdot A') + '.'),
          sol: [
            p('Aïllem ' + M('X') + ' multiplicant per ' + M('B^{-1}') + ' per l\u2019esquerra:', 'Despejamos ' + M('X') + ' multiplicando por ' + M('B^{-1}') + ' por la izquierda:'),
            F(r`X=B^{-1}(CA-A)=B^{-1}(C-I)A`),
            F(r`(C-I)A=\begin{pmatrix}4&1\\0&6\end{pmatrix}\begin{pmatrix}2&1\\-3&4\end{pmatrix}=\begin{pmatrix}5&8\\-18&24\end{pmatrix}`),
            F(r`X=\begin{pmatrix}0&1\\1&-1\end{pmatrix}\begin{pmatrix}5&8\\-18&24\end{pmatrix}`),
            AN(r`X=\begin{pmatrix}-18&24\\23&-16\end{pmatrix}`),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.pa,
      intro: p('Siguin les funcions ' + M('f(x)=x^3-9x') + ' i ' + M('g(x)=7x') + '.', 'Sean las funciones ' + M('f(x)=x^3-9x') + ' y ' + M('g(x)=7x') + '.'),
      parts: [
        { n: '2.1', pts: 1.25, q: S('Estudieu els intervals de creixement i decreixement de ' + M('f(x)') + '.', 'Estudie los intervalos de crecimiento y decrecimiento de ' + M('f(x)') + '.'),
          sol: [
            F(r`f'(x)=3x^2-9=0\ \Longrightarrow\ x=\pm\sqrt3`),
            ul(S(M("f'>0") + ' si ' + M('x<-\\sqrt3') + ' o ' + M('x>\\sqrt3') + ': <b>creixent</b>.', M("f'>0") + ' si ' + M('x<-\\sqrt3') + ' o ' + M('x>\\sqrt3') + ': <b>creciente</b>.'),
              S(M("f'<0") + ' si ' + M('-\\sqrt3<x<\\sqrt3') + ': <b>decreixent</b>.', M("f'<0") + ' si ' + M('-\\sqrt3<x<\\sqrt3') + ': <b>decreciente</b>.')),
            ans('Creixent a ' + M('(-\\infty,-\\sqrt3)\\cup(\\sqrt3,+\\infty)') + ' i decreixent a ' + M('(-\\sqrt3,\\sqrt3)') + ' (màxim a ' + M('x=-\\sqrt3') + ', mínim a ' + M('x=\\sqrt3') + ').', 'Creciente en ' + M('(-\\infty,-\\sqrt3)\\cup(\\sqrt3,+\\infty)') + ' y decreciente en ' + M('(-\\sqrt3,\\sqrt3)') + ' (máximo en ' + M('x=-\\sqrt3') + ', mínimo en ' + M('x=\\sqrt3') + ').'),
          ] },
        { n: '2.2', pts: 1.25, q: S('Calculeu l\u2019àrea de la regió del semiplà ' + M('x\\geq0') + ' compresa entre les gràfiques de ' + M('f(x)') + ' i ' + M('g(x)') + '.', 'Calcule el área de la región del semiplano ' + M('x\\geq0') + ' comprendida entre las gráficas de ' + M('f(x)') + ' y ' + M('g(x)') + '.'),
          sol: [
            p('Punts de tall: ' + M('x^3-9x=7x') + ' ⇒ ' + M('x(x^2-16)=0') + ' ⇒ ' + M('x=0') + ' o ' + M('x=4') + ' (a ' + M('x\\geq0') + '). A ' + M('(0,4)') + ' la recta és per sobre de la cúbica (' + M('g(2)=14>f(2)=-10') + ').', 'Puntos de corte: ' + M('x^3-9x=7x') + ' ⇒ ' + M('x(x^2-16)=0') + ' ⇒ ' + M('x=0') + ' o ' + M('x=4') + ' (en ' + M('x\\geq0') + '). En ' + M('(0,4)') + ' la recta está por encima de la cúbica (' + M('g(2)=14>f(2)=-10') + ').'),
            F(r`A=\int_0^4(16x-x^3)\,dx=\left[8x^2-\dfrac{x^4}{4}\right]_0^4=128-64`),
            AN(r`A=64\ u^2`),
            fig(plot({ xr: [-1, 5], yr: [-22, 70], tickx: [2, 4], ticky: [], curves: [{ f: x => x ** 3 - 9 * x, dom: [-1, 4.4], k: 0 }, { f: x => 7 * x, dom: [-1, 5], k: 1 }],
              fill: { f: x => 7 * x, g: x => x ** 3 - 9 * x, a: 0, b: 4 }, points: [[0, 0], [4, 28]], labels: [[2.4, 14, 'A = 64'], [4.1, 22, 'g'], [3.4, 52, 'f']], alt: 'Gràfiques de f(x) = x³ − 9x i g(x) = 7x amb la regió entre x = 0 i x = 4' })),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ge,
      intro: p('Considereu els punts de l\u2019espai tridimensional ' + M('A=(1,a,1)') + ', ' + M('B=(a,1,2)') + ', ' + M('C=(1,1,1)') + ' i ' + M('D=(0,0,0)') + ', en què ' + M('a') + ' és un paràmetre real.', 'Considere los puntos del espacio tridimensional ' + M('A=(1,a,1)') + ', ' + M('B=(a,1,2)') + ', ' + M('C=(1,1,1)') + ' y ' + M('D=(0,0,0)') + ', en los que ' + M('a') + ' es un parámetro real.'),
      parts: [
        { n: '3.1', pts: 1.25, q: S('Determineu el valor del paràmetre ' + M('a') + ' per al qual els punts són diferents i coplanaris (és a dir, que hi ha un pla que els conté).', 'Determine el valor del parámetro ' + M('a') + ' para el que los puntos son distintos y coplanarios (es decir, que hay un plano que los contiene).'),
          sol: [
            p('Són coplanaris si els vectors ' + M('\\vec{DA},\\vec{DB},\\vec{DC}') + ' tenen determinant nul:', 'Son coplanarios si los vectores ' + M('\\vec{DA},\\vec{DB},\\vec{DC}') + ' tienen determinante nulo:'),
            F(r`\begin{vmatrix}1&a&1\\a&1&2\\1&1&1\end{vmatrix}=-a^2+3a-2=-(a-1)(a-2)=0`),
            p('Surt ' + M('a=1') + ' o ' + M('a=2') + '. Si ' + M('a=1') + ': ' + M('A=(1,1,1)=C') + ', els punts no són diferents. Si ' + M('a=2') + ': ' + M('A=(1,2,1),\\ B=(2,1,2),\\ C=(1,1,1),\\ D=(0,0,0)') + ' són quatre punts diferents.', 'Sale ' + M('a=1') + ' o ' + M('a=2') + '. Si ' + M('a=1') + ': ' + M('A=(1,1,1)=C') + ', los puntos no son distintos. Si ' + M('a=2') + ': ' + M('A=(1,2,1),\\ B=(2,1,2),\\ C=(1,1,1),\\ D=(0,0,0)') + ' son cuatro puntos distintos.'),
            AN(r`a=2`),
          ] },
        { n: '3.2', pts: 1.25, q: S('Per al valor ' + M('a=2') + ', calculeu l\u2019àrea del triangle de vèrtexs ' + M('A') + ', ' + M('B') + ' i ' + M('C') + '. <i>Nota: l\u2019àrea del triangle definit pels vectors ' + M('\\vec v') + ' i ' + M('\\vec w') + ' és ' + M('\\tfrac12|\\vec v\\times\\vec w|') + '.</i>', 'Para el valor ' + M('a=2') + ', calcule el área del triángulo de vértices ' + M('A') + ', ' + M('B') + ' y ' + M('C') + '. <i>Nota: el área del triángulo definido por los vectores ' + M('\\vec v') + ' y ' + M('\\vec w') + ' es ' + M('\\tfrac12|\\vec v\\times\\vec w|') + '.</i>'),
          sol: [
            F(r`\vec{AB}=(1,-1,1),\qquad \vec{AC}=(0,-1,0)`),
            F(r`\vec{AB}\times\vec{AC}=\begin{vmatrix}\vec i&\vec j&\vec k\\1&-1&1\\0&-1&0\end{vmatrix}=(1,\,0,\,-1)`),
            F(r`A=\dfrac12\sqrt{1^2+0^2+(-1)^2}`),
            AN(r`A=\dfrac{\sqrt2}{2}\ u^2\approx0{,}71\ u^2`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op,
      intro: J(p('La resistència al trencament ' + M('R') + ' d\u2019una biga de secció rectangular de base ' + M('x') + ' i altura ' + M('y') + ' és directament proporcional al producte ' + M('xy^2') + '; per tant, ' + M('R=kxy^2') + ', en què ' + M('k') + ' és una constant positiva. Disposem d\u2019un tronc de fusta en forma de cilindre de diàmetre ' + M('d') + ', com el de la figura.', 'La resistencia a la rotura ' + M('R') + ' de una viga de sección rectangular de base ' + M('x') + ' y altura ' + M('y') + ' es directamente proporcional al producto ' + M('xy^2') + '; por tanto, ' + M('R=kxy^2') + ', en la que ' + M('k') + ' es una constante positiva. Disponemos de un tronco de madera en forma de cilindro de diámetro ' + M('d') + ', como el de la figura.'),
        fig(logSvg)),
      parts: [
        { n: '4.1', pts: 1.25, q: S('Comproveu que la resistència ' + M('R') + ' de la biga rectangular de base ' + M('x') + ' que podem construir amb aquest tronc ve donada per l\u2019expressió ' + M('R=kx(d^2-x^2)') + '.', 'Compruebe que la resistencia ' + M('R') + ' de la viga rectangular de base ' + M('x') + ' que podemos construir con este tronco viene dada por la expresión ' + M('R=kx(d^2-x^2)') + '.'),
          sol: [
            p('El rectangle queda inscrit a la circumferència: la seva diagonal és el diàmetre ' + M('d') + '. Pel teorema de Pitàgores:', 'El rectángulo queda inscrito en la circunferencia: su diagonal es el diámetro ' + M('d') + '. Por el teorema de Pitágoras:'),
            F(r`x^2+y^2=d^2\ \Longrightarrow\ y^2=d^2-x^2`),
            p('Substituïm a ' + M('R=kxy^2') + ':', 'Sustituimos en ' + M('R=kxy^2') + ':'),
            AN(r`R(x)=kx\,(d^2-x^2)`),
          ] },
        { n: '4.2', pts: 1.25, q: S('Calculeu les dimensions de la biga rectangular de resistència màxima que podem construir a partir d\u2019aquest tronc i calculeu aquesta resistència màxima.', 'Calcule las dimensiones de la viga rectangular de resistencia máxima que podemos construir a partir de este tronco y calcule esa resistencia máxima.'),
          sol: [
            F(r`R(x)=k(d^2x-x^3),\quad 0<x<d`),
            F(r`R'(x)=k(d^2-3x^2)=0\ \Longrightarrow\ x=\dfrac{d}{\sqrt3}=\dfrac{\sqrt3}{3}\,d`),
            p(M("R''(x)=-6kx<0") + ': és un <b>màxim</b>. L\u2019altura és:', M("R''(x)=-6kx<0") + ': es un <b>máximo</b>. La altura es:'),
            F(r`y^2=d^2-\dfrac{d^2}3=\dfrac{2d^2}3\ \Longrightarrow\ y=\dfrac{\sqrt6}{3}\,d`),
            F(r`R_{\max}=k\,\dfrac{d}{\sqrt3}\cdot\dfrac{2d^2}{3}=\dfrac{2\sqrt3}{9}\,k\,d^3`),
            ans('Base ' + M('x=\\dfrac{\\sqrt3}{3}d\\approx0{,}58\\,d') + ', altura ' + M('y=\\dfrac{\\sqrt6}{3}d\\approx0{,}82\\,d') + ' i ' + M('R_{\\max}=\\dfrac{2\\sqrt3}{9}kd^3') + '.', 'Base ' + M('x=\\dfrac{\\sqrt3}{3}d\\approx0{,}58\\,d') + ', altura ' + M('y=\\dfrac{\\sqrt6}{3}d\\approx0{,}82\\,d') + ' y ' + M('R_{\\max}=\\dfrac{2\\sqrt3}{9}kd^3') + '.'),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent, que depèn del paràmetre real ' + M('a') + ':', 'Considere el sistema de ecuaciones lineales siguiente, que depende del parámetro real ' + M('a') + ':'),
        F(r`\begin{cases}x+2y+az=8\\2x+y-az=1\\3x-3az=1\end{cases}`)),
      parts: [
        { n: '5.1', pts: 1.25, q: S('Comproveu que, per a qualsevol valor del paràmetre ' + M('a') + ', el sistema d\u2019equacions lineals no té solució.', 'Compruebe que, para cualquier valor del parámetro ' + M('a') + ', el sistema de ecuaciones lineales no tiene solución.'),
          sol: [
            p('Mirem si la tercera equació és combinació de les altres dues: ' + M('E_3=-E_1+2E_2') + ' als coeficients:', 'Miramos si la tercera ecuación es combinación de las otras dos: ' + M('E_3=-E_1+2E_2') + ' en los coeficientes:'),
            F(r`-(1,2,a)+2(2,1,-a)=(3,0,-3a)`),
            p('Per tant ' + M('\\operatorname{rg}\\,A=2') + ' per a tot ' + M('a') + ' (les dues primeres files no són proporcionals). Però als termes independents:', 'Por tanto ' + M('\\operatorname{rg}\\,A=2') + ' para todo ' + M('a') + ' (las dos primeras filas no son proporcionales). Pero en los términos independientes:'),
            F(r`-8+2\cdot1=-6\neq1\ \Longrightarrow\ \operatorname{rg}\,A^*=3`),
            ans(M('\\operatorname{rg}\\,A=2\\neq3=\\operatorname{rg}\\,A^*') + ' per a tot ' + M('a') + ': <b>sistema incompatible</b>.', M('\\operatorname{rg}\\,A=2\\neq3=\\operatorname{rg}\\,A^*') + ' para todo ' + M('a') + ': <b>sistema incompatible</b>.'),
          ] },
        { n: '5.2', pts: 1.25, q: S('Interpreteu geomètricament el sistema d\u2019equacions lineals. Feu un dibuix esquemàtic que representi la posició relativa dels tres plans.', 'Interprete geométricamente el sistema de ecuaciones lineales. Haga un dibujo esquemático que represente la posición relativa de los tres planos.'),
          sol: [
            p('Cada equació és un pla. Com que ' + M('\\operatorname{rg}\\,A=2') + ' i ' + M('\\operatorname{rg}\\,A^*=3') + ', els tres plans no tenen cap punt en comú. A més, cap parell de plans és paral·lel (cap parell de files de ' + M('A') + ' és proporcional), per tant es tallen dos a dos.', 'Cada ecuación es un plano. Como ' + M('\\operatorname{rg}\\,A=2') + ' y ' + M('\\operatorname{rg}\\,A^*=3') + ', los tres planos no tienen ningún punto en común. Además, ningún par de planos es paralelo (ningún par de filas de ' + M('A') + ' es proporcional), por tanto se cortan dos a dos.'),
            ans('Els tres plans es tallen dos a dos en tres rectes paral·leles entre si: <b>prisma triangular</b> (posició relativa «en prisma»).', 'Los tres planos se cortan dos a dos en tres rectas paralelas entre sí: <b>prisma triangular</b> (posición relativa «en prisma»).'),
            fig(prismSvg),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.an,
      parts: [
        { n: '6.1', pts: 1.25, q: S('Sigui ' + M('f(x)=2x^3+mx^2+nx+p') + ' una funció que té dos extrems relatius en ' + M('x=-3') + ' i en ' + M('x=1') + ' i que passa pel punt ' + M('(3,4)') + '. Calculeu els valors de ' + M('m') + ', ' + M('n') + ' i ' + M('p') + '.', 'Sea ' + M('f(x)=2x^3+mx^2+nx+p') + ' una función que tiene dos extremos relativos en ' + M('x=-3') + ' y en ' + M('x=1') + ' y que pasa por el punto ' + M('(3,4)') + '. Calcule los valores de ' + M('m') + ', ' + M('n') + ' y ' + M('p') + '.'),
          sol: [
            F(r`f'(x)=6x^2+2mx+n`),
            p('Extrems en ' + M('x=-3') + ' i ' + M('x=1') + ': ' + M("f'(-3)=0") + ' i ' + M("f'(1)=0") + '.', 'Extremos en ' + M('x=-3') + ' y ' + M('x=1') + ': ' + M("f'(-3)=0") + ' y ' + M("f'(1)=0") + '.'),
            F(r`\begin{cases}54-6m+n=0\\6+2m+n=0\end{cases}\ \Longrightarrow\ 48-8m=0\ \Longrightarrow\ m=6,\quad n=-18`),
            p('Passa per ' + M('(3,4)') + ': ' + M('f(3)=54+9m+3n+p=54+54-54+p=4') + ' ⇒ ' + M('p=-50') + '.', 'Pasa por ' + M('(3,4)') + ': ' + M('f(3)=54+9m+3n+p=54+54-54+p=4') + ' ⇒ ' + M('p=-50') + '.'),
            AN(r`m=6,\quad n=-18,\quad p=-50`),
          ] },
        { n: '6.2', pts: 1.25, q: S('Calculeu l\u2019equació de la recta tangent a la funció ' + M('f(x)=\\dfrac{1-x}{1+x}') + ' en ' + M('x=-3') + '.', 'Calcule la ecuación de la recta tangente a la función ' + M('f(x)=\\dfrac{1-x}{1+x}') + ' en ' + M('x=-3') + '.'),
          sol: [
            F(r`f(-3)=\dfrac{4}{-2}=-2`),
            F(r`f'(x)=\dfrac{-(1+x)-(1-x)}{(1+x)^2}=\dfrac{-2}{(1+x)^2}\ \Longrightarrow\ f'(-3)=-\dfrac12`),
            F(r`y+2=-\dfrac12\,(x+3)`),
            AN(r`y=-\dfrac12\,x-\dfrac72`),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 1 (extraordinària) ───────────────────────── */
const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2021-mates-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent, que depèn del paràmetre real ' + M('k') + ':', 'Considere el sistema de ecuaciones lineales siguiente, que depende del parámetro real ' + M('k') + ':'),
        F(r`\begin{cases}x+ky+z=3+k\\kx+y+z=4\\x+3y+z=5\end{cases}`)),
      parts: [
        { n: '1.1', pts: 1.25, q: S('Discutiu el sistema per als diferents valors del paràmetre ' + M('k') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('k') + '.'),
          sol: [
            F(r`|A|=\begin{vmatrix}1&k&1\\k&1&1\\1&3&1\end{vmatrix}=-k^2+4k-3=-(k-1)(k-3)`),
            ul(S('Si ' + M('k\\neq1,3') + ': <b>compatible determinat</b>.', 'Si ' + M('k\\neq1,3') + ': <b>compatible determinado</b>.'),
              S('Si ' + M('k=1') + ': les dues primeres equacions són iguals (' + M('x+y+z=4') + ') i la tercera és diferent: ' + M('\\operatorname{rg}\\,A=\\operatorname{rg}\\,A^*=2<3') + ' ⇒ <b>compatible indeterminat</b>.', 'Si ' + M('k=1') + ': las dos primeras ecuaciones son iguales (' + M('x+y+z=4') + ') y la tercera es distinta: ' + M('\\operatorname{rg}\\,A=\\operatorname{rg}\\,A^*=2<3') + ' ⇒ <b>compatible indeterminado</b>.'),
              S('Si ' + M('k=3') + ': la primera i la tercera tenen els mateixos coeficients (' + M('x+3y+z') + ') però termes independents diferents (' + M('6') + ' i ' + M('5') + '): <b>incompatible</b>.', 'Si ' + M('k=3') + ': la primera y la tercera tienen los mismos coeficientes (' + M('x+3y+z') + ') pero términos independientes distintos (' + M('6') + ' y ' + M('5') + '): <b>incompatible</b>.')),
          ] },
        { n: '1.2', pts: 1.25, q: S('Resoleu, si és possible, el sistema per al cas ' + M('k=1') + ', i feu-ne una interpretació geomètrica.', 'Resuelva, si es posible, el sistema para el caso ' + M('k=1') + ', y haga una interpretación geométrica.'),
          sol: [
            p('Amb ' + M('k=1') + ' queden dues equacions independents:', 'Con ' + M('k=1') + ' quedan dos ecuaciones independientes:'),
            F(r`\begin{cases}x+y+z=4\\x+3y+z=5\end{cases}`),
            p('Restant: ' + M('2y=1') + ' ⇒ ' + M('y=\\tfrac12') + '. Llavors ' + M('x+z=\\tfrac72') + '.', 'Restando: ' + M('2y=1') + ' ⇒ ' + M('y=\\tfrac12') + '. Entonces ' + M('x+z=\\tfrac72') + '.'),
            AN(r`(x,y,z)=\left(\tfrac72-t,\ \tfrac12,\ t\right),\quad t\in\mathbb R`),
            p('<b>Interpretació:</b> les dues primeres equacions representen el mateix pla; el tercer pla el talla: els tres plans tenen en comú una <b>recta</b> (de direcció ' + M('(-1,0,1)') + ').', '<b>Interpretación:</b> las dos primeras ecuaciones representan el mismo plano; el tercer plano lo corta: los tres planos tienen en común una <b>recta</b> (de dirección ' + M('(-1,0,1)') + ').'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.pa,
      parts: [
        { n: '2.1', pts: 1.25, q: S('Donada la funció ' + M('f(x)=\\dfrac4x') + ', calculeu l\u2019equació de la recta tangent a ' + M('y=f(x)') + ' en el punt d\u2019abscissa ' + M('x=1') + '. Trobeu també l\u2019equació de la recta normal a ' + M('y=f(x)') + ' en aquest mateix punt.', 'Dada la función ' + M('f(x)=\\dfrac4x') + ', calcule la ecuación de la recta tangente a ' + M('y=f(x)') + ' en el punto de abscisa ' + M('x=1') + '. Halle también la ecuación de la recta normal a ' + M('y=f(x)') + ' en ese mismo punto.'),
          sol: [
            F(r`f(1)=4,\qquad f'(x)=-\dfrac4{x^2}\ \Longrightarrow\ f'(1)=-4`),
            F(r`y-4=-4(x-1)\ \Longrightarrow\ y=-4x+8`),
            p('La normal és perpendicular a la tangent: pendent ' + M('-1/(-4)=\\tfrac14') + '.', 'La normal es perpendicular a la tangente: pendiente ' + M('-1/(-4)=\\tfrac14') + '.'),
            F(r`y-4=\tfrac14(x-1)`),
            ans('Tangent: ' + M('y=-4x+8') + '. Normal: ' + M('y=\\dfrac x4+\\dfrac{15}4') + ', és a dir ' + M('x-4y+15=0') + '.', 'Tangente: ' + M('y=-4x+8') + '. Normal: ' + M('y=\\dfrac x4+\\dfrac{15}4') + ', es decir ' + M('x-4y+15=0') + '.'),
          ] },
        { n: '2.2', pts: 1.25, q: S('Feu un esbós de les gràfiques de la corba ' + M('y=f(x)') + ' i de la recta ' + M('4x+y=8') + ', i calculeu l\u2019àrea delimitada per aquestes dues gràfiques, l\u2019eix de les abscisses i la recta vertical ' + M('x=3') + '.', 'Haga un esbozo de las gráficas de la curva ' + M('y=f(x)') + ' y de la recta ' + M('4x+y=8') + ', y calcule el área delimitada por estas dos gráficas, el eje de abscisas y la recta vertical ' + M('x=3') + '.'),
          sol: [
            p('La recta ' + M('4x+y=8') + ' és la tangent de l\u2019apartat anterior: toca la hipèrbola a ' + M('(1,4)') + ' i talla l\u2019eix ' + M('OX') + ' a ' + M('x=2') + '. Com que ' + M('f') + ' és convexa a ' + M('x>0') + ', la corba queda per sobre de la tangent.', 'La recta ' + M('4x+y=8') + ' es la tangente del apartado anterior: toca la hipérbola en ' + M('(1,4)') + ' y corta el eje ' + M('OX') + ' en ' + M('x=2') + '. Como ' + M('f') + ' es convexa en ' + M('x>0') + ', la curva queda por encima de la tangente.'),
            p('La regió va de ' + M('x=1') + ' a ' + M('x=3') + ': entre la hipèrbola i la tangent fins a ' + M('x=2') + ', i entre la hipèrbola i l\u2019eix ' + M('OX') + ' de ' + M('x=2') + ' a ' + M('x=3') + '.', 'La región va de ' + M('x=1') + ' a ' + M('x=3') + ': entre la hipérbola y la tangente hasta ' + M('x=2') + ', y entre la hipérbola y el eje ' + M('OX') + ' de ' + M('x=2') + ' a ' + M('x=3') + '.'),
            F(r`A=\int_1^2\left(\dfrac4x-(8-4x)\right)dx+\int_2^3\dfrac4x\,dx=\Big[4\ln x-8x+2x^2\Big]_1^2+4\ln\dfrac32`),
            F(r`A=(4\ln2-2)+(4\ln3-4\ln2)`),
            AN(r`A=4\ln3-2\ \approx\ 2{,}39\ u^2`),
            fig(plot({ xr: [0, 3.8], yr: [-1, 9], tickx: [1, 2, 3], ticky: [4], curves: [{ f: x => 4 / x, dom: [0.42, 3.8], k: 0 }, { f: x => 8 - 4 * x, dom: [0, 3.4], k: 1 }], vlines: [3],
              fill: { f: x => 4 / x, g: x => Math.max(0, 8 - 4 * x), a: 1, b: 3 }, points: [[1, 4]], labels: [[2.1, 3.2, 'A'], [0.45, 8.3, '4x + y = 8'], [1.5, 1.5, '4/x']], alt: 'Gràfiques de y = 4/x i de la recta 4x + y = 8 amb l\u2019àrea entre x = 1 i x = 3' })),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ge,
      intro: p('En ' + M('\\mathbb R^3') + ' es donen els punts ' + M('A=(3,1,1)') + ', ' + M('B=(0,0,1)') + ', ' + M('C=(4,1,2)') + ' i ' + M('D=(1,1,t)') + ', en què ' + M('t') + ' és un valor real.', 'En ' + M('\\mathbb R^3') + ' se dan los puntos ' + M('A=(3,1,1)') + ', ' + M('B=(0,0,1)') + ', ' + M('C=(4,1,2)') + ' y ' + M('D=(1,1,t)') + ', en los que ' + M('t') + ' es un valor real.'),
      parts: [
        { n: '3.1', pts: 1, q: S('Per a quin valor de ' + M('t') + ' els quatre punts són coplanaris?', '¿Para qué valor de ' + M('t') + ' los cuatro puntos son coplanarios?'),
          sol: [
            F(r`\vec{AB}=(-3,-1,0),\quad \vec{AC}=(1,0,1),\quad \vec{AD}=(-2,0,t-1)`),
            p('Coplanaris ⇔ determinant nul:', 'Coplanarios ⇔ determinante nulo:'),
            F(r`\begin{vmatrix}-3&-1&0\\1&0&1\\-2&0&t-1\end{vmatrix}=t+1=0`),
            AN(r`t=-1`),
          ] },
        { n: '3.2', pts: 1.5, q: S('Trobeu el valor de ' + M('t') + ' per tal que el tetraedre (irregular) que formen els quatre punts tingui un volum de ' + M('5\\,u^3') + '. <i>Nota: el volum d\u2019un tetraedre definit pels vectors ' + M('\\vec v_1,\\vec v_2,\\vec v_3') + ' és ' + M('V=\\tfrac16|\\det(\\vec v_1,\\vec v_2,\\vec v_3)|') + '.</i>', 'Halle el valor de ' + M('t') + ' para que el tetraedro (irregular) que forman los cuatro puntos tenga un volumen de ' + M('5\\,u^3') + '. <i>Nota: el volumen de un tetraedro definido por los vectores ' + M('\\vec v_1,\\vec v_2,\\vec v_3') + ' es ' + M('V=\\tfrac16|\\det(\\vec v_1,\\vec v_2,\\vec v_3)|') + '.</i>'),
          sol: [
            F(r`V=\dfrac16\,|t+1|=5\ \Longrightarrow\ |t+1|=30`),
            AN(r`t=29\quad\text{o}\quad t=-31`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.an,
      intro: J(p('La figura mostra la gràfica d\u2019una funció ' + M('f(x)') + '.', 'La figura muestra la gráfica de una función ' + M('f(x)') + '.'),
        fig(plot({ xr: [-0.9, 1.9], yr: [-0.6, 1.5], tickx: [1], ticky: [], curves: [{ f: x => (x - 1) ** 2 * (x + 0.5), dom: [-0.7, 1.8], k: 0 }],
            points: [[-0.5, 0], [0, 0.5], [1, 0]], labels: [[0.05, 0.58, 'y = f(x)']], alt: 'Gràfica de f: talla l\u2019eix a x = −0,5, té un màxim relatiu a x = 0 i un mínim tangent a l\u2019eix a x = 1' }))),
      parts: [
        { n: '4.1', pts: 1.25,
          q: S('En la figura es mostra la gràfica de la funció ' + M('f(x)') + '. Representeu de manera esquemàtica la gràfica de la funció derivada de ' + M('f(x)') + '. Expliqueu el raonament que heu seguit.', 'En la figura se muestra la gráfica de la función ' + M('f(x)') + '. Represente de manera esquemática la gráfica de la función derivada de ' + M('f(x)') + '. Explique el razonamiento que ha seguido.'),
          sol: [
            p('De la gràfica de ' + M('f') + ' llegim:', 'De la gráfica de ' + M('f') + ' leemos:'),
            ul(S(M('f') + ' és <b>creixent</b> abans de ' + M('x=0') + ' ⇒ ' + M("f'>0") + '.', M('f') + ' es <b>creciente</b> antes de ' + M('x=0') + ' ⇒ ' + M("f'>0") + '.'),
              S('A ' + M('x=0') + ' hi ha un <b>màxim relatiu</b> ⇒ ' + M("f'(0)=0") + '.', 'En ' + M('x=0') + ' hay un <b>máximo relativo</b> ⇒ ' + M("f'(0)=0") + '.'),
              S('Entre ' + M('0') + ' i ' + M('1') + ' ' + M('f') + ' és <b>decreixent</b> ⇒ ' + M("f'<0") + '.', 'Entre ' + M('0') + ' y ' + M('1') + ' ' + M('f') + ' es <b>decreciente</b> ⇒ ' + M("f'<0") + '.'),
              S('A ' + M('x=1') + ' hi ha un <b>mínim relatiu</b> ⇒ ' + M("f'(1)=0") + '.', 'En ' + M('x=1') + ' hay un <b>mínimo relativo</b> ⇒ ' + M("f'(1)=0") + '.'),
              S('Després de ' + M('x=1') + ' torna a ser <b>creixent</b> ⇒ ' + M("f'>0") + '.', 'Después de ' + M('x=1') + ' vuelve a ser <b>creciente</b> ⇒ ' + M("f'>0") + '.')),
            ans('La derivada és una corba amb forma de «U» (com una paràbola) que s\u2019anul·la a ' + M('x=0') + ' i ' + M('x=1') + ', negativa entre tots dos i positiva fora.', 'La derivada es una curva en forma de «U» (como una parábola) que se anula en ' + M('x=0') + ' y ' + M('x=1') + ', negativa entre ambos y positiva fuera.'),
            fig(plot({ xr: [-0.9, 1.9], yr: [-1, 3.5], tickx: [1], ticky: [], curves: [{ f: x => 3 * x * (x - 1), dom: [-0.85, 1.85], k: 0 }],
              points: [[0, 0], [1, 0]], labels: [[0.05, 2.7, "y = f '(x)"]], alt: 'Gràfica esquemàtica de la derivada: s\u2019anul·la a x = 0 i x = 1, negativa entre tots dos' })),
          ] },
        { n: '4.2', pts: 1.25, q: S('Calculeu els valors de ' + M('a') + ' i ' + M('b') + ' perquè la funció ' + M('g(x)=ax^3+bx^2+1') + ' tingui un punt d\u2019inflexió en ' + M('x=\\dfrac12') + ' i la seva derivada en aquest punt sigui ' + M('\\dfrac{-3}2') + '.', 'Calcule los valores de ' + M('a') + ' y ' + M('b') + ' para que la función ' + M('g(x)=ax^3+bx^2+1') + ' tenga un punto de inflexión en ' + M('x=\\dfrac12') + ' y su derivada en ese punto sea ' + M('\\dfrac{-3}2') + '.'),
          sol: [
            F(r`g'(x)=3ax^2+2bx,\qquad g''(x)=6ax+2b`),
            p('Inflexió a ' + M('x=\\tfrac12') + ': ' + M("g''(\\tfrac12)=0") + ' ⇒ ' + M('3a+2b=0') + '. Derivada: ' + M("g'(\\tfrac12)=\\tfrac{3a}4+b=-\\tfrac32") + '.', 'Inflexión en ' + M('x=\\tfrac12') + ': ' + M("g''(\\tfrac12)=0") + ' ⇒ ' + M('3a+2b=0') + '. Derivada: ' + M("g'(\\tfrac12)=\\tfrac{3a}4+b=-\\tfrac32") + '.'),
            F(r`b=-\dfrac{3a}{2}\ \Longrightarrow\ \dfrac{3a}4-\dfrac{3a}2=-\dfrac{3a}4=-\dfrac32\ \Longrightarrow\ a=2,\quad b=-3`),
            p('Comprovació: ' + M("g''(x)=12x-6") + ' s\u2019anul·la a ' + M('x=\\tfrac12') + ' i hi canvia de signe.', 'Comprobación: ' + M("g''(x)=12x-6") + ' se anula en ' + M('x=\\tfrac12') + ' y cambia de signo.'),
            AN(r`a=2,\quad b=-3`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ma,
      intro: p('Sigui la matriu ' + M('A=\\begin{pmatrix}a&a&0\\\\2&a+1&a-1\\\\2a+1&0&-a-3\\end{pmatrix}') + ', en què ' + M('a') + ' és un paràmetre real.', 'Sea la matriz ' + M('A=\\begin{pmatrix}a&a&0\\\\2&a+1&a-1\\\\2a+1&0&-a-3\\end{pmatrix}') + ', en la que ' + M('a') + ' es un parámetro real.'),
      parts: [
        { n: '5.1', pts: 1, q: S('Trobeu per a quins valors de ' + M('a') + ' la matriu ' + M('A') + ' és invertible.', 'Halle para qué valores de ' + M('a') + ' la matriz ' + M('A') + ' es invertible.'),
          sol: [
            p('Desenvolupem el determinant per la primera fila:', 'Desarrollamos el determinante por la primera fila:'),
            F(r`|A|=a\big[-(a+1)(a+3)\big]-a\big[-2(a+3)-(a-1)(2a+1)\big]=a^3-3a^2+2a`),
            F(r`|A|=a(a-1)(a-2)`),
            ans('<b>Invertible</b> si ' + M('a\\neq0,1,2') + '.', '<b>Invertible</b> si ' + M('a\\neq0,1,2') + '.'),
          ] },
        { n: '5.2', pts: 1.5, q: S('Comproveu que, per al cas ' + M('a=3') + ', la matriu ' + M('A') + ' és invertible i resoleu l\u2019equació matricial ' + M('AX=B-3I') + ', en què ' + M('B=\\begin{pmatrix}6&3&3\\\\2&5&2\\\\1&1&4\\end{pmatrix}') + '.', 'Compruebe que, para el caso ' + M('a=3') + ', la matriz ' + M('A') + ' es invertible y resuelva la ecuación matricial ' + M('AX=B-3I') + ', en la que ' + M('B=\\begin{pmatrix}6&3&3\\\\2&5&2\\\\1&1&4\\end{pmatrix}') + '.'),
          sol: [
            p('Amb ' + M('a=3') + ': ' + M('|A|=3\\cdot2\\cdot1=6\\neq0') + ', per tant ' + M('A') + ' és invertible, i:', 'Con ' + M('a=3') + ': ' + M('|A|=3\\cdot2\\cdot1=6\\neq0') + ', por tanto ' + M('A') + ' es invertible, y:'),
            F(r`A=\begin{pmatrix}3&3&0\\2&4&2\\7&0&-6\end{pmatrix},\qquad A^{-1}=\dfrac16\begin{pmatrix}-24&18&6\\26&-18&-6\\-28&21&6\end{pmatrix}`),
            F(r`B-3I=\begin{pmatrix}3&3&3\\2&2&2\\1&1&1\end{pmatrix},\qquad X=A^{-1}(B-3I)`),
            p('Cada columna de ' + M('B-3I') + ' és ' + M('(3,2,1)^t') + ', i ' + M('A^{-1}(3,2,1)^t=\\tfrac16(-30,\\,36,\\,-36)^t=(-5,6,-6)^t') + '.', 'Cada columna de ' + M('B-3I') + ' es ' + M('(3,2,1)^t') + ', y ' + M('A^{-1}(3,2,1)^t=\\tfrac16(-30,\\,36,\\,-36)^t=(-5,6,-6)^t') + '.'),
            AN(r`X=\begin{pmatrix}-5&-5&-5\\6&6&6\\-6&-6&-6\end{pmatrix}`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la funció ' + M('f(x)=\\dfrac{x^3}{x-2}') + '.', 'Considere la función ' + M('f(x)=\\dfrac{x^3}{x-2}') + '.'),
      parts: [
        { n: '6.1', pts: 1.5, q: S('Estudieu si té punts crítics i, en cas que en tingui, justifiqueu de quin tipus són. Determineu també quins són els intervals de creixement i decreixement de la funció.', 'Estudie si tiene puntos críticos y, en caso de que los tenga, justifique de qué tipo son. Determine también cuáles son los intervalos de crecimiento y decrecimiento de la función.'),
          sol: [
            p('Domini: ' + M('\\mathbb R\\setminus\\{2\\}') + '. Derivem:', 'Dominio: ' + M('\\mathbb R\\setminus\\{2\\}') + '. Derivamos:'),
            F(r`f'(x)=\dfrac{3x^2(x-2)-x^3}{(x-2)^2}=\dfrac{2x^2(x-3)}{(x-2)^2}`),
            p('Punts crítics: ' + M("f'(x)=0") + ' ⇒ ' + M('x=0') + ' i ' + M('x=3') + '.', 'Puntos críticos: ' + M("f'(x)=0") + ' ⇒ ' + M('x=0') + ' y ' + M('x=3') + '.'),
            ul(S(M("f'<0") + ' si ' + M('x<3') + ' (' + M('x\\neq0,2') + '): <b>decreixent</b> a ' + M('(-\\infty,2)') + ' i a ' + M('(2,3)') + '.', M("f'<0") + ' si ' + M('x<3') + ' (' + M('x\\neq0,2') + '): <b>decreciente</b> en ' + M('(-\\infty,2)') + ' y en ' + M('(2,3)') + '.'),
              S(M("f'>0") + ' si ' + M('x>3') + ': <b>creixent</b> a ' + M('(3,+\\infty)') + '.', M("f'>0") + ' si ' + M('x>3') + ': <b>creciente</b> en ' + M('(3,+\\infty)') + '.')),
            ans('<b>Mínim relatiu</b> a ' + M('(3,27)') + '. A ' + M('x=0') + ' (' + M('f(0)=0') + ') la derivada s\u2019anul·la però no canvia de signe: no és extrem, és un punt d\u2019inflexió de tangent horitzontal.', '<b>Mínimo relativo</b> en ' + M('(3,27)') + '. En ' + M('x=0') + ' (' + M('f(0)=0') + ') la derivada se anula pero no cambia de signo: no es extremo, es un punto de inflexión de tangente horizontal.'),
          ] },
        { n: '6.2', pts: 1, q: S('Comproveu que l\u2019equació ' + M('f(x)=0') + ' té una única solució en l\u2019interval ' + M('(-2,1)') + '.', 'Compruebe que la ecuación ' + M('f(x)=0') + ' tiene una única solución en el intervalo ' + M('(-2,1)') + '.'),
          sol: [
            p(M('f') + ' és contínua a ' + M('[-2,1]') + ' (el punt ' + M('x=2') + ' no hi pertany) i:', M('f') + ' es continua en ' + M('[-2,1]') + ' (el punto ' + M('x=2') + ' no pertenece a él) y:'),
            F(r`f(-2)=\dfrac{-8}{-4}=2>0,\qquad f(1)=\dfrac{1}{-1}=-1<0`),
            p('Pel teorema de Bolzano, hi ha almenys una arrel. A més, ' + M('f') + ' és estrictament decreixent a ' + M('[-2,1]') + ' (' + M("f'\\leq0") + ' i només s\u2019anul·la en un punt), per tant l\u2019arrel és <b>única</b>. De fet, ' + M('f(x)=0\\Leftrightarrow x^3=0') + ', és a dir, ' + M('x=0') + '.', 'Por el teorema de Bolzano, hay al menos una raíz. Además, ' + M('f') + ' es estrictamente decreciente en ' + M('[-2,1]') + ' (' + M("f'\\leq0") + ' y solo se anula en un punto), por tanto la raíz es <b>única</b>. De hecho, ' + M('f(x)=0\\Leftrightarrow x^3=0') + ', es decir, ' + M('x=0') + '.'),
          ] },
      ] },
  ],
};

module.exports = {
  year: { y: 2021, title: T('PAU 2021', 'PAU 2021'), series: [s2, s5, s1] },
};
