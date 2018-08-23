// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AkButton from '@atlaskit/button';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';

// import Home from '../../components/Home';
import reducer from './reducer';
import saga from './saga';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

type Props = {
  username: string
};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    const {
      username,
      // eslint-disable-next-line react/prop-types
      onChangeUsername
    } = this.props;
    return (
      <React.Fragment>
        <h1
          style={{
            color: 'black'
          }}
        >
          123
        </h1>
        <AkButton appearance="warning" type="submit">
          Click Here to Create a New Account
        </AkButton>
        <input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={username}
          onChange={onChangeUsername}
        />
      </React.Fragment>
    );
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
