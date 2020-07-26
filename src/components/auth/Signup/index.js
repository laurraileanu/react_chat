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

const Signup = (props) => {
  const { classes } = props;
  const [state, setState] = useState({
    email: null,
    password: null,
    passwordConfirmation: null,
  })
  const [signupError, setSignupError] = useState('')
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/"/>
  }

  const handleSubmit = (event) => {
    const timeStamp = Date.now()

    event.preventDefault()

    if(state.password === state.passwordConfirmation ) {
      setSignupError('');
    } else {
      setSignupError('Paswords do not match');
    }

    firebase
    .auth()
    .createUserWithEmailAndPassword(state.email, state.password)
    .then(authRes => {
      const userObject = {
        email: authRes.user.email,
        userId: timeStamp
      }
      firebase
      .firestore()
      .collection('users')
      .doc(state.email)
      .set(userObject)
      .then(() => {
        props.history.push('/')
      }, dbError => {
        // console.log(dbError)
        setSignupError('Failed to add user')
      })
    }, authError => {
      // console.log(authError)
      setSignupError(authError.message)
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
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="signup-email-input">Enter your email</InputLabel>
              <Input 
                type="email" 
                autoComplete="email" 
                name="email" 
                autoFocus 
                id="signup-email-input" 
                onChange={handleChange}
              />
            </FormControl>   
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">Enter your Password</InputLabel>
              <Input 
                type="password" 
                id="signup-password-input" 
                name="password" 
                onChange={handleChange}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">Confirm your Password</InputLabel>
              <Input 
                type="password" 
                id="signup-password-confirmation-input" 
                name="passwordConfirmation" 
                onChange={handleChange}
              />
            </FormControl>
            <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
          </form>
          {
            signupError && 
            <Box mb={2}>
              <Alert severity="error">{signupError}</Alert>
            </Box>
          }
          <Typography component="h5" variant="h6">Already have an account? <Link to="/login">Login</Link></Typography>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(styles)(Signup)