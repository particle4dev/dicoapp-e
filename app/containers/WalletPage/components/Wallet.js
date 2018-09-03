// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode.react';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { required, requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import CryptoIcons, { UNKNOW } from '../../../components/CryptoIcons';

const debug = require('debug')('dicoapp:containers:WalletPage:Wallet');

export const lessThan = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { balance } = props;
    const n = Number(value);
    const b = Number(balance);
    if (n >= b) {
      return reject(new Error('Value is large than balance'));
    }
    return resolve(true);
  });

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
  />
);

const ValidationAmountInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

const ValidationAddressInput = validate(TextInput, [required], {
  onChange: true
});

const styles = () => ({
  column: {
    flexBasis: '33.33%'
  },
  details: {
    display: 'block'
  },
  hr: {
    marginBottom: 20
  },
  formItem: {
    margin: '0 0 17px 0',
    position: 'relative',
    width: '100%',
    maxWidth: 450
  },
  rightIcon: {
    top: 23
  },
  bitcoinContainer: {
    width: '100%'
  },
  bitcoinTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bitcoinQRCodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  bitcoinQRCodeItem: {
    marginRight: 10
  },
  transactionsForm: {
    width: '100%',
    maxWidth: 450
  },
  rightLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'no-wrap',
    alignItems: 'center'
  },
  coinName: {
    paddingLeft: 5
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Object
  // eslint-disable-next-line flowtype/no-weak-types
  // dispatchLoadWithdraw: Function
};

type State = {};

class Wallet extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.amountInput = React.createRef();
    this.addressInput = React.createRef();
  }

  handleWithdraw = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    // const { address } = this.state;
    // const { dispatchLoadWithdraw, data } = this.props;
    // const { dispatchLoadWithdraw } = this.props;
    // console.log(
    //   dispatchLoadWithdraw({
    //     amount,
    //     address,
    //     // coin: data.get('coin'),
    //     coin: 'BEER'
    //   }),
    //   'dispatchLoadWithdraw'
    // );
    try {
      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();
      console.log(amount, 'amountInput');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    debug(`render`);

    const { classes, data } = this.props;

    let CIcon = CryptoIcons[data.get('coin')];
    if (!CIcon) {
      CIcon = UNKNOW;
    }

    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.containerSection}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                classes={{
                  expandIcon: classes.rightIcon
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <div className={classes.bitcoinContainer}>
                  <div className={classes.bitcoinTitle}>
                    <div className={classes.rightLogo}>
                      <CIcon />
                      <div className={classes.coinName}>{data.get('coin')}</div>
                    </div>
                    <div>
                      {data.get('balance')} {data.get('coin')}
                    </div>
                  </div>
                  <div className={classes.bitcoinQRCodeContainer}>
                    <div className={classes.bitcoinQRCodeItem}>
                      <Typography variant="subheading" gutterBottom>
                        Your deposit address
                      </Typography>
                      <Typography variant="title" gutterBottom>
                        {data.get('address')}
                      </Typography>
                    </div>
                    <QRCode value={data.get('address')} />
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Divider className={classes.hr} />
                <Typography variant="button" gutterBottom>
                  Withdraw {data.get('coin')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Available: {data.get('balance')} {data.get('coin')}
                </Typography>
                <form>
                  <ValidationAmountInput
                    id="amount"
                    label="Amount to withdraw"
                    margin="normal"
                    balance={data.get('balance')}
                    className={classes.formItem}
                    ref={this.amountInput}
                  />

                  <ValidationAddressInput
                    id="address"
                    label="Withdraw to address"
                    margin="normal"
                    className={classes.formItem}
                    ref={this.addressInput}
                  />

                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleWithdraw}
                  >
                    Withdraw
                  </Button>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Wallet.displayName = 'Wallet';

export default withStyles(styles)(Wallet);
