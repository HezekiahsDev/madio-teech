import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { User, Lock, Eye, EyeOff, Fingerprint } from "lucide-react-native";
import * as SecureStore from "expo-secure-store";
import { authApi } from "../../lib/api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { useBiometricsStore } from "../../store/biometricsStore";
import { authenticateWithBiometrics } from "../../utils/biometrics";
import BlobBackground from "../../components/svg/BlobBackground";
import AuthIllustration from "../../components/svg/AuthIllustration";

const LAST_USERNAME_KEY = "last_login_username";
const MAX_BIOMETRIC_CREDENTIAL_FAILURES = 3;

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isEnabled,
    isAvailable,
    biometricType,
    hasPromptedUser,
    checkAvailability,
    saveCredentials,
    getCredentials,
    enableBiometrics,
    disableBiometricsAfterCredentialFailures,
    recordBiometricCredentialFailure,
    resetBiometricCredentialFailures,
    setHasPromptedUser,
  } = useBiometricsStore();
  const [hasAttemptedBio, setHasAttemptedBio] = useState(false);

  // Check biometric availability on mount
  useEffect(() => {
    const bootstrapLoginHints = async () => {
      try {
        await checkAvailability();

        const savedUsername = await SecureStore.getItemAsync(LAST_USERNAME_KEY);
        if (savedUsername) {
          setUsername(savedUsername);
        }
      } catch (error) {
        console.error("Failed to bootstrap login hints:", error);
      }
    };

    bootstrapLoginHints();
  }, [checkAvailability]);

  // Auto-trigger biometric login if enabled
  useEffect(() => {
    const shouldAttemptAutoBio =
      isEnabled && isAvailable && !hasAttemptedBio && !isLoading;

    if (shouldAttemptAutoBio) {
      setHasAttemptedBio(true);
      handleBiometricLogin();
    }
  }, [hasAttemptedBio, isAvailable, isEnabled, isLoading]);

  const performLogin = async (user: string, pass: string) => {
    const response = await authApi.login({ username: user, password: pass });
    if (response && response.apiKey) {
      // The backend currently returns apiKey; we use it as the auth header token source.
      const authToken = response.apiKey;
      useAuthStore.getState().login(response, authToken, response.apiKey);
      await SecureStore.setItemAsync(
        LAST_USERNAME_KEY,
        response.username || user,
      );
      return response;
    } else {
      throw new Error(
        response.message || "Login failed. Please check your credentials.",
      );
    }
  };

  const promptBiometricSetup = (user: string, pass: string) => {
    const typeLabel = biometricType || "Biometrics";
    Alert.alert(
      `Enable ${typeLabel}?`,
      `Would you like to use ${typeLabel} for faster logins and secure payments?`,
      [
        {
          text: "Not Now",
          style: "cancel",
          onPress: () => {
            setHasPromptedUser();
            router.replace("/(tabs)");
          },
        },
        {
          text: "Enable",
          onPress: async () => {
            try {
              // Verify biometrics works before enabling
              const authResult = await authenticateWithBiometrics(
                `Verify ${typeLabel} to enable`,
              );
              if (authResult.success) {
                await saveCredentials(user, pass);
                enableBiometrics();
              }
            } catch (error) {
              console.error("Failed to enable biometrics:", error);
              Alert.alert(
                "Unable to enable biometrics",
                "Please try again from your profile settings.",
              );
            }
            setHasPromptedUser();
            router.replace("/(tabs)");
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleLogin = async () => {
    if (!username || !password) return;

    setIsLoading(true);
    try {
      await performLogin(username, password);

      // After successful login, check if we should prompt for biometrics
      if (isAvailable && !isEnabled && !hasPromptedUser) {
        promptBiometricSetup(username, password);
      } else {
        // If biometrics is already enabled, update stored credentials in case password changed
        if (isEnabled) {
          await saveCredentials(username, password);
        }
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(
        error?.response?.data?.message ||
          error.message ||
          "Network error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const typeLabel = biometricType || "Biometrics";
    setIsLoading(true);
    try {
      // Authenticate with biometrics
      const authResult = await authenticateWithBiometrics(
        `Sign in with ${typeLabel}`,
      );
      if (!authResult.success) {
        if (
          authResult.error !== "user_cancel" &&
          authResult.error !== "system_cancel"
        ) {
          alert("Authentication failed. Please use your password to sign in.");
        }
        return;
      }

      // Get stored credentials and login
      const credentials = await getCredentials();
      if (!credentials) {
        alert(
          "Stored credentials not found. Please sign in with your password.",
        );
        return;
      }

      try {
        await performLogin(credentials.username, credentials.password);
        resetBiometricCredentialFailures();
        router.replace("/(tabs)");
      } catch (credentialLoginError: any) {
        const failureCount = recordBiometricCredentialFailure();
        const remainingAttempts =
          MAX_BIOMETRIC_CREDENTIAL_FAILURES - failureCount;

        if (failureCount >= MAX_BIOMETRIC_CREDENTIAL_FAILURES) {
          await disableBiometricsAfterCredentialFailures();
          Alert.alert(
            "Biometric login disabled",
            "Biometric login was disabled after repeated credential failures. Use password login, reset your password if needed, then re-enable biometrics from profile.",
          );
          return;
        }

        Alert.alert(
          "Biometric login failed",
          credentialLoginError?.response?.data?.message ||
            credentialLoginError?.message ||
            `Stored credentials are no longer valid. ${remainingAttempts} attempt(s) remaining before biometric login is disabled.`,
        );
      }
    } catch (error: any) {
      console.error("Biometric login error:", error);

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Login failed. Please try with your password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showBiometricButton = isEnabled && isAvailable;
  const subtitleText = showBiometricButton
    ? `Use ${biometricType || "Biometrics"} to continue`
    : username
      ? `Welcome back, ${username}. Enter your password to continue.`
      : "Enter your username and password to continue";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BlobBackground variant="auth" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AuthIllustration size={160} />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>{subtitleText}</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#9CA3AF"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#9CA3AF" />
                ) : (
                  <Eye size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Recover password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Authenticating..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Biometric Login Button */}
          {showBiometricButton && (
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Fingerprint size={24} color="#0A0A0A" strokeWidth={1.5} />
              <Text style={styles.biometricButtonText}>
                Sign in with {biometricType || "Biometrics"}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>New here? </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Create an account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0A0A0A",
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    letterSpacing: 0.2,
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#0A0A0A",
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#0A0A0A",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#FAFAFA",
    gap: 10,
  },
  biometricButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A0A0A",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 15,
  },
  footerLink: {
    color: "#0A0A0A",
    fontSize: 15,
    fontWeight: "700",
  },
});
