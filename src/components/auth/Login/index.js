import React, {useState, useContext} from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Paper,
  Typography, 
  Button,
  Box,
  withStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link, Redirect } from 'react-router-dom'
import styles from './styles'
import firebase from 'firebaseConfig'
import {AuthContext} from 'components/auth/authContext'

const Login = (props) => {
  const { classes } = props;
  const [state, setState] = useState({
    email: null,
    password: null,
  })
  const [loginError, setLoginError] = useState('') 
  const { currentUser } = useContext(AuthContext)
  
  if (currentUser) {
    return <Redirect to="/"/>
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    firebase
    .auth()
    .signInWithEmailAndPassword(state.email, state.password)
    .then(() => {
      props.history.push("/")
    }, authError => {
      // console.log(authError)
      setLoginError(authError.message)
    })
  }


  const handleChange = (event) => {
    const { value, name } = event.target
    setState(prevstate => {
      return {
        ...prevstate,
        [name]: value
      }
    })
  }

  return(
    <div className={classes.container}>
      <div className={classes.paper}>
        <Paper elevation={5}>
          <Typography variant="h5" component="h1">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="login-email-input">Enter your email</InputLabel>
              <Input 
                type="email" 
                autoComplete="email" 
                name="email" 
                autoFocus 
                id="login-email-input" 
                onChange={handleChange}
              />
            </FormControl>   
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">Enter your Password</InputLabel>
              <Input 
                type="password" 
                id="login-password-input" 
                name="password" 
                onChange={handleChange}
              />
            </FormControl>
            <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
          </form>
          {
            loginError && 
            <Box mb={2}>
              <Alert severity="error">{loginError}</Alert>
            </Box>
          }
          <Typography component="h5" variant="h6">Dont have an account? <Link to="/signup">Signup</Link></Typography>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(styles)(Login)