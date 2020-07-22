import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCyEJsaf_P3A1O72ggax2fgSv62hMHcUEg",
  authDomain: "react-chat-c27e1.firebaseapp.com",
  databaseURL: "https://react-chat-c27e1.firebaseio.com",
  projectId: "react-chat-c27e1",
  storageBucket: "react-chat-c27e1.appspot.com",
  messagingSenderId: "828481355784",
  appId: "1:828481355784:web:a20d7c83322f9f3e6151bd"
};

firebase.initializeApp(config);

 
export default firebase;