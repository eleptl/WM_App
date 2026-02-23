import React from 'react';
//element
import { View, StyleSheet, StatusBar, Text } from    'react-native';
//icon
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
    return(
        <View style={ {paddingTop: StatusBar.currentHeight, height: '100%', justifyContent:'center', alignItems:'center'} }>
            <Text style={ {fontSize:35} } > Settings </Text>
            <MaterialIcons name="developer-mode" size={24} color="black" />
        </View>
    )
}

export default SettingsScreen;