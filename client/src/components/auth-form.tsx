import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import GoogleLogin from "@/custom/GoogleLogin";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import isValid from "@/utils/isValid";
import getErrorMessage from "@/utils/handle-api-error";
import { useAuth } from "@/contexts/Auth/auth-context";

type AuthFromType = {
  className?: string;
  title: string;
  description: string;
  loginForm?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export function AuthForm({
  className,
  title,
  description,
  loginForm,
  ...props
}: AuthFromType) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDetails = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    for (const [key, value] of Object.entries(formDetails)) {
      if (!isValid[key](value)) {
        return;
      }
    }
    setIsSubmitting(true);
    toast.promise(
      axios({
        method: "post",
        url: `/auth/${loginForm ? "login" : "register"}`,
        data: formDetails,
        timeout: 3000,
      }),
      {
        loading: loginForm ? "Logging in...." : "Registering....",
        success: (response: AxiosResponse) => {
          setUser(response.data.data);
          setIsSubmitting(false);
          navigate("/");
          return `${loginForm ? "Login" : "Registration"} successful`;
        },
        error: (error: AxiosError) => {
          setIsSubmitting(false);
          return getErrorMessage(error);
        },
      }
    );
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister}>
                <FieldGroup>
                  {!loginForm && (
                    <>
                      <Field>
                        <FieldLabel htmlFor={"username"}>username</FieldLabel>
                        <Input
                          id={"username"}
                          type="text"
                          name="username"
                          placeholder="maximilian"
                          defaultValue={"maximilian"}
                          minLength={5}
                          maxLength={20}
                          required
                        />
                      </Field>
                    </>
                  )}
                  <Field>
                    <FieldLabel htmlFor={"email"}>Email</FieldLabel>
                    <Input
                      id={"email"}
                      type="email"
                      placeholder="m@example.com"
                      defaultValue={"maximilian2022@gmail.com"}
                      minLength={14}
                      maxLength={35}
                      required
                      name="email"
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      {loginForm && (
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      )}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      maxLength={15}
                      defaultValue={"max201408mil"}
                      name="password"
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isSubmitting}>
                      {loginForm ? "Login" : "Sign up"}
                    </Button>
                    <GoogleLogin
                      isLoginForm={loginForm}
                      disabled={isSubmitting}
                    />
                    <FieldDescription className="text-center">
                      {loginForm ? (
                        <>
                          Don&apos;t have an account?{" "}
                          <Link to={"/register"}>Sign up</Link>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <Link to={"/login"}>Login</Link>
                        </>
                      )}
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>

            <Button variant={"link"}>
              <Link to={"/"} className="flex justify-center items-center gap-2">
                <ArrowRight />
                Go Home
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
