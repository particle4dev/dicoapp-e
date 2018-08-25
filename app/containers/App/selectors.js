/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectGlobal = state => state.get(APP_STATE_NAME);

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectUserpass = () =>
  createSelector(makeSelectCurrentUser(), user => user.get('userpass'));

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectUserpass
};
