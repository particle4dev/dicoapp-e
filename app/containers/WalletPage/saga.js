import { select, takeLatest } from 'redux-saga/effects';
import { LOAD_WALLET } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
// import api from '../../utils/barter-dex-api';

// export function* loadWalletProcess({ payload }) {
export function* loadWalletProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    console.log('user data', user);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeLatest(LOAD_WALLET, loadWalletProcess);
}
