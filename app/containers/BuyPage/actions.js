// @flow

import {
  LOAD_PRICES,
  LOAD_PRICES_SUCCESS,
  LOAD_PRICES_ERROR
} from './constants';

export function loadPrices() {
  return {
    type: LOAD_PRICES
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
