import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/screens/SingIn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Compras from "./src/screens/Compras";
import { useState } from "react";
import StackAuth from "./src/navigation/StackAuth";
import AuthProvider from "./src/context/AuthProvider";
import Main from "./Main";
import { CompraProvider } from "./src/context/ComprasContext";
import { RepuestoProvider } from "./src/context/RepuestosContext";
import { MarcaProvider } from "./src/context/MarcasContext";
import { ClienteProvider } from "./src/context/ClienteContext";

export default function App() {
  return (
    <AuthProvider>
      <CompraProvider>
        <RepuestoProvider>
          <MarcaProvider>
            <ClienteProvider>
              <Main />
            </ClienteProvider>
          </MarcaProvider>
        </RepuestoProvider>
      </CompraProvider>
    </AuthProvider>
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
