import React from "react";

interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return <p className="text-lg text-gray-600 leading-relaxed mb-6">{text}</p>;
};

export default Paragraph;
