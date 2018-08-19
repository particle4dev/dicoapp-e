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
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    );
  }
}
