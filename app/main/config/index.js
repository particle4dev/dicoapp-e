import Config from '../../lib/config-manager';
import loadPaths from './paths';
import loadDefault from './config-default';
import loadCoinsData from './coins-data';
import loadSymbol from './symbol';

let config = null;

function setup() {
  if (config) return config;

  config = Config();

  loadDefault(config);
  loadPaths(config);
  loadCoinsData(config);
  loadSymbol(config);

  // listen ipc event here

  return config;
}

export default setup();
