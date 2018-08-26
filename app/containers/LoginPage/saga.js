import swal from 'sweetalert';
import { remote } from 'electron';
// import { call, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../App/constants';
import { loginSuccess } from '../App/actions';
import api from '../../utils/barter-dex-api';

const electrum = remote.require('./config/electrum');

export function* loginProcess({ payload }) {
  try {
    const { passphrase } = payload;
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
    yield put(loginSuccess(data));
    return swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
  } catch (err) {
    return swal('Something went wrong:', err.toString(), 'error');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, loginProcess);
}
