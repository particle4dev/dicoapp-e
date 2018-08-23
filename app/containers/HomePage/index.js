// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';

import Home from '../../components/Home';
import reducer from './reducer';
import saga from './saga';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value))
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername()
});

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
