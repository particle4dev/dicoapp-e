// @flow
import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import getConfig from '../config';
import type { StateType } from './schema';

function toError(error) {
  throw error;
}

function json(body) {
  return body.data;
}

const headers = {
  Accept: 'application/json'
};

const TIMEOUT = 300000; // 5 min

const config = getConfig();

export default function httpProvider(
  state: StateType,
  url: string = config.get('barterdex')
) {
  return {
    // eslint-disable-next-line flowtype/no-weak-types
    publicCall(params: Object) {
      const source = CancelToken.source();
      const serverparams = {
        timeout: TIMEOUT,
        headers,
        data: params,
        url,
        method: 'post',
        cancelToken: source.token
      };

      const request = axios(serverparams)
        .then(json)
        .catch(toError);
      request[CANCEL] = () => source.cancel();
      return request;
    },
    // eslint-disable-next-line flowtype/no-weak-types
    privateCall(params: Object) {
      const userpass = this.getUserpass();
      const source = CancelToken.source();
      if (!userpass) {
        return Promise.reject(new Error('not found userpass'));
      }
      const data = Object.assign(
        {
          userpass
        },
        params
      );
      const serverparams = {
        timeout: TIMEOUT,
        headers,
        data,
        url,
        method: 'post',
        cancelToken: source.token
      };
      const request = axios(serverparams)
        .then(json)
        .catch(toError);
      request[CANCEL] = () => source.cancel();
      return request;
    },
    // eslint-disable-next-line flowtype/no-weak-types
    get(params: Object) {
      const source = CancelToken.source();
      const serverparams = {
        timeout: TIMEOUT,
        headers,
        params,
        url,
        method: 'get',
        cancelToken: source.token
      };
      const request = axios(serverparams)
        .then(json)
        .catch(toError);
      request[CANCEL] = () => source.cancel();
      return request;
    }
  };
}
