import { call, put, select, all } from 'redux-saga/effects';
import getConfig from '../../../utils/config';
import api from '../../../utils/barter-dex-api';
import { makeSelectCurrentUser } from '../../App/selectors';
import { loadBestPrice, loadPricesSuccess, loadPricesError } from '../actions';
import { makeSelectBalanceList } from '../selectors';

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const numcoin = 100000000;
const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-prices-process'
);

export function* loadPrice(coin, userpass) {
  const getprices = {
    userpass,
    base: COIN_BASE.coin,
    rel: coin
  };
  const buf = 1.08 * numcoin;
  const bob = COIN_BASE.pubkey;
  let bestprice = 0;
  try {
    const result = yield call([api, 'orderbook'], getprices);
    const ask = result.asks.find(e => e.pubkey === bob);
    if (!ask) {
      throw new Error('dICO Bob is offline!');
    }

    bestprice = Number((ask.price * numcoin).toFixed(0));
    bestprice = Number(
      (((buf / numcoin) * bestprice) / numcoin).toFixed(8) * numcoin
    ).toFixed(0);
    debug(`best prices:`, ask);
    return yield put(
      loadBestPrice({
        bestPrice: Number(bestprice / numcoin),
        price: ask.price,
        avevolume: ask.avevolume,
        maxvolume: ask.maxvolume,
        numutxos: ask.numutxos,
        base: COIN_BASE.coin,
        rel: coin,
        age: ask.age,
        zcredits: ask.zcredits,
        address: ask.address,
        pubkey: ask.pubkey,
        depth: ask.depth
      })
    );
  } catch (err) {
    debug(`load price process: ${err.message}`);
    return yield put(
      loadBestPrice({
        bestPrice: 0,
        price: 0,
        avevolume: 0,
        maxvolume: 0,
        numutxos: 0,
        base: COIN_BASE.coin,
        rel: coin,
        age: 0,
        zcredits: 0,
        address: '',
        pubkey: '',
        depth: 0
      })
    );
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

export default function* loadPricesProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const balance = yield select(makeSelectBalanceList());

    // const tokenconfig = config.get('marketmaker.tokenconfig');

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
