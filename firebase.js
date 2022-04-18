// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp} from 'firebase/app';
const { getFirestore, Timestamp, FieldValue, getDoc, Firestore, doc } = require('firebase/firestore');
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
const users = doc(db, 'users/LeMCukvHdCdTqxvSbuUKPb6IoOq1');
async function read(){
    const mySnapshot = await getDoc(users);
    if(mySnapshot.exists()){
        const docData = mySnapshot.data();
        console.log(`My data is ${JSON.stringfy(docData)}`);
    }
}
read();
const auth = getAuth(app);

export { auth, db };
