import { Redirect } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

// Root index simply redirects to the auth or tabs flow
export default function Index() {
  const { isAuthenticated, isSessionLocked, rehydrated } = useAuthStore();

  if (!rehydrated) {
    return null;
  }

  if (isAuthenticated && isSessionLocked) {
    return <Redirect href="/(auth)/unlock" />;
  }

  if (isAuthenticated && !isSessionLocked) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
