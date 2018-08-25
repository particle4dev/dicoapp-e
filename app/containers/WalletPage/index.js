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
import { makeSelectLoading, makeSelectTransactions } from './selectors';
import { APP_STATE_NAME } from './constants';
import { loadWallet } from './actions';

type Props = {
  loading: boolean
  // transactions: array,
};

let idInterval = null;
const LOAD_TRANSACTION_TIME = 90000;
const debug = require('debug')('dicoapp:containers:WalletPage');

class WalletPage extends Component<Props> {
  props: Props;

  componentDidMount = () => {
    // eslint-disable-next-line react/prop-types
    const { dispatchLoadWallet } = this.props;

    debug('watch transactions');
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
    idInterval = setInterval(() => {
      dispatchLoadWallet();
    }, LOAD_TRANSACTION_TIME);
    //
    dispatchLoadWallet();
  };

  componentWillUnmount = () => {
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { loading, transactions } = this.props;
    return (
      <div>
        <Link to={routes.HOME}>to HomePage</Link>
        <br />
        WalletPage
        <br />
        loading = {loading.toString()}
        <br />
        <table>
          <tr>
            <th>Coin</th>
            <th>Block height</th>
            <th>Transaction id</th>
            <th>Amount</th>
          </tr>
          <tbody>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {transactions.map((t, k) => (
              <tr key={k}>
                <td>{t.get('coin')}</td>
                <td>{t.get('height')}</td>
                <td>{t.get('tx_hash')}</td>
                <td>N/A</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  loading: makeSelectLoading(),
  transactions: makeSelectTransactions()
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
