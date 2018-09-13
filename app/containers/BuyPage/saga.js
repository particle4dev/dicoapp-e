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
import api from '../../utils/barter-dex-api';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  LOAD_RECENT_SWAPS
} from './constants';
import { COIN_BASE } from './tokenconfig';
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
// import { covertSymbolToName, Loops } from './utils';

const numcoin = 100000000;
const txfee = 10000;
const debug = require('debug')('dicoapp:containers:BuyPage:saga');

// ==========================TESTS============================

// async function checkSwapStatus(userpass) {
//   const swaplist = {
//     userpass
//   };
//   const recentswapsResult = await api.recentswaps(swaplist);
//   console.log('recentswapsResult', recentswapsResult);
//   console.log('recentswapsResult', JSON.stringify(recentswapsResult));

//   for (let i = 0; i < recentswapsResult.swaps.length; i += 1) {
//     const swapobj = recentswapsResult.swaps[i];
//     // eslint-disable-next-line no-await-in-loop
//     await checkSwap(userpass, swapobj[0], swapobj[1]);
//   }
// }

// const checkSwapStatusLoops = new Loops(10000, checkSwapStatus);

// ======================================================

export function* loadPrice(coin, userpass) {
  const getprices = {
    userpass,
    base: COIN_BASE.get('coin'),
    rel: coin
  };
  const buf = 1.08 * numcoin;
  // const name = covertSymbolToName(coin);
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
      return yield put(
        loadBestPrice({
          bestPrice: Number(bestprice / numcoin),
          price: ask.price,
          avevolume: ask.avevolume,
          maxvolume: ask.maxvolume,
          numutxos: ask.numutxos,
          base: COIN_BASE.get('coin'),
          rel: coin,
          age: ask.age
        })
      );
    }
    return yield put(
      loadBestPrice({
        bestPrice: 0,
        price: 0,
        avevolume: 0,
        maxvolume: 0,
        numutxos: 0,
        base: COIN_BASE.get('coin'),
        rel: coin,
        age: 0
      })
    );
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
  const swapstatusResult = yield api.swapstatus(swapelem);
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

    const recentswapsResult = yield api.recentswaps(swaplist);
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
