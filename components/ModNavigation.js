import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
//axios
import axios from 'axios';
//myComponent
import Products from '../pages/Product.js';
import Location from '../pages/Location.js';

const Tab = createMaterialTopTabNavigator();

const ModNavigator = ({ username, sourcePage }) => {

    //navigazione
    const navigation = useNavigation();
    
    //route -- dati
    const route = useRoute();

    return (
        <Tab.Navigator style={{ paddingTop: 40 }}>
            <Tab.Screen component={Products} name='Products' initialParams={{ username: username, sourcePage: 'Product' }} />
            <Tab.Screen component={Location} name='Location' initialParams={{ username: username, sourcePage: 'Location' }} />
        </Tab.Navigator>)
}


export default ModNavigator;