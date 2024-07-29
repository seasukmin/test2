import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0cI0x8Lz8gcbynU_pCKGljQf7bIgmjh8",
  authDomain: "chatting-dee1d.firebaseapp.com",
  projectId: "chatting-dee1d",
  storageBucket: "chatting-dee1d.appspot.com",
  messagingSenderId: "419121117833",
  appId: "1:419121117833:web:cdcff6328e09edbe526458",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

export { getUserAuth, getCollection };
