// eslint-disable-next-line import/prefer-default-export
import { remote } from 'electron';
import { fromJS } from 'immutable';

const tokenconfig = remote.require('./config/tokenconfig');

export const APP_STATE_NAME = 'buy';

export const LOAD_PRICES = 'dicoapp/BuyPage/LOAD_PRICES';
export const LOAD_PRICES_SUCCESS = 'dicoapp/BuyPage/LOAD_PRICES_SUCCESS';
export const LOAD_PRICES_ERROR = 'dicoapp/BuyPage/LOAD_PRICES_ERROR';

export const COIN_BASE = fromJS(tokenconfig.tokenconfig);
export const COIN_BASE1 = [
  {
    symbol: 'BTC',
    name: 'Bitcoin'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum'
  },
  {
    symbol: 'BEER',
    name: 'Beer'
  },
  {
    symbol: 'PIZZA',
    name: 'Pizza'
  }
];
