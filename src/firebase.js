import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA_yrH8hCDEBFBND8m0AFv4PAbJEIJGkW4",
    authDomain: "rameshtodoapp.firebaseapp.com",
    databaseURL: "https://rameshtodoapp.firebaseio.com",
    projectId: "rameshtodoapp",
    storageBucket: "rameshtodoapp.appspot.com",
    messagingSenderId: "1595069346",
    appId: "1:1595069346:web:b28fa9f0d918ff02e658fb",
    measurementId: "G-KMTQ1YBX58"
  });

  const db = firebaseApp.firestore();
  export default db;
