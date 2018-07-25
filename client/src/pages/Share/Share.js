import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import React, { Component } from 'react';
import ShareForm from '../../components/ShareForm';
import ShareItemPreview from '../../components/ShareItemPreview';

class Share extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={6}>
          <ShareForm />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Share);
