import { Button } from "@/components/ui/button";
import type { ImageAndTextType } from "./add-blog.type";
import { Edit } from "lucide-react";
import DeleteWrapper from "./delete-wrapper";
import React from "react";

import { Spinner } from "@/components/ui/spinner";
import ImageChanger from "./image-changer";
import useImageChanger from "../hooks/useImageChanger";

interface ImageAndTextRendererProp {
  section: ImageAndTextType;
  onUpdate: (id: string, updatedData: Partial<ImageAndTextType>) => void;
  onDelete: (id: string) => void;
}

const ImageAndTextRenderer: React.FC<ImageAndTextRendererProp> = ({
  section,
  onUpdate,
  onDelete,
}) => {
  const { uploading, setUploading, imageRef, handleImageClick } =
    useImageChanger(section.publicId);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <ImageChanger
          ref={imageRef}
          setUploading={setUploading}
          id={section.id}
          onUpdate={onUpdate}
          publicId={section.publicId}
        />
        <div className="w-full min-h-[250px] md:w-1/3 rounded-lg overflow-hidden shadow-md relative">
          {uploading && (
            <div className="absolute inset-0">
              <Spinner className="size-6" />
            </div>
          )}
          <img
            src={section.url}
            alt={section.title}
            className=" object-cover"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={section.title}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              onUpdate(section.id, { title: e.currentTarget.value })
            }
            className="w-full text-2xl font-semibold p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent mb-2"
          />
          <textarea
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
              onUpdate(section.id, {
                paragraph: e.currentTarget.value,
              })
            }
            value={section.paragraph}
            className="w-full p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent h-32 resize-y max-h-[190px] min-h-[150px]"
          />
        </div>
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

export default ImageAndTextRenderer;
