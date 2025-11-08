import React from "react";
import type { AuthProviderProps, AuthProviderState, User } from "./auth";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosSecure } from "@/custom/hooks/useAxiosEffect";

const initialState: AuthProviderState = {
  user: null,
  setUser() {},
  isLoading: true,
};

const AuthContext = React.createContext<AuthProviderState>(initialState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        await new Promise((res, _) => setTimeout(res, 3000));
        const response = await axiosSecure({
          method: "post",
          url: "/auth/logged",
          data: null,
        });
        setUser(response.data.data);
        toast.success("Welcome back " + response.data.data.username);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const contextValue = {
    user,
    setUser: (user: User) => {
      setUser(user);
    },
    isLoading,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used withing a AuthProvider");
  }
  return authContext;
};

export { AuthProvider, useAuth };
