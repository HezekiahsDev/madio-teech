import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  '9psb'?: string;
}

interface AuthState {
  user: User | null;
  bearerToken: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  login: (user: User, bearerToken: string, apiKey: string) => void;
  logout: () => void;
  updateWalletBalance: (newBalance: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      bearerToken: null,
      apiKey: null,
      isAuthenticated: false,

      login: (user, bearerToken, apiKey) => {
        set({
          user,
          bearerToken,
          apiKey,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          bearerToken: null,
          apiKey: null,
          isAuthenticated: false,
        });
      },

      updateWalletBalance: (newBalance: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, wallet: newBalance } : null
        }));
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for React Native
    }
  )
);
