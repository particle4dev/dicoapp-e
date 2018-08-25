// @flow
import { remote } from 'electron';
import FetchService from '../fetch-service';
import { config } from '../../config/config-default';

const debug = require('debug')('dicoapp:utils:barter-dex-api');

class BarterDexAPI {
  constructor(
    settings = {
      url: config.barterdex,
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
      paths: remote.require('./config/paths')
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

  post(data) {
    return this.fetch.create('', data);
  }

  create(data) {
    return this.fetch.create('', data);
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
  getBalance(params) {
    const balanceparams = Object.assign({}, params, {
      method: 'balance'
    });
    return this.create(balanceparams);
  }

  // https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#electrum
  addServer(params) {
    const serverparams = Object.assign({}, params, {
      method: 'electrum'
    });
    return this.create(serverparams);
  }

  listTransactions(params) {
    // verify params
    const serverparams = Object.assign({}, params, {
      method: 'listtransactions',
      count: 10
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
