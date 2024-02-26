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
        const repuestosData = response.data.filter(repuesto => repuesto.estado === "Activo"); // Filtrar por estado "Activo"
        setState((prevState) => ({
          ...prevState,
          repuestos: repuestosData,
        }));
      } catch (error) {
        if (error.response || error.response.status === 400  ) {
            alert("Usuario/Contraseña incorrecto");
        } else {
            console.error(error);
        }
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
      const expresion = /^[0-9]+$/;
      // Verificar si todos los campos están completos
      if (!state.proveedor || !state.codigo || !state.cantidad || !state.precio_unitario) {
        Alert.alert("Todos los campos son obligatorios");
        return;
      }
      // Verificar si la cantidad no es un número
      if (!expresion.test(state.cantidad)) {
        Alert.alert("Cantidad debe ser un número entero");
        return;
      }
      if (!expresion.test(state.precio_unitario)) {
        Alert.alert("Precio unitario debe ser un número entero");
        return;
      }
      // Filtra solo los repuestos seleccionados
      const repuestosSeleccionados = state.repuestos.filter(repuesto => repuesto.selected);
  
      // Verificar si se ha seleccionado al menos un repuesto
      if (repuestosSeleccionados.length === 0) {
        Alert.alert("Debe seleccionar al menos un repuesto");
        return;
      }
  
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
        Alert.alert("Compra guardada exitosamente");
      }
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      Alert.alert("Error al guardar la compra");
    }
  };
  

  const handleRepuestoSelection = (repuesto) => {
    // Desmarca todos los repuestos
    const repuestosDesmarcados = state.repuestos.map(r => ({
      ...r,
      selected: false,
    }));

    // Encuentra el repuesto seleccionado y márcalo
    const repuestosActualizados = repuestosDesmarcados.map(r => ({
      ...r,
      selected: r._id === repuesto._id ? true : r.selected,
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
          required // Campo requerido
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Codigo"
          onChangeText={(value) => handleChangeText(value, "codigo")}
          value={state.codigo}
          required // Campo requerido
        />
      </View>
      <View style={styles.inputgroup}>
        <View style={styles.list}>
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
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Cantidad"
          onChangeText={(value) => handleChangeText(value, "cantidad")}
          value={state.cantidad}
          required // Campo requerido
        />
      </View>
      <View style={styles.inputgroup}>
        <TextInput
          placeholder="Precio Unitario"
          onChangeText={(value) => handleChangeText(value, "precio_unitario")}
          value={state.precio_unitario}
          required // Campo requerido
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
  list: {
    maxHeight:100
  }
});
