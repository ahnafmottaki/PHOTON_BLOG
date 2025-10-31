import React from "react";

interface ImageTextSectionProps {
  imageUrl: string;
  title: string;
  text: string;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  imageUrl,
  title,
  text,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 my-12">
      <div className="md:w-1/2 shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded-lg shadow-md object-cover"
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-muted-foreground mb-4">
          {title}
        </h2>
        <p className="text-lg text-accent-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default ImageTextSection;
