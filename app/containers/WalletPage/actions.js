import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_WITHDRAW,
  LOAD_WITHDRAW_SUCCESS,
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

export function loadTransactionsError(message) {
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

export function loadBalanceSuccess(balance) {
  return {
    type: LOAD_BALANCE_SUCCESS,
    payload: {
      balance
    }
  };
}

export function loadBalanceError(message) {
  return {
    type: LOAD_BALANCE_ERROR,
    error: {
      message
    }
  };
}

export function loadWithdraw() {
  return {
    type: LOAD_WITHDRAW
  };
}

export function loadWithdrawSuccess() {
  return {
    type: LOAD_WITHDRAW_SUCCESS
  };
}

export function loadWithdrawError() {
  return {
    type: LOAD_WITHDRAW_ERROR
  };
}
