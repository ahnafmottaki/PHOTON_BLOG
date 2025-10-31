import type { SectionLiterals } from "@/custom/AddBlogComponents/add-blog.type";

export const getInitialDataForSection = (type: SectionLiterals) => {
  switch (type) {
    case "heading":
      return { text: "New Heading" };
    case "paragraph":
      return { text: "New Paragraph Added" };
    case "image":
      return {
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        caption: "My caption",
      };
    case "image-and-text":
      return {
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        title: "My Title",
        paragraph:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam! Facilis amet rerum dolorem officiis illum ab blanditiis commodi aspernatur!",
      };
    default:
      return {};
  }
};
