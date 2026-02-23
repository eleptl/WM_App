//import { colors } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, form, StatusBar, Pressable, Button, TouchableOpacity, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
//icon
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//import { JoinFull } from '@mui/icons-material';
//import { autocompleteClasses } from '@mui/material';
//axios
import axios from 'axios';

import * as Clipboard from 'expo-clipboard';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

const SupplierSearchBar = () => {

  //navigazione
  const navigation = useNavigation();

  //route -- dati
  const route = useRoute();
  const username = route.params.username;

  //elemento cercato    
  const [searchTerm, setSearchTerm] = useState('');

  //suggerimenti  
  const [suggestion, setSuggestions] = useState([])

  const [text, setText] = useState('');


  //handle method

  //cambiamento testo digitato
  const handleChange = async (text) => {
    setSearchTerm(text);
    try {
      if (text === '' || text === null || text.length === 0) {
        setSuggestions([])
      }
      // const response = await axios.get(`http://192.168.1.9:5000/api/allSuppliers`);
      const response = await axios.get(`http://192.168.1.161:5000/api/allSuppliers`);
      setSuggestions(response.data.filter(item => item.includes(text))); // Filtra i suggerimenti che contengono la parte dell'input
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }

  }

  const handleSuggestionPress = (suggestion) => {

    setSearchTerm(suggestion); // Imposta il termine di ricerca come suggerimento selezionato
    setSuggestions([]); // Nascondi i suggerimenti
  };

  const handleSubmit1 = (event) => {
    // const index = `http://192.168.1.9:5000/api/ordiniPerFornitore/?lifnr=${searchTerm}`
    const index = `http://192.168.1.161:5000/api/ordiniPerFornitore/?lifnr=${searchTerm}`
    navigation.navigate("POrderResult", { username: username, index: index, isSearch: true, lifnr: searchTerm, sourcePage: route.params.sourcePage })
    setSearchTerm('')
  };

  const handleCopyText = async () => {
    if (text.trim() === searchTerm) {
      Alert.alert('Error', 'Text input is empty');
      return;
    }

    try {
      await Clipboard.setString(searchTerm);
    } catch (error) {
      console.error('Error copying text:', error);
      Alert.alert('Error', 'Failed to copy text to clipboard');
    }
  };

  return (
    <View syle={styles.container} >

      <SafeAreaView>
        <View style={styles.SearchCont}>
          <TextInput
            type="text"
            placeholder=" Cerca Fornitore... "
            value={searchTerm}

            onChangeText={(text) => {
              handleChange(text);
            }}
          />

          <TouchableOpacity onPress={handleCopyText}>
            <Feather style={styles.copyIcon} name="copy" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        {suggestion.length > 0 && (
          <ScrollView style={styles.suggestionsContainer}>
            {suggestion.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)}>
                <Text style={styles.itemSugg}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}



      </SafeAreaView>
      <TouchableOpacity style={styles.SubCont} onPress={handleSubmit1}>
        <Text style={styles.searchText}>Cerca</Text>
        <FontAwesome5 style={{ paddingTop: 10 }} name="search" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  suggestionsContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fffe',
    marginTop: -19,
    padding: 10,
    alignSelf: 'center',
    width: '74%',
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  SubCont: {
    marginTop: 30,
    borderRadius: 30,
    width: '50%',
    height: 55,
    backgroundColor: '#273B4A',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '30%'
  },
  SearchCont: {
    marginTop: 30,
    borderRadius: 60,
    verticalAlign: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    height: 65,
    width: '80%',
    margin: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    backgroundColor: '#fffe',

  },
  searchText: {
    color: 'white',
    fontSize: 20,
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 10,
    width: 100,
    height: 40
  },
  itemSugg: {
    fontSize: 17,
    alignSelf: 'center',
    marginBottom: '1.5%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  copyIcon: {
    paddingTop: 20,
    paddingLeft: '20%'
  }
});

export default SupplierSearchBar;