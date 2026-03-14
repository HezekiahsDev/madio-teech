import { apiClient } from './client';

export interface LoginRequest {
  username?: string;
  password?: string;
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
  '9psb'?: string;
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

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('user/login.php', request);
    return response.data;
  },

  register: async (request: RegisterRequest): Promise<void> => {
    const response = await apiClient.post('api/user/register.php', request);
    return response.data;
  }
};
