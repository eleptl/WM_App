import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Button, BackHandler, Modal, LogBox } from 'react-native';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
//icon user/setting
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//scan
import { MaterialCommunityIcons } from '@expo/vector-icons';
//home
import { AntDesign } from '@expo/vector-icons';
//navigation
import ModNavigator from '../components/ModNavigation.js';
import { useNavigation } from '@react-navigation/native';
//permessi fotocamera
import { Linking } from "react-native";
import { useCameraPermissions } from "expo-image-picker";
import CameraScan from '../components/CameraScan.js';


const RiepStock = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const username = route.params.username;

    console.log('username.RiepSock: ', username)

    //permessi fotocamera
    const [status, requestPermissions] = useCameraPermissions();

    const requestPermissionAgain = () => {
        if (status.granted) {
            status.canAskAgain = false
            navigation.navigate('CameraScan', { username })
            console.log(status)
        } else {
            Linking.openSettings();
            requestPermissions();
            console.log(status)
        }
    }

    useEffect(() => {
        if (!status?.granted) requestPermissions();
    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.topBar}>
                <TouchableOpacity style={styles.topBarLeftElem} onPress={() => navigation.navigate('SettingsScreen', { username: username })}>
                    <Feather name="settings" size={45} color="white" style={styles.iconBar} />
                </TouchableOpacity>
                <View style={styles.topBarRightElem}>
                    <Text style={{ paddingLeft: '170%', color: 'white', width: 140, height: '80%', textAlignVertical: 'center' }}>{username}</Text>
                </View>
                <TouchableOpacity style={styles.topBarRightElem} onPress={() => navigation.navigate('UserScreen', { username: username })}>
                    <Ionicons name="person-circle-sharp" size={50} color="white" align='right' style={styles.iconBar} />
                </TouchableOpacity>
            </View>
            <ModNavigator username={username} />
            <View style={styles.containerEndBar}>
                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('EnterScreen', { username: username } /*+ { hasPermission: hasPermission }*/)}>
                    <Ionicons name="arrow-undo-outline" size={35} color="white" />
                </TouchableOpacity>

                {/**TOUCOP- SCANNER */}
                <TouchableOpacity style={styles.containerScan} onPress={() => {console.log(status); status.granted ? navigation.navigate('CameraScan', { username }) : requestPermissions()}  }/*navigation.navigate('CameraScan', { username: username }  && { count: count }*/>

                    <MaterialCommunityIcons name="line-scan" size={75} color="white" />

                </TouchableOpacity>

                <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate('EnterScreen', { username: username })}>
                    <AntDesign name="home" size={35} color="white" />
                </TouchableOpacity>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    ///
    camera: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#273B4A',
    },
    containerScan: {
        backgroundColor: '#ff6677',
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 90,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    /////
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f6f6f6', /**#f6f6f6 */
    },
    topBar: {
        paddingTop: StatusBar.currentHeight - 10,
        backgroundColor: '#385A64',
        flexDirection: 'row',
        marginBottom: -38,
        justifyContent: 'center',
    },
    topBarLeftElem: {
        alignContent: 'Left',
        height: 65,
        width: '34%',
    },
    topBarRightElem: {
        alignContent: 'Right',
        height: 65,
        width: '33%',
        paddingLeft: '21%',
    },
    UTB: {
        backgroundColor: '#ffff00',
        alignItems: 'flex-start',
        position: 'relative',
    },
    iconBar: {
        marginLeft: '2%',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        marginTop: 0
    },
    containerEndBar: {
        marginBottom: 0,
        marginTop: '200%',
        width: '100%',
        align: 'bottom',
        position: 'absolute',
        height: '10%',
        backgroundColor: '#273B4A',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerScan: {
        backgroundColor: '#ff6677',
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90
    },
    containerBack: {
        backgroundColor: '#385A64',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90,
        marginRight: 30
    },
    containerHome: {
        backgroundColor: '#385A64',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 90,
        marginLeft: 30
    },
});

export default RiepStock;