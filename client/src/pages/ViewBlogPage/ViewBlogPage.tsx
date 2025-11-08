import { SectionType } from "@/custom/AddBlogComponents/add-blog.type";
import ShowBlog from "@/custom/ShowBlog";
import type { BlogType } from "@/custom/ViewBlogComponents/blog-related-types";
import { defaultBlog } from "@/utils/get-default-data-for-blog";
import { getInitialDataForSection } from "@/utils/get-initial-data-for-blogs";

const copyBlog = {
  ...defaultBlog,
  sections: [
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
