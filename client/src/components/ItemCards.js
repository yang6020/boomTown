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
import CardHeader from '@material-ui/core/CardHeader';
const styles = theme => ({
  card: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
});

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://dummyimage.com/350x250/f9a825/000000&text=select+your+image+"
        title="Contemplative Reptile"
      />
      <CardContent>
        <CardHeader
          align="left"
          style={{ border: 0 }}
          title={item.itemowner.fullname}
          avatar={
            <Avatar className={classes.avatar} style={{ border: 0 }}>
              J
            </Avatar>
          }
        />

        <Typography align="left" gutterBottom variant="headline" component="h2">
          {item.title}
        </Typography>
        <Typography align="left" component="p">
          {item.tags.map(tag => `${tag.title}`).join(',')}
        </Typography>
        <Typography align="left" component="p">
          {item.description}
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
