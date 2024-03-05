import React from 'react'
import { View, StyleSheet,Text } from 'react-native'

export default function CardCompras({repuestos,fechaCreacion, proveedor, total, fecha, codigo}) {
  return (
    <View style={styles.cardContainer}>
        <Text style={styles.textos}>Codigo:{codigo}</Text>
        <Text style={styles.textos}>Proveedor:{proveedor}</Text>
        <Text style={styles.textos}>Total:{total}</Text>
        <Text style={styles.textos}>Fecha:{fecha}</Text>
        {/* <Text style={styles.textos}>Repuesto:{repuestos}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#374151',
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
    textos:{
      color: "white",
      fontSize:16
    }
})
