import type { Metadata } from "next"; // Importa el tipo Metadata de Next.js
import { Geist, Geist_Mono } from "next/font/google"; // Importa las fuentes Geist y Geist_Mono de next/font/google.
import "./globals.css"; // Importa los estilos globales.
import Navbar from "@/components/Navbar"; // Importa el componente Navbar.
import { Providers } from "./Providers"; // Importa el componente Providers.

/**
 * Configura la fuente Geist para el cuerpo del documento.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configura la fuente Geist Mono para el código y otros elementos monoespaciados.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Configura los metadatos de la aplicación.
 */
export const metadata: Metadata = {
  title: "Localiten",
  description: "App juego localizar items en el mapa gps",
};

/**
 * RootLayout: Componente de diseño raíz de la aplicación.
 * Define la estructura HTML base y envuelve la aplicación con los proveedores necesarios.
 *
 * @param {Object} props Las propiedades del componente.
 * @param {React.ReactNode} props.children Los componentes hijos que representan las páginas de la aplicación.
 * @returns {JSX.Element} El componente RootLayout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}