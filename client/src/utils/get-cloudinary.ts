import { axiosSecure } from "@/custom/hooks/useAxiosEffect";
interface UploadType {
  action: "upload";
}
interface DestroyType {
  action: "destroy";
  public_id: string;
}
const getCloudinary = async (props: UploadType | DestroyType) => {
  const body: {
    action: UploadType["action"] | DestroyType["action"];
    params: {
      folder?: string;
      public_id?: DestroyType["public_id"];
    };
  } = {
    action: props.action,
    params: {},
  };
  if (props.action === "destroy") {
    body.params.public_id = props.public_id;
  } else {
    body.params.folder = "blog_section";
  }

  const response = await axiosSecure.post("/cloudinarySignature", body);
  const signData = response.data.data;
  const url = `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/${props.action}`;
  return { url, ...signData };
};

export default getCloudinary;
