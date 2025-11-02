import { Button } from "@/components/ui/button";
import type React from "react";
type GoogleLoginProp = React.ComponentPropsWithoutRef<"button"> & {
  isLoginForm?: boolean;
};
const GoogleLogin: React.FC<GoogleLoginProp> = ({ isLoginForm, ...props }) => {
  return (
    <Button
      className="disabled:opacity-20"
      variant="outline"
      type="button"
      {...props}
    >
      {isLoginForm ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
};

export default GoogleLogin;
