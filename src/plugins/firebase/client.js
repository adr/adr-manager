// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCzIScILC86RUQtYh6d3kjzpHphVhaQpGg",
    authDomain: "moneeza-adr.firebaseapp.com",
    projectId: "moneeza-adr",
    storageBucket: "moneeza-adr.appspot.com",
    messagingSenderId: "788415806002",
    appId: "1:788415806002:web:00adb948f863c057e8da2b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GithubProvider = new GithubAuthProvider();

export { app, auth, GithubProvider };
