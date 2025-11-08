import crypto from "crypto";

const generateCloudinarySignature = (
  paramsToSign: Record<string, string | number>
) => {
  const apiSecret = process.env.CLOUDINARY_SECRET_KEY!;
  const sortedKeys = Object.keys(paramsToSign).sort();
  const signatureString =
    sortedKeys.map((key) => `${key}=${paramsToSign[key]}`).join("&") +
    apiSecret;
  return crypto.createHash("sha1").update(signatureString).digest("hex");
};

export { generateCloudinarySignature };
