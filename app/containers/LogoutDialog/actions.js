import { SHOW_LOGOUT_DIALOG, HIDE_LOGOUT_DIALOG } from './constants';

export function showLogoutDialog() {
  return {
    type: SHOW_LOGOUT_DIALOG
  };
}

export function hideLogoutDialog() {
  return {
    type: HIDE_LOGOUT_DIALOG
  };
}
