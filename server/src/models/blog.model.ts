import { ObjectId } from "mongodb";
enum SectionType {
  HEADING = "heading",
  PARAGRAPH = "paragraph",
  IMAGE = "image",
  IMAGE_AND_TEXT = "image_and_text",
}

export type SectionLiterals =
  | SectionType.HEADING
  | SectionType.PARAGRAPH
  | SectionType.IMAGE
  | SectionType.IMAGE_AND_TEXT;

export interface HeadingType {
  id: string;
  type: SectionType.HEADING;
  text: string;
}

export interface ParagraphType {
  id: string;
  type: SectionType.PARAGRAPH;
  text: string;
}

export interface ImageType {
  id: string;
  url: string;
  caption: string;
  type: SectionType.IMAGE;
}

export interface ImageAndTextType {
  id: string;
  url: string;
  title: string;
  paragraph: string;
  type: SectionType.IMAGE_AND_TEXT;
}

export interface Comment {
  _id: ObjectId | null;
  text: string;
  author: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  disLikes: number;
}

export type BlogSection =
  | HeadingType
  | ParagraphType
  | ImageType
  | ImageAndTextType;

class BlogModel {
  constructor(
    private _id: ObjectId | null,
    private sections: BlogSection[],
    private author: ObjectId,
    private comments: ObjectId[] = [],
    private likes: number = 0,
    private disLikes: number = 0,
    private totalComment: number = 0,
    private updatedAt: Date = new Date(),
    private createdAt: Date = new Date()
  ) {}

  toJSON() {
    return {
      _id: this._id?.toString(),
      sections: this.sections,
      author: this.author.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes,
      disLikes: this.disLikes,
      totalComment: this.totalComment,
      comments: this.comments.map((comment) => comment.toString()),
    };
  }
}

export default BlogModel;
