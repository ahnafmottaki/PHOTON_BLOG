import RootLayout from "@/Layout/RootLayout";
import AddBlog from "@/pages/AddBlog/AddBlog";
import Homepage from "@/pages/Homepage/Homepage";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
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
    ],
  },
]);

export default router;
