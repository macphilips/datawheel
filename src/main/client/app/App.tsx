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
        {/* register the StoreContext to make application states available to all it children */}
        <StoreProvider>
          {/* register the APIContext to make api client available to all it children */}
          <APIProvider>
            <div id="app-view-container">
              <AppRoutes />
            </div>
          </APIProvider>
        </StoreProvider>
      </div>
    </Router>
  );
};
