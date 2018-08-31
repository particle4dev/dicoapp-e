// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { openWifExpansion, closeWifExpansion } from '../actions';
import { makeSelectWif, makeSelectWifExpansion } from '../selectors';

const styles = () => ({});

const debug = require('debug')('dicoapp:containers:SeedPage:Wif');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  // classes: Object,
  wif: string,
  open: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenWifExpansion: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseWifExpansion: Function
};

type State = {
  supportedCopyCommandSupported: boolean
};

class Wif extends Component<Props, State> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      supportedCopyCommandSupported:
        document && document.queryCommandSupported('copy')
    };
  }

  onChange = (evt: SyntheticInputEvent<>, expanded: boolean) => {
    evt.preventDefault();
    const { dispatchOpenWifExpansion, dispatchCloseWifExpansion } = this.props;
    if (expanded) {
      dispatchOpenWifExpansion();
    } else {
      dispatchCloseWifExpansion();
    }
  };

  render() {
    debug('render');
    // const { classes, wif, open } = this.props;
    const { wif, open } = this.props;
    const { supportedCopyCommandSupported } = this.state;
    return (
      <ExpansionPanel expanded={open} onChange={this.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Reveal private WIF key</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{wif}</Typography>
          {wif &&
            supportedCopyCommandSupported && (
              <IconButton aria-label="Copy">
                <FileCopyIcon />
              </IconButton>
            )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenWifExpansion: () => dispatch(openWifExpansion()),
    dispatchCloseWifExpansion: () => dispatch(closeWifExpansion())
  };
}

const mapStateToProps = createStructuredSelector({
  wif: makeSelectWif(),
  open: makeSelectWifExpansion()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Wif);
