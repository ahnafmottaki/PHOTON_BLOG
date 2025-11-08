import {
  SectionType,
  type BlogSection,
} from "@/custom/AddBlogComponents/add-blog.type";
SectionType;
export const validateSections = (sections: BlogSection[]) => {
  if (sections.length === 0) {
    return "No Section Added!";
  }
  if (sections.length > 10) {
    return "You can add up to 10 sections";
  }

  for (const section of sections) {
    if (
      section.type === SectionType.HEADING &&
      (section.text.trim() === "" || section.text.trim().length < 10)
    ) {
      return "Heading must be at least 10 characters long";
    } else if (
      section.type === SectionType.PARAGRAPH &&
      section.text.trim().length < 30
    ) {
      return "Paragraph must be at least 30 characters long";
    } else if (
      section.type === SectionType.IMAGE &&
      section.caption.trim().length < 6
    ) {
      return "Caption of image must be 6 characters long";
    } else if (section.type === SectionType.IMAGE_AND_TEXT) {
      if (section.title.trim().length < 6) {
        return "Title must be at least 6 characters long";
      }
      if (section.paragraph.trim().length < 30) {
        return "Paragraph must be at least 30 characters long";
      }
    }
  }
};
