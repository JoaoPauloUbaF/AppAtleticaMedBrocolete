import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    
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