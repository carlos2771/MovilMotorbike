import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useMarcas } from "../context/MarcasContext";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";

import tw from 'twrnc'

export default function Marcas() {
  const { marcas, getMarcas } = useMarcas();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMarcas();
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    let borderColor = item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity  style={[tw`m-2  rounded p-3 border border-2`, borderColor ]}>
        <View style={tw`flex-row`}>
        <Text style={tw`text-white mx-auto`}>{item.nombre_marca}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loading}>Cargando...</Text>
        ) : (
          <FlatList
            data={marcas}
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
  gradient: {
    flex: 1,
    alignItems: "center",
    padding: 4,
  },
  container: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  icon: {
    color: "#fff",
    marginRight: 10,
  },
  loading: {
    color: "#fff",
    textAlign: "center",
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
  text: {
    color: "#000",
  },
});
