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

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
