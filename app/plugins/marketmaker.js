import childProcess from 'child_process';
import { app } from 'electron';
import killProcess from './killprocess';
import {
  marketmaker as marketmakerBin,
  homeDir,
  // binDir,
  userDataDir
} from '../config/paths';
import coinsdata from '../config/coins-data';

// const { marketmakerCrashedDialog } = require('../dialogs');
const debug = require('debug')('dicoapp:plugins:marketmaker');

const MarketMaker = () => {
  const state = {
    isRunning: false,
    marketmakerBin
  };

  let marketmakerProcess = null;

  return Object.assign(
    {
      start: function start(options) {
        debug('start');

        killProcess('marketmaker');

        const startparams = Object.assign({}, options, {
          client: 1,
          canbind: 0,
          gui: 'dICOapp-cm',
          passphrase: 'default',
          userhome: homeDir,
          coins: coinsdata
        });

        marketmakerProcess = childProcess.spawn(
          marketmakerBin,
          [JSON.stringify(startparams)],
          { cwd: userDataDir }
        );

        state.isRunning = true;

        marketmakerProcess.on('error', error => {
          state.isRunning = false;
          throw error;
        });

        // marketmakerProcess.on('exit', () => {
        //   if (!this.isRunning) {
        //     return;
        //   }

        //   state.isRunning = false;
        //   marketmakerCrashedDialog();
        // });

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
