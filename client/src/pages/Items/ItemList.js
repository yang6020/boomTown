import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    marginTop: '22.2%',
    padding: '12px'
  }
});

class ItemList extends React.Component {
  state = {
    spacing: '16'
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} justify="center">
        {[0, 1, 2].map(value => (
          <Grid key={value} item>
            <Paper className={classes.paper} />
          </Grid>
        ))}
      </Grid>

      //   <Grid container className={classes.root} spacing={16}>
      //     <Grid item xs={4} sm ={6} md={8} lg={10} xl={12}>
      //     <Paper className={classes.paper}>SHEET OF PAPER</Paper>
      //     </Grid>
      //     <Grid item xs={4} sm ={6} md={8} lg={10} xl={12}>
      //     <Paper className={classes.paper}>SHEET OF PAPER</Paper>
      //     </Grid>
      //     <Grid item xs={4} sm ={6} md={8} lg={10} xl={12}>
      //     <Paper className={classes.paper}>SHEET OF PAPER</Paper>
      //     </Grid>
      //     <Grid item xs={4} sm ={6} md={8} lg={10} xl={12}>
      //     <Paper className={classes.paper}>SHEET OF PAPER</Paper>
      //     </Grid>
      //   </Grid>
      //
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemList);
