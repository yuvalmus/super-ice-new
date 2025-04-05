import { getUserProfile } from "./authStorage";
import { User } from "@/models/User";

// Get the current active user from secure storage
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const storedUser = await getUserProfile();
    if (!storedUser) {
      return null;
    }

    return storedUser as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
