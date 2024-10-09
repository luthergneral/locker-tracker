import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3r0jYvD5QywM9KlWQPYWWeOeHfc15ynU",
  authDomain: "locker-tracker-a5aee.firebaseapp.com",
  projectId: "locker-tracker-a5aee",
  storageBucket: "locker-tracker-a5aee.appspot.com",
  messagingSenderId: "1058935988148",
  appId: "1:1058935988148:web:30f70cecc613a9ec595ce1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };