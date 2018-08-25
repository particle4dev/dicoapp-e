import { put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_WALLET } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../utils/barter-dex-api';
import { loadWalletSuccess } from './actions';

// export function* loadWalletProcess({ payload }) {
export function* loadWalletProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    console.log('user', user);
    // NOTE: what if user is not found
    // const listparams1 = {
    //   userpass: user.userpass,
    //   coin: 'BTC',
    //   address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
    // };
    // const data1 = yield api.listTransactions(listparams1);
    // console.log('data1', data1);

    const listparams2 = {
      // userpass: user.userpass,
      userpass:
        '191af892de6980aacbbb74ab5cca89a68ebaa9360687d4059228485277a73a09',
      coin: 'KMD',
      address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu'
    };
    let data2 = yield api.listTransactions(listparams2);
    if (data2.error) {
      throw new Error(data2.error);
    }
    console.log(data2, data2);
    data2 = data2.map(e => {
      e.coin = 'KMD';
      return e;
    });
    yield put(loadWalletSuccess(data2));
  } catch (err) {
    console.log('123', err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeLatest(LOAD_WALLET, loadWalletProcess);
}
