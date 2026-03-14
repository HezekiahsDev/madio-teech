import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { isBiometricsAvailable, getBiometricType } from '../utils/biometrics';

interface BiometricsState {
  isEnabled: boolean;
  isAvailable: boolean;
  biometricType: string | null;
  hasPromptedUser: boolean;
  enableBiometrics: () => void;
  disableBiometrics: () => Promise<void>;
  setHasPromptedUser: () => void;
  checkAvailability: () => Promise<void>;
  saveCredentials: (username: string, password: string) => Promise<void>;
  getCredentials: () => Promise<{ username: string; password: string } | null>;
  clearCredentials: () => Promise<void>;
}

const CREDENTIALS_KEY_USER = 'biometric_username';
const CREDENTIALS_KEY_PASS = 'biometric_password';

export const useBiometricsStore = create<BiometricsState>()(
  persist(
    (set) => ({
      isEnabled: false,
      isAvailable: false,
      biometricType: null,
      hasPromptedUser: false,

      enableBiometrics: () => {
        set({ isEnabled: true });
      },

      disableBiometrics: async () => {
        // Clear stored credentials when disabling
        await SecureStore.deleteItemAsync(CREDENTIALS_KEY_USER);
        await SecureStore.deleteItemAsync(CREDENTIALS_KEY_PASS);
        set({ isEnabled: false });
      },

      setHasPromptedUser: () => {
        set({ hasPromptedUser: true });
      },

      checkAvailability: async () => {
        const available = await isBiometricsAvailable();
        const type = available ? await getBiometricType() : null;
        set({ isAvailable: available, biometricType: type });
      },

      saveCredentials: async (username: string, password: string) => {
        await SecureStore.setItemAsync(CREDENTIALS_KEY_USER, username);
        await SecureStore.setItemAsync(CREDENTIALS_KEY_PASS, password);
      },

      getCredentials: async () => {
        const username = await SecureStore.getItemAsync(CREDENTIALS_KEY_USER);
        const password = await SecureStore.getItemAsync(CREDENTIALS_KEY_PASS);
        if (username && password) {
          return { username, password };
        }
        return null;
      },

      clearCredentials: async () => {
        await SecureStore.deleteItemAsync(CREDENTIALS_KEY_USER);
        await SecureStore.deleteItemAsync(CREDENTIALS_KEY_PASS);
      },
    }),
    {
      name: 'biometrics-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist preference flags, not runtime state
      partialize: (state) => ({
        isEnabled: state.isEnabled,
        hasPromptedUser: state.hasPromptedUser,
      }),
    }
  )
);
