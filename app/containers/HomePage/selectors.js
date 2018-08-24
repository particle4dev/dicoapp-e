import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { APP_STATE_NAME } from './constants';

const selectHome = state => state.get(APP_STATE_NAME, initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

export { selectHome, makeSelectUsername };
