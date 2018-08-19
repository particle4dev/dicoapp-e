// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AkAvatar from '@atlaskit/avatar';
import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <AkAvatar size="small" />
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
