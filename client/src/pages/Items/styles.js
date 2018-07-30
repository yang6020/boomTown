import red from '@material-ui/core/colors/red';

const styles = theme => ({
  smaller: {
    padding: '12px'
  },
  root: {
    marginTop: 50,
    flexGrow: 1,
    minHeight: '100%',
    background: theme.palette.secondary.main,
    padding: theme.spacing.unit * 5,
    paddingTop: 82
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
