import React, { SFC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Settings } from '#pages';

export const Routes: SFC = () => (
  <Switch>
    <Route component={Home} exact={true} path="/" />
    <Route component={Settings} exact={true} path="/settings" />
  </Switch>
);
