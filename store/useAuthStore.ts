import { create } from "zustand";
import { useBiometricsStore } from "./biometricsStore";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  uid?: string;
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  phone?: string;
  wallet?: string;
  status?: string;
  message?: string;
  user_level?: string;
  referral_credit?: string;
  suspend?: string | null;
  wema?: string | null;
  sterling?: string | null;
  account_name?: string | null;
  pincode?: string;
  notice1?: string;
  notice2?: string;
  palmpay?: string;
  "9psb"?: string;
}

interface AuthState {
  user: User | null;
  bearerToken: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  isSessionLocked: boolean;
  rehydrated: boolean;
  login: (user: User, bearerToken: string, apiKey: string) => void;
  logout: () => Promise<void>;
  lockSession: () => void;
  unlockSession: () => void;
  updateWalletBalance: (newBalance: string) => void;
  showBalance: boolean;
  setShowBalance: (visible: boolean) => void;
  _setRehydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      bearerToken: null,
      apiKey: null,
      isAuthenticated: false,
      isSessionLocked: false,
      rehydrated: false,
      showBalance: true,

      login: (user, bearerToken, apiKey) => {
        set({
          user,
          bearerToken,
          apiKey,
          isAuthenticated: true,
          isSessionLocked: false,
        });
      },

      logout: async () => {
        // Clear any saved biometric credentials when user logs out
        const clearBio = useBiometricsStore.getState().clearCredentials;
        if (clearBio) {
          try {
            await clearBio();
          } catch (error) {
            console.error("Failed to clear biometric credentials:", error);
          }
        }

        set({
          user: null,
          bearerToken: null,
          apiKey: null,
          isAuthenticated: false,
          isSessionLocked: false,
        });
      },

      lockSession: () => {
        set((state) => {
          if (!state.isAuthenticated) {
            return state;
          }

          return { isSessionLocked: true };
        });
      },

      unlockSession: () => {
        set((state) => {
          if (!state.isAuthenticated) {
            return state;
          }

          return { isSessionLocked: false };
        });
      },

      updateWalletBalance: (newBalance: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, wallet: newBalance } : null,
        }));
      },

      setShowBalance: (visible: boolean) => {
        set(() => ({ showBalance: visible }) as any);
      },

      _setRehydrated: (value: boolean) => {
        set({ rehydrated: value });
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
      partialize: (state) => ({
        user: state.user,
        bearerToken: state.bearerToken,
        apiKey: state.apiKey,
        isAuthenticated: state.isAuthenticated,
        showBalance: state.showBalance,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate auth store:", error);
          }

          state?._setRehydrated(true);
        };
      },
    },
  ),
);
