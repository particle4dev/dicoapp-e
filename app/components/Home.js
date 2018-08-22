// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ipc from 'electron-better-ipc';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import AkTextField from '@atlaskit/field-text';
import routes from '../constants/routes.json';
import styles from './Home.css';
// import getBalance from './get-balance';
import login from '../login';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

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

  onLoginButtonClick = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();

    login();
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <AkAvatar size="small" />
        <br />
        <AkButton appearance="primary" onClick={this.onStartButtonClick}>
          Start marketmaker
        </AkButton>
        <br />
        <AkButton appearance="warning" onClick={this.onStopButtonClick}>
          Stop marketmaker
        </AkButton>
        <br />
        <AkTextField autoFocus label="Passphrase/Seed" />
        <br />
        <AkButton appearance="warning" onClick={this.onLoginButtonClick}>
          Login
        </AkButton>
        <br />
        <Link to={routes.COUNTER}>to Counter</Link>
        <br />
        <Link to={routes.BUY}>to BuyPage</Link>
        <br />
        <Link to={routes.WALLET}>to WalletPage</Link>
        <br />
        <Link to={routes.HELP}>to HelpPage</Link>
        <br />
        <Link to={routes.SEED}>to SeedPage</Link>
      </div>
    );
  }
}

// TEST
// setTimeout(() => {
//   login();
// }, 5000);

// setTimeout(() => {
//   getBalance('KMD');
//   getBalance('GLXT');
//   getBalance('BTC');
//   getBalance('LTC');
// }, 10000);
