/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import { makeSelectBalanceList } from '../selectors';
import { loadBalance } from '../actions';
import Wallet from './Wallet';

// makeSelectBalance,
// makeSelectBalanceLoading,
// makeSelectBalanceError,

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
  list: Object,
  className: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function
};

type State = {};

class Overview extends Component<Props, State> {
  state = {};

  componentDidMount = () => {
    debug('watch transactions');

    const { dispatchLoadBalance } = this.props;

    dispatchLoadBalance();
  };

  render() {
    debug(`render`);

    const { classes, className, list } = this.props;

    return (
      <Grid container spacing={0} className={className}>
        {list.map((t, k) => (
          <Grid item xs={12} className={classes.containerSection}>
            <Wallet key={k} data={t} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

Overview.displayName = 'Overview';

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadBalance: () => dispatch(loadBalance())
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Overview);
/* eslint-enable react/no-array-index-key */
