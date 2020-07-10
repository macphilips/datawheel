import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'app/Routes';
import { Header } from 'app/compontents/Header';
import apiClient from 'app/services/ApiClient';
import { ApiContext } from 'app/hooks/useApi';
import StoreProvider from 'app/hooks/useStore';

import './App.scss';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');


export const App = () => {
  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <Header/>
        <StoreProvider>
          <ApiContext.Provider value={apiClient}>
            <div className="container-fluid view-container" id="app-view-container">
              <AppRoutes/>
            </div>
          </ApiContext.Provider>
        </StoreProvider>
      </div>
    </Router>
  );
};
