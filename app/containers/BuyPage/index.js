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
import Divider from '@material-ui/core/Divider';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import { getCoinIcon } from '../../components/CryptoIcons';
// import { Circle, Line, LineWrapper } from '../../components/placeholder';
import { Line } from '../../components/placeholder';
import { NavigationLayout } from '../Layout';
import { makeSelectBalanceEntities } from '../App/selectors';
import { loadBalance } from '../App/actions';
import { APP_STATE_NAME } from './constants';
import { COIN_BASE } from './tokenconfig';
import reducer from './reducer';
import saga from './saga';
import CoinSelectable from './components/CoinSelectable';
import AmountInput from './components/AmountInput';
import BuyButton from './components/BuyButton';
import CurrencySection from './components/CurrencySection';
import { loadPrices, loadPrice } from './actions';
import {
  makeSelectBalanceList,
  makeSelectPricesLoading,
  makeSelectPricesEntities
} from './selectors';
import { covertSymbolToName, floor } from './utils';

const debug = require('debug')('dicoapp:containers:BuyPage');

const line = (
  <Line
    width={60}
    style={{
      margin: 0
    }}
  />
);

const styles = theme => ({
  container: {
    padding: 24
  },

  containerSection: {
    paddingBottom: 30
  },

  hr: {
    marginBottom: 20
  },

  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },

  amountform: {
    width: '50%'
  },

  amountform__item: {
    width: '100%'
  }
});

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrices: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  list: List<*>
};

type State = {
  paymentCoin: string
};

class BuyPage extends Component<Props, State> {
  props: Props;

  state = {
    paymentCoin: ''
  };

  componentDidMount = () => {
    const { dispatchLoadBalance } = this.props;

    dispatchLoadBalance();
  };

  onReloadPrices = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchLoadPrices } = this.props;

    dispatchLoadPrices();
  };

  onClickPaymentCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({
      paymentCoin: value
    });
  };

  renderPaymentCoin = symbol => {
    const { paymentCoin } = this.state;
    const { entities, balance, dispatchLoadPrice } = this.props;
    const c = entities.get(symbol);
    const b = balance.get(symbol);
    const icon = getCoinIcon(symbol);
    const name = covertSymbolToName(symbol);
    if (!c) {
      // not found in entities
      return (
        <CoinSelectable
          dispatchLoadPrice={dispatchLoadPrice}
          disabled
          key={`paymentCoin${symbol}`}
          data={symbol}
          icon={icon}
          title={name}
          subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        >
          {line}
        </CoinSelectable>
      );
    }
    return (
      <CoinSelectable
        dispatchLoadPrice={dispatchLoadPrice}
        disabled={c.get('bestPrice') === 0 || b.get('balance') === 0}
        selected={paymentCoin === symbol}
        key={`paymentCoin${symbol}`}
        data={symbol}
        icon={icon}
        title={name}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        onClick={this.onClickPaymentCoin}
      >
        <span>
          1 {COIN_BASE.get('coin')} = {c.get('bestPrice')} {symbol}
        </span>
      </CoinSelectable>
    );
  };

  render() {
    debug('render');

    const { classes, loading, list } = this.props;

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

                <CurrencySection onClick={this.onReloadPrices} />
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Payment Method
                </Typography>
                <Divider className={classes.hr} />

                {list.map(this.renderPaymentCoin)}
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Amount
                </Typography>
                <Divider className={classes.hr} />
                <form className={classes.amountform}>
                  <AmountInput
                    defaultValue="1"
                    label="BTC"
                    id="BTC"
                    className={classes.amountform__item}
                  />
                  <br />
                  <br />
                  <SwapHorizIcon />
                  <br />
                  <br />
                  <AmountInput
                    defaultValue="2000"
                    label="KMD"
                    id="KMD"
                    className={classes.amountform__item}
                  />
                  <br />
                  <br />
                  <BuyButton
                    disabled
                    color="secondary"
                    variant="contained"
                    className={classes.amountform__item}
                  >
                    Buy BEER - 1 BTC
                  </BuyButton>
                </form>
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
    dispatchLoadPrices: () => dispatch(loadPrices()),
    dispatchLoadPrice: (coin: string) => dispatch(loadPrice(coin)),
    dispatchLoadBalance: () => dispatch(loadBalance())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPricesLoading(),
  entities: makeSelectPricesEntities(),
  balance: makeSelectBalanceEntities(),
  list: makeSelectBalanceList()
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
