import React from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert } from 'react-native'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

import { useCompras } from "../../context/ComprasContext";


import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faShoppingCart,
  faBan,faLock 
} from "@fortawesome/free-solid-svg-icons";

export default function CardCompras({id,repuestos,fechaCreacion, proveedor, total, fecha, codigo, anulado, onPressAnular}) {
  let borderColor = anulado === true ? tw`border-red-500` : tw`border-blue-500`;
  
  const { errors: comprasErrors, updateCompra } = useCompras();
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      await updateCompra(id);
      Alert.alert("Compra anulada con éxito");
      navigation.replace('Compras');
    } catch (error) {
      console.error('Error al anular la compra:', error);
    }
  };

  const yaAnulada = async () => {
      Alert.alert("Esta compra ya esta anulada")
  }

  return (
    <View style={[tw`m-2  rounded p-3 border border-2`, borderColor ]}>
      <View style={tw`flex-row`}>
        <Text style={tw`text-white mr-auto`}>Codigo:{codigo}</Text>
        <Text style={tw`text-white`}>Proveedor:{proveedor}</Text>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw`text-white mr-auto`}>Fecha:{fecha}</Text>
        <Text style={tw`text-white text-lg`}>Total:{total}</Text>
      </View>
      <View style={tw`items-center pt-2`}>
      {anulado ? (
        <TouchableOpacity style={tw` w-16 p-2 border-2 border-red-500 rounded-full items-center justify-center`}>
        <Text style={tw`text-white`} onPress={yaAnulada}><FontAwesomeIcon icon={faLock} style={tw`text-white`}/></Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={tw` w-16 p-2  border-2 border-indigo-500 rounded-full items-center justify-center`}>
        <Text onPress={onSubmit}><FontAwesomeIcon icon={faBan} style={tw`text-white`}/></Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}