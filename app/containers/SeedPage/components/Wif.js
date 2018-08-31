// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

const debug = require('debug')('dicoapp:containers:SeedPage:Wif');

type Props = {};

type State = {};

class Wif extends Component<Props, State> {
  props: Props;

  render() {
    debug('render');
    return <div>Wif</div>;
  }
}

const withConnect = connect(
  null,
  null
);

export default compose(
  withConnect,
  withStyles(styles)
)(Wif);
