export const SectionType = {
  HEADING: "heading",
  PARAGRAPH: "paragraph",
  IMAGE: "image",
  IMAGE_AND_TEXT: "image-and-text",
} as const;

export interface HeadingType {
  type: typeof SectionType.HEADING;
  text: string;
}

export interface ParagraphType {
  type: typeof SectionType.PARAGRAPH;
  text: string;
}

export interface ImageType {
  type: typeof SectionType.IMAGE;
  url: string;
  caption: string;
}

export interface ImageAndTextType {
  type: typeof SectionType.IMAGE_AND_TEXT;
  title: string;
  paragraph: string;
}

export type BlogSection =
  | HeadingType
  | ParagraphType
  | ImageType
  | ImageAndTextType;
