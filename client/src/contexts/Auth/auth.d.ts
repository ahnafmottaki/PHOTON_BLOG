import type React from "react";

type User = null | {
  username: string;
  email: string;
  bio: string;
  totalPosts: number;
  role: "admin" | "user";
};

interface AuthProviderState {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export { AuthProviderState, AuthProviderProps, User };
