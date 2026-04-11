import Comments from "@/components/feed/Comments";
import PostActions from "@/components/general/PostActions";
import Container from "@/components/layouts/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import Avatar from "@/components/ui/Avatar";
import { getPostById } from "@/server-actions/getPostById";
import { Ellipsis } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function PostLoader({ postId }: { postId: string }) {
  const post = await getPostById(postId);

  if (!post) return null;

  return (
    <div className="">
      <div className="border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              imgSrc={post.author.image || "/images/avatar.png"}
              alt={post.author.name || "Avatar"}
              width={40}
              height={40}
            />

            <Link
              href={`/${post.author.username || ""}`}
              className="text-purple-400 font-semibold text-sm hover:underline"
            >
              {post.author.username}
            </Link>

            <span className="text-text-muted text-sm">
              {moment(post.createdAt).fromNow()}
            </span>

            <Ellipsis size={18} className="text-purple-400 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-3">
          {post.content && (
            <p className="text-white/80 text-sm leading-relaxed">
              {post.content}
            </p>
          )}

          {post.image && (
            <div className="relative h-80 aspect-square rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt="post image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <PostActions post={{ ...post, author: { ...post.author, username: post.author.username || "" } }} />
      </div>

      <Comments postId={post.id} />
    </div>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;

  return (
    <Container title="Fil" showBackButton>
      <Suspense fallback={<LoadingSpinner />}>
        <PostLoader postId={postId} />
      </Suspense>
    </Container>
  );
}
