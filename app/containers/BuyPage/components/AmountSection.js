// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { COIN_BASE } from '../tokenconfig';
import AmountInput from './AmountInput';
import BuyButton from './BuyButton';

const debug = require('debug')('dicoapp:containers:BuyPage:AmountSection');

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

const ValidationPaymentInput = validate(
  TextInput,
  [
    requiredNumber
    // lessThan
  ],
  {
    onChange: true
  }
);

const styles = () => ({
  amountform: {
    width: '50%'
  },

  amountform__item: {
    width: '100%'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  paymentCoin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBuyCoin: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  buyingLoading: boolean
  // eslint-dis,able-next-line flowtype/no-weak-types
  // buyingError: boolean | Object
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

  render() {
    debug(`render`);
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
  }
}

AmountSection.displayName = 'AmountSection';

export default withStyles(styles)(AmountSection);
