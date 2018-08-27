// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import BuyPage from '../BuyPage';
import WalletPage from '../WalletPage';
import HelpPage from '../HelpPage';
import SeedPage from '../SeedPage';
import LoginPage from '../LoginPage';
import { makeSelectAuthenticated, makeSelectLoading } from './selectors';
import connectedRouterRedirect from '../../utils/auth-wrapper/connected-router-redirect';
import routes from '../../constants/routes.json';

const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  authenticatedSelector: makeSelectAuthenticated(),
  authenticatingSelector: makeSelectLoading(),
  wrapperDisplayName: 'UserIsAuthenticated'
});

// const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, (props, ...) => {
//   return (<Redirect to="/login" />);
// });
const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
  <Redirect to="/login" />
));
const WalletFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
  <Redirect to="/login" />
));
const BuyFallback = userIsNotAuthenticatedRedir(BuyPage, () => (
  <Redirect to="/login" />
));
const HelpFallback = userIsNotAuthenticatedRedir(
  () => <Redirect to={routes.LOGIN} />,
  HelpPage
);

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={routes.BUY} component={BuyFallback} />
          <Route path={routes.WALLET} component={WalletFallback} />
          <Route path={routes.SEED} component={SeedPage} />
          <Route path={routes.HELP} component={HelpFallback} />
          <Route path={routes.LOGIN} component={LoginPage} />
          <Route path={routes.HOME} component={HomeFallback} />
        </Switch>
      </React.Fragment>
    );
  }
}
