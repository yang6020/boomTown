import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ItemsContainer from '../../containers/ItemsContainer';
import styles from './styles';
import ItemCards from '../../components/ItemCards';
import Grid from '@material-ui/core/Grid';

const Profile = ({ classes }) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.root}
      height="100%"
    >
      <ItemsContainer>
        {({ userItemsData: { loading, error, user } }) => {
          if (loading) return '...loading';
          if (error) return '...error';
          console.log(user);
          return 'hello';
        }}
      </ItemsContainer>
    </Grid>
  );
};

export default withStyles(styles)(Profile);
