import RootLayout from "@/Layout/RootLayout";
import AddBlog from "@/pages/AddBlog/AddBlog";
import BlogsPage from "@/pages/Blogs/BlogsPage";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import MyBlogs from "@/pages/MyBlogs/MyBlogs";
import Register from "@/pages/Register/Register";
import ViewBlogPage from "@/pages/ViewBlogPage/ViewBlogPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "addBlog", element: <AddBlog /> },
      { path: "viewBlog", element: <ViewBlogPage /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "myBlogs", element: <MyBlogs /> },
    ],
  },
]);

export default router;
