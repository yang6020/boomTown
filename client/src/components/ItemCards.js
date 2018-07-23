import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from '../pages/Items/styles';
import CardHeader from '@material-ui/core/CardHeader';

const ItemCard = ({
  id,
  title,
  imageurl,
  description,
  created,
  itemowner,
  tags,
  classes
}) => {
  const itemTags = tags.map(tag => `${tag.title}`);
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <CardHeader
          align="left"
          style={{ border: 0 }}
          title={itemowner.fullname}
          avatar={
            <Avatar className={classes.avatar} style={{ border: 0 }}>
              J
            </Avatar>
          }
        />

        <Typography align="left" gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography align="left" component="p">
          {itemTags.join(',')}
        </Typography>
        <Typography align="left" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          BORROW
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ItemCard);
