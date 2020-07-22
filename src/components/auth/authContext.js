import React, {useEffect, useState, createContext} from 'react'
import firebase from 'firebaseConfig'

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
    return <div className="loading">Loading..</div>
  }

  return(
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )

} 

export default AuthProvider