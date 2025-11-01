import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface DeleteWrapperProp {
  id: string;
  children?: React.ReactNode;
  onDelete: (id: string) => void;
}
const DeleteWrapper: React.FC<DeleteWrapperProp> = ({
  children,
  onDelete,
  id,
}) => {
  return (
    <div className="absolute top-2 right-2 space-x-2">
      {children}
      <Button
        variant={"outline"}
        className="p-2  opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove section"
        onClick={() => onDelete(id)}
      >
        <TrashIcon className="h-5 w-5 " />
      </Button>
    </div>
  );
};

export default DeleteWrapper;
