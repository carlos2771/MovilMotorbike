import { View, Text, Alert } from 'react-native'
import React, { useState, createContext } from 'react'

export const AuthContext = React.createContext(null)


export default function AuthProvider({children}) {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(null);

  const singIn = (userData) =>{
    setAuth(true)
    setUser(userData);
  }
  const logout = () =>{
    Alert.alert('Cerrar sesión', '¿Estas seguro que quieres cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => Alert.alert("No se ha cerrado la sesión"),
        style: 'cancel',
      },
      {text: 'Aceptar', onPress: () => setAuth(false)},
    ]);
  }
  return (
    <AuthContext.Provider value={{auth, user, singIn,logout}}>
      {children}
    </AuthContext.Provider>
  )
}