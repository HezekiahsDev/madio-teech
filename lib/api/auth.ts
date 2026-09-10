import { apiClient } from "./client";
import { USE_SIMULATED_API, simulateDelay } from "./simulation";

export interface LoginRequest {
  username?: string;
  password?: string;
  authSource?: "manual" | "biometric";
}

export interface LoginResponse {
  uid: string;
  status: string;
  message: string;
  email: string;
  apiKey: string;
  wallet: string;
  username: string;
  phone: string;
  referral_credit: string;
  user_level: string;
  loginTimestamp?: number;
  palmpay: string;
  "9psb"?: string;
  notice1?: string;
  notice2?: string;
  notice3?: string;
  notice4?: string;
  notice5?: string;
}

export interface RegisterRequest {
  fulname?: string;
  username?: string;
  refer?: string;
  email?: string;
  phone?: string;
  pass1?: string;
  pass2?: string;
}

const mockLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  await simulateDelay();

  const username = request.username?.trim();
  const password = request.password?.trim();

  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  // Test path for stale biometric credential remediation:
  // - manual login works
  // - biometric login fails repeatedly and should trigger auto-disable
  if (
    request.authSource === "biometric" &&
    username.toLowerCase().startsWith("biofail")
  ) {
    throw new Error("Stored credentials are invalid. Please sign in again.");
  }

  return {
    uid: "sim-user-001",
    status: "success",
    message: "Simulated login successful",
    email: `${username}@example.test`,
    apiKey: `sim-api-key-${username}`,
    wallet: "25000.00",
    username,
    phone: "08000000000",
    referral_credit: "0",
    user_level: "1",
    loginTimestamp: Date.now(),
    palmpay: "SIM1234567",
    "9psb": "SIM7654321",
    notice1: "Simulation mode is enabled",
  };
};

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    if (USE_SIMULATED_API) {
      return mockLogin(request);
    }

    const response = await apiClient.post<LoginResponse>(
      "user/login.php",
      request,
    );
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<void> => {
    const response = await apiClient.post("api/user/register.php", request);
    return response.data;
  },
};
