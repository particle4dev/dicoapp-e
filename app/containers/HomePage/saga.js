import swal from 'sweetalert';
import { remote } from 'electron';
// import { call, select } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../App/constants';
import { loginSuccess } from '../App/actions';
import api from '../../utils/barter-dex-api';
// import { CHANGE_USERNAME } from './constants';
// import { makeSelectUsername } from './selectors';

const electrum = remote.require('./config/electrum');

/**
 * Github repos request/response handler
 */
export function* loginProcess({ payload }) {
  try {
    const { passphrase } = payload;
    const data = yield api.login(passphrase);
    yield put(loginSuccess(data));
    const servers = electrum.map(e => {
      e.userpass = data.userpass;
      return e;
    });
    const results = [];
    for (let i = 0; i < servers.length; i += 1) {
      results.push(api.addServer(servers[i]));
    }
    console.log(yield Promise.all(results));
    return swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
  } catch (err) {
    console.log(err);
  }

  // const username = yield select(makeSelectUsername());
  // console.log(username);
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  //   try {
  //     // Call our request helper (see 'utils/request')
  //     const repos = yield call(request, requestURL);
  //     yield put(reposLoaded(repos, username));
  //   } catch (err) {
  //     yield put(repoLoadingError(err));
  //   }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, loginProcess);
}
