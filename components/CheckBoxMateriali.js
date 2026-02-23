import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native';
//import { CheckBox } from '@rneui/themed'



const CheckBoxMateriali = ({ disabled, ...props }) => {

    //checkBox
    const [isSelected, setSelection] = React.useState(false);
    //quantià merce selezionata
    const [nMerce, setQuantita] = useState('')

    //handle method

    //cambio numero merce selezionata
    const handleChangeQuantita = (number) => {
        setQuantita(number)
        if (number === '') {
            return
        }
        if (number <= 0) {
            alert('INSERISCI QUANTITA VALIDA')
            setQuantita('')
            return
        }
    }


    return (
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