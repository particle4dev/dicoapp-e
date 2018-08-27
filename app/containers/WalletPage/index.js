// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
// import routes from '../../constants/routes.json';
import { NavigationLayout } from '../Layout';

import { logout } from '../App/actions';
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
const explorer = {
  KMD: 'http://kmdexplorer.io/tx',
  BTC: 'https://blockchain.com/tx',
  LTC: 'https://live.blockcypher.com/ltc/tx',
  GLXT: 'http://glx.info/tx'
};

// const styles = theme => ({
const styles = () => ({
  table: {
    maxHeight: 450
  }
});
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

  onLogoutButtonClick = async (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    const {
      // eslint-disable-next-line react/prop-types
      dispatchLogout
    } = this.props;
    dispatchLogout();
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { loading, transactions, classes } = this.props;

    return (
      <NavigationLayout>
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Block height</TableCell>
                <TableCell>Transaction id</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(t => (
                <TableRow key={t.get('tx_hash')}>
                  <TableCell>{t.get('coin')}</TableCell>
                  <TableCell>{t.get('height')}</TableCell>
                  <TableCell>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    {explorer[t.get('coin')] && (
                      <a
                        style={{ color: '#000' }}
                        href={`${explorer[t.get('coin')]}/${t.get('tx_hash')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.get('tx_hash')}
                      </a>
                    )}
                    {!explorer[t.get('coin')] && t.get('tx_hash')}
                  </TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          loading = {loading.toString()}
          <br />
          <Button
            disabled={loading}
            type="submit"
            onClick={this.onLogoutButtonClick}
          >
            Log Out
          </Button>
        </div>
      </NavigationLayout>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadWallet: () => dispatch(loadWallet()),
    dispatchLogout: () => dispatch(logout())
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
  withConnect,
  withStyles(styles)
)(WalletPage);
