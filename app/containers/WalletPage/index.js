// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
// import routes from '../../constants/routes.json';
import { NavigationLayout } from '../Layout';

import Transactions from './components/Transactions';
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

// const styles = theme => ({
const styles = () => ({
  table: {
    maxHeight: 450
  },
  nav1: {
    height: '100%'
  },
  nav2: {
    height: '100%'
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

  render() {
    // eslint-disable-next-line react/prop-types
    const { loading, transactions, classes } = this.props;

    return (
      <NavigationLayout>
        {loading && <LinearProgress />}
        <Grid container spacing={0}>
          <Grid item xs={3} className={classes.nav1}>
            Grid item xs=3
          </Grid>
          <Grid item xs={9} className={classes.nav2}>
            <Transactions transactions={transactions} />
          </Grid>
        </Grid>
      </NavigationLayout>
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
  withConnect,
  withStyles(styles)
)(WalletPage);
