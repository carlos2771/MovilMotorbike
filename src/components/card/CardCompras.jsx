import React from 'react'
import { View, StyleSheet,Text } from 'react-native'

export default function CardCompras({repuestos,fechaCreacion}) {
  return (
    <View style={styles.cardContainer}>
        <Text>{repuestos}</Text>
        <Text>{fechaCreacion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width:150,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
})
