// eslint-disable-next-line import/prefer-default-export
import { remote } from 'electron';
import { fromJS } from 'immutable';

const tokenconfig = remote.require('./config/tokenconfig');

export const APP_STATE_NAME = 'buy';
export const LOAD_PRICES = 'dicoapp/BuyPage/LOAD_PRICES';
export const LOAD_COIN_SYMBOL = 'dicoapp/BuyPage/LOAD_COIN_SYMBOL';
export const LOAD_PRICES_SUCCESS = 'dicoapp/BuyPage/LOAD_PRICES_SUCCESS';
export const LOAD_PRICES_ERROR = 'dicoapp/BuyPage/LOAD_PRICES_ERROR';

export const LOAD_PRICE = 'dicoapp/BuyPage/LOAD_PRICE';
export const LOAD_BEST_PRICE = 'dicoapp/BuyPage/LOAD_BEST_PRICE';

export const COIN_BASE = fromJS(tokenconfig.tokenconfig);
