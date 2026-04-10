import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const { userId } = await req.json();

    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: "You cannot follow yourself." },
        { status: 400 },
      );
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return NextResponse.json({ following: false });
    }

    await prisma.follow.create({
      data: {
        followerId: currentUser.id,
        followingId: userId,
      },
    });

    return NextResponse.json({ following: true });
  } catch (error) {
    console.error("FOLLOW_ERROR:", error);
    return NextResponse.json(
      { error: "An error occurred while trying to follow the user." },
      { status: 500 },
    );
  }
}
