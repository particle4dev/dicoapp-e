// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import routes from '../../constants/routes.json';

const debug = require('debug')('dicoapp:components:Drawer');

const drawerWidth = 240;

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 12,
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  docked: {
    height: '100%'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  history: Object
};

type State = {
  anchor: string
};

class DICDrawer extends Component<Props, State> {
  state = {
    anchor: 'left'
  };

  gotoHomePage = () => {
    const { history } = this.props;
    history.push(routes.WALLET);
  };

  gotoWalletPage = () => {
    const { history } = this.props;
    history.push(routes.WALLET);
  };

  gotoDashboardPage = () => {
    const { history } = this.props;
    history.push(routes.DASHBOARD);
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
    debug(`render`);

    const { classes } = this.props;
    const { anchor } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          docked: classes.docked,
          paper: classNames(classes.drawerPaper, classes.drawerPaperClose)
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.gotoHomePage}>
            <HomeIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button selected active onClick={this.gotoDashboardPage}>
            <ListItemIcon selected active>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
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
        </List>
        <Divider />
        <List>
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
    );
  }
}

DICDrawer.displayName = 'DICDrawer';

export default withRouter(withStyles(styles)(DICDrawer));
