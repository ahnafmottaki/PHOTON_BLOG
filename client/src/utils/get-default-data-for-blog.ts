import type { BlogType } from "@/custom/ViewBlogComponents/blog-related-types";

export const defaultBlog: Omit<BlogType, "sections"> = {
  likes: 17,
  dislikes: 5,
  authorInfo: {
    name: "Alex Johnson",
    username: "alexj",
    postsCount: 42,
    email: "alex.j@example.com",
    bio: "A passionate developer and writer exploring the intersection of technology, design, and human experience. Coffee enthusiast.",
    avatarUrl: "https://picsum.photos/id/1005/200/200",
  },
  comments: [
    {
      id: 1,
      author: "Jane Doe",
      text: "This was an incredibly insightful read. Thank you for sharing!",
      avatarUrl: "https://picsum.photos/id/1011/100/100",
      likes: 15,
      dislikes: 0,
    },
    {
      id: 2,
      author: "John Smith",
      text: "I have a slightly different perspective on the second point, but overall a great article.",
      avatarUrl: "https://picsum.photos/id/1012/100/100",
      likes: 8,
      dislikes: 2,
    },
  ],
};
