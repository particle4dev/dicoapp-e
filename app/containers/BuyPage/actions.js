// @flow

import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR,
  LOAD_BUY_COIN,
  // LOAD_BUY_COIN_SUCCESS,
  LOAD_BUY_COIN_ERROR
} from './constants';

export function loadPrice(coin: string) {
  return {
    type: LOAD_PRICE,
    payload: {
      coin
    }
  };
}

export function loadPrices() {
  return {
    type: LOAD_PRICES
  };
}

export function loadBestPrice(coin: string, name: string, bestPrice: number) {
  return {
    type: LOAD_BEST_PRICE,
    payload: {
      coin,
      name,
      bestPrice
    }
  };
}

export function loadPricesSuccess() {
  return {
    type: LOAD_PRICES_SUCCESS,
    payload: {}
  };
}

export function loadPricesError(message: string) {
  return {
    type: LOAD_PRICES_ERROR,
    error: {
      message
    }
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadBuyCoin(payload: Object) {
  return {
    type: LOAD_BUY_COIN,
    payload
  };
}

export function loadBuyCoinError(message: string) {
  return {
    type: LOAD_BUY_COIN_ERROR,
    error: {
      message
    }
  };
}
