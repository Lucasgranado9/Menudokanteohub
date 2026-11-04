/* PAU 2026 · Matemàtiques II · sèries 1, 2 i 5 (enunciats oficials, solucions pròpies). */
const { M, D, T, p, ans, ul, html, J, plot, r } = require('./pau-lib');

const TOP = {
  an: T('Anàlisi', 'Análisis'), al: T('Àlgebra', 'Álgebra'), pr: T('Probabilitat i anàlisi', 'Probabilidad y análisis'),
  op: T('Optimització · Geometria', 'Optimización · Geometría'), ge: T('Anàlisi · Geometria', 'Análisis · Geometría'),
};
const FIGS = '';

/* ───────────────────────── SÈRIE 1 ───────────────────────── */
const s1 = {
  id: 1, pdf: 'pdf/pau/pau-2026-mates-serie1.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: J(p('Considereu la funció definida a trossos:', 'Considere la siguiente función definida a trozos:'),
        html(D(r`f(x)=\begin{cases}5e^{2x}&x\le 0\\(x+m)^2+1&0<x<2\\1&2\le x\end{cases}`)),
        p('on ' + M('m') + ' és un paràmetre real.', 'donde ' + M('m') + ' es un parámetro real.')),
      parts: [
        { n: '1.1', pts: 1,
          q: T('Determineu els valors de ' + M('m') + ' que fan que la funció ' + M('f(x)') + ' sigui contínua a tot el seu domini. Justifiqueu la resposta.',
               'Determine los valores de ' + M('m') + ' que hacen que la función ' + M('f(x)') + ' sea continua en todo su dominio. Justifique la respuesta.'),
          sol: [
            p('Cada tros és continu al seu interval (exponencial, polinomi i constant). Només cal vigilar els punts on canvia la fórmula: ' + M('x=0') + ' i ' + M('x=2') + '.',
              'Cada trozo es continuo en su intervalo (exponencial, polinomio y constante). Solo hay que vigilar los puntos donde cambia la fórmula: ' + M('x=0') + ' y ' + M('x=2') + '.'),
            p('<b>En ' + M('x=0') + ':</b> ' + M(r`f(0)=\lim_{x\to0^-}5e^{2x}=5`) + ' i ' + M(r`\lim_{x\to0^+}\big[(x+m)^2+1\big]=m^2+1`) + '. Cal que ' + M('m^2+1=5') + ', és a dir ' + M('m=\\pm2') + '.',
              '<b>En ' + M('x=0') + ':</b> ' + M(r`f(0)=\lim_{x\to0^-}5e^{2x}=5`) + ' y ' + M(r`\lim_{x\to0^+}\big[(x+m)^2+1\big]=m^2+1`) + '. Hace falta ' + M('m^2+1=5') + ', es decir ' + M('m=\\pm2') + '.'),
            p('<b>En ' + M('x=2') + ':</b> ' + M(r`\lim_{x\to2^-}\big[(x+m)^2+1\big]=(2+m)^2+1`) + ' i ' + M(r`f(2)=\lim_{x\to2^+}1=1`) + '. Cal que ' + M('(2+m)^2=0') + ', és a dir ' + M('m=-2') + '.',
              '<b>En ' + M('x=2') + ':</b> ' + M(r`\lim_{x\to2^-}\big[(x+m)^2+1\big]=(2+m)^2+1`) + ' y ' + M(r`f(2)=\lim_{x\to2^+}1=1`) + '. Hace falta ' + M('(2+m)^2=0') + ', es decir ' + M('m=-2') + '.'),
            ans('Les dues condicions només es compleixen alhora si ' + M('m=-2') + '.', 'Las dos condiciones solo se cumplen a la vez si ' + M('m=-2') + '.'),
          ] },
        { n: '1.2', pts: 1,
          q: T('Feu un esbós de la gràfica de ' + M('y=f(x)') + ' per al cas ' + M('m=-2') + ' i calculeu l\u2019àrea delimitada per aquesta gràfica, l\u2019eix ' + M('OX') + ' i les rectes ' + M('x=-1') + ' i ' + M('x=3') + '.',
               'Haga un esbozo de la gráfica de ' + M('y=f(x)') + ' para el caso ' + M('m=-2') + ', y calcule el área delimitada por esta gráfica, el eje ' + M('OX') + ' y las rectas ' + M('x=-1') + ' y ' + M('x=3') + '.'),
          sol: [
            p('Per a ' + M('m=-2') + ': ' + M(r`f(x)=5e^{2x}`) + ' si ' + M('x\\le0') + ', ' + M('(x-2)^2+1') + ' si ' + M('0<x<2') + ' i ' + M('1') + ' si ' + M('x\\ge2') + '. La gràfica és sempre positiva (parteix de 5 a ' + M('x=0') + ', baixa a 1 a ' + M('x=2') + ' i es queda constant).',
              'Para ' + M('m=-2') + ': ' + M(r`f(x)=5e^{2x}`) + ' si ' + M('x\\le0') + ', ' + M('(x-2)^2+1') + ' si ' + M('0<x<2') + ' y ' + M('1') + ' si ' + M('x\\ge2') + '. La gráfica es siempre positiva (parte de 5 en ' + M('x=0') + ', baja a 1 en ' + M('x=2') + ' y se queda constante).'),
            html('<figure class="pfig">' + plot({ xr: [-1.6, 3.6], yr: [-0.4, 6.2], tickx: [-1, 0, 1, 2, 3], ticky: [1, 5], vlines: [-1, 3],
              curves: [{ f: x => 5 * Math.exp(2 * x), dom: [-1.6, 0], k: 0 }, { f: x => (x - 2) ** 2 + 1, dom: [0, 2], k: 0 }, { f: () => 1, dom: [2, 3.6], k: 0 }],
              fill: { f: x => x <= 0 ? 5 * Math.exp(2 * x) : x < 2 ? (x - 2) ** 2 + 1 : 1, a: -1, b: 3, n: 240 },
              alt: 'Gràfica de f per a m = -2 amb l\u2019àrea ombrejada entre x = -1 i x = 3' }) + '</figure>'),
            p('Com que ' + M('f>0') + ', l\u2019àrea és la integral entre ' + M('-1') + ' i ' + M('3') + ', partida en tres trams:', 'Como ' + M('f>0') + ', el área es la integral entre ' + M('-1') + ' y ' + M('3') + ', partida en tres tramos:'),
            html(D(r`A=\int_{-1}^{0}5e^{2x}dx+\int_{0}^{2}\big[(x-2)^2+1\big]dx+\int_{2}^{3}1\,dx`)),
            html(D(r`=\Big[\tfrac52e^{2x}\Big]_{-1}^{0}+\Big[\tfrac{(x-2)^3}{3}+x\Big]_0^2+1=\tfrac52\big(1-e^{-2}\big)+\tfrac{14}{3}+1`)),
            ans('<b>' + M(r`A=\dfrac{49}{6}-\dfrac{5}{2e^{2}}\approx 7{,}83\ \text{u}^2`) + '</b>', '<b>' + M(r`A=\dfrac{49}{6}-\dfrac{5}{2e^{2}}\approx 7{,}83\ \text{u}^2`) + '</b>'),
          ] },
        { n: '1.3', pts: 0.5,
          q: T('Per a ' + M('m=-2') + ', trobeu un punt on la recta tangent a ' + M('y=f(x)') + ' sigui paral·lela a ' + M('y=-2x') + '. Calculeu l\u2019equació d\u2019aquesta recta tangent.',
               'Para ' + M('m=-2') + ', encuentre un punto donde la recta tangente a ' + M('y=f(x)') + ' sea paralela a ' + M('y=-2x') + '. Calcule la ecuación de esta recta tangente.'),
          sol: [
            p('Cal que ' + M("f'(x)=-2") + '. Per a ' + M('x<0') + ', ' + M("f'(x)=10e^{2x}>0") + ' i per a ' + M('x>2') + ', ' + M("f'(x)=0") + ': no serveixen. A ' + M('0<x<2') + ', ' + M("f'(x)=2(x-2)") + '.',
              'Hace falta ' + M("f'(x)=-2") + '. Para ' + M('x<0') + ', ' + M("f'(x)=10e^{2x}>0") + ' y para ' + M('x>2') + ', ' + M("f'(x)=0") + ': no sirven. En ' + M('0<x<2') + ', ' + M("f'(x)=2(x-2)") + '.'),
            html(D(r`2(x-2)=-2\ \Rightarrow\ x=1,\qquad f(1)=(1-2)^2+1=2`)),
            p('Tangent al punt ' + M('(1,2)') + ' amb pendent ' + M('-2') + ':', 'Tangente en el punto ' + M('(1,2)') + ' con pendiente ' + M('-2') + ':'),
            ans('<b>' + M('y-2=-2(x-1)\\ \\Longleftrightarrow\\ y=-2x+4') + '</b>', '<b>' + M('y-2=-2(x-1)\\ \\Longleftrightarrow\\ y=-2x+4') + '</b>'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions lineals següent, format per tres plans a l\u2019espai i que depèn del paràmetre real ' + M('m') + ':',
                 'Considere el siguiente sistema de ecuaciones lineales, el cual está formado por tres planos en el espacio y depende del parámetro real ' + M('m') + ':'),
        html(D(r`\begin{cases}x+my+z=4\\x+3y+z=5\\mx+y+z=4\end{cases}`))),
      parts: [
        { n: '2.1', pts: 1,
          q: T('Discutiu el sistema per als diferents valors del paràmetre ' + M('m') + '.', 'Discuta el sistema para los diferentes valores del parámetro ' + M('m') + '.'),
          sol: [
            p('El determinant de la matriu de coeficients és (Sarrus):', 'El determinante de la matriz de coeficientes es (Sarrus):'),
            html(D(r`|A|=\begin{vmatrix}1&m&1\\1&3&1\\m&1&1\end{vmatrix}=(3+m^2+1)-(3m+1+m)=m^2-4m+3=(m-1)(m-3)`)),
            ul(T('<b>' + M('m\\ne1,3') + ':</b> ' + M('|A|\\ne0') + ', ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ': <b>sistema compatible determinat</b>.', '<b>' + M('m\\ne1,3') + ':</b> ' + M('|A|\\ne0') + ', ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ': <b>sistema compatible determinado</b>.'),
              T('<b>' + M('m=1') + ':</b> la 1a i la 3a equació són iguals (' + M('x+y+z=4') + ') i el menor ' + M(r`\begin{vmatrix}1&1\\1&3\end{vmatrix}=2\ne0`) + '; ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=2<3`) + ': <b>compatible indeterminat</b>.', '<b>' + M('m=1') + ':</b> la 1.ª y la 3.ª ecuación son iguales (' + M('x+y+z=4') + ') y el menor ' + M(r`\begin{vmatrix}1&1\\1&3\end{vmatrix}=2\ne0`) + '; ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=2<3`) + ': <b>compatible indeterminado</b>.'),
              T('<b>' + M('m=3') + ':</b> la 1a i la 2a equació tenen els mateixos coeficients però termes independents diferents (' + M('4\\ne5') + '), així que ' + M(r`\operatorname{rang}A=2`) + ' i, amb el menor ' + M(r`\begin{vmatrix}1&1&4\\1&1&5\\3&1&4\end{vmatrix}=2\ne0`) + ' (columnes 1, 3 i termes), ' + M(r`\operatorname{rang}A^*=3`) + ': <b>sistema incompatible</b>.', '<b>' + M('m=3') + ':</b> la 1.ª y la 2.ª ecuación tienen los mismos coeficientes pero términos independientes distintos (' + M('4\\ne5') + '), así que ' + M(r`\operatorname{rang}A=2`) + ' y, con el menor ' + M(r`\begin{vmatrix}1&1&4\\1&1&5\\3&1&4\end{vmatrix}=2\ne0`) + ' (columnas 1, 3 y términos), ' + M(r`\operatorname{rang}A^*=3`) + ': <b>sistema incompatible</b>.')),
          ] },
        { n: '2.2', pts: 1,
          q: T('Interpreteu geomètricament aquest sistema per a tots els valors del paràmetre ' + M('m') + ' i resoleu-lo, si és possible, per al cas ' + M('m=1') + '.', 'Interprete geométricamente este sistema para todos los valores del parámetro ' + M('m') + ' y resuélvalo, si es posible, para el caso ' + M('m=1') + '.'),
          sol: [
            ul(T('<b>' + M('m\\ne1,3') + ':</b> els tres plans es tallen en <b>un únic punt</b>.', '<b>' + M('m\\ne1,3') + ':</b> los tres planos se cortan en <b>un único punto</b>.'),
              T('<b>' + M('m=1') + ':</b> el 1r i el 3r pla són <b>coincidents</b> i el 2n els talla segons una <b>recta</b>.', '<b>' + M('m=1') + ':</b> el 1.º y el 3.º plano son <b>coincidentes</b> y el 2.º los corta según una <b>recta</b>.'),
              T('<b>' + M('m=3') + ':</b> el 1r i el 2n pla són <b>paral·lels</b> (no coincidents) i el 3r els talla: <b>no hi ha cap punt comú</b>.', '<b>' + M('m=3') + ':</b> el 1.º y el 2.º plano son <b>paralelos</b> (no coincidentes) y el 3.º los corta: <b>no hay ningún punto común</b>.')),
            p('Per a ' + M('m=1') + ' el sistema queda ' + M('x+y+z=4') + ', ' + M('x+3y+z=5') + '. Restant: ' + M('2y=1') + ', així ' + M('y=\\tfrac12') + ' i ' + M('x+z=\\tfrac72') + '.', 'Para ' + M('m=1') + ' el sistema queda ' + M('x+y+z=4') + ', ' + M('x+3y+z=5') + '. Restando: ' + M('2y=1') + ', así ' + M('y=\\tfrac12') + ' y ' + M('x+z=\\tfrac72') + '.'),
            ans('<b>' + M(r`(x,y,z)=\big(\lambda,\ \tfrac12,\ \tfrac72-\lambda\big),\ \lambda\in\mathbb R`) + '</b>', '<b>' + M(r`(x,y,z)=\big(\lambda,\ \tfrac12,\ \tfrac72-\lambda\big),\ \lambda\in\mathbb R`) + '</b>'),
          ] },
        { n: '2.3', pts: 0.5,
          q: T('Per a ' + M('m=1') + ', és possible afegir una quarta equació de manera que el sistema resultant sigui compatible determinat i tingui com a solució ' + M(r`(x,y,z)=\left(3,\tfrac12,\tfrac12\right)`) + '? Raoneu la resposta.',
               'Para ' + M('m=1') + ', ¿es posible añadir una cuarta ecuación de manera que el sistema resultante sea compatible determinado y tenga como solución ' + M(r`(x,y,z)=\left(3,\tfrac12,\tfrac12\right)`) + '? Razone la respuesta.'),
          sol: [
            p('<b>Sí.</b> El punt ' + M(r`\left(3,\tfrac12,\tfrac12\right)`) + ' és de la recta de solucions (és el cas ' + M('\\lambda=3') + ': ' + M(r`3+\tfrac12+\tfrac12=4`) + ' i ' + M(r`3+\tfrac32+\tfrac12=5`) + ' ✓). Només cal afegir un pla que passi per aquest punt i no contingui la recta, de manera que la talli només en ell.',
              '<b>Sí.</b> El punto ' + M(r`\left(3,\tfrac12,\tfrac12\right)`) + ' pertenece a la recta de soluciones (es el caso ' + M('\\lambda=3') + ': ' + M(r`3+\tfrac12+\tfrac12=4`) + ' y ' + M(r`3+\tfrac32+\tfrac12=5`) + ' ✓). Basta añadir un plano que pase por este punto y no contenga la recta, de modo que la corte solo en él.'),
            p('Per exemple, ' + M('x=3') + ': ara ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ' (tantes com incògnites) i la solució és única.', 'Por ejemplo, ' + M('x=3') + ': ahora ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ' (tantos como incógnitas) y la solución es única.'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pr,
      intro: p('L\u2019Ajuntament de Canet de Mar ha aconseguit 24 entrades gratuïtes per a un concert d\u2019un grup de <i>rock</i> català i ha decidit sortejar-les entre els veïns interessats a assistir-hi. Tots els veïns del poble seguidors d\u2019aquest grup s\u2019apunten al sorteig, i només al 16 % d\u2019ells els toca una entrada. Dels altres seguidors del grup, sis setens intenten comprar una entrada a través del web, on la probabilitat d\u2019aconseguir-la és del 25 %.',
               'El Ayuntamiento de Canet de Mar ha conseguido 24 entradas gratuitas para un concierto de un grupo de <i>rock</i> catalán, y ha decidido sortearlas entre los vecinos interesados en asistir. Todos los vecinos del pueblo seguidores de este grupo se apuntan al sorteo, y solo al 16 % de ellos les toca una entrada. Del resto de seguidores del grupo, seis séptimas partes intentan comprar una entrada a través de la web, donde la probabilidad de conseguirla es del 25 %.'),
      parts: [
        { n: '3.1', pts: 0.75,
          q: T('Quantes persones d\u2019aquest municipi tenen entrada per al concert?', '¿Cuántas personas de este municipio tienen entrada para el concierto?'),
          sol: [
            p('Seguidors del grup: ' + M('0{,}16\\,N=24') + ' ⇒ ' + M('N=150') + '.', 'Seguidores del grupo: ' + M('0{,}16\\,N=24') + ' ⇒ ' + M('N=150') + '.'),
            p('Sense entrada del sorteig: ' + M('150-24=126') + '. Intenten el web: ' + M(r`\tfrac67\cdot126=108`) + '. Ho aconsegueixen: ' + M('0{,}25\\cdot108=27') + '.', 'Sin entrada del sorteo: ' + M('150-24=126') + '. Intentan la web: ' + M(r`\tfrac67\cdot126=108`) + '. Lo consiguen: ' + M('0{,}25\\cdot108=27') + '.'),
            ans('<b>' + M('24+27=51') + ' persones</b> tenen entrada.', '<b>' + M('24+27=51') + ' personas</b> tienen entrada.'),
          ] },
        { n: '3.2', pts: 0.75,
          q: T('Si s\u2019escull a l\u2019atzar un veí de Canet seguidor d\u2019aquest grup de <i>rock</i> i no té entrada per al concert, quina és la probabilitat que hagi intentat aconseguir-la via web?',
               'Si se escoge al azar un vecino de Canet seguidor de este grupo de <i>rock</i> y no tiene entrada para el concierto, ¿cuál es la probabilidad de que haya intentado conseguirla vía web?'),
          sol: [
            p('Sense entrada: ' + M('150-51=99') + ' persones. D\u2019aquestes, han intentat el web i no ho han aconseguit ' + M('108-27=81') + ' (les altres ' + M('18') + ' no ho han intentat).', 'Sin entrada: ' + M('150-51=99') + ' personas. De ellas, han intentado la web y no lo han conseguido ' + M('108-27=81') + ' (las otras ' + M('18') + ' no lo han intentado).'),
            ans('<b>' + M(r`P=\dfrac{81}{99}=\dfrac{9}{11}\approx0{,}818`) + '</b>', '<b>' + M(r`P=\dfrac{81}{99}=\dfrac{9}{11}\approx0{,}818`) + '</b>'),
          ] },
        { n: '3.3', pts: 1,
          q: T('El dia del concert, l\u2019equip de so mesura el nivell de decibels generat pels crits entusiastes del públic al llarg dels 5 minuts de durada de la cançó més famosa del grup; es pot aproximar per la funció ' + M('S(t)=-t^3+12t^2-30t+90') + ', ' + M('t\\in[0,5]') + ', on ' + M('t') + ' és el temps en minuts i ' + M('S(t)') + ' els decibels. Quan se superen els 100 decibels es considera que el públic està molt entregat i s\u2019activen automàticament uns efectes lumínics especials. S\u2019activaran en algun moment durant aquests cinc minuts? Si la resposta és afirmativa, calculeu en quin minut s\u2019activen, aproximat a les dècimes.',
               'El día del concierto, el equipo de sonido mide el nivel de decibelios generado por los gritos entusiastas del público a lo largo de los 5 minutos de duración de la canción más famosa del grupo; se puede aproximar por la función ' + M('S(t)=-t^3+12t^2-30t+90') + ', ' + M('t\\in[0,5]') + ', donde ' + M('t') + ' es el tiempo en minutos y ' + M('S(t)') + ' los decibelios. Cuando se superan los 100 decibelios se considera que el público está muy entregado y se activan automáticamente unos efectos lumínicos especiales. ¿Se activarán en algún momento durante estos cinco minutos? Si la respuesta es afirmativa, calcule en qué minuto se activan, aproximado a las décimas.'),
          sol: [
            p('Busquem el màxim de ' + M('S') + ' a ' + M('[0,5]') + ': ' + M("S'(t)=-3t^2+24t-30=0") + ' ⇒ ' + M('t^2-8t+10=0') + ' ⇒ ' + M(r`t=4\pm\sqrt6`) + '. Només ' + M(r`t=4-\sqrt6\approx1{,}55`) + ' és a l\u2019interval, i és un <i>mínim</i> (' + M('S\\approx68{,}6') + ').',
              'Buscamos el máximo de ' + M('S') + ' en ' + M('[0,5]') + ': ' + M("S'(t)=-3t^2+24t-30=0") + ' ⇒ ' + M('t^2-8t+10=0') + ' ⇒ ' + M(r`t=4\pm\sqrt6`) + '. Solo ' + M(r`t=4-\sqrt6\approx1{,}55`) + ' está en el intervalo, y es un <i>mínimo</i> (' + M('S\\approx68{,}6') + ').'),
            p('Comparem els extrems: ' + M('S(0)=90') + ' i ' + M('S(5)=115') + '. El màxim és ' + M('115>100') + ': <b>sí que s\u2019activaran</b>. Com que ' + M('S') + ' creix de ' + M('t\\approx1{,}55') + ' a ' + M('5') + ', talla ' + M('100') + ' una sola vegada.',
              'Comparamos los extremos: ' + M('S(0)=90') + ' y ' + M('S(5)=115') + '. El máximo es ' + M('115>100') + ': <b>sí se activarán</b>. Como ' + M('S') + ' crece de ' + M('t\\approx1{,}55') + ' a ' + M('5') + ', corta ' + M('100') + ' una sola vez.'),
            p('Resolem ' + M('S(t)=100') + ' per tanteig: ' + M('S(4)=98') + ', ' + M('S(4{,}1)\\approx99{,}8') + ', ' + M('S(4{,}2)\\approx101{,}6') + ' ⇒ ' + M('t\\approx4{,}11') + '.', 'Resolvemos ' + M('S(t)=100') + ' por tanteo: ' + M('S(4)=98') + ', ' + M('S(4{,}1)\\approx99{,}8') + ', ' + M('S(4{,}2)\\approx101{,}6') + ' ⇒ ' + M('t\\approx4{,}11') + '.'),
            ans('<b>S\u2019activen cap al minut ' + M('4{,}1') + '.</b>', '<b>Se activan hacia el minuto ' + M('4{,}1') + '.</b>'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op, choose: true,
      opts: [
        { k: 'A',
          intro: p('L\u2019alcalde d\u2019un poble de Catalunya encarrega a l\u2019arquitecte municipal el disseny d\u2019un parc infantil que es construirà en un terreny públic. Per complir la normativa vigent, al parc hi ha d\u2019haver dos espais ben delimitats: un per a una boca de reg —el qual, segons l\u2019arquitecte, ha de tenir forma circular— i un altre per a una caseta on guardar les eines de manteniment —el qual ha de tenir forma quadrada—. Per motius estètics, l\u2019arquitecte vol delimitar cadascun d\u2019aquests dos espais amb una barana de forja. Sabent que les dues baranes fan exactament 10 m de longitud en total, quina mesura ha de tenir la barana de cada espai perquè la suma de les superfícies dels dos espais sigui la més petita possible? Quina és aquesta superfície mínima?',
                   'El alcalde de un pueblo de Cataluña encarga al arquitecto municipal el diseño de un parque infantil que se construirá en un terreno público. Para cumplir con la normativa vigente, en el parque tiene que haber dos espacios bien delimitados: uno para una boca de riego —el cual, según el arquitecto, debe tener forma circular— y otro para una caseta donde guardar las herramientas de mantenimiento —el cual debe tener forma cuadrada—. Por motivos estéticos, el arquitecto quiere delimitar cada uno de estos dos espacios con una barandilla de forja. Sabiendo que las dos barandillas miden exactamente 10 m de longitud en total, ¿qué medida debe tener la barandilla de cada espacio para que la suma de las superficies de los dos espacios sea lo más pequeña posible? ¿Cuál es esta superficie mínima?'),
          parts: [{ n: '', pts: 2.5, q: null, sol: [
            p('Sigui ' + M('r') + ' el radi del cercle i ' + M('a') + ' el costat del quadrat. Restricció: ' + M('2\\pi r+4a=10') + ' ⇒ ' + M(r`a=\dfrac{5-\pi r}{2}`) + '.', 'Sea ' + M('r') + ' el radio del círculo y ' + M('a') + ' el lado del cuadrado. Restricción: ' + M('2\\pi r+4a=10') + ' ⇒ ' + M(r`a=\dfrac{5-\pi r}{2}`) + '.'),
            p('Superfície total: ' + M(r`S(r)=\pi r^2+\dfrac{(5-\pi r)^2}{4}`) + ', amb ' + M(r`0<r<\dfrac5\pi`) + '.', 'Superficie total: ' + M(r`S(r)=\pi r^2+\dfrac{(5-\pi r)^2}{4}`) + ', con ' + M(r`0<r<\dfrac5\pi`) + '.'),
            html(D(r`S'(r)=2\pi r-\dfrac{\pi(5-\pi r)}{2}=0\ \Rightarrow\ 4r-5+\pi r=0\ \Rightarrow\ r=\dfrac{5}{4+\pi}\approx0{,}70\ \text{m}`)),
            p(M(r`S''(r)=2\pi+\tfrac{\pi^2}{2}>0`) + ': és un <b>mínim</b>. Aleshores ' + M(r`a=\dfrac{10}{4+\pi}\approx1{,}40\ \text{m}`) + ' (és ' + M('a=2r') + ').', M(r`S''(r)=2\pi+\tfrac{\pi^2}{2}>0`) + ': es un <b>mínimo</b>. Entonces ' + M(r`a=\dfrac{10}{4+\pi}\approx1{,}40\ \text{m}`) + ' (es ' + M('a=2r') + ').'),
            ul(T('Barana circular: ' + M(r`2\pi r=\dfrac{10\pi}{4+\pi}\approx4{,}40\ \text{m}`), 'Barandilla circular: ' + M(r`2\pi r=\dfrac{10\pi}{4+\pi}\approx4{,}40\ \text{m}`)),
              T('Barana quadrada: ' + M(r`4a=\dfrac{40}{4+\pi}\approx5{,}60\ \text{m}`), 'Barandilla cuadrada: ' + M(r`4a=\dfrac{40}{4+\pi}\approx5{,}60\ \text{m}`))),
            ans('Superfície mínima: <b>' + M(r`S=\pi r^2+a^2=\dfrac{25}{4+\pi}\approx3{,}50\ \text{m}^2`) + '</b>', 'Superficie mínima: <b>' + M(r`S=\pi r^2+a^2=\dfrac{25}{4+\pi}\approx3{,}50\ \text{m}^2`) + '</b>'),
          ] }] },
        { k: 'B',
          intro: p('Considereu els punts de l\u2019espai ' + M('P=(1,0,-1)') + ', ' + M('Q=(3,-2,0)') + ' i ' + M('R=(1,1,1)') + '.', 'Considere los puntos del espacio ' + M('P=(1,0,-1)') + ', ' + M('Q=(3,-2,0)') + ' y ' + M('R=(1,1,1)') + '.'),
          parts: [
            { n: '4.1', pts: 0.75, q: T('Calculeu l\u2019equació del pla que conté els punts ' + M('P') + ', ' + M('Q') + ' i ' + M('R') + '.', 'Calcule la ecuación del plano que contiene los puntos ' + M('P') + ', ' + M('Q') + ' y ' + M('R') + '.'),
              sol: [
                p('Vectors: ' + M(r`\overrightarrow{PQ}=(2,-2,1)`) + ', ' + M(r`\overrightarrow{PR}=(0,1,2)`) + '. Normal:', 'Vectores: ' + M(r`\overrightarrow{PQ}=(2,-2,1)`) + ', ' + M(r`\overrightarrow{PR}=(0,1,2)`) + '. Normal:'),
                html(D(r`\vec n=\overrightarrow{PQ}\times\overrightarrow{PR}=\begin{vmatrix}\vec\imath&\vec\jmath&\vec k\\2&-2&1\\0&1&2\end{vmatrix}=(-5,-4,2)`)),
                p('Pla pel punt ' + M('P') + ': ' + M('-5(x-1)-4y+2(z+1)=0') + '.', 'Plano por el punto ' + M('P') + ': ' + M('-5(x-1)-4y+2(z+1)=0') + '.'),
                ans('<b>' + M('\\pi:\\ 5x+4y-2z-7=0') + '</b> (comprovació: ' + M('Q:\\ 15-8-0-7=0') + ', ' + M('R:\\ 5+4-2-7=0') + ')', '<b>' + M('\\pi:\\ 5x+4y-2z-7=0') + '</b> (comprobación: ' + M('Q:\\ 15-8-0-7=0') + ', ' + M('R:\\ 5+4-2-7=0') + ')'),
              ] },
            { n: '4.2', pts: 0.75, q: T('Comproveu que l\u2019àrea del triangle ' + M(r`\triangle PQR`) + ' és ' + M(r`\dfrac{3\sqrt5}{2}\,\text{u}^2`) + '.', 'Compruebe que el área del triángulo ' + M(r`\triangle PQR`) + ' es ' + M(r`\dfrac{3\sqrt5}{2}\,\text{u}^2`) + '.'),
              sol: [
                p('L\u2019àrea és la meitat del mòdul del producte vectorial de l\u2019apartat anterior:', 'El área es la mitad del módulo del producto vectorial del apartado anterior:'),
                html(D(r`A=\tfrac12\left|\overrightarrow{PQ}\times\overrightarrow{PR}\right|=\tfrac12\sqrt{25+16+4}=\tfrac12\sqrt{45}=\dfrac{3\sqrt5}{2}\ \text{u}^2\ \checkmark`)),
              ] },
            { n: '4.3', pts: 1, q: T('Determineu les condicions que han de complir les coordenades d\u2019un quart punt ' + M('S=(x,y,z)') + ' perquè ' + M('P') + ', ' + M('Q') + ', ' + M('R') + ' i ' + M('S') + ' formin un tetraedre de volum 1. (El volum del tetraedre format pels punts ' + M('P,Q,R') + ' i ' + M('S') + ' és ' + M(r`V=\dfrac{\text{àrea}(\triangle PQR)\cdot\text{alçada}}{3}`) + ').',
              'Determine las condiciones que deben cumplir las coordenadas de un cuarto punto ' + M('S=(x,y,z)') + ' para que ' + M('P') + ', ' + M('Q') + ', ' + M('R') + ' y ' + M('S') + ' formen un tetraedro de volumen 1. (El volumen del tetraedro formado por los puntos ' + M('P,Q,R') + ' y ' + M('S') + ' es ' + M(r`V=\dfrac{\text{área}(\triangle PQR)\cdot\text{altura}}{3}`) + ').'),
              sol: [
                p('L\u2019alçada és la distància de ' + M('S') + ' al pla ' + M('\\pi') + ':', 'La altura es la distancia de ' + M('S') + ' al plano ' + M('\\pi') + ':'),
                html(D(r`1=\dfrac{\frac{3\sqrt5}{2}\cdot h}{3}\ \Rightarrow\ h=\dfrac{2}{\sqrt5}`)),
                html(D(r`d(S,\pi)=\dfrac{|5x+4y-2z-7|}{\sqrt{25+16+4}}=\dfrac{|5x+4y-2z-7|}{3\sqrt5}=\dfrac2{\sqrt5}\ \Rightarrow\ |5x+4y-2z-7|=6`)),
                ans('<b>' + M('5x+4y-2z=13') + '</b> o <b>' + M('5x+4y-2z=1') + '</b> (dos plans paral·lels a ' + M('\\pi') + ' a distància ' + M(r`2/\sqrt5`) + ').', '<b>' + M('5x+4y-2z=13') + '</b> o <b>' + M('5x+4y-2z=1') + '</b> (dos planos paralelos a ' + M('\\pi') + ' a distancia ' + M(r`2/\sqrt5`) + ').'),
              ] },
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 2 ───────────────────────── */
const s2 = {
  id: 2, pdf: 'pdf/pau/pau-2026-mates-serie2.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: J(p('Considereu la funció', 'Considere la función'), html(D(r`f(x)=\dfrac{5x}{x^2+1}\,.`))),
      parts: [
        { n: '1.1', pts: 1, q: T('Estudieu-ne el domini i els intervals de creixement i decreixement, així com els seus possibles màxims i mínims locals.', 'Estudie su dominio y sus intervalos de crecimiento y decrecimiento, así como sus posibles máximos y mínimos locales.'),
          sol: [
            p('<b>Domini:</b> ' + M('x^2+1>0') + ' sempre, per tant ' + M(r`\operatorname{Dom}f=\mathbb R`) + '.', '<b>Dominio:</b> ' + M('x^2+1>0') + ' siempre, por tanto ' + M(r`\operatorname{Dom}f=\mathbb R`) + '.'),
            html(D(r`f'(x)=\dfrac{5(x^2+1)-5x\cdot2x}{(x^2+1)^2}=\dfrac{5(1-x^2)}{(x^2+1)^2}`)),
            p('El denominador és sempre positiu, així que el signe el decideix ' + M('1-x^2') + ': ' + M("f'(x)=0") + ' per a ' + M('x=\\pm1') + '.', 'El denominador es siempre positivo, así que el signo lo decide ' + M('1-x^2') + ': ' + M("f'(x)=0") + ' para ' + M('x=\\pm1') + '.'),
            html('<table class="pt-tab"><tr><th>' + M('x') + '</th><td>' + M(r`(-\infty,-1)`) + '</td><td>' + M(r`(-1,1)`) + '</td><td>' + M(r`(1,+\infty)`) + '</td></tr><tr><th>' + M("f'") + '</th><td>−</td><td>+</td><td>−</td></tr><tr><th>' + M('f') + '</th><td>↘</td><td>↗</td><td>↘</td></tr></table>'),
            ul(T('Decreix a ' + M(r`(-\infty,-1)`) + ' i ' + M(r`(1,+\infty)`) + '; creix a ' + M('(-1,1)') + '.', 'Decrece en ' + M(r`(-\infty,-1)`) + ' y ' + M(r`(1,+\infty)`) + '; crece en ' + M('(-1,1)') + '.'),
              T('<b>Mínim local</b> a ' + M(r`\left(-1,-\tfrac52\right)`) + '.', '<b>Mínimo local</b> en ' + M(r`\left(-1,-\tfrac52\right)`) + '.'),
              T('<b>Màxim local</b> a ' + M(r`\left(1,\tfrac52\right)`) + '.', '<b>Máximo local</b> en ' + M(r`\left(1,\tfrac52\right)`) + '.')),
          ] },
        { n: '1.2', pts: 0.75, q: T('Calculeu les equacions de totes les asímptotes d\u2019aquesta funció (si en té) i dibuixeu-ne un esbós de la gràfica.', 'Calcule las ecuaciones de todas las asíntotas de esta función (si tiene) y dibuje un esbozo de su gráfica.'),
          sol: [
            ul(T('<b>Verticals:</b> cap, perquè el denominador no s\u2019anul·la.', '<b>Verticales:</b> ninguna, porque el denominador no se anula.'),
              T('<b>Horitzontal:</b> ' + M(r`\lim_{x\to\pm\infty}\dfrac{5x}{x^2+1}=0`) + ' ⇒ <b>' + M('y=0') + '</b> (a ' + M('+\\infty') + ' i a ' + M('-\\infty') + ').', '<b>Horizontal:</b> ' + M(r`\lim_{x\to\pm\infty}\dfrac{5x}{x^2+1}=0`) + ' ⇒ <b>' + M('y=0') + '</b> (en ' + M('+\\infty') + ' y en ' + M('-\\infty') + ').'),
              T('<b>Obliqües:</b> cap (ja en té d\u2019horitzontal).', '<b>Oblicuas:</b> ninguna (ya tiene horizontal).')),
            p('La funció és senar (' + M('f(-x)=-f(x)') + '), passa per l\u2019origen, té un mínim a ' + M('x=-1') + ' i un màxim a ' + M('x=1') + ':', 'La función es impar (' + M('f(-x)=-f(x)') + '), pasa por el origen, tiene un mínimo en ' + M('x=-1') + ' y un máximo en ' + M('x=1') + ':'),
            html('<figure class="pfig">' + plot({ xr: [-6.5, 6.5], yr: [-3.4, 3.4], tickx: [-4, -2, 2, 4], ticky: [2.5], hlines: [],
              curves: [{ f: x => 5 * x / (x * x + 1) }], points: [[1, 2.5], [-1, -2.5]], labels: [[1.2, 2.9, 'màx (1, 5/2)'], [-0.9, -3.05, 'mín (−1, −5/2)', 'middle']],
              alt: 'Gràfica de f(x)=5x/(x²+1)' }) + '</figure>'),
          ] },
        { n: '1.3', pts: 0.75, q: T('Calculeu l\u2019equació de la recta normal (és a dir, la recta perpendicular a la tangent) a la corba ' + M('y=f(x)') + ' en el punt d\u2019abscissa ' + M('x=2') + '.', 'Calcule la ecuación de la recta normal (es decir, la recta perpendicular a la tangente) a la curva ' + M('y=f(x)') + ' en el punto de abscisa ' + M('x=2') + '.'),
          sol: [
            html(D(r`f(2)=\dfrac{10}{5}=2,\qquad f'(2)=\dfrac{5(1-4)}{25}=-\dfrac35`)),
            p('El pendent de la normal és l\u2019oposat de l\u2019invers: ' + M(r`m_n=\dfrac{-1}{f'(2)}=\dfrac53`) + '.', 'La pendiente de la normal es la opuesta de la inversa: ' + M(r`m_n=\dfrac{-1}{f'(2)}=\dfrac53`) + '.'),
            ans('<b>' + M(r`y-2=\tfrac53(x-2)\ \Longleftrightarrow\ y=\tfrac53x-\tfrac43`) + '</b>', '<b>' + M(r`y-2=\tfrac53(x-2)\ \Longleftrightarrow\ y=\tfrac53x-\tfrac43`) + '</b>'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: J(p('Considereu el sistema d\u2019equacions següent:', 'Considere el siguiente sistema de ecuaciones:'),
        html(D(r`\begin{cases}2x+ky+z=3\\-x+2y+2z=1\\x+y+z=2\end{cases}`)),
        p('on ' + M('k') + ' és un paràmetre real.', 'donde ' + M('k') + ' es un parámetro real.')),
      parts: [
        { n: '2.1', pts: 1, q: T('Discutiu el sistema en funció del paràmetre ' + M('k') + '.', 'Discuta el sistema en función del parámetro ' + M('k') + '.'),
          sol: [
            html(D(r`|A|=\begin{vmatrix}2&k&1\\-1&2&2\\1&1&1\end{vmatrix}=(4+2k-1)-(2+4-k)=3k-3=3(k-1)`)),
            ul(T('<b>' + M('k\\ne1') + ':</b> ' + M('|A|\\ne0') + ' ⇒ ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ': <b>compatible determinat</b>.', '<b>' + M('k\\ne1') + ':</b> ' + M('|A|\\ne0') + ' ⇒ ' + M(r`\operatorname{rang}A=\operatorname{rang}A^*=3`) + ': <b>compatible determinado</b>.'),
              T('<b>' + M('k=1') + ':</b> ' + M(r`\operatorname{rang}A=2`) + ' (el menor ' + M(r`\begin{vmatrix}2&1\\-1&2\end{vmatrix}=5\ne0`) + '). Tots els menors d\u2019ordre 3 de ' + M('A^*') + ' són nuls (p. ex. ' + M(r`\begin{vmatrix}2&1&3\\-1&2&1\\1&1&2\end{vmatrix}=0`) + '), per tant ' + M(r`\operatorname{rang}A^*=2<3`) + ': <b>compatible indeterminat</b>.', '<b>' + M('k=1') + ':</b> ' + M(r`\operatorname{rang}A=2`) + ' (el menor ' + M(r`\begin{vmatrix}2&1\\-1&2\end{vmatrix}=5\ne0`) + '). Todos los menores de orden 3 de ' + M('A^*') + ' son nulos (p. ej. ' + M(r`\begin{vmatrix}2&1&3\\-1&2&1\\1&1&2\end{vmatrix}=0`) + '), por tanto ' + M(r`\operatorname{rang}A^*=2<3`) + ': <b>compatible indeterminado</b>.')),
          ] },
        { n: '2.2', pts: 1, q: T('Resoleu el sistema per a tots els valors de ' + M('k') + ' i comproveu que, per a ' + M('k\\ne1') + ', la solució no depèn de ' + M('k') + '.', 'Resuelva el sistema para todos los valores de ' + M('k') + ' y compruebe que, para ' + M('k\\ne1') + ', la solución no depende de ' + M('k') + '.'),
          sol: [
            p('De la 3a equació, ' + M('z=2-x-y') + '. A la 2a: ' + M('-x+2y+4-2x-2y=1') + ' ⇒ ' + M('-3x=-3') + ' ⇒ ' + M('x=1') + ' (sense ' + M('k') + ').', 'De la 3.ª ecuación, ' + M('z=2-x-y') + '. En la 2.ª: ' + M('-x+2y+4-2x-2y=1') + ' ⇒ ' + M('-3x=-3') + ' ⇒ ' + M('x=1') + ' (sin ' + M('k') + ').'),
            p('A la 1a: ' + M('2+ky+(1-y)=3') + ' ⇒ ' + M('(k-1)\\,y=0') + '.', 'En la 1.ª: ' + M('2+ky+(1-y)=3') + ' ⇒ ' + M('(k-1)\\,y=0') + '.'),
            ul(T('<b>' + M('k\\ne1') + ':</b> ' + M('y=0') + ' i ' + M('z=1') + ': <b>' + M('(x,y,z)=(1,0,1)') + '</b>, independent de ' + M('k') + ' ✓.', '<b>' + M('k\\ne1') + ':</b> ' + M('y=0') + ' y ' + M('z=1') + ': <b>' + M('(x,y,z)=(1,0,1)') + '</b>, independiente de ' + M('k') + ' ✓.'),
              T('<b>' + M('k=1') + ':</b> ' + M('0\\cdot y=0') + ' sempre, ' + M('y=\\lambda') + ' lliure: <b>' + M(r`(x,y,z)=(1,\lambda,1-\lambda)`) + '</b>, ' + M('\\lambda\\in\\mathbb R') + '.', '<b>' + M('k=1') + ':</b> ' + M('0\\cdot y=0') + ' siempre, ' + M('y=\\lambda') + ' libre: <b>' + M(r`(x,y,z)=(1,\lambda,1-\lambda)`) + '</b>, ' + M('\\lambda\\in\\mathbb R') + '.')),
          ] },
        { n: '2.3', pts: 0.5, q: T('Interpreteu geomètricament el resultat dels apartats anteriors.', 'Interprete geométricamente el resultado de los apartados anteriores.'),
          sol: [
            ul(T('<b>' + M('k\\ne1') + ':</b> els tres plans es tallen en el punt ' + M('(1,0,1)') + ', que és el mateix per a qualsevol ' + M('k') + ': tots els plans de la família ' + M('2x+ky+z=3') + ' passen pel punt ' + M('(1,0,1)') + ' (' + M('2+0+1=3') + ').', '<b>' + M('k\\ne1') + ':</b> los tres planos se cortan en el punto ' + M('(1,0,1)') + ', que es el mismo para cualquier ' + M('k') + ': todos los planos de la familia ' + M('2x+ky+z=3') + ' pasan por el punto ' + M('(1,0,1)') + ' (' + M('2+0+1=3') + ').'),
              T('<b>' + M('k=1') + ':</b> els tres plans (diferents i no paral·lels) comparteixen una <b>recta</b>, de punts ' + M('(1,\\lambda,1-\\lambda)') + ': formen un feix de plans.', '<b>' + M('k=1') + ':</b> los tres planos (distintos y no paralelos) comparten una <b>recta</b>, de puntos ' + M('(1,\\lambda,1-\\lambda)') + ': forman un haz de planos.')),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pr,
      intro: J(p('Es vol construir un parc eòlic al Solsonès, format per 10 aerogeneradors. L\u2019empresa que els construirà està dissenyant les pales segons l\u2019esquema següent, on ' + M('x') + ' i ' + M('f(x)') + ' estan mesurats en metres (el dibuix no és a escala):',
                 'Se quiere construir un parque eólico en el Solsonès, formado por 10 aerogeneradores. La empresa que los construirá está diseñando las palas según el esquema siguiente, donde ' + M('x') + ' y ' + M('f(x)') + ' están medidos en metros (el dibujo no está a escala):'),
        html('<figure class="pfig pimg"><img src="figm/pau/2026-s2-e3.webp" width="872" height="791" loading="lazy" alt="Pala d\u2019aerogenerador: regió ombrejada entre g(x) = 8x i f(x) = 2x³"></figure>'),
        p('S\u2019ha calculat que cadascun dels 10 aerogeneradors tindrà una potència de 100 MW. Per diversos factors, cadascun té una probabilitat del 10 % d\u2019estar aturat, independentment de la resta d\u2019aerogeneradors.',
          'Se ha calculado que cada uno de los 10 aerogeneradores tendrá una potencia de 100 MW. Debido a varios factores, cada uno tiene una probabilidad del 10 % de estar parado, independientemente del resto de aerogeneradores.')),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Quina és la probabilitat que s\u2019arribi als 1 000 MW de potència total al parc?', '¿Cuál es la probabilidad de que se llegue a los 1 000 MW de potencia total en el parque?'),
          sol: [
            p('Sigui ' + M('X') + ' el nombre d\u2019aerogeneradors en funcionament: ' + M('X\\sim B(10;\\,0{,}9)') + ' (cadascun funciona amb probabilitat ' + M('0{,}9') + ').', 'Sea ' + M('X') + ' el número de aerogeneradores en funcionamiento: ' + M('X\\sim B(10;\\,0{,}9)') + ' (cada uno funciona con probabilidad ' + M('0{,}9') + ').'),
            p('Per arribar a 1 000 MW han de funcionar els 10:', 'Para llegar a 1 000 MW tienen que funcionar los 10:'),
            ans('<b>' + M(r`P(X=10)=0{,}9^{10}\approx0{,}349`) + '</b> (34,9 %)', '<b>' + M(r`P(X=10)=0{,}9^{10}\approx0{,}349`) + '</b> (34,9 %)'),
          ] },
        { n: '3.2', pts: 0.75, q: T('Quina és la probabilitat que la potència total del parc superi els 150 MW?', '¿Cuál es la probabilidad de que la potencia total del parque supere los 150 MW?'),
          sol: [
            p('Més de 150 MW vol dir que funcionen <b>com a mínim 2</b> aerogeneradors (' + M('2\\cdot100=200>150') + '). Pel complementari:', 'Más de 150 MW significa que funcionan <b>al menos 2</b> aerogeneradores (' + M('2\\cdot100=200>150') + '). Por el complementario:'),
            html(D(r`P(X\ge2)=1-P(X=0)-P(X=1)=1-0{,}1^{10}-10\cdot0{,}9\cdot0{,}1^{9}`)),
            ans('<b>' + M(r`P(X\ge2)=0{,}999999991\approx1`) + '</b> (pràcticament segur)', '<b>' + M(r`P(X\ge2)=0{,}999999991\approx1`) + '</b> (prácticamente seguro)'),
          ] },
        { n: '3.3', pts: 1, q: T('Calculeu l\u2019àrea de les pales d\u2019un d\u2019aquests aerogeneradors (part ombrejada del gràfic).', 'Calcule el área de las palas de uno de estos aerogeneradores (parte sombreada en el gráfico).'),
          sol: [
            p('Punts de tall: ' + M('2x^3=8x') + ' ⇒ ' + M('2x(x^2-4)=0') + ' ⇒ ' + M('x=-2,\\,0,\\,2') + '.', 'Puntos de corte: ' + M('2x^3=8x') + ' ⇒ ' + M('2x(x^2-4)=0') + ' ⇒ ' + M('x=-2,\\,0,\\,2') + '.'),
            p('La regió és simètrica respecte de l\u2019origen (les dues funcions són senars), de manera que n\u2019hi ha prou de doblar la de ' + M('[0,2]') + ', on ' + M('g\\ge f') + ':', 'La región es simétrica respecto del origen (las dos funciones son impares), así que basta duplicar la de ' + M('[0,2]') + ', donde ' + M('g\\ge f') + ':'),
            html(D(r`A=2\int_0^2(8x-2x^3)\,dx=2\Big[4x^2-\tfrac{x^4}{2}\Big]_0^2=2\,(16-8)`)),
            ans('<b>' + M(r`A=16\ \text{m}^2`) + '</b>', '<b>' + M(r`A=16\ \text{m}^2`) + '</b>'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.op, choose: true,
      lead: p('L\u2019Aina vol construir una caixa de cartró en forma de prisma rectangular amb tapa, per guardar-hi la tauleta i el carregador.', 'Aina quiere construir una caja de cartón en forma de prisma rectangular con tapa, para guardar la tableta y el cargador.'),
      opts: [
        { k: 'A',
          intro: J(p('L\u2019Aina construirà la caixa a partir d\u2019un cartró rectangular de 80 cm × 50 cm. A la figura següent es mostra el desenvolupament de la caixa; les zones ratllades són les parts que l\u2019Aina retallarà i retirarà per poder muntar-la:',
                     'Aina construirá la caja a partir de un cartón rectangular de 80 cm × 50 cm. En la siguiente figura se muestra el desarrollo de la caja; las zonas rayadas son las partes que Aina recortará y retirará para poder montarla:'),
            html('<figure class="pfig pimg"><img src="figm/pau/2026-s2-e4a.webp" width="1290" height="552" loading="lazy" alt="Desenvolupament de la caixa: cartró de 80 per 50 cm amb quadrats de costat x retallats"></figure>')),
          parts: [
            { n: '4.1', pts: 1, q: T('Comproveu que el volum de la caixa resultant és ' + M('V(x)=2x^3-130x^2+2000x') + ', on ' + M('x') + ' és la longitud del costat del quadrat que cal retallar de les cantonades per poder muntar-la.', 'Compruebe que el volumen de la caja resultante es ' + M('V(x)=2x^3-130x^2+2000x') + ', donde ' + M('x') + ' es la longitud del lado del cuadrado que hay que recortar de las esquinas para poder montarla.'),
              sol: [
                ul(T('<b>Alçada</b> de la caixa: ' + M('x') + ' (les franges superior i inferior del desenvolupament).', '<b>Altura</b> de la caja: ' + M('x') + ' (las franjas superior e inferior del desarrollo).'),
                  T('<b>Amplada</b>: la franja central ocupa els 50 cm menys les dues franges de ' + M('x') + ': ' + M('50-2x') + '.', '<b>Anchura</b>: la franja central ocupa los 50 cm menos las dos franjas de ' + M('x') + ': ' + M('50-2x') + '.'),
                  T('<b>Llargada</b> ' + M('\\ell') + ': al llarg dels 80 cm hi ha una solapa de ' + M('x') + ', la base (' + M('\\ell') + '), una altra solapa de ' + M('x') + ' i la tapa (' + M('\\ell') + '): ' + M('2x+2\\ell=80') + ' ⇒ ' + M('\\ell=40-x') + '.', '<b>Largo</b> ' + M('\\ell') + ': a lo largo de los 80 cm hay una solapa de ' + M('x') + ', la base (' + M('\\ell') + '), otra solapa de ' + M('x') + ' y la tapa (' + M('\\ell') + '): ' + M('2x+2\\ell=80') + ' ⇒ ' + M('\\ell=40-x') + '.')),
                html(D(r`V(x)=x\,(50-2x)(40-x)=x\,(2000-130x+2x^2)=2x^3-130x^2+2000x\ \checkmark`)),
              ] },
            { n: '4.2', pts: 1.5, q: T('Calculeu les dimensions de la caixa perquè el seu volum sigui màxim. Quin és aquest volum màxim?', 'Calcule las dimensiones de la caja para que su volumen sea máximo. ¿Cuál es este volumen máximo?'),
              sol: [
                p('Domini: ' + M('0<x<25') + ' (perquè ' + M('50-2x>0') + ').', 'Dominio: ' + M('0<x<25') + ' (porque ' + M('50-2x>0') + ').'),
                html(D(r`V'(x)=6x^2-260x+2000=0\ \Rightarrow\ 3x^2-130x+1000=0\ \Rightarrow\ x=\dfrac{130\pm70}{6}`)),
                p(M(r`x=10`) + ' o ' + M(r`x=\tfrac{100}{3}\approx33{,}3`) + ' (fora del domini). ' + M("V''(x)=12x-260") + ' ⇒ ' + M("V''(10)=-140<0") + ': <b>màxim</b>.', M(r`x=10`) + ' o ' + M(r`x=\tfrac{100}{3}\approx33{,}3`) + ' (fuera del dominio). ' + M("V''(x)=12x-260") + ' ⇒ ' + M("V''(10)=-140<0") + ': <b>máximo</b>.'),
                ans('Dimensions: <b>' + M(r`30\times30\times10\ \text{cm}`) + '</b> (llarg ' + M('40-10=30') + ', ample ' + M('50-20=30') + ', alt ' + M('10') + '). Volum màxim: <b>' + M(r`V(10)=9\,000\ \text{cm}^3`) + '</b>.', 'Dimensiones: <b>' + M(r`30\times30\times10\ \text{cm}`) + '</b> (largo ' + M('40-10=30') + ', ancho ' + M('50-20=30') + ', alto ' + M('10') + '). Volumen máximo: <b>' + M(r`V(10)=9\,000\ \text{cm}^3`) + '</b>.'),
              ] },
          ] },
        { k: 'B',
          intro: p('L\u2019Aina vol fer un croquis en 3D de la caixa amb un programa informàtic. Per començar, situa un costat de la tapa des del vèrtex ' + M('A(1,1,1)') + ' fins al vèrtex ' + M('B(4,1,5)') + ', i l\u2019altre costat de la tapa des del vèrtex ' + M('A') + ' fins al vèrtex ' + M('C(1,10,1)') + '.',
                   'Aina quiere hacer un croquis en 3D de la caja utilizando un programa informático. Para empezar, sitúa un lado de la tapa desde el vértice ' + M('A(1,1,1)') + ' hasta el vértice ' + M('B(4,1,5)') + ', y el otro lado de la tapa desde el vértice ' + M('A') + ' hasta el vértice ' + M('C(1,10,1)') + '.'),
          parts: [
            { n: '4.1', pts: 1, q: T('Quines són les coordenades del quart vèrtex de la tapa? Calculeu les longituds dels dos costats de la tapa.', '¿Cuáles son las coordenadas del cuarto vértice de la tapa? Calcule las longitudes de los dos lados de la tapa.'),
              sol: [
                html(D(r`\overrightarrow{AB}=(3,0,4),\qquad \overrightarrow{AC}=(0,9,0)`)),
                p('Són perpendiculars (' + M(r`\overrightarrow{AB}\cdot\overrightarrow{AC}=0`) + '), de manera que la tapa és un rectangle i el quart vèrtex és ' + M(r`D=A+\overrightarrow{AB}+\overrightarrow{AC}`) + ':', 'Son perpendiculares (' + M(r`\overrightarrow{AB}\cdot\overrightarrow{AC}=0`) + '), de modo que la tapa es un rectángulo y el cuarto vértice es ' + M(r`D=A+\overrightarrow{AB}+\overrightarrow{AC}`) + ':'),
                ans('<b>' + M('D=(4,10,5)') + '</b>. Longituds: ' + M(r`|AB|=\sqrt{9+0+16}=5`) + ' cm i ' + M(r`|AC|=9`) + ' cm.', '<b>' + M('D=(4,10,5)') + '</b>. Longitudes: ' + M(r`|AB|=\sqrt{9+0+16}=5`) + ' cm y ' + M(r`|AC|=9`) + ' cm.'),
              ] },
            { n: '4.2', pts: 1.5, q: T('Sabent que els altres quatre vèrtexs de la caixa estan situats al pla ' + M('\\pi:\\ -4x+3z=24') + ', calculeu les coordenades d\u2019un d\u2019ells (qualsevol) i l\u2019alçada de la caixa.', 'Sabiendo que los otros cuatro vértices de la caja están situados en el plano ' + M('\\pi:\\ -4x+3z=24') + ', calcule las coordenadas de uno de ellos (cualquiera) y la altura de la caja.'),
              sol: [
                p('El vector normal de la tapa és ' + M(r`\overrightarrow{AB}\times\overrightarrow{AC}=(-36,0,27)\parallel(-4,0,3)`) + ': el pla ' + M('\\pi') + ' és paral·lel a la tapa i les arestes laterals tenen la direcció de ' + M('\\vec n=(-4,0,3)') + '.', 'El vector normal de la tapa es ' + M(r`\overrightarrow{AB}\times\overrightarrow{AC}=(-36,0,27)\parallel(-4,0,3)`) + ': el plano ' + M('\\pi') + ' es paralelo a la tapa y las aristas laterales tienen la dirección de ' + M('\\vec n=(-4,0,3)') + '.'),
                p('Vèrtex sota ' + M('A') + ': ' + M(r`A'=A+\lambda\vec n=(1-4\lambda,\ 1,\ 1+3\lambda)`) + '. Imposem que sigui a ' + M('\\pi') + ':', 'Vértice bajo ' + M('A') + ': ' + M(r`A'=A+\lambda\vec n=(1-4\lambda,\ 1,\ 1+3\lambda)`) + '. Imponemos que esté en ' + M('\\pi') + ':'),
                html(D(r`-4(1-4\lambda)+3(1+3\lambda)=24\ \Rightarrow\ -1+25\lambda=24\ \Rightarrow\ \lambda=1`)),
                ans('Un vèrtex és <b>' + M("A'=(-3,1,4)") + '</b> (els altres: ' + M("B'=(0,1,8)") + ', ' + M("C'=(-3,10,4)") + ', ' + M("D'=(0,10,8)") + '). Alçada: ' + M(r`h=|\lambda\,\vec n|=|\vec n|=\sqrt{16+9}=\mathbf{5}`) + ' cm.', 'Un vértice es <b>' + M("A'=(-3,1,4)") + '</b> (los otros: ' + M("B'=(0,1,8)") + ', ' + M("C'=(-3,10,4)") + ', ' + M("D'=(0,10,8)") + '). Altura: ' + M(r`h=|\lambda\,\vec n|=|\vec n|=\sqrt{16+9}=\mathbf{5}`) + ' cm.'),
                p('Comprovació amb la distància entre plans: ' + M(r`d(A,\pi)=\dfrac{|-4+3-24|}{5}=5`) + ' ✓.', 'Comprobación con la distancia entre planos: ' + M(r`d(A,\pi)=\dfrac{|-4+3-24|}{5}=5`) + ' ✓.'),
              ] },
          ] },
      ] },
  ],
};

/* ───────────────────────── SÈRIE 5 ───────────────────────── */
const s5 = {
  id: 5, pdf: 'pdf/pau/pau-2026-mates-serie5.pdf',
  ex: [
    { n: 1, pts: 2.5, topic: TOP.an,
      intro: p('Considereu la paràbola ' + M('y=f(x)') + ', amb ' + M('f(x)=-x^2+5x') + ', i la hipèrbola ' + M('y=g(x)') + ', amb ' + M(r`g(x)=8-\dfrac{8}{x+1}`) + '.',
               'Considere la parábola ' + M('y=f(x)') + ', con ' + M('f(x)=-x^2+5x') + ', y la hipérbola ' + M('y=g(x)') + ', con ' + M(r`g(x)=8-\dfrac{8}{x+1}`) + '.'),
      parts: [
        { n: '1.1', pts: 0.75, q: T('En quants punts es tallen les gràfiques d\u2019aquestes dues funcions? Calculeu-los tots.', '¿En cuántos puntos se cortan las gráficas de estas dos funciones? Calcúlelos todos.'),
          sol: [
            p('Igualem (amb ' + M('x\\ne-1') + ') i multipliquem per ' + M('x+1') + ':', 'Igualamos (con ' + M('x\\ne-1') + ') y multiplicamos por ' + M('x+1') + ':'),
            html(D(r`(-x^2+5x)(x+1)=8(x+1)-8\ \Rightarrow\ -x^3+4x^2-3x=0\ \Rightarrow\ -x(x-1)(x-3)=0`)),
            ans('Es tallen en <b>3 punts</b>: ' + M('(0,0)') + ', ' + M('(1,4)') + ' i ' + M('(3,6)') + '. (Comprovació: ' + M('g(1)=8-4=4') + ', ' + M('g(3)=8-2=6') + '.)', 'Se cortan en <b>3 puntos</b>: ' + M('(0,0)') + ', ' + M('(1,4)') + ' y ' + M('(3,6)') + '. (Comprobación: ' + M('g(1)=8-4=4') + ', ' + M('g(3)=8-2=6') + '.)'),
          ] },
        { n: '1.2', pts: 1, q: T('Calculeu l\u2019àrea de la regió situada entre les dues corbes des de ' + M('x=1') + ' fins a ' + M('x=3') + '.', 'Calcule el área de la región situada entre las dos curvas desde ' + M('x=1') + ' hasta ' + M('x=3') + '.'),
          sol: [
            p('A ' + M('x=2') + ': ' + M('f(2)=6') + ' i ' + M(r`g(2)=8-\tfrac83\approx5{,}33`) + ', per tant la paràbola és per sobre de la hipèrbola a ' + M('[1,3]') + ' (només es toquen als extrems).', 'En ' + M('x=2') + ': ' + M('f(2)=6') + ' y ' + M(r`g(2)=8-\tfrac83\approx5{,}33`) + ', por tanto la parábola está por encima de la hipérbola en ' + M('[1,3]') + ' (solo se tocan en los extremos).'),
            html('<figure class="pfig">' + plot({ xr: [-0.6, 4.2], yr: [-0.8, 7.6], tickx: [1, 2, 3, 4], ticky: [2, 4, 6],
              curves: [{ f: x => -x * x + 5 * x }, { f: x => 8 - 8 / (x + 1), dom: [-0.6, 4.2] }],
              fill: { f: x => -x * x + 5 * x, g: x => 8 - 8 / (x + 1), a: 1, b: 3 }, points: [[0, 0], [1, 4], [3, 6]],
              labels: [[3.65, 3.95, 'f', 'start'], [3.5, 7.0, 'g', 'start']], alt: 'Paràbola i hipèrbola amb la regió ombrejada entre x = 1 i x = 3' }) + '</figure>'),
            html(D(r`A=\int_1^3\Big(-x^2+5x-8+\dfrac{8}{x+1}\Big)dx=\Big[-\tfrac{x^3}{3}+\tfrac{5x^2}{2}-8x+8\ln|x+1|\Big]_1^3`)),
            html(D(r`=\Big(-\tfrac{21}{2}+8\ln4\Big)-\Big(-\tfrac{35}{6}+8\ln2\Big)=8\ln2-\tfrac{14}{3}`)),
            ans('<b>' + M(r`A=8\ln2-\dfrac{14}{3}\approx0{,}879\ \text{u}^2`) + '</b>', '<b>' + M(r`A=8\ln2-\dfrac{14}{3}\approx0{,}879\ \text{u}^2`) + '</b>'),
          ] },
        { n: '1.3', pts: 0.75, q: T('Comproveu que ' + M('f(x)') + ' té les arrels als punts d\u2019abscissa ' + M('x=0') + ' i ' + M('x=5') + ', i que l\u2019ordenada del vèrtex de la paràbola ' + M('y=f(x)') + ' és ' + M('y=6{,}25') + '. Justifiqueu que ' + M('y=f(x)') + ' és l\u2019única paràbola que existeix amb aquestes dues propietats.', 'Compruebe que ' + M('f(x)') + ' tiene sus raíces en los puntos de abscisa ' + M('x=0') + ' y ' + M('x=5') + ', y que la ordenada del vértice de la parábola ' + M('y=f(x)') + ' es ' + M('y=6{,}25') + '. Justifique que ' + M('y=f(x)') + ' es la única parábola que existe con estas dos propiedades.'),
          sol: [
            p(M('f(x)=-x(x-5)=0') + ' ⇒ ' + M('x=0') + ' i ' + M('x=5') + '. El vèrtex és al punt mitjà de les arrels, ' + M('x=\\tfrac52') + ', i ' + M(r`f\!\left(\tfrac52\right)=-\tfrac{25}{4}+\tfrac{25}{2}=\tfrac{25}{4}=6{,}25`) + ' ✓.', M('f(x)=-x(x-5)=0') + ' ⇒ ' + M('x=0') + ' y ' + M('x=5') + '. El vértice está en el punto medio de las raíces, ' + M('x=\\tfrac52') + ', y ' + M(r`f\!\left(\tfrac52\right)=-\tfrac{25}{4}+\tfrac{25}{2}=\tfrac{25}{4}=6{,}25`) + ' ✓.'),
            p('<b>Unicitat:</b> qualsevol paràbola amb arrels a ' + M('0') + ' i ' + M('5') + ' és ' + M('y=ax(x-5)') + ', amb ' + M('a\\ne0') + '. L\u2019ordenada del vèrtex (a ' + M('x=\\tfrac52') + ') és ' + M(r`a\cdot\tfrac52\cdot\left(-\tfrac52\right)=-\tfrac{25}{4}a`) + '. Imposant ' + M(r`-\tfrac{25}{4}a=\tfrac{25}{4}`) + ' surt ' + M('a=-1') + ', un únic valor.', '<b>Unicidad:</b> cualquier parábola con raíces en ' + M('0') + ' y ' + M('5') + ' es ' + M('y=ax(x-5)') + ', con ' + M('a\\ne0') + '. La ordenada del vértice (en ' + M('x=\\tfrac52') + ') es ' + M(r`a\cdot\tfrac52\cdot\left(-\tfrac52\right)=-\tfrac{25}{4}a`) + '. Imponiendo ' + M(r`-\tfrac{25}{4}a=\tfrac{25}{4}`) + ' sale ' + M('a=-1') + ', un único valor.'),
          ] },
      ] },

    { n: 2, pts: 2.5, topic: TOP.al,
      intro: p('Considereu les matrius ' + M(r`M=\begin{pmatrix}3&3&0\\k-1&-1&-1\end{pmatrix}`) + ' i ' + M(r`N=\begin{pmatrix}3&1\\k-1&0\\0&2\end{pmatrix}`) + ', on ' + M('k') + ' és un nombre real qualsevol.',
               'Considere las matrices ' + M(r`M=\begin{pmatrix}3&3&0\\k-1&-1&-1\end{pmatrix}`) + ' y ' + M(r`N=\begin{pmatrix}3&1\\k-1&0\\0&2\end{pmatrix}`) + ', donde ' + M('k') + ' es un número real cualquiera.'),
      parts: [
        { n: '2.1', pts: 0.75, q: T('Calculeu els valors de ' + M('k') + ' per als quals ' + M('MN') + ' és invertible.', 'Calcule los valores de ' + M('k') + ' para los cuales ' + M('MN') + ' es invertible.'),
          sol: [
            p(M('M') + ' és ' + M('2\\times3') + ' i ' + M('N') + ' és ' + M('3\\times2') + ': ' + M('MN') + ' és ' + M('2\\times2') + '.', M('M') + ' es ' + M('2\\times3') + ' y ' + M('N') + ' es ' + M('3\\times2') + ': ' + M('MN') + ' es ' + M('2\\times2') + '.'),
            html(D(r`MN=\begin{pmatrix}3\cdot3+3(k-1)&3\\(k-1)\cdot3-(k-1)&(k-1)-2\end{pmatrix}=\begin{pmatrix}3k+6&3\\2(k-1)&k-3\end{pmatrix}`)),
            html(D(r`|MN|=(3k+6)(k-3)-6(k-1)=3k^2-9k-12=3(k-4)(k+1)`)),
            ans('<b>' + M('MN') + ' és invertible si i només si ' + M('k\\ne4') + ' i ' + M('k\\ne-1') + '.</b>', '<b>' + M('MN') + ' es invertible si y solo si ' + M('k\\ne4') + ' y ' + M('k\\ne-1') + '.</b>'),
          ] },
        { n: '2.2', pts: 0.75, q: T('Calculeu els valors de ' + M('k') + ' per als quals ' + M('NM') + ' és invertible.', 'Calcule los valores de ' + M('k') + ' para los cuales ' + M('NM') + ' es invertible.'),
          sol: [
            p(M('NM') + ' és una matriu ' + M('3\\times3') + ' que és producte d\u2019una matriu ' + M('3\\times2') + ' per una ' + M('2\\times3') + ', de manera que ' + M(r`\operatorname{rang}(NM)\le2<3`) + ' per a qualsevol ' + M('k') + '. Per tant ' + M('|NM|=0') + ' sempre.', M('NM') + ' es una matriz ' + M('3\\times3') + ' producto de una ' + M('3\\times2') + ' por una ' + M('2\\times3') + ', de modo que ' + M(r`\operatorname{rang}(NM)\le2<3`) + ' para cualquier ' + M('k') + '. Por tanto ' + M('|NM|=0') + ' siempre.'),
            ans('<b>No hi ha cap valor de ' + M('k') + ' per al qual ' + M('NM') + ' sigui invertible.</b>', '<b>No existe ningún valor de ' + M('k') + ' para el que ' + M('NM') + ' sea invertible.</b>'),
          ] },
        { n: '2.3', pts: 1, q: T('Estudieu per a quins valors reals de ' + M('m') + ', ' + M('n') + ' i ' + M('k') + ' el sistema ' + M(r`M\begin{pmatrix}x\\y\\z\end{pmatrix}=\begin{pmatrix}m\\n\end{pmatrix}`) + ' és compatible indeterminat.', 'Estudie para qué valores reales de ' + M('m') + ', ' + M('n') + ' y ' + M('k') + ' el sistema ' + M(r`M\begin{pmatrix}x\\y\\z\end{pmatrix}=\begin{pmatrix}m\\n\end{pmatrix}`) + ' es compatible indeterminado.'),
          sol: [
            p('És un sistema de 2 equacions amb 3 incògnites. El menor format per les columnes 2 i 3, ' + M(r`\begin{vmatrix}3&0\\-1&-1\end{vmatrix}=-3\ne0`) + ', no depèn de ' + M('k') + ': ' + M(r`\operatorname{rang}M=2`) + ' sempre.', 'Es un sistema de 2 ecuaciones con 3 incógnitas. El menor formado por las columnas 2 y 3, ' + M(r`\begin{vmatrix}3&0\\-1&-1\end{vmatrix}=-3\ne0`) + ', no depende de ' + M('k') + ': ' + M(r`\operatorname{rang}M=2`) + ' siempre.'),
            p('La matriu ampliada té només 2 files, així que ' + M(r`\operatorname{rang}(M|b)=2`) + ' també. Aleshores ' + M(r`\operatorname{rang}M=\operatorname{rang}(M|b)=2<3`) + '.', 'La matriz ampliada tiene solo 2 filas, así que ' + M(r`\operatorname{rang}(M|b)=2`) + ' también. Entonces ' + M(r`\operatorname{rang}M=\operatorname{rang}(M|b)=2<3`) + '.'),
            ans('<b>És compatible indeterminat per a tots els valors reals de ' + M('m') + ', ' + M('n') + ' i ' + M('k') + '</b> (infinites solucions amb 1 paràmetre).', '<b>Es compatible indeterminado para todos los valores reales de ' + M('m') + ', ' + M('n') + ' y ' + M('k') + '</b> (infinitas soluciones con 1 parámetro).'),
          ] },
      ] },

    { n: 3, pts: 2.5, topic: TOP.pr,
      intro: p('En una ciutat s\u2019ha estudiat la relació entre els hàbits de lectura i la pràctica d\u2019esport entre l\u2019alumnat de batxillerat. Per a això s\u2019han formulat les dues preguntes següents a l\u2019alumnat d\u2019aquesta etapa educativa: «Llegeixes com a mínim dos llibres al mes?» i «Practiques algun esport almenys quatre hores per setmana?».<br>Dels resultats de l\u2019enquesta es desprèn que el 60 % llegeixen com a mínim dos llibres al mes, dels quals el 70 % practiquen algun esport un mínim de quatre hores per setmana. També s\u2019observa que, dels que no llegeixen un mínim de dos llibres al mes, el 50 % fan menys de quatre hores setmanals d\u2019esport.<br>Si s\u2019escull a l\u2019atzar un alumne/a de batxillerat d\u2019aquesta ciutat:',
               'En una ciudad se ha estudiado la relación entre los hábitos de lectura y la práctica de deporte entre el alumnado de bachillerato. Para ello, se han formulado las dos preguntas siguientes al alumnado de esta etapa educativa: «¿Lees como mínimo dos libros al mes?» y «¿Practicas algún deporte al menos cuatro horas por semana?».<br>De los resultados de la encuesta, se desprende que el 60 % leen como mínimo dos libros al mes, de los cuales el 70 % practican algún deporte un mínimo de cuatro horas por semana. También se observa que, de entre los que no leen un mínimo de dos libros al mes, el 50 % hacen menos de cuatro horas semanales de deporte.<br>Si se elige al azar un alumno/a de bachillerato de esta ciudad:'),
      parts: [
        { n: '3.1', pts: 0.75, q: T('Quina és la probabilitat que faci esport almenys quatre hores setmanals?', '¿Cuál es la probabilidad de que haga deporte al menos cuatro horas semanales?'),
          sol: [
            p('Sigui ' + M('L') + ' = «llegeix ≥ 2 llibres/mes» i ' + M('E') + ' = «esport ≥ 4 h/setmana». Dades: ' + M('P(L)=0{,}6') + ', ' + M('P(E\\mid L)=0{,}7') + ', ' + M(r`P(\overline E\mid\overline L)=0{,}5`) + '.', 'Sea ' + M('L') + ' = «lee ≥ 2 libros/mes» y ' + M('E') + ' = «deporte ≥ 4 h/semana». Datos: ' + M('P(L)=0{,}6') + ', ' + M('P(E\\mid L)=0{,}7') + ', ' + M(r`P(\overline E\mid\overline L)=0{,}5`) + '.'),
            html('<table class="pt-tab"><tr><th></th><th>' + M('E') + '</th><th>' + M(r`\overline E`) + '</th><th>Σ</th></tr><tr><th>' + M('L') + '</th><td>0,42</td><td>0,18</td><td>0,60</td></tr><tr><th>' + M(r`\overline L`) + '</th><td>0,20</td><td>0,20</td><td>0,40</td></tr><tr><th>Σ</th><td>0,62</td><td>0,38</td><td>1</td></tr></table>'),
            p('Pel teorema de la probabilitat total:', 'Por el teorema de la probabilidad total:'),
            html(D(r`P(E)=0{,}6\cdot0{,}7+0{,}4\cdot0{,}5=0{,}42+0{,}20`)),
            ans('<b>' + M('P(E)=0{,}62') + '</b> (62 %)', '<b>' + M('P(E)=0{,}62') + '</b> (62 %)'),
          ] },
        { n: '3.2', pts: 0.75, q: T('Si se sap que aquest alumne/a fa esport menys de quatre hores setmanals, quina és la probabilitat que llegeixi almenys dos llibres al mes?', 'Si se sabe que este alumno/a hace deporte menos de cuatro horas semanales, ¿cuál es la probabilidad de que lea al menos dos libros al mes?'),
          sol: [
            p('Teorema de Bayes (o directament de la taula anterior):', 'Teorema de Bayes (o directamente de la tabla anterior):'),
            html(D(r`P(L\mid\overline E)=\dfrac{P(L\cap\overline E)}{P(\overline E)}=\dfrac{0{,}6\cdot0{,}3}{0{,}38}=\dfrac{0{,}18}{0{,}38}=\dfrac{9}{19}`)),
            ans('<b>' + M(r`P(L\mid\overline E)=\dfrac{9}{19}\approx0{,}474`) + '</b>', '<b>' + M(r`P(L\mid\overline E)=\dfrac{9}{19}\approx0{,}474`) + '</b>'),
          ] },
        { n: '3.3', pts: 1, q: T('L\u2019Alba és una estudiant de batxillerat que ha anat anotant durant tot el curs quantes hores dedicava a la setmana a llegir i quantes a fer esport. Per a cada setmana té apuntat un nombre real ' + M('x') + ' que correspon a la quantitat d\u2019hores de lectura i que oscil·la entre 1 i 6, i un nombre real ' + M('y') + ' que correspon a la quantitat d\u2019hores de pràctica esportiva. Ha observat que la relació ' + M('y=7-x+\\ln(2x-1)') + ' s\u2019ajusta bastant bé a les dades que ha anotat. Calculeu, segons aquest model, quin és el màxim i el mínim d\u2019hores per setmana que l\u2019Alba ha dedicat a practicar esport.',
          'Alba es una estudiante de bachillerato que ha ido anotando durante todo el curso cuántas horas dedicaba a la semana a leer y cuántas a hacer deporte. Para cada semana tiene apuntado un número real ' + M('x') + ' que corresponde a la cantidad de horas de lectura y que oscila entre 1 y 6, y un número real ' + M('y') + ' que corresponde a la cantidad de horas de práctica deportiva. Ha observado que la relación ' + M('y=7-x+\\ln(2x-1)') + ' se ajusta bastante bien a los datos que ha anotado. Calcule, según este modelo, cuál es el máximo y el mínimo de horas por semana que Alba ha dedicado a practicar deporte.'),
          sol: [
            p('Cal optimitzar ' + M('y(x)=7-x+\\ln(2x-1)') + ' a ' + M('[1,6]') + ' (funció contínua en un interval tancat: té màxim i mínim absoluts).', 'Hay que optimizar ' + M('y(x)=7-x+\\ln(2x-1)') + ' en ' + M('[1,6]') + ' (función continua en un intervalo cerrado: tiene máximo y mínimo absolutos).'),
            html(D(r`y'(x)=-1+\dfrac{2}{2x-1}=0\ \Rightarrow\ 2x-1=2\ \Rightarrow\ x=\tfrac32`)),
            p('Signe: ' + M("y'(1)=1>0") + ' i ' + M("y'(6)=-1+\\tfrac2{11}<0") + ' ⇒ creix fins a ' + M('x=1{,}5') + ' i decreix després. Comparem:', 'Signo: ' + M("y'(1)=1>0") + ' y ' + M("y'(6)=-1+\\tfrac2{11}<0") + ' ⇒ crece hasta ' + M('x=1{,}5') + ' y decrece después. Comparamos:'),
            html('<table class="pt-tab"><tr><th>' + M('x') + '</th><td>1</td><td>1,5</td><td>6</td></tr><tr><th>' + M('y') + '</th><td>6</td><td>' + M(r`5{,}5+\ln2\approx6{,}19`) + '</td><td>' + M(r`1+\ln11\approx3{,}40`) + '</td></tr></table>'),
            ans('<b>Màxim:</b> ' + M(r`5{,}5+\ln2\approx6{,}19`) + ' h/setmana (quan llegeix 1,5 h). <b>Mínim:</b> ' + M(r`1+\ln11\approx3{,}40`) + ' h/setmana (quan llegeix 6 h).', '<b>Máximo:</b> ' + M(r`5{,}5+\ln2\approx6{,}19`) + ' h/semana (cuando lee 1,5 h). <b>Mínimo:</b> ' + M(r`1+\ln11\approx3{,}40`) + ' h/semana (cuando lee 6 h).'),
          ] },
      ] },

    { n: 4, pts: 2.5, topic: TOP.ge, choose: true,
      opts: [
        { k: 'A',
          intro: J(p('D\u2019una funció ' + M('f(x)') + ', se sap que passa pel punt ' + M('(-1,-1)') + ' i que la gràfica de la seva funció derivada és la següent:', 'De una función ' + M('f(x)') + ', se sabe que pasa por el punto ' + M('(-1,-1)') + ' y que la gráfica de su función derivada es la siguiente:'),
            html('<figure class="pfig pimg"><img src="figm/pau/2026-s5-e4a.webp" width="791" height="782" loading="lazy" alt="Gràfica de f\u2019(x): talla l\u2019eix a x = −2, toca el zero a x = 0 i el talla a x = 1; f\u2019(−1) = 2"></figure>')),
          parts: [
            { n: '4.1', pts: 1, q: T('Calculeu l\u2019equació de la recta tangent a la gràfica de la funció ' + M('f(x)') + ' en el punt ' + M('(-1,-1)') + '.', 'Calcule la ecuación de la recta tangente a la gráfica de la función ' + M('f(x)') + ' en el punto ' + M('(-1,-1)') + '.'),
              sol: [
                p('El pendent és ' + M("f'(-1)") + ', que es llegeix a la gràfica de ' + M("f'") + ': a ' + M('x=-1') + ' la corba val ' + M('2') + '.', 'La pendiente es ' + M("f'(-1)") + ', que se lee en la gráfica de ' + M("f'") + ': en ' + M('x=-1') + ' la curva vale ' + M('2') + '.'),
                ans('<b>' + M('y+1=2(x+1)\\ \\Longleftrightarrow\\ y=2x+1') + '</b>', '<b>' + M('y+1=2(x+1)\\ \\Longleftrightarrow\\ y=2x+1') + '</b>'),
              ] },
            { n: '4.2', pts: 1, q: T('Estudieu si ' + M('f(x)') + ' té punts crítics (punts on ' + M("f'(x)=0") + ') i, en cas de tenir-ne, determineu-ne les abscisses i classifiqueu-los segons siguin màxims, mínims o punts d\u2019inflexió de ' + M('f(x)') + '.', 'Estudie si ' + M('f(x)') + ' tiene puntos críticos (puntos donde ' + M("f'(x)=0") + ') y, en caso de tenerlos, determine sus abscisas y clasifíquelos según sean máximos, mínimos o puntos de inflexión de ' + M('f(x)') + '.'),
              sol: [
                p('La gràfica de ' + M("f'") + ' talla l\u2019eix ' + M('OX') + ' a ' + M('x=-2') + ' i ' + M('x=1') + ' i hi és tangent a ' + M('x=0') + ' (sense creuar-lo). Hi ha 3 punts crítics:', 'La gráfica de ' + M("f'") + ' corta el eje ' + M('OX') + ' en ' + M('x=-2') + ' y ' + M('x=1') + ' y es tangente en ' + M('x=0') + ' (sin cruzarlo). Hay 3 puntos críticos:'),
                html('<table class="pt-tab"><tr><th>' + M('x') + '</th><td>−2</td><td>0</td><td>1</td></tr><tr><th>' + M("f'") + '</th><td>− → +</td><td>+ → + (toca 0)</td><td>+ → −</td></tr><tr><th>' + M('f') + '</th><td>mínim</td><td>inflexió</td><td>màxim</td></tr></table>'),
                ul(T(M('x=-2') + ': ' + M("f'") + ' passa de negativa a positiva ⇒ <b>mínim local</b>.', M('x=-2') + ': ' + M("f'") + ' pasa de negativa a positiva ⇒ <b>mínimo local</b>.'),
                  T(M('x=0') + ': ' + M("f'\\ge0") + ' a banda i banda (té un mínim de ' + M("f'") + ' igual a 0) ⇒ ' + M('f') + ' és creixent amb tangent horitzontal: <b>punt d\u2019inflexió</b>.', M('x=0') + ': ' + M("f'\\ge0") + ' a ambos lados (' + M("f'") + ' tiene un mínimo igual a 0) ⇒ ' + M('f') + ' es creciente con tangente horizontal: <b>punto de inflexión</b>.'),
                  T(M('x=1') + ': ' + M("f'") + ' passa de positiva a negativa ⇒ <b>màxim local</b>.', M('x=1') + ': ' + M("f'") + ' pasa de positiva a negativa ⇒ <b>máximo local</b>.')),
              ] },
            { n: '4.3', pts: 0.5, q: T('Sabent, a més, que ' + M('f(0)=-0{,}2') + ', calculeu l\u2019àrea entre la gràfica de ' + M("f'(x)") + ' i l\u2019eix d\u2019abscisses, des de ' + M('x=-1') + ' fins a ' + M('x=0') + '.', 'Sabiendo, además, que ' + M('f(0)=-0{,}2') + ', calcule el área entre la gráfica de ' + M("f'(x)") + ' y el eje de abscisas, desde ' + M('x=-1') + ' hasta ' + M('x=0') + '.'),
              sol: [
                p('A ' + M('[-1,0]') + ' ' + M("f'\\ge0") + ', així que l\u2019àrea és la integral i, pel teorema fonamental del càlcul, no cal conèixer ' + M("f'") + ':', 'En ' + M('[-1,0]') + ' ' + M("f'\\ge0") + ', así que el área es la integral y, por el teorema fundamental del cálculo, no hace falta conocer ' + M("f'") + ':'),
                html(D(r`A=\int_{-1}^{0}f'(x)\,dx=f(0)-f(-1)=-0{,}2-(-1)=0{,}8`)),
                ans('<b>' + M(r`A=0{,}8\ \text{u}^2`) + '</b>', '<b>' + M(r`A=0{,}8\ \text{u}^2`) + '</b>'),
              ] },
          ] },
        { k: 'B',
          intro: p('En una indústria s\u2019utilitzen braços robòtics amb sensors per mesurar amb precisió determinades peces metàl·liques i comprovar si tenen irregularitats. Les peces es col·loquen sobre la superfície determinada pel pla ' + M(r`\pi:\ (x,y,z)=(6,1,1)+\lambda(1,1,0)+\mu(0,0,1)`) + ' i, per sobre d\u2019aquesta, un braç robòtic desplaça un sensor des del punt ' + M('A=(1,2,3)') + ' fins al punt ' + M('B=(5,3,7)') + ' en línia recta (les unitats dels tres eixos estan expressades en centímetres).',
                   'En una industria se usan brazos robóticos con sensores para medir con precisión determinadas piezas metálicas y comprobar si tienen irregularidades. Las piezas se colocan sobre la superficie determinada por el plano ' + M(r`\pi:\ (x,y,z)=(6,1,1)+\lambda(1,1,0)+\mu(0,0,1)`) + ' y, por encima de ella, un brazo robótico desplaza un sensor desde el punto ' + M('A=(1,2,3)') + ' hasta el punto ' + M('B=(5,3,7)') + ' en línea recta (las unidades de los tres ejes están expresadas en centímetros).'),
          parts: [
            { n: '4.1', pts: 0.5, q: T('Quina distància ha recorregut el sensor?', '¿Qué distancia ha recorrido el sensor?'),
              sol: [
                html(D(r`\overrightarrow{AB}=(4,1,4),\qquad d(A,B)=\sqrt{16+1+16}=\sqrt{33}`)),
                ans('<b>' + M(r`\sqrt{33}\approx5{,}74\ \text{cm}`) + '</b>', '<b>' + M(r`\sqrt{33}\approx5{,}74\ \text{cm}`) + '</b>'),
              ] },
            { n: '4.2', pts: 1, q: T('En acabar el moviment, a quina distància de la superfície es troba el sensor?', 'Al acabar el movimiento, ¿a qué distancia de la superficie se encuentra el sensor?'),
              sol: [
                p('Normal del pla: ' + M(r`\vec n=(1,1,0)\times(0,0,1)=(1,-1,0)`) + '. Equació: ' + M('(x-6)-(y-1)=0') + ' ⇒ ' + M('\\pi:\\ x-y-5=0') + '.', 'Normal del plano: ' + M(r`\vec n=(1,1,0)\times(0,0,1)=(1,-1,0)`) + '. Ecuación: ' + M('(x-6)-(y-1)=0') + ' ⇒ ' + M('\\pi:\\ x-y-5=0') + '.'),
                html(D(r`d(B,\pi)=\dfrac{|5-3-5|}{\sqrt{1+1}}=\dfrac{3}{\sqrt2}`)),
                ans('<b>' + M(r`\dfrac{3}{\sqrt2}=\dfrac{3\sqrt2}{2}\approx2{,}12\ \text{cm}`) + '</b>', '<b>' + M(r`\dfrac{3}{\sqrt2}=\dfrac{3\sqrt2}{2}\approx2{,}12\ \text{cm}`) + '</b>'),
              ] },
            { n: '4.3', pts: 1, q: T('Si el sensor continués movent-se en la mateixa línia recta i en el mateix sentit, en quin punt xocaria amb la superfície?', 'Si el sensor siguiera moviéndose en la misma línea recta y en el mismo sentido, ¿en qué punto chocaría con la superficie?'),
              sol: [
                p('Recta: ' + M('(x,y,z)=(1+4t,\\ 2+t,\\ 3+4t)') + '. La tallem amb ' + M('x-y-5=0') + ':', 'Recta: ' + M('(x,y,z)=(1+4t,\\ 2+t,\\ 3+4t)') + '. La cortamos con ' + M('x-y-5=0') + ':'),
                html(D(r`(1+4t)-(2+t)-5=0\ \Rightarrow\ 3t=6\ \Rightarrow\ t=2`)),
                ans('Punt de xoc: <b>' + M('(9,\\ 4,\\ 11)') + '</b>. Com que ' + M('t=2>1') + ' (el sensor és a ' + M('t=1') + '), és després de ' + M('B') + ', en el mateix sentit ✓.', 'Punto de choque: <b>' + M('(9,\\ 4,\\ 11)') + '</b>. Como ' + M('t=2>1') + ' (el sensor está en ' + M('t=1') + '), es después de ' + M('B') + ', en el mismo sentido ✓.'),
              ] },
          ] },
      ] },
  ],
};

module.exports = {
  years: [{
    y: 2026,
    title: T('PAU 2026', 'PAU 2026'),
    series: [s1, s2, s5],
  }],
};
