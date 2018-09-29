// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#electrum
// import type { StateType } from './schema';

type AddServerType = {
  coin: string,
  ipaddr: string,
  port: number
};

// export default function addServer(state: StateType) {
export default function addServerFactory() {
  return {
    addServer(params: AddServerType) {
      const serverparams = Object.assign({}, params, {
        method: 'electrum'
      });
      return this.privateCall(serverparams);
    }
  };
}
