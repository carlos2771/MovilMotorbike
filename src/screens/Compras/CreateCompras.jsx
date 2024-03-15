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
import RepuestoCard from "../../components/card/RepuestoCard"; // Asegúrate de importar el componente RepuestoCard
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

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
  const [handleRepuestos, setHandleRepuestos] = useState([]);
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
    if (name === "cantidad" || name==="precio_unitario") {
      // Eliminar los ceros a la izquierda del valor antes de asignarlo al estado
      value = value.replace(/^0+/, '');
    }
    setState({ ...state, [name]: value });
  };
  

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || state.fecha;
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 15); // Resta 15 días a la fecha actual
  
    // Obtiene la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece las horas a 00:00:00 para comparar solo las fechas
  
    // Verifica si la fecha seleccionada está dentro del rango permitido y es igual al día actual o anterior
    if (currentDate <= today && currentDate >= maxDate) {
      setState({
        ...state,
        fecha: currentDate,
        showDatePicker: false,
      });
    } else {
      // Si la fecha seleccionada excede el límite o es posterior al día actual, muestra una alerta
      Alert.alert("fecha invalida");
    }
  };
  
  

  const showDatePicker = () => {
    setState({ ...state, showDatePicker: true });
  };

  const saveProduct = async () => {
    try {
      const expresion = /^[0-9]+$/;
      // Verificar si todos los campos están completos
      if (!state.proveedor || !state.codigo) {
        Alert.alert("Todos los campos son obligatorios");
        return;
      }
      // Verificar si la cantidad no es un número
      // Filtra solo los repuestos seleccionados
      const repuestosSeleccionados = state.repuestos.filter(
        (repuesto) => repuesto.selected
      );

      if (handleRepuestos.length === 0) {
        Alert.alert("Debe agregar el repuesto a la compra");
        return;
      }
      setButtonHidden(true);
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
    }) );

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

  const addRepuestos = () => {
    const expresion = /^[0-9]+$/;
    const repuestosSeleccionados = state.repuestos.filter(
      (repuesto) => repuesto.selected
    );
    if (repuestosSeleccionados.length === 0) {
      Alert.alert("Debe seleccionar al menos un repuesto");
      return;
    }
    if (!expresion.test(state.cantidad) || state.cantidad <= 0) {
      Alert.alert("Cantidad no puede estar vacio y mayor a 0");
      return;
    }
    if (!expresion.test(state.precio_unitario) || state.precio_unitario <= 0) {
      Alert.alert("Precio unitario no puede estar vacio entero y mayor a 0");
      return;
    }
    const nuevosRepuestos = repuestosSeleccionados.map((repuesto) => ({
      repuesto: repuesto._id, // _id es el identificador único del repuesto en MongoDB
      nombre_repuesto: repuesto.name,
      cantidad_repuesto: state.cantidad,
      precio_unitario: state.precio_unitario,
      precio_total: state.precio_unitario * state.cantidad,
      marca_repuesto: repuesto.nombre_marca,
      // Puedes agregar más campos según lo que necesite tu backend
    }));
    const repuestosPrevios = [...handleRepuestos, ...nuevosRepuestos];
    setHandleRepuestos(repuestosPrevios);
    setState({
      ...state,
      cantidad: "",
      precio_unitario: "",
      nombre_repuesto: "",
      name: "",
    });
    console.log("repuesto guardados", repuestosPrevios);

    
  };

  const totalPreciosRepuestos = handleRepuestos.reduce((total, repuesto) => {
    return total + repuesto.precio_total;
  }, 0);

  const deleteItem = (index) => {
    const newRepuestos = [...handleRepuestos]; // disperso los repuestos para que se mantengan despues de eliminarlos 
    newRepuestos.splice(index, 1); // paso el indice para eliminar los repuestos
    
    setHandleRepuestos(newRepuestos); // y actualizo los repuestos
    
    console.log("nuevos repestos", newRepuestos);
    console.log("nuevos repuesotsssss", handleRepuestos);
  };

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
      <ScrollView style={tw`flex-1 text-center`}>
        <Text style={tw`text-xl text-white text-center`}>Crear Compra</Text>
        <View style={tw`bg-slate-600 p-5 mb-4 rounded`}>
          <View
            style={[
              styles.inputgroup,
              { flexDirection: "row", alignItems: "center" },
              tw``,
            ]}
          >
            <Text style={[tw`text-lg text-white`, { flex: 1 }]}>
              Fecha seleccionada: {"\n"} {format(state.fecha, "dd/MM/yyyy")}
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
                buttonStyle={styles.buttonStyle}
                buttonTextStyle={styles.buttonTextStyle}
                dropdownStyle={styles.dropdownStyle}
              />
            )}
            <TouchableOpacity
              onPress={() => setIsTypingProveedor(!isTypingProveedor)}
            >
              <Text style={tw`text-white`}>
                {isTypingProveedor
                  ? "Seleccionar de la lista"
                  : "Escribir nuevo"}
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
        </View>
        <View style={tw`bg-slate-600 p-5 mb-4 rounded`}>
          <View>
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
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
          <View style={styles.inputgroup}>
            <TextInput
              placeholder="Cantidad"
              placeholderTextColor="white"
              onChangeText={(value) =>
                handleChangeText(value.replace(/[^0-9]/g, ""), "cantidad")
              }
              value={state.cantidad}
              style={tw`text-lg text-white`}
              keyboardType="numeric"
              required // Campo requerido
            />
          </View>
          <View style={styles.inputgroup}>
            <TextInput
              placeholder="Precio Unitario"
              placeholderTextColor="white"
              onChangeText={(value) =>
                handleChangeText(
                  value.replace(/[^0-9]/g, ""),
                  "precio_unitario"
                )
              }
              value={state.precio_unitario}
              style={tw`text-lg text-white`}
              required // Campo requerido
              keyboardType="numeric" // Solo permite números
            />
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Button onPress={addRepuestos} title="add Repuesto"></Button>
        </View>
        <ScrollView>
          <View style={tw`mb-2`}>
            {handleRepuestos.map((repuesto, index) => (
              <RepuestoCard key={index} repuesto={repuesto}>
                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </RepuestoCard>
            ))}
          </View>
        </ScrollView>
        <View style={tw`bg-slate-800 border border-blue-400 mb-5 p-4 flex-row`}>
          <Text style={tw`text-xl font-bold text-white mr-auto`}>Total:</Text>
          <Text style={tw`text-xl font-bold text-blue-300`}>
            ${totalPreciosRepuestos}
          </Text>
        </View>
        <View>
          {buttonHidden ? (
            <Text>Cargando..</Text>
          ) : (
            <View style={tw`mb-5`}>
              <Button title="Guardar Producto" onPress={saveProduct} />
            </View>
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

  buttonStyle: {
    backgroundColor: "#475569",
    borderRadius: 1,
    width: "full",
    borderLeftWidth: 1, // Ancho del borde izquierdo
    borderRightWidth: 1,
    borderBottomWidth: 1, // Ancho del borde derecho
    borderColor: "white",
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: "#FFF",
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#CCC",
    borderWidth: 1,
  },
});
