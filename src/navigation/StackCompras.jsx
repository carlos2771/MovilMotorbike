import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Compras from '../screens/Compras/Compras'
import CreateCompras from '../screens/Compras/CreateCompras'


export default function StackCompras() {
  const Stack = createNativeStackNavigator()
    return (
    

   <Stack.Navigator initialRouteName="comprasStack" screenOptions={{headerShown:false}}>
    <Stack.Screen name="comprasStack" component={Compras}/>
        <Stack.Screen name="createCompras" component={CreateCompras}/>
       
   </Stack.Navigator>
    
  )
}

