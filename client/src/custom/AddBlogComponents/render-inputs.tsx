import React from "react";
import { SectionType, type BlogSection } from "./add-blog.type";
import toast from "react-hot-toast";

interface RenderInputsProp {
  section: BlogSection;
  onUpdate: (id: string, updatedData: Partial<BlogSection>) => void;
}

const RenderInputs = React.forwardRef<
  { trigger: () => void },
  RenderInputsProp
>(({ section, onUpdate }, ref) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle(ref, () => {
    return {
      trigger() {
        inputRef.current?.click();
      },
    };
  });

  React.useEffect(() => {
    if (section.type.includes("image")) {
      inputRef.current?.addEventListener("change", function () {
        const fileInput = this;
        if (fileInput && fileInput.files) {
          const file = fileInput?.files[0];
          if (file.size > 1 * 1024 * 1024) {
            toast.error("file can't be more than 1mb");
            return;
          }
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          // Check file's MIME type
          if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, JPEG, and PNG are allowed.");
            fileInput.value = ""; // Clear the input field
            return;
          }

          const imageUrl = URL.createObjectURL(file);
          console.log(imageUrl);
          onUpdate(section.id, { url: imageUrl });
          URL.revokeObjectURL(imageUrl);
        }
      });
    }
  }, []);
  switch (section.type) {
    case SectionType.HEADING:
      return (
        <input
          type="text"
          value={section.text}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            onUpdate(section.id, { text: e.currentTarget.value })
          }
          className="w-full text-3xl md:text-4xl font-bold p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent"
        />
      );
    case SectionType.PARAGRAPH:
      return (
        <textarea
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
            onUpdate(section.id, { text: e.currentTarget.value })
          }
          value={section.text}
          className="w-full text-lg p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent h-40 resize-y min-h-[200px] max-h-[500px]"
        />
      );
    case SectionType.IMAGE:
      return (
        <div className="flex flex-col items-center">
          <input type="file" className="hidden" ref={inputRef} />
          <img
            src={section.url}
            alt={section.caption}
            height={777}
            className="rounded-lg shadow-md max-w-full h-auto mb-2"
          />
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
      );
    case SectionType.IMAGE_AND_TEXT:
      return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <input type="file" className="hidden" ref={inputRef} />
          <img
            src={section.url}
            alt={section.title}
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
          />
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
      );
    default:
      return null;
  }
});
export default RenderInputs;
