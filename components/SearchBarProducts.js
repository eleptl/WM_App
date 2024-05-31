import { colors } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, form, StatusBar, Pressable, Button, TouchableOpacity, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
//icon
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { JoinFull } from '@mui/icons-material';
import { autocompleteClasses } from '@mui/material';
//axios
import axios from 'axios';

import * as Clipboard from 'expo-clipboard';


const SearchBarProducts = ({ onSearch }) => {
  //termine cercato
  const [searchTerm, setSearchTerm] = useState('');
  //suggerimmenti
  const [suggestions, setSuggestions] = useState([]);
  //navigation
  const navigation = useNavigation();

  //gestione suggerimenti
  const handleSubmit1 = async (text) => {

    console.log('textCerco', text)
    try {
      if (text === '' || text === null || text.length === 0) {
        setSuggestions([])
      }
      text = text.toUpperCase(text)
      const response = await axios.get(`http://192.168.1.161:5000/api/prodotto/matnrList?q=${text}`); /*http://192.168.140.227:5000/api/prodotto/matnrList?q=*/
      setSuggestions(response.data.filter(item => item.includes(text))); // Filtra i suggerimenti che contengono la parte dell'input
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchTerm(suggestion); // Imposta il termine di ricerca come suggerimento selezionato
    setSuggestions([]); // Nascondi i suggerimenti
  };

  //cambaiamento testo digitato
  const handleChange = (text) => {
    setSearchTerm(text);
    text = text.toUpperCase(text)
    handleSubmit1(text)
    console.log('text', text)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    onSearch(searchTerm);
    setSearchTerm("")
  };

  const [text, setText] = useState('');
  //copio testo in barra di ricerca
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
            placeholder=" Cerca Prodotto... "
            value={searchTerm}

            onChangeText={(text) => {
              handleChange(text);
              handleSubmit1(text)
            }}
          />

          <TouchableOpacity onPress={handleCopyText}>
            <Feather style={styles.copyIcon} name="copy" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        {suggestions.length > 0 && (searchTerm != null) && (
          <ScrollView style={styles.suggestionsContainer}>
            {suggestions.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

      </SafeAreaView>
      <TouchableOpacity style={styles.SubCont} onPress={handleSubmit}>
        <Text style={styles.searchText}>Cerca</Text>
        <FontAwesome5 style={{ paddingTop: 10 }} name="search" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    maxHeight: 150,
    borderWidth: 0,
    borderRadius: 5,
    marginTop: -15,
    padding: 10,
    width: 130,

    alignSelf: 'center',
    width: '50%',
    margin: 10,
    alignSelf: 'center',
    paddingLeft: 10
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
    width: '60%',
    margin: 10,
    alignSelf: 'center',
    paddingLeft: 10
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
  copyIcon: {
    paddingTop: 20,
    paddingLeft: '30%'
  }
});



export default SearchBarProducts;