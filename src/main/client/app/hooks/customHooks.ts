import { useContext } from 'react';
import { ApiContext } from 'app/contexts/APIContext';
import { IStore } from 'app/interfaces/IStore';
import { StoreContext } from 'app/contexts/Store';
import { IApiClient } from 'app/interfaces/IApiClient';

export function useApi(): IApiClient {
  const api = useContext(ApiContext);
  if (api) {
    return api;
  }
  throw Error('API client not configured');
}

export function useStore(): IStore {
  return useContext(StoreContext);
}
