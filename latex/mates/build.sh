#!/bin/sh
# Compila los apuntes de Mates II: figuras (SVG->PDF), temas (md->tex) y PDF final en pdf/
set -e
cd "$(dirname "$0")"
node ../../tools/svg2pdf.js ../../figm fig
python3 ../../tools/md2tex.py
pdflatex -interaction=nonstopmode main >/dev/null; pdflatex -interaction=nonstopmode main >/dev/null; pdflatex -interaction=nonstopmode main >/dev/null
cp main.pdf ../../pdf/Apunts_Matematiques_II.pdf
