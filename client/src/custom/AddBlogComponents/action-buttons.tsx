import { Button } from "@/components/ui/button";
import type { BlogSection } from "./add-blog.type";
import type React from "react";
import { Edit, TrashIcon } from "lucide-react";
interface ActionButtonsProp {
  section: BlogSection;
  onDelete: (id: string) => void;
  onImageChange?: () => void;
}
const ActionButtons: React.FC<ActionButtonsProp> = ({
  section,
  onDelete,
  onImageChange,
}) => {
  return (
    <div className="absolute top-2 right-2 space-x-2">
      {(section.type === "image" || section.type === "image-and-text") && (
        <Button
          variant={"outline"}
          className="p-2  opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="change image"
          onClick={onImageChange}
        >
          <Edit className="h-5 w-5" />
        </Button>
      )}
      <Button
        variant={"outline"}
        onClick={() => onDelete(section.id)}
        className="p-2  opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove section"
      >
        <TrashIcon className="h-5 w-5 " />
      </Button>
    </div>
  );
};

export default ActionButtons;
