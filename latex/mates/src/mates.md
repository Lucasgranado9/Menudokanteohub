
## 1. Variació mitjana d’una funció en un interval

Donada una funció $y = f(x)$, s’anomena **variació mitjana de la funció** en l’interval $[x_1, x_2]$ el valor numèric del quocient:

$$\frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{\Delta f(x)}{\Delta x} = \frac{\Delta y}{\Delta x}$$

- Si $y = f(x)$ és creixent a l’interval $[x_1, x_2]$, la seva variació mitjana és **positiva**.
- Si $y = f(x)$ és decreixent a l’interval $[x_1, x_2]$, la seva variació mitjana és **negativa**.

## 2. Variació d’una funció en un punt

La variació d’una funció $f$ en el punt $x_0$ es defineix com el límit:

$$\lim_{x\to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$

## 3. Derivada d’una funció en un punt

> **Definició:** La **derivada** d’una funció $f$ en el punt $x_0$ és
>
> $$f'(x_0) = \lim_{x\to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$
>
> sempre que aquest límit existeixi i sigui finit.

A partir d’aquesta definició es dedueixen els criteris de creixement local:

- Si $f'(x_0) > 0$, la funció és **creixent** en $x = x_0$.
- Si $f'(x_0) < 0$, la funció és **decreixent** en $x = x_0$.
- Si $f'(x_0) = 0$, la funció quasi no varia per a valors de $x$ pròxims a $x_0$.

## 4. Creixement i decreixement. Punts estacionaris

La definició de derivada d’una funció $y = f(x)$ en un punt $x = x_0$ permet afirmar que:

- Si $f'(x_0) > 0$, la funció és **creixent** en aquest punt.
- Si $f'(x_0) < 0$, la funció és **decreixent** en aquest punt.
- Si $f'(x_0) = 0$, la funció presenta en $x_0$ un **màxim**, un **mínim** o un **punt d’inflexió** de tangent horitzontal.

La figura següent il·lustra aquests conceptes sobre una corba representativa:

![Figura 1: Representació dels conceptes de creixement, decreixement, màxim i mínim relatius, punt d’inflexió i concavitat per a $f(x) = \frac{x^3}{3} - 3x + 2$.](figs/m01_f01.png)

## 5. Derivabilitat d’una funció en un punt

> **Definició:** Diem que una funció $y = f(x)$ és **derivable** en el punt $x = x_0$ si existeix el nombre $f'(x_0)$, derivada de la funció en aquest punt.

> **Propietat:** Perquè una funció $y = f(x)$ sigui derivable en $x = x_0$, necessàriament ha de ser **contínua** en aquest punt. Si una funció presenta qualsevol tipus de discontinuïtat en $x = x_0$, no existeix $f'(x_0)$.

## 6. Funció derivada

La definició alternativa de la derivada, equivalent a la de l’apartat 3, és:

$$f'(x_0) = \lim_{h\to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$

Les regles pràctiques bàsiques de derivació, conegudes del curs anterior, són:

- Funció constant: $f(x) = k \Rightarrow f'(x) = 0$
- Funció potencial: $f(x) = x^n \Rightarrow f'(x) = n \cdot x^{n-1}$, $\; n \in \mathbb{N}$
- Funció suma: $f(x) = p(x) + q(x) \Rightarrow f'(x) = p'(x) + q'(x)$
- Producte d’una constant per una funció: $f(x) = k \cdot g(x) \Rightarrow f'(x) = k \cdot g'(x)$

## 7. Derivada de la funció composta. Regla de la cadena

> **Definició (Regla de la cadena):** Si $f(x) = g[u(x)]$, aleshores
>
> $$f'(x) = g'[u(x)] \cdot u'(x)$$

És a dir, per derivar una funció composta es deriva l’exterior (avaluat a l’interior) i es multiplica per la derivada de l’interior.

## 8. Derivades successives

Donada una funció derivable $f(x)$, podem trobar la seva funció derivada $f'(x)$. Moltes vegades, aquesta nova funció també és derivable. Les derivades d’ordre superior es defineixen de manera inductiva:

$$f(x) \xrightarrow{\ \frac{d}{dx}\ } f'(x) \xrightarrow{\ \frac{d}{dx}\ } f''(x) \xrightarrow{\ \frac{d}{dx}\ } f'''(x) \xrightarrow{\ \frac{d}{dx}\ } \cdots \xrightarrow{\ \frac{d}{dx}\ } f^{(n)}(x)$$

on $f''(x)$ és la derivada segona, $f'''(x)$ la derivada tercera, i $f^{(n)}(x)$ la derivada enèsima de $f$.

Cal destacar alguns casos particulars:

- **Funcions polinòmiques:** per derivació successiva, qualsevol polinomi de grau $n$ s’anul·la al derivar-lo $n + 1$ vegades.
- **Funció exponencial:** les funcions del tipus $f(x) = k \cdot e^x$ són invariables respecte de la derivació; en derivar-les qualsevol nombre de vegades, s’obté sempre la mateixa funció.
- **Funcions sinus i cosinus:** $f(x) = \sin x$ i $f(x) = \cos x$ generen una seqüència cíclica de derivades successives que es repeteix cada quatre derivacions:

$$f(x) = \sin x \to f'(x) = \cos x \to f''(x) = -\sin x \to f'''(x) = -\cos x \to f^{(4)}(x) = \sin x \to \cdots$$

La figura il·lustra la relació entre $\sin x$, $\cos x$ i les seves derivades:

![Figura 2: Les funcions $\sin x$ i $\cos x = (\sin x)'$ il·lustren la seqüència cíclica de derivades successives de les funcions trigonomètriques.](figs/m01_f02.png)

## 9. Taula de derivades

La taula següent recull les derivades de les funcions elementals més habituals, on $u = u(x)$ denota una funció derivable genèrica i $u' = u'(x)$ la seva derivada.

| Funció | Derivada | Funció | Derivada |
|---|---|---|---|
| $k$ | $0$ | $\arctan u$ | $\dfrac{u'}{1+u^2}$ |
| $ax$ | $a$ | $\operatorname{arcsec} u$ | $\dfrac{u'}{u\sqrt{u^2-1}}$ |
| $u^n$ | $n\,u^{n-1}u'$ | $\operatorname{arccosec} u$ | $-\dfrac{u'}{u\sqrt{u^2-1}}$ |
| $\sqrt{u}$ | $\dfrac{u'}{2\sqrt{u}}$ | $\operatorname{arccotg} u$ | $-\dfrac{u'}{1+u^2}$ |
| $\sqrt[n]{u}$ | $\dfrac{u'}{n\sqrt[n]{u^{n-1}}}$ | $\sinh u$ | $\cosh u\cdot u'$ |
| $e^u$ | $e^u u'$ | $\cosh u$ | $\sinh u\cdot u'$ |
| $a^u$ | $a^u\ln a\cdot u'$ | $\tanh u$ | $\dfrac{u'}{\cosh^2 u}$ |
| $\ln u$ | $\dfrac{u'}{u}$ | $\operatorname{sech} u$ | $-\operatorname{sech} u\tanh u\cdot u'$ |
| $\log_a u$ | $\dfrac{u'}{u\ln a}$ | $\operatorname{cosech} u$ | $-\operatorname{cosech} u\coth u\cdot u'$ |
| $\sin u$ | $\cos u\cdot u'$ | $\coth u$ | $-\operatorname{cosech}^2 u\cdot u'$ |
| $\cos u$ | $-\sin u\cdot u'$ | $\operatorname{arcsinh} u$ | $\dfrac{u'}{\sqrt{u^2+1}}$ |
| $\tan u$ | $\dfrac{u'}{\cos^2 u}$ | $\operatorname{arccosh} u$ | $\dfrac{u'}{\sqrt{u^2-1}}$ |
| $\sec u$ | $\dfrac{u'\sin u}{\cos^2 u}$ | $\operatorname{arctanh} u$ | $\dfrac{u'}{1-u^2}$ |
| $\csc u$ | $-\dfrac{u'\cos u}{\sin^2 u}$ | $\operatorname{arcsech} u$ | $-\dfrac{u'}{u\sqrt{1-u^2}}$ |
| $\cot u$ | $-\dfrac{u'}{\sin^2 u}$ | $\operatorname{arccsch} u$ | $-\dfrac{u'}{u\sqrt{1+u^2}}$ |
| $\arcsin u$ | $\dfrac{u'}{\sqrt{1-u^2}}$ | $\operatorname{arccoth} u$ | $\dfrac{u'}{1-u^2}$ |
| $\arccos u$ | $-\dfrac{u'}{\sqrt{1-u^2}}$ | | |

**Operacions amb derivades**

| Funció | Derivada | Funció | Derivada |
|---|---|---|---|
| $k\cdot u$ | $k\cdot u'$ | $u+v-w$ | $u'+v'-w'$ |
| $\dfrac{k}{u}$ | $-\dfrac{k\,u'}{u^2}$ | $u\cdot v$ | $u'v+uv'$ |
| $u+v$ | $u'+v'$ | $\dfrac{u}{v}$ | $\dfrac{u'v-uv'}{v^2}$ |
| $u-v$ | $u'-v'$ | | |


## 10. Complement: recta tangent i recta normal a una corba

Geomètricament, $f'(a)$ és el **pendent de la recta tangent** a la gràfica de $f$ en el punt $P(a, f(a))$. Amb això es poden escriure les equacions de les dues rectes més demanades en un problema de derivades.

> **Propietat (Recta tangent i recta normal):** si $f$ és derivable en $x=a$:
>
> - **Tangent:** $\;y - f(a) = f'(a)\,(x - a)$
> - **Normal** (perpendicular a la tangent), si $f'(a)\neq 0$: $\;y - f(a) = -\dfrac{1}{f'(a)}\,(x - a)$
>
> Si $f'(a) = 0$, la tangent és horitzontal ($y = f(a)$) i la normal és la recta vertical $x = a$.

### 10.1. Mètode

1. Calcular $f(a)$: això dona el punt $P(a, f(a))$.
2. Derivar $f$ i calcular el pendent $m = f'(a)$.
3. Escriure la tangent amb la fórmula punt-pendent. El pendent de la normal és $-1/m$.
4. Aïllar $y$ per donar l’equació en forma explícita.

### 10.2. Exemple 1 — Tangent i normal en un punt

Trobeu la tangent i la normal a $f(x) = x^2 - 3x + 2$ en $x = 3$.

- $f(3) = 9 - 9 + 2 = 2$, per tant $P(3, 2)$.
- $f'(x) = 2x - 3 \Rightarrow m = f'(3) = 3$.
- **Tangent:** $y - 2 = 3(x - 3) \Rightarrow y = 3x - 7$.
- **Normal:** $y - 2 = -\dfrac13 (x - 3) \Rightarrow y = -\dfrac{x}{3} + 3$.

![Figura 28: Tangent (vermell) i normal (blau, discontínua) a $f(x) = x^2 - 3x + 2$ en el punt $P(3, 2)$.](figs/m01_f28.png)

### 10.3. Exemple 2 — Tangents amb un pendent donat

En quins punts de $f(x) = x^3 - 3x$ la tangent és paral·lela a la recta $y = 9x + 1$?

Dues rectes són paral·leles si tenen el mateix pendent: cal $f'(x) = 9$.

$$f'(x) = 3x^2 - 3 = 9 \;\Rightarrow\; x^2 = 4 \;\Rightarrow\; x = \pm 2$$

- En $x = 2$: $f(2) = 2$, tangent $y - 2 = 9(x - 2) \Rightarrow y = 9x - 16$.
- En $x = -2$: $f(-2) = -2$, tangent $y + 2 = 9(x + 2) \Rightarrow y = 9x + 16$.

*Idea clau:* si l’enunciat dona una condició sobre la tangent (horitzontal, paral·lela a una recta, perpendicular a una recta), s’imposa sobre $f'(x)$ i es resol l’equació.

## 11. Complement: interpretació geomètrica i física de la derivada

Quan $h$ tendeix a $0$, el punt $Q=(a+h,f(a+h))$ s’acosta a $P=(a,f(a))$ i la recta secant $PQ$ tendeix a la **recta tangent** a la corba en $P$. El pendent de la secant és la variació mitjana $\dfrac{f(a+h)-f(a)}{h}$ i el de la tangent és el seu límit, és a dir, $f'(a)$.

![Figura 0: Les rectes secants (discontínues) s’aproximen a la recta tangent (vermell) quan $h\to0$: el pendent de la tangent és $f'(a)$.](figs/x01_secant_tangent.png)

La mateixa idea té una lectura física. Si $s(t)$ és la posició d’un mòbil en funció del temps, aleshores

$$v(t)=s'(t)\ \text{(velocitat instantània)},\qquad a(t)=v'(t)=s''(t)\ \text{(acceleració)}.$$

Més generalment, $f'(a)$ mesura la **taxa de variació instantània** de $f$ en $x=a$: quant canvia $f$ per cada unitat que canvia $x$.

**Exemple.** Un mòbil es mou segons $s(t)=t^3-6t^2+9t$ (metres, segons). Aleshores $v(t)=3t^2-12t+9=3(t-1)(t-3)$ i $a(t)=6t-12$. El mòbil s’atura ($v=0$) en $t=1$ s i $t=3$ s; en $t=1$ és a $s(1)=4$ m i en $t=3$ és a $s(3)=0$ m. Entre $t=1$ i $t=3$ la velocitat és negativa: retrocedeix.

## 12. Complement: derivades laterals i punts de no derivabilitat

> **Definició:** Les **derivades laterals** de $f$ en $x=a$ són
>
> $$f'(a^{+})=\lim_{h\to0^{+}}\frac{f(a+h)-f(a)}{h},\qquad f'(a^{-})=\lim_{h\to0^{-}}\frac{f(a+h)-f(a)}{h}.$$

> **Propietat:** $f$ és derivable en $x=a$ si i només si existeixen $f'(a^{+})$ i $f'(a^{-})$, són finites i són iguals. Aleshores $f'(a)=f'(a^{+})=f'(a^{-})$.

Una funció contínua pot deixar de ser derivable en un punt de tres maneres:

- **Punt angulós:** les derivades laterals existeixen però són diferents (exemple: $f(x)=|x|$ en $x=0$, amb $f'(0^-)=-1$ i $f'(0^+)=1$).
- **Punt cuspidal:** les derivades laterals són infinites de signe oposat (exemple: $f(x)=x^{2/3}$ en $x=0$).
- **Tangent vertical:** les dues derivades laterals són $+\infty$ (o $-\infty$) (exemple: $f(x)=\sqrt[3]{x}$ en $x=0$).

![Figura 0: Punts de no derivabilitat d’una funció contínua (punt angulós, cuspidal i tangent vertical) i funció no contínua (salt), que tampoc no és derivable.](figs/x01_nonderiv.png)

**Exemple.** Estudiem la derivabilitat de $f(x)=\begin{cases}x^2 & x\le1\\ 2x-1 & x>1\end{cases}$ en $x=1$. Contínua: $f(1^-)=1=f(1^+)$. Derivades laterals: $f'(1^-)=2x\big|_{x=1}=2$ i $f'(1^+)=2$. Coincideixen, per tant $f$ és derivable en $x=1$ amb $f'(1)=2$ (la recta $y=2x-1$ és tangent a la paràbola en $(1,1)$).

## 13. Complement: demostració de les regles bàsiques de derivació

*Demostració de la derivada d’un producte.* Per a $h(x)=u(x)\,v(x)$,
$$h'(x)=\lim_{h\to0}\frac{u(x+h)v(x+h)-u(x)v(x)}{h}=\lim_{h\to0}\Bigl[\frac{u(x+h)-u(x)}{h}\,v(x+h)+u(x)\,\frac{v(x+h)-v(x)}{h}\Bigr].$$
Com que $v$ és contínua, $v(x+h)\to v(x)$ i s’obté $(uv)'=u'v+uv'$. $\blacksquare$

*Demostració de la derivada d’un quocient.* Si $q=\dfrac uv$, aleshores $u=q\,v$ i, derivant, $u'=q'v+qv'$. Aïllant, $q'=\dfrac{u'-qv'}{v}=\dfrac{u'v-uv'}{v^{2}}$. $\blacksquare$

*Demostració de $(\sin x)'=\cos x$.* Amb la fórmula del sinus de la suma i els límits notables $\lim\limits_{h\to0}\frac{\sin h}{h}=1$ i $\lim\limits_{h\to0}\frac{\cos h-1}{h}=0$:
$$(\sin x)'=\lim_{h\to0}\frac{\sin x\cos h+\cos x\sin h-\sin x}{h}=\sin x\cdot0+\cos x\cdot1=\cos x.\ \blacksquare$$

*Demostració de $(x^n)'=n\,x^{n-1}$ ($n$ natural).* Pel binomi de Newton, $(x+h)^n=x^n+n\,x^{n-1}h+\binom n2x^{n-2}h^2+\dots+h^n$, de manera que $\dfrac{(x+h)^n-x^n}{h}=n\,x^{n-1}+h\,(\dots)\to n\,x^{n-1}$. $\blacksquare$

## 14. Complement: derivació logarítmica, implícita, paramètrica i funció inversa

**Derivació logarítmica.** Per a funcions del tipus $y=f(x)^{g(x)}$ es prenen logaritmes: $\ln y=g(x)\ln f(x)$, es deriva i s’aïlla $y'$:
$$\frac{y'}{y}=g'\ln f+g\,\frac{f'}{f}\ \Longrightarrow\ y'=f^{\,g}\Bigl(g'\ln f+g\,\frac{f'}{f}\Bigr).$$
*Exemple:* $y=x^{x}$ ($x>0$). $\ln y=x\ln x\Rightarrow\dfrac{y'}{y}=\ln x+1\Rightarrow y'=x^{x}(\ln x+1)$.

**Derivació implícita.** Si $y$ ve donada per una equació $F(x,y)=0$, es deriva respecte de $x$ considerant $y=y(x)$ i s’aïlla $y'$.
*Exemple:* a la circumferència $x^2+y^2=25$, derivant $2x+2y\,y'=0\Rightarrow y'=-\dfrac xy$. En el punt $(3,4)$ el pendent és $-\dfrac34$ i la tangent és $y-4=-\dfrac34(x-3)$, és a dir, $3x+4y=25$.

**Derivació paramètrica.** Si $x=x(t)$, $y=y(t)$, aleshores $\dfrac{dy}{dx}=\dfrac{y'(t)}{x'(t)}$.
*Exemple:* $x=t^2$, $y=t^3$: $\dfrac{dy}{dx}=\dfrac{3t^2}{2t}=\dfrac{3t}{2}$.

**Derivada de la funció inversa.** Si $f$ és derivable i bijectiva amb $f'(x)\neq0$, aleshores $(f^{-1})'(y)=\dfrac{1}{f'(x)}$ amb $y=f(x)$.
*Exemple:* $f(x)=x^3+x$ és creixent i $f(1)=2$, per tant $(f^{-1})'(2)=\dfrac{1}{f'(1)}=\dfrac14$. Aquesta regla permet deduir, per exemple, $(\arctan x)'=\dfrac{1}{1+x^2}$ a partir de $(\tan y)'=1+\tan^2y$.

## 15. Complement: exemples resolts de derivades

a) $f(x)=x^2e^{3x}$. Producte: $f'(x)=2x\,e^{3x}+x^2\cdot3e^{3x}=x\,e^{3x}(2+3x)$.

b) $f(x)=\ln(x^2+1)$. Regla de la cadena: $f'(x)=\dfrac{2x}{x^2+1}$.

c) $f(x)=\sin(x^2)\cos x$. $f'(x)=2x\cos(x^2)\cos x-\sin(x^2)\sin x$.

d) $f(x)=\dfrac{2x+1}{x^2-3}$. Quocient: $f'(x)=\dfrac{2(x^2-3)-(2x+1)2x}{(x^2-3)^2}=\dfrac{-2(x^2+x+3)}{(x^2-3)^2}$.

e) $f(x)=\sqrt{1+x^2}$. $f'(x)=\dfrac{2x}{2\sqrt{1+x^2}}=\dfrac{x}{\sqrt{1+x^2}}$.

f) $f(x)=\arctan\sqrt x$. Amb $u=\sqrt x$, $u'=\dfrac1{2\sqrt x}$: $f'(x)=\dfrac{1}{1+x}\cdot\dfrac{1}{2\sqrt x}=\dfrac{1}{2\sqrt x\,(1+x)}$.

g) $f(x)=\dfrac{\ln x}{x}$. $f'(x)=\dfrac{\frac1x\cdot x-\ln x}{x^2}=\dfrac{1-\ln x}{x^2}$.

h) $f(x)=e^{\sin x}$. $f'(x)=\cos x\,e^{\sin x}$.

*Comprovació:* una bona pràctica és verificar el resultat amb un valor concret, per exemple $f(x)=x^2e^{3x}$ en $x=0$: $f'(0)=0$, coherent amb $x\,e^{3x}(2+3x)=0$.


## 1. Funcions contínues

> **Definició:** Una funció $f(x)$ és **contínua** en el punt $x = a$ si es verifiquen les dues condicions següents:
>
> - Existeix $f(a)$; és a dir, $a$ pertany al domini de la funció.
> - Existeixen els límits laterals de $f(x)$ en el punt $a$ i coincideixen amb $f(a)$:
>
> $$\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$$

Una funció és contínua en un interval si ho és en tots i cadascun dels punts de l’interval. Podem afirmar també que totes les funcions polinòmiques són funcions contínues.

La figura il·lustra la diferència entre una funció contínua i una de no contínua en el punt $a$:

![Figura 3: A l’esquerra, funció contínua en $x = a$: el límit coincideix amb $f(a)$. A la dreta, funció discontínua en $x = a$: els límits laterals no coincideixen amb el valor de la funció.](figs/m02_f03.png)

## 2. Propietats de les funcions contínues

### 2.1. Teorema dels valors intermedis

> **Propietat (Teorema dels valors intermedis):** Sigui $f(x)$ una funció contínua en un interval tancat $[a, b]$ i $k$ un nombre tal que $f(a) \le k \le f(b)$. Aleshores, existeix almenys un punt $c \in [a, b]$ tal que $f(c) = k$.

![Figura 4: Il·lustració del Teorema dels valors intermedis: per a tot $k$ entre $f(a)$ i $f(b)$, existeix $c \in [a, b]$ tal que $f(c) = k$.](figs/m02_f04.png)

### 2.2. Teorema de Bolzano

> **Propietat (Teorema de Bolzano):** Sigui $f(x)$ una funció contínua en un interval tancat $[a, b]$ tal que $f(a)\cdot f(b) < 0$ (és a dir, $f(a)$ i $f(b)$ tenen signe diferent). Aleshores, existeix almenys un punt $c \in (a, b)$ tal que $f(c) = 0$.

![Figura 5: Teorema de Bolzano: $f(a) > 0$, $f(b) < 0$ i $f$ contínua en $[a, b] \Rightarrow \exists\, c \in (a, b)$ tal que $f(c) = 0$.](figs/m02_f05.png)

## 3. Màxims i mínims absoluts d’una funció en un interval

Considerem una funció $f(x)$ contínua en un interval tancat $[a, b]$. Aleshores:

- Existeix almenys un punt $c \in [a, b]$ en què la funció assoleix el seu **valor màxim absolut**, és a dir, $f(c) \ge f(x)$ per a tot $x \in [a, b]$.
- Existeix almenys un punt $d \in [a, b]$ en què la funció assoleix el seu **valor mínim absolut**, és a dir, $f(d) \le f(x)$ per a tot $x \in [a, b]$.

![Figura 6: Màxim i mínim absoluts de $f(x) = \sin x$ en l’interval $[0, 2\pi]$.](figs/m02_f06.png)

## 4. Funcions derivables

> **Definició:** Una funció contínua $f(x)$ és **derivable** en un punt $x = x_0$ si existeix $f'(x_0)$:
>
> $$f'(x_0) = \lim_{h\to 0} \frac{f(x_0 + h) - f(x_0)}{h}$$

Cal tenir present la relació entre continuïtat i derivabilitat:

- Si una funció és discontínua en un punt, no és derivable en aquell punt.
- Una funció derivable en un punt és necessàriament contínua en aquell punt.

### 4.1. Tipus de discontinuïtats

Si $f(x)$ no és derivable en $x_0$, el límit $\displaystyle\lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}$ no existeix. Podem distingir tres casos:

- **Discontinuïtat evitable:** no existeix $f(x_0)$ i, per tant, tampoc el límit de la diferència.
- **Discontinuïtat de salt:** el límit no existeix perquè els límits laterals a dreta i esquerra de $x_0$ no coincideixen.
- **Discontinuïtat asimptòtica:** el límit no és numèric (un dels dos límits laterals o tots dos tendeixen a l’infinit).

La figura mostra els cinc casos possibles de no-derivabilitat o discontinuïtat en un punt $a$:

![Figura 7: Tipus de discontinuïtats en un punt $a$: evitable sense valor (1), evitable amb valor diferent (2), salt finit (3) i salt infinit o asimptòtica (4).](figs/m02_f07.png)

## 5. Propietats de les funcions derivables

### 5.1. Teorema de Rolle

> **Propietat (Teorema de Rolle):** Si $f(x)$ és contínua en $[a, b]$, derivable en $(a, b)$ i $f(a) = f(b)$, aleshores existeix almenys un punt $c \in (a, b)$ tal que $f'(c) = 0$.

![Figura 8: Teorema de Rolle: si $f(a) = f(b)$, existeix $c \in (a, b)$ on la tangent és horitzontal, és a dir, $f'(c) = 0$.](figs/m02_f08.png)

### 5.2. Teorema del valor mitjà (Lagrange)

> **Propietat (Teorema del valor mitjà):** Si $f(x)$ és contínua en $[a, b]$ i derivable en $(a, b)$, existeix almenys un punt $c \in (a, b)$ tal que
>
> $$f'(c) = \frac{f(b) - f(a)}{b - a}$$

Geomètricament, el teorema afirma que existeix un punt $c$ on la tangent a la corba és paral·lela a la secant que uneix $(a, f(a))$ i $(b, f(b))$.

![Figura 9: Teorema del valor mitjà: en algun punt $c \in (a, b)$, la tangent a la corba és paral·lela a la recta secant que uneix $(a, f(a))$ i $(b, f(b))$.](figs/m02_f09.png)

### 5.3. Teorema de Cauchy

> **Propietat (Teorema de Cauchy):** Si $f(x)$ i $g(x)$ són dues funcions contínues en $[a, b]$ i derivables en $(a, b)$, aleshores existeix un punt $c \in (a, b)$ tal que
>
> $$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(c)}{g'(c)}$$

El teorema de Cauchy és una generalització del teorema del valor mitjà: si $g(x) = x$, aleshores $g'(c) = 1$ i es recupera exactament el resultat de Lagrange.

## 6. La segona derivada

La segona derivada d’una funció s’obté derivant la funció derivada:

$$f''(x) = [f'(x)]'$$

La segona derivada permet caracteritzar els extrems relatius i la concavitat de la funció.

### 6.1. Màxims i mínims relatius

- Si $f'(x_1) = 0$ i $f''(x_1) < 0$, en $x = x_1$ hi ha un **màxim relatiu** de $f(x)$.
- Si $f'(x_2) = 0$ i $f''(x_2) > 0$, en $x = x_2$ hi ha un **mínim relatiu** de $f(x)$.

### 6.2. Concavitat d’una funció

- $f(x)$ és **convexa** (còncava cap avall, $\cap$) en un interval si $f''(x) < 0$ per a tot $x$ de l’interval.
- $f(x)$ és **còncava** (còncava cap amunt, $\cup$) en un interval si $f''(x) > 0$ per a tot $x$ de l’interval.

### 6.3. Punt d’inflexió

Si $f''(x)$ és contínua en l’interval considerat i passa de positiva a negativa (o a l’inrevés), necessàriament existirà un punt en què $f''(x) = 0$. En aquest punt canvia la concavitat de la gràfica i s’anomena **punt d’inflexió**.

![Figura 10: Concavitat: còncava cap amunt ($\cup$, $f'' > 0$), convexa cap avall ($\cap$, $f'' < 0$) i punt d’inflexió on canvia la concavitat ($f''(x_0) = 0$).](figs/m02_f10.png)

## 7. Càlcul de límits i la derivada. Regla de l’Hôpital

> **Propietat (Regla de l’Hôpital):** Siguin $f$ i $g$ funcions derivables en un entorn de $x_0$, amb $g'(x) \neq 0$. Si el quocient $f(x)/g(x)$ presenta una indeterminació del tipus $0/0$ o $\infty/\infty$ en $x_0$, aleshores
>
> $$\lim_{x\to x_0} \frac{f(x)}{g(x)} = \lim_{x\to x_0} \frac{f'(x)}{g'(x)}$$
>
> sempre que el límit del costat dret existeixi.

La regla s’aplica en els casos d’indeterminació del tipus $\dfrac{0}{0}$ i $\dfrac{\infty}{\infty}$, i pot aplicar-se repetidament si el quocient de les derivades continua sent indeterminat.

En els càlculs de límits, les expressions indeterminades més habituals són:

$$\frac{0}{0},\quad \frac{\infty}{\infty},\quad \infty\cdot 0,\quad 1^\infty,\quad \infty^0,\quad 0^0,\quad \infty-\infty$$

*Observació:* les indeterminacions del tipus $\infty\cdot 0$, $1^\infty$, $\infty^0$ i $0^0$ es redueixen prèviament a una forma $0/0$ o $\infty/\infty$ (per exemple, mitjançant logaritmes o inversions) per poder aplicar la regla de l’Hôpital.


## 8. Complement: càlcul de límits

### 8.1. Límits laterals i límits a l’infinit

El límit $\displaystyle\lim_{x\to a} f(x) = L$ existeix si i només si els **límits laterals** coincideixen:

$$\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = L$$

Si el límit és $\pm\infty$, hi ha una **asímptota vertical** $x = a$. Si $\displaystyle\lim_{x\to\pm\infty} f(x) = b$, hi ha una **asímptota horitzontal** $y = b$.

Per a $x\to+\infty$, les funcions elementals es poden ordenar per ordre de creixement:

$$\ln x \;\ll\; x^n \;\ll\; a^x \;\;(a>1)$$

És a dir, una exponencial supera qualsevol potència, i una potència supera qualsevol logaritme. Això resol molts límits $\infty/\infty$ de cop d’ull.

### 8.2. Les indeterminacions i com resoldre-les

| Indeterminació | Com tractar-la |
|---|---|
| $\dfrac{0}{0}$ | Factoritzar i simplificar (polinomis); multiplicar pel **conjugat** (arrels); regla de l’Hôpital |
| $\dfrac{\infty}{\infty}$ | Dividir per la **potència més alta** de $x$ (només comparar graus); comparar ordres de creixement; Hôpital |
| $\infty - \infty$ | Fraccions: denominador comú. Arrels: multiplicar i dividir pel **conjugat** |
| $0\cdot\infty$ | Convertir en quocient $\frac{0}{0}$ o $\frac{\infty}{\infty}$ i aplicar Hôpital |
| $1^{\infty}$ | Fórmula del nombre $e$ (vegeu a sota) |
| $0^0,\ \infty^0$ | Prendre logaritmes: $\ln L = \lim g\cdot\ln f$ |

**Límits notables** (per a $x\to 0$):

$$\lim_{x\to0}\frac{\sin x}{x}=1,\qquad \lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12,\qquad \lim_{x\to0}\frac{e^x-1}{x}=1,\qquad \lim_{x\to0}\frac{\ln(1+x)}{x}=1$$

**Indeterminació $1^\infty$.** Si $\displaystyle\lim_{x\to a} f(x)=1$ i $\displaystyle\lim_{x\to a} g(x)=\pm\infty$, aleshores

$$\lim_{x\to a} f(x)^{g(x)} = e^{\,\lim_{x\to a} g(x)\,\bigl(f(x)-1\bigr)}$$

### 8.3. Exemples resolts

**a)** $\displaystyle\lim_{x\to2}\frac{x^2-4}{x-2}\;\;\left(\tfrac00\right)$: es factoritza $x^2-4=(x-2)(x+2)$ i es simplifica:

$$\lim_{x\to2}(x+2)=4$$

**b)** $\displaystyle\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}\;\;\left(\tfrac00\right)$: es multiplica pel conjugat.

$$\frac{(\sqrt{x+4}-2)(\sqrt{x+4}+2)}{x(\sqrt{x+4}+2)}=\frac{x}{x(\sqrt{x+4}+2)}=\frac{1}{\sqrt{x+4}+2}\;\longrightarrow\;\frac14$$

**c)** $\displaystyle\lim_{x\to+\infty}\frac{3x^2-x+1}{5x^2+2}\;\;\left(\tfrac\infty\infty\right)$: mateix grau, el límit és el quocient dels coeficients dominants: $\dfrac35$.

*Regla pràctica per a quocients de polinomis en $\pm\infty$:* grau del numerador $<$ grau del denominador $\Rightarrow 0$; iguals $\Rightarrow$ quocient de coeficients; numerador de grau superior $\Rightarrow\pm\infty$.

**d)** $\displaystyle\lim_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)\;\;(\infty-\infty)$:

$$\frac{(\sqrt{x^2+x}-x)(\sqrt{x^2+x}+x)}{\sqrt{x^2+x}+x}=\frac{x}{\sqrt{x^2+x}+x}=\frac{1}{\sqrt{1+\frac1x}+1}\;\longrightarrow\;\frac12$$

**e)** $\displaystyle\lim_{x\to+\infty}\left(1+\frac2x\right)^{x}\;\;(1^\infty)$:

$$e^{\lim x\left(1+\frac2x-1\right)}=e^{\lim x\cdot\frac2x}=e^2$$

**f)** Límits laterals amb asímptota vertical: $\displaystyle\lim_{x\to3^\pm}\frac{2x+1}{x-3}$. El numerador val $7>0$ prop de $x=3$, i el denominador és petit: positiu si $x\to3^+$ i negatiu si $x\to3^-$. Per tant

$$\lim_{x\to3^+}\frac{2x+1}{x-3}=+\infty,\qquad \lim_{x\to3^-}\frac{2x+1}{x-3}=-\infty$$

A més, $\displaystyle\lim_{x\to\pm\infty}\frac{2x+1}{x-3}=2$: asímptota horitzontal $y=2$.

![Figura 29: A l’esquerra, $f(x)=\dfrac{x^2-4}{x-2}$ coincideix amb $y=x+2$ excepte en $x=2$, on hi ha un forat: el límit val $4$ tot i que $f(2)$ no existeix. A la dreta, $g(x)=\dfrac{2x+1}{x-3}$ amb asímptota vertical $x=3$ i horitzontal $y=2$.](figs/m02_f29.png)

## 9. Complement: funcions definides a trossos

Una funció definida a trossos pot ser contínua i derivable en els punts on canvia l’expressió només si es compleixen unes condicions. Per a una funció

$$f(x)=\begin{cases} f_1(x) & x\le a\\ f_2(x) & x>a\end{cases}$$

> **Propietat (Continuïtat i derivabilitat en el punt de canvi):**
>
> - **Contínua en $x=a$** $\iff$ $f_1(a)=\displaystyle\lim_{x\to a^+}f_2(x)=f_2(a)$ (els dos trossos *es toquen*).
> - **Derivable en $x=a$** $\iff$ és contínua **i** $f_1'(a)=f_2'(a)$ (els dos trossos *s’enganxen sense angle*).

*Atenció:* abans de comparar derivades cal assegurar la continuïtat. Una funció derivable sempre és contínua, però no al revés (per exemple, $f(x)=|x|$ és contínua en $0$ però no derivable: les derivades laterals valen $-1$ i $1$).

### 9.1. Exemple — Trobar paràmetres

Determineu $a$ i $b$ perquè sigui derivable en $x=1$:

$$f(x)=\begin{cases} ax^2+1 & x\le 1\\ bx-1 & x>1\end{cases}$$

1. **Continuïtat en $x=1$:** $a\cdot1^2+1=b\cdot1-1 \;\Rightarrow\; a+1=b-1 \;\Rightarrow\; b=a+2$.
2. **Derivades:** $f_1'(x)=2ax$ i $f_2'(x)=b$. En $x=1$: $2a=b$.
3. **Sistema:** $b=a+2$ i $b=2a \Rightarrow 2a=a+2 \Rightarrow a=2$, $b=4$.

Comprovació: $f(1)=2+1=3$ pels dos costats, i les dues derivades valen $4$.

![Figura 30: La funció a trossos amb $a=2$ i $b=4$ és contínua i derivable en $x=1$: la paràbola i la recta se uneixen en $(1, 3)$ amb el mateix pendent.](figs/m02_f30.png)


## 10. Complement: demostracions dels teoremes

Aquest apartat recull les demostracions dels teoremes d’aquest tema, perquè entenguis **d’on surten** i com s’encadenen. A la PAU normalment només cal *saber aplicar-los* (comprovant les hipòtesis), però a vegades demanen explicar-ne una.

*Ordre lògic:* Bolzano i Weierstrass (continuïtat) → lema de Fermat → Rolle → Lagrange → Cauchy.

### 10.1. Teorema de Bolzano

> **Teorema:** si $f$ és contínua en $[a,b]$ i $f(a)\cdot f(b)<0$, existeix $c\in(a,b)$ amb $f(c)=0$.

*Demostració.* Suposem $f(a)<0<f(b)$ (l’altre cas s’obté aplicant-ho a $-f$). Considerem el conjunt

$$S=\{x\in[a,b]\;:\;f(x)<0\}$$

És no buit ($a\in S$) i està fitat superiorment per $b$; sigui $c=\sup S$. Provem que $f(c)=0$ descartant les altres dues possibilitats:

- **Si $f(c)<0$:** llavors $c\neq b$ (perquè $f(b)>0$). Per continuïtat, $f<0$ en un entorn de $c$, de manera que hi ha punts de $S$ més grans que $c$. Contradicció amb que $c$ és el suprem.
- **Si $f(c)>0$:** llavors $c\neq a$. Per continuïtat, $f>0$ en un interval $(c-\delta,c]$, de manera que cap punt d’aquest interval és de $S$ i el suprem seria com a molt $c-\delta$. Contradicció.

Per tant $f(c)=0$, i com que $f(a)\neq0\neq f(b)$, $c\in(a,b)$. $\blacksquare$

### 10.2. Teorema de Weierstrass (esquema)

> **Teorema:** si $f$ és contínua en $[a,b]$, existeixen $m,M$ (mínim i màxim absoluts) tals que $m\le f(x)\le M$ i $f$ pren aquests valors.

*Esquema de la demostració.* **(1) $f$ està fitada.** Si no ho estigués, hi hauria una successió $x_n\in[a,b]$ amb $|f(x_n)|>n$. Com que $[a,b]$ és tancat i fitat, té una subsuccessió convergent $x_{n_k}\to x_0\in[a,b]$; per continuïtat $f(x_{n_k})\to f(x_0)$, que és un nombre finit: contradicció.

**(2) El suprem s’assoleix.** Sigui $M=\sup f$. Hi ha $x_n$ amb $f(x_n)\to M$; agafant una subsuccessió $x_{n_k}\to c\in[a,b]$, per continuïtat $f(c)=M$. Igual amb el mínim. $\blacksquare$

### 10.3. Lema de Fermat

> **Lema:** si $f$ és derivable en $c$ i té un extrem relatiu en $c$ (interior a l’interval), llavors $f'(c)=0$.

*Demostració.* Suposem un màxim: $f(x)\le f(c)$ prop de $c$.

- Per $x>c$: $\dfrac{f(x)-f(c)}{x-c}\le0$, i passant al límit, $f'(c)\le0$.
- Per $x<c$: $\dfrac{f(x)-f(c)}{x-c}\ge0$, i passant al límit, $f'(c)\ge0$.

Com que $f'(c)$ existeix, els dos límits coincideixen: $f'(c)=0$. $\blacksquare$

### 10.4. Teorema de Rolle

*Demostració.* Per Weierstrass, $f$ té màxim $M$ i mínim $m$ en $[a,b]$.

- **Si $M=m$**, $f$ és constant i $f'(x)=0$ en qualsevol punt de $(a,b)$.
- **Si $M\neq m$**, com que $f(a)=f(b)$, almenys un dels dos valors (màxim o mínim) s’assoleix en un punt $c$ **interior**. Pel lema de Fermat, $f'(c)=0$. $\blacksquare$

### 10.5. Teorema del valor mitjà (Lagrange)

*Demostració.* Restem de $f$ la recta secant que uneix els extrems:

$$g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}\,(x-a)$$

$g$ és contínua en $[a,b]$, derivable en $(a,b)$ i $g(a)=0=g(b)$. Per Rolle, existeix $c$ amb $g'(c)=0$, és a dir,

$$f'(c)-\frac{f(b)-f(a)}{b-a}=0\;\Longrightarrow\;f'(c)=\frac{f(b)-f(a)}{b-a}.\ \blacksquare$$

**Conseqüència (la més usada).** Si $f'(x)>0$ en un interval, $f$ és creixent: per a $x_1<x_2$, $f(x_2)-f(x_1)=f'(c)(x_2-x_1)>0$. Igualment, si $f'(x)=0$ en tot l’interval, $f$ és constant.

### 10.6. Teorema de Cauchy

> **Teorema:** si $f,g$ són contínues en $[a,b]$ i derivables en $(a,b)$, existeix $c$ amb $f'(c)\,\bigl(g(b)-g(a)\bigr)=g'(c)\,\bigl(f(b)-f(a)\bigr)$.

*Demostració.* Definim $h(x)=f(x)\bigl(g(b)-g(a)\bigr)-g(x)\bigl(f(b)-f(a)\bigr)$. Es comprova que $h(a)=f(a)g(b)-g(a)f(b)=h(b)$. Per Rolle, $h'(c)=0$ per a algun $c$, que és exactament la igualtat enunciada. $\blacksquare$

*Aquest teorema és la base de la regla de l’Hôpital.*

### 10.7. Exemple d’aplicació d’una demostració

**Demostra que $x^3+x-1=0$ té una única arrel real.**

- *Existència:* $f(x)=x^3+x-1$ és contínua, $f(0)=-1<0$ i $f(1)=1>0$; per **Bolzano** hi ha una arrel a $(0,1)$.
- *Unicitat:* si hi hagués dues arrels $a<b$, com que $f(a)=f(b)=0$, per **Rolle** existiria $c$ amb $f'(c)=0$. Però $f'(x)=3x^2+1>0$ sempre: contradicció. Per tant, l’arrel és única.

## 11. Complement: derivabilitat i continuïtat

> **Teorema:** Si una funció $f$ és derivable en $x=a$, aleshores és contínua en $x=a$.

*Demostració.* Per a $x\neq a$ escrivim $f(x)-f(a)=\dfrac{f(x)-f(a)}{x-a}\,(x-a)$. Prenent el límit quan $x\to a$,
$$\lim_{x\to a}\bigl[f(x)-f(a)\bigr]=f'(a)\cdot0=0\ \Longrightarrow\ \lim_{x\to a}f(x)=f(a).\ \blacksquare$$

El recíproc és fals: $f(x)=|x|$ és contínua en $x=0$ però no és derivable. Per tant, «derivable $\Rightarrow$ contínua», però «contínua $\not\Rightarrow$ derivable».

## 12. Complement: aplicació dels teoremes en problemes

Els teoremes d’aquest tema se solen aplicar per demostrar l’existència o la unicitat de solucions d’una equació.

**Exemple 1 (Bolzano).** Demostrem que $x^3+x-1=0$ té alguna solució a $(0,1)$. La funció $f(x)=x^3+x-1$ és contínua a $[0,1]$, amb $f(0)=-1<0$ i $f(1)=1>0$. Pel teorema de Bolzano, existeix $c\in(0,1)$ amb $f(c)=0$.

**Exemple 2 (unicitat amb Rolle).** Demostrem que aquesta solució és única. Si $f$ tingués dues arrels $c_1<c_2$, pel teorema de Rolle existiria $d\in(c_1,c_2)$ amb $f'(d)=0$. Però $f'(x)=3x^2+1>0$ per a tot $x$: contradicció. Per tant l’arrel és única.

**Exemple 3 (valors intermedis).** La funció $f(x)=x^2$ pren, a $[0,3]$, tots els valors compresos entre $f(0)=0$ i $f(3)=9$; en particular $f(c)=5$ per a $c=\sqrt5\in(0,3)$.

**Exemple 4 (Lagrange).** Demostrem que $|\sin b-\sin a|\le|b-a|$ per a tot $a,b$. Pel teorema del valor mitjà aplicat a $f(x)=\sin x$, existeix $c$ entre $a$ i $b$ amb $\sin b-\sin a=\cos c\,(b-a)$, i com que $|\cos c|\le1$ s’obté la desigualtat.

**Exemple 5 (Weierstrass).** La funció $f(x)=\dfrac1x$ és contínua a $(0,1]$ però no té màxim absolut: el teorema de Weierstrass exigeix un interval **tancat i fitat**.

## 13. Complement: funcions a trossos amb paràmetres

Per determinar paràmetres, s’imposen les condicions de continuïtat i, si cal, de derivabilitat en els punts de canvi.

**Exemple.** Trobem $a$ i $b$ perquè $f(x)=\begin{cases}x^2+a\,x & x\le1\\ 3x+b & x>1\end{cases}$ sigui derivable en $x=1$.

- Continuïtat: $f(1^-)=1+a$ i $f(1^+)=3+b$. Cal $1+a=3+b$.
- Derivabilitat: $f'(1^-)=2+a$ i $f'(1^+)=3$. Cal $2+a=3$, és a dir, $a=1$.

De la primera, $b=a-2=-1$. Per tant $a=1$ i $b=-1$.

**Exemple (valor absolut).** $f(x)=|x^2-1|$ es pot escriure a trossos: $f(x)=x^2-1$ si $|x|\ge1$ i $f(x)=1-x^2$ si $|x|<1$. És contínua a tot $\mathbb R$, però no és derivable en $x=\pm1$: allà $f'(1^-)=-2$ i $f'(1^+)=2$ (punts angulosos).


## 1. Característiques d’una funció

### 1.1. Domini i recorregut

El conjunt de tots els valors reals de la variable independent que tenen per imatge un nombre real constitueixen el **domini** de la funció, expressat com $D_f$. El conjunt de totes les imatges reals de la funció és el **recorregut** o **rang** de la funció.

| Funció | Domini ($D_f$) |
|---|---|
| Polinòmica $P(x)$ | $\mathbb{R}$ |
| Racional $\dfrac{P(x)}{Q(x)}$ | $\mathbb{R} - \{x : Q(x) = 0\}$ |
| Arrel $\sqrt[n]{P(x)}$, $n$ parell | $\mathbb{R} - \{x : P(x) < 0\}$ |
| Arrel $\sqrt[n]{P(x)}$, $n$ imparell | $\mathbb{R}$ |
| Logarítmica $\log(f(x))$ | $\mathbb{R} - \{x : f(x) \le 0\}$ |
| Exponencial $e^{f(x)}$ | $D(f)$ |

*Taula: domini de les principals famílies de funcions.*

### 1.2. Simetries

- Una funció és **parella** si $f(-x) = f(x)$. La seva gràfica és simètrica respecte a l’eix d’ordenades.
- Una funció és **imparella** si $f(-x) = -f(x)$. La seva gràfica és simètrica respecte de l’origen.

### 1.3. Punts de tall amb els eixos de coordenades

- Tall amb l’eix $X$ $(-, 0)$: quan $f(x) = 0$.
- Tall amb l’eix $Y$ $(0, -)$: quan $x = 0$, és a dir, $f(0)$.

## 2. Asímptotes

Definim una **asímptota** com aquella recta límit de les rectes tangents a la gràfica de la funció quan el punt de tangència tendeix a infinit. La distància entre l’asímptota i la gràfica de la funció tendeix a zero. Hi ha tres tipus d’asímptotes:

![Figura 11: Els tres tipus d’asímptotes: horitzontal ($y = b$), vertical ($x = a$) i obliqua ($y = mx + n$).](figs/m03_f11.png)

### 2.1. Asímptota vertical

Si $f(x)$ té una discontinuïtat asimptòtica en el punt $x = a$, la recta $x = a$ és una asímptota vertical de la funció:

$$\lim_{x\to a} f(x) = \infty$$

### 2.2. Asímptota horitzontal

Si $\displaystyle\lim_{x\to\pm\infty} f(x) = b$, la recta $y = b$ és una asímptota horitzontal. En funcions racionals $P(x)/Q(x)$:

- Si $\operatorname{gr}(P) > \operatorname{gr}(Q)$: no hi ha asímptota horitzontal.
- Si $\operatorname{gr}(P) = \operatorname{gr}(Q)$: $y = \dfrac{\text{coef. principal de } P}{\text{coef. principal de } Q}$ és l’A.H.
- Si $\operatorname{gr}(P) < \operatorname{gr}(Q)$: $y = 0$ és l’asímptota horitzontal.

### 2.3. Asímptota obliqua

L’asímptota obliqua té la forma $y = mx + n$, on:

$$m = \lim_{x\to\pm\infty} \frac{f(x)}{x}, \qquad n = \lim_{x\to\pm\infty}\bigl[f(x) - mx\bigr]$$

En funcions racionals, existeix asímptota obliqua quan el grau del numerador supera en exactament 1 el grau del denominador (per exemple, $\dfrac{x^2+1}{x+3}$, graus 2 i 1).

## 3. Optimització

Els problemes d’**optimització** són aquells en els quals es busca el valor que fa màxima o mínima una determinada funció que correspon a la matematització d’una situació pràctica.

Per analitzar una funció, s’utilitza el signe de la derivada primera $f'(x)$ sobre la recta real, identificant els punts clau (zeros de $f'$) i determinant si corresponen a màxims, mínims o punts d’inflexió de tangent horitzontal.

## 4. Complement: optimització — mètode i exemples

### 4.1. Mètode general

1. Identificar la quantitat a maximitzar o minimitzar i expressar-la com a funció $f(x)$.
2. Determinar el domini de $f$: restriccions físiques o geomètriques del problema.
3. Derivar $f'(x)$ i resoldre $f'(x) = 0$ per trobar els **punts crítics**.
4. Classificar cada punt crític:
   - Si $f''(x_0) > 0 \Rightarrow$ mínim local.
   - Si $f''(x_0) < 0 \Rightarrow$ màxim local.
   - Comparar també els valors als extrems del domini.
5. Respondre amb les unitats correctes.

### 4.2. Exemple 1 — Àrea màxima d’un rectangle

Un agricultor té $80$ m de tanca per delimitar un rectangle. Quines dimensions fan l’àrea màxima?

Sigui $x$ l’amplada i $y$ l’alçada. Restricció: $2x + 2y = 80 \Rightarrow y = 40 - x$.

$$A(x) = x\,(40 - x) = 40x - x^2, \qquad x \in (0, 40)$$

$$A'(x) = 40 - 2x = 0 \Rightarrow x = 20$$

$A''(x) = -2 < 0 \Rightarrow$ màxim. $\;A(20) = 20\cdot 20 = 400\ \text{m}^2$.

La forma òptima és un **quadrat de $20\times 20$ m**.

### 4.3. Exemple 2 — Volum màxim d’una caixa

D’una làmina quadrada de costat $12$ cm es retallen quadrats iguals de costat $x$ als quatre cantons i es plega. Quina $x$ maximitza el volum?

$$V(x) = x\,(12 - 2x)^2, \qquad x \in (0, 6)$$

$$V'(x) = (12-2x)^2 + x\cdot 2(12-2x)(-2) = (12-2x)\bigl[(12-2x) - 4x\bigr] = (12-2x)(12-6x)$$

$V'(x) = 0 \Rightarrow x = 6$ (extrem) o $x = 2$.

$V(2) = 2\cdot(8)^2 = 128\ \text{cm}^3 \Rightarrow$ **màxim**.


### 4.4. Exemple 3 — Cost mínim: una llauna cilíndrica

Es vol fabricar una llauna cilíndrica d’un litre ($1000\ \text{cm}^3$). Quines dimensions minimitzen el material (àrea total)?

Radi $r$ i alçada $h$. Restricció del volum: $\pi r^2 h = 1000 \Rightarrow h = \dfrac{1000}{\pi r^2}$.

$$A(r) = 2\pi r^2 + 2\pi r h = 2\pi r^2 + \frac{2000}{r}, \qquad r > 0$$

$$A'(r) = 4\pi r - \frac{2000}{r^2} = 0 \;\Rightarrow\; r^3 = \frac{500}{\pi} \;\Rightarrow\; r = \sqrt[3]{\frac{500}{\pi}} \approx 5{,}42\ \text{cm}$$

$A''(r) = 4\pi + \dfrac{4000}{r^3} > 0 \Rightarrow$ **mínim**. Llavors $h = \dfrac{1000}{\pi r^2} \approx 10{,}84\ \text{cm}$, és a dir, $h = 2r$: la llauna òptima té l’alçada igual al diàmetre.

## 5. Complement: estudi i representació gràfica d’una funció

Representar una funció significa reunir tota la informació anterior en un dibuix. El **mètode** és sempre el mateix:

1. **Domini** de $f$ (quocients, arrels, logaritmes).
2. **Simetries:** parella si $f(-x)=f(x)$ (simètrica respecte de l’eix $OY$); imparella si $f(-x)=-f(x)$ (simètrica respecte de l’origen).
3. **Punts de tall:** amb l’eix $OY$, $f(0)$; amb l’eix $OX$, $f(x)=0$.
4. **Asímptotes:** verticals (punts fora del domini), horitzontals i obliqües (límits a $\pm\infty$).
5. **Monotonia i extrems:** signe de $f'$; punts crítics $f'(x)=0$.
6. **Curvatura i inflexions:** signe de $f''$; punts on $f''(x)=0$.
7. **Taula de valors** amb tots els punts singulars, i dibuix de la gràfica amb una corba suau.

### 5.1. Exemple 1 — Un polinomi: $f(x)=x^3-3x$

- **Domini:** $\mathbb{R}$. **Simetria:** $f(-x)=-f(x)$, imparella.
- **Talls:** $f(0)=0$; $x^3-3x=x(x^2-3)=0 \Rightarrow x=0,\ x=\pm\sqrt3$.
- **Asímptotes:** cap (és un polinomi).
- **Monotonia:** $f'(x)=3x^2-3=3(x-1)(x+1)$, s’anul·la en $x=\pm1$.

| Interval | $(-\infty,-1)$ | $(-1,1)$ | $(1,+\infty)$ |
|---|---|---|---|
| Signe de $f'$ | $+$ | $-$ | $+$ |
| $f$ | creix | decreix | creix |

  Màxim relatiu $(-1,\,2)$ i mínim relatiu $(1,\,-2)$.
- **Curvatura:** $f''(x)=6x$: còncava ($\cap$) per a $x<0$, convexa ($\cup$) per a $x>0$. Inflexió en $(0,\,0)$.

![Figura 31: Gràfica de $f(x)=x^3-3x$ amb el màxim, el mínim i el punt d’inflexió.](figs/m03_f31.png)

### 5.2. Exemple 2 — Una funció racional: $f(x)=\dfrac{x^2}{x-1}$

- **Domini:** $\mathbb{R}\setminus\{1\}$. **Simetria:** cap.
- **Talls:** $f(0)=0$ i $x^2=0\Rightarrow x=0$ (només l’origen).
- **Asímptota vertical:** $x=1$. $\displaystyle\lim_{x\to1^+}f=+\infty$ i $\displaystyle\lim_{x\to1^-}f=-\infty$.
- **Asímptota obliqua:** $m=\displaystyle\lim_{x\to\infty}\frac{f(x)}{x}=1$ i $n=\displaystyle\lim_{x\to\infty}\left(\frac{x^2}{x-1}-x\right)=\lim\frac{x}{x-1}=1$. Per tant $y=x+1$.
- **Monotonia:** $f'(x)=\dfrac{2x(x-1)-x^2}{(x-1)^2}=\dfrac{x(x-2)}{(x-1)^2}$, s’anul·la en $x=0$ i $x=2$.

| Interval | $(-\infty,0)$ | $(0,1)$ | $(1,2)$ | $(2,+\infty)$ |
|---|---|---|---|---|
| Signe de $f'$ | $+$ | $-$ | $-$ | $+$ |
| $f$ | creix | decreix | decreix | creix |

  Màxim relatiu $(0,\,0)$ i mínim relatiu $(2,\,4)$.
- **Curvatura:** $f''(x)=\dfrac{2}{(x-1)^3}$: còncava per a $x<1$ i convexa per a $x>1$. No hi ha punts d’inflexió ($f''\neq0$ sempre).

![Figura 32: Gràfica de $f(x)=\dfrac{x^2}{x-1}$ amb l’asímptota vertical $x=1$ (vermell) i l’obliqua $y=x+1$ (blau).](figs/m03_f32.png)

### 5.3. Exemple 3 — Amb exponencial: $f(x)=x\,e^{-x}$

- **Domini:** $\mathbb{R}$. **Talls:** $f(0)=0$ i $x\,e^{-x}=0\Rightarrow x=0$.
- **Límits:** $\displaystyle\lim_{x\to+\infty}xe^{-x}=0$ (l’exponencial guanya): asímptota horitzontal $y=0$. Per a $x\to-\infty$, $f\to-\infty$ sense asímptota.
- **Monotonia:** $f'(x)=e^{-x}(1-x)$, s’anul·la en $x=1$. Creix per a $x<1$ i decreix per a $x>1$: màxim en $\left(1,\,\dfrac1e\right)$.
- **Curvatura:** $f''(x)=e^{-x}(x-2)$: còncava per a $x<2$, convexa per a $x>2$. Inflexió en $\left(2,\,\dfrac{2}{e^2}\right)$.

![Figura 33: Gràfica de $f(x)=x\,e^{-x}$: màxim en $x=1$, inflexió en $x=2$ i asímptota horitzontal $y=0$ cap a $+\infty$.](figs/m03_f33.png)

## 6. Complement: esquema per a l’estudi complet d’una funció

Per representar una funció $y=f(x)$ s’aconsella seguir sempre aquest ordre:

1. **Domini** i, si cal, recorregut.
2. **Simetries:** parella ($f(-x)=f(x)$), imparella ($f(-x)=-f(x)$) i periodicitat.
3. **Punts de tall** amb els eixos: $f(0)$ i les solucions de $f(x)=0$.
4. **Asímptotes:** verticals (en els punts on el límit és infinit), horitzontals i obliqües.
5. **Primera derivada:** signe de $f'$, intervals de creixement i decreixement, extrems relatius.
6. **Segona derivada:** signe de $f''$, intervals de concavitat i punts d’inflexió.
7. **Taula resum** amb tots els punts notables i **gràfica** final.

## 7. Complement: més problemes d’optimització

**Exemple 4 — Punt d’una corba més proper a un punt donat.** Trobem el punt de la paràbola $y=x^2$ més proper a $A=\bigl(0,\tfrac32\bigr)$. Es minimitza el quadrat de la distància (el mateix punt minimitza la distància i s’evita l’arrel):
$$d^2(x)=x^2+\Bigl(x^2-\frac32\Bigr)^2=x^4-2x^2+\frac94.$$
Aleshores $(d^2)'=4x^3-4x=4x(x-1)(x+1)=0\Rightarrow x=0,\pm1$. Com que $d^2(0)=\tfrac94$ i $d^2(\pm1)=\tfrac54$, els mínims són els punts $(\pm1,1)$, a distància $d=\dfrac{\sqrt5}{2}\approx1{,}12$. ($x=0$ és un màxim relatiu.)

**Exemple 5 — Plantilla amb talls.** Per construir la caixa de l’exemple 2 es retallen quadrats de costat $x$ a les quatre cantonades de la làmina de 12 cm. La figura mostra la plantilla i la caixa resultant.

![Figura 0: Plantilla de la caixa: es retallen quatre quadrats de costat $x$ i es pleguen els laterals. Base $(12-2x)\times(12-2x)$ i alçada $x$.](figs/x03_box_net.png)

**Exemple 6 — Rectangle inscrit en una semicircumferència.** Quin és el rectangle d’àrea màxima inscrit en una semicircumferència de radi $R$? Si el vèrtex és $(x,\sqrt{R^2-x^2})$, l’àrea és $A(x)=2x\sqrt{R^2-x^2}$. Derivant, $A'(x)=\dfrac{2(R^2-2x^2)}{\sqrt{R^2-x^2}}=0\Rightarrow x=\dfrac{R}{\sqrt2}$. Les dimensions són $R\sqrt2\times\dfrac{R}{\sqrt2}$ i l’àrea màxima val $R^2$.

## 8. Complement: un altre estudi de funció — $f(x)=\dfrac{\ln x}{x}$

- **Domini:** $(0,+\infty)$. No té simetria.
- **Talls:** amb $OX$ en $\ln x=0\Rightarrow x=1$, punt $(1,0)$. No talla $OY$.
- **Asímptotes:** $\displaystyle\lim_{x\to0^{+}}\frac{\ln x}{x}=-\infty$: vertical $x=0$. $\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x}=0$ (Hôpital): horitzontal $y=0$ (per la dreta).
- **Primera derivada:** $f'(x)=\dfrac{1-\ln x}{x^2}$. S’anul·la en $x=e$; $f'>0$ si $x<e$ i $f'<0$ si $x>e$. Màxim relatiu (i absolut) en $\bigl(e,\tfrac1e\bigr)\approx(2{,}72;\,0{,}37)$.
- **Segona derivada:** $f''(x)=\dfrac{2\ln x-3}{x^3}$. S’anul·la en $x=e^{3/2}\approx4{,}48$: $f''<0$ abans (convexa $\cap$) i $f''>0$ després (còncava $\cup$). Inflexió en $\bigl(e^{3/2},\tfrac32e^{-3/2}\bigr)\approx(4{,}48;\,0{,}33)$.

| $x$ | $(0,e)$ | $e$ | $(e,e^{3/2})$ | $e^{3/2}$ | $(e^{3/2},\infty)$ |
|---|---|---|---|---|---|
| $f'$ | $+$ | $0$ | $-$ | $-$ | $-$ |
| $f''$ | $-$ | $-$ | $-$ | $0$ | $+$ |
| $f$ | creix, $\cap$ | màxim | decreix, $\cap$ | inflexió | decreix, $\cup$ |

*Taula: estudi dels signes de $f'$ i $f''$ per a $f(x)=\ln x/x$.*


## 1. Primitiva d’una funció

> **Definició:** La funció $F(x)$ és una **primitiva** de la funció $f(x)$ si es verifica $F'(x) = f(x)$.

*Observació:* si $F(x)$ és una primitiva de $f(x)$, llavors $F(x) + C$ (on $C \in \mathbb{R}$ és una constant arbitrària) també ho és. Per tant, cada funció té infinites primitives, totes diferint en una constant.

## 2. Integral indefinida

Recordem la notació de Leibniz per a la derivada:

$$f'(x) = \lim_{\Delta x\to 0}\frac{\Delta f(x)}{\Delta x} = \frac{df(x)}{dx}$$

La operació inversa a la derivació s’anomena **integració**. Si $F'(x) = f(x)$, escrivim:

$$\int f(x)\,dx = F(x) + C$$

El símbol $\int$ s’anomena integral, la funció $f(x)$ és l’**integrand** i $C$ és la **constant d’integració**. L’expressió $\int f(x)\,dx$ s’anomena **integral indefinida** de $f(x)$.

## 3. Primitives immediates

A continuació es presenten les primitives immediates més usuals i les seves versions quasi-immediates (aplicant la regla de la cadena a l’inrevés):

| Immediates | Quasi-immediates (amb funcions) |
|---|---|
| $\displaystyle\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + k$ *(se suma 1 a l’exponent i es divideix pel mateix)* | $\displaystyle\int f^n(x)\,f'(x)\,dx = \dfrac{f^{n+1}(x)}{n+1} + k$ |
| $\displaystyle\int \dfrac{1}{x}\,dx = \ln\lvert x\rvert + k$ | $\displaystyle\int \dfrac{f'(x)}{f(x)}\,dx = \ln\lvert f(x)\rvert + k$ |
| $\displaystyle\int e^x\,dx = e^x + k$ *(es queda igual)* | $\displaystyle\int e^{f(x)}f'(x)\,dx = e^{f(x)} + k$ |
| $\displaystyle\int a^x\,dx = \dfrac{a^x}{\ln a} + k$ | $\displaystyle\int a^{f(x)}f'(x)\,dx = \dfrac{a^{f(x)}}{\ln a} + k$ |
| $\displaystyle\int \sin x\,dx = -\cos x + k$ | $\displaystyle\int \sin(f(x))\,f'(x)\,dx = -\cos(f(x)) + k$ |
| $\displaystyle\int \cos x\,dx = \sin x + k$ | $\displaystyle\int \cos(f(x))\,f'(x)\,dx = \sin(f(x)) + k$ |
| $\displaystyle\int \dfrac{1}{\cos^2 x}\,dx = \int (1+\tan^2 x)\,dx = \tan x + k$ | $\displaystyle\int \dfrac{f'(x)}{\cos^2(f(x))}\,dx = \tan(f(x)) + k$ |
| $\displaystyle\int \dfrac{1}{\sin^2 x}\,dx = \int (1+\cot^2 x)\,dx = -\cot x + k$ | $\displaystyle\int \dfrac{f'(x)}{\sin^2(f(x))}\,dx = -\cot(f(x)) + k$ |
| $\displaystyle\int \dfrac{1}{\sqrt{1-x^2}}\,dx = \arcsin x + k$ | $\displaystyle\int \dfrac{f'(x)}{\sqrt{1-f^2(x)}}\,dx = \arcsin(f(x)) + k$ |
| $\displaystyle\int \dfrac{1}{1+x^2}\,dx = \arctan x + k$ | $\displaystyle\int \dfrac{f'(x)}{1+f^2(x)}\,dx = \arctan(f(x)) + k$ |

## 4. Primitives i operacions amb funcions

> **Propietat (Linealitat de la integral):** La integral és un operador lineal:
>
> - $\displaystyle\int \bigl[f(x) + g(x)\bigr]dx = \int f(x)\,dx + \int g(x)\,dx$
> - $\displaystyle\int k\cdot f(x)\,dx = k\cdot\int f(x)\,dx, \quad k\in\mathbb{R}$

## 5. Integració per parts

La integració per parts és útil quan l’integrand és el producte de dues funcions de diferent naturalesa (per exemple, un polinomi i una exponencial, o un polinomi i un logaritme):

$$\int u\,dv = u\cdot v - \int v\,du$$

que prové de la regla de la derivada d’un producte: $d(u\cdot v) = u\,dv + v\,du$.

*Observació:* per triar $u$ i $dv$, una regla pràctica és la prioritat **LIATE**: **L**ogarítmiques, **I**nverses trigonomètriques, **A**lgebraiques (polinomis), **T**rigonomètriques, **E**xponencials. Es tria com a $u$ la funció que apareix primer a la llista.

## 6. Integració per canvi de variable

El canvi de variable permet simplificar integrals substituint la variable $x$ per una nova variable $t$ mitjançant $x = u(t)$:

$$\frac{dx}{dt} = u'(t) \;\Rightarrow\; dx = u'(t)\,dt$$

$$\int f(x)\,dx = \int f\bigl(u(t)\bigr)\cdot u'(t)\,dt$$

Un cop calculada la integral en termes de $t$, cal desfer el canvi per expressar el resultat en termes de $x$.

## 7. Integració de funcions racionals

Per integrar una funció racional $\dfrac{P(x)}{Q(x)}$, es procedeix de la manera següent:

1. Si el grau de $P$ és $\ge$ el grau de $Q$, es divideix i s’obté:

   $$\int \frac{P(x)}{Q(x)}\,dx = \int c(x)\,dx + \int \frac{R(x)}{Q(x)}\,dx$$

   on $c(x)$ és el quocient (un polinomi) i $R(x)$ és el residu de la divisió, amb $\operatorname{gr}(R) < \operatorname{gr}(Q)$.
2. La fracció pròpia $\dfrac{R(x)}{Q(x)}$ es descompon en fraccions parcials segons les arrels de $Q(x)$.
3. Cada fracció parcial s’integra de manera immediata.


## 8. Complement: com triar el mètode d’integració

Davant d’una integral, primer s’intenta **simplificar** (expandir potències, dividir, usar identitats) i després es tria la tècnica segons la forma de l’integrand:

| Forma de l’integrand | Tècnica |
|---|---|
| Ja és una derivada coneguda, o $\dfrac{f'}{f}$, o $f'\cdot f^n$ | Primitiva immediata o quasi-immediata |
| Producte d’un polinomi per $e^x$, $\sin x$ o $\cos x$; o bé $\ln x$, $\arctan x$ | Integració **per parts** |
| Conté una arrel o una exponencial i es pot substituir una expressió per $t$ | **Canvi de variable** |
| Quocient de polinomis | **Fraccions simples** (si el grau del numerador és $\ge$ el del denominador, dividir primer) |
| $\sin^2x$, $\cos^2x$ | Identitats $\sin^2x=\dfrac{1-\cos2x}{2}$, $\cos^2x=\dfrac{1+\cos2x}{2}$ |

### 8.1. Integració per parts: regla pràctica

$$\int u\,dv = u\,v - \int v\,du$$

Per triar $u$ es pot seguir l’ordre **ALPES**: *Arc* (arcsin, arctan), *Logaritme*, *Polinomi*, *Exponencial*, *Sinus/cosinus*. La funció que apareix **abans** a la llista es pren com a $u$ (es deriva) i l’altra com a $dv$ (es integra).

**Exemple 1.** $\displaystyle\int x\,e^x\,dx$: $u=x,\ dv=e^xdx \Rightarrow du=dx,\ v=e^x$.

$$\int x e^x dx = x e^x - \int e^x dx = (x-1)\,e^x + C$$

**Exemple 2.** $\displaystyle\int \ln x\,dx$: $u=\ln x,\ dv=dx \Rightarrow du=\dfrac{dx}{x},\ v=x$.

$$\int \ln x\,dx = x\ln x - \int dx = x\ln x - x + C$$

**Exemple 3.** $\displaystyle\int x^2 e^x\,dx$: cal aplicar parts **dues vegades**.

$$\int x^2e^xdx = x^2e^x - 2\int xe^xdx = x^2e^x - 2(x-1)e^x + C = (x^2-2x+2)\,e^x + C$$

**Exemple 4 (cíclica).** $I=\displaystyle\int e^x\cos x\,dx$. Aplicant parts dues vegades reapareix $I$:

$$I = e^x\cos x + \int e^x\sin x\,dx = e^x\cos x + e^x\sin x - I \;\Rightarrow\; I=\frac{e^x(\sin x+\cos x)}{2}+C$$

### 8.2. Canvi de variable

**Exemple 5.** $\displaystyle\int\frac{dx}{1+\sqrt x}$. Es pren $t=\sqrt x$, és a dir, $x=t^2$ i $dx=2t\,dt$:

$$\int\frac{2t}{1+t}\,dt=2\int\left(1-\frac{1}{1+t}\right)dt=2t-2\ln|1+t|+C=2\sqrt x-2\ln\left(1+\sqrt x\right)+C$$

**Exemple 6 (quasi-immediata).** $\displaystyle\int\cos x\,\sin^2x\,dx$: com que $(\sin x)'=\cos x$, és de la forma $\int f'f^2$:

$$\int\cos x\,\sin^2x\,dx=\frac{\sin^3x}{3}+C$$

**Exemple 7.** $\displaystyle\int\frac{2x}{x^2+1}\,dx$ és de la forma $\int\frac{f'}{f}$:

$$\int\frac{2x}{x^2+1}\,dx=\ln\left(x^2+1\right)+C$$

### 8.3. Fraccions simples

**Exemple 8.** $\displaystyle\int\frac{3x+5}{(x-1)(x+3)}\,dx$. Es descompon:

$$\frac{3x+5}{(x-1)(x+3)}=\frac{A}{x-1}+\frac{B}{x+3}\;\Rightarrow\;3x+5=A(x+3)+B(x-1)$$

Per a $x=1$: $8=4A\Rightarrow A=2$. Per a $x=-3$: $-4=-4B\Rightarrow B=1$. Llavors

$$\int\frac{3x+5}{(x-1)(x+3)}\,dx=2\ln|x-1|+\ln|x+3|+C$$

**Exemple 9.** $\displaystyle\int\frac{dx}{x^2-1}=\frac12\ln\left|\frac{x-1}{x+1}\right|+C$ (descomponent $\dfrac{1}{x^2-1}=\dfrac12\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$).

### 8.4. Identitats trigonomètriques

$$\int\sin^2x\,dx=\frac x2-\frac{\sin2x}{4}+C,\qquad \int\cos^2x\,dx=\frac x2+\frac{\sin2x}{4}+C$$

*Comprovació:* sempre es pot verificar una primitiva **derivant el resultat**: ha de donar l’integrand.

## 9. Complement: família de primitives i problemes de valor inicial

Si $F(x)$ és una primitiva de $f(x)$, totes les altres són $F(x)+C$: **corbes paral·leles per translació vertical**, amb la mateixa pendent en cada valor de $x$.

![Figura 0: Les primitives de $f(x)=2x$ són les paràboles $F(x)=x^2+C$: totes tenen el mateix pendent per a cada $x$ i només difereixen en una translació vertical.](figs/x04_primitives_family.png)

Per triar una primitiva concreta cal una condició addicional (**problema de valor inicial**).

**Exemple.** Trobem la primitiva de $f(x)=2x+3$ que passa pel punt $(1,5)$. Una primitiva qualsevol és $F(x)=x^2+3x+C$. La condició $F(1)=5$ dona $1+3+C=5\Rightarrow C=1$, per tant $F(x)=x^2+3x+1$.

**Exemple (mecànica).** Si l’acceleració és $a(t)=6t$ m/s$^2$, $v(0)=2$ m/s i $s(0)=1$ m: $v(t)=3t^2+2$ i $s(t)=t^3+2t+1$.

## 10. Complement: integrals trigonomètriques

Per integrar potències de sinus i cosinus s’usen les identitats
$$\sin^2x=\frac{1-\cos2x}{2},\qquad\cos^2x=\frac{1+\cos2x}{2},\qquad\sin x\cos x=\frac{\sin2x}{2}.$$

- $\displaystyle\int\sin^2x\,dx=\frac x2-\frac{\sin2x}{4}+C$ i $\displaystyle\int\cos^2x\,dx=\frac x2+\frac{\sin2x}{4}+C$.
- **Potència senar:** si una de les potències és senar, se separa un factor i es fa el canvi $t=\cos x$ o $t=\sin x$. Per exemple,
$$\int\sin^3x\,dx=\int(1-\cos^2x)\sin x\,dx\overset{t=\cos x}{=}-\int(1-t^2)\,dt=-\cos x+\frac{\cos^3x}{3}+C.$$
- $\displaystyle\int\sin x\cos x\,dx=\frac{\sin^2x}{2}+C$ (quasi-immediata).
- $\displaystyle\int\tan x\,dx=-\ln|\cos x|+C$ i $\displaystyle\int\frac{1}{\cos^2x}\,dx=\tan x+C$.

## 11. Complement: integrals quasi-immediates resoltes

Es reconeix la derivada de la funció interior $u$ i s’aplica la taula.

a) $\displaystyle\int x\,e^{x^2}dx=\frac12\int e^{x^2}\,2x\,dx=\frac12e^{x^2}+C$.

b) $\displaystyle\int\frac{2x+1}{x^2+x+3}\,dx=\ln(x^2+x+3)+C$ (el numerador és la derivada del denominador).

c) $\displaystyle\int\cos(3x)\,dx=\frac{\sin(3x)}{3}+C$.

d) $\displaystyle\int\frac{dx}{x\ln x}=\ln|\ln x|+C$ (amb $u=\ln x$).

e) $\displaystyle\int\frac{e^{x}}{1+e^{2x}}\,dx=\arctan(e^{x})+C$ (amb $u=e^{x}$).

f) $\displaystyle\int\frac{x}{\sqrt{1-x^2}}\,dx=-\sqrt{1-x^2}+C$.

g) $\displaystyle\int\frac{1}{x^2+4}\,dx=\frac12\arctan\frac x2+C$.

*Comprovació:* qualsevol primitiva es pot verificar derivant. Per a (b): $\bigl[\ln(x^2+x+3)\bigr]'=\dfrac{2x+1}{x^2+x+3}$.


## 1. La integral definida

> **Definició:** Donada una funció $f(x)$ contínua en un interval tancat $[a, b]$, s’anomena **integral definida** de $f(x)$ entre $a$ i $b$ el nombre
>
> $$I = \int_a^b f(x)\,dx$$
>
> on $a$ és el límit inferior i $b$ és el límit superior d’integració.

Geomètricament, si $f(x) \ge 0$ a $[a, b]$, la integral definida representa l’àrea de la regió compresa entre la corba $y = f(x)$, l’eix $OX$ i les rectes verticals $x = a$ i $x = b$:

![Figura 12: L’àrea $S$ sota la corba $f(x)$ entre $x = a$ i $x = b$ és igual a $\int_a^b f(x)\,dx$.](figs/m05_f12.png)

## 2. La fórmula de Barrow. El càlcul integral

> **Propietat (Fórmula de Barrow):** Si $F(x)$ és una primitiva de $f(x)$ a $[a, b]$, aleshores
>
> $$\int_a^b f(x)\,dx = \Bigl[F(x)\Bigr]_a^b = F(b) - F(a)$$

La fórmula de Barrow connecta el càlcul de primitives (integral indefinida) amb el càlcul d’àrees (integral definida), i constitueix el **teorema fonamental del càlcul integral**.

## 3. Càlcul d’àrees

La integral definida és l’eina principal per calcular àrees de regions planes.

### 3.1. Àrea compresa entre la gràfica d’una funció i l’eix OX

Quan la funció talla l’eix $OX$ en punts intermedis $c_1, c_2, \dots$ dins de $[a, b]$, l’àrea total s’expressa com la suma del valor absolut de les integrals en cada subinterval:

$$A = \left\lvert\int_a^{c_1} f(x)\,dx\right\rvert + \left\lvert\int_{c_1}^{c_2} f(x)\,dx\right\rvert + \left\lvert\int_{c_2}^{b} f(x)\,dx\right\rvert$$

*Observació:* el valor absolut és necessari perquè la integral resulta negativa quan la funció és per sota de l’eix $OX$. Sense el valor absolut, les àrees positives i negatives es cancel·larien parcialment.

![Figura 13: L’àrea total entre la corba i l’eix $OX$ és la suma dels valors absoluts de cada integral parcial. La zona negativa (funció per sota de l’eix) s’ha de prendre en valor absolut.](figs/m05_f13.png)

### 3.2. Àrea compresa entre les gràfiques de dues funcions

Per calcular l’àrea de la regió compresa entre dues corbes $f(x)$ i $g(x)$ en l’interval $[a, b]$:

1. Es troben els punts d’intersecció resolent $f(x) = g(x)$; aquests donen els límits d’integració.
2. Es calcula la diferència entre la funció superior i la inferior:

   $$A = \int_a^b \bigl[g(x) - f(x)\bigr]\,dx$$

   on $g(x) \ge f(x)$ a tot l’interval $[a, b]$.

![Àrea entre les gràfiques de $f(x)$ i $g(x)$ en $[a, b]$.](figs/m05_f13b.png)

## 4. Complement: propietats de la integral definida

Les propietats següents són vàlides sempre que les funcions siguin integrables als intervals indicats:

| Propietat | Expressió |
|---|---|
| Interval degenerat | $\displaystyle\int_a^a f(x)\,dx = 0$ |
| Inversió dels límits | $\displaystyle\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx$ |
| Linealitat (suma) | $\displaystyle\int_a^b [f(x) + g(x)]\,dx = \int_a^b f(x)\,dx + \int_a^b g(x)\,dx$ |
| Linealitat (escalar) | $\displaystyle\int_a^b k\,f(x)\,dx = k\int_a^b f(x)\,dx, \quad k \in \mathbb{R}$ |
| Additivitat en intervals | $\displaystyle\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx, \quad a < c < b$ |
| Monotonia | Si $f(x) \le g(x)$ a $[a, b]$, llavors $\displaystyle\int_a^b f\,dx \le \int_a^b g\,dx$ |
| Fita de la integral | $\displaystyle\left\lvert\int_a^b f(x)\,dx\right\rvert \le \int_a^b |f(x)|\,dx$ |

![Figura 25: Propietat d’additivitat: $\int_a^b f = \int_a^c f + \int_c^b f$.](figs/m05_f25.png)


## 5. Complement: teorema fonamental del càlcul

> **Teorema fonamental del càlcul:** si $f$ és contínua en $[a, b]$, la funció «àrea acumulada»
>
> $$F(x)=\int_a^x f(t)\,dt$$
>
> és derivable i $F'(x)=f(x)$ per a tot $x\in(a,b)$.

És a dir, **integrar i derivar són operacions inverses**. Si la variable apareix en un límit d’integració que és una funció $u(x)$, s’aplica la regla de la cadena:

$$\frac{d}{dx}\int_a^{u(x)} f(t)\,dt=f\bigl(u(x)\bigr)\cdot u'(x)$$

**Exemple 1.** Si $G(x)=\displaystyle\int_0^{x^2}\sin t\,dt$, llavors $G'(x)=\sin(x^2)\cdot 2x$.

**Exemple 2 (amb límits).** $\displaystyle\lim_{x\to0}\frac{1}{x^2}\int_0^x\sin t\,dt$. És una indeterminació $\frac00$; per Hôpital, el numerador es deriva amb el teorema fonamental:

$$\lim_{x\to0}\frac{\sin x}{2x}=\frac12$$

**Exemple 3 (extrems).** Si $F(x)=\displaystyle\int_0^x (t^2-4)\,dt$, els punts crítics surten de $F'(x)=x^2-4=0$, és a dir, $x=\pm2$, sense calcular la integral.

## 6. Complement: mètode per calcular àrees

### 6.1. Mètode

1. **Fer un esquema** de les gràfiques (encara que sigui aproximat).
2. Trobar els **punts de tall** entre les corbes (o amb l’eix $OX$) resolent $f(x)=g(x)$: són els límits d’integració.
3. Veure **quina funció està per sobre** en cada tram. Si s’alternen, cal dividir en trams.
4. Calcular $\displaystyle S=\int_a^b\bigl(f_{\text{superior}}-f_{\text{inferior}}\bigr)\,dx$ en cada tram i sumar.
5. L’àrea és sempre **positiva**. *Pregunta clàssica:* $\displaystyle\int_0^{2\pi}\sin x\,dx=0$, però l’àrea entre $\sin x$ i l’eix $OX$ en $[0,2\pi]$ és $2\displaystyle\int_0^{\pi}\sin x\,dx=4$.

### 6.2. Exemple 1 — Entre una paràbola i una recta

Àrea limitada per $f(x)=x^2$ i $g(x)=2x$.

- **Punts de tall:** $x^2=2x\Rightarrow x(x-2)=0\Rightarrow x=0,\ x=2$.
- En $(0,2)$, per exemple $x=1$: $g(1)=2>f(1)=1$, així que la recta és la superior.

$$S=\int_0^2\left(2x-x^2\right)dx=\left[x^2-\frac{x^3}{3}\right]_0^2=4-\frac83=\frac43\ \text{u}^2$$

![Figura 35: L’àrea tancada entre $f(x)=x^2$ i $g(x)=2x$ val $\frac43$.](figs/m05_f35.png)

### 6.3. Exemple 2 — Les gràfiques es creuen: $y=x^3$ i $y=x$

- **Talls:** $x^3=x\Rightarrow x(x-1)(x+1)=0\Rightarrow x=-1,\,0,\,1$.
- En $(-1,0)$: $x^3>x$ (per exemple, $x=-0{,}5$: $-0{,}125>-0{,}5$). En $(0,1)$: $x>x^3$.

$$S_1=\int_{-1}^{0}(x^3-x)\,dx=\left[\frac{x^4}{4}-\frac{x^2}{2}\right]_{-1}^{0}=\frac14,\qquad S_2=\int_0^1(x-x^3)\,dx=\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_0^1=\frac14$$

$$S=S_1+S_2=\frac12\ \text{u}^2$$

*Si es calculés $\int_{-1}^{1}(x-x^3)\,dx$ d’un sol cop, donaria $0$ per simetria: per això cal dividir en trams.*

![Figura 36: Àrea entre $y=x^3$ i $y=x$: dos trams iguals, $S_1$ i $S_2$, amb la funció superior diferent en cada un.](figs/m05_f36.png)


## 7. Complement: demostracions del teorema fonamental i de la regla de Barrow

### 7.1. Teorema fonamental del càlcul

> **Teorema:** si $f$ és contínua en $[a,b]$, la funció $F(x)=\displaystyle\int_a^x f(t)\,dt$ és derivable i $F'(x)=f(x)$.

*Demostració.* Per a $h>0$ petit, per la propietat d’additivitat de la integral,

$$\frac{F(x+h)-F(x)}{h}=\frac1h\int_x^{x+h}f(t)\,dt$$

Com que $f$ és contínua en $[x,x+h]$, per Weierstrass té un mínim $m_h$ i un màxim $M_h$ en aquest interval, i l’àrea es pot acotar:

$$m_h\le\frac1h\int_x^{x+h}f(t)\,dt\le M_h$$

Quan $h\to0$, per continuïtat, $m_h\to f(x)$ i $M_h\to f(x)$. Pel teorema de l’entrepà, el quocient tendeix a $f(x)$, és a dir, $F'(x)=f(x)$. (Per a $h<0$ es fa igual.) $\blacksquare$

### 7.2. Regla de Barrow

> **Regla de Barrow:** si $f$ és contínua en $[a,b]$ i $G$ és una primitiva qualsevol de $f$, llavors
>
> $$\int_a^b f(x)\,dx=G(b)-G(a)$$

*Demostració.* Siguin $F(x)=\int_a^x f$ i $G$ una primitiva. Com que $F'=f=G'$, la funció $F-G$ té derivada zero en tot l’interval i, per la conseqüència del teorema del valor mitjà, és constant: $F(x)=G(x)+C$.

Com que $F(a)=0$, resulta $C=-G(a)$. Llavors

$$\int_a^b f(x)\,dx=F(b)=G(b)-G(a).\ \blacksquare$$

**Per què importa:** és el que permet calcular àrees amb primitives sense haver de fer límits de sumes de Riemann.

## 8. Complement: sumes de Riemann i definició de la integral definida

Per definir l’àrea sota una corba es divideix $[a,b]$ en $n$ subintervals i s’aproxima amb rectangles. La **suma inferior** $s_n$ usa el mínim de $f$ en cada subinterval i la **suma superior** $S_n$ el màxim.

![Figura 0: Sumes de Riemann de $f$ en $[a,b]$ amb $n=6$ subintervals: la suma inferior $s_n$ (esquerra) i la superior $S_n$ (dreta) emmarquen l’àrea.](figs/x05_riemann.png)

> **Definició:** Si $f$ és contínua en $[a,b]$, les sumes inferiors i superiors tenen el mateix límit quan $n\to\infty$, i aquest límit és la **integral definida**:
>
> $$\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^{n}f(x_i)\,\Delta x,\qquad\Delta x=\frac{b-a}{n}.$$

**Exemple.** Calculem $\displaystyle\int_0^1x^2dx$ pel límit de sumes. Amb $x_i=\dfrac in$ i $\Delta x=\dfrac1n$,
$$\sum_{i=1}^{n}\frac{i^2}{n^2}\cdot\frac1n=\frac{1}{n^3}\cdot\frac{n(n+1)(2n+1)}{6}\xrightarrow[n\to\infty]{}\frac13.$$
El mateix resultat s’obté amb Barrow: $\left[\dfrac{x^3}{3}\right]_0^1=\dfrac13$.

## 9. Complement: teorema del valor mitjà del càlcul integral

> **Teorema (del valor mitjà del càlcul integral):** Si $f$ és contínua en $[a,b]$, existeix almenys un punt $c\in[a,b]$ tal que
>
> $$\int_a^b f(x)\,dx=f(c)\,(b-a).$$

El nombre $f(c)=\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$ s’anomena **valor mitjà** de $f$ en $[a,b]$: l’alçada d’un rectangle de base $b-a$ amb la mateixa àrea que la regió sota la corba.

![Figura 0: Teorema del valor mitjà del càlcul integral: l’àrea sota $f$ coincideix amb la del rectangle d’alçada $f(c)$ i base $b-a$.](figs/x05_mean_value.png)

*Demostració.* Per Weierstrass, $f$ té mínim $m$ i màxim $M$ en $[a,b]$. Aleshores $m(b-a)\le\int_a^bf\le M(b-a)$, així que $\frac1{b-a}\int_a^bf$ és un valor entre $m$ i $M$; pel teorema dels valors intermedis, $f$ el pren en algun punt $c$. $\blacksquare$

**Exemple.** Per a $f(x)=x^2$ en $[0,3]$: $\int_0^3x^2dx=9$, el valor mitjà és $\dfrac93=3$ i s’assoleix en $c=\sqrt3\approx1{,}73$.

## 10. Complement: volum d’un cos de revolució

Si la regió sota $y=f(x)$ entre $x=a$ i $x=b$ gira al voltant de l’eix $OX$, es genera un cos de revolució. Cada secció perpendicular a l’eix és un cercle de radi $f(x)$, amb àrea $\pi f(x)^2$; sumant-les s’obté

$$V=\pi\int_a^b\bigl[f(x)\bigr]^2dx.$$

![Figura 0: Cos de revolució generat en girar $y=f(x)$ al voltant de l’eix $OX$: cada secció és un cercle de radi $f(x)$.](figs/x05_revolution.png)

**Exemples.**

a) *Con:* $y=x$ entre $0$ i $3$. $V=\pi\displaystyle\int_0^3x^2dx=\pi\cdot9=9\pi$ (coincideix amb $\frac13\pi r^2h$ per a $r=h=3$).

b) *Paraboloide:* $y=\sqrt x$ entre $0$ i $4$. $V=\pi\displaystyle\int_0^4x\,dx=\pi\cdot8=8\pi$.

c) *Esfera:* $y=\sqrt{r^2-x^2}$ entre $-r$ i $r$. $V=\pi\displaystyle\int_{-r}^{r}(r^2-x^2)\,dx=\pi\Bigl(2r^3-\dfrac{2r^3}{3}\Bigr)=\dfrac43\pi r^3$.

## 11. Complement: més exemples d’àrees

**Exemple 1.** Àrea compresa entre $y=\sin x$ i l’eix $OX$ en $[0,2\pi]$. La funció canvia de signe en $x=\pi$, així que
$$A=\int_0^{\pi}\sin x\,dx+\Bigl|\int_\pi^{2\pi}\sin x\,dx\Bigr|=2+|-2|=4.$$
(La integral sense separar donaria $0$: les àrees positiva i negativa es compensarien.)

**Exemple 2.** Àrea entre $y=\sin x$ i $y=\cos x$ entre dues interseccions consecutives, $x=\frac\pi4$ i $x=\frac{5\pi}4$. En aquest interval $\sin x\ge\cos x$, per tant
$$A=\int_{\pi/4}^{5\pi/4}(\sin x-\cos x)\,dx=\bigl[-\cos x-\sin x\bigr]_{\pi/4}^{5\pi/4}=\sqrt2+\sqrt2=2\sqrt2.$$

**Exemple 3.** Àrea compresa entre $y=x^2$ i la recta $y=x+2$. Interseccions: $x^2=x+2\Rightarrow x=-1,\,2$. A $[-1,2]$ la recta està per sobre:
$$A=\int_{-1}^{2}(x+2-x^2)\,dx=\Bigl[\frac{x^2}{2}+2x-\frac{x^3}{3}\Bigr]_{-1}^{2}=\frac{9}{2}.$$


## 1. Localització dels punts a l’espai

Per localitzar punts a l’espai tridimensional s’utilitza un **sistema de referència cartesià** format per tres rectes perpendiculars entre si que s’anomenen **eixos de coordenades**, designats per $x$, $y$ i $z$. Qualsevol punt de l’espai queda determinat per tres coordenades $(x, y, z)$.

![Figura 14: Sistema de coordenades cartesianes a l’espai: qualsevol punt $P$ queda determinat per la terna $(x, y, z)$.](figs/m06_f14.png)

## 2. Components d’un vector a l’espai

> **Definició:** Els **components** d’un vector s’obtenen restant ordenadament les coordenades del seu extrem menys les del seu origen. Donats els punts $A(a_1, a_2, a_3)$ i $B(b_1, b_2, b_3)$, el vector $\overrightarrow{AB}$ té components:
>
> $$\overrightarrow{AB} = (b_1 - a_1,\; b_2 - a_2,\; b_3 - a_3)$$

Per definir un vector calen tres elements: **direcció**, **sentit** i **magnitud** (mòdul).

Si el vector $\overrightarrow{AB}$ té la mateixa longitud, direcció i sentit que un altre vector $\overrightarrow{CD}$, es tracta de dos vectors **equipol·lents**. El conjunt de tots els vectors fixos equipol·lents s’anomena **vector lliure**.

### 2.1. Mòdul d’un vector

El mòdul d’un vector $\vec v = (v_1, v_2, v_3)$ és la seva longitud:

$$|\vec v| = \sqrt{v_1^2 + v_2^2 + v_3^2}$$

### 2.2. Vector unitari

El vector unitari en la direcció de $\vec v$ és aquell de mòdul 1:

$$\hat u_v = \frac{\vec v}{|\vec v|}$$

## 3. Operacions amb vectors

### 3.1. Suma de vectors

Donats $\vec a = (a_1, a_2, a_3)$ i $\vec b = (b_1, b_2, b_3)$, el seu vector suma és:

$$\vec a + \vec b = (a_1 + b_1,\; a_2 + b_2,\; a_3 + b_3)$$

La suma de vectors compleix les propietats següents:

- **Commutativa:** $\vec a + \vec b = \vec b + \vec a$
- **Associativa:** $\vec a + (\vec b + \vec c) = (\vec a + \vec b) + \vec c$
- **Element neutre:** el vector nul $\vec 0 = (0, 0, 0)$ compleix $\vec a + \vec 0 = \vec a$
- **Element simètric:** cada vector $\vec a$ té un oposat $-\vec a$ tal que $\vec a + (-\vec a) = \vec 0$

### 3.2. Multiplicació d’un vector per un escalar

Donat $k \in \mathbb{R}$ i $\vec a = (a_1, a_2, a_3)$:

$$k\cdot\vec a = (k a_1,\; k a_2,\; k a_3)$$

Propietats:

- $k\cdot(\vec a + \vec b) = k\vec a + k\vec b$
- $1\cdot\vec a = \vec a$
- $(k + h)\cdot\vec a = k\vec a + h\vec a$
- $(k\cdot h)\cdot\vec a = k\,(h\cdot\vec a)$

## 4. Combinació lineal de vectors

> **Definició:** Donat un conjunt de vectors $\vec v_1, \vec v_2, \vec v_3$ d’un espai vectorial, s’anomena **combinació lineal** d’aquests vectors tota expressió de la forma
>
> $$\lambda_1\vec v_1 + \lambda_2\vec v_2 + \lambda_3\vec v_3 + \cdots$$
>
> on $\lambda_1, \lambda_2, \lambda_3, \ldots \in \mathbb{R}$.

Un vector $\vec v$ és combinació lineal de $\vec v_1, \vec v_2, \vec v_3$ si existeixen $\lambda_1, \lambda_2, \lambda_3$ que verifiquen l’expressió anterior.

## 5. Dependència i independència lineal de vectors

Els vectors $\vec v_1, \vec v_2, \vec v_3$ són **linealment independents** si l’única solució de

$$\lambda_1\vec v_1 + \lambda_2\vec v_2 + \lambda_3\vec v_3 = \vec 0$$

és $\lambda_1 = \lambda_2 = \lambda_3 = 0$. En cas contrari, és a dir, si existeix alguna solució amb algun $\lambda_i \neq 0$, els vectors són **linealment dependents** (un d’ells és combinació lineal dels altres).

## 6. Producte escalar de dos vectors

> **Definició:** El **producte escalar** de dos vectors $\vec a$ i $\vec b$ és el nombre real
>
> $$\vec a\cdot\vec b = |\vec a|\,|\vec b|\cos\alpha$$
>
> on $\alpha$ és l’angle que formen els dos vectors. En components, si $\vec a = (a_1, a_2, a_3)$ i $\vec b = (b_1, b_2, b_3)$:
>
> $$\vec a\cdot\vec b = a_1b_1 + a_2b_2 + a_3b_3$$

### 6.1. Propietats geomètriques del producte escalar

La figura següent il·lustra les tres situacions principals:

![Figura 15: Interpretació geomètrica del producte escalar: perpendiculars ($\alpha = 90^\circ$), paral·lels mateix sentit ($\alpha = 0^\circ$) i paral·lels sentit contrari ($\alpha = 180^\circ$).](figs/m06_f15.png)

Les propietats geomètriques principals del producte escalar són:

1. **Angle entre dos vectors:**

   $$\cos\alpha = \frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|} \;\Rightarrow\; \alpha = \arccos\!\left(\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}\right)$$

2. **Vectors perpendiculars o ortogonals:** $\vec a \perp \vec b$ si i només si $\vec a\cdot\vec b = 0$.

## 7. Complement: bases i coordenades

Tres vectors $\vec u,\vec v,\vec w$ no coplanaris (linealment independents) formen una **base** de l’espai: tot vector s’escriu de manera única com $\vec x=a\vec u+b\vec v+c\vec w$, i $(a,b,c)$ són les seves **coordenades** en aquesta base.

La **base canònica** és $\{\vec\imath,\vec\jmath,\vec k\}$ amb $\vec\imath=(1,0,0)$, $\vec\jmath=(0,1,0)$, $\vec k=(0,0,1)$: és una base **ortonormal** (vectors unitaris i perpendiculars dos a dos).

![Figura 0: Sistema de coordenades i base canònica $\{\vec\imath,\vec\jmath,\vec k\}$; el punt $P(x,y,z)$ té vector de posició $\overrightarrow{OP}=x\vec\imath+y\vec\jmath+z\vec k$.](figs/x06_basis.png)

**Comprovar si tres vectors són base:** n’hi ha prou que el determinant que formen sigui no nul. Per exemple, $\vec u=(1,0,1)$, $\vec v=(0,1,1)$, $\vec w=(1,1,0)$ donen $\begin{vmatrix}1&0&1\\0&1&1\\1&1&0\end{vmatrix}=-2\neq0$: formen una base.

## 8. Complement: projecció ortogonal i angle entre vectors

Dos vectors $\vec u,\vec v$ formen l’angle $\alpha$ amb
$$\cos\alpha=\frac{\vec u\cdot\vec v}{|\vec u|\,|\vec v|},\qquad 0\le\alpha\le\pi.$$

> **Definició:** La **projecció ortogonal** de $\vec u$ sobre $\vec v$ és el vector
>
> $$\operatorname{proj}_{\vec v}\vec u=\frac{\vec u\cdot\vec v}{|\vec v|^{2}}\;\vec v,$$
>
> de mòdul $|\vec u|\,|\cos\alpha|$. El vector $\vec u-\operatorname{proj}_{\vec v}\vec u$ és perpendicular a $\vec v$.

![Figura 0: Projecció ortogonal de $\vec u$ sobre $\vec v$ i component perpendicular.](figs/x06_projection.png)

**Exemple.** Siguin $\vec u=(1,2,2)$ i $\vec v=(2,1,2)$. Aleshores $\vec u\cdot\vec v=2+2+4=8$ i $|\vec u|=|\vec v|=3$. L’angle compleix $\cos\alpha=\dfrac{8}{9}$, és a dir, $\alpha\approx27{,}3^{\circ}$, i
$$\operatorname{proj}_{\vec v}\vec u=\frac{8}{9}(2,1,2)=\Bigl(\frac{16}{9},\frac89,\frac{16}{9}\Bigr).$$

**Desigualtat de Cauchy–Schwarz:** $|\vec u\cdot\vec v|\le|\vec u|\,|\vec v|$ (només hi ha igualtat si són paral·lels), conseqüència directa de $|\cos\alpha|\le1$.

## 9. Complement: punt mitjà, baricentre i problemes amb vectors

- **Vector entre dos punts:** $\overrightarrow{AB}=B-A$. Per a $A(1,2,3)$ i $B(3,-1,5)$: $\overrightarrow{AB}=(2,-3,2)$ i $|\overrightarrow{AB}|=\sqrt{17}$.
- **Punt mitjà** del segment $AB$: $M=\dfrac{A+B}{2}$. En l’exemple anterior, $M=\bigl(2,\tfrac12,4\bigr)$.
- **Baricentre** d’un triangle $ABC$: $G=\dfrac{A+B+C}{3}$ (punt de tall de les medianes).
- **Punts alineats:** $A,B,C$ són alineats si $\overrightarrow{AB}$ i $\overrightarrow{AC}$ són proporcionals (rang $1$).
- **Quart vèrtex d’un paral·lelogram:** si $ABCD$ és un paral·lelogram, $\overrightarrow{AB}=\overrightarrow{DC}$, de manera que $D=A+C-B$. Per a $A(1,0,0)$, $B(2,1,0)$ i $C(3,3,1)$, $D=(2,2,1)$.
- **Divisió d’un segment en una raó:** el punt $P$ de $AB$ amb $\overrightarrow{AP}=\lambda\,\overrightarrow{AB}$ és $P=A+\lambda(B-A)$; per a $\lambda=\tfrac13$ es troba el primer tercer del segment.

**Exemple.** Perquè $\vec u=(1,m,2)$ i $\vec v=(2,1,-1)$ siguin perpendiculars cal $\vec u\cdot\vec v=2+m-2=m=0$. Per a $m=0$ el producte escalar s’anul·la i, per tant, $\vec u\perp\vec v$.


## 1. Tipus de matrius

> **Definició:** Una **matriu** d’ordre $(m, n)$ és un conjunt de nombres reals disposats en $m$ files i $n$ columnes. Cada nombre rep el nom d’**element**:
>
> $$A = \begin{pmatrix} a_{11} & a_{12} & a_{13} & \cdots & a_{1n} \\ a_{21} & a_{22} & a_{23} & \cdots & a_{2n} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & a_{m3} & \cdots & a_{mn} \end{pmatrix}$$

Els dos subíndexs de cada element $a_{ij}$ indiquen la seva posició: $i$ és la fila i $j$ la columna. Notació alternativa: $A = (a_{ij})$ amb $i = 1, \ldots, m$ i $j = 1, \ldots, n$.

Els tipus principals de matrius són:

- **Matriu oposada** $(-A)$: s’obté canviant cada element pel seu oposat.
- **Matriu transposada** $(A^t)$: resulta d’intercanviar files per columnes.
- **Matriu identitat** $(I)$: matriu quadrada amb $a_{ij} = 1$ si $i = j$ i $a_{ij} = 0$ si $i \neq j$:

$$I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$$

- **Matriu nul·la:** tots els elements són $0$.

## 2. Operacions amb matrius

### 2.1. Suma de matrius del mateix ordre

Donades $A = (a_{ij})$ i $B = (b_{ij})$ del mateix ordre $(m, n)$:

$$A + B = (a_{ij} + b_{ij})$$

Es sumen els elements que ocupen la mateixa posició.

### 2.2. Producte d’un nombre real per una matriu

Donat $k \in \mathbb{R}$ i $A = (a_{ij})$:

$$k\cdot A = (k\,a_{ij})$$

### 2.3. Producte de matrius

Donades $A_{m\times n} = (a_{ij})$ i $B_{n\times p} = (b_{ij})$ (el nombre de columnes de $A$ ha de coincidir amb el de files de $B$), la matriu producte $C = A\cdot B$ és de tipus $m\times p$ amb:

$$c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

*Observació:* en general, el producte de matrius **no és commutatiu**: $A\cdot B \neq B\cdot A$.

### 2.4. Potència d’una matriu quadrada

La potència enèsima d’una matriu quadrada $A$ és:

$$A^n = A^{n-1}\cdot A, \qquad n \in \mathbb{N},\; n \ge 2$$

## 3. Determinants

Els determinants van associats a les matrius quadrades. El determinant de $A$ es simbolitza per $|A|$ o $\det(A)$.

### 3.1. Determinant d’ordre 2

$$|A| = \begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}\cdot a_{22} - a_{12}\cdot a_{21}$$

### 3.2. Determinant d’ordre 3. Regla de Sarrus

$$|A| = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{12}a_{21}a_{33} - a_{11}a_{23}a_{32}$$

La **regla de Sarrus** és un mètode gràfic per recordar aquesta fórmula: s’afegeixen les dues primeres columnes a la dreta de la matriu i s’identifiquen les sis diagonals (tres amb signe $+$ i tres amb signe $-$):

![Figura 16: Regla de Sarrus: les tres diagonals descendents donen termes positius; les tres diagonals ascendents (en les columnes repetides), termes negatius.](figs/m07_f16.png)

## 4. Adjunts d’una matriu quadrada

D’una matriu qualsevol es poden extreure submatrius quadrades. Els determinants d’aquestes submatrius s’anomenen **menors** d’ordre $k$.

> **Definició:** El **menor complementari** $M_{ij}$ és el determinant que resulta de suprimir la fila $i$ i la columna $j$ d’una matriu quadrada.

L’**adjunt** de l’element $(i, j)$ és:

$$m_{ij} = (-1)^{i+j}\,M_{ij}$$

El signe $(-1)^{i+j}$ segueix el patró escaquer següent:

$$\begin{pmatrix} + & - & + \\ - & + & - \\ + & - & + \end{pmatrix}$$

La **matriu adjunta** de $A$ és $A^* = (m_{ij})$, la matriu formada per tots els adjunts.

## 5. Propietats dels determinants

- Si una línia (fila o columna) és combinació lineal de les altres, el determinant és zero.
- Si dues línies són iguals, el determinant és zero.
- $\det(A) = \det(A^t)$ (el determinant és igual al de la transposada).
- Si s’intercanvien dues línies, el determinant canvia de signe.
- Si es multiplica una línia per $k$, el determinant queda multiplicat per $k$.
- Un determinant amb una línia de zeros és zero.
- $\det(I) = 1$.

## 6. Rang d’una matriu

> **Definició:** El **rang** d’una matriu és l’ordre màxim dels seus menors no nuls, o equivalentment, el nombre màxim de files (o columnes) linealment independents.

Per calcular el rang d’una matriu $A$ de tipus $m\times n$:

1. S’identifica la dimensió màxima possible: $\operatorname{rang}(A) \le \min(m, n)$.
2. Es calcula el determinant de la submatriu quadrada d’ordre màxim:
   - Si $\det \neq 0$: el rang és igual a aquest ordre màxim.
   - Si $\det = 0$: cal analitzar menors d’ordre inferior.
3. Es repeteix el procés reduint l’ordre fins trobar un menor no nul.

## 7. Matriu inversa

> **Definició:** La **matriu inversa** d’una matriu quadrada $A$ és la matriu $A^{-1}$ que verifica
>
> $$A\cdot A^{-1} = A^{-1}\cdot A = I$$

Una matriu que té inversa s’anomena **matriu regular**. Una matriu és regular si i només si $\det(A) \neq 0$.

La matriu inversa es calcula mitjançant la matriu adjunta transposada:

$$A^{-1} = \frac{1}{|A|}\cdot(A^*)^t$$

*Observació:* si $\det(A) = 0$, la matriu és **singular** i no té inversa.


## 8. Complement: potències, equacions matricials i mètode de Gauss-Jordan

### 8.1. Potències d’una matriu: buscar el patró

Per calcular $A^n$ amb $n$ gran no es multiplica $n$ vegades: es calculen $A^2,\,A^3,\dots$ fins veure un **patró** i es demostra per inducció.

**Exemple.** $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$. Llavors $A^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ i $A^3=\begin{pmatrix}1&3\\0&1\end{pmatrix}$, de manera que

$$A^n=\begin{pmatrix}1&n\\0&1\end{pmatrix}$$

*Demostració per inducció:* es compleix per a $n=1$; si és cert per a $n$, $A^{n+1}=A^n\cdot A=\begin{pmatrix}1&n\\0&1\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix}=\begin{pmatrix}1&n+1\\0&1\end{pmatrix}$.

**Exemple (potències periòdiques).** Si $B=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$, llavors $B^2=-I$, $B^3=-B$ i $B^4=I$. Les potències es repeteixen cada $4$: per a calcular $B^{2026}$ n’hi ha prou amb el residu de $2026$ entre $4$ (que és $2$), i per tant $B^{2026}=B^2=-I$.

### 8.2. Equacions matricials

Com que el producte de matrius **no és commutatiu**, cal aïllar $X$ multiplicant per la inversa **pel mateix costat** a tots dos membres:

| Equació | Solució (si les matrius són invertibles) |
|---|---|
| $A\,X=B$ | $X=A^{-1}B$ |
| $X\,A=B$ | $X=B\,A^{-1}$ |
| $A\,X+B=C$ | $X=A^{-1}(C-B)$ |
| $A\,X\,B=C$ | $X=A^{-1}\,C\,B^{-1}$ |
| $A\,X+X=B$ | $(A+I)\,X=B\Rightarrow X=(A+I)^{-1}B$ |

*Atenció:* en $A\,X+X=B$ no es pot treure «factor comú» sense la identitat: $X=I\,X$, per això surt $(A+I)$ i no $(A+1)$.

**Exemple 1.** Resoleu $A\,X=B$ amb $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ i $B=\begin{pmatrix}3&4\\1&2\end{pmatrix}$.

$|A|=1\neq0$ i $A^{-1}=\begin{pmatrix}1&-2\\0&1\end{pmatrix}$. Llavors

$$X=A^{-1}B=\begin{pmatrix}1&-2\\0&1\end{pmatrix}\begin{pmatrix}3&4\\1&2\end{pmatrix}=\begin{pmatrix}1&0\\1&2\end{pmatrix}$$

*Comprovació:* $A\,X=\begin{pmatrix}1+2&0+4\\1&2\end{pmatrix}=B$ ✓.

**Exemple 2.** Resoleu $A\,X+X=B$ amb la mateixa $A$ i $B=\begin{pmatrix}2&4\\2&0\end{pmatrix}$.

$A+I=\begin{pmatrix}2&2\\0&2\end{pmatrix}$, amb $|A+I|=4$ i $(A+I)^{-1}=\dfrac14\begin{pmatrix}2&-2\\0&2\end{pmatrix}$.

$$X=(A+I)^{-1}B=\frac14\begin{pmatrix}2&-2\\0&2\end{pmatrix}\begin{pmatrix}2&4\\2&0\end{pmatrix}=\frac14\begin{pmatrix}0&8\\4&0\end{pmatrix}=\begin{pmatrix}0&2\\1&0\end{pmatrix}$$

**Exemple 3 (amb paràmetre).** Per a quins valors de $m$ té inversa $A=\begin{pmatrix}1&m\\2&3\end{pmatrix}$? Té inversa si i només si $|A|=3-2m\neq0$, és a dir, per a $m\neq\dfrac32$.

### 8.3. Càlcul de la inversa pel mètode de Gauss-Jordan

Alternativa a la fórmula dels adjunts, més còmoda per a matrius $3\times3$. S’escriu $(A\,|\,I)$ i, amb operacions entre files, es transforma $A$ en $I$; la part dreta es converteix en $A^{-1}$.

**Exemple.** $A=\begin{pmatrix}2&1\\5&3\end{pmatrix}$:

$$\left(\begin{array}{cc|cc}2&1&1&0\\5&3&0&1\end{array}\right)\xrightarrow{F_1/2}\left(\begin{array}{cc|cc}1&\frac12&\frac12&0\\5&3&0&1\end{array}\right)\xrightarrow{F_2-5F_1}\left(\begin{array}{cc|cc}1&\frac12&\frac12&0\\0&\frac12&-\frac52&1\end{array}\right)$$

$$\xrightarrow{2F_2}\left(\begin{array}{cc|cc}1&\frac12&\frac12&0\\0&1&-5&2\end{array}\right)\xrightarrow{F_1-\frac12F_2}\left(\begin{array}{cc|cc}1&0&3&-1\\0&1&-5&2\end{array}\right)\;\Rightarrow\;A^{-1}=\begin{pmatrix}3&-1\\-5&2\end{pmatrix}$$

Si en algun moment apareix una fila de zeros a la part esquerra, $A$ **no té inversa**.

## 9. Complement: interpretació geomètrica del determinant

El valor absolut del determinant $2\times2$ és l’**àrea del paral·lelogram** definit per les seves files (o columnes); el del determinant $3\times3$ és el **volum del paral·lelepípede**.

![Figura 0: El determinant de la matriu de columnes $(a,c)$ i $(b,d)$ és l’àrea (amb signe) del paral·lelogram que formen.](figs/x07_det_area.png)

**Exemple.** Els vectors $(3,1)$ i $(1,2)$ determinen un paral·lelogram d’àrea $\left|\begin{matrix}3&1\\1&2\end{matrix}\right|=6-1=5$.

Si $|A|=0$ els vectors són linealment dependents: el paral·lelogram és «pla» (àrea $0$).

## 10. Complement: propietats de la transposada i la inversa

- $(A+B)^{t}=A^{t}+B^{t}$, $(kA)^{t}=kA^{t}$, $(AB)^{t}=B^{t}A^{t}$, $(A^{t})^{t}=A$.
- $(AB)^{-1}=B^{-1}A^{-1}$, $(A^{-1})^{-1}=A$, $(A^{t})^{-1}=(A^{-1})^{t}$.
- $|AB|=|A|\,|B|$, $|A^{t}|=|A|$, $|A^{-1}|=\dfrac1{|A|}$, $|kA|=k^{n}|A|$ si $A$ és d’ordre $n$.
- Una matriu quadrada és **simètrica** si $A^{t}=A$ i **antisimètrica** si $A^{t}=-A$; és **ortogonal** si $A^{-1}=A^{t}$ (aleshores $|A|=\pm1$).
- Una matriu quadrada té inversa si i només si $|A|\neq0$ si i només si $\operatorname{Rg}A=n$.
- En general $AB\neq BA$; tampoc no es compleix $(A+B)^2=A^2+2AB+B^2$, sinó $(A+B)^2=A^2+AB+BA+B^2$.

## 11. Complement: exemples resolts de determinants i inverses

**Exemple 1 — Determinant amb paràmetre.** Per a quins valors de $a$ és invertible $A=\begin{pmatrix}1&1&1\\1&a&1\\1&1&a^2\end{pmatrix}$? Per Sarrus,
$$|A|=a^3+1+1-a-a^2-1=a^3-a^2-a+1=(a-1)^2(a+1).$$
Així, $A$ és invertible si i només si $a\neq1$ i $a\neq-1$.

**Exemple 2 — Inversa per adjunts.** Sigui $B=\begin{pmatrix}1&0&2\\0&1&1\\1&1&0\end{pmatrix}$. Aleshores $|B|=-3\neq0$. Els adjunts són $B_{11}=-1$, $B_{12}=1$, $B_{13}=-1$, $B_{21}=2$, $B_{22}=-2$, $B_{23}=-1$, $B_{31}=-2$, $B_{32}=-1$, $B_{33}=1$. Per tant
$$B^{-1}=\frac{1}{|B|}\bigl(\operatorname{Adj}B\bigr)^{t}=-\frac13\begin{pmatrix}-1&2&-2\\1&-2&-1\\-1&-1&1\end{pmatrix}=\begin{pmatrix}\frac13&-\frac23&\frac23\\-\frac13&\frac23&\frac13\\\frac13&\frac13&-\frac13\end{pmatrix}.$$
Es comprova que $B\,B^{-1}=I$ multiplicant.

**Exemple 3 — Rang amb paràmetre.** $\operatorname{Rg}\begin{pmatrix}1&2&3\\2&4&m\end{pmatrix}$: el menor $\begin{vmatrix}1&2\\2&4\end{vmatrix}=0$; amb la tercera columna, $\begin{vmatrix}1&3\\2&m\end{vmatrix}=m-6$. Si $m=6$, $\operatorname{Rg}=1$; si $m\neq6$, $\operatorname{Rg}=2$.

**Exemple 4 — Potència d’una matriu.** Per a $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$, $A^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}$, $A^3=\begin{pmatrix}1&3\\0&1\end{pmatrix}$ i, per inducció, $A^n=\begin{pmatrix}1&n\\0&1\end{pmatrix}$.


## 1. Sistemes d’equacions lineals

Un **sistema d’equacions lineals** està format per equacions de primer grau en cadascuna de les incògnites, i totes les igualtats s’han de verificar alhora. En forma matricial $A\cdot X = B$:

$$\begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix} = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_m \end{pmatrix}$$

La **matriu ampliada** és $(A \mid B)$, que inclou els termes independents com a columna afegida.

### 1.1. Tipus de sistemes

- **Compatible determinat (S.C.D):** té una única solució.
- **Compatible indeterminat (S.C.I):** té infinites solucions.
- **Incompatible (S.I):** no té solució.

Dos sistemes són **equivalents** si tenen exactament les mateixes solucions.

## 2. El mètode de Gauss

El **mètode de Gauss** consisteix a transformar la matriu ampliada en una forma escalonada mitjançant operacions elementals de files (intercanviar files, multiplicar per un escalar, sumar un múltiple d’una fila a una altra), fins obtenir zeros a l’esquerra:

1. Escriure la matriu ampliada $(A \mid B)$.
2. Col·locar a la primera fila l’equació amb coeficient $1$ a la primera incògnita, si és possible.
3. Eliminar la primera incògnita de les files restants.
4. Repetir el procés per a les files i incògnites següents fins obtenir l’escaló de zeros.

### 2.1. Exemple S.C.I: sistema compatible indeterminat

Considerem el sistema:

$$\begin{cases} x + 2y - z = 1 \\ 2x + 4y - 2z = 2 \\ 3x + 6y - 3z = 3 \end{cases}$$

Matriu ampliada i escalonament:

$$\left(\begin{array}{ccc|c} 1 & 2 & -1 & 1 \\ 2 & 4 & -2 & 2 \\ 3 & 6 & -3 & 3 \end{array}\right) \xrightarrow{F_2 - 2F_1,\; F_3 - 3F_1} \left(\begin{array}{ccc|c} 1 & 2 & -1 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{array}\right)$$

$\operatorname{Rg}(A) = \operatorname{Rg}(A^*) = 1 < 3$ incògnites $\Rightarrow$ S.C.I. Prenent $y = \lambda$, $z = \mu$ (paràmetres lliures):

$$x = 1 - 2\lambda + \mu, \quad y = \lambda, \quad z = \mu \qquad \lambda, \mu \in \mathbb{R}$$

## 3. Teorema de Rouché-Frobenius

Donat un sistema $m\times n$ amb matriu de coeficients $A$ i matriu ampliada $A^* = (A \mid B)$:

- $\operatorname{Rg}(A) = \operatorname{Rg}(A^*) = n \Rightarrow$ **S.C.D** (solució única).
- $\operatorname{Rg}(A) = \operatorname{Rg}(A^*) < n \Rightarrow$ **S.C.I** (infinites solucions; $n - \operatorname{Rg}(A)$ paràmetres lliures).
- $\operatorname{Rg}(A) \neq \operatorname{Rg}(A^*) \Rightarrow$ **S.I** (sense solució).

## 4. Sistemes homogenis

Un sistema és **homogeni** si tots els termes independents són zero ($B = \vec 0$). En aquest cas $\operatorname{Rg}(A) = \operatorname{Rg}(A^*)$ sempre, de manera que un sistema homogeni és **sempre compatible**.

- $\operatorname{Rg}(A) = n \Rightarrow$ S.C.D: l’única solució és la solució trivial $x_1 = x_2 = \cdots = 0$.
- $\operatorname{Rg}(A) < n \Rightarrow$ S.C.I: infinites solucions (la trivial sempre n’és una).

## 5. Regla de Cramer

Per a sistemes S.C.D de $n$ equacions i $n$ incògnites ($|A| \neq 0$), cada incògnita es calcula substituint la columna corresponent de $A$ per la columna $B$ de termes independents:

$$x_i = \frac{|A_i|}{|A|}$$

Per a un sistema $3\times 3$ amb incògnites $x, y, z$:

$$x = \frac{\begin{vmatrix} b_1 & a_{12} & a_{13} \\ b_2 & a_{22} & a_{23} \\ b_3 & a_{32} & a_{33} \end{vmatrix}}{|A|},\quad y = \frac{\begin{vmatrix} a_{11} & b_1 & a_{13} \\ a_{21} & b_2 & a_{23} \\ a_{31} & b_3 & a_{33} \end{vmatrix}}{|A|},\quad z = \frac{\begin{vmatrix} a_{11} & a_{12} & b_1 \\ a_{21} & a_{22} & b_2 \\ a_{31} & a_{32} & b_3 \end{vmatrix}}{|A|}$$

## 6. Resolució per matriu inversa

En un sistema S.C.D ($|A| \neq 0$, existeix $A^{-1}$), el sistema $A\cdot X = B$ es pot resoldre aïllant $X$:

$$A\cdot X = B \;\Longrightarrow\; A^{-1}\cdot A\cdot X = A^{-1}\cdot B \;\Longrightarrow\; X = A^{-1}\cdot B$$

### 6.1. Exemple

Resolem el sistema:

$$\begin{cases} x + y = 3 \\ 2x - y = 0 \end{cases} \;\Rightarrow\; A = \begin{pmatrix} 1 & 1 \\ 2 & -1 \end{pmatrix},\quad B = \begin{pmatrix} 3 \\ 0 \end{pmatrix}$$

$|A| = (1)(-1) - (1)(2) = -3 \neq 0$, per tant existeix $A^{-1}$:

$$A^{-1} = \frac{1}{-3}\begin{pmatrix} -1 & -1 \\ -2 & 1 \end{pmatrix} = \begin{pmatrix} \tfrac13 & \tfrac13 \\ \tfrac23 & -\tfrac13 \end{pmatrix}$$

$$X = A^{-1}\cdot B = \begin{pmatrix} \tfrac13 & \tfrac13 \\ \tfrac23 & -\tfrac13 \end{pmatrix}\begin{pmatrix} 3 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix} \;\Rightarrow\; x = 1,\; y = 2$$

## 7. Discussió i resolució de sistemes amb paràmetre

Quan un sistema conté un paràmetre $k$:

1. Calcular $|A|$ en funció de $k$ i trobar els valors que l’anul·len ($k = a, b, \ldots$).
2. Si $k \neq a, b, \ldots$: $|A| \neq 0 \Rightarrow \operatorname{Rg}(A) = n \Rightarrow$ S.C.D. Resoldre per Cramer o inversa.
3. Per cada valor singular $k = a, b, \ldots$: substituir a $A^*$, escalonar (Gauss) i aplicar el Teorema de Rouché-Frobenius per classificar i resoldre.


## 8. Complement: plantejament de problemes i interpretació geomètrica

### 8.1. Com plantejar un problema amb un sistema

1. **Triar les incògnites** i dir explícitament què representa cadascuna ($x$, $y$, $z$ amb unitats).
2. Traduir cada frase de l’enunciat a una **equació**. Hi sol haver una equació de totals, una de valors (preus, quantitats…) i una relació entre incògnites.
3. Resoldre (Gauss, Cramer o matriu inversa) i **discutir** si la solució té sentit (ha de ser positiva i, sovint, entera).
4. Respondre en paraules i comprovar a l’enunciat.

**Exemple.** Un cinema ven entrades d’adult (8 €), joves (5 €) i infantils (3 €). Un dia es van vendre $200$ entrades i es van recaptar $1100$ €. Es sap que hi va haver el doble d’adults que d’infantils. Quantes n’hi va haver de cada tipus?

Sigui $x$ = adults, $y$ = joves i $z$ = infantils.

$$\begin{cases}x+y+z=200\\8x+5y+3z=1100\\x=2z\end{cases}$$

Substituint $x=2z$: $y=200-3z$ i $16z+5(200-3z)+3z=1100\Rightarrow 4z=100\Rightarrow z=25$. Llavors $x=50$ i $y=125$.

*Comprovació:* $50+125+25=200$ i $400+625+75=1100$ ✓. **Hi va haver $50$ adults, $125$ joves i $25$ infantils.**

### 8.2. Interpretació geomètrica dels sistemes $3\times3$

Cada equació d’un sistema de tres incògnites és un **pla** de l’espai. Resoldre el sistema és trobar la intersecció dels tres plans.

| Tipus de sistema | Posició dels tres plans |
|---|---|
| S.C.D. (una solució) | Es tallen en **un punt** |
| S.C.I. (infinites solucions, 1 paràmetre) | Es tallen en una **recta** (o dos coincidents i un que els talla) |
| S.C.I. (infinites solucions, 2 paràmetres) | Els tres plans són **coincidents** |
| S.I. (sense solució) | Sense punt comú: tres plans paral·lels, dos paral·lels, o es tallen dos a dos formant un «prisma» |

*Criteri:* $\operatorname{Rg}(A)$ i $\operatorname{Rg}(A^*)$ determinen el cas (vegeu el tema 10 per a l’estudi detallat de la posició relativa de tres plans).

## 9. Complement: més exemples de sistemes resolts

**Exemple 1 — Sistema compatible determinat.** Resolem $\begin{cases}x+y+z=6\\2x-y+z=3\\x+2y-z=2\end{cases}$ pel mètode de Gauss. Sumant la primera i la tercera equació, $2x+3y=8$; sumant la segona i la tercera, $3x+y=5$. De la segona, $y=5-3x$ i, substituint, $2x+15-9x=8\Rightarrow x=1$, $y=2$, $z=3$. Amb Rouché–Frobenius: $\operatorname{Rg}A=\operatorname{Rg}A^{*}=3=n$, **S.C.D.**

**Exemple 2 — Regla de Cramer sobre el mateix sistema.** El determinant de la matriu de coeficients és $|A|=\begin{vmatrix}1&1&1\\2&-1&1\\1&2&-1\end{vmatrix}=7\neq0$. Aleshores
$$x=\frac{\begin{vmatrix}6&1&1\\3&-1&1\\2&2&-1\end{vmatrix}}{7}=\frac77=1,\qquad y=\frac{\begin{vmatrix}1&6&1\\2&3&1\\1&2&-1\end{vmatrix}}{7}=\frac{14}{7}=2,\qquad z=\frac{\begin{vmatrix}1&1&6\\2&-1&3\\1&2&2\end{vmatrix}}{7}=\frac{21}{7}=3.$$

**Exemple 3 — Sistema incompatible.** $\begin{cases}x+y+z=1\\x-y+2z=0\\2x+3z=3\end{cases}$. La suma de les dues primeres equacions és $2x+3z=1$, que contradiu la tercera ($2x+3z=3$). Aleshores $\operatorname{Rg}A=2<\operatorname{Rg}A^{*}=3$: **S.I.** Geomètricament, els tres plans són secants dos a dos formant un prisma.

**Exemple 4 — Sistema compatible indeterminat.** $\begin{cases}x+y+z=2\\x-y=0\\2x+z=2\end{cases}$. Les dues últimes donen $y=x$ i $z=2-2x$, i la primera queda $x+x+2-2x=2$, que es compleix sempre. Per tant $\operatorname{Rg}A=\operatorname{Rg}A^{*}=2<3$ (**S.C.I.**, un paràmetre): $(x,y,z)=(\lambda,\lambda,2-2\lambda)$, que és una recta (feix de tres plans).

**Exemple 5 — Discussió amb paràmetre.** Discutim $\begin{cases}x+y+z=1\\x+ay+z=a\\x+y+az=a^{2}\end{cases}$ segons $a$. El determinant és $|A|=\begin{vmatrix}1&1&1\\1&a&1\\1&1&a\end{vmatrix}=(a-1)^{2}$. Si $a\neq1$, $\operatorname{Rg}A=\operatorname{Rg}A^{*}=3$: **S.C.D.** Si $a=1$, les tres equacions són $x+y+z=1$ ($\operatorname{Rg}A=\operatorname{Rg}A^{*}=1$): **S.C.I.** amb dos paràmetres (un pla).

## 10. Complement: relació amb la geometria

Cada equació lineal amb tres incògnites és un **pla** de l’espai; resoldre un sistema $3\times3$ és estudiar la intersecció de tres plans. Els casos S.C.D., S.C.I. i S.I. corresponen a les vuit posicions relatives de tres plans (vegeu la figura de la posició relativa de tres plans del tema 10): tres plans que es tallen en un punt (S.C.D.), en una recta o coincidents (S.C.I.), i els casos sense punts comuns (S.I.).


## 1. La recta

Una recta $r$ queda determinada per qualsevol d’aquestes dades:

- Dos punts $P$ i $Q$, o equivalentment un punt $P$ i el vector director $\vec u = \overrightarrow{PQ}$.
- Dos plans $\pi_1$ i $\pi_2$ no paral·lels (la recta és la seva intersecció).
- Un punt $P$ i un pla $\pi$ perpendicular a la recta.

La figura il·lustra els tres casos:

![Figura 17: Tres maneres de determinar una recta a l’espai.](figs/m09_f17.png)

### 1.1. Equació vectorial d’una recta

Donat un punt $P(x_0, y_0, z_0)$ i un vector director $\vec u = (u_1, u_2, u_3)$:

$$\vec x = \vec p + \lambda\,\vec u, \qquad \forall\lambda\in\mathbb{R}$$

### 1.2. Equacions paramètriques d’una recta

$$\begin{cases} x = x_0 + \lambda\,u_1 \\ y = y_0 + \lambda\,u_2 \\ z = z_0 + \lambda\,u_3 \end{cases} \qquad \forall\lambda\in\mathbb{R}$$

### 1.3. Equacions contínues d’una recta

Aïllant $\lambda$ de les equacions paramètriques i igualant:

$$\frac{x - x_0}{u_1} = \frac{y - y_0}{u_2} = \frac{z - z_0}{u_3}$$

## 2. El pla

Un pla $\pi$ queda determinat per qualsevol d’aquestes dades:

- Tres punts $P$, $Q$ i $R$ no alineats.
- Un punt $P$ i dos vectors $\vec u$ i $\vec v$ linealment independents (vectors directors del pla).
- Un punt $P$ i un vector $\vec n \neq \vec 0$ perpendicular al pla (vector normal).

### 2.1. Equació vectorial d’un pla

$$\vec x = \vec p + \lambda\,\vec u + \mu\,\vec v, \qquad \forall\,\lambda,\mu\in\mathbb{R}$$

### 2.2. Equacions paramètriques d’un pla

$$\begin{cases} x = x_0 + \lambda\,u_1 + \mu\,v_1 \\ y = y_0 + \lambda\,u_2 + \mu\,v_2 \\ z = z_0 + \lambda\,u_3 + \mu\,v_3 \end{cases} \qquad \forall\,\lambda,\mu\in\mathbb{R}$$

### 2.3. Equació general (cartesiana) d’un pla

S’obté desenvolupant el determinant de l’equació vectorial. La forma és:

$$\begin{vmatrix} x - x_0 & u_1 & v_1 \\ y - y_0 & u_2 & v_2 \\ z - z_0 & u_3 & v_3 \end{vmatrix} = 0 \;\Longrightarrow\; Ax + By + Cz + D = 0$$

## 3. Vector associat a un pla

Donat el pla $\pi: Ax + By + Cz + D = 0$, el vector $\vec n = (A, B, C)$ és perpendicular al pla i s’anomena **vector normal** o **vector associat**.

![Figura 18: El vector normal $\vec n = (A, B, C)$ és perpendicular al pla $Ax + By + Cz + D = 0$.](figs/m09_f18.png)

## 4. Recta determinada per dos plans

La intersecció de dos plans no paral·lels determina una recta:

$$r: \begin{cases} Ax + By + Cz + D = 0 \\ A'x + B'y + C'z + D' = 0 \end{cases}$$

Perquè els dos plans determinin una recta cal que siguin no paral·lels, és a dir, que els seus vectors normals $\vec n_1 = (A, B, C)$ i $\vec n_2 = (A', B', C')$ no siguin proporcionals. El vector director de la recta resultant és $\vec u = \vec n_1 \times \vec n_2$.

## 5. Feix de plans

> **Definició:** El **feix de plans** és el conjunt de tots els plans que contenen (o passen per) una mateixa recta $r$. El vector normal de cadascun dels plans del feix és perpendicular a $r$.

Si la recta $r$ és la intersecció dels plans $\pi_1: A_1x + B_1y + C_1z + D_1 = 0$ i $\pi_2: A_2x + B_2y + C_2z + D_2 = 0$, qualsevol pla del feix es pot expressar com:

$$\lambda\,(A_1x + B_1y + C_1z + D_1) + \mu\,(A_2x + B_2y + C_2z + D_2) = 0, \qquad (\lambda, \mu) \neq (0, 0)$$


## 6. Complement: mètode per obtenir equacions

### 6.1. Recta per dos punts

Per a la recta que passa per $A$ i $B$: es pren $A$ com a punt i $\vec d=\overrightarrow{AB}$ com a vector director.

**Exemple.** Recta per $A(1,2,3)$ i $B(3,0,4)$. Vector director $\vec d=(2,-2,1)$.

$$\begin{cases}x=1+2t\\y=2-2t\\z=3+t\end{cases}\qquad\Longleftrightarrow\qquad\frac{x-1}{2}=\frac{y-2}{-2}=\frac{z-3}{1}$$

### 6.2. Pla per tres punts

Es prenen dos vectors del pla, $\overrightarrow{AB}$ i $\overrightarrow{AC}$; el vector normal és el seu producte vectorial, i amb ell s’escriu $Ax+By+Cz+D=0$ imposant que passi per $A$.

**Exemple.** Pla per $A(1,0,0)$, $B(0,1,0)$ i $C(0,0,1)$. $\overrightarrow{AB}=(-1,1,0)$ i $\overrightarrow{AC}=(-1,0,1)$, i

$$\vec n=\overrightarrow{AB}\times\overrightarrow{AC}=(1,1,1)\;\Rightarrow\;x+y+z+D=0,\ \ A\in\pi\Rightarrow D=-1$$

El pla és $\pi:\ x+y+z-1=0$.

*Alternativa:* $\begin{vmatrix}x-1&y&z\\-1&1&0\\-1&0&1\end{vmatrix}=0$ dóna el mateix pla.

### 6.3. Passar d’una forma a una altra

**De contínua a implícita** (dos plans). Se separen les igualtats de dues en dues.

**Exemple.** $\dfrac{x-1}{2}=\dfrac{y+1}{-1}=\dfrac{z}{3}$.

- Primera i segona: $-(x-1)=2(y+1)\Rightarrow x+2y+1=0$.
- Segona i tercera: $3(y+1)=-z\Rightarrow 3y+z+3=0$.

$$r:\ \begin{cases}x+2y+1=0\\3y+z+3=0\end{cases}$$

**De implícita a paramètrica.** Es resol el sistema prenent una incògnita com a paràmetre.

**Exemple.** $\begin{cases}x+y-z=1\\2x-y+z=2\end{cases}$. Sumant: $3x=3\Rightarrow x=1$. Llavors $y-z=0$; prenem $z=t$ i $y=t$.

$$r:\ (x,y,z)=(1,0,0)+t\,(0,1,1)$$

*Un cop tens un punt i un vector director, tens tot el que cal per al tema 10 i 11.*

## 7. Complement: pla determinat per un punt i dos vectors

Un pla queda determinat per un punt $P$ i dos vectors **no paral·lels** $\vec u$, $\vec v$ (vectors directors del pla). Un punt $X$ és del pla si $\overrightarrow{PX}$ és combinació lineal de $\vec u$ i $\vec v$:

$$\overrightarrow{OX}=\overrightarrow{OP}+\lambda\,\vec u+\mu\,\vec v\ \Longleftrightarrow\ \begin{vmatrix}x-x_0&y-y_0&z-z_0\\u_1&u_2&u_3\\v_1&v_2&v_3\end{vmatrix}=0.$$

![Figura 0: Pla $\pi$ determinat pel punt $P$ i els vectors directors $\vec u$ i $\vec v$: el punt $X$ és del pla si $\overrightarrow{PX}=\lambda\vec u+\mu\vec v$.](figs/x09_plane_pv.png)

**Exemple.** El pla que passa per $P(1,0,2)$ amb vectors $\vec u=(1,1,0)$ i $\vec v=(0,1,1)$. El vector normal és $\vec n=\vec u\times\vec v=(1,-1,1)$, de manera que $x-y+z+D=0$ i, per $P$: $1-0+2+D=0\Rightarrow D=-3$. Pla: $x-y+z-3=0$.

## 8. Complement: plans i eixos coordenats, equació segmentària

- Plans coordenats: $XY$: $z=0$; $XZ$: $y=0$; $YZ$: $x=0$.
- Eixos coordenats: eix $OX$: $y=0,\,z=0$; eix $OY$: $x=0,\,z=0$; eix $OZ$: $x=0,\,y=0$.
- Un pla amb $D=0$ passa per l’origen; si falta una variable, el pla és **paral·lel** a l’eix corresponent (per exemple, $y+z=1$ és paral·lel a $OX$); si falten dues, és paral·lel a un pla coordenat ($z=3$ és paral·lel al pla $XY$).
- **Equació segmentària:** el pla que talla els eixos en $(a,0,0)$, $(0,b,0)$ i $(0,0,c)$ és
$$\frac xa+\frac yb+\frac zc=1.$$
*Exemple:* el pla pels punts $(2,0,0)$, $(0,3,0)$ i $(0,0,6)$ és $\dfrac x2+\dfrac y3+\dfrac z6=1$, és a dir, $3x+2y+z-6=0$.

## 9. Complement: pertinença, alineació i coplanarietat

- Un punt $P$ **pertany** a una recta o pla si les seves coordenades verifiquen l’equació.
- Tres punts $A,B,C$ estan **alineats** si $\overrightarrow{AB}\parallel\overrightarrow{AC}$ (coordenades proporcionals) i determinen un pla en cas contrari.
- Quatre punts $A,B,C,D$ són **coplanaris** si $[\overrightarrow{AB},\overrightarrow{AC},\overrightarrow{AD}]=0$.
- Dues rectes són **coplanàries** (es tallen o són paral·leles) si $[\vec u,\vec v,\overrightarrow{PQ}]=0$.

**Exemple.** Els punts $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$ i $D(1,1,-1)$ són coplanaris? $\overrightarrow{AB}=(-1,1,0)$, $\overrightarrow{AC}=(-1,0,1)$, $\overrightarrow{AD}=(0,1,-1)$ i $\begin{vmatrix}-1&1&0\\-1&0&1\\0&1&-1\end{vmatrix}=-1\cdot(0-1)-1\cdot(1-0)+0=1-1=0$. Sí, són coplanaris (pertanyen al pla $x+y+z=1$).

## 10. Complement: més exemples de rectes i plans

**Exemple 1 — Recta com a intersecció de dos plans.** $r:\ \begin{cases}x+y-z=1\\2x-y+z=2\end{cases}$. El vector director és $\vec v=\vec n_1\times\vec n_2=(1,1,-1)\times(2,-1,1)=(0,-3,-3)\parallel(0,1,1)$. Un punt: amb $z=0$, $x+y=1$ i $2x-y=2$, per tant $x=1,\,y=0$: $P(1,0,0)$. Equacions: $r:\ (x,y,z)=(1,0,0)+t(0,1,1)$.

**Exemple 2 — Pla que passa per un punt i conté una recta.** Pla que conté $r:\ (x,y,z)=(1,0,0)+t(0,1,1)$ i passa per $Q(2,1,0)$. Vectors: $\vec u=(0,1,1)$ i $\overrightarrow{PQ}=(1,1,0)$; $\vec n=\vec u\times\overrightarrow{PQ}=(-1,1,-1)$. Pla: $-x+y-z+D=0$, amb $P$: $-1+D=0\Rightarrow D=1$, és a dir, $x-y+z-1=0$.


## 1. Posició relativa de dos plans

Donats dos plans $\pi: Ax + By + Cz + D = 0$ i $\pi': A'x + B'y + C'z + D' = 0$, la posició relativa es determina comparant els coeficients:

| Plans coincidents | Plans paral·lels | Plans secants |
|---|---|---|
| $\dfrac{A}{A'} = \dfrac{B}{B'} = \dfrac{C}{C'} = \dfrac{D}{D'}$ | $\dfrac{A}{A'} = \dfrac{B}{B'} = \dfrac{C}{C'} \neq \dfrac{D}{D'}$ | No hi ha proporcionalitat entre els coeficients. La intersecció és una recta $r$. |

![Figura 19: Posició relativa de dos plans: coincidents, paral·lels i secants.](figs/m10_f19.png)

## 2. Posició relativa de tres plans

Amb tres plans, s’aplica el **Teorema de Rouché-Frobenius** sobre la matriu de coeficients $M$ i la matriu ampliada $M'$:

| $\operatorname{Rg}(M)$ | $\operatorname{Rg}(M')$ | Posició relativa | Tipus |
|:-:|:-:|---|:-:|
| 1 | 1 | Tres plans coincidents | S.C.I |
| 1 | 2 | Tres plans paral·lels | S.I |
| 2 | 2 | Tres plans secants a una recta $r$ comú | S.C.I |
| 2 | 2 | Dos plans coincidents, l’altre secant als dos | S.C.I |
| 2 | 3 | Prisma: plans secants dos a dos | S.I |
| 2 | 3 | Dos plans paral·lels, l’altre secant als dos | S.I |
| 3 | 3 | Triedre: tres plans secants a un punt | S.C.D |

## 3. Posició relativa de recta i pla

Per estudiar la posició de la recta $r$ i el pla $\pi$, es substitueixen les equacions paramètriques de $r$ a l’equació de $\pi$ i s’analitza el sistema resultant:

| S.C.D | S.C.I | S.I |
|---|---|---|
| $r$ i $\pi$ tenen un punt en comú (recta **secant** al pla) | $r$ està **continguda** en $\pi$ | $r$ i $\pi$ no tenen cap punt en comú (recta **paral·lela** al pla) |

![Figura 20: Les tres posicions relatives d’una recta i un pla.](figs/m10_f20.png)

## 4. Posició relativa de dues rectes

Expressades $r$ i $s$ com a intersecció de dos plans cadascuna, es forma un sistema de quatre equacions. Aplicant el TRF sobre la matriu $M$ i l’ampliada $M'$:

| S.C.D | S.C.I | S.I (1) | S.I (2) |
|---|---|---|---|
| $\operatorname{Rg}(M) = 3 = \operatorname{Rg}(M')$ | $\operatorname{Rg}(M) = 2 = \operatorname{Rg}(M')$ | $\operatorname{Rg}(M) = 2 \neq \operatorname{Rg}(M') = 3$ | $\operatorname{Rg}(M) = 3 \neq \operatorname{Rg}(M') = 4$ |
| Rectes **secants** | Rectes **coincidents** | Rectes **paral·leles** | Rectes que **s’encreuen** |

### 4.1. Resum per vectors directors

Donats els vectors directors $\vec u$ i $\vec v$ de $r$ i $s$, i el vector $\overrightarrow{PQ}$ entre un punt de cada recta:

- Si $\vec u = \lambda\vec v$ (vectors proporcionals, rectes paral·leles o coincidents):
  - $\overrightarrow{PQ} = \mu\,\vec u \Rightarrow$ rectes **coincidents**
  - $\overrightarrow{PQ} \neq \mu\,\vec u \Rightarrow$ rectes **paral·leles**
- Si $\vec u \neq \lambda\vec v$ (vectors no proporcionals):
  - $D(\vec u, \vec v, \overrightarrow{PQ}) = 0 \Rightarrow$ rectes **secants**
  - $D(\vec u, \vec v, \overrightarrow{PQ}) \neq 0 \Rightarrow$ rectes que **s’encreuen**

on $D(\vec u, \vec v, \overrightarrow{PQ})$ és el determinant format per les tres files $\vec u$, $\vec v$ i $\overrightarrow{PQ}$.

## 5. Perpendicularitat

### 5.1. Plans perpendiculars

Dos plans $\pi_1$ i $\pi_2$ amb vectors normals $\vec n = (A, B, C)$ i $\vec n' = (A', B', C')$ són perpendiculars si:

$$\vec n\cdot\vec n' = 0 \;\Longrightarrow\; AA' + BB' + CC' = 0$$

### 5.2. Recta i pla perpendiculars

Una recta de vector director $\vec v = (V_1, V_2, V_3)$ és perpendicular al pla $Ax + By + Cz + D = 0$ si $\vec v$ és proporcional al vector normal $\vec n = (A, B, C)$:

$$\vec v = k\,\vec n,\; k \neq 0 \iff \frac{V_1}{A} = \frac{V_2}{B} = \frac{V_3}{C}$$

### 5.3. Rectes perpendiculars

Dues rectes amb vectors directors $\vec v$ i $\vec u$ són perpendiculars si:

$$\vec v\cdot\vec u = 0$$

## 6. Projeccions ortogonals sobre un pla

### 6.1. Projecció ortogonal d’un punt sobre un pla

El punt $P'$ és la **projecció ortogonal** de $P$ sobre el pla $\pi$ si $P'$ és el peu de la perpendicular a $\pi$ que passa per $P$. Es troba com la intersecció de $\pi$ amb la recta perpendicular a $\pi$ que passa per $P$.

![Figura 21: Projecció ortogonal del punt $P$ sobre el pla $\pi$: el punt $P'$ és el peu de la perpendicular.](figs/m10_f21.png)

### 6.2. Projecció ortogonal d’una recta sobre un pla

La projecció ortogonal d’una recta $r$ sobre un pla $\pi$ és la recta $r'$ que resulta d’intersectar $\pi$ amb el pla que conté $r$ i és perpendicular a $\pi$. Per a un segment $PQ$, es projecten els extrems $P$ i $Q$ per obtenir $P'$ i $Q'$.

### 6.3. Projecció ortogonal d’un punt sobre una recta

La projecció ortogonal del punt $P$ sobre la recta $r$ és el punt $P'$ intersecció de $r$ amb el pla perpendicular a $r$ que passa per $P$. El vector normal d’aquest pla coincideix amb el vector director de $r$.

## 7. Complement: representació gràfica de la posició relativa de tres plans

La figura recull els sis casos possibles quan es combinen tres plans (els sistemes $3\times3$ del tema 8 corresponen a aquests casos).

![Figura 0: Posicions relatives de tres plans: (a) coincidents, (b) paral·lels, (c) secants en una recta comuna, (d) secants dos a dos formant un prisma, (e) dos paral·lels tallats per un tercer, (f) secants en un sol punt (triedre).](figs/x10_three_planes.png)

| Cas | $\operatorname{Rg}M$ | $\operatorname{Rg}M'$ | Sistema | Intersecció |
|---|---|---|---|---|
| (a) Coincidents | $1$ | $1$ | S.C.I. | un pla |
| (b) Paral·lels (o dos coincidents i un de paral·lel) | $1$ | $2$ | S.I. | buida |
| (c) Feix: una recta comuna | $2$ | $2$ | S.C.I. | una recta |
| (d) Prisma | $2$ | $3$ | S.I. | buida (rectes paral·leles) |
| (e) Dos paral·lels i un secant | $2$ | $3$ | S.I. | buida |
| (f) Triedre | $3$ | $3$ | S.C.D. | un punt |

*Taula: classificació de les posicions relatives de tres plans pels rangs.*

## 8. Complement: representació gràfica de la posició relativa de dues rectes

![Figura 0: Posicions relatives de dues rectes de l’espai: es tallen en un punt (secants), són paral·leles, coincideixen o s’encreuen (no són coplanàries).](figs/x10_two_lines.png)

Resum amb els vectors directors $\vec u,\vec v$ i el vector $\overrightarrow{PQ}$ entre un punt de cada recta:

| Cas | $\operatorname{Rg}(\vec u,\vec v)$ | $\operatorname{Rg}(\vec u,\vec v,\overrightarrow{PQ})$ |
|---|---|---|
| Coincidents | $1$ | $1$ |
| Paral·leles | $1$ | $2$ |
| Secants | $2$ | $2$ |
| S’encreuen | $2$ | $3$ |

*Taula: classificació de dues rectes en funció del rang.*

## 9. Complement: exemples resolts de posicions relatives

**Exemple 1 — Tres plans.** Estudiem $\pi_1:x+y+z=1$, $\pi_2:x-y+z=3$, $\pi_3:2x+z=4$. Sumant $\pi_1$ i $\pi_2$: $2x+2z=4\Rightarrow x+z=2$. Restant-hi $\pi_3$: $x=2$, $z=0$ i $y=-1$. Com que $\operatorname{Rg}M=\operatorname{Rg}M'=3$, es tallen en un únic punt $(2,-1,0)$ (triedre).

**Exemple 2 — Recta i pla.** $r:\ (x,y,z)=(1,0,-1)+t(2,1,1)$ i $\pi:\ x-y+z-3=0$. Substituint la recta al pla: $(1+2t)-t+(-1+t)-3=2t-3=0\Rightarrow t=\tfrac32$. La recta talla el pla en el punt $\bigl(4,\tfrac32,\tfrac12\bigr)$ (són secants). Comprovació: $\vec u\cdot\vec n=(2,1,1)\cdot(1,-1,1)=2\neq0$.

**Exemple 3 — Dues rectes coincidents.** $r:(1,2,3)+t(1,-1,2)$ i $s:(2,1,5)+u(2,-2,4)$. Vectors proporcionals: $\vec v=2\vec u$. A més $\overrightarrow{PQ}=(1,-1,2)=1\cdot\vec u$, per tant $Q\in r$: les rectes **coincideixen**.

**Exemple 4 — Dues rectes que s’encreuen.** $r:(0,0,0)+t(1,0,0)$ i $s:(0,1,0)+u(0,0,1)$. Els vectors no són proporcionals i $\begin{vmatrix}1&0&0\\0&0&1\\0&1&0\end{vmatrix}=-1\neq0$: $r$ i $s$ no són coplanàries, **s’encreuen**.

**Exemple 5 — Paràmetre.** Discutim la posició relativa de $\pi:x+y+z=1$, $\pi':x+ay+z=a$ i $\pi'':x+y+az=a^2$ segons $a$ (és el sistema del tema 8): si $a\neq1$ es tallen en un punt; si $a=1$ són coincidents.


## 1. Distància entre dos punts

Donats $P = (x_1, y_1, z_1)$ i $Q = (x_2, y_2, z_2)$, la distància és el mòdul del vector $\overrightarrow{PQ}$:

$$d(P, Q) = |\overrightarrow{PQ}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

## 2. Distància d’un punt a una recta

La distància entre el punt $P$ i la recta $r$ és $d(P, r) = d(P, P')$, on $P'$ és la projecció ortogonal de $P$ sobre $r$. Es pot calcular de dues maneres:

1. **Mètode geomètric:** trobar $P'$ (intersecció del pla $\perp r$ per $P$ amb $r$) i calcular $d(P, P')$.
2. **Mitjançant el producte vectorial** (si $\vec u$ és el vector director de $r$ i $Q \in r$):

$$d(P, r) = \frac{|\vec u\times\overrightarrow{QP}|}{|\vec u|}$$

![Figura 22: Distància del punt $P$ a la recta $r$: $d = |\vec u\times\overrightarrow{QP}|\,/\,|\vec u|$.](figs/m11_f22.png)

## 3. Distància d’un punt a un pla

La distància del punt $P(x_0, y_0, z_0)$ al pla $\pi: Ax + By + Cz + D = 0$ és $d(P, \pi) = d(P, P')$, on $P'$ és el peu de la perpendicular. La fórmula directa és:

$$d(P, \pi) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$$

![Figura 23: Distància del punt $P$ al pla $\pi$: la longitud del segment perpendicular a $\pi$ que passa per $P$.](figs/m11_f23.png)

## 4. Distàncies entre rectes i plans

### 4.1. Distància entre dues rectes

- **Secants o coincidents:** $d = 0$.
- **Paral·leles:** $d(r, s) = d(P, s)$, on $P$ és qualsevol punt de $r$.
- **Que s’encreuen:** existeix una única recta $t$ perpendicular a ambdues. Si $P \in r$ i $P' \in s$ són els punts de contacte de $t$, aleshores $d(r, s) = d(P, P')$. Fórmula amb el producte mixt (apartat 8):

$$d(r, s) = \frac{|[\overrightarrow{PQ}, \vec u, \vec v]|}{|\vec u\times\vec v|}$$

on $P \in r$, $Q \in s$, $\vec u$ i $\vec v$ són els vectors directors de $r$ i $s$.

### 4.2. Distància entre una recta i un pla

- Si la recta talla el pla o hi és continguda: $d = 0$.
- Si la recta és paral·lela al pla: $d(r, \pi) = d(P, \pi)$, on $P$ és qualsevol punt de $r$.

### 4.3. Distància entre dos plans

- Si es tallen o són coincidents: $d = 0$.
- Si són paral·lels: $d(\pi_1, \pi_2) = d(P, \pi_2)$, on $P$ és qualsevol punt de $\pi_1$.

## 5. Angles formats per rectes i plans

L’angle entre dos vectors $\vec v$ i $\vec w$ és:

$$\vec v\cdot\vec w = |\vec v|\,|\vec w|\cos\alpha \;\Longrightarrow\; \alpha = \arccos\frac{\vec v\cdot\vec w}{|\vec v|\,|\vec w|}$$

### 5.1. Angle entre dues rectes

L’angle format per $r$ i $s$ és el més petit dels angles formats pels seus vectors directors $\vec u$ i $\vec v$ (es pren valor absolut per garantir un angle agut):

$$\cos\alpha = \frac{|\vec u\cdot\vec v|}{|\vec u|\,|\vec v|} \;\Rightarrow\; \alpha = \arccos\frac{|\vec u\cdot\vec v|}{|\vec u|\,|\vec v|}$$

### 5.2. Angle entre una recta i un pla

L’angle $\alpha$ entre la recta $r$ (vector director $\vec u$) i el pla $\pi$ (vector normal $\vec n$) és el complement de l’angle $\beta$ entre $\vec u$ i $\vec n$:

$$\sin\alpha = \cos\beta = \frac{|\vec u\cdot\vec n|}{|\vec u|\,|\vec n|} \;\Rightarrow\; \alpha = \arcsin\frac{|\vec u\cdot\vec n|}{|\vec u|\,|\vec n|}$$

![Figura 24: Angle $\alpha$ entre la recta $r$ i el pla $\pi$: $\sin\alpha = \cos\beta = |\vec u\cdot\vec n|\,/\,(|\vec u||\vec n|)$.](figs/m11_f24.png)

### 5.3. Angle entre dos plans

L’angle entre $\pi_1$ i $\pi_2$ (amb vectors normals $\vec n_1$ i $\vec n_2$) és el més petit dels angles diedres:

$$\cos\alpha = \frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|} \;\Rightarrow\; \alpha = \arccos\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1|\,|\vec n_2|}$$

## 6. Producte vectorial de dos vectors

> **Definició:** El **producte vectorial** de $\vec u = (u_1, u_2, u_3)$ i $\vec v = (v_1, v_2, v_3)$ és el vector
>
> $$\vec u\times\vec v = \begin{vmatrix} \vec e_1 & u_1 & v_1 \\ \vec e_2 & u_2 & v_2 \\ \vec e_3 & u_3 & v_3 \end{vmatrix} = (u_2v_3 - u_3v_2,\; u_3v_1 - u_1v_3,\; u_1v_2 - u_2v_1)$$

Les característiques del vector $\vec u\times\vec v$ són:

- **Mòdul:** $|\vec u\times\vec v| = |\vec u|\,|\vec v|\sin\alpha$, amb $0^\circ \le \alpha \le 180^\circ$.
- **Direcció:** perpendicular als dos vectors $\vec u$ i $\vec v$.
- **Sentit:** el d’avanç d’un tirabuixó que giri de $\vec u$ a $\vec v$ en el menor angle possible (regla de la mà dreta).

*Observació:* si $\vec u\cdot\vec v = 0$, els vectors són perpendiculars i $|\vec u\times\vec v| = |\vec u|\,|\vec v|$ (valor màxim).

## 7. Aplicacions geomètriques del producte vectorial

### 7.1. Àrea d’un paral·lelogram

Si $\vec u$ i $\vec v$ són dos costats adjacents del paral·lelogram:

$$A = |\vec u\times\vec v|$$

### 7.2. Àrea d’un triangle

Donats tres vèrtexs $P$, $Q$, $R$:

$$A = \frac12\,|\overrightarrow{PQ}\times\overrightarrow{PR}|$$

### 7.3. Distància d’un punt a una recta (forma alternativa)

Si $Q \in r$ i $\vec u$ és el vector director de $r$:

$$d(P, r) = \frac{|\vec u\times\overrightarrow{QP}|}{|\vec u|}$$

## 8. Producte mixt de tres vectors

> **Definició:** El **producte mixt** dels vectors $\vec u$, $\vec v$ i $\vec w$ és el nombre real
>
> $$[\vec u, \vec v, \vec w] = \vec u\cdot(\vec v\times\vec w) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}$$

## 9. Aplicacions geomètriques del producte mixt

### 9.1. Volum d’un paral·lelepípede

Si $\vec u$, $\vec v$ i $\vec w$ són tres arestes adjacents:

$$V = |[\vec u, \vec v, \vec w]|$$

### 9.2. Volum d’una piràmide de base triangular

$$V = \frac16\,|[\vec u, \vec v, \vec w]|$$

### 9.3. Distància entre dues rectes que s’encreuen

Si $P \in r$, $Q \in s$, i $\vec u$, $\vec v$ són els vectors directors de $r$ i $s$:

$$|[\overrightarrow{PQ}, \vec u, \vec v]| = |\vec u\times\vec v|\cdot d(r, s) \;\Longrightarrow\; d(r, s) = \frac{|[\overrightarrow{PQ}, \vec u, \vec v]|}{|\vec u\times\vec v|}$$


## 10. Complement: punts i figures simètriques

### 10.1. Mètode general

El **simètric** $P'$ d’un punt $P$ respecte d’un element (punt, recta o pla) es troba trobant primer el **punt mitjà** $M$ entre $P$ i $P'$ i després aïllant:

$$M=\frac{P+P'}{2}\quad\Longrightarrow\quad P'=2M-P$$

| Respecte de… | Com trobar $M$ |
|---|---|
| un punt $Q$ | $M=Q$ |
| una recta $r$ | $M=r\cap\pi$, on $\pi$ és el pla per $P$ **perpendicular** a $r$ (vector normal $=\vec d_r$) |
| un pla $\pi$ | $M=r\cap\pi$, on $r$ és la recta per $P$ **perpendicular** a $\pi$ (vector director $=\vec n_\pi$) |

![Figura 37: El simètric $P'$ de $P$ respecte d’un pla: $M$ és la intersecció de la perpendicular $r$ amb el pla i és el punt mitjà de $PP'$.](figs/m11_f37.png)

### 10.2. Exemple 1 — Simètric respecte d’un pla

Simètric de $P(1,2,3)$ respecte de $\pi:\ x+y+z-3=0$.

1. Recta perpendicular per $P$: $r:\ (1+t,\,2+t,\,3+t)$.
2. Intersecció amb $\pi$: $(1+t)+(2+t)+(3+t)-3=0\Rightarrow 3+3t=0\Rightarrow t=-1$, de manera que $M=(0,1,2)$.
3. $P'=2M-P=(2\cdot0-1,\,2\cdot1-2,\,2\cdot2-3)=(-1,0,1)$.

*Comprovació:* $-1+0+1-3=-3$ i $1+2+3-3=3$: estan a banda i banda del pla i a la mateixa distància ✓.

### 10.3. Exemple 2 — Simètric respecte d’una recta

Simètric de $P(1,2,0)$ respecte de $r:\ (t,\,t,\,0)$ amb $\vec d=(1,1,0)$.

1. Pla per $P$ perpendicular a $r$: $x+y+D=0$ i $1+2+D=0\Rightarrow D=-3$, així que $\pi:\ x+y-3=0$.
2. $M=r\cap\pi$: $t+t-3=0\Rightarrow t=\frac32$ i $M=\left(\frac32,\frac32,0\right)$.
3. $P'=2M-P=(3-1,\,3-2,\,0)=(2,1,0)$.

### 10.4. Pla mediador

El **pla mediador** d’un segment $AB$ és el pla perpendicular a $AB$ pel seu punt mitjà: conté tots els punts equidistants d’$A$ i $B$.

**Exemple.** $A(1,0,2)$ i $B(3,2,0)$. $\overrightarrow{AB}=(2,2,-2)\parallel(1,1,-1)$ i $M=(2,1,1)$. Llavors $x+y-z+D=0$ amb $2+1-1+D=0\Rightarrow D=-2$:

$$\pi:\ x+y-z-2=0$$

## 11. Complement: interpretació geomètrica dels productes vectorial i mixt

![Figura 0: El producte vectorial $\vec u\times\vec v$ és perpendicular al pla que formen $\vec u$ i $\vec v$ (regla de la mà dreta) i el seu mòdul és l’àrea del paral·lelogram.](figs/x11_cross.png)

El sentit de $\vec u\times\vec v$ es determina amb la **regla de la mà dreta**: si els dits van de $\vec u$ cap a $\vec v$ pel camí més curt, el polze indica el sentit del producte. Per això $\vec v\times\vec u=-\,\vec u\times\vec v$.

![Figura 0: El valor absolut del producte mixt $[\vec u,\vec v,\vec w]$ és el volum del paral·lelepípede definit pels tres vectors.](figs/x11_parallelepiped.png)

El producte mixt es calcula com a determinant: $[\vec u,\vec v,\vec w]=\begin{vmatrix}u_1&u_2&u_3\\v_1&v_2&v_3\\w_1&w_2&w_3\end{vmatrix}$. Si val $0$, els tres vectors són coplanaris.

## 12. Complement: exemples resolts de distàncies, angles i volums

**Exemple 1 — Distància d’un punt a un pla.** $P(1,2,3)$ i $\pi:\ 2x-y+2z-4=0$:
$$d(P,\pi)=\frac{|2\cdot1-2+2\cdot3-4|}{\sqrt{2^2+(-1)^2+2^2}}=\frac{2}{3}.$$

**Exemple 2 — Distància entre dues rectes que s’encreuen.** $r:(0,0,0)+t(1,0,0)$ i $s:(0,1,0)+u(0,0,1)$. $\vec u\times\vec v=(0,-1,0)$, $\overrightarrow{PQ}=(0,1,0)$ i $[\vec u,\vec v,\overrightarrow{PQ}]=-1$:
$$d(r,s)=\frac{|[\vec u,\vec v,\overrightarrow{PQ}]|}{|\vec u\times\vec v|}=\frac11=1.$$

**Exemple 3 — Angle entre dos plans.** $\pi:x+y+z=0$ i $\pi':x+y=0$, amb $\vec n=(1,1,1)$ i $\vec n'=(1,1,0)$:
$$\cos\alpha=\frac{|\vec n\cdot\vec n'|}{|\vec n|\,|\vec n'|}=\frac{2}{\sqrt3\,\sqrt2}=\frac{2}{\sqrt6}\ \Rightarrow\ \alpha\approx35{,}3^{\circ}.$$

**Exemple 4 — Angle entre una recta i un pla.** $r$ de vector director $\vec u=(1,2,2)$ i el pla $z=0$ ($\vec n=(0,0,1)$): $\sin\alpha=\dfrac{|\vec u\cdot\vec n|}{|\vec u|\,|\vec n|}=\dfrac23\Rightarrow\alpha\approx41{,}8^{\circ}$.

**Exemple 5 — Àrea d’un triangle i volum d’un tetraedre.** Siguin $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$ i $O(0,0,0)$.

- $\overrightarrow{AB}=(-1,2,0)$ i $\overrightarrow{AC}=(-1,0,3)$; $\overrightarrow{AB}\times\overrightarrow{AC}=(6,3,2)$ amb mòdul $7$. Àrea del triangle $ABC=\dfrac72$.
- El volum del tetraedre $OABC$ és $\dfrac16\bigl|[\overrightarrow{OA},\overrightarrow{OB},\overrightarrow{OC}]\bigr|=\dfrac16\cdot6=1$.
- El pla $ABC$ és $\dfrac x1+\dfrac y2+\dfrac z3=1$, és a dir, $6x+3y+2z-6=0$, i la distància d’$O$ a aquest pla és $\dfrac{6}{7}$. Comprovació: $V=\dfrac13\cdot\dfrac72\cdot\dfrac67=1$.

**Exemple 6 — Distància d’un punt a una recta.** $P(1,1,1)$ i $r:(0,0,0)+t(1,0,0)$. $\overrightarrow{QP}=(1,1,1)$ i $\vec u\times\overrightarrow{QP}=(0,-1,1)$, de mòdul $\sqrt2$: $d(P,r)=\dfrac{\sqrt2}{1}=\sqrt2$.


## 1. Probabilitat condicionada

> **Definició:** Siguin $A$ i $B$ dos successos d’un espai mostral $S$, amb $p(A) \neq 0$. S’anomena **probabilitat de $B$ condicionada a $A$** el quocient
>
> $$p(B/A) = \frac{p(A\cap B)}{p(A)}$$

Es llegeix: «probabilitat del succés $B$ sabent que s’ha verificat el succés $A$».

D’aquesta definició s’obtenen les **regles del producte**:

$$p(A\cap B) = p(A)\cdot p(B/A) = p(B)\cdot p(A/B)$$

> **Definició:** El succés $B$ és **independent** del succés $A$ si $p(B/A) = p(B)$. La relació és simètrica: si $B$ és independent de $A$, llavors $A$ és independent de $B$. En aquest cas:
>
> $$p(A\cap B) = p(A)\cdot p(B)$$

Si en canvi $p(A\cap B) \neq p(A)\cdot p(B)$, els successos són **dependents** i cal usar les fórmules de la probabilitat condicionada.

## 2. Fórmula de Bayes

Siguin $A_1, A_2, \ldots, A_k$ successos incompatibles dos a dos ($A_i\cap A_j = \varnothing$ per $i \neq j$) i exhaustius ($A_1\cup A_2\cup\cdots\cup A_k = \Omega$). Per a qualsevol succés $B$, el **teorema de la probabilitat total** dona:

$$p(B) = p(A_1)\cdot p(B/A_1) + p(A_2)\cdot p(B/A_2) + \cdots + p(A_k)\cdot p(B/A_k)$$

La **fórmula de Bayes** permet calcular la probabilitat a posteriori de cada $A_j$ sabent que ha ocorregut $B$:

$$p(A_j/B) = \frac{p(A_j)\cdot p(B/A_j)}{p(A_1)\cdot p(B/A_1) + p(A_2)\cdot p(B/A_2) + \cdots + p(A_k)\cdot p(B/A_k)}$$

## 3. Variable aleatòria i funció de probabilitat

> **Definició:** Donat un espai mostral $\Omega$, una **variable aleatòria** $X$ és una aplicació
>
> $$X: \Omega \to \mathbb{R}$$
>
> que assigna un nombre real a cada resultat possible de l’experiment.

Una variable aleatòria és **discreta** si el conjunt de valors que pot prendre és finit o numerable: $\{x_1, x_2, \ldots, x_n\}$.

> **Definició:** La **funció de probabilitat** (o llei de probabilitat) d’una variable aleatòria discreta $X$ assigna a cada valor $x_i$ la seva probabilitat:
>
> $$p[X = x_i] = p_i, \qquad \forall\, i = 1, 2, \ldots, n$$

Ha de complir: $p_i \ge 0$ i $\displaystyle\sum_{i=1}^{n} p_i = 1$.

## 4. Distribució binomial

> **Definició:** Una variable aleatòria $X$ segueix una **distribució binomial** $B(n, p)$ quan es realitza un experiment de Bernoulli (resultat èxit o fracàs, amb probabilitat d’èxit $p$) un total de $n$ proves independents. La funció de probabilitat és:
>
> $$p[X = k] = \binom{n}{k}p^k(1-p)^{n-k} = \binom{n}{k}p^kq^{n-k}, \qquad k = 0, 1, \ldots, n$$
>
> on $q = 1 - p$.

Les condicions per aplicar la distribució binomial $B(n, p)$ són:

- El resultat de cada prova pertany a una de dues categories: èxit o fracàs.
- La probabilitat d’èxit $p$ és constant en cada prova.
- Les $n$ proves són independents entre si.

Les característiques principals de $B(n, p)$ són:

- **Esperança (mitjana):** $\mu = E[X] = np$
- **Variància:** $\sigma^2 = npq = np(1-p)$
- **Desviació típica:** $\sigma = \sqrt{npq}$

## 5. Complement: distribució normal

### 5.1. Variable aleatòria contínua

Una variable aleatòria contínua $X$ pot prendre qualsevol valor en un interval de $\mathbb{R}$. La seva distribució s’especifica mitjançant una **funció de densitat** $f(x) \ge 0$ tal que:

$$\int_{-\infty}^{+\infty} f(x)\,dx = 1 \qquad\text{i}\qquad P(a \le X \le b) = \int_a^b f(x)\,dx$$

### 5.2. La distribució normal $N(\mu, \sigma)$

> **Definició:** Una variable aleatòria $X$ segueix una **distribució normal** $N(\mu, \sigma)$ si la seva funció de densitat és
>
> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}, \qquad x \in \mathbb{R}$$
>
> on $\mu$ és la mitjana i $\sigma$ la desviació típica.

![Figura 26: Campana de Gauss $N(\mu, \sigma)$: el 68,3 % de les dades cau dins de $\mu \pm \sigma$, el 95,5 % dins de $\mu \pm 2\sigma$ i el 99,7 % dins de $\mu \pm 3\sigma$.](figs/m12_f26.png)

### 5.3. Propietats de la distribució normal

- La corba és simètrica respecte de $x = \mu$.
- El punt de màxim és $x = \mu$, amb $f(\mu) = \dfrac{1}{\sigma\sqrt{2\pi}}$.
- Els punts d’inflexió són $x = \mu \pm \sigma$.
- $P(\mu - \sigma \le X \le \mu + \sigma) \approx 0{,}683$ *(regla 68-95-99,7)*
- $P(\mu - 2\sigma \le X \le \mu + 2\sigma) \approx 0{,}955$
- $P(\mu - 3\sigma \le X \le \mu + 3\sigma) \approx 0{,}997$

### 5.4. Tipificació: la normal estàndard $N(0, 1)$

Per calcular probabilitats d’una $N(\mu, \sigma)$ qualsevol, es transforma en la normal estàndard $Z \sim N(0, 1)$ mitjançant el canvi de variable:

$$Z = \frac{X - \mu}{\sigma}$$

$$P(X \le x) = P\!\left(Z \le \frac{x - \mu}{\sigma}\right) = \Phi\!\left(\frac{x - \mu}{\sigma}\right)$$

on $\Phi(z)$ és la funció de distribució acumulada de la normal estàndard, consultable en taules.

> **Propietat (Simetria de $\Phi$):** per a la normal estàndard es compleix
>
> $$P(Z \le -z) = 1 - P(Z \le z) = 1 - \Phi(z)$$
>
> $$P(Z \ge z) = 1 - \Phi(z)$$
>
> $$P(a \le Z \le b) = \Phi(b) - \Phi(a)$$

### 5.5. Aproximació binomial–normal

Quan $n$ és gran i $p$ no és molt proper a $0$ ni a $1$, la distribució $B(n, p)$ s’aproxima a:

$$X \sim B(n, p) \approx N(\mu, \sigma) \quad\text{amb}\quad \mu = np, \quad \sigma = \sqrt{npq}$$

*Regla pràctica:* aplicar quan $np \ge 5$ i $nq \ge 5$.


## 6. Complement: probabilitat bàsica, taules i arbres

### 6.1. Regla de Laplace i operacions amb successos

Si tots els resultats són **equiprobables**:

$$P(A)=\frac{\text{casos favorables}}{\text{casos possibles}}$$

| Operació | Fórmula |
|---|---|
| Contrari | $P(\overline A)=1-P(A)$ |
| Unió | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ |
| Intersecció (producte) | $P(A\cap B)=P(A)\,P(B\mid A)$ |
| Independents | $P(A\cap B)=P(A)\,P(B)$ |
| Lleis de De Morgan | $P(\overline{A\cup B})=P(\overline A\cap\overline B)$, $\ P(\overline{A\cap B})=P(\overline A\cup\overline B)$ |

![Figura 38: Diagrama de Venn de dos successos $A$ i $B$ dins de l’espai mostral $E$.](figs/m12_f38.png)

**Exemple.** $P(A)=0{,}5$, $P(B)=0{,}4$ i $P(A\cup B)=0{,}7$. Llavors $P(A\cap B)=0{,}5+0{,}4-0{,}7=0{,}2$. Com que $P(A)P(B)=0{,}2$, **$A$ i $B$ són independents**.

### 6.2. Taules de contingència

Una taula de doble entrada permet llegir directament les probabilitats.

| | $B$ | $\overline B$ | Total |
|---|---|---|---|
| $A$ | 30 | 20 | 50 |
| $\overline A$ | 10 | 40 | 50 |
| Total | 40 | 60 | 100 |

$P(A\cap B)=\frac{30}{100}$, $P(B)=\frac{40}{100}$ i $P(A\mid B)=\dfrac{30}{40}=0{,}75$ (es divideix per la fila o columna de la condició).

### 6.3. Diagrames d’arbre, probabilitat total i Bayes

Les probabilitats de les branques d’una mateixa ramificació sumen $1$. El producte de les branques d’un camí és la probabilitat de la intersecció; sumant camins s’obté la **probabilitat total**.

![Figura 39: Arbre de probabilitats: $P(B)=P(A_1)P(B|A_1)+P(A_2)P(B|A_2)$.](figs/m12_f39.png)

**Exemple.** Una fàbrica té dues màquines: $M_1$ fa el $60\,\%$ de les peces, amb un $2\,\%$ de defectuoses, i $M_2$ fa el $40\,\%$, amb un $5\,\%$ de defectuoses.

$$P(D)=0{,}6\cdot0{,}02+0{,}4\cdot0{,}05=0{,}012+0{,}02=0{,}032$$

Si una peça és defectuosa, la probabilitat que vingui de $M_2$ és (Bayes)

$$P(M_2\mid D)=\frac{0{,}4\cdot0{,}05}{0{,}032}=\frac{0{,}02}{0{,}032}=0{,}625$$

## 7. Complement: esperança, variància i exemples resolts

### 7.1. Esperança i variància

Per a una variable aleatòria discreta amb valors $x_i$ i probabilitats $p_i$:

$$\mu=E[X]=\sum x_i\,p_i,\qquad \operatorname{Var}(X)=\sum x_i^2\,p_i-\mu^2,\qquad \sigma=\sqrt{\operatorname{Var}(X)}$$

**Exemple.** Un joc paga $10$ € amb probabilitat $0{,}1$, $2$ € amb probabilitat $0{,}4$ i $0$ € amb probabilitat $0{,}5$.

$$E[X]=10\cdot0{,}1+2\cdot0{,}4=1{,}8\text{ €},\qquad \operatorname{Var}(X)=100\cdot0{,}1+4\cdot0{,}4-1{,}8^2=11{,}6-3{,}24=8{,}36$$

Per a $B(n,p)$: $E[X]=np$ i $\operatorname{Var}(X)=npq$.

### 7.2. Binomial resolta

Es llança $5$ cops una moneda trucada amb $P(\text{cara})=0{,}6$. Probabilitat d’obtenir **exactament** $3$ cares i d’obtenir **almenys** $1$:

$$P(X=3)=\binom53 0{,}6^3\,0{,}4^2=10\cdot0{,}216\cdot0{,}16=0{,}3456$$

$$P(X\ge1)=1-P(X=0)=1-0{,}4^5=1-0{,}01024=0{,}98976$$

### 7.3. Normal resolta amb tipificació

Les notes d’un examen segueixen $N(6;\,1{,}5)$. Percentatge d’alumnes amb nota superior a $8$:

$$P(X>8)=P\!\left(Z>\frac{8-6}{1{,}5}\right)=P(Z>1{,}33)=1-\Phi(1{,}33)=1-0{,}9082=0{,}0918$$

És a dir, un $9{,}18\,\%$ aproximadament. Per a un interval: $P(5\le X\le7)=P(-0{,}67\le Z\le0{,}67)=2\Phi(0{,}67)-1=2\cdot0{,}7486-1=0{,}4972$.

### 7.4. Binomial aproximada per la normal

$X\sim B(100;\,0{,}5)$: $np=50\ge5$, $nq=50\ge5$, de manera que $X\approx N(50;\,5)$ amb $\sigma=\sqrt{100\cdot0{,}5\cdot0{,}5}=5$.

$P(X\le55)$: amb **correcció de continuïtat** es calcula $P(X'\le55{,}5)$:

$$P\!\left(Z\le\frac{55{,}5-50}{5}\right)=P(Z\le1{,}1)=\Phi(1{,}1)=0{,}8643$$

## 8. Complement: la distribució binomial en imatges

La gràfica d’una distribució binomial és un diagrama de barres: la barra de cada $k$ té alçada $P(X=k)$. A l’exemple $B(10;\,0{,}3)$ la mitjana és $np=3$ i la barra més alta és la de $k=3$.

![Figura 0: Funció de probabilitat de la distribució binomial $B(10;\,0{,}3)$; la barra vermella marca la mitjana $\mu=np=3$.](figs/x12_binomial.png)

**Exemple.** $X\sim B(10;\,0{,}3)$:
$$P(X=3)=\binom{10}{3}0{,}3^{3}\,0{,}7^{7}=120\cdot0{,}027\cdot0{,}0824\approx0{,}2668,$$
$$P(X\le2)=0{,}0282+0{,}1211+0{,}2335\approx0{,}3828.$$

## 9. Complement: ús de la taula de la normal i tipificació

La taula de l’**Annex D** dona $\Phi(z)=P(Z\le z)$ per a $Z\sim N(0,1)$. Per a una variable $X\sim N(\mu,\sigma)$ es tipifica,
$$Z=\frac{X-\mu}{\sigma}\sim N(0,1),\qquad P(X\le x)=\Phi\Bigl(\frac{x-\mu}{\sigma}\Bigr).$$

![Figura 0: Tipificació: l’àrea sota $N(50,5)$ fins a $55{,}5$ coincideix amb l’àrea sota $N(0,1)$ fins a $z=1{,}1$, és a dir, $\Phi(1{,}1)=0{,}8643$.](figs/x12_standardize.png)

Les regles per operar amb la taula, usant la simetria de la campana, són:

![Figura 0: Regles de càlcul amb $\Phi$: $P(Z\le a)=\Phi(a)$, $P(Z\ge a)=1-\Phi(a)$ i $P(Z\le-a)=1-\Phi(a)$.](figs/x12_normal_sym.png)

- $P(Z\ge a)=1-\Phi(a)$ i $P(Z\le-a)=1-\Phi(a)$.
- $P(a\le Z\le b)=\Phi(b)-\Phi(a)$.
- $P(|Z|\le a)=2\Phi(a)-1$.

## 10. Complement: exemples resolts de normal i binomial

**Exemple 1 — Probabilitat directa.** L’alçada d’un grup segueix $X\sim N(170,\,8)$ cm. 

- $P(X>180)=1-\Phi\Bigl(\dfrac{180-170}{8}\Bigr)=1-\Phi(1{,}25)=1-0{,}8944=0{,}1056$.
- $P(162<X<178)=\Phi(1)-\Phi(-1)=2\Phi(1)-1=2\cdot0{,}8413-1=0{,}6827$.

**Exemple 2 — Càlcul invers.** Quina alçada deixa per sobre el 5 % més alt? Es busca $z$ amb $\Phi(z)=0{,}95$: $z\approx1{,}645$. Aleshores $x=\mu+z\sigma=170+1{,}645\cdot8\approx183{,}2$ cm.

**Exemple 3 — Aproximació de la binomial per la normal.** Es llança $100$ vegades una moneda equilibrada. $X\sim B(100;\,0{,}5)$, amb $np=50\ge5$ i $nq=50\ge5$, de manera que $X\approx N(50,\,5)$ ($\sigma=\sqrt{100\cdot0{,}5\cdot0{,}5}=5$). Probabilitat d’obtenir **almenys 60** cares, amb correcció de continuïtat ($X\ge60\to X>59{,}5$):
$$P(X\ge60)\approx P\Bigl(Z\ge\frac{59{,}5-50}{5}\Bigr)=1-\Phi(1{,}9)=1-0{,}9713=0{,}0287.$$

**Exemple 4 — Bayes amb un test mèdic.** Una malaltia afecta l’1 % de la població. Un test dona positiu al $95\%$ dels malalts (sensibilitat) i al $5\%$ dels sans (fals positiu). Probabilitat total de positiu: $P(+)=0{,}01\cdot0{,}95+0{,}99\cdot0{,}05=0{,}059$. Pel teorema de Bayes,
$$P(\text{malalt}\mid+)=\frac{0{,}01\cdot0{,}95}{0{,}059}\approx0{,}161.$$
Només un $16\%$ dels positius estan realment malalts: la baixa prevalença fa que els falsos positius siguin molt més nombrosos que els vertaders.

**Exemple 5 — Esperança i variància.** $X$ pren els valors $0,1,2$ amb probabilitats $0{,}2,\,0{,}5,\,0{,}3$. $\mu=0\cdot0{,}2+1\cdot0{,}5+2\cdot0{,}3=1{,}1$; $\sigma^{2}=0^2\cdot0{,}2+1\cdot0{,}5+4\cdot0{,}3-1{,}1^{2}=1{,}7-1{,}21=0{,}49$; $\sigma=0{,}7$.

