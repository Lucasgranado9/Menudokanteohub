/* Configuración de Firebase (cuenta de usuario).
   Pega aquí el objeto «firebaseConfig» de tu proyecto (Consola Firebase → Configuración del proyecto → Tus apps → Web).
   Es público por diseño: la seguridad la dan las reglas de Firestore y los dominios autorizados.
   Mientras valga null, el botón de cuenta permanece oculto para el público (vista previa: añade ?cuenta=1 a la URL). */
window.MK_FIREBASE = null;
/* Ejemplo:
window.MK_FIREBASE = {
  apiKey: "…", authDomain: "TU-PROYECTO.firebaseapp.com", projectId: "TU-PROYECTO",
  appId: "…"
};
*/
