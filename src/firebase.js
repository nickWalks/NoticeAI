// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNDew0NjT33tTfvwjMnghinyTM7bcKyQQ",
    authDomain: "noticeai.firebaseapp.com",
    projectId: "noticeai",
    storageBucket: "noticeai.appspot.com",
    messagingSenderId: "763990535526",
    appId: "1:763990535526:web:d018227676c19cfc0a6ca7",
    measurementId: "G-JTMNN26KCB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default database;