import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { axiosClient } from "../api/axiosInstance";
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../context/ComprasContext"


export default function DetalleCompra(props) {

  const [repuestoName, setRepuestoName] = useState("");
  const navigation = useNavigation();
  const { anularCompra, anular, errors: comprasErrors, updateCompra } = useCompras()

  const getCompras = useCallback(async () => {
    try {
      const response = await axiosClient.get('/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const getCompra = async (id) => {
    try {
      const response = await axiosClient.get(`/compras/${id}`);
      // Si el repuesto es un array, establece el nombre del primer repuesto en el estado
      if (Array.isArray(response.data.repuestos) && response.data.repuestos.length > 0) {
        setRepuestoName(response.data.repuestos[0].nombre_repuesto);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Llama a la función getCompras al cargar el componente
    getCompras();
    getCompra(props.route.params.compraId);
  }, [getCompras, props.route.params.compraId]);

  const onSubmit = async (id) => {
    try {
      updateCompra(id)
      if (response) { // eliminar si quiere avanzar a compras
        anularCompra()

      }
      navigation.navigate('compras')
      Alert.alert("anulado")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <View>
      <Text>{comprasErrors.map((error, i) => (
        <Text style={styles.err} key={i}>
          <Text> {error}</Text>
        </Text>
      ))} </Text>
      <Text style={styles.titulo} >Detalle del producto</Text>

      <Text style={styles.sub}>Nombre: {repuestoName}</Text>

      <TouchableOpacity style={styles.BotonLista} onPress={() => onSubmit(props.route.params.compraId)}>
        <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20
  },
  sub: {
    fontSize: 16
  },
  err: {
    "backgroundColor": "red",
    "padding": 2,
    "color": "white"

  },

  TextoNombre: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',

  },
  BotonLista: {
    backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 3,
    padding: 5,
    marginTop: 5
  }
})
