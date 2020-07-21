const styles = theme => ({
  container: {
    maxWidth: '400px',
    margin:'30px auto 0',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '100%',
      padding: theme.spacing(3)
    },
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
})

export default styles