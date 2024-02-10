import React, { useEffect, useState,useCallback } from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert} from 'react-native'
import { axiosClient } from "../api/axiosInstance";
import { useNavigation } from '@react-navigation/native';

export default function DetalleCompra(props) {

  const [product, setCompras] = useState([])
  const navigation = useNavigation();

  console.log("las props",props);

  const getCompras = useCallback(async () => {
    try {
      const response = await axiosClient.get('/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
  const getCompra =async (id) => {
    try {
         await axiosClient.get(`/compras/${id}`); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Llama a la función getCompras al cargar el componente
    getCompras();
    getCompra();
  }, [getCompras]);

  const deleteCompra = async(id) => {
    try {
       await axiosClient.delete(`/compras/${id}`);
       navigation.navigate('compras')
       Alert.alert("eliminado con exito")
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const repuestos = Array.isArray(product) ? product.map(elemento => elemento.repuestos) : [];

  // Iterar sobre los arrays dentro de repuestos y obtener el nombre_repuesto de cada elemento
  const nombresRepuestos = repuestos.flatMap(arrayRepuestos => arrayRepuestos.map(repuesto => repuesto.nombre_repuesto));

  // Imprimir los nombres de los repuestos
  console.log(nombresRepuestos);

  return (
    <View>
      <Text style={styles.titulo} >Detalle del producto</Text>
      
        <Text style={styles.sub}>Nombre: {repuestos.flatMap(arrayRepuestos => arrayRepuestos.map(repuesto => repuesto.nombre_repuesto))}</Text>
       
      
      <TouchableOpacity style={styles.BotonLista} onPress={()=>deleteCompra(props.route.params. compraId)}>
         <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  titulo:{
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    fontSize:20
  },
  sub:{
    fontSize:16
  },
  
  TextoNombre:{
    fontSize:16,
    textAlign:'center',
    color:'white',
    
  },
  BotonLista:{
    backgroundColor:'red',
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
    marginBottom:3,
    padding:5,
    marginTop:5
  }
})