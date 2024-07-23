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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB16hwr3V6gyHupPKChFnYbw2M2KhZH3aE",
  authDomain: "foodit-afc9d.firebaseapp.com",
  projectId: "foodit-afc9d",
  storageBucket: "foodit-afc9d.appspot.com",
  messagingSenderId: "1053257341206",
  appId: "1:1053257341206:web:027625b13b8a604b35d837",
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
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { resultData, lastQuery };
}

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ===> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;
  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}
async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}
// try {
//   const uuid = crypto.randomUUID();
//   const path = `Food/${uuid}`;
//   const url = await uploadImage(path, addObj.imgUrl);
//   addObj.imgUrl = url;
//   // createdAt, updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서
//   const time = new Date().getTime();
//   addObj.createdAt = time;
//   addObj.updatedAt = time;
//   // id 필드의 값 ==> 가장 큰 id + 1
//   const lastId = await getLastNum(collectionName, "id");
//   dataObj.id = lastId + 1;
//   // 문서 ID 자동
//   const collect = await collection(db, collectionName);
//   const result = await addDoc(collect, dataObj);
//   const docSnap = await getDoc(result); // result ==> documentReference
//   const resultData = { ...docSnap.data(), docId: docSnap.id };
//   return resultData;
// } catch (error) {
//   return false;
// }

// async function getLastNum(collectionName, field) {
//   const q = query(
//     collection(db, collectionName),
//     orderBy(field, "desc"),
//     limit(1)
//   );
//   const lastDoc = await getDocs(q);
//   const lastNum = lastDoc.docs[0].data()[field];
//   return lastNum;
// }

// async function uploadImage(path, imgFile) {
//   // 스토리지 객체 가져오기
//   const storage = getStorage();
//   // 저장할 이미지 객체 생성
//   const imageRef = ref(storage, path);
//   // File 객체를 스토리지에 저장
//   await uploadBytes(imageRef, imgFile);
//   // 저장한 File의 url 가져오기
//   const url = await getDownloadURL(imageRef);
//   return url;
// }

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();
  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
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
