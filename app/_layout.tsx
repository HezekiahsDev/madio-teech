import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/useAuthStore";
import { useBiometricsStore } from "../store/biometricsStore";

const LAST_INACTIVE_AT_KEY = "last_inactive_at";
const INACTIVITY_LIMIT_MS = 4 * 60 * 60 * 1000; // 4 hours

export default function RootLayout() {
  const {
    isAuthenticated,
    isSessionLocked,
    rehydrated: authRehydrated,
    logout,
    lockSession,
  } = useAuthStore();
  const { isEnabled: isBiometricEnabled, rehydrated: biometricsRehydrated } =
    useBiometricsStore();
  const segments = useSegments();
  const [isMounted, setIsMounted] = useState(false);
  const hasAppliedColdStartRules = useRef(false);
  const inAuthGroup = segments[0] === "(auth)";
  const storesReady = authRehydrated && biometricsRehydrated;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !storesReady || hasAppliedColdStartRules.current) {
      return;
    }

    hasAppliedColdStartRules.current = true;

    const enforceColdStartSessionRules = async () => {
      if (!isAuthenticated) {
        return;
      }

      if (isBiometricEnabled) {
        lockSession();
        return;
      }

      try {
        const inactiveAtStr = await AsyncStorage.getItem(LAST_INACTIVE_AT_KEY);
        if (!inactiveAtStr) return;

        const inactiveAt = Number(inactiveAtStr);
        const isExpired =
          Number.isFinite(inactiveAt) &&
          Date.now() - inactiveAt >= INACTIVITY_LIMIT_MS;
        if (isExpired) {
          await logout();
        }
      } catch (error) {
        console.error("Failed to enforce cold start session rules:", error);
      }
    };

    enforceColdStartSessionRules();
  }, [
    isAuthenticated,
    isBiometricEnabled,
    isMounted,
    lockSession,
    logout,
    storesReady,
  ]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextState) => {
        try {
          if (nextState === "inactive" || nextState === "background") {
            // Record when the app went inactive/backgrounded so we can
            // decide on resume whether the session expired.
            await AsyncStorage.setItem(
              LAST_INACTIVE_AT_KEY,
              String(Date.now()),
            );
            return;
          }

          if (nextState === "active" && isAuthenticated) {
            // Enforce biometric re-authentication on every app reopen
            // without destroying the user session.
            if (isBiometricEnabled) {
              lockSession();
              return;
            }

            // For non-biometric users, apply inactivity timeout.
            const inactiveAtStr =
              await AsyncStorage.getItem(LAST_INACTIVE_AT_KEY);
            if (!inactiveAtStr) return;

            const inactiveAt = Number(inactiveAtStr);
            const isExpired =
              Number.isFinite(inactiveAt) &&
              Date.now() - inactiveAt >= INACTIVITY_LIMIT_MS;
            if (isExpired) {
              await logout();
            }
          }
        } catch (error) {
          console.error("AppState session check failed:", error);
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, isBiometricEnabled, lockSession, logout]);

  useEffect(() => {
    if (!isMounted || !storesReady) return;

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated, redirect to login
      router.replace("/(auth)/login");
      return;
    }

    if (isAuthenticated && isSessionLocked && !inAuthGroup) {
      router.replace("/(auth)/unlock");
      return;
    }

    if (isAuthenticated && !isSessionLocked && inAuthGroup) {
      // User is authenticated but trying to access auth screens, redirect to dashboard
      router.replace("/(tabs)");
      return;
    }

    if (
      isAuthenticated &&
      isSessionLocked &&
      inAuthGroup &&
      !segments.includes("unlock")
    ) {
      router.replace("/(auth)/unlock");
    }
  }, [
    isAuthenticated,
    inAuthGroup,
    isMounted,
    isSessionLocked,
    segments,
    storesReady,
  ]);

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
