import {
  takeEvery,
  takeLatest,
  put,
  select,
  call,
  all
} from 'redux-saga/effects';
import {
  makeSelectCurrentUser,
  makeSelectBalanceEntities
} from '../App/selectors';
import { loadSwapSuccess } from '../App/actions';
import getConfig from '../../utils/config';
import api from '../../utils/barter-dex-api';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  LOAD_RECENT_SWAPS
} from './constants';
import {
  loadPricesSuccess,
  loadPricesError,
  loadBestPrice,
  loadBuyCoinSuccess,
  loadBuyCoinError,
  loadRecentSwapsCoin,
  loadRecentSwapsError
} from './actions';
import {
  makeSelectBalanceList,
  makeSelectPricesEntities,
  makeSelectSwapsEntities
} from './selectors';

const debug = require('debug')('dicoapp:containers:BuyPage:saga');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const numcoin = 100000000;
const txfee = 10000;

export function* loadPrice(coin, userpass, pubkey) {
  const getprices = {
    userpass,
    base: COIN_BASE.coin,
    rel: coin
  };
  const buf = 1.08 * numcoin;
  let bestprice = 0;
  try {
    const result = yield api.orderbook(getprices);
    let ask = null;
    if (pubkey) {
      debug('find order by pubkey');
      ask = result.asks.find(e => e.pubkey === pubkey);
    } else {
      debug('not found pubkey so we are going to load first order');
      ask = result.asks.find(e => e.maxvolume > 0);
    }
    if (!ask) {
      throw new Error('not found the best price');
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

export function* loadPricesProcess() {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const balance = yield select(makeSelectBalanceList());

    const tokenconfig = config.get('marketmaker.tokenconfig');

    const requests = [];
    for (let i = 0; i < balance.size; i += 1) {
      const coin = balance.get(i);
      requests.push(call(loadPrice, coin, userpass, tokenconfig.pubkey));
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

export function* loadBuyCoinProcess({ payload }) {
  try {
    // step one: load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const { basecoin, paymentcoin, amount } = payload;

    const userpass = user.get('userpass');
    // const coins = user.get('coins');
    // const smartaddress = coins.find(c => c.get('coin') === paymentcoin);

    // step two: load balance
    const balances = yield select(makeSelectBalanceEntities());
    const balance = balances.find(c => c.get('coin') === paymentcoin);

    // step three: load best price
    const prices = yield select(makeSelectPricesEntities());
    const price = prices.find(c => c.get('rel') === paymentcoin);

    // step four: check balance
    const relvolume = Number(amount * price.get('price'));
    if (
      relvolume * numcoin + txfee >=
      Number(balance.get('balance') * numcoin).toFixed(0)
    ) {
      throw new Error('Not enough balance!');
    }

    // step one: get listUnspent data
    // const unspent = yield api.listUnspent({
    //   userpass,
    //   coin: paymentcoin,
    //   address: smartaddress.get('smartaddress')
    // });
    // console.log('loadBuyCoinProcess', unspent);

    // step xxx: buy
    const buyparams = {
      userpass,
      base: basecoin,
      rel: paymentcoin,
      relvolume: relvolume.toFixed(8),
      price: price.get('bestPrice').toFixed(8)
    };

    const result = yield api.buy(buyparams);
    if (result.pending) {
      return yield put(loadBuyCoinSuccess(result.pending));
    }
    if (result.error) {
      return yield put(loadBuyCoinError(result.error));
    }
  } catch (err) {
    // FIXME: handling error
    return yield put(loadBuyCoinError(err.message));
  }
}

export function* checkSwap(userpass, requestid, quoteid, isPending) {
  const swapelem = {
    userpass,
    requestid,
    quoteid
  };

  const swapstatusResult = yield call([api, 'swapstatus'], swapelem);

  yield put(loadRecentSwapsCoin(swapstatusResult));

  if (isPending && swapstatusResult.status === 'finished') {
    yield put(
      loadSwapSuccess([
        {
          coin: swapstatusResult.bob,
          value: swapstatusResult.srcamount
        },
        {
          coin: swapstatusResult.alice,
          value: 0 - swapstatusResult.destamount
        }
      ])
    );
  }

  return true;
}

export function* loadRecentSwapsProcess() {
  try {
    // step one: load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');
    const swaplist = {
      userpass
    };
    const swapsEntities = yield select(makeSelectSwapsEntities());

    const recentswapsResult = yield call([api, 'recentswaps'], swaplist);

    const { swaps } = recentswapsResult;
    const requests = [];
    for (let i = 0; i < swaps.length; i += 1) {
      const swapobj = swaps[i];
      // eslint-disable-next-line no-await-in-loop
      const e = swapsEntities.find(
        val =>
          val.get('requestid') === swapobj[0] &&
          val.get('quoteid') === swapobj[1]
      );
      if (!e) {
        requests.push(call(checkSwap, userpass, swapobj[0], swapobj[1]));
      } else if (e.get('status') === 'pending') {
        requests.push(call(checkSwap, userpass, swapobj[0], swapobj[1], true));
      }
    }
    const data = yield all(requests);
    debug('load recent swaps process', data);
  } catch (err) {
    // FIXME: handling error
    return yield put(loadRecentSwapsError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield takeLatest(LOAD_PRICES, loadPricesProcess);
  yield takeLatest(LOAD_BUY_COIN, loadBuyCoinProcess);
  yield takeLatest(LOAD_RECENT_SWAPS, loadRecentSwapsProcess);
  yield takeEvery(LOAD_PRICE, loadPriceProcess);
}
