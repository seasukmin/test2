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
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAJP_AxEtYu1Dw76S3k01oFRpeC8u8yDs",
  authDomain: "moviepedia-21d5e.firebaseapp.com",
  projectId: "moviepedia-21d5e",
  storageBucket: "moviepedia-21d5e.appspot.com",
  messagingSenderId: "570357708984",
  appId: "1:570357708984:web:6b27581f0b9af88baa9c4d",
  measurementId: "G-EELYEKKV5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...);
  const q = query(collect, orderBy(options.order, "desc"));
  // asc가 오름차순 기본값 desc는 내림차순
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}
// order where Limit 함수
async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    console.log(options.lq);
    console.log(options.order);
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...);

  // asc가 오름차순 기본값 desc는 내림차순
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];

  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { resultData, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  try {
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;

    // id 필드의 값 ==> 가장 큰 id + 1
    // createdAt, updateAt ==> 현재 날짜 밀리세컨즈로 바꿔서

    // 문서 ID 수동
    // const saveDoc = await doc(db, collectionName, '3');
    // console.log(`doc() 결과: ${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setDoc() 결과: ${saveResult}`);

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  //  저장할 이미지 객체 생성
  //  File 객체를 스토리지에 저장
  //  저장한 File의 url 가져오기
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
