# Arquitectura · Menudo Kanteo

Sitio estático (GitHub Pages) sin framework. Las páginas son HTML escrito a mano; el JavaScript y el CSS comunes viven en ficheros propios. `node tools/build.js` mantiene `sw.js`, `sitemap.xml` y `robots.txt`.

## Regla de oro
**La página se identifica por su dirección (`location.pathname`), nunca por el título ni por el texto visible.** Los títulos se pueden reescribir por SEO; el validador (`npm run validate`) falla si algún script se acopla al título.

## Dónde está cada cosa
| Fichero | Qué hace |
|---|---|
| `a/base.css` | Base: reset, tokens de color/tipografía, cabecera, tarjetas, tipografía de apuntes |
| `a/portal.css` | Portal: pestañas, búsqueda, ajustes, menús, scroll narrativo, pie de página |
| `a/pages-info.css` | Páginas informativas (Novedades, Sobre, Aviso legal, Privacidad, Preguntas) |
| `nav.css`, `pm.css`, `vt.css` | Navegación móvil/escritorio, problemas PAU, transiciones entre páginas |
| `ui.css` | **Sistema de diseño**: tokens (`--fs-*`, `--sp-*`, `--r-*`, `--ease-*`, `--mat-*`), materiales, tacto, foco |
| `a/enhance.js` | Mejoras comunes: «Seccions», progreso, enlaces directos, marcadores, lectura |
| `a/i18n.js` | Castellano/catalán: diccionario `data/i18n.es*.json` aplicado al DOM (`window.MKL`) |
| `a/search.js` | Buscador del portal (índice en `data/`) |
| `a/report.js` | «Informar de un error» |
| `a/sw-register.js` | Registro del service worker y aviso «Hi ha una versió nova» |
| `portal.js` | Cabecera, ajustes, compartir, menús |
| `tabs.js`, `foot.js`, `fx.js`, `states.js` | Barra inferior móvil, pie, detalles de sistema, estados vacíos/carga/error |
| `story.js` | Scroll narrativo de la portada e ilustraciones rotatorias |
| `ayuda.js` → `ayuda-chat.js` | Botón del asistente y chat (búsqueda, cálculo, corrector de pasos, gráficas, voz, foto) |
| `demo.js`, `tour.js` | Vídeo de presentación y recorrido de primera visita |
| `racha.js`, `stats.js`, `plan.js`, `logros.js`, `recordar.js`, `focus.js` | Progreso: racha, estadísticas, plan de estudio, logros, recordatorios, concentración |
| `pm.js`, `calc.js`, `cmdk.js`, `peek.js`, `share.js`, `offline.js` | Problemas PAU, calculadora, paleta ⌘K, vista previa, QR, conexión y versión |
| `sw.js` | Service worker: navegación y código con red primero (1,5 s), datos en caché por versión |

## Flujo de trabajo
1. Editar el fichero fuente (HTML/JS/CSS de la tabla).
2. `node tools/build.js` → actualiza `sw.js`, `sitemap.xml`, `robots.txt` (`--check` solo comprueba).
3. `npm run validate` · `node tests/features.js` · `node tests/a11y.js` · `node tests/wcag.js` · `node tests/run.js` (completa, ~9 min).
4. `npm run visual` compara capturas con las de referencia (`tests/visual/`); `-- --update` las regenera.
5. Subir a `main`: el flujo de **Actions** vuelve a ejecutar todo y solo publica si pasa.

## Convenciones
- Un texto nuevo en catalán necesita su entrada en `data/i18n.es*.json` (el validador avisa de los que faltan).
- Movimiento: `prefers-reduced-motion` → equivalentes suaves; materiales translúcidos con alternativa sólida (`prefers-reduced-transparency`, `prefers-contrast`).
- Los scripts no deben depender del título ni de textos traducibles; usar `location.pathname`, clases o `data-*`.
