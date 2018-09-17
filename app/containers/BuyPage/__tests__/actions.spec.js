import {
  loadPrice,
  loadPrices,
  loadPricesSuccess,
  loadBuyCoin,
  loadBuyCoinError
} from '../actions';
import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_PRICES_SUCCESS,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_ERROR
} from '../constants';

describe('containers/BuyPage/actions/loadPrice', () => {
  const coin = 'coin';

  it('should loadPrice should create loadPrice action', () => {
    expect(loadPrice(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICE,
      payload: {
        coin
      }
    };

    expect(loadPrice(coin)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadPrices', () => {
  it('should loadPrices should create loadPrices action', () => {
    expect(loadPrices()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES
    };

    expect(loadPrices()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadPricesSuccess', () => {
  it('should loadPricesSuccess should create loadPricesSuccess action', () => {
    expect(loadPricesSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES_SUCCESS
    };

    expect(loadPricesSuccess()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadBuyCoin', () => {
  const payload = {
    basecoin: 'BTC',
    paymentcoin: 'KMD',
    amount: 1.234
  };

  it('should loadBuyCoin should create loadBuyCoin action', () => {
    expect(loadBuyCoin(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN,
      payload
    };

    expect(loadBuyCoin(payload)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadBuyCoinError', () => {
  const message = 'Value is large than balance';

  it('should loadBuyCoin should create loadBuyCoinError action', () => {
    expect(loadBuyCoinError(message)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN_ERROR,
      error: {
        message
      }
    };

    expect(loadBuyCoinError(message)).toEqual(expectedResult);
  });
});
