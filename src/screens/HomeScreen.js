import { useNavigation } from '@react-navigation/core'
import React, {useState,useEffect,} from 'react'
import { StyleSheet, Alert, Text, TouchableOpacity, View, ImageBackground, Dimensions, Image } from 'react-native'
import { auth, getDoc, doc, db } from '../../firebase'

import ImagemFundo from '../assets/fundo.png'
import mascotinho03 from '../assets/mascotinho03.png'
import mascotinho04 from '../assets/mascotinho04.png'
import mascotinho07 from '../assets/mascotinho07.png'
import botaoverde from '../assets/botaoverde.png'
import MA from '../assets/MA.png'


const HomeScreen = () => {
  const [userName, setUserName] = useState('')
  const [DataFinal, setUserDataFinal] = useState('')
  const [userTurma, setUserTurma] = useState('')
  const [userAssociado, setUserAssociado] = useState()
  const [dataVencimento, setDataVencimento] = useState(new Date());
  
  const user = doc(db, 'users/'+ auth.currentUser.uid);
  const dataAtual = new Date();
  

  const navigation = useNavigation()

  async function readUserData(){
    const mySnapshot = await getDoc(user);
    if(mySnapshot.exists()){
        const userData = mySnapshot.data();
        setUserName(userData.Name)
        setUserDataFinal(userData.DataFinalAssociacao)
        setUserTurma(userData.Turma)
                 
    }
  }

  useEffect(() => {
    readUserData();
    conversorData();
  }, [])
  

  useEffect(() => {  
    comparaDatas();  
    if(userAssociado === false){
      createAlert();
    }  
  }, [dataVencimento])
  
  const createAlert = () =>
    Alert.alert(
      "Associação vencida",
      "Procure a atlética!",
      [
        { text: "OK", onPress: () => navigation.replace("Login")}
      ]
  );
  
  function conversorData(){
    const [day, month, year] = DataFinal.split('/');
    const result = [year, month, day].join('-');
    const data = new Date(result);
    setDataVencimento(data);
  }

  function comparaDatas(){
    if (dataAtual.getTime() >= dataVencimento.getTime()){
      setUserAssociado(true);
    }
  }
  
  

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
      <View
        style={styles.bottomImg}
      />
      <View
        style={styles.userImg}
      />
      <Image
        source={mascotinho03}
        style={styles.bottomImg}
      />
    </View>  

    <View style={styles.infoContainer}>
      <Text style={styles.text}>Nome</Text>
      <Text style={styles.text}>{userName}</Text>
      <Text style={styles.text}>Turma</Text>
      <Text style={styles.text}>{userTurma}</Text>
      <Text style={styles.text}>Data final da associação</Text>
      <Text style={styles.text}>{DataFinal}</Text>
    </View>


    <View style={styles.statusContainer}>
    <Text style={styles.text}>Estado da associação</Text>
      <Image
        source={botaoverde}
        style={styles.statusImg}
      />
    </View>

    <View style={styles.buttonContainer}>
      <Image source={mascotinho04} 
      style={[styles.buttonImg, 
      {position:'absolute',
        left:-30,
        top: -30,
      }]}/>
        <TouchableOpacity
          onPress = {( ) => handleSignOut()}
          style={styles.button}
          >
          <Text style={styles.buttonText}>LOJINHA</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {( ) => handleSignOut()}
          style={styles.button}
          >
          <Text style={styles.buttonText}>PARCEIROS</Text>
        </TouchableOpacity>
        <Image source={mascotinho07} style={[styles.buttonImg, 
      {position:'absolute',
        right:-30,
        top: -30,
      }]}/>
    </View>

    <View style={styles.logoContainer}>
      <Image
          source={MA}
          style={styles.bottomLogo}
          />
    </View> 
 
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
  topContainer:{
    width:'100%',
    flexDirection: 'row',
    height: '20%',
    marginTop: '10%',
    alignItems:'center',
    justifyContent: 'center',
  },
  userImg:{
    height: '100%',
    width: '35%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  bottomImg:{
    width:'30%',
    height: '100%',
    resizeMode: 'stretch',
    alignSelf: "flex-start",
  },
  infoContainer:{
    alignSelf:'flex-start',
    width: '100%',
    height: '20%',
    paddingLeft: 30,
    marginTop:'5%',
  },
  text:{
    color:'#FFCC00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer:{
    width:'100%',
    height: '10%',
    justifyContent: 'center',
    alignItems:'center',
  },
  statusImg:{
    width:'80%',
    height: '70%',
    resizeMode: 'stretch',
    marginTop: '2%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonImg:{
    width:  70,
    height: 100,
    resizeMode: 'contain',
    alignSelf: "flex-start",
    zIndex: 3, // works on ios
    //elevation: 3,
  },
  buttonContainer:{
    flexDirection: 'row',
    width:'60%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
  },
  button:{
    width: '100%',
    backgroundColor: '#0782F9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    left:0,
    top:0,
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
  logoContainer:{
    width:'100%',
    height: '10%',
    resizeMode: 'stretch',
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: 'center',
    position: 'absolute',
    left: '0%',
    bottom: '0%',
  },
  bottomLogo:{
    width: 70,
    height: 70,
    resizeMode: 'stretch',
    alignSelf:'center',
  },
})