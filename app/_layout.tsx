import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/useAuthStore";
import { useBiometricsStore } from "../store/biometricsStore";

const LAST_INACTIVE_AT_KEY = "last_inactive_at";
const INACTIVITY_LIMIT_MS = 4 * 60 * 60 * 1000; // 4 hours

export default function RootLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const { isEnabled: isBiometricEnabled } = useBiometricsStore();
  const segments = useSegments();
  const [isMounted, setIsMounted] = useState(false);
  const inAuthGroup = segments[0] === "(auth)";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const enforceColdStartSessionRules = async () => {
      if (!isAuthenticated) return;

      if (isBiometricEnabled && !inAuthGroup) {
        // Biometric users should always re-authenticate when app is opened.
        logout();
        return;
      }

      const inactiveAtStr = await AsyncStorage.getItem(LAST_INACTIVE_AT_KEY);
      if (!inactiveAtStr) return;

      const inactiveAt = Number(inactiveAtStr);
      const isExpired =
        Number.isFinite(inactiveAt) &&
        Date.now() - inactiveAt >= INACTIVITY_LIMIT_MS;
      if (!isCancelled && isExpired) {
        logout();
      }
    };

    enforceColdStartSessionRules();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, isBiometricEnabled, logout]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextState) => {
        if (nextState === "inactive" || nextState === "background") {
          // Record when the app went inactive/backgrounded so we can
          // decide on resume whether the session expired. Do NOT force
          // logout here — preserving in-place UX when users briefly
          // minimize the app is important.
          await AsyncStorage.setItem(LAST_INACTIVE_AT_KEY, String(Date.now()));
          return;
        }

        if (nextState === "active" && isAuthenticated) {
          // On resume, if the inactivity exceeded the configured limit
          // (4 hours), clear the session. This covers both biometric and
          // non-biometric users for long inactivity. Short minimizations
          // will keep the user in place.
          const inactiveAtStr =
            await AsyncStorage.getItem(LAST_INACTIVE_AT_KEY);
          if (!inactiveAtStr) return;

          const inactiveAt = Number(inactiveAtStr);
          const isExpired =
            Number.isFinite(inactiveAt) &&
            Date.now() - inactiveAt >= INACTIVITY_LIMIT_MS;
          if (isExpired) {
            logout();
          }
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, isBiometricEnabled, logout]);

  useEffect(() => {
    if (!isMounted) return;

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated, redirect to login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // User is authenticated but trying to access auth screens, redirect to dashboard
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isMounted]);
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(features)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
