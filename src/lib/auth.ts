 // lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt", // ← Usamos JWT para mejor compatibilidad
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("Usuario en jwt:", user);
        token.id = user.id; // Guarda el ID en el token JWT
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Token en sesión:", token);  // Verifica que `sub` tiene el ID
      
      if (session.user) {
        session.user.id = token.sub ?? ""; // ← Asegura que se pase el ID o un valor por defecto
      }
    
      console.log("Sesión generada con ID:", session);  // Verifica si ahora tiene `id`
      return session;
    }
  }
};