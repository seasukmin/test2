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
  runTransaction,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

export function getUserAuth() {
  return auth;
}

function getCollection(collectionName) {
  return collection(db, collectionName);
}
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) return 0;
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}
export async function addDatas(collectionName, addObj) {
  try {
    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id }
        : null;
      return docData;
    });
    return resultData;
  } catch (error) {
    console.log("Error transaction:", error);
  }
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
export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}
// 순수함수고ㅗ 불변성... dispatch가 주소를 바꺼준다.. <!_비록 값이 같더라도.
export async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    const snapshot = await getDoc(docRef);
    const resultData = { ...snapshot.data(), docId: snapshot.id };
    return resultData;
  } catch (error) {
    console.log("Error update:", error);
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return docId;
  } catch (error) {
    console.log("Error delete:", error);
  }
}
// export { addDatas, getLastNum };

// Transaction 데이터베이스의 작업 단위
// 1명 무슨 작업을 하던 이사람의 작업이 우선적으로 실행
// 사용자가 여러명이면 그 순서를 어떻게 정할거냐?
// 세명의 사용자가 일기 등록을 동시에 눌렀따.
// getLastNum 마지막거 가져와서 +1
// 동시에 눌렀을때 순서를 정해주려면 Transaction을 걸어야한다.
