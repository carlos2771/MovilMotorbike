import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import axios from "axios";
import { axiosClient } from "../../api/axiosInstance";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { useCompras } from "../../context/ComprasContext";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

import { format } from 'date-fns';

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
  const [handleRepuestos, setHandleRepuestos] = useState([])
  const [isTypingProveedor, setIsTypingProveedor] = useState(false); // Nuevo estado
  const navigation = useNavigation();
  const { errors: comprasErrors, anulado, getCompras, compras } = useCompras();
  const [buttonHidden, setButtonHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/repuestos");
        const repuestosData = response.data.filter(
          (repuesto) => repuesto.estado === "Activo"
        ); // Filtrar por estado "Activo"
        setState((prevState) => ({
          ...prevState,
          repuestos: repuestosData,
        }));
      } catch (error) {
        if (error.response || error.response.status === 400) {
          alert("Usuario/Contraseña incorrecto");
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      getCompras();
    } catch (error) {
      console.log(error, "error de compras ");
    }
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
      if (
        !state.proveedor ||
        !state.codigo ||
        !state.cantidad ||
        !state.precio_unitario
      ) {
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
      const repuestosSeleccionados = state.repuestos.filter(
        (repuesto) => repuesto.selected
      );

      // Verificar si se ha seleccionado al menos un repuesto
      if (repuestosSeleccionados.length === 0) {
        Alert.alert("Debe seleccionar al menos un repuesto");
        return;
      }
      setButtonHidden(true);
      // Crea un nuevo array con la información necesaria para el backend
      const repuestosParaEnviar = repuestosSeleccionados.map((repuesto) => ({
        repuesto: repuesto._id, // _id es el identificador único del repuesto en MongoDB
        nombre_repuesto: repuesto.name,
        cantidad_repuesto: state.cantidad,
        precio_unitario: state.precio_unitario,
        precio_total: state.precio_unitario * state.cantidad,
        nombre_marca: repuesto.nombre_marca
        // Puedes agregar más campos según lo que necesite tu backend
      }));


      const datosParaEnviar = {
        repuestos: handleRepuestos,
        proveedor: state.proveedor,
        codigo: state.codigo,
        fecha: state.fecha,
      };

      const response = await axiosClient.post("/compras", datosParaEnviar);
      console.log("Producto guardado:", response.data);

      if (response) {
        navigation.navigate("comprasStack");
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
    const repuestosDesmarcados = state.repuestos.map((r) => ({
      ...r,
      selected: false,
    }));

    // Encuentra el repuesto seleccionado y márcalo
    const repuestosActualizados = repuestosDesmarcados.map((r) => ({
      ...r,
      selected: r._id === repuesto._id ? true : r.selected,
    }));

    setState({ ...state, repuestos: repuestosActualizados });
  };

  // Filtra los proveedores únicos
  const proveedoresUnicos = Array.from(
    new Set(compras.map((proveedor) => proveedor.proveedor))
  );
  const addRepuestos = () =>{
    const repuestosSeleccionados = state.repuestos.filter(
      (repuesto) => repuesto.selected
    );
    if (repuestosSeleccionados.length === 0) {
      Alert.alert("Debe seleccionar al menos un repuesto");
      return;
    }
    const nuevosRepuestos = repuestosSeleccionados.map((repuesto) => ({
      repuesto: repuesto._id, // _id es el identificador único del repuesto en MongoDB
      nombre_repuesto: repuesto.name,
      cantidad_repuesto: state.cantidad,
      precio_unitario: state.precio_unitario,
      precio_total: state.precio_unitario * state.cantidad,
      marca_repuesto: repuesto.nombre_marca
      // Puedes agregar más campos según lo que necesite tu backend
    }));
    const repuestosPrevios = [...handleRepuestos, ...nuevosRepuestos];
    setHandleRepuestos(repuestosPrevios)
    console.log("repuesto guardados",repuestosPrevios);
  }

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
      <ScrollView style={tw`flex-1 text-center`}>
        <Text style={tw`text-3xl text-white text-center`}>Crear Compra</Text>

        <View style={styles.inputgroup}>
          {isTypingProveedor ? (
            <TextInput
              placeholder="Proveedor"
              placeholderTextColor="white"
              onChangeText={(value) => handleChangeText(value, "proveedor")}
              value={state.proveedor}
              style={tw`text-lg text-white`}
            />
          ) : (
            <SelectDropdown
              style={tw`text-lg text-white`}
              data={proveedoresUnicos}
              defaultButtonText="Seleccione proveedor"
              onSelect={(selectedItem, index) =>
                handleChangeText(selectedItem, "proveedor")
              }
            />
          )}
          <TouchableOpacity
            onPress={() => setIsTypingProveedor(!isTypingProveedor)}
          >
            <Text style={tw`text-white`}>
              {isTypingProveedor ? "Seleccionar de la lista" : "Escribir nuevo"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Codigo"
            placeholderTextColor="white"
            onChangeText={(value) => handleChangeText(value, "codigo")}
            value={state.codigo}
            style={tw`text-lg text-white`}
            required // Campo requerido
          />
        </View>
        <View style={styles.inputgroup}>
          <SelectDropdown
            style={{ fontSize: 16 }}
            data={state.repuestos.map((repuesto) => repuesto.name)}
            onSelect={(selectedItem, index) =>
              handleRepuestoSelection(state.repuestos[index])
            }
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return <Text>{item}</Text>;
            }}
            defaultButtonText="Seleccione repuesto"
          />
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Cantidad"
            placeholderTextColor="white"
            onChangeText={(value) => handleChangeText(value, "cantidad")}
            value={state.cantidad}
            style={tw`text-lg text-white`}
            required // Campo requerido
          />
        </View>
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Precio Unitario"
            placeholderTextColor="white"
            onChangeText={(value) =>
              handleChangeText(value.replace(/[^0-9]/g, ""), "precio_unitario")
            }
            value={state.precio_unitario}
            style={tw`text-lg text-white`}
            required // Campo requerido
            keyboardType="numeric" // Solo permite números
          />
        </View>
        <View
          style={[
            styles.inputgroup,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <Text style={[tw`text-lg text-white`, { flex: 1 }]}>
            Fecha seleccionada: {'\n'} {format(state.fecha, "dd/MM/yyyy")}
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.buttonText}>
              <AntDesign name="calendar" style={styles.date} />
            </Text>
          </TouchableOpacity>
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
          <Button onPress={addRepuestos} title="add Repuesto"></Button>
        </View>
        <View>
          <Text> Repuestos en vivo {JSON.stringify(handleRepuestos)}</Text>
        </View>
        <View>
          {buttonHidden ? (
            <Text>Cargando..</Text>
          ) : (
            <Button title="Guardar Producto" onPress={saveProduct} />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 35,
    
   
  },
  inputgroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    width: 250,
  },
  signupText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  dateButton: {
    borderRadius: 20, // Define el radio del botón para que sea redondo
    width: 90,
  },
  buttonText: {
    fontSize: 37,
    color: "white",
  },
  date: { fontSize: 30, color: "white" },
});
