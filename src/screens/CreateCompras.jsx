import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  DatePickerIOS,
  Alert
} from "react-native";
import axios from "axios";
import { axiosClient } from "../api/axiosInstance";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


export default function CreateCompras() {
  const initialState = {
    repuestos: [], // Ahora es un array de objetos
    proveedor: "",
    codigo: "",
    cantidad: "",
    precio_unitario: "",
    fecha: new Date(),
  };
  const [state, setState] = useState(initialState);
  const [selectedRepuesto, setSelectedRepuesto] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/repuestos");
        const repuestosData = response.data;
        setState((prevState) => ({
          ...prevState,
          repuestos: repuestosData,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || state.fecha;
    setState({
      ...state,
      fecha: currentDate,
      showDatePicker: false,
    });
  };

  const showDatePicker = () => {
    setState({ ...state, showDatePicker: true });
  };

  const saveProduct = async () => {
    try {
      // Filtra solo los repuestos seleccionados
      const repuestosSeleccionados = state.repuestos.filter(repuesto => repuesto.selected);

      // Crea un nuevo array con la información necesaria para el backend
      const repuestosParaEnviar = repuestosSeleccionados.map(repuesto => ({
        repuesto: repuesto._id, // _id es el identificador único del repuesto en MongoDB
        nombre_repuesto: repuesto.name,
        cantidad_repuesto: state.cantidad,
        precio_unitario: state.precio_unitario,
        precio_total: state.precio_unitario * state.cantidad,
        // Puedes agregar más campos según lo que necesite tu backend
      }));

      const datosParaEnviar = {
        repuestos: repuestosParaEnviar,
        proveedor: state.proveedor,
        codigo: state.codigo,
        fecha: state.fecha,
      };

      const response = await axiosClient.post("/compras", datosParaEnviar);
      console.log("Producto guardado:", response.data);

      if(response){
        navigation.navigate('compras');
        setState(initialState);
        Alert.alert("agregado")
      }

    
    } catch (error) {
      console.error("Error al guardar la compra:", error);
    }
  };

  const handleRepuestoSelection = (repuesto) => {
    // Actualiza el estado para marcar/desmarcar el repuesto
    const repuestosActualizados = state.repuestos.map(r => ({
      ...r,
      selected: r._id === repuesto._id ? !r.selected : r.selected,
    }));
    setState({ ...state, repuestos: repuestosActualizados });
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Crear Compra</Text>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Proveedor"
          onChangeText={(value) => handleChangeText(value, "proveedor")}
          value={state.proveedor}
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Codigo"
          onChangeText={(value) => handleChangeText(value, "codigo")}
          value={state.codigo}
        />
      </View>
      <View style={styles.inputgroup}>
        <Text>Repuestos disponibles:</Text>
        <FlatList
          data={state.repuestos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text
              style={{
                color: item.selected ? "blue" : "black",
                fontWeight: item.selected ? "bold" : "normal",
              }}
              onPress={() => handleRepuestoSelection(item)}
            >
              {item.name}
            </Text>
          )}
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Cantidad"
          onChangeText={(value) => handleChangeText(value, "cantidad")}
          value={state.cantidad}
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Precio Unitario"
          onChangeText={(value) => handleChangeText(value, "precio_unitario")}
          value={state.precio_unitario}
        />
      </View>
      <View style={styles.inputgroup}>
        <Text>Fecha seleccionada: {state.fecha.toDateString()}</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
        {state.showDatePicker && (
          <DateTimePicker
            value={state.fecha}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View>
        <Button title="Guardar Producto" onPress={saveProduct} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputgroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
