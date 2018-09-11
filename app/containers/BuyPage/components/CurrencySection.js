// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Line } from '../../../components/placeholder';
import { floor } from '../utils';
import { COIN_BASE } from '../tokenconfig';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:BuyPage:CurrencySection');

const line = (
  <Line
    width={60}
    style={{
      margin: 0
    }}
  />
);

const styles = () => ({});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
};

class CurrencySection extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    debug(`render`);
    const { balance } = this.props;
    const symbol = COIN_BASE.get('coin');
    const icon = getCoinIcon(symbol);
    const b = balance.get(symbol);
    if (!b) {
      // not found in balance
      return (
        <CoinSelectable
          key={`baseCoin${symbol}`}
          selected
          data={symbol}
          icon={icon}
          title={COIN_BASE.get('name')}
          subTitle={line}
        />
      );
    }
    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        selected
        data={symbol}
        icon={icon}
        title={COIN_BASE.get('name')}
        subTitle={`${floor(b.get('balance'), 3)} ${b.get('coin')}`}
        {...this.props}
      />
    );
  }
}

CurrencySection.displayName = 'CurrencySection';

export default withStyles(styles)(CurrencySection);
