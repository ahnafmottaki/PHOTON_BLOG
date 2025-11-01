export const SectionType = {
  HEADING: "heading",
  PARAGRAPH: "paragraph",
  IMAGE: "image",
  IMAGE_AND_TEXT: "image-and-text",
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

interface FileType {
  file: File | null;
}

export interface ImageType extends FileType {
  id: string;
  type: typeof SectionType.IMAGE;
  url: string;
  caption: string;
}

export interface ImageAndTextType extends FileType {
  id: string;
  type: typeof SectionType.IMAGE_AND_TEXT;
  url: string;
  title: string;
  paragraph: string;
}

export type BlogSection =
  | HeadingType
  | ParagraphType
  | ImageType
  | ImageAndTextType;
