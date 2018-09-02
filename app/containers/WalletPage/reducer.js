import { fromJS } from 'immutable';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  transactions: {
    loading: false,
    error: false,
    list: []
  },
  balance: {
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

    case LOAD_BALANCE:
      return state
        .setIn(['balance', 'loading'], true)
        .setIn(['balance', 'error'], false);
    case LOAD_BALANCE_SUCCESS:
      return state
        .setIn(['balance', 'loading'], false)
        .setIn(['balance', 'list'], fromJS(payload.balance));
    case LOAD_BALANCE_ERROR:
      return state
        .setIn(['balance', 'error'], error)
        .setIn(['balance', 'loading'], false);
    default:
      return state;
  }
}

export default walletReducer;
