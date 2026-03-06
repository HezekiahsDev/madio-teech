import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://madiotech.com.ng/api/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Assuming Bearer, adjust if it's just the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API Endpoints
export const ApiService = {
  login: (data: any) => api.post('user/login.php', data),
  register: (data: any) => api.post('api/user/register.php', data), // NOTE: path is api/user/register.php per the java file
  
  fetchVtuNetworks: () => api.get('user/fetch_vtu.php'),
  fetchDataBundles: () => api.get('user/fetch_data.php'),
  getTransactions: () => api.get('user/transactions.php'),
  
  // Notice that airtime and data use 'apikey' as a query param.
  // In a real scenario, this key should be stored securely and retrieved.
  buyAirtime: (apiKey: string, amount: string, phone: string, networkCode: string) => 
    api.get(`airtime/`, {
      params: { apikey: apiKey, amount, phone, network_code: networkCode }
    }),
  
  buyData: (apiKey: string, productCode: string, phone: string, networkCode: string) => 
    api.get(`data/`, {
      params: { apikey: apiKey, product_code: productCode, phone, network_code: networkCode }
    }),
};
