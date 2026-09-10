import { apiClient } from "./client";
import { USE_SIMULATED_API, simulateDelay } from "./simulation";

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

const nowIso = () => new Date().toISOString().replace("T", " ").slice(0, 19);

const mockTransactions = (): Transaction[] => [
  {
    transaction_id: "SIM-TXN-1001",
    balance_before: "25500.00",
    balance_after: "25000.00",
    service: "airtime",
    amount: "500.00",
    network: "MTN",
    date: nowIso(),
    status: "success",
    true_response: "Delivered",
    description: "MTN Airtime Purchase",
  },
  {
    transaction_id: "SIM-TXN-1000",
    balance_before: "24000.00",
    balance_after: "25500.00",
    service: "wallet",
    amount: "1500.00",
    network: "wallet",
    date: nowIso(),
    status: "success",
    true_response: "Credited",
    description: "Wallet Funding",
  },
];

export const walletApi = {
  getTransactions: async (apiKey: string): Promise<Transaction[]> => {
    if (USE_SIMULATED_API) {
      await simulateDelay();
      return mockTransactions();
    }

    const response = await apiClient.get<Transaction[]>(
      "user/transactions.php",
      {
        headers: {
          Authorization: apiKey, // Per Java code: @Header("Authorization") String apiKey
        },
      },
    );
    return response.data;
  },

  getBalance: async (apiKey: string): Promise<any> => {
    if (USE_SIMULATED_API) {
      await simulateDelay();
      return {
        code: 200,
        wallet_balance: "25000.00",
        message: "Simulated balance",
      };
    }

    // The Android app uses GET balance/?apikey=...
    const response = await apiClient.get(`balance/?apikey=${apiKey}`);
    return response.data;
  },
};
