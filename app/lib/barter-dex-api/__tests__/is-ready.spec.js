import isReadyFactory from '../is-ready';

describe('utils/barter-dex-api/is-ready', () => {
  it('should handle the isReadyFactory correctly', async () => {
    const state = {
      userpass: null
    };
    const fakeHttpProvider = {
      get() {
        return 'OK';
      }
    };
    const api = Object.assign({}, fakeHttpProvider, isReadyFactory(state));
    const res = await api.isready();
    expect(res).toEqual('OK');
  });
});
