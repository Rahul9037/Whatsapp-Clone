import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDGkizySGTPLroX3VHp3AtROMgTa9ZgQLE",
    authDomain: "whatsapp-clone-7e894.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-7e894.firebaseio.com",
    projectId: "whatsapp-clone-7e894",
    storageBucket: "whatsapp-clone-7e894.appspot.com",
    messagingSenderId: "643972952893",
    appId: "1:643972952893:web:d745e132f44bf39f454b54",
    measurementId: "G-SRHC4RT10G"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth , provider};
  export default db;