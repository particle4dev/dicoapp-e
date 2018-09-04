// @flow

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
  LOAD_COIN_BALANCE_SUCCESS,
  LOAD_WITHDRAW_ERROR
} from './constants';

export function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS
  };
}

export function loadTransactionsSuccess(transactions) {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS,
    payload: {
      transactions
    }
  };
}

export function loadTransactionsError(message: string) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error: {
      message
    }
  };
}

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
