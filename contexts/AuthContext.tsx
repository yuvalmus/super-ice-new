import React, { createContext, useContext, useState } from "react";
import { saveUserProfile, removeUserProfile } from "@/utils/Auth/authStorage";
import { loginWithGoogle as googleAuthLogin } from "@/utils/Auth/googleAuth";
import { User } from "@/models/User";

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loginWithGoogle: () => Promise<User | null>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loginWithGoogle: async () => null,
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  // Initialize state with the provided user (if any)
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  // Google Authentication Flow
  const handleGoogleLogin = async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      const userFromGoogle = await googleAuthLogin();

      if (userFromGoogle) {
        console.log("Login successful, saving user to storage");
        await saveUserProfile(userFromGoogle);
        setUser(userFromGoogle);
        return userFromGoogle;
      } else {
        console.log("Login failed, no user returned");
        return null;
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log("Logging out, removing user from storage");
    await removeUserProfile();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loginWithGoogle: handleGoogleLogin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
