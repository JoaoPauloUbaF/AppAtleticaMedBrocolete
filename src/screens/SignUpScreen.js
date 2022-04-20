import { StyleSheet, Switch, Text, View, SafeAreaView , TextInput, TouchableOpacity, ImageBackground, Platform, Dimensions, Image, ScrollView  } from 'react-native'
import React, {useState,useEffect,} from 'react'
import { auth, db } from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core'

import ImagemFundo from '../assets/fundo.png'
import Logo  from '../assets/logomedalfenas.png'
import MA  from '../assets/MA.png'

const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [DataFinal, setUserDataFinal] = useState('')
  const [userTurma, setUserTurma] = useState('')
  const [userAdm, setUserAdm] = useState(false);
  const [usuario,setUsuario] = useState()
  const navigation = useNavigation()



  const handleSignUp = () => { 
      createUserWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUser(user.uid)
      })
      .catch(error => alert(error.message))
      navigation.replace("Home");
  }

  async function saveUser(userid){
    console.log(userid)
    await setDoc(doc(db, 'users', userid), {
      Name: userName,
      DataFinalAssociacao: DataFinal,
      Turma: userTurma,
      Administrador: userAdm,
    }).catch((e) => {  console.log(e); });
  }


  return (
    <SafeAreaView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ImageBackground style={styles.imgContainer} source={ImagemFundo}>
    <ScrollView contentContainerStyle={styles.scrollView}>

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
        maxLength={8}
        />
        <TextInput
        placeholder="Nome"
        value={userName}
        onChangeText={value => setUserName(value)}
        style={styles.input}
        />  
        <TextInput
        placeholder="Turma"
        value={userTurma}
        onChangeText={value => setUserTurma(value)}
        style={styles.input}
        maxLength={3}
        /> 
        <TextInput
        placeholder="Data de vencimento da associação"
        value={DataFinal}
        onChangeText={value => setUserDataFinal(value)}
        style={styles.input}
        maxLength={10}
        /> 
         
        <Text style={styles.label}>Administrador</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={userAdm ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={value => setUserAdm(value)}
        value={userAdm}
        style={styles.switch}
        />    

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {() => handleSignUp()}
          style={[styles.button, styles.buttonOutline]}
          > 
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
      <Image
        source={MA}
        style={styles.bottomLogo}
        />
      </View>  

    </ScrollView>
    </ImageBackground> 
    </SafeAreaView> 
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  scrollView: {
    height: '100%',
    width: '100%',
    justifyContent:'flex-start',
    alignItems:'center',
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
    alignItems:'center',
    justifyContent: 'center',
  },
  bottomImg:{
    width:'40%',
    height: '50%',
    resizeMode: 'stretch',
    alignSelf: "flex-start",
    
  },
  bottomLogo:{
    width:'20%',
    height: '50%',
    resizeMode: 'stretch',
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  switch: {
    alignSelf: 'flex-start',
  },
  label: {
    marginTop: 10,
    fontSize: 18,
  },
})