import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { TextAlignJustify, X } from "lucide-react";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import MyNavLink from "./MyNavLink";
import { useAuth } from "@/contexts/Auth/auth-context";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(() => !isMenuOpen);
  };

  const handleLogout = () => {
    toast.promise(
      axios({
        method: "post",
        url: "/auth/logout",
        data: null,
        timeout: 3000,
      }),
      {
        loading: "logging out....",
        success: () => {
          setUser(null);
          return "logout successful";
        },
        error: "logout failed",
      }
    );
  };

  const deskTopLinks = (
    <>
      <MyNavLink path="/features">Features</MyNavLink>
      <MyNavLink path="/blogs">Blogs</MyNavLink>
      <MyNavLink path="/profile">Profile</MyNavLink>
      <MyNavLink path="/addBlog">Add Blog</MyNavLink>
      <MyNavLink path="/myBlogs">My Blogs</MyNavLink>
    </>
  );

  const mobileLinks = (
    <>
      <MyNavLink path="/features" handleMenuOpen={handleMenuOpen}>
        Features
      </MyNavLink>
      <MyNavLink path="/blogs" handleMenuOpen={handleMenuOpen}>
        Blogs
      </MyNavLink>
      <MyNavLink path="/profile" handleMenuOpen={handleMenuOpen}>
        Profile
      </MyNavLink>
      <MyNavLink path="/addBlog" handleMenuOpen={handleMenuOpen}>
        Add Blog
      </MyNavLink>
      <MyNavLink path="/myBlogs" handleMenuOpen={handleMenuOpen}>
        My Blogs
      </MyNavLink>
    </>
  );
  return (
    <div className="overflow-x-hidden bg-background">
      <header className="py-4 md:py-6 ">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <Link to={"/"}>
                <h1 className="text-3xl font-bold text-primary cursor-pointer ">
                  Photon
                </h1>
              </Link>
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
              {deskTopLinks}
            </div>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              {!user ? (
                <>
                  <MyNavLink path="/login">Login</MyNavLink>
                  <Link to={"/register"}>
                    <Button size={"rlg"}>Sign up</Button>
                  </Link>
                </>
              ) : (
                <Button size={"rlg"} onClick={handleLogout}>
                  Logout
                </Button>
              )}
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
                {mobileLinks}
                {!user ? (
                  <>
                    <MyNavLink path="/login" handleMenuOpen={handleMenuOpen}>
                      Login
                    </MyNavLink>
                    <Link to={"/register"}>
                      <Button
                        className="w-full"
                        size={"rlg"}
                        onClick={handleMenuOpen}
                      >
                        Sign up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button size={"rlg"} onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
