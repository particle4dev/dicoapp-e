import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(selectBuy, buyState => buyState.get('prices'));

const makeSelectPricesLoading = () =>
  createSelector(makeSelectPrices(), pricesState => {
    console.log('pricesState', pricesState.toJS(), pricesState.get('loading'));
    return pricesState.get('loading');
  });

const makeSelectPricesError = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('error'));

export {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError
};
