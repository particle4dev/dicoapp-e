// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import { BTC, ETH, LTC } from '../../components/CryptoIcons';
import { Circle, Line } from '../../components/placeholder';

import { NavigationLayout } from '../Layout';
import { APP_STATE_NAME } from './constants';
import reducer from './reducer';
import saga from './saga';
import CoinSelectable from './components/CoinSelectable';
import { loadPrices } from './actions';
import { makeSelectPricesLoading } from './selectors';

const debug = require('debug')('dicoapp:containers:BuyPage');

const styles = () => ({
  container: {
    padding: 24
  },

  containerSection: {
    paddingBottom: 30
  },

  hr: {
    marginBottom: 20
  }
});

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrices: Function
};

class BuyPage extends Component<Props> {
  props: Props;

  componentDidMount = () => {
    const { dispatchLoadPrices } = this.props;

    dispatchLoadPrices();
  };

  onReloadPrices = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchLoadPrices } = this.props;

    dispatchLoadPrices();
  };

  onClickCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    console.log('I wanna dance');
  };

  render() {
    debug('render');

    const { classes, loading } = this.props;

    return (
      <NavigationLayout>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Buy
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} className={classes.containerSection}>
            <Card>
              {loading && <LinearProgress />}
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Currency
                </Typography>
                <Divider className={classes.hr} />

                <CoinSelectable
                  selected
                  icon={<BTC />}
                  title="Bitcoin"
                  onClick={this.onClickCoin}
                />

                <CoinSelectable icon={<ETH />} title="Ethereum" />
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Payment
                </Typography>
                <Divider className={classes.hr} />

                <CoinSelectable
                  icon={<BTC />}
                  title="Bitcoin"
                  subTitle="1.2 BTC"
                >
                  1 BTC = 1 BTC
                </CoinSelectable>

                <CoinSelectable
                  disabled
                  icon={<ETH />}
                  title="Ethereum"
                  subTitle="5.7 ETH"
                >
                  1 BTC = 0 ETH
                </CoinSelectable>

                <CoinSelectable
                  selected
                  icon={<LTC />}
                  title="Litecoin"
                  subTitle="1.3 LTC"
                >
                  1 BTC = 10 LTC
                </CoinSelectable>
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Amount
                </Typography>
                <Divider className={classes.hr} />
                <TextField id="BTC" label="BTC" value="" margin="normal" />
                <br />
                <SwapHorizIcon />
                <br />
                <TextField id="KMD" label="KMD" value="" margin="normal" />
                <br />
                <Button color="primary" variant="contained">
                  Buy BTC
                </Button>

                <Circle />
                <Line />
              </CardContent>
              <CardContent>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.onReloadPrices}
                >
                  Reload Prices
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </NavigationLayout>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadPrices: () => dispatch(loadPrices())
  };
}

const mapStateToProps = createStructuredSelector({
  loadling: makeSelectPricesLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(BuyPage);
