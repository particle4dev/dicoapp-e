import { fromJS } from 'immutable';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  transactions: {
    loading: false,
    error: false,
    list: []
  }
});

function walletReducer(state = initialState, { type, payload, error }) {
  switch (type) {
    case LOAD_TRANSACTIONS:
      return state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false);
    case LOAD_TRANSACTIONS_SUCCESS:
      return state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'list'], fromJS(payload.transactions));
    case LOAD_TRANSACTIONS_ERROR:
      return state
        .setIn(['transactions', 'error'], error)
        .setIn(['transactions', 'loading'], false);
    default:
      return state;
  }
}

export default walletReducer;
