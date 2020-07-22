import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from 'components/auth/authContext'

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext)
  return(
    <Route
      {...rest}
      render={routerProps =>
        !!currentUser ?
        <RouteComponent {...routerProps} />
        :
        <Redirect to={'login'} />
      }
    >

    </Route>
  )
}

export default PrivateRoute