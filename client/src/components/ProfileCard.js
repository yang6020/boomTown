import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
import CardHeader from '@material-ui/core/CardHeader';

const styles = {
  card: {
    minWidth: 275,
    minHeight: 250,
    marginLeft: 40,
    marginRight: 40
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 50
  },
  pos: {
    marginBottom: 12
  }
};

function ProfileCard(props) {
  const { classes, user } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Gravatar email={user.email} />}
          title={
            <Typography variant="display2" component="h1">
              {user.fullname}
            </Typography>
          }
          style={{ marginTop: 35, marginLeft: 20 }}
        />
        <CardContent>
          <Typography
            style={{ marginTop: -18, fontSize: 18, marginLeft: 20 }}
            component="p"
          >
            <b>{`${user.items.length} Items shared ${
              user.borrowed.length
            } Items borrowed`}</b>
          </Typography>
          <Typography
            style={{ marginTop: 5, marginLeft: 20, fontSize: 16 }}
            component="p"
          >{`"${user.bio}"`}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCard);
