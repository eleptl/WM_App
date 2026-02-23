import React from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
//element
import { View, StyleSheet, StatusBar, Text } from    'react-native';
//icon
import { MaterialIcons } from '@expo/vector-icons';

const User = () => {
    const route = useRoute();
    const { username } = route.params;
    return(
        <View style={ {paddingTop: StatusBar.currentHeight, height: '100%', justifyContent:'center', alignItems:'center'} }>
            <Text style={ {fontSize:35} } > Profile </Text>
            <MaterialIcons name="developer-mode" size={24} color="black" />
        </View>
    )
}

export default User;