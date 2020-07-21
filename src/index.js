import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: "AIzaSyCyEJsaf_P3A1O72ggax2fgSv62hMHcUEg",
  authDomain: "react-chat-c27e1.firebaseapp.com",
  databaseURL: "https://react-chat-c27e1.firebaseio.com",
  projectId: "react-chat-c27e1",
  storageBucket: "react-chat-c27e1.appspot.com",
  messagingSenderId: "828481355784",
  appId: "1:828481355784:web:a20d7c83322f9f3e6151bd"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
