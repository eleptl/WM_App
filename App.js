import { useRoute } from '@react-navigation/native';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
//prova stile
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
//pages
import LoginScreen from './pages/Login';
import RiepStockScreen from './pages/RiepStock';
import EnterScreen from './pages/Enter';
import OtherPagesScreen from './pages/OtherPages';
import UserScreen from './pages/User';
import SettingsScreen from './Screens/SettingsScreen';
import ProductsResult from './pages/ProductsResult';
import LocationsResult from './pages/LocationsResult';
import EntrataMerci from './pages/EntrataMerci';
//nonUtili -- passaggio username
import ModNavigator from './components/ModNavigation';
import Products from './pages/Product';
import Location from './pages/Location';
//axios
import axios from 'axios';
//elem
import CameraScan from './components/CameraScan'
//accesso fotocamera
import CameraAccess from './components/CameraAccess'

import { CheckBoxMat } from './components/CheckBoxMateriali'

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'tansparent'
                    },
                    headerShown: false,
                    headerTintColor: '#000',
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName='LoginScreen'
            >

                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='EnterScreen' component={EnterScreen} />
                <Stack.Screen name='RiepStockScreen' component={RiepStockScreen} />
                <Stack.Screen name='OtherPagesScreen' component={OtherPagesScreen} />
                <Stack.Screen name='UserScreen' component={UserScreen} />
                <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
                <Stack.Screen name='ProductsResult' component={ProductsResult} />
                <Stack.Screen name='Products' component={Products} />
                <Stack.Screen name='ModNavigator' component={ModNavigator} />
                <Stack.Screen name='LocationsResult' component={LocationsResult} />
                <Stack.Screen name='Locations' component={Location} />
                <Stack.Screen name='CameraScan' component={CameraScan} />
                <Stack.Screen name='EntrataMerci' component={EntrataMerci} />
                {/* <Stack.Screen name='CameraAccess' component={CameraAccess} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;