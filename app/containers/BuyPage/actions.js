// @flow

import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_SUCCESS,
  LOAD_BUY_COIN_ERROR,
  LOAD_RECENT_SWAPS,
  LOAD_RECENT_SWAPS_COIN,
  // LOAD_RECENT_SWAPS_SUCCESS,
  LOAD_RECENT_SWAPS_ERROR
} from './constants';

import type { PriceCoin } from './schema';

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

export function loadBestPrice(payload: PriceCoin) {
  return {
    type: LOAD_BEST_PRICE,
    payload
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

// eslint-disable-next-line flowtype/no-weak-types
export function loadBuyCoinSuccess(payload: Object) {
  return {
    type: LOAD_BUY_COIN_SUCCESS,
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

export function loadRecentSwaps() {
  return {
    type: LOAD_RECENT_SWAPS
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function loadRecentSwapsCoin(payload: Object) {
  return {
    type: LOAD_RECENT_SWAPS_COIN,
    payload
  };
}

export function loadRecentSwapsError(message: string) {
  return {
    type: LOAD_RECENT_SWAPS_ERROR,
    error: {
      message
    }
  };
}
