import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { CheckBox } from '@rneui/themed'



const CheckBoxMateriali = ({ disabled, ...props }) => {

    //checkBox
    const [isSelected, setSelection] = React.useState(false);
    //quantià merce selezionata
    const [nMerce, setQuantita] = useState('')
    const [oneSelect, setSelect] = useState(false)


    //scelta materiali check
    const handleCheck = () => {
        setSelection(!isSelected)
        console.log('check si')
    }
    //cambio numero merce selezionata
    const handleChangeQuantita = (number) => {
        setQuantita(number)
        if (number === '') {
            console.log('qta vuota')
            return
        }
        if (number <= 0) {
            alert('INSERISCI QUANTITA VALIDA')
            setQuantita('')
            console.log('qta non valida')
            return
        }
        console.log(number)
    }


    return (
        // <View style={styles.container1}>
        <View style={styles.checkboxContainer}>

            <CheckBox
                checked={isSelected}
                {...props}
                disabled={disabled}
                onPress={() => {
                    setSelection(!isSelected);


                    setQuantita('')
                }} />
            <Text style={styles.label}>MAKTX</Text>

            <TextInput style={{ marginLeft: 20, borderWidth: 1, borderRadius: 5, marginTop: 9, marginBottom: 10 }}
                keyboardType="numeric"
                placeholder=" Inserisci Quantità... "
                value={isSelected ? nMerce : ''}
                editable={isSelected && !disabled}


                onChangeText={(number) => {
                    handleChangeQuantita(number);
                }}
            />
        </View>
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
});


export default CheckBoxMateriali;