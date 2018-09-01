// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
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
import CachedIcon from '@material-ui/icons/Cached';
import { makeSelectLoading, makeSelectTransactions } from '../selectors';
import { loadWallet } from '../actions';

const debug = require('debug')('dicoapp:containers:WalletPage:Transactions');

const styles = () => ({
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
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  transactions: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWallet: Function
};

type State = {};

class Transactions extends Component<Props, State> {
  state = {};

  componentDidMount = () => {
    debug('watch transactions');

    const { dispatchLoadWallet } = this.props;
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
    idInterval = setInterval(() => {
      dispatchLoadWallet();
    }, LOAD_TRANSACTION_TIME);

    dispatchLoadWallet();
  };

  componentWillUnmount = () => {
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
  };

  onClickReloadTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadWallet } = this.props;
    dispatchLoadWallet();
  };

  render() {
    debug(`render`);

    const { loading, classes, transactions } = this.props;

    return (
      <React.Fragment>
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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Coin</TableCell>
                  <TableCell>Block height</TableCell>
                  <TableCell>Transaction id</TableCell>
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
      </React.Fragment>
    );
  }
}

Transactions.displayName = 'Transactions';

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadWallet: () => dispatch(loadWallet())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  transactions: makeSelectTransactions()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Transactions);
