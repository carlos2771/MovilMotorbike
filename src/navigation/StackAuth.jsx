import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import SingnIn from '../screens/SingIn'
import SingUP from '../screens/SingUp'
import Compras from '../screens/Compras'
import CreateCompras from '../screens/CreateCompras'


export default function StackAuth() {
  const Stack = createNativeStackNavigator()
    return (
    

   <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
    <Stack.Screen name="SignIn" component={SingnIn}/>
        <Stack.Screen name="SignUp" component={SingUP}/>
       
   </Stack.Navigator>
    
  )
}

