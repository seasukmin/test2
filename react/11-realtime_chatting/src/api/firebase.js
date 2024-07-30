import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
  where,
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
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

async function addDatas(collectionName, dataObj) {
  try {
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return false;
  }
  // await addDoc(getCollection(collectionName), addObj)
}

function getRealTimeMessages(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  //  limit 조건
  q = query(q, limit(limits));

  return q;
}
export {
  db,
  getUserAuth,
  getCollection,
  addDatas,
  collection,
  query,
  getRealTimeMessages,
  getQuery,
};
