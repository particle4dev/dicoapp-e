import listTransactions from '../list-transactions';

describe('utils/barter-dex-api/list-transactions', () => {
  it('should handle the listTransactions correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'KMD';
    const address = '0dxaddress';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          count: 10,
          method: 'listtransactions'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, listTransactions(state));
    api.listTransactions({
      coin,
      address
    });
  });
});
