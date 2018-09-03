/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_COIN_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR
  // LOAD_WITHDRAW,
  // LOAD_WITHDRAW_SUCCESS,
  // LOAD_WITHDRAW_ERROR
} from './constants';

import { LOGOUT } from '../App/constants';

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
    coins: [],
    entities: {}
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
      return state.setIn(['balance', 'loading'], false);
    case LOAD_COIN_BALANCE_SUCCESS:
      // step one: update entities
      const entities = state.getIn(['balance', 'entities']);
      state = state.setIn(
        ['balance', 'entities'],
        entities.set(payload.coin, fromJS(payload))
      );
      // step two: add key in coins list
      const coins = state.getIn(['balance', 'coins']);
      if (!coins.has(payload.coin)) {
        state = state.setIn(['balance', 'coins'], coins.push(payload.coin));
      }
      return state;
    case LOAD_BALANCE_ERROR:
      return state
        .setIn(['balance', 'error'], error)
        .setIn(['balance', 'loading'], false);

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
