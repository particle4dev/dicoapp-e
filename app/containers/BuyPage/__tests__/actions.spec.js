import { loadPrice, loadPrices } from '../actions';
import { LOAD_PRICE, LOAD_PRICES } from '../constants';

describe('BuyPage Actions', () => {
  describe('loadPrice action', () => {
    it('should loadPrice should create loadPrice action', () => {
      expect(loadPrice()).toMatchSnapshot();
    });

    it('should return the correct type and the passed name', () => {
      const coin = 'coin';
      const expectedResult = {
        type: LOAD_PRICE,
        payload: {
          coin
        }
      };

      expect(loadPrice(coin)).toEqual(expectedResult);
    });
  });

  describe('loadPrices action', () => {
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
});
