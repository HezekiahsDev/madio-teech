import { Stack } from 'expo-router';

export default function FeaturesLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        fontWeight: '700',
        color: '#0f172a',
      },
      headerTintColor: '#0f172a', /* color of back button */
    }}>
      <Stack.Screen name="fund-wallet" options={{ title: "Fund Wallet" }} />
      <Stack.Screen name="airtime" options={{ title: "Airtime Top-Up" }} />
      <Stack.Screen name="buy-data" options={{ title: "Buy Data" }} />
    </Stack>
  );
}
