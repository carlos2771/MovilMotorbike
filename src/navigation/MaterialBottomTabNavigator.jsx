import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Clientes from '../screens/Clientes/CartClientes';

import StackCompras from './StackCompras';
import DetalleCompra from '../screens/Compras/DetalleCompras';

import Repuestos from '../screens/Repuestos/Repuestos';
import Marcas from '../screens/Marcas/Marcas'

import tw, { style } from 'twrnc'



const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function ComprasYdetalle() {
  return (
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3498DB'},  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold'} }}>
      <HomeStack.Screen name="Compras" component={StackCompras}/>
      <HomeStack.Screen name="detalle" component={DetalleCompra} />
    </HomeStack.Navigator>
  );
}

function VerCliente() {
    return (
      <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3498DB'},  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold'} }} >
        <HomeStack.Screen name="Clientes" component={Clientes} />
      </HomeStack.Navigator>
    );
  }

function VerRepuestos(){
    return (
        <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3498DB'},  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold'} }}>
          <HomeStack.Screen name="Repuestos" component={Repuestos} />
        </HomeStack.Navigator>
      );
}

function VerMarcas() {
    return (
        <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3498DB'},  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold'} }}>
          <HomeStack.Screen name="Marcas" component={Marcas} />
        </HomeStack.Navigator>
      );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="white"
      barStyle={{ backgroundColor: '#3498DB', height: 50 }} // Ajusta la altura aquí
      style={{ height: 50 }} // Ajusta la altura del contenedor Tab.Navigator
      screenOptions={{tabBarLabel: false}}
    >
      <Tab.Screen
        name="compras"
        component={ComprasYdetalle}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" style={[tw`text-red-500`, { color: color }]} size={26} />
          ),
          
        }}
      />
      <Tab.Screen
        name="clientes"
        component={VerCliente}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-supervisor" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="repuestos"
        component={VerRepuestos}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tools" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="marcas"
        component={VerMarcas}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="motorbike" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
