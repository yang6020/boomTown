const styles = theme => ({
  card: {
    maxHeight: 730.32,
    height: '100%',
    justify: 'space-between'
  },
  grid: {
    marginTop: 20,
    flex: 'wrap',
    flexGrow: 1,
    background: '#ffffff',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 8
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 8
    },
    height: '100%'
  }
});

export default styles;
