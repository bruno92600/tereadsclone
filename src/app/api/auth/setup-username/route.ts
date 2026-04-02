import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(
        {
          error: "Non autorisé",
        },
        { status: 401 },
      );
    }

    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        {
          error: "Nom d'utilisateur requis",
        },
        { status: 400 },
      );
    }

    const formattedUsername = username.toLowerCase().trim();

    // Vérifier si le nom d'utilisateur est déjà pris
    const existingUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (existingUsername) {
      return NextResponse.json(
        {
          error: "Nom d'utilisateur déjà pris",
        },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { username: formattedUsername },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de la configuration du nom d'utilisateur. Veuillez réessayer.",
      },
      { status: 500 },
    );
  }
}
