import recentswaps from '../recentswaps';

describe('utils/barter-dex-api/recentswaps', () => {
  it('should handle the recentswaps correctly', () => {
    const state = {
      userpass: null
    };
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'recentswaps'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, recentswaps(state));
    api.recentswaps();
  });

  it('should handle the recentswaps correctly with limit param', () => {
    const state = {
      userpass: null
    };
    const limit = 1;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          limit,
          method: 'recentswaps'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, recentswaps(state));
    api.recentswaps({
      limit
    });
  });
});
