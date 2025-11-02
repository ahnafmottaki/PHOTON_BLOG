import React from "react";
import type { AuthProviderProps, AuthProviderState, User } from "./auth";

const initialState: AuthProviderState = {
  user: null,
  setUser() {},
};

const AuthContext = React.createContext<AuthProviderState>(initialState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const contextValue = {
    user,
    setUser: (user: User) => {
      setUser(user);
    },
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
