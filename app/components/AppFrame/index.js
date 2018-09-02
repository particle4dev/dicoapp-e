import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { withStyles } from '@material-ui/core/styles';
import routes from '../../constants/routes.json';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  'appBar-left': {
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  }
});

class AppFrame extends Component {
  static propTypes = {
    // match: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    showDrawer: PropTypes.bool.isRequired
  };

  state = {
    anchor: 'left'
  };

  gotoWalletPage = () => {
    const { history } = this.props;
    history.push(routes.WALLET);
  };

  gotoBuyPage = () => {
    const { history } = this.props;
    history.push(routes.BUY);
  };

  gotoHelpPage = () => {
    const { history } = this.props;
    history.push(routes.HELP);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { children, classes, showDrawer } = this.props;
    // const { children, classes, uiTheme } = this.props;
    const { anchor } = this.state;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {/* <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar> */}
          {showDrawer && (
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
              anchor={anchor}
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem button onClick={this.gotoWalletPage}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wallet" />
                </ListItem>
                <ListItem button onClick={this.gotoBuyPage}>
                  <ListItemIcon>
                    <AddShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Buy" />
                </ListItem>
                <ListItem button onClick={this.gotoHelpPage}>
                  <ListItemIcon>
                    <LiveHelpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Help" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PowerSettingsNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exit" />
                </ListItem>
              </List>
            </Drawer>
          )}
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(AppFrame));
