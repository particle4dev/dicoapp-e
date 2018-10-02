// @flow

// import type { StateType } from './schema';

type WithdrawType = {
  coin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  outputs: Object
};

// export default function withdrawFactory(state: StateType) {
export default function withdrawFactory() {
  return {
    withdraw(params: WithdrawType) {
      const serverparams = Object.assign({}, params, {
        method: 'withdraw'
      });
      return this.privateCall(serverparams);
    }
  };
}
