/* Genera los iconos de la app reduciendo los originales de 512 px (icons/icon-512.png y icons/maskable-512.png).
   Solo se reduce, nunca se amplía, para que queden siempre nítidos.
   Uso: node tools/make-icons.js   (necesita el paquete «sharp») */
const sharp = require('sharp'), path = require('path');
const dir = path.join(__dirname, '..', 'icons');
async function down(srcName, size, name) {
  await sharp(path.join(dir, srcName)).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(path.join(dir, name));
  console.log(name, size);
}
(async () => {
  for (const s of [48, 72, 96, 144, 256, 384]) await down('icon-512.png', s, `icon-${s}.png`);
  await down('maskable-512.png', 192, 'maskable-192.png');
  for (const s of [167, 152, 120]) await down('icon-512.png', s, `apple-touch-${s}.png`);
})();
