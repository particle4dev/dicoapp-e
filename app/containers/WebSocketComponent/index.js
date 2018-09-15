// @flow
import React from 'react';
import injectReducer from '../../utils/inject-reducer';
import reducer from './reducer';
import { APP_STATE_NAME } from './constants';

const debug = require('debug')('dicoapp:containers:WebSocketComponent');

type Props = {};

class WebSocket extends React.Component<Props> {
  render() {
    debug('render');
    return null;
  }
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });

export default withReducer(WebSocket);
