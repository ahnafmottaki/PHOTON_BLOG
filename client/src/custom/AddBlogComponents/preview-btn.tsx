import { Button } from "@/components/ui/button";
interface PreviewButtonProp {
  onPreview: () => void;
  onPost: () => void;
}
export default function ActionButtons({
  onPreview,
  onPost,
}: PreviewButtonProp) {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <Button
        className=" font-bold rounded-lg shadow-md"
        variant={"outline"}
        onClick={onPreview}
      >
        Preview Blog
      </Button>
      <Button onClick={onPost} className=" font-bold rounded-lg shadow-md">
        Post
      </Button>
    </div>
  );
}
