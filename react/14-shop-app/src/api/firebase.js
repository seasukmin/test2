import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL6df1XrbywBUVQZEf5PHU4s7BIqYYTpY",
  authDomain: "shop-1b97b.firebaseapp.com",
  projectId: "shop-1b97b",
  storageBucket: "shop-1b97b.appspot.com",
  messagingSenderId: "357863148582",
  appId: "1:357863148582:web:edf5117f6f6920203a2ae7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function getUserAuth() {
  return auth;
}

// async function getDatas (collectionName){
//     const collect(collectionName)

// }
