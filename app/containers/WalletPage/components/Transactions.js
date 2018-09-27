// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CachedIcon from '@material-ui/icons/Cached';
import {
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactionsList
} from '../selectors';
import { loadTransactions } from '../actions';

const debug = require('debug')('dicoapp:containers:WalletPage:Transactions');

const styles = () => ({
  containerSection: {
    paddingBottom: 30
  },

  table: {
    maxHeight: 450
  },
  card: {
    position: 'relative'
  },
  btns: {
    top: 8,
    right: 8,
    display: 'flex',
    position: 'absolute'
  },
  th: {
    color: '#555555',
    fontSize: 15
  }
});

const explorer = {
  KMD: 'http://kmdexplorer.io/tx',
  BTC: 'https://blockchain.com/tx',
  LTC: 'https://live.blockcypher.com/ltc/tx',
  GLXT: 'http://glx.info/tx'
};

let idInterval = null;
const LOAD_TRANSACTION_TIME = 90000;

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  error: boolean | Object,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  transactions: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactions: Function
};

class Transactions extends PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');

    const { dispatchLoadTransactions } = this.props;
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
    idInterval = setInterval(() => {
      dispatchLoadTransactions();
    }, LOAD_TRANSACTION_TIME);

    dispatchLoadTransactions();
  };

  componentWillUnmount = () => {
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
  };

  onClickReloadTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions();
  };

  render() {
    debug(`render`);

    const { loading, classes, transactions, error } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.containerSection}>
          <Card className={classes.card}>
            {loading && <LinearProgress />}
            <CardContent>
              <Typography variant="title" gutterBottom>
                Last Transactions
              </Typography>
              <div className={classes.btns}>
                <IconButton
                  disabled={loading}
                  onClick={this.onClickReloadTranstactions}
                >
                  <CachedIcon />
                </IconButton>
              </div>
              {error && (
                <SnackbarContent
                  // className={classNames(classes[variant], className)}
                  aria-describedby="client-snackbar"
                  message={error.message}
                />
              )}
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.th}>#</TableCell>
                    <TableCell className={classes.th}>Coin</TableCell>
                    <TableCell className={classes.th}>Block height</TableCell>
                    <TableCell className={classes.th}>Transaction id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions &&
                    transactions.map((t, k) => (
                      <TableRow key={t.get('tx_hash')}>
                        <TableCell>{k + 1}</TableCell>
                        <TableCell>{t.get('coin')}</TableCell>
                        <TableCell>{t.get('height')}</TableCell>
                        <TableCell>
                          {/* eslint-disable-next-line react/jsx-no-target-blank */}
                          {explorer[t.get('coin')] && (
                            <a
                              style={{ color: '#000' }}
                              href={`${explorer[t.get('coin')]}/${t.get(
                                'tx_hash'
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t.get('tx_hash')}
                            </a>
                          )}
                          {!explorer[t.get('coin')] && t.get('tx_hash')}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }
}

Transactions.displayName = 'Transactions';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadTransactions: () => dispatch(loadTransactions())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTransactionsLoading(),
  error: makeSelectTransactionsError(),
  transactions: makeSelectTransactionsList()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Transactions);
