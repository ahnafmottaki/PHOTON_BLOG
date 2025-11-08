import { AuthForm } from "@/components/auth-form";

const Login = () => {
  return (
    <AuthForm
      title="Welcome to PHOTON BLOG"
      description="Enter your email below to login to your account"
      loginForm={true}
    />
  );
};

export default Login;
