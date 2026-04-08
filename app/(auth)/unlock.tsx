import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { Fingerprint, LogOut } from "lucide-react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { useBiometricsStore } from "../../store/biometricsStore";
import { authenticateWithBiometrics } from "../../utils/biometrics";
import BlobBackground from "../../components/svg/BlobBackground";
import AuthIllustration from "../../components/svg/AuthIllustration";

export default function UnlockScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAuthenticated,
    isSessionLocked,
    rehydrated: authRehydrated,
    unlockSession,
    logout,
  } = useAuthStore();
  const {
    isEnabled,
    isAvailable,
    biometricType,
    rehydrated: biometricsRehydrated,
    checkAvailability,
  } = useBiometricsStore();

  useEffect(() => {
    checkAvailability();
  }, [checkAvailability]);

  useEffect(() => {
    const storesReady = authRehydrated && biometricsRehydrated;
    if (!storesReady) return;

    if (!isAuthenticated) {
      router.replace("/(auth)/login");
      return;
    }

    if (!isSessionLocked) {
      router.replace("/(tabs)");
      return;
    }

    if (!isEnabled) {
      router.replace("/(auth)/login");
    }
  }, [
    authRehydrated,
    biometricsRehydrated,
    isAuthenticated,
    isEnabled,
    isSessionLocked,
  ]);

  const handleUnlock = async () => {
    if (!isAvailable) {
      Alert.alert(
        "Biometrics unavailable",
        "Biometric authentication is not available. Sign out and use password login.",
      );
      return;
    }

    const typeLabel = biometricType || "Biometrics";
    setIsLoading(true);

    try {
      const authResult = await authenticateWithBiometrics(
        `Unlock with ${typeLabel}`,
      );

      if (!authResult.success) {
        if (
          authResult.error !== "user_cancel" &&
          authResult.error !== "system_cancel"
        ) {
          Alert.alert(
            "Authentication failed",
            `Unable to unlock with ${typeLabel}. Try again or sign out to continue with password login.`,
          );
        }
        return;
      }

      unlockSession();
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Unlock error:", error);
      Alert.alert(
        "Unlock failed",
        error?.message || "Unable to unlock session right now.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign out from unlock screen failed:", error);
      Alert.alert("Sign out failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <BlobBackground variant="auth" />
      <View style={styles.content}>
        <AuthIllustration size={140} />
        <Text style={styles.title}>Session Locked</Text>
        <Text style={styles.subtitle}>
          Verify with {biometricType || "Biometrics"} to continue.
        </Text>

        <TouchableOpacity
          style={[styles.primaryButton, isLoading && styles.disabledButton]}
          onPress={handleUnlock}
          disabled={isLoading}
          activeOpacity={0.9}
        >
          <Fingerprint size={22} color="#FFFFFF" strokeWidth={1.8} />
          <Text style={styles.primaryButtonText}>
            {isLoading
              ? "Authenticating..."
              : `Unlock with ${biometricType || "Biometrics"}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSignOut}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#DC2626" strokeWidth={1.8} />
          <Text style={styles.secondaryButtonText}>
            Sign out and use password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: "800",
    color: "#0A0A0A",
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  primaryButton: {
    marginTop: 8,
    width: "100%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0A0A0A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: 6,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
  },
});
