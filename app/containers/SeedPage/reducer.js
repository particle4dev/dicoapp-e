import { fromJS } from 'immutable';

import { GENERATE_PASSPHRASE, GENERATE_WIF } from './constants';

// The initial state of the App
const initialState = fromJS({
  passphrase: '',
  wif: '',
  wifExpansion: false
});

function walletReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GENERATE_PASSPHRASE:
      return state.set('passphrase', payload.passphrase);
    case GENERATE_WIF:
      return state.set('wif', payload.wif);
    default:
      return state;
  }
}

export default walletReducer;
