import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';

// Root index simply redirects to the auth or tabs flow
export default function Index() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
