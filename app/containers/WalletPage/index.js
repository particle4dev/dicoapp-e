// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import QRCode from 'qrcode.react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import { NavigationLayout } from '../Layout';

import Transactions from './components/Transactions';
import reducer from './reducer';
import saga from './saga';
import { APP_STATE_NAME } from './constants';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

// const styles = theme => ({
const styles = () => ({
  container: {
    padding: 24
  },

  containerSection: {
    paddingBottom: 30
  },

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

  render() {
    debug(`render`);

    const { classes } = this.props;

    return (
      <NavigationLayout>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Wallet
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} className={classes.containerSection}>
            <Card>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Overview
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} className={classes.containerSection}>
            <Card>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Send
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} className={classes.containerSection}>
            <Card>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Receive
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <QRCode value="http://facebook.github.io/react/" />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} className={classes.containerSection}>
            <Transactions />
          </Grid>
        </Grid>
      </NavigationLayout>
    );
  }
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withStyles(styles)
)(WalletPage);
