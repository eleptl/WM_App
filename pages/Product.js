import { React, useRef } from 'react';
import { StyleSheet, View, Text, Image, TextInput, StatusBar, FlatList, AppState, Input, RefreshControl, RefreshControlBase, SafeAreaView } from 'react-native';
import { useEffect, useReducer, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
//axios
import axios from 'axios';
// //scanner
// import { BarCodeScanner } from 'expo-barcode-scanner';


import SearchBar from '../components/SearchBarProducts';
import { BorderColor, SpaceBar } from '@material-ui/icons';
import { stringifyValueWithProperty } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { useField } from 'formik';
import { ViewWeek } from '@mui/icons-material';


const Products = ({ route }) => {
  const { username } = route.params;
  console.log('Username in Products:', username);

  //navigazione
  const navigation = useNavigation();
  //refresh
  const [refreshing, setRefreshing] = useState(false);
  //elemento di ricerca
  const [searchTerm, setSearchTerm] = useState('');
  //focus
  const isFocused = useIsFocused();
  //elementi
  const [items, setItems] = useState([]);
  //rendering
  const courses = [
    "Full Stack Developement Program",
    "Python Automation Testing Program",
    "UI/UX Program",
  ];


  //cambiamento termine di ricerca
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    handleChange(searchTerm);
  };


  const handleSearch = async (searchTerm) => {
    searchTerm = searchTerm.toUpperCase();
    console.log('Hai cercato:', searchTerm);
    const indexAgg = /*'http://192.168.140.227:5000/api/prodotto/maktx/?matnr='*/'http://192.168.1.161:5000/api/prodotto/maktx/?matnr=' + searchTerm;
    axios.put(indexAgg)
    console.log('aggiornato su: ', indexAgg)


    const index = 'http://192.168.1.161:5000/api/prodotto/?matnr=' /* 'http://192.168.140.227:5000/api/prodotto/?matnr='*/ + searchTerm;


    if (!(searchTerm === null)) {
      navigation.navigate('ProductsResult', { username: username, index: index, searchTerm: searchTerm });
    }
  };


  return (
    <View style={StyleSheet.searchButton}>
      <SearchBar onPress={handleSubmit} onSearch={handleSearch} onChange={handleChange} />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //'#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  searchButton: {
    marginTop: 60,
    backgroundColor: '#fff',
    width: '60%'
  },
  itemLgpla: {
    fontSize: 15,
    color: 'black',
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  itemLgort: {
    color: 'black',
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  itemVerme: {
    color: 'black',
    backgroundColor: '#f6f6f6',
    textAlign: 'right',
    marginRight: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 28
  },
  itemBestq: {
    color: 'black',
    backgroundColor: '#f6f6f6',
    textAlign: 'right',
    marginRight: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: 'grey'
  },
});

export default Products;
