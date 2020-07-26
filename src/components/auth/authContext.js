import React, {useEffect, useState, createContext} from 'react'
import firebase from 'firebaseConfig'
import {Box, CircularProgress} from '@material-ui/core'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if(pending) {
    return(
      <Box height="100vh" width="100vh" display="flex" justifyContent="center" alignItems="center" m={'auto'}>
        <CircularProgress />
      </Box>
    ) 
  }

  return(
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )

} 

export default AuthProvider