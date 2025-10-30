import React from "react";

interface ImageSectionProps {
  imageUrl: string;
  caption: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({ imageUrl, caption }) => {
  return (
    <figure className="my-10">
      <img
        src={imageUrl}
        alt={caption}
        className="w-full h-auto rounded-lg shadow-lg object-cover"
      />
      <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageSection;
