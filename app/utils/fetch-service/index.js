import fetch from 'node-fetch';
import omit from 'lodash/omit';
import Base from './base';

const ignoreFieldsInHeader = ['content-length'];

class FetchService extends Base {
  constructor(settings) {
    super(settings);
    this.connection = fetch;
  }

  request(options) {
    const fetchOptions = Object.assign({}, options);
    fetchOptions.headers = omit(fetchOptions.headers, ignoreFieldsInHeader);

    fetchOptions.headers = Object.assign(
      {
        Accept: 'application/json'
      },
      this.options.headers,
      fetchOptions.headers
    );

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // const f = this.connection

    return fetch(options.url, fetchOptions)
      .then(this.checkStatus)
      .then(response => {
        if (response.status === 204) {
          return null;
        }

        return response.json();
      });
  }

  requestText(options) {
    const fetchOptions = Object.assign({}, options);
    fetchOptions.headers = omit(fetchOptions.headers, ignoreFieldsInHeader);

    fetchOptions.headers = Object.assign(
      {
        Accept: 'text/plain'
      },
      this.options.headers,
      fetchOptions.headers
    );

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // const f = this.connection

    return fetch(options.url, fetchOptions).then(response => {
      if (response.status === 204) {
        return null;
      }

      return response.text();
    });
  }

  static checkStatus(response) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      return response;
    }

    return response.json().then(error => {
      error.response = response; // eslint-disable-line no-param-reassign
      throw error;
    });
  }
}

export default FetchService;
