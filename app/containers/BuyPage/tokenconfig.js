import { fromJS } from 'immutable';
import config from '../../utils/config';

const tokenconfig = config.get('marketmaker.tokenconfig');

// eslint-disable-next-line import/prefer-default-export
export const COIN_BASE = fromJS(tokenconfig);
