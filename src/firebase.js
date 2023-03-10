// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth"
import 'firebase/compat/firestore';


const app =  firebase.initializeApp({
  apiKey: "AIzaSyDkaLxR0_936NDVYlkzvccwArK4wpKc-J0",
  authDomain: "chatapp-45fce.firebaseapp.com",
  projectId: "chatapp-45fce",
  storageBucket: "chatapp-45fce.appspot.com",
  messagingSenderId: "575240323972",
  appId: "1:575240323972:web:fe9a100fb12ec09ffd13d1",
  measurementId: "G-1L0TB2EW30"
});

// Initialize Firebase
export const auth = app.auth();
//const analytics = getAnalytics(app);