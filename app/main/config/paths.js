const fs = require('fs');
const { app } = require('electron');
const { homedir } = require('os');
const { resolve } = require('path');

// const debug = require('debug')('dicoapp:config:paths');

const marketmakerPlatformPath = binDir => {
  switch (process.platform) {
    case 'darwin':
      return resolve(binDir, 'marketmaker/OSX/marketmaker');
    case 'win32':
      return resolve(binDir, 'marketmaker/WIN/marketmaker.exe');
    case 'linux':
      return resolve(binDir, 'marketmaker/LINUX/marketmaker');
    default:
      return resolve(binDir, 'marketmaker/OSX/marketmaker');
  }
};

export default function loadPaths(config) {
  // create user data path
  const userDataDir = resolve(app.getPath('userData'), config.get('APPNAME'));
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir);
  }
  const binDir = resolve(__dirname, '../../bin');

  return config.set('paths', {
    homeDir: homedir(),
    binDir,
    userDataDir,
    marketmaker: marketmakerPlatformPath(binDir)
  });
}
