# Authentication Implementation

This document explains how authentication is implemented in the Super Ice app.

## Overview

The app uses Google Authentication with Expo's `expo-auth-session` for the login flow. This implementation is designed to work with a future backend service that will handle the actual verification and user management.

## Architecture

The authentication system follows this architecture:

1. **App Initialization**:

   - During app startup in `_layout.tsx`, the app checks for a stored user
   - If a user is found, it's loaded from SecureStore and passed to the AuthContext
   - The splash screen is shown until this process completes

2. **AuthContext**:

   - Maintains the current user state throughout the app
   - Provides methods for login and logout
   - Receives the initial user from the app layout

3. **Storage**:
   - User data is stored securely using Expo's SecureStore
   - This allows the app to remember logged-in users between app launches

## Current Implementation (Development Mode)

In development mode, without a backend service:

1. The app uses Google authentication to obtain a user token
2. Instead of verifying the token with a backend, we use a mock user account
3. User data is stored in SecureStore for persistence across app launches

## Development Mode

For faster development without having to use Google Sign-In each time:

1. The app includes a development flag (`IS_DEV_MODE`) in `utils/Auth/googleAuth.ts`
2. When this flag is set to `true`, clicking the login button will immediately log you in with the mock user
3. No actual Google authentication will be performed
4. To switch back to real authentication, set `IS_DEV_MODE = false`

## How to Use Authentication in Components

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user } = useAuth();

  // Access user properties
  const userId = user?.id;
  const userName = user?.name;

  return <Text>Hello, {userName}</Text>;
}
```

## Protected Routes

To protect a route/screen, use the `useRequireAuth` hook:

```typescript
import { useRequireAuth } from "@/hooks/useRequireAuth";

function ProtectedScreen() {
  // This will redirect to login if not authenticated
  const { user } = useRequireAuth();

  // If user is not authenticated, the hook will handle redirect
  if (!user) return null;

  return <Text>Protected content</Text>;
}
```

## Login Flow

The login process follows these steps:

1. User taps the login button on the login screen
2. In development mode, a mock user is immediately returned
3. In production mode, the Google authentication flow is triggered
4. Once authentication succeeds, the user data is:
   - Saved to SecureStore for persistence
   - Set in the AuthContext for global access
   - The app navigates to the home screen

## Preparation for Backend Integration

When implementing the backend service:

1. Update the `loginWithGoogle` function in `utils/Auth/googleAuth.ts` to send the Google token to your backend
2. The backend should verify the token with Google, check if the user is authorized, and return user details
3. No changes will be needed to the components using `useAuth()` as they will continue to work with the same interface
4. Set `IS_DEV_MODE = false` to ensure real authentication is used

## Testing Authentication

For testing purposes during development:

- The app uses a mock user defined in `googleAuth.ts`
- You can modify this user to test different roles or permissions
- When you click the "Sign in with Google" button, this mock user will be used regardless of the Google account selected
- You can set `IS_DEV_MODE = true` to bypass Google authentication entirely
