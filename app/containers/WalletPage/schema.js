// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type TransactionPayload = {
  coin: string,
  height: number,
  tx_hash: string
};

// eslint-disable-next-line import/prefer-default-export
export type { TransactionPayload };
