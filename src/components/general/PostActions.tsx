"use client";

import { useModalStore } from "@/store/useModalStore";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";
import { MessageCircle } from "lucide-react";

export default function PostActions({ post }: { post: Post }) {
  const { openReplyPost } = useModalStore();
  const { setSelectedPost } = usePostStore();

  return (
    <div className="flex items-center text-xs text-text-muted mt-2">
      {/* like button */}
      <div
        onClick={() => {
          openReplyPost();
          setSelectedPost(post);
        }}
        className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-surface-hover cursor-pointer"
      >
        <MessageCircle size={20} />
        {post._count.comments}
      </div>
    </div>
  );
}
