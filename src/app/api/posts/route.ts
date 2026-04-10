import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const rawContent = formData.get("content") as string | null;
    const content = rawContent?.trim() || "";
    const imageFile = formData.get("image") as File | null;

    let imageData: null | CloudinaryUploadResult = null;

    if (imageFile) {
      imageData = await uploadToCloudinary(imageFile);
    }

    if (!content && !imageFile) {
      return NextResponse.json(
        { message: "Post cannot be empty" },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        content: content || null,
        image: imageData?.secure_url || null,
        authorId: currentUser.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("CREATING_POST_ERROR", error);

    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const currentUser = await getCurrentUser();

    const DEFAULT_LIMIT = 3;

    const cursor = searchParams.get("cursor");
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    const posts = await prisma.post.findMany({
      take: limit + 1,
      orderBy: {
        createdAt: "desc",
      },

      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,

      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },

        likes: {
          where: {
            userId: currentUser?.id,
          },

          select: {
            id: true,
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const hasMore = posts.length > limit;
    const items = hasMore ? posts.slice(0, limit) : posts;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({ posts: items, nextCursor });
  } catch (error) {
    console.error("FETCHING_POSTS_ERROR", error);

    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 },
    );
  }
}
