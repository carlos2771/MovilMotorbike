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
      await updateCompra(id);
      navigation.navigate('compras');
      Alert.alert("Compra anulada con éxito");
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
        <Text style={tw`text-white text-3xl`}>Detalle de compra</Text>
        <View style={tw`bg-slate-700 p-10 rounded-lg shadow shadow-2xl shadow-blue-500`}>
          <View style={tw`mb-2`}>
          <Text style={tw`text-white text-lg`}>Fecha: {moment(fecha).format('YYYY-MM-DD')}</Text>
          <Text style={tw`text-white text-lg`}>Código: {codigo}</Text>
          <Text style={tw`text-white text-lg`}>Proveedor: {proveedor}</Text>
          
          <Text style={tw`text-white text-lg`}>Total: ${repuestos.reduce((acc, repuesto) => acc + repuesto.precio_total, 0)}</Text>
          </View>
          <Text style={tw`text-white text-lg`}>Repuestos:</Text>
          {repuestos.map((repuesto, index) => (
            <View key={index} style={tw`bg-slate-600 mb-3 p-2 rounded border-2 border-blue-400`}>
              <Text style={tw`text-white text-lg`}>Nombre: {repuesto.nombre_repuesto}</Text>
              <Text style={tw`text-white text-lg`}>Cantidad: {repuesto.cantidad_repuesto}</Text>
              <Text style={tw`text-white text-lg`}>Precio Unitario: ${repuesto.precio_unitario}</Text>
              <Text style={tw`text-white text-lg`}>Precio Total: ${repuesto.precio_total.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        {!anulado ? (
          <TouchableOpacity style={tw`w-70 bg-indigo-600 py-2 px-2 text-center mx-auto mt-5`} onPress={onSubmit}>
            <Text style={tw`text-center text-white text-lg`}>Anular Compra</Text>
          </TouchableOpacity>
        ) : (
          <Text style={tw`text-center text-white text-lg bg-orange-500 py-2 px-2 w-59`}>Compra Anulada</Text>
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
