"use client";

import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import { useState } from "react";
import { usePostStore } from "@/store/usePostStore";
import Feed from "../feed/Feed";
import { authClient } from "@/lib/auth-client";
import Avatar from "../ui/Avatar";
import AutoSizeTextarea from "../ui/AutoSizeTextarea";
import PostButton from "../ui/PostButton";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ReplyModal() {
  const { closeReplyPost, isReplyPostOpen } = useModalStore();
  const { selectedPost } = usePostStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleReply = async () => {
    if (!content.trim() || !selectedPost) return;

    try {
      setLoading(true);

      await axios.post("/api/comments", {
        content,
        postId: selectedPost.id,
      });

      setContent("");
      closeReplyPost();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.refresh();
    } catch (error) {
      console.error("REPLY_COMMENT_ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Répondre" isOpen={isReplyPostOpen} onClose={closeReplyPost}>
      {selectedPost && <Feed post={selectedPost} />}

      <div className="flex items-start gap-3">
        <Avatar
          imgSrc={session?.user.image || "/images/avatar.png"}
          alt="Avatar"
          width={40}
          height={40}
        />

        <div className="w-full">
          <p className="text-white font-semibold mb-1">
            {session?.user.name || "Utilisateur"}
          </p>
          <AutoSizeTextarea
            placeholder="Écrivez votre réponse..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <PostButton
          title={loading ? "Chargement..." : "Poster"}
          onClick={handleReply}
          disabled={loading || !content.trim()}
        />
      </div>
    </Modal>
  );
}
