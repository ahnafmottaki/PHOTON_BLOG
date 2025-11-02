import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response as {
      status: number;
      data: { success: false; message: string };
    };
    if (status >= 400 && status < 500) {
      toast.error(`Client error (${status}): ${data.message}`);
    } else if (status >= 500) {
      toast.error(`Server Error (${status}): Please try again later`);
    }
  } else if (error.request) {
    if (error.code === "ECONNABORTED") {
      toast.error("Request timeout - please try again");
    } else if (error.code === "NETWORK_ERROR") {
      toast.error("Network error - check your internet connection");
    } else {
      toast.error(`Server unreachable - please try again later`);
    }
  } else {
    toast.error(`Request error: ${error.message}`);
  }
};

export default handleApiError;
