import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { remote } from 'electron';
import { setWindowBounds } from 'electron-util';
import { withStyles } from '@material-ui/core/styles';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { minWindowSize } from '../../config/config-default';
import DICDrawer from '../../components/Drawer';
// import routes from '../../constants/routes.json';

const debug = require('debug')('dicoapp:containers:layout:NavigationLayout');

const setAppWindowBounds = (size = minWindowSize) => {
  const win = remote.getCurrentWindow();
  win.setResizable(true);
  win.setMaximizable(true);
  win.setFullScreenable(true);
  win.setMinimumSize(size.width, size.height);
  setWindowBounds(size, { animated: true });
  win.center();
};

// const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  flex: {
    flexGrow: 1
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginLeft: 72,
    marginTop: 64
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

// const DICTypography = styled.div`
//   font-family: Roboto, sans-serif;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
// `;

class NavigationLayout extends Component {
  constructor(props) {
    super(props);
    setAppWindowBounds();
  }

  render() {
    debug(`render`);

    // eslint-disable-next-line react/prop-types
    const { children, classes } = this.props;

    return (
      <React.Fragment>
        {/* <header className="mdc-toolbar mdc-toolbar--fixed fl-empty-layout__header">
        header 123
      </header> */}
        <aside className={classes.dicoDrawer}>
          <DICDrawer />
        </aside>
        <main className={classes.content}>{children}</main>
        <div className={classes.root}>
          {/* <DICTypography> */}
          {/* <header className="mdc-toolbar mdc-toolbar--fixed fl-empty-layout__header"> */}
          {/* <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar> */}
          {/* </header> */}
          {/* <aside className="mdc-drawer mdc-drawer--temporary mdc-drawer--open mdc-drawer--animating"> */}
          {/* </aside> */}

          {/* </DICTypography> */}
        </div>
        <div className="mdc-layout-grid">footer</div>
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
