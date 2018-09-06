import { takeLatest, put, select, call, all } from 'redux-saga/effects';
import { LOAD_PRICES, COIN_BASE } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../utils/barter-dex-api';
import { loadPricesSuccess, loadPricesError } from './actions';

const numcoin = 100000000;
// const txfee = 10000;
const debug = require('debug')('dicoapp:containers:BuyPage:saga');

export function* loadPriceProcess(coin, userpass) {
  const getprices = {
    userpass,
    base: COIN_BASE,
    rel: coin
  };
  const buf = 1.08 * numcoin;
  let bestprice = 0;
  try {
    const result = yield api.orderbook(getprices);
    console.log(result, 'result');
    if (result.asks.length > 0) {
      const ask = result.asks.find(e => e.maxvolume > 0);
      bestprice = Number((ask.price * numcoin).toFixed(0));
      console.log(bestprice, coin, ask, 'ask');
      bestprice = Number(
        (((buf / numcoin) * bestprice) / numcoin).toFixed(8) * numcoin
      ).toFixed(0);
      console.log(bestprice, 'bestprice');

      // var i = 0;
      // while (i < resultJson.asks.length && resultJson.asks[i].maxvolume === 0) {
      //   i++;
      // }
      // if(resultJson.asks[i].maxvolume > 0){
      //   bestprice = Number((resultJson.asks[i].price * 100000000).toFixed(0));
      // }
    }
    return bestprice !== 0;
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
    const coins = user.get('coins');

    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      requests.push(call(loadPriceProcess, coin, userpass));
    }

    const data = yield all(requests);
    console.log(data, 'data');
    return yield put(loadPricesSuccess());
  } catch (err) {
    return yield put(loadPricesError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield takeLatest(LOAD_PRICES, loadPricesProcess);
}
