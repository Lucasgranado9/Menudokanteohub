# Menudo Kanteo

Portal de estudio para la PAU: Matemàtiques II, Física i Història de la Filosofia.

## Proves automàtiques

`tests/run.js` comprova el portal tal com es publica: enllaços i fitxers, dades, pesos màxims (gzip),
errors de JavaScript, desbordaments en mòbil, accessibilitat (noms, etiquetes, contrast) i les
interaccions clau (cerca, compartir, simulacres, laboratoris) i el canvi d'idioma català/castellà
(paritat de dades `*.es.json`, interfície sense text en català en mode castellà, apunts amb avís). S'executa sol a cada pujada
(`.github/workflows/ci.yml`) i cada dilluns. En local:

```
cd tests && npm install && npx playwright install chromium && node run.js
```
