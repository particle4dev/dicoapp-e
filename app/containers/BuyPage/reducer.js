/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  LOAD_PRICES,
  LOAD_COIN_SYMBOL,
  LOAD_BEST_PRICE,
  LOAD_PRICES_SUCCESS
  // LOAD_PRICES_ERROR
} from './constants';

import { LOGOUT } from '../App/constants';

// The initial state of the App
const initialState = fromJS({
  initCoinsData: false,
  prices: {
    loading: false,
    error: false,
    coins: [],
    entities: {}
  }
});

const buyReducer = handleActions(
  {
    [LOAD_PRICES]: state =>
      state
        .setIn(['prices', 'loading'], true)
        .setIn(['prices', 'error'], false),
    [LOAD_COIN_SYMBOL]: (state, { payload }) => {
      const { coins } = payload;
      // set one: setup coins
      const c = coins.sort((a, b) => a.symbol > b.symbol);
      // step two: setup entities
      let entities = Map({});
      coins.forEach(e => {
        entities = entities.set(
          e.symbol,
          fromJS({
            symbol: e.symbol,
            coin: e.coin,
            bestPrice: 0
          })
        );
      });
      return state
        .set('initCoinsData', true)
        .setIn(['prices', 'coins'], fromJS(c.toJS()))
        .setIn(['prices', 'entities'], entities);
    },
    [LOAD_BEST_PRICE]: (state, { payload }) => {
      const { bestPrice, coin } = payload;
      // step one: load entities
      const entities = state.getIn(['prices', 'entities']);
      // step two: update best price
      let c = entities.get(coin);
      console.log(bestPrice, coin);
      c = c.set('bestPrice', bestPrice);
      return state.setIn(['prices', 'entities'], entities.set(coin, c));
    },
    [LOAD_PRICES_SUCCESS]: state => state.setIn(['prices', 'loading'], false),
    [LOGOUT]: () => initialState
  },
  initialState
);

export default buyReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
