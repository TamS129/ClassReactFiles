import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2BwDMSTZuZTrZO5HpmE7m6MboMd8rN9I",
    authDomain: "catch-of-the-day-eric-lloyd.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-eric-lloyd-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-eric-lloyd",
    storageBucket: "catch-of-the-day-eric-lloyd.firebasestorage.app",
    messagingSenderId: "763401237815",
    appId: "1:763401237815:web:43906dd42934dbc1e096b2",
    measurementId: "G-68DCD9HPB6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { firebaseApp, database };
