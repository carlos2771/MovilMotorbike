import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList,TouchableOpacity } from 'react-native';
import { axiosClient } from '../api/axiosInstance';
import CardCompras from '../components/card/CardCompras';
import { useNavigation } from '@react-navigation/native';

export default function Compras({ navigation }) {
  const [compras, setCompras] = useState([]);

  const getCompras = useCallback(async () => {
    try {
      const response = await axiosClient.get('/compras');
      setCompras(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    // Llama a la función getCompras al cargar el componente
    getCompras();
  }, [getCompras]);

  useEffect(() => {
    // Configura un escuchador de enventos (event listener) para la emisión de eventos de recarga
    const reloadListener = navigation.addListener('focus', () => {
      // Cuando se enfoca en la pantalla, vuelve a cargar las compras
      getCompras();
    });

    // Devuelve una función de limpieza para eliminar el escuchador de eventos cuando el componente se desmonta
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

  return (
    <View style={styles.container}>
      <View>
        <Button title="Create Compras" onPress={goToCreateCompras} />
        <FlatList
          data={compras}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const namesArray = item.repuestos.map((i) => i.nombre_repuesto);
            const namesStringFormatted = namesArray.join(', ');
            console.log(namesArray.join(', '));
            return (
              <TouchableOpacity onPress={() => onPressItem(item._id)}>
                <CardCompras repuestos={namesStringFormatted} fechaCreacion={item.createdAt} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
        }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
