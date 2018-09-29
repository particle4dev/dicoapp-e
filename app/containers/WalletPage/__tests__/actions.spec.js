import { loadTransactions, loadTransactionsSuccess } from '../actions';
import { LOAD_TRANSACTIONS, LOAD_TRANSACTIONS_SUCCESS } from '../constants';

describe('containers/WalletPage/actions/loadTransactions', () => {
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

describe('containers/WalletPage/actions/loadTransactionsSuccess', () => {
  it('should loadTransactionsSuccess should create loadTransactionsSuccess action', () => {
    expect(loadTransactionsSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_TRANSACTIONS_SUCCESS
    };

    expect(loadTransactionsSuccess()).toEqual(expectedResult);
  });
});
