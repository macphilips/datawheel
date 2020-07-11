import React from 'react';

import './Header.scss';

export function Loader() {
  return (
    <div id="loader" className="center-in-page loading-bg">
      <div className="loading-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
