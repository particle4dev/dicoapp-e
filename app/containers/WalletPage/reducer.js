/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
} from './constants';

import { LOGOUT } from '../App/constants';

// The initial state of the App
const initialState = fromJS({
  transactions: {
    loading: false,
    error: false,
    list: []
  }
});

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

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
