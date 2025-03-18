import NextAuth from 'next-auth'; // Importa la librería NextAuth.js
import GoogleProvider from 'next-auth/providers/google'; // Importa el proveedor de Google de NextAuth.js.

/**
 * Configura y exporta el manejador de NextAuth.js para la autenticación con Google.
 *
 * Este manejador utiliza el proveedor de Google para la autenticación OAuth 2.0.
 * Las credenciales del cliente de Google se obtienen de las variables de entorno.
 *
 * @type {import("next-auth").NextAuthHandler}
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // Obtiene el ID del cliente de Google de las variables de entorno.
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Obtiene el secreto del cliente de Google de las variables de entorno.
    }),
  ],
});

/**
 * Exporta el manejador para las solicitudes GET y POST.
 * Esto permite que NextAuth.js maneje las solicitudes de autenticación entrantes.
 */
export { handler as GET, handler as POST };