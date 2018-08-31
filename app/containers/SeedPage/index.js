// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import routes from '../../constants/routes.json';
import { EmptyLayout } from '../Layout';

const styles = () => ({
  loginContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto'
  },

  center: {
    paddingBottom: 67,
    paddingTop: 48,
    minHeight: 350,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)'
  },

  card: {
    width: 600
  },

  content: {
    width: 558,
    margin: '0px auto',
    textAlign: 'center'
  },

  item: {
    marginBottom: 30
  },

  description: {
    textAlign: 'justify'
  },

  bottomButton: {
    height: 62,
    backgroundColor: '#efefef',
    color: '#333'
  }
});

const debug = require('debug')('dicoapp:containers:SeedPage');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

class SeedPage extends Component<Props> {
  props: Props;

  gotoLoginPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.LOGIN);
  };

  render() {
    debug('render');
    const { classes } = this.props;
    return (
      <EmptyLayout>
        <div className={classes.loginContainer}>
          <div className={classes.center}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography
                  variant="headline"
                  className={classes.item}
                  gutterBottom
                >
                  Generate a new Passphrase/Seed
                </Typography>
                <Typography gutterBottom className={classes.description}>
                  Click on &quot;Generate&quot; to create your New Account
                  details. Once your new login data is generated and shown in
                  the box below please <b>back up</b> your Seed and your WIF key
                  to a secure place. Without this data you will <b>NOT</b> be
                  able to access your funds/tokens.. If your lose your Seed you
                  will also lose all your funds/addresses associated with this
                  Seed. The Seed is the password that gains you access to your
                  funds/tokens on the blockchain.
                </Typography>
              </CardContent>
              <Button
                fullWidth
                className={classes.bottomButton}
                onClick={this.gotoLoginPage}
              >
                Back to Log in
              </Button>
            </Card>
          </div>
        </div>
      </EmptyLayout>
    );
  }
}

const withConnect = connect(
  null,
  null
);

export default compose(
  withConnect,
  withStyles(styles)
)(SeedPage);
