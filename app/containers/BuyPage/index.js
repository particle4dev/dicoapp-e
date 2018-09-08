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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
// import { Circle, Line, LineWrapper } from '../../components/placeholder';
import { NavigationLayout } from '../Layout';
import { makeSelectBalanceEntities } from '../App/selectors';
import { loadBalance } from '../App/actions';
import { APP_STATE_NAME } from './constants';
import reducer from './reducer';
import saga from './saga';
import AmountSection from './components/AmountSection';
import CurrencySection from './components/CurrencySection';
import PaymentSection from './components/PaymentSection';
import { loadPrices, loadPrice } from './actions';
import {
  makeSelectBalanceList,
  makeSelectPricesLoading,
  makeSelectPricesEntities
} from './selectors';

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
  },

  cardContent: {
    position: 'relative'
  },

  cardContent__rightBtn: {
    position: 'absolute',
    right: 15,
    top: 5
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

  render() {
    debug('render');

    const {
      classes,
      loading,
      list,
      entities,
      balance,
      dispatchLoadPrice
    } = this.props;
    const { paymentCoin } = this.state;

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
              <CardContent className={classes.cardContent}>
                <Typography variant="title" gutterBottom>
                  Payment Method
                </Typography>
                <IconButton
                  aria-label="Reload prices"
                  className={classes.cardContent__rightBtn}
                  onClick={this.onReloadPrices}
                >
                  <Icon>cached</Icon>
                </IconButton>
                <Divider className={classes.hr} />
                <PaymentSection
                  onClick={this.onClickPaymentCoin}
                  paymentCoin={paymentCoin}
                  list={list}
                  entities={entities}
                  balance={balance}
                  dispatchLoadPrice={dispatchLoadPrice}
                />
              </CardContent>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  Amount
                </Typography>
                <Divider className={classes.hr} />
                <AmountSection />
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
