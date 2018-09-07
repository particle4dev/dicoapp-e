// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import {
  fork,
  take,
  put,
  takeLatest,
  select,
  call,
  all
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from '../../utils/barter-dex-api';
import routes from '../../constants/routes.json';
import { LOGOUT, LOAD_BALANCE } from './constants';
import { makeSelectCurrentUser } from './selectors';
import {
  loadBalanceSuccess,
  loadCoinBalanceSuccess,
  loadBalanceError
} from './actions';

const debug = require('debug')('dicoapp:containers:App:saga');

export function* logoutFlow() {
  debug(`logout flow`);
  while (true) {
    const request = yield take(LOGOUT);
    debug(`go to login ${request.type}`);
    yield put(push(routes.LOGIN));
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

export default function* root() {
  yield takeLatest(LOAD_BALANCE, loadBalanceProcess);
  yield fork(logoutFlow);
}
