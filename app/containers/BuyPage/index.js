// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { NavigationLayout } from '../Layout';
import routes from '../../constants/routes.json';

const styles = () => ({
  container: {
    padding: 24
  },

  containerSection: {
    paddingBottom: 30
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class BuyPage extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;

    return (
      <NavigationLayout>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} className={classes.containerSection}>
            <Card>
              <CardContent>
                <Typography variant="title" gutterBottom>
                  BuyPage
                </Typography>
                <Link to={routes.HOME}>to HomePage</Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </NavigationLayout>
    );
  }
}

export default withStyles(styles)(BuyPage);
