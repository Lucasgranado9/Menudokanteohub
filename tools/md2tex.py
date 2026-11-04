#!/usr/bin/env python3
"""Markdown (català, matemàtiques en TeX) -> LaTeX amb l'estil dels apunts de Física.

Ús:  python3 tools/md2tex.py        (regenera latex/mates/temes/*.tex a partir de latex/mates/src/mates.md)
"""
import re, os, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = os.path.join(ROOT, 'latex/mates/src/mates.md')
OUT = os.path.join(ROOT, 'latex/mates/temes')
FIG = os.path.join(ROOT, 'latex/mates/fig')

TITOLS = {1: 'Derivades', 2: 'Funcions contínues i derivables', 3: 'Aplicacions de la derivada',
          4: 'Primitives', 5: 'La integral', 6: 'Vectors a l’espai', 7: 'Matrius i determinants',
          8: 'Sistemes d’equacions lineals', 9: 'Equacions de rectes i plans',
          10: 'Posició relativa de rectes i plans', 11: 'Distàncies i angles', 12: 'Probabilitat'}
ANNEXOS = ['Perímetre, àrea i volum', 'Símbols i notació matemàtica',
           'Derivades i integrals: formulari ràpid', 'Fórmules clau afegides per a la PAU']

# ---------------------------------------------------------------- inline
UNI = {'’': "'", '‘': "`", '“': '``', '”': "''", '«': '``', '»': "''", '—': '---', '–': '--',
       '…': '\\ldots{}', '·': '\\textperiodcentered{}', '€': '\\euro{}', '‰': '\\textperthousand{}',
       '✓': '$\\checkmark$', '→': '$\\rightarrow$', '≤': '$\\le$', '≥': '$\\ge$', '≠': '$\\ne$',
       '≈': '$\\approx$', '×': '$\\times$', '°': '\\textdegree{}', 'º': '\\textordmasculine{}'}


def esc(s):
    s = s.replace('\\', '\\textbackslash{}')
    for a, b in (('&', '\\&'), ('%', '\\%'), ('#', '\\#'), ('_', '\\_'), ('~', '\\textasciitilde{}'),
                 ('^', '\\textasciicircum{}'), ('{', '\\{'), ('}', '\\}')):
        s = s.replace(a, b)
    s = re.sub(r'"([^"]*)"', r"``\1''", s)
    for a, b in UNI.items():
        s = s.replace(a, b)
    return s


MATH_UNI = {'·': '\\cdot ', '→': '\\to ', '≤': '\\le ', '≥': '\\ge ', '≠': '\\ne ', '×': '\\times ',
            '°': '^\\circ ', '’': "'", '−': '-'}


def mathfix(m):
    for a, b in MATH_UNI.items():
        m = m.replace(a, b)
    return m


def inline(s):
    """Text d'una línia -> LaTeX. Les fórmules $..$ es protegeixen abans d'escapar."""
    keep = []

    def grab(m):
        keep.append('$' + mathfix(m.group(1)) + '$')
        return '\x00%d\x00' % (len(keep) - 1)
    s = re.sub(r'\$([^$]+)\$', grab, s)
    s = esc(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'\\textbf{\1}', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'\\emph{\1}', s)
    s = re.sub(r'\x00(\d+)\x00', lambda m: keep[int(m.group(1))], s)
    return s


# ---------------------------------------------------------------- blocs
def display(body, numbered):
    body = mathfix(body.strip())
    flat = re.sub(r'\\begin\{(\w+\*?)\}.*?\\end\{\1\}', '', body, flags=re.S)
    if '\\\\' in flat:
        body = '\\begin{aligned}\n' + body + '\n\\end{aligned}'
    env = 'equation' if numbered else 'equation*'
    return '\\begin{%s}\n%s\n\\end{%s}' % (env, body, env)


def figsize(name):
    p = os.path.join(FIG, name + '.pdf')
    try:
        o = subprocess.check_output(['pdfinfo', p], text=True)
        w = float(re.search(r'Page size:\s+([\d.]+) x', o).group(1))
    except Exception:
        w = 360
    return min(w, 440)


def list_block(lines, i, indent=0):
    """Llista (nested). Retorna (latex, nou_i)."""
    ordered = bool(re.match(r'\s*\d+\.\s', lines[i]))
    env = 'enumerate' if ordered else 'itemize'
    out = ['\\begin{%s}' % env]
    pat = re.compile(r'^(\s*)(?:[-*]|\d+\.)\s+(.*)$')
    while i < len(lines):
        m = pat.match(lines[i])
        if not m or len(m.group(1)) < indent:
            break
        if len(m.group(1)) > indent:  # niuada
            sub, i = list_block(lines, i, len(m.group(1)))
            out.append(sub)
            continue
        txt = m.group(2)
        i += 1
        while i < len(lines) and lines[i].strip() and not pat.match(lines[i]) and lines[i].startswith(' '):
            txt += ' ' + lines[i].strip()
            i += 1
        out.append('\\item ' + inline(txt))
    out.append('\\end{%s}' % env)
    return '\n'.join(out), i


def table_block(lines, i):
    rows = []
    while i < len(lines) and lines[i].lstrip().startswith('|'):
        rows.append(lines[i].strip())
        i += 1
    keep = []

    def grab(m):
        keep.append(m.group(0))
        return '\x01%d\x01' % (len(keep) - 1)
    cells = []
    for r in rows:
        r = re.sub(r'\$[^$]+\$', grab, r)
        parts = [c.strip() for c in r.strip('|').split('|')]
        parts = [re.sub(r'\x01(\d+)\x01', lambda m: keep[int(m.group(1))], c) for c in parts]
        cells.append(parts)
    head, body = cells[0], [c for c in cells[2:]]
    n = len(head)
    plain = lambda c: re.sub(r'\$[^$]*\$', 'xxx', c)
    mx = [max(len(plain(r[k])) if k < len(r) else 0 for r in [head] + body) for k in range(n)]
    big = [m >= 30 for m in mx]
    ragged = '>{\\raggedright\\arraybackslash}X'
    spec = ''.join(ragged if big[k] else ('l' if k == 0 else 'c') for k in range(n))
    # caption (línia següent *Taula: ...*)
    j = i
    while j < len(lines) and not lines[j].strip():
        j += 1
    cap = None
    m = re.match(r'^\*Taula[^:]*:\s*(.*?)\*\s*$', lines[j]) if j < len(lines) else None
    if m:
        cap, i = m.group(1), j + 1
    tall = any(re.search(r'\\d?frac|\\int|\\sum|\\lim|\\sqrt\{', c) for r in cells for c in r)
    def dsp(c):
        if not re.search(r'\\d?frac|\\int|\\sum', c):
            return c
        out, op = [], False
        for ch in c:
            if ch == '$':
                out.append('$\\displaystyle ' if not op else '$')
                op = not op
            else:
                out.append(ch)
        return ''.join(out)
    fmt = lambda r: ' & '.join(inline(dsp(c)) for c in (r + [''] * n)[:n]) + ' \\\\'
    if any(big):
        tab = ['\\begin{tabularx}{\\textwidth}{%s}' % spec]
        end = '\\end{tabularx}'
    else:
        tab = ['\\begin{tabular}{%s}' % spec]
        end = '\\end{tabular}'
    tab += ['\\toprule', fmt(head), '\\midrule'] + [fmt(r) for r in body] + ['\\bottomrule', end]
    out = ['\\begin{table}[!htbp]', '\\centering', '\\renewcommand{\\arraystretch}{%s}' % ('1.75' if tall else '1.3')] + tab
    if cap:
        out.append('\\caption{%s}' % inline(cap))
    out.append('\\end{table}')
    return '\n'.join(out), i


def convert(text, state, quote=False):
    lines = text.split('\n')
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if not s or s == '---':
            i += 1
            continue
        m = re.match(r'^(#{2,4})\s+(?:(\d+(?:\.\d+)*)\.\s+)?(.*)$', s)
        if m:
            lv, num, title = len(m.group(1)), m.group(2), m.group(3)
            cmd = {2: 'section', 3: 'subsection', 4: 'subsubsection'}[lv]
            if not num:
                cmd += '*'
            out.append('\\%s{%s}' % (cmd, inline(title)))
            if num:
                state['check'].append((lv, num))
            i += 1
            continue
        if s.startswith('$$'):  # display
            body = s[2:]
            if body.endswith('$$') and len(body) >= 2:
                body = body[:-2]
            else:
                i += 1
                buf = [body]
                while i < len(lines) and '$$' not in lines[i]:
                    buf.append(lines[i])
                    i += 1
                buf.append(lines[i].split('$$')[0])
                body = '\n'.join(buf)
            out.append(display(body, quote))
            i += 1
            continue
        if s.startswith('>'):
            buf = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                buf.append(re.sub(r'^\s*>\s?', '', lines[i]))
                i += 1
            out.append(convert('\n'.join(buf), state, True))
            continue
        m = re.match(r'^!\[(.*)\]\(figs/([\w]+)\.png\)\s*$', s)
        if m:
            cap = re.sub(r'^Figura\s*\d+\s*:\s*', '', m.group(1))
            w = figsize(m.group(2))
            out.append('\\begin{figure}[!htbp]\n\\centering\n\\includegraphics[width=%.0fpt]{fig/%s.pdf}\n\\caption{%s}\n\\end{figure}'
                       % (w, m.group(2), inline(cap)))
            state['figs'].append(m.group(2))
            i += 1
            continue
        if s.startswith('|'):
            t, i = table_block(lines, i)
            out.append(t)
            continue
        if re.match(r'^(\s*)([-*]|\d+\.)\s+', ln):
            t, i = list_block(lines, i, len(ln) - len(ln.lstrip()))
            out.append(t)
            continue
        # paràgraf
        buf = [s]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(
                r'^\s*(#{2,4}\s|\$\$|>|!\[|\||[-*]\s|\d+\.\s)', lines[i]) and lines[i].strip() != '---':
            buf.append(lines[i].strip())
            i += 1
        p = ' '.join(buf)
        m = re.match(r'^\*\*([^*]+?)\*\*\s*(.*)$', p)
        if quote and m and re.match(r'^\*\*[^*]+:\*\*', p):
            label = m.group(1).strip()
            p = '\\textbf{%s} %s' % (inline(label), inline(m.group(2)))
        elif m and re.match(r'^Exemple', m.group(1)):
            lab = m.group(1).strip().rstrip('.').rstrip(':')
            p = '\\emph{%s:} %s' % (inline(lab), inline(m.group(2)))
        else:
            p = inline(p)
        out.append(p)
    return '\n\n'.join(o for o in out if o != '')


def main():
    text = open(SRC, encoding='utf8').read()
    lines = text.split('\n')
    starts = [i for i, l in enumerate(lines) if l.startswith('## 1. ')]
    assert len(starts) == 12, len(starts)
    ann = [i for i, l in enumerate(lines) if l.startswith('## ') and not re.match(r'## \d', l)]
    first_ann = ann[0] if ann else len(lines)
    os.makedirs(OUT, exist_ok=True)
    allfigs = []
    state = {'check': [], 'figs': allfigs}
    chunks = []
    for k, s in enumerate(starts):
        e = starts[k + 1] if k + 1 < len(starts) else first_ann
        chunks.append(('t%02d' % (k + 1), '\n'.join(lines[s:e])))
    for k, a in enumerate(ann):
        e = ann[k + 1] if k + 1 < len(ann) else len(lines)
        chunks.append(('a%d' % (k + 1), '\n'.join(lines[a:e])))
    for name, body in chunks:
        if name.startswith('a'):  # el títol de l'annex passa a ser el del tema
            body = '\n'.join(body.split('\n')[1:])
        state['check'] = []
        tex = convert(body, state)
        open(os.path.join(OUT, name + '.tex'), 'w', encoding='utf8').write(tex + '\n')
        # comprovació de la numeració
        sec = sub = 0
        for lv, num in state['check']:
            if lv == 2:
                sec += 1; sub = 0
                exp = str(sec)
            elif lv == 3:
                sub += 1
                exp = '%d.%d' % (sec, sub)
            else:
                continue
            if exp != num:
                print('! numeració', name, num, 'esperat', exp, file=sys.stderr)
    print('fets', len(chunks), 'fitxers;', len(allfigs), 'figures')


main()
