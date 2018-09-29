// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#buy

// import type { StateType } from './schema';

type BuyType = {
  base: string,
  rel: string,
  relvolume: string,
  price: string
};

// export default function buyFactory(state: StateType) {
export default function buyFactory() {
  return {
    buy(params: BuyType) {
      const serverparams = Object.assign({}, params, {
        method: 'buy'
      });
      return this.privateCall(serverparams);
    }
  };
}
