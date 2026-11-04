#!/usr/bin/env python3
"""Genera latex/mates/annex/d.tex: taula de la distribució normal N(0,1) (Phi(z)), z de 0,00 a 3,99."""
import math, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'latex', 'mates', 'annex', 'd.tex')
phi = lambda z: 0.5 * (1 + math.erf(z / math.sqrt(2)))
fmt = lambda v: ('%.4f' % v).replace('.', '{,}')


def block(z0, z1):
    rows = ['\\begin{tabular}{@{}r|' + 'c' * 10 + '@{}}', '\\toprule', '$z$ & ' + ' & '.join('0{,}%02d' % k for k in range(10)) + ' \\\\', '\\midrule']
    for i in range(int(z0 * 10), int(z1 * 10) + 1):
        z = i / 10
        rows.append(('%.1f' % z).replace('.', '{,}') + ' & ' + ' & '.join(fmt(phi(z + k / 100)) for k in range(10)) + ' \\\\')
    rows += ['\\bottomrule', '\\end{tabular}']
    return '\n'.join(rows)


tex = ['% generat per tools/gen_normal.py — no editar a mà', '\\footnotesize\\setlength{\\tabcolsep}{2.6pt}\\renewcommand{\\arraystretch}{1.12}',
       '\\begin{center}', block(0.0, 1.9), '\\hspace{2.2em}', block(2.0, 3.9), '\\end{center}', '\\normalsize\\vspace{0.4em}',
       '\\begin{minipage}[t]{0.52\\linewidth}',
       '\\textbf{Com s\'utilitza.} La taula dona $\\Phi(z)=P(Z\\le z)$ per a $Z\\sim N(0,1)$. Per a $z$ amb dues xifres decimals, es busca la fila de la unitat i el primer decimal i la columna del segon decimal. Per exemple, $\\Phi(1{,}37)$ és la intersecció de la fila $1{,}3$ amb la columna $0{,}07$:',
       '\\[\\Phi(1{,}37)=%s.\\]' % fmt(phi(1.37)),
       'Per a valors negatius se simplifica amb la simetria: $\\Phi(-z)=1-\\Phi(z)$. Si $X\\sim N(\\mu,\\sigma)$, es tipifica $Z=\\frac{X-\\mu}{\\sigma}$ i $P(X\\le x)=\\Phi\\bigl(\\frac{x-\\mu}{\\sigma}\\bigr)$.',
       '\\end{minipage}\\hfill', '\\begin{minipage}[t]{0.43\\linewidth}', '\\textbf{Valors crítics i regla empírica}\\par\\vspace{2pt}', '\\renewcommand{\\arraystretch}{1.35}\\small',
       '\\begin{tabular}{@{}c c c@{\\hspace{1.6em}}c c@{}}\\toprule', 'Confiança & $\\alpha$ & $z_{\\alpha/2}$ & Interval & $P(\\mu-k\\sigma\\le X\\le\\mu+k\\sigma)$ \\\\\\midrule']
rows = [('90\\,\\%', '0{,}10', '1{,}645', '$\\mu\\pm\\sigma$', '68{,}27\\,\\%'), ('95\\,\\%', '0{,}05', '1{,}960', '$\\mu\\pm2\\sigma$', '95{,}45\\,\\%'),
        ('99\\,\\%', '0{,}01', '2{,}576', '$\\mu\\pm3\\sigma$', '99{,}73\\,\\%')]
for r in rows: tex.append(' & '.join(r) + ' \\\\')
tex += ['\\bottomrule\\end{tabular}', '\\end{minipage}']
open(OUT, 'w', encoding='utf8').write('\n'.join(tex) + '\n')
print('d.tex ok', fmt(phi(1.37)), fmt(phi(1.1)), fmt(phi(1.96)))
