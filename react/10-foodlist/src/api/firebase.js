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

// async function getDatasOrderByLimit(conllectionName, options) {
//   const { fieldName, limit } = options;
//   const q = query(getCollection(conllectionName), orderBy(fieldName, "desc"),limit(limit));
//   const snapshot = await getDocs(q);
//   const resultData= snapshot.docs.map((doc)=> ({
//      ...doc.data(), docId: doc.id
//   }))
//   return resultData
// }

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
      // startAfter는 더보기 눌렀을때 마지막 인덱스 이후로 다시 나오게 알려주는 함수
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
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
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
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

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();
  let message;
  try {
    // 2. 스토리지에서 이미지 삭제
    // 삭제할 파일의 참조객체 생성(ref 함수 사용)
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);
    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 3. 컬렉션에서 문서 삭제
    // 삭제할 문서의 참조객체 생성(doc 함수 사용)
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

// async function deleteDatas(collectionName, id, imgUrl){

// }

async function updateDatas(collectionName, docId, updateInfoObj) {
  const docRef = await doc(db, collectionName, docId);
  const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
  const resultData = { ...docData.data(), docId: docData.id };

  try {
    return resultData;
  } catch (error) {
    return false;
  }
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
