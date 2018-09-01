// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const debug = require('debug')('dicoapp:containers:WalletPage:Transactions');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  transactions: Object
};

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
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title" gutterBottom>
              Last Transactions
            </Typography>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Coin</TableCell>
                  <TableCell>Block height</TableCell>
                  <TableCell>Transaction id</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t, k) => (
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
                    <TableCell>N/A</TableCell>
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

export default withStyles(styles)(Transactions);
