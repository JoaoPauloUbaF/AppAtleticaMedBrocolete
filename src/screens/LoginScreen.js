import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity, ImageBackground, Platform, Dimensions, Image  } from 'react-native'
import React, {useState} from 'react'
import { auth, storage, ref, getDownloadURL } from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import AppLoading from 'expo-app-loading';

import ImagemFundo from '../assets/fundo.png'
import Logo  from '../assets/logomedalfenas.png'
import MA  from '../assets/MA.png'
import Mascote01 from '../assets/mascotinho01.png'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sponsor1, setSponsor1] = useState();
  const [sponsor2, setSponsor2]  = useState(); 
  const [sponsor3, setSponsor3] = useState();
  const [sponsor4, setSponsor4] = useState();
  const [sponsor5, setSponsor5] = useState();
  const [sponsor6, setSponsor6] = useState();
  const [sponsorTop, setSponsorTop] = useState();
  const [sponsorBot, setSponsorBot] = useState();
  const [isReady, setIsReady] = useState(true);
  

  const handleLogin = () => {
      signInWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('Home');
      })
      .catch(error => alert(error.message))
  }

  const setSponsors = async () => { //Não é a melhor implementação, melhorar no futuro
    
    var path1 = 'Parceiros/parceiro1.png';
    var path2 = 'Parceiros/parceiro2.png';
    var path3 = 'Parceiros/parceiro3.png';
    var path4 = 'Parceiros/parceiro4.png';
    var path5 = 'Parceiros/parceiro5.png';
    var path6 = 'Parceiros/parceiro6.png';
    var pathTop = 'Parceiros/sponsorTop.png';
    var pathBot = 'Parceiros/sponsorBot.png';

    const storageRef1 = ref(storage, path1);
    await getDownloadURL(storageRef1).then((url)=> {
      setSponsor1(url);
      console.log(url);
    })
    const storageRef2 = ref(storage, path2);
    await getDownloadURL(storageRef2).then((url)=> {
      setSponsor2(url);
      console.log(sponsor2);
    })
    const storageRef3 = ref(storage, path3);
    await getDownloadURL(storageRef3).then((url)=> {
      setSponsor3(url);
    })
    const storageRef4 = ref(storage, path4);
    await getDownloadURL(storageRef4).then((url)=> {
      setSponsor4(url);
    })
    const storageRef5 = ref(storage, path5);
    await getDownloadURL(storageRef5).then((url)=> {
      setSponsor5(url);
    })
    const storageRef6 = ref(storage, path6);
    await getDownloadURL(storageRef6).then((url)=> {
      setSponsor6(url);
    })
    const storageRef7 = ref(storage, pathTop);
    await getDownloadURL(storageRef7).then((url)=> {
      setSponsorTop(url);
    })
    const storageRef8 = ref(storage, pathBot);
    await getDownloadURL(storageRef8).then((url)=> {
      setSponsorBot(url);
    })
  }
  setSponsors();
  if (isReady) {
    return (
      <AppLoading
        startAsync={() => setSponsors()}
        onFinish={() => setIsReady(false)}
        onError={console.warn}
      />
    );
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
      </View>

      <View style={styles.bottomContainer}>
          <Image
            source={Mascote01}
            style={styles.bottomImg}
            />
          <View style={styles.sponsorsContainer}>
          <View style={styles.sponsorsCollumn}>
            <Image
                source={{uri: sponsor1}}
                style={styles.sponsorLogo}
            />
            <Image
                source={{uri: sponsor3}}
                style={styles.sponsorLogo}
            />
            <Image
                source={{uri: sponsor5}}
                style={styles.sponsorLogo}
            />
          </View>
          <View style={styles.sponsorsCollumn}>
          <Image
                source={{uri: sponsor2}}
                style={styles.sponsorLogo}
            />
            <Image
                source={{uri: sponsor4}}
                style={styles.sponsorLogo}
            />
            <Image
                source={{uri: sponsor6}}
                style={styles.sponsorLogo}
            />
          </View>

        </View>

      </View>  
      {/* <Image
        source={MA}
        style={styles.bottomLogo}
      /> */}
    </ImageBackground>
    <View style={styles.sponsorContainerTop}>
      <Image source={{uri: sponsorTop}} style={styles.sponsorImg}></Image>
    </View>
    <View style={[styles.sponsorContainerBottom]}>
      <Image source={{uri: sponsorBot}} style={styles.sponsorImg}></Image>
    </View>  
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
    resizeMode: 'cover',
    justifyContent:'flex-start',
    alignItems:'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  logoContainer:{
    width:'40%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: 150,
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
    justifyContent: 'flex-start',
  },
  bottomImg:{
    width:'40%',
    height: '100%',
    resizeMode: 'stretch',
    alignSelf: "flex-start",
    
  },
  bottomLogo:{
    width: 90,
    height: 90,
    resizeMode: 'stretch',
    alignSelf:'center',
    marginVertical: 10,
  },
  sponsorLogo:{
    width: '100%',
    height: '30%',
    resizeMode: 'stretch',
    alignSelf:'center',
    marginVertical: 5,
  },
  sponsorsContainer:{
    flexDirection: 'row', 
    width: '50%',
    height: '60%',
    justifyContent: 'center',
  },
  sponsorsCollumn:{
    flexDirection: 'column', 
    width: '50%',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  sponsorContainerTop:{
    position:'absolute',
    top: ( StatusBar.currentHeight),
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
  sponsorContainerBottom:{
    position:'absolute',
    bottom:0,
    width: '100%',
    height: 100,
    alignSelf: 'center',
  },
  sponsorImg:{
    width:'100%',
    height: '100%',
    resizeMode: 'stretch'
  },
})