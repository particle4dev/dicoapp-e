// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listunspent

// import type { StateType } from './schema';

type ListUnspentType = {
  coin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  address: string
};

// export default function listunspentFactory(state: StateType) {
export default function listunspentFactory() {
  return {
    listunspent(params: ListUnspentType) {
      const serverparams = Object.assign({}, params, {
        method: 'listunspent'
      });
      return this.privateCall(serverparams);
    }
  };
}
