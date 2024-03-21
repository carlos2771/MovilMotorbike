import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  Image,
  Linking 
} from "react-native";
import React, { useContext, useState } from "react";
import { axiosClient } from "../api/axiosInstance";
import { AuthContext } from "../context/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const handlePress = () => {
  Linking.openURL("https://motorbikefull.onrender.com/reestablecer");
};

export default function SingnIn({ navigation: { navigate } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, singIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      if (email === "" || password === "") {
        alert("Todos los campos son requeridos");
        return;
      }

      const response = await axiosClient.post("/login", { email, password });
      if (!response.data) {
        alert("Usuario/Contraseña incorrecto");
        return;
      }

      singIn({ username: response.data.username, email: response.data.email });
      Alert.alert("Bienvenido", response.data.username, [{ text: "Aceptar" }]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Usuario/Contraseña incorrecto");
      } else {
        console.error(error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LinearGradient
      colors={["#000000", "#0F0F4E"]}
      style={tw`flex-1 justify-center items-center`}
    >
      <View style={tw`w-5/6 bg-transparent rounded-lg p-8`}>
        {/* <Text style={tw`text-2xl font-bold text-white mb-4 text-center`}>Iniciar sesión</Text> */}
        <View style={tw`justify-center items-center mb-10`}>
          <Image
            style={tw`w-30 h-30 justify-center`}
            source={require("../images/motorbike (3).png")}
          />
        </View>

        <View style={tw`flex-row items-center mb-4 border-b border-gray-500`}>
          <FontAwesomeIcon icon={faUser} style={tw`text-white mr-2`} />
          <TextInput
            style={tw`flex-1 h-12 rounded-lg px-4 text-white font-bold`}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={tw`flex-row items-center mb-8 border-b border-gray-500`}>
          <FontAwesomeIcon icon={faLock} style={tw`text-white mr-2`} />
          <TextInput
            style={tw`flex-1 h-12  rounded-lg px-4 text-white font-bold`}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity
        style={{ position: 'absolute', right: 16, top: 16 }}
        onPress={togglePasswordVisibility}
      >
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          title={showPassword ? 'Ocultar' : 'Mostrar'}
          style={tw`text-white`}
        />
      </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`w-full h-12 bg-blue-700 items-center justify-center`}
          onPress={handleSubmit}
        >
          <Text style={tw`text-white font-bold`}>Iniciar sesión</Text>
        </TouchableOpacity>
        <View style={tw`items-center justify-center mt-2`}>
          <Text style={tw`text-white mb-2`}>¿Olvidaste tu contraseña?</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={tw`font-bold text-cyan-200 border-b border-sky-200`}>¡Recupérala aquí!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}


