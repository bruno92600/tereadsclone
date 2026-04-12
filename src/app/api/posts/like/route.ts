import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required." },
        { status: 400 },
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: currentUser.id,
          postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: currentUser.id,
            postId,
          },
        },
      });

      return NextResponse.json({
        liked: false,
      });
    }

    await prisma.like.create({
      data: {
        userId: currentUser.id,
        postId,
      },
    });

    return NextResponse.json({
      liked: true,
    });
  } catch (error) {
    console.error("LIKE_POST_ERROR", error);

    return NextResponse.json(
      { error: "Failed to toggle like." },
      { status: 500 },
    );
  }
}
