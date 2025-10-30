import { AuthForm } from "@/components/auth-form";
import type React from "react";

const Register = () => {
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register action triggered");
  };
  return (
    <AuthForm
      title="Sign up to PHOTON BLOG"
      description="Enter valid credentials to create your account"
      submitFn={handleRegister}
    />
  );
};

export default Register;
