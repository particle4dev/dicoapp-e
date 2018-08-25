import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectWallet = state => state.get(APP_STATE_NAME);

const makeSelectLoading = () =>
  createSelector(selectWallet, walletState => walletState.get('loading'));

const makeSelectError = () =>
  createSelector(selectWallet, walletState => walletState.get('error'));

const makeSelectTransactions = () =>
  createSelector(selectWallet, walletState => walletState.get('transactions'));

export {
  selectWallet,
  makeSelectLoading,
  makeSelectError,
  makeSelectTransactions
};
