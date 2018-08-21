// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  onClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    alert('1234');

    console.log('1234');
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <AkAvatar size="small" />
        <br />
        <AkButton appearance="primary" onClick={this.onClick}>
          Button
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
