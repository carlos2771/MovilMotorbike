import React, { useEffect, useState, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    TextInput,
  } from "react-native";
import { useRepuestos } from '../context/RepuestosContext';

import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

export default function Repuestos() {
  const { repuestos, getRepuestos, deleteRepuesto, updateRepuesto } = useRepuestos();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getRepuestos();
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los repuestos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    let borderColor = item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity
        style={[tw`m-2  rounded p-3 border border-2`, borderColor ]}
      >
        <View style={tw`flex-row`}>
        <Text style={tw`text-white text-2xl mr-auto`}>{item.name}</Text>
        <Text style={tw`text-white text-xl`}>Cantidad: {item.amount}</Text>
        </View>
        <View style={tw`flex-row`}>
        <Text style={tw`text-white mr-auto`}>Marca: {item.marca.nombre_marca}</Text>
        <Text style={tw`text-white`}>Precio: {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
    <View style={tw`w-full`}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={repuestos}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    list: {
      flexGrow: 1,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });