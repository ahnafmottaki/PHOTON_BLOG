import React from "react";
import type { ImageType } from "./add-blog.type";
import DeleteWrapper from "./delete-wrapper";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import ImageChanger from "./image-changer";
import { deleteImage } from "@/utils/cloudinary.utils";
import useImageChanger from "../hooks/useImageChanger";

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
  const { uploading, setUploading, imageRef, handleImageClick } =
    useImageChanger(section.publicId);

  return (
    <>
      <div className="flex flex-col items-center">
        <ImageChanger
          ref={imageRef}
          setUploading={setUploading}
          id={section.id}
          onUpdate={onUpdate}
          publicId={section.publicId}
        />
        <div className="rounded-lg relative shadow-md overflow-hidden mb-2">
          {uploading && (
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <Spinner className="size-16" />
            </div>
          )}
          <img
            src={section.url}
            alt={section.caption}
            height={777}
            className=" max-w-full h-auto "
          />
        </div>
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
