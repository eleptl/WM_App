import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, IconButton, Provider as PaperProvider } from 'react-native-paper';
import DatePicker from 'react-native-neat-date-picker';
import { en, registerTranslation } from 'react-native-paper-dates';
//import { AlignVerticalBottom, AlignVerticalTop, ConnectingAirportsOutlined, ContentCutOutlined, VerticalAlignTop } from "@mui/icons-material";
import { LogBox } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import axios from "axios";
//import { useNavigate } from "react-router-native";

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);
// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default function PeriodSearchBar({ index }) {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [showDatePickerRange, setShowDatePickerRange] = useState(false);
  const [today, setToday] = useState(new Date());

  //navigazione
  const navigation = useNavigation();

  //route -dati
  const route = useRoute();
  const username = route.params.username;

  //handle method

  const handleConfirmRange = (output) => {
    setShowDatePickerRange(false);
    setStartDate(output.startDate)
    setEndDate(output.endDate)
  };

  const handleCancelRange = () => {
    setShowDatePickerRange(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatDateParam = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const paramDate = year + month + day;
    return paramDate;
  };

  //conferma
  const handleConfChoose = () => {
    const index = `http://192.168.1.9:5000/api/ordiniPeriodo/?dateMin=${formatDateParam(startDate)}&dateMax=${formatDateParam(endDate)}`;
    // const index = `http://192.168.1.161:5000/api/ordiniPeriodo/?dateMin=${formatDateParam(startDate)}&dateMax=${formatDateParam(endDate)}`; 

    navigation.navigate('POrderResult', { username: username, index: index, sourcePage: route.name, isSearch: true, start: formatDateParam(startDate), end: formatDateParam(endDate), sourcePage: route.params.sourcePage });
    setStartDate('')
    setEndDate('')
  }


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={{ paddingTop: '5%', marginBottom: '-100%' }}>
          <Text >Select Range</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

            {showDatePickerRange &&
              <View style={{ alignItems: 'center', marginLeft: '-4%', marginTop: '-25%' }}>
                <DatePicker
                  isVisible={showDatePickerRange}
                  mode={'range'}
                  onCancel={handleCancelRange}
                  onConfirm={handleConfirmRange}
                />
              </View>}

            <View style={{ flexDirection: 'row' }} >
              <View style={{ width: '80%' }}>
                <DatePickerInput
                  width='60%'
                  locale="en"
                  label="Start Date"
                  value={startDate}
                  onChange={(d) => setStartDate(d)}
                  mode="start"
                  date={startDate}
                  inputMode="start"
                  iconStyle={{ display: 'none' }}

                />

              </View>
              <View>

                <IconButton
                  width='80%'
                  icon="calendar"
                  size={30}
                  onPress={() => setShowDatePickerRange(true)}
                />
              </View>
            </View>


            <View style={{ paddingTop: '5%', flexDirection: 'row' }} >

              <View style={{ width: '80%' }}>
                <DatePickerInput
                  width='60%'
                  locale="en"
                  label="End Date"
                  value={endDate}
                  onChange={(d1) => setEndDate(d1)}
                  mode="end"
                  date={endDate}
                  inputMode="end"
                  iconStyle={{ display: 'none' }}
                />
              </View>
              <View>
                <IconButton
                  width='80%'
                  icon="calendar"
                  iconColor="black"
                  iconStyle=''

                  size={30}
                  onPress={() => setShowDatePickerRange(true)}
                />
              </View>
            </View>

          </View>
          <TouchableOpacity style={styles.SubCont} onPress={() => handleConfChoose()}>
            <Text style={styles.searchText} >Conferma Scelta Ricerca</Text>
          </TouchableOpacity>

        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  SubCont: {
    marginTop: 15,
    borderRadius: 30,
    width: '50%',
    height: 55,
    backgroundColor: '#273B4A',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '40%'
  },
  searchText: {
    color: 'white',
    fontSize: 14,
    flexDirection: 'row',
    paddingTop: 10,
    textAlign: 'center',
    width: '100%',
    height: 40
  }
});

