import { Button } from "@/components/ui/button";
interface PreviewButtonProp {
  onPreview: () => void;
  onPost: () => void;
  submitting: boolean;
}
export default function ActionButtons({
  onPreview,
  onPost,
  submitting,
}: PreviewButtonProp) {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <Button
        disabled={submitting}
        className="disabled:opacity-30 font-bold rounded-lg shadow-md"
        variant={"outline"}
        onClick={onPreview}
      >
        Preview Blog
      </Button>
      <Button
        onClick={onPost}
        disabled={submitting}
        className="disabled:opacity-30 font-bold rounded-lg shadow-md"
      >
        Post
      </Button>
    </div>
  );
}
