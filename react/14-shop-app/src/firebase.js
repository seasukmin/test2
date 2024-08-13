import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDoc,
  runTransaction,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

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

function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== "string") {
    [newPath] = path;
    // newPath=path.flat()
    // 한꺼플 까대기하는것.
    // {[1,[2,[3,4],5] => flat()=> [1,2,[3,4],5]}
    // flat(infinity)=> 모든 배열을 까대기하나 배열 하나는 남김! 바깥쪽 대괄호
  }
  return collection(db, ...newPath);
}

export function getUserAuth() {
  return auth;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
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

  // limit 조건
  q = query(q, limit(limits));
  return q;
}

export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

export async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
}

export async function joinUser(uid, email) {
  await setDoc(doc(db, "users", uid), { email: email });
}

export async function asyncCart(uid, cartArr) {
  const cartRef = getCollection("users", uid, "cart");
  const batch = writeBatch(db);

  doc(db, "컬렉션명", "문서ID");

  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);
    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }
  await batch.commit();
}

export async function updateQuantity(uid, CartItem) {
  const cartRef = getCollection("users", uid, "cart");
  const itemRef = doc(cartRef, CartItem.id.toString());

  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    await updateDoc(itemRef, { quantity: updatedQuantity });
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = doc(cartRef, docId.toString());
    await deleteDoc(docRef);
    return docId;
  } catch (error) {
    console.log("Error delete:", error);
  }
}

export async function addCart(collectionName, cartObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, cartObj.id.toString());
  await setDoc(cartRef, cartObj);
}
// batch 여러번 작업을 한번에 몰아해준다 set이 그 작업을 넣어주는 명령어.
// 공통함수!! 만들어보기
