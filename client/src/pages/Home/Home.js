import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { Query } from 'react-apollo';
// import { Redirect } from 'react-router-dom'
import AccountForm from '../../components/AccountForm';

import styles from './styles';
import { ViewerContext } from '../../context/ViewerProvider';

const Home = ({ classes }) => (
  <Grid
    container
    className={classes.root}
    direction="row"
    alignItems="center"
    justify="center"
  >
    <Grid item xs={12} sm={12} md={6}>
      <Typography variant="button" gutterBottom className={classes.subheading}>
        Boomtown
      </Typography>
      <Typography variant="display4" className={classes.headline}>
        Share. Borrow. Prosper.
      </Typography>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Typography gutterBottom variant="headline">
        Welcome home.
      </Typography>
      <AccountForm />
    </Grid>
  </Grid>
);

export default withStyles(styles)(Home);

{
  /* <Query query={GET_TAGS} variables={{ filter: 2 }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`; */
}
{
  /* </Query> */
}
