import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  user: any | null;
  token: string | null;
  apiKey: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, apiKey: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  apiKey: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (token: string, apiKey: string, userData: any) => {
    await SecureStore.setItemAsync('userToken', token);
    await SecureStore.setItemAsync('apiKey', apiKey);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    set({ token, apiKey, user: userData, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('apiKey');
    await SecureStore.deleteItemAsync('userData');
    set({ token: null, apiKey: null, user: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const apiKey = await SecureStore.getItemAsync('apiKey');
      const userDataStr = await SecureStore.getItemAsync('userData');
      
      if (token && apiKey && userDataStr) {
        set({ 
          token, 
          apiKey,
          user: JSON.parse(userDataStr), 
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      set({ isLoading: false });
    }
  }
}));
