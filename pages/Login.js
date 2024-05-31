import { StyleSheet, View, Text, Image, TextInput, StatusBar, AppState, Pressable, KeyboardAvoidingView, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import { useIsFocused, useRoute } from '@react-navigation/native';
//movimenti
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
//element
import Button1 from '../components/Button';
import ImageViewer from '../components/ImageViewer';
import Enter from '../pages/Enter';
//icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HistoryToggleOff } from '@mui/icons-material';
import { AntDesign } from '@expo/vector-icons';

const Login = () => {
  const navigation = useNavigation();

  const PlaceholderImage = require('../assets/images/img1.jpg');
  const [username, setUser] = useState("");
  const [password, setPw] = useState("");
  const [errors, setErrors] = useState({});

  //controllo dati inserimento
  function validateLogin() {
    let error = {}
    if (!username) errors.username = "username absent"
    if (!password) errors.password = "password absent"

    if (username === 'admin' && password === 'password') {
      setErrors('');
      setUser('');
      setPw('');
      return (
        navigation.navigate("EnterScreen", { username: username })
      )
    } else {
      if (username != 'admin') errors.username = "username non corretto"
      if (password != 'password') errors.password = "password non corretta"
      setErrors(errors.username);
      setErrors(errors.password);

      alert('login fallito');

      return Object.keys(errors).length === 0;
    }

  }


  const handleButtonLogin = (navigation) => {
    console.log('login premuto');
    validateLogin();
  }



  return (
    <View style={styles.loginContainer}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleLog} > WAREHOUSE MANAGER</Text>
      </View>



      <View style={styles.imageContainer}>
        <ImageViewer style={styles.image1} placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formContainer1}>

          <View style={styles.formSingle}>
            <TextInput style={styles.input} value={username} onChangeText={setUser} placeholder='Username' />
            {errors.username ? <Text style={styles.errorText}> {errors.username}</Text> : null}
            <Text></Text>
            <TextInput style={styles.input} value={password} onChangeText={setPw} placeholder='Password' secureTextEntry />
            {errors.password ? <Text style={styles.errorText}> {errors.password}</Text> : null}
          </View>

          <KeyboardAvoidingView style={styles.flexStyle} enabled={true} behavior={"position"}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonLogin} >
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>Get started</Text>
                <AntDesign name="login" size={20} color="white" />
              </View>
            </TouchableOpacity>

          </KeyboardAvoidingView>



        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer: {
    flex: 2,
    paddingTop: 15,
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    paddingTop: 10,
  },
  formContainer1: {
    alignItems: 'center',
    paddingTop: '-40',
    paddingBottom: 90
  },
  input: {
    height: 40,
    width: 220,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#fff',
    borderColor: "#eee",
    paddingLeft: 10,
  },
  containerTitle: {
    paddingTop: 60,
    alignItems: 'center',
    width: 270,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
  },
  titleLog: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    color: "#385a64",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: -15,
    width: 200,
  },
  formSingle: {
    paddingTop: 10,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  button: {
    borderRadius: 20,
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#ff6677',
    paddingTop: 10,
    marginTop: 48,
  },
  errorText: {
    color: "red",
    marginBottom: 10,

  },
  flexStyle: {
    height: '40%',
  },
  buttonLabel: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    marginStart: '32%',
    marginEnd: 1,
    marginLeft: 10
  },
});

export default Login;