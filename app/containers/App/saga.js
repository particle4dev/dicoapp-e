import { fork, take, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import routes from '../../constants/routes.json';
import { LOGOUT } from './constants';

const debug = require('debug')('dicoapp:containers:App:saga');

export function* logoutFlow() {
  debug(`logout flow`);
  while (true) {
    const request = yield take(LOGOUT);
    debug(`go to login ${request.type}`);
    yield put(push(routes.LOGIN));
  }
}

export default function* root() {
  yield fork(logoutFlow);
}
