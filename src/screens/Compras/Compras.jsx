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


export default function Compras({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { errors: comprasErrors, anulado, getCompras, compras } = useCompras();

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


  const onSubmit = async () => {
    try {
      await updateCompra(id);
      navigation.navigate('compras');
      Alert.alert("Compra anulada con éxito");
    } catch (error) {
      console.error('Error al anular la compra:', error);
    }
  };
  
  // const filteredCompras = compras.filter((item) => {
  //   return item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
  // });


  const filteredCompras = compras.filter((item) => {
    return (
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(item.fecha).format("YYYY-MM-DD").includes(searchTerm.toLowerCase())
    );
  });
  


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
          { zIndex: 10 }, // Esto asegura que el botón esté sobre otros elementos
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
      />
    </LinearGradient>
  );
}


// Estilos para el recuadro de "Compras"
const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#fff", // Color de fondo del recuadro
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B", // Color del texto
  },
});