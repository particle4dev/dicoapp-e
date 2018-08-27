import React, { Component } from 'react';
import PropTypes from 'prop-types';

const debug = require('debug')('dicoapp:containers:layout:NavigationLayout');

class NavigationLayout extends Component {
  render() {
    debug(`render`);

    const { children } = this.props;

    return (
      <React.Fragment>
        NavigationLayout
        {children}
      </React.Fragment>
    );
  }
}

NavigationLayout.propTypes = {
  children: PropTypes.node.isRequired
};

NavigationLayout.defaultProps = {};

NavigationLayout.displayName = 'NavigationLayout';

export default NavigationLayout;
