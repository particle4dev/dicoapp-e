import { remote } from 'electron';
import Config from '../lib/config-manager';

let config = null;

function setup() {
  if (config) return config;

  config = Config();
  const c = remote.require('./main/config');
  config.set(c.get());

  // listen ipc event here

  return config;
}

export default setup();
