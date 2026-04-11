import { getComments } from "@/server-actions/getComments";
import Avatar from "../ui/Avatar";
import Link from "next/link";
import moment from "moment";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await getComments(postId);

  if (!comments.length) {
    return (
      <div className="text-gray-400 text-sm py-4">
        Pas de commentaires pour le moment. Soyez le premier à commenter !
      </div>
    );
  }
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Avatar
                  imgSrc={comment.author.image || "/images/avatar.png"}
                  alt="avatar"
                  width={40}
                  height={40}
                />
                <Link
                  className="text-white font-semibold text-sm hover:underline"
                  href={`/${comment.author.username}`}
                >
                  {comment.author.username}
                </Link>

                <span className="text-sm text-text-muted">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <p className="text-white/90 text-sm">{comment.content}</p>
          </div>
        );
      })}
    </>
  );
}
