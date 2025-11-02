import jwt from "jsonwebtoken";

const createJwtToken = (payload: any) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("jwt secret isn't parsed successfully");
  }
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

export { createJwtToken };
