import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
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
