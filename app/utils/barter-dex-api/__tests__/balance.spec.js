import balance from '../balance';

describe('utils/barter-dex-api/balance', () => {
  it('should handle the balance correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'coin';
    const address = 'address';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          method: 'balance'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, balance(state));
    api.balance({
      coin,
      address
    });
  });
});
