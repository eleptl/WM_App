import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Modal, TextInput, StatusBar, FlatList, TouchableOpacity, Input, ScrollView, RefreshControlBase, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useIsFocused, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

//axios
import axios from 'axios';
import { stringifyValueWithProperty } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
//checkbox
import { CheckBox, Icon } from '@rneui/themed'
//icon user/setting
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//scans
import { MaterialCommunityIcons } from '@expo/vector-icons';
//search
import { AntDesign } from '@expo/vector-icons';
//closePop-Up
import { FontAwesome } from '@expo/vector-icons';

//permessi fotocamera
import { Linking } from "react-native";
import { useCameraPermissions } from "expo-image-picker";



const ProductsResult = () => {
    console.log('eccomi')


    const Stack = createStackNavigator();
    //GVaribalesCheck
    const [selectedIndex, setIndex] = React.useState(null);
    //prova pop-up
    const [modalVisible, setModalVisible] = useState(false);
    //View a comparsa prelievo
    const [viewPreleva, setViewPreleva] = useState(false)
    //view a comparsa prenotazione
    const [viewPrenota, setViewPrenota] = useState(false)

    const route = useRoute();
    let { index } = '';
    let { searchTerm } = '';

    console.log('productResultuser: ', route.params.username)
    const username = route.params.username

    if (!((index) === stringifyValueWithProperty(route.params))) {
        index = stringifyValueWithProperty(route.params.index);
        searchTerm = stringifyValueWithProperty(route.params.searchTerm)
        console.log('searchterm: ', route.params.searchTerm)
    }
    //navigazione
    const navigation = useNavigation();
    //focus
    const isFocused = useIsFocused();
    //elementi
    const [items, setItems] = useState([]);
    //numero su pop-up
    const [numberInput, setNumberInput] = useState('');
    //id/ubic popup 
    const [inputID, setInputID] = useState('');
    const [inputUbic, setInputUbic] = useState('');
    //view Principale del popup
    const [popView, setPopView] = useState(false)
    //popUp Conferma prelievo
    const [viewConfermaPrelievo, setConfPrelievo] = useState(false)
    //pop up conferma prenotazione
    const [viewConfermaPrenota, setConfPrenota] = useState(false)
    //disponibilità merce
    const [dispon, setDispon] = useState(true)
    //editable input number
    const [intNum, setIntNum] = useState(true)
    //prova verme
    const [vermeValue, setVermeValue] = useState(0);
    const [prenotValue, setPrenotValue] = useState(0)
    //stato materiale in magazzino
    const [bestqValue, setBestqValue] = useState('')
    const [lgplaValue, setLgpla] = useState('');
    const [lgortValue, setLgort] = useState('');
    const [maktxValue, setMaktxValue] = useState('');
    //refresh
    const [refresh, setRefresh] = useState(false)
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
        handleSearch(index)
        console.log('numebrInputProdRes', numberInput)
    }, [refresh])



    const handleSearch = async (index) => {
        const err = 'nessun dato trovato';

        try {
            const response = await axios.get(index);
            const prodotti = response.data.map((prodotto) => ({
                data: prodotto
            }));
            setItems(prodotti)
            setMaktxValue(prodotti[0].data.MAKTX)


            if (prodotti.length === 0) {
                alert('Nessun prodotto trovato con questo codice (MATNR)')
                navigation.navigate('RiepStockScreen', { username: username })
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('ERRORE DI CONNESSIONE')
            navigation.navigate('RiepStockScreen', { username: username })
        };
    };

    //cambio numero
    const handleChangeNumber = (input) => {
        if (input === ' ')
            console.log('Il valore non può essere nullo')        //errore -->il valore non può essere nullo 
        // Rimuovi eventuali caratteri non numerici usando una regex
        const formattedInput = input.replace(/[^0-9]/g, '');
        setNumberInput(formattedInput);
    };
    //cambio id
    const handleChangeID = (input) => {
        setInputID(input);
    };
    //cambio ubic
    const handleChangeUbic = (input) => {
        setInputUbic(input);
    };
    //Button Spostamento pop-up
    const handlePressSpostamento = () => {
        console.log('gestion Spostamento pop-up')
    };
    //Button Consumo pop-up
    const handlePressConsumo = () => {
        if (selectedIndex !== 1 && selectedIndex !== 0) {
            alert('SCELTA OBBLIGATORIA')
        } else
            if (!numberInput || isNaN(numberInput)) {
                alert('Inserisci un numero valido.');
                return; // Interrompi l'azione se il numero non è valido
            } else {
                //prova differenza verme prenotati
                setNumberInput(numberInput);

                // Controlla se il numero inserito supera il valore "verme" memorizzato
                if (parseInt(numberInput) > vermeValue || parseInt(numberInput) > vermeValue - prenotValue) {
                    //editable input number
                    setIntNum(true);
                    console.log('diponibilità', dispon)
                    setNumberInput('')
                    alert('La quantità inserita supera la disponibilità del prodotto.');
                    setDispon(false)
                    handlePressAnnulla()
                } else {
                    setIntNum(false)
                    setDispon(true)
                    if (selectedIndex === 0) {
                        setViewPreleva(true)
                        setViewPrenota(false)
                    } else
                        if (selectedIndex === 1) {
                            setViewPrenota(true)
                            setViewPreleva(false)
                        }
                }
                console.log('gestion Consumo pop-up')
            }

    };
    //Button Annulla
    const handlePressAnnulla = () => {
        //editable input number
        setIntNum(true);
        if (selectedIndex === 0) {
            setViewPreleva(false)
            console.log('Gestione Annulla Preleva')
        }

        if (selectedIndex === 1) {
            setViewPrenota(false)
            console.log('Gestione Annulla Preleva')
        }
    }
    //Button Conferma

    const handlePressConferma = () => {
        console.log('ccc:', prenotValue)
        // if (selectedIndex === 0) {
        if (!inputID.trim()) {
            alert('ID OBBLIGATORIO');
            return;
        } else {
            if (selectedIndex === 0) {
                setConfPrelievo(true);
                setPopView(false);
                setViewPreleva(false);
                modifyPreleva()
            }

            if (selectedIndex === 1) {
                setConfPrenota(true);
                setPopView(false);
                setViewPrenota(false);
                modifyPrenota();
            }
        }
        setRefresh(!refresh)
    };

    const modifyPrenota = () => {

        const newData = [{
            LGORT: lgortValue,
            LGPLA: lgplaValue,
            BESTQ: ' PZ Prenotati',
            VERME: vermeValue /*- numberInput*/,
            ZPRENOTATI: parseInt(prenotValue) + parseInt(numberInput)
        }];

        axios.put('http://192.168.1.161:5000/api/prodotto'/*'http://192.168.140.227:5000/api/prodotto'*/, newData)
            .then(response => {
                console.log('ok')
            })
            .catch(error => {
                console.log('ERRORE', error)
            });
    }


    const modifyPreleva = () => {

        const newData = [{
            LGORT: lgortValue,
            LGPLA: lgplaValue,
            BESTQ: bestqValue,
            VERME: vermeValue - parseInt(numberInput),
            ZPRENOTATI: prenotValue
        }];
        axios.put('http://192.168.1.161:5000/api/prodotto' /* 'http://192.168.140.227:5000/api/prodotto'*/, newData)
            .then(response => {
                console.log('ok')
            })
            .catch(error => {
                console.log('ERRORE', error)
            });
    }

    //chiusura popUp + reset scelta checkbox
    const handleClosePopup = () => {
        //input number
        setIntNum(true)
        //disponibilità prodotti
        setDispon(true);
        //reset input number/id/ubic
        setNumberInput('')
        setInputUbic('')
        setInputID('')
        setPopView(false)
        setModalVisible(false)
        setViewPreleva(false)
        setViewPrenota(false)
        setConfPrelievo(false)
        setConfPrenota(false)
        setIndex()
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ color: 'black', opacity: 0.38, backgroundColor: item.data.BESTQ == 'Utilizzo Libero' ? '#276111' : item.data.BESTQ === 'Bloccato' ? '#FF735C' : '#FFB63C' }}

            onPress={item.data.BESTQ == 'Controllo Qualita' || item.data.BESTQ == 'Bloccato' ?
                () => { const bq = item.data.BESTQ; alert(bq); setModalVisible(false); setPopView(false); setVermeValue(item.data.VERME); setPrenotValue(item.data.ZPRENOTATI); setMaktxValue(item.data.MAKTX); }
                : item.data.VERME == item.data.ZPRENOTATI ? () => { alert('Tutti i pezzi sono stati prenotati'); setModalVisible(false); setPopView(false); setMaktxValue(item.data.MAKTX); }
                    : () => {
                        setModalVisible(true); setPopView(true);
                        setLgort(item.data.LGORT); setLgpla(item.data.LGPLA); setVermeValue(item.data.VERME); setPrenotValue(item.data.ZPRENOTATI); setBestqValue(item.data.BESTQ); setMaktxValue(item.data.MAKTX)
                    }}

        >

            <View style={styles.item}>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemLgpla}>{item.data.LGPLA}</Text>
                    <Text style={styles.itemVerme}>{item.data.VERME + ' ' + item.data.MEINS}</Text>
                </View>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemLgort}>{item.data.LGORT}</Text>
                    {/**<Text style={styles.itemBestq}>{item.data.BESTQ}</Text>*/}
                    {item.data.ZPRENOTATI !== 0 && (item.data.BESTQ === ' PZ Prenotati') &&
                        <Text style={styles.itemBestq}>{item.data.ZPRENOTATI + item.data.BESTQ}</Text>
                    }{item.data.ZPRENOTATI === 0 && item.data.BESTQ === 'Utilizzo Libero' &&
                        < Text style={styles.itemBestq}>{item.data.BESTQ}</Text>
                    }
                    {(item.data.BESTQ === 'Bloccato') || (item.data.BESTQ === 'Controllo Qualita') &&
                        < Text style={styles.itemBestq}> {item.data.BESTQ} </Text>
                    }
                </View>
            </View>
        </TouchableOpacity >


    );


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.topBarLeftElem} onPress={() => navigation.navigate('SettingsScreen', { username: username })}>
                    <Feather name="settings" size={45} color="white" style={styles.iconBar} />
                </TouchableOpacity>
                <View style={styles.topBarRightElem}>
                    <Text style={{ paddingLeft: '170%', color: 'white', width: 140, height: '80%', textAlignVertical: 'center' }}> {username}</Text>
                </View>
                <TouchableOpacity style={styles.topBarRightElem} onPress={() => navigation.navigate('UserScreen', { username: username })}>
                    <Ionicons name="person-circle-sharp" size={50} color="white" align='right' style={styles.iconBar} />
                </TouchableOpacity>
            </View>

            <Text style={styles.searchtermS}> {searchTerm} </Text>
            <Text style={styles.maktx}> {maktxValue} </Text>

            <FlatList
                style={{ marginBottom: 76, backgroundColor: 'transparent' }}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalContainer} >
                        {/**comparsa pop up principale */}
                        {popView &&
                            <View style={styles.modalContent} >
                                {/**comparsa pop up principale */}

                                <View style={styles.modalContent1}>
                                    {/**tasto chiusura pop-up */}
                                    <TouchableOpacity onPress={handleClosePopup} >
                                        <FontAwesome style={{ alignSelf: 'flex-end' }} name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                    {/**view --> contenitore interno pop-up -- tutti gli elementi */}
                                    <Text style={styles.searchtermPopUp} >{searchTerm}</Text>

                                    <Text style={styles.textPopUpG}>descrizione prodotto</Text>
                                    {/**View -- riga {quantità*+inserimentoNumero+Verme} */}
                                    <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>Quantità*</Text>
                                        {/**view -- campo inserimento numero (sfondo, bordi, ...) */}
                                        <View style={styles.inputNumber}>

                                            < TextInput
                                                style={styles.input}
                                                keyboardType="numeric"
                                                placeholder="Enter a number"
                                                value={numberInput}
                                                onChangeText={handleChangeNumber}
                                                editable={intNum}
                                            />

                                        </View>
                                        <Text style={{ color: 'grey' }}>PZ</Text>
                                    </View>

                                    <View style={{ flexDirection: 'column', alignItems: 'left', opacity: viewPreleva ? 0.5 : viewPrenota ? 0.5 : console.log('') }} >

                                        <CheckBox
                                            checked={selectedIndex === 0}
                                            onPress={() => { if (!viewPreleva) setIndex(0) }}
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            title='Preleva'
                                            disabled={viewPrenota}
                                        />
                                        <CheckBox
                                            checked={selectedIndex === 1}
                                            onPress={() => { if (!viewPrenota) setIndex(1) }}
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            title='Prenota per il prelievo'
                                            name='Prenotazione'
                                            disabled={viewPreleva}
                                        />
                                    </View>

                                    {/**view a fondo pop-up -- bottoni pop-up prelievo/prenotaPreliveo*/}
                                    <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center'/*'5%'*/, marginBottom: -40 }}>
                                        <TouchableOpacity style={styles.popButton1} onPress={handlePressSpostamento}>
                                            <Text style={{ textAlignVertical: 'center', color: 'white' }}>Spostamento</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.popButton2} onPress={handlePressConsumo}>
                                            <Text style={{ textAlignVertical: 'center', color: 'white' }}>Consumo</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>


                                {/**VIEW DA FARE COMPARIRE QUANDO VIENE SCELTO 'Prenota' */}
                                {dispon && (viewPreleva || viewPrenota) &&  //dispon &&
                                    <View style={styles.exPopUp} >
                                        {/**consizione se e visibile -- se e selezionato 'preleva' */}
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20, marginRight: 20 }}>Inserisci id per il consumo:</Text>
                                        <View style={styles.SearchView}>
                                            <TextInput
                                                //style={styles.inputIDP}
                                                placeholder="Enter ID"
                                                value={inputID}
                                                onChangeText={handleChangeID}
                                            />


                                        </View>
                                        {/**view a fondo pop-up -- bottoni pop-up annulla/conferma*/}
                                        <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 20 }}>
                                            <TouchableOpacity style={styles.popExButton1} onPress={handlePressAnnulla}>
                                                <Text style={{ textAlignVertical: 'center', color: 'white' }}>Annulla</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.popExButton2} onPress={handlePressConferma} >
                                                <Text style={{ textAlignVertical: 'center', color: 'white' }}>Conferma</Text>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                }
                            </View>
                        }

                        {/**VIEW: PRENOTA E CONFERMA */}
                        {(viewConfermaPrenota || viewConfermaPrelievo) && // selectedIndex === 1 &&
                            <View style={styles.prenPopUp} >
                                {selectedIndex === 1 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prenotazione di prelievo per il consumo effettuata con successo!</Text>
                                    /**consizione se e visibile -- se e selezionato 'preleva e consumo'*/}

                                {selectedIndex === 0 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prelievo per il consumo effettuato con successo!</Text>
                                }
                                {/**view a fondo pop-up -- bottoni pop-up annulla/conferma*/}
                                <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 20 }}>
                                    <TouchableOpacity style={styles.popExButton3} onPress={handleClosePopup} >
                                        <Text style={{ textAlignVertical: 'center', color: 'white' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </Modal>
            </View >

            <View style={styles.containerEndBar}>
                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('RiepStockScreen', { username: username, search: '' })}>
                    <Ionicons name="arrow-undo-outline" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerScan} onPress={() => status.granted ? navigation.navigate('CameraScan', { username }) : requestPermissionAgain()}>
                    <MaterialCommunityIcons name="line-scan" size={75} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate('EnterScreen', { username: username })}>
                    <AntDesign name="home" size={35} color="white" />
                </TouchableOpacity>
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    maktx: {
        fontSize: 15,
        marginTop: -60,
        marginBottom: 35,
        color: 'grey',
        marginLeft: 20,
    },
    SearchView: {
        marginTop: 10,
        borderRadius: 10,
        verticalAlign: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        paddingLeft: 20,
        backgroundColor: '#E6E6E6',
        marginRight: 20
    },
    inputNumber: {
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#273B4A',
        borderWidth: 1,
        backgroundColor: '#E6E6E6',
        borderRadius: 10
    },
    inputIDP: {
        marginTop: 10,
        marginRight: 60,
        paddingLeft: 5,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        marginLeft: 20,

    },
    searchtermPopUp: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    searchtermS: {
        color: 'black', fontSize: 20,
        marginTop: 60,
        marginLeft: 20,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        height: 80,
        borderBottomColor: '#f6f6f6',
        borderBottomWidth: 100,
    },
    checkbox: {
        alignSelf: 'center',
    },
    popButton1: {
        marginRight: 25,
        color: 'white',
        borderRadius: 30,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#273B4A'
    },
    popButton2: {
        marginRight: 25,
        color: 'white',
        borderRadius: 30,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#607B83'
    },
    popExButton1: {
        marginRight: 25,
        color: 'white',
        borderRadius: 30,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    popExButton2: {
        marginRight: 25,
        color: 'white',
        borderRadius: 30,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#273B4A'
    },
    popExButton3: {
        marginRight: 25,
        color: 'white',
        borderRadius: 30,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#273B4A',
        marginLeft: '25%'
    },
    textPopUpG: {
        color: 'grey',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 40,
        elevation: 5,
        height: 320,
        width: 320,
        position: 'relative',
    },
    modalContent1: {
        marginLeft: 20,
        zIndex: 1
    },
    exPopUp: {
        zIndex: 1,
        borderRadius: 40,
        marginLeft: -20,
        paddingLeft: 20,
        backgroundColor: 'white',
        width: 320,
        paddingBottom: 20,
    },
    prenPopUp: {
        paddingTop: '3%',
        paddingLeft: 20,
        backgroundColor: 'white',
        width: 320,
        height: 160,
        borderRadius: 40,
        paddingBottom: 20
    },
    container: {
        backgroundColor: '#f6f6f6',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    itemLgpla: {
        fontSize: 15,
        color: 'black',
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    itemLgort: {
        color: 'black',
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    itemVerme: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'right',
        marginRight: 20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        fontSize: 28
    },
    itemBestq: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'right',
        marginRight: 20,
        justifyContent: 'center',
        flexWrap: 'wrap',
        color: '#607B83'
    },
    topBar: {
        paddingTop: StatusBar.currentHeight,
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
    item: {
        borderTopWidth: 0.2,
        borderTopColor: '#385A64',
        color: 'transparent',
        backgroundColor: 'transparent',
        padding: 5,
    }
});

export default ProductsResult;

