import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert, ScrollView } from "react-native";
import React, { useContext, useState } from 'react';
import { axiosClient } from "../api/axiosInstance";
import { AuthContext } from "../context/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import tw from 'twrnc'

export default function SingnIn({navigation: {navigate}}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {auth, singIn } = useContext(AuthContext) 


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
            
            singIn({username:response.data.username, email: response.data.email});
            Alert.alert('Bienvenido', (response.data.username), [
                {text: 'Aceptar'},
              ]);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Usuario/Contraseña incorrecto");
            } else {
                console.error(error);
            }
        }
    }

    return (
        <LinearGradient
      colors={["#1E293B", "#0f172a", "#1E293B"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[tw`flex-1 items-center p-4`]}
    >
        <ScrollView>
             <View style={[tw`bg-slate-700 p-10 rounded-lg w-11/12 flex-1 justify-center my-24`, { minWidth: 300 }]}>
                <Text style={[tw`text-3xl text-white font-bold mb-6`]}>Iniciar Sesión</Text>
                <View style={[tw`w-full`, { marginHorizontal: 'auto' }]}>
                    <Text style={[tw`text-white mb-1`]}>Correo</Text>
                    <TextInput style={[tw`input`, styles.signupInput]} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={[tw`w-full`, { marginHorizontal: 'auto' }]}>
                    <Text style={[tw`text-white mb-1`]}>Contraseña</Text>
                    <TextInput style={[tw`input`, styles.signupInput]} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={[tw`bg-blue-500`, styles.buttonStyle]}>
                    <Text style={[tw`text-white font-bold`, styles.buttonText]}>Ingresar</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    signupText: {
        fontSize: 36,
        textAlign: "center",
        color: "#fff"
    },
    signupInput: {
        fontSize: 20,
        borderBottomWidth: 2,
        height: 48,
        borderBottomColor: "#3498DB",
        marginBottom: 30,
        color: "#fff"
    },
    buttonStyle: {
        backgroundColor: "#3498DB",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});
