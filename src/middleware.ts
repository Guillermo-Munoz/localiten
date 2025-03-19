import { NextResponse } from 'next/server'; // Para manejar respuestas HTTP
import { getToken } from 'next-auth/jwt'; // Para obtener el token de autenticación
import { NextRequest } from 'next/server'; // Para tipar el objeto de solicitud

/**
 * middleware: Función que actúa como middleware para proteger rutas en la aplicación.
 * Este middleware verifica si el usuario está autenticado (tiene un token válido)
 * antes de permitir el acceso a rutas protegidas. Si el usuario no está autenticado,
 * es redirigido a la página de inicio.
 *
 * @param {NextRequest} request El objeto de solicitud de Next.js.
 * @returns {NextResponse} Una respuesta HTTP que redirige al usuario o permite el acceso.
 */
export async function middleware(request: NextRequest) {
  // Obtén el token de autenticación del usuario
  const token = await getToken({ req: request });

  // Verifica si no hay token (usuario no autenticado) y si está intentando acceder a una ruta protegida
  if (!token && request.nextUrl.pathname.startsWith('/')) {
    // Redirige al usuario a la página de inicio ('/')
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si el usuario está autenticado o no está intentando acceder a una ruta protegida, continúa con la solicitud
  return NextResponse.next();
}

/**
 * config: Configuración del middleware.
 * Define las rutas que deben ser protegidas por este middleware.
 */
export const config = {
  matcher: ['/dashboard'], // Protege la ruta /dashboard
};