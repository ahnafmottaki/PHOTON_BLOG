import { useAuth } from "@/contexts/Auth/auth-context";
import React from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "./Loader";

const PrivatePage = ({ children }: React.PropsWithChildren) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivatePage;
