import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { TextAlignJustify, X } from "lucide-react";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";

const NavLink = ({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={path}
      className="text-base font-medium text-foreground transition-all duration-200 rounded focus:outline-none  hover:text-destructive focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(() => !isMenuOpen);
  };
  const navLinks = (
    <>
      <NavLink path="/features">Features</NavLink>
      <NavLink path="/blogs">Blogs</NavLink>
      <NavLink path="/automation">Profile</NavLink>
      <NavLink path="/addBlog">Add Blog</NavLink>
      <NavLink path="/myBlogs">My Blogs</NavLink>
    </>
  );
  return (
    <>
      <header className="py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <h1 className="text-3xl font-bold text-primary">Photon</h1>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <button
                type="button"
                className="text-gray-900"
                onClick={handleMenuOpen}
              >
                <span aria-hidden="true" className={isMenuOpen ? "hidden" : ""}>
                  <TextAlignJustify
                    className="text-card-foreground"
                    size={"30"}
                  />
                </span>
                <span aria-hidden="true" className={isMenuOpen ? "" : "hidden"}>
                  <X className="text-card-foreground" size={"30"} />
                </span>
              </button>
              <ModeToggle />
            </div>

            <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
              {navLinks}
            </div>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <NavLink path="/login">Login</NavLink>
              <Link to={"/register"}>
                <Button size={"rlg"}>Sign up</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>

          <nav
            className={`${
              isMenuOpen ? "h-auto" : "h-0"
            }  lg:h-0 overflow-hidden`}
          >
            <div className="px-1 py-8">
              <div className="grid gap-y-7 text-center">
                {navLinks}
                <NavLink path="/login">Login</NavLink>
                <Link to={"/register"}>
                  <Button className="w-full" size={"rlg"}>
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
