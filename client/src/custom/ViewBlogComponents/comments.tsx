import React, { useState } from "react";
import type { Comment } from "./blog-related-types";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

interface CommentsProps {
  comments: Comment[];
  onAddComment: (commentText: string) => void;
  onLikeComment: (id: number) => void;
  onDislikeComment: (id: number) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  onAddComment,
  onLikeComment,
  onDislikeComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">{comment.author}</p>
                <p className="text-gray-600 mt-1">{comment.text}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 pl-1">
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={`Like comment by ${comment.author}`}
                >
                  <ThumbsUpIcon className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={() => onDislikeComment(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
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

      <form onSubmit={handleSubmit} className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Leave a Comment
        </h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
