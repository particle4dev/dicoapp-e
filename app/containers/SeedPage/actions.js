import { GENERATE_PASSPHRASE, GENERATE_WIF } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function generatePassphrase(passphrase) {
  return {
    type: GENERATE_PASSPHRASE,
    payload: {
      passphrase
    }
  };
}

export function generateWif() {
  return {
    type: GENERATE_WIF
  };
}
