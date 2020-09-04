import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAsY3meYyXPPdyh656M_nVZ4TJoaPlBgUk",
    authDomain: "stockapp-5a762.firebaseapp.com",
    databaseURL: "https://stockapp-5a762.firebaseio.com",
    projectId: "stockapp-5a762",
    storageBucket: "stockapp-5a762.appspot.com",
    messagingSenderId: "1077207600151",
    appId: "1:1077207600151:web:3fd6a7a6795292d55a2052",
    measurementId: "G-9SRHD9Z7QK"
};

// Initialize Firebase
const fbConfig = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default fbConfig
