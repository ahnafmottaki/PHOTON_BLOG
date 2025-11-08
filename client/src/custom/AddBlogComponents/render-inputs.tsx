import React from "react";
import { SectionType, type BlogSection } from "./add-blog.type";
import DeleteWrapper from "./delete-wrapper";
import ImageRender from "./image-render";
import ImageAndTextRenderer from "./image-and-text-render";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-6  rounded-xl shadow-sm border  group">
      {children}
    </div>
  );
};

interface RenderInputsProp {
  isFirst?: boolean;
  section: BlogSection;
  onUpdate: (id: string, updatedData: Partial<BlogSection>) => void;
  onDelete: (id: string) => void;
}

const RenderInputs: React.FC<RenderInputsProp> = React.memo(
  ({ section, onUpdate, onDelete, isFirst }) => {
    switch (section.type) {
      case SectionType.HEADING:
        return (
          <Wrapper>
            <input
              type="text"
              value={section.text}
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                onUpdate(section.id, { text: e.currentTarget.value })
              }
              className="w-full text-3xl md:text-4xl font-bold p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent"
            />
            {!isFirst && <DeleteWrapper id={section.id} onDelete={onDelete} />}
          </Wrapper>
        );
      case SectionType.PARAGRAPH:
        return (
          <Wrapper>
            <textarea
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
                onUpdate(section.id, { text: e.currentTarget.value })
              }
              value={section.text}
              className="w-full text-lg p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent h-40 resize-y min-h-[200px] max-h-[500px]"
            />
            <DeleteWrapper id={section.id} onDelete={onDelete} />
          </Wrapper>
        );
      case SectionType.IMAGE:
        return (
          <Wrapper>
            <ImageRender
              section={section}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </Wrapper>
        );
      case SectionType.IMAGE_AND_TEXT:
        return (
          <Wrapper>
            <ImageAndTextRenderer
              section={section}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </Wrapper>
        );
      default:
        return null;
    }
  }
);
export default RenderInputs;
