import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";

import React, { useContext, useState } from 'react'
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
    
            singIn();
            console.log(response.data);
            alert(JSON.stringify(response.data));
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Usuario/Contraseña incorrecto");
            } else {
                console.error(error);
            }
        }
    }
    
    
    


  return (
    <View style={styles.container}>
        <Text>{auth ? "true": "false"}</Text>
        <Text style={styles.signupText}>Iniciar Secion</Text>
        <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16, color: "#8e93a1",}}>Correo</Text>
            <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address"/>
        </View>
        <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16, color: "#8e93a1",}}>Contraseña</Text>
            <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password"/>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal: 24}}>{JSON.stringify({email,password})}</Text>
       
    </View>
  )
  
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
       
    },
    signupText:{
        fontSize: 30,
        textAlign: "center",
    
        
    },
    signupInput:{
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
        
    },
    buttonStyle:{
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText:{
        fontSize: 20,
        textAlign: "center",
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bold"
    }
    
})