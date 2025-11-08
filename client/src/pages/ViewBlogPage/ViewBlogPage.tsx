import {
  SectionType,
  type BlogSection,
} from "@/custom/AddBlogComponents/add-blog.type";
import ShowBlog from "@/custom/ShowBlog";
import AuthorInfo from "@/custom/ViewBlogComponents/author-info";
import type { BlogType } from "@/custom/ViewBlogComponents/blog-related-types";
import Comments from "@/custom/ViewBlogComponents/comments";
import Engagement from "@/custom/ViewBlogComponents/engagements";
import { defaultBlog } from "@/utils/get-default-data-for-blog";
import { getInitialDataForSection } from "@/utils/get-initial-data-for-blogs";

const sections = [
  {
    id: "abc",
    type: SectionType.HEADING,
    ...getInitialDataForSection(SectionType.HEADING),
  },
  {
    id: "efg",
    type: SectionType.PARAGRAPH,
    ...getInitialDataForSection(SectionType.PARAGRAPH),
  },
  {
    id: "hij",
    type: SectionType.IMAGE,
    ...getInitialDataForSection(SectionType.PARAGRAPH),
  },
  {
    id: "klm",
    type: SectionType.IMAGE_AND_TEXT,
    ...getInitialDataForSection(SectionType.IMAGE_AND_TEXT),
  },
] as BlogSection[];
const ViewBlogPage = () => {
  return (
    <section className="row">
      <ShowBlog sections={sections}>
        <AuthorInfo author={defaultBlog.authorInfo} />
        <Engagement
          likes={20}
          dislikes={45}
          onLike={undefined}
          onDislike={undefined}
        />

        <Comments
          comments={defaultBlog.comments}
          onAddComment={() => {}}
          onLikeComment={() => {}}
          onDislikeComment={() => {}}
        />
      </ShowBlog>
    </section>
  );
};

export default ViewBlogPage;
