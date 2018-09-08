// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { COIN_BASE } from '../tokenconfig';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:BuyPage:CurrencySection');

const styles = () => ({});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class CurrencySection extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    debug(`render`);
    const symbol = COIN_BASE.get('coin');
    const icon = getCoinIcon(symbol);

    return (
      <CoinSelectable
        key={`baseCoin${symbol}`}
        selected
        data={symbol}
        icon={icon}
        title={COIN_BASE.get('name')}
        {...this.props}
      />
    );
  }
}

CurrencySection.displayName = 'CurrencySection';

export default withStyles(styles)(CurrencySection);
