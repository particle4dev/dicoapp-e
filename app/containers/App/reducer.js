/* eslint-disable no-case-declarations, no-param-reassign */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_COIN_BALANCE_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: null,
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

const appReducer = handleActions(
  {
    [LOGIN]: state => state.set('loading', true).set('error', false),

    [LOGIN_SUCCESS]: (state, { payload }) =>
      state.set('loading', false).set('currentUser', fromJS(payload.user)),

    [LOGIN_ERROR]: (state, { error }) =>
      state.set('error', error).set('loading', false),

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

    [LOGOUT]: () => initialState
  },
  initialState
);

export default appReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
