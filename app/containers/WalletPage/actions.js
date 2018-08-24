import {
  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR
} from './constants';

export function loadWallet(passphrase) {
  return {
    type: LOAD_WALLET,
    payload: {
      passphrase
    }
  };
}

export function loadWalletSuccess() {
  return {
    type: LOAD_WALLET_SUCCESS
  };
}

export function loadWalletError() {
  return {
    type: LOAD_WALLET_ERROR
  };
}
