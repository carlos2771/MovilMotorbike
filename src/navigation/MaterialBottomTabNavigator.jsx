import React, { useState, useEffect, useContext  } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import Clientes from '../screens/Clientes/CartClientes';

import StackCompras from './StackCompras';
import DetalleCompra from '../screens/Compras/DetalleCompras';
import CreateCompras from '../screens/Compras/CreateCompras';

import Repuestos from '../screens/Repuestos/Repuestos';
import Marcas from '../screens/Marcas/Marcas'

import tw, { style } from 'twrnc'
import { Image, Pressable, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";


import { AuthContext } from '../context/AuthProvider';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();


function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="MyTabs" component={MyTabs} />
    </HomeStack.Navigator>
  );
}


// Pagina principal
function ComprasYdetalle() {
  return (
    <HomeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#3498DB'},  headerTitleStyle: { color: '#FFFFFF', fontWeight: 'bold'} }}>
      <HomeStack.Screen name="Compras" component={StackCompras}/>
      <HomeStack.Screen name="detalle" component={DetalleCompra} />
      <HomeStack.Screen name="createCompras" component={CreateCompras} />
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

function MyTabs() {
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


const DrawerView = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const { username, email } = user || {};
  console.log("usuariosss",user);
  return(
    <ScrollView style={tw`bg-slate-700`}>
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center justify-center h-40`]}
    >
      <View style={tw`justify-center items-center`}>
        <Image style={tw`w-40 h-full`} source={require('../images/motorbike (3).png')}/>
        {/* <View style={tw`flex-row`}>
          <Text style={tw`text-white text-3xl font-bold`}>Motor</Text>
          <Text style={tw`text-sky-300 text-3xl font-bold`}>Bike</Text>
        </View> */}
      </View>
    </LinearGradient>
    <ScrollView>
    <View style={tw`min-h-130 max-h-130`}>
        <TouchableOpacity style={tw`p-3 m-3 border-2 border-blue-600 rounded-lg`}>
        <Text>Hola, {username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`p-3 m-3 border-2 border-blue-600 rounded-lg`}>
        <Text>Email: {email}</Text>
        </TouchableOpacity>
        
    </View>
    </ScrollView>
    <View style={tw`mx-10`}>
      <TouchableOpacity onPress={logout} style={tw`p-2 bg-blue-500 rounded flex-row items-center`}>
        <FontAwesomeIcon icon={faRightFromBracket} style={tw`text-white mx-3`} />
        <Text style={tw`text-center text-white font-bold text-xl`}>Cerrar sesión</Text>
      </TouchableOpacity>
      </View>
  </ScrollView>
  )
}


const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerView { ...props }/>}>
      <Drawer.Screen name="Inicio" component={HomeStackGroup} />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    
      <DrawerGroup />

  );
}