import 'react-native-get-random-values';
import { useRoute } from '@react-navigation/native';
import React from 'react';

//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

//import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
import Period from './pages/Period';
import Supplier from './pages/Supplier';
import Order from './pages/Order';
import POrderResult from './pages/POrderResult';
import pOrderSB from './components/PeriodSearchBar'
//nonUtili -- passaggio username
import ModNavigator from './components/ModNavigation';
import Products from './pages/Product';
import Location from './pages/Location';
//axios
import axios from 'axios';
//elem
import CameraScan from './components/CameraScan'


import { Buffer } from 'buffer';
global.Buffer = Buffer;

//import crypto from 'react-native-crypto';
//global.crypto = crypto;


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);



const Stack = createNativeStackNavigator();

const App = () => {

    return (

        <GestureHandlerRootView style={{ flex: 1 }}>

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
                    <Stack.Screen name='Order' component={Order} />
                    <Stack.Screen name='Period' component={Period} />
                    <Stack.Screen name='Supplier' component={Supplier} />
                    <Stack.Screen name="POrderResult" component={POrderResult} />

                    <Stack.Screen name="pOrderSB" component={pOrderSB} />

                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
};

export default App;