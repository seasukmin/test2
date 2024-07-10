import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuRDRbec7vR4MKoQ8rjSQPqd-l_B9aLko",
  authDomain: "mbti-project-29ffe.firebaseapp.com",
  projectId: "mbti-project-29ffe",
  storageBucket: "mbti-project-29ffe.appspot.com",
  messagingSenderId: "1076079226742",
  appId: "1:1076079226742:web:d285ee0988fad849e59457",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy(order, "desc")); // desc : 내림차순
  const querySnapshot = await getDocs(q);
  debugger;
  console.log(querySnapshot);
}

export { getAllDatas };
