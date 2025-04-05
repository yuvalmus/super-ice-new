import * as SecureStore from "expo-secure-store";

export const saveUserProfile = async (profile: Record<string, any>) => {
  try {
    console.log("Saving user profile to storage:", profile);
    await SecureStore.setItemAsync("userProfile", JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const getUserProfile = async (): Promise<Record<string, any> | null> => {
  try {
    const profileString = await SecureStore.getItemAsync("userProfile");
    const profile = profileString ? JSON.parse(profileString) : null;
    console.log("Retrieved user profile from storage:", profile);
    return profile;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};

export const removeUserProfile = async () => {
  try {
    console.log("Removing user profile from storage");
    await SecureStore.deleteItemAsync("userProfile");
  } catch (error) {
    console.error("Error deleting user profile:", error);
  }
};
