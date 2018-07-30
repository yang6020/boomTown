import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ItemsContainer from '../../containers/ItemsContainer';
import styles from './styles';
import ItemCards from '../../components/ItemCards';
import Grid from '@material-ui/core/Grid';

const Items = ({ classes }) => {
  return (
    <Grid
      container
      direction="row"
      spacing={20}
      justify="flex-start"
      alignItems="center"
      className={classes.root}
      height="100%"
    >
      <ItemsContainer>
        {({ itemsData: { loading, error, items } }) => {
          if (loading) return '...loading';
          if (error) return '...error';
          console.log(items);
          return items.map(item => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              className={classes.smaller}
            >
              <ItemCards item={item} key={item.id} />
            </Grid>
          ));
        }}
      </ItemsContainer>
    </Grid>
  );
};

export default withStyles(styles)(Items);
