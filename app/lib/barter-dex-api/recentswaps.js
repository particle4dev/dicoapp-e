// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#recentswaps
// import type { StateType } from './schema';

type RecentswapsType = {
  limit?: number
};

// export default function recentswapsFactory(state: StateType) {
export default function recentswapsFactory() {
  return {
    recentswaps(params?: RecentswapsType) {
      const serverparams = Object.assign({}, params, {
        method: 'recentswaps'
      });
      return this.privateCall(serverparams);
    }
  };
}
