import { useNavigation } from '@react-navigation/core'
import React, {useState,useEffect,} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Dimensions, Image } from 'react-native'
import { auth, getDoc, doc, db } from '../../firebase'
import ImagemFundo from '../assets/fundo.png'
import mascotinho03 from '../assets/mascotinho03.png'
import mascotinho04 from '../assets/mascotinho04.png'
import mascotinho07 from '../assets/mascotinho07.png'
import botaoverde from '../assets/botaoverde.png'
import botaovermelho from '../assets/botaovermelho.png'
import MA from '../assets/MA.png'


const HomeScreen = () => {
  const [userName, setUserName] = useState('')
  const [DataFinal, setUserDataFinal] = useState('')
  const [userTurma, setUserTurma] = useState('')
  const user = doc(db, 'users/'+ auth.currentUser.uid);

  
  const navigation = useNavigation()
  async function read(){
    const mySnapshot = await getDoc(user);
    if(mySnapshot.exists()){
        const userData = mySnapshot.data();
        setUserName(userData.Name)
        setUserDataFinal(userData.DataFinalAssociacao)
        setUserTurma(userData.Turma)
    }

}useEffect(() => {
  read();
}, [])

  

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

      <Text style={styles.text}>Estado da associação</Text>

    <View style={styles.statusContainer}>
      <Image
        source={botaoverde}
        style={styles.statusImg}
      />
      <Image
        source={botaovermelho}
        style={styles.statusImg}
      />
    </View>

    <View style={styles.linksContainer}>
      <View style={styles.linkContainer}>
        <Image source={mascotinho04} style={styles.buttonImg}/>
         <TouchableOpacity
        onPress={handleSignOut}
        style={styles.lojinha}
        >
        <Text style={styles.buttonText}>LOJINHA</Text>
        </TouchableOpacity>
      </View>
    
      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.parceiros}
        >
          <Text style={styles.buttonText}>PARCEIROS</Text>
        </TouchableOpacity>
        <Image source={mascotinho07} style={styles.buttonImg}/>
      </View>

      

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
   button: {
    backgroundColor: '#FFCC00',
    width: '60%',
    height: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: -40,
    marginRight: -40,
  },
  lojinha: {
    backgroundColor: '#FFCC00',
    width: '60%',
    height: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: -40,
  },
 
  parceiros: {
    backgroundColor: '#FFCC00',
    width: '60%',
    height: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginRight: -40,
  },
  linkButton: {
    backgroundColor: '#FFCC00',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  text:{
    color:'#FFCC00',
    fontSize: 20,
    fontWeight: 'bold',
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
  buttonImg:{
    width:  70,
    height: 100,
    resizeMode: 'contain',
    alignSelf: "flex-start",
    zIndex: 3, // works on ios
    //elevation: 3,
  },
  statusImg:{
    width:'45%',
    height: '100%',
    resizeMode: 'stretch',
    alignSelf: "flex-start",
  },
  bottomLogo:{
    width: 70,
    height: 70,
    resizeMode: 'stretch',
    marginTop: 20,
    marginBottom: 40,
    alignSelf:'center'
  },
  infoContainer:{
    alignSelf:'flex-start',
    paddingLeft: 30,
    paddingVertical: 20,
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
    marginTop: 10,
    //justifyContent: 'center',
    alignItems:'flex-start',
  },
  statusContainer:{
    width:'100%',
    height: '5%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  linkContainer:{
    width:'100%',
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    marginVertical:20,
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  logoContainer:{
    width:'40%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: 100,
    marginBottom: 30,
    paddingVertical: 10,
  },
  linksContainer:{
    alignSelf:'flex-start',
    paddingLeft: 30,
    paddingVertical: 20,
  }
})