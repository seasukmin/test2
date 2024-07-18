import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyPjAeV6FrNHtAudjn_DtR2LjSnAKrGAU",
  authDomain: "dwos-fc6ea.firebaseapp.com",
  projectId: "dwos-fc6ea",
  storageBucket: "dwos-fc6ea.appspot.com",
  messagingSenderId: "238525684313",
  appId: "1:238525684313:web:2fdf50a389f0bef1412f48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
}

async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  // const resultData = snapshot.docs.map((doc) => ({
  //   docId: doc.id,
  //   ...doc.data(),
  // }));
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}

async function getMember(values) {
  const { email, password } = values;
  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberobj = {};

  if (docs.length == 0) {
    message = "이메일이 올바르지 않습니다.";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인에 성공했습니다.";
      memberobj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "비밀번호가 일치하지 않습니다.";
    }
  }
  return { memberobj, message };
}
//두 개의 조건을 입력하면 둘 중 뭐가 틀렸는지 알 수가 없다 그러니 먼저 email로 조회한다.
// email이 없어도 snapshot 객체는 나오니 docs를 확인해라..~!
// 소셜 로그인이 생기면서 아이디와 패스워드를 같이 판단해서 둘 중 하나 틀..

export { getDatas, getData, getMember };
