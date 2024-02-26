import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { axiosClient } from "../api/axiosInstance";
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../context/ComprasContext";
import moment from 'moment';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        {comprasErrors.map((error, i) => (
          <Text style={styles.errorText} key={i}>
            {error}
          </Text>
        ))}
      </Text>
      <Text style={styles.title}>Detalle del producto</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Código: {codigo}</Text>
        <Text style={styles.detailText}>Proveedor: {proveedor}</Text>
        <Text style={styles.detailText}>Fecha: {moment(fecha).format('YYYY-MM-DD')}</Text>
        <Text style={styles.detailText}>Total: {repuestos.map((i) => i.precio_total).join(', ')}</Text>
        <Text style={styles.detailText}>Repuestos: {repuestos.map((i) => i.nombre_repuesto).join(', ')}</Text>
      </View>
      {!anulado ? (
        <TouchableOpacity style={styles.deleteButton} onPress={onSubmit}>
          <Text style={styles.deleteButtonText}>Anular Compra</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.deletedText}>Compra Anulada</Text>
      )}
    </ScrollView>
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
