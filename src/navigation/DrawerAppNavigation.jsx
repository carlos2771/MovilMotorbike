import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Clientes from '../screens/CartClientes'
import { AuthContext } from '../context/AuthProvider'
import Compras from '../screens/Compras'
import CreateCompras from '../screens/CreateCompras'
import StackCompras from './StackCompras'
import DetalleCompra from '../screens/DetalleCompras'
const Drawer = createDrawerNavigator()

export default function DrawerAppNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="compras" component={StackCompras}/>
      <Drawer.Screen name="clientes" component={Clientes}/>
      <Drawer.Screen name="detalle" component={DetalleCompra}/>
      
    </Drawer.Navigator>
  )
}