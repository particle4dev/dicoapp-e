import { loadRecentSwapsDataFromWebsocket } from './actions';
import { makeSelectSwapsList } from './selectors';

const allowedMethods = [
  // 'request',
  // 'reserved',
  // 'connect',
  // 'connected',
  'update',
  'tradestatus'
];

export default async function buySubscribe({ result }, dispatch, getState) {
  if (result && allowedMethods.indexOf(result.method) !== -1) {
    const selectSwapsList = makeSelectSwapsList();
    const list = selectSwapsList(getState());
    if (list.includes(result.uuid)) {
      dispatch(loadRecentSwapsDataFromWebsocket(result));
    }
  }
}
