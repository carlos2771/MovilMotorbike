import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useClientes } from "../../context/ClienteContext";


import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export default function Clientes() {
  const { clientes, getClientes, getCliente, updateCliente } = useClientes();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await getClientes();
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      setLoading(false);
    }
  };

  const filterClientes = clientes.filter((item) => {
    return (
      item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.telefono_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sexo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  


  const renderItem = ({ item }) => {
    const borderColor =
      item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity
        style={[tw`m-2 rounded p-3 border border-2`, borderColor]}
      >
        <Text style={tw`text-white text-2xl mr-auto`}>
          {item.nombre_cliente}
        </Text>
        <Text style={tw`text-white`}>Tipo: {item.tipo}</Text>
        <Text style={tw`text-white`}>Cédula: {item.cedula}</Text>
        <Text style={tw`text-white`}>Email: {item.email_cliente}</Text>
        <View style={tw`flex-row`}>
          <Text style={tw`text-white`}>Teléfono: {item.telefono_cliente}</Text>
        </View>
        <View style={tw`flex-row`}>
          <Text style={tw`text-white mr-auto`}>Sexo: {item.sexo}</Text>
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
            data={filterClientes}
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
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
    fontWeight: "bold",
    marginBottom: 10,
  },
});
