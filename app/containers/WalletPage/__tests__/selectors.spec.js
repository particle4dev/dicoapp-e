import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import { selectWallet } from '../selectors';

describe('containers/WalletPage/selectors/selectWallet', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectWallet(mockedState)).toEqual(initialState);
  });
});
