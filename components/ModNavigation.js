import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
//axios
import axios from 'axios';
//myComponent
import Products from '../pages/Product.js';
import Location from '../pages/Location.js';

const Tab = createMaterialTopTabNavigator();

const ModNavigator = ({ username }) => {
    const navigation = useNavigation();

    console.log('ModNavigatorUser: ', username)

    return (
        <Tab.Navigator style={{ paddingTop: 40 }}>
            <Tab.Screen component={Products} name='Products' initialParams={{ username }} />
            <Tab.Screen component={Location} name='Location' initialParams={{ username }} />
        </Tab.Navigator>)
}


export default ModNavigator;