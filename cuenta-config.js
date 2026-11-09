/* Configuración de Firebase (cuenta de usuario).
   Es pública por diseño: la seguridad la dan las reglas de Firestore y los dominios autorizados
   (Firebase → Authentication → Configuración → Dominios autorizados).
   Con valor null el botón de cuenta permanece oculto para el público (vista previa: ?cuenta=1). */
window.MK_FIREBASE = {
  apiKey: "AIzaSyCvv8c2Pic9-Ak_rU1_0pmwGV4atfnq7O4",
  authDomain: "menudo-kanteo-7dfee.firebaseapp.com",
  projectId: "menudo-kanteo-7dfee",
  storageBucket: "menudo-kanteo-7dfee.firebasestorage.app",
  messagingSenderId: "591109500680",
  appId: "1:591109500680:web:8ee99bc5dd76ee593b86bd"
};
