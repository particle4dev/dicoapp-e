import nock from 'nock';
import httpProvider from '../http-provider';

const TEST_URL = 'http://127.0.0.1:7783';

describe('utils/barter-dex-api/http-provider', () => {
  it('should handle the httpProvider correctly', async () => {
    nock(TEST_URL)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .persist()
      .get(() => true)
      .reply(200, (uri, body, cb) => {
        cb(null, {
          uri,
          body
        });
      });
    const state = {
      userpass: null
    };
    const api = Object.assign({}, httpProvider(state));
    let res = await api.get({
      song: 'perfect'
    });
    expect(res).toEqual({ uri: '/?song=perfect', body: '' });
    res = await api.get();
    expect(res).toEqual({ uri: '/', body: '' });
  });
});
