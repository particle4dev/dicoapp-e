import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { createHashHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './components/Theme';
import configureStore from './store/configureStore';
import Routes from './containers/Routes';
import './app.global.css';

// Create redux store with history
const initialState = {};
const history = createHashHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const render = AppComponent => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ConnectedRouter history={history}>
            <AppComponent />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['./containers/Routes'], () => {
    // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // render();
    const NextRoot = require('./containers/Routes'); // eslint-disable-line global-require
    render(NextRoot);
  });
}

render(Routes);
