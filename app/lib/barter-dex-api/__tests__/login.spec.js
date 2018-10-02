import login from '../login';

describe('utils/barter-dex-api/login', () => {
  it('should handle the login correctly', () => {
    const state = {
      userpass: null
    };
    const userpass = 'userpass';
    const passphrase = 'passphrase';
    const homeDir = 'homeDir';
    const fakeHttpProvider = {
      setUserpass(u) {
        expect(userpass).toEqual(u);
      },
      publicCall(params) {
        expect(params).toEqual({
          userpass:
            '1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f',
          userhome: homeDir,
          method: 'passphrase',
          passphrase,
          gui: 'dICOapp-cm'
        });
        return Promise.resolve({
          userpass
        });
      }
    };
    const api = Object.assign(
      {},
      fakeHttpProvider,
      login(state, {
        homeDir
      })
    );
    api.login(passphrase);
  });
});
