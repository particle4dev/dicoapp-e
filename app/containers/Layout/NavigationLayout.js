import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
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

const debug = require('debug')('dicoapp:containers:layout:NavigationLayout');

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

class NavigationLayout extends Component {
  state = {
    anchor: 'left'
  };

  gotoWalletPage = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(routes.WALLET);
  };

  gotoBuyPage = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(routes.BUY);
  };

  gotoHelpPage = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(routes.HELP);
  };

  render() {
    debug(`render`);

    // eslint-disable-next-line react/prop-types
    const { children, classes } = this.props;
    const { anchor } = this.state;

    return (
      <div className={classes.root}>
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
        {children}
      </div>
    );
  }
}

NavigationLayout.propTypes = {
  children: PropTypes.node.isRequired
};

NavigationLayout.defaultProps = {};

NavigationLayout.displayName = 'NavigationLayout';

export default withRouter(withStyles(styles)(NavigationLayout));
