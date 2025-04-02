"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

/**
 * Navbar: Componente de navegación principal de la aplicación.
 * Muestra enlaces de navegación y botones de autenticación basados en el estado de la sesión del usuario.
 *
 * @returns {JSX.Element} El componente Navbar.
 */

function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center text-3xl">
      <Link href="/" className="font-bold">
        Localiten<span className="text-5xl text-amber-400">.</span>
      </Link>

      {session?.user ? ( // Si el usuario está autenticado
        <div className="flex gap-x-4 items-center">
          <Link href="/dashboard" className="text-lg hover:text-amber-400 transition">
            Dashboard
          </Link>
          <p className="text-lg">{session.user.name || "Usuario"}</p>
          <button 
            onClick={() => signOut()} 
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      ) : ( // Si NO está autenticado
        <button 
          onClick={() => signIn()} 
          className="bg-amber-400 px-4 py-2 rounded-lg hover:bg-amber-500 transition"
        >
          Sign In
        </button>
      )}
    </nav>
  )
}

export default Navbar;
