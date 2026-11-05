/* PAU 2023 · Matemàtiques II · sèries 1 i 5 (ordinària) i 2 (extraordinària). Sis qüestions, se'n responen quatre.
 * Enunciats oficials (català); traducció al castellà i solucions pròpies. */
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

/* ───────────────────────── SÈRIE 1 (ordinària) ───────────────────────── */
const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2023-mates-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Calculeu els coeficients ' + M('a,b,c') + ' i ' + M('d') + ' de la funció ' + M('f(x)=ax^3+bx^2+cx+d') + ' si sabem que l\u2019equació de la recta tangent a la gràfica de la funció ' + M('f') + ' en el punt d\u2019inflexió ' + M('(1,0)') + ' és ' + M('y=-3x+3') + ' i que la funció té un extrem relatiu en el punt de la gràfica d\u2019abscissa ' + M('x=0') + '.',
               'Calcule los coeficientes ' + M('a,b,c') + ' y ' + M('d') + ' de la función ' + M('f(x)=ax^3+bx^2+cx+d') + ' si sabemos que la ecuación de la recta tangente a la gráfica de la función ' + M('f') + ' en el punto de inflexión ' + M('(1,0)') + ' es ' + M('y=-3x+3') + ' y que la función tiene un extremo relativo en el punto de la gráfica de abscisa ' + M('x=0') + '.'),
      parts: [
        { n: '1.1', pts: 2.5, q: T('Calculeu ' + M('a,b,c,d') + '.', 'Calcule ' + M('a,b,c,d') + '.'),
          sol: [
            p('Tradueixo cada dada a una equació, amb ' + M("f'(x)=3ax^2+2bx+c") + ' i ' + M("f''(x)=6ax+2b") + ':', 'Traduzco cada dato a una ecuación, con ' + M("f'(x)=3ax^2+2bx+c") + ' y ' + M("f''(x)=6ax+2b") + ':'),
            ul(T('Passa per ' + M('(1,0)') + ': ' + M('a+b+c+d=0') + '.', 'Pasa por ' + M('(1,0)') + ': ' + M('a+b+c+d=0') + '.'),
              T('Pendent de la tangent a ' + M('x=1') + ': ' + M("f'(1)=3a+2b+c=-3") + '.', 'Pendiente de la tangente en ' + M('x=1') + ': ' + M("f'(1)=3a+2b+c=-3") + '.'),
              T('Inflexió a ' + M('x=1') + ': ' + M("f''(1)=6a+2b=0") + '.', 'Inflexión en ' + M('x=1') + ': ' + M("f''(1)=6a+2b=0") + '.'),
              T('Extrem a ' + M('x=0') + ': ' + M("f'(0)=c=0") + '.', 'Extremo en ' + M('x=0') + ': ' + M("f'(0)=c=0") + '.')),
            p('De ' + M('c=0') + ' i ' + M('b=-3a') + ': ' + M('3a-6a=-3') + ' ⇒ ' + M('a=1') + ', ' + M('b=-3') + '; i amb ' + M('a+b+c+d=0') + ': ' + M('d=2') + '.', 'De ' + M('c=0') + ' y ' + M('b=-3a') + ': ' + M('3a-6a=-3') + ' ⇒ ' + M('a=1') + ', ' + M('b=-3') + '; y con ' + M('a+b+c+d=0') + ': ' + M('d=2') + '.'),
            AN(r`f(x)=x^3-3x^2+2`),
            fig(plot({ xr: [-1.3, 3.3], yr: [-3.2, 4.5], tickx: [-1, 1, 2, 3], ticky: [2], curves: [{ f: x => x ** 3 - 3 * x * x + 2, dom: [-1.3, 3.3], k: 0 }, { f: x => -3 * x + 3, dom: [0.2, 2], k: 1 }],
              points: [[0, 2], [1, 0], [2, -2]], labels: [[1.1, 3.3, 'y = −3x + 3']], alt: 'Gràfica de f amb el màxim a x = 0, la inflexió a (1, 0) i la tangent y = −3x + 3' })),
            p('Comprovació: ' + M("f'(x)=3x^2-6x") + ' ⇒ ' + M("f'(0)=0") + ', ' + M("f'(1)=-3") + '; ' + M("f''(x)=6x-6") + ' ⇒ ' + M("f''(1)=0") + '.', 'Comprobación: ' + M("f'(x)=3x^2-6x") + ' ⇒ ' + M("f'(0)=0") + ', ' + M("f'(1)=-3") + '; ' + M("f''(x)=6x-6") + ' ⇒ ' + M("f''(1)=0") + '.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.ma,
      intro: p('Considereu les dues matrius següents: ' + M(r`A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}`) + ' i ' + M(r`B=\begin{pmatrix}2&2&0\\-1&-1&0\\1&2&1\end{pmatrix}`) + '.',
               'Considere las dos matrices siguientes: ' + M(r`A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}`) + ' y ' + M(r`B=\begin{pmatrix}2&2&0\\-1&-1&0\\1&2&1\end{pmatrix}`) + '.'),
      parts: [
        { n: '2.1', pts: 1.5, q: T('Calculeu les matrius ' + M(r`A\cdot B`) + ' i ' + M(r`B\cdot A`) + '.', 'Calcule las matrices ' + M(r`A\cdot B`) + ' y ' + M(r`B\cdot A`) + '.'),
          sol: [
            p('Producte fila per columna. Per exemple, la primera fila de ' + M('AB') + ': ' + M('(2,-3,-5)\\cdot(2,-1,1)=4+3-5=2') + ', ' + M('(2,-3,-5)\\cdot(2,-1,2)=4+3-10=-3') + ', ' + M('(2,-3,-5)\\cdot(0,0,1)=-5') + '.', 'Producto fila por columna. Por ejemplo, la primera fila de ' + M('AB') + ': ' + M('(2,-3,-5)\\cdot(2,-1,1)=4+3-5=2') + ', ' + M('(2,-3,-5)\\cdot(2,-1,2)=4+3-10=-3') + ', ' + M('(2,-3,-5)\\cdot(0,0,1)=-5') + '.'),
            F(r`A\cdot B=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}=A\qquad B\cdot A=\begin{pmatrix}2&2&0\\-1&-1&0\\1&2&1\end{pmatrix}=B`),
            AN(r`AB=A,\qquad BA=B`),
          ] },
        { n: '2.2', pts: 1, q: T('Siguin ' + M('C') + ' i ' + M('D') + ' dues matrius quadrades del mateix ordre que satisfan ' + M(r`C\cdot D=C`) + ' i ' + M(r`D\cdot C=D`) + '. Comproveu que les dues matrius, ' + M('C') + ' i ' + M('D') + ', són idempotents. <i>(Una matriu quadrada s\u2019anomena idempotent si coincideix amb el seu quadrat.)</i>',
                                  'Sean ' + M('C') + ' y ' + M('D') + ' dos matrices cuadradas del mismo orden que satisfacen ' + M(r`C\cdot D=C`) + ' y ' + M(r`D\cdot C=D`) + '. Compruebe que las dos matrices, ' + M('C') + ' y ' + M('D') + ', son idempotentes. <i>(Una matriz cuadrada se llama idempotente si coincide con su cuadrado.)</i>'),
          sol: [
            p('Cal veure ' + M('C^2=C') + ' i ' + M('D^2=D') + ', substituint una de les dues igualtats i usant l\u2019associativitat:', 'Hay que ver ' + M('C^2=C') + ' y ' + M('D^2=D') + ', sustituyendo una de las dos igualdades y usando la asociatividad:'),
            F(r`C^2=C\cdot C=(C\,D)\,C=C\,(D\,C)=C\,D=C`),
            F(r`D^2=D\cdot D=(D\,C)\,D=D\,(C\,D)=D\,C=D`),
            p('Les matrius ' + M('A') + ' i ' + M('B') + ' de l\u2019apartat anterior en són un exemple (' + M('AB=A') + ', ' + M('BA=B') + ').', 'Las matrices ' + M('A') + ' y ' + M('B') + ' del apartado anterior son un ejemplo (' + M('AB=A') + ', ' + M('BA=B') + ').'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pa,
      intro: p('Sigui ' + M(r`f'(x)=\begin{cases}x-1&\text{si }x\le2\\[2pt]\dfrac1{x-1}&\text{si }x>2\end{cases}`) + ' la funció derivada d\u2019una funció derivable ' + M('f(x)') + ' que passa pel punt ' + M('A=(0,3)') + '.',
               'Sea ' + M(r`f'(x)=\begin{cases}x-1&\text{si }x\le2\\[2pt]\dfrac1{x-1}&\text{si }x>2\end{cases}`) + ' la función derivada de una función derivable ' + M('f(x)') + ' que pasa por el punto ' + M('A=(0,3)') + '.'),
      parts: [
        { n: '3.1', pts: 1.5, q: T('Calculeu la funció ' + M('f(x)') + '.', 'Calcule la función ' + M('f(x)') + '.'),
          sol: [
            p('Integrem cada tros: ' + M(r`f(x)=\tfrac{x^2}{2}-x+C_1`) + ' si ' + M('x\\le2') + ', i ' + M(r`f(x)=\ln(x-1)+C_2`) + ' si ' + M('x>2') + '.', 'Integramos cada trozo: ' + M(r`f(x)=\tfrac{x^2}{2}-x+C_1`) + ' si ' + M('x\\le2') + ', y ' + M(r`f(x)=\ln(x-1)+C_2`) + ' si ' + M('x>2') + '.'),
            ul(T('Passa per ' + M('(0,3)') + ': ' + M('C_1=3') + '.', 'Pasa por ' + M('(0,3)') + ': ' + M('C_1=3') + '.'),
              T('Derivable ⇒ contínua a ' + M('x=2') + ': ' + M('f(2)=2-2+3=3') + ' i ' + M('\\ln1+C_2=C_2') + ' ⇒ ' + M('C_2=3') + '.', 'Derivable ⇒ continua en ' + M('x=2') + ': ' + M('f(2)=2-2+3=3') + ' y ' + M('\\ln1+C_2=C_2') + ' ⇒ ' + M('C_2=3') + '.')),
            AN(r`f(x)=\begin{cases}\dfrac{x^2}{2}-x+3&x\le2\\[2pt]\ln(x-1)+3&x>2\end{cases}`),
            p('(A ' + M('x=2') + ' les dues derivades valen 1: ' + M("f'(2^-)=1=f'(2^+)") + ', així que ' + M('f') + ' és derivable.)', '(En ' + M('x=2') + ' las dos derivadas valen 1: ' + M("f'(2^-)=1=f'(2^+)") + ', así que ' + M('f') + ' es derivable.)'),
          ] },
        { n: '3.2', pts: 1, q: T('Calculeu l\u2019equació de la recta tangent a la funció ' + M("f'(x)") + ' en el punt d\u2019abscissa ' + M('x=3') + '.', 'Calcule la ecuación de la recta tangente a la función ' + M("f'(x)") + ' en el punto de abscisa ' + M('x=3') + '.'),
          sol: [
            p('A ' + M('x=3>2') + ' és ' + M(r`f'(x)=\tfrac{1}{x-1}`) + ', així que la recta tangent a ' + M("f'") + ' necessita ' + M("f''") + ':', 'En ' + M('x=3>2') + ' es ' + M(r`f'(x)=\tfrac{1}{x-1}`) + ', así que la recta tangente a ' + M("f'") + ' necesita ' + M("f''") + ':'),
            F(r`f'(3)=\tfrac12,\qquad f''(x)=-\dfrac1{(x-1)^2}\ \Rightarrow\ f''(3)=-\tfrac14`),
            AN(r`y-\tfrac12=-\tfrac14(x-3)\ \Longleftrightarrow\ y=-\tfrac14x+\tfrac54`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.al,
      intro: J(p('Sigui el sistema d\u2019equacions lineals següent, que depèn del paràmetre real ' + M('\\lambda') + ':', 'Sea el siguiente sistema de ecuaciones lineales, que depende del parámetro real ' + M('\\lambda') + ':'),
        html(D(r`\left\{\begin{aligned}x+2\lambda y+(2+\lambda)z&=0\\(2+\lambda)x+y+2\lambda z&=3\\2\lambda x+(2+\lambda)y+z&=-3\end{aligned}\right.`))),
      parts: [
        { n: '4.1', pts: 1.25, q: T('Discutiu el sistema per als diferents valors del paràmetre ' + M('\\lambda') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('\\lambda') + '.'),
          sol: [
            F(r`\begin{vmatrix}1&2\lambda&2+\lambda\\2+\lambda&1&2\lambda\\2\lambda&2+\lambda&1\end{vmatrix}=9(\lambda^3+1)=9(\lambda+1)(\lambda^2-\lambda+1)`),
            p('El factor ' + M('\\lambda^2-\\lambda+1') + ' no s\u2019anul·la mai (discriminant ' + M('1-4<0') + '), així que el determinant només és 0 per a ' + M('\\lambda=-1') + '.', 'El factor ' + M('\\lambda^2-\\lambda+1') + ' no se anula nunca (discriminante ' + M('1-4<0') + '), así que el determinante solo es 0 para ' + M('\\lambda=-1') + '.'),
            ul(T('<b>' + M('\\lambda\\neq-1') + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M('\\lambda\\neq-1') + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('\\lambda=-1') + '</b>: rang 2 i, com que la suma de les tres equacions dóna ' + M('0=0+3-3') + ', rang ampliada 2 ⇒ <b>compatible indeterminat</b>.', '<b>' + M('\\lambda=-1') + '</b>: rango 2 y, como la suma de las tres ecuaciones da ' + M('0=0+3-3') + ', rango ampliada 2 ⇒ <b>compatible indeterminado</b>.')),
          ] },
        { n: '4.2', pts: 1.25, q: T('Per al cas ' + M('\\lambda=-1') + ', resoleu el sistema, interpreteu-lo geomètricament i identifiqueu-ne la solució.', 'Para el caso ' + M('\\lambda=-1') + ', resuelva el sistema, interprételo geométricamente e identifique su solución.'),
          sol: [
            F(r`\begin{cases}x-2y+z=0\\x+y-2z=3\\-2x+y+z=-3\end{cases}`),
            p('Aïllem ' + M('x=2y-z') + ' a la 1a i substituïm a la 2a: ' + M('3y-3z=3') + ' ⇒ ' + M('y=1+z') + ', ' + M('x=2+z') + '. Amb ' + M('z=t') + ' (la 3a equació es compleix: ' + M('-4-2t+1+t+t=-3') + '):', 'Despejamos ' + M('x=2y-z') + ' en la 1.ª y sustituimos en la 2.ª: ' + M('3y-3z=3') + ' ⇒ ' + M('y=1+z') + ', ' + M('x=2+z') + '. Con ' + M('z=t') + ' (la 3.ª ecuación se cumple: ' + M('-4-2t+1+t+t=-3') + '):'),
            AN(r`(x,y,z)=(2+t,\ 1+t,\ t),\ t\in\mathbb R`),
            ans('<b>Interpretació:</b> els tres plans són diferents però tenen una <b>recta comuna</b> (passa per ' + M('(2,1,0)') + ' amb direcció ' + M('(1,1,1)') + '): es tallen dos a dos en aquesta mateixa recta (feix de plans). Els vectors normals sumen ' + M('(0,0,0)') + ', per això són coplanaris.',
                '<b>Interpretación:</b> los tres planos son distintos pero tienen una <b>recta común</b> (pasa por ' + M('(2,1,0)') + ' con dirección ' + M('(1,1,1)') + '): se cortan dos a dos en esa misma recta (haz de planos). Los vectores normales suman ' + M('(0,0,0)') + ', por eso son coplanarios.'),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.op,
      intro: J(p('La Núria té un jardí rectangular i vol fer-hi un tancat (rectangular o quadrat) de 8 m² per al seu gos. Ha pensat de posar el tancat tocant al mur del jardí, tal com es mostra a la figura, per estalviar-se així un dels quatre costats. El preu de la tanca que vol fer servir és de 2,5 €/m.',
                 'Núria tiene un jardín rectangular y quiere hacer en él un cercado (rectangular o cuadrado) de 8 m² para su perro. Ha pensado poner el cercado tocando al muro del jardín, tal como se muestra en la figura, para ahorrarse así uno de los cuatro lados. El precio de la valla que quiere usar es de 2,5 €/m.'),
        img('2023-s1-e5', 825, 465, 'Jardí rectangular amb el tancat del gos enganxat al mur', 'Jardín rectangular con el cercado del perro pegado al muro')),
      parts: [
        { n: '5.1', pts: 1.75, q: T('Quines dimensions ha de tenir el tancat perquè el cost sigui mínim? Quin és aquest cost mínim?', '¿Qué dimensiones debe tener el cercado para que el coste sea mínimo? ¿Cuál es este coste mínimo?'),
          sol: [
            p('Tancat de ' + M('x') + ' (perpendicular al mur) per ' + M('y') + ' (al llarg del mur), amb ' + M('xy=8') + '. Només es tanquen tres costats:', 'Cercado de ' + M('x') + ' (perpendicular al muro) por ' + M('y') + ' (a lo largo del muro), con ' + M('xy=8') + '. Solo se cierran tres lados:'),
            F(r`L(x)=2x+y=2x+\dfrac8x,\qquad C(x)=2{,}5\Big(2x+\dfrac8x\Big)`),
            F(r`C'(x)=2{,}5\Big(2-\dfrac{8}{x^2}\Big)=0\ \Rightarrow\ x=2\ (y=4)`),
            p('És un mínim: ' + M(r`C''(x)=\tfrac{40}{x^3}>0`) + '.', 'Es un mínimo: ' + M(r`C''(x)=\tfrac{40}{x^3}>0`) + '.'),
            fig(plot({ xr: [-0.6, 6], yr: [10, 45], tickx: [2, 4, 6], ticky: [20, 30, 40], curves: [{ f: x => 2.5 * (2 * x + 8 / x), dom: [0.3, 6] }],
              points: [[2, 20]], labels: [[2.3, 17.5, 'mín (2, 20)']], alt: 'Gràfica del cost C(x) amb el mínim a x = 2' })),
            ans('Dimensions <b>2 m × 4 m</b> (2 m perpendiculars al mur); cost mínim ' + M('C(2)=2{,}5\\cdot8=') + ' <b>20 €</b>.', 'Dimensiones <b>2 m × 4 m</b> (2 m perpendiculares al muro); coste mínimo ' + M('C(2)=2{,}5\\cdot8=') + ' <b>20 €</b>.'),
          ] },
        { n: '5.2', pts: 0.75, q: T('Si manteniu la forma rectangular o quadrada del tancat i feu que un dels vèrtexs del jardí coincideixi amb un vèrtex del tancat, quants euros us podeu estalviar? Raoneu com posaríeu el tancat i justifiqueu amb càlculs matemàtics les dimensions de la vostra proposta.', 'Si mantiene la forma rectangular o cuadrada del cercado y hace que uno de los vértices del jardín coincida con un vértice del cercado, ¿cuántos euros puede ahorrarse? Razone cómo pondría el cercado y justifique con cálculos matemáticos las dimensiones de su propuesta.'),
          sol: [
            p('Posant el tancat <b>a la cantonada</b> del jardí, dos costats són els murs i només cal tanca per a dos costats: ' + M('x+y') + ' amb ' + M('xy=8') + '.', 'Poniendo el cercado <b>en la esquina</b> del jardín, dos lados son los muros y solo hace falta valla para dos lados: ' + M('x+y') + ' con ' + M('xy=8') + '.'),
            F(r`L(x)=x+\dfrac8x,\quad L'(x)=1-\dfrac{8}{x^2}=0\ \Rightarrow\ x=2\sqrt2=y\quad(L''>0)`),
            F(r`L_{\min}=4\sqrt2\approx5{,}66\ \text{m}\ \Rightarrow\ C=2{,}5\cdot4\sqrt2=10\sqrt2\approx14{,}14`),
            ans('Un tancat <b>quadrat de costat ' + M('2\\sqrt2\\approx2{,}83') + ' m</b> a la cantonada costa ' + M('\\approx14{,}14') + ' €: s\u2019estalvien ' + M('20-10\\sqrt2\\approx') + ' <b>5,86 €</b>.', 'Un cercado <b>cuadrado de lado ' + M('2\\sqrt2\\approx2{,}83') + ' m</b> en la esquina cuesta ' + M('\\approx14{,}14') + ' €: se ahorran ' + M('20-10\\sqrt2\\approx') + ' <b>5,86 €</b>.'),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.ge,
      intro: p('Siguin els plans ' + M(r`\pi_1`) + ' i ' + M(r`\pi_2`) + ', determinats respectivament per les equacions ' + M(r`\pi_1:\ x+y=3`) + ' i ' + M(r`\pi_2:\ x-z=-2`) + '.', 'Sean los planos ' + M(r`\pi_1`) + ' y ' + M(r`\pi_2`) + ', determinados respectivamente por las ecuaciones ' + M(r`\pi_1:\ x+y=3`) + ' y ' + M(r`\pi_2:\ x-z=-2`) + '.'),
      parts: [
        { n: '6.1', pts: 0.75, q: T('Trobeu l\u2019equació general (' + M('Ax+By+Cz+D=0') + ') del pla ' + M(r`\pi_3`) + ', que és perpendicular a ' + M(r`\pi_1`) + ' i ' + M(r`\pi_2`) + ', i que passa pel punt ' + M('P=(4,1,2)') + '.', 'Encuentre la ecuación general (' + M('Ax+By+Cz+D=0') + ') del plano ' + M(r`\pi_3`) + ', que es perpendicular a ' + M(r`\pi_1`) + ' y ' + M(r`\pi_2`) + ', y que pasa por el punto ' + M('P=(4,1,2)') + '.'),
          sol: [
            p('Els normals són ' + M(r`\vec n_1=(1,1,0)`) + ' i ' + M(r`\vec n_2=(1,0,-1)`) + '. Un pla perpendicular a tots dos té el normal perpendicular als dos normals:', 'Los normales son ' + M(r`\vec n_1=(1,1,0)`) + ' y ' + M(r`\vec n_2=(1,0,-1)`) + '. Un plano perpendicular a ambos tiene el normal perpendicular a los dos normales:'),
            F(r`\vec n_3=\vec n_1\times\vec n_2=(-1,1,-1)\parallel(1,-1,1)`),
            p('Amb ' + M('P') + ': ' + M('x-y+z=4-1+2=5') + '.', 'Con ' + M('P') + ': ' + M('x-y+z=4-1+2=5') + '.'),
            AN(r`\pi_3:\ x-y+z-5=0`),
          ] },
        { n: '6.2', pts: 0.75, q: T('Sigui ' + M('r') + ' la recta d\u2019intersecció de ' + M(r`\pi_1`) + ' i ' + M(r`\pi_2`) + '. Calculeu l\u2019equació vectorial de la recta ' + M('r') + '.', 'Sea ' + M('r') + ' la recta de intersección de ' + M(r`\pi_1`) + ' y ' + M(r`\pi_2`) + '. Calcule la ecuación vectorial de la recta ' + M('r') + '.'),
          sol: [
            p('Amb ' + M('x=t') + ': ' + M('y=3-t') + ' i ' + M('z=x+2=t+2') + '. La direcció és ' + M(r`\vec n_1\times\vec n_2\parallel(1,-1,1)`) + '.', 'Con ' + M('x=t') + ': ' + M('y=3-t') + ' y ' + M('z=x+2=t+2') + '. La dirección es ' + M(r`\vec n_1\times\vec n_2\parallel(1,-1,1)`) + '.'),
            AN(r`r:\ (x,y,z)=(0,3,2)+t\,(1,-1,1),\ t\in\mathbb R`),
          ] },
        { n: '6.3', pts: 1, q: T('Calculeu el punt ' + M('Q') + ' de la recta ' + M('r') + ' que és més a prop del punt ' + M('P') + '.', 'Calcule el punto ' + M('Q') + ' de la recta ' + M('r') + ' que está más cerca del punto ' + M('P') + '.'),
          sol: [
            p(M('Q') + ' és la projecció ortogonal de ' + M('P') + ' sobre ' + M('r') + ': ' + M('Q=(t,3-t,2+t)') + ' amb ' + M(r`\overrightarrow{PQ}\cdot(1,-1,1)=0`) + ':', M('Q') + ' es la proyección ortogonal de ' + M('P') + ' sobre ' + M('r') + ': ' + M('Q=(t,3-t,2+t)') + ' con ' + M(r`\overrightarrow{PQ}\cdot(1,-1,1)=0`) + ':'),
            F(r`(t-4)-(2-t)+t=0\ \Rightarrow\ 3t=6\ \Rightarrow\ t=2`),
            AN(r`Q=(2,\ 1,\ 4)`),
            p('Comprovació: ' + M(r`\overrightarrow{PQ}=(-2,0,2)`) + ' és perpendicular a ' + M('(1,-1,1)') + ' i ' + M('Q\\in\\pi_3') + ' (' + M('2-1+4=5') + ').', 'Comprobación: ' + M(r`\overrightarrow{PQ}=(-2,0,2)`) + ' es perpendicular a ' + M('(1,-1,1)') + ' y ' + M('Q\\in\\pi_3') + ' (' + M('2-1+4=5') + ').'),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 2 (extraordinària) ───────────────────────── */
const s2 = {
  id: 2, pdf: 'pdf/pau/pau-2023-mates-serie2.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.ma,
      intro: p('Siguin ' + M(r`A=\begin{pmatrix}2&1\\3&2\end{pmatrix}`) + ', ' + M(r`B=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}`) + ' i la matriu identitat d\u2019ordre dos ' + M(r`I=\begin{pmatrix}1&0\\0&1\end{pmatrix}`) + '.',
               'Sean ' + M(r`A=\begin{pmatrix}2&1\\3&2\end{pmatrix}`) + ', ' + M(r`B=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}`) + ' y la matriz identidad de orden dos ' + M(r`I=\begin{pmatrix}1&0\\0&1\end{pmatrix}`) + '.'),
      parts: [
        { n: '1.1', pts: 0.5, q: T('Comproveu que ' + M('(A-2I)^2=3I') + '.', 'Compruebe que ' + M('(A-2I)^2=3I') + '.'),
          sol: [F(r`A-2I=\begin{pmatrix}0&1\\3&0\end{pmatrix},\qquad (A-2I)^2=\begin{pmatrix}0&1\\3&0\end{pmatrix}\begin{pmatrix}0&1\\3&0\end{pmatrix}=\begin{pmatrix}3&0\\0&3\end{pmatrix}=3I\ \checkmark`)] },
        { n: '1.2', pts: 1.25, q: T('Utilitzant la igualtat de l\u2019apartat anterior, trobeu la matriu inversa de la matriu ' + M('A') + ' en funció de les matrius ' + M('A') + ' i ' + M('I') + ', i comproveu que coincideix amb la matriu ' + M('B') + '.', 'Utilizando la igualdad del apartado anterior, encuentre la matriz inversa de la matriz ' + M('A') + ' en función de las matrices ' + M('A') + ' e ' + M('I') + ', y compruebe que coincide con la matriz ' + M('B') + '.'),
          sol: [
            F(r`(A-2I)^2=A^2-4A+4I=3I\ \Rightarrow\ A^2-4A+I=0\ \Rightarrow\ A(4I-A)=I`),
            p('Per tant ' + M('A^{-1}=4I-A') + ':', 'Por tanto ' + M('A^{-1}=4I-A') + ':'),
            F(r`A^{-1}=\begin{pmatrix}4&0\\0&4\end{pmatrix}-\begin{pmatrix}2&1\\3&2\end{pmatrix}=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}=B\ \checkmark`),
          ] },
        { n: '1.3', pts: 0.75, q: T('Calculeu la matriu ' + M('X') + ' que satisfà la igualtat ' + M(r`A\cdot X=B`) + '.', 'Calcule la matriz ' + M('X') + ' que satisface la igualdad ' + M(r`A\cdot X=B`) + '.'),
          sol: [
            p(M('X=A^{-1}B=B\\cdot B=B^2') + ':', M('X=A^{-1}B=B\\cdot B=B^2') + ':'),
            F(r`X=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}\begin{pmatrix}2&-1\\-3&2\end{pmatrix}=\begin{pmatrix}7&-4\\-12&7\end{pmatrix}`),
            p('Comprovació: ' + M(r`A\cdot X=\begin{pmatrix}2&1\\3&2\end{pmatrix}\begin{pmatrix}7&-4\\-12&7\end{pmatrix}=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}=B`) + '.', 'Comprobación: ' + M(r`A\cdot X=\begin{pmatrix}2&1\\3&2\end{pmatrix}\begin{pmatrix}7&-4\\-12&7\end{pmatrix}=\begin{pmatrix}2&-1\\-3&2\end{pmatrix}=B`) + '.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.an,
      intro: p('Sigui la funció ' + M(r`f(x)=\dfrac1x`) + '.', 'Sea la función ' + M(r`f(x)=\dfrac1x`) + '.'),
      parts: [
        { n: '2.1', pts: 0.75, q: T('Calculeu l\u2019equació de la recta tangent a la gràfica de la funció ' + M('f') + ' en el punt d\u2019abscissa ' + M('x=2') + '.', 'Calcule la ecuación de la recta tangente a la gráfica de la función ' + M('f') + ' en el punto de abscisa ' + M('x=2') + '.'),
          sol: [F(r`f(2)=\tfrac12,\qquad f'(x)=-\dfrac1{x^2}\ \Rightarrow\ f'(2)=-\tfrac14`), AN(r`y-\tfrac12=-\tfrac14(x-2)\ \Longleftrightarrow\ y=-\tfrac x4+1`)] },
        { n: '2.2', pts: 0.75, q: T('Calculeu l\u2019equació de la recta tangent a la gràfica de la funció ' + M('f') + ' en el punt d\u2019abscissa ' + M('x=k') + ', en què ' + M('k') + ' és un nombre real positiu.', 'Calcule la ecuación de la recta tangente a la gráfica de la función ' + M('f') + ' en el punto de abscisa ' + M('x=k') + ', en que ' + M('k') + ' es un número real positivo.'),
          sol: [F(r`f(k)=\tfrac1k,\qquad f'(k)=-\tfrac1{k^2}`), AN(r`y-\tfrac1k=-\tfrac1{k^2}(x-k)\ \Longleftrightarrow\ y=-\dfrac{x}{k^2}+\dfrac2k`)] },
        { n: '2.3', pts: 1,
          q: J(T('Comproveu que, tal com es pot veure a la figura de sota, la recta de l\u2019apartat ' + M('b') + ' determina un triangle d\u2019àrea constant amb els semieixos positius de coordenades. Calculeu aquesta àrea.', 'Compruebe que, tal como se puede ver en la figura de abajo, la recta del apartado ' + M('b') + ' determina un triángulo de área constante con los semiejes positivos de coordenadas. Calcule esta área.'),
            img('2023-s2-e2', 975, 600, 'Gràfica de 1/x amb la recta tangent i el triangle ombrejat amb els eixos', 'Gráfica de 1/x con la recta tangente y el triángulo sombreado con los ejes')),
          sol: [
            p('Talls de ' + M(r`y=-\tfrac{x}{k^2}+\tfrac2k`) + ' amb els eixos: amb ' + M('x=0') + ', ' + M(r`y=\tfrac2k`) + '; amb ' + M('y=0') + ', ' + M('x=2k') + '. El triangle té base ' + M('2k') + ' i alçada ' + M(r`\tfrac2k`) + ':', 'Cortes de ' + M(r`y=-\tfrac{x}{k^2}+\tfrac2k`) + ' con los ejes: con ' + M('x=0') + ', ' + M(r`y=\tfrac2k`) + '; con ' + M('y=0') + ', ' + M('x=2k') + '. El triángulo tiene base ' + M('2k') + ' y altura ' + M(r`\tfrac2k`) + ':'),
            F(r`A=\tfrac12\cdot2k\cdot\dfrac2k=2`),
            fig(plot({ xr: [-0.5, 5.5], yr: [-0.4, 2.2], tickx: [2, 4], ticky: [1], curves: [{ f: x => 1 / x, dom: [0.42, 5.5], k: 0 }, { f: x => 1 - x / 4, dom: [-0.3, 4.4], k: 1 }],
              fill: { f: x => 1 - x / 4, a: 0, b: 4 }, points: [[2, 0.5]], labels: [[2.2, 0.85, 'k = 2']], alt: 'Gràfica de 1/x amb la tangent a x = 2 i el triangle d\u2019àrea 2' })),
            AN(r`A=2\ \text{u}^2\ \ (\text{independent de }k)`),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.al,
      intro: J(p('Sigui el sistema d\u2019equacions lineals', 'Sea el sistema de ecuaciones lineales'),
        html(D(r`\left\{\begin{aligned}2x+y&=1+z\\my+z&=2-x\\mz+3&=3x+y\end{aligned}\right.`)),
        p('en què ' + M('m') + ' és un nombre real.', 'en que ' + M('m') + ' es un número real.')),
      parts: [
        { n: '3.1', pts: 1.25, q: T('Discutiu el sistema segons els valors del paràmetre ' + M('m') + '.', 'Discuta el sistema según los valores del parámetro ' + M('m') + '.'),
          sol: [
            p('Ordenat: ' + M('2x+y-z=1') + ', ' + M('x+my+z=2') + ', ' + M('-3x-y+mz=-3') + '.', 'Ordenado: ' + M('2x+y-z=1') + ', ' + M('x+my+z=2') + ', ' + M('-3x-y+mz=-3') + '.'),
            F(r`\begin{vmatrix}2&1&-1\\1&m&1\\-3&-1&m\end{vmatrix}=2m^2-4m=2m(m-2)`),
            ul(T('<b>' + M(r`m\neq0,2`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`m\neq0,2`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('m=0') + '</b>: de ' + M('x+z=2') + ' i ' + M('3x+y=3') + ' surt ' + M('z=2-x') + ', ' + M('y=3-3x') + ', i la 1a es compleix per a tot ' + M('x') + ' (' + M('2x+3-3x-2+x=1') + ') ⇒ <b>compatible indeterminat</b>.', '<b>' + M('m=0') + '</b>: de ' + M('x+z=2') + ' y ' + M('3x+y=3') + ' sale ' + M('z=2-x') + ', ' + M('y=3-3x') + ', y la 1.ª se cumple para todo ' + M('x') + ' (' + M('2x+3-3x-2+x=1') + ') ⇒ <b>compatible indeterminado</b>.'),
              T('<b>' + M('m=2') + '</b>: rang dels coeficients 2; la 3a fila és ' + M(r`-\tfrac53F_1+\tfrac13F_2`) + ' en els coeficients, però en els termes independents dóna ' + M(r`-\tfrac53+\tfrac23=-1\neq-3`) + ' ⇒ rang ampliada 3 ⇒ <b>incompatible</b>.', '<b>' + M('m=2') + '</b>: rango de los coeficientes 2; la 3.ª fila es ' + M(r`-\tfrac53F_1+\tfrac13F_2`) + ' en los coeficientes, pero en los términos independientes da ' + M(r`-\tfrac53+\tfrac23=-1\neq-3`) + ' ⇒ rango ampliada 3 ⇒ <b>incompatible</b>.')),
          ] },
        { n: '3.2', pts: 1.25, q: T('Resoleu el sistema, si té solució, per al cas ' + M('m=1') + '.', 'Resuelva el sistema, si tiene solución, para el caso ' + M('m=1') + '.'),
          sol: [
            p('Queda ' + M('2x+y-z=1') + ', ' + M('x+y+z=2') + ', ' + M('-3x-y+z=-3') + '. Sumant la 1a i la 3a: ' + M('-x=-2') + ' ⇒ ' + M('x=2') + '. De la 2a, ' + M('y+z=0') + ', i de la 1a, ' + M('y-z=-3') + ' ⇒ ' + M(r`y=-\tfrac32`) + ', ' + M(r`z=\tfrac32`) + '.', 'Queda ' + M('2x+y-z=1') + ', ' + M('x+y+z=2') + ', ' + M('-3x-y+z=-3') + '. Sumando la 1.ª y la 3.ª: ' + M('-x=-2') + ' ⇒ ' + M('x=2') + '. De la 2.ª, ' + M('y+z=0') + ', y de la 1.ª, ' + M('y-z=-3') + ' ⇒ ' + M(r`y=-\tfrac32`) + ', ' + M(r`z=\tfrac32`) + '.'),
            AN(r`(x,y,z)=\Big(2,\ -\tfrac32,\ \tfrac32\Big)`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.pa,
      intro: p('Sigui la funció ' + M('f(x)') + ' definida per ' + M('f(x)=-3x+e^{2x^3-1}') + '.', 'Sea la función ' + M('f(x)') + ' definida por ' + M('f(x)=-3x+e^{2x^3-1}') + '.'),
      parts: [
        { n: '4.1', pts: 1.25, q: T('Justifiqueu que ' + M('f(x)=2') + ' té una solució a l\u2019interval ' + M('(-1,0)') + '.', 'Justifique que ' + M('f(x)=2') + ' tiene una solución en el intervalo ' + M('(-1,0)') + '.'),
          sol: [
            p('Definim ' + M('g(x)=f(x)-2') + ', contínua a ' + M('[-1,0]') + ' (suma de polinomi i exponencial):', 'Definimos ' + M('g(x)=f(x)-2') + ', continua en ' + M('[-1,0]') + ' (suma de polinomio y exponencial):'),
            F(r`g(-1)=3+e^{-3}-2\approx1{,}05>0\qquad g(0)=e^{-1}-2\approx-1{,}63<0`),
            ans('Pel teorema de Bolzano hi ha almenys un ' + M('c\\in(-1,0)') + ' amb ' + M('g(c)=0') + ', és a dir ' + M('f(c)=2') + '.', 'Por el teorema de Bolzano hay al menos un ' + M('c\\in(-1,0)') + ' con ' + M('g(c)=0') + ', es decir ' + M('f(c)=2') + '.'),
          ] },
        { n: '4.2', pts: 1.25, q: T('Sigui la funció ' + M('h(x)=-3x^2+e^{2x^3-1}') + '. Calculeu l\u2019àrea de la regió compresa entre les gràfiques de les funcions ' + M('f(x)') + ' i ' + M('h(x)') + '.', 'Sea la función ' + M('h(x)=-3x^2+e^{2x^3-1}') + '. Calcule el área de la región comprendida entre las gráficas de las funciones ' + M('f(x)') + ' y ' + M('h(x)') + '.'),
          sol: [
            p('El terme exponencial és comú i es cancel·la a la diferència: ' + M('h(x)-f(x)=-3x^2+3x=3x(1-x)') + ', que val 0 a ' + M('x=0') + ' i a ' + M('x=1') + ' i és positiu entre tots dos (' + M('h') + ' és a sobre).', 'El término exponencial es común y se cancela en la diferencia: ' + M('h(x)-f(x)=-3x^2+3x=3x(1-x)') + ', que vale 0 en ' + M('x=0') + ' y en ' + M('x=1') + ' y es positivo entre ambos (' + M('h') + ' está encima).'),
            fig(plot({ xr: [-0.4, 1.4], yr: [-1.5, 1.7], tickx: [0.5, 1], ticky: [-1, 0.5], curves: [{ f: x => -3 * x + Math.exp(2 * x ** 3 - 1), dom: [-0.3, 1.3], k: 0 }, { f: x => -3 * x * x + Math.exp(2 * x ** 3 - 1), dom: [-0.3, 1.3], k: 1 }],
              fill: { f: x => -3 * x * x + Math.exp(2 * x ** 3 - 1), g: x => -3 * x + Math.exp(2 * x ** 3 - 1), a: 0, b: 1 }, points: [[0, Math.exp(-1)], [1, -3 + Math.E]], labels: [[0.3, -1.1, 'f'], [0.3, 0.55, 'h']], alt: 'Gràfiques de f i h amb la regió ombrejada entre x = 0 i x = 1' })),
            F(r`A=\int_0^1(3x-3x^2)\,dx=\Big[\tfrac{3x^2}{2}-x^3\Big]_0^1=\tfrac32-1`),
            AN(r`A=\dfrac12\ \text{u}^2`),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ge,
      intro: p('Siguin ' + M('r_1') + ' i ' + M('r_2') + ' les rectes definides per ' + M(r`r_1:\ x-1=y=-z`) + ' i per ' + M(r`r_2:\ x=y=z`) + ', respectivament.', 'Sean ' + M('r_1') + ' y ' + M('r_2') + ' las rectas definidas por ' + M(r`r_1:\ x-1=y=-z`) + ' y por ' + M(r`r_2:\ x=y=z`) + ', respectivamente.'),
      parts: [
        { n: '5.1', pts: 1.75, q: T('Calculeu l\u2019equació paramètrica de la recta que talla perpendicularment les rectes ' + M('r_1') + ' i ' + M('r_2') + '.', 'Calcule la ecuación paramétrica de la recta que corta perpendicularmente a las rectas ' + M('r_1') + ' y ' + M('r_2') + '.'),
          sol: [
            p(M('r_1:\\ (1,0,0)+a(1,1,-1)') + ' i ' + M('r_2:\\ (0,0,0)+b(1,1,1)') + '. La direcció de la perpendicular comuna és el producte vectorial:', M('r_1:\\ (1,0,0)+a(1,1,-1)') + ' y ' + M('r_2:\\ (0,0,0)+b(1,1,1)') + '. La dirección de la perpendicular común es el producto vectorial:'),
            F(r`(1,1,-1)\times(1,1,1)=(2,-2,0)\parallel(1,-1,0)`),
            p('Busquem ' + M('R=(1+a,a,-a)\\in r_1') + ' i ' + M('S=(b,b,b)\\in r_2') + ' amb ' + M(r`\overrightarrow{RS}=(b-1-a,\,b-a,\,b+a)=\lambda(1,-1,0)`) + ': de la 3a, ' + M('b=-a') + '; llavors ' + M('-2a=-\\lambda') + ' i ' + M('-2a-1=\\lambda') + ' ⇒ ' + M(r`a=-\tfrac14`) + ', ' + M(r`b=\tfrac14`) + '.', 'Buscamos ' + M('R=(1+a,a,-a)\\in r_1') + ' y ' + M('S=(b,b,b)\\in r_2') + ' con ' + M(r`\overrightarrow{RS}=(b-1-a,\,b-a,\,b+a)=\lambda(1,-1,0)`) + ': de la 3.ª, ' + M('b=-a') + '; entonces ' + M('-2a=-\\lambda') + ' y ' + M('-2a-1=\\lambda') + ' ⇒ ' + M(r`a=-\tfrac14`) + ', ' + M(r`b=\tfrac14`) + '.'),
            p('Així ' + M(r`R=\big(\tfrac34,-\tfrac14,\tfrac14\big)`) + ' i ' + M(r`S=\big(\tfrac14,\tfrac14,\tfrac14\big)`) + '.', 'Así ' + M(r`R=\big(\tfrac34,-\tfrac14,\tfrac14\big)`) + ' y ' + M(r`S=\big(\tfrac14,\tfrac14,\tfrac14\big)`) + '.'),
            AN(r`(x,y,z)=\Big(\tfrac14,\tfrac14,\tfrac14\Big)+\mu\,(1,-1,0),\ \mu\in\mathbb R`),
          ] },
        { n: '5.2', pts: 0.75, q: T('Calculeu la distància entre ' + M('r_1') + ' i ' + M('r_2') + '.', 'Calcule la distancia entre ' + M('r_1') + ' y ' + M('r_2') + '.'),
          sol: [
            p('És la longitud del segment ' + M('RS') + ' de la perpendicular comuna (o, amb la fórmula, ' + M(r`\tfrac{|\overrightarrow{P_1P_2}\cdot(\vec u\times\vec v)|}{|\vec u\times\vec v|}=\tfrac{|(1,0,0)\cdot(2,-2,0)|}{2\sqrt2}`) + '):', 'Es la longitud del segmento ' + M('RS') + ' de la perpendicular común (o, con la fórmula, ' + M(r`\tfrac{|\overrightarrow{P_1P_2}\cdot(\vec u\times\vec v)|}{|\vec u\times\vec v|}=\tfrac{|(1,0,0)\cdot(2,-2,0)|}{2\sqrt2}`) + '):'),
            AN(r`d=\big|(-\tfrac12,\tfrac12,0)\big|=\dfrac{\sqrt2}{2}\approx0{,}71`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.op,
      intro: J(p('Volem construir una peça metàl·lica que tingui per secció un trapezi isòsceles amb la base superior tres vegades més llarga que la base inferior. Els altres costats del trapezi fan 10 mm, tal com podeu observar a la figura següent:', 'Queremos construir una pieza metálica que tenga por sección un trapecio isósceles con la base superior tres veces más larga que la base inferior. Los otros lados del trapecio miden 10 mm, tal como se puede observar en la siguiente figura:'),
        img('2023-s2-e6', 630, 438, 'Trapezi isòsceles de base inferior x, base superior 3x i costats de 10 mm', 'Trapecio isósceles de base inferior x, base superior 3x y lados de 10 mm')),
      parts: [
        { n: '6.1', pts: 0.5, q: T('Expresseu l\u2019altura del trapezi en funció de la longitud ' + M('x') + ' de la base inferior.', 'Exprese la altura del trapecio en función de la longitud ' + M('x') + ' de la base inferior.'),
          sol: [
            p('Cada costat obliqüe sobresurt horitzontalment ' + M(r`\tfrac{3x-x}{2}=x`) + '. Pitàgores al triangle de costat 10:', 'Cada lado oblicuo sobresale horizontalmente ' + M(r`\tfrac{3x-x}{2}=x`) + '. Pitágoras en el triángulo de lado 10:'),
            AN(r`h(x)=\sqrt{100-x^2}\qquad(0<x<10)`),
          ] },
        { n: '6.2', pts: 2, q: T('Calculeu la longitud de la base inferior del trapezi de manera que l\u2019àrea de la peça sigui màxima i trobeu el valor d\u2019aquesta àrea màxima.', 'Calcule la longitud de la base inferior del trapecio de manera que el área de la pieza sea máxima y encuentre el valor de esta área máxima.'),
          sol: [
            F(r`A(x)=\dfrac{3x+x}{2}\,h=2x\sqrt{100-x^2}`),
            p('Maximitzar ' + M('A') + ' equival a maximitzar ' + M('A^2=4x^2(100-x^2)=400x^2-4x^4') + ' (' + M('A>0') + '):', 'Maximizar ' + M('A') + ' equivale a maximizar ' + M('A^2=4x^2(100-x^2)=400x^2-4x^4') + ' (' + M('A>0') + '):'),
            F(r`(A^2)'=800x-16x^3=16x(50-x^2)=0\ \Rightarrow\ x=\sqrt{50}=5\sqrt2\approx7{,}07`),
            p('És un màxim (el signe passa de + a −) i la peça és vàlida (' + M('x<10') + ').', 'Es un máximo (el signo pasa de + a −) y la pieza es válida (' + M('x<10') + ').'),
            fig(plot({ xr: [-0.5, 10.6], yr: [-6, 112], tickx: [5, 10], ticky: [50, 100], curves: [{ f: x => 2 * x * Math.sqrt(Math.max(0, 100 - x * x)), dom: [0, 10], k: 0 }],
              points: [[Math.sqrt(50), 100]], labels: [[0.6, 104, 'màx (7,07 ; 100)']], alt: 'Gràfica de l\u2019àrea A(x) amb el màxim a x = 5√2' })),
            ans('Base inferior <b>' + M('x=5\\sqrt2\\approx7{,}07') + ' mm</b>; àrea màxima ' + M('A=2\\cdot5\\sqrt2\\cdot5\\sqrt2=') + ' <b>100 mm²</b>.', 'Base inferior <b>' + M('x=5\\sqrt2\\approx7{,}07') + ' mm</b>; área máxima ' + M('A=2\\cdot5\\sqrt2\\cdot5\\sqrt2=') + ' <b>100 mm²</b>.'),
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 (ordinària) ───────────────────────── */
const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2023-mates-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.ig,
      intro: p('Considereu les funcions ' + M('f(x)=-x^2+x+6') + ' i ' + M('g(x)=-9x+3x^2') + '.', 'Considere las funciones ' + M('f(x)=-x^2+x+6') + ' y ' + M('g(x)=-9x+3x^2') + '.'),
      parts: [
        { n: '1.1', pts: 1.25, q: T('Calculeu l\u2019àrea de la regió delimitada per les dues funcions.', 'Calcule el área de la región delimitada por las dos funciones.'),
          sol: [
            F(r`-x^2+x+6=3x^2-9x\ \Rightarrow\ 4x^2-10x-6=0\ \Rightarrow\ 2x^2-5x-3=0\ \Rightarrow\ x=\tfrac{5\pm7}{4}=3,\ -\tfrac12`),
            p('Entre les dues arrels, ' + M('f-g=-4x^2+10x+6\\ge0') + ' (la paràbola de ' + M('f') + ' és a sobre):', 'Entre las dos raíces, ' + M('f-g=-4x^2+10x+6\\ge0') + ' (la parábola de ' + M('f') + ' está encima):'),
            F(r`A=\int_{-1/2}^{3}\big(-4x^2+10x+6\big)dx=\Big[-\tfrac{4x^3}{3}+5x^2+6x\Big]_{-1/2}^{3}=27-\Big(-\tfrac{19}{12}\Big)`),
            AN(r`A=\dfrac{343}{12}\approx28{,}58\ \text{u}^2`),
          ] },
        { n: '1.2', pts: 1.25, q: T('Trobeu l\u2019equació de la recta tangent a la funció ' + M('f(x)') + ' en el punt ' + M('(-2,0)') + '. Representeu aquesta recta tangent i les funcions ' + M('f(x)') + ' i ' + M('g(x)') + ' en uns mateixos eixos de coordenades.', 'Encuentre la ecuación de la recta tangente a la función ' + M('f(x)') + ' en el punto ' + M('(-2,0)') + '. Represente esta recta tangente y las funciones ' + M('f(x)') + ' y ' + M('g(x)') + ' en unos mismos ejes de coordenadas.'),
          sol: [
            F(r`f(-2)=-4-2+6=0\ \checkmark,\qquad f'(x)=-2x+1\ \Rightarrow\ f'(-2)=5`),
            AN(r`y=5(x+2)=5x+10`),
            fig(plot({ xr: [-3, 4], yr: [-8, 11], tickx: [-2, 3], ticky: [-5, 5, 10], curves: [{ f: x => -x * x + x + 6, dom: [-2.6, 3.4], k: 0 }, { f: x => 3 * x * x - 9 * x, dom: [-0.8, 3.7], k: 1 }, { f: x => 5 * x + 10, dom: [-2.9, 0.2], k: 1 }],
              fill: { f: x => -x * x + x + 6, g: x => 3 * x * x - 9 * x, a: -0.5, b: 3 }, points: [[-2, 0], [-0.5, 5.25], [3, 0]], labels: [[-2.9, 8, 'tangent'], [1.6, 7.3, 'f'], [3.3, 4.5, 'g']], alt: 'Paràboles f i g amb la tangent a f al punt (−2, 0) i la regió entre les paràboles' })),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals', 'Considere el sistema de ecuaciones lineales'),
        html(D(r`\left\{\begin{aligned}x-y+kz&=-1\\x+ky+z&=3\\2x+(k-1)y+2z&=2\end{aligned}\right.`)),
        p('en què ' + M('k') + ' és un paràmetre real.', 'en que ' + M('k') + ' es un parámetro real.')),
      parts: [
        { n: '2.1', pts: 1.5, q: T('Discutiu el sistema en funció del valor de ' + M('k') + '.', 'Discuta el sistema en función del valor de ' + M('k') + '.'),
          sol: [
            F(r`\begin{vmatrix}1&-1&k\\1&k&1\\2&k-1&2\end{vmatrix}=(k+1)+0+k(-k-1)=(k+1)(1-k)`),
            ul(T('<b>' + M(r`k\neq\pm1`) + '</b>: rang 3 ⇒ <b>compatible determinat</b>.', '<b>' + M(r`k\neq\pm1`) + '</b>: rango 3 ⇒ <b>compatible determinado</b>.'),
              T('<b>' + M('k=1') + '</b>: les dues primeres sumades donen ' + M('2x+2z=2') + ', que és la 3a ⇒ rang 2 = rang ampliada ⇒ <b>compatible indeterminat</b>.', '<b>' + M('k=1') + '</b>: las dos primeras sumadas dan ' + M('2x+2z=2') + ', que es la 3.ª ⇒ rango 2 = rango ampliada ⇒ <b>compatible indeterminado</b>.'),
              T('<b>' + M('k=-1') + '</b>: la 1a és ' + M('x-y-z=-1') + ' i la 2a ' + M('x-y+z=3') + '; la 3a és ' + M('2x-2y+2z=2') + ', és a dir ' + M('x-y+z=1') + ', que contradiu la 2a (' + M('=3') + ') ⇒ <b>incompatible</b>.', '<b>' + M('k=-1') + '</b>: la 1.ª es ' + M('x-y-z=-1') + ' y la 2.ª ' + M('x-y+z=3') + '; la 3.ª es ' + M('2x-2y+2z=2') + ', es decir ' + M('x-y+z=1') + ', que contradice a la 2.ª (' + M('=3') + ') ⇒ <b>incompatible</b>.')),
          ] },
        { n: '2.2', pts: 1, q: T('Resoleu el sistema per a ' + M('k=0') + ' i per a ' + M('k=1') + '.', 'Resuelva el sistema para ' + M('k=0') + ' y para ' + M('k=1') + '.'),
          sol: [
            p('<b>' + M('k=0') + ':</b> ' + M('x-y=-1') + ', ' + M('x+z=3') + ', ' + M('2x-y+2z=2') + '. Amb ' + M('y=x+1') + ' i ' + M('z=3-x') + ': ' + M('2x-x-1+6-2x=2') + ' ⇒ ' + M('x=3') + '.', '<b>' + M('k=0') + ':</b> ' + M('x-y=-1') + ', ' + M('x+z=3') + ', ' + M('2x-y+2z=2') + '. Con ' + M('y=x+1') + ' y ' + M('z=3-x') + ': ' + M('2x-x-1+6-2x=2') + ' ⇒ ' + M('x=3') + '.'),
            AN(r`k=0:\ (x,y,z)=(3,\ 4,\ 0)`),
            p('<b>' + M('k=1') + ':</b> sumant i restant les dues primeres, ' + M('x+z=1') + ' i ' + M('y=2') + '.', '<b>' + M('k=1') + ':</b> sumando y restando las dos primeras, ' + M('x+z=1') + ' e ' + M('y=2') + '.'),
            AN(r`k=1:\ (x,y,z)=(\lambda,\ 2,\ 1-\lambda),\ \lambda\in\mathbb R`),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.ge,
      intro: p('Considereu les rectes a l\u2019espai ' + M(r`r:\ x=-y=z+m`) + ' i ' + M(r`s:\ \begin{cases}x+y=1\\x-z=0\end{cases}`) + ', en què ' + M('m') + ' és un paràmetre real.', 'Considere las rectas en el espacio ' + M(r`r:\ x=-y=z+m`) + ' y ' + M(r`s:\ \begin{cases}x+y=1\\x-z=0\end{cases}`) + ', en que ' + M('m') + ' es un parámetro real.'),
      parts: [
        { n: '3.1', pts: 1.25, q: T('Estudieu la posició relativa per als diferents valors del paràmetre ' + M('m') + '.', 'Estudie la posición relativa para los diferentes valores del parámetro ' + M('m') + '.'),
          sol: [
            p('Paràmetres: ' + M('r:\\ (0,0,-m)+t(1,-1,1)') + ' (amb ' + M('x=t') + ', ' + M('y=-t') + ', ' + M('z=t-m') + ') i ' + M('s:\\ (0,1,0)+u(1,-1,1)') + ' (amb ' + M('x=u') + ', ' + M('y=1-u') + ', ' + M('z=u') + ').', 'Paramétricas: ' + M('r:\\ (0,0,-m)+t(1,-1,1)') + ' (con ' + M('x=t') + ', ' + M('y=-t') + ', ' + M('z=t-m') + ') y ' + M('s:\\ (0,1,0)+u(1,-1,1)') + ' (con ' + M('x=u') + ', ' + M('y=1-u') + ', ' + M('z=u') + ').'),
            p('Tenen la <b>mateixa direcció</b> ' + M('(1,-1,1)') + ': són paral·leles o coincidents. El punt ' + M('(0,1,0)') + ' de ' + M('s') + ' no és mai de ' + M('r') + ' (a ' + M('r') + ' cal ' + M('x=-y') + ', i aquí ' + M('0\\neq-1') + ').', 'Tienen la <b>misma dirección</b> ' + M('(1,-1,1)') + ': son paralelas o coincidentes. El punto ' + M('(0,1,0)') + ' de ' + M('s') + ' no es nunca de ' + M('r') + ' (en ' + M('r') + ' hace falta ' + M('x=-y') + ', y aquí ' + M('0\\neq-1') + ').'),
            ans('Per a <b>qualsevol valor de ' + M('m') + '</b> les rectes són <b>paral·leles i diferents</b>.', 'Para <b>cualquier valor de ' + M('m') + '</b> las rectas son <b>paralelas y distintas</b>.'),
          ] },
        { n: '3.2', pts: 1.25, q: T('Calculeu ' + M('m') + ' perquè la distància entre les rectes ' + M('r') + ' i ' + M('s') + ' sigui de ' + M('\\sqrt2') + ' unitats.', 'Calcule ' + M('m') + ' para que la distancia entre las rectas ' + M('r') + ' y ' + M('s') + ' sea de ' + M('\\sqrt2') + ' unidades.'),
          sol: [
            p('Rectes paral·leles: distància d\u2019un punt de ' + M('s') + ' a ' + M('r') + '. Amb ' + M('P_r=(0,0,-m)') + ', ' + M(r`\vec d=(1,-1,1)`) + ' i ' + M(r`\overrightarrow{P_rP_s}=(0,1,m)`) + ':', 'Rectas paralelas: distancia de un punto de ' + M('s') + ' a ' + M('r') + '. Con ' + M('P_r=(0,0,-m)') + ', ' + M(r`\vec d=(1,-1,1)`) + ' y ' + M(r`\overrightarrow{P_rP_s}=(0,1,m)`) + ':'),
            F(r`(0,1,m)\times(1,-1,1)=(1+m,\ m,\ -1)\quad\Rightarrow\quad d=\dfrac{\sqrt{(1+m)^2+m^2+1}}{\sqrt3}`),
            F(r`\dfrac{(1+m)^2+m^2+1}{3}=2\ \Rightarrow\ 2m^2+2m-4=0\ \Rightarrow\ m^2+m-2=0`),
            AN(r`m=1\ \text{ o }\ m=-2`),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op,
      intro: J(p('En una carretera principal hi trobem el poble ' + M('A') + '. A 12 km del poble ' + M('A') + ', hi ha un encreuament ' + M('O') + ' amb una carretera secundària que talla perpendicularment la carretera principal. A 9 km de l\u2019encreuament, a la carretera secundària, hi trobem el poble ' + M('B') + '. Es vol construir una torre de comunicacions ' + M('T') + ' en un punt de la carretera principal situat entre el poble ' + M('A') + ' i l\u2019encreuament ' + M('O') + '. Aquesta torre ha d\u2019estar connectada amb cadascun dels dos pobles en línia recta per cable. Sabem que instal·lar el cable entre la torre ' + M('T') + ' i el poble ' + M('B') + ' té un preu de 250 €/km i, en canvi, instal·lar el cable entre la torre ' + M('T') + ' i el poble ' + M('A') + ' té un preu de 125 €/km. Determineu a quina distància de l\u2019encreuament ' + M('O') + ' a la carretera principal cal situar la torre ' + M('T') + ' perquè el preu del cablejat sigui mínim i quin serà el valor d\u2019aquest preu mínim.',
                 'En una carretera principal encontramos el pueblo ' + M('A') + '. A 12 km del pueblo ' + M('A') + ', hay un cruce ' + M('O') + ' con una carretera secundaria que corta perpendicularmente la carretera principal. A 9 km del cruce, en la carretera secundaria, encontramos el pueblo ' + M('B') + '. Se quiere construir una torre de comunicaciones ' + M('T') + ' en un punto de la carretera principal situado entre el pueblo ' + M('A') + ' y el cruce ' + M('O') + '. Esta torre tiene que estar conectada con cada uno de los dos pueblos en línea recta por cable. Sabemos que instalar el cable entre la torre ' + M('T') + ' y el pueblo ' + M('B') + ' tiene un precio de 250 €/km y, en cambio, instalar el cable entre la torre ' + M('T') + ' y el pueblo ' + M('A') + ' tiene un precio de 125 €/km. Determine a qué distancia del cruce ' + M('O') + ' en la carretera principal hay que situar la torre ' + M('T') + ' para que el precio del cableado sea mínimo y cuál será el valor de este precio mínimo.'),
        img('2023-s5-e4', 1470, 870, 'Carretera principal amb A, T i O, i carretera secundària amb B', 'Carretera principal con A, T y O, y carretera secundaria con B')),
      parts: [
        { n: '4.1', pts: 2.5, q: T('Trobeu la distància ' + M('OT') + ' que minimitza el preu del cablejat i el valor d\u2019aquest preu mínim.', 'Encuentre la distancia ' + M('OT') + ' que minimiza el precio del cableado y el valor de este precio mínimo.'),
          sol: [
            p('Amb ' + M('O=(0,0)') + ', ' + M('A=(12,0)') + ', ' + M('B=(0,9)') + ' i ' + M('T=(x,0)') + ', ' + M('0\\le x\\le12') + ': ' + M(r`TB=\sqrt{x^2+81}`) + ' i ' + M('TA=12-x') + '.', 'Con ' + M('O=(0,0)') + ', ' + M('A=(12,0)') + ', ' + M('B=(0,9)') + ' y ' + M('T=(x,0)') + ', ' + M('0\\le x\\le12') + ': ' + M(r`TB=\sqrt{x^2+81}`) + ' y ' + M('TA=12-x') + '.'),
            F(r`C(x)=250\sqrt{x^2+81}+125(12-x)`),
            F(r`C'(x)=\dfrac{250x}{\sqrt{x^2+81}}-125=0\ \Rightarrow\ 2x=\sqrt{x^2+81}\ \Rightarrow\ 3x^2=81\ \Rightarrow\ x=3\sqrt3`),
            p('Mínim: ' + M("C'<0") + ' abans i ' + M("C'>0") + ' després; als extrems ' + M('C(0)=C(12)=3750') + ' €.', 'Mínimo: ' + M("C'<0") + ' antes y ' + M("C'>0") + ' después; en los extremos ' + M('C(0)=C(12)=3750') + ' €.'),
            fig(plot({ xr: [-1, 13], yr: [3300, 3900], tickx: [3.6, 6, 12], ticky: [3500, 3750], curves: [{ f: x => 250 * Math.sqrt(x * x + 81) + 125 * (12 - x), dom: [0, 12] }],
              points: [[3 * Math.sqrt(3), 1500 + 1125 * Math.sqrt(3)]], labels: [[5.6, 3425, 'mín (5,20 ; 3 448,56)']], alt: 'Gràfica del cost C(x) amb el mínim a x = 3√3' })),
            ans('La torre ha d\u2019estar a <b>' + M('3\\sqrt3\\approx5{,}20') + ' km</b> de l\u2019encreuament; preu mínim ' + M('C=250\\cdot6\\sqrt3+125(12-3\\sqrt3)=1500+1125\\sqrt3\\approx') + ' <b>3 448,56 €</b>.', 'La torre debe estar a <b>' + M('3\\sqrt3\\approx5{,}20') + ' km</b> del cruce; precio mínimo ' + M('C=250\\cdot6\\sqrt3+125(12-3\\sqrt3)=1500+1125\\sqrt3\\approx') + ' <b>3 448,56 €</b>.'),
          ] },
      ] },

    { n: 5, pts: 2.5, topic: TOP.ma,
      intro: p('Considereu la família ' + M('S') + ' de matrius de la forma ' + M(r`\begin{pmatrix}a&b\\b&a\end{pmatrix}`) + ', en què ' + M(r`a,b\in\mathbb R`) + '.', 'Considere la familia ' + M('S') + ' de matrices de la forma ' + M(r`\begin{pmatrix}a&b\\b&a\end{pmatrix}`) + ', en que ' + M(r`a,b\in\mathbb R`) + '.'),
      parts: [
        { n: '5.1', pts: 1.25, q: T('Calculeu ' + M(r`\begin{pmatrix}2&3\\3&2\end{pmatrix}\cdot\begin{pmatrix}2&1\\1&2\end{pmatrix}^{-1}`) + '.', 'Calcule ' + M(r`\begin{pmatrix}2&3\\3&2\end{pmatrix}\cdot\begin{pmatrix}2&1\\1&2\end{pmatrix}^{-1}`) + '.'),
          sol: [
            F(r`\begin{pmatrix}2&1\\1&2\end{pmatrix}^{-1}=\dfrac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\quad(\det=3)`),
            F(r`\begin{pmatrix}2&3\\3&2\end{pmatrix}\cdot\dfrac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}=\dfrac13\begin{pmatrix}1&4\\4&1\end{pmatrix}`),
            AN(r`\begin{pmatrix}\tfrac13&\tfrac43\\[2pt]\tfrac43&\tfrac13\end{pmatrix}`),
          ] },
        { n: '5.2', pts: 1.25, q: T('Trobeu totes les matrius de la família ' + M('S') + ', és a dir, de la forma ' + M(r`A=\begin{pmatrix}a&b\\b&a\end{pmatrix}`) + ', que verifiquin la igualtat ' + M('A^2=I') + ', en què ' + M('I') + ' és la matriu identitat d\u2019ordre 2.', 'Encuentre todas las matrices de la familia ' + M('S') + ', es decir, de la forma ' + M(r`A=\begin{pmatrix}a&b\\b&a\end{pmatrix}`) + ', que verifiquen la igualdad ' + M('A^2=I') + ', en que ' + M('I') + ' es la matriz identidad de orden 2.'),
          sol: [
            F(r`A^2=\begin{pmatrix}a^2+b^2&2ab\\2ab&a^2+b^2\end{pmatrix}=\begin{pmatrix}1&0\\0&1\end{pmatrix}\ \Rightarrow\ \begin{cases}a^2+b^2=1\\ab=0\end{cases}`),
            p('Si ' + M('a=0') + ': ' + M('b=\\pm1') + '. Si ' + M('b=0') + ': ' + M('a=\\pm1') + '.', 'Si ' + M('a=0') + ': ' + M('b=\\pm1') + '. Si ' + M('b=0') + ': ' + M('a=\\pm1') + '.'),
            AN(r`A\in\left\{\begin{pmatrix}1&0\\0&1\end{pmatrix},\ \begin{pmatrix}-1&0\\0&-1\end{pmatrix},\ \begin{pmatrix}0&1\\1&0\end{pmatrix},\ \begin{pmatrix}0&-1\\-1&0\end{pmatrix}\right\}`),
          ] },
      ] },

    { n: 6, pts: 2.5, topic: TOP.an,
      intro: p('Sigui la funció ' + M(r`f(x)=\dfrac{ax^2+x+b}{x^2+1}`) + '.', 'Sea la función ' + M(r`f(x)=\dfrac{ax^2+x+b}{x^2+1}`) + '.'),
      parts: [
        { n: '6.1', pts: 1.25, q: T('Calculeu els valors dels paràmetres ' + M('a') + ' i ' + M('b') + ' si sabem que la gràfica de la funció ' + M('f') + ' té un extrem relatiu a ' + M('x=-1') + ' i passa pel punt ' + M(r`P=\big(-2,\tfrac{13}{5}\big)`) + '.', 'Calcule los valores de los parámetros ' + M('a') + ' y ' + M('b') + ' si sabemos que la gráfica de la función ' + M('f') + ' tiene un extremo relativo en ' + M('x=-1') + ' y pasa por el punto ' + M(r`P=\big(-2,\tfrac{13}{5}\big)`) + '.'),
          sol: [
            F(r`f'(x)=\dfrac{(2ax+1)(x^2+1)-(ax^2+x+b)\,2x}{(x^2+1)^2}=\dfrac{-x^2+2(a-b)x+1}{(x^2+1)^2}`),
            ul(T('Extrem a ' + M('x=-1') + ': ' + M("f'(-1)=0") + ' ⇒ ' + M('-1-2(a-b)+1=0') + ' ⇒ ' + M('a=b') + '.', 'Extremo en ' + M('x=-1') + ': ' + M("f'(-1)=0") + ' ⇒ ' + M('-1-2(a-b)+1=0') + ' ⇒ ' + M('a=b') + '.'),
              T('Passa per ' + M(r`(-2,\tfrac{13}5)`) + ': ' + M(r`\tfrac{4a-2+b}{5}=\tfrac{13}{5}`) + ' ⇒ ' + M('4a+b=15') + '.', 'Pasa por ' + M(r`(-2,\tfrac{13}5)`) + ': ' + M(r`\tfrac{4a-2+b}{5}=\tfrac{13}{5}`) + ' ⇒ ' + M('4a+b=15') + '.')),
            p('Amb ' + M('a=b') + ': ' + M('5a=15') + '.', 'Con ' + M('a=b') + ': ' + M('5a=15') + '.'),
            AN(r`a=b=3`),
          ] },
        { n: '6.2', pts: 1.25, q: T('Per al cas ' + M('a=b') + ', calculeu i classifiqueu els extrems relatius de la funció.', 'Para el caso ' + M('a=b') + ', calcule y clasifique los extremos relativos de la función.'),
          sol: [
            p('Amb ' + M('a=b') + ': ' + M(r`f(x)=a+\dfrac{x}{x^2+1}`) + ' i ' + M(r`f'(x)=\dfrac{1-x^2}{(x^2+1)^2}`) + ', que no depèn d\u2019' + M('a') + '. S\u2019anul·la a ' + M('x=\\pm1') + ':', 'Con ' + M('a=b') + ': ' + M(r`f(x)=a+\dfrac{x}{x^2+1}`) + ' y ' + M(r`f'(x)=\dfrac{1-x^2}{(x^2+1)^2}`) + ', que no depende de ' + M('a') + '. Se anula en ' + M('x=\\pm1') + ':'),
            ul(T(M("f'<0") + ' si ' + M('x<-1') + ', ' + M("f'>0") + ' a ' + M('(-1,1)') + ', ' + M("f'<0") + ' si ' + M('x>1') + '.', M("f'<0") + ' si ' + M('x<-1') + ', ' + M("f'>0") + ' en ' + M('(-1,1)') + ', ' + M("f'<0") + ' si ' + M('x>1') + '.')),
            ans('<b>Mínim relatiu</b> a ' + M(r`\big(-1,\ a-\tfrac12\big)`) + ' i <b>màxim relatiu</b> a ' + M(r`\big(1,\ a+\tfrac12\big)`) + '. Per a ' + M('a=b=3') + ': mínim ' + M(r`(-1,\tfrac52)`) + ' i màxim ' + M(r`(1,\tfrac72)`) + '.', '<b>Mínimo relativo</b> en ' + M(r`\big(-1,\ a-\tfrac12\big)`) + ' y <b>máximo relativo</b> en ' + M(r`\big(1,\ a+\tfrac12\big)`) + '. Para ' + M('a=b=3') + ': mínimo ' + M(r`(-1,\tfrac52)`) + ' y máximo ' + M(r`(1,\tfrac72)`) + '.'),
            fig(plot({ xr: [-6, 6], yr: [2, 4], tickx: [-4, -1, 1, 4], ticky: [3], curves: [{ f: x => 3 + x / (x * x + 1), dom: [-6, 6], k: 0 }],
              points: [[-1, 2.5], [1, 3.5]], labels: [[-0.9, 2.35, 'mín (−1, 5/2)'], [1.2, 3.65, 'màx (1, 7/2)']], alt: 'Gràfica de f amb a = b = 3: mínim a x = −1 i màxim a x = 1' })),
          ] },
      ] },
  ],
};

module.exports = {
  year: { y: 2023, title: T('PAU 2023', 'PAU 2023'), series: [s1, s2, s5] },
};
