// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import type { List, Map } from 'immutable';
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
import ErrorBoundary from '../../components/ErrorBoundary';
import { getCoinIcon } from '../../components/CryptoIcons';
import { Circle, Line, LineWrapper } from '../../components/placeholder';

import { NavigationLayout } from '../Layout';
import { makeSelectBalanceEntities } from '../WalletPage/selectors';
import { APP_STATE_NAME, COIN_BASE } from './constants';
import reducer from './reducer';
import saga from './saga';
import CoinSelectable from './components/CoinSelectable';
import { loadPrices } from './actions';
import {
  makeSelectPricesLoading,
  makeSelectPricesCoins,
  makeSelectPricesEntities
} from './selectors';

function floor(number, after = 1) {
  // eslint-disable-next-line no-restricted-properties
  const p = Math.pow(10, after);
  return Math.floor(number * p) / p;
}

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
  dispatchLoadPrices: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  coins: List<*>,
  entities: Map<*, *>
};

type State = {
  baseCoin: string
};

class BuyPage extends Component<Props, State> {
  props: Props;

  state = {
    baseCoin: COIN_BASE.get('coin')
  };

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
    const { value } = evt.target;
    this.setState({
      baseCoin: value
    });
  };

  renderBaseCoin = () => {
    const { baseCoin } = this.state;
    const symbol = COIN_BASE.get('coin');
    const icon = getCoinIcon(symbol);
    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        selected={baseCoin === symbol}
        data={symbol}
        icon={icon}
        title={COIN_BASE.get('name')}
        onClick={this.onClickCoin}
      />
    );
  };

  renderPaymentCoin = coin => {
    const { entities, balance } = this.props;
    const symbol = coin.get('symbol');
    const c = entities.get(symbol);
    const b = balance.get(symbol);
    const icon = getCoinIcon(symbol);

    return (
      <CoinSelectable
        disabled={c.get('bestPrice') === 0 || b.get('balance') === 0}
        key={`paymentCoin${symbol}`}
        data={symbol}
        icon={icon}
        title={coin.get('coin')}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
      >
        1 {COIN_BASE.get('coin')} = {c.get('bestPrice')} {coin.get('symbol')}
      </CoinSelectable>
    );
  };

  render() {
    debug('render');

    const { classes, loading, coins } = this.props;

    return (
      <React.Fragment>
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

                {this.renderBaseCoin()}
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Payment
                </Typography>
                <Divider className={classes.hr} />

                {coins.map(this.renderPaymentCoin)}

                <CoinSelectable
                  icon={getCoinIcon('LTC')}
                  title="Litecoin"
                  subTitle={<Line width={90} />}
                >
                  <Line
                    width={60}
                    style={{
                      margin: 0
                    }}
                  />
                </CoinSelectable>
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Amount
                </Typography>
                <Divider className={classes.hr} />
                <TextField id="BTC" label="BTC" value="1" margin="normal" />
                <br />
                <SwapHorizIcon />
                <br />
                <TextField id="KMD" label="KMD" value="2000" margin="normal" />
                <br />
                <Button color="primary" variant="contained">
                  Buy BTC
                </Button>

                <br />
                <Circle />

                <br />
                <LineWrapper>
                  <Line width={160} />
                  <Line />
                </LineWrapper>
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
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadPrices: () => dispatch(loadPrices())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPricesLoading(),
  coins: makeSelectPricesCoins(),
  entities: makeSelectPricesEntities(),
  balance: makeSelectBalanceEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const BuyPageWapper = compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(BuyPage);

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <BuyPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
