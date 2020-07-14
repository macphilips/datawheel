import axios from 'axios';
import { SERVER_API_URL, TIMEOUT } from 'app/config/constants';
import { CounterDTO, IApiClient } from 'app/interfaces/IApiClient';

// configure a global axios instance for our APIClient.
const axiosInstance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: TIMEOUT
  // headers: {'Authorization': 'bearer foobar'}
});

/**
 * APIClient provides the interface between the client app and the backend server
 */
export class ApiClient implements IApiClient {
  async getCounter() {
    try {
      const response = await axiosInstance.get<CounterDTO>('counter');
      return response.data;
    } catch (e) {
      const { message, response } = e;
      const error = new APIError(message, 500);
      if (response) {
        error.message = response.data.detail;
        error.status = response.data.status;
      }
      throw error;
    }
  }

  async updateCount(counterDTO): Promise<CounterDTO> {
    return axiosInstance.put<CounterDTO>('counter', counterDTO).then(res => res.data);
  }
}

export class APIError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }
}

export default new ApiClient();
