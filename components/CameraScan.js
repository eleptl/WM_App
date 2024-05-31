

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// // icon scan
import { Ionicons } from '@expo/vector-icons';
// // icon back
// import { AntDesign } from '@expo/vector-icons';


export default function App() {
  const [facing, setFacing] = useState('back');
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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            {/**<Text style={styles.text}>Flip Camera</Text>**/}
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={ {backgroundColor: 'white', height: '7%', alignItems:'center', paddingTop: '1.5%'}  }>  
         
        <TouchableOpacity style={styles.buttonScan} onPress={() => console.log('scan premuto')}>
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


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
// import  Camera from 'react-native-camera' ;
// // import { BarCodeScanner } from "expo-barcode-scanner";

// import { useRoute } from '@react-navigation/native';
// // icon scan
// import { Ionicons } from '@expo/vector-icons';
// // icon back
// import { AntDesign } from '@expo/vector-icons';

// // navigation
// import { useNavigation } from '@react-navigation/native';


// const CameraScan = () => {
//     //navigazione
//     const navigation = useNavigation();
//     const [scanned, setScanned] = useState(false);

//     const route = useRoute();
//     const username = route.params.username;

//     const handleBarCodeScanned = ({ type, data }) => {
//         setScanned(true);
//         alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//     };


//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.exit} onPress={() => navigation.goBack({ username } + {})}>
//                 <AntDesign name="leftcircle" size={24} color="black" />
//             </TouchableOpacity>
//             <View style={styles.container}>
//                 {/* <BarCodeScanner
//                     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                     style={StyleSheet.absoluteFillObject}
//                 /> 
//                  <Camera
//                     // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                     // style={StyleSheet.absoluteFillObject}
//                 />*/} 
//                 <Camera></Camera>
                
//             </View>
//             <TouchableOpacity style={styles.buttonScan} onPress={() => console.log('scan premuto')}>
//                 <Ionicons name="scan" size={48} color="black" />
//             </TouchableOpacity>
//         </View >
//     );
// }

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22
//     },
//     exit: {
//         paddingTop: '10%',
//         paddingLeft: '2%'
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     openButton: {
//         backgroundColor: '#F194FF',
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//         marginVertical: 10,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     buttonScan: {
//         alignSelf: 'center',
//         paddingBottom: '5%'
//     },
//     exit: {
//         paddingTop: '10%',
//         paddingLeft: '2%',
//         marginBottom: '2%'
//     },
//     buttonScan: {
//         alignSelf: 'center',
//         paddingBottom: '5%'
//     },
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     buttonContainer: {
//         flex: 1,
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         margin: 20,
//     },
//     button: {
//         flex: 0.1,
//         alignSelf: 'flex-end',
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 18,
//         color: 'white',
//     },
// });

// export default CameraScan;