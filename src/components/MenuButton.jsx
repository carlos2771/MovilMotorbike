import React from "react";
import { View, Text, TouchableOpacity} from 'react-native'
import tw from 'twrnc'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUser, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const MenuButtonItem = ({ text, onPress, icon }) => {
    return(
        <TouchableOpacity onPress={onPress} style={tw`px-3 py-2 m-3 border-b-2 border-blue-600`}>
        <View style={tw`flex-row items-center`}>
          <FontAwesomeIcon icon={icon} style={tw`text-white mr-2`} />
          <Text style={tw`text-white font-bold text-lg`}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default MenuButtonItem