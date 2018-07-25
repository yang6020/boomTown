import red from '@material-ui/core/colors/red';

const styles = theme => ({
  smallGrid: {
    padding: '12px'
  },
  grid: {
    marginTop: 20,
    flex: 'wrap',
    flexGrow: 1,
    background: theme.palette.secondary.main,
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 8
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 8
    }
  },

  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

export default styles;
