import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Clientes from '../screens/Clientes/CartClientes'
import StackCompras from './StackCompras'
import DetalleCompra from '../screens/Compras/DetalleCompras'
import tw from 'twrnc'

const Drawer = createDrawerNavigator()

export default function DrawerAppNavigation() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        // backgroundColor: 'rgb(059, 128, 176, 0.9)',
        width: 240,
      },
    }}>
      <Drawer.Screen name="compras" component={StackCompras}/>
      <Drawer.Screen name="clientes" component={Clientes}/>
      <Drawer.Screen name="detalle" component={DetalleCompra}/>
      
    </Drawer.Navigator>
  )
}