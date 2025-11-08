import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/global.css";
import { RouterProvider } from "react-router";
import router from "@/router/router";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./contexts/Auth/auth-context";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
  // </StrictMode>
);
