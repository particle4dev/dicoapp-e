// import fs from 'fs';
// import path from 'path';
import pm2 from 'pm2';

// const cp = require('child_process');
// const queue = require('queue');
// const ms = require('ms');
import {
  marketmaker as marketmakerBin,
  homeDir,
  binDir
} from '../config/paths';

import coinsdata from './coinsdata.json';

const marketmaker = (() => {
  // Instance stores a reference to the Singleton
  let instance;

  function init() {
    // Private methods and variables
    // function privateMethod() {
    //   console.log('I am private');
    // }

    // const privateVariable = 'Im also private';

    const privateRandomNumber = Math.random();
    let process;

    pm2.connect(
      true,
      err => {
        // start up pm2 god
        if (err) {
          console.error(err);
          process.exit(2);
        }
        const startparams = {
          gui: 'dICOapp-cm',
          client: 1,
          canbind: 0,
          userhome: homeDir,
          passphrase: 'default',
          coins: coinsdata
        };
        const params = JSON.stringify(startparams);
        console.log(params, 'params');
        pm2.start(
          {
            script: marketmakerBin, // path to MM binary
            exec_mode: 'fork',
            cwd: binDir, // set correct working dir for MM data
            args: params, // stringified params,
            name: 'mm',
            exec_interpreter: 'none'
          },
          (e, app) => {
            if (e) {
              console.log(e, 'pm2 start error');
              return;
            }
            pm2.disconnect(); // Disconnect from PM2
            console.log('started MM ');

            process = app;
          }
        );
      }
    );

    return {
      // Public methods and variables
      publicMethod() {
        console.log('The public can see me!');
      },

      publicProperty: 'I am also public',

      getRandomNumber() {
        return privateRandomNumber;
      }
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    start: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

export default marketmaker;
