"use client";

import { usePosts } from "@/custom-hooks/usePost";
import Container from "../layouts/Container";
import CreatePostsAction from "./CreatePostsAction";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function Feeds() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();

    if (status === "pending") {
      return (
        <Container title="Pour toi">
          <LoadingSpinner />
        </Container>
      )
    }

    const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <Container title="Pour toi">
      <CreatePostsAction />
    </Container>
  );
}
