import { AuthForm } from "@/components/auth-form";
import type React from "react";
import axios from "axios";

const Register = () => {
  const handleRegister = async (
    formDetails: Record<string, FormDataEntryValue>
  ) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formDetails
    );
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
