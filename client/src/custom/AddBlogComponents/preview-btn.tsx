import { Button } from "@/components/ui/button";
interface PreviewButtonProp {
  onPreview: () => void;
}
export default function PreviewButton({ onPreview }: PreviewButtonProp) {
  return (
    <div className="mt-8 flex justify-end gap-3">
      <Button
        className=" font-bold rounded-lg shadow-md"
        variant={"outline"}
        onClick={onPreview}
      >
        Preview Blog
      </Button>
      <Button className=" font-bold rounded-lg shadow-md">Post</Button>
    </div>
  );
}
