import React from "react";

interface BlogHeaderProps {
  title: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title }) => {
  return (
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight mb-8">
      {title}
    </h1>
  );
};

export default BlogHeader;
