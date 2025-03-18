"use client"
import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/react"
/**
 * Navbar: Componente de navegación principal de la aplicación.
 * Muestra enlaces de navegación y botones de autenticación basados en el estado de la sesión del usuario.
 *
 * @returns {JSX.Element} El componente Navbar.
 */ // Documentación JSDoc
 
function Navbar(){
  
  const { data: session} = useSession()
  console.log(session)
  

  return(
 
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
       <h1>
        Localiten
       </h1>
      </Link>

      {session?.user ? (//se comprueba si esta logueado para mostrar el boton de singIn o singOut
        <div className="flex gap-x-2 items-center">
          <Link href="/dashboard">
          dashboard
          </Link>
          <p>{session.user.name} {session.user.email}</p>
                                                                            
        <button onClick={() => signOut()} className="bg-red-400 px-3 py-2"> 
          Sing Out
        </button>
        </div>
      ): (
        <div className="flex gap-x-2 items-center">
        <Link href="/dashboard">
        dashboard
        </Link>
                                                                           
      <button onClick={() => signIn()} className="bg-sky-400 px-3 py-2"> 
        Sing In
      </button>
      </div>

      )}
    </nav>
  )
}
export default Navbar;