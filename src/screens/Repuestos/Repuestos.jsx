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
import { useRepuestos } from '../../context/RepuestosContext';

import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export default function Repuestos() {
  const { repuestos, getRepuestos, deleteRepuesto, updateRepuesto } = useRepuestos();
  const [searchTerm, setSearchTerm] = useState("");
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

  const filterRepuestos = repuestos.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marca.nombre_marca.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

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
    <View
        style={tw`w-full flex-row justify-between mb-4 items-center border border-white rounded px-2 pl-5`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} style={tw`text-white`} />
        <TextInput
          style={tw`h-10 text-white w-full ml-2`}
          placeholder=" Buscar"
          placeholderTextColor="white"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View> 
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={filterRepuestos}
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