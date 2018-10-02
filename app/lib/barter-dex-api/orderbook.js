// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#orderbook
// import type { StateType } from './schema';

type OrderbookType = {
  base: string,
  rel: string
};

// export default function orderbookFactory(state: StateType) {
export default function orderbookFactory() {
  return {
    orderbook(params: OrderbookType) {
      const serverparams = Object.assign({}, params, {
        method: 'orderbook'
      });
      return this.privateCall(serverparams);
    }
  };
}
