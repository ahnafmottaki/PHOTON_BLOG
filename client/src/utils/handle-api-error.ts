import type { AxiosError } from "axios";

const getErrorMessage = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response as {
      status: number;
      data: { success: false; message: string };
    };
    if (status >= 400 && status < 500) {
      return `Client error (${status}): ${data.message}`;
    } else if (status >= 500) {
      return `Server Error (${status}): Please try again later`;
    }
  } else if (error.request) {
    if (error.code === "ECONNABORTED") {
      return "Request timeout - please try again";
    } else if (error.code === "NETWORK_ERROR") {
      return "Network error - check your internet connection";
    } else {
      return `Server unreachable - please try again later`;
    }
  }
  return `Request error: ${error.message}`;
};

export default getErrorMessage;
