
"use client"; // Indica que este componente se renderiza en el cliente (navegador)
import { SessionProvider } from "next-auth/react"; // Importa SessionProvider de next-auth/react

/**
 * Providers: Componente proveedor de sesión para la autenticación con next-auth.
 * Este componente envuelve la aplicación con el SessionProvider de next-auth,
 * permitiendo que los componentes hijos accedan a la información de la sesión del usuario.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {React.ReactNode} props.children Los componentes hijos que se envolverán con el SessionProvider.
 * @returns {JSX.Element} El componente Providers.
 */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}