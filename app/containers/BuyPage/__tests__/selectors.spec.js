// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
// import proxyquire from 'proxyquire';
// import { initialState } from '../reducer';
// import { APP_STATE_NAME } from '../constants';

// const electron = {
//   remote: {
//     require(path) {
//       console.log(path, 'path');
//     }
//   }
// };

// const selectors = proxyquire('../selectors', {
//   electron
// });
// const { selectBuy } = selectors;

// describe('BuyPage Selectors', () => {
//   describe('selectBuy selectors', () => {
//     it('should select the buy state', () => {
//       const mockedState = fromJS({
//         [APP_STATE_NAME]: initialState
//       });
//       expect(selectBuy(mockedState)).toEqual(initialState);
//     });
//   });
// });
