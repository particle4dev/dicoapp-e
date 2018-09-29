import { fork, call, take } from 'redux-saga/effects';

export default function takeFirst(pattern, saga, ...args) {
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
}
