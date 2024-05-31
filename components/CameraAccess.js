// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
// // import { Camera } from 'expo-camera';
// // import { BarCodeScanner } from 'expo-barcode-scanner';
// // import { useRoute } from '@react-navigation/native';
// // //icon scan
// // import { Ionicons } from '@expo/vector-icons';
// // //icon back
// // import { AntDesign } from '@expo/vector-icons';

// // //navigation
// // import { useNavigation } from '@react-navigation/native';



// // const CameraAccess = () => {
// //     const route = useRoute();
// //     const { username } = route.params.username;

// //     const navigation = useNavigation();
// //     const [hasPermission, setHasPermission] = useState(null);

// //     return (
// //         < Modal
// //             animationType="slide"
// //             transparent={true}
// //             visible={true}
// //         >
// //             <View style={styles.centeredView}>
// //                 <View style={styles.modalView}>
// //                     <Text style={styles.modalText}>Richiesta di accesso alla fotocamera</Text>
// //                     <TouchableOpacity
// //                         style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
// //                         //onPress={handleCameraPermissionRequest}
// //                         onPress={() => navigation.navigate('CameraScan', { username: username })}
// //                     >
// //                         <Text style={styles.textStyle}>Concedi Accesso</Text>
// //                     </TouchableOpacity>


// //                     <TouchableOpacity
// //                         style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
// //                     //onPress={() => navigation.goBack({ username }) + Alert.alert('Accesso alla fotocamera NEGATO!')}
// //                     >
// //                         <Text style={styles.textStyle}>Annulla</Text>

// //                     </TouchableOpacity>

// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     centeredView: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         marginTop: 22
// //     },
// //     exit: {
// //         paddingTop: '10%',
// //         paddingLeft: '2%'
// //     },
// //     modalView: {
// //         margin: 20,
// //         backgroundColor: 'white',
// //         borderRadius: 20,
// //         padding: 35,
// //         alignItems: 'center',
// //         shadowColor: '#000',
// //         shadowOffset: {
// //             width: 0,
// //             height: 2
// //         },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 4,
// //         elevation: 5
// //     },
// //     openButton: {
// //         backgroundColor: '#F194FF',
// //         borderRadius: 20,
// //         padding: 10,
// //         elevation: 2,
// //         marginVertical: 10,
// //     },
// //     modalText: {
// //         marginBottom: 15,
// //         textAlign: 'center',
// //     },
// //     buttonScan: {
// //         alignSelf: 'center',
// //         paddingBottom: '5%'
// //     },
// // })

// // export default CameraAccess;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
// import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { useRoute } from '@react-navigation/native';
// // //icon scan
// import { Ionicons } from '@expo/vector-icons';
// //icon back
// import { AntDesign } from '@expo/vector-icons';

// import { useNavigation } from '@react-navigation/native';

// // //navigation
// const CameraAccess = () => {
//     const route = useRoute();
//     const username = route.params.username;

//     const navigation = useNavigation();
//     const [hasPermission, setHasPermission] = useState(null);

//     useEffect(() => {
//         (async () => {
//             const { status } = await Camera.requestCameraPermissionsAsync();
//             setHasPermission(status === 'granted');
//         })();
//     }, []);

//     return (

//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={true}
//         >
//             <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                     <Text style={styles.modalText}>Richiesta di accesso alla fotocamera</Text>
//                     <TouchableOpacity
//                         style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
//                         onPress={() => navigation.navigate('CameraScan', username, hasPermission)}>
//                         <Text style={styles.textStyle}>Concedi Accesso</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
//                         onPress={() => navigation.goBack({ username }) + Alert.alert('Accesso alla fotocamera NEGATO!')}
//                     >
//                         <Text style={styles.textStyle}>Annulla</Text>

//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>

//     )// Se l'utente ha già concesso i permessi, non è necessario mostrare nulla

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
// });



// export default CameraAccess;
