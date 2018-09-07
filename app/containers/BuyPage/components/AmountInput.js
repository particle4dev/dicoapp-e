// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const debug = require('debug')('dicoapp:containers:BuyPage:AmountInput');

const styles = theme => ({
  amount: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  amount__input: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  amount__label: {
    fontSize: 18
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  className?: string
};

class AmountInput extends PureComponent<Props> {
  static defaultProps = {
    className: ''
  };

  render() {
    debug(`render`);

    const { classes, ...props } = this.props;

    return (
      <TextField
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.amount,
            input: classes.amount__input
          }
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.amount__label
        }}
        {...props}
      />
    );
  }
}

AmountInput.displayName = 'AmountInput';

export default withStyles(styles)(AmountInput);
