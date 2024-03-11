import { View, Text, Alert } from 'react-native'
import React, { useState, createContext } from 'react'

export const AuthContext = React.createContext(null)


export default function AuthProvider({children}) {
  const [auth, setAuth] = useState(false)

  const singIn = () =>{
    setAuth(true)
  }
  const logout = () =>{
    Alert.alert('Se ha cerrado la sesión')
    setAuth(false)
  }
  return (
    <AuthContext.Provider value={{auth, singIn,logout}}>
      {children}
    </AuthContext.Provider>
  )
}