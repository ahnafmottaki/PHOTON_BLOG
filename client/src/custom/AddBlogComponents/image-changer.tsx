import React from "react";
import toast from "react-hot-toast";
import type { ImageAndTextType, ImageType } from "./add-blog.type";
import { uploadToCloudinary, deleteImage } from "@/utils/cloudinary.utils";
interface MyComponentHandle {
  click: () => void;
}
interface ImageChangeProp {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  onUpdate:
    | ((id: string, updatedData: Partial<ImageAndTextType>) => void)
    | ((id: string, updatedData: Partial<ImageType>) => void);
  publicId: string | null;
}

const ImageChanger = React.forwardRef<MyComponentHandle, ImageChangeProp>(
  ({ setUploading, onUpdate, id, publicId }, ref) => {
    const imageRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(
      ref,
      () => {
        return {
          click: () => {
            imageRef.current?.click();
          },
        };
      },
      []
    );

    const handleImageChange = async (
      event: React.FormEvent<HTMLInputElement>
    ) => {
      const fileInput = event.currentTarget;
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
      setUploading(true);
      try {
        let response;
        if (publicId) {
          const [uploadData, _] = await Promise.all([
            uploadToCloudinary(file),
            deleteImage(publicId),
          ]);
          console.log("secure_url", uploadData.secure_url);
          response = uploadData;
        } else {
          const uploadData = await uploadToCloudinary(file);
          response = uploadData;
        }
        onUpdate(id, {
          url: response.secure_url,
          publicId: response.public_id,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setUploading(false);
      }
    };
    return (
      <input
        type="file"
        className="hidden"
        ref={imageRef}
        onChange={handleImageChange}
      />
    );
  }
);

export default ImageChanger;
