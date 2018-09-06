// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import swal from 'sweetalert';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import routes from '../../constants/routes.json';
import { EmptyLayout } from '../Layout';
import Passphrase from './components/Passphrase';
import reducer from './reducer';
import saga from './saga';
import { login } from '../App/actions';
import {
  makeSelectLoading,
  makeSelectAuthenticated,
  makeSelectError
} from '../App/selectors';
import { APP_STATE_NAME } from './constants';
import image from './components/logo.png';

// const styles = theme => ({
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
    width: 400
  },

  logo: {
    margin: '14px auto 0px',
    position: 'relative',
    height: 85,
    width: 85
  },

  content: {
    width: 308,
    margin: '0px auto',
    textAlign: 'center'
  },

  item: {
    marginBottom: 30
  },

  loginButton: {
    boxShadow: 'none',
    border: 0,
    height: 36,
    backgroundColor: '#005194'
  },

  bottomButton: {
    height: 62,
    backgroundColor: '#efefef',
    color: '#333'
  }
});

const debug = require('debug')('dicoapp:containers:LoginPage');

type Props = {
  loading: boolean,
  authenticated: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Object | boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLogin: Function
};

type State = {
  passphrase: string
};

class LoginPage extends Component<Props, State> {
  props: Props;

  state = {
    passphrase: ''
  };

  componentDidUpdate = prevProps => {
    const { authenticated, error, history } = this.props;
    if (authenticated && !prevProps.authenticated) {
      swal('Success', 'Welcome to the GLX dICO Wallet!', 'success');
      history.push('/');
    }
    if (!authenticated && error) {
      swal('Something went wrong:', error.message, 'error');
    }
  };

  onLoginButtonClick = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { passphrase } = this.state;
    if (passphrase === '' || passphrase.length < 4) {
      return swal(
        'Oops!',
        'The passphrase you entered is either empty or too short.',
        'error'
      );
    }
    const { dispatchLogin } = this.props;
    dispatchLogin(passphrase);
  };

  onChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState({
      passphrase: value
    });
  };

  gotoSeedPage = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { history } = this.props;
    history.push(routes.SEED);
  };

  render() {
    debug('render');
    const { loading, classes } = this.props;
    const { passphrase } = this.state;

    return (
      <React.Fragment>
        <div className={classes.loginContainer}>
          <div className={classes.center}>
            <Card className={classes.card}>
              {loading && <LinearProgress />}
              <Avatar className={classes.logo} alt="logo" src={image} />
              <CardContent className={classes.content}>
                <Typography
                  variant="headline"
                  className={classes.item}
                  gutterBottom
                >
                  Welcome to dICO App
                </Typography>

                <Typography variant="subheading" gutterBottom>
                  Please type in your Seed to Login to your existing Account
                </Typography>

                <Passphrase
                  loading={loading}
                  passphrase={passphrase}
                  className={classes.item}
                  onChange={this.onChange}
                />

                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  color="primary"
                  type="submit"
                  onClick={this.onLoginButtonClick}
                  className={classNames(classes.item, classes.loginButton)}
                >
                  Log In
                </Button>
              </CardContent>

              <Button
                fullWidth
                className={classes.bottomButton}
                onClick={this.gotoSeedPage}
              >
                Click Here to Create a New Account
              </Button>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: (passphrase?: string) => dispatch(login(passphrase))
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  authenticated: makeSelectAuthenticated(),
  error: makeSelectError()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const LoginPageWapper = compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles)
)(LoginPage);

type RouterType = {
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

const Index = ({ history }: RouterType) => (
  <EmptyLayout>
    <ErrorBoundary>
      <LoginPageWapper history={history} />
    </ErrorBoundary>
  </EmptyLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
