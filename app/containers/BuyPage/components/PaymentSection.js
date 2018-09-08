// @flow
import React, { PureComponent } from 'react';
import type { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { Line } from '../../../components/placeholder';
import { covertSymbolToName, floor } from '../utils';
import { COIN_BASE } from '../tokenconfig';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('dicoapp:containers:BuyPage:PaymentSection');

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
  // classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick: Function,
  paymentCoin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  list: List<*>
};

class PaymentSection extends PureComponent<Props> {
  static defaultProps = {};

  renderPaymentCoin = symbol => {
    const {
      onClick,
      paymentCoin,
      entities,
      balance,
      dispatchLoadPrice
    } = this.props;
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
        onClick={onClick}
      >
        <span>
          1 {COIN_BASE.get('coin')} = {c.get('bestPrice')} {symbol}
        </span>
      </CoinSelectable>
    );
  };

  render() {
    debug(`render`);
    const { list } = this.props;
    return list.map(this.renderPaymentCoin);
  }
}

PaymentSection.displayName = 'PaymentSection';

export default withStyles(styles)(PaymentSection);
