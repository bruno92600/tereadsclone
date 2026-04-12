import Feed from "@/components/feed/Feed";
import Container from "@/components/layouts/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { getLikedPosts } from "@/server-actions/getLikedPosts";
import { Heart } from "lucide-react";
import { Suspense } from "react";

async function FavoritesContent() {
  const posts = await getLikedPosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-text-muted space-y-4">
        <Heart size={36} className="mb-3 opacity-70" />
        <p className="text-sm font-medium">Aucun post aimé pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      {posts
        .filter((post): post is typeof posts[number] & { author: typeof posts[number]['author'] & { username: string } } => post.author.username !== null)
        .map((post) => {
          return <Feed key={post.id} post={post} action />;
        })}
    </>
  );
}

export default function FavoritesPage() {
  return (
    <Container title="Favoris">
      <Suspense fallback={<LoadingSpinner />}>
        <FavoritesContent />
      </Suspense>
    </Container>
  );
}
