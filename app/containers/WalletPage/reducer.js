/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_COIN_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_WITHDRAW_ERROR
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

function initialWalletState(coin) {
  coin.loading = false;
  coin.error = false;
  return coin;
}

const walletReducer = handleActions(
  {
    [LOAD_TRANSACTIONS]: state =>
      state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false),

    [LOAD_TRANSACTIONS_SUCCESS]: (state, { payload }) =>
      state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'list'], fromJS(payload.transactions)),

    [LOAD_TRANSACTIONS_ERROR]: (state, { error }) =>
      state
        .setIn(['transactions', 'error'], error)
        .setIn(['transactions', 'loading'], false),

    [LOAD_BALANCE]: state =>
      state
        .setIn(['balance', 'loading'], true)
        .setIn(['balance', 'error'], false),

    [LOAD_COIN_BALANCE_SUCCESS]: (state, { payload }) => {
      // step one: update entities
      const entities = state.getIn(['balance', 'entities']);
      state = state.setIn(
        ['balance', 'entities'],
        entities.set(payload.coin, fromJS(initialWalletState(payload)))
      );
      // step two: add key in coins list
      const coins = state.getIn(['balance', 'coins']);
      if (!coins.find(obj => obj === payload.coin)) {
        state = state.setIn(['balance', 'coins'], coins.push(payload.coin));
      }
      return state;
    },

    [LOAD_BALANCE_SUCCESS]: state => state.setIn(['balance', 'loading'], false),

    [LOAD_BALANCE_ERROR]: (state, { error }) =>
      state
        .setIn(['balance', 'error'], error)
        .setIn(['balance', 'loading'], false),

    [LOAD_WITHDRAW]: (state, { payload }) => {
      // step one: get coin
      let entities = state.getIn(['balance', 'entities']);
      const coin = entities.get(payload.coin);
      // step two: update loading
      entities = entities.set(
        payload.coin,
        coin.set('loading', true).set('error', false)
      );
      return state.setIn(['balance', 'entities'], entities);
    },

    [LOAD_WITHDRAW_SUCCESS]: (state, { payload }) => {
      // step one: get coin
      let entities = state.getIn(['balance', 'entities']);
      const coin = entities.get(payload.coin);
      // step two: update balance
      const balance = coin.get('balance');
      entities = entities.set(
        payload.coin,
        coin.set('loading', false).set('balance', balance - payload.amount)
      );
      return state.setIn(['balance', 'entities'], entities);
    },

    [LOAD_WITHDRAW_ERROR]: (state, { payload, error }) => {
      // step one: get coin
      let entities = state.getIn(['balance', 'entities']);
      const coin = entities.get(payload.coin);
      // step two: update loading
      entities = entities.set(
        payload.coin,
        coin.set('loading', false).set('error', error)
      );
      return state.setIn(['balance', 'entities'], entities);
    },

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
