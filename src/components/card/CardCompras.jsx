import React from 'react'
import { View, StyleSheet,Text } from 'react-native'

export default function CardCompras({repuestos,fechaCreacion, proveedor, total, fecha, codigo}) {
  return (
    <View style={styles.cardContainer}>
        <Text>Codigo:{codigo}</Text>
        <Text>Proveedor:{proveedor}</Text>
        <Text>Total:{total}</Text>
        <Text>Fecha:{fecha}</Text>
        <Text>Repuesto:{repuestos}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width:150,
        height: 180,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        margin:3,
        elevation: 3,
        
    },
})
