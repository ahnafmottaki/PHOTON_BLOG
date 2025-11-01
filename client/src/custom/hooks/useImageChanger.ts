import React from "react";

const useImageChanger = () => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    imageRef.current?.click();
  };
  return { imageRef, handleImageClick };
};

export default useImageChanger;
