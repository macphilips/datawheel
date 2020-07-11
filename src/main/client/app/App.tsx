import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'app/Routes';
import { Header } from 'app/compontents/Header';
import APIProvider from 'app/contexts/APIContext';
import StoreProvider from 'app/contexts/Store';

import './App.scss';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export const App = () => {
  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <Header />
        <StoreProvider>
          <APIProvider>
            <div className="container-fluid view-container" id="app-view-container">
              <AppRoutes />
            </div>
          </APIProvider>
        </StoreProvider>
      </div>
    </Router>
  );
};
