import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ItemsContainer from '../../containers/ItemsContainer';
import styles from './styles';
import ItemCards from '../../components/ItemCards';
import Grid from '@material-ui/core/Grid';
import { ViewerContext } from '../../context/ViewerProvider';

const Items = ({ classes }) => {
  return (
    <Grid container className={classes.grid} justify="center" align="center">
      <ItemsContainer>
        {({ itemsData: { loading, error, items } }) => {
          if (loading) return '...loading';
          if (error) return '...error';
          console.log('aifhe');
          return (
            <div>
              {items.map(item => (
                <Grid
                  className={classes.smallGrid}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                >
                  <ItemCards item={item} key={item.id} />
                </Grid>
              ))}
            </div>
          );
        }}
      </ItemsContainer>
    </Grid>
  );
};

export default withStyles(styles)(Items);
