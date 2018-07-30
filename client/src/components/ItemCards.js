import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Gravatar from 'react-gravatar';
import { ALL_USER_ITEMS_QUERY } from '../apollo/queries';
const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      margin: 12
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={item.imageurl} title="" />
      <CardContent className={classes.content}>
        <CardHeader
          align="left"
          style={{ border: 0 }}
          title={item.itemowner.fullname}
          avatar={
            <Gravatar
              align="left"
              style={{ marginLeft: -30, marginTop: -20 }}
              email={item.itemowner.email}
            />
          }
        />

        <Typography
          align="left"
          gutterBottom
          variant="headline"
          component="h2"
          style={{ marginTop: 15 }}
        >
          {item.title}
        </Typography>
        <Typography align="left" component="p" style={{ color: '#696969' }}>
          {item.tags.map(tag => `${tag.title}`).join(',')}
        </Typography>
        <Typography align="left" component="p" style={{ paddingBottom: 10 }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions style={{ paddingBottom: 15 }}>
        <Button
          size="large"
          color="secondary"
          variant="outlined"
          style={{ position: 'relative' }}
        >
          BORROW
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ItemCard);
