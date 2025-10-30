import { BookType, ImagePlus, ImageUpscale, Rows4 } from "lucide-react";
import { SectionType, type BlogSection } from "./add-blog.type";

const ACTIVE_BUTTONS = [
  { type: SectionType.HEADING, icon: <BookType />, label: "Heading" },
  { type: SectionType.PARAGRAPH, icon: <Rows4 />, label: "Paragraph" },
  { type: SectionType.IMAGE, icon: <ImagePlus />, label: "Image" },
  {
    type: SectionType.IMAGE_AND_TEXT,
    icon: <ImageUpscale />,
    label: "Image & Text",
  },
];
interface ToolsType {
  onAddSection: (section: BlogSection) => void;
}
const Tools = ({ onAddSection }: ToolsType) => {
  return (
    <>
      <div className="mt-8 p-4 bg-card text-card-foreground rounded-xl shadow-sm border ">
        <h3 className="text-lg font-semibold text-center  mb-4">
          Add New Section
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACTIVE_BUTTONS.map((btn) => (
            <button
              key={btn.type}
              onClick={() => onAddSection()}
              className="flex flex-col bg-secondary text-secondary-foreground items-center justify-center p-4  hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors "
            >
              {btn.icon}
              <span className="mt-2 text-sm font-medium">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tools;
