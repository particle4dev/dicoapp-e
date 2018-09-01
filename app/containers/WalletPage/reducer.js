import { fromJS } from 'immutable';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  transactions: []
});

function walletReducer(state = initialState, { type, payload, error }) {
  switch (type) {
    case LOAD_TRANSACTIONS:
      return state.set('loading', true).set('error', false);
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('transactions', fromJS(payload.transactions));
    case LOAD_TRANSACTIONS_ERROR:
      return state.set('error', error).set('loading', false);
    default:
      return state;
  }
}

export default walletReducer;
