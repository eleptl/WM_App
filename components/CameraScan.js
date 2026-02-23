import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// // icon scan
import { Ionicons } from '@expo/vector-icons';
//import { Navigate } from 'react-router-native';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';


export default function CameraScan() {

  //navigazione
  const navigation = useNavigation();

  //route e dati
  const route = useRoute();
  const { username } = route.params;
  const source = route.params.sourcePage;

  //gestione fotocamera
  const [facing, setFacing] = useState('back');
  //permessi
  const [permission, requestPermission] = useCameraPermissions();


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  //   const handleCodeScanned = ({ type, data }) =>{
  //     alert(data)
  const handleCodeScanned = async ({ type, data }) => {
    data = data.toUpperCase();

    if (source === 'Product') {
      navigation.navigate('ProductsResult', { searchTerm: data, username, sourcePage: 'Product' });
    } else if (source === 'Location') {
      navigation.navigate('LocationsResult', { searchTerm: data, username, sourcePage: 'Location' })
    } else if (source === 'ProductsResult') {
      navigation.navigate('LocationsResult', { searchTerm: data, username, sourcePage: 'ProductsResult' })
    } else if (source === 'LocationsResult') {
      navigation.navigate('ProductsResult', { searchTerm: data, username, sourcePage: 'LocationsResult' });
    } else {
      Alert.alert(
        'Scanned code is not a valid product or location',
        'The scanned code is neither a product nor a location. Do you want to try again?',
        [
          { text: 'Go Back', onPress: () => navigation.navigate(sourcePage, { username: username, sourcePage: route.name }), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }

  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'white', height: '7%', alignItems: 'baseline', paddingTop: '7%' }}>
        <TouchableOpacity onPress={() => navigation.goBack({ username: username })}>
          <Ionicons style={{ alignSelf: 'baseline' }} name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{
        barcodeTypes: ["qr", 'aztec', 'ean13', 'ean8', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
      }}
        onBarcodeScanned={(txt) => handleCodeScanned(txt)}>
        <View style={styles.buttonContainer}>

        </View>
      </CameraView>
      <View style={{ backgroundColor: 'white', height: '7%', alignItems: 'center', paddingTop: '1.5%' }}>

        <TouchableOpacity style={styles.buttonScan} >
          <Ionicons name="scan" size={48} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});