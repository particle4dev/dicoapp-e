// @flow

// import type { StateType } from './schema';

// export default function getendpointFactory(state: StateType) {
export default function getendpointFactory() {
  return {
    getendpoint() {
      const serverparams = {
        method: 'getendpoint'
      };
      return this.privateCall(serverparams);
    }
  };
}
