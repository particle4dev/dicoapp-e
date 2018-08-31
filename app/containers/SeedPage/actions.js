import { GENERATE_PASSPHRASE, GENERATE_WIF } from './constants';

// eslint-disable-next-line import/prefer-default-export
export function generatePassphrase() {
  return {
    type: GENERATE_PASSPHRASE
  };
}

export function generateWif() {
  return {
    type: GENERATE_WIF
  };
}
