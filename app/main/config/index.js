const ipc = require('electron-better-ipc');
const Config = require('../../lib/config-manager');
const loadPaths = require('./paths').default;
const loadDefault = require('./config-default').default;
const loadCoinsData = require('./coins-data').default;
const loadSymbol = require('./symbol').default;

let config = null;

module.exports = function setup() {
  if (config) return config;

  config = Config();

  loadDefault(config);
  loadPaths(config);
  loadCoinsData(config);
  loadSymbol(config);

  // listen ipc event here
  ipc.answerRenderer('config:get', () => config.get());

  return config;
};
