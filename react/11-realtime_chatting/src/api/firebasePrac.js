import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

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
const db = getFirestore(app);

async function addDatas(collectionName, addObj) {
  try {
    const collect = collection(db, collectionName);
    await addDoc(collect, addObj);
    return true;
  } catch {
    return false;
  }
}

async function fetchGetDatas(collectionName, setDatas) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setDatas(resultData);
  });
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
}
