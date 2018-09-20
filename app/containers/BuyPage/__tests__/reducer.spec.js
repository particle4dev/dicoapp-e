import buyReducer, { initialState } from '../reducer';
import {
  loadPrices,
  loadBuyCoin,
  loadBuyCoinError
  // loadRecentSwapsDataFromWebsocket
} from '../actions';

describe('containers/BuyPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/BuyPage/reducers/loadPrices', () => {
  it('should handle the loadPrices action correctly', () => {
    const expectedResult = initialState
      .setIn(['prices', 'loading'], true)
      .setIn(['prices', 'error'], false);

    expect(buyReducer(initialState, loadPrices())).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoin', () => {
  it('should handle the loadBuyCoin action correctly', () => {
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false);

    expect(
      buyReducer(
        initialState,
        loadBuyCoin({
          basecoin: 'BTC',
          paymentcoin: 'KMD',
          amount: 10.123
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoinError', () => {
  it('should handle the loadBuyCoinError action correctly', () => {
    const message = 'Not enough balance!';
    const expectedResult = initialState
      .setIn(['buying', 'loading'], false)
      .setIn(['buying', 'error'], {
        message
      });

    expect(buyReducer(initialState, loadBuyCoinError(message))).toEqual(
      expectedResult
    );
  });
});

describe('containers/BuyPage/reducers/loadRecentSwapsDataFromWebsocket', () => {});
