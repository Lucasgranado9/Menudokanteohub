#!/usr/bin/env python3
"""Figures addicionals dels apunts de Mates II (matplotlib -> PDF vectorial a latex/mates/fig/).
Mateixa paleta que les figures de figm/: negre #17171a, vermell #c8102e, blau #1f62b0, gris #8b8b93."""
import os, sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Ellipse, FancyArrowPatch, Rectangle

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'latex', 'mates', 'fig')
os.makedirs(OUT, exist_ok=True)
INK, RED, BLUE, GREY = '#17171a', '#c8102e', '#1f62b0', '#8b8b93'
plt.rcParams.update({'font.family': 'serif', 'mathtext.fontset': 'cm', 'font.size': 9, 'axes.linewidth': 0.8,
                     'pdf.fonttype': 42, 'savefig.pad_inches': 0.03})


def save(fig, name):
    fig.savefig(os.path.join(OUT, name + '.pdf'), bbox_inches='tight')
    plt.close(fig)


def axes2d(ax, xlim, ylim, xl='$x$', yl='$y$', origin=True, ticks=None):
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.axis('off')
    ax.set_aspect('auto')
    x0 = 0 if origin and xlim[0] < 0 < xlim[1] else xlim[0]
    y0 = 0 if origin and ylim[0] < 0 < ylim[1] else ylim[0]
    kw = dict(arrowstyle='-|>', color=INK, lw=0.9, mutation_scale=7, shrinkA=0, shrinkB=0)
    ax.add_patch(FancyArrowPatch((xlim[0], y0), (xlim[1], y0), **kw))
    ax.add_patch(FancyArrowPatch((x0, ylim[0]), (x0, ylim[1]), **kw))
    ax.text(xlim[1], y0, xl, ha='left', va='top', fontsize=9, style='italic')
    ax.text(x0, ylim[1], yl, ha='right', va='bottom', fontsize=9, style='italic')


def dot(ax, x, y, c=INK, s=22, z=5):
    ax.scatter([x], [y], s=s, color=c, zorder=z, linewidths=0)


# ------------------------------------------------------------------ 3D oblique
def P(p, k=(0.5, 0.45)):
    x, y, z = p
    return (x + k[0] * y, z + k[1] * y)


def poly(ax, pts, fc, ec, alpha=0.30, lw=0.9, z=2, ls='-'):
    ax.add_patch(Polygon([P(p) for p in pts], closed=True, lw=lw, zorder=z, ls=ls,
                         facecolor=matplotlib.colors.to_rgba(fc, alpha), edgecolor=matplotlib.colors.to_rgba(ec, 0.95)))


def seg(ax, a, b, c=INK, lw=1.6, z=6, ls='-'):
    A, B = P(a), P(b)
    ax.plot([A[0], B[0]], [A[1], B[1]], color=c, lw=lw, zorder=z, ls=ls, solid_capstyle='round')


def pt3(ax, p, c=INK, s=20, z=7):
    A = P(p); ax.scatter([A[0]], [A[1]], s=s, color=c, zorder=z, linewidths=0)


def txt3(ax, p, s, dx=0, dy=0, c=INK, ha='left', va='center', fs=8.5):
    A = P(p); ax.text(A[0] + dx, A[1] + dy, s, color=c, ha=ha, va=va, fontsize=fs)


def arrow3(ax, a, b, c=INK, lw=1.3, z=7):
    A, B = P(a), P(b)
    ax.add_patch(FancyArrowPatch(A, B, arrowstyle='-|>', color=c, lw=lw, mutation_scale=8, shrinkA=0, shrinkB=0, zorder=z))


def rect(o, u, v):
    o, u, v = map(np.array, (o, u, v))
    return [o, o + u, o + u + v, o + v]


def prep(w, h, xl, yl):
    fig = plt.figure(figsize=(w, h)); ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(*xl); ax.set_ylim(*yl); ax.axis('off'); ax.set_aspect('equal'); return fig, ax


BLU, REDC, GRN = BLUE, RED, '#2a8a4a'

# ---------------------------------------------------------------- tema 10
def fig_two_planes():
    fig, axs = plt.subplots(1, 3, figsize=(6.4, 1.9), gridspec_kw=dict(wspace=0.02))
    for a in axs: a.set_xlim(-0.4, 5.9); a.set_ylim(-1.5, 3.2); a.axis('off'); a.set_aspect('equal')
    a = axs[0]  # coincidents
    poly(a, rect((0, 0, 0), (4, 0, 0), (0, 2.2, 0)), BLU, BLU, 0.30)
    poly(a, rect((0.12, 0.1, 0.02), (4, 0, 0), (0, 2.2, 0)), REDC, REDC, 0.22, ls='--')
    txt3(a, (2.2, 1.1, 0), r'$\pi=\pi^{\prime}$', c=INK, ha='center', fs=9)
    a.set_title('Coincidents', fontsize=9, y=-0.02, va='top')
    a = axs[1]  # paral.lels
    poly(a, rect((0, 0, 0), (4, 0, 0), (0, 2.2, 0)), BLU, BLU, 0.30)
    poly(a, rect((0.2, 0.15, 1.3), (4, 0, 0), (0, 2.2, 0)), REDC, REDC, 0.25)
    txt3(a, (4.1, 0.2, 0), r'$\pi$', c=BLU, fs=9); txt3(a, (4.3, 0.35, 1.3), r"$\pi^{\prime}$", c=REDC, fs=9)
    a.set_title('Paral·lels', fontsize=9, y=-0.02, va='top')
    a = axs[2]  # secants
    poly(a, rect((0, 0, 0), (4, 0, 0), (0, 2.4, 0)), BLU, BLU, 0.28)
    poly(a, rect((0, 1.2, -1.0), (4, 0, 0), (0, 0, 2.6)), REDC, REDC, 0.25, z=3)
    seg(a, (0, 1.2, 0), (4, 1.2, 0), INK, 2.0)
    txt3(a, (4.1, 1.2, 0), r'$r$', fs=9)
    txt3(a, (3.9, 0.1, 0), r'$\pi$', c=BLU, fs=9); txt3(a, (4.1, 1.3, 1.4), r"$\pi^{\prime}$", c=REDC, fs=9)
    a.set_title('Secants', fontsize=9, y=-0.02, va='top')
    save(fig, 'm10_f19')


def fig_line_plane():
    fig, axs = plt.subplots(1, 3, figsize=(6.4, 1.9), gridspec_kw=dict(wspace=0.02))
    for a in axs: a.set_xlim(-0.4, 5.9); a.set_ylim(-1.5, 3.2); a.axis('off'); a.set_aspect('equal')
    base = lambda a: poly(a, rect((0, 0, 0), (4, 0, 0), (0, 2.4, 0)), BLU, BLU, 0.26)
    a = axs[0]; base(a)
    seg(a, (2.0, 0.2, -1.1), (2.0, 1.1, 0), REDC, 1.8); seg(a, (2.0, 1.1, 0), (2.0, 1.9, 1.5), REDC, 1.8, z=6)
    pt3(a, (2.0, 1.1, 0), INK, 24); txt3(a, (2.0, 1.1, 0), r'$P$', 0.12, -0.18)
    txt3(a, (2.0, 1.9, 1.5), r'$r$', 0.1, 0.05, REDC); txt3(a, (3.9, 0.1, 0), r'$\pi$', c=BLU, fs=9)
    a.set_title('Secants (un punt)', fontsize=9, y=-0.02, va='top')
    a = axs[1]; base(a)
    seg(a, (0.3, 0.6, 0), (3.7, 1.8, 0), REDC, 1.8)
    txt3(a, (3.7, 1.8, 0), r'$r\subset\pi$', 0.1, 0.1, REDC); txt3(a, (3.9, 0.1, 0), r'$\pi$', c=BLU, fs=9)
    a.set_title('Continguda', fontsize=9, y=-0.02, va='top')
    a = axs[2]; base(a)
    seg(a, (0.3, 0.6, 1.2), (3.7, 1.8, 1.2), REDC, 1.8)
    txt3(a, (3.7, 1.8, 1.2), r'$r$', 0.1, 0.1, REDC); txt3(a, (3.9, 0.1, 0), r'$\pi$', c=BLU, fs=9)
    a.set_title('Paral·lela', fontsize=9, y=-0.02, va='top')
    save(fig, 'm10_f20')


def fig_three_planes():
    fig, axs = plt.subplots(2, 3, figsize=(6.4, 3.9), gridspec_kw=dict(wspace=0.02, hspace=0.18))
    for a in axs.flat: a.set_xlim(-1.6, 5.6); a.set_ylim(-1.9, 3.1); a.axis('off'); a.set_aspect('equal')
    cols = [BLU, REDC, GRN]
    # a) coincidents
    a = axs[0, 0]
    for i, c in enumerate(cols):
        poly(a, rect((0.1 * i, 0.08 * i, 0.02 * i), (4, 0, 0), (0, 2.2, 0)), c, c, 0.2, ls=['-', '--', ':'][i])
    a.set_title('(a) Coincidents', fontsize=8.5, y=-0.02, va='top')
    # b) paral.lels
    a = axs[0, 1]
    for i, c in enumerate(cols):
        poly(a, rect((0.15 * i, 0.1 * i, 0.9 * i - 0.4), (4, 0, 0), (0, 2.2, 0)), c, c, 0.22)
    a.set_title('(b) Paral·lels', fontsize=8.5, y=-0.02, va='top')
    # c) feix (una recta comuna)
    a = axs[0, 2]
    for th, c in zip([0, 60, 120], cols):
        t = np.radians(th); u = np.array([0, np.cos(t), np.sin(t)])
        poly(a, [np.array([0, 0, 0]) - 1.2 * u, np.array([4, 0, 0]) - 1.2 * u, np.array([4, 0, 0]) + 1.2 * u, np.array([0, 0, 0]) + 1.2 * u], c, c, 0.22)
    seg(a, (0, 0, 0), (4, 0, 0), INK, 2.0)
    a.set_title('(c) Secants en una recta', fontsize=8.5, y=-0.02, va='top')
    # d) prisma
    a = axs[1, 0]
    A, B, C = np.array([0, 0]), np.array([2.0, 0]), np.array([1.0, 1.7])
    for (p, q), c in zip([(A, B), (B, C), (C, A)], cols):
        d = q - p; s0, s1 = p - 0.3 * d, q + 0.3 * d
        poly(a, [np.array([0, s0[0], s0[1]]), np.array([4, s0[0], s0[1]]), np.array([4, s1[0], s1[1]]), np.array([0, s1[0], s1[1]])], c, c, 0.22)
    for v in (A, B, C): seg(a, (0, v[0], v[1]), (4, v[0], v[1]), INK, 1.4)
    a.set_title('(d) Prisma', fontsize=8.5, y=-0.02, va='top')
    # e) dos paral.lels + secant
    a = axs[1, 1]
    poly(a, rect((0, 0, -0.1), (4, 0, 0), (0, 2.2, 0)), BLU, BLU, 0.22)
    poly(a, rect((0, 0, 1.1), (4, 0, 0), (0, 2.2, 0)), REDC, REDC, 0.22)
    poly(a, rect((0, 1.1, -0.7), (4, 0, 0), (0, 0, 2.5)), GRN, GRN, 0.25, z=3)
    seg(a, (0, 1.1, -0.1), (4, 1.1, -0.1), INK, 1.5); seg(a, (0, 1.1, 1.1), (4, 1.1, 1.1), INK, 1.5)
    a.set_title('(e) Dos paral·lels i un secant', fontsize=8.5, y=-0.02, va='top')
    # f) triedre
    a = axs[1, 2]
    poly(a, rect((-1.4, -1.0, 0), (2.8, 0, 0), (0, 2.0, 0)), BLU, BLU, 0.2)
    poly(a, rect((0, -1.0, -1.1), (0, 2.0, 0), (0, 0, 2.2)), REDC, REDC, 0.2)
    poly(a, rect((-1.4, 0, -1.1), (2.8, 0, 0), (0, 0, 2.2)), GRN, GRN, 0.2)
    pt3(a, (0, 0, 0), INK, 28)
    a.set_title('(f) Triedre (un punt)', fontsize=8.5, y=-0.02, va='top')
    save(fig, 'x10_three_planes')


def fig_two_lines():
    fig, axs = plt.subplots(2, 2, figsize=(6.4, 4.6), gridspec_kw=dict(wspace=0.04, hspace=0.18))
    for a in axs.flat: a.set_xlim(-0.6, 6.3); a.set_ylim(-0.7, 3.2); a.axis('off'); a.set_aspect('equal')
    ref = lambda a: poly(a, rect((0, 0, 0), (4.6, 0, 0), (0, 2.6, 0)), GREY, GREY, 0.10, lw=0.5)
    a = axs[0, 0]; ref(a)
    seg(a, (0.3, 0.4, 0), (4.2, 2.2, 0), BLU, 2.0); seg(a, (0.5, 2.2, 0), (4.0, 0.3, 0), REDC, 2.0)
    I = (2.2, 1.28, 0); pt3(a, I, INK, 30); txt3(a, I, '$I$', 0.12, -0.2)
    txt3(a, (4.2, 2.2, 0), '$r$', 0.12, 0.05, BLU); txt3(a, (4.0, 0.3, 0), '$s$', 0.12, -0.05, REDC)
    arrow3(a, (0.5, 0.5, 0), (1.3, 0.9, 0), BLU, 1.3); arrow3(a, (3.2, 0.78, 0), (3.6, 0.55, 0), REDC, 1.3)
    a.set_title('(a) Secants: un punt en comú', fontsize=8.5, y=-0.01, va='top')
    a = axs[0, 1]; ref(a)
    seg(a, (0.3, 0.6, 0), (4.3, 0.6, 0), BLU, 2.0); seg(a, (0.3, 2.0, 0), (4.3, 2.0, 0), REDC, 2.0)
    arrow3(a, (0.6, 0.6, 0), (1.6, 0.6, 0), BLU, 1.3); arrow3(a, (0.6, 2.0, 0), (1.6, 2.0, 0), REDC, 1.3)
    txt3(a, (4.3, 0.6, 0), '$r$', 0.12, 0, BLU); txt3(a, (4.3, 2.0, 0), '$s$', 0.12, 0, REDC)
    txt3(a, (1.0, 0.6, 0), r'$\vec u$', 0, -0.2, BLU, ha='center'); txt3(a, (1.0, 2.0, 0), r'$\vec v=\lambda\vec u$', 0.0, 0.18, REDC, ha='center')
    a.set_title('(b) Paral·leles: mateixa direcció', fontsize=8.5, y=-0.01, va='top')
    a = axs[1, 0]; ref(a)
    seg(a, (0.3, 1.3, 0), (4.3, 1.3, 0), BLU, 3.4); seg(a, (0.3, 1.3, 0), (4.3, 1.3, 0), REDC, 1.4, ls=(0, (4, 3)))
    txt3(a, (4.3, 1.3, 0), '$r=s$', 0.12, 0, INK)
    a.set_title('(c) Coincidents: tots els punts en comú', fontsize=8.5, y=-0.01, va='top')
    a = axs[1, 1]; ref(a)
    seg(a, (0.3, 0.4, 0), (4.2, 2.2, 0), BLU, 2.0)
    seg(a, (1.2, 2.3, 1.5), (3.4, 0.2, 1.5), REDC, 2.0)
    X = (2.3, 1.28, 0); Y = (2.3, 1.28 + 0.0, 1.5)
    seg(a, X, (2.3, 1.28, 1.5), GREY, 1.0, ls=(0, (2, 2)))
    pt3(a, X, BLU, 18); pt3(a, (2.3, 1.28, 1.5), REDC, 18)
    txt3(a, (2.3, 1.28, 0.75), '$d$', 0.12, 0, INK)
    txt3(a, (4.2, 2.2, 0), '$r$', 0.12, 0.05, BLU); txt3(a, (3.4, 0.2, 1.5), '$s$', 0.12, 0.05, REDC)
    a.set_title("(d) S'encreuen: no són coplanàries", fontsize=8.5, y=-0.01, va='top')
    save(fig, 'x10_two_lines')


def fig_line_three_ways():
    fig, axs = plt.subplots(1, 3, figsize=(6.6, 2.2), gridspec_kw=dict(wspace=0.02))
    for a in axs: a.set_xlim(-0.5, 6.0); a.set_ylim(-2.0, 3.5); a.axis('off'); a.set_aspect('equal')
    a = axs[0]  # punt i vector
    seg(a, (0.2, 0.6, 0.1), (5.0, 1.4, 0.7), INK, 2.0)
    arrow3(a, (1.9, 0.9, 0.3), (3.4, 1.15, 0.5), REDC, 2.0)
    pt3(a, (1.9, 0.9, 0.3), REDC, 32)
    txt3(a, (1.9, 0.9, 0.3), '$P$', -0.05, -0.28, REDC, ha='center', fs=9.5)
    txt3(a, (3.3, 1.1, 0.5), r'$\vec u$', 0.0, 0.3, REDC, ha='center', fs=9.5); txt3(a, (5.0, 1.4, 0.7), '$r$', 0.12, 0.1)
    a.set_title('un punt $P$ i un vector $\\vec u$', fontsize=8.8, y=0.0, va='top')
    a = axs[1]  # dos plans
    poly(a, rect((0, 0, 0), (4.6, 0, 0), (0, 2.6, 0)), BLU, BLU, 0.26)
    d = np.array([0, 0.9, 1.5])
    poly(a, [np.array([0, 1.3, 0]) - 0.9 * d, np.array([4.6, 1.3, 0]) - 0.9 * d, np.array([4.6, 1.3, 0]) + 1.0 * d, np.array([0, 1.3, 0]) + 1.0 * d], REDC, REDC, 0.24, z=3)
    seg(a, (0, 1.3, 0), (4.6, 1.3, 0), INK, 2.6)
    txt3(a, (4.7, 1.3, 0), '$r$', 0.1, 0.0, INK, fs=9.5)
    txt3(a, (0.05, 0.1, 0), r'$\pi_1$', 0.0, 0.0, BLU, fs=9.5); txt3(a, (4.4, 2.2, 1.5) if False else (0.0, 1.3, 0) , '', 0, 0)
    t = P(np.array([0, 1.3, 0]) + 1.0 * d); a.text(t[0] + 0.1, t[1] - 0.1, r'$\pi_2$', color=REDC, fontsize=9.5)
    a.set_title('intersecció de dos plans', fontsize=8.8, y=0.0, va='top')
    a = axs[2]  # punt i pla perpendicular
    poly(a, rect((0, 0, 0), (4.6, 0, 0), (0, 2.6, 0)), GREY, GREY, 0.18)
    C = (2.3, 1.3, 0)
    seg(a, (2.3, 1.3, -0.8), (2.3, 1.3, 2.7), INK, 2.4)
    pt3(a, C, REDC, 32); txt3(a, C, '$P$', 0.14, -0.22, REDC, fs=9.5)
    txt3(a, (2.3, 1.3, 2.7), '$r$', 0.12, 0.05); txt3(a, (4.3, 0.2, 0), r'$\pi$', 0, 0, INK, fs=9.5)
    sq = [(2.3, 1.3, 0), (2.62, 1.3, 0), (2.62, 1.3, 0.34), (2.3, 1.3, 0.34)]
    xs = [P(q) for q in sq]; a.plot([xs[1][0], xs[2][0], xs[3][0]], [xs[1][1], xs[2][1], xs[3][1]], color=INK, lw=0.7, zorder=8)
    a.set_title('un punt $P$ i un pla $\\pi\\perp r$', fontsize=8.8, y=0.0, va='top')
    save(fig, 'm09_f17')


def fig_perp_planes():
    fig, ax = prep(2.6, 1.9, (-0.8, 4.2), (-1.5, 2.6))
    poly(ax, rect((0, 0, 0), (3.6, 0, 0), (0, 2.2, 0)), BLU, BLU, 0.25)
    poly(ax, rect((0, 1.1, -0.2), (3.6, 0, 0), (0, 0, 2.3)), REDC, REDC, 0.22, z=3)
    seg(ax, (0, 1.1, 0), (3.6, 1.1, 0), INK, 1.8)
    arrow3(ax, (1.3, 0.55, 0), (1.3, 0.55, 1.1), BLU); arrow3(ax, (2.4, 1.1, 0.9), (2.4, 2.1, 0.9), REDC)
    txt3(ax, (1.3, 0.55, 1.1), r"$\vec n$", 0.08, 0.1, BLU); txt3(ax, (2.4, 2.1, 0.9), r"$\vec n^{\prime}$", 0.1, 0.05, REDC)
    save(fig, 'x10_perp_planes')


# ---------------------------------------------------------------- tema 1
def fig_secant_tangent():
    fig, ax = plt.subplots(figsize=(4.4, 2.7))
    f = lambda x: 0.22 * (x - 0.6) ** 2 + 0.55
    df = lambda x: 0.44 * (x - 0.6)
    axes2d(ax, (-0.2, 6.6), (-0.15, 4.4))
    xs = np.linspace(0.2, 5.9, 200); ax.plot(xs, f(xs), color=INK, lw=1.8)
    a = 1.3
    for h, c in [(3.6, GREY), (2.3, GREY), (1.2, BLUE)]:
        m = (f(a + h) - f(a)) / h
        xx = np.linspace(a - 0.9, a + h + 0.7, 20); ax.plot(xx, f(a) + m * (xx - a), color=c, lw=1.0, ls='--')
        dot(ax, a + h, f(a + h), c, 16)
    xx = np.linspace(a - 1.0, a + 4.2, 20); ax.plot(xx, f(a) + df(a) * (xx - a), color=RED, lw=1.7)
    dot(ax, a, f(a), INK, 28)
    ax.plot([a, a], [0, f(a)], color=GREY, lw=0.6, ls=':'); ax.text(a, -0.1, '$a$', ha='center', va='top')
    ax.text(a + 0.12, f(a) + 0.28, '$P$', fontsize=9)
    ax.text(5.55, 1.55, 'tangent', color=RED, fontsize=8.5, ha='left')
    ax.text(3.2, 4.15, 'secants', color=GREY, fontsize=8.5)
    ax.text(a + 1.25, 0.15, '$h\\to 0$', color=BLUE, fontsize=8.5)
    save(fig, 'x01_secant_tangent')


def fig_nonderiv():
    fig, axs = plt.subplots(1, 4, figsize=(6.4, 1.7), gridspec_kw=dict(wspace=0.15))
    x = np.linspace(-1, 1, 400)
    cases = [(np.abs(x), r'$y=|x|$', 'punt angulós', (-1, 1.1)),
             (np.abs(x) ** (2 / 3), r'$y=x^{2/3}$', 'punt cuspidal', (-1, 1.1)),
             (np.cbrt(x), r'$y=\sqrt[3]{x}$', 'tangent vertical', (-1.1, 1.1)),
             (np.where(x < 0, x, x + 0.0), r'', '', (-1, 1))]
    for a, (y, t, sub, yl) in zip(axs[:3], cases[:3]):
        axes2d(a, (-1.25, 1.35), (yl[0] - 0.1, yl[1] + 0.2), xl='', yl='')
        a.plot(x, y, color=INK, lw=1.6); dot(a, 0, 0, RED, 20)
        a.set_title(t, fontsize=9, y=-0.02, va='top'); a.text(0, yl[1] + 0.45, sub, ha='center', fontsize=7.8, color=GREY)
    a = axs[3]
    axes2d(a, (-1.25, 1.35), (-0.6, 1.3), xl='', yl='')
    xl = np.linspace(-1, 0, 50); xr = np.linspace(0, 1, 50)
    a.plot(xl, xl ** 2 * 0 + 0.5 * (xl + 1), color=INK, lw=1.6); a.plot(xr, np.full_like(xr, 1.0), color=INK, lw=1.6)
    a.scatter([0], [0.5], s=22, facecolors='white', edgecolors=INK, zorder=5); dot(a, 0, 1.0, RED, 20)
    a.set_title('salt', fontsize=9, y=-0.02, va='top'); a.text(0, 1.75, 'no contínua', ha='center', fontsize=7.8, color=GREY)
    save(fig, 'x01_nonderiv')


# ---------------------------------------------------------------- tema 3
def fig_box_net():
    fig, ax = plt.subplots(figsize=(4.9, 2.3))
    ax.set_xlim(-0.5, 12.6); ax.set_ylim(-0.5, 4.6); ax.axis('off'); ax.set_aspect('equal')
    L = 3.2; x = 0.8
    # plantilla
    sq = lambda o, w, c='none', ls='-': ax.add_patch(Rectangle(o, w[0], w[1], fc=c, ec=INK, lw=1.0, ls=ls))
    ax.add_patch(Rectangle((0, 0), L, L, fc='#f1f1f3', ec=INK, lw=1.2))
    for (ox, oy) in [(0, 0), (L - x, 0), (0, L - x), (L - x, L - x)]:
        ax.add_patch(Rectangle((ox, oy), x, x, fc='white', ec=RED, lw=1.0, ls='--'))
    ax.text(x / 2, x / 2, '$x$', ha='center', va='center', color=RED, fontsize=8.5)
    ax.annotate('', xy=(0, -0.28), xytext=(L, -0.28), arrowprops=dict(arrowstyle='<->', lw=0.8, color=GREY))
    ax.text(L / 2, -0.55, '$12$ cm', ha='center', va='top', fontsize=8.5)
    ax.annotate('', xy=(x, L + 0.15), xytext=(L - x, L + 0.15), arrowprops=dict(arrowstyle='<->', lw=0.8, color=BLUE))
    ax.text(L / 2, L + 0.3, '$12-2x$', ha='center', va='bottom', fontsize=8.5, color=BLUE)
    ax.annotate('', xy=(5.0, 1.9), xytext=(4.4, 1.9), arrowprops=dict(arrowstyle='-|>', lw=1.1, color=INK))
    # caixa
    o = np.array([6.6, 0.0]); w, d, h = 3.0, 1.4, 1.5
    A = lambda p: (o[0] + p[0] + 0.55 * p[1], o[1] + p[2] + 0.38 * p[1])
    def face(pts, fc):
        ax.add_patch(Polygon([A(p) for p in pts], closed=True, fc=fc, ec=INK, lw=1.0))
    face([(0, 0, 0), (w, 0, 0), (w, 0, h), (0, 0, h)], '#e9ecf3')
    face([(w, 0, 0), (w, d, 0), (w, d, h), (w, 0, h)], '#d7dbe6')
    face([(0, 0, h), (w, 0, h), (w, d, h), (0, d, h)], '#f6f7fa')
    ax.annotate('', xy=A((w + 0.25, 0, 0)), xytext=A((w + 0.25, 0, h)), arrowprops=dict(arrowstyle='<->', lw=0.8, color=RED))
    ax.text(A((w + 0.25, 0, h / 2))[0] + 0.15, A((w + 0.25, 0, h / 2))[1], '$x$', color=RED, fontsize=8.5, va='center')
    ax.text(A((w / 2, 0, -0.1))[0], A((w / 2, 0, -0.1))[1] - 0.15, '$12-2x$', color=BLUE, ha='center', va='top', fontsize=8.5)
    save(fig, 'x03_box_net')


def fig_primitives_family():
    fig, ax = plt.subplots(figsize=(3.9, 2.6))
    axes2d(ax, (-2.3, 3.0), (-1.6, 4.6))
    xs = np.linspace(-1.9, 1.9, 200)
    for C in (-1, 0, 1, 2, 3):
        ax.plot(xs, xs ** 2 + C, color=RED if C == 0 else GREY, lw=1.8 if C == 0 else 1.0)
        ax.text(2.0, 3.6 + C - 3.6 + 0.0 if False else 3.61 + C - 3.6 + 0.35 * 0, '', fontsize=7)
        ax.text(1.97, 3.75 + C - 3.0 - 0.0, '', fontsize=7)
        ax.text(1.95, 3.8 + C - 3.0 - 0.0 - 0.0, '', fontsize=7)
        ax.text(1.95, 3.8 + C, '', fontsize=7)
        ax.text(2.0, 4.0 + C - 0.0 - 0.0 if False else 3.6 + C - 0.0, '', fontsize=7)
    for C in (-1, 0, 1, 2, 3):
        yv = 1.9 ** 2 + C
        if yv <= 4.5: ax.text(2.05, yv, '$C=%d$' % C, fontsize=7.5, color=RED if C == 0 else GREY, va='center')
    ax.plot([1.0, 1.0], [0, 4.0], color=BLUE, lw=0.9, ls='--')
    for C in (-1, 0, 1, 2, 3): dot(ax, 1.0, 1.0 + C, BLUE, 12)
    ax.text(-2.2, 4.3, "$F(x)=x^2+C$", fontsize=8.5)
    save(fig, 'x04_primitives_family')


# ---------------------------------------------------------------- tema 5
def fig_riemann():
    fig, axs = plt.subplots(1, 2, figsize=(6.2, 2.1), gridspec_kw=dict(wspace=0.12))
    f = lambda x: 0.35 * (x - 3) ** 2 * 0 + 1.2 + 0.9 * np.sin(0.85 * x)
    a_, b_, n = 0.6, 6.0, 6
    xs = np.linspace(a_, b_, 200)
    for ax, kind in zip(axs, ['inf', 'sup']):
        axes2d(ax, (0, 6.8), (-0.2, 2.8), xl='', yl='')
        edges = np.linspace(a_, b_, n + 1)
        for i in range(n):
            xx = np.linspace(edges[i], edges[i + 1], 30); y = f(xx)
            h = y.min() if kind == 'inf' else y.max()
            ax.add_patch(Rectangle((edges[i], 0), edges[i + 1] - edges[i], h, fc=BLUE if kind == 'inf' else RED, alpha=0.20, ec=BLUE if kind == 'inf' else RED, lw=0.8))
        ax.plot(xs, f(xs), color=INK, lw=1.7)
        ax.text(a_, -0.18, '$a$', ha='center', va='top'); ax.text(b_, -0.18, '$b$', ha='center', va='top')
        ax.text(3.3, 2.65, 'suma inferior $s_n$' if kind == 'inf' else 'suma superior $S_n$', ha='center', fontsize=8.5, color=BLUE if kind == 'inf' else RED)
    save(fig, 'x05_riemann')


def fig_mean_value_integral():
    fig, ax = plt.subplots(figsize=(3.9, 2.4))
    f = lambda x: 1.4 + 0.9 * np.sin(0.9 * x)
    a_, b_ = 0.6, 5.6
    axes2d(ax, (0, 6.3), (-0.3, 2.9))
    xs = np.linspace(a_, b_, 200); ax.fill_between(xs, 0, f(xs), color=BLUE, alpha=0.12)
    ax.plot(xs, f(xs), color=INK, lw=1.7)
    m = np.trapezoid(f(xs), xs) / (b_ - a_)
    ax.plot([a_, b_], [m, m], color=RED, lw=1.3, ls='--'); ax.plot([a_, a_], [0, f(a_)], color=GREY, lw=0.7); ax.plot([b_, b_], [0, f(b_)], color=GREY, lw=0.7)
    c = xs[np.argmin(np.abs(f(xs) - m))]
    ax.plot([c, c], [0, m], color=RED, lw=0.9, ls=':'); dot(ax, c, m, RED, 22)
    ax.text(c, -0.12, '$c$', ha='center', va='top', color=RED); ax.text(a_, -0.12, '$a$', ha='center', va='top'); ax.text(b_, -0.12, '$b$', ha='center', va='top')
    ax.text(b_ + 0.12, m, '$f(c)$', color=RED, va='center', fontsize=8.5)
    ax.text(3.0, 0.4, 'àrea $=\\int_a^b f=f(c)\\,(b-a)$', ha='center', fontsize=8.5, color=BLUE)
    save(fig, 'x05_mean_value')


def fig_revolution():
    fig, ax = plt.subplots(figsize=(4.4, 2.5))
    ax.set_xlim(-0.5, 7.2); ax.set_ylim(-2.2, 2.4); ax.axis('off'); ax.set_aspect('equal')
    f = lambda x: 0.9 + 0.5 * np.sin(0.9 * x)
    a_, b_ = 0.6, 5.8
    xs = np.linspace(a_, b_, 200)
    ax.add_patch(FancyArrowPatch((0, 0), (6.9, 0), arrowstyle='-|>', color=INK, lw=0.9, mutation_scale=7))
    ax.text(6.95, 0, '$x$', va='top', ha='left')
    ax.fill_between(xs, -f(xs), f(xs), color=BLUE, alpha=0.10)
    ax.plot(xs, f(xs), color=INK, lw=1.6); ax.plot(xs, -f(xs), color=INK, lw=1.0, ls='--')
    for x0 in (a_, 2.0, 3.6, b_):
        r = f(x0); e = Ellipse((x0, 0), 0.5, 2 * r, fc='none', ec=BLUE if x0 not in (a_, b_) else INK, lw=0.9); ax.add_patch(e)
    x0 = 3.6; ax.plot([x0, x0], [0, f(x0)], color=RED, lw=1.2); ax.text(x0 + 0.12, f(x0) / 2, '$f(x)$', color=RED, va='center', fontsize=8.5)
    ax.text(a_, -1.65, '$a$', ha='center'); ax.text(b_, -1.65, '$b$', ha='center')
    ax.text(3.2, 2.05, r'$V=\pi\int_a^b \left[f(x)\right]^2dx$', ha='center', fontsize=9.5)
    save(fig, 'x05_revolution')


# ---------------------------------------------------------------- tema 6
def fig_vector_projection():
    fig, ax = plt.subplots(figsize=(3.9, 2.2))
    ax.set_xlim(-0.4, 5.4); ax.set_ylim(-0.7, 2.7); ax.axis('off'); ax.set_aspect('equal')
    v = np.array([4.6, 0.0]); u = np.array([2.7, 1.9])
    ar = lambda a, b, c, lw=1.6: ax.add_patch(FancyArrowPatch(a, b, arrowstyle='-|>', color=c, lw=lw, mutation_scale=9, shrinkA=0, shrinkB=0))
    ar((0, 0), tuple(v), INK); ar((0, 0), tuple(u), BLUE); ar((0, 0), (u[0], 0), RED, 2.2)
    ax.plot([u[0], u[0]], [0, u[1]], color=GREY, lw=0.9, ls='--')
    ax.add_patch(Rectangle((u[0] - 0.18, 0), 0.18, 0.18, fc='none', ec=GREY, lw=0.7))
    ax.text(v[0] + 0.05, -0.12, r'$\vec v$', va='top'); ax.text(u[0] - 0.1, u[1] + 0.08, r'$\vec u$', color=BLUE, ha='right')
    ax.text(u[0] / 2, -0.12, r'$\mathrm{proj}_{\vec v}\,\vec u$', color=RED, ha='center', va='top', fontsize=8.5)
    ax.text(u[0] + 0.12, u[1] / 2, r"$\vec u-\mathrm{proj}_{\vec v}\vec u$", color=GREY, fontsize=8, va='center')
    ax.add_patch(matplotlib.patches.Arc((0, 0), 1.2, 1.2, theta1=0, theta2=35, color=INK, lw=0.8)); ax.text(0.78, 0.2, r'$\alpha$', fontsize=9)
    save(fig, 'x06_projection')


def fig_vector_basis():
    fig, ax = prep(2.8, 2.2, (-1.2, 3.8), (-1.6, 3.0))
    arrow3(ax, (0, 0, 0), (2.9, 0, 0), INK); arrow3(ax, (0, 0, 0), (0, 2.6, 0), INK); arrow3(ax, (0, 0, 0), (0, 0, 2.4), INK)
    txt3(ax, (2.9, 0, 0), '$X$', 0.08, -0.15); txt3(ax, (0, 2.6, 0), '$Y$', 0.1, 0); txt3(ax, (0, 0, 2.4), '$Z$', 0.08, 0.08)
    for v, n, c in [((1, 0, 0), r'$\vec\imath$', RED), ((0, 1, 0), r'$\vec\jmath$', BLUE), ((0, 0, 1), r'$\vec k$', GRN)]:
        arrow3(ax, (0, 0, 0), v, c, 2.0); txt3(ax, v, n, 0.06, -0.14 if v[2] == 0 else 0.0, c)
    p = (1.8, 1.4, 1.5)
    pt3(ax, p, INK, 24); txt3(ax, p, '$P(x,y,z)$', 0.1, 0.08)
    for a, b in [((0, 0, 0), p)]: seg(ax, a, b, GREY, 0.9, ls=(0, (4, 3)))
    for a, b in [((p[0], 0, 0), (p[0], p[1], 0)), ((0, p[1], 0), (p[0], p[1], 0)), ((p[0], p[1], 0), p), ((p[0], 0, 0), (p[0], 0, p[2])), ((0, 0, p[2]), (p[0], 0, p[2])), ((0, p[1], 0), (0, p[1], p[2])), ((0, 0, p[2]), (0, p[1], p[2])), ((p[0], 0, p[2]), p), ((0, p[1], p[2]), p)]:
        seg(ax, a, b, GREY, 0.5, ls=':')
    save(fig, 'x06_basis')


# ---------------------------------------------------------------- tema 7
def fig_det_area():
    fig, ax = plt.subplots(figsize=(3.4, 2.4))
    ax.set_xlim(-0.5, 5.8); ax.set_ylim(-0.6, 3.6); ax.axis('off'); ax.set_aspect('equal')
    u = np.array([3.2, 0.5]); v = np.array([1.2, 2.5])
    ax.add_patch(Polygon([(0, 0), tuple(u), tuple(u + v), tuple(v)], closed=True, fc=BLUE, alpha=0.15, ec=BLUE, lw=1.0))
    ar = lambda b, c: ax.add_patch(FancyArrowPatch((0, 0), tuple(b), arrowstyle='-|>', color=c, lw=1.8, mutation_scale=9, shrinkA=0, shrinkB=0))
    ar(u, RED); ar(v, INK)
    ax.text(u[0] + 0.1, u[1] - 0.05, r'$(a,c)$', color=RED, va='top'); ax.text(v[0] - 0.05, v[1] + 0.08, r'$(b,d)$', ha='center')
    ax.text((u + v)[0] / 2, (u + v)[1] / 2, r'$S=|ad-bc|$', ha='center', va='center', fontsize=9.5)
    save(fig, 'x07_det_area')


# ---------------------------------------------------------------- tema 9
def fig_plane_point_vectors():
    fig, ax = prep(3.6, 2.4, (-0.8, 4.8), (-1.0, 3.2))
    poly(ax, rect((-0.3, -0.3, -0.2), (3.8, 0, 0.0), (0.4, 2.0, 0.6)), BLU, BLU, 0.18)
    Pp = np.array([1.0, 0.5, 0.15]); u = np.array([1.6, 0, 0.0]); v = np.array([0.4, 1.3, 0.55])
    arrow3(ax, tuple(Pp), tuple(Pp + u), RED, 1.8); arrow3(ax, tuple(Pp), tuple(Pp + v), INK, 1.8)
    X = Pp + 0.7 * u + 0.8 * v
    seg(ax, tuple(Pp + 0.7 * u), tuple(X), GREY, 0.8, ls=(0, (3, 3))); seg(ax, tuple(Pp + 0.8 * v), tuple(X), GREY, 0.8, ls=(0, (3, 3)))
    seg(ax, tuple(Pp), tuple(X), BLUE, 0.9, ls=(0, (1, 2)))
    pt3(ax, tuple(Pp), INK, 24); pt3(ax, tuple(X), BLUE, 24)
    txt3(ax, tuple(Pp), '$P$', -0.12, -0.08, ha='right'); txt3(ax, tuple(X), '$X$', 0.1, 0.04, BLUE)
    txt3(ax, tuple(Pp + u), r'$\vec u$', 0.06, -0.14, RED); txt3(ax, tuple(Pp + v), r'$\vec v$', -0.1, 0.12, INK, ha='right')
    ax.text(3.7, -0.2, r'$\pi$', color=BLUE, fontsize=10)
    save(fig, 'x09_plane_pv')


# ---------------------------------------------------------------- tema 11
def fig_cross_product():
    fig, ax = prep(3.4, 2.6, (-0.6, 4.4), (-1.0, 3.6))
    u = np.array([2.6, 0, 0]); v = np.array([0.7, 1.7, 0.0])
    poly(ax, [np.zeros(3), u, u + v, v], BLU, BLU, 0.20)
    arrow3(ax, (0, 0, 0), tuple(u), RED, 1.8); arrow3(ax, (0, 0, 0), tuple(v), INK, 1.8)
    arrow3(ax, (0, 0, 0), (0, 0, 2.3), GRN, 1.9)
    txt3(ax, tuple(u), r'$\vec u$', 0.08, -0.12, RED); txt3(ax, tuple(v), r'$\vec v$', -0.1, 0.1, INK, ha='right')
    txt3(ax, (0, 0, 2.3), r'$\vec u\times\vec v$', 0.1, 0.05, GRN)
    c = (u + v) / 2; txt3(ax, tuple(c), r'$S=|\vec u\times\vec v|$', 0.0, 0.0, BLUE, ha='center', fs=8.5)
    ax.add_patch(matplotlib.patches.Arc(P((0, 0, 0)), 1.0, 1.0, theta1=0, theta2=40, color=INK, lw=0.7)); ax.text(0.62, 0.12, r'$\alpha$', fontsize=8.5)
    save(fig, 'x11_cross')


def fig_parallelepiped():
    fig, ax = prep(3.6, 2.7, (-0.6, 4.6), (-0.6, 3.6))
    u = np.array([2.6, 0, 0]); v = np.array([0.5, 1.6, 0.0]); w = np.array([0.3, 0.3, 2.1])
    O = np.zeros(3)
    pts = {'o': O, 'u': u, 'v': v, 'w': w, 'uv': u + v, 'uw': u + w, 'vw': v + w, 'uvw': u + v + w}
    poly(ax, [O, u, u + v, v], GREY, GREY, 0.10, z=1)
    poly(ax, [w, u + w, u + v + w, v + w], BLU, BLU, 0.14, z=2)
    poly(ax, [u, u + v, u + v + w, u + w], BLU, BLU, 0.20, z=2)
    poly(ax, [O, u, u + w, w], BLU, BLU, 0.10, z=2)
    for a, b in [('o', 'v'), ('v', 'uv'), ('v', 'vw')]: seg(ax, tuple(pts[a]), tuple(pts[b]), GREY, 0.8, ls=(0, (3, 3)))
    arrow3(ax, tuple(O), tuple(u), RED, 1.8); arrow3(ax, tuple(O), tuple(v), INK, 1.8); arrow3(ax, tuple(O), tuple(w), GRN, 1.8)
    txt3(ax, tuple(u), r'$\vec u$', 0.08, -0.12, RED); txt3(ax, tuple(v), r'$\vec v$', -0.1, 0.0, INK, ha='right'); txt3(ax, tuple(w), r'$\vec w$', -0.1, 0.1, GRN, ha='right')
    txt3(ax, tuple(u + v + w), r'$V=|[\vec u,\vec v,\vec w]|$', 0.1, 0.12, BLUE, fs=8.5)
    save(fig, 'x11_parallelepiped')


# ---------------------------------------------------------------- tema 12
def fig_binomial():
    from math import comb
    n, p = 10, 0.3
    k = np.arange(n + 1); pr = [comb(n, i) * p ** i * (1 - p) ** (n - i) for i in k]
    fig, ax = plt.subplots(figsize=(3.9, 2.2))
    ax.bar(k, pr, color=BLUE, alpha=0.30, edgecolor=BLUE, width=0.78, lw=0.8)
    ax.bar([3], [pr[3]], color=RED, alpha=0.4, edgecolor=RED, width=0.78, lw=0.8)
    for s in ('top', 'right'): ax.spines[s].set_visible(False)
    ax.set_xticks(k); ax.tick_params(length=2, labelsize=8); ax.set_ylabel('$P(X=k)$', fontsize=9); ax.set_xlabel('$k$', fontsize=9)
    ax.text(7.0, 0.22, '$B(10;\\,0{,}3)$', fontsize=9.5, ha='center')
    ax.annotate('$\\mu=np=3$', xy=(3, pr[3]), xytext=(5.6, 0.255), fontsize=8.5, color=RED, arrowprops=dict(arrowstyle='-', color=RED, lw=0.7))
    save(fig, 'x12_binomial')


def phi(x):
    return np.exp(-x ** 2 / 2) / np.sqrt(2 * np.pi)


def fig_standardize():
    fig, axs = plt.subplots(1, 2, figsize=(6.2, 2.0), gridspec_kw=dict(wspace=0.18))
    mu, s = 50, 5
    x = np.linspace(mu - 3.4 * s, mu + 3.4 * s, 300)
    a = axs[0]; a.plot(x, phi((x - mu) / s) / s, color=INK, lw=1.6)
    xs = np.linspace(mu - 3.4 * s, 55.5, 100); a.fill_between(xs, 0, phi((xs - mu) / s) / s, color=BLUE, alpha=0.25)
    a.set_title(r'$X\sim N(50,\,5)$', fontsize=9.5)
    a.set_xticks([35, 40, 45, 50, 55, 60, 65]); a.set_yticks([])
    a.annotate(r'$P(X\leq 55{,}5)$', xy=(53, 0.04), xytext=(57, 0.060), fontsize=8.5, color=BLUE, arrowprops=dict(arrowstyle='-', color=BLUE, lw=0.7))
    b = axs[1]; z = np.linspace(-3.4, 3.4, 300); b.plot(z, phi(z), color=INK, lw=1.6)
    zs = np.linspace(-3.4, 1.1, 100); b.fill_between(zs, 0, phi(zs), color=RED, alpha=0.25)
    b.set_title(r'$Z=\dfrac{X-\mu}{\sigma}\sim N(0,\,1)$', fontsize=9.5); b.set_xticks([-3, -2, -1, 0, 1, 2, 3]); b.set_yticks([])
    b.annotate(r'$P(Z\leq 1{,}1)=\Phi(1{,}1)$', xy=(0.4, 0.2), xytext=(1.2, 0.28), fontsize=8.5, color=RED, arrowprops=dict(arrowstyle='-', color=RED, lw=0.7))
    for ax_ in axs:
        for sp in ('top', 'right', 'left'): ax_.spines[sp].set_visible(False)
        ax_.tick_params(length=2, labelsize=8)
    fig.text(0.5, 0.5, r'$\longrightarrow$', ha='center', va='center', fontsize=14)
    save(fig, 'x12_standardize')


def fig_normal_sym():
    fig, axs = plt.subplots(1, 3, figsize=(6.2, 1.7), gridspec_kw=dict(wspace=0.12))
    z = np.linspace(-3.5, 3.5, 300)
    specs = [(r'$P(Z\leq a)=\Phi(a)$', -3.5, 1.0, [(-3.5, 1.0)], 'a'),
             (r'$P(Z\geq a)=1-\Phi(a)$', 1.0, 3.5, [(1.0, 3.5)], 'a'),
             (r'$P(Z\leq -a)=1-\Phi(a)$', -3.5, -1.0, [(-3.5, -1.0), (1.0, 3.5)], '-a, a')]
    for ax, (t, lo, hi, areas, lab) in zip(axs, specs):
        ax.plot(z, phi(z), color=INK, lw=1.5)
        for (l, h) in areas:
            zs = np.linspace(l, h, 80); ax.fill_between(zs, 0, phi(zs), color=BLUE if len(areas) == 1 else RED, alpha=0.28)
        ax.set_title(t, fontsize=9); ax.set_yticks([]); ax.set_xticks([])
        for sp in ('top', 'right', 'left'): ax.spines[sp].set_visible(False)
        ax.axhline(0, color=INK, lw=0.6)
    axs[0].set_xticks([1.0]); axs[0].set_xticklabels(['$a$']); axs[1].set_xticks([1.0]); axs[1].set_xticklabels(['$a$'])
    axs[2].set_xticks([-1, 1]); axs[2].set_xticklabels(['$-a$', '$a$'])
    for ax in axs: ax.tick_params(length=2, labelsize=8.5)
    save(fig, 'x12_normal_sym')


# ---------------------------------------------------------------- gràfiques elementals (annex)
def panel(ax, f, xlim, ylim, label, asym_v=(), asym_h=(), asym_o=(), n=800, pieces=None, grid=True, ticks=False):
    ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.axis('off')
    ax.add_patch(Rectangle((xlim[0], ylim[0]), xlim[1] - xlim[0], ylim[1] - ylim[0], fc='#fafafb', ec='#d9d9de', lw=0.6, zorder=0))
    kw = dict(arrowstyle='-|>', color=INK, lw=0.7, mutation_scale=5, shrinkA=0, shrinkB=0)
    x0 = 0 if xlim[0] < 0 < xlim[1] else xlim[0]; y0 = 0 if ylim[0] < 0 < ylim[1] else ylim[0]
    ax.add_patch(FancyArrowPatch((xlim[0], y0), (xlim[1], y0), **kw)); ax.add_patch(FancyArrowPatch((x0, ylim[0]), (x0, ylim[1]), **kw))
    for v in asym_v: ax.axvline(v, color=RED, lw=0.7, ls=(0, (3, 2)))
    for h in asym_h: ax.axhline(h, color=RED, lw=0.7, ls=(0, (3, 2)))
    for (m, nn) in asym_o:
        xx = np.array(xlim); ax.plot(xx, m * xx + nn, color=RED, lw=0.7, ls=(0, (3, 2)))
    if pieces is None: pieces = [(xlim[0], xlim[1])]
    for (lo, hi) in pieces:
        x = np.linspace(lo, hi, n); y = f(x)
        with np.errstate(all='ignore'):
            y = np.where((y < ylim[0] - 1e-9) | (y > ylim[1] + 1e-9), np.nan, y)
        # talla salts forts (asímptotes) trencant la línia
        dy = np.abs(np.diff(y)); big = np.where(dy > (ylim[1] - ylim[0]) * 0.5)[0]
        y = y.copy(); y[big] = np.nan
        ax.plot(x, y, color=INK, lw=1.2, solid_capstyle='round')
    ax.set_title(label, fontsize=8.5, y=-0.05, va='top')


FAMILIES = None


def fig_graph_pages():
    s = np.sin; c = np.cos
    pi = np.pi
    pages = []
    # --- pàgina 1
    p1 = [
        ('Funcions lineals', [
            (lambda x: 0 * x + 1.2, (-2.5, 2.5), (-2, 2.5), r'$y=k$', {}),
            (lambda x: x, (-2.5, 2.5), (-2.5, 2.5), r'$y=x$', {}),
            (lambda x: 0.7 * x + 0.5, (-2.5, 2.5), (-2.5, 2.5), r'$y=mx+n$', {})]),
        ('Funcions exponencials', [
            (lambda x: 2 ** x, (-3, 3), (-0.5, 4.5), r'$y=a^x,\;a>1$', {'asym_h': [0]}),
            (lambda x: 0.5 ** x, (-3, 3), (-0.5, 4.5), r'$y=a^x,\;0<a<1$', {'asym_h': [0]}),
            (lambda x: np.exp(-x ** 2), (-3, 3), (-0.5, 1.8), r'$y=e^{-x^2}$', {'asym_h': [0]})]),
        ('Funcions potencials', [
            (lambda x: x ** 2, (-2, 2), (-1, 4), r'$y=x^2$', {}),
            (lambda x: x ** 3, (-1.7, 1.7), (-4, 4), r'$y=x^3$', {}),
            (lambda x: x ** 4 - 2 * x ** 2, (-1.9, 1.9), (-1.6, 3.5), r'$y=x^4-2x^2$', {})]),
        ('Funcions logarítmiques', [
            (lambda x: np.log(x), (0.001, 5), (-3, 2.2), r'$y=\log_a x,\;a>1$', {'asym_v': [0]}),
            (lambda x: -np.log(x), (0.001, 5), (-2.2, 3), r'$y=\log_a x,\;0<a<1$', {'asym_v': [0]}),
            (lambda x: np.log(np.abs(x)), (-5, 5), (-3, 2.2), r'$y=\ln|x|$', {'asym_v': [0], 'pieces': [(-5, -0.001), (0.001, 5)]})]),
        ('Funcions irracionals', [
            (lambda x: np.sqrt(x), (0, 4.5), (-0.5, 2.7), r'$y=\sqrt{x}$', {}),
            (lambda x: np.cbrt(x), (-4, 4), (-2, 2), r'$y=\sqrt[3]{x}$', {}),
            (lambda x: np.sqrt(4 - x ** 2), (-2.4, 2.4), (-0.4, 2.7), r'$y=\sqrt{4-x^2}$', {'pieces': [(-2, 2)]})]),
    ]
    # --- pàgina 2
    p2 = [
        ('Funcions racionals', [
            (lambda x: 1 / x, (-4, 4), (-4, 4), r'$y=\dfrac{1}{x}$', {'asym_v': [0], 'asym_h': [0], 'pieces': [(-4, -0.001), (0.001, 4)]}),
            (lambda x: 1 / x ** 2, (-3, 3), (-0.5, 4), r'$y=\dfrac{1}{x^2}$', {'asym_v': [0], 'asym_h': [0], 'pieces': [(-3, -0.001), (0.001, 3)]}),
            (lambda x: 1 / (x ** 2 - 1), (-3, 3), (-4, 4), r'$y=\dfrac{1}{x^2-1}$', {'asym_v': [-1, 1], 'asym_h': [0], 'pieces': [(-3, -1.001), (-0.999, 0.999), (1.001, 3)]}),
            (lambda x: (x ** 2) / (x - 1), (-3, 5), (-6, 8), r'$y=\dfrac{x^2}{x-1}$', {'asym_v': [1], 'asym_o': [(1, 1)], 'pieces': [(-3, 0.999), (1.001, 5)]}),
            (lambda x: x / (x ** 2 + 1), (-5, 5), (-0.8, 0.8), r'$y=\dfrac{x}{x^2+1}$', {'asym_h': [0]}),
            (lambda x: 1 / (x ** 2 + 1), (-4, 4), (-0.3, 1.3), r'$y=\dfrac{1}{x^2+1}$', {'asym_h': [0]})]),
        ('Funcions trigonomètriques', [
            (lambda x: s(x), (-2 * pi, 2 * pi), (-1.6, 1.6), r'$y=\sin x$', {}),
            (lambda x: c(x), (-2 * pi, 2 * pi), (-1.6, 1.6), r'$y=\cos x$', {}),
            (lambda x: np.tan(x), (-2 * pi, 2 * pi), (-4, 4), r'$y=\tan x$', {'asym_v': [-3 * pi / 2, -pi / 2, pi / 2, 3 * pi / 2]}),
            (lambda x: 1 / np.tan(x), (-2 * pi, 2 * pi), (-4, 4), r'$y=\cot x$', {'asym_v': [-2 * pi, -pi, 0, pi, 2 * pi]}),
            (lambda x: 1 / c(x), (-2 * pi, 2 * pi), (-4, 4), r'$y=\sec x$', {'asym_v': [-3 * pi / 2, -pi / 2, pi / 2, 3 * pi / 2]}),
            (lambda x: 1 / s(x), (-2 * pi, 2 * pi), (-4, 4), r'$y=\csc x$', {'asym_v': [-2 * pi, -pi, 0, pi, 2 * pi]})]),
    ]
    # --- pàgina 3
    p3 = [
        ('Funcions trigonomètriques inverses', [
            (lambda x: np.arcsin(x), (-1, 1), (-1.9, 1.9), r'$y=\arcsin x$', {}),
            (lambda x: np.arccos(x), (-1, 1), (-0.4, 3.5), r'$y=\arccos x$', {}),
            (lambda x: np.arctan(x), (-6, 6), (-2, 2), r'$y=\arctan x$', {'asym_h': [pi / 2, -pi / 2]})]),
        ('Funcions hiperbòliques', [
            (lambda x: np.sinh(x), (-2.5, 2.5), (-5, 5), r'$y=\sinh x$', {}),
            (lambda x: np.cosh(x), (-2.5, 2.5), (-0.5, 6), r'$y=\cosh x$', {}),
            (lambda x: np.tanh(x), (-4, 4), (-1.6, 1.6), r'$y=\tanh x$', {'asym_h': [1, -1]})]),
        ('Valor absolut i funcions a trossos', [
            (lambda x: np.abs(x), (-3, 3), (-0.5, 3.2), r'$y=|x|$', {}),
            (lambda x: np.abs(x ** 2 - 1), (-2.5, 2.5), (-0.5, 5), r'$y=|x^2-1|$', {}),
            (lambda x: np.sign(x), (-3, 3), (-1.6, 1.6), r'$y=\mathrm{sgn}(x)$', {'pieces': [(-3, -0.0001), (0.0001, 3)]}),
            (lambda x: x - np.floor(x), (-3, 3), (-0.4, 1.6), r'$y=x-E(x)$', {'pieces': [(i, i + 0.9999) for i in range(-3, 3)]}),
            (lambda x: np.floor(x), (-3, 3), (-3.5, 3.5), r'$y=E(x)$', {'pieces': [(i, i + 0.9999) for i in range(-3, 3)]})]),
    ]
    return [p1, p2, p3]


def draw_page(fams, name, w=6.6):
    """Una columna: cada família = títol + files de 3 panells (2,15 in x 1,15 in)."""
    ROW, TIT = 1.64, 0.34
    H = sum(TIT + ((len(f[1]) + 2) // 3) * ROW for f in fams) + 0.05
    fig = plt.figure(figsize=(w, H))
    y = H
    for title, items in fams:
        fig.text(0.5, y / H, title, ha='center', va='top', fontsize=10.5, fontweight='bold')
        y -= TIT
        for r in range((len(items) + 2) // 3):
            for j, (f, xl, yl, lab, kw) in enumerate(items[r * 3:(r + 1) * 3]):
                ax = fig.add_axes([0.005 + j * 0.3333, (y - 1.18) / H, 0.3333 - 0.012, 1.15 / H])
                panel(ax, f, xl, yl, lab, **kw)
            y -= ROW
    fig.savefig(os.path.join(OUT, name + '.pdf'), bbox_inches='tight', pad_inches=0.05)
    plt.close(fig)


def fig_graphs():
    p1, p2, p3 = fig_graph_pages()
    byname = {f[0]: f for pg in (p1, p2, p3) for f in pg}
    order = [['Funcions lineals', 'Funcions exponencials', 'Funcions potencials', 'Funcions logarítmiques'],
             ['Funcions irracionals', 'Funcions racionals', 'Funcions trigonomètriques inverses'],
             ['Funcions trigonomètriques', 'Funcions hiperbòliques', 'Valor absolut i funcions a trossos']]
    for i, names in enumerate(order):
        draw_page([byname[n] for n in names], 'x_graphs%d' % (i + 1))


ALL = [fig_line_three_ways, fig_two_planes, fig_line_plane, fig_three_planes, fig_two_lines, fig_perp_planes, fig_secant_tangent, fig_nonderiv,
       fig_box_net, fig_primitives_family, fig_riemann, fig_mean_value_integral, fig_revolution, fig_vector_projection,
       fig_vector_basis, fig_det_area, fig_plane_point_vectors, fig_cross_product, fig_parallelepiped, fig_binomial,
       fig_standardize, fig_normal_sym, fig_graphs]

if __name__ == '__main__':
    only = sys.argv[1:]
    for f in ALL:
        if only and f.__name__ not in only: continue
        f(); print('ok', f.__name__)
