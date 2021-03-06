import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import bIcon from '../images/boomtown.svg';
import Icon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import DropDown from '../components/DropDown';
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            component={Link}
            to="/items"
          >
            <img alt="BOOMTOWN" src={bIcon} style={{ width: '90%' }} />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
          />

          <Button
            style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
            variant="extendedFab"
            color="inherit"
            component={Link}
            to="/share"
          >
            <Icon style={{ margin: '20px' }}>add_circle</Icon> SHARE SOMETHING
          </Button>
          <IconButton>
            <DropDown />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
