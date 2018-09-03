/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { makeSelectBalanceList, makeSelectBalanceEntities } from '../selectors';
import { loadBalance, loadWithdraw } from '../actions';
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
  // eslint-disable-next-line flowtype/no-weak-types
  entities: Object,
  className: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function
};

type State = {};

class Overview extends Component<Props, State> {
  state = {};

  componentDidMount = () => {
    debug('watch transactions');
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  onClickReloadBalance = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  render() {
    debug(`render`);

    const {
      classes,
      className,
      list,
      entities,
      dispatchLoadWithdraw
    } = this.props;

    return (
      <Grid container spacing={0} className={className}>
        <Button onClick={this.onClickReloadBalance}>Load balance</Button>

        {list.map((t, k) => (
          <Grid key={k} item xs={12} className={classes.containerSection}>
            <Wallet
              data={entities.get(t)}
              dispatchLoadWithdraw={dispatchLoadWithdraw}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

Overview.displayName = 'Overview';

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadBalance: () => dispatch(loadBalance()),
    dispatchLoadWithdraw: (payload: {
      amount: number,
      address: string,
      coin: string
    }) => dispatch(loadWithdraw(payload))
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList(),
  entities: makeSelectBalanceEntities()
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
