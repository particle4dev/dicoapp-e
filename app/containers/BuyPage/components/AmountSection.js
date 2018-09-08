// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AmountInput from './AmountInput';
import BuyButton from './BuyButton';

const debug = require('debug')('dicoapp:containers:BuyPage:AmountSection');

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
  classes: Object
};

class AmountSection extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    debug(`render`);
    const { classes } = this.props;

    return (
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
    );
  }
}

AmountSection.displayName = 'AmountSection';

export default withStyles(styles)(AmountSection);
