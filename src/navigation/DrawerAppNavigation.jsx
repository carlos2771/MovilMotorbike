import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Clientes from '../screens/CartClientes'
import StackCompras from './StackCompras'
import DetalleCompra from '../screens/DetalleCompras'
const Drawer = createDrawerNavigator()

export default function DrawerAppNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="comprasStack" component={StackCompras}/>
      <Drawer.Screen name="clientes" component={Clientes}/>
      <Drawer.Screen name="detalle" component={DetalleCompra}/>
      
    </Drawer.Navigator>
  )
}