import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import React, { useContext, useState } from 'react';
import { axiosClient } from "../api/axiosInstance";
import { AuthContext } from "../context/AuthProvider";
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
        <ImageBackground source={require('../images/llave.jpg')} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.container}>
                <Text style={styles.signupText}>Iniciar Sesión</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 22, color: "white" }}>Correo</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 22, color: "white" }}>Contraseña</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "#21618C",
        
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24 // Añadido un padding horizontal para mejorar la apariencia
    },
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
