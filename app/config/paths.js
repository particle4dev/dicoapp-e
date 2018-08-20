const { homedir } = require('os');
const { resolve } = require('path');

const homeDir = homedir();
const binDir = resolve(__dirname, '../bin');

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
  marketmaker
};
