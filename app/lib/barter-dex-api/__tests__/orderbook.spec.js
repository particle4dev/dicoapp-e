import orderbook from '../orderbook';

describe('utils/barter-dex-api/orderbook', () => {
  it('should handle the orderbook correctly', () => {
    const state = {
      userpass: null
    };
    const base = 'base';
    const rel = 'rel';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          base,
          rel,
          method: 'orderbook'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, orderbook(state));
    api.orderbook({
      base,
      rel
    });
  });
});
