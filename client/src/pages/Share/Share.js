import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import React, { Component } from 'react';
import ShareForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

class Share extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.grid}
        justify="space-around"
        alignItems="center"
        style={{ marginTop: 30 }}
      >
        <Grid item xs={4} style={{ height: '70%' }}>
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
