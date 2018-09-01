import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { remote } from 'electron';
// import { setWindowBounds } from 'electron-util';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// import { minWindowSize } from '../../config/config-default';
import DICDrawer from '../../components/Drawer';
// import routes from '../../constants/routes.json';

const debug = require('debug')('dicoapp:containers:layout:NavigationLayout');

// const setAppWindowBounds = (size = minWindowSize) => {
//   const win = remote.getCurrentWindow();
//   win.setResizable(true);
//   win.setMaximizable(true);
//   win.setFullScreenable(true);
//   win.setMinimumSize(size.width, size.height);
//   setWindowBounds(size, { animated: true });
//   win.center();
// };

// const drawerWidth = 240;

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    marginLeft: 72,
    // marginTop: 64,
    minHeight: '100%'
  },

  dicoDrawer: {
    color: 'rgba(0, 0, 0, .87)',
    position: 'fixed',
    top: 0,
    left: 0,
    '-webkit-box-sizing': 'border-box',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    contain: 'strict'
  }
});

class NavigationLayout extends Component {
  // constructor(props) {
  //   super(props);
  //   setAppWindowBounds();
  // }

  render() {
    debug(`render`);

    // eslint-disable-next-line react/prop-types
    const { children, classes } = this.props;

    return (
      <React.Fragment>
        <aside className={classes.dicoDrawer}>
          <DICDrawer />
        </aside>
        <main className={classes.content}>{children}</main>
        {/* <div className={classes.root}> */}
        {/* <DICTypography> */}
        {/* <header className="mdc-toolbar mdc-toolbar--fixed fl-empty-layout__header"> */}

        {/* </header> */}
        {/* <aside className="mdc-drawer mdc-drawer--temporary mdc-drawer--open mdc-drawer--animating"> */}
        {/* </aside> */}

        {/* </DICTypography> */}
        {/* </div> */}
        {/* <div className="mdc-layout-grid">footer</div> */}
      </React.Fragment>
    );
  }
}

NavigationLayout.propTypes = {
  children: PropTypes.node.isRequired
};

NavigationLayout.defaultProps = {};

NavigationLayout.displayName = 'NavigationLayout';

export default withStyles(styles)(NavigationLayout);
