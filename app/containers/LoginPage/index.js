// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import routes from '../../constants/routes.json';
import { EmptyLayout } from '../Layout';
import Logo from './Logo';
import reducer from './reducer';
import saga from './saga';
import { login } from '../App/actions';
import {
  makeSelectLoading,
  makeSelectAuthenticated,
  makeSelectError
} from '../App/selectors';
import { APP_STATE_NAME } from './constants';
import styles from './Login.css';

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

type Props = {
  loading: boolean
};

type State = {
  passphrase: string
};

class HomePage extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: ''
  };

  componentDidUpdate = prevProps => {
    const {
      // eslint-disable-next-line react/prop-types
      authenticated,
      error,
      history
    } = this.props;
    if (authenticated && !prevProps.authenticated) {
      swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
      history.push('/');
    }
    if (!authenticated && error) {
      swal('Something went wrong:', error.message, 'error');
    }
  };

  onLoginButtonClick = async (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    const { passphrase } = this.state;
    if (passphrase === '' || passphrase.length < 4) {
      return swal(
        'Oops!',
        'The passphrase you entered is either empty or too short.',
        'error'
      );
    }
    const {
      // eslint-disable-next-line react/prop-types
      dispatchLogin
    } = this.props;
    dispatchLogin(passphrase);
  };

  onChange = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    this.setState({
      passphrase: evt.target.value
    });
  };

  gotoSeedPage = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    const {
      // eslint-disable-next-line react/prop-types
      history
    } = this.props;
    history.push(routes.SEED);
  };

  render() {
    const { loading } = this.props;
    const { passphrase } = this.state;
    return (
      <EmptyLayout>
        <Container>
          <Logo />
          <Notification>
            <p>Please type in your Seed to Login to your existing Account</p>
          </Notification>
          <Form>
            <Password>
              <i className={`fas fa-lock ${styles['padding-right-10']}`} />
              <input
                disabled={loading}
                value={passphrase}
                onChange={this.onChange}
                className={styles.input}
                type="password"
                placeholder="Passphrase/Seed"
              />
              <i className={`fas fa-eye-slash ${styles['padding-left-10']}`} />
            </Password>
            <Submit>
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.onLoginButtonClick}
              >
                Log In
              </Button>
            </Submit>
          </Form>
          <Register>
            <Button
              variant="contained"
              color="secondary"
              className={styles['button-white']}
              onClick={this.gotoSeedPage}
            >
              Click Here to Create a New Account
            </Button>
          </Register>
        </Container>
      </EmptyLayout>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: passphrase => dispatch(login(passphrase))
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  authenticated: makeSelectAuthenticated(),
  error: makeSelectError()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
