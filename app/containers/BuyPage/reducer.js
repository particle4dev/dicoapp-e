/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  LOAD_PRICES,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS,
  // LOAD_PRICES_ERROR,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_SUCCESS,
  LOAD_BUY_COIN_ERROR,
  LOAD_RECENT_SWAPS_COIN
} from './constants';

import { LOGOUT } from '../App/constants';

// The initial state of the App
// const id = 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811';
const initialState = fromJS({
  prices: {
    loading: false,
    error: false,
    entities: {}
  },
  buying: {
    loading: false,
    error: false
  },
  swaps: {
    loading: false,
    error: false,
    list: [
      // id
    ],
    entities: {
      // [id]: {
      //   id,
      //   uuid: id,
      //   requestid: 1914742321,
      //   quoteid: 2455665257,
      //   status: 'pending',
      //   application: 'dICOapp',
      //   bob: 'COQUI',
      //   alice: 'BEER',
      //   bobtxfee: 0.00001,
      //   alicetxfee: 0.00001,
      //   bobamount: 91.64950708,
      //   aliceamount: 0.92601593,
      //   sentflags: ['myfee'],
      //   info: {
      //     sentflags: ['myfee'],
      //     bobdeposit:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     alicepayment:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     bobpayment:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     paymentspent:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     Apaymentspent:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     depositspent:
      //       '0000000000000000000000000000000000000000000000000000000000000000',
      //     alicedexfee:
      //       'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51'
      //   }
      // }
    }
  }
});

const buyReducer = handleActions(
  {
    [LOAD_PRICES]: state =>
      state
        .setIn(['prices', 'loading'], true)
        .setIn(['prices', 'error'], false),

    [LOAD_BEST_PRICE]: (state, { payload }) => {
      const { rel } = payload;
      // step one: load entities
      const entities = state.getIn(['prices', 'entities']);
      // step two: update best price
      const c = entities.get(rel);
      const n = fromJS(payload);
      // if not found
      if (!c) {
        // step three: put it in coin
        n.set('createdAt', Date.now());
      } else {
        n.set('createdAt', c.get('createdAt'));
      }
      n.set('updatedAt', Date.now());
      return state.setIn(['prices', 'entities'], entities.set(rel, n));
    },

    [LOAD_PRICES_SUCCESS]: state => state.setIn(['prices', 'loading'], false),

    [LOAD_BUY_COIN]: state =>
      state
        .setIn(['buying', 'loading'], true)
        .setIn(['buying', 'error'], false),
    [LOAD_BUY_COIN_SUCCESS]: (state, { payload }) => {
      const {
        tradeid,
        uuid,
        requestid,
        quoteid,
        expiration,
        bob,
        alice
      } = payload;
      const list = state.getIn(['swaps', 'list']);
      const entities = state.getIn(['swaps', 'entities']);
      // step one: update date
      return state.setIn(['swaps', 'list'], list.push(tradeid)).setIn(
        ['swaps', 'entities'],
        entities.set(
          tradeid,
          fromJS({
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            sentflags: []
          })
        )
      );
    },

    [LOAD_BUY_COIN_ERROR]: (state, { error }) =>
      state
        .setIn(['buying', 'error'], error)
        .setIn(['buying', 'loading'], false),

    [LOAD_RECENT_SWAPS_COIN]: (state, { payload }) => {
      const {
        tradeid,
        uuid,
        requestid,
        quoteid,
        expiration,
        bob,
        alice,
        sentflags
      } = payload;
      // step one: update list
      let list = state.getIn(['swaps', 'list']);
      if (!list.find(e => e === tradeid)) {
        list = list.push(tradeid);
      }
      // step two: update entities
      let entities = state.getIn(['swaps', 'entities']);
      let entity = entities.get(tradeid);
      if (!entity) {
        // set new
        entity = fromJS({
          id: tradeid,
          uuid,
          requestid,
          quoteid,
          expiration,
          bob,
          alice,
          sentflags
        });
      } else {
        // update
        entity = entity.merge(
          fromJS({
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            sentflags
          })
        );
      }
      entities = entities.set(tradeid, entity);
      return state
        .setIn(['swaps', 'list'], list)
        .setIn(['swaps', 'entities'], entities);
    },

    [LOGOUT]: () => initialState
  },
  initialState
);

export default buyReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
