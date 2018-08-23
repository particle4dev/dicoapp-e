// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router';
import routes from '../../constants/routes.json';
import CounterPage from '../CounterPage';
import BuyPage from '../BuyPage';
import WalletPage from '../WalletPage';
import HelpPage from '../HelpPage';
import SeedPage from '../SeedPage';
import HomePage from '../HomePage';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children}
        <Switch>
          <Route path={routes.BUY} component={BuyPage} />
          <Route path={routes.WALLET} component={WalletPage} />
          <Route path={routes.SEED} component={SeedPage} />
          <Route path={routes.COUNTER} component={CounterPage} />
          <Route path={routes.HELP} component={HelpPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </React.Fragment>
    );
  }
}
