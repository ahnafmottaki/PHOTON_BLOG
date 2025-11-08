import {
  SectionType,
  type SectionLiterals,
} from "@/custom/AddBlogComponents/add-blog.type";

export const getInitialDataForSection = (type: SectionLiterals) => {
  switch (type) {
    case SectionType.HEADING:
      return { text: "Heading must be at least 10 characters long" };
    case SectionType.PARAGRAPH:
      return { text: "Paragraph must be at least 30 characters long" };
    case SectionType.IMAGE:
      return {
        url: "https://res.cloudinary.com/photonblog/image/upload/v1762600896/blog_section/slie7ynhkq3zi7wwlc1b.jpg",
        caption: "Caption of image must be 6 characters long",
        publicId: null,
      };
    case SectionType.IMAGE_AND_TEXT:
      return {
        url: "https://res.cloudinary.com/photonblog/image/upload/v1762600896/blog_section/slie7ynhkq3zi7wwlc1b.jpg",
        title: "Title must be at least 6 characters long",
        paragraph: "Paragraph must be at least 30 characters long",
        publicId: null,
      };
    default:
      return {};
  }
};
