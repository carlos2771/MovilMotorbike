import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useMarcas } from "../../context/MarcasContext";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { useRepuestos } from "../../context/RepuestosContext";
import tw from "twrnc";

export default function Marcas() {
  const { marcas, getMarcas } = useMarcas();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [repuestoNombre, setRepuestoNombre] = useState("");
  const { repuestos, getRepuestos } = useRepuestos();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMarcas();
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getRepuestos();
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los repuestos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const findRepuesto = (item) => {
    const selectedMarcaId = item;
    const repuestosMarca = repuestos.filter(
      (repuesto) => repuesto.marca.nombre_marca === selectedMarcaId
    );
    console.log("Repuestos de la marca:", selectedMarcaId);
    return repuestosMarca.map((repuesto) => repuesto.name);
  };

  const showModal = (item) => {
    const repuestoNombre = findRepuesto(item);
    setRepuestoNombre(repuestoNombre);
    setModalVisible(true);
    console.log("the", repuestoNombre);
  };
  const renderItem = ({ item }) => {
    // console.log("item",item);
    let borderColor =
      item.estado === "Activo" ? tw`border-blue-400` : tw`border-red-500`;
    return (
      <TouchableOpacity
        style={[tw`m-2  rounded p-3 border border-2`, borderColor]}
        onPress={() => showModal(item.nombre_marca)}
      >
        <Text style={tw`text-white mx-auto`}>{item.nombre_marca}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loading}>Cargando...</Text>
        ) : (
          <FlatList
            data={marcas}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {repuestoNombre && repuestoNombre.length > 0 ? (
              repuestoNombre.map((repu, index) => (
                <Text key={index} style={styles.modalText}>
                  Repuesto: {repu}
                </Text>
              ))
            ) : (
              <Text>No hay repuestos asociados a esta marca</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    padding: 4,
  },
  container: {
    width: "100%",
  },
  loading: {
    color: "#fff",
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
