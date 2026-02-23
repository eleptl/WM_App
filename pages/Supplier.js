import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SupplierSearchBar from '../components/SupplierSearchBar'
import { useRoute } from '@react-navigation/native';

const Supplier = () => {
  const route = useRoute()
  const handleSubmit1 = async (text) => {
    console.log('handleSubmit')
  }
  
  return (
  <View style={styles.container}>
    <View style={{paddingBottom: '20%'}}>
      <SupplierSearchBar onPress={handleSubmit1}  />
    </View >
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Supplier;
