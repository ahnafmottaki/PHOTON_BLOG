import type { BlogSection } from "@/custom/AddBlogComponents/add-blog.type";

export const validateSections = (sections: BlogSection[]) => {
  if (sections.length === 0) {
    return "No Section Added!";
  }
  for (const section of sections) {
    if (
      section.type === "heading" &&
      (section.text.trim() === "" || section.text.trim().length < 10)
    ) {
      return "Heading must be at least 10 characters long";
    } else if (
      section.type === "paragraph" &&
      section.text.trim().length < 30
    ) {
      return "Paragraph must be at least 30 characters long";
    } else if (section.type === "image" && section.caption.trim().length < 6) {
      return "Caption of image must be 6 characters long";
    } else if (section.type === "image-and-text") {
      if (section.title.trim().length < 6) {
        return "Title must be at least 6 characters long";
      }
      if (section.paragraph.trim().length < 30) {
        return "Paragraph must be at least 30 characters long";
      }
    }
  }

  return null;
};
