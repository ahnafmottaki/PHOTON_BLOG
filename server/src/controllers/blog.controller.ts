import { withAuth } from "../utils/asyncHandler";

export const addBlog = withAuth((req, res, next) => {
  console.log("Hello ");
  console.log(req.body);
  res.end();
});
