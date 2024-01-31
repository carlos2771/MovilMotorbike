import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { axiosClient } from '../api/axiosInstance';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import CardCompras from '../components/card/CardCompras';


export default function Compras() {
const [compras, setCompras] = useState()

const getCompras = async() =>{
  return await axiosClient.get("/cart-cliente").then(({data})=>setCompras(data))
  .catch((error) => console.error(error))
}

console.log(compras)

useEffect(()=>{
  getCompras()
},[])
   return (
    <View style={styles.container}>
      <FlatList
      data={compras}
      keyExtractor={(item) => item._id}
      renderItem={({item}) =>{
        const namesArray = item.cart.map(i => i.name)
        const namesStringFormatted = namesArray.join(', ')
        console.log(namesArray.join(', '))
        return  <CardCompras  repuestos={namesStringFormatted} fechaCreacion={item.createdAt} />
      }
      }
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
})