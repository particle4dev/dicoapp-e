// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import routes from '../constants/routes.json';
import styles from './Home.css';
// import getBalance from './get-balance';
import login from '../login';

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
});

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  onStartButtonClick = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();

    ipcRenderer.send('marketmaker:start', 'ping');
  };

  onStopButtonClick = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();

    ipcRenderer.send('marketmaker:stop', 'ping');
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
