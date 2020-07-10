import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Report } from 'app/compontents/Report';
import { Home } from 'app/compontents/Home';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/report" component={Report}/>
    </Switch>
  </div>
);

export default Routes;
