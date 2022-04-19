import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground, Platform, Dimensions, Image  } from 'react-native'
import React, {useState,useEffect,} from 'react'
import { auth } from '../../firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'

import ImagemFundo from '../assets/fundo.png'
import Logo  from '../assets/logomedalfenas.png'
import MA  from '../assets/MA.png'
import Mascote01 from '../assets/mascotinho01.png'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace("Home")
  //     }
  //   })

  //   return unsubscribe
  // }, [])


  const handleSignUp = () => {
    
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
      signInWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.replace("Home");
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ImageBackground style={styles.imgContainer} source={ImagemFundo}>
        <Image
        source={Logo}
        style={styles.logoContainer}
        />
        
      <View style={styles.inputContainer}>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value.replace(/ /g, ''))}
        style={styles.input}
        autoComplete={'email'}
        />

        <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={value => setPassword(value)}
        style={styles.input}
        secureTextEntry
        maxLength={8}
        />  
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {( ) => handleLogin()}
          style={styles.button}
          >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress = {() => handleSignUp()}
          style={[styles.button, styles.buttonOutline]}
          
          > 
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.bottomContainer}>
      <Image
        source={Mascote01}
        style={styles.bottomImg}
        />
      <Image
        source={MA}
        style={styles.bottomLogo}
      />
      </View>  

    </ImageBackground>  
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  imgContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'flex-start',
    alignItems:'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  logoContainer:{
    width:'40%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: 100,
    marginBottom: 30,
    paddingVertical: 10,
  },
  inputContainer:{
    width:'80%',
    
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer:{
    width:'60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button:{
    width: '100%',
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline:{
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText:{
    color:'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText:{
    color:'#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomContainer:{
    flex: 1,
    width:'100%',
    flexDirection: 'row',
    height: '50%',
    resizeMode: 'stretch',
    marginTop: 20,
    paddingVertical: 10,
    alignItems:'flex-end',
    justifyContent: 'flex-start',
  },
  bottomImg:{
    width:'40%',
    height: '90%',
    resizeMode: 'stretch',
    alignSelf: "flex-start",
    
  },
  bottomLogo:{
    width:'20%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 10,
  },
})