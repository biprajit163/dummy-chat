
import './App.css';
import React, { useState, useEffect } from 'react';

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

  const [user, loading, error] = useAuthState(auth);

  interface UserObj {
    name?: string;
    email?: string;
    photoURL?: string;
    phoneNumber?: string;
  }

  let UserData:UserObj = {
    name: user?.displayName?.toString(),
    email: user?.email?.toString(),
    photoURL: user?.photoURL?.toString(),
    phoneNumber: user?.phoneNumber?.toString(),
  }


  const SignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    
    console.log('Signed in with google');
  };

  const SignOut = () => {
    auth.signOut();
    console.log('Signed Out');
  };

  const CheckUser = () => {
    console.log(UserData);

    if (loading) {
      return(
        <div>
          <p>Initializing User...</p>
        </div>
      );
    }

    if (error) {
      return(
        <div>Error: {error}</div>
      );
    }

    if (user) {
      return(
        <div>
          <p>Current User: {UserData.email}</p>
          <p>User Name: <b>{UserData.name}</b></p>
          <div>User Photo: <img src={UserData.photoURL} alt="User Photo"/></div>
          <p>User Phone Number: {UserData.phoneNumber ? 
          UserData.phoneNumber : <span>User doesn't have number</span>}</p>
          <button onClick={SignOut}>Sign Out</button>
        </div>
      );
    }

    return <button onClick={SignIn}>Sign In with Google</button>
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-body">
        <h1>Hello Chat App</h1>
        <CheckUser/>
      </div>
    </div>
  );
}

export default App;
