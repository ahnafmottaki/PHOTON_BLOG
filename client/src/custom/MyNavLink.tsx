import { useAuth } from "@/contexts/Auth/auth-context";
import { NavLink } from "react-router";

const MyNavLink = ({
  path,
  children,
  handleMenuOpen,
}: {
  path: string;
  children: React.ReactNode;
  handleMenuOpen?: () => void;
}) => {
  return (
    <NavLink
      onClick={handleMenuOpen}
      to={path}
      className={({ isActive }) =>
        `text-base font-medium  transition-all duration-200 rounded focus:outline-none ${
          isActive ? "text-destructive underline" : "text-foreground"
        }  hover:text-destructive hover:underline`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
