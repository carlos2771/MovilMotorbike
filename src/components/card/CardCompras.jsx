import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import tw from 'twrnc'

export default function CardCompras({repuestos,fechaCreacion, proveedor, total, fecha, codigo}) {
  return (
    <View style={tw`h-45 w-39 rounded elevation-3 p-4 m-1 shadow shadow-sm shadow-blue-500`}>
        <Text style={tw`text-white`}>Codigo:{codigo}</Text>
        <Text style={tw`text-white`}>Proveedor:{proveedor}</Text>
        <Text style={tw`text-white`}>Total:{total}</Text>
        <Text style={tw`text-white`}>Fecha:{fecha}</Text>
        <Text style={tw`text-white`}>Repuesto:{repuestos}</Text>
    </View>
  )
}
