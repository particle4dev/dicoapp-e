// @flow
import WebSocket from 'faye-websocket';

const debug = require('debug')('dicoapp:utils:barter-dex-socket');

function BarterDexWebsocket() {
  // constructor
  let stream = null;
  let currentListeners = [];
  let nextListeners = currentListeners;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  // eslint-disable-next-line flowtype/no-weak-types
  function subscribe(listener: Function) {
    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function start(endpoint: string) {
    // Create WebSocket connection.
    stream = new WebSocket.Client(endpoint);
    stream.on('open', event => {
      debug('open', event);
    });
    stream.on('message', onMessage);
    stream.on('close', event => {
      debug('close', event.code, event.reason);
      stream = null;
    });
  }

  function stop() {}

  async function onMessage(event) {
    const data = JSON.parse(event.data.toString('utf8'));
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i += 1) {
      const listener = listeners[i];
      listener(data);
    }
  }

  return {
    start,
    stop,
    subscribe
  };
}

let websocket = null;

function setup() {
  if (websocket) return websocket;

  websocket = new BarterDexWebsocket();

  return websocket;
}

export default setup();
