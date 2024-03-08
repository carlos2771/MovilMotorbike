import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import tw from 'twrnc'

export default function CardCompras({repuestos,fechaCreacion, proveedor, total, fecha, codigo, anulado}) {
  let borderColor = anulado === true ? tw`border-orange-400` : tw`border-blue-500`;
  return (
    
    <View style={[tw`m-2  rounded p-3 border border-2`, borderColor ]}>
        <View style={tw`flex-row`}>
        <Text style={tw`text-white mr-auto`}>Codigo:{codigo}</Text>
        <Text style={tw`text-white`}>Proveedor:{proveedor}</Text>
        </View>
        <View style={tw`flex-row`}>
        <Text style={tw`text-white mr-auto`}>Fecha:{fecha}</Text>
        <Text style={tw`text-white`}>Total:{total}</Text>
        </View>
        <Text style={tw`text-white`}>Repuesto:{repuestos}</Text>
        
    </View>
  )
}
