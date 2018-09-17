// @flow

type EndpointType = {
  userpass: string
};

type CancelRequest = {
  userpass: string,
  uuid: string
};

// eslint-disable-next-line import/prefer-default-export
export type { EndpointType, CancelRequest };
