import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { centerWindow } from 'electron-util';
import { loginWindowSize } from '../../config/config-default';

const debug = require('debug')('dicoapp:containers:layout:EmptyLayout');

const setLoginWindowBounds = (size = loginWindowSize) => {
  const win = remote.getCurrentWindow();
  win.setFullScreen(false);
  win.setFullScreenable(false);
  win.setResizable(false);
  win.setMaximizable(false);
  win.setMinimumSize(size.width, size.height);
  centerWindow({
    size: {
      width: size.width,
      height: size.height
    },
    animated: true
  });
};

class EmptyLayout extends Component {
  constructor(props) {
    super(props);
    setLoginWindowBounds();
  }

  render() {
    debug(`render`);

    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
};

EmptyLayout.defaultProps = {};

EmptyLayout.displayName = 'EmptyLayout';

export default EmptyLayout;
