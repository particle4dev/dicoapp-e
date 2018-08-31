// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import FileCopyIcon from '@material-ui/icons/FileCopy';
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

  bottom30: {
    marginBottom: 30
  },

  item: {
    marginBottom: 15
  },

  description: {
    textAlign: 'justify'
  },

  bottomButton: {
    height: 62,
    backgroundColor: '#efefef',
    color: '#333',
    marginTop: 20
  },

  textLeft: {
    textAlign: 'left'
  },

  textCenter: {
    textAlign: 'center'
  },

  well: {
    borderRadius: 0,
    backgroundColor: '#f7f7f7',
    height: 110,
    cursor: 'pointer',

    // '&:hover': {
    //   borderRadius: 0,
    //   backgroundColor: '#6a6a6a',
    //   color: '#fff'
    // },

    '& p': {
      padding: '25px 15px'
    }
  },

  copyIcon: {
    float: 'right',
    marginTop: 15,
    marginRight: 15
  },

  buttonAction: {
    float: 'left',
    marginRight: 10
  }
});

const debug = require('debug')('dicoapp:containers:SeedPage');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

type State = {
  openSnackbar: boolean
};

class SeedPage extends Component<Props, State> {
  props: Props;

  state = {
    openSnackbar: true
  };

  gotoLoginPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.LOGIN);
  };

  handleClick = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  render() {
    debug('render');
    const { classes } = this.props;
    const { openSnackbar } = this.state;
    return (
      <EmptyLayout>
        <div className={classes.loginContainer}>
          <div className={classes.center}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography
                  variant="headline"
                  className={classes.bottom30}
                  gutterBottom
                >
                  Generate a new Passphrase/Seed
                </Typography>
                <Typography
                  gutterBottom
                  className={classNames(classes.description, classes.item)}
                >
                  Click on &quot;Generate&quot; to create your New Account
                  details. Once your new login data is generated and shown in
                  the box below please <b>back up</b> your Seed and your WIF key
                  to a secure place. Without this data you will <b>NOT</b> be
                  able to access your funds/tokens.. If your lose your Seed you
                  will also lose all your funds/addresses associated with this
                  Seed. The Seed is the password that gains you access to your
                  funds/tokens on the blockchain.
                </Typography>
                <Typography
                  variant="title"
                  className={classNames(classes.textLeft, classes.item)}
                  gutterBottom
                >
                  Seed (click to copy)
                </Typography>
                <div className={classNames(classes.well, classes.item)}>
                  {document.queryCommandSupported('copy') && (
                    <IconButton className={classes.copyIcon} aria-label="Copy">
                      <FileCopyIcon />
                    </IconButton>
                  )}
                  {/* <p className={classes.seedText}></p> */}
                </div>
                <Button
                  size="small"
                  variant="outlined"
                  className={classes.buttonAction}
                  onClick={this.handleClick}
                >
                  Generate
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  className={classes.buttonAction}
                >
                  Copy Seed to clipboard
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={classes.buttonAction}
                >
                  Reveal private WIF key
                </Button>
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Copied!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              // className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
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
