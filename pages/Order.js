import React,{useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

import OrderSearchBar from '../components/OrderSearchBar';
import { tr } from 'react-native-paper-dates';
import { useRoute } from '@react-navigation/native';
//
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

const Order = () => {

//visibilità popup
const [modalVisible, setModalVisible] = useState(false)
//route -- dai
const route = useRoute();

console.log("ORDER", route.params)
const handleSubmit1 = async (text) => {
  console.log('handleSubmit1')
}

  return (
    <View style={styles.container}>
      <View style={{paddingBottom: '20%'}}>
        <OrderSearchBar onPress={handleSubmit1}  />
      </View >
      <View >        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(false);
          }}
        >
        </Modal>
      </View>

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

export default Order;
