import type React from "react";
import type { ImageType } from "./add-blog.type";
import DeleteWrapper from "./delete-wrapper";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import useImageChanger from "../hooks/useImageChanger";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ImageRenderProp {
  section: ImageType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedData: Partial<ImageType>) => void;
}

const ImageRender: React.FC<ImageRenderProp> = ({
  section,
  onDelete,
  onUpdate,
}) => {
  const { imageRef, handleImageClick } = useImageChanger();
  useEffect(() => {
    function handleImageChange(this: HTMLInputElement) {
      const fileInput = this;
      const files = fileInput.files;
      if (!files) {
        return;
      }
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Only image acceptable");
        return;
      }
      if (file.size > 1 * 1024 * 1024) {
        toast.error("Maximum File size 1mb");
        return;
      }
      URL.revokeObjectURL(section.url);
      const previewUrl = URL.createObjectURL(file);
      onUpdate(section.id, { file: file, url: previewUrl });
    }
    imageRef.current?.addEventListener("change", handleImageChange);

    return () => {
      imageRef.current?.removeEventListener("change", handleImageChange);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col items-center">
        <input type="file" className="hidden" ref={imageRef} />
        <img
          src={section.url}
          alt={section.caption}
          height={777}
          className="rounded-lg shadow-md max-w-full h-auto mb-2"
        />
        <input
          type="text"
          value={section.caption}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            onUpdate(section.id, { caption: e.currentTarget.value })
          }
          className="w-full text-center text-gray-500 italic p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent"
          placeholder="Image caption"
        />
      </div>
      <DeleteWrapper id={section.id} onDelete={onDelete}>
        <Button
          onClick={handleImageClick}
          variant={"outline"}
          className="p-2  opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="change image"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </DeleteWrapper>
    </>
  );
};
export default ImageRender;
