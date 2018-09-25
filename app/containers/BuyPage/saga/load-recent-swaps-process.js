import { put, all, call, cancelled, select } from 'redux-saga/effects';
import api from '../../../utils/barter-dex-api';
import { makeSelectCurrentUser } from '../../App/selectors';
// import { loadSwapSuccess } from '../../App/actions';
import { loadRecentSwapsCoin, loadRecentSwapsError } from '../actions';
import { makeSelectSwapsEntities } from '../selectors';

const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-recent-swaps-process'
);

export function* checkSwap(userpass, requestid, quoteid, isPending) {
  try {
    const swapelem = {
      userpass,
      requestid,
      quoteid
    };

    const swapstatusResult = yield call([api, 'swapstatus'], swapelem);

    yield put(loadRecentSwapsCoin(swapstatusResult));

    if (isPending && swapstatusResult.status === 'finished') {
      console.log(isPending);
      //   yield put(
      //     loadSwapSuccess([
      //       {
      //         coin: swapstatusResult.bob,
      //         value: swapstatusResult.srcamount
      //       },
      //       {
      //         coin: swapstatusResult.alice,
      //         value: 0 - swapstatusResult.destamount
      //       }
      //     ])
      //   );
    }
    return true;
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}

export default function* loadRecentSwapsProcess() {
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
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}
