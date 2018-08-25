import {
  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR
} from './constants';

export function loadWallet() {
  return {
    type: LOAD_WALLET
  };
}

export function loadWalletSuccess(transactions) {
  return {
    type: LOAD_WALLET_SUCCESS,
    payload: {
      transactions
    }
  };
}

export function loadWalletError() {
  return {
    type: LOAD_WALLET_ERROR
  };
}
