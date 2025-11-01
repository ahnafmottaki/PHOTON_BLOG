import React from "react";
import toast from "react-hot-toast";
import type {
  ImageAndTextType,
  ImageType,
} from "../AddBlogComponents/add-blog.type";

type ImageUpdateFn = (id: string, updatedData: Partial<ImageType>) => void;
type ImageAndTextUpdateFn = (
  id: string,
  updatedData: Partial<ImageAndTextType>
) => void;

const useImageChanger = (
  section: ImageType | ImageAndTextType,
  onUpdate: ImageUpdateFn | ImageAndTextUpdateFn
) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    imageRef.current?.click();
  };
  React.useEffect(() => {
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
  }, [section]);
  return { imageRef, handleImageClick };
};

export default useImageChanger;
