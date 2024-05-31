import { StyleSheet, View, Text, Image, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import { useEffect } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
//icon
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//movimenti
import { useNavigation } from '@react-navigation/native';

const icon1 = require('../assets/images/storage-stacks_2821858.png');
const icon2 = require('../assets/images/forklift_2821849.png')
const icon3 = require('../assets/images/warehouse_2821904.png')
const icon4 = require('../assets/images/worldwide-shipping_2821856.png')
const icon5 = require('../assets/images/conveyor_12808565.png')
const icon6 = require('../assets/images/storage_2821815.png')


const Enter = () => {
    const route = useRoute();
    const { username } = route.params;

    console.log('username Enter', route.params)

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const backAction = () => {
            if (isFocused) {
                return true;                    // Blocca la navigazione all'indietro solo quando la pagina è focalizzata
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();      // Rimuove il listener quando il componente è smontato
    }, [isFocused]);

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

            <View style={{ marginTop: StatusBar.currentHeight + 40, height: '100%' }}>

                <View style={{ width: '100%', flexDirection: 'row', height: '80%', marginLeft: 8 }}>
                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('RiepStockScreen', { username: username })}>

                        <Image source={icon1} style={styles.iconCont} />
                        <Text>Riepilogo Stock</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('OtherPagesScreen', { username: username })}>
                        <Image source={icon2} style={styles.iconCont} />
                        <Text>Prelievo Spedizione</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ width: '100%', flexDirection: 'row', height: '80%', marginTop: -450, marginLeft: 8 }}>
                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('EntrataMerci', { username: username })}>
                        <Image source={icon3} style={styles.iconCont} />
                        <Text>Entrata Merci</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('OtherPagesScreen', { username: username })}>
                        <Image source={icon4} style={styles.iconCont} />
                        <Text>Uscita Merci</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', height: '80%', marginTop: -450, marginLeft: 8 }}>
                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('OtherPagesScreen', { username: username })}>
                        <Image source={icon5} style={styles.iconCont} />
                        <Text>Produzione</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.elemento} onPress={() => navigation.navigate('OtherPagesScreen', { username: username })}>
                        <Image source={icon6} style={styles.iconCont} />
                        <Text>Inventario</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f6f6f6', /**#f6f6f6 */
    },
    elemento: {
        width: '43%',
        height: '33%',
        backgroundColor: '#fff',
        marginRight: 6,
        marginLeft: 13,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#00',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    iconCont: {
        height: '80%',
        width: '80%',

    },
    textTitles: {
        color: '#385A64',
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
    iconBar: {
        marginLeft: '2%',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
});

export default Enter;