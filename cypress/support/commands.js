import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import {attachCustomCommands} from "cypress-firebase";

import "cypress-mailosaur";

const fbConfig = {
    apiKey: "AIzaSyC-8t2o5R1Zz0z9oJ5f9t9w9t9w9t9w9t9",
    authDomain: "foodorderingapplication.firebaseapp.com",
    projectId: "foodorderingapplication",
    storageBucket: "foodorderingapplication.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:1234567890",
    measurementId: "G-1234567890"
    };
    
    
firebase.initializeApp(fbConfig);
attachCustomCommands({ Cypress, cy, firebase });