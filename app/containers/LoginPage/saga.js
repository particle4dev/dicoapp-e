// https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js

import { remote } from 'electron';
import { fork, take, race, call, put } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../App/constants';
import { loginSuccess, loginError } from '../App/actions';
import api from '../../utils/barter-dex-api';

const electrum = remote.require('./config/electrum');
const debug = require('debug')('dicoapp:containers:LoginPage:saga');

export function* authorize(passphrase) {
  try {
    debug(`authorize is running`);
    const data = yield api.login(passphrase);
    const servers = electrum.map(e => {
      e.userpass = data.userpass;
      return e;
    });
    const results = [];
    for (let i = 0; i < servers.length; i += 1) {
      results.push(api.addServer(servers[i]));
    }
    yield Promise.all(results);
    console.log(
      'GLXT',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'GLXT',
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu'
      })
    );
    console.log(
      'PIZZA',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'PIZZA',
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu'
      })
    );
    console.log(
      'BEER',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'BEER',
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu'
      })
    );
    console.log(
      'KMD',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'KMD',
        address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu'
      })
    );
    console.log(
      'BTC',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'BTC',
        address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv'
      })
    );
    console.log(
      'LTC',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'LTC',
        address: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ'
      })
    );
    console.log(
      'COQUI',
      yield api.getBalance({
        userpass: data.userpass,
        coin: 'COQUI',
        address: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ'
      })
    );
    return data;
  } catch (err) {
    yield put(
      loginError({
        message: err.message
      })
    );
    return false;
  }
}

/**
 * Root saga manages watcher lifecycle
 */
// export default function* userData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOGIN, loginProcess);
// }

export function* loginFlow() {
  debug(`login flow`);
  while (true) {
    const { payload } = yield take(LOGIN);
    const { passphrase } = payload;
    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    const winner = yield race({
      auth: call(authorize, passphrase),
      logout: take(LOGOUT)
    });

    if (winner.auth) {
      yield put(loginSuccess(winner.auth));
      // forwardTo('/dashboard') // Go to dashboard page
    }
  }
}

export default function* root() {
  yield fork(loginFlow);
}
