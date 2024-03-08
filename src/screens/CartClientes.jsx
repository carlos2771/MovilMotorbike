import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

import { useClientes } from '../context/ClienteContext';

export default function Clientes() {
  const { clientes, getClientes, getCliente, updateCliente } = useClientes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await getClientes();
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const borderColor = item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity style={[tw`m-2 rounded p-3 border border-2`, borderColor ]}>
        
          <Text style={tw`text-white text-2xl mr-auto`}>{item.nombre_cliente}</Text>
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
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList
            data={clientes}
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
