import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { useBiometricsStore } from "../store/biometricsStore";
import { getLastInactiveAt, recordLastInactiveAt } from "../utils/session";

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
        const inactiveAt = await getLastInactiveAt();
        if (inactiveAt === null) {
          return;
        }

        lockSession();
        return;
      }

      try {
        const inactiveAt = await getLastInactiveAt();
        if (inactiveAt === null) return;

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
            await recordLastInactiveAt();
            return;
          }

          if (nextState === "active" && isAuthenticated) {
            // Avoid re-locking while the dedicated unlock screen is already
            // handling biometric auth; otherwise the prompt can immediately
            // send the app active again and re-trigger the lock loop.
            if (isBiometricEnabled && !segments.includes("unlock")) {
              const inactiveAt = await getLastInactiveAt();
              if (inactiveAt === null) {
                return;
              }

              lockSession();
              return;
            }

            // For non-biometric users, apply inactivity timeout.
            const inactiveAt = await getLastInactiveAt();
            if (inactiveAt === null) return;

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
  }, [isAuthenticated, isBiometricEnabled, lockSession, logout, segments]);

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
