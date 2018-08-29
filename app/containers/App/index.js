// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import BuyPage from '../BuyPage';
import WalletPage from '../WalletPage';
import HelpPage from '../HelpPage';
import SeedPage from '../SeedPage';
import LoginPage from '../LoginPage';
import NotFoundPage from '../NotFoundPage';
import injectSaga from '../../utils/inject-saga';
import { makeSelectAuthenticated, makeSelectLoading } from './selectors';
import connectedRouterRedirect from '../../utils/auth-wrapper/connected-router-redirect';
import { APP_STATE_NAME } from './constants';
import saga from './saga';
import routes from '../../constants/routes.json';

const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  AuthenticatingComponent: null,
  authenticatedSelector: makeSelectAuthenticated(),
  authenticatingSelector: makeSelectLoading(),
  wrapperDisplayName: 'UserIsAuthenticated'
});

// const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, (props, ...) => {
//   return (<Redirect to={routes.LOGIN} />);
// });
// const HomeFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
//   <Redirect to={routes.LOGIN} />
// ));
const WalletFallback = userIsNotAuthenticatedRedir(WalletPage, () => (
  <Redirect to={routes.LOGIN} />
));
const BuyFallback = userIsNotAuthenticatedRedir(BuyPage, () => (
  <Redirect to={routes.LOGIN} />
));
const HelpFallback = userIsNotAuthenticatedRedir(HelpPage, () => (
  <Redirect to={routes.LOGIN} />
));
const LoginFallback = userIsNotAuthenticatedRedir(
  () => <Redirect to={routes.LOGIN} />,
  LoginPage
);

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Switch>
          <Route path={routes.BUY} component={BuyFallback} />
          <Route path={routes.WALLET} component={WalletFallback} />
          <Route path={routes.SEED} component={SeedPage} />
          <Route path={routes.HELP} component={HelpFallback} />
          <Route path={routes.LOGIN} component={LoginFallback} />
          {/* <Route path={routes.HOME} component={HomeFallback} /> */}
          <Route exact path={routes.HOME} component={HelpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

export default withSaga(App);
