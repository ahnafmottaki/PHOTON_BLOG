import { Button } from "@/components/ui/button";
import {
  SectionType,
  type BlogSection,
  type SectionLiterals,
} from "@/custom/AddBlogComponents/add-blog.type";
import PreviewButton from "@/custom/AddBlogComponents/preview-btn";
import Tools from "@/custom/AddBlogComponents/Tools";
import DialogView from "@/custom/DialogView";
import ShowBlog from "@/custom/ShowBlog";
import { validateSections } from "@/utils/validate-blog-inputs";
import { getInitialDataForSection } from "@/utils/get-initial-data-for-blogs";
import { defaultBlog } from "@/utils/get-default-data-for-blog";
import React, { useCallback } from "react";
import { Edit, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import RenderInputs from "@/custom/AddBlogComponents/render-inputs";
import ActionButtons from "@/custom/AddBlogComponents/action-buttons";
import SectionRenderer from "@/custom/AddBlogComponents/section-renderer";

const INITIAL_HEADING: BlogSection = {
  type: "heading",
  id: new Date().toISOString(),
  text: "A Heading is must for every blog",
};

const AddBlog = () => {
  const [showPreview, setShowPreview] = React.useState<boolean>(false);
  const [sections, setSections] = React.useState<BlogSection[]>([
    INITIAL_HEADING,
  ]);
  const handleShowPreview = useCallback(() => {
    let message = validateSections(sections);
    if (message) {
      toast.error(message || "Something unexpected happened", {
        className: "bg-primary text-primary-foreground",
      });
      return;
    }
    setShowPreview((prev) => !prev);
  }, [sections]);

  const updateSection = useCallback(
    (id: string, updatedData: Partial<BlogSection>) => {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === id
            ? ({ ...section, ...updatedData } as BlogSection)
            : section
        )
      );
    },
    []
  );

  const handleDelete = useCallback((id: string) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
  }, []);

  const handleAddSection = (type: SectionLiterals) => {
    const newSection = {
      id: new Date().toISOString(),
      type,
      ...getInitialDataForSection(type),
    } as BlogSection;
    setSections((prevSections) => [...prevSections, newSection]);
    console.log("section added to state");
  };

  console.log(sections);

  return (
    <>
      <section className="row">
        <header className="my-8 sm:my-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Blog Post Builder
          </h1>
          <p className="text-lg text-foreground mt-3">
            Add, edit, and arrange sections to create your perfect post.
          </p>
        </header>
        <section className="space-y-6">
          {sections.map((section, index) => (
            <SectionRenderer
              key={section.id}
              section={section}
              index={index}
              handleDelete={handleDelete}
              updateSection={updateSection}
            />
          ))}
        </section>
        <Tools onAddSection={handleAddSection} />
        <PreviewButton onPreview={handleShowPreview} />
      </section>
      {showPreview && (
        <DialogView onOverlayClick={handleShowPreview}>
          {/* <div className="row h-9/10 bg-background sm:p-10 p-7 overflow-auto"> */}
          <ShowBlog blog={{ sections, ...defaultBlog }} />
          {/* </div> */}
        </DialogView>
      )}
    </>
  );
};

export default AddBlog;
