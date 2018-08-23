import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { createHashHistory } from 'history';
import configureStore from './store/configureStore';
import App from './containers/App';
import './app.global.css';

// Create redux store with history
const initialState = {};
const history = createHashHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
