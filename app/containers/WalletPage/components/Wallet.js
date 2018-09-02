// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import QRCode from 'qrcode.react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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

import { BTC, ETH } from '../../../components/CryptoIcons';

const debug = require('debug')('dicoapp:containers:WalletPage:Wallet');

const styles = () => ({
  column: {
    flexBasis: '33.33%'
  },
  details: {
    display: 'block'
  },
  containerSection: {
    paddingBottom: 30
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
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  className: string
};

type State = {};

class Wallet extends Component<Props, State> {
  state = {};

  render() {
    debug(`render`);

    const { classes, className } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classNames(className)}>
          <Grid item xs={12} className={classes.containerSection}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                classes={{
                  expandIcon: classes.rightIcon
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <div>
                  <BTC />
                  20 BTC
                  <br />
                  <br />
                  <br />
                  <Typography variant="title" gutterBottom>
                    RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    Your deposit address
                  </Typography>
                  <QRCode value="RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu" />
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Divider className={classes.hr} />
                <Typography variant="button" gutterBottom>
                  Withdraw Bitcoin (BTC)
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Available: 20 BTC
                </Typography>
                <form>
                  <TextField
                    id="name"
                    label="Amount to withdraw"
                    className={classes.formItem}
                    value=""
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="name"
                    label="Withdraw to address"
                    className={classes.formItem}
                    value=""
                    margin="normal"
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Withdraw
                  </Button>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12} className={classes.containerSection}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div>
                  <ETH />
                  <br />
                  <br />
                  <br />
                  <Typography variant="title" gutterBottom>
                    RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu
                  </Typography>
                  <Typography variant="subheading" gutterBottom>
                    Your deposit address
                  </Typography>
                  <QRCode value="RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu" />
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Typography variant="button" gutterBottom>
                  Send
                </Typography>
                <Divider />
                <Typography variant="button" gutterBottom>
                  Receive
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<BTC />}
                action={<span>20 btc</span>}
                title="BTC"
                // subheader="September 14, 2016"
              />
              <CardContent>
                RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu
                <QRCode value="RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Wallet.displayName = 'Wallet';

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Wallet);
