// https://www.jamestease.co.uk/blether/mock-es6-imports-with-jest
// https://redux-saga.js.org/docs/advanced/Testing.html
import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../../lib/barter-dex-api';
import loadBuyCoinProcess from '../load-buy-coin-process';
import data, {
  listunspentstep1,
  listunspentstep2,
  buy1,
  buy2,
  buyAppropriateError
} from './fake-data';

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/BuyPage/saga/load-buy-coin-process', () => {
  api.setUserpass('userpass');
  it(
    'should handle loadBuyCoinProcess correctly',
    async done => {
      let listunspentstep = 0;
      let buystep = 0;
      // const scope = nock(TEST_URL)
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);

          if (method === 'listunspent' && listunspentstep === 0) {
            listunspentstep = 1;
            cb(null, listunspentstep1);
          } else if (method === 'listunspent' && listunspentstep === 1) {
            listunspentstep = 2;
            cb(null, listunspentstep2);
          }

          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            cb(null, buy1);
          } else if (method === 'buy' && buystep === 1) {
            buystep = 2;
            cb(null, buy2);
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadBuyCoinProcess,
        {
          payload: {
            basecoin: 'COQUI',
            paymentcoin: 'BEER',
            amount: 10
          },
          time: 0
        }
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          type: 'dicoapp/BuyPage/LOAD_BUY_COIN_SUCCESS',
          payload: {
            uuid:
              'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
            expiration: 1536603425,
            timeleft: 59,
            tradeid: 3624682363,
            requestid: 0,
            quoteid: 0,
            bob: 'COQUI',
            base: 'COQUI',
            basevalue: 85.74334186,
            alice: 'BEER',
            rel: 'BEER',
            relvalue: 0.92602593,
            desthash:
              'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
            aliceid: '7904046646222061569'
          }
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    90 * 1000
  );

  it(
    'should dispatch appropriate error when handle loadBuyCoinProcess',
    async done => {
      let listunspentstep = 0;
      let buystep = 0;
      nock(TEST_URL)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .persist()
        .post('/', () => true)
        .reply(200, (uri, body, cb) => {
          const { method } = JSON.parse(body);

          if (method === 'listunspent' && listunspentstep === 0) {
            listunspentstep = 1;
            cb(null, listunspentstep1);
          } else if (method === 'listunspent' && listunspentstep === 1) {
            listunspentstep = 2;
            cb(null, listunspentstep2);
          }

          if (method === 'buy' && buystep === 0) {
            buystep = 1;
            cb(null, buy1);
          } else if (method === 'buy' && buystep === 1) {
            buystep = 2;
            cb(null, buyAppropriateError);
          }
        });

      const dispatched = [];

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => fromJS(data)
        },
        loadBuyCoinProcess,
        {
          payload: {
            basecoin: 'COQUI',
            paymentcoin: 'BEER',
            amount: 10
          },
          time: 0
        }
      ).done;

      expect(saga).toEqual(1);
      expect(dispatched).toEqual([
        {
          error: {
            message: 'Please try a different amount to pay (1/2 or 2x)'
          },
          type: 'dicoapp/BuyPage/LOAD_BUY_COIN_ERROR'
        }
      ]);

      nock.cleanAll();
      nock.enableNetConnect();
      done();
    },
    90 * 1000
  );
});
