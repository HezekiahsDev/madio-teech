import { apiClient } from './client';

export interface Transaction {
  transaction_id: string;
  balance_before: string;
  balance_after: string;
  service: string;
  amount: string;
  network: string;
  date: string;
  status: string;
  true_response: string;
  description: string;
}

export const walletApi = {
  getTransactions: async (apiKey: string): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>('user/transactions.php', {
      headers: {
        Authorization: apiKey // Per Java code: @Header("Authorization") String apiKey
      }
    });
    return response.data;
  },

  getBalance: async (apiKey: string): Promise<any> => {
    // The Android app uses GET balance/?apikey=...
    const response = await apiClient.get(`balance/?apikey=${apiKey}`);
    return response.data;
  }
};
