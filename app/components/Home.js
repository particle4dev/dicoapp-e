// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ipc from 'electron-better-ipc';
import swal from 'sweetalert';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import AkTextField from '@atlaskit/field-text';
import routes from '../constants/routes.json';
import styles from './Home.css';
// import getBalance from './get-balance';
import api from '../utils/barter-dex-api';
// import electrumServers from './electrum';
// import tokenconfig from './tokenconfig';

type Props = {};
type State = {
  passphrase: string
};

export default class Home extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: ''
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
      const { passphrase } = this.state;
      if (passphrase === '' || passphrase.length < 4) {
        return swal(
          'Oops!',
          'The passphrase you entered is either empty or too short.',
          'error'
        );
      }
      const data = await api.login(passphrase);
      console.log(data, 'data');
      return swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
    } catch (err) {
      return swal('Something went wrong:', err.toString(), 'error');
    }
    /**
    const paramsKMD = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'KMD',
      ipaddr: 'electrum1.cipig.net',
      port: 10001
    };
    const kmd = await api.addServer(paramsKMD);
    console.log(kmd);
    const paramsKMD2 = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'KMD',
      ipaddr: 'electrum2.cipig.net',
      port: 10001
    };
    const kmd2 = await api.addServer(paramsKMD2);
    console.log(kmd2);
    const paramsBTC = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'BTC',
      ipaddr: 'electrum1.cipig.net',
      port: 10000
    };
    const btc = await api.addServer(paramsBTC);
    console.log(btc);
    const paramsBTC2 = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'BTC',
      ipaddr: 'electrum2.cipig.net',
      port: 10000
    };
    const btc2 = await api.addServer(paramsBTC2);
    console.log(btc2);
    const paramsLTC = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'LTC',
      ipaddr: 'electrum1.cipig.net',
      port: 10065
    };
    const ltc = await api.addServer(paramsLTC);
    console.log(ltc);
    const paramsLTC2 = {
      userpass: data.userpass,
      method: 'electrum',
      coin: 'LTC',
      ipaddr: 'electrum2.cipig.net',
      port: 10065
    };
    const ltc2 = await api.addServer(paramsLTC2);
    console.log(ltc2);

    const paramsdICOT = {
      userpass: data.userpass,
      method: 'electrum',
      coin: tokenconfig.dICOtoken.shortcode,
      ipaddr: electrumServers.dICOtoken.address,
      port: electrumServers.dICOtoken.port
    };
    const dicot = await api.addServer(paramsdICOT);
    console.log(dicot);

    const paramsdICOT2 = {
      userpass: data.userpass,
      method: 'electrum',
      coin: tokenconfig.dICOtoken.shortcode,
      ipaddr: electrumServers.dICOtoken.serverList[0],
      port: electrumServers.dICOtoken.port
    };
    const dicot2 = await api.addServer(paramsdICOT2);
    console.log(dicot2);

    try {
      const results = [];
      for (let i = 0; i < data.coins.length; i += 1) {
        const balanceparams = {
          userpass: data.userpass,
          coin: data.coins[i].coin,
          address: data.coins[i].smartaddress
        };
        results.push(api.getBalance(balanceparams));
      }
      console.log(await Promise.all(results));
    } catch (err) {
      console.log(err);
    }
    */
  };

  onChange = (evt: SyntheticEvent<*>) => {
    this.setState({
      passphrase: evt.target.value
    });
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
        <AkTextField
          onChange={this.onChange}
          autoFocus
          label="Passphrase/Seed"
        />
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
