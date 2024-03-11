import React from "react";
import { View, Text, TouchableOpacity} from 'react-native'
import tw from 'twrnc'

const MenuButtonItem = ({ text, onPress }) => {
    return(
        <TouchableOpacity onPress={ onPress } style={tw`border-2 mt-3 mx-4 p-3 border-blue-500 rounded items-center`}>
            <Text style={tw`text-white font-bold`}>{text}</Text>
        </TouchableOpacity>
    )
}

export default MenuButtonItem