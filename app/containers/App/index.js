// @flow
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from '../../constants/routes.json';
import BuyPage from '../BuyPage';
import WalletPage from '../WalletPage';
import HelpPage from '../HelpPage';
import SeedPage from '../SeedPage';
import HomePage from '../HomePage';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={routes.BUY} component={BuyPage} />
          <Route path={routes.WALLET} component={WalletPage} />
          <Route path={routes.SEED} component={SeedPage} />
          <Route path={routes.HELP} component={HelpPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </React.Fragment>
    );
  }
}
