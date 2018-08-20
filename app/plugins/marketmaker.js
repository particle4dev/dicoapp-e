import childProcess from 'child_process';
import { app } from 'electron';
import killProcess from './killprocess';
import {
  marketmaker as marketmakerBin,
  homeDir,
  // binDir,
  userDataDir
} from '../config/paths';
import coinsdata from './coinsdata.json';

const debug = require('debug')('dicoapp:plugins:marketmaker');

const APPNAME = 'mm';

const MarketMaker = (name = APPNAME) => {
  const state = {
    isRunning: false,
    marketmakerBin,
    name
  };
  let marketmakerProcess = null;
  return Object.assign(
    {
      // start: function start(options) {
      start: function start() {
        debug('start');

        killProcess('marketmaker');

        const startparams = {
          gui: 'dICOapp-cm',
          client: 1,
          canbind: 0,
          userhome: homeDir,
          passphrase: 'default',
          coins: coinsdata
        };

        marketmakerProcess = childProcess.spawn(
          marketmakerBin,
          [JSON.stringify(startparams)],
          { cwd: userDataDir }
        );
        marketmakerProcess.on('error', error => {
          state.isRunning = false;
          throw error;
        });

        app.on('quit', () => {
          this.stop();
        });
      },

      stop: function stop() {
        debug('stop');
        state.isRunning = false;
        if (marketmakerProcess) {
          marketmakerProcess.kill();
        }

        marketmakerProcess = null;
        killProcess('marketmaker');
      },

      isRunning: function isRunning() {
        return state.isRunning;
      }
    }
    // GetState(state),
    // Config(state),
    // OpenConnect(state),
    // FileStream(state),
    // UploadImage(state),
    // FinishUpload(state)
  );
};

export default MarketMaker();
