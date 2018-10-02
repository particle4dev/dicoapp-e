import swapstatus from '../swapstatus';

describe('utils/barter-dex-api/swapstatus', () => {
  it('should handle the swapstatus correctly', () => {
    const state = {
      userpass: null
    };
    const requestid = 1914742321;
    const quoteid = 2455665257;
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          requestid,
          quoteid,
          method: 'swapstatus'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, swapstatus(state));
    api.swapstatus({
      requestid,
      quoteid
    });
  });
});
