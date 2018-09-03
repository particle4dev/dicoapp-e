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
// import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CryptoIcons, { UNKNOW } from '../../../components/CryptoIcons';

const debug = require('debug')('dicoapp:containers:WalletPage:Wallet');

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
  data: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function
};

type State = {
  amount: number,
  address: string
};

class Wallet extends Component<Props, State> {
  state = {
    amount: 0.1,
    address: 'RDhjCHgYCU8fCy7NLotvL5dBkmSA2SkaS5' // Fake BEER
  };

  onAmountChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    debug(`onAmountChange: ${value}`);
    this.setState({
      amount: Number(value)
    });
  };

  onAddressChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    debug(`onAddressChange: ${value}`);
    this.setState({
      address: value
    });
  };

  handleWithdraw = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { amount, address } = this.state;
    // const { dispatchLoadWithdraw, data } = this.props;
    const { dispatchLoadWithdraw } = this.props;
    console.log(
      dispatchLoadWithdraw({
        amount,
        address,
        // coin: data.get('coin'),
        coin: 'BEER'
      }),
      'dispatchLoadWithdraw'
    );
  };

  render() {
    debug(`render`);

    const { classes, data } = this.props;
    const { amount, address } = this.state;

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
                  <TextField
                    id="amount"
                    type="number"
                    label="Amount to withdraw"
                    className={classes.formItem}
                    value={amount}
                    margin="normal"
                    onChange={this.onAmountChange}
                  />
                  <TextField
                    id="name"
                    label="Withdraw to address"
                    className={classes.formItem}
                    value={address}
                    margin="normal"
                    inputProps={{
                      required: true
                    }}
                    onChange={this.onAddressChange}
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
