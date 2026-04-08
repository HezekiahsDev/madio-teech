import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { isBiometricsAvailable, getBiometricType } from "../utils/biometrics";

interface BiometricsState {
  isEnabled: boolean;
  isAvailable: boolean;
  biometricType: string | null;
  hasPromptedUser: boolean;
  biometricCredentialFailureCount: number;
  rehydrated: boolean;
  enableBiometrics: () => void;
  disableBiometrics: () => Promise<void>;
  disableBiometricsAfterCredentialFailures: () => Promise<void>;
  setHasPromptedUser: () => void;
  checkAvailability: () => Promise<void>;
  saveCredentials: (username: string, password: string) => Promise<void>;
  getCredentials: () => Promise<{ username: string; password: string } | null>;
  clearCredentials: () => Promise<void>;
  recordBiometricCredentialFailure: () => number;
  resetBiometricCredentialFailures: () => void;
  _setRehydrated: (value: boolean) => void;
}

const CREDENTIALS_KEY_USER = "biometric_username";
const CREDENTIALS_KEY_PASS = "biometric_password";

export const useBiometricsStore = create<BiometricsState>()(
  persist(
    (set, get) => ({
      isEnabled: false,
      isAvailable: false,
      biometricType: null as string | null,
      hasPromptedUser: false,
      biometricCredentialFailureCount: 0,
      rehydrated: false,

      enableBiometrics: () => {
        set({ isEnabled: true, biometricCredentialFailureCount: 0 });
      },

      disableBiometrics: async () => {
        // Clear stored credentials when disabling
        try {
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_USER);
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_PASS);
        } catch (error) {
          console.error(
            "Failed to clear biometric credentials while disabling:",
            error,
          );
        }
        set({ isEnabled: false, biometricCredentialFailureCount: 0 });
      },

      disableBiometricsAfterCredentialFailures: async () => {
        try {
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_USER);
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_PASS);
        } catch (error) {
          console.error(
            "Failed to clear biometric credentials after credential failures:",
            error,
          );
        }

        set({
          isEnabled: false,
          hasPromptedUser: true,
          biometricCredentialFailureCount: 0,
        });
      },

      setHasPromptedUser: () => {
        set({ hasPromptedUser: true });
      },

      checkAvailability: async () => {
        try {
          const available = await isBiometricsAvailable();
          const type = available ? await getBiometricType() : null;
          set({ isAvailable: available, biometricType: type });
        } catch (error) {
          console.error("Failed to check biometric availability:", error);
          set({ isAvailable: false, biometricType: null });
        }
      },

      saveCredentials: async (username: string, password: string) => {
        try {
          await SecureStore.setItemAsync(CREDENTIALS_KEY_USER, username);
          await SecureStore.setItemAsync(CREDENTIALS_KEY_PASS, password);
          set({ biometricCredentialFailureCount: 0 });
        } catch (error) {
          console.error("Failed to save biometric credentials:", error);
          throw error;
        }
      },

      getCredentials: async () => {
        try {
          const username = await SecureStore.getItemAsync(CREDENTIALS_KEY_USER);
          const password = await SecureStore.getItemAsync(CREDENTIALS_KEY_PASS);
          if (username && password) {
            return { username, password };
          }
          return null;
        } catch (error) {
          console.error("Failed to read biometric credentials:", error);
          return null;
        }
      },

      clearCredentials: async () => {
        try {
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_USER);
          await SecureStore.deleteItemAsync(CREDENTIALS_KEY_PASS);
        } catch (error) {
          console.error("Failed to clear biometric credentials:", error);
          throw error;
        }
      },

      recordBiometricCredentialFailure: () => {
        const nextFailureCount = get().biometricCredentialFailureCount + 1;
        set({ biometricCredentialFailureCount: nextFailureCount });
        return nextFailureCount;
      },

      resetBiometricCredentialFailures: () => {
        set({ biometricCredentialFailureCount: 0 });
      },

      _setRehydrated: (value: boolean) => {
        set({ rehydrated: value });
      },
    }),
    {
      name: "biometrics-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist preference flags, not runtime state
      partialize: (state) => ({
        isEnabled: state.isEnabled,
        hasPromptedUser: state.hasPromptedUser,
        biometricCredentialFailureCount: state.biometricCredentialFailureCount,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate biometrics store:", error);
          }

          state?._setRehydrated(true);
        };
      },
    },
  ),
);
