export const SectionType = {
  HEADING: "heading",
  PARAGRAPH: "paragraph",
  IMAGE: "image",
  IMAGE_AND_TEXT: "img-and-paragraph",
} as const;

export type SectionLiterals = (typeof SectionType)[keyof typeof SectionType];

export interface HeadingType {
  id: string;
  type: typeof SectionType.HEADING;
  text: string;
}

export interface ParagraphType {
  id: string;
  type: typeof SectionType.PARAGRAPH;
  text: string;
}

export interface ImageType {
  id: string;
  type: typeof SectionType.IMAGE;
  url: string;
  caption: string;
  publicId: string | null;
}

export interface ImageAndTextType {
  id: string;
  type: typeof SectionType.IMAGE_AND_TEXT;
  url: string;
  title: string;
  paragraph: string;
  publicId: string | null;
}

export type BlogSection =
  | HeadingType
  | ParagraphType
  | ImageType
  | ImageAndTextType;
