import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
//axios
import axios from 'axios';
//myComponent
import Order from '../pages/Order.js';
import Period from '../pages/Period.js';
import Supplier from '../pages/Supplier.js';


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

const Tab = createMaterialTopTabNavigator();

const EMTabNavigation = () => {

    //navigazione
    const navigation = useNavigation();

    //route e dati
    const route = useRoute();
    const user = route.params.username;

    console.log(route);

    return (
        <Tab.Navigator
            style={{ paddingTop: 40 }}
        >
            <Tab.Screen component={Order} name='Order' initialParams={{ username: user, sourcePage: 'Order' }} />
            <Tab.Screen component={Period} name='Period' initialParams={{ username: user, sourcePage: 'Period' }} />
            <Tab.Screen component={Supplier} name='Supplier' initialParams={{ username: user, sourcePage: 'Supplier' }} />
        </Tab.Navigator>
    )
}


export default EMTabNavigation;