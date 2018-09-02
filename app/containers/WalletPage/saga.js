import isArray from 'lodash/isArray';
import { put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS, LOAD_BALANCE } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../utils/barter-dex-api';
import {
  loadTransactionsSuccess,
  loadTransactionsError,
  loadBalanceSuccess,
  loadBalanceError
} from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:saga');

export function processTransactionsData(data, coin) {
  // https://github.com/chainmakers/dicoapp/blob/glxt/.desktop/modules/marketmaker/index.js#L1144
  // sort
  let result = data.sort((a, b) => b.height - a.height);

  // only take 10 records
  result = result.slice(0, 10);

  // add coin symbol
  result = result.map(e => {
    e.coin = coin;
    return e;
  });
  return result;
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
    // eslint-disable-next-line arrow-body-style
    const requests = coins.map(e => {
      return new Promise(async (resolve, reject) => {
        try {
          const params = {
            userpass,
            coin: e.get('coin'),
            address: e.get('smartaddress')
          };
          const data = await api.listTransactions(params);
          return resolve({
            data,
            coin: e.get('coin')
          });
        } catch (err) {
          return reject(err);
        }
      });
    });
    let data = yield Promise.all(requests);
    data = data
      .filter(e => {
        const r = isArray(e.data);
        if (!r) {
          debug(`not found ${e.coin}`);
        }
        return r;
        // eslint-disable-next-line arrow-body-style
      })
      .map(e => processTransactionsData(e.data, e.coin))
      .reduce((a, b) => a.concat(b), []);

    return yield put(loadTransactionsSuccess(data));
  } catch (err) {
    return yield put(loadTransactionsError(err.message));
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
    // eslint-disable-next-line arrow-body-style
    const requests = coins.map(e => {
      return new Promise(async (resolve, reject) => {
        try {
          const params = {
            userpass,
            coin: e.get('coin'),
            address: e.get('smartaddress')
          };
          const data = await api.getBalance(params);
          data.address = e.get('smartaddress');
          return resolve(data);
        } catch (err) {
          return reject(err);
        }
      });
    });

    let data = yield Promise.all(requests);
    data = data
      .filter(e => {
        const r = e.result === 'success';
        if (!r) {
          debug(`not found ${e.coin}`);
        }
        return r;
        // eslint-disable-next-line arrow-body-style
      })
      .map(e => ({
        address: e.address,
        balance: e.balance,
        coin: e.coin
      }));

    return yield put(loadBalanceSuccess(data));
  } catch (err) {
    return yield put(loadBalanceError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeLatest(LOAD_TRANSACTIONS, loadTransactionsProcess);
  yield takeLatest(LOAD_BALANCE, loadBalanceProcess);
}
