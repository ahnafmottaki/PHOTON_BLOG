import React from "react";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";

interface EngagementProps {
  likes: number;
  dislikes: number;
  onLike: (() => void) | undefined;
  onDislike: (() => void) | undefined;
}

interface LikeDisLikeProp {
  likes: number;
  dislikes: number;
}

const Engagement: React.FC<EngagementProps> = ({
  likes,
  dislikes,
  onLike,
  onDislike,
}) => {
  const [engagements, setEngageMents] = React.useState<LikeDisLikeProp>({
    likes,
    dislikes,
  });
  const handleOnLike = () => {};

  const handleOnDislike = () => {};
  return (
    <div className="flex items-center gap-6 my-8">
      <button
        onClick={onLike}
        className="flex items-center gap-2 text-accent-foreground hover:text-blue-600 transition-colors duration-200 focus:outline-none"
      >
        <ThumbsUpIcon className="w-6 h-6" />
        <span className="font-semibold text-lg">{likes}</span>
      </button>
      <button
        onClick={onDislike}
        className="flex items-center gap-2 text-accent-foreground hover:text-red-600 transition-colors duration-200 focus:outline-none"
      >
        <ThumbsDownIcon className="w-6 h-6" />
        <span className="font-semibold text-lg">{dislikes}</span>
      </button>
    </div>
  );
};

export default Engagement;
