import { fromJS } from 'immutable';

import {
  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  transactions: []
});

function walletReducer(state = initialState, { type, payload, error }) {
  switch (type) {
    case LOAD_WALLET:
      return state.set('loading', true).set('error', false);
    case LOAD_WALLET_SUCCESS:
      return state
        .set('loading', false)
        .set('transactions', fromJS(payload.transactions));
    case LOAD_WALLET_ERROR:
      return state.set('error', error).set('loading', false);
    default:
      return state;
  }
}

export default walletReducer;
