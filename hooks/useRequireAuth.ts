import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import * as Linking from "expo-linking";

export function useRequireAuth() {
  const { user } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user && !isRedirecting) {
      // Prevent multiple redirects
      setIsRedirecting(true);

      // Small delay to ensure consistent state
      setTimeout(() => {
        // If user is not authenticated, redirect to login
        Linking.openURL(Linking.createURL("/login"));
      }, 50);
    }
  }, [user, isRedirecting]);

  return { user };
}
