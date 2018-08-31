// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

const debug = require('debug')('dicoapp:containers:SeedPage:Passphrase');

type Props = {};

type State = {};

class Passphrase extends Component<Props, State> {
  props: Props;

  render() {
    debug('render');
    return <div>Passphrase</div>;
  }
}

const withConnect = connect(
  null,
  null
);

export default compose(
  withConnect,
  withStyles(styles)
)(Passphrase);
