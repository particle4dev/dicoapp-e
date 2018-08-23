// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { remote } from 'electron';
import ipc from 'electron-better-ipc';
import swal from 'sweetalert';
import AkButton from '@atlaskit/button';
// import AkTextField from '@atlaskit/field-text';
// import routes from '../constants/routes.json';
import styles from './Home.css';
import api from '../utils/barter-dex-api';
// import electrumServers from './electrum';
// import tokenconfig from './tokenconfig';
import image from './logo.png';

type Props = {};
type State = {
  passphrase: string
};

export default class Home extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: '',
    electrum: remote.require('./config/electrum')
  };

  onStartButtonClick = async (evt: SyntheticEvent<*>) => {
    evt.preventDefault();

    const emoji = await ipc.callMain('marketmaker:start', 'ping');
    console.log('marketmaker:start', emoji);
  };

  onStopButtonClick = async (evt: SyntheticEvent<*>) => {
    evt.preventDefault();

    const emoji = await ipc.callMain('marketmaker:stop', 'ping');
    console.log('marketmaker:stop', emoji);
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
    const { passphrase } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={image} alt="logo" />
        </div>
        <div className={styles.notification}>
          <p>Please type in your Seed to Login to your existing Account</p>
        </div>
        <div className={styles.form}>
          <form>
            <div className={styles.password}>
              <i className={`fas fa-lock ${styles['padding-right-10']}`} />
              <input
                value={passphrase}
                onChange={this.onChange}
                className={styles.input}
                type="password"
                placeholder="Passphrase/Seed"
              />
              <i className={`fas fa-eye-slash ${styles['padding-left-10']}`} />
            </div>
            <div className={styles['submit-form']}>
              <AkButton
                appearance="primary"
                className={styles['button-green']}
                type="submit"
                onClick={this.onLoginButtonClick}
              >
                Log In
              </AkButton>
            </div>
          </form>
        </div>

        <div className={styles.register}>
          <AkButton
            appearance="warning"
            className={styles['button-white']}
            type="submit"
          >
            Click Here to Create a New Account
          </AkButton>
        </div>
      </div>
    );
  }
}
