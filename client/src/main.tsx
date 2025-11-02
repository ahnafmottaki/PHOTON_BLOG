import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/global.css";
import { RouterProvider } from "react-router";
import router from "@/router/router";
import { ThemeProvider } from "@/components/theme-provider";
import axios from "axios";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
