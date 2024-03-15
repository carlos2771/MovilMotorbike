import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput
} from "react-native";
import { useMarcas } from "../../context/MarcasContext";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { useRepuestos } from "../../context/RepuestosContext"; // Importa el contexto de repuestos
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Marcas() {
  const { marcas, getMarcas } = useMarcas();
  const [loading, setLoading] = useState(true);
  const [expandedMarca, setExpandedMarca] = useState(null);
  const { repuestos, getRepuestos } = useRepuestos(); // Utiliza el hook de repuestos
  const [refreshing, setRefreshing] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMarcas();
        await getRepuestos(); // Obtén los repuestos al cargar las marcas
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const toggleAccordion = (marcaId) => {
    if (expandedMarca === marcaId) {
      setExpandedMarca(null);
    } else {
      setExpandedMarca(marcaId);
    }
  };

  const refreshScreen = () => {
    setRefreshing(true); // Establecer el estado de refresco en verdadero
    getMarcas();
    getRepuestos(); // Llamada para refrescar la pantalla
    setRefreshing(false); // Establecer el estado de refresco en falso cuando se complete la actualización
  };

  const filterMarcas = marcas.filter((marca) => {
    return (
      marca.nombre_marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (marca.repuestos && marca.repuestos.some((repuesto) =>
        repuesto.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  });
  

  const renderItem = ({ item }) => {
    let borderColor =
      item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity
        style={[tw`m-2  rounded p-3 border border-2`, borderColor]}
        onPress={() => toggleAccordion(item._id)}
      >
        <Text style={tw`text-white mx-auto`}>{item.nombre_marca}</Text>
        {expandedMarca === item._id && (
          <View style={styles.repuestosContainer}>
            <Text style={tw`text-white font-bold mb-2`}>Repuestos: </Text>
            <View style={tw`flex-row flex-wrap`}>
              {findRepuesto(item._id).map((repuesto, index) => (
                <Text key={index} style={tw`text-white mx-1 mb-1`}>
                  {repuesto}
                </Text>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const findRepuesto = (marcaId) => {
    const repuestosMarca = repuestos.filter(
      (repuesto) => repuesto.marca._id === marcaId
    );
    return repuestosMarca.map((repuesto) => repuesto.name);
  };
  
  

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={tw`flex-1 items-center p-6`}
    >
      <View style={tw`w-full mb-10`}>
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
          <Text style={styles.loading}>Cargando...</Text>
        ) : (
          <FlatList
            data={filterMarcas}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={tw`text-white`}
            refreshControl={ // Agrega RefreshControl para habilitar el pull-to-refresh
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshScreen}
                colors={["#1E293B"]} // Colores del indicador de carga
                progressBackgroundColor="#FFFFFF" // Color de fondo del indicador de carga
              />
            }
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ 
  loading: {
    color: "#fff",
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  repuestosContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  repuestoText: {
    color: "#fff",
    marginBottom: 5,
  },
});
