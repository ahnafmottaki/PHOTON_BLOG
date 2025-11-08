import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="row grid place-items-center min-h-[90vh]">
      <Spinner className="size-8" />
    </div>
  );
};

export default Loader;
