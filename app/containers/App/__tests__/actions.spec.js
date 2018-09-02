// import { spy } from 'sinon';
import * as actions from '../actions';
import { LOGIN } from '../constants';

describe('App Actions', () => {
  describe('login', () => {
    it('should login should create login action', () => {
      expect(actions.login()).toMatchSnapshot();
    });

    it('should return the correct type and the passed name', () => {
      const passphrase = 'passphrase';
      const expectedResult = {
        type: LOGIN,
        payload: {
          passphrase
        }
      };

      expect(actions.login(passphrase)).toEqual(expectedResult);
    });
  });

  describe('logout', () => {
    it('should logout should create logout action', () => {
      expect(actions.logout()).toMatchSnapshot();
    });
  });
});
