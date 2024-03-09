import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/screens/SingIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compras from "./src/screens/Compras/Compras";
import { useContext, useState } from "react";
import StackAuth from "./src/navigation/StackAuth";
import AuthProvider, { AuthContext } from "./src/context/AuthProvider";
import DrawerAppNavigation from "./src/navigation/DrawerAppNavigation";
import MyTabs from "./src/navigation/MaterialBottomTabNavigator";
import Navigation from "./src/navigation/navigation";

export default function Main() {
    const {auth } = useContext(AuthContext) 
  return (
   
      <NavigationContainer>
     {auth ? <MyTabs/> : <StackAuth/>}
     
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
