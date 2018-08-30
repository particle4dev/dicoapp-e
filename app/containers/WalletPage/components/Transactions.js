// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const debug = require('debug')('dicoapp:components:Drawer:Transactions');

type Props = {};

type State = {};

const styles = () => ({
  table: {
    maxHeight: 450
  }
});

const explorer = {
  KMD: 'http://kmdexplorer.io/tx',
  BTC: 'https://blockchain.com/tx',
  LTC: 'https://live.blockcypher.com/ltc/tx',
  GLXT: 'http://glx.info/tx'
};

class Transactions extends Component<Props, State> {
  state = {};

  render() {
    debug(`render`);
    // eslint-disable-next-line react/prop-types
    const { classes, transactions } = this.props;
    return (
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
    );
  }
}

Transactions.displayName = 'Transactions';

export default withStyles(styles)(Transactions);
