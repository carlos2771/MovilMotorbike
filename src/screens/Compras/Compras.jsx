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
  RefreshControl
} from "react-native";
import { axiosClient } from "../../api/axiosInstance";
import CardCompras from "../../components/card/CardCompras";
import { useNavigation } from "@react-navigation/native";
import { useCompras } from "../../context/ComprasContext";
import moment from "moment";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import SweetAlert from 'react-native-sweet-alert';


export default function Compras({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { errors: comprasErrors, anulado, getCompras, compras } = useCompras();

  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el estado de refresco

  // const getCompras = useCallback(async () => {
  //   try {
  //     const response = await axiosClient.get('/compras');
  //     setCompras(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }, []);

  
  useEffect(() => {
    const reloadListener = navigation.addListener("focus", () => {
      getCompras();
    });
    return () => {
      reloadListener();
    };
  }, [navigation, getCompras]);

  const onPressItem = (item) => {
    navigation.navigate("detalle", { compra: { ...item } });
  };

  const goToCreateCompras = () => {
    navigation.navigate("createCompras");
  };


  const refreshScreen = () => {
    setRefreshing(true); // Establecer el estado de refresco en verdadero
    getCompras(); // Llamada para refrescar la pantalla
    setRefreshing(false); // Establecer el estado de refresco en falso cuando se complete la actualización
  };



  const calculateTotalSum = (repuestos) => {
    return repuestos.reduce((acc, repuesto) => acc + repuesto.precio_total, 0);
  };
  
  const filteredCompras = compras.map((item) => ({
    ...item,
    total: calculateTotalSum(item.repuestos),
  })).filter((item) => (
    item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moment(item.fecha).format("YYYY-MM-DD").includes(searchTerm.toLowerCase()) ||
    item.total.toString().includes(searchTerm) // Busca el término en la suma total
  ));
  
  
  


  return (
    <LinearGradient
    colors={["#1E293B", "#0f172a", "#1E293B"]}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    style={[tw`flex-1 items-center p-4`]}
  >
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
    <TouchableOpacity
      style={[
        tw`w-10 h-10 rounded-full bg-sky-500 items-center justify-center absolute bottom-5 right-5`,
        { zIndex: 10 },
      ]}
      onPress={goToCreateCompras}
    >
      <Text style={tw`text-white font-semibold text-xl`}>
        <FontAwesomeIcon icon={faPlus} style={tw`text-white`} />
      </Text>
    </TouchableOpacity>
    <Text>
      {comprasErrors.map((error, i) => (
        <Text style={tw`bg-red-500 p-2 text-white`} key={i}>
          {error}
        </Text>
      ))}
    </Text>
    <FlatList
      style={tw`w-full shadow-blue-600/40`}
      data={filteredCompras}
      keyExtractor={(item) => item._id}
      numColumns={1}
      renderItem={({ item }) => {
        const namesArray = item.repuestos.map((i) => i.nombre_repuesto);
        const namesStringFormatted = namesArray.join(", ");
        const namesArray2 = item.repuestos.map((i) => i.precio_total);
        let totalSuma=0,numeros = namesArray2;
        for(let i = 0; i < numeros.length; i++) totalSuma+=numeros[i];
        const SumaTotales = totalSuma
        const namesStringFormatted2 = namesArray2.join(", ");
        return (
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <CardCompras
              id={item._id}
              codigo={item.codigo}
              proveedor={item.proveedor}
              total={SumaTotales}
              fecha={moment(item.fecha).format("YYYY-MM-DD")}
              repuestos={namesStringFormatted}
              anulado={item.anulado}
            />
            
          </TouchableOpacity>
        );
      }}
      refreshControl={ // Agrega refreshControl para habilitar el pull-to-refresh
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshScreen}
          colors={["#1E293B"]} // Colores del indicador de carga
          progressBackgroundColor="#FFFFFF" // Color de fondo del indicador de carga
        />
      }
    />
  </LinearGradient>
);
}