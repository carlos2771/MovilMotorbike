import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { axiosClient } from "../../api/axiosInstance";
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../../context/ComprasContext";
import moment from 'moment';
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';

export default function DetalleCompra(props) {
  const navigation = useNavigation();
  const { errors: comprasErrors, updateCompra } = useCompras();
  const { compra } = props.route.params;
  const { _id: id, anulado, repuestos, proveedor, codigo, fecha } = compra;

  const onSubmit = async () => {
    try {
      Alert.alert('Anular compra', '¿Estas seguro que quieres anular esta compra?', [
        {
          text: 'Cancelar',
          onPress: () => Alert.alert("No se ha anulado"),
          style: 'cancel',
        },
        {text: 'Anular', onPress: () => {Alert.alert("Compra anulada con éxito"),updateCompra(id),  navigation.replace('Compras');}},
      ]);
    } catch (error) {
      console.error('Error al anular la compra:', error);
    }
  };

  return (
    <LinearGradient colors={['#1E293B', '#0f172a', '#1E293B']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-3`]}
    >
      <ScrollView contentContainerStyle={tw`w-full`}>
        <Text>
          {comprasErrors.map((error, i) => (
            <Text style={styles.errorText} key={i}>
              {error}
            </Text>
          ))}
        </Text>
        <Text style={tw`text-white text-xl text-center mb-2`}>Detalle de compra</Text>
        <View style={tw`bg-slate-700 p-5 rounded-lg shadow shadow-2xl shadow-blue-500`}>
          <View style={tw`mb-2`}>
          <Text style={tw`text-white text-lg`}>Fecha: {moment(fecha).format('YYYY-MM-DD')}</Text>
          <Text style={tw`text-white text-lg`}>Código: {codigo}</Text>
          <Text style={tw`text-white text-lg`}>Proveedor: {proveedor}</Text>
          
          <Text style={tw`text-white text-lg`}>Total: ${repuestos.reduce((acc, repuesto) => acc + repuesto.precio_total, 0)}</Text>
          </View>
          <Text style={tw`text-white text-lg mb-2`}>Repuestos:</Text>
          {repuestos.map((repuesto, index) => (
            <View key={index} style={tw`bg-slate-700 m-1 p-1 rounded border-2 border-blue-400 flex-row`}>
              <View style={tw`mr-auto`}>
                <Text style={tw`text-white font-black`}>{repuesto.nombre_repuesto}</Text>
                <Text style={tw`text-white`}>Cantidad:{repuesto.cantidad_repuesto}</Text>
              </View>
              <View style={tw``}>
              <Text style={tw`text-white`}>Precio Unitario: ${repuesto.precio_unitario}</Text>
              <Text style={tw`text-white`}>Precio Total: ${repuesto.precio_total}</Text>
              </View>
            </View>
          ))}
        </View>
        {!anulado ? (
          <TouchableOpacity style={tw`w-70 bg-indigo-600 py-2 px-2 text-center mx-auto mt-5 mb-4`} onPress={onSubmit}>
            <Text style={tw`text-center text-white text-lg`}>Anular Compra</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={tw`w-70 bg-orange-600 py-2 px-2 text-center mx-auto mt-5 mb-4`}>
            <Text style={tw`text-center text-white text-lg`}>Compra Anulada</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    width: "full"
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    backgroundColor: 'red',
    padding: 5,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
});
