import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/Auth/auth-context";
import type React from "react";
type GoogleLoginProp = React.ComponentPropsWithoutRef<"button"> & {
  isLoginForm?: boolean;
};
const GoogleLogin: React.FC<GoogleLoginProp> = ({
  isLoginForm,
  disabled,
  ...props
}) => {
  const { isLoading } = useAuth();
  return (
    <Button
      className="disabled:opacity-20"
      variant="outline"
      type="button"
      disabled={disabled}
      {...props}
    >
      {(isLoading || disabled) && <Spinner />}
      {isLoginForm ? "Login with Google" : "Sign up with Google"}
    </Button>
  );
};

export default GoogleLogin;
