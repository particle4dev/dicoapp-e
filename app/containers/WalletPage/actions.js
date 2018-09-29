// @flow

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR
} from './constants';
import type { TransactionPayload } from './schema';

export function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS
  };
}

export function loadTransactionsSuccess() {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS
  };
}

export function loadTransactionSuccess(transaction: Array<TransactionPayload>) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    payload: {
      transaction
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
