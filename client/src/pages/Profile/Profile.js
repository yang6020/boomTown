import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ItemsContainer from '../../containers/ItemsContainer';
import styles from './styles';
import ItemCards from '../../components/ItemCards';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../../components/ProfileCard';
import { Typography } from '../../../node_modules/@material-ui/core';

const Profile = ({ classes, match }) => {
  return (
    <ItemsContainer id={match.params.userid}>
      {({ userItemsData: { loading, error, user } }) => {
        if (loading) return '...loading';
        if (error) return '...error';
        return (
          <Grid className={classes.root}>
            <ProfileCard user={user} />
            <Grid container style={{ paddingTop: 20 }}>
              {user.items.map(item => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  style={{ padding: 12 }}
                >
                  <ItemCards item={item} key={item.id} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        );
      }}
    </ItemsContainer>
  );
};

export default withStyles(styles)(Profile);
