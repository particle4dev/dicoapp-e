// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { EmptyLayout } from '../Layout';

type Props = {};

export default class SeedPage extends Component<Props> {
  props: Props;

  render() {
    // const {} = this.props;
    return (
      <EmptyLayout>
        SeedPage
        <br />
        <Link to={routes.HOME}>to HomePage</Link>
      </EmptyLayout>
    );
  }
}
