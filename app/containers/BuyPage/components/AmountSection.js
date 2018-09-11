// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import type { List, Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Loops } from '../utils';

import { requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { makeSelectBalanceEntities } from '../../App/selectors';
import { COIN_BASE } from '../tokenconfig';
import { loadBuyCoin, loadRecentSwaps } from '../actions';
import {
  makeSelectPricesLoading,
  makeSelectPricesEntities,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectSwapsList,
  makeSelectSwapsEntities
} from '../selectors';
import AmountInput from './AmountInput';
import BuyButton from './BuyButton';

const debug = require('debug')('dicoapp:containers:BuyPage:AmountSection');

const STATE_SWAPS = [
  'Confirmed',
  'My Fee',
  'Bob Deposit',
  'Alice Payment',
  'Bob Payment',
  'Alice Spend'
];

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <AmountInput
    {...props}
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
  />
);

export const lessThan = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { balance } = props;
    const n = Number(value);
    const b = Number(balance);
    if (n >= b) {
      return reject(new Error('Value is large than balance'));
    }
    return resolve(true);
  });

const ValidationBaseInput = validate(TextInput, [requiredNumber], {
  onChange: true
});

const ValidationPaymentInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

const styles = () => ({
  amountform: {
    width: '50%'
  },

  amountform__item: {
    width: '100%'
  },

  amountform__itemCenter: {
    textAlign: 'center'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  paymentCoin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBuyCoin: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwaps: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  buyingLoading: boolean,
  // eslint-dis,able-next-line flowtype/no-weak-types
  // buyingError: boolean | Object,
  swapsList: List<*>,
  swapsEntities: Map<*, *>
};

type State = {
  disabledBuyButton: boolean
};

class AmountSection extends Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      disabledBuyButton: true
    };
    this.baseInput = React.createRef();
    this.paymentInput = React.createRef();
  }

  componentDidMount = () => {
    const { dispatchLoadRecentSwaps } = this.props;

    dispatchLoadRecentSwaps();
  };

  componentDidUpdate(prevProps) {
    if (
      // eslint-disable-next-line react/destructuring-assignment
      ((this.props.swapsList.size === 1) !== prevProps.swapsList.size) ===
      0
    ) {
      const { dispatchLoadRecentSwaps } = this.props;
      this.checkSwapStatusLoops = new Loops(10000, dispatchLoadRecentSwaps);
      this.checkSwapStatusLoops.setup();
    }
  }

  componentWillUnmount = () => {
    if (this.checkSwapStatusLoops) {
      this.checkSwapStatusLoops.stop();
      this.checkSwapStatusLoops = undefined;
    }
  };

  getBestPrice = () => {
    const { entities, paymentCoin } = this.props;
    const c = entities.get(paymentCoin);
    return c.get('bestPrice');
  };

  getBalance = () => {
    const { balance, paymentCoin } = this.props;
    if (!balance || !paymentCoin) return 0;

    const b = balance.get(paymentCoin);
    return b.get('balance');
  };

  controlBuyButton = (state: boolean) => {
    this.setState({
      disabledBuyButton: state
    });
  };

  onChangeBaseInput = async () => {
    try {
      const baseInput = this.baseInput.current;
      const base = await baseInput.value();
      this.controlBuyButton(false);

      const bestPrice = this.getBestPrice();
      const paymentInput = this.paymentInput.current;
      await paymentInput.setValue(base * bestPrice);
    } catch (err) {
      this.controlBuyButton(true);
      debug(`onChangeInput: ${err.message}`);
    }
  };

  onChangePaymentInput = async () => {
    try {
      const paymentInput = this.paymentInput.current;
      const payment = await paymentInput.value();
      this.controlBuyButton(false);

      const bestPrice = this.getBestPrice();
      const baseInput = this.baseInput.current;
      await baseInput.setValue(payment / bestPrice);
    } catch (err) {
      this.controlBuyButton(true);
      debug(`onChangeInput: ${err.message}`);
    }
  };

  onCLickBtnBuyCoin = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadBuyCoin } = this.props;
    const baseInput = this.baseInput.current;
    const base = await baseInput.value();

    dispatchLoadBuyCoin({
      basecoin: COIN_BASE.get('coin'),
      // eslint-disable-next-line react/destructuring-assignment
      paymentcoin: this.props.paymentCoin,
      amount: Number(base)
    });
  };

  renderForm = () => {
    const { classes, paymentCoin, buyingLoading } = this.props;
    const { disabledBuyButton } = this.state;
    const disabled = paymentCoin === '';
    let label = 'SELECT YOUR PAYMENT';
    if (paymentCoin !== '') {
      label = paymentCoin;
    }

    return (
      <form className={classes.amountform}>
        <ValidationBaseInput
          label={COIN_BASE.get('coin')}
          id={COIN_BASE.get('coin')}
          type="number"
          disabled={disabled}
          className={classes.amountform__item}
          ref={this.baseInput}
          onChange={this.onChangeBaseInput}
        />
        <br />
        <br />
        <SwapHorizIcon />
        <br />
        <br />
        <ValidationPaymentInput
          label={label}
          id={label}
          type="number"
          balance={this.getBalance()}
          disabled={disabled}
          className={classes.amountform__item}
          ref={this.paymentInput}
          onChange={this.onChangePaymentInput}
        />
        <br />
        <br />
        <BuyButton
          disabled={disabledBuyButton || buyingLoading}
          color="primary"
          variant="contained"
          className={classes.amountform__item}
          onClick={this.onCLickBtnBuyCoin}
        >
          Buy {COIN_BASE.get('coin')}
        </BuyButton>
      </form>
    );
  };

  renderProcess = () => {
    const { classes, swapsList, swapsEntities } = this.props;
    const entity = swapsEntities.get(swapsList.get(0));

    return (
      <div className={classes.amountform}>
        <Grid container spacing={24}>
          <Grid item xs={6} className={classes.amountform__itemCenter}>
            <Typography variant="title" gutterBottom>
              Deposit
            </Typography>
            {getCoinIcon(entity.get('bob'))}
            <Typography variant="subheading" gutterBottom>
              {entity.get('aliceamount')} {entity.get('alice')}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.amountform__itemCenter}>
            <Typography variant="title" gutterBottom>
              Receive
            </Typography>
            {getCoinIcon(entity.get('alice'))}
            <Typography variant="subheading" gutterBottom>
              {entity.get('bobamount')} {entity.get('bob')}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.amountform__itemCenter}>
            <Typography variant="body2" gutterBottom>
              Step {entity.get('sentflags').size}
              /5: {STATE_SWAPS[entity.get('sentflags').size]}
            </Typography>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={entity.get('sentflags').size * 20}
            />
          </Grid>
          <Grid item xs={12} className={classes.amountform__itemCenter}>
            <BuyButton
              disabled
              color="primary"
              variant="contained"
              className={classes.amountform__item}
            >
              Loading ...
            </BuyButton>
          </Grid>
        </Grid>
      </div>
    );
  };

  render() {
    debug(`render`);
    const { swapsList } = this.props;
    if (swapsList.size === 0) return this.renderForm();
    return this.renderProcess();
  }
}

AmountSection.displayName = 'AmountSection';

export function mapDispatchToProps(dispatch) {
  return {
    // eslint-disable-next-line flowtype/no-weak-types
    dispatchLoadBuyCoin: (payload: Object) => dispatch(loadBuyCoin(payload)),
    dispatchLoadRecentSwaps: () => dispatch(loadRecentSwaps())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPricesLoading(),
  entities: makeSelectPricesEntities(),
  balance: makeSelectBalanceEntities(),
  buyingLoading: makeSelectBuyingLoading(),
  buyingError: makeSelectBuyingError(),
  swapsList: makeSelectSwapsList(),
  swapsEntities: makeSelectSwapsEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(AmountSection);
