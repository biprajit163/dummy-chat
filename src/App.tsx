
import './App.css';
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { pathToFileURL } from 'node:url';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PRJ_ID,
  storageBucket: process.env.REACT_APP_STGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEAS_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() { 

  console.log("Hello World");
  console.log(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-body">
        <h1>Hello Chat App</h1>
      </div>
    </div>
  );
}

export default App;
