import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


import PeriodSearchBar from '../components/PeriodSearchBar';
import { ro } from 'react-native-paper-dates';
//import { useNavigate } from 'react-router-native';

const Period = ({ route, index }) => {

  //navigazione
  const navigation = useNavigation();

  //dati route
  const username = route.params.username;

  const handleSubmit = () => {
    navigation.navigate('POrderResult', { username: username/*, pageSource: 'Period*/ });

  }

  return (
    <View style={styles.container}>
      <PeriodSearchBar onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchText: {
    color: 'white',
    fontSize: 14,
    flexDirection: 'row',
    marginTop: 15,
    textAlign: 'center',
    height: 40,
  },
  SubCont: {
    borderRadius: 30,
    marginBottom: '110%',
    width: '50%',
    height: 55,
    backgroundColor: '#273B4A',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

export default Period;
