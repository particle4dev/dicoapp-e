const fs = require('fs');
const electron = require('electron');
const { homedir } = require('os');
const { resolve } = require('path');
const { APPNAME } = require('./config-default');

// const debug = require('debug')('dicoapp:config:paths');
const homeDir = homedir();
const binDir = resolve(__dirname, '../bin');
const userDataDir = resolve(electron.app.getPath('userData'), APPNAME);

// create user data path
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir);
}

const marketmakerPlatformPath = () => {
  switch (process.platform) {
    case 'darwin':
      return resolve(binDir, 'marketmaker/OSX/marketmaker');
    case 'win32':
      return resolve(binDir, 'marketmaker/WIN/marketmaker.exec');
    case 'linux':
      return resolve(binDir, 'marketmaker/LINUX/marketmaker');
    default:
      return resolve(binDir, 'marketmaker/OSX/marketmaker');
  }
};

const marketmaker = marketmakerPlatformPath();

module.exports = {
  binDir,
  homeDir,
  marketmaker,
  userDataDir
};
