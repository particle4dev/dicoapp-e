// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

const styles = () => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#fff'
  },

  appBar__button: {
    marginLeft: -12,
    marginRight: 35
  }
});

type Props = {
  title: string,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {};

class MDCAppBar extends Component<Props, State> {
  props: Props;

  static propTypes = {};

  render() {
    const { classes, title } = this.props;

    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.appBar__button}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>
    );
  }
}

export default withStyles(styles)(MDCAppBar);
