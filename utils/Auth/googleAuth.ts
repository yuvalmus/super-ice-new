import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { User } from "@/models/User";
import { users } from "@/mock/users";

// Development flag - set to true to bypass actual Google authentication
// IMPORTANT: Set this to false before deploying to production!
export const IS_DEV_MODE = true;
const DEV_USER_INDEX_TO_LOAD = 1;

// Register the redirect URI for your app
WebBrowser.maybeCompleteAuthSession();

// Configure Google OAuth
const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri();

// This would typically be stored securely in environment variables
// For development purposes only, we'll hardcode it here
const clientId = "YOUR_GOOGLE_CLIENT_ID";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

// TODO: implement backend that will return the user from the database
const getUserFromBackend = async (userInfo: any): Promise<User | null> => {
  const user = users.find((user) => user.email === userInfo.email);
  return user || null;
};

export const loginWithGoogle = async (): Promise<User | null> => {
  // In development mode, bypass the actual Google authentication
  if (IS_DEV_MODE) {
    console.log("DEV MODE: Using mock user without Google authentication");
    return users[DEV_USER_INDEX_TO_LOAD];
  }

  try {
    // Start the Google OAuth flow
    const request = new AuthSession.AuthRequest({
      clientId,
      redirectUri,
      responseType: "token",
      scopes: ["openid", "profile", "email"],
    });

    const result = await request.promptAsync(discovery);

    if (result.type === "success") {
      // Get user info from token
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${result.authentication?.accessToken}`,
          },
        }
      );

      const userInfo = await userInfoResponse.json();

      // For development: Use a mock user
      // In production: This would make a request to your backend API to verify the Google token
      // and return the appropriate user data from your system
      console.log("Authenticated with Google:", userInfo.email);

      // Using a mock user for now - in production this would come from your backend
      return getUserFromBackend(userInfo);
    }
    return null;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return null;
  }
};
