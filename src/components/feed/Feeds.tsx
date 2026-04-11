"use client";

import { usePosts } from "@/custom-hooks/usePost";
import Container from "../layouts/Container";
import CreatePostsAction from "./CreatePostsAction";
import LoadingSpinner from "../loading/LoadingSpinner";
import Feed from "./Feed";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Feeds() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage){
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (status === "pending") {
    return (
      <Container title="Pour toi">
        <LoadingSpinner />
      </Container>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <Container title="Pour toi">
      <CreatePostsAction />
      {posts.map((post) => {
        return <Feed post={post} key={post.id} action />;
      })}

      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <LoadingSpinner />
        )}
      </div>
    </Container>
  );
}
