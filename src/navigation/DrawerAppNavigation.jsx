import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Compras from '../screens/Compras'
import Clientes from '../screens/Clientes'
import { AuthContext } from '../context/AuthProvider'

const Drawer = createDrawerNavigator()

export default function DrawerAppNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="compras" component={Compras}/>
      <Drawer.Screen name="clientes" component={Clientes}/>
     
    </Drawer.Navigator>
  )
}