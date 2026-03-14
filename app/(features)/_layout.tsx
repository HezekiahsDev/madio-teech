import { Stack } from 'expo-router';

export default function FeaturesLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
    }}>
      <Stack.Screen name="fund-wallet" />
      <Stack.Screen name="airtime" />
      <Stack.Screen name="buy-data" />
      <Stack.Screen name="upgrade" />
      <Stack.Screen name="account-settings" />
      <Stack.Screen name="security-privacy" />
      <Stack.Screen name="help-support" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="terms-conditions" />
      <Stack.Screen name="power" />
      <Stack.Screen name="cable" />
      <Stack.Screen name="exam" />
      <Stack.Screen name="betting" />
      <Stack.Screen name="more" />
    </Stack>
  );
}
