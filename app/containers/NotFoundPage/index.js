// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { NavigationLayout } from '../Layout';

type Props = {};

export default class NotFoundPage extends Component<Props> {
  props: Props;

  render() {
    // const {} = this.props;
    return (
      <NavigationLayout>
        NotFoundPage
        <br />
        <Link to={routes.HOME}>to HomePage</Link>
      </NavigationLayout>
    );
  }
}
