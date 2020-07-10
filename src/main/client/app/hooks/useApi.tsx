import { createContext, useContext } from 'react';
import { IApiClient } from 'app/services/ApiClient';

export const ApiContext = createContext<IApiClient | null>(
  null
);

export function useApi(): IApiClient {
  const api = useContext(ApiContext);
  if (api) {
    return api;
  }
  throw Error('API client not configured');
}
