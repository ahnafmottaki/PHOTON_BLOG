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
import { useId } from "react";
import GoogleLogin from "@/custom/GoogleLogin";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

type AuthFromType = {
  className?: string;
  title: string;
  description: string;
  loginForm?: boolean;
  submitFn: (e: React.FormEvent<HTMLFormElement>) => void;
} & React.ComponentPropsWithoutRef<"div">;

export function AuthForm({
  className,
  title,
  description,
  submitFn,
  loginForm,
  ...props
}: AuthFromType) {
  const emailId = useId();
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
              <form onSubmit={submitFn}>
                <FieldGroup>
                  {!loginForm && (
                    <>
                      <Field>
                        <FieldLabel htmlFor={"username"}>username</FieldLabel>
                        <Input
                          id={"username"}
                          type="text"
                          placeholder="maximilian"
                          defaultValue={"maximilian"}
                          minLength={5}
                          maxLength={30}
                          required
                        />
                      </Field>
                    </>
                  )}
                  <Field>
                    <FieldLabel htmlFor={emailId}>Email</FieldLabel>
                    <Input
                      id={emailId}
                      type="email"
                      placeholder="m@example.com"
                      defaultValue={"maximilian2022@gmail.com"}
                      minLength={10}
                      maxLength={30}
                      required
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
                      maxLength={20}
                      defaultValue={"max201408mil"}
                    />
                  </Field>
                  <Field>
                    <Button type="submit">
                      {loginForm ? "Login" : "Sign up"}
                    </Button>
                    <GoogleLogin isLoginForm={loginForm} />
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
