// import * as THREE from 'three'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

console.table(firebaseConfig);
ReactDOM.render(<App firebaseConfig={firebaseConfig}/>, document.getElementById('app-mount'));
