// @flow

// const debug = require('debug')('dicoapp:utils:barter-dex-socket');

class BarterDexWebsocket {
  // start() {
  // }
  // stop() {
  // }
  // onMessage(rawMsg) {
  // }
}

let websocket = null;

function setup() {
  if (websocket) return websocket;

  websocket = new BarterDexWebsocket();

  return websocket;
}

export default setup();
