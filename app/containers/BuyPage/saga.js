import {
  takeEvery,
  takeLatest,
  put,
  select,
  call,
  all
} from 'redux-saga/effects';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../utils/barter-dex-api';
import { LOAD_PRICES, LOAD_PRICE } from './constants';
import { COIN_BASE } from './tokenconfig';
import { loadPricesSuccess, loadPricesError, loadBestPrice } from './actions';
import { makeSelectBalanceList } from './selectors';
import { covertSymbolToName } from './utils';

const numcoin = 100000000;
// const txfee = 10000;
const debug = require('debug')('dicoapp:containers:BuyPage:saga');

export function* loadPrice(coin, userpass) {
  const getprices = {
    userpass,
    base: COIN_BASE.get('coin'),
    rel: coin
  };
  const buf = 1.08 * numcoin;
  const name = covertSymbolToName(coin);
  let bestprice = 0;
  try {
    const result = yield api.orderbook(getprices);
    if (result.asks.length > 0) {
      const ask = result.asks.find(e => e.maxvolume > 0);
      bestprice = Number((ask.price * numcoin).toFixed(0));
      bestprice = Number(
        (((buf / numcoin) * bestprice) / numcoin).toFixed(8) * numcoin
      ).toFixed(0);
      debug(`best prices:`, ask);
    }
    return yield put(loadBestPrice(coin, name, Number(bestprice / numcoin)));
  } catch (err) {
    debug(`load price process: ${err.message}`);
    return false;
  }
}

export function* loadPricesProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const balance = yield select(makeSelectBalanceList());

    const requests = [];
    for (let i = 0; i < balance.size; i += 1) {
      const coin = balance.get(i);
      requests.push(call(loadPrice, coin, userpass));
    }

    const data = yield all(requests);
    debug('load prices process', data);

    return yield put(loadPricesSuccess());
  } catch (err) {
    return yield put(loadPricesError(err.message));
  }
}

export function* loadPriceProcess({ payload }) {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const { coin } = payload;

    return yield call(loadPrice, coin, userpass);
  } catch (err) {
    // FIXME: handling error
    return yield put(loadPricesError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield takeLatest(LOAD_PRICES, loadPricesProcess);
  yield takeEvery(LOAD_PRICE, loadPriceProcess);
}
