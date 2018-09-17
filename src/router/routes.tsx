import React, { SFC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '#pages';

export const Routes: SFC = () => (
  <Switch>
    <Route component={Home} exact={true} path='/' />
  </Switch>
);
