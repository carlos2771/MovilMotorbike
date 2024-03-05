import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { axiosClient } from "../api/axiosInstance";
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../context/ComprasContext";
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
      style={[tw`flex-1 items-center p-4`]}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        {comprasErrors.map((error, i) => (
          <Text style={styles.errorText} key={i}>
            {error}
          </Text>
        ))}
      </Text>
      <Text style={tw`text-white text-3xl`}>Detalle de compra</Text>
      <View style={tw`bg-slate-700 p-10 m-5 rounded-lg shadow shadow-2xl shadow-blue-500`}>
        <Text style={tw`text-white text-lg`}>Código: {codigo}</Text>
        <Text style={tw`text-white text-lg`}>Proveedor: {proveedor}</Text>
        <Text style={tw`text-white text-lg`}>Fecha: {moment(fecha).format('YYYY-MM-DD')}</Text>
        <Text style={tw`text-white text-lg`}>Total: {repuestos.map((i) => i.precio_total).join(', ')}</Text>
        <Text style={tw`text-white text-lg`}>Repuestos: {repuestos.map((i) => i.nombre_repuesto).join(', ')}</Text>
      </View>
      {!anulado ? (
        <TouchableOpacity style={tw`w-59 bg-indigo-600 py-2 px-2 text-center`} onPress={onSubmit}>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
  deleteButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deletedText: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: "#ED8936",
    fontSize: 16,
    textAlign: 'center',
    
  },
});
