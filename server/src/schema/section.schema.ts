import * as z from "zod";
const Headings = z.object({
  type: z.literal("heading"),
  text: z.string().trim().min(10),
});

const Paragraphs = z.object({
  type: z.literal("paragraph"),
  text: z.string().trim().min(30),
});

const ImageSection = z.object({
  type: z.literal("image"),
  url: z.url({ hostname: /^res.cloudinary\.com$/, protocol: /^https$/ }),
  caption: z.string().trim().min(6),
});

const ImageAndTextSection = z.object({
  type: z.literal("img-and-paragraph"),
  url: z.url({ hostname: /^res.cloudinary\.com$/, protocol: /^https$/ }),
  title: z.string().trim().min(6),
  paragraph: z.string().trim().min(30),
});

const SectionsSchema = z
  .array(z.union([Headings, Paragraphs, ImageSection, ImageAndTextSection]))
  .min(2)
  .max(10);

type SectionArrayType = z.infer<typeof SectionsSchema>;

export { SectionsSchema, SectionArrayType };
