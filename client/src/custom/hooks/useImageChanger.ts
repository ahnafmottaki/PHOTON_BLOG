import { deleteImage } from "@/utils/cloudinary.utils";
import React from "react";

const useImageChanger = (publicId: string | null) => {
  const [uploading, setUploading] = React.useState<boolean>(false);
  const imageRef = React.useRef<{ click: () => void } | null>(null);
  React.useEffect(() => {
    return () => {
      if (publicId) {
        deleteImage(publicId).then(console.log).catch(console.log);
      }
    };
  }, [publicId]);
  const handleImageClick = () => {
    imageRef.current?.click();
  };

  return {
    uploading,
    setUploading,
    imageRef,
    handleImageClick,
  };
};

export default useImageChanger;
