// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6DKtMyfAQtjp-nAm6uDxT3g-9YGkXnQU",
  authDomain: "click-n-pick-a7b0e.firebaseapp.com",
  projectId: "click-n-pick-a7b0e",
  storageBucket: "click-n-pick-a7b0e.appspot.com",
  messagingSenderId: "1099247841356",
  appId: "1:1099247841356:web:e7e9673eb3b1e2013044e9",
  measurementId: "G-VLCHLXM19F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};