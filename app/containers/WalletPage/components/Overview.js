// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeSelectCurrentUser } from '../../App/selectors';

const debug = require('debug')('dicoapp:containers:WalletPage:Overview');

const styles = () => ({
  containerSection: {
    paddingBottom: 30
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  user: Object,
  className: string
};

type State = {};

class Overview extends Component<Props, State> {
  state = {};

  render() {
    debug(`render`);

    const { classes, className, user } = this.props;

    const wallets = user.get('coins').filter(i => {
      console.log(i.get('balance'));
      return i.get('balance') !== 0;
    });
    console.log(wallets.toJS(), user.get('coins').toJS(), 'wallets 123 zzz');

    return (
      <Grid container spacing={0} className={className}>
        <Grid item xs={12} className={classes.containerSection}>
          <ExpansionPanel>123 zzz</ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

Overview.displayName = 'Overview';

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Overview);
