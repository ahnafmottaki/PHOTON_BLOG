import React from "react";
import { User, Mail, FileText } from "lucide-react";
import type { Author } from "./blog-related-types";

interface AuthorInfoProps {
  author: Author;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => {
  return (
    <div className="bg-muted p-6 rounded-lg my-10">
      <div className="flex items-center gap-6">
        <img
          src={author.avatarUrl || "https://picsum.photos/id/1005/200/200"}
          alt={author.username}
          className="w-20 h-20 rounded-full object-cover shadow-sm shrink-0"
        />
        <div>
          <h3 className="text-xl font-bold text-muted-foreground">
            {author.username}
          </h3>
          <p className="text-muted-foreground/80 mt-1">
            {author.bio || "No bio is set to this user"}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-accent-foreground/70" />
          <span>{author.username}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-accent-foreground/70" />
          <a
            href={`mailto:${author.email}`}
            className="hover:text-primary transition-colors"
          >
            {author.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent-foreground/70" />
          <span>{author.totalPosts} Posts</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
