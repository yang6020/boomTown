const styles = theme => ({
  smaller: {
    padding: '12px'
  },
  root: {
    marginTop: 40,
    flexGrow: 1,
    minHeight: '100%',
    background: theme.palette.secondary.main,
    padding: theme.spacing.unit * 5,
    paddingTop: 100
  },
  header: {
    color: 'black',
    margin: '24px 0px 0px 16px'
  }
});

export default styles;
