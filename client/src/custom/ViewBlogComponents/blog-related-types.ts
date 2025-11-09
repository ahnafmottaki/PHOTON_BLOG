import type { BlogSection } from "../AddBlogComponents/add-blog.type";

export interface Author {
  name: string;
  username: string;
  totalPosts: number;
  email: string;
  bio: string;
  avatarUrl: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  avatarUrl: string;
  likes: number;
  dislikes: number;
}

export interface BlogType {
  sections: BlogSection[];
  authorInfo: Author;
  comments: Comment[];
  likes: number;
  dislikes: number;
}
