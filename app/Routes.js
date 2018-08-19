/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import BuyPage from './containers/BuyPage';
import WalletPage from './containers/WalletPage';
import HelpPage from './containers/HelpPage';
import SeedPage from './containers/SeedPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.BUY} component={BuyPage} />
      <Route path={routes.WALLET} component={WalletPage} />
      <Route path={routes.SEED} component={SeedPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HELP} component={HelpPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
