import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectInitCoinsData = () =>
  createSelector(selectBuy, buyState => buyState.get('initCoinsData'));

const makeSelectPrices = () =>
  createSelector(selectBuy, buyState => buyState.get('prices'));

const makeSelectPricesLoading = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('loading'));

const makeSelectPricesError = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('error'));

const makeSelectPricesCoins = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('coins'));

const makeSelectPricesEntities = () =>
  createSelector(makeSelectPrices(), pricesState =>
    pricesState.get('entities')
  );

export {
  selectBuy,
  makeSelectInitCoinsData,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesCoins,
  makeSelectPricesEntities
};
