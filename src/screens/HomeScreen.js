import React, {useState,useEffect,} from 'react'
import { StyleSheet, ScrollView, Alert, Text, TouchableOpacity, View, ImageBackground, Dimensions, Image, StatusBar } from 'react-native'
import { auth, getDoc, doc, db, storage, uploadBytesResumable, ref, getDownloadURL } from '../../firebase'
import Icon from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker';
import AppLoading from 'expo-app-loading';



import ImagemFundo from '../assets/fundo.png'
import mascotinho03 from '../assets/mascotinho03.png'
import mascotinho04 from '../assets/mascotinho04.png'
import mascotinho07 from '../assets/mascotinho07.png'
import botaoverde from '../assets/botaoverde.png'
import MA from '../assets/MA.png'




const HomeScreen = ({navigation}) => {
  const [userName, setUserName] = useState('')
  const [DataFinal, setUserDataFinal] = useState()
  const [userTurma, setUserTurma] = useState('')
  const [userAdm, setUserAdm] = useState(false);
  const [userPhoto, setUserPhoto] = useState();
  const [isReady, setIsReady] = useState(true);
  const [sponsor1, setSponsor1] = useState();
  const [sponsor2, setSponsor2]  = useState(); 
  const [sponsor3, setSponsor3] = useState();
  const [sponsor4, setSponsor4] = useState();
  const [sponsor5, setSponsor5] = useState();
  const [sponsor6, setSponsor6] = useState();
  const [sponsorTop, setSponsorTop] = useState();
  const [sponsorBot, setSponsorBot] = useState();
  
  const user = doc(db, 'users/'+ auth.currentUser.uid);
  const dataAtual = new Date();
  const metadata = {
    contentType: 'image/jpeg'
  };


  async function readUserData(){
    const mySnapshot = await getDoc(user);
    if(mySnapshot.exists()){
        const userData = mySnapshot.data();
        setUserName(userData.Name)
        setUserDataFinal(userData.DataFinalAssociacao)
        setUserTurma(userData.Turma)
        setUserAdm(userData.Administrador)
        setSponsors();
        setProfilePhoto(); 
    }
    
  }
  
  useEffect(() => {
    readUserData().then(() => {
    validaVencimento();
    });
  }, [DataFinal])
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });


    if (!result.cancelled) {
      
      var path = auth.currentUser.uid + '/' + userName.replace(/ /g, "") + '.jpg';

      const img = await fetch(result.uri);
      const bytes = await img.blob();
      setUserPhoto(result.uri);
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, bytes, metadata);
    }
  };
  
  const setProfilePhoto = async () => {
    var path = auth.currentUser.uid + '/' + userName.replace(/ /g, "") + '.jpg';
    const storageRef = ref(storage, path);
    await getDownloadURL(storageRef).then((url)=> {
      setUserPhoto(url);
    })
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

  const createAlert = () =>
    Alert.alert(
      "Associação vencida",
      "Procure a atlética!",
      [
        { text: "OK", onPress: () => navigation.replace("Login")}
      ]
  );
  
  function validaVencimento(){
    const [day, month, year] = DataFinal.split('/');
    const result = [year, month, day].join('-');
    const data = new Date(result);
    if (data.getTime() < dataAtual.getTime()){
      console.log('vencido');
      createAlert();
    }
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.goBack()
      })
      .catch(error => alert(error.message))
  }

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
  <View style={styles.container}>
    <ImageBackground style={styles.imgContainer} source={ImagemFundo}>
    <ScrollView style={[styles.scrollView]} contentContainerStyle={styles.scrollViewChildren}>
    <View style={styles.topContainer}>
      <View
        style={styles.bottomImg}
      />
      <View
        style={styles.userImg}
      > 
        {!userPhoto ? (
          <TouchableOpacity
          onPress = {( ) => pickImage()}
          style={styles.buttonCamera}
          >
          <Icon name="camera" size={50} style={{alignSelf: 'center'}}/>
        </TouchableOpacity>
        ) : <Image source={{ uri: userPhoto }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />}

      </View>
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

    <View style={styles.sponsorsContainer}>
      <View style={styles.sponsorsCollumn}>
        <Image
            source={{uri: sponsor1}}
            style={styles.bottomLogo}
        />
         <Image
            source={{uri: sponsor3}}
            style={styles.bottomLogo}
        />
         <Image
            source={{uri: sponsor5}}
            style={styles.bottomLogo}
        />
      </View>
      <View style={styles.sponsorsCollumn}>
      <Image
            source={{uri: sponsor2}}
            style={styles.bottomLogo}
        />
         <Image
            source={{uri: sponsor4}}
            style={styles.bottomLogo}
        />
         <Image
            source={{uri: sponsor6}}
            style={styles.bottomLogo}
        />
      </View>

    </View>
    <View style={styles.bottomContainer}>

        <Image
            source={MA}
            style={styles.bottomLogo}
            />
    
      {userAdm ? 
        (<View style={styles.subscribeContainer}>
        <TouchableOpacity
        onPress = {() => navigation.navigate('SignUp')}
        style={styles.registerButton}
        >
              <Text style={styles.registerButtonText}>+</Text>
        </TouchableOpacity>
        </View> ) : null} 
    </View>

    

    </ScrollView>
    </ImageBackground>
    <View style={styles.sponsorContainerTop}>
      <Image source={{uri: sponsorTop}} style={styles.sponsorImg}></Image>
    </View>
    <View style={[styles.sponsorContainerBottom]}>
      <Image source={{uri: sponsorBot}} style={styles.sponsorImg}></Image>
    </View>
  </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    resizeMode: 'cover',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  scrollView: {
    flex:1,
    marginTop: StatusBar.currentHeight,
  },
  scrollViewChildren: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  topContainer:{
    width:'100%',
    flexDirection: 'row',
    height: 200,
    marginTop: 125,
    alignItems:'center',
    justifyContent: 'center',
  },
  userImg:{
    height: '100%',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 200,
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
    height: 75,
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
  },
  buttonContainer:{
    flexDirection: 'row',
    width:'60%',
    height: 70,
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
  buttonCamera:{
    width: 125,
    height: 125,
    backgroundColor: '#0782F9',
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
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
  sponsorsContainer:{
    flexDirection: 'row', 
    width: '70%',
    justifyContent: 'center',
    marginVertical: 20
  },
  sponsorsCollumn:{
    flexDirection: 'column', 
    width: '50%',
    justifyContent: 'center',
  },
  bottomContainer:{
    marginBottom: 150, 
    marginTop: 20, 
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'center',   
  },
  logoContainer:{
    width:  70,
    height: 70,
    resizeMode: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%'
  },
  bottomLogo:{
    width: 90,
    height: 90,
    resizeMode: 'stretch',
    alignSelf:'center',
    marginVertical: 10,
  },
  subscribeContainer:{
    width:70,
    height: 70,
    resizeMode: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    left: '75%'
  },
  registerButton:{
    width: 90,
    height: 90,
    backgroundColor: '#0782F9',
    padding: 10,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginVertical: 20,
    left:0,
    top:0,
  },
  registerButtonText:{
    color:'white',
    fontWeight: '700',
    fontSize: 50,
  },
})