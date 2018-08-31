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

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import reducer from './reducer';
import saga from './saga';
import { EmptyLayout } from '../Layout';
import Passphrase from './components/Passphrase';
// import Wif from './components/Wif';
import { APP_STATE_NAME } from './constants';
import routes from '../../constants/routes.json';

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
    // paddingBottom: 47,
    paddingTop: 28,
    minHeight: 350,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)'
  },

  card: {
    width: 780
  },

  content: {
    width: 758,
    margin: '0px auto',
    textAlign: 'center'
  },

  bottom30: {
    marginBottom: 20
  },

  item: {
    marginBottom: 12
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
  openSnackbar: boolean,
  messsageSnackbar: string
};

class SeedPage extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      messsageSnackbar: ''
    };
  }

  gotoLoginPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.LOGIN);
  };

  handleCopySuccessfully = () => {
    this.setState({
      openSnackbar: true,
      messsageSnackbar: 'Copied!'
    });
  };

  handleCopyFailed = () => {
    this.setState({
      openSnackbar: true,
      messsageSnackbar: 'Failed to copy file from text!'
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openSnackbar: false
    });
  };

  // generateWtf = (evt: SyntheticInputEvent<>) => {
  //   onChange
  //   const { passphrase } = this.props;
  //   const wif = generateWif(passphrase);

  // }

  render() {
    debug('render');
    const { classes } = this.props;
    const { openSnackbar, messsageSnackbar } = this.state;
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
                <Passphrase
                  handleCopySuccessfully={this.handleCopySuccessfully}
                  handleCopyFailed={this.handleCopyFailed}
                />
                {/* <Wif /> */}
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
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{messsageSnackbar}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </EmptyLayout>
    );
  }
}
const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const withConnect = connect(
  null,
  null
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(SeedPage);
