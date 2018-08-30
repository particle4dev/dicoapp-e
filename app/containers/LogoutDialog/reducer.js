import { fromJS } from 'immutable';

import {
  SHOW_LOGOUT_DIALOG,
  CANCEL_LOGOUT_DIALOG,
  AGREE_LOGOUT_DIALOG
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  show: false
});

function logoutDialogReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGOUT_DIALOG:
      return state.set('show', true);
    case CANCEL_LOGOUT_DIALOG:
      return state.set('show', false);
    case AGREE_LOGOUT_DIALOG:
      return state.set('show', false);
    default:
      return state;
  }
}

export default logoutDialogReducer;
