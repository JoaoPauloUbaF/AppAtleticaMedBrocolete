import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Dimensions, Image } from 'react-native'
import { auth } from '../../firebase'

import ImagemFundo from '../assets/fundo.png'
import mascotinho03 from '../assets/mascotinho03.png'
import mascotinho04 from '../assets/mascotinho04.png'
import mascotinho07 from '../assets/mascotinho07.png'
import botaoverde from '../assets/botaoverde.png'
import botaovermelho from '../assets/botaovermelho.png'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
    <ImageBackground style={styles.imgContainer} source={ImagemFundo}>
    <View style={styles.topContainer}>
      <Image
        source={mascotinho07}
        style={styles.bottomImg}
      />
      <Image
        source={mascotinho03}
        style={styles.bottomImg}
      />
    </View>  
      
      <Text>Nome:</Text>
      <Text>{auth.currentUser?.email}</Text>
      <Text>Turma:</Text>
      <Text>{auth.currentUser?.email}</Text>
      <Text>Data final da associação:</Text>
      <Text>{auth.currentUser?.email}</Text>
      <Text>Estado da associação</Text>

      <View style={styles.buttonsContainer}>
      <Image
        source={botaoverde}
        style={styles.bottomImg}
      />
      <Image
        source={botaovermelho}
        style={styles.bottomImg}
      />
    </View>
    <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity> 

    <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>

    </ImageBackground>
  </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
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
  bottomImg:{
    width:'40%',
    height: '100%',
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
  topContainer:{
    width:'100%',
    flexDirection: 'row',
    height: '20%',
    marginTop: 70,
    marginLeft: 70,
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonsContainer:{
    width:'100%',
    flexDirection: 'row',
    height: '5%',
    marginTop: 20,
    justifyContent: 'center',
  },
  logoContainer:{
    width:'40%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: 100,
    marginBottom: 30,
    paddingVertical: 10,
  },
})