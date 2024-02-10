import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Compras from '../screens/Compras'
import CreateCompras from '../screens/CreateCompras'


export default function StackCompras() {
  const Stack = createNativeStackNavigator()
    return (
    

   <Stack.Navigator initialRouteName="compras" screenOptions={{headerShown:false}}>
    <Stack.Screen name="compras" component={Compras}/>
        <Stack.Screen name="createCompras" component={CreateCompras}/>
       
   </Stack.Navigator>
    
  )
}

