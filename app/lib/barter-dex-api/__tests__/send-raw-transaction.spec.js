import sendRawTransaction from '../send-raw-transaction';

describe('utils/barter-dex-api/send-raw-transaction', () => {
  it('should handle the sendRawTransaction correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'coin';
    const signedtx = 'signedtx';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          signedtx,
          method: 'sendrawtransaction'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, sendRawTransaction(state));
    api.sendrawtransaction({
      coin,
      signedtx
    });
  });
});
