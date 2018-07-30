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
        <Button
          size="small"
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
