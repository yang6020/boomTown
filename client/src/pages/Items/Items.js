import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ItemsContainer from '../../containers/ItemsContainer';
import styles from './styles';
import ItemList from './ItemList';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ItemCards from '../../components/ItemCards';
import Grid from '@material-ui/core/Grid';

const Items = ({ classes }) => {
  return (
    <Grid container className={classes.grid} justify="center" align="center">
      <ItemsContainer>
        {({ itemsData: { loading, error, items } }) => {
          if (loading) return '...loading';
          if (error) return '...error';
          return items.map(item => (
            <Grid
              className={classes.smallGrid}
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
            >
              <ItemCards {...item} />
            </Grid>
          ));
        }}
      </ItemsContainer>
    </Grid>
  );
};

export default withStyles(styles)(Items);

{
  /* <ItemList>
        <ItemsContainer>
      {({itemsData: {loading, error, items}}) => {
        if(loading) return '...loading'
        if(error) return '...error'
        return (
          items.map(item => {
            return <div>{item.title}</div>
          })
        )
      }}
    </ItemsContainer> 
    </ItemList>*/
}
