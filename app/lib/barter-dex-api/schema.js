// @flow

type CancelRequest = {
  userpass: string,
  uuid: string
};

type StateType = {
  userpass: string | null
};

// eslint-disable-next-line import/prefer-default-export
export type { CancelRequest, StateType };
