// @flow
import type { List } from 'immutable';

import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_COIN_SYMBOL,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR
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

export function loadCoinSymbol(coins: List<*>) {
  return {
    type: LOAD_COIN_SYMBOL,
    payload: {
      coins
    }
  };
}

export function loadBestPrice(coin: string, bestPrice: number) {
  return {
    type: LOAD_BEST_PRICE,
    payload: {
      coin,
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
