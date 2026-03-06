import { Redirect } from 'expo-router';

// Root index simply redirects to the auth or tabs flow
export default function Index() {
  // TODO: Add actual auth check
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
