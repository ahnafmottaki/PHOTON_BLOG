import ShowBlog from "@/custom/ShowBlog";
import type { BlogType } from "@/custom/ViewBlogComponents/blog-related-types";
import { defaultBlog } from "@/utils/get-default-data-for-blog";
import { getInitialDataForSection } from "@/utils/get-initial-data-for-blogs";

const copyBlog = {
  ...defaultBlog,
  sections: [
    { id: "abc", type: "heading", ...getInitialDataForSection("heading") },
    { id: "efg", type: "paragraph", ...getInitialDataForSection("paragraph") },
    { id: "hij", type: "image", ...getInitialDataForSection("image") },
    {
      id: "klm",
      type: "image-and-text",
      ...getInitialDataForSection("image-and-text"),
    },
  ],
} as BlogType;
const ViewBlogPage = () => {
  console.log(copyBlog);
  return (
    <section className="row">
      <ShowBlog blog={copyBlog} isDynamic />
    </section>
  );
};

export default ViewBlogPage;
