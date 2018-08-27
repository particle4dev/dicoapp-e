import React, { Component } from 'react';
import PropTypes from 'prop-types';

const debug = require('debug')('dicoapp:containers:layout:EmptyLayout');

class EmptyLayout extends Component {
  render() {
    debug(`render`);

    const { children } = this.props;

    return (
      <React.Fragment>
        EmptyLayout
        {children}
      </React.Fragment>
    );
  }
}

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
};

EmptyLayout.defaultProps = {};

EmptyLayout.displayName = 'EmptyLayout';

export default EmptyLayout;
