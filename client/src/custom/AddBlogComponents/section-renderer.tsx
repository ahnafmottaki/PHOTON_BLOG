import React from "react";
import ActionButtons from "./action-buttons";
import type { BlogSection } from "./add-blog.type";
import RenderInputs from "./render-inputs";
interface SectionRendererProp {
  section: BlogSection;
  index: number;
  updateSection: (id: string, updatedData: Partial<BlogSection>) => void;
  handleDelete: (id: string) => void;
}

const useOnlyRef = (isImageField: boolean) => {
  const imageRef = React.useRef<{ trigger: () => void } | null>(null);
  return isImageField ? imageRef : null;
};

const SectionRenderer: React.FC<SectionRendererProp> = ({
  section,
  index,
  updateSection,
  handleDelete,
}) => {
  const imageRef = useOnlyRef(section.type.includes("image"));
  const handleClickChange = () => {
    imageRef?.current?.trigger();
    console.log("handle click triggered");
  };
  return (
    <div
      key={section.id}
      className="relative p-6  rounded-xl shadow-sm border  group"
    >
      {section.type.includes("image") ? (
        <RenderInputs
          section={section}
          onUpdate={updateSection}
          ref={imageRef}
        />
      ) : (
        <RenderInputs section={section} onUpdate={updateSection} />
      )}

      {index !== 0 && (
        <>
          {section.type.includes("image") ? (
            <ActionButtons
              section={section}
              onDelete={handleDelete}
              onImageChange={handleClickChange}
            />
          ) : (
            <ActionButtons section={section} onDelete={handleDelete} />
          )}
        </>
      )}
    </div>
  );
};

export default SectionRenderer;
