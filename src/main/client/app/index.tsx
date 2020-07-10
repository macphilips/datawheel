import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/App';


const rootEl = document.getElementById('main');

const render = Component =>
  ReactDOM.render(
    <div>
      <Component/>
    </div>,
    rootEl
  );

render(App);
