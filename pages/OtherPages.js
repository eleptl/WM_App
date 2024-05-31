import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { tabView, useWindowDimensions } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { useIsFocused, useRoute } from '@react-navigation/native';
//movimenti
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

//icon
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const OtherPages = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { username } = route.params;
    return (
        <View style={styles.container}>
                        <View style={styles.topBar}>
                <TouchableOpacity style={ styles.topBarLeftElem } onPress={()=> navigation.navigate('SettingsScreen', {username: username})}>
                    <Feather name="settings" size={45} color="white" style={styles.iconBar} />
                </TouchableOpacity>
                <View style={styles.topBarRightElem}>
                    <Text style={{paddingLeft: '170%',color: 'white', width:140,height: '80%', textAlignVertical:'center'}}>{username}</Text>
                </View>
                <TouchableOpacity style={ styles.topBarRightElem } onPress={()=>navigation.navigate('UserScreen', {username: username})}>
                    <Ionicons name="person-circle-sharp" size={50} color="white" align='right' style={styles.iconBar} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: StatusBar.currentHeight, justifyContent: 'center', alignItems:'center', height: '50%' }}>
                <Text style={{ fontSize: 35 }} > page not yet developed</Text>
                <MaterialIcons name="developer-mode" size={48} color="black" />
            </View>
            <View style={styles.containerEndBar}>
                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('EnterScreen', {username: username})}>
                    <Ionicons name="arrow-undo-outline" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerScan}>
                    <MaterialCommunityIcons name="line-scan" size={75} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate('EnterScreen', {username: username})}>
                    <AntDesign name="home" size={35} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f6f6f6', /**#f6f6f6 */
    },
    topBar: {
        paddingTop: StatusBar.currentHeight - 10,
        backgroundColor: '#385A64',
        flexDirection: 'row',
        marginBottom: -38,
        justifyContent: 'center',
    },
    topBarLeftElem: {
        alignContent: 'Left',
        height: 65,
        width: '34%',
    },
    topBarRightElem: {
        alignContent: 'Right',
        height: 65,
        width: '33%',
        paddingLeft: '21%',
    },
    UTB: {
        backgroundColor: '#ffff00',
        alignItems: 'flex-start',
        position: 'relative',
    },
    iconBar: {
        marginLeft: '2%',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        marginTop: 0
    },
    containerEndBar: {
        marginBottom: 0,
        marginTop: '200%',
        width: '100%',
        align: 'bottom',
        position: 'absolute',
        height: '10%',
        backgroundColor: '#273B4A',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerScan: {
        backgroundColor: '#ff6677',
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90
    },
    containerBack: {
        backgroundColor: '#385A64',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90,
        marginRight: 30
    },
    containerHome: {
        backgroundColor: '#385A64',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90,
        marginLeft: 30
    },
});


export default OtherPages;  
