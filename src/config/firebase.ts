// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhb_NyChm4SghH0XPfgI3v8NmuGIZ0Bhc",
    authDomain: "social-media-project-d1d5d.firebaseapp.com",
    projectId: "social-media-project-d1d5d",
    storageBucket: "social-media-project-d1d5d.appspot.com",
    messagingSenderId: "357223817270",
    appId: "1:357223817270:web:493bce2eb07ba421ac3897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app) // telling the app that we are using firestore