import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { customTheme } from './theme'
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/Dashboard';
import AuthProvider from 'components/auth/authContext'
import PrivateRoute from 'components/auth/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
