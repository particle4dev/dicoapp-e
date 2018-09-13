import { remote } from 'electron';
import { fromJS } from 'immutable';

const tokenconfig = remote.require('./config/tokenconfig');

// eslint-disable-next-line import/prefer-default-export
export const COIN_BASE = fromJS(tokenconfig.tokenconfig);
