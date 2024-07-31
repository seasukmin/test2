import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcnnfTegwR86jPtWHHFFWnPMJd9p1oTZE",
  authDomain: "diary-93f06.firebaseapp.com",
  projectId: "diary-93f06",
  storageBucket: "diary-93f06.appspot.com",
  messagingSenderId: "340071026082",
  appId: "1:340071026082:web:f3c666d685dd221d3176fb",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
