import { Button } from "@/components/ui/button";
interface PreviewButtonProp {
  onPreview: () => void;
}
export default function PreviewButton({ onPreview }: PreviewButtonProp) {
  return (
    <div className="mt-8 flex justify-end">
      <Button className=" font-bold rounded-lg shadow-md" onClick={onPreview}>
        Preview Blog
      </Button>
    </div>
  );
}
