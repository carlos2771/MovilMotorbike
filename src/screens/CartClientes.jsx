import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { axiosClient } from '../api/axiosInstance';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import CardCompras from '../components/card/CardCompras';
import tw from 'twrnc'


export default function CartClientes() {
const [clientes, setClientes] = useState()

const getCartClient = async() =>{
  return await axiosClient.get("/cart-cliente").then(({data})=>setClientes(data))
  .catch((error) => console.error(error))
}

console.log("Compras1232345",clientes)

useEffect(()=>{
  getCartClient()
},[])
   return (
    <View style={tw`bg-red-300`}>
      <FlatList
      data={clientes}
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
// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: '#fff',
//   },
// })
