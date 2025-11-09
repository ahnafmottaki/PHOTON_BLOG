import React from "react";
import type { Comment } from "./blog-related-types";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

interface CommentDynamicProps {
  comments: Comment[];
  onAddComment?: (commentText: string) => void;
  onLikeComment?: (id: number) => void;
  onDislikeComment?: (id: number) => void;
}

const Comments: React.FC<CommentDynamicProps> = ({
  comments,
  onAddComment,
  onDislikeComment,
  onLikeComment,
}) => {
  const [myComments, setMyComments] = React.useState(comments);
  const handleAddComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDetails = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    console.log(formDetails);
    if (onAddComment) {
      onAddComment("hello");
    }
  };
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-card-foreground mb-6 border-b pb-3">
        Comments ({comments.length})
      </h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <img
              src={comment.avatarUrl}
              alt={comment.author}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <div className="bg-accent p-4 rounded-lg">
                <p className="font-semibold text-accent-foreground">
                  {comment.author}
                </p>
                <p className="text-accent-foreground/70 mt-1">{comment.text}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 pl-1">
                <button
                  onClick={
                    onLikeComment ? () => onLikeComment(comment.id) : undefined
                  }
                  className="flex items-center gap-1 text-xs text-accent-foreground hover:text-blue-600 transition-colors"
                  aria-label={`Like comment by ${comment.author}`}
                >
                  <ThumbsUpIcon className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={
                    onDislikeComment
                      ? () => onDislikeComment(comment.id)
                      : undefined
                  }
                  className="flex items-center gap-1 text-xs text-accent-foreground hover:text-red-600 transition-colors"
                  aria-label={`Dislike comment by ${comment.author}`}
                >
                  <ThumbsDownIcon className="w-4 h-4" />
                  <span>{comment.dislikes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="mt-10">
        <h3 className="text-2xl font-bold text-card-foreground mb-4">
          Leave a Comment
        </h3>
        <textarea
          placeholder="Write your comment here..."
          className="w-full p-3  border rounded-lg  transition duration-200"
          name="comment"
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/60 transition-colors duration-200 disabled:bg-primary/20 disabled:text-primary-foreground/50"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
