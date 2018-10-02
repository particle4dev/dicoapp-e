// @flow

// import type { StateType } from './schema';

type BalanceType = {
  coin: string,
  address: string
};

// export default function orderbookFactory(state: StateType) {
export default function balanceFactory() {
  return {
    balance(params: BalanceType) {
      const serverparams = Object.assign({}, params, {
        method: 'balance'
      });
      return this.privateCall(serverparams);
    }
  };
}
