import { useContext } from 'react';
import { ApiContext } from 'app/contexts/APIContext';
import { IStore } from 'app/interfaces/IStore';
import { StoreContext } from 'app/contexts/Store';
import { IApiClient } from 'app/interfaces/IApiClient';

// This is just wrapper hook function for IApiClient context
export function useApi(): IApiClient {
  const api = useContext(ApiContext);
  if (api) {
    return api;
  }
  throw Error('API client not configured');
}

// This is just wrapper hook function for IStore context
export function useStore(): IStore {
  return useContext(StoreContext);
}
