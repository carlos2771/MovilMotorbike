import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import tw from "twrnc";

const RepuestoCard = ({ repuesto, index }) => {
  return (
    <Card style={tw`bg-slate-600 mb-4`}>
      <Card.Content>
        <View style={tw`px-4`}>
            <View style={tw`flex-row`}>
                <Text style={tw`text-xl font-black text-white mr-auto`}>{repuesto.nombre_repuesto}</Text>
                <Text style={tw`text-lg text-white`}>Cantidad: {repuesto.cantidad_repuesto}</Text>
            </View>
            <View style={tw`flex-row`}>
            <Text style={tw`text-white mr-auto mt-1`}>Marca:</Text>
            <Text style={tw`text-white text-lg`}>{repuesto.marca_repuesto}</Text>
            </View>
            <View style={tw`flex-row`}>
            <Text style={tw`text-white mr-auto mt-1`}>Precio Unitario:</Text>
            <Text style={tw`text-white font-bold text-lg`}>{repuesto.precio_unitario}</Text>
            </View>
            <View style={tw`flex-row`}>
                <Text style={tw`text-white mr-auto mt-1`}>Precio Total:</Text>
                <Text style={tw`text-white font-bold text-xl`}>{repuesto.precio_total}</Text>
            </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#FEE2E2", // Cambia el color de fondo de la tarjeta según tus preferencias
    borderRadius: 8,
    elevation: 4, // Agrega sombra a la tarjeta
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default RepuestoCard;
