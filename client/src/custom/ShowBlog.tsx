import type React from "react";
import type { BlogType } from "./ViewBlogComponents/blog-related-types";
import BlogHeader from "./ViewBlogComponents/blog-header";
import Paragraph from "./ViewBlogComponents/blog-paragraph";
import ImageSection from "./ViewBlogComponents/image-section";
import ImageTextSection from "./ViewBlogComponents/image-text-section";
import AuthorInfo from "./ViewBlogComponents/author-info";
import Engagement from "./ViewBlogComponents/engagements";
import Comments from "./ViewBlogComponents/comments";

const renderSection = (
  section: BlogType["sections"][number]
): React.ReactNode => {
  switch (section.type) {
    case "heading":
      return <BlogHeader title={section.text} />;
    case "paragraph":
      return <Paragraph text={section.text} />;
    case "image":
      return <ImageSection imageUrl={section.url} caption={section.caption} />;
    case "image-and-text":
      return (
        <ImageTextSection
          imageUrl={section.url}
          title={section.title}
          text={section.paragraph}
        />
      );
    default:
      return null;
  }
};
const ShowBlog: React.FC<{ blog: BlogType }> = ({ blog }) => {
  return (
    <main className="row ">
      <article className="bg-white p-6 sm:p-10 rounded-xl shadow-xl">
        {blog.sections.map((section) => renderSection(section))}
        <div className="my-10 border-t border-gray-200" />
        <AuthorInfo author={blog.authorInfo} />
        <Engagement
          likes={blog.likes}
          dislikes={blog.dislikes}
          onLike={() => {}}
          onDislike={() => {}}
        />

        <Comments
          comments={blog.comments}
          onAddComment={() => {}}
          onLikeComment={() => {}}
          onDislikeComment={() => {}}
        />
      </article>
    </main>
  );
};

export default ShowBlog;
