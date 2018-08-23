// import { call, put, select, takeLatest } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../App/constants';
// import { CHANGE_USERNAME } from './constants';

import api from '../../utils/barter-dex-api';
// import { makeSelectUsername } from './selectors';

/**
 * Github repos request/response handler
 */
export function* loginProcess(action) {
  try {
    const { passphrase } = action;
    const data = yield api.login(passphrase);
    console.log(data, 'data');
  } catch (err) {
    console.log(err, 123);
  }
  // const servers = electrum.map(e => {
  //   e.userpass = data.userpass;
  //   return e;
  // });
  // const results = [];
  // for (let i = 0; i < servers.length; i += 1) {
  //   results.push(api.addServer(servers[i]));
  // }
  // console.log(await Promise.all(results));
  // return swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');

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
