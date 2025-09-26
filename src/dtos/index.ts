// * dto -> data transfer object
// Blog Requests
export interface CreateBlogRequest {
  title: string;
  description: string;
  tags: string[];
}

export interface updateBlogRequest extends CreateBlogRequest {}
// * dto -> data transfer objects
// Blog Responses
export interface BlogResponse {
  id: string;
  title: string;
  description: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogListResponse {
  blogs: BlogResponse[];
  total: number;
  page: number;
  limit: number;
}
