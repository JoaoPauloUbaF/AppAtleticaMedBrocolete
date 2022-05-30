// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp, utils } from 'firebase/app';
import { getFirestore,  getDoc, doc,  } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable , getDownloadURL  } from "firebase/storage";
import Logo  from './src/assets/logomedalfenas.png'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
apiKey: "AIzaSyCIqV__lTokCHQdaSZ7DfLHJ2V76Vj1CSY",
authDomain: "appatleticamedbrocolete.firebaseapp.com",
projectId: "appatleticamedbrocolete",
storageBucket: "appatleticamedbrocolete.appspot.com",
messagingSenderId: "934569102216",
appId: "1:934569102216:web:56e03cb226f634c996883d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);


export { auth, db, getDoc, doc, storage, uploadBytesResumable, ref, utils, getDownloadURL };
