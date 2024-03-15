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
import { faRightFromBracket , faUser, faCartShopping, faUsers, faScrewdriverWrench, faMotorcycle} from "@fortawesome/free-solid-svg-icons";
import MenuButtonItem from '../components/MenuButton';


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
  return(
    <ScrollView style={tw`bg-slate-700`}>
      <LinearGradient
        colors={["#1E293B", "#0f172a", "#1E293B"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[tw`flex-1 items-center justify-center h-50`]}>
        <View style={tw`justify-center items-center`}>
          <Image style={tw`w-40 h-full`} source={require('../images/motorbike (3).png')} />
        </View>
      </LinearGradient>
      <ScrollView style={tw``}>
        <View style={tw`min-h-135 max-h-140`}>
          <TouchableOpacity style={tw`px-3 py-2 m-3 border-b border-gray-600`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`mr-2`}>
                <FontAwesomeIcon icon={faUser} style={tw`text-white`} />
              </View>
              <View>
                <Text style={tw`text-white font-bold text-lg`}>{username ? username.toUpperCase() : ''}</Text>
                <Text style={tw`text-white text-sm`}>{email}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <MenuButtonItem text="Ir a Compras" onPress={() => navigation.navigate('compras')} icon={faCartShopping}/>
          <MenuButtonItem text="Ir a Clientes" onPress={() => navigation.navigate('clientes')} icon={faUsers} />
          <MenuButtonItem text="Ir a Repuestos" onPress={() => navigation.navigate('repuestos')} icon={faScrewdriverWrench}/>
          <MenuButtonItem text="Ir a Marcas" onPress={() => navigation.navigate('marcas')} icon={faMotorcycle} />
        </View>
      </ScrollView>
      <View style={tw`absolute bottom-0 min-w-full`}>
        <TouchableOpacity onPress={logout} style={tw`bg-blue-500 rounded flex-row items-center`}>
          <View style={tw`p-2`}>
            <FontAwesomeIcon icon={faRightFromBracket} style={tw`text-white p-3`} />
          </View>
          <Text style={tw`text-center text-white font-bold text-xl p-2`}>Cerrar sesión</Text>
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