import { createSelector } from 'reselect';
import { makeSelectBalanceList as makeSelectBalanceListApp } from '../App/selectors';
import { APP_STATE_NAME } from './constants';
import { COIN_BASE } from './tokenconfig';

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectInitCoinsData = () =>
  createSelector(selectBuy, buyState => buyState.get('initCoinsData'));

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

const makeSelectBalanceList = () =>
  createSelector(makeSelectBalanceListApp(), balanceList => {
    const symbol = COIN_BASE.get('coin');

    return balanceList.filter(e => e !== symbol);
  });

export {
  selectBuy,
  makeSelectInitCoinsData,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBalanceList
};
