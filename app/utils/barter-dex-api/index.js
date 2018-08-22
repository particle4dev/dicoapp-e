import { remote } from 'electron';
import FetchService from '../fetch-service';
import { config } from '../../config/config-default';

const debug = require('debug')('dicoapp:utils:barter-dex-api');

export default class BarterDexAPI {
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

  login(passphrase) {
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
}
