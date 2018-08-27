import { connect } from 'react-redux';
import authWrapper from './auth-wrapper';

const connectedDefaults = {
  authenticatingSelector: () => false
};

const connectedRouterRedirect = args => {
  const allArgs = { ...connectedDefaults, ...args };
  const { authenticatedSelector, authenticatingSelector } = allArgs;

  return (DecoratedComponent, FailureComponent) =>
    connect((state, ownProps) => ({
      isAuthenticated: authenticatedSelector(state, ownProps),
      isAuthenticating: authenticatingSelector(state, ownProps)
    }))(authWrapper({ ...allArgs, FailureComponent })(DecoratedComponent));
};

export default connectedRouterRedirect;
