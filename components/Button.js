import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button( {label, onPress}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    button: {
      borderRadius: 20,
      width:300,
      height: 50,
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      borderColor:'#fff',
      borderWidth: 2,
      backgroundColor: '#ff6677',
      paddingTop:10,
    },
    buttonLabel: {    
      color: '#fff',
      fontSize: 16,     
    },
  });