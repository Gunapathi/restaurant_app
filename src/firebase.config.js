import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCI36Ok-fnK_RwOSczqOrqpn6GvUyR-l6M",
    authDomain: "restaurantapp-161cb.firebaseapp.com",
    databaseURL: "https://restaurantapp-161cb-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-161cb",
    storageBucket: "restaurantapp-161cb.appspot.com",
    messagingSenderId: "86247098445",
    appId: "1:86247098445:web:94e5b9dd0908492e9f3404",
    measurementId: "G-1JGQWB4YP4"
};

// find if app is already there, or else it will initializeApp every time
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage };