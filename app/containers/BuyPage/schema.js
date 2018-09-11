// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type PriceCoin = {
  bestPrice: number,
  price: number, // the max price you are willing to pay for 1 base
  avevolume: number,
  maxvolume: number,
  numutxos: number,
  base: string, // the currency you want to buy
  rel: string, // the currency you are paying with
  age: number,
  createdAt?: Date,
  updatedAt?: Date
};

type SwapError = {
  message: string
};

type SwapInfo = {
  sentflags: Array<string>,
  bobdeposit: string,
  alicepayment: string,
  bobpayment: string,
  paymentspent: string,
  Apaymentspent: string,
  depositspent: string,
  alicedexfee: string
};

type SwapCoin = {
  id: number, // the unique id, alias trade id
  uuid: string, // the unique id
  requestid: number,
  quoteid: number,
  expiration: number,
  bob: string, // eg: KMD, BTC, LTC
  alice: string, // eg: KMD, BTC, LTC

  status: string, // eg: pending, finished
  application: string, // where the request come from? eg: 'dICOapp'

  error?: SwapError,
  info?: SwapInfo,

  createdAt?: Date,
  updatedAt?: Date
};

export type { PriceCoin, SwapCoin };
