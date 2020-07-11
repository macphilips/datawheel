import React, { createContext, ReactNode } from 'react';
import apiClient from 'app/services/ApiClient';
import { IApiClient } from 'app/interfaces/IApiClient';

export const ApiContext = createContext<IApiClient | null>(null);
function APIProvider({ children }: { children: ReactNode }) {
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
}

export default APIProvider;
