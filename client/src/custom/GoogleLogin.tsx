import { Button } from "@/components/ui/button";

const GoogleLogin = ({ isLoginForm }: { isLoginForm?: boolean }) => {
  return (
    <Button variant="outline" type="button">
      {isLoginForm ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
};

export default GoogleLogin;
