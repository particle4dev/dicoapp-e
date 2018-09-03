import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS, LOAD_BALANCE, LOAD_WITHDRAW } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../utils/barter-dex-api';
import {
  loadTransactionsSuccess,
  loadTransactionsError,
  loadBalanceSuccess,
  loadCoinBalanceSuccess,
  loadBalanceError,
  loadWithdrawSuccess,
  loadWithdrawError
} from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:saga');

export function* loadCoinTransactionsProcess(coin, address, userpass) {
  try {
    debug(`loadCoinTransactionsProcess running${coin}`);
    // https://github.com/chainmakers/dicoapp/blob/glxt/.desktop/modules/marketmaker/index.js#L1144
    const params = {
      userpass,
      coin,
      address
    };
    let data = yield api.listTransactions(params);

    // sort
    data = data.sort((a, b) => b.height - a.height);

    // only take 10 records
    data = data.slice(0, 10);

    // add coin symbol
    data = data.map(e => {
      e.coin = coin;
      return e;
    });
    return data;
  } catch (err) {
    debug(`loadCoinTransactionsProcess fail ${coin}: ${err.message}`);
    return false;
  }
}

export function* loadTransactionsProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const coins = user.get('coins');

    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      requests.push(call(loadCoinTransactionsProcess, coin, address, userpass));
    }

    let data = yield all(requests);
    data = data.reduce((a, b) => a.concat(b), []);

    return yield put(loadTransactionsSuccess(data));
  } catch (err) {
    return yield put(loadTransactionsError(err.message));
  }
}

export function* loadCoinBalanceProcess(coin, address, userpass) {
  try {
    debug(`loadCoinBalanceProcess running${coin}`);
    const params = {
      userpass,
      coin,
      address
    };
    const data = yield api.getBalance(params);
    data.address = address;
    yield put(
      loadCoinBalanceSuccess({
        coin,
        address,
        balance: Number(data.balance)
      })
    );
    debug(`load balance done ${coin}`, data);

    return {
      address: data.address,
      balance: data.balance,
      coin: data.coin
    };
  } catch (err) {
    debug(`loadCoinBalanceProcess fail ${coin}: ${err.message}`);
    return false;
  }
}

export function* loadBalanceProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const coins = user.get('coins');
    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      requests.push(call(loadCoinBalanceProcess, coin, address, userpass));
    }
    yield all(requests);
    return yield put(loadBalanceSuccess());
  } catch (err) {
    return yield put(loadBalanceError(err.message));
  }
}

export function* loadWithdrawProcess({ payload }) {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');

    const { amount, address, coin } = payload;

    let outputs = `[{${address}: ${Number(amount)}}]`;

    // eslint-disable-next-line no-eval
    outputs = JSON.stringify(eval(`(${outputs})`));

    const sendparams = {
      userpass,
      coin,
      outputs: JSON.parse(outputs)
    };

    const result = yield api.withdraw(sendparams);
    console.log('RAWTX: ', result);

    const sendrawtx = {
      userpass,
      coin,
      signedtx: result.hex
    };
    const result2 = yield api.sendRawTransaction(sendrawtx);
    console.log(result2, 'result2');

    return yield put(loadWithdrawSuccess(payload));
  } catch (err) {
    return yield put(loadWithdrawError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactionsProcess);
  yield takeLatest(LOAD_BALANCE, loadBalanceProcess);
  yield takeLatest(LOAD_WITHDRAW, loadWithdrawProcess);
}
