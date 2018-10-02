import getendpoint from '../get-endpoint';

describe('utils/barter-dex-api/getendpoint', () => {
  it('should handle the getendpoint correctly', () => {
    const state = {
      userpass: null
    };
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          method: 'getendpoint'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getendpoint(state));
    api.getendpoint();
  });
});
