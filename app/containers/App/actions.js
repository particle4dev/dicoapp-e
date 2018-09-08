/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * https://github.com/redux-utilities/flux-standard-action
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_COIN_BALANCE_SUCCESS,
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_WITHDRAW_ERROR
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function login(passphrase) {
  return {
    type: LOGIN,
    payload: {
      passphrase
    }
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOGIN_SUCCESS passing the repos
 */
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user
    }
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOGIN_ERROR passing the error
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

/**
 * Logout, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logout() {
  return {
    type: LOGOUT
  };
}

/**
 *
 */

export function loadBalance() {
  return {
    type: LOAD_BALANCE
  };
}

export function loadBalanceSuccess() {
  return {
    type: LOAD_BALANCE_SUCCESS
  };
}

export function loadCoinBalanceSuccess(payload: {
  address: string,
  balance: number,
  coin: string
}) {
  return {
    type: LOAD_COIN_BALANCE_SUCCESS,
    payload
  };
}

export function loadBalanceError(message: string) {
  return {
    type: LOAD_BALANCE_ERROR,
    error: {
      message
    }
  };
}

export function loadWithdraw(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: LOAD_WITHDRAW,
    payload
  };
}

export function loadWithdrawSuccess(payload: {
  amount: number,
  address: string,
  coin: string
}) {
  return {
    type: LOAD_WITHDRAW_SUCCESS,
    payload
  };
}

export function loadWithdrawError(message: string) {
  return {
    type: LOAD_WITHDRAW_ERROR,
    error: {
      message
    }
  };
}
