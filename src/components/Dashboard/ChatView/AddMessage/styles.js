import { fade } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    height:'50px',
    backgroundColor: theme.palette.primary.main,
    display:'flex',
    alignItems:'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  form: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    flex: '1'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
  }
})

export default styles