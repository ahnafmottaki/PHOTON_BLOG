import type { BlogSection } from "@/custom/AddBlog/add-blog.type";
import PreviewButton from "@/custom/AddBlog/preview-btn";
import Tools from "@/custom/AddBlog/tools";
import React from "react";

const AddBlog = () => {
  const [sections, setSections] = React.useState<BlogSection[]>([]);

  const handleSetSections = (section: BlogSection) => {
    console.log("adding sections");
    setSections((prevSections) => [...prevSections, section]);
  };
  console.log(sections);
  return (
    <section className="row">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mt-8">
        Blog Post Builder
      </h1>
      <p className="text-lg text-foreground mt-2 text-center max-sm:mt-3">
        Add, edit, and arrange sections to create your perfect post.
      </p>
      <Tools />
      <PreviewButton />
    </section>
  );
};

export default AddBlog;
