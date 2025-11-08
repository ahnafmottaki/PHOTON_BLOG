import type React from "react";
import type { BlogType } from "./ViewBlogComponents/blog-related-types";
import BlogHeader from "./ViewBlogComponents/blog-header";
import Paragraph from "./ViewBlogComponents/blog-paragraph";
import ImageSection from "./ViewBlogComponents/image-section";
import ImageTextSection from "./ViewBlogComponents/image-text-section";
import AuthorInfo from "./ViewBlogComponents/author-info";
import Engagement from "./ViewBlogComponents/engagements";
import Comments from "./ViewBlogComponents/comments";
import { SectionType } from "./AddBlogComponents/add-blog.type";

const RenderSection = ({
  section,
}: {
  section: BlogType["sections"][number];
}) => {
  switch (section.type) {
    case SectionType.HEADING:
      return <BlogHeader title={section.text} />;
    case SectionType.PARAGRAPH:
      return <Paragraph text={section.text} />;
    case SectionType.IMAGE:
      return <ImageSection imageUrl={section.url} caption={section.caption} />;
    case SectionType.IMAGE_AND_TEXT:
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
const ShowBlog: React.FC<{ blog: BlogType; isDynamic: boolean }> = ({
  blog,
  isDynamic,
}) => {
  return (
    <main className="row">
      <section className="bg-card  p-6 sm:p-10 rounded-xl shadow-xl">
        {blog.sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
        <div className="my-10 border-t border-gray-200" />
        <AuthorInfo author={blog.authorInfo} />
        <Engagement
          likes={blog.likes}
          dislikes={blog.dislikes}
          onLike={isDynamic ? () => console.log("Adding like") : undefined}
          onDislike={isDynamic ? () => console.log("Disliking") : undefined}
        />

        <Comments
          isDynamic={isDynamic}
          comments={blog.comments}
          onAddComment={() => {}}
          onLikeComment={() => {}}
          onDislikeComment={() => {}}
        />
      </section>
    </main>
  );
};

export default ShowBlog;
