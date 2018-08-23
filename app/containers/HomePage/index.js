// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { remote } from 'electron';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AkButton from '@atlaskit/button';
import swal from 'sweetalert';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import api from '../../utils/barter-dex-api';

// import Home from '../../components/Home';
import Logo from './Logo';
import reducer from './reducer';
import saga from './saga';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import styles from './Home.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 100px;
`;

const Notification = styled.div`
  text-align: center;
  color: #6a6a6a;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const Register = styled.div`
  text-align: center;
  flex: 1;
`;

const Form = styled.form`
  padding-bottom: 30px;
  flex: 1;
`;

const Submit = styled.div`
  text-align: center;
`;

const Password = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  padding-bottom: 30px;
  i {
    font-size: 12px;
  }
`;

type Props = {};
type State = {
  passphrase: string
};

class HomePage extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: '',
    electrum: remote.require('./config/electrum')
  };

  onLoginButtonClick = async (evt: SyntheticEvent<*>) => {
    try {
      evt.preventDefault();
      const { passphrase, electrum } = this.state;
      if (passphrase === '' || passphrase.length < 4) {
        return swal(
          'Oops!',
          'The passphrase you entered is either empty or too short.',
          'error'
        );
      }
      const data = await api.login(passphrase);
      console.log(data, 'data');
      const servers = electrum.map(e => {
        e.userpass = data.userpass;
        return e;
      });
      const results = [];
      for (let i = 0; i < servers.length; i += 1) {
        results.push(api.addServer(servers[i]));
      }
      console.log(await Promise.all(results));
      return swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
    } catch (err) {
      return swal('Something went wrong:', err.toString(), 'error');
    }
  };

  onChange = (evt: SyntheticEvent<*>) => {
    this.setState({
      passphrase: evt.target.value
    });
  };

  render() {
    // const {
    //   username,
    //   // eslint-disable-next-line react/prop-types
    //   onChangeUsername
    // } = this.props;
    const { passphrase } = this.state;
    return (
      <Container>
        <Logo />
        <Notification>
          <p>Please type in your Seed to Login to your existing Account</p>
        </Notification>
        <Form>
          <Password>
            <i className={`fas fa-lock ${styles['padding-right-10']}`} />
            <input
              value={passphrase}
              onChange={this.onChange}
              className={styles.input}
              type="password"
              placeholder="Passphrase/Seed"
            />
            <i className={`fas fa-eye-slash ${styles['padding-left-10']}`} />
          </Password>
          <Submit>
            <AkButton
              appearance="primary"
              className={styles['button-green']}
              type="submit"
              onClick={this.onLoginButtonClick}
            >
              Log In
            </AkButton>
          </Submit>
        </Form>
        {/* <input
          id="username"
          type="text"
          placeholder="mxstbr"
          value={username}
          onChange={onChangeUsername}
        /> */}
        <Register>
          <AkButton
            appearance="warning"
            className={styles['button-white']}
            type="submit"
          >
            Click Here to Create a New Account
          </AkButton>
        </Register>
      </Container>
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
