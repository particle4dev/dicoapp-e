import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectWallet = state => state.get(APP_STATE_NAME);

const makeSelectTransactions = () =>
  createSelector(selectWallet, walletState => walletState.get('transactions'));

const makeSelectTransactionsLoading = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('loading')
  );

const makeSelectTransactionsError = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('error')
  );

const makeSelectTransactionsList = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('list')
  );

const makeSelectWithdraw = () =>
  createSelector(selectWallet, walletState => walletState.get('withdraw'));

const makeSelectWithdrawLoading = () =>
  createSelector(makeSelectWithdraw(), withdrawState =>
    withdrawState.get('loading')
  );

const makeSelectWithdrawError = () =>
  createSelector(makeSelectWithdraw(), withdrawState =>
    withdrawState.get('error')
  );

export {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactionsList,
  makeSelectTransactions,
  makeSelectWithdraw,
  makeSelectWithdrawLoading,
  makeSelectWithdrawError
};
