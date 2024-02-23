import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, TouchableOpacity, Alert, Dimensions, TextInput } from 'react-native';
import { axiosClient } from '../api/axiosInstance';
import CardCompras from '../components/card/CardCompras';
import { useNavigation } from '@react-navigation/native';
import { useCompras } from "../context/ComprasContext";
import moment from 'moment';

export default function Compras({ navigation }) {
  const [compras, setCompras] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { errors: comprasErrors, anulado } = useCompras();

  const getCompras = useCallback(async () => {
    try {
      const response = await axiosClient.get('/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    getCompras();
  }, [getCompras]);

  useEffect(() => {
    const reloadListener = navigation.addListener('focus', () => {
      getCompras();
    });

    return () => {
      reloadListener();
    };
  }, [navigation, getCompras]);

  const onPressItem = (compraId) => {
    navigation.navigate("detalle", { compraId });
  };

  const goToCreateCompras = () => {
    navigation.navigate('createCompras');
  };

  const filteredCompras = compras.filter(item => {
    return item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Create Compras" onPress={goToCreateCompras} />
      <TextInput
        style={styles.searchInput}
        placeholder="Codigo..."
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      </View>
      <View>
        <Text>{comprasErrors.map((error, i) => (
          <Text style={styles.err} key={i}>
            <Text> {error}</Text>
          </Text>
        ))} </Text>
        <FlatList
          style={styles.cart}
          data={filteredCompras}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => {
            const namesArray = item.repuestos.map((i) => i.nombre_repuesto);
            const namesStringFormatted = namesArray.join(', ');
            const namesArray2 = item.repuestos.map((i) => i.precio_total);
            const namesStringFormatted2 = namesArray2.join(', ');
            return (
              <TouchableOpacity onPress={() => onPressItem(item._id)}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  err: {
    backgroundColor: "red",
    padding: 2,
    color: "white"
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: 10,
    
  },

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 100,
    marginLeft:270,
    marginTop:5
  },
});
