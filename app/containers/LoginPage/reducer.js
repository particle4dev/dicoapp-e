import { fromJS } from 'immutable';

// The initial state of the App
export const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default loginReducer;
