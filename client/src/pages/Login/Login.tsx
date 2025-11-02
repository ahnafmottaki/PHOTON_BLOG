import { AuthForm } from "@/components/auth-form";
import type React from "react";

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formDetails = Object.fromEntries(new FormData(form).entries());
    console.log(formDetails);
    console.log("Login action triggered");
  };
  return (
    <AuthForm
      title="Welcome to PHOTON BLOG"
      description="Enter your email below to login to your account"
      loginForm
      submitFn={handleSubmit}
    />
  );
};

export default Login;
