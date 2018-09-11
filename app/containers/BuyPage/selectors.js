import { createSelector } from 'reselect';
import { makeSelectBalanceList as makeSelectBalanceListApp } from '../App/selectors';
import { APP_STATE_NAME } from './constants';
import { COIN_BASE } from './tokenconfig';

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(selectBuy, buyState => buyState.get('prices'));

const makeSelectPricesLoading = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('loading'));

const makeSelectPricesError = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('error'));

const makeSelectPricesEntities = () =>
  createSelector(makeSelectPrices(), pricesState =>
    pricesState.get('entities')
  );

const makeSelectBuying = () =>
  createSelector(selectBuy, buyState => buyState.get('buying'));

const makeSelectBuyingLoading = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('loading'));

const makeSelectBuyingError = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('error'));

const makeSelectSwaps = () =>
  createSelector(selectBuy, buyState => buyState.get('swaps'));

const makeSelectSwapsLoading = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('loading'));

const makeSelectSwapsError = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('error'));

const makeSelectSwapsList = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('list'));

const makeSelectSwapsEntities = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('entities'));

const makeSelectBalanceList = () =>
  createSelector(makeSelectBalanceListApp(), balanceList => {
    const symbol = COIN_BASE.get('coin');
    return balanceList.filter(e => e !== symbol);
  });

export {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectSwaps,
  makeSelectSwapsLoading,
  makeSelectSwapsError,
  makeSelectSwapsList,
  makeSelectSwapsEntities,
  makeSelectBalanceList
};
