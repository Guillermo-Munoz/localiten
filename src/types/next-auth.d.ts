import "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: PrismaUser & {
      id: string;
    };
  }
  
  interface User extends PrismaUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
// types/treasure.d.ts
export interface TreasureData {
  name: string;
  lat: number;  // Si usas "lat" y "lng" en el mapa
  lng: number;
  description?: string;
}