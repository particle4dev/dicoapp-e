// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';

type Props = {};

export default class SeedPage extends Component<Props> {
  props: Props;

  render() {
    // const {} = this.props;
    return (
      <div>
        SeedPage
        <br />
        <Link to={routes.HOME}>to HomePage</Link>
      </div>
    );
  }
}
