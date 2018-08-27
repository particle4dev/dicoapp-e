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

import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: null
});

function appReducer(state = initialState, { type, payload, error }) {
  switch (type) {
    case LOGIN:
      return state.set('loading', true).set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', fromJS(payload.user));
    case LOGIN_ERROR:
      return state.set('error', error).set('loading', false);
    case LOGOUT:
      return state.set('loading', false).set('currentUser', null);
    default:
      return state;
  }
}

export default appReducer;
