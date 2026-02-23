import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar, SectionList, KeyboardAvoidingView, Modal, Button, VirtualizedList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { format } from 'date-fns';
import { it, nb } from 'date-fns/locale';
//import { CheckBox } from '@rneui/themed';
//import { yellow } from '@material-ui/core/colors';
//import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
//
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);


const POrderResult = ({ disabled, ...props }) => {

  //navigazione
  const navigation = useNavigation();

  //route -- dati route
  const route = useRoute();
  const { username, index } = route.params;

  //elementi di ricerca
  const [isSearch, setIsSearch] = useState(false);

  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  //elementi trovati
  const [items, setItems] = useState([]);

  //elementi selezionati
  const [selectedItems, setSelectedItems] = useState([]);

  const [ricerca, setRicerca] = useState('');
  const [nMerce, setQuantita] = useState('');
  const [quantity1, setQuantity] = useState(0);

  //visibilità popup
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirm, setIsConf] = useState(false)

  //numero bolla
  const [nBolla, setNBolla] = useState('')

  //useEffect
  useEffect(() => {
    if (route.params.isSearch !== isSearch) {
      setIsSearch(route.params.isSearch);
    }
    if (route.params.start !== startDate) {
      setStartDate(route.params.start);
    }
    if (route.params.end !== endDate) {
      setEndDate(route.params.end);
    }
  }, [route.params]);


  useEffect(() => {
    handleSubmit1(index);
  }, [isSearch]);


  useEffect(() => {
    handleSubmit1(index);
  }, [isSearch]);

  useEffect(() => {
    setModalVisible(false)
  }, [(isConfirm)])


  //handle method
  // Funzione per aggiornare i dati dalla backend
  const refreshData = async () => {
    try {
      const response = await axios.get(index); // Eseguire la chiamata API per ottenere i dati aggiornati
      const periodOrder = response.data.map((pOrder) => ({
        data: pOrder,
      }));

      if (periodOrder.length === 0) {
        // Gestire il caso in cui non ci siano dati trovati
        alert('Nessun prodotto trovato');
        setItems([]);
      } else {
        // Aggiornare lo stato degli items con i nuovi dati
        setItems(periodOrder);
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      alert('Si è verificato un errore durante il recupero dei dati');
    }
  };

  const formatDate = (data) => {
    let date = route.params.start;
    const year = data.substring(0, 4);
    const month = data.substring(4, 6);
    const day = data.substring(6, 8);
    date = `${day}/${month}/${year}`;
    setRicerca(date);
    return date;
  };

  const handleBolla = () => {
    setIsConf(true)
    setModalVisible(false);
  };

  const handleConfBolla = async () => {
    if (nBolla > 0) {
      setIsConf(false);

      try {
        let i;
        for (i = 0; i < selectedItemsArray.length; i++) {
          const promises = selectedItemsArray.map(async ({ ebeln, ebelp, matnr, quantity }) => {
            // Esegui la prima chiamata per aggiornare la quantità
            // await axios.put(`http://192.168.1.9:5000/api/modifyMenge/?ebeln=${ebeln}&matnr=${matnr}&menge=${parseInt(quantity)}`);
            await axios.put(`http://192.168.1.163:5000/api/modifyMenge/?ebeln=${ebeln}&matnr=${matnr}&menge=${parseInt(quantity)}`);

            // Esegui la seconda chiamata per aggiornare i dettagli di entrata merci
            // await axios.post(`http://192.168.1.9:5000/api/entrata/updateEM/?EBELN=${ebeln}&EBELP=${ebelp}&MATNR=${matnr}&MENGE=${quantity}&nBolla=${nBolla}`);
            await axios.post(`http://192.168.1.163:5000/api/entrata/updateEM/?EBELN=${ebeln}&EBELP=${ebelp}&MATNR=${matnr}&MENGE=${quantity}&nBolla=${nBolla}`);


            // await axios.post(` http://192.168.1.9:5000/api/deleteZeroQuant/?EBELN=${ebeln}&EBELP=${ebelp}&MATNR=${matnr}`);
            await axios.post(` http://192.168.1.163:5000/api/deleteZeroQuant/?EBELN=${ebeln}&EBELP=${ebelp}&MATNR=${matnr}`);

          });
          await Promise.all(promises);
          refreshData();
        }
        // Resetta lo stato locale
        setNBolla('');
        setModalVisible(false);
        setSelectedItems({});
      } catch (error) {
        alert('Si è verificato un errore durante l\'aggiornamento delle quantità: ' + error);
        console.error('Errore durante l\'aggiornamento delle quantità:', error);
      }
    } else {
      alert('Inserisci un numero di bolla valido');
    }
  };

  const handleAnnulla = () => {
    setModalVisible(false)
    setIsConf(false)
  }

  const handleConfirm = () => {
    if (selectedItemsArray.some(item => item.quantity > 0)) {

      setModalVisible(true);
    } else {
      alert('Seleziona almeno un elemento con quantità maggiore di zero.');
    }
  };

  const handleSubmit1 = async (index) => {
    if (index !== '') {
      try {
        const response = await axios.get(index);
        const periodOrder = response.data.map((pOrder) => ({
          data: pOrder,
        }));
        if (periodOrder.length === 0) {
          if (route.params.lifnr == undefined && route.params.ebeln == undefined) {
            alert('Nessun prodotto trovato nel periodo specificato');
          } else if (route.params.start == undefined && route.params.end == undefined) {
            alert("Nessun prodotto trovato per il codice d'ordine specificato");
          } else {
            alert('Nessun prodotto trovato per il fornitore specificato');
          }
          setEndDate(undefined);
          setStartDate(undefined);
          navigation.navigate('EntrataMerci', { username: username, sourcePage: route.name });
        } else {
          if (route.params.sourcePage === 'Period') {
            const fD = formatDate(route.params.start);
            const sD = formatDate(route.params.end);
            setRicerca(`${fD}-${sD}`);
          } else if (route.params.sourcePage === 'Order') {
            const val = `${route.params.ebeln}`;
            setRicerca(val);
          } else if (route.params.sourcePage === 'Supplier') {
            const val1 = `${route.params.lifnr}`;
            setRicerca(val1);
          }
          setItems(periodOrder);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    const ebeln = item.data.EBELN;
    if (!acc[ebeln]) {
      acc[ebeln] = [];
    }
    acc[ebeln].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedItems).map((key) => ({
    title: key,
    data: groupedItems[key],
  }));

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>EBELN: {section.title}</Text>
    </View>
  );


  const handleChangeQuantita = (ebeln, ebelp, matnr, number) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [`${ebeln}-${ebelp}-${matnr}`]: {
        ...prevState[`${ebeln}-${ebelp}-${matnr}`],
        quantity: number,
        selected: number > 0,
      },
    }));
  };


  const toggleSelection = (ebeln, ebelp, matnr) => {
    setSelectedItems((prevState) => {
      const isSelected = prevState[`${ebeln}-${ebelp}-${matnr}`]?.selected || false;
      const updatedSelectedItems = { ...prevState };

      if (isSelected) {
        delete updatedSelectedItems[`${ebeln}-${ebelp}-${matnr}`];
      } else {
        updatedSelectedItems[`${ebeln}-${ebelp}-${matnr}`] = {
          selected: true,
          quantity: 0,
        };
      }

      return updatedSelectedItems;
    });
  };

  const handleChange = async (text) => {
    setNBolla(text);
  }


  const selectedItemsArray = Object.keys(selectedItems).map(key => {
    const [ebeln, ebelp, matnr] = key.split('-');
    return {
      ebeln,
      ebelp,
      matnr,
      quantity: selectedItems[key]?.quantity || 0
    };
  });

  const handleModifica = () => {
    setIsConf(false)
    setModalVisible(false)
  }


  const renderItemPopUp = ({ item }) => {
    const ebeln = item.data.EBELN;
    const ebelp = item.data.EBELP;
    const matnr = item.data.MATNR;
    const isSelected = selectedItems[`${ebeln}-${ebelp}-${matnr}`]?.selected || false;
    const quantity = selectedItems[`${ebeln}-${ebelp}-${matnr}`]?.quantity || 0;
    const menge = item.data.MENGE;
    let positiveQuant = false;

    const isQuantityValid = (quant) => {
      return quant >= 0 && quant <= menge;
    };
    if (quantity > 0) {
      positiveQuant = true;
    }
    return (
      <View style={styles.modalItemCOntent}>
        {isSelected && positiveQuant && <View style={styles.itemPop}>
          <TouchableOpacity>
            <View styles={styles.itemContPopUp}>
              <Text style={styles.itemPopUp}>{item.data.EBELN}</Text>
              <Text style={styles.itemPopUp}>{item.data.MATNR}</Text>
              <Text style={styles.itemPopUp}>{quantity} {item.data.MEINS}</Text>
            </View>
          </TouchableOpacity>
        </View>}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const ebeln = item.data.EBELN;
    const ebelp = item.data.EBELP;
    const matnr = item.data.MATNR;
    const isSelected = selectedItems[`${ebeln}-${ebelp}-${matnr}`]?.selected || false;
    const quantity = selectedItems[`${ebeln}-${ebelp}-${matnr}`]?.quantity || 0;
    const menge = item.data.MENGE;

    const isQuantityValid = (quant) => {
      return quant >= 0 && quant <= menge;
    };

    //prova
    // Prima
    function TextInputIcon(props) {
      // logica del componente
    }

    TextInputIcon.defaultProps = {
      icon: 'defaultIcon',
      size: 24,
    };

    return (

      <View style={styles.item}>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemText}>{item.data.MATNR}</Text>
            <CheckBox
              style={{ backgroundColor: '#F5F5DC' }}
              checked={isSelected}
              {...props}
              disabled={disabled}
              onPress={() => {
                toggleSelection(ebeln, ebelp, matnr);
                setQuantita(0);
              }}
            />
          </View>
          <Text style={styles.itemMeins}>{item.data.MENGE} {item.data.MEINS}</Text>
        </TouchableOpacity>
        <View>
          <TextInput
            style={{ marginLeft: 20, borderWidth: 1, borderRadius: 5, marginTop: 9, marginBottom: 10 }}
            keyboardType="numeric"
            placeholder=" Inserisci Quantità... "
            value={isSelected ? quantity.toString() : ''}
            editable={isSelected && !disabled}
            onChangeText={(number) => {
              let parsedNumber = parseInt(number, 10);
              if (isNaN(parsedNumber)) {
                parsedNumber = 0;
              }
              if (parsedNumber >= -1 && parsedNumber <= menge) {
                handleChangeQuantita(ebeln, ebelp, matnr, parsedNumber);
                setQuantity(parsedNumber)
              } else {
                alert('Quantità non valida, la quantità di pezzi disponibile ammonta a :' + menge);
                handleChangeQuantita(ebeln, ebelp, matnr, 0);
              }
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarLeftElem} onPress={() => navigation.navigate('SettingsScreen', { username })}>
            <Feather name="settings" size={45} color="white" style={styles.iconBar} />
          </TouchableOpacity>
          <View style={styles.topBarRightElem}>
            <Text style={{ paddingLeft: '170%', color: 'white', width: 140, height: '80%', textAlignVertical: 'center' }}>{username}</Text>
          </View>
          <TouchableOpacity style={styles.topBarRightElem} onPress={() => navigation.navigate('UserScreen', { username })}>
            <Ionicons name="person-circle-sharp" size={50} color="white" style={styles.iconBar} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionHeaderText1}>ricerca: {ricerca}</Text>
        {(selectedItemsArray.length > 0) &&
          <TouchableOpacity onPress={handleConfirm}>
            <AntDesign style={styles.confirmIcon} name="checkcircle" size={45} color="green" />
          </TouchableOpacity>
        }
        <View style={styles.content}>
          <ScrollView style={styles.list} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: '60%' }}>


            <SectionList
              sections={sections}
              renderSectionHeader={renderSectionHeader}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}

            />
          </ScrollView>
        </View>
        <View style={styles.containerEndBar}>
          <TouchableOpacity style={styles.containerBack} onPress={() => navigation.goBack({ username, sourcePage: route.name })}>
            <Ionicons name="arrow-undo-outline" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerScan} onPress={() => navigation.navigate('CameraScan', { username, sourcePage: 'POrderResult' })}>
            <MaterialCommunityIcons name="line-scan" size={75} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate('EnterScreen', { username, sourcePage: route.name })}>
            <AntDesign name="home" size={35} color="white" />
          </TouchableOpacity>
        </View>



        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirm}
          onRequestClose={() => setIsConf(false)}
        >
          <View style={styles.modalContainer1}>
            <View style={styles.modalContent1}>
              <Text style={styles.modalText}>Inserisci il numero della bolla</Text>
              <View style={{ flexDirection: 'row', alignContent: 'space-between', flex: 1, flexDirection: 'column' }}>
                <TextInput style={{ borderWidth: 0.5, padding: 15, borderRadius: 20, marginBottom: '3%' }}

                  type="number"
                  placeholder=" Numero Bolla"
                  value={nBolla}

                  onChangeText={(nBolla) => {
                    handleChange(nBolla);
                  }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ paddingRight: '2%', paddingTop: '5%' }}>
                    <Button title="Conferma" onPress={handleConfBolla/* Add your confirmation logic here */} />
                  </View>
                  <View style={{ paddingTop: '5%', paddingRight: '2%' }}>
                    <Button title="Modifica" onPress={handleModifica} />
                  </View>
                  <View style={{ paddingTop: '5%' }}>
                    <Button title="Annulla" onPress={handleAnnulla} />
                  </View>
                </View>
              </View>


            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Confermare l'entrata delle merci selezionate?</Text>
              <Text> merci selezionate</Text>
              <SectionList
                sections={sections}
                renderItem={renderItemPopUp}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                <View style={{ paddingRight: '2%', paddingTop: '5%' }}>
                  <Button title="Conferma" onPress={handleBolla} />
                </View>
                <View style={{ paddingTop: '5%' }}>
                  <Button title="Annulla" onPress={handleAnnulla} />
                </View>
              </View>


            </View>
          </View>
        </Modal>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  confirmIcon: {
    alignSelf: 'flex-end',
    paddingRight: '3%',
  },
  topBar: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#385A64',
    flexDirection: 'row',
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
  content: {
    paddingBottom: '90',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionHeader: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeaderText1: {
    fontSize: 15,
    paddingLeft: '5%',
    alignSelf: 'flex-start',
    marginBottom: '-5%',
  },
  item: {
    backgroundColor: '#C0C0B9',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    paddingRight: '65%',
  },
  itemMeins: {
    fontSize: 17,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 10,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '10%',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: '60%',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',

  },
  modalContent1: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 250,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalItemCOntent: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalArray: {
    width: '90%',
    height: '50%'
  },
  itemPopUp: {
    alignContent: 'center',
    width: '100%'
  },
  itemPop: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 0,
    borderRadius: 10,
    flex: 1,
    height: '20%',
    width: 220
  },
  itemContPopUp: {
    width: '100%',
    backgroundColor: 'red'
  }
});

export default POrderResult;
