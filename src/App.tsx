
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

  const [user, loading, error] = useAuthState(auth);


  const SignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    
    console.log('Signed In');
  };

  const SignOut = () => {
    auth.signOut();
    console.log('Signed Out');
  };

  const checkUser = () => {
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
          <p>Current User: {user.email}</p>
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
        { 
          user ? 
          <div>
            <p>Current User: {user.email}</p>
            <b>Username: {user.displayName}</b>
            <button onClick={SignOut}>Sign Out</button>
          </div> :
          <button onClick={SignIn}>Sign In with Google</button>
        }
      </div>
    </div>
  );
}

export default App;
