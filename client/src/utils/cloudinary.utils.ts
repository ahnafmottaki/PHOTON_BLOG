import axios from "axios";
import getCloudinary from "./get-cloudinary";

const deleteImage = async (publicId: string) => {
  const { url, signature, api_key, timestamp } = await getCloudinary({
    action: "destroy",
    public_id: publicId,
  });
  const formData = new URLSearchParams({
    public_id: publicId,
    api_key,
    timestamp,
    signature,
  });
  const response = await axios.post(url, formData);
  return response.data;
};

const uploadToCloudinary = async (file: FormDataEntryValue) => {
  const { url, signature, api_key, timestamp } = await getCloudinary({
    action: "upload",
  });
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "blog_section");
  formData.append("timestamp", timestamp);
  formData.append("api_key", api_key);
  formData.append("signature", signature);
  const res = await axios.post(url, formData);
  return res.data;
};

export { deleteImage, uploadToCloudinary };
