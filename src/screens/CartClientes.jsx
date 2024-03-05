import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { axiosClient } from "../api/axiosInstance";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import CardCompras from "../components/card/CardCompras";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

export default function CartClientes() {
  const [clientes, setClientes] = useState();

  const getCartClient = async () => {
    return await axiosClient
      .get("/cart-cliente")
      .then(({ data }) => setClientes(data))
      .catch((error) => console.error(error));
  };

  console.log("Compras1232345", clientes);

  useEffect(() => {
    getCartClient();
  }, []);
  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
      <View>
        <FlatList
          style={tw`w-full shadow-blue-600/40`}
          data={clientes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const namesArray = item.cart.map((i) => i.name);
            const namesStringFormatted = namesArray.join(", ");
            console.log(namesArray.join(", "));
            return (
              <CardCompras
                repuestos={namesStringFormatted}
                fechaCreacion={item.createdAt}
              />
            );
          }}
        />
      </View>
    </LinearGradient>
  );
}
