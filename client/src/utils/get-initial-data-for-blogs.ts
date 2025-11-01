import type { SectionLiterals } from "@/custom/AddBlogComponents/add-blog.type";

export const getInitialDataForSection = (type: SectionLiterals) => {
  switch (type) {
    case "heading":
      return { text: "Heading must be at least 10 characters long" };
    case "paragraph":
      return { text: "Paragraph must be at least 30 characters long" };
    case "image":
      return {
        file: null,
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        caption: "Caption of image must be 6 characters long",
      };
    case "image-and-text":
      return {
        file: null,
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        title: "Title must be at least 6 characters long",
        paragraph: "Paragraph must be at least 30 characters long",
      };
    default:
      return {};
  }
};
