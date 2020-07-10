import axios from 'axios';
import { SERVER_API_URL, TIMEOUT } from 'app/config/constants';

const axiosInstance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: TIMEOUT
  // headers: {'X-Custom-Header': 'foobar'}
});

export interface IApiClient {
  getCounter: () => Promise<number>
  updateCount: (counter: number) => Promise<void>
}

type GetCounterResponse = {
  totalCount: number
}

export class ApiClient implements IApiClient {
  async getCounter() {
    try {
      const response = await axiosInstance.get<GetCounterResponse>('counter');
      return response.data.totalCount;
    } catch (e) {
      console.log('error ' + e.status, e.message);
      throw e;
    }
  }

  async updateCount(counter: number) {
    axiosInstance.put<void>('counter/increment', { totalCount: counter });
  }
}

export default new ApiClient();
