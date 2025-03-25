import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";  

const prisma = new PrismaClient();

// OBTENER TODOS LOS TESOROS
export async function GET() {
  try {
    const treasures = await prisma.treasure.findMany(); // Obtiene todos los tesoros sin filtrar
    return NextResponse.json(treasures, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo tesoros:", error);
    return NextResponse.json({ error: "Error al obtener los tesoros" }, { status: 500 });
  }
}

// CREAR UN NUEVO TESORO
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { name, latitude, longitude, description } = await request.json();
    
    if (!name || !latitude || !longitude) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newTreasure = await prisma.treasure.create({
      data: {
        name,
        latitude,
        longitude,
        description: description || null,
        hiddenById: session.user.id
      }
    });

    return NextResponse.json(newTreasure, { status: 201 });

  } catch (error) {
    console.error("Error al guardar tesoro:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
