import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const defaults = {
  AuthenticatingComponent: () => null, // dont render anything while authenticating
  FailureComponent: () => null, // dont render anything on failure of the predicate
  wrapperDisplayName: 'AuthWrapper'
};

const debug = require('debug')('dicoapp:utils:auth-wrapper');

export default args => {
  const { AuthenticatingComponent, FailureComponent, wrapperDisplayName } = {
    ...defaults,
    ...args
  };

  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    class UserAuthWrapper extends Component {
      static displayName = `${wrapperDisplayName}(${displayName})`;

      static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isAuthenticating: PropTypes.bool
      };

      static defaultProps = {
        isAuthenticating: false
      };

      render() {
        debug(`render`);
        const { isAuthenticated, isAuthenticating } = this.props;
        debug(
          `isAuthenticated=${isAuthenticated}, isAuthenticating=${isAuthenticating}`
        );

        if (isAuthenticated) {
          return <DecoratedComponent {...this.props} />;
          // eslint-disable-next-line no-else-return
        } else if (isAuthenticating && AuthenticatingComponent) {
          return <AuthenticatingComponent {...this.props} />;
        }
        return <FailureComponent {...this.props} />;
      }
    }

    return hoistStatics(UserAuthWrapper, DecoratedComponent);
  }

  return wrapComponent;
};
