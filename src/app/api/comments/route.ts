import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {content, postId} = await req.json();

    if (!content || !postId) {
      return NextResponse.json(
        { error: "Content and postId are required." },
        { status: 400 },
      );
    }

    await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: currentUser.id,
      },
    });

    return NextResponse.json(
      { message: "Comment created successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_COMMENT_ERROR", error);

    return NextResponse.json(
      { error: "Failed to create comment." },
      { status: 500 },
    );
  }
}
