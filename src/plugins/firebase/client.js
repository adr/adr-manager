// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLeDiHmseMx-w9Ba7TI4lL8Lvc0M7Zpeg",
    authDomain: "adr-manager.firebaseapp.com",
    projectId: "adr-manager",
    storageBucket: "adr-manager.appspot.com",
    messagingSenderId: "313525337788",
    appId: "1:313525337788:web:0834a7a168fe39352adab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const GithubProvider = new GithubAuthProvider();

export { app, auth, GithubProvider }