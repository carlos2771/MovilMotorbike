import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, TouchableOpacity, Alert, Dimensions, TextInput } from 'react-native';
import { axiosClient } from '../api/axiosInstance';
import CardCompras from '../components/card/CardCompras';
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../context/ComprasContext";
import moment from 'moment';
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';


export default function Compras({ navigation }) {
 
  const [searchTerm, setSearchTerm] = useState('');
  const { errors: comprasErrors, anulado, getCompras, compras } = useCompras();

  // const getCompras = useCallback(async () => {
  //   try {
  //     const response = await axiosClient.get('/compras');
  //     setCompras(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }, []);
  console.log("lass compras",compras);

 
  useEffect(() => {
    const reloadListener = navigation.addListener('focus', () => {
      getCompras();
    });
    console.log("oeoeoeoe");
    return () => {
      reloadListener();
    };
  }, [navigation, getCompras]);

  const onPressItem = (item) => {
    navigation.navigate("detalle", {compra: {...item} } );
  };

  const goToCreateCompras = () => {
    navigation.navigate('createCompras');
  };

  const filteredCompras = compras.filter(item => {
    return item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
  });

    return (
      <LinearGradient colors={['#1E293B', '#0f172a', '#1E293B']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
        <View style={tw`w-full flex-row justify-between mb-4`}>
        <TextInput
            style={tw`h-10 border border-white rounded px-2 text-white w-40`}
            placeholder="Codigo..."
            placeholderTextColor="white"
            onChangeText={text => setSearchTerm(text)}
            value={searchTerm}
          />

          <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-sky-500 mr-5`} onPress={goToCreateCompras}><Text style={tw`text-center mt-1 text-white font-semibold text-xl`}>+</Text></TouchableOpacity>
          
        </View>
        <Text>{comprasErrors.map((error, i) => (
          <Text style={tw`bg-red-500 p-2 text-white`} key={i}>
            {error}
          </Text>
        ))}</Text>
        <FlatList
          style={tw`w-full shadow-blue-600/40`}
          data={filteredCompras}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => {
            const namesArray = item.repuestos.map((i) => i.nombre_repuesto);
            const namesStringFormatted = namesArray.join(', ');
            const namesArray2 = item.repuestos.map((i) => i.precio_total);
            const namesStringFormatted2 = namesArray2.join(', ');
            return (
              <TouchableOpacity onPress={() => onPressItem(item)}>
                <CardCompras
                  codigo={item.codigo}
                  proveedor={item.proveedor}
                  total={namesStringFormatted2}
                  fecha={moment(item.fecha).format('YYYY-MM-DD')}
                  repuestos={namesStringFormatted}
                />
              </TouchableOpacity>
            );
          }}
        />
      </LinearGradient>
    );
  }