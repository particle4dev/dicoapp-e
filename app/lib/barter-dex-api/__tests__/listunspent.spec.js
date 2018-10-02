import listunspentFactory from '../listunspent';

describe('utils/barter-dex-api/listunspent', () => {
  it('should handle the listunspent correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'BEER';
    const address = 'address';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          address,
          method: 'listunspent'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, listunspentFactory(state));
    api.listunspent({
      coin,
      address
    });
  });
});
