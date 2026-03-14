import { apiClient } from './client';

export interface VtuNetwork {
  networkID: string;
  network_name: string;
  // Based on standard VTU network models. Add exactly the fields needed later.
}

export interface DataPlan {
  // Typical data plan format. Add proper fields based on actual data
  id?: string;
  name?: string;
  price?: string;
}

export interface FetchDataResponse {
  [network: string]: {
    [planType: string]: DataPlan[];
  }
}

export const servicesApi = {
  fetchVtuNetworks: async (bearerToken: string): Promise<VtuNetwork[]> => {
    const response = await apiClient.get<VtuNetwork[]>('user/fetch_vtu.php', {
      headers: {
        Authorization: bearerToken
      }
    });
    return response.data;
  },

  fetchDataBundles: async (bearerToken: string): Promise<FetchDataResponse> => {
    const response = await apiClient.get<FetchDataResponse>('user/fetch_data.php', {
      headers: {
        Authorization: bearerToken
      }
    });
    return response.data;
  },

  buyAirtime: async (apiKey: string, amount: string, phone: string, networkCode: string): Promise<any> => {
    const response = await apiClient.get('airtime/', {
      params: {
        apikey: apiKey,
        amount,
        phone,
        network_code: networkCode,
        airtime_type: 'VTU'
      }
    });
    return response.data;
  },

  buyData: async (apiKey: string, productCode: string, phone: string, networkCode: string): Promise<any> => {
    const response = await apiClient.get('data/', {
      params: {
        apikey: apiKey,
        product_code: productCode,
        phone,
        network_code: networkCode
      }
    });
    return response.data;
  }
};
