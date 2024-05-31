import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Modal, StatusBar, FlatList, TouchableOpacity, Input, ScrollView, RefreshControlBase, SafeAreaView } from 'react-native';
import { useReducer, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useIsFocused, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListItem } from '@rneui/themed';
//axios
import axios from 'axios';

//permessi fotocamera
import { Linking } from "react-native";
import { useCameraPermissions } from "expo-image-picker";
//camera
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";



import SearchBar from '../components/SearchBarProducts';
import { BorderColor, SpaceBar } from '@material-ui/icons';
import { stringifyValueWithProperty } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { useField } from 'formik';
import { ChangeCircle, PersonOffTwoTone, ViewWeek } from '@mui/icons-material';
import RiepStock from './RiepStock';

//icon user/setting
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';//scan
import { MaterialCommunityIcons } from '@expo/vector-icons';
//home
import { AntDesign } from '@expo/vector-icons';

//CheckBox
import { CheckBox, Icon } from '@rneui/themed'
//closePop-Up
import { FontAwesome } from '@expo/vector-icons';
import { stepButtonClasses } from '@mui/material';



const LocationsResult = () => {
    console.log('eccomiUB')

    const route = useRoute();
    let { index } = '';
    let { searchTerm } = '';

    if (!((index) === stringifyValueWithProperty(route.params))) {
        index = stringifyValueWithProperty(route.params.index);
        searchTerm = stringifyValueWithProperty(route.params.searchTerm)
    }
    //navigazione
    const navigation = useNavigation();
    //id/ubic popup 
    const [inputID, setInputID] = useState('');
    const [inputUbic, setInputUbic] = useState('');
    //refresh
    const [refresh, setRefresh] = useState(false)
    //focus
    const isFocused = useIsFocused();
    //elementi
    const [items, setItems] = useState([]);
    //blocco ricerca/comunicazione
    const [called, setCalled] = useState(false);
    //visibilità Modal
    //prova pop-up
    const [modalVisible, setModalVisible] = useState(false);
    //input number in popUp
    const [numberInput, setNumberInput] = useState('');
    //editable input number
    const [intNum, setIntNum] = useState(true)
    //View a comparsa prelievo
    const [viewPreleva, setViewPreleva] = useState(false)
    //view a comparsa prenotazione
    const [viewPrenota, setViewPrenota] = useState(false)
    //spostamento
    const [viewPrelevaS, setViewPrelevaS] = useState(false)
    //view a comparsa prenotazione
    const [viewPrenotaS, setViewPrenotaS] = useState(false)
    //GVaribalesCheck
    const [selectedIndex, setIndex] = React.useState(null);
    //view Principale del popup
    const [popView, setPopView] = useState(false)
    //popUp Conferma prelievo
    const [viewConfermaPrelievo, setConfPrelievo] = useState(false)
    //pop up conferma prenotazione
    const [viewConfermaPrenota, setConfPrenota] = useState(false)
    //spostamento
    const [viewConfermaPrelievoS, setConfPrelievoS] = useState(false)
    //pop up conferma prenotazione
    const [viewConfermaPrenotaS, setConfPrenotaS] = useState(false)
    //disponibilità merce
    const [dispon, setDispon] = useState(true)
    //capire se e seleIonato o no 'spostamento'
    const [spostamento, setSpostamento] = useState(false)
    //prova verme
    const [vermeValue, setVermeValue] = useState(0);
    const [prenotValue, setPrenotValue] = useState(0);
    //id materiale
    const [matnrValue, setMatnrValue] = useState('')
    //stato materiale in magazzino
    const [bestqValue, setBestqValue] = useState('')
    //ubicazione da cui seleziono il prodotto su cui esiste gia il prodotto
    const [lgplaValue, setLgplaValue] = useState('')
    const [lgortValue, setLgortValue] = useState('')
    //ERRORE lgpla
    const [viewErroreSpostamento, setViewErrore] = useState(false)
    //camera
    const [viewCam, setViewCam] = useState(false)

    console.log('modNavParams: ', route.params.username)
    const username = route.params.username

    //permessi fotocamera
    const [status, requestPermissions] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    //suggerimenti ubicazione input
    //suggerimmenti
    const [suggestions, setSuggestions] = useState([]);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    const requestPermissionAgain = () => {
        if (status.granted) {
            status.canAskAgain = false
            navigation.navigate('CameraScan', { username })
        } else {
            Linking.openSettings();
            requestPermissions();
            console.log(status)
        }
    }

    const permesso = () => {
        Linking.openSettings();
        requestPermissions();
        console.log(status)
    }

    useEffect(() => {
        handleSearch(index)
        console.log('nInput  useEffect:', numberInput)
    }, [refresh])



    const handleSearch = async (index) => {
        const err = 'nessun dato trovato';

        try {
            const response = await axios.get(index)

            const ubicazioni = response.data.map((ubicazione) => ({
                data: ubicazione
            }));
            setItems(ubicazioni);
            setLgortValue(ubicazioni[0].data.LGORT)

            if (ubicazioni.length === 0) {
                alert('Nessuna ubicazione trovata con il codice inserito (LGPLA)')
                navigation.navigate('RiepStockScreen', { username: username })
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('ERRORE DI CONNESSIONE')
            navigation.navigate('RiepStockScreen', { username: username })
        };
    };

    //function
    //suggerimenti input ubicazione
    const handleSubmit1 = async (text) => {
        console.log('textCerco', text)
        try {
            if (text === '' || text === null || text.length === 0) {
                setSuggestions([])
            }
            text = text.toUpperCase(text)
            const response = await axios.get(`http://192.168.1.161:5000/api/ubicazione/lgplaList?q=${text}`); /*`http://192.168.140.227:5000/api/ubicazione/lgplaList?q=${text}`)*/ 
            setSuggestions(response.data.filter(item => item.includes(text))); // Filtra i suggerimenti che contengono la parte dell'input
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };
    const handleSuggestionPress = (suggestion) => {
        setInputUbic(suggestion); // Imposta il termine di ricerca come suggerimento selezionato
        setSuggestions([]); // Nascondi i suggerimenti
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
        setPrenotValue(prenotValue)
        console.log('bbb:', prenotValue)

        if (selectedIndex !== 1 && selectedIndex !== 0) {
            alert('SCELTA OBBLIGATORIA')
        } else
            if (!numberInput || isNaN(numberInput)) {
                alert('Inserisci un numero valido.');
                return; // Interrompi l'azione se il numero non è valido
            }
        //prova differenza verme prenotati
        setNumberInput(numberInput);

        // Controlla se il numero inserito supera il valore "verme" memorizzato
        if (parseInt(numberInput) > vermeValue || parseInt(numberInput) > vermeValue - prenotValue) { //guardo qua
            console.log('PREN VALUE CONSUMO', prenotValue)
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
                setViewPrelevaS(true)
                setViewPrenotaS(false)
                setViewPreleva(false)
                setViewPrenota(false)
            } else
                if (selectedIndex === 1) {
                    setViewPrenotaS(true)
                    setViewPrelevaS(false)
                    setViewPreleva(false)
                    setViewPrenota(false)
                }
        }
        console.log('gestion Spostmento pop-up')
    };
    //Button Consumo pop-up
    const handlePressConsumo = () => {
        setPrenotValue(prenotValue)
        console.log('bbb:', prenotValue)

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
                if (parseInt(numberInput) > vermeValue || parseInt(numberInput) > vermeValue - prenotValue) { //guardo qua
                    console.log('PREN VALUE CONSUMO', prenotValue)
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
        if (viewCam) {
            alert('Inquadra il codice di Destinazione o esci dalla modalità scanner')
            return
        }
        //editable input number
        setIntNum(true);
        if (selectedIndex === 0) {
            setViewPreleva(false)
            setViewPrelevaS(false)
            console.log('Gestione Annulla Preleva')
        }

        if (selectedIndex === 1) {
            setViewPrenota(false)
            setViewPrenotaS(false)
            console.log('Gestione Annulla Preleva')
        }
    }
    //Button Conferma
    const handlePressConferma = () => {
        if (viewCam) {
            alert('Inquadra il codice di Destinazione o esci dalla modalità scanner')
            return
        }
        console.log('ccc:', prenotValue)
        // if (selectedIndex === 0) {
        if (viewPreleva || viewPrenota) {   //prelievo
            if (!inputID.trim()) {
                alert('ID OBBLIGATORIO');
                return;
            } else {
                if (selectedIndex === 0) {
                    setConfPrelievo(true);
                    setPopView(false);
                    setViewPreleva(false);
                    console.log('modifyPreleva')
                    modifyPreleva()
                    console.log('modifyPreleva1')
                }

                if (selectedIndex === 1) {
                    setConfPrenota(true);
                    setPopView(false);
                    setViewPrenota(false);
                    console.log('modifyPrenota')
                    modifyPrenota();
                    console.log('modifyPrenota1')
                }
            }
        }
        if (viewPrelevaS || viewPrenotaS) {
            if (!inputUbic.trim()) {
                alert('DESTINAZIONE OBBLIGATORIA');
                return;
            } else {
                if (selectedIndex === 0) {
                    modifyPrelevaS()
                }
                if (selectedIndex === 1) {
                    modifyPrenotaS();
                }
            }
        }
        setRefresh(!refresh)
    };

    //--prenota spostamento

    const modifyPrelevaS = () => {

        console.log('PRELIEVO PER SPOSTAMENTO')
        console.log(viewPrenotaS)
        console.log(viewPrelevaS)

        if (viewPrelevaS) {
            console.log('pz prelevati per lo spostamento')

            const newData = {
                fromLgpla: lgplaValue,
                fromMatnr: matnrValue,
                toLgpla: inputUbic.toUpperCase(),
                toMatnr: matnrValue,
                quantity: parseInt(numberInput)
            };

            console.log('dato con chiamata: ', newData)
            axios.put('http://192.168.1.161:5000/api/ubicazione/spost'/*'http://192.168.140.227:5000/api/ubicazione/spost'*/, newData)
                .then(response => {
                    console.log('ok')

                    setConfPrelievoS(true);
                    setPopView(false);
                    setViewPrelevaS(false);
                })
                .catch(error => {
                    console.log('ERRORE', error.message)
                    console.log('ERRORE PRELIEVO SPOSTAMENTO')
                    setPopView(false);
                    setViewPrelevaS(false);
                    setConfPrelievoS(false)
                    setViewErrore(true)
                });
        }
    }

    /*const modifyPrenotaS*/

    const modifyPrenotaS = () => {
        console.log('PRELIEVO PER SPOSTAMENTO')
        console.log(viewPrenotaS)
        console.log(viewPrelevaS)

        if (viewPrenotaS) {
            console.log('pz prelevati per lo spostamento')

            const newData = {
                fromLgpla: lgplaValue,
                fromMatnr: matnrValue,
                toLgpla: inputUbic.toUpperCase(),
                toMatnr: matnrValue,
                quantity: parseInt(numberInput)
            };

            console.log('dato con chiamata: ', newData)
            axios.put('http://192.168.1.161:5000/api/ubicazione/spost1'/*'http://192.168.140.227:5000/api/ubicazione/spost1'*/, newData)
                .then(response => {

                    setConfPrenotaS(true);
                    setPopView(false);
                    setViewPrenotaS(false);
                    console.log('ok')
                })
                .catch(error => {
                    setConfPrenotaS(false)
                    setPopView(false);
                    setViewPrelevaS(false);
                    setViewErrore(true)
                    console.log('ERRORE', error.message)
                });
        }
    }


    const modifyPrenota = () => {

        if (viewPrenota) {
            const newData = [{
                MATNR: matnrValue,
                // MAKTX: maktxValue
                BESTQ: " PZ Prenotati per il Prelievo",
                VERME: vermeValue,
                ZPRENOTATI: prenotValue + parseInt(numberInput)
            }];
            axios.put('http://192.168.1.161:5000/api/ubicazione'/* 'http://192.168.140.227:5000/api/ubicazione'*/, newData)
                .then(response => {
                    console.log('ok')
                })
                .catch(error => {
                    setViewPrelevaS(false)
                    setViewErrore(true)
                    console.log('ERRORE', error)
                });
        }
    }

    //--prelievo spostamento
    //modifyPrenota();

    const modifyPreleva = () => {
        console.log('PRELIEVO PER CONSUMO')
        if (viewPreleva) {
            const newData = [{
                MATNR: matnrValue,
                BESTQ: bestqValue,
                VERME: vermeValue - parseInt(numberInput),
                ZPRENOTATI: prenotValue
            }];
            console.log('input', numberInput)
            axios.put('http://192.168.1.161:5000/api/ubicazione'/* 'http://192.168.140.227:5000/api/ubicazione'*/, newData)
                .then(response => {
                    console.log('ok')
                })
                .catch(error => {
                    console.log('ERRORE', error)
                });
        }

    }


    //closePOpUp
    const handleClosePopup = () => {
        //input number            
        setIntNum(true)

        setViewCam(false)

        //disponibilità prodotti
        setDispon(true);

        //reset input number/id/ubic
        setNumberInput('')
        setViewErrore(false)
        setInputUbic('')
        setInputID('')
        setPopView(false)
        setModalVisible(false)
        setViewPreleva(false)
        setViewPrenota(false)
        setConfPrelievo(false)
        setViewPrenotaS(false)
        setViewPrelevaS(false)
        setConfPrenota(false)
        setConfPrelievoS(false)
        setConfPrenotaS(false)
        setIndex()
        console.log('chiusura pop up')
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ setcolor: 'black', opacity: 0.38, backgroundColor: item.data.BESTQ == 'Utilizzo Libero' ? '#276111' : item.data.BESTQ === 'Bloccato' ? '#FF735C' : '#FFB63C' }}

            onPress={item.data.BESTQ == 'Controllo Qualita' || item.data.BESTQ == 'Bloccato' ?
                () => { const bq = item.data.BESTQ; alert(bq); setModalVisible(false); setPopView(false); setLgortValue(item.data.LGORT); console.log(('perche non stampi: ', item.data.LGORT)) }
                : item.data.VERME == item.data.ZPRENOTATI ? () => { alert('Tutti i pezzi sono stati prenotati'); setModalVisible(false); setPopView(false); setPrenotValue(item.data.ZPRENOTATI); setLgortValue(item.data.LGORT); console.log(('perche non stampi: ', item.data.LGORT)) }
                    : () => {
                        setModalVisible(true); setPopView(true);
                        setLgplaValue(item.data.LGPLA), setMatnrValue(item.data.MATNR); setVermeValue(item.data.VERME); setBestqValue(item.data.BESTQ); setPrenotValue(item.data.ZPRENOTATI); setLgortValue(item.data.LGORT); console.log(('perche non stampi: ', item.data.LGORT))
                    }}>
            <View style={styles.item}>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemLgpla}>{item.data.MATNR}</Text>
                    <Text style={styles.itemVerme}>{item.data.VERME + ' ' + item.data.MEINS}</Text>
                </View>
                <View style={styles.itemDetails}>


                    <Text style={styles.itemLgort}>{item.data.MAKTX}</Text>

                    {item.data.ZPRENOTATI !== 0 && (item.data.BESTQ === " PZ Prenotati per il Prelievo") &&
                        <Text style={styles.itemBestq}>{item.data.ZPRENOTATI + item.data.BESTQ}</Text>
                    }
                    {item.data.ZPRENOTATI === 0 && item.data.BESTQ === 'Utilizzo Libero' &&
                        < Text style={styles.itemBestq}>{item.data.BESTQ}</Text>
                    }
                    {(item.data.BESTQ === 'Bloccato') &&
                        < Text style={styles.itemBestq}> {item.data.BESTQ} </Text>
                    }
                    { /**guardo qui -- non funziona*/}
                    {item.data.ZPRENSPOSTAMENTO !== 0 &&
                        <Text style={styles.itemBestq}> {item.data.ZPRENSPOSTAMENTO + item.data.BESTQ1} </Text>
                    }
                    {item.data.ZARRIVO !== 0 &&
                        <Text style={styles.itemBestq}> {item.data.ZARRIVO + item.data.BESTQ2} </Text>
                    }

                </View>
            </View>
        </TouchableOpacity>
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
            <Text style={styles.lgort}>{lgortValue}</Text>

            <FlatList
                style={{ marginBottom: 76, backgroundColor: 'transparent' }}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {////////////////////////////////////////////////////////////////////////////////////////
            }
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
                        {popView &&//popView &&
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
                                            disabled={viewPrenota || viewPrenotaS}
                                        />
                                        <CheckBox
                                            checked={selectedIndex === 1}
                                            onPress={() => { if (!viewPrenota) setIndex(1) }}
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            title='Prenota per il prelievo'
                                            name='Prenotazione'
                                            disabled={viewPreleva || viewPrelevaS}
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



                                {/**VIEW DA FARE COMPARIRE QUANDO VIENE SCELTO 'Consumo ' */}
                                {dispon && (viewPreleva || viewPrenota) &&
                                    <View style={styles.exPopUp} >
                                        {/**consizione se e visibile -- se e selezionato 'preleva' */}
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20, marginRight: 20 }}>Inserisci id per il consumo:</Text>
                                        {//!(spostamento) &&
                                            <View style={styles.SearchView}>
                                                <TextInput
                                                    //style={styles.inputIDP}
                                                    placeholder="Enter ID"
                                                    value={inputID}
                                                    onChangeText={handleChangeID}
                                                />


                                            </View>}


                                        {/**view a fondo pop-up -- bottoni pop-up annulla/conferma*/}
                                        <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 20 }}>
                                            <TouchableOpacity style={styles.popExButton1} onPress={handlePressAnnulla}>
                                                <Text style={{ textAlignVertical: 'center', color: 'white' }}>Annulla</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.popExButton2} onPress={handlePressConferma} >
                                                <Text style={{ textAlignVertical: 'center', color: 'white' }} >Conferma</Text>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                }

                                {dispon && (viewPrelevaS || viewPrenotaS) &&
                                    <View style={styles.exPopUp} >
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20, marginRight: 20 }}>Inserisci id per il consumo:</Text>
                                        <View style={styles.SearchView}>
                                            <TextInput
                                                //style={styles.inputIDP}
                                                type="text"
                                                placeholder="Enter Destination"
                                                value={inputUbic}
                                                editable={!(viewCam)}
                                                onChangeText={(text) => {
                                                    setInputUbic(text);
                                                    handleChangeUbic(text);
                                                    handleSubmit1(text)
                                                }}
                                            />



                                            <TouchableOpacity style={{ paddingLeft: '30%' }} onPress={() => status.granted ? setViewCam(true) : permesso() /**aprire fotocamera ma anche tornare poi alla conferma dello spostamento */}>
                                                <AntDesign name="scan1" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        {suggestions.length > 0 && !(viewCam) && (
                                            <ScrollView style={styles.suggestionsContainer}>
                                                {suggestions.map((item, index) => (
                                                    <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)}>
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        )}


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

                        {/**SPOSTAMENTO */}
                        {/**VIEW: PRENOTA E CONFERMA */}
                        {(viewConfermaPrenotaS || viewConfermaPrelievoS) && // selectedIndex === 1 &&
                            <View style={styles.prenPopUp} >
                                {selectedIndex === 1 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prenotazione SPOSTAMENTO di prelievo per il consumo effettuata con successo!</Text>
                                    /**consizione se e visibile -- se e selezionato 'preleva e consumo'*/}

                                {selectedIndex === 0 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prelievo SPOSTAMENTO per il consumo effettuato con successo!</Text>
                                }
                                {/**view a fondo pop-up -- bottoni pop-up annulla/conferma*/}
                                <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 20 }}>
                                    <TouchableOpacity style={styles.popExButton3} onPress={handleClosePopup} >
                                        <Text style={{ textAlignVertical: 'center', color: 'white' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {viewErroreSpostamento &&
                            <View style={styles.prenPopUp} >
                                {selectedIndex === 1 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prenotazione SPOSTAMENTO ERRORE </Text>
                                /**consizione se e visibile -- se e selezionato 'preleva e consumo'*/}

                                {selectedIndex === 0 &&
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 20, marginLeft: 20 }}>Prelievo SPOSTAMENTO ERRORE</Text>
                                }
                                {/**view a fondo pop-up -- bottoni pop-up annulla/conferma*/}

                                <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 20, marginLeft: 20 }}>
                                    <TouchableOpacity style={styles.popExButton3} onPress={handleClosePopup} >
                                        <Text style={{ textAlignVertical: 'center', color: 'white' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {/* </Camera> */}
                        {viewCam &&
                            <View style={{ flex: 1, paddingTop: 100 }}>
                                {/* <Camera style={{ height: 300, width: 300 }}> */}

                                <View style={styles.scannerOverlay}>
                                    <Camera

                                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                    {/* <BarCodeScanner

                                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                        style={StyleSheet.absoluteFillObject}
                                    /> */}
                                    <TouchableOpacity style={styles.exit} onPress={() => setViewCam(false)}>
                                        <AntDesign name="leftcircle" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </Modal>
            </View >

            < View style={styles.containerEndBar} >
                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('RiepStockScreen', { username: username })}>
                    <Ionicons name="arrow-undo-outline" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerScan} onPress={() => status.granted ? navigation.navigate('CameraScan', { username }) : requestPermissionAgain()}>


                    <MaterialCommunityIcons name="line-scan" size={75} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate('EnterScreen', { username: username })}>
                    <AntDesign name="home" size={35} color="white" />
                </TouchableOpacity>
            </View >
        </View >
    );
};
const styles = StyleSheet.create({
    suggestionsContainer: {
        borderWidth: 0,
        borderRadius: 3,
        marginTop: -6,
        width: '80%',
        backgroundColor: '#E6E6E6',
        alignSelf: 'center',
        maxHeight: 90,
        alignSelf: 'center',
        marginLeft: - 20,
        padding: 10
    },
    lgort: {
        fontSize: 15,
        marginTop: -60,
        marginBottom: 35,
        color: 'grey',
        marginLeft: 20,
    },
    scannerOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        transform: [{ rotate: '90deg' }],
        marginTop: '-10%',
        width: '70%',
    },
    exit: {
        align: 'left',
        align: 'end',
        marginTop: '90%',
        marginRight: '65%',
        transform: [{ rotate: '270deg' }],
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
        //borderWidth: 1,
        marginTop: 10,
        marginRight: 60,
        paddingLeft: 5,
        //borderColor: '#273B4A',
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
    }, exPopUp: {
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


export default LocationsResult;