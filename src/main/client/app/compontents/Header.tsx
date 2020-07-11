import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export function Header() {
  return (
    <nav className="header-root">
      <ul>
        <li>
          <NavLink exact to={'/'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to={'/report'}>
            Report
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
