// @flow
import FetchService from '../fetch-service';
import config from '../config';
import type { EndpointType, CancelRequest } from './schema';

const debug = require('debug')('dicoapp:utils:barter-dex-api');

class BarterDexAPI {
  constructor(
    settings = {
      url: config.get('barterdex'),
      name: ''
    }
  ) {
    debug(`url = ${settings.url}`);
    this.fetch = new FetchService({
      name: settings.name,
      options: {},
      base: settings.url
    });
    this.config = {
      paths: config.get('paths')
    };
  }

  isReady() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          debug('isReady');
          await this.fetch.find({});
          clearInterval(interval);
          resolve('OK');
          // eslint-disable-next-line no-empty
        } catch (_) {}
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('Giving up trying to connect to marketmaker'));
      }, 10000);
    });
  }

  // publicCall() {
  //   throw new Error('not implement yet. Return promise');
  // }

  // privateCall() {
  //   throw new Error('not implement yet. Return promise');
  // }

  post(data) {
    return this.fetch.create('', data);
  }

  create(data, ...rest) {
    return this.fetch.create('', data, ...rest);
  }

  /**
   * Status/Info
   */
  getEndpoint(params: EndpointType) {
    const endpointParams = Object.assign({}, params, {
      method: 'getendpoint'
    });
    return this.create(endpointParams);
  }

  /**
   * BarterDEX Operation
   */
  cancel(params: CancelRequest) {
    const endpointParams = Object.assign({}, params, {
      method: 'cancel'
    });
    return this.create(endpointParams);
  }

  login(passphrase: string) {
    const { paths } = this.config;
    const setparams = {
      userpass:
        '1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f',
      userhome: paths.homeDir,
      method: 'passphrase',
      passphrase,
      gui: 'dICOapp-cm'
      // 'netid':
      // 'seednode':
    };
    return this.create(setparams);
  }

  /**
   *
   */
  // eslint-disable-next-line flowtype/no-weak-types
  getBalance(params: Object) {
    // FIXME: verify params
    const balanceparams = Object.assign({}, params, {
      method: 'balance'
    });
    return this.create(balanceparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#electrum
  // eslint-disable-next-line flowtype/no-weak-types
  addServer(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'electrum'
    });
    return this.create(serverparams);
  }

  // eslint-disable-next-line flowtype/no-weak-types
  listTransactions(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'listtransactions',
      count: 10
    });
    return this.create(serverparams);
  }

  // eslint-disable-next-line flowtype/no-weak-types
  withdraw(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'withdraw'
    });
    return this.create(serverparams);
  }

  // eslint-disable-next-line flowtype/no-weak-types
  sendRawTransaction(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'sendrawtransaction'
    });
    return this.create(serverparams, {
      toJSON: false
    });
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#orderbook
  // eslint-disable-next-line flowtype/no-weak-types
  orderbook(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'orderbook'
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#listunspent
  // eslint-disable-next-line flowtype/no-weak-types
  listUnspent(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'listunspent'
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#recentswaps
  // eslint-disable-next-line flowtype/no-weak-types
  recentswaps(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'recentswaps'
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#swapstatus-requestid-quoteid-pending-0
  // eslint-disable-next-line flowtype/no-weak-types
  swapstatus(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'swapstatus'
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#pendingswaps
  // eslint-disable-next-line flowtype/no-weak-types
  pendingswaps(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'swapstatus',
      pending: 1
    });
    return this.create(serverparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html?highlight=listunspent#buy
  // eslint-disable-next-line flowtype/no-weak-types
  buy(params: Object) {
    // FIXME: verify params
    const serverparams = Object.assign({}, params, {
      method: 'buy'
    });
    return this.create(serverparams);
  }
}

let api = null;

function setup() {
  if (api) return api;

  api = new BarterDexAPI();

  return api;
}

export default setup();
