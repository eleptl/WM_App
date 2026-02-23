import { StyleSheet, View, Text, Image, TextInput, StatusBar, AppState, Input, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useIsFocused, useRoute, useNavigation, useEffect } from '@react-navigation/native';

import axios from 'axios'

import SearchBar from '../components/SearchBarLocation';

const Location = ({ route }) => {
  //refresh
  const [refreshing, setRefreshing] = useState(false);

  //navigazione
  const navigation = useNavigation();

  //focus
  const isFocused = useIsFocused();

  //data route
  const { username } = route.params;

  //elemento di ricerca
  const [searchTerm, setSearchTerm] = useState('');
  //elementi
  const [items, setItems] = useState([]);

  //rendering
  const courses = [
    "Full Stack Developement Program",
    "Python Automation Testing Program",
    "UI/UX Program",
  ];


  //handle method

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
    // const indexAgg = 'http://192.168.1.9:5000/api/ubicazione/lgort/?lgpla='  + searchTerm;
    const indexAgg = 'http://192.168.1.161:5000/api/ubicazione/lgort/?lgpla=' + searchTerm;

    axios.put(indexAgg)

    // const index = 'http://192.168.1.9:5000/api/ubicazione/?lgpla=';
    const index = 'http://192.168.1.161:5000/api/ubicazione/?lgpla=';
    if (!(searchTerm === null)) {
      navigation.navigate('LocationsResult', { username: username, index: index, searchTerm: searchTerm, sourcePage: route.name });
    }
  };

  return (

    <View style={StyleSheet.searchButton}>
      <SearchBar value={searchTerm} onPress={handleSubmit} onSearch={handleSearch} onChange={handleChange} />

    </View>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,

  },
  searchButton: {
    marginTop: 60,
    width: '60%',
    height: 55,

  },
  item: {
    color: 'black',
  },
  itemMatnr: {
    fontSize: 15,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  itemMaktx: {
    backgroundColor: '#f6f6f6',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  itemVerme: {
    backgroundColor: '#f6f6f6',
    textAlign: 'right',
    marginRight: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 28
  },
  itemBestq: {
    backgroundColor: '#f6f6f6',
    textAlign: 'right',
    marginRight: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: 'grey'
  },
  //sfondi in base a BESTQ
  freeBq: {
    backgroundColor: 'green',
  },
  notFreeBq: {
    backgroundColor: 'red',
  }
});

export default Location;