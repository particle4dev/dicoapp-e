import { loadTransactions } from '../actions';
import { LOAD_TRANSACTIONS } from '../constants';

describe('WalletPage Actions', () => {
  describe('loadTransactions', () => {
    it('should loadTransactions should create loadTransactions action', () => {
      expect(loadTransactions()).toMatchSnapshot();
    });

    it('should return the correct type and the passed name', () => {
      const expectedResult = {
        type: LOAD_TRANSACTIONS
      };

      expect(loadTransactions()).toEqual(expectedResult);
    });
  });
});
