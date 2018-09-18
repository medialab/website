import React from 'react';
import {Route, Switch} from 'react-router';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" render={() => (<div>Match</div>)} />
      <Route render={() => (<div>Miss</div>)} />
    </Switch>
  );
}
