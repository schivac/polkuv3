const firebaseConfig = {
  apiKey: "AIzaSyDORjstoitYjNGvvqKx7f-PjOfOP3seIfc",
  authDomain: "uukotaku.firebaseapp.com",
  projectId: "uukotaku",
  storageBucket: "uukotaku.firebasestorage.app",
  messagingSenderId: "666796153269",
  appId: "1:666796153269:web:4b201eeaeacf9a24b261fc",
  measurementId: "G-J5FCNTX640"
};

// Export modul
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions(); // Jika pakai Cloud Functions

export { auth, db, functions };