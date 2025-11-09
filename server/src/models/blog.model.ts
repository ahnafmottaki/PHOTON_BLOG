import { ObjectId } from "mongodb";
import { SectionArrayType } from "../schema/section.schema";
export interface Blog {
  _id: ObjectId;
  sections: SectionArrayType;
  author: ObjectId;
  comments: ObjectId[];
  likes: number;
  dislikes: number;
  totalComments: number;
  updatedAt: Date;
  createdAt: Date;
}
class BlogModel implements Blog {
  constructor(
    public _id: ObjectId,
    public sections: SectionArrayType,
    public author: ObjectId,
    public comments: ObjectId[] = [],
    public likes: number = 0,
    public dislikes: number = 0,
    public totalComments: number = 0,
    public updatedAt: Date = new Date(),
    public createdAt: Date = new Date()
  ) {}

  toJSON() {
    return {
      _id: this._id,
      sections: this.sections,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes,
      dislikes: this.dislikes,
      totalComments: this.totalComments,
      comments: this.comments,
    };
  }

  addIdsToSections() {
    this.sections = this.sections.map((section) => ({
      ...section,
      _id: new ObjectId(),
    }));
    return this;
  }
}

export default BlogModel;
