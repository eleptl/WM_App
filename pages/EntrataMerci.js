import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, StatusBar, Modal, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native'
//checkbox
import { CheckBox } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import CheckBoxMat from '../components/CheckBoxMateriali';
import CameraScan from '../components/CameraScan';

//icon
import { AntDesign, FontAwesome, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';
import axios from 'axios'
import { NearMeRounded } from '@material-ui/icons';

const EntrataMerci = () => {
    const navigation = useNavigation();


    // data giorno corrente
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Restituisce il mese (da 0 a 11)
    const currentDay = currentDate.getDate(); // Restituisce il giorno del mese (da 1 a 31)

    console.log('oggi e: ', 'giorno', currentDay, 'mese', currentMonth, 'anno', currentYear)
    console.log(currentDate.getDay(), '/', currentDate.getMonth(), '/', currentDate.getFullYear())


    const route = useRoute();
    const { username } = route.params;

    //refresh
    const [refresh, setRefresh] = useState(false)

    //numero ordine
    const [numOrdine, setNumOrdine] = useState('')
    //ARRAY ORDINI
    const [Items, setItems] = useState([])
    //ordini attuali
    const [ordiniAttuali, setOrdiniAttuali] = useState([])
    //ordini vecchi
    const [ordiniVecchi, setOrdiniVecchi] = useState([])

    //pop up di modifica
    const [modifyView, setModifyView] = useState(false)
    // popUp ubicazione scelta
    const [viewUbiPopUp, setviewPopUbic] = useState(false)
    // ubicazione scelta
    const [inputUbic, setInputUbic] = useState('');
    // magazzino scelto
    const [lgortValue, setLgortValue] = useState('')
    //note
    const [note, setNote] = useState('')
    //suggerimmenti
    const [suggestions, setSuggestions] = useState([]);
    //checkBox
    const [isSelected, setSelection] = React.useState(false);

    //nmerci
    var qtamerce;


    useEffect(() => {
        //handleSearch(index)
        console.log('nInput  useEffect:', numOrdine)
    }, [refresh])


    //suggerimenti ubicazioni
    const handleSubmit1 = async (text) => {
        console.log('textCerco', text)
        try {
            if (text === '' || text === null || text.length === 0) {
                setSuggestions([])
            }
            text = text.toUpperCase(text)
            const response = await axios.get(`http://192.168.1.161:5000/api/ubicazione/lgplaList?q=${text}`); /**http://192.168.140.227:5000/api/ubicazione/lgplaList?q*/  
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

    const handleChangeUbic = (text) => {
        setNumOrdine(text)
    }

    const handleCopyText = async () => {
        if (text.trim() === numOrdine) {
            Alert.alert('Error', 'Text input is empty');
            return;
        }

        try {
            await Clipboard.setString(numOrdine);
        } catch (error) {
            console.error('Error copying text:', error);
            Alert.alert('Error', 'Failed to copy text to clipboard');
        }
    };


    //prova per popUp di modifica
    const hadlePressOrder = () => {
        setModifyView(true)
    }

    const handlePressConf = () => {
        setviewPopUbic(true)
    }

    const handleClosePopup = () => {
        setInputUbic('')
        setNote('')
        setLgortValue('')
        setviewPopUbic(false)
        setModifyView(false)
    }

    const handlePressAnnulla = () => {
        setInputUbic('')
        setNote('')
        setLgortValue('')
        setviewPopUbic(false)
    }

    //scelta materiali check
    const handleCheck = () => {
        setSelection(!isSelected)
        console.log('check si')
    }
    //cambio numero merce selezionata
    const handleChangeQuantita = (number) => {
        setQuantita(number)
    }

    {/*  GET DEGLI ORDINI E DIVISIONE DI ESSI
                 index=indirizzo di ricerca degli ordini
                const [items, setItems] = useState('')

                const handleSearch = async (index) => {
                 const err = 'nessun dato trovato';

                try {
                    const response = await axios.get(index)

                    const ubicazioni = response.data.map((ordine) => ({
                        data: ordini
                    }));
                    setItems(ubicazioni);
                    let odriniAttuali = []
                    let ordiniVecchi = []

                    //smistamento orfini da visual e non
                    for(let i = 0; i < ordini.lenght; i++){
                        if(ordini[i].data.DATAPREVISTACONSEGNA > currentDate )
                            ordiniAttuali.push(ordini[i])
                        else
                            ordiniVecchi.push(ordini[i])
                    }
                    setOrdiniAttuali(ordiniAttuali)
                    setOrdiniVecchi(ordinivecchi)

                    if (ubicazioni.length === 0) {
                        alert('Nessuna ubicazione trovata con il codice inserito (LGPLA)')
                        navigation.navigate('RiepStockScreen', { username: username })
                    }
                } catch (err) {
                    console.error('Error fetching data:', err);
                    alert('ERRORE DI CONNESSIONE')
                    navigation.navigate('RiepStockScreen', { username: username })
                };
                 }; */}


    {/* METODO PER IL RECUPERO E LA STAMPA DEI DATI 
                const renderItem = ({ ordini }) => (
                    <TouchableOpacity style={{ setcolor: 'black', opacity: 0.38, backgroundColor: item.data.BESTQ == 'Utilizzo Libero' ? '#276111' : item.data.BESTQ === 'Bloccato' ? '#FF735C' : '#FFB63C' }}
                        <View style={styles.item}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemLgpla}>{ordini.data.EBELN}</Text>
                                <Text style={styles.itemVerme}>{ordini.data.MATNR + ' ' + item.data.MENGE}</Text>
                            </View
                    </TouchableOpacity>
                ); */}




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



            <View style={{ marginTop: 50 }}>
                <Text>Barra ricerca ordini vecchi</Text>
                <SafeAreaView>
                    <View style={styles.SearchCont}>
                        <TextInput
                            type="text"
                            placeholder=" Cerca Vecchio Ordine... "
                            value={numOrdine}

                            onChangeText={(text) => {
                                handleChange(text);
                            }}
                        />
                        {/* METODO COPIA INPUT
                        <TouchableOpacity onPress={handleCopyText}>
                            <Feather style={styles.copyIcon} name="copy" size={24} color="grey" />
                        </TouchableOpacity> */}
                    </View>
                    {/* suggerimenti pe futuri numeri d'ordine presenti (json)
                    {suggestions.length > 0 && (
                        <ScrollView style={styles.suggestionsContainer}>
                            {suggestions.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView> 
                     )} */}

                </SafeAreaView>
                <Text>Filtro per visualizzare solo gli ordini con data di consegna prevista oltre il giorno corrente</Text>

                {/* <FlatList
                style={{ marginBottom: 76, backgroundColor: 'transparent' }}
                data={ordini}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                /> */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modifyView}
                    onRequestClose={() => {
                        setModifyView(false);
                    }}
                >
                    <View style={styles.modalContainer} >
                        {/**comparsa pop up principale */}

                        <View style={styles.modalContent}>
                            {/**tasto chiusura pop-up */}
                            <TouchableOpacity onPress={handleClosePopup} >
                                <FontAwesome style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }} name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={{ backgroundColor: 'white' }}>
                                <View>
                                    <Text style={{ marginLeft: 20 }}> ELENCO MATERIALI PRESENTI NELL'ORDINE SELEZIONATO</Text>

                                </View>
                                {/* <View style={styles.container1}> */}
                                {/**------------------------------------------------------------------------------------------------------------------------------*/}
                                <ScrollView style={{ backgroundColor: 'white', width: '95%', alignSelf: 'center', height: '95%' }}>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp}  ></CheckBoxMat>
                                    </View>

                                    <View style={styles.checkboxContainer}>
                                        <CheckBoxMat disabled={viewUbiPopUp} ></CheckBoxMat>
                                    </View>
                                </ScrollView>
                                {/* </View> */}
                                {/**------------------------------------------------------------------------------------------------------------------------------*/}


                            </View>
                            <View style={{
                                flexDirection: 'row', marginLeft: 20, marginRight: 50, marginTop: '15 % '
                            }}>
                                < TouchableOpacity style={{ marginLeft: '10%', marginTop: '2%' }} onPress={handleClosePopup}>
                                    <AntDesign name="closecircle" size={24} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: '80%', marginTop: '2%' }} onPress={handlePressConf} >
                                    <AntDesign name="checkcircle" size={24} color="green" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {viewUbiPopUp &&
                            <View style={styles.ubicPopUp}>
                                <Text> Scelta ubi/mag/note</Text>
                                {/**inserire le linee editabili */}
                                <View style={styles.SearchView}>
                                    <TextInput
                                        //style={styles.inputIDP}
                                        type="text"
                                        placeholder="Enter MAGAZZINO"
                                        value={lgortValue}
                                        editable={true}
                                        onChangeText={(text) => {
                                            setLgortValue(text);
                                            //handleChangeUbic(text);
                                            //handleSubmit1(text)
                                        }}
                                    /></View>
                                {/* <View> */}
                                <View style={styles.SearchView}>
                                    <TextInput
                                        //style={styles.inputIDP}
                                        type="text"
                                        placeholder="Enter UBICAZIONE"
                                        value={inputUbic}
                                        editable={true}
                                        onChangeText={(text) => {
                                            setInputUbic(text);
                                            handleChangeUbic(text);
                                            handleSubmit1(text)
                                        }}
                                    />
                                    <View>
                                        {suggestions.length > 0 && (
                                            <ScrollView style={styles.suggestionsContainer}>
                                                {suggestions.map((item, index) => (
                                                    <TouchableOpacity key={index} onPress={() => handleSuggestionPress(item)}>
                                                        <Text>{item}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        )}</View>

                                    {/*</View> */}
                                </View>
                                <View style={styles.SearchView}>
                                    <TextInput
                                        //style={styles.inputIDP}
                                        multiline={true}
                                        numberOfLines={3}
                                        type="text"
                                        placeholder="Enter NOTE"
                                        value={note}
                                        editable={true}
                                        onChangeText={(text) => {
                                            setNote(text);
                                            // handleChangeUbic(text);
                                            // handleSubmit1(text)
                                        }}
                                        textAlignVertical="top" // Allinea il testo in alto
                                        style={{ height: 80 }} // Imposta l'altezza a 80 punti
                                    /></View>

                                <View style={{ textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: '5%', marginLeft: 20 }}>
                                    <TouchableOpacity style={styles.popExButton1} onPress={handlePressAnnulla}>
                                        <Text style={{ textAlignVertical: 'center', color: 'white' }}>Annulla</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.popExButton2} >
                                        <Text style={{ textAlignVertical: 'center', color: 'white' }} >Conferma</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        }


                    </View>
                </Modal >

                <Text>PopUp per la modifica dell'ordine</Text>

                <TouchableOpacity onPress={hadlePressOrder}>
                    <Text>PROVA ORDINE CLICK QUI</Text>
                </TouchableOpacity>

                <Text>popUp scelta ubicazione/magazzino</Text>
            </View >


            <View style={styles.containerEndBar}>
                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('EnterScreen', { username: username })}>
                    <Ionicons name="arrow-undo-outline" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerScan}>
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
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        marginTop: 15,
        marginLeft: -10,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 400

    },
    modalContent: {
        backgroundColor: 'white',
        height: 340,
        margin: '10%',
        borderRadius: 40,
        elevation: 5,
        // maxHeight: 250,
        paddingBottom: 100,
        width: 320,
        position: 'relative',
    },
    modalContent1: {
        marginLeft: 20,
        zIndex: 1
    }, exPopUp: {
        zIndex: 1,
        borderRadius: 40,
        paddingLeft: 20,
        backgroundColor: 'white',
        width: 320,
        paddingBottom: 20,
    }, popExButton1: {
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
    ubicPopUp: {
        paddingTop: '3%',
        marginTop: -110,
        paddingLeft: 20,
        backgroundColor: 'white',
        width: 320,
        height: 270,
        borderRadius: 40,
        paddingBottom: 20
    },
    SearchCont: {
        marginTop: 30,
        borderRadius: 60,
        verticalAlign: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 65,
        width: '60%',
        margin: 10,
        alignSelf: 'center',
        paddingLeft: 10
    }, SearchView: {
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


export default EntrataMerci;