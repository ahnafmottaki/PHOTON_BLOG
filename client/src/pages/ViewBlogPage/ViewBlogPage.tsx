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
import type { AxiosResponse } from "axios";
import { useLoaderData } from "react-router";

const sections = [
  {
    _id: "abc",
    type: SectionType.HEADING,
    ...getInitialDataForSection(SectionType.HEADING),
  },
  {
    _id: "efg",
    type: SectionType.PARAGRAPH,
    ...getInitialDataForSection(SectionType.PARAGRAPH),
  },
  {
    _id: "hij",
    type: SectionType.IMAGE,
    ...getInitialDataForSection(SectionType.PARAGRAPH),
  },
  {
    _id: "klm",
    type: SectionType.IMAGE_AND_TEXT,
    ...getInitialDataForSection(SectionType.IMAGE_AND_TEXT),
  },
] as BlogSection[];
const ViewBlogPage = () => {
  const {
    data: { data },
  } = useLoaderData<AxiosResponse<{ data: BlogType }>>();
  console.log(data);
  return (
    <section className="row">
      <ShowBlog sections={data.sections}>
        <AuthorInfo author={data.authorInfo} />
        <Engagement
          likes={data.likes}
          dislikes={data.dislikes}
          onLike={undefined}
          onDislike={undefined}
        />

        <Comments
          comments={data.comments}
          onAddComment={() => {}}
          onLikeComment={() => {}}
          onDislikeComment={() => {}}
        />
      </ShowBlog>
    </section>
  );
};

export default ViewBlogPage;
