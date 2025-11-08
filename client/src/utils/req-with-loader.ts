import { axiosSecure } from "@/custom/hooks/useAxiosEffect";
import type { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

interface WithLoaderProps {
  request: AxiosRequestConfig;
  loadingMsg: string;
  onSuccess: (...params: any[]) => string;
  onError: (...params: any[]) => string;
}
const reqWithLoader = ({
  request,
  loadingMsg,
  onSuccess,
  onError,
}: WithLoaderProps) => {
  return toast.promise(axiosSecure(request), {
    loading: loadingMsg,
    success: onSuccess,
    error: onError,
  });
};
export default reqWithLoader;
