import { Button } from "@/components/ui/button";
import {
  SectionType,
  type BlogSection,
  type SectionLiterals,
} from "@/custom/AddBlogComponents/add-blog.type";
import PreviewButton from "@/custom/AddBlogComponents/preview-btn";
import Tools from "@/custom/AddBlogComponents/Tools";
import DialogView from "@/custom/DialogView";
import ShowBlog from "@/custom/ShowBlog";
import type { BlogType } from "@/custom/ViewBlogComponents/blog-related-types";
import { TrashIcon } from "lucide-react";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

const defaultBlog: Omit<BlogType, "sections"> = {
  likes: 17,
  dislikes: 5,
  authorInfo: {
    name: "Alex Johnson",
    username: "alexj",
    postsCount: 42,
    email: "alex.j@example.com",
    bio: "A passionate developer and writer exploring the intersection of technology, design, and human experience. Coffee enthusiast.",
    avatarUrl: "https://picsum.photos/id/1005/200/200",
  },
  comments: [
    {
      id: 1,
      author: "Jane Doe",
      text: "This was an incredibly insightful read. Thank you for sharing!",
      avatarUrl: "https://picsum.photos/id/1011/100/100",
      likes: 15,
      dislikes: 0,
    },
    {
      id: 2,
      author: "John Smith",
      text: "I have a slightly different perspective on the second point, but overall a great article.",
      avatarUrl: "https://picsum.photos/id/1012/100/100",
      likes: 8,
      dislikes: 2,
    },
  ],
};

const getInitialDataForSection = (type: SectionLiterals) => {
  switch (type) {
    case "heading":
      return { text: "New Heading" };
    case "paragraph":
      return { text: "New Paragraph Added" };
    case "image":
      return {
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        caption: "My caption",
      };
    case "image-and-text":
      return {
        url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
        title: "My Title",
        paragraph:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam! Facilis amet rerum dolorem officiis illum ab blanditiis commodi aspernatur!",
      };
    default:
      return {};
  }
};

const AddBlog = () => {
  const [showPreview, setShowPreview] = React.useState<boolean>(false);
  const [sections, setSections] = React.useState<BlogSection[]>([]);
  const handleShowPreview = useCallback(() => {
    if (sections.length === 0) {
      toast.error("No Blog Section Added!", {
        className: "bg-primary text-primary-foreground",
      });
      return;
    }
    setShowPreview((prev) => !prev);
  }, [sections]);
  const updateSection = (id: string, updatedData: Partial<BlogSection>) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? ({ ...section, ...updatedData } as BlogSection)
          : section
      )
    );
  };
  const renderSectionInputs = (section: BlogSection) => {
    switch (section.type) {
      case SectionType.HEADING:
        return (
          <input
            type="text"
            value={section.text}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              updateSection(section.id, { text: e.currentTarget.value })
            }
            className="w-full text-3xl md:text-4xl font-bold p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent"
          />
        );
      case SectionType.PARAGRAPH:
        return (
          <textarea
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
              updateSection(section.id, { text: e.currentTarget.value })
            }
            value={section.text}
            className="w-full text-lg p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent h-40 resize-y min-h-[200px] max-h-[500px]"
          />
        );
      case SectionType.IMAGE:
        return (
          <div className="flex flex-col items-center">
            <img
              src={section.url}
              alt={section.caption}
              className="rounded-lg shadow-md max-w-full h-auto mb-2"
            />
            <input
              type="text"
              value={section.caption}
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                updateSection(section.id, { caption: e.currentTarget.value })
              }
              className="w-full text-center text-gray-500 italic p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent"
              placeholder="Image caption"
            />
          </div>
        );
      case SectionType.IMAGE_AND_TEXT:
        return (
          <div className="flex flex-col md:flex-row gap-6 items-start">
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
                  updateSection(section.id, { title: e.currentTarget.value })
                }
                className="w-full text-2xl font-semibold p-2 border-2 border-transparent focus:border-blue-500 rounded-md bg-transparent mb-2"
              />
              <textarea
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
                  updateSection(section.id, {
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
  };

  const handleAddSection = (type: SectionLiterals) => {
    const newSection = {
      id: new Date().toISOString(),
      type,
      ...getInitialDataForSection(type),
    } as BlogSection;
    setSections((prevSections) => [...prevSections, newSection]);
    console.log("section added to state");
  };
  console.log(sections);

  return (
    <>
      <section className="row">
        <header className="my-8 sm:my-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Blog Post Builder
          </h1>
          <p className="text-lg text-foreground mt-3">
            Add, edit, and arrange sections to create your perfect post.
          </p>
        </header>
        <section className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative p-6  rounded-xl shadow-sm border  group"
            >
              {renderSectionInputs(section)}
              <Button
                variant={"outline"}
                className="absolute top-2 right-2 p-2  opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove section"
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </section>
        <Tools onAddSection={handleAddSection} />
        <PreviewButton onPreview={handleShowPreview} />
      </section>
      {showPreview && (
        <DialogView onOverlayClick={handleShowPreview}>
          {/* <div className="row h-9/10 bg-background sm:p-10 p-7 overflow-auto"> */}
          <ShowBlog blog={{ sections, ...defaultBlog }} />
          {/* </div> */}
        </DialogView>
      )}
    </>
  );
};

export default AddBlog;
