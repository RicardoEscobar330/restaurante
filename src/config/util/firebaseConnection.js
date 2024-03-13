
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBenBmWrDxfGcS0lKen56K9n46Ii5tjU7k",
  authDomain: "restaurantea-e8410.firebaseapp.com",
  projectId: "restaurantea-e8410",
  storageBucket: "restaurantea-e8410.appspot.com",
  messagingSenderId: "279201394483",
  appId: "1:279201394483:web:f98d2dbf63feab56279846"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  const db = getFirestore(app);
  const storage = getStorage(app);

  export {app,auth, db, storage};