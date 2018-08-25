// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import routes from '../../constants/routes.json';

import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading } from './selectors';
import { APP_STATE_NAME } from './constants';
import { loadWallet } from './actions';

type Props = {
  loading: boolean
};

let idInterval = null;
const LOAD_TRANSACTION_TIME = 1000;

class WalletPage extends Component<Props> {
  props: Props;

  componentDidMount = () => {
    // eslint-disable-next-line react/prop-types
    const { dispatchLoadWallet } = this.props;

    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
    idInterval = setInterval(() => {
      dispatchLoadWallet();
    }, LOAD_TRANSACTION_TIME);
  };

  componentWillUnmount = () => {
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        WalletPage
        <br />
        loading = {loading.toString()}
        <br />
        <Link to={routes.HOME}>to HomePage</Link>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadWallet: () => dispatch(loadWallet())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WalletPage);
